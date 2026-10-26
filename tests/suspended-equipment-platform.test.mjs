import assert from 'node:assert/strict';
import test from 'node:test';
import fs from 'node:fs';
import path from 'node:path';
import {createHash} from 'node:crypto';
import {spawnSync} from 'node:child_process';
import {fileURLToPath} from 'node:url';
import Model from '../scripts/platform-model.js';
import Packet from '../scripts/platform-packet.js';
import Press from '../scripts/press-fixture-model.js';
import {loadRoutes,normalize} from './helpers/packet-harness.mjs';
const root=path.resolve(fileURLToPath(new URL('../',import.meta.url)));
const read=p=>fs.readFileSync(path.join(root,p),'utf8'),hash=s=>createHash('sha256').update(s).digest('hex');
const catalog=JSON.parse(read('data/problem-catalog.json')),problem=catalog.find(Model.isPlatform);
const sources={direct:read('scripts/packet-renderer.js'),builder:read('instructor-builder.qmd'),cli:read('scripts/render-assignment.mjs')},routes=loadRoutes(root,sources,Press);
const baseline={P:800,A_w:.05,E_w:28000,L_u:4,L_l:4.5,L_DC:7,L_AB:5,x_DH:2,x_HC:5,x_P:1};
// Golden expectations captured from the faculty-approved correction specification.
// Source SHA-256: d1ed08c443dd2d005dbc4e4a9704f089d8bea5e50555d36df88ab4c1494b8400.
// Keep these literal expectations independent of production outputs; no review files
// are needed at test time. Update them only after explicit content approval.
const expectedBaselineDisplay=Object.freeze({
  "platform_x_HC_ft": "5.00",
  "platform_E_w_psi": "28,000,000",
  "platform_L_u_in": "48.00",
  "platform_L_l_in": "54.00",
  "platform_L_DC_in": "84.00",
  "platform_L_AB_in": "60.00",
  "platform_T_AH_lb": "640.0",
  "platform_T_BC_lb": "160.0",
  "platform_T_ED_lb": "457.1",
  "platform_T_FC_lb": "342.9",
  "platform_delta_AH_in": "0.02469",
  "platform_delta_BC_in": "0.00617",
  "platform_delta_ED_in": "0.01567",
  "platform_delta_FC_in": "0.01176",
  "platform_delta_H_in": "0.01455",
  "platform_delta_A_in": "0.03924",
  "platform_delta_B_in": "0.01793",
  "platform_delta_load_in": "0.03498",
  "platform_theta_AB_rad": "0.0003552",
  "platform_theta_AB_deg": "0.0204",
  "platform_theta_DC_rad": "0.00004665",
  "platform_theta_DC_deg": "0.00267",
  "platform_lower_tilt_direction": "downward toward A",
  "platform_upper_tilt_direction": "downward toward D",
  "platform_governing_wire": "AH",
  "platform_governing_force_lb": "640.0",
  "platform_dominant_wire": "AH",
  "platform_dominant_force_lb": "640.0",
  "platform_dominant_length_ft": "4.50",
  "platform_dominant_elongation_in": "0.02469",
  "platform_weight_AH": "0.800000",
  "platform_weight_BC": "0.200000",
  "platform_weight_ED": "0.571429",
  "platform_weight_FC": "0.428571",
  "platform_contrib_AH_in": "0.01974857",
  "platform_contrib_BC_in": "0.00123429",
  "platform_contrib_ED_in": "0.00895627",
  "platform_contrib_FC_in": "0.00503790",
  "platform_contrib_AH_percent": "56.46",
  "platform_contrib_BC_percent": "3.53",
  "platform_contrib_ED_percent": "25.61",
  "platform_contrib_FC_percent": "14.40",
  "platform_theta_AB_signed_rad": "-0.0003552",
  "platform_theta_AB_signed_deg": "-0.0204",
  "platform_theta_DC_signed_rad": "-0.00004665",
  "platform_theta_DC_signed_deg": "-0.00267",
  "platform_largest_elongation_wire": "AH",
  "platform_largest_elongation_in": "0.02469",
  "platform_dominant_contribution_in": "0.01974857",
  "platform_dominant_contribution_percent": "56.46",
  "platform_delta_B_minus_A_in": "-0.02131312",
  "platform_delta_C_minus_D_in": "-0.00391837",
  "platform_max_strain": "0.00045714",
  "platform_max_abs_rotation_rad": "0.00035522",
  "platform_lower_tilt_explanation": "A has the larger downward displacement; AB tilts downward toward A (negative clockwise-positive rotation).",
  "platform_upper_tilt_explanation": "D has the larger downward displacement; DC tilts downward toward D (negative clockwise-positive rotation).",
  "platform_force_max_summary": "Maximum modeled tension: 640.0 lbf in AH.",
  "platform_largest_elongation_summary": "Largest raw wire elongation: AH, 0.02469 in.",
  "platform_dominant_summary": "Largest contribution to load-point displacement: AH, 0.01974857 in (56.46% of the total).",
  "platform_model_status_note": "First-order instructional model; quantitative strain/rotation screening thresholds are not configured. The stated assumptions remain unverified for an actual platform.",
  "platform_contribution_sum_in": "0.03497703"
});
const expectedQuestions=Object.freeze([
  {
    "id": "q1",
    "displayNumber": "Q1",
    "title": "Primary Function of the System",
    "student": "What is the primary structural function of the suspended platform system shown in the industry image?",
    "instructor": "The system supports workers, equipment, or other loads at an elevated position and transfers their weight through the suspension members to an overhead lifting or supporting system. The photograph supplies physical context, not the numerical model or an operating-load rating."
  },
  {
    "id": "q2",
    "displayNumber": "Q2",
    "title": "External Loading",
    "student": "What external loads would normally act on a suspended work platform during use or lifting?",
    "instructor": "A real system carries the weights of its platforms, workers, tools and equipment and may also experience dynamic, wind or other environmental loads. Load position can produce unequal suspension forces. The quantitative phase will explicitly prescribe its load case and omitted effects; real-system loads must not be silently assumed included in that prescription."
  },
  {
    "id": "q3",
    "displayNumber": "Q3",
    "title": "Supports and Restraints",
    "student": "How is the platform supported, and what type of forces can the suspension members transmit?",
    "instructor": "Suspension members connect the platform to an overhead lifting or support system and carry tension. Ideal flexible members do not carry compression or end moments; a slack member supplies no tensile restraint until it becomes taut. A vertical-only model does not by itself establish lateral or out-of-plane stability."
  },
  {
    "id": "q4",
    "displayNumber": "Q4",
    "title": "Load Path",
    "student": "Trace the dominant load path from the supported load to the overhead lifting or supporting system.",
    "instructor": "The load passes from the payload into the platform, through the suspension members, and into the overhead supporting structure. A two-level model must also account for load transmitted into and through the intermediate member before reaching the ceiling."
  },
  {
    "id": "q5",
    "displayNumber": "Q5",
    "title": "Effect of Load Position",
    "student": "What would you expect to happen if the supported load is positioned closer to one side of the platform rather than near its center?",
    "instructor": "Suspension members would generally carry unequal tensile forces. With comparable member stiffnesses, unequal forces produce unequal extensions and can change platform orientation. A multi-level system can respond differently at its different levels; moving a load toward one member's center is not a general guarantee of smaller motion everywhere."
  },
  {
    "id": "q6",
    "displayNumber": "Q6",
    "title": "Relevant Mechanical Response",
    "student": "If the engineering concern is the position and orientation of the platform after loading, what mechanical responses must be considered?",
    "instructor": "Consider extension of the suspension members, absolute vertical movement of the connected points, and rotation of each platform or rigid member. A member's relative axial extension is different from the absolute movement of its lower attachment when its upper attachment also moves."
  },
  {
    "id": "q7",
    "displayNumber": "Q7",
    "title": "Relevant Parameters",
    "student": "What loading, geometric, and material characteristics would you expect to influence the displacement and tilt of the suspended system?",
    "instructor": "Relevant characteristics include load magnitude and position; suspension lengths, cross-sectional areas and material or assembly axial stiffness; suspension-point spacing and connectivity; support flexibility; and whether deformation remains within the selected model's assumptions. At this context stage, identify physical dependencies rather than guessing the later common model's symbols."
  },
  {
    "id": "q8",
    "displayNumber": "Q8",
    "title": "Student-Generated Structural Idealization",
    "student": "Convert the real suspended-platform system into a simplified Mechanics of Materials model that preserves the platform, tensile suspension members, overhead supports, load location, suspension-point spacing, and the possibility of vertical displacement and rotation. Draw and label your own model and state what physical features it retains. A common model will be supplied after Q10 for the quantitative phase.",
    "instructor": "A suitable independent model represents load-carrying platforms or members connected to overhead support by deformable tension members, with clear attachment points, load location and possible translation/rotation. Other defensible models are acceptable when their load path and assumptions are consistent. Grade this task for reasoning and a usable idealization, not for guessing the later common model's exact labels. Do not give students a completed free-body diagram in this question."
  },
  {
    "id": "q9",
    "displayNumber": "Q9",
    "title": "Modeling Assumptions",
    "student": "State and justify the assumptions used in your simplified model. Identify at least two real effects that your model omits.",
    "instructor": "Reasonable stated assumptions may include quasi-static loading, rigid platform members, linearly elastic axial suspension members, small deformation and rotation, idealized connections, and sufficiently stiff overhead support. Omitting self-weight, member bending, assembly/termination compliance, sag, dynamics or lateral motion must be identified as a modeling assumption, not proof that the effect is negligible. The common-model panel after Q10 specifies the assumptions used for the numerical work."
  },
  {
    "id": "q10",
    "displayNumber": "Q10",
    "title": "Mechanics Analysis Plan",
    "student": "Before calculating, describe the analysis sequence required to determine vertical displacement and tilt.",
    "instructor": "Check the common geometry, input units and model admissibility; draw separate free bodies; solve equilibrium for the tensile forces; calculate axial extensions with consistent units; combine support motion and relative extension using rigid-body compatibility; calculate load-point movement and signed rotations; then assess weighted displacement contributions and a scoped engineering change. Retain unrounded values until final display."
  },
  {
    "id": "q11",
    "displayNumber": "M1",
    "title": "Common-Model Boundary Conditions and Unknown Wire Forces",
    "student": "Using the unsolved common-model geometry and assumptions supplied after Q10, identify the fixed points, the two rigid members, the four unknown wire tensions, and the load path. Explain what the eye connections do and do not restrain.",
    "instructor": "E and F have fixed coordinates. DC and AB are rigid members. The unknown tensile forces are T_ED, T_FC, T_AH and T_BC along their initially vertical wires. AH connects H to endpoint A, and BC connects C to endpoint B. The load path is P \u2192 AB \u2192 AH/BC \u2192 DC \u2192 ED/FC \u2192 E/F. Eye connections transmit the modeled axial forces without applied end couples; fixed ceiling points do not make the rigid members clamped. All four wires must remain taut for this selected model."
  },
  {
    "id": "q12",
    "displayNumber": "M2",
    "title": "Equilibrium of Lower Rigid Member AB",
    "student": "Draw the free-body diagram of lower member AB and solve for the forces in the lower wires AH and BC. State your force and moment sign conventions.",
    "instructor": "Take upward forces and counterclockwise moments as positive. On AB, T_AH acts upward at A, T_BC upward at B, and P downward at x_P from A. \u03a3F_y = T_AH + T_BC \u2212 P = 0 and \u03a3M_A = T_BC L_AB \u2212 P x_P = 0. Thus T_BC = P x_P/L_AB = {{P}}({{x_P}})/{{L_AB}} = {{platform_T_BC_lb}} lbf, and T_AH = P \u2212 T_BC = {{platform_T_AH_lb}} lbf. Use unrounded forces in subsequent calculations."
  },
  {
    "id": "q13",
    "displayNumber": "M3",
    "title": "Equilibrium of Upper Rigid Member DC",
    "student": "Draw the free-body diagram of upper member DC and solve for the forces in the upper wires ED and FC. Show both forces applied at C and verify equilibrium of the whole assembly.",
    "instructor": "The lower wires apply downward T_AH at H and downward T_BC at C. The upper wires apply upward T_ED at D and upward T_FC at C; the two C forces are at the same node. \u03a3F_y = T_ED + T_FC \u2212 T_AH \u2212 T_BC = 0. \u03a3M_D = T_FC L_DC \u2212 T_AH x_DH \u2212 T_BC L_DC = 0. Therefore T_FC = (T_AH x_DH + T_BC L_DC)/L_DC = {{platform_T_FC_lb}} lbf and T_ED = P \u2212 T_FC = {{platform_T_ED_lb}} lbf. The whole assembly satisfies T_ED + T_FC = P and T_FC L_DC = P(x_DH + x_P), using geometric closure. Ceiling loads are opposite to the upward reactions on the assembly."
  },
  {
    "id": "q14",
    "displayNumber": "M4",
    "title": "Wire Elongations",
    "student": "Calculate the elongation of each wire using \u03b4 = T L/(A E). Use consistent inch\u2013pound-force units and state which material/member assumptions this equation requires.",
    "instructor": "Use E_psi = 1000 E_w = {{platform_E_w_psi}} lbf/in\u00b2, A_w = {{A_w}} in\u00b2, L_u,in = 12 L_u = {{platform_L_u_in}} in, and L_l,in = 12 L_l = {{platform_L_l_in}} in. For constant area and the assigned linear axial stiffness, \u03b4_AH = T_AH L_l,in/(A_w E_psi) = {{platform_delta_AH_in}} in; \u03b4_BC = {{platform_delta_BC_in}} in; \u03b4_ED = T_ED L_u,in/(A_w E_psi) = {{platform_delta_ED_in}} in; \u03b4_FC = {{platform_delta_FC_in}} in. These are relative wire extensions. The assigned A/E model is not a verified rope/chain stiffness or a strength check."
  },
  {
    "id": "q15",
    "displayNumber": "M5",
    "title": "Displacement of Point H on Upper Member DC",
    "student": "Using rigid-body compatibility of upper member DC and downward-positive displacement, determine the vertical displacement of point H.",
    "instructor": "The fixed upper anchors give v_D = \u03b4_ED and v_C = \u03b4_FC. Let h = x_DH/L_DC. Then v_H = (1\u2212h)v_D + h v_C = \u03b4_ED + (\u03b4_FC\u2212\u03b4_ED)(x_DH/L_DC) = {{platform_delta_H_in}} in downward. The interpolation uses the undeformed attachment coordinates and the first-order rigid-member model."
  },
  {
    "id": "q16",
    "displayNumber": "M6",
    "title": "Displacement of Endpoints A and B of Lower Member AB",
    "student": "Determine the downward displacement of points A and B. Account for movement of the upper ends of both lower wires.",
    "instructor": "A is vertically below H and B is vertically below C. Therefore v_A = v_H + \u03b4_AH = {{platform_delta_A_in}} in downward and v_B = v_C + \u03b4_BC = {{platform_delta_B_in}} in downward. The upper attachment points are not fixed. These sums use unrounded internal quantities; displayed component values may be rounded."
  },
  {
    "id": "q17",
    "displayNumber": "M7",
    "title": "Vertical Displacement of the Load",
    "student": "Determine the vertical displacement of the load point on lower member AB using its undeformed location.",
    "instructor": "Let r = x_P/L_AB. The rigid-member displacement is affine, so v_P = (1\u2212r)v_A + r v_B = v_A + (v_B\u2212v_A)(x_P/L_AB) = {{platform_delta_load_in}} in downward. This is load-point movement from the stipulated initial reference state."
  },
  {
    "id": "q18",
    "displayNumber": "M8",
    "title": "Signed Tilt of Lower Member AB",
    "student": "Determine the signed small-angle rotation and tilt magnitude of AB. Use downward-positive displacement and clockwise-positive rotation, and identify the direction or state that the member remains level.",
    "instructor": "\u0394v_AB = v_B\u2212v_A = {{platform_delta_B_minus_A_in}} in. With L_AB,in = {{platform_L_AB_in}} in, \u03b8_AB \u2248 \u0394v_AB/L_AB,in = {{platform_theta_AB_signed_rad}} rad = {{platform_theta_AB_signed_deg}}\u00b0. Its magnitude is {{platform_theta_AB_rad}} rad = {{platform_theta_AB_deg}}\u00b0. {{platform_lower_tilt_explanation}} Use unrounded displacement differences; the stated zero/tie tolerance is numerical, not a physical levelness criterion."
  },
  {
    "id": "q19",
    "displayNumber": "M9",
    "title": "Signed Tilt of Upper Member DC",
    "student": "Determine the signed small-angle rotation and tilt magnitude of DC using the same sign convention. Identify the direction or state that the member remains level.",
    "instructor": "\u0394v_DC = v_C\u2212v_D = \u03b4_FC\u2212\u03b4_ED = {{platform_delta_C_minus_D_in}} in. With L_DC,in = {{platform_L_DC_in}} in, \u03b8_DC \u2248 \u0394v_DC/L_DC,in = {{platform_theta_DC_signed_rad}} rad = {{platform_theta_DC_signed_deg}}\u00b0. Its magnitude is {{platform_theta_DC_rad}} rad = {{platform_theta_DC_deg}}\u00b0. {{platform_upper_tilt_explanation}} Use unrounded differences and do not infer a tilt direction from a rounded zero."
  },
  {
    "id": "q20",
    "displayNumber": "M10",
    "title": "Weighted Contributions to Load-Point Displacement",
    "student": "Using the compatibility equations, express v_P as a weighted sum of the four wire elongations. Calculate each wire's contribution to v_P and identify the largest contribution, including any tie. Explain why the largest wire elongation need not make the largest contribution to load-point movement.",
    "instructor": "Let r = x_P/L_AB and h = x_DH/L_DC. Substitution gives v_P = (1\u2212r)\u03b4_AH + r\u03b4_BC + (1\u2212r)(1\u2212h)\u03b4_ED + [h+r(1\u2212h)]\u03b4_FC. Thus w_AH = {{platform_weight_AH}}, w_BC = {{platform_weight_BC}}, w_ED = {{platform_weight_ED}}, and w_FC = {{platform_weight_FC}}. With c_i = w_i \u03b4_i, the contributions are AH: {{platform_contrib_AH_in}} in ({{platform_contrib_AH_percent}}%); BC: {{platform_contrib_BC_in}} in ({{platform_contrib_BC_percent}}%); ED: {{platform_contrib_ED_in}} in ({{platform_contrib_ED_percent}}%); FC: {{platform_contrib_FC_in}} in ({{platform_contrib_FC_percent}}%). Their sum is {{platform_contribution_sum_in}} in, agreeing with v_P before rounding. {{platform_dominant_summary}} {{platform_largest_elongation_summary}} A wire's raw extension and its weighted contribution are different response measures."
  },
  {
    "id": "q21",
    "displayNumber": "M11",
    "title": "Scoped Engineering Assessment and Recommendation",
    "student": "Summarize the predicted load-point displacement and both signed rotations with directions. Identify the maximum wire tension and the largest weighted contribution to load-point displacement, including ties. Recommend one change, stating what remains fixed and what must be rechecked. Explain why these results alone do not approve a real platform for service.",
    "instructor": "The load point moves {{platform_delta_load_in}} in downward. \u03b8_AB = {{platform_theta_AB_signed_rad}} rad; direction: {{platform_lower_tilt_direction}}. \u03b8_DC = {{platform_theta_DC_signed_rad}} rad; direction: {{platform_upper_tilt_direction}}. {{platform_force_max_summary}} {{platform_dominant_summary}} At fixed load position and geometry, uniformly increasing the common A_w or E_w, or reducing P, scales down this linear model's displacement and rotation magnitudes without changing the geometry weights. Uniformly scaling all four free lengths also requires a consistent new vertical geometry. Relocating P or changing only one wire group requires recalculating v_P and both rotations; moving P toward AB's center is not a universal improvement. No material/assembly provenance, strength allowable, connector capacity, displacement/tilt service limit, real-platform bending response or full stability assessment is established. {{platform_model_status_note}}"
  }
].map(Object.freeze));
const cases=[
 ['R01',{}],['R02',{P:1600}],['R03',{A_w:.1}],['R04',{E_w:14000}],['R05',{L_u:8}],
 ['R06',{x_P:2.5}],['R07',{x_P:4}],['R08',{x_P:1.5}],
 ['R09',{L_DC:10,x_DH:4,x_HC:6,L_AB:6,x_P:2.4}],['R10',{x_P:2.2}],
 ['R11',{x_P:2805/1282}],['R12',{x_P:25/12}],
 ['R13',{L_DC:10,x_DH:4,x_HC:6,L_AB:6,x_P:2.4,L_u:2025/512}],
 ['R14',{x_P:235/103}],['R15',{P:10000,A_w:.001,E_w:1000}]
];
const near=(a,b,unit='')=>assert.ok(Math.abs(a-b)<=1e-12+1e-9*Math.abs(b),unit+': '+a+' != '+b);
// Independent generalized-coordinate spring assembly, not production equilibrium formulas.
function oracle(overrides){
 const v={...baseline,...overrides},h=v.x_DH/v.L_DC,r=v.x_P/v.L_AB,ae=v.A_w*v.E_w*1000;
 const b={ED:[1,0,0,0],FC:[0,1,0,0],AH:[h-1,-h,1,0],BC:[0,-1,0,1]};
 const lengths={ED:12*v.L_u,FC:12*v.L_u,AH:12*v.L_l,BC:12*v.L_l};
 const K=Array.from({length:4},(_,i)=>Array.from({length:4},(_,j)=>Object.keys(b).reduce((s,w)=>s+ae/lengths[w]*b[w][i]*b[w][j],0)));
 const f=[0,0,v.P*(1-r),v.P*r],matrix=K.map((row,i)=>[...row,f[i]]);
 for(let j=0;j<4;j++){let p=j;for(let i=j+1;i<4;i++)if(Math.abs(matrix[i][j])>Math.abs(matrix[p][j]))p=i;[matrix[p],matrix[j]]=[matrix[j],matrix[p]];const pivot=matrix[j][j];matrix[j]=matrix[j].map(x=>x/pivot);for(let i=0;i<4;i++)if(i!==j){const factor=matrix[i][j];matrix[i]=matrix[i].map((x,k)=>x-factor*matrix[j][k]);}}
 const y=matrix.map(row=>row[4]),wires=Object.entries(b).map(([wire,shape])=>{const extension=shape.reduce((s,x,i)=>s+x*y[i],0),tension=ae/lengths[wire]*extension;return{wire,extension,tension,strain:extension/lengths[wire],stress:tension/v.A_w,weight:tension/v.P,contribution:tension/v.P*extension};});
 return {wires,points:{D:y[0],C:y[1],H:(1-h)*y[0]+h*y[1],A:y[2],B:y[3],P:(1-r)*y[2]+r*y[3]},rotations:{AB:(y[3]-y[2])/(12*v.L_AB),DC:(y[1]-y[0])/(12*v.L_DC)}};
}
for(const [name,overrides] of cases)test('independent spring oracle and four routes '+name,()=>{
 const actual=Model.evaluate(problem,overrides),expected=oracle(overrides);
 for(const w of actual.raw.wires){const e=expected.wires.find(x=>x.wire===w.wire);for(const [a,b] of [['extension','extension'],['tension','tension'],['strain','strain'],['stressPsi','stress'],['weight','weight'],['contribution','contribution']])near(w[a],e[b],name+' '+w.wire+' '+a);}
 for(const key of Object.keys(expected.points))near(actual.raw.displacements[key],expected.points[key],key);
 for(const key of ['AB','DC'])near(actual.raw.rotations[key],expected.rotations[key],key);
 // Residuals have force or force-length units; use the specified absolute equilibrium floor.
 for(const value of Object.values(actual.raw.residuals))assert.ok(Math.abs(value)<=1e-8);
 near(actual.raw.displacements.P,actual.raw.contributionSum);near(actual.raw.displacements.P,actual.raw.energyDisplacement);
 near(actual.raw.wires.reduce((s,w)=>s+w.percent,0),100);
 assert.equal(actual.raw.weights.AH+actual.raw.weights.BC,1);near(actual.raw.weights.ED+actual.raw.weights.FC,1);
 if(name==='R15'){assert.equal(actual.status,'model-warning');assert.equal(actual.display,undefined);assert.throws(()=>routes.cli.body(problem,{variables:overrides},'student'),Model.PlatformModelWarning);return;}
 for(const type of ['student','instructor']){
  const outputs=routes.render(problem,null,type,overrides);
  for(const [route,body] of Object.entries(outputs)){
   assert.ok(!body.includes('{{'),route);
   assert.ok(body.includes(Model.dimensionKey(actual.inputs)),route+' current inputs');
   assert.equal((body.match(route==='qmd'?/^### [QM]\d+\./gm:/class="generated-question"/g)||[]).length,21,route);
   if(type==='instructor'){assert.ok(body.includes(actual.display.platform_delta_load_in),route);assert.ok(body.includes(actual.display.platform_dominant_summary),route);assert.ok(body.includes(actual.display.platform_lower_tilt_explanation),route);assert.ok(body.includes(actual.display.platform_upper_tilt_explanation),route);}
  }
 }
});
test('exact registry, baseline displays, retained inputs and 21 exact question/answer revisions',()=>{
 assert.equal(catalog.length,51);assert.equal(Model.registry.length,61);assert.equal(new Set(Model.registry).size,61);
 const result=Model.evaluate(problem);assert.equal(result.status,'unassessed');assert.equal(result.raw.displacements.P>0,true);
 assert.deepEqual(Object.fromEntries(problem.variables.map(v=>[v.key,v.value])),baseline);
 assert.deepEqual([...problem.derivedPlaceholders].sort(),[...Model.registry].sort());
 assert.deepEqual(Object.keys(result.display).sort(),[...Model.registry].sort());
 assert.equal(Object.keys(expectedBaselineDisplay).length,61);
 assert.deepEqual([...Model.registry].sort(),Object.keys(expectedBaselineDisplay).sort());
 for(const [key,expected] of Object.entries(expectedBaselineDisplay))assert.equal(result.display[key],expected,key);
 const plain=s=>s.replace(/<sub>(.*?)<\/sub>/g,'_$1').replace(/<[^>]+>/g,'').replace(/&lt;/g,'<').replace(/&gt;/g,'>').replace(/&amp;/g,'&');
 assert.equal(expectedQuestions.length,21);assert.equal(problem.questions.length,expectedQuestions.length);
 for(const [i,expected] of expectedQuestions.entries()){
  const q=problem.questions[i];
  for(const field of ['id','displayNumber','title'])assert.equal(q[field],expected[field],q.id+' '+field);
  assert.equal(plain(q.student),expected.student,q.id+' prompt');assert.equal(plain(q.instructor),expected.instructor,q.id+' answer');
 }
 assert.equal(problem.status,'Faculty review');assert.equal(problem.version,'0.3.0');
});
test('signed reversals, both zero cases and recommendations counterexample',()=>{
 const get=name=>Model.evaluate(problem,cases.find(c=>c[0]===name)[1]);
 assert.match(get('R01').display.platform_lower_tilt_direction,/toward A/);
 assert.match(get('R07').display.platform_lower_tilt_explanation,/B has the larger/);
 assert.match(get('R07').display.platform_upper_tilt_explanation,/C has the larger/);
 assert.match(get('R07').display.platform_theta_AB_signed_rad,/^\+/);
 assert.equal(get('R08').display.platform_upper_tilt_direction,'level (no tilt)');
 assert.equal(get('R08').display.platform_theta_DC_signed_rad,'0');
 assert.equal(get('R11').display.platform_lower_tilt_direction,'level (no tilt)');
 assert.ok(get('R06').raw.displacements.P>get('R10').raw.displacements.P);
 assert.ok(Math.abs(get('R06').raw.rotations.AB)>Math.abs(get('R10').raw.rotations.AB));
});
test('weighted dominance is distinct from raw elongation and all tie sets survive',()=>{
 const get=name=>Model.evaluate(problem,cases.find(c=>c[0]===name)[1]);
 assert.equal(get('R09').display.platform_largest_elongation_wire,'AH');assert.equal(get('R09').display.platform_dominant_wire,'FC');
 assert.equal(get('R12').display.platform_governing_wire,'AH and FC');
 assert.equal(get('R13').display.platform_dominant_wire,'AH and FC');
 assert.equal(get('R13').display.platform_dominant_force_lb,'AH: 480.0; FC: 512.0');
 assert.match(get('R13').display.platform_dominant_summary,/each approximately/);
 assert.equal(get('R14').display.platform_largest_elongation_wire,'AH and FC');
 assert.equal(get('R14').display.platform_dominant_wire,'FC');
 const rank=Model.rank([{wire:'AH',value:1},{wire:'BC',value:1+1e-12},{wire:'ED',value:1-1e-12},{wire:'FC',value:.5}],1e-12);
 assert.deepEqual(rank.wires,['AH','BC','ED']);
 assert.deepEqual(Model.rank([{wire:'AH',value:1},{wire:'FC',value:1+1e-6}],1e-8).wires,['FC']);
 assert.equal((1).toFixed(1),(1+1e-6).toFixed(1));
 assert.equal(Model.classify(1,1+1e-12),0);assert.equal(Model.classify(1,1+2e-10),1);assert.equal(Model.classify(1,1-2e-10),-1);
 assert.equal(Model.format(1e-9,5,true),'+1.00e-9');
 assert.ok(Object.isFrozen(get('R01').raw.wires[0]));
});
for(const key of Object.keys(baseline))test('validate every effective input '+key,()=>{
 for(const bad of [null,undefined,'',' ',0,-1,'bad','1 mm','0x10','1,000',NaN,Infinity,-Infinity,true,{},[]])assert.throws(()=>Model.evaluate(problem,{[key]:bad}),Model.PlatformInputError);
 const variable=problem.variables.find(v=>v.key===key);
 assert.throws(()=>Model.evaluate(problem,{[key]:variable.min/2}),Model.PlatformInputError);
 assert.throws(()=>Model.evaluate(problem,{[key]:variable.max*2}),Model.PlatformInputError);
 assert.throws(()=>Model.evaluate({...problem,variables:problem.variables.filter(v=>v.key!==key)}),Model.PlatformInputError);
 assert.throws(()=>Model.evaluate({...problem,variables:problem.variables.map(v=>v.key===key?{...v,unit:'wrong'}:v)}),Model.PlatformInputError);
});
test('schema, default inheritance, numeric strings, off-grid values and closure',()=>{
 assert.equal(Model.evaluate(problem,{P:'1.6e3'}).inputs.A_w,.05);
 assert.equal(Model.evaluate(problem,{x_P:2805/1282}).status,'unassessed');
 assert.throws(()=>Model.evaluate(problem,{typo:1}),/unknown/);
 assert.throws(()=>Model.evaluate({...problem,id:'other'}),/ID\/slug/);
 assert.throws(()=>Model.evaluate({...problem,variables:[null,...problem.variables.slice(1)]}),Model.PlatformInputError);
 const d=problem.variables.map(v=>v.key==='P'?{...v,value:undefined}:v);
 assert.throws(()=>Model.evaluate({...problem,variables:d}),/P:/);
 assert.equal(Model.evaluate({...problem,variables:d},{P:800}).inputs.P,800);
 const duplicate=[...problem.variables];duplicate[1]=duplicate[0];assert.throws(()=>Model.evaluate({...problem,variables:duplicate}),/required unique/);
 for(const override of [{x_HC:4},{x_HC:-1},{L_AB:6},{L_DC:8},{x_DH:3},{x_P:6},{x_P:5},{x_DH:7},{x_HC:0}])assert.throws(()=>Model.evaluate(problem,override),Model.PlatformInputError);
 assert.equal(Model.closeLength(5,5+.5e-9),true);assert.equal(Model.closeLength(5,5+2e-9),false);
 assert.equal(Model.evaluate(problem,{L_AB:5+.5e-9}).status,'unassessed');
 assert.throws(()=>Model.evaluate(problem,{L_AB:5+2e-9}),/Geometry/);
 // Both redundant closure differences can accumulate in the global moment residual.
 assert.equal(Model.evaluate(problem,{L_DC:.6-.9e-9,x_DH:.1,x_HC:.5,L_AB:.5+.9e-9,x_P:.49}).status,'unassessed');
});
test('inclusive individual ranges still require a coherent joint geometry',()=>{
 for(const key of ['P','A_w','E_w','L_u','L_l']){
  const variable=problem.variables.find(v=>v.key===key);
  for(const value of [variable.min,variable.max])assert.equal(Model.evaluate(problem,{[key]:value}).inputs[key],value);
 }
 for(const overrides of [
  {L_DC:50,x_DH:1,x_HC:49,L_AB:49,x_P:1},
  {L_DC:2.5,x_DH:2,x_HC:.5,L_AB:.5,x_P:.1},
  {L_DC:5.1,x_DH:.1,x_HC:5,L_AB:5},
  {L_DC:49.5,x_DH:49,x_HC:.5,L_AB:.5,x_P:.1},
  {L_DC:49.1,x_DH:.1,x_HC:49,L_AB:49,x_P:1},
  {x_P:.1}
 ])assert.ok(Model.evaluate(problem,overrides).raw);
 // Legacy individual bounds do not guarantee that a compatible combination exists.
 for(const overrides of [{L_DC:.5},{L_AB:50},{x_HC:.1},{x_P:49}])assert.throws(()=>Model.evaluate(problem,overrides),Model.PlatformInputError);
});
test('model screen states, raw boundaries and gross finite-segment warning',()=>{
 const b=Model.evaluate(problem),limit={maxAxialStrain:b.raw.maxStrain,maxAbsRigidTiltRad:b.raw.maxAbsRotation,warningAction:'block-standard-export'};
 assert.equal(Model.evaluate(problem,{},limit).status,'within-assigned-screen');
 for(const key of ['maxAxialStrain','maxAbsRigidTiltRad']){
  assert.equal(Model.evaluate(problem,{},{...limit,[key]:limit[key]*(1+1e-6)}).status,'within-assigned-screen');
  assert.equal(Model.evaluate(problem,{},{...limit,[key]:limit[key]*(1-1e-6)}).status,'model-warning');
  assert.throws(()=>Model.evaluate(problem,{},{...limit,[key]:0}),Model.PlatformInputError);
 }
 assert.equal(Model.evaluate(problem,{},{...limit,maxAxialStrain:null}).status,'unassessed');
 assert.equal(Model.canExport(b),true);assert.equal(Model.canExport(Model.evaluate(problem,cases.at(-1)[1])),false);
 for(const [scale,status] of [[1-1e-6,'unassessed'],[1,'model-warning'],[1+1e-6,'model-warning']]){
  const result=Model.evaluate(problem,{P:2500*scale,A_w:.001,E_w:1000,L_l:5,x_P:1.5});assert.equal(result.status,status);
 }
});
test('invalid/warning states clear all answers, block exports before images, and recover',async()=>{
 routes.render(problem,null,'instructor');
 routes.direct.window.PROBLEM_CATALOG=[problem];
 for(const overrides of [{P:''},{x_HC:4},cases.at(-1)[1]]){
  routes.direct.window.renderProblemPacket({slug:problem.slug,type:'student',targetId:'target',overrides});
  const target=routes.controls.get('target').innerHTML;assert.match(target,/role="alert"/);assert.ok(!target.includes('answer-block'));assert.ok(!target.includes('0.03498'));assert.ok(!target.includes('612.097'));
  routes.builder.set(problem,null,overrides);routes.builder.preview();assert.match(routes.controls.get('packet-preview').innerHTML,/role="alert"/);
  for(const id of ['download-student-doc','download-instructor-doc','print-student-pdf','print-instructor-pdf'])assert.equal(routes.controls.get(id).disabled,true);
  await assert.rejects(routes.builder.html('student'));await assert.rejects(routes.builder.images(problem,problem.questions,'student'));
  assert.throws(()=>routes.cli.body(problem,{variables:overrides},'student'));assert.throws(()=>routes.cli.qmd(problem,{variables:overrides},'student',root));
 }
 routes.builder.set(problem,null,{});routes.builder.preview();assert.equal(routes.controls.get('download-student-doc').disabled,false);
 const warning=Model.evaluate(problem,cases.at(-1)[1]),error=new Model.PlatformModelWarning(warning);
 assert.ok(!Packet.diagnosticHtml(error,'student').includes('612.097'));
 assert.ok(Packet.diagnosticHtml(error,'instructor').includes('612.097'));
});
for(const type of ['student','instructor'])test('phase order, no answer leakage and native workspace '+type,()=>{
 for(const [route,body] of Object.entries(routes.render(problem,null,type))){
  const q10=body.indexOf('Mechanics Analysis Plan'),bridge=body.indexOf('Common model and assigned data'),m1=body.indexOf('Common-Model Boundary Conditions'),m2=body.indexOf('Equilibrium of Lower Rigid Member');
  assert.ok(q10<bridge&&bridge<m1&&m1<m2,route+' phase order');
  assert.ok(body.indexOf('platform-student-common-geometry.png')>q10);
  assert.equal((body.match(/platform-student-common-geometry.png/g)||[]).length,1);
  assert.equal(body.includes('platform-instructor-free-bodies.png'),type==='instructor');
  assert.equal(body.includes('platform-instructor-idealization.png'),false);
  assert.equal((body.match(/Representative Instructor Answer/g)||[]).length,type==='instructor'?21:0);
  if(type==='instructor')assert.ok(body.indexOf('platform-instructor-free-bodies.png')>m1&&body.indexOf('platform-instructor-free-bodies.png')<m2);
  else{assert.ok(!body.includes('0.03498'));assert.ok(!body.includes('0.01974857'));assert.ok(!body.includes('Maximum modeled tension:'));}
  assert.ok(body.includes('80mm')||body.includes('4535'),route+' drawing workspace');
 }
});
test('exact corrected assets are unsolved, aligned and historical bytes retained',()=>{
 assert.equal(hash(fs.readFileSync(path.join(root,problem.nativeContextImage))),hash(fs.readFileSync(path.join(root,problem.image))));
 const svg=read('problems/suspended-equipment-platform/assets/platform-student-common-geometry.svg');
 for(const forbidden of ['T_AH','T_BC','0.03498','640.0','0.02469'])assert.ok(!svg.includes(forbidden));
 const coords=Object.fromEntries([...svg.matchAll(/data-node="(\w+)" cx="([\d.]+)" cy="([\d.]+)"/g)].map(m=>[m[1],[+m[2],+m[3]]]));
 assert.equal(coords.A[0],coords.H[0]);assert.equal(coords.B[0],coords.C[0]);assert.equal(coords.A[1],coords.B[1]);
 const teacher=read('problems/suspended-equipment-platform/assets/platform-instructor-free-bodies.svg');
 for(const force of ['T_AH','T_BC','T_ED','T_FC'])assert.ok(teacher.includes(force));
 assert.match(teacher,/Both C forces share one application point/);assert.match(svg,/not to scale/);
 const before={"problems/suspended-equipment-platform/assets/platform-industry-context.png":"d1b7fd7c676c926f59e52f8bf21507f7fceef894f48fa813a29cd6387a1c1724","problems/suspended-equipment-platform/assets/platform-instructor-idealization.png":"49ee6253ac0fd3c77147f678116bab103592803c70244d36548e2375c7e9e79c"};
 for(const file of ['platform-industry-context.png','platform-instructor-idealization.png']){
  const rel='problems/suspended-equipment-platform/assets/'+file;
  assert.equal(hash(fs.readFileSync(path.join(root,rel))),before[rel]);
 }
});
// Exercise actual catalog/CLI failures in an isolated scratch project under ignored exports.
test('catalog invalid defaults/variants and CLI pre-output rejection',()=>{
 const scratchParent=path.join(root,'exports/platform-review');
 fs.mkdirSync(scratchParent,{recursive:true});
 const scratch=fs.mkdtempSync(path.join(scratchParent,'config-test-'));
 fs.mkdirSync(path.join(scratch,'scripts'));
 for(const file of ['build-catalog.mjs','render-assignment.mjs','press-fixture-model.js','platform-model.js','platform-packet.js'])fs.copyFileSync(path.join(root,'scripts',file),path.join(scratch,'scripts',file));
 const pkg=path.join(scratch,'problems',problem.slug);fs.mkdirSync(path.join(pkg,'assets'),{recursive:true});fs.mkdirSync(path.join(pkg,'variants'));
 const meta=JSON.parse(read('problems/'+problem.slug+'/problem.json'));
 const write=(p,o)=>fs.writeFileSync(p,JSON.stringify(o));
 write(path.join(pkg,'problem.json'),meta);write(path.join(pkg,'questions.json'),problem.questions);write(path.join(pkg,'variables.json'),problem.variables);
 for(const name of ['index.qmd','student-packet.qmd','instructor-guide.qmd'])fs.writeFileSync(path.join(pkg,name),'');
 for(const p of [meta.image,meta.nativeContextImage,meta.idealizedImage,...meta.supplementaryImages.map(i=>i.path)])fs.writeFileSync(path.join(pkg,p),'');
 const run=script=>spawnSync(process.execPath,[path.join(scratch,'scripts',script)],{encoding:'utf8'});
 const invalid=problem.variables.map(v=>v.key==='x_HC'?{...v,value:4}:v);write(path.join(pkg,'variables.json'),invalid);
 let result=run('build-catalog.mjs');assert.notEqual(result.status,0);assert.match(result.stderr,/Geometry/);assert.equal(fs.existsSync(path.join(scratch,'data')),false);
 write(path.join(pkg,'variables.json'),problem.variables);write(path.join(pkg,'variants','bad.json'),{id:'bad',title:'Bad',variables:{P:null}});
 result=run('build-catalog.mjs');assert.notEqual(result.status,0);assert.match(result.stderr,/P:/);
 write(path.join(pkg,'variants','bad.json'),{id:'bad',title:'Gross trial',variables:{P:10000,A_w:.001,E_w:1000}});
 result=run('build-catalog.mjs');assert.notEqual(result.status,0);assert.match(result.stderr,/Model warning/);assert.equal(fs.existsSync(path.join(scratch,'data')),false);
 write(path.join(pkg,'variants','bad.json'),{id:'valid',title:'Valid off-grid',variables:{x_P:2805/1282}});
 result=run('build-catalog.mjs');assert.equal(result.status,0,result.stderr);
 assert.equal(JSON.parse(fs.readFileSync(path.join(scratch,'data','problem-catalog.json'))).length,1);
 write(path.join(scratch,'data','problem-catalog.json'),[{...problem,variants:[{id:'bad',variables:{P:null}}]}]);
 result=spawnSync(process.execPath,[path.join(scratch,'scripts','render-assignment.mjs'),'--problem',problem.slug,'--variant','bad','--format','html'],{encoding:'utf8'});
 assert.notEqual(result.status,0);assert.match(result.stderr,/P:/);assert.equal(fs.existsSync(path.join(scratch,'exports')),false);
 write(path.join(scratch,'data','problem-catalog.json'),[{...problem,variants:[{id:'bad',variables:{P:10000,A_w:.001,E_w:1000}}]}]);
 result=spawnSync(process.execPath,[path.join(scratch,'scripts','render-assignment.mjs'),'--problem',problem.slug,'--variant','bad','--format','pdf'],{encoding:'utf8'});
 assert.notEqual(result.status,0);assert.match(result.stderr,/Model warning/);assert.equal(fs.existsSync(path.join(scratch,'exports')),false);
});
const previous=JSON.parse(read('tests/fixtures/platform-unrelated-render-hashes.json'));assert.equal(previous.problems.length,50);
for(const expected of previous.problems)test('unrelated catalog and four-route regression '+expected.slug,()=>{
 const p=catalog.find(x=>x.slug===expected.slug);assert.equal(hash(JSON.stringify(p)),expected.catalogHash);
 for(const c of expected.cases){const variant=p.variants.find(v=>v.id===c.variant)||null,rendered=routes.render(p,variant,c.type),digests=Object.fromEntries(Object.entries(rendered).map(([route,text])=>[route,hash(normalize(text,root))]));assert.equal(hash(JSON.stringify(digests)),c.hash,expected.slug+' '+c.variant+' '+c.type);}
});
