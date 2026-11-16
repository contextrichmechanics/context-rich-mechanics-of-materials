import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import path from 'node:path';
import {createRequire} from 'node:module';
import {fileURLToPath,pathToFileURL} from 'node:url';
const root=process.env.JIB_QA_ROOT||path.resolve(fileURLToPath(new URL('../',import.meta.url)));
await fs.mkdir(path.join(root,'exports/jib-review'),{recursive:true});
const out=await fs.mkdtemp(path.join(root,'exports/jib-review/browser-'));
const {chromium}=createRequire(import.meta.url)('playwright');
const browser=await chromium.launch({headless:true,executablePath:process.env.CHROME_PATH||undefined,args:['--allow-file-access-from-files','--disable-background-networking']});
const records=[];
try{
 const targets=[
  ['cli-student','exports/jib-crane-battery-pack/default/jib-crane-battery-pack-default-student.html',12,false],
  ['cli-instructor','exports/jib-crane-battery-pack/default/jib-crane-battery-pack-default-instructor.html',12,true],
  ['exam-student','exports/jib-crane-battery-pack/exam-version/jib-crane-battery-pack-exam-version-student.html',6,false],
  ['exam-instructor','exports/jib-crane-battery-pack/exam-version/jib-crane-battery-pack-exam-version-instructor.html',6,true],
  ['direct-student','_site/problems/jib-crane-battery-pack/student-packet.html',12,false],
  ['direct-instructor','_site/problems/jib-crane-battery-pack/instructor-guide.html',12,true],
  ['builder','_site/instructor-builder.html',12,false]
 ];
 for(const [name,rel,count,instructor] of targets){
  const page=await browser.newPage({viewport:{width:1450,height:1100}}),errors=[];
  page.on('pageerror',e=>errors.push(e.message));await page.route(/^https?:/,r=>r.abort());
  const url=pathToFileURL(path.join(root,rel));if(name==='builder')url.searchParams.set('problem','jib-crane-battery-pack');
  await page.goto(url.href);await page.waitForFunction(n=>document.querySelectorAll('.generated-question').length===n,count);
  await page.waitForFunction(()=>[...document.images].every(i=>i.complete&&i.naturalWidth>0));
  const info=await page.evaluate(()=>{
   const qs=[...document.querySelectorAll('.generated-question')],bridge=document.querySelector('.jib-common-model'),ref=document.querySelector('.jib-instructor-reference');
   const ids=qs.map(q=>q.getAttribute('data-jib-question')),i=qs.find(q=>q.getAttribute('data-jib-question')==='idealization'),m=qs.find(q=>q.getAttribute('data-jib-question')==='q7');
   const before=(a,b)=>!!(a.compareDocumentPosition(b)&Node.DOCUMENT_POSITION_FOLLOWING);
   return {ids,answers:[...document.querySelectorAll('h4')].filter(h=>h.textContent.includes('Representative Instructor Answer')).length,reference:document.querySelectorAll('img[src*="jib-crane-instructor-free-bodies"]').length,common:document.querySelectorAll('img[src*="jib-crane-student-common-model"]').length,phase:before(i,bridge)&&before(bridge,m),referencePhase:ref?before(bridge,ref)&&before(ref,m):null,workspace:document.querySelector('.student-workspace')?.getBoundingClientRect().height,key:document.querySelector('.current-input-dimensions')?.textContent,unresolved:document.body.textContent.includes('{{'),math:document.querySelectorAll('math').length,answerCatalog:[...document.scripts].some(s=>(s.src||'').includes('problem-catalog')),overflow:document.documentElement.scrollWidth>window.innerWidth+3};
  });
  assert.equal(info.answers,instructor?count:0,name);assert.equal(info.reference,instructor?1:0,name);assert.equal(info.common,1,name);assert.equal(info.phase,true,name);if(instructor)assert.equal(info.referencePhase,true,name);assert.ok(info.workspace>=300,name);assert.equal(info.unresolved,false,name);assert.equal(info.overflow,false,name);
  assert.match(info.key,/a \(Lb\) = (1.6|2) m/);assert.match(info.key,/H = (500|650) N/);
  if(name.startsWith('direct')){
   assert.equal(info.answerCatalog,false);assert.ok(info.math>=2,'native MathML equations');
   const equation=page.locator('.jib-common-model p:has(> math[display="block"])').first();
   const snapshot=()=>equation.evaluate(e=>({markup:e.innerHTML,width:e.clientWidth,height:e.clientHeight,font:getComputedStyle(e).fontSize}));
   const desktop=await snapshot();
   await page.setViewportSize({width:390,height:1100});
   const narrow=await snapshot();assert.equal(narrow.markup,desktop.markup);assert.equal(narrow.font,desktop.font);
   const mobile=await equation.evaluate(e=>{
    e.scrollLeft=0;
    const glyphs=[...e.querySelectorAll('mi,mn,mo,mtext')].map(n=>n.getBoundingClientRect()).filter(r=>r.width&&r.height);
    return {viewport:innerWidth,pageWidth:document.documentElement.scrollWidth,width:e.clientWidth,scrollWidth:e.scrollWidth,overflow:getComputedStyle(e).overflowX,leftVisible:Math.min(...glyphs.map(r=>r.left))>=e.getBoundingClientRect().left-1};
   });
   assert.equal(mobile.pageWidth,mobile.viewport,name+' mobile page overflow');
   assert.equal(mobile.overflow,'auto');assert.ok(mobile.scrollWidth>mobile.width);
   assert.equal(mobile.leftVisible,true,name+' equation start visible');
   await equation.screenshot({path:path.join(out,name+'-mobile-equation-start.png')});
   const end=await equation.evaluate(e=>{
    e.scrollLeft=e.scrollWidth;
    const glyphs=[...e.querySelectorAll('mi,mn,mo,mtext')].map(n=>n.getBoundingClientRect()).filter(r=>r.width&&r.height);
    return {scrollLeft:e.scrollLeft,max:e.scrollWidth-e.clientWidth,rightVisible:Math.max(...glyphs.map(r=>r.right))<=e.getBoundingClientRect().right+1};
   });
   assert.ok(end.scrollLeft>0&&Math.abs(end.scrollLeft-end.max)<=1,name+' equation scroll reaches end');
   assert.equal(end.rightVisible,true,name+' equation end visible');
   await equation.screenshot({path:path.join(out,name+'-mobile-equation-end.png')});
   await page.emulateMedia({media:'print'});
   assert.equal(await equation.evaluate(e=>getComputedStyle(e).overflowX),'visible',name+' print layout unchanged');
   await page.emulateMedia({media:'screen'});
   await page.setViewportSize({width:1450,height:1100});
   await equation.evaluate(e=>{e.scrollLeft=0;});
   assert.deepEqual(await snapshot(),desktop,name+' desktop equation unchanged');
   info.mobileEquation={...mobile,...end,desktopUnchanged:true,printUnchanged:true};
  }
  assert.deepEqual(errors,[],name+' browser errors');
  await page.locator('.jib-common-model').screenshot({path:path.join(out,name+'-common.png')});
  if(instructor)await page.locator('.jib-instructor-reference').screenshot({path:path.join(out,name+'-fbd.png')});
  if(name==='builder'){
   // Exercise the live UI, not only extracted functions.
   const input=k=>page.locator('input[data-variable="'+k+'"]');
   for(const [key,value] of [['E','0'],['Lb','3'],['H',''],['n_s','1.5']]){
    await input(key).fill(value);await page.waitForSelector('.packet-error');
    assert.equal(await page.locator('.answer-block').count(),0);assert.equal(await page.locator('button#download-student-doc:disabled').count(),1);
    const rejected=await page.evaluate(async()=>{try{await fullHtmlDocument('student');return false;}catch{return true;}});assert.equal(rejected,true);
    await input(key).fill(({E:'200000',Lb:'1.6',H:'500',n_s:'1'})[key]);await page.waitForFunction(()=>document.querySelectorAll('.generated-question').length===12);
   }
   const html=await page.evaluate(()=>fullHtmlDocument('student'));assert.doesNotMatch(html,/class="answer-block"|instructor-free-bodies|PROBLEM_CATALOG/);
   await input('Lb').fill('2.4');await page.waitForFunction(()=>document.querySelector('.jib-topology').textContent.includes('endpoint panel B'));
   await input('Lb').fill('1.6');
   records.push({builderInvalidEdits:4,recovery:true,embeddedStudentExportSeparated:true,endpointCaption:true});
  }
  records.push({name,...info});await page.close();
 }
 await fs.writeFile(path.join(out,'browser-results.json'),JSON.stringify(records,null,2)+'\n');
 console.log(JSON.stringify({pages:targets.length,records,qa:out},null,2));
}finally{await browser.close();}
