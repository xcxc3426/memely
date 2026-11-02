import {readFile} from 'node:fs/promises';
import {analyse} from './analyse.mjs';
import {makePacket,localBrief,makeReceipt,verifyReceipt} from './research.mjs';
const [command='list',file='reference-corpus.json',id='night-shift',asOf]=process.argv.slice(2),data=JSON.parse(await readFile(new URL(file,import.meta.url),'utf8'));
if(command==='verify')console.log(JSON.stringify(await verifyReceipt(data),null,2));
else {const report=analyse(data,{asOf});
if(command==='list')console.table(report.ranked.map(t=>({theme:t.name,posts:t.currentCount,previous:t.previousCount,communities:t.communities.length,phase:t.phase})));
else if(command==='packet')console.log(JSON.stringify(makePacket(report,id),null,2));
else if(command==='brief')console.log(localBrief(makePacket(report,id)));
else if(command==='receipt')console.log(JSON.stringify(await makeReceipt(makePacket(report,id)),null,2));
else throw new Error('Use list, packet, brief, receipt or verify');}
