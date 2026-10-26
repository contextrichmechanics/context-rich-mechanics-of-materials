// Optional real-browser QA: set NODE_PATH for Playwright and CHROME_PATH if needed.
import assert from 'node:assert/strict';
import path from 'node:path';
import fs from 'node:fs/promises';
import {createRequire} from 'node:module';
import {fileURLToPath,pathToFileURL} from 'node:url';

 const root=path.resolve(fileURLToPath(new URL('../',import.meta.url)));
 const require=createRequire(import.meta.url);const {chromium}=require('playwright');
 const out=path.join(root,'exports','hydraulic-press-review');await fs.mkdir(out,{recursive:true});
 const browser=await chromium.launch({headless:true,executablePath:process.env.CHROME_PATH||undefined,args:['--allow-file-access-from-files','--disable-background-networking']});
 const results=[];
 try{
  const targets=[['cli-student','exports/hydraulic-press-punching-shear/default/hydraulic-press-punching-shear-default-student.html',false],['cli-instructor','exports/hydraulic-press-punching-shear/default/hydraulic-press-punching-shear-default-instructor.html',true],['direct-student','_site/problems/hydraulic-press-punching-shear/student-packet.html',false],['direct-instructor','_site/problems/hydraulic-press-punching-shear/instructor-guide.html',true],['builder','_site/instructor-builder.html',false]];
  for(const [name,rel,instructor] of targets){
   const page=await browser.newPage({viewport:{width:1360,height:1000}});const errors=[];page.on('pageerror',e=>errors.push(e.message));await page.route(/^https?:/,route=>route.abort());
   const url=pathToFileURL(path.join(root,rel));if(name==='builder')url.searchParams.set('problem','hydraulic-press-punching-shear');
   await page.goto(url.href);await page.waitForFunction(()=>document.querySelectorAll('.generated-question').length===19);
   await page.waitForFunction(()=>[...document.images].every(img=>img.complete&&img.naturalWidth>0));
   const info=await page.evaluate(()=>({questions:document.querySelectorAll('.generated-question').length,answers:document.querySelectorAll('.answer-block').length,studentFigures:document.querySelectorAll('img[src*="press-student-geometry"]').length,instructorFigures:document.querySelectorAll('img[src*="press-instructor-reference"]').length,geometryBeforeQ8:document.querySelector('img[src*="press-student-geometry"]').getBoundingClientRect().top<document.querySelectorAll('.generated-question')[7].getBoundingClientRect().top,dimensionKey:document.querySelector('.current-input-dimensions')?.textContent,unresolved:document.body.textContent.includes('{{'),images:[...document.images].map(i=>({src:i.getAttribute('src'),width:i.naturalWidth}))}));
   assert.equal(info.questions,19);assert.equal(info.answers,instructor?19:0);assert.equal(info.studentFigures,1);assert.equal(info.instructorFigures,instructor?1:0);assert.equal(info.geometryBeforeQ8,true);assert.equal(info.unresolved,false);assert.deepEqual(errors,[]);assert.match(info.dimensionKey,/d = 50 mm; t = 10 mm; s = 60 mm; b = 120 mm/);
   await page.screenshot({path:path.join(out,name+'.png')});results.push({name,...info});
   if(name==='builder'){
    await page.locator('[data-variable="P"]').fill('');await page.waitForSelector('#packet-preview [role="alert"]');assert.equal(await page.locator('#download-student-doc').isDisabled(),true);assert.equal(await page.locator('#packet-preview .generated-question').count(),0);
    await page.locator('[data-variable="P"]').fill('80');await page.locator('#instructor-preview-tab').click();await page.waitForFunction(()=>document.querySelectorAll('.answer-block').length===19);assert.match(await page.locator('#packet-preview').innerText(),/50\.93/);
    await page.locator('[data-variable="d"]').fill('30');assert.match(await page.locator('#packet-preview').innerText(),/mean compressive contact pressure/);assert.match(await page.locator('#packet-preview').innerText(),/nominal circular shear check/);
    await page.locator('[data-variable="s"]').fill('20');await page.waitForSelector('#packet-preview [role="alert"]');assert.equal(await page.locator('#packet-preview .answer-block').count(),0);
    await page.locator('[data-variable="s"]').fill('60');assert.equal(await page.locator('#download-instructor-doc').isDisabled(),false);
    const embedded=await page.evaluate(async()=>{const student=new DOMParser().parseFromString(await fullHtmlDocument('student'),'text/html');const instructor=new DOMParser().parseFromString(await fullHtmlDocument('instructor'),'text/html');return{studentImages:student.images.length,instructorImages:instructor.images.length,studentAnswers:student.querySelectorAll('.answer-block').length,instructorAnswers:instructor.querySelectorAll('.answer-block').length,allEmbedded:[...student.images,...instructor.images].every(i=>i.getAttribute('src').startsWith('data:image/'))};});assert.deepEqual(embedded,{studentImages:2,instructorImages:3,studentAnswers:0,instructorAnswers:19,allEmbedded:true});results.push({name:'builder-input-validation-and-embedded-export',...embedded});
    await page.locator('.generated-question').nth(16).screenshot({path:path.join(out,'builder-changed-q17.png')});
   }
   if(instructor)await page.locator('.generated-question').nth(17).screenshot({path:path.join(out,name+'-q18.png')});
   await page.close();
  }
  await fs.writeFile(path.join(out,'browser-qa.json'),JSON.stringify(results,null,2)+'\n');console.log(JSON.stringify({checks:results.length,status:'passed',resultsFile:path.join(out,'browser-qa.json')}));
 }finally{await browser.close();}
