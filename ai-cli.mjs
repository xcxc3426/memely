import {readFile,writeFile} from 'node:fs/promises';
import {analyse} from './analyse.mjs';
import {makePacket} from './research.mjs';
import {interpret} from './ai-adapter.mjs';
const [file='reference-corpus.json',id='night-shift',output='local-ai-research.json']=process.argv.slice(2),data=JSON.parse(await readFile(new URL(file,import.meta.url),'utf8')),packet=makePacket(analyse(data),id);
const result=await interpret(packet,{apiKey:process.env.XAI_API_KEY,model:process.env.MEMELY_MODEL});await writeFile(output,JSON.stringify(result,null,2)+'\n');console.log('Saved returned model research to '+output+'. Review its claims against the supplied sources.');
