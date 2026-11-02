export function requireThat(value,message){if(!value)throw new Error(message);}
export function isoTime(value){requireThat(typeof value==='string'&&/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d\.\d{3}Z$/.test(value)&&new Date(value).toISOString()===value,'Use an ISO UTC timestamp with milliseconds');return Date.parse(value);}
export function normalise(text){return text.normalize('NFKC').toLowerCase().replace(/https?:\/\/\S+/g,' ').replace(/[^\p{L}\p{N}]+/gu,' ').trim().replace(/\s+/g,' ');}
function short(value,label,max=200){requireThat(typeof value==='string'&&value.trim()&&value.length<=max,'Invalid '+label);}
export function validateCorpus(data){
 requireThat(data?.schema==='memely/corpus/1','Unsupported corpus');short(data.name,'name');requireThat(['example','user','mixed'].includes(data.origin),'Origin label required');
 requireThat(Array.isArray(data.themes)&&data.themes.length>=1&&data.themes.length<=6,'Use 1..6 themes');requireThat(Array.isArray(data.communities)&&data.communities.length>=1&&data.communities.length<=6,'Use 1..6 communities');requireThat(Array.isArray(data.posts)&&data.posts.length<=5000,'Post limit: 5000');requireThat(Array.isArray(data.activity)&&data.activity.length<=2000,'Activity limit: 2000');
 const themes=new Set(),communities=new Set(),posts=new Map(),activity=new Set();
 for(const t of data.themes){short(t.id,'theme ID',40);requireThat(!themes.has(t.id),'Duplicate theme');themes.add(t.id);short(t.name,'theme name',60);short(t.description,'description',400);requireThat(Array.isArray(t.keywords)&&t.keywords.length>=1&&t.keywords.length<=12,'Use 1..12 keywords');for(const key of t.keywords){short(key,'keyword',80);requireThat(normalise(key).length>0,'Empty normalised keyword');}}
 for(const c of data.communities){short(c.id,'community ID',40);requireThat(!communities.has(c.id),'Duplicate community');communities.add(c.id);short(c.name,'community name',60);short(c.poolLabel,'pool label',80);}
 for(const p of data.posts){short(p.id,'post ID',80);requireThat(!posts.has(p.id),'Duplicate post ID');posts.set(p.id,p);requireThat(communities.has(p.communityId),'Unknown post community');short(p.author,'author alias',80);short(p.text,'post text',1000);requireThat(normalise(p.text).length>0,'Empty normalised post');isoTime(p.at);requireThat(['original','repost'].includes(p.kind),'Unknown post kind');requireThat(['example','user','external'].includes(p.origin),'Post origin required');short(p.source,'source reference',240);}
 for(const p of data.posts)if(p.kind==='repost'){requireThat(p.repostOf!==p.id&&posts.has(p.repostOf),'Invalid repost reference');requireThat(posts.get(p.repostOf).kind==='original','Repost must reference an original');requireThat(isoTime(posts.get(p.repostOf).at)<=isoTime(p.at),'Repost precedes its original');}
 for(const a of data.activity){short(a.id,'activity ID',80);requireThat(!activity.has(a.id)&&!posts.has(a.id),'Duplicate or ambiguous activity ID');activity.add(a.id);requireThat(communities.has(a.communityId),'Unknown activity community');isoTime(a.at);short(a.source,'activity source',240);requireThat(['example','user','external'].includes(a.origin),'Activity origin required');requireThat(Number.isFinite(a.quoteReserveSOL)&&a.quoteReserveSOL>=0,'Invalid SOL reserve');requireThat(Number.isInteger(a.activeAccountCount)&&a.activeAccountCount>=0,'Invalid account count');}
 return data;
}
export function curate(data,asOf){
 const cutoff=isoTime(asOf),eligible=data.posts.filter(p=>isoTime(p.at)<=cutoff).sort((a,b)=>a.at.localeCompare(b.at)||a.id.localeCompare(b.id)),seen=new Map(),kept=[],removed=[];
 for(const p of eligible){const key=normalise(p.text);if(p.kind==='repost')removed.push({post:p,reason:'explicit repost',keptId:p.repostOf});else if(seen.has(key))removed.push({post:p,reason:'normalised duplicate',keptId:seen.get(key)});else{seen.set(key,p.id);kept.push(p);}}
 return {eligible,kept,removed};
}
export function themeMatches(post,theme){const body=' '+normalise(post.text)+' ';return theme.keywords.filter(k=>body.includes(' '+normalise(k)+' '));}
