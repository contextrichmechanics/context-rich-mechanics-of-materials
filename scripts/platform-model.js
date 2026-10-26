// MOS-PLATFORM-011: first-order, four-taut-wire instructional model only.
(function(root,factory){
  if(typeof module==='object'&&module.exports) module.exports=factory();
  else root.PlatformModel=factory();
}(typeof window!=='undefined'?window:globalThis,function(){
  'use strict';
  const slug='suspended-equipment-platform', id='MOS-PLATFORM-011';
  const units={P:'lb',A_w:'in^2',E_w:'ksi',L_u:'ft',L_l:'ft',L_DC:'ft',L_AB:'ft',x_DH:'ft',x_HC:'ft',x_P:'ft'};
  const wireOrder=['AH','BC','ED','FC'];
  const registry=["platform_x_HC_ft","platform_E_w_psi","platform_L_u_in","platform_L_l_in","platform_L_DC_in","platform_L_AB_in","platform_T_AH_lb","platform_T_BC_lb","platform_T_ED_lb","platform_T_FC_lb","platform_delta_AH_in","platform_delta_BC_in","platform_delta_ED_in","platform_delta_FC_in","platform_delta_H_in","platform_delta_A_in","platform_delta_B_in","platform_delta_load_in","platform_theta_AB_rad","platform_theta_AB_deg","platform_theta_DC_rad","platform_theta_DC_deg","platform_lower_tilt_direction","platform_upper_tilt_direction","platform_governing_wire","platform_governing_force_lb","platform_dominant_wire","platform_dominant_force_lb","platform_dominant_length_ft","platform_dominant_elongation_in","platform_weight_AH","platform_weight_BC","platform_weight_ED","platform_weight_FC","platform_contrib_AH_in","platform_contrib_BC_in","platform_contrib_ED_in","platform_contrib_FC_in","platform_contrib_AH_percent","platform_contrib_BC_percent","platform_contrib_ED_percent","platform_contrib_FC_percent","platform_theta_AB_signed_rad","platform_theta_AB_signed_deg","platform_theta_DC_signed_rad","platform_theta_DC_signed_deg","platform_largest_elongation_wire","platform_largest_elongation_in","platform_dominant_contribution_in","platform_dominant_contribution_percent","platform_delta_B_minus_A_in","platform_delta_C_minus_D_in","platform_max_strain","platform_max_abs_rotation_rad","platform_lower_tilt_explanation","platform_upper_tilt_explanation","platform_force_max_summary","platform_largest_elongation_summary","platform_dominant_summary","platform_model_status_note","platform_contribution_sum_in"];
  const unassessedNote='First-order instructional model; quantitative strain/rotation screening thresholds are not configured. The stated assumptions remain unverified for an actual platform.';
  class PlatformInputError extends Error{
    constructor(message,code='input',details={}){
      super(message);this.name='PlatformInputError';this.code=code;this.details=details;
    }
  }
  class PlatformModelWarning extends Error{
    constructor(result){
      super('Model warning: the trial prediction exceeds the assigned first-order model screen. Standard answer packets and exports are blocked; this is not evidence of material failure.');
      this.name='PlatformModelWarning';this.code='model-warning';this.result=result;
    }
  }
  const fail=(message,code,details)=>{throw new PlatformInputError(message,code,details);};
  const isPlatform=problem=>problem?.slug===slug;
  const own=(o,k)=>Object.prototype.hasOwnProperty.call(o,k);
  const lengthTolerance=(a,b)=>Math.max(1e-9,1e-10*Math.max(Math.abs(a),Math.abs(b)));
  const closeLength=(a,b)=>Math.abs(a-b)<=lengthTolerance(a,b);
  function number(candidate,key){
    if(typeof candidate!=='number'&&typeof candidate!=='string')fail(key+': enter a finite positive number.');
    if(typeof candidate==='string'&&!/^[+-]?(?:\d+(?:\.\d*)?|\.\d+)(?:[eE][+-]?\d+)?$/.test(candidate.trim()))fail(key+': enter a base-ten number without units or commas.');
    const n=Number(candidate);
    if(!Number.isFinite(n)||n<=0)fail(key+': enter a finite positive number.');
    return n;
  }
  function resolve(problem,overrides){
    if(!isPlatform(problem)||problem.id!==id)fail('Platform ID/slug does not match MOS-PLATFORM-011.','schema');
    if(!overrides||typeof overrides!=='object'||Array.isArray(overrides))fail('Overrides must be an object.','schema');
    for(const k of Object.keys(overrides))if(!own(units,k))fail(k+': unknown platform override.','schema');
    if(!Array.isArray(problem.variables)||problem.variables.length!==10)fail('Platform requires exactly ten input entries.','schema');
    if(problem.variables.some(v=>!v||typeof v!=='object'||Array.isArray(v)||typeof v.key!=='string'))fail('Platform input entries must be keyed objects.','schema');
    const inputs={};
    for(const [key,unit] of Object.entries(units)){
      const matches=problem.variables.filter(v=>v.key===key);
      if(matches.length!==1||matches[0].unit!==unit)fail(key+': required unique input in '+unit+' is missing or has the wrong unit.','schema');
      const v=matches[0];
      if(!Number.isFinite(v.min)||!Number.isFinite(v.max)||v.min<=0||v.max<v.min||!Number.isFinite(v.step)||v.step<=0)fail(key+': invalid range/step metadata.','schema');
      const n=number(own(overrides,key)?overrides[key]:v.value,key);
      if(n<v.min||n>v.max)fail(key+': use the assigned range '+v.min+' to '+v.max+' '+unit+'.','range',{key,value:n});
      inputs[key]=n;
    }
    const {L_DC:U,L_AB:l,x_DH:a,x_HC:c,x_P:x}=inputs;
    if(!closeLength(a+c,U))fail('Geometry requires L_DC = x_DH + x_HC; '+U+' != '+a+' + '+c+' ft.','geometry');
    if(!closeLength(l,c))fail('Geometry requires L_AB = x_HC; '+l+' != '+c+' ft.','geometry');
    if(!(a<U&&x<l))fail('Geometry requires 0 < x_DH < L_DC and 0 < x_P < L_AB; endpoint/outboard loads do not retain four taut wires.','geometry',{a,U,x,l});
    return inputs;
  }
  function rank(entries,absoluteFloor){
    const max=Math.max(...entries.map(e=>e.value));
    const winners=entries.filter(e=>Math.abs(e.value-max)<=Math.max(absoluteFloor,1e-10*Math.max(Math.abs(e.value),Math.abs(max))));
    return {max,wires:winners.map(e=>e.wire),entries:winners};
  }
  const classify=(left,right)=>{
    const d=right-left,tol=1e-12+1e-10*Math.max(Math.abs(left),Math.abs(right));
    return Math.abs(d)<=tol?0:d>0?1:-1;
  };
  const list=names=>names.length<3?names.join(' and '):names.slice(0,-1).join(', ')+', and '+names.at(-1);
  function format(n,places,signed=false){
    if(!Number.isFinite(n))fail('Nonfinite platform display value.','arithmetic');
    if(n===0)return signed?'0':(0).toFixed(places);
    let s=Math.abs(n).toLocaleString('en-US',{minimumFractionDigits:places,maximumFractionDigits:places});
    if(Number(s.replace(/,/g,''))===0)s=Math.abs(n).toExponential(2);
    return (n<0?'-':signed?'+':'')+s;
  }
  function freeze(value){
    if(value&&typeof value==='object'){Object.values(value).forEach(freeze);Object.freeze(value);}
    return value;
  }
  function evaluate(problem,overrides={},policy=problem?.modelValidityPolicy){
    const v=resolve(problem,overrides);
    if(!policy||typeof policy!=='object'||Array.isArray(policy)||policy.warningAction!=='block-standard-export')fail('Invalid platform model-validity policy.','policy');
    for(const key of ['maxAxialStrain','maxAbsRigidTiltRad']){
      if(policy[key]!==null&&(!Number.isFinite(policy[key])||policy[key]<=0))fail(key+': policy limit must be null or positive finite.','policy');
    }
    const {P,A_w,E_w,L_u,L_l,L_DC:U,L_AB:l,x_DH:a,x_P:x}=v;
    const r=x/l,h=a/U,Epsi=1000*E_w,AE=A_w*Epsi;
    const weights={AH:1-r,BC:r,ED:(1-r)*(1-h),FC:h+r*(1-h)};
    const wires=wireOrder.map(w=>{
      const lengthIn=12*(['AH','BC'].includes(w)?L_l:L_u),tension=P*weights[w];
      const extension=tension*lengthIn/AE,stressPsi=tension/A_w,strain=tension/AE,contribution=weights[w]*extension;
      return {wire:w,tension,lengthIn,extension,stressPsi,strain,weight:weights[w],contribution};
    });
    if(wires.some(w=>!Number.isFinite(w.tension)||w.tension<=0))fail('All four modeled wires must have finite positive tension.','taut-wire');
    const by=Object.fromEntries(wires.map(w=>[w.wire,w]));
    const D=by.ED.extension,C=by.FC.extension,H=(1-h)*D+h*C,A=H+by.AH.extension,B=C+by.BC.extension;
    const load=(1-r)*A+r*B,deltaV={AB:B-A,DC:C-D},rotations={AB:deltaV.AB/(12*l),DC:deltaV.DC/(12*U)};
    wires.forEach(w=>{w.percent=100*w.contribution/load;});
    const maxStrain=Math.max(...wires.map(w=>w.strain)),maxAbsRotation=Math.max(Math.abs(rotations.AB),Math.abs(rotations.DC));
    const residuals={lowerForce:by.AH.tension+by.BC.tension-P,lowerMoment:by.BC.tension*l-P*x,upperForce:by.ED.tension+by.FC.tension-by.AH.tension-by.BC.tension,upperMoment:by.FC.tension*U-by.AH.tension*a-by.BC.tension*U,globalMoment:by.FC.tension*U-P*(a+x)};
    const sum=wires.reduce((s,w)=>s+w.contribution,0),energy=wires.reduce((s,w)=>s+w.tension*w.tension*w.lengthIn/(P*AE),0);
    const raw={r,h,Epsi,AE,stiffness:{upper:AE/(12*L_u),lower:AE/(12*L_l)},weights,wires,displacements:{D,C,H,A,B,P:load},deltaV,rotations,maxStrain,maxAbsRotation,contributionSum:sum,energyDisplacement:energy,residuals,nodes:{D:[0,0],H:[a,0],C:[U,0],E:[0,-L_u],F:[U,-L_u],A:[a,L_l],B:[U,L_l],load:[a+x,L_l]}};
    const finiteLeaves=o=>Object.values(o).every(x=>typeof x==='number'?Number.isFinite(x):x&&typeof x==='object'?finiteLeaves(x):true);
    if(!finiteLeaves(raw)||load<=0)fail('Platform computation produced a nonfinite or nonpositive motion.','arithmetic');
    const forceScale=Math.max(1,P),momentScale=Math.max(1,P*U);
    if(Math.abs(residuals.lowerForce)>1e-10*forceScale||Math.abs(residuals.upperForce)>1e-10*forceScale||Math.abs(residuals.lowerMoment)>1e-10*momentScale||Math.abs(residuals.upperMoment)>1e-10*momentScale||Math.abs(residuals.globalMoment)>forceScale*(lengthTolerance(U,a+v.x_HC)+lengthTolerance(l,v.x_HC))+1e-10*momentScale)fail('Equilibrium residual exceeds the geometric/numerical tolerance.','arithmetic');
    if(Math.abs(load-sum)>1e-12+1e-10*load)fail('Compatibility/contribution residual exceeds numerical tolerance.','arithmetic');
    const rankings={force:rank(wires.map(w=>({wire:w.wire,value:w.tension})),1e-8),elongation:rank(wires.map(w=>({wire:w.wire,value:w.extension})),1e-12),contribution:rank(wires.map(w=>({wire:w.wire,value:w.contribution})),1e-12)};
    const zero={AB:classify(A,B),DC:classify(D,C)},diagnostics=[];
    if(Math.abs(deltaV.AB)>=12*l||Math.abs(deltaV.DC)>=12*U)diagnostics.push({code:'finite-segment',message:'A predicted endpoint vertical difference reaches or exceeds its rigid member length; the first-order extrapolation is outside the model.'});
    if(policy.maxAxialStrain!==null&&maxStrain>policy.maxAxialStrain)diagnostics.push({code:'strain-screen',message:'Trial axial strain exceeds the assigned approximation screen.'});
    if(policy.maxAbsRigidTiltRad!==null&&maxAbsRotation>policy.maxAbsRigidTiltRad)diagnostics.push({code:'rotation-screen',message:'Trial rotation exceeds the assigned approximation screen.'});
    const status=diagnostics.length?'model-warning':policy.maxAxialStrain===null||policy.maxAbsRigidTiltRad===null?'unassessed':'within-assigned-screen';
    const result={inputs:v,raw,status,diagnostics,rankings,zero};
    if(status==='model-warning')return freeze(result);
    const f=format,display={platform_x_HC_ft:f(v.x_HC,2),platform_E_w_psi:f(Epsi,0),platform_L_u_in:f(12*L_u,2),platform_L_l_in:f(12*L_l,2),platform_L_DC_in:f(12*U,2),platform_L_AB_in:f(12*l,2)};
    for(const w of wires){
      display['platform_T_'+w.wire+'_lb']=f(w.tension,1);
      display['platform_delta_'+w.wire+'_in']=f(w.extension,5);
      display['platform_weight_'+w.wire]=f(w.weight,6);
      display['platform_contrib_'+w.wire+'_in']=f(w.contribution,8);
      display['platform_contrib_'+w.wire+'_percent']=f(w.percent,2);
    }
    for(const [k,n] of [['H',H],['A',A],['B',B],['load',load]])display['platform_delta_'+k+'_in']=f(n,5);
    for(const [bar,places,degreePlaces,left,right] of [['AB',7,4,'A','B'],['DC',8,5,'D','C']]){
      const s=zero[bar],rad=s===0?0:rotations[bar],deg=rad*180/Math.PI,name=bar==='AB'?'lower':'upper';
      display['platform_theta_'+bar+'_rad']=s===0?'0':f(Math.abs(rad),places);
      display['platform_theta_'+bar+'_deg']=s===0?'0':f(Math.abs(deg),degreePlaces);
      display['platform_theta_'+bar+'_signed_rad']=f(rad,places,true);
      display['platform_theta_'+bar+'_signed_deg']=f(deg,degreePlaces,true);
      display['platform_'+name+'_tilt_direction']=s===0?'level (no tilt)':'downward toward '+(s<0?left:right);
      display['platform_'+name+'_tilt_explanation']=s===0?left+' and '+right+' have equal downward displacement within numerical tolerance; '+bar+' remains level (zero tilt).':(s<0?left:right)+' has the larger downward displacement; '+bar+' tilts downward toward '+(s<0?left:right)+' ('+(s<0?'negative':'positive')+' clockwise-positive rotation).';
    }
    display.platform_delta_B_minus_A_in=zero.AB===0?'0':f(deltaV.AB,8,true);
    display.platform_delta_C_minus_D_in=zero.DC===0?'0':f(deltaV.DC,8,true);
    display.platform_governing_wire=list(rankings.force.wires);
    display.platform_governing_force_lb=f(rankings.force.max,1);
    display.platform_largest_elongation_wire=list(rankings.elongation.wires);
    display.platform_largest_elongation_in=f(rankings.elongation.max,5);
    display.platform_dominant_wire=list(rankings.contribution.wires);
    const winnerValues=(field,d)=>rankings.contribution.wires.length===1?f(by[rankings.contribution.wires[0]][field],d):rankings.contribution.wires.map(w=>w+': '+f(by[w][field],d)).join('; ');
    display.platform_dominant_force_lb=winnerValues('tension',1);
    display.platform_dominant_length_ft=rankings.contribution.wires.length===1?f(by[rankings.contribution.wires[0]].lengthIn/12,2):rankings.contribution.wires.map(w=>w+': '+f(by[w].lengthIn/12,2)).join('; ');
    display.platform_dominant_elongation_in=winnerValues('extension',5);
    display.platform_dominant_contribution_in=f(rankings.contribution.max,8);
    display.platform_dominant_contribution_percent=f(100*rankings.contribution.max/load,2);
    display.platform_max_strain=f(maxStrain,8);
    display.platform_max_abs_rotation_rad=f(maxAbsRotation,8);
    display.platform_contribution_sum_in=f(sum,8);
    display.platform_force_max_summary=rankings.force.wires.length===1?'Maximum modeled tension: '+f(rankings.force.max,1)+' lbf in '+list(rankings.force.wires)+'.':'Maximum modeled tension: approximately '+f(rankings.force.max,1)+' lbf in '+list(rankings.force.wires)+', tied within numerical tolerance.';
    display.platform_largest_elongation_summary=rankings.elongation.wires.length===1?'Largest raw wire elongation: '+list(rankings.elongation.wires)+', '+f(rankings.elongation.max,5)+' in.':'Largest raw wire elongations: '+list(rankings.elongation.wires)+', tied within numerical tolerance; each approximately '+f(rankings.elongation.max,5)+' in.';
    display.platform_dominant_summary=rankings.contribution.wires.length===1?'Largest contribution to load-point displacement: '+list(rankings.contribution.wires)+', '+f(rankings.contribution.max,8)+' in ('+f(100*rankings.contribution.max/load,2)+'% of the total).':'Largest contributions to load-point displacement: '+list(rankings.contribution.wires)+', tied within numerical tolerance; each approximately '+f(rankings.contribution.max,8)+' in ('+f(100*rankings.contribution.max/load,2)+'% of the total).';
    display.platform_model_status_note=status==='unassessed'?unassessedNote:'Within the assigned strain/rotation screen; this does not verify material strength or complete platform safety.';
    if(Object.keys(display).length!==registry.length||registry.some(k=>!own(display,k)))fail('Platform display registry mismatch.','schema');
    result.display=display;
    return freeze(result);
  }
  const canExport=result=>['unassessed','within-assigned-screen'].includes(result?.status);
  function assertPacket(result){if(!canExport(result))throw new PlatformModelWarning(result);return result;}
  function dimensionKey(inputs){
    return 'Current assigned inputs: '+Object.keys(units).map(k=>k+' = '+inputs[k].toLocaleString('en-US')+' '+(k==='P'?'lbf':units[k])).join('; ')+'. Schematic / not to scale.';
  }
  return {isPlatform,evaluate,resolve,rank,classify,format,closeLength,dimensionKey,canExport,assertPacket,registry:Object.freeze(registry),PlatformInputError,PlatformModelWarning,unassessedNote};
}));
