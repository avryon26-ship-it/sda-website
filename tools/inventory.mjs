import sharp from 'sharp'; import fs from 'fs'; import path from 'path';
const root = process.argv[2];
const out = [];
function walk(d){ for (const e of fs.readdirSync(d,{withFileTypes:true})) { const p=path.join(d,e.name); if(e.isDirectory()){ if(['fontawesome','js','css','swiper','icons'].includes(e.name)) continue; walk(p);} else out.push(p);} }
walk(root);
for (const p of out) { const rel=path.relative(root,p); const st=fs.statSync(p); let dim='-'; try{ const m=await sharp(p).metadata(); dim=`${m.width}x${m.height}`;}catch{} console.log(`${rel}\t${(st.size/1024).toFixed(0)}KB\t${dim}`); }
