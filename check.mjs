import {readFile,readdir,stat} from 'node:fs/promises';
import {execFileSync} from 'node:child_process';
import vm from 'node:vm';
import assert from 'node:assert/strict';
import {packageFiles} from './manifest.mjs';
import {SCREENS} from './screens.mjs';
import {analyse} from './analyse.mjs';
import {makePacket,makeReceipt,verifyReceipt} from './research.mjs';
const root=new URL('./',import.meta.url),files=await packageFiles(),names=new Set(files);let links=0;
for(const f of await readdir(root,{withFileTypes:true}))assert.ok(!f.isDirectory()||['.git','node_modules'].includes(f.name),'The distribution must remain a flat folder');
for(const file of files.filter(f=>f.endsWith('.md'))){const body=await readFile(new URL(file,root),'utf8');for(const m of body.matchAll(/!?\[[^\]]*\]\(([^)\s]+)\)/g)){const target=m[1].split('#')[0];if(!target||/^[a-z]+:/i.test(target))continue;assert.ok(names.has(target),file+' links to missing '+target);links++;}for(const m of body.matchAll(/<img\b[^>]*\bsrc="([^"]+)"/g)){assert.ok(names.has(m[1]),'Missing README artwork');links++;}}
for(const [i,v] of SCREENS.entries()){const png=await readFile(new URL(String(i+1).padStart(2,'0')+'-'+v.id+'.png',root));assert.equal(png.subarray(1,4).toString(),'PNG');assert.equal(png.readUInt32BE(16),1600);assert.equal(png.readUInt32BE(20),1100);}
const cover=await readFile(new URL('memely-cover.png',root));assert.equal(cover.readUInt32BE(16),1600);assert.equal(cover.readUInt32BE(20),800);
for(const file of files.filter(f=>f.endsWith('.mjs'))){execFileSync(process.execPath,['--check',new URL(file,root).pathname]);const body=await readFile(new URL(file,root),'utf8');for(const m of body.matchAll(/from '\.\/([^']+)'/g))assert.ok(names.has(m[1]),'Missing source import '+m[1]);}
for(const f of files.filter(f=>f.endsWith('.json')))JSON.parse(await readFile(new URL(f,root),'utf8'));
const data=JSON.parse(await readFile(new URL('reference-corpus.json',root),'utf8')),report=analyse(data),receipt=JSON.parse(await readFile(new URL('reference-receipt.json',root),'utf8'));assert.deepEqual(receipt,await makeReceipt(makePacket(report,'night-shift')));await verifyReceipt(receipt);
const html=await readFile(new URL('Memely.html',root),'utf8');assert.ok(!/<script[^>]+src=/.test(html));assert.ok(!/<link[^>]+href="(?!data:)/.test(html));assert.ok(!html.includes('api.x.ai'));new vm.Script(html.match(/<script>([\s\S]*?)<\/script>/)[1]);
assert.ok(files.length+1<=100);const max=Math.max(...await Promise.all(files.map(async f=>(await stat(new URL(f,root))).size)));assert.ok(max<25*1048576);
console.log('Checked '+(files.length+1)+' files, '+links+' local links, twelve figures, source imports, JSON, receipt and offline embedding.');
