import {validateCorpus,isoTime,curate,themeMatches,requireThat} from './corpus.mjs';
export function analyse(data,{asOf,windowHours=6,activityMaxAgeHours=2}={}){
 validateCorpus(data);requireThat(Number.isInteger(windowHours)&&windowHours>=1&&windowHours<=24,'Window must be 1..24 whole hours');requireThat(Number.isFinite(activityMaxAgeHours)&&activityMaxAgeHours>0,'Invalid activity age budget');
 const clock=asOf??[...data.posts.map(p=>p.at),...data.activity.map(p=>p.at)].sort().at(-1);requireThat(clock,'An empty corpus needs a review clock');const end=isoTime(clock),span=windowHours*3600000,start=end-span,previousStart=start-span,curated=curate(data,clock);
 const current=curated.kept.filter(p=>isoTime(p.at)>start),previous=curated.kept.filter(p=>isoTime(p.at)>previousStart&&isoTime(p.at)<=start);
 const themes=data.themes.map(t=>{
  const posts=current.map(p=>({...p,matches:themeMatches(p,t)})).filter(p=>p.matches.length),prior=previous.filter(p=>themeMatches(p,t).length),communities=[...new Set(posts.map(p=>p.communityId))],authors=[...new Set(posts.map(p=>p.author))];
  const bins=Array.from({length:windowHours},(_,i)=>({end:new Date(start+(i+1)*3600000).toISOString(),count:posts.filter(p=>isoTime(p.at)>start+i*3600000&&isoTime(p.at)<=start+(i+1)*3600000).length}));
  const edges=data.communities.map(c=>({communityId:c.id,count:posts.filter(p=>p.communityId===c.id).length,postIds:posts.filter(p=>p.communityId===c.id).map(p=>p.id)})).filter(e=>e.count);
  const phase=posts.length>=5&&communities.length>=3?'cross-community':posts.length>=3&&communities.length>=2?'spreading':posts.length?'forming':'unobserved';
  return {...t,posts,priorPostIds:prior.map(p=>p.id),currentCount:posts.length,previousCount:prior.length,change:posts.length-prior.length,growth:prior.length?(posts.length-prior.length)/prior.length:null,communities,authors,bins,edges,phase};
 });
 const activity=data.communities.map(c=>{
  const rows=data.activity.filter(a=>a.communityId===c.id&&isoTime(a.at)<=end).sort((a,b)=>a.at.localeCompare(b.at)||a.id.localeCompare(b.id)),latest=rows.at(-1),baseline=rows.filter(a=>isoTime(a.at)<=start).at(-1),ageHours=latest?(end-isoTime(latest.at))/3600000:null,stale=!latest||ageHours>activityMaxAgeHours;
  return {...c,latest,baseline,rows,ageHours,stale,accountChange:!stale&&baseline?latest.activeAccountCount-baseline.activeAccountCount:null,reserveChangeSOL:!stale&&baseline?latest.quoteReserveSOL-baseline.quoteReserveSOL:null};
 });
 return {schema:'memely/analysis/1',origin:data.origin,name:data.name,asOf:clock,windowHours,activityMaxAgeHours,start:new Date(start).toISOString(),previousStart:new Date(previousStart).toISOString(),current,previous,curated,themes,activity,ranked:[...themes].sort((a,b)=>b.currentCount-a.currentCount||a.id.localeCompare(b.id)),themeAssignments:themes.reduce((s,t)=>s+t.currentCount,0)};
}
export function selectTheme(report,id){const theme=report.themes.find(t=>t.id===id);requireThat(theme,'Unknown theme');return theme;}
export function crossover(report){return report.themes.map(t=>({themeId:t.id,counts:report.activity.map(c=>t.edges.find(e=>e.communityId===c.id)?.count??0)}));}
