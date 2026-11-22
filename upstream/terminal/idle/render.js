const { chromium } = require('playwright'); const fs=require('fs'); const {execSync}=require('child_process'); const path=require('path');
const dir=process.argv[2]; const [name,W,H]=[process.argv[3],+process.argv[4],+process.argv[5]]; const FPS=30,T=12;
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:W,height:H}});
await p.goto('file://'+path.resolve(dir,'scene.html'));await p.evaluate(()=>document.fonts.ready);await p.waitForTimeout(300);
const out=path.resolve(dir,'frames_'+name);fs.rmSync(out,{recursive:true,force:true});fs.mkdirSync(out,{recursive:true});
const N=FPS*T;
for(let i=0;i<N;i++){await p.evaluate(t=>render(t),i/FPS);await p.screenshot({path:`${out}/${String(i).padStart(4,'0')}.png`});}
await p.evaluate(()=>render(8));await p.screenshot({path:path.resolve(dir,`poster_${name}.png`)});
await b.close();
execSync(`ffmpeg -y -loglevel error -framerate ${FPS} -i ${out}/%04d.png -c:v libx264 -profile:v high -level 4.1 -pix_fmt yuv420p -crf 20 -preset medium -g 30 -movflags +faststart -an ${path.resolve(dir,'halba-idle-'+name+'.mp4')}`);
fs.rmSync(out,{recursive:true,force:true});console.log('done',name);})();
