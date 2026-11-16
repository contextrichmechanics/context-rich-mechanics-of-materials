import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import path from 'node:path';
import {createRequire} from 'node:module';
import {fileURLToPath,pathToFileURL} from 'node:url';
const root=path.resolve(fileURLToPath(new URL('../',import.meta.url))),out=path.join(root,'exports/platform-review');
const {chromium}=createRequire(import.meta.url)('playwright');
const browser=await chromium.launch({headless:true,executablePath:process.env.CHROME_PATH||undefined,args:['--allow-file-access-from-files','--disable-background-networking']});
const records=[];
try{
 const targets=[['cli-student','exports/suspended-equipment-platform/default/suspended-equipment-platform-default-student.html',false],['cli-instructor','exports/suspended-equipment-platform/default/suspended-equipment-platform-default-instructor.html',true],['direct-student','_site/problems/suspended-equipment-platform/student-packet.html',false],['direct-instructor','_site/problems/suspended-equipment-platform/instructor-guide.html',true],['builder','_site/instructor-builder.html',false]];
 for(const [name,rel,instructor] of targets){
  const page=await browser.newPage({viewport:{width:1400,height:1100}}),errors=[];
  page.on('pageerror',error=>errors.push(error.message));await page.route(/^https?:/,r=>r.abort());
  const url=pathToFileURL(path.join(root,rel));if(name==='builder')url.searchParams.set('problem','suspended-equipment-platform');
  await page.goto(url.href);await page.waitForFunction(()=>document.querySelectorAll('.generated-question').length===21);await page.waitForFunction(()=>[...document.images].every(i=>i.complete&&i.naturalWidth>0));
  const info=await page.evaluate(()=>{
   const qs=[...document.querySelectorAll('.generated-question')],bridge=document.querySelector('.platform-common-model'),reference=document.querySelector('.platform-instructor-reference');
   const before=(a,b)=>!!(a.compareDocumentPosition(b)&Node.DOCUMENT_POSITION_FOLLOWING);
   return {labels:qs.map(q=>q.querySelector('h3').textContent.split('.')[0]),answers:document.querySelectorAll('.answer-block').length,common:document.querySelectorAll('img[src*="platform-student-common-geometry"]').length,instructor:document.querySelectorAll('img[src*="platform-instructor-free-bodies"]').length,phase:before(qs[9],bridge)&&before(bridge,qs[10]),referenceOrder:reference?before(qs[10],reference)&&before(reference,qs[11]):null,workspace:document.querySelector('.student-workspace')?.getBoundingClientRect().height,key:document.querySelector('.current-input-dimensions')?.textContent,unresolved:document.body.textContent.includes('{{')};
  });
  assert.deepEqual(info.labels,[...Array.from({length:10},(_,i)=>'Q'+(i+1)),...Array.from({length:11},(_,i)=>'M'+(i+1))]);
  assert.equal(info.answers,instructor?21:0);assert.equal(info.common,1);assert.equal(info.instructor,instructor?1:0);assert.equal(info.phase,true);if(instructor)assert.equal(info.referenceOrder,true);assert.ok(info.workspace>=300);assert.equal(info.unresolved,false);
  assert.match(info.key,/P = 800 lbf/);assert.match(info.key,/x_HC = 5 ft/);assert.deepEqual(errors,[]);
  await page.locator('.platform-common-model').screenshot({path:path.join(out,name+'-common.png')});
  if(instructor)await page.locator('.generated-question').nth(19).screenshot({path:path.join(out,name+'-m10.png')});
  records.push({name,...info});
  if(name.startsWith('direct')){
   await page.evaluate(instructor=>window.renderProblemPacket({slug:'suspended-equipment-platform',variant:'section-a',type:instructor?'instructor':'student',targetId:instructor?'platform-instructor-questions':'platform-student-questions'}),instructor);
   assert.equal(await page.locator('.generated-question').count(),21);
  }
  if(name==='builder'){
   const fill=async values=>{for(const [key,value] of Object.entries(values))await page.locator('[data-variable="'+key+'"]').fill(String(value));};
   await fill({x_HC:4});await page.waitForSelector('#packet-preview [role="alert"]');assert.equal(await page.locator('.answer-block').count(),0);assert.equal(await page.locator('#download-student-doc').isDisabled(),true);
   await fill({x_HC:5});assert.equal(await page.locator('.generated-question').count(),21);
   await page.locator('#instructor-preview-tab').click();await fill({x_P:4});assert.match(await page.locator('#packet-preview').innerText(),/B has the larger downward displacement/);assert.match(await page.locator('#packet-preview').innerText(),/C has the larger downward displacement/);
   await fill({x_P:1.5});assert.match(await page.locator('#packet-preview').innerText(),/DC remains level \(zero tilt\)/);
   await fill({x_P:2805/1282});assert.match(await page.locator('#packet-preview').innerText(),/AB remains level \(zero tilt\)/);assert.equal(await page.locator('[data-variable="x_P"]').evaluate(e=>e.validity.stepMismatch),false);
   await fill({L_DC:10,x_DH:4,x_HC:6,L_AB:6,x_P:2.4});assert.match(await page.locator('#packet-preview').innerText(),/Largest contribution to load-point displacement: FC/);assert.match(await page.locator('#packet-preview').innerText(),/Largest raw wire elongation: AH/);
   await fill({L_u:2025/512});assert.match(await page.locator('#packet-preview').innerText(),/AH and FC, tied within numerical tolerance/);
   await page.locator('.generated-question').nth(19).screenshot({path:path.join(out,'builder-weighted-tie.png')});
   await fill({L_DC:7,x_DH:2,x_HC:5,L_AB:5,L_u:4,x_P:1,P:10000,A_w:.001,E_w:1000});
   await page.waitForSelector('.platform-trial-diagnostics');assert.equal(await page.locator('.generated-question').count(),0);assert.equal(await page.locator('#download-instructor-doc').isDisabled(),true);
   const guard=await page.evaluate(async()=>{
    let imageCalls=0,opens=0;const oldFetch=window.fetch,oldOpen=window.open;window.fetch=()=>{imageCalls++;throw new Error('Unexpected image request');};window.open=()=>{opens++;return null;};
    let rejected=false;try{await fullHtmlDocument('student');}catch{rejected=true;}
    await printDocument('student');window.fetch=oldFetch;window.open=oldOpen;return{imageCalls,opens,rejected};
   });assert.deepEqual(guard,{imageCalls:0,opens:0,rejected:true});
   await page.locator('#student-preview-tab').click();assert.equal(await page.locator('.platform-trial-diagnostics').count(),0);assert.ok(!(await page.locator('#packet-preview').innerText()).includes('612.097'));
   await fill({P:800,A_w:.05,E_w:28000});assert.equal(await page.locator('.generated-question').count(),21);assert.equal(await page.locator('#download-student-doc').isDisabled(),false);
   const embedded=await page.evaluate(async()=>{
    const student=new DOMParser().parseFromString(await fullHtmlDocument('student'),'text/html'),teacher=new DOMParser().parseFromString(await fullHtmlDocument('instructor'),'text/html');
    return {studentImages:student.images.length,instructorImages:teacher.images.length,studentAnswers:student.querySelectorAll('.answer-block').length,instructorAnswers:teacher.querySelectorAll('.answer-block').length,embedded:[...student.images,...teacher.images].every(i=>i.getAttribute('src').startsWith('data:image/')),studentHasTeacher:student.body.textContent.includes('Maximum modeled tension:')};
   });assert.deepEqual(embedded,{studentImages:2,instructorImages:3,studentAnswers:0,instructorAnswers:21,embedded:true,studentHasTeacher:false});
   records.push({name:'builder-input-warning-recovery-export',...guard,...embedded});
  }
  assert.deepEqual(errors,[]);await page.close();
 }
 await fs.writeFile(path.join(out,'browser-qa.json'),JSON.stringify(records,null,2)+'\n');console.log(JSON.stringify({status:'passed',groups:records.length}));
}finally{await browser.close();}
