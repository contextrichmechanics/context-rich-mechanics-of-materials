import test from 'node:test';
import assert from 'node:assert/strict';
import path from 'node:path';
import {readFileSync} from 'node:fs';
import {fileURLToPath} from 'node:url';
import {createHash} from 'node:crypto';
import Model from '../scripts/press-fixture-model.js';
import {loadRoutes,normalize} from './helpers/packet-harness.mjs';

 const root=path.resolve(fileURLToPath(new URL('../',import.meta.url)));
 const read=p=>readFileSync(path.join(root,p),'utf8');
 const catalog=JSON.parse(read('data/problem-catalog.json'));
 const press=catalog.find(p=>Model.isPress(p));
 const sources={direct:read('scripts/packet-renderer.js'),builder:read('instructor-builder.qmd'),cli:read('scripts/render-assignment.mjs')};
 const routes=loadRoutes(root,sources,Model);
 const base={P:40,d:50,t:10,s:60,b:120,tau_allow:80,sigma_bearing_allow:120};
 const cases=[
  ['baseline',{},25.464790894703253,20.371832715762604,3.141592653589793,5.890486225480862,'shear','meet'],
  ['load80',{P:80},50.929581789406505,40.74366543152521,1.5707963267948966,2.945243112740431,'shear','meet'],
  ['diameter30',{d:30},42.44131815783876,56.58842421045168,1.884955592153876,2.12057504117311,'shear','meet'],
  ['thickness20',{t:20},12.732395447351626,20.371832715762604,6.283185307179586,5.890486225480862,'contact','meet'],
  ['load300',{P:300},190.9859317102744,152.78874536821954,.4188790204786391,.7853981633974483,'shear','both exceed'],
  ['stress tie',{d:40},31.830988618379067,31.830988618379067,2.5132741228718345,3.7699111843077517,'shear','meet'],
  ['reserve tie',{d:40,t:15},21.22065907891938,31.830988618379067,3.7699111843077517,3.7699111843077517,'equally','meet'],
  ['layout only',{s:80,b:160},25.464790894703253,20.371832715762604,3.141592653589793,5.890486225480862,'shear','meet'],
  ['criterion160',{tau_allow:160},25.464790894703253,20.371832715762604,6.283185307179586,5.890486225480862,'contact','meet'],
  ['shear exceeds',{P:160},101.85916357881301,81.48733086305042,.7853981633974484,1.4726215563702154,'shear','shear exceeds'],
  ['bearing exceeds',{P:250,tau_allow:160},159.15494309189532,127.32395447351627,1.0053096491487339,.942477796076938,'contact','contact exceeds']
 ];
 const near=(a,b)=>assert.ok(Math.abs(a-b)<=1e-9*Math.max(1,Math.abs(b)),`${a} != ${b}`);
 for(const [name,overrides,tau,bearing,rs,rb,control,outcome] of cases)test(`independent reference and all routes: ${name}`,()=>{
  const result=Model.evaluate(press,overrides),v={...base,...overrides};
  near(result.raw.shear,tau);near(result.raw.bearing,bearing);near(result.raw.shearReserve,rs);near(result.raw.bearingReserve,rb);
  // Independent SI-unit oracle; production evaluates in N/mm.
  near(result.raw.shear,v.P*1000/(Math.PI*(v.d/1000)*(v.t/1000))/1e6);
  near(result.raw.bearing,v.P*1000/(Math.PI*(v.d/2000)**2)/1e6);
  near(result.raw.shearUtilization,1/rs);near(result.raw.bearingUtilization,1/rb);
  near(result.raw.minReserve,Math.min(rs,rb));near(result.raw.maxUtilization,Math.max(1/rs,1/rb));
  near(result.raw.edgeGap,(v.s-v.d)/2);near(result.raw.supportContactLength,(v.b-v.s)/2);
  near(result.raw.shear/result.raw.bearing,v.d/(4*v.t));
  assert.match(result.display.press_controlling_check,new RegExp(control));
  const message=result.display.press_criteria_assessment;
  if(outcome==='meet')assert.equal(message,'Both nominal demands meet their illustrative allowable criteria.');
  if(outcome==='both exceed')assert.equal(message,'Both nominal demands exceed their illustrative allowable criteria.');
  if(outcome==='shear exceeds')assert.match(message,/shear demand exceeds.*contact pressure meets/);
  if(outcome==='contact exceeds')assert.match(message,/contact pressure exceeds.*shear demand meets/);
  const rendered=routes.render(press,null,'instructor',overrides);
  for(const [route,html] of Object.entries(rendered)){
   assert.ok(html.includes(result.display.press_punching_shear_MPa),route+' shear');
   assert.ok(html.includes(result.display.press_bearing_stress_MPa),route+' contact');
   assert.ok(html.includes(message),route+' assessment');assert.ok(!html.includes('{{'),route+' unresolved token');
   assert.ok(html.includes(Model.dimensionKey(press,overrides)),route+' dimensions');
  }
 });
 test('registry, baseline precision, preserved inputs and all 19 questions',()=>{
  assert.equal(Model.registry.length,20);assert.equal(new Set(Model.registry).size,20);
  assert.deepEqual([...press.derivedPlaceholders].sort(),[...Model.registry].sort());
  const r=Model.evaluate(press);assert.deepEqual(Object.keys(r.display).sort(),[...Model.registry].sort());
  assert.equal(r.display.press_punching_area_mm2,'1,570.80');assert.equal(r.display.press_bearing_area_mm2,'1,963.50');
  assert.equal(r.display.press_punching_shear_MPa,'25.46');assert.equal(r.display.press_bearing_stress_MPa,'20.37');
  assert.equal(r.display.press_shear_reserve,'3.14');assert.equal(r.display.press_bearing_reserve,'5.89');
  assert.equal(r.display.press_shear_utilization,'0.3183');assert.equal(r.display.press_bearing_utilization,'0.1698');
  assert.equal(r.display.press_shear_utilization_percent,'31.83');assert.equal(r.display.press_bearing_utilization_percent,'16.98');
  assert.equal(r.display.press_edge_gap_mm,'5.00');assert.equal(r.display.press_support_contact_length_mm,'30.00');
  assert.deepEqual(Object.fromEntries(press.variables.map(v=>[v.key,v.value])),base);
  assert.deepEqual(press.questions.map(q=>q.id),Array.from({length:19},(_,i)=>'q'+(i+1)));
  assert.match(press.questions[16].student,/larger numerical stress necessarily/);
  assert.match(press.questions[17].instructor,/does not automatically improve overall fixture safety/);
 });
 test('criterion boundaries and ties use raw values',()=>{
  assert.equal(Model.meets(1),true);assert.equal(Model.meets(1-1e-6),true);assert.equal(Model.meets(1+1e-6),false);
  assert.equal((1-1e-6).toFixed(4),(1+1e-6).toFixed(4));
  assert.equal(Model.compare(1,1+1e-12),0);assert.equal(Model.compare(1,1+1e-6),-1);
  assert.equal(Model.meets(Infinity),false);assert.equal(Model.meets(NaN),false);
  assert.equal(Model.evaluate(press,{d:40}).display.press_larger_stress,'both nominal stresses equally');
 });
 const invalidGeometry=[{d:60},{d:70},{s:120},{s:140},{d:250,s:10,b:20}];
 for(const values of invalidGeometry)test('reject invalid geometry '+JSON.stringify(values),()=>assert.throws(()=>Model.evaluate(press,values),/Geometry requires/));
 for(const key of Object.keys(base))test('reject invalid effective '+key,()=>{
  for(const bad of [null,undefined,'',' ',0,-1,'bad',NaN,Infinity,true,{},[]])assert.throws(()=>Model.evaluate(press,{[key]:bad}),new RegExp(key));
  const missing={...press,variables:press.variables.filter(v=>v.key!==key)};assert.throws(()=>Model.evaluate(missing),new RegExp(key));
 });
 test('ranges, units and partial overrides',()=>{
  assert.throws(()=>Model.evaluate(press,{d:251}),/assigned range/);
  assert.throws(()=>Model.evaluate({...press,variables:press.variables.map(v=>v.key==='P'?{...v,unit:'N'}:v)}),/wrong unit/);
  assert.equal(Model.evaluate(press,{P:80}).inputs.d,50);
  assert.equal(Model.evaluate(press,{P:'80'}).raw.load,80000);
 });
 test('invalid input clears direct and Builder output and blocks export assembly',async()=>{
  routes.render(press,null,'instructor');routes.direct.window.PROBLEM_CATALOG=[press];
  routes.direct.window.renderProblemPacket({slug:press.slug,type:'instructor',targetId:'target',overrides:{s:40}});
  assert.match(routes.controls.get('target').innerHTML,/role="alert"/);assert.ok(!routes.controls.get('target').innerHTML.includes('25.46'));
  routes.builder.set(press,null,{P:''});routes.builder.preview();
  assert.match(routes.controls.get('packet-preview').innerHTML,/role="alert"/);
  for(const id of ['download-student-doc','download-instructor-doc','print-student-pdf','print-instructor-pdf'])assert.equal(routes.controls.get(id).disabled,true);
  await assert.rejects(routes.builder.html('student'),/P:/);
  assert.throws(()=>routes.cli.body(press,{variables:{s:40}},'student'),/Geometry requires/);
  assert.throws(()=>routes.cli.qmd(press,{variables:{P:null}},'student',root),/P:/);
  routes.builder.set(press,null,{});routes.builder.preview();assert.equal(routes.controls.get('download-student-doc').disabled,false);
 });
 for(const type of ['student','instructor'])test('figure separation, order and content: '+type,()=>{
  const outputs=routes.render(press,null,type);
  for(const [route,text] of Object.entries(outputs)){
   assert.equal((text.match(/press-student-geometry\.png/g)||[]).length,1,route+' safe figure count');
   assert.equal(text.includes('press-instructor-reference.png'),type==='instructor',route+' instructor isolation');
   assert.ok(text.indexOf('press-student-geometry.png')<text.indexOf('Fixture function and assessment objective'),route+' geometry precedes q1');
   assert.ok(text.indexOf('Given Data')<text.indexOf('Student structural idealization'),route+' data precedes q8');
   if(type==='instructor')assert.ok(text.indexOf('press-instructor-reference.png')>text.indexOf('Analysis plan'),route+' reference follows q10');
   assert.equal((text.match(route==='qmd'?/### \d+\./g:/class="generated-question"/g)||[]).length,19,route+' question count');
   assert.equal((text.match(/Representative Instructor Answer/g)||[]).length,type==='instructor'?19:0,route+' answers');
   if(type==='student'){assert.ok(!text.includes('25.46'));assert.ok(!text.includes('1,570.80'));}
   assert.ok(text.includes('80mm')||text.includes('4535'),route+' drawing space');
  }
 });
 test('student assets are unsolved and current dimensions are separate',()=>{
  const svg=read('problems/hydraulic-press-punching-shear/assets/press-student-geometry.svg');
  for(const forbidden of ['A_s','A_b','τ','σ','25.46','1,570.80','S_z'])assert.ok(!svg.includes(forbidden),forbidden);
  const instructor=read('problems/hydraulic-press-punching-shear/assets/press-instructor-reference.svg');
  assert.match(instructor,/One cylindrical wall/);assert.match(instructor,/Contact disk/);assert.match(svg,/not to scale/);
  assert.ok(read('_quarto.yml').includes('scripts/press-fixture-model.js'));
  const p=path.join(root,'problems',press.slug,'assets');assert.ok(readFileSync(path.join(p,'press-student-geometry.png')).length>1000);assert.ok(readFileSync(path.join(p,'press-instructor-reference.png')).length>1000);
 });
 const hash=text=>createHash('sha256').update(text).digest('hex');
 const baseline=JSON.parse(read('tests/fixtures/hydraulic-unrelated-render-hashes.json'));
 assert.equal(baseline.problems.length,50);assert.equal(catalog.length,51);
 for(const previous of baseline.problems)test('unchanged unrelated package: '+previous.slug,()=>{
  const p=catalog.find(p=>p.slug===previous.slug);assert.equal(hash(JSON.stringify(p)),previous.catalogHash);
  for(const expected of previous.cases){const variant=p.variants.find(v=>v.id===expected.variant)||null;const rendered=routes.render(p,variant,expected.type);const digests=Object.fromEntries(Object.entries(rendered).map(([route,text])=>[route,hash(normalize(text,root))]));assert.equal(hash(JSON.stringify(digests)),expected.hash,expected.type+' '+expected.variant);}
 });


 test('section-a retains the baseline and all 19 questions in every route',()=>{
  assert.deepEqual(routes.render(press,press.variants.find(v=>v.id==='section-a'),'instructor'),routes.render(press,null,'instructor'));
 });
