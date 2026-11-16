// MOS-JIB-001 only: assigned pinned-boom / bilateral axial-brace model.
(function(root,factory){
  if(typeof module==='object'&&module.exports)module.exports=factory();
  else root.JibCraneModel=factory();
}(typeof window!=='undefined'?window:globalThis,function(){
  'use strict';
  const id='MOS-JIB-001',slug='jib-crane-battery-pack';
  const units={L:'m',Lb:'m',theta:'deg',M:'kg',H:'N',e_H:'m',gamma_d:'-',S_boom:'mm^3',I_boom:'mm^4',E:'MPa',A_brace:'mm^2',d_pin:'mm',t_plate:'mm',sigma_y:'MPa',N_y:'-',delta_allow:'mm',K_brace:'-',r_min:'mm',I_brace:'mm^4',N_b:'-',n_s:'-',tau_allow:'MPa',bearing_allow:'MPa'};
  const sharedPrecision={weight_N:2,P_design_N:3,a_m:3,wall_spacing_m:4,brace_length_m:4,vertical_load_moment_Nm:2,offset_couple_magnitude_Nm:2,pin_area_mm2:2,pin_shear_area_mm2:2,bearing_area_mm2:2,yield_criterion_MPa:2,r_from_I_mm:4,implied_I_from_reported_r_mm4:2,formal_slenderness_I:4,formal_slenderness_reported_r:4,formal_Euler_N:2,formal_Euler_stress_MPa:2,formal_Euler_divided_reference_N:2,brace_yield_load_reference_N:2,boom_outer_fiber_mm:2,fixed_cantilever_comparison_moment_Nm:2,fixed_cantilever_comparison_stress_MPa:2,fixed_cantilever_comparison_deflection_mm:3};
  const casePrecision={Hx_N:2,Ce_Nm:2,required_brace_moment_Nm:2,brace_vertical_N:2,brace_force_N:2,brace_horizontal_N:2,wall_pin_x_N:2,wall_pin_y_N:2,boom_axial_AC_N:2,boom_axial_CD_N:2,boom_moment_C_Nm:2,boom_moment_D_Nm:2,boom_max_moment_Nm:2,boom_bending_MPa:2,brace_axial_signed_MPa:2,brace_axial_magnitude_MPa:2,brace_extension_mm:4,C_down_mm:4,tip_bending_mm:3,tip_brace_mm:3,tip_down_mm:3,pin_shear_MPa:2,bearing_MPa:2,boom_bending_utilization:4,tip_displacement_utilization:4,brace_axial_utilization:4,pin_shear_utilization:4,bearing_utilization:4};
  const modes=['boom_bending','tip_displacement','brace_axial','pin_shear','bearing'];
  const modeNames={boom_bending:'nominal boom bending',tip_displacement:'absolute braced tip movement',brace_axial:'nominal brace axial stress',pin_shear:'nominal pin shear',bearing:'nominal main-lug bearing'};
  const caseNames=['right','left'],label={right:'rightward',left:'leftward'};
  const caseText=['brace_action','moment_locations','tip_direction'];
  const envelopeText=['env_boom_bending_cases','env_tip_displacement_cases','env_brace_axial_cases','env_pin_shear_cases','env_bearing_cases','env_governing_modes','env_governing_cases','nominal_criteria_status','compression_stability_status','assessment_text','section_axis_note','formal_Euler_note','model_scope_note'];
  const precision={...sharedPrecision};
  for(const c of caseNames)for(const [k,dp] of Object.entries(casePrecision))precision[c+'_'+k]=dp;
  for(const k of modes)precision['env_'+k+'_utilization']=4;
  precision.env_governing_utilization=4;
  const registry=[...Object.keys(precision),...caseNames.flatMap(c=>caseText.map(k=>c+'_'+k)),...envelopeText];
  const own=(o,k)=>Object.prototype.hasOwnProperty.call(o,k);
  const isJib=problem=>problem?.id===id;
  class JibInputError extends Error{
    constructor(message,code='input',details={}){super(message);this.name='JibInputError';this.code=code;this.details=details;}
  }
  const fail=(message,code,details)=>{throw new JibInputError(message,code,details);};
  function number(value,key){
    if(typeof value!=='number'&&typeof value!=='string')fail(key+': enter a finite base-ten number.');
    if(typeof value==='string'&&!/^[+-]?(?:\d+(?:\.\d*)?|\.\d+)(?:[eE][+-]?\d+)?$/.test(value.trim()))fail(key+': enter a full base-ten number without units or commas.');
    const n=Number(value);
    if(!Number.isFinite(n))fail(key+': enter a finite number.');
    return n;
  }
  function resolve(problem,overrides={}){
    if(!isJib(problem)||problem.slug!==slug)fail('Jib ID/slug does not match MOS-JIB-001.','schema');
    if(!overrides||typeof overrides!=='object'||Array.isArray(overrides))fail('Overrides must be a keyed object.','schema');
    for(const k of Object.keys(overrides))if(!own(units,k))fail(k+': unknown jib override; Lb is horizontal a.','schema');
    if(!Array.isArray(problem.variables)||problem.variables.length!==23)fail('Exactly 23 assigned inputs are required.','schema');
    const inputs={};
    for(const [k,u] of Object.entries(units)){
      const vs=problem.variables.filter(v=>v?.key===k);
      if(vs.length!==1||vs[0].unit!==u)fail(k+': missing unique input or wrong unit.','schema');
      const v=vs[0];
      if(!Number.isFinite(v.min)||!Number.isFinite(v.max)||v.max<v.min||!Number.isFinite(v.step)||v.step<=0)fail(k+': invalid range/step metadata.','schema');
      const n=number(own(overrides,k)?overrides[k]:v.value,k);
      if((['H','e_H'].includes(k)?n<0:n<=0)||n<v.min||n>v.max)fail(k+': use the assigned range '+v.min+' to '+v.max+' '+u+'.','range',{key:k,value:n});
      inputs[k]=n;
    }
    if(![1,2].includes(inputs.n_s))fail('n_s must be integer 1 or 2.','geometry');
    if(inputs.theta<=0||inputs.theta>=90)fail('theta must lie strictly between 0 and 90 degrees.','geometry');
    if(inputs.Lb>inputs.L)fail('Geometry requires 0 < a = Lb <= L; attachment C cannot lie beyond D.','geometry');
    return inputs;
  }
  function format(n,dp){
    if(!Number.isFinite(n))fail('A mandatory jib result is nonfinite.','arithmetic');
    if(n===0)return (0).toFixed(dp);
    const text=Math.abs(n).toLocaleString('en-US',{minimumFractionDigits:dp,maximumFractionDigits:dp});
    if(Number(text.replace(/,/g,''))===0)return n.toExponential(3);
    return (n<0?'-':'')+text;
  }
  const tied=(v,max)=>Math.abs(v-max)<=1e-12*Math.max(1,Math.abs(max));
  const join=xs=>xs.join(' and ');
  const freeze=o=>{if(o&&typeof o==='object'){Object.values(o).forEach(freeze);Object.freeze(o);}return o;};
  const modelScopeNote='First-order instructional model: boom bending and brace axial deformation only. Boom axial compliance, shear deformation, connection clearance, wall flexibility and geometric nonlinearities are omitted. Quantitative model-validity limits, combined boom stress, physical stability, other connection modes, fatigue, out-of-plane behavior, anchors, rated hardware and actual stiffness are unassessed. Met nominal criteria do not establish a safe lifting system.';
  function evaluate(problem,overrides={}){
    const v=resolve(problem,overrides),L=v.L*1000,a=v.Lb*1000,theta=v.theta*Math.PI/180,sn=Math.sin(theta),cs=Math.cos(theta);
    const ell=a/cs,h=a*Math.tan(theta),EI=v.E*v.I_boom,EA=v.E*v.A_brace,W=v.M*9.81,P=v.gamma_d*W;
    const pinArea=Math.PI*v.d_pin**2/4,bearingArea=v.t_plate*v.d_pin,criterion=v.sigma_y/v.N_y,rI=Math.sqrt(v.I_brace/v.A_brace),PE=Math.PI**2*v.E*v.I_brace/(v.K_brace*ell)**2;
    const shared={weight_N:W,P_design_N:P,a_m:v.Lb,wall_spacing_m:h/1000,brace_length_m:ell/1000,vertical_load_moment_Nm:P*L/1000,offset_couple_magnitude_Nm:v.H*v.e_H,pin_area_mm2:pinArea,pin_shear_area_mm2:v.n_s*pinArea,bearing_area_mm2:bearingArea,yield_criterion_MPa:criterion,r_from_I_mm:rI,implied_I_from_reported_r_mm4:v.A_brace*v.r_min**2,formal_slenderness_I:v.K_brace*ell/rI,formal_slenderness_reported_r:v.K_brace*ell/v.r_min,formal_Euler_N:PE,formal_Euler_stress_MPa:PE/v.A_brace,formal_Euler_divided_reference_N:PE/v.N_b,brace_yield_load_reference_N:v.A_brace*v.sigma_y,boom_outer_fiber_mm:v.I_boom/v.S_boom,fixed_cantilever_comparison_moment_Nm:P*L/1000,fixed_cantilever_comparison_stress_MPa:P*L/v.S_boom,fixed_cantilever_comparison_deflection_mm:P*L**3/(3*EI)};
    const cases={};
    for(const [name,s] of [['right',1],['left',-1]]){
      const Hx=s*v.H,Ce=Hx*v.e_H*1000,Rc=(P*L-Ce)/a,F=Rc/sn,Cx=F*cs,Ax=-Cx-Hx,Ay=P-Rc,MC=Ay*a,MD=Ce,Mmax=Math.max(Math.abs(MC),Math.abs(MD));
      const bend=P*L*(L-a)**2/(3*EI)-Ce*(L-a)*(3*L-a)/(6*EI),brace=(P*L-Ce)*ell*L/(EA*a*a*sn*sn),tip=bend+brace;
      const c={Hx_N:Hx,Ce_Nm:Ce/1000,required_brace_moment_Nm:(P*L-Ce)/1000,brace_vertical_N:Rc,brace_force_N:F,brace_horizontal_N:Cx,wall_pin_x_N:Ax,wall_pin_y_N:Ay,boom_axial_AC_N:Cx+Hx,boom_axial_CD_N:Hx,boom_moment_C_Nm:MC/1000,boom_moment_D_Nm:MD/1000,boom_max_moment_Nm:Mmax/1000,boom_bending_MPa:Mmax/v.S_boom,brace_axial_signed_MPa:-F/v.A_brace,brace_axial_magnitude_MPa:Math.abs(F)/v.A_brace,brace_extension_mm:-F*ell/EA,C_down_mm:F*ell/(EA*sn),tip_bending_mm:bend,tip_brace_mm:brace,tip_down_mm:tip,pin_shear_MPa:Math.abs(F)/(v.n_s*pinArea),bearing_MPa:Math.abs(F)/bearingArea};
      c.boom_bending_utilization=c.boom_bending_MPa/criterion;c.tip_displacement_utilization=Math.abs(tip)/v.delta_allow;c.brace_axial_utilization=c.brace_axial_magnitude_MPa/criterion;c.pin_shear_utilization=c.pin_shear_MPa/v.tau_allow;c.bearing_utilization=c.bearing_MPa/v.bearing_allow;
      c.brace_action=F>0?'compression':F<0?'tension':'zero axial force';
      c.tip_direction=tip>0?'downward':tip<0?'upward':'zero vertical movement';
      c.moment_locations=Mmax===0?'zero bending throughout':a===L?'C = D':join([...(tied(Math.abs(MC),Mmax)?['C']:[]),...(tied(Math.abs(MD),Mmax)?['D']:[])]);
      c.residuals={x:Ax+Cx+Hx,y:Ay+Rc-P,moment:Rc*a+Ce-P*L,wholeMoment:h*Cx+Ce-P*L};
      const forceScale=Math.max(1,P,Math.abs(F),Math.abs(Hx)),momentScale=Math.max(1,P*L,Math.abs(Ce));
      if(Math.abs(c.residuals.x)>1e-10*forceScale||Math.abs(c.residuals.y)>1e-10*forceScale||Math.abs(c.residuals.moment)>1e-10*momentScale||Math.abs(c.residuals.wholeMoment)>1e-10*momentScale)fail('Signed jib equilibrium residual exceeds numerical tolerance.','arithmetic');
      cases[name]=c;
    }
    const envelope={},controls={};
    for(const k of modes){
      const max=Math.max(...caseNames.map(n=>cases[n][k+'_utilization']));
      envelope['env_'+k+'_utilization']=max;
      controls[k]=caseNames.filter(n=>tied(cases[n][k+'_utilization'],max));
      envelope['env_'+k+'_cases']=join(controls[k].map(n=>label[n]));
    }
    const maximum=Math.max(...modes.map(k=>envelope['env_'+k+'_utilization']));
    const winners=modes.filter(k=>tied(envelope['env_'+k+'_utilization'],maximum));
    const exceeded=caseNames.flatMap(n=>modes.filter(k=>cases[n][k+'_utilization']>1).map(k=>modeNames[k]+' ('+label[n]+', raw utilization '+cases[n][k+'_utilization']+')'));
    envelope.env_governing_utilization=maximum;
    envelope.env_governing_modes=join(winners.map(k=>modeNames[k]));
    envelope.env_governing_cases=winners.map(k=>modeNames[k]+': '+join(controls[k].map(n=>label[n]))).join('; ');
    envelope.nominal_criteria_status=exceeded.length?'exceeded':'met';
    const compression=caseNames.some(n=>cases[n].brace_force_N>0);
    envelope.compression_stability_status=compression?'unvalidated':'no compression demand in these cases; other checks unassessed';
    envelope.section_axis_note='Formal inertia-axis radius '+format(rI,4)+' mm; separately reported minimum-radius assignment '+format(v.r_min,4)+' mm. '+(tied(rI,v.r_min)?'Numerically compatible with a common axis; actual section and restraints remain unverified.':'Axis identities and actual governing direction are unresolved; neither is a verified governing buckling axis.');
    envelope.formal_Euler_note='Formal Euler stress '+format(PE/v.A_brace,2)+' MPa '+(PE/v.A_brace>v.sigma_y?'exceeds':'does not exceed')+' the assigned '+format(v.sigma_y,2)+' MPa yield reference. Proportional range, section axes and restraints remain unverified. Neither the formal load nor its divided reference is an allowable compression resistance; K and N_b are formal sensitivity parameters.';
    envelope.model_scope_note=modelScopeNote;
    envelope.assessment_text=(exceeded.length?'One or more assigned nominal criteria are exceeded in the idealized model: '+exceeded.join('; ')+'. Modification or reassessment is required for those criteria; this is not a prediction of actual failure.':'All five assigned nominal criteria are met for both directional cases in the idealized model.')+' Largest eligible nominal utilization: '+format(maximum,4)+' ('+envelope.env_governing_cases+'). '+(compression?'Physical compression resistance is unvalidated. ':'No compression demand occurs in these cases; tensile/reversal resistance remains unassessed. ')+modelScopeNote;
    const raw={...shared};
    for(const n of caseNames)for(const k of Object.keys(casePrecision))raw[n+'_'+k]=cases[n][k];
    for(const k of Object.keys(precision).filter(k=>k.startsWith('env_')))raw[k]=envelope[k];
    if(Object.values(raw).some(n=>!Number.isFinite(n)))fail('A mandatory jib calculation is nonfinite.','arithmetic');
    const display=Object.fromEntries(Object.entries(precision).map(([k,dp])=>[k,format(raw[k],dp)]));
    for(const n of caseNames)for(const k of caseText)display[n+'_'+k]=cases[n][k];
    for(const k of envelopeText)display[k]=envelope[k];
    if(registry.length!==104||new Set(registry).size!==104||Object.keys(display).length!==104||registry.some(k=>!own(display,k)))fail('Jib registry mismatch.','schema');
    return freeze({status:'valid',inputs:v,shared,cases,envelope,controls,raw,display,limitations:[modelScopeNote,envelope.section_axis_note,envelope.formal_Euler_note]});
  }
  function dimensionKey(inputs){
    return 'Current assigned inputs: '+Object.keys(units).map(k=>(k==='Lb'?'a (Lb)':k)+' = '+inputs[k].toLocaleString('en-US')+' '+units[k]).join('; ')+'. Schematic / not to scale. Lb is horizontal; diagonal length is derived.';
  }
  return {isJib,resolve,evaluate,format,tied,dimensionKey,registry:Object.freeze(registry),precision:Object.freeze(precision),units:Object.freeze(units),JibInputError,modelScopeNote};
}));
