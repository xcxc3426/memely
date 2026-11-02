import {writeFile} from 'node:fs/promises';
import {analyse} from './analyse.mjs';
import {makePacket,localBrief,makeReceipt} from './research.mjs';
const root=new URL('./',import.meta.url),at=h=>'2026-11-02T'+String(h).padStart(2,'0')+':00:00.000Z';
const themes=[
 {id:'night-shift',name:'Night shift',description:'Overtime animals, desk rituals and the community that stays awake.',keywords:['night shift','overtime','coffee']},
 {id:'office-goose',name:'Office goose',description:'A very small goose with a very large administrative role.',keywords:['office goose','goose desk','goose shift']},
 {id:'moon-garden',name:'Moon garden',description:'Small gardens, imaginary moons and patient community rituals.',keywords:['moon garden','moon seeds','moon patch']},
 {id:'pocket-planets',name:'Pocket planets',description:'Tiny worlds and orbit jokes that travel between communities.',keywords:['pocket planet','tiny orbit','pocket orbit']},
 {id:'nap-mode',name:'Nap mode',description:'Sleepy validator jokes and the art of doing less together.',keywords:['nap mode','sleepy validator','nap club']},
 {id:'tiny-crowns',name:'Tiny crowns',description:'Little victories, cardboard royalty and shared celebration.',keywords:['tiny crown','crown club','cardboard king']}
];
const communities=[{id:'lamp',name:'Lamp Club',poolLabel:'example:LAMP/SOL'},{id:'goose',name:'Goose Desk',poolLabel:'example:GEEP/SOL'},{id:'moon',name:'Moon Patch',poolLabel:'example:MOSS/SOL'},{id:'orbit',name:'Pocket Orbit',poolLabel:'example:PEBB/SOL'},{id:'nap',name:'Nap Club',poolLabel:'example:NAP/SOL'},{id:'crown',name:'Crown Room',poolLabel:'example:CROWN/SOL'}];
const texts=[
 ['night shift checked in. the lamp is now a community member.','overtime is a personality, apparently.','the night shift has adopted an office goose.','coffee and night shift lore. we made a desk sticker.','night shift roll call: one lamp, six chairs, no manager.','the overtime committee has approved another snack.','night shift drew a tiny crown on the coffee cup.','coffee lore escaped the desk and reached the moon patch.','the night shift brought a pocket planet to work.','overtime art club made a lamp-shaped moon.','night shift is a group project with suspiciously good stickers.','coffee crew, meet the office goose. it runs the night shift now.'],
 ['the office goose has entered the meeting.','goose desk has one policy: more crumbs.','the goose shift is accepting cardboard applications.','office goose requested a smaller keyboard.','the office goose joined the night shift.','goose desk is now a community mural.','goose shift traded a sticker with the moon garden.','office goose filed a report about the tiny crown.','goose desk posted the finished community banner.'],
 ['the moon garden has exactly three imaginary tomatoes.','moon seeds arrived in a very small envelope.','moon patch is painting another little greenhouse.','the moon garden made a pocket planet planter.','moon seeds became a community drawing night.','moon patch gardeners brought snacks for the night shift.','moon garden has a new weekly sketch ritual.','moon seeds shared with the crown club.'],
 ['a pocket planet fits inside the group chat.','tiny orbit is a perfectly valid travel plan.','pocket orbit made a miniature map.','pocket planet found a small moon garden.','tiny orbit is drawing its third postcard.','pocket orbit sent a sticker to the office goose.'],
 ['nap mode has been enabled by the community.','the sleepy validator requested a blanket.','nap club is an excellent place for a quiet joke.','nap mode painted a tiny constellation.','sleepy validator woke up to water the moon garden.'],
 ['the tiny crown is made of recycled cardboard.','crown club celebrated a finished community drawing.','cardboard king has no office, only a picnic table.','tiny crown awarded to the office goose.','crown club drew a pocket planet on the banner.','the cardboard king visited the moon garden.','tiny crown night is a weekly community ritual.']
];
const hours=[[2,4,6,7,8,9,9,10,10,11,11,12],[1,4,6,7,8,9,10,11,12],[2,5,6,8,9,10,11,12],[2,4,6,8,10,12],[1,3,5,7,9],[3,5,6,8,9,11,12]];
const posts=[];let n=0;
for(let theme=0;theme<texts.length;theme++)for(let i=0;i<texts[theme].length;i++){n++;const communityId=communities[(theme+Math.floor(i/2))%communities.length].id;posts.push({id:'p'+String(n).padStart(3,'0'),communityId,author:'author-'+String((theme*9+i)%37+1).padStart(2,'0'),at:at(hours[theme][i]),text:texts[theme][i],kind:'original',origin:'example',source:'example:post/'+n});}
const first=posts[0];posts.push({...first,id:'p048',author:'repeat-01',at:at(11),text:first.text.toUpperCase(),source:'example:duplicate/1'});posts.push({...posts[12],id:'p049',author:'repeat-02',at:at(12),text:posts[12].text+' !!!',source:'example:duplicate/2'});
for(let i=0;i<3;i++)posts.push({id:'r00'+(i+1),communityId:communities[i+2].id,author:'repost-'+i,at:at(10+i),text:posts[i].text,kind:'repost',repostOf:posts[i].id,origin:'example',source:'example:repost/'+i});
const activity=[],baseAccounts=[120,180,190,55,90,400],baseReserve=[85,94,210,50,80,300],accountStep=[20,10,7,1,2,3],reserveStep=[3,-1,7,.1,1,-.2];
for(const [i,c] of communities.entries())for(const h of [0,6,9,12]){if(c.id==='nap'&&h===12)continue;activity.push({id:'a-'+c.id+'-'+h,communityId:c.id,at:at(h),quoteReserveSOL:Number((baseReserve[i]+h*reserveStep[i]).toFixed(2)),activeAccountCount:baseAccounts[i]+h*accountStep[i],origin:'example',source:'example:aggregate/'+c.id+'/'+h});}
const data={schema:'memely/corpus/1',name:'The meme culture reference edition',origin:'example',themes,communities,posts,activity};
const report=analyse(data),packet=makePacket(report,'night-shift');
for(const [file,value] of [['reference-corpus.json',data],['reference-research.json',packet],['reference-receipt.json',await makeReceipt(packet)]])await writeFile(new URL(file,root),JSON.stringify(value,null,2)+'\n');await writeFile(new URL('reference-brief.md',root),localBrief(packet));console.log('Generated '+posts.length+' source posts, '+activity.length+' activity records and three reference exports.');
