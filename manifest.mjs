import {readFile,readdir,writeFile} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import {fileURLToPath} from 'node:url';
const root=new URL('./',import.meta.url);
export async function packageFiles(){return (await readdir(root,{withFileTypes:true})).filter(f=>f.isFile()&&f.name!=='MANIFEST.sha256').map(f=>f.name).sort();}
export async function manifestText(){return (await Promise.all((await packageFiles()).map(async name=>createHash('sha256').update(await readFile(new URL(name,root))).digest('hex')+'  '+name))).join('\n')+'\n';}
if(process.argv[1]===fileURLToPath(import.meta.url)){const actual=await manifestText();if(process.argv.includes('--verify')){if(await readFile(new URL('MANIFEST.sha256',root),'utf8')!==actual)throw new Error('Package file manifest mismatch');console.log('All package files match the manifest.');}else{await writeFile(new URL('MANIFEST.sha256',root),actual);console.log('Wrote package manifest.');}}
