import test from 'node:test';
import assert from 'node:assert/strict';
import path from 'node:path';
import {readFileSync,mkdtempSync,mkdirSync,writeFileSync,cpSync} from 'node:fs';
import {tmpdir} from 'node:os';
import {fileURLToPath} from 'node:url';
import {spawnSync} from 'node:child_process';
import {createHash} from 'node:crypto';
import Model from '../scripts/jib-crane-model.js';
import Packet from '../scripts/jib-crane-packet.js';
import Press from '../scripts/press-fixture-model.js';
import {loadRoutes,normalize} from './helpers/packet-harness.mjs';
const root=path.resolve(fileURLToPath(new URL('../',import.meta.url)));
const read=p=>readFileSync(path.join(root,p),'utf8');
const catalog=JSON.parse(read('data/problem-catalog.json')),problem=catalog.find(p=>p.id==='MOS-JIB-001');
const base=Object.fromEntries(problem.variables.map(v=>[v.key,v.value]));
const sources={direct:read('scripts/packet-renderer.js'),builder:read('instructor-builder.qmd'),cli:read('scripts/render-assignment.mjs')};
const routes=loadRoutes(root,sources,Press);
const fixedData={"refs":[{"id":"R01","overrides":{},"expected":[{"F":14267.38788654053,"vD":2.156651504121321,"MC":-4264.5,"MD":150},{"F":14594.284160719486,"vD":2.3012608530394805,"MC":-4564.5,"MD":-150}]},{"id":"R02","overrides":{"H":0},"expected":[{"F":14430.836023630007,"vD":2.2289561785804004,"MC":-4414.5,"MD":0},{"F":14430.836023630007,"vD":2.2289561785804004,"MC":-4414.5,"MD":0}]},{"id":"R03","overrides":{"L":3,"Lb":2,"theta":42,"M":520,"H":650,"e_H":0.25,"gamma_d":1.3,"S_boom":110000,"I_boom":12000000,"E":200000,"A_brace":780,"d_pin":24,"t_plate":14,"sigma_y":250,"N_y":2,"delta_allow":12,"K_brace":1,"r_min":32,"I_brace":1800000,"N_b":2,"n_s":2,"tau_allow":80,"bearing_allow":150},"expected":[{"F":14744.640143853716,"vD":3.2543822422840414,"MC":-6469.0599999999995,"MD":162.5},{"F":14987.492583206715,"vD":3.4217602817982917,"MC":-6794.0599999999995,"MD":-162.5}]},{"id":"R04","overrides":{"n_s":2},"expected":[{"F":14267.38788654053,"vD":2.156651504121321,"MC":-4264.5,"MD":150},{"F":14594.284160719486,"vD":2.3012608530394805,"MC":-4564.5,"MD":-150}]},{"id":"R05","overrides":{"theta":75},"expected":[{"F":8472.117917624639,"vD":2.221680381971195,"MC":-4264.5,"MD":150},{"F":8666.23220145153,"vD":2.3677796811207648,"MC":-4564.5,"MD":-150}]},{"id":"R06","overrides":{"Lb":2.3},"expected":[{"F":9925.139399332544,"vD":0.4087474657826067,"MC":-401.8125000000005,"MD":150},{"F":10152.545503109208,"vD":0.4320946343394852,"MC":-701.8124999999992,"MD":-150}]},{"id":"R07","overrides":{"L":2.1},"expected":[{"F":12463.533383586779,"vD":0.9619937928974537,"MC":-2609.0625,"MD":150},{"F":12790.429657765735,"vD":1.0423505026126083,"MC":-2909.0625,"MD":-150}]},{"id":"R08","overrides":{"Lb":2.4},"expected":[{"F":9511.591924360353,"vD":0.3737362968651943,"MC":150,"MD":150},{"F":9729.52277381299,"vD":0.38229939222239884,"MC":-150,"MD":-150}]},{"id":"R09","overrides":{"L":0.5,"Lb":0.3,"M":100,"gamma_d":1,"H":3000,"e_H":1.5},"expected":[{"F":-23301.166423475974,"vD":-0.2927782431993793,"MC":4303.8,"MD":4500},{"F":29002.237445156967,"vD":0.3471412305432031,"MC":-4696.2,"MD":-4500}]},{"id":"R10","overrides":{"M":100,"gamma_d":1,"H":0,"A_brace":150,"theta":15,"I_boom":15000000,"S_boom":150000},"expected":[{"F":5685.439413537457,"vD":1.9867646123319858,"MC":-784.8,"MD":0},{"F":5685.439413537457,"vD":1.9867646123319858,"MC":-784.8,"MD":0}]},{"id":"R11","overrides":{"L":0.5,"Lb":0.3,"M":100,"gamma_d":1,"H":981,"e_H":0.5},"expected":[{"F":0,"vD":-0.0076941176470588235,"MC":294.3,"MD":490.5},{"F":5701.07102168099,"vD":0.062057104990882656,"MC":-686.7,"MD":-490.5}]},{"id":"R12","overrides":{"L":0.5,"Lb":0.3,"M":100,"gamma_d":1,"H":1000,"e_H":0.4},"expected":[{"F":525.939783345698,"vD":-0.0012593718277584109,"MC":203.79999999999998,"MD":400},{"F":5175.131238335292,"vD":0.055622359171582245,"MC":-596.2,"MD":-400}]},{"id":"R13","overrides":{"L":0.5,"Lb":0.3,"M":100,"gamma_d":1,"H":981,"e_H":0.1},"expected":[{"F":2280.4284086723965,"vD":0.02020637140811777,"MC":-98.1,"MD":98.10000000000001},{"F":3420.6426130085943,"vD":0.03415661593570606,"MC":-294.3,"MD":-98.10000000000001}]},{"id":"R14","overrides":{"e_H":0},"expected":[{"F":14430.836023630007,"vD":2.2289561785804004,"MC":-4414.5,"MD":0},{"F":14430.836023630007,"vD":2.2289561785804004,"MC":-4414.5,"MD":0}]},{"id":"R15","overrides":{"L":2.1,"delta_allow":1.0423494602631482},"expected":[{"F":12463.533383586779,"vD":0.9619937928974537,"MC":-2609.0625,"MD":150},{"F":12790.429657765735,"vD":1.0423505026126083,"MC":-2909.0625,"MD":-150}]}],"sharedKeys":["weight_N","P_design_N","a_m","wall_spacing_m","brace_length_m","vertical_load_moment_Nm","offset_couple_magnitude_Nm","pin_area_mm2","pin_shear_area_mm2","bearing_area_mm2","yield_criterion_MPa","r_from_I_mm","implied_I_from_reported_r_mm4","formal_slenderness_I","formal_slenderness_reported_r","formal_Euler_N","formal_Euler_stress_MPa","formal_Euler_divided_reference_N","brace_yield_load_reference_N","boom_outer_fiber_mm","fixed_cantilever_comparison_moment_Nm","fixed_cantilever_comparison_stress_MPa","fixed_cantilever_comparison_deflection_mm"],"caseKeys":["Hx_N","Ce_Nm","required_brace_moment_Nm","brace_vertical_N","brace_force_N","brace_horizontal_N","wall_pin_x_N","wall_pin_y_N","boom_axial_AC_N","boom_axial_CD_N","boom_moment_C_Nm","boom_moment_D_Nm","boom_max_moment_Nm","boom_bending_MPa","brace_axial_signed_MPa","brace_axial_magnitude_MPa","brace_extension_mm","C_down_mm","tip_bending_mm","tip_brace_mm","tip_down_mm","pin_shear_MPa","bearing_MPa","boom_bending_utilization","tip_displacement_utilization","brace_axial_utilization","pin_shear_utilization","bearing_utilization"]};
const modes=['boom_bending','tip_displacement','brace_axial','pin_shear','bearing'];
let referenceComparisons=0;
const near=(a,b,abs=1e-9,rel=1e-10)=>assert.ok(Number.isFinite(a)&&Math.abs(a-b)<=abs+rel*Math.abs(b),a+' != '+b);
const refNear=(a,b,abs=1e-9)=>{near(a,b,abs);referenceComparisons++;};
function solve(matrix,rhs){
 const A=matrix.map((row,i)=>[...row,rhs[i]]),n=A.length;
 for(let k=0;k<n;k++){
  let p=k;for(let i=k+1;i<n;i++)if(Math.abs(A[i][k])>Math.abs(A[p][k]))p=i;
  [A[k],A[p]]=[A[p],A[k]];const pivot=A[k][k];assert.notEqual(pivot,0);
  for(let j=k;j<=n;j++)A[k][j]/=pivot;
  for(let i=0;i<n;i++)if(i!==k){const f=A[i][k];for(let j=k;j<=n;j++)A[i][j]-=f*A[k][j];}
 }
 return A.map(row=>row[n]);
}
// Independent SI-unit beam-element solution; no production closed form is used.
function oracle(v,s){
 const L=v.L,a=v.Lb,t=v.theta*Math.PI/180,sn=Math.sin(t),cs=Math.cos(t),ell=a/cs,E=v.E*1e6,I=v.I_boom*1e-12,A=v.A_brace*1e-6;
 const P=v.gamma_d*v.M*9.81,Hx=s*v.H,Ce=Hx*v.e_H,xs=a<L?[0,a,L]:[0,L],n=2*xs.length,c=1,d=xs.length-1;
 const K=Array.from({length:n},()=>Array(n).fill(0));
 for(let i=0;i<xs.length-1;i++){
  const b=xs[i+1]-xs[i],raw=[[12,6*b,-12,6*b],[6*b,4*b*b,-6*b,2*b*b],[-12,-6*b,12,-6*b],[6*b,2*b*b,-6*b,4*b*b]],ix=[2*i,2*i+1,2*i+2,2*i+3];
  for(let r=0;r<4;r++)for(let q=0;q<4;q++)K[ix[r]][ix[q]]+=E*I/b**3*raw[r][q];
 }
 const k=E*A*sn**2/ell;K[2*c][2*c]+=k;const load=Array(n).fill(0);load[2*d]=P;load[2*d+1]=-Ce;
 const disp=[0,...solve(K.slice(1).map(row=>row.slice(1)),load.slice(1))],Rc=k*disp[2*c],F=Rc/sn,Cx=F*cs,Ay=P-Rc,Ax=-Cx-Hx,MC=Ay*a,Mmax=Math.max(Math.abs(MC),Math.abs(Ce));
 const simpson=(fn,l,r)=>(r-l)*(fn(l)+4*fn((l+r)/2)+fn(r))/6;
 const bend=simpson(x=>Ay*x*(-(L-a)*x/a)/(E*I),0,a)+(a<L?simpson(x=>(-P*(L-x)+Ce)*(-(L-x))/(E*I),a,L):0);
 const brace=F*ell/(E*A)*L/(a*sn),tip=(bend+brace)*1000,pinArea=Math.PI*(v.d_pin/1000)**2/4,bearingArea=v.t_plate*v.d_pin/1e6,criterion=v.sigma_y/v.N_y;
 const result={Hx_N:Hx,Ce_Nm:Ce,required_brace_moment_Nm:P*L-Ce,brace_vertical_N:Rc,brace_force_N:F,brace_horizontal_N:Cx,wall_pin_x_N:Ax,wall_pin_y_N:Ay,boom_axial_AC_N:Cx+Hx,boom_axial_CD_N:Hx,boom_moment_C_Nm:MC,boom_moment_D_Nm:Ce,boom_max_moment_Nm:Mmax,boom_bending_MPa:Mmax/(v.S_boom*1e-9)/1e6,brace_axial_signed_MPa:-F/A/1e6,brace_axial_magnitude_MPa:Math.abs(F)/A/1e6,brace_extension_mm:-F*ell/(E*A)*1000,C_down_mm:disp[2*c]*1000,tip_bending_mm:bend*1000,tip_brace_mm:brace*1000,tip_down_mm:tip,pin_shear_MPa:Math.abs(F)/(v.n_s*pinArea)/1e6,bearing_MPa:Math.abs(F)/bearingArea/1e6};
 result.boom_bending_utilization=result.boom_bending_MPa/criterion;result.tip_displacement_utilization=Math.abs(tip)/v.delta_allow;result.brace_axial_utilization=result.brace_axial_magnitude_MPa/criterion;result.pin_shear_utilization=result.pin_shear_MPa/v.tau_allow;result.bearing_utilization=result.bearing_MPa/v.bearing_allow;
 return {result,feTip:disp[2*d]*1000,feForce:F};
}
for(const ref of fixedData.refs)test('independent signed reference '+ref.id,()=>{
 const v={...base,...ref.overrides},actual=Model.evaluate(problem,ref.overrides);
 for(const [index,name,s] of [[0,'right',1],[1,'left',-1]]){
  const expected=ref.expected[index],c=actual.cases[name],o=oracle(v,s);
  refNear(c.brace_force_N,expected.F,1e-6);refNear(c.tip_down_mm,expected.vD,1e-9);refNear(c.boom_moment_C_Nm,expected.MC,1e-7);refNear(c.boom_moment_D_Nm,expected.MD,1e-7);
  for(const k of fixedData.caseKeys)refNear(c[k],o.result[k],Math.abs(c[k])>100?1e-6:1e-9);
  refNear(c.tip_down_mm,o.feTip,1e-9);refNear(c.brace_force_N,o.feForce,1e-6);
  for(const r of Object.values(c.residuals))near(r,0,1e-6);
  assert.equal(c.brace_action,c.brace_force_N>0?'compression':c.brace_force_N<0?'tension':'zero axial force');
  assert.equal(c.tip_direction,c.tip_down_mm>0?'downward':c.tip_down_mm<0?'upward':'zero vertical movement');
  assert.equal(Object.values(c).some(x=>typeof x==='number'&&!Number.isFinite(x)),false);
 }
});
test('all 104 keys, 85 numeric results and 19 text outputs; retired outputs absent',()=>{
 const expected=[...fixedData.sharedKeys,...['right','left'].flatMap(c=>fixedData.caseKeys.map(k=>c+'_'+k)),...modes.map(k=>'env_'+k+'_utilization'),'env_governing_utilization',...['right','left'].flatMap(c=>['brace_action','moment_locations','tip_direction'].map(k=>c+'_'+k)),...modes.map(k=>'env_'+k+'_cases'),'env_governing_modes','env_governing_cases','nominal_criteria_status','compression_stability_status','assessment_text','section_axis_note','formal_Euler_note','model_scope_note'];
 assert.equal(expected.length,104);assert.deepEqual([...Model.registry].sort(),expected.sort());assert.deepEqual([...problem.derivedPlaceholders].sort(),expected);
 const r=Model.evaluate(problem);assert.equal(Object.keys(r.raw).length,85);assert.equal(Object.keys(r.display).length,104);assert.equal(Object.values(r.display).filter(x=>typeof x==='string').length,104);
 for(const k of ['brace_buckling_utilization','brace_buckling_allow_N','tip_deflection_mm','governing_support_moment_Nm','boom_yield_margin'])assert.equal(k in r.display,false);
 assert.equal(r.display.right_tip_down_mm,'2.157');assert.equal(r.display.left_tip_down_mm,'2.301');assert.equal(r.display.formal_Euler_stress_MPa,'955.18');
 assert.equal(r.display.env_governing_utilization,'0.5807');assert.equal(r.display.env_governing_modes,'nominal pin shear');assert.equal(r.display.nominal_criteria_status,'met');assert.equal(r.display.compression_stability_status,'unvalidated');
 near(r.shared.r_from_I_mm,42.966892442365975);near(r.shared.formal_Euler_N,620869.1209180121,1e-6);
});
test('retained assigned baseline and exam values and 12 selections',()=>{
 assert.equal(problem.variables.length,23);assert.equal(problem.questions.length,12);
 assert.deepEqual(base,{L:2.4,Lb:1.6,theta:35,M:450,H:500,e_H:.3,gamma_d:1.25,S_boom:85000,I_boom:8500000,E:200000,A_brace:650,d_pin:20,t_plate:12,sigma_y:250,N_y:2,delta_allow:10,K_brace:1,r_min:28,I_brace:1200000,N_b:2,n_s:1,tau_allow:80,bearing_allow:150});
 assert.deepEqual(problem.questions.map(q=>q.id),['q1','q2','q3','q4','q5','q6','idealization','q7','q8','q9','q10','q11']);
 assert.deepEqual(problem.questions.map(q=>q.displayNumber),['Q1','Q2','Q3','Q4','Q5','Q6','I1','M1','M2','M3','M4','M5']);
 for(const name of ['section-a','exam-version'])assert.deepEqual(problem.variants.find(v=>v.id===name).selectedQuestions,['idealization','q7','q8','q9','q10','q11']);
 assert.deepEqual(problem.variants.find(v=>v.id==='exam-version').variables,fixedData.refs.find(r=>r.id==='R03').overrides);
 assert.match(read('problems/jib-crane-battery-pack/index.qmd'),/status: "Published"/);
});
for(const [name,overrides] of Object.entries({E0:{E:0},M0:{M:0},theta0:{theta:0},area0:{A_brace:0},beyond:{L:1.2},text:{H:'bad'},null:{M:null},blank:{H:''},space:{H:'  '},bool:{H:false},array:{H:[]},object:{H:{}},nan:{H:NaN},infinite:{H:Infinity},units:{H:'500 N'},comma:{H:'1,000'},hex:{H:'0x10'},unknown:{a:1.6},fraction:{n_s:1.5},planes0:{n_s:0},planes3:{n_s:3},negative:{H:-1},undefined:{M:undefined}}))test('invalid effective input blocks answers: '+name,()=>{
 assert.throws(()=>Model.evaluate(problem,overrides),Model.JibInputError);
 assert.throws(()=>Packet.renderHtml(problem,overrides,'instructor'),Model.JibInputError);
 assert.throws(()=>Packet.renderQmd(problem,overrides,'student'),Model.JibInputError);
 routes.builder.set(problem,null,overrides);routes.builder.preview();assert.match(routes.controls.get('packet-preview').innerHTML,/role="alert"/);
 for(const id of ['download-student-doc','download-instructor-doc','print-student-pdf','print-instructor-pdf'])assert.equal(routes.controls.get(id).disabled,true);
});
for(const v of problem.variables)for(const edge of ['min','max'])test('declared endpoint '+v.key+' '+edge,()=>{
 const overrides={[v.key]:v[edge]};if(v.key==='L'&&v.min<base.Lb)overrides.Lb=.3;
 if(v.key==='Lb'&&v.max>base.L)overrides.L=6;
 assert.equal(Model.evaluate(problem,overrides).status,'valid');
 assert.throws(()=>Model.evaluate(problem,{...overrides,[v.key]:v[edge]+(edge==='min'?-1:1)}),Model.JibInputError);
});
test('omitted overrides, intentional zeros, numeric strings and invalid-to-valid recovery',()=>{
 assert.deepEqual(Model.resolve(problem,{}),base);assert.equal(Model.resolve(problem,{H:0,e_H:0}).H,0);assert.equal(Model.resolve(problem,{H:' 5e2 '}).H,500);
 routes.builder.set(problem,null,{E:0});routes.builder.preview();routes.builder.set(problem,null,{});routes.builder.preview();
 assert.doesNotMatch(routes.controls.get('packet-preview').innerHTML,/role="alert"/);for(const id of ['download-student-doc','download-instructor-doc','print-student-pdf','print-instructor-pdf'])assert.equal(routes.controls.get(id).disabled,false);
});
test('formal sensitivity never changes eligible ranking or physical status',()=>{
 const a=Model.evaluate(problem),b=Model.evaluate(problem,{K_brace:.5,N_b:3,r_min:42.966892442365975});
 near(b.shared.formal_Euler_N,a.shared.formal_Euler_N*4,1e-6);assert.equal(b.display.env_governing_utilization,a.display.env_governing_utilization);assert.equal(b.display.compression_stability_status,'unvalidated');
 const weak=Model.evaluate(problem,{I_brace:509600});near(weak.shared.r_from_I_mm,28);near(weak.shared.formal_Euler_N,263662.4200165158,1e-6);
 assert.equal(Model.evaluate(problem,{theta:75}).display.compression_stability_status,'unvalidated');
 assert.match(Model.evaluate(problem,{theta:75}).display.formal_Euler_note,/does not exceed/);
});
test('double shear changes only pin demands among applicable stresses',()=>{
 const a=Model.evaluate(problem),b=Model.evaluate(problem,{n_s:2});for(const n of ['right','left']){near(b.cases[n].pin_shear_MPa,a.cases[n].pin_shear_MPa/2);near(b.cases[n].bearing_MPa,a.cases[n].bearing_MPa);near(b.cases[n].tip_down_mm,a.cases[n].tip_down_mm);}
});
test('raw exact boundary, nearby false pass and criterion ties',()=>{
 const limit=1.0423505026126083;
 const equal=Model.evaluate(problem,{L:2.1,delta_allow:limit});assert.equal(equal.envelope.nominal_criteria_status,'met');near(equal.cases.left.tip_displacement_utilization,1);
 const fail=Model.evaluate(problem,{L:2.1,delta_allow:limit/1.000001});assert.equal(fail.display.left_tip_displacement_utilization,'1.0000');assert.equal(fail.envelope.nominal_criteria_status,'exceeded');
 assert.equal(Model.evaluate(problem,{L:2.1,delta_allow:limit*1.000001}).envelope.nominal_criteria_status,'met');
 const tie=Model.evaluate(problem,{bearing_allow:104.71975511965978});assert.match(tie.display.env_governing_modes,/pin shear and nominal main-lug bearing/);
});
test('zero, tension, endpoint and governing-location narratives',()=>{
 const z=Model.evaluate(problem,{L:.5,Lb:.5,M:100,gamma_d:1,H:981,e_H:.5});assert.equal(z.cases.right.brace_force_N,0);assert.equal(z.cases.right.tip_down_mm,0);assert.equal(z.display.right_tip_direction,'zero vertical movement');
 const straight=Model.evaluate(problem,{Lb:2.4,H:0});assert.equal(straight.cases.right.moment_locations,'zero bending throughout');
 const reverse=Model.evaluate(problem,fixedData.refs.find(r=>r.id==='R09').overrides);assert.equal(reverse.cases.right.brace_action,'tension');assert.equal(reverse.cases.right.tip_direction,'upward');assert.equal(reverse.cases.right.moment_locations,'D');
 assert.equal(Model.evaluate(problem,fixedData.refs.find(r=>r.id==='R13').overrides).cases.right.moment_locations,'C and D');
 assert.equal(Model.evaluate(problem,{Lb:2.4}).cases.right.moment_locations,'C = D');
 const zeroH=Model.evaluate(problem,{H:0});assert.equal(zeroH.display.env_pin_shear_cases,'rightward and leftward');
});
test('component superposition and no universal cantilever conservatism',()=>{
 const r=Model.evaluate(problem),area=Model.evaluate(problem,{A_brace:1300}),I=Model.evaluate(problem,{I_boom:17000000});
 near(area.cases.right.tip_brace_mm,r.cases.right.tip_brace_mm/2);near(I.cases.right.tip_bending_mm,r.cases.right.tip_bending_mm/2);
 const soft=Model.evaluate(problem,fixedData.refs.find(r=>r.id==='R10').overrides);assert.ok(soft.cases.right.tip_down_mm>soft.shared.fixed_cantilever_comparison_deflection_mm);
});
for(const variant of [null,...problem.variants])for(const type of ['student','instructor'])test('all routes, question order and audience: '+(variant?.id||'default')+' '+type,()=>{
 const rendered=routes.render(problem,variant,type),count=variant?.selectedQuestions?.length||12,result=Model.evaluate(problem,variant?.variables||{});
 for(const [route,text] of Object.entries(rendered)){
  assert.ok(!text.includes('{{'),route+' unresolved token');
  assert.equal((text.match(/Representative Instructor Answer/g)||[]).length,type==='instructor'?count:0,route);
  assert.equal((text.match(/jib-crane-instructor-free-bodies\.png/g)||[]).length,type==='instructor'?1:0,route);
  assert.equal((text.match(/jib-crane-student-common-model\.png/g)||[]).length,1,route);
  const i=text.indexOf('Independent idealization'),b=text.indexOf('Common model and assigned data'),a=text.indexOf('Numerical analysis and bounded assessment');assert.ok(i<b&&b<a,route+' phase order');
  assert.match(text,/Supplied symbolic displacement method/);assert.match(text,/not to scale/);assert.match(text,/Historical diagonal L_b/);
  if(type==='instructor'){assert.ok(text.includes(result.display.env_governing_utilization));assert.ok(text.includes('Physical compression resistance is unvalidated.'));}
  else{assert.doesNotMatch(text,/answer-block|jib-instructor-reference|env_governing|955\.18|14,594\.28|2\.301/);}
 }
 for(const route of ['direct','builder','cli'])assert.equal((rendered[route].match(/class="generated-question"/g)||[]).length,count);
 assert.equal((rendered.qmd.match(/data-jib-question=/g)||[]).length,count);
 assert.match(rendered.qmd,/w:line="4535"/);assert.match(rendered.qmd,/\$\$\n/);
});
test('actual direct source uses shared native helper without answer-bearing catalog scripts',()=>{
 for(const name of ['student-packet.qmd','instructor-guide.qmd']){const s=read('problems/jib-crane-battery-pack/'+name);assert.match(s,/jib-crane-direct.lua/);assert.doesNotMatch(s,/problem-catalog.js|jupyter/);}
 assert.match(read('scripts/jib-crane-direct.lua'),/packet.renderQmd/);
 assert.doesNotMatch(read('problems/jib-crane-battery-pack/_student-problem.qmd'),/Question [1-6]|# Q[1-6]/);
});
test('50 unrelated catalog entries preserve exact committed content; 51 unique packages',()=>{
 const baselines=new Map([...JSON.parse(read('tests/fixtures/platform-unrelated-render-hashes.json')).problems,...JSON.parse(read('tests/fixtures/hydraulic-unrelated-render-hashes.json')).problems].map(p=>[p.slug,p.catalogHash]));
 assert.equal(catalog.length,51);assert.equal(new Set(catalog.map(p=>p.id)).size,51);
 for(const p of catalog.filter(p=>p.id!=='MOS-JIB-001'))assert.equal(createHash('sha256').update(JSON.stringify(p)).digest('hex'),baselines.get(p.slug),p.slug);
});
test('reference comparison count',t=>{assert.equal(referenceComparisons,1020);t.diagnostic('15 independent input sets x 2 signed cases; 1020 constant/SI/stiffness numerical comparisons');});

test('independent complete shared baseline and display precision',()=>{
 const expected=[["weight_N",4414.5,"N",2],["P_design_N",5518.125,"N",3],["a_m",1.6,"m",3],["wall_spacing_m",1.1203320611355354,"m",4],["brace_length_m",1.9532393420183296,"m",4],["vertical_load_moment_Nm",13243.5,"N m",2],["offset_couple_magnitude_Nm",150,"N m",2],["pin_area_mm2",314.1592653589793,"mm2",2],["pin_shear_area_mm2",314.1592653589793,"mm2",2],["bearing_area_mm2",240,"mm2",2],["yield_criterion_MPa",125,"MPa",2],["r_from_I_mm",42.966892442365975,"mm",4],["implied_I_from_reported_r_mm4",509600,"mm4",2],["formal_slenderness_I",45.459171724795425,"1",4],["formal_slenderness_reported_r",69.75854792922605,"1",4],["formal_Euler_N",620869.1209180121,"N",2],["formal_Euler_stress_MPa",955.1832629507878,"MPa",2],["formal_Euler_divided_reference_N",310434.56045900605,"N",2],["brace_yield_load_reference_N",162500,"N",2],["boom_outer_fiber_mm",100,"mm",2],["fixed_cantilever_comparison_moment_Nm",13243.5,"N m",2],["fixed_cantilever_comparison_stress_MPa",155.80588235294118,"MPa",2],["fixed_cantilever_comparison_deflection_mm",14.957364705882354,"mm",3]],r=Model.evaluate(problem);
 for(const [key,value,unit,dp] of expected){
  near(r.shared[key],value,Math.abs(value)>1000?1e-6:1e-9);
  assert.equal(Model.precision[key],dp);
  const parts=value.toFixed(dp).split('.');
  const display=parts[0].replace(/\B(?=(\d{3})+(?!\d))/g,',')+(parts.length>1?'.'+parts[1]:'');
  assert.equal(r.display[key],display,key);
 }
});
for(const ref of fixedData.refs)for(const type of ['student','instructor'])test('changed-input route agreement '+ref.id+' '+type,()=>{
 const rendered=routes.render(problem,null,type,ref.overrides),r=Model.evaluate(problem,ref.overrides);
 for(const [route,s] of Object.entries(rendered)){
  assert.ok(!s.includes('{{'),route);
  if(type==='instructor'){
   for(const k of ['right_brace_force_N','left_brace_force_N','right_tip_down_mm','left_tip_down_mm','env_governing_utilization'])assert.ok(s.includes(r.display[k]),route+' '+k);
   assert.ok(s.includes(r.display.right_brace_action));assert.ok(s.includes(r.display.right_tip_direction));assert.ok(s.includes(r.display.compression_stability_status));
  }else assert.doesNotMatch(s,/answer-block|jib-instructor-reference|jib-crane-instructor-free-bodies/);
 }
});
test('catalog validation and CLI invalid-state checks occur before output creation',()=>{
 const scratchParent=path.join(root,'exports/jib-review');mkdirSync(scratchParent,{recursive:true});const scratch=mkdtempSync(path.join(scratchParent,'config-test-'));
 mkdirSync(path.join(scratch,'scripts'));
 for(const file of ['build-catalog.mjs','render-assignment.mjs','press-fixture-model.js','platform-model.js','platform-packet.js','jib-crane-model.js','jib-crane-packet.js'])cpSync(path.join(root,'scripts',file),path.join(scratch,'scripts',file));
 const packageRoot=path.join(scratch,'problems',problem.slug);mkdirSync(path.join(packageRoot,'variants'),{recursive:true});mkdirSync(path.join(packageRoot,'assets'));
 const meta=JSON.parse(read('problems/'+problem.slug+'/problem.json'));
 const json=(p,o)=>writeFileSync(p,JSON.stringify(o));
 json(path.join(packageRoot,'problem.json'),meta);json(path.join(packageRoot,'questions.json'),problem.questions);
 for(const file of ['index.qmd','student-packet.qmd','instructor-guide.qmd'])writeFileSync(path.join(packageRoot,file),'');
 for(const file of [meta.image,meta.idealizedImage,...meta.supplementaryImages.map(i=>i.path)])writeFileSync(path.join(packageRoot,file),'');
 const run=(script,args=[])=>spawnSync(process.execPath,[path.join(scratch,'scripts',script),...args],{encoding:'utf8',maxBuffer:32*1024*1024});
 json(path.join(packageRoot,'variables.json'),problem.variables.map(v=>v.key==='Lb'?{...v,value:3}:v));
 let res=run('build-catalog.mjs');assert.notEqual(res.status,0);assert.match(res.stderr,/Geometry/);
 json(path.join(packageRoot,'variables.json'),problem.variables);json(path.join(packageRoot,'variants','invalid.json'),{id:'invalid',title:'Invalid',variables:{E:null}});
 res=run('build-catalog.mjs');assert.notEqual(res.status,0);assert.match(res.stderr,/E:/);
 json(path.join(packageRoot,'variants','invalid.json'),{id:'valid',title:'Valid',variables:{Lb:2.4}});
 res=run('build-catalog.mjs');assert.equal(res.status,0,res.stderr);
 json(path.join(scratch,'data','problem-catalog.json'),[{...problem,variants:[{id:'bad',variables:{Lb:3}}]}]);
 for(const format of ['html','qmd','docx','pdf']){
  res=run('render-assignment.mjs',['--problem',problem.slug,'--variant','bad','--format',format]);assert.notEqual(res.status,0);assert.match(res.stderr,/Geometry/);
  assert.equal(spawnSync(process.execPath,['-e',"process.exit(require('fs').existsSync(process.argv[1])?1:0)",path.join(scratch,'exports')]).status,0);
 }
});

test('conceptual material and critical-section answers update with effective inputs',()=>{
 const result=routes.render(problem,null,'instructor',{E:210000,sigma_y:550,L:.5,Lb:.3,M:100,gamma_d:1,H:1000,e_H:.4});
 for(const [route,text] of Object.entries(result)){
  assert.match(text,/E = 210000 MPa/);assert.doesNotMatch(text,/E = 200 GPa/);
  assert.ok(text.includes('rightward maximum at D'),route);
 }
});

test('general instructor background is retained only in instructor packets',()=>{
 for(const [route,text] of Object.entries(routes.render(problem,null,'instructor')))assert.ok(text.includes('Component materials.'),route);
 for(const [route,text] of Object.entries(routes.render(problem,null,'student')))assert.ok(!text.includes('Component materials.'),route);
});
