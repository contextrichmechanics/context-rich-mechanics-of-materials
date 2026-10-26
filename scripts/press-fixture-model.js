// Nominal local checks for MOS-PRESS-006 only. No complete fixture capacity is established.
(function (root, factory) {
  if (typeof module === "object" && module.exports) module.exports = factory();
  else root.PressFixtureModel = factory();
}(typeof window !== "undefined" ? window : globalThis, function(){
  'use strict';
  const slug='hydraulic-press-punching-shear';
  const units={P:'kN',d:'mm',t:'mm',s:'mm',b:'mm',tau_allow:'MPa',sigma_bearing_allow:'MPa'};
  const registry=['press_load_N','press_shear_perimeter_mm','press_punching_area_mm2','press_bearing_area_mm2','press_punching_shear_MPa','press_bearing_stress_MPa','press_larger_stress','press_larger_stress_MPa','press_shear_reserve','press_bearing_reserve','press_shear_utilization','press_bearing_utilization','press_shear_utilization_percent','press_bearing_utilization_percent','press_min_reserve','press_max_utilization','press_controlling_check','press_criteria_assessment','press_edge_gap_mm','press_support_contact_length_mm'];
  const isPress=problem=>problem?.slug===slug;
  const compare=(a,b)=>Math.abs(a-b)<=1e-10*Math.max(1,Math.abs(a),Math.abs(b))?0:a>b?1:-1;
  const meets=utilization=>Number.isFinite(utilization)&&utilization<=1;
  function evaluate(problem,overrides={}) {
    if(!isPress(problem))throw new Error('This model is only for the hydraulic press fixture.');
    const inputs={};
    for(const [key,unit] of Object.entries(units)){
      const variable=problem.variables?.find(v=>v.key===key);
      if(!variable||variable.unit!==unit)throw new Error(`${key}: a required input in ${unit} is missing or has the wrong unit.`);
      const candidate=Object.prototype.hasOwnProperty.call(overrides,key)?overrides[key]:variable.value;
      if(!['number','string'].includes(typeof candidate)||(typeof candidate==='string'&&!candidate.trim()))throw new Error(`${key}: enter a finite positive number.`);
      const value=Number(candidate);
      if(!Number.isFinite(value)||value<=0)throw new Error(`${key}: enter a finite positive number.`);
      if((Number.isFinite(variable.min)&&value<variable.min)||(Number.isFinite(variable.max)&&value>variable.max))throw new Error(`${key}: use the assigned range ${variable.min} to ${variable.max} ${unit}.`);
      inputs[key]=value;
    }
    const {P,d,t,s,b,tau_allow,sigma_bearing_allow}=inputs;
    if(d>=s)throw new Error(`Geometry requires d < s: ram diameter ${d} mm must be smaller than the ${s} mm block opening.`);
    if(s>=b)throw new Error(`Geometry requires s < b: opening ${s} mm must be smaller than the ${b} mm plate extent.`);
    const load=P*1000,perimeter=Math.PI*d,shearArea=perimeter*t,bearingArea=Math.PI*d*d/4;
    const shear=load/shearArea,bearing=load/bearingArea,rs=tau_allow/shear,rb=sigma_bearing_allow/bearing;
    const us=shear/tau_allow,ub=bearing/sigma_bearing_allow,stressOrder=compare(shear,bearing),useOrder=compare(us,ub);
    const shearMeets=meets(us),bearingMeets=meets(ub);
    const raw={load,perimeter,shearArea,bearingArea,shear,bearing,shearReserve:rs,bearingReserve:rb,shearUtilization:us,bearingUtilization:ub,minReserve:Math.min(rs,rb),maxUtilization:Math.max(us,ub),edgeGap:(s-d)/2,supportContactLength:(b-s)/2};
    const f=(n,places)=>n.toLocaleString('en-US',{minimumFractionDigits:places,maximumFractionDigits:places});
    const display={press_load_N:f(load,0),press_shear_perimeter_mm:f(perimeter,2),press_punching_area_mm2:f(shearArea,2),press_bearing_area_mm2:f(bearingArea,2),press_punching_shear_MPa:f(shear,2),press_bearing_stress_MPa:f(bearing,2),press_larger_stress:stressOrder===0?'both nominal stresses equally':stressOrder>0?'nominal circular shear demand':'mean compressive contact pressure',press_larger_stress_MPa:f(Math.max(shear,bearing),2),press_shear_reserve:f(rs,2),press_bearing_reserve:f(rb,2),press_shear_utilization:f(us,4),press_bearing_utilization:f(ub,4),press_shear_utilization_percent:f(100*us,2),press_bearing_utilization_percent:f(100*ub,2),press_min_reserve:f(Math.min(rs,rb),2),press_max_utilization:f(Math.max(us,ub),4),press_controlling_check:useOrder===0?'both nominal checks equally':useOrder>0?'nominal circular shear check':'mean contact-pressure check',press_criteria_assessment:shearMeets&&bearingMeets?'Both nominal demands meet their illustrative allowable criteria.':!shearMeets&&bearingMeets?'The nominal shear demand exceeds its illustrative allowable criterion; the mean contact pressure meets its criterion.':shearMeets&&!bearingMeets?'The mean contact pressure exceeds its illustrative allowable criterion; the nominal shear demand meets its criterion.':'Both nominal demands exceed their illustrative allowable criteria.',press_edge_gap_mm:f((s-d)/2,2),press_support_contact_length_mm:f((b-s)/2,2)};
    return {inputs,raw,display};
  }
  function dimensionKey(problem,overrides={}){
    const {inputs:v}=evaluate(problem,overrides);
    return 'Current input dimensions: '+['P','d','t','s','b'].map(k=>`${k} = ${v[k].toLocaleString('en-US')} ${units[k]}`).join('; ')+'. Schematic / not to scale.';
  }
  return {isPress,evaluate,dimensionKey,registry,compare,meets};
}));
