# MOS-PLATFORM-011 correction specification

Date: 2026-10-26

Status: proposed implementation contract; no package or implementation change is authorized by this document alone.

Historical working-clone location at specification preparation (provenance only): `C:\Sumanth\Questions of SOM\Github\context-rich-mechanics-quality-review`

Branch: quality-review/engineering-review-2026-10-25

Reviewed HEAD: 2d999e914ea94361ef09f42ab21372608cf77e00

> Documentation maintenance note: the date, reviewed HEAD, status, and preparation/preservation statements describe the original review or specification. Later authorized link and provenance repairs preserve the engineering content. The hashes recorded in the implementation verification report identify the original pre-repair documents; these repaired versions have different hashes.

Problem: [suspended-equipment-platform](../../../problems/suspended-equipment-platform/), ID MOS-PLATFORM-011.

Basis: the user's twelve approved engineering decisions and the accepted [detailed audit](suspended-equipment-platform-detailed-review.md). At specification preparation, the audit had been relocated into the suspended-equipment subfolder and its content hash was unchanged from the accepted report. Existing moves of review documents are pre-existing work and are outside this specification's changes.

## 1. Approved scope and acceptance contract

Retain the endpoint-supported two-level rigid-member model and all verified baseline forces, extensions, point displacements and tilt magnitudes. Preserve all 21 source IDs, their Q1–Q10 / M1–M11 display labels and context → independent idealization → common quantitative model → analysis → assessment progression. Retain all ten input keys, defaults, units, min/max ranges and authoring increments. Keep Q8 independent; the common geometry, quantitative assumptions and Given Data belong after Q10 and before M1. Completed free bodies and representative answers belong only in instructor outputs.

Correct the physical drawing, enforce geometric closure and tension-only conditions, rank weighted load-displacement contributions in q20, and make all direction/level/tie statements depend on unrounded current results. Values remain instructional assignments, not documented industrial specifications. Nothing in this problem supplies material allowables, strength factors of safety or a complete service-acceptance decision.

Implementation shall be scoped by slug suspended-equipment-platform and validate ID MOS-PLATFORM-011. Preserve the committed hydraulic-press model, its 20-placeholder contract, geometry-first layout, figures and tests. Other mechanics packages keep their current calculations and layout. No publishing workflow change, commit, deployment or deletion of historical images/reviews is part of this specification.

Proposed delivery title: retain “Suspended Platform Assembly - Wire Elongation, Vertical Displacement, and Tilt.” Retain index status Faculty review. Increment package version from 0.2.0 to 0.3.0 when the approved implementation is made. Do not change status to Published automatically.

## 2. Physical model and explicit nodal geometry (A)

### 2.1 Undeformed coordinates

Use a planar nodal model with x positive right and y positive downward. Put upper point D at (0,0). Coordinates below are in feet, with U = L_DC, a = x_DH and l = L_AB:

| Point | Undeformed coordinates | Connection / role |
|---|---|---|
| E | (0, −L_u) | Fixed ceiling anchor above D |
| F | (U, −L_u) | Fixed ceiling anchor above C |
| D | (0, 0) | Left endpoint of rigid DC and lower end of ED |
| H | (a, 0) | Intermediate point of DC and upper end of AH |
| C | (U, 0) | Right endpoint of DC, lower end of FC and upper end of BC |
| A | (a, L_l) | Left endpoint of rigid AB, vertically below H |
| B | (U, L_l) | Right endpoint of rigid AB, vertically below C |
| Load point | (a + x_P, L_l) | Interior point of AB carrying downward P |

Rigid DC extends exactly from D to C and rigid AB exactly from A to B. There are no modeled overhangs or additional attachment coordinates. ED/FC have equal free length L_u; AH/BC have equal free length L_l. D, H and C are collinear. A and B are horizontal in the reference configuration. C is one common node: FC and BC connect to opposite sides of the same upper-member node, without an artificial moment arm.

Required initial geometry:

```text
x_DH + x_HC = L_DC
L_AB = x_HC = L_DC − x_DH
0 < x_DH < L_DC
0 < x_P < L_AB
```

Numerical closure tolerance is defined in Section 6; it is only for floating-point representation. It is not a physical fabrication tolerance. Inputs are never silently overwritten, coupled, clamped or rescaled to repair a failed identity.

### 2.2 Exact proposed introductory problem statement

Use the following as the student-facing introduction and problem.json problemStatement, before the Q1–Q10 tasks. It intentionally does not prescribe the common model's node layout:

> Suspended platforms transfer supported loads through tensile suspension members to an overhead lifting or supporting system. Their position and orientation can change as those members extend under load. Load location, suspension geometry and axial stiffness can affect both vertical movement and tilt.
>
> Use the industry image to interpret the physical system and develop your own idealization in Q1–Q10. A common, unsolved model and its assigned numerical data will then be supplied for M1–M11 so that the quantitative work uses a shared geometry. The image establishes context; it does not establish the assigned dimensions, material properties or load rating.

Proposed engineeringGoal:

> Estimate load-point displacement and the rotations of the two members in the supplied common model. Explain how each wire contributes to load-point displacement and make an engineering recommendation limited to the assigned first-order model and its assumptions.

The opening system-components list may retain platform, tensile suspension members, overhead support and payload. Do not place the numerical common-model schematic or completed free bodies in the introductory include or Q8.

### 2.3 Exact common-model bridge after Q10 and before M1

Heading: **Common model and assigned data for M1–M11**.

Proposed statement:

> For the quantitative phase, use two initially horizontal rigid members DC and AB and four initially vertical axial wires. Fixed ceiling anchors E and F support D and C through wires ED and FC. Wire AH connects point H on DC to lower endpoint A, and wire BC connects C to lower endpoint B. A is vertically below H, and B is vertically below C. The only applied load in this model is the prescribed downward point force P on AB, at distance x_P from A.
>
> Use the unsolved geometry, current-input dimensions and Given Data below. The initial geometry must satisfy L_DC = x_DH + x_HC and L_AB = x_HC, with D–H–C in that order and 0 < x_P < L_AB. All ten values are instructional assignments. They are not measurements, manufacturer specifications, a validated assembly stiffness or a load rating.
>
> Work from the common assumptions below even if your earlier Q8 model used a different defensible idealization. No quantitative force, extension, displacement or tilt solution is supplied in the student reference geometry.

Exact quantitative assumptions, visible to both audiences in this bridge:

1. The calculation is two-dimensional, quasi-static and first order about the undeformed nodal layout. Out-of-plane and lateral stability are not analyzed.
2. DC and AB are rigid; their bending, shear and axial deformation are omitted by stipulation, not demonstrated negligible for an actual deck.
3. E and F have zero displacement. Eye/pin connections transmit the modeled wire forces without externally applied couples. Fixed anchor coordinates do not clamp either rigid member.
4. All four suspension members are ideal straight, constant-area linear axial wires with the same assigned A_w and E_w. ED and FC have free length L_u; AH and BC have free length L_l. This is an assigned EA model, not a calibrated chain or wire-rope assembly.
5. Reference lengths and coordinates describe an aligned, unstrained ideal configuration. No initial pretension, seating extension, assembly slack or anchor settlement is included. P is the prescribed load increment from that ideal datum; it is the sole external load in the quantitative model.
6. The self-weights of both rigid members and all wires are neglected. P is not represented as an experimentally established total weight or an implicit allowance for omitted upper-member weight.
7. All four wires carry positive tension in the selected configuration. They cannot supply compression or moments. Slack-member, endpoint-load, inclined-wire and alternative active-set models are outside this exercise.
8. Axial strains and rotations must be small enough for the assigned linear/first-order model. Initial horizontal lever arms and vertical wire directions are used; finite-rotation changes are omitted. Apply the separate model-screening policy in Section 7.
9. Displacements v are positive downward. Signed rotations θ are positive clockwise, meaning the right end drops relative to the left. Force equilibrium uses upward-positive forces and counterclockwise-positive moments; these sign conventions serve different equations and are explicitly stated.
10. Use pound-force: metadata unit lb means lbf here. Use feet for nodal geometry and force moments; convert all lengths to inches for extensions and displacement-slope calculations. E_w is in ksi. Retain unrounded intermediate values.
11. Material/assembly provenance, proportional-limit evidence, strength, connector behavior, fatigue, dynamics, sag, real deck bending and service limits are not supplied. These results do not establish a real platform's fitness for service.

Bridge layout is normative: statement and assumptions → unsolved common geometry with current-input key → one Given Data table and assigned-value note → M1. The geometry and assumptions must be available before M1 in direct pages, Builder, HTML/DOC/QMD and native exports.

### 2.4 Ten input fields retained

| Key | Exact proposed label | Baseline | Source unit | Inclusive field range | Authoring step |
|---|---|---:|---|---|---:|
| `P` | Assigned downward point force (lb means lbf) | 800 | lb | 10 to 10000 | 10 |
| `A_w` | Assigned ideal axial area, each of four wires | 0.05 | in^2 | 0.001 to 2 | 0.001 |
| `E_w` | Assigned modulus for the ideal axial EA model | 28000 | ksi | 1000 to 40000 | 100 |
| `L_u` | Assigned initial free length, upper wires ED and FC | 4 | ft | 0.25 to 50 | 0.25 |
| `L_l` | Assigned initial free length, lower wires AH and BC | 4.5 | ft | 0.25 to 50 | 0.25 |
| `L_DC` | Assigned D-to-C attachment-node span | 7 | ft | 0.5 to 50 | 0.25 |
| `L_AB` | Assigned A-to-B attachment-node span; must equal x_HC | 5 | ft | 0.5 to 50 | 0.25 |
| `x_DH` | Assigned D-to-H distance | 2 | ft | 0.1 to 49 | 0.1 |
| `x_HC` | Assigned H-to-C span; must equal L_AB | 5 | ft | 0.1 to 49 | 0.1 |
| `x_P` | Assigned A-to-load distance; strictly inside AB | 1 | ft | 0.1 to 49 | 0.1 |

Retain source unit strings, including lb and in^2, for compatibility. Render P as a force and define lb = lbf; do not reinterpret it as mass or multiply it by g. Display L_DC/L_AB as distances between attachment nodes, not ambiguous overall bar widths. Label x_HC and L_AB as retained, constrained fields. Their validation is mandatory even though their redundancy is retained for compatibility.

Proposed section-a title: “Homework Version A - endpoint-supported platform and weighted displacement contributions.” Description: “Twenty-one questions from independent physical idealization to a supplied two-level common model, equilibrium, wire extension, signed motion and weighted load-displacement assessment using assigned values.” Retain all ten numbers and selectedQuestions q1–q21 unchanged.

## 3. Complete numerical model (B)

Define P in lbf, U = L_DC, l = L_AB, a = x_DH, r = x_P/l and h = a/U. Convert E_psi = 1000 E_w, L_u,in = 12 L_u, L_l,in = 12 L_l, U_in = 12 U and l_in = 12 l. A_w E_psi has units lbf. Validate before division or formatting.

### 3.1 Lower and upper equilibrium

```text
Lower AB, upward forces and counterclockwise moments positive:
T_AH + T_BC − P = 0
T_BC l − P x_P = 0
T_BC = P r
T_AH = P(1−r)

Upper DC:
T_ED + T_FC − T_AH − T_BC = 0
T_FC U − T_AH a − T_BC U = 0
T_FC = (T_AH a + T_BC U)/U = P[h + r(1−h)]
T_ED = P − T_FC = P(1−r)(1−h)

Whole assembly, using geometric closure:
R_E = T_ED upward; R_F = T_FC upward
R_E + R_F = P
R_F U = P(a + x_P)
```

The loads on the ceiling have opposite directions. At C, T_FC is upward and T_BC downward on DC. Do not combine their apparent graphical offsets into a couple. There are no support moment reactions. The vertical first-order system is statically determinate; changing the common A/E does not redistribute these forces.

### 3.2 Axial behavior and diagnostics

```text
k_u = A_w E_psi/L_u,in          [lbf/in]
k_l = A_w E_psi/L_l,in          [lbf/in]
δ_AH = T_AH L_l,in/(A_w E_psi)
δ_BC = T_BC L_l,in/(A_w E_psi)
δ_ED = T_ED L_u,in/(A_w E_psi)
δ_FC = T_FC L_u,in/(A_w E_psi)   [in]

σ_i = T_i/A_w                   [psi]
ε_i = σ_i/E_psi = δ_i/L_i,in     [dimensionless]
ε_max = max_i ε_i
```

Stress and strain are raw diagnostics for model review, not new strength questions or material allowables. No safety factor, utilization against strength or allowable reserve is introduced into this deformation exercise.

### 3.3 Compatibility and signed rotation

```text
v_D = δ_ED
v_C = δ_FC
v_H = (1−h)δ_ED + hδ_FC
v_A = v_H + δ_AH
v_B = v_C + δ_BC
v_P = (1−r)v_A + r v_B          [all in, downward positive]

Δv_AB = v_B − v_A
Δv_DC = v_C − v_D
θ_AB = Δv_AB/l_in
θ_DC = Δv_DC/U_in               [rad, clockwise positive]
θ_deg = θ_rad × 180/π
θ_max = max(|θ_AB|, |θ_DC|)
```

Positive θ_AB means downward toward B; negative means toward A. Positive θ_DC means toward C; negative means toward D. Apply the numerical zero policy to the raw displacement differences. Existing platform_theta_AB_rad/deg and platform_theta_DC_rad/deg remain magnitude fields; new signed fields carry sign. Never silently change those legacy magnitude semantics.

Do not replace the first-order slope by atan, asin or a finite-rotation force solution while retaining the rest of this linear model. An alternative finite-geometry analysis would require a new consistent model and separate approval.

## 4. Weighted contributions and interpretation (C)

Substitute the compatibility equations into the load-point expression:

```text
v_P = (1−r)[(1−h)δ_ED + hδ_FC + δ_AH] + r[δ_FC + δ_BC]
    = w_AH δ_AH + w_BC δ_BC + w_ED δ_ED + w_FC δ_FC

w_AH = 1−r
w_BC = r
w_ED = (1−r)(1−h)
w_FC = (1−r)h + r = h + r(1−h)

c_i = w_i δ_i
p_i = 100 c_i/v_P
v_P = Σ_i c_i = P Σ_i [w_i² L_i,in/(A_w E_psi)]
```

Each w_i also equals T_i/P by equilibrium. The two lower weights sum to one and the two upper weights sum to one; **all four weights sum to two**, not one. Do not normalize them as if they were one four-point interpolation. The four contribution percentages sum to 100% because they are c_i/v_P, not w_i divided by their sum.

Define q20's dominant contribution as max_i c_i to the specified load-point displacement. Largest tension, largest raw extension and largest weighted contribution are separate rankings. No one of them is declared the real failure-controlling member. Contribution shares concern translation at the load point, not a ranking of the effects on either tilt.

At baseline the weights are (0.8, 0.2, 4/7, 3/7), ordered AH, BC, ED, FC. The contributions are 0.019748571429, 0.001234285714, 0.008956268222 and 0.005037900875 in, totaling 0.034977026239 in. AH contributes 56.46%; it also happens to have the largest raw extension and force in this baseline.

### 4.1 Numerical ties and zero rules

Use unrounded quantities and compare each candidate directly to the raw maximum, not pairwise chained grouping. Return every tied maximum, in presentation order AH, BC, ED, FC. No first-entry or lexicographic winner is selected.

| Quantity | Numerical comparison tolerance |
|---|---|
| Force ranking | max(1e−8 lbf, 1e−10 × max(abs(a),abs(b))) |
| Raw extension and contribution ranking | max(1e−12 in, 1e−10 × max(abs(a),abs(b))) |
| Rotation zero, assessed as an endpoint displacement difference | abs(Δv) ≤ 1e−12 in + 1e−10 × max(abs(v_left),abs(v_right)) |

These are proposed floating-point comparison tolerances, not physical equal-force, levelness or service limits. They do not permit a compressive/slack force to be relabeled positive. A nonzero motion below fixed-decimal display resolution must use scientific notation, rather than a zero number paired with a direction.

For a maximum-contribution tie, each winner's contribution/share is reported separately; the maximum-contribution-percent field is not the sum of the winners' shares. If tied values differ only within numerical tolerance, summaries say “approximately” and “tied within numerical tolerance.” Keep all per-wire raw values and shares.

### 4.2 Recommendations that follow from this model

At fixed P, r, h and lengths, multiplying the common A_w or E_w by α > 1 divides every extension, displacement, signed rotation and contribution by α; forces and contribution percentages stay the same. Scaling P scales forces and all motions/contributions linearly, with the same weights. Uniformly scaling all four wire free lengths while maintaining consistent vertical geometry scales all motions linearly.

Relocating P or changing only L_u/L_l separately changes relative contributions and can change or reverse rotation; recompute v_P and both tilts. At baseline geometry, upper levelness occurs at x_P = 1.5 ft; lower levelness occurs near x_P = 2.18799 ft, not the lower midpoint 2.5 ft. For equal pairwise properties and a > 0, both members cannot generally be made level simultaneously by choosing one load position: upper levelness requires equal upper tensions, while lower levelness then requires equal lower tensions, which would require a = 0 in this model. Do not promise a universal centering fix.

## 5. Baseline verification and display targets

Input baseline: P = 800 lbf, A_w = 0.05 in², E_w = 28,000 ksi, L_u = 4 ft, L_l = 4.5 ft, L_DC = 7 ft, L_AB = 5 ft, x_DH = 2 ft, x_HC = 5 ft and x_P = 1 ft.

```text
A_w E_psi = 1,400,000 lbf
T_BC = 800(1/5) = 160 lbf; T_AH = 640 lbf
T_FC = [640(2) + 160(7)]/7 = 342.857142857143 lbf
T_ED = 457.142857142857 lbf
Global moment: T_FC(7 ft) = 800 lbf(2+1) ft = 2400 lbf·ft
```

| Wire | Tension, lbf | σ, psi (diagnostic) | ε (diagnostic) | Extension, in | c_i, in | Share |
|---|---:|---:|---:|---:|---:|---:|
| AH | 640.000000000 | 12800.000000 | 0.000457142857 | 0.024685714286 | 0.019748571429 | 56.46% |
| BC | 160.000000000 | 3200.000000 | 0.000114285714 | 0.006171428571 | 0.001234285714 | 3.53% |
| ED | 457.142857143 | 9142.857143 | 0.000326530612 | 0.015673469388 | 0.008956268222 | 25.61% |
| FC | 342.857142857 | 6857.142857 | 0.000244897959 | 0.011755102041 | 0.005037900875 | 14.40% |

| Motion | Unrounded target | Existing magnitude/value retained |
|---|---:|---:|
| v_D | 0.0156734693877551 in down | 0.01567 in |
| v_C | 0.0117551020408163 in down | 0.01176 in |
| v_H | 0.0145539358600583 in down | 0.01455 in |
| v_A | 0.0392396501457726 in down | 0.03924 in |
| v_B | 0.0179265306122449 in down | 0.01793 in |
| v_P | 0.0349770262390671 in down | **0.03498 in** |
| θ_AB, signed | −0.000355218658892128 rad | abs(θ_AB) = 0.0003552 rad = 0.0204°, toward A |
| θ_DC, signed | −0.000046647230320700 rad | abs(θ_DC) = 0.00004665 rad = 0.00267°, toward D |

Signed degrees are −0.0203525299588° and −0.00267268942335°. No baseline physical result is changed. The new signed display, weighted contributions and interpretation fields supplement those results.

## 6. Geometry, effective-input and export validation (F)

### 6.1 Resolution and schema rules

Authoritative schema is the ten entries in this package's variables.json. Preserve keys, unit strings and ranges from Section 2.4. Missing entries, duplicate keys, incorrect/missing units or invalid min/max metadata are configuration errors. The selector is this slug; evaluation also requires ID MOS-PLATFORM-011.

For every key, use an override only if the overrides object has that own property; otherwise use that entry's default. Omitted override keys inherit valid defaults. Explicit null, undefined, empty/whitespace-only strings, booleans, arrays, objects, NaN and infinities are invalid; they do not inherit defaults. An effective value absent after resolution is invalid. A supplied valid override may supply an otherwise absent default value for evaluation, but catalog validation must still validate the unoverridden default package.

Accept a finite JavaScript number or a trimmed, nonempty base-ten numeric string with optional decimal/scientific notation. Reject hexadecimal notation, display commas, units appended to numbers and arbitrary coercion. Reject unknown override keys to catch authoring mistakes. Require each resolved value > 0 and within its unchanged inclusive min/max range. Do not silently clamp.

Retain authoring increments as stepping controls. They are not an extra mechanical admissibility rule: off-grid but in-range values are allowed, including the exact tie/zero test cases. Do not let native stepMismatch reject such values while another delivery route accepts them.

### 6.2 Closure and tension-only checks

Define tol_ft(a,b) = max(1e−9 ft, 1e−10 × max(abs(a),abs(b))). Require |(x_DH+x_HC)−L_DC| ≤ tol_ft(x_DH+x_HC,L_DC) and |L_AB−x_HC| ≤ tol_ft(L_AB,x_HC). Also require x_DH < L_DC and 0 < x_P < L_AB. Given all positive fields, the first identities imply positive H–C span. Validate both supplied redundant fields; platform_x_HC_ft displays the validated x_HC, not a replacement value hiding bad input.

Use the supplied values in the stated formulas after these representation-level checks. Treat within-tolerance closure differences as numerically equivalent, not a new inclined-wire model. Scaled equilibrium residual checks must account for the same length tolerance and floating-point operations. Do not present this tolerance as permission to change physical geometry.

Evaluate all four tensions and require finite positive values. Endpoint loads, a zero-tension wire or an outboard load are outside the selected four-taut-wire model, even where a different active-set problem could be posed. Do not clamp negative forces or solve a new slack/inclined-wire model. Error text identifies the failed key/identity and actual incompatible input values.

### 6.3 Invalid-state behavior in every route

- Invalid input, units, ranges, closure or taut-wire conditions: show a specific diagnostic; remove previous derived values/answers; do not render empty numeric substitutions, zeros or old results as solutions.
- Keep inputs editable so the user can repair them. Disable standard download and print controls while invalid; do not disable recovery controls.
- Validate again immediately before export assembly, image fetch, new-window creation or file output. A previously valid preview does not authorize export after an invalid edit.
- CLI validates before creating/writing its export directory or output. Direct pages catch platform-specific errors and replace their computed target with a diagnostic.
- Catalog validation rejects invalid defaults/variants. It must not rebuild successful-looking catalog entries from an invalid platform package.
- After repair, recompute from current values and re-enable standard exports only when both input and model-state policies permit them.

None of these rules changes the hydraulic-press validation or the handling of unrelated packages. Do not add platform requirements to any other problem with a P or E field.

## 7. Model validity is a separate policy (G)

Geometrically consistent, positive, finite data can still exceed the approximation's domain. A failure of small-deformation assumptions is not the same as invalid input geometry and is not evidence of a material strength failure.

Always compute instructor-facing raw diagnostics ε_i = T_i/(AE), ε_max and θ_max from finite trial results. Also check the necessary finite-segment condition on predicted endpoint motions: |v_B−v_A| must be less than L_AB,in and |v_C−v_D| less than L_DC,in for an initially horizontal segment to remain in this model's small-motion regime. Reaching/exceeding a segment length indicates a vertical/physically impossible finite-segment prediction or gross departure from the assumed reference geometry. This is a **model-warning**, not an invalid initial-geometry error and not a sufficient screen for smallness when it does not trigger.

Proposed policy object, outside the ten input fields:

```json
{
  "maxAxialStrain": null,
  "maxAbsRigidTiltRad": null,
  "warningAction": "block-standard-export"
}
```

Faculty must approve the warning/export policy and either supply justified positive limits or explicitly accept the unassessed baseline mode below. Do not invent a yield stress, allowable, safety factor, elastic limit, percentage-strain limit or a small-angle cutoff. The finite-segment check has a geometric basis; it does not establish a safe elastic range.

| State | Conditions | Numerical teaching content / export |
|---|---|---|
| invalid | Effective-input, unit, range, initial geometry, taut-wire or finite-arithmetic validation fails | No numerical solution display; standard exports blocked. Error diagnostic identifies cause. |
| model-warning | Necessary predicted-segment check fails, or a configured strain/rotation limit is exceeded | Instructor diagnostic panel may show explicitly labeled trial values; ordinary answer packet not rendered; standard exports blocked under proposed policy. Student message has no derived numerical answers. |
| unassessed | Initial geometry/arithmetic pass; necessary segment check passes; at least one quantitative screen is unset | Normal instructional packet allowed under proposed policy, with explicit unassessed-model wording. No claim that small-strain/rotation validity has passed a quantitative screen. |
| within-assigned-screen | All configured required screens exist, segment check passes, and raw metrics do not exceed limits | Normal packet allowed; wording says only within the assigned model screen, not safe or experimentally validated. |

A configured limit triggers on metric > limit using raw values. Equality does not exceed it. If one screen is unset, never call the combined strain/rotation assessment complete; an exceeded configured limit still produces model-warning. Invalid states take precedence; model warnings take precedence over unassessed status.

Policy metadata values must be null or positive finite numbers with the specified dimensionless/radian units; invalid policy configuration is an authoring error. No click-through override or automatic increase of limits is part of this contract. A separate exploratory report containing out-of-domain predictions would require a distinct approved feature.

Baseline with the proposed null limits is unassessed and keeps all verified results, accompanied by the exact model-status note in Section 10. The audit's P = 10000, A_w = 0.001, E_w = 1000 trial has ε_max = 8, δ_AH = 432 in, v_P ≈ 612.09796 in and |v_B−v_A| ≈ 372.97959 in > 60 in; it must produce model-warning and block standard export. These trial values must not appear as an ordinary solved platform packet.

This policy is concrete for implementation but remains a faculty approval item: the approved mechanics decisions did not supply quantitative smallness limits or an export-warning action. A production implementation must not silently substitute numerical thresholds for that missing decision.

## 8. Exact proposed question and instructor-answer text (D)

Retain all source IDs, selected=true, includeInStudentPacket=true, includeInInstructorPacket=true and the existing context/transition/analysis grouping. Display labels are literal Q1–Q10 then M1–M11, not a second automatically renumbered 1–21 list. No question is consolidated or added.

Each heading below specifies the proposed title, exact student prose, exact instructor-answer template and replacement learning objective. Preserve existing type/difficulty/tags unless a change is explicitly needed for the revised subject; q20 should be tagged weighted displacement contribution/compatibility and q18/q19 signed rotation. Encode the text as semantic question HTML with subscripts/superscripts or supported math markup; preserve every formula, unit and placeholder.

Q8's student prose is followed by one renderer-managed blank model-sketch region, proposed print height 80 mm. Add source workspace metadata {kind: model-sketch, heightMm: 80}; remove the old four-br HTML spacer. The blank region is not a derived placeholder and does not belong in the numerical registry.

### q1 / Q1 — Primary Function of the System

**Section:** context.

**Student:** What is the primary structural function of the suspended platform system shown in the industry image?

**Instructor:** The system supports workers, equipment, or other loads at an elevated position and transfers their weight through the suspension members to an overhead lifting or supporting system. The photograph supplies physical context, not the numerical model or an operating-load rating.

**Learning objective:** Identify system function and distinguish context from quantitative evidence.

### q2 / Q2 — External Loading

**Section:** context.

**Student:** What external loads would normally act on a suspended work platform during use or lifting?

**Instructor:** A real system carries the weights of its platforms, workers, tools and equipment and may also experience dynamic, wind or other environmental loads. Load position can produce unequal suspension forces. The quantitative phase will explicitly prescribe its load case and omitted effects; real-system loads must not be silently assumed included in that prescription.

**Learning objective:** Identify real loads and distinguish them from a later idealized load case.

### q3 / Q3 — Supports and Restraints

**Section:** context.

**Student:** How is the platform supported, and what type of forces can the suspension members transmit?

**Instructor:** Suspension members connect the platform to an overhead lifting or support system and carry tension. Ideal flexible members do not carry compression or end moments; a slack member supplies no tensile restraint until it becomes taut. A vertical-only model does not by itself establish lateral or out-of-plane stability.

**Learning objective:** Recognize tension-only behavior and the limits of the modeled restraints.

### q4 / Q4 — Load Path

**Section:** context.

**Student:** Trace the dominant load path from the supported load to the overhead lifting or supporting system.

**Instructor:** The load passes from the payload into the platform, through the suspension members, and into the overhead supporting structure. A two-level model must also account for load transmitted into and through the intermediate member before reaching the ceiling.

**Learning objective:** Trace load transfer without bypassing intermediate structural members.

### q5 / Q5 — Effect of Load Position

**Section:** context.

**Student:** What would you expect to happen if the supported load is positioned closer to one side of the platform rather than near its center?

**Instructor:** Suspension members would generally carry unequal tensile forces. With comparable member stiffnesses, unequal forces produce unequal extensions and can change platform orientation. A multi-level system can respond differently at its different levels; moving a load toward one member's center is not a general guarantee of smaller motion everywhere.

**Learning objective:** Predict qualitative effects of load position without claiming universal improvement.

### q6 / Q6 — Relevant Mechanical Response

**Section:** context.

**Student:** If the engineering concern is the position and orientation of the platform after loading, what mechanical responses must be considered?

**Instructor:** Consider extension of the suspension members, absolute vertical movement of the connected points, and rotation of each platform or rigid member. A member's relative axial extension is different from the absolute movement of its lower attachment when its upper attachment also moves.

**Learning objective:** Distinguish axial extension, translation and rotation.

### q7 / Q7 — Relevant Parameters

**Section:** context.

**Student:** What loading, geometric, and material characteristics would you expect to influence the displacement and tilt of the suspended system?

**Instructor:** Relevant characteristics include load magnitude and position; suspension lengths, cross-sectional areas and material or assembly axial stiffness; suspension-point spacing and connectivity; support flexibility; and whether deformation remains within the selected model's assumptions. At this context stage, identify physical dependencies rather than guessing the later common model's symbols.

**Learning objective:** Identify physical parameters before adopting a particular common model.

### q8 / Q8 — Student-Generated Structural Idealization

**Section:** transition.

**Student:** Convert the real suspended-platform system into a simplified Mechanics of Materials model that preserves the platform, tensile suspension members, overhead supports, load location, suspension-point spacing, and the possibility of vertical displacement and rotation. Draw and label your own model and state what physical features it retains. A common model will be supplied after Q10 for the quantitative phase.

**Instructor:** A suitable independent model represents load-carrying platforms or members connected to overhead support by deformable tension members, with clear attachment points, load location and possible translation/rotation. Other defensible models are acceptable when their load path and assumptions are consistent. Grade this task for reasoning and a usable idealization, not for guessing the later common model's exact labels. Do not give students a completed free-body diagram in this question.

**Learning objective:** Develop an independent idealization before using a supplied quantitative model.

### q9 / Q9 — Modeling Assumptions

**Section:** transition.

**Student:** State and justify the assumptions used in your simplified model. Identify at least two real effects that your model omits.

**Instructor:** Reasonable stated assumptions may include quasi-static loading, rigid platform members, linearly elastic axial suspension members, small deformation and rotation, idealized connections, and sufficiently stiff overhead support. Omitting self-weight, member bending, assembly/termination compliance, sag, dynamics or lateral motion must be identified as a modeling assumption, not proof that the effect is negligible. The common-model panel after Q10 specifies the assumptions used for the numerical work.

**Learning objective:** State assumptions and distinguish an exclusion from a demonstrated negligible effect.

### q10 / Q10 — Mechanics Analysis Plan

**Section:** transition.

**Student:** Before calculating, describe the analysis sequence required to determine vertical displacement and tilt.

**Instructor:** Check the common geometry, input units and model admissibility; draw separate free bodies; solve equilibrium for the tensile forces; calculate axial extensions with consistent units; combine support motion and relative extension using rigid-body compatibility; calculate load-point movement and signed rotations; then assess weighted displacement contributions and a scoped engineering change. Retain unrounded values until final display.

**Learning objective:** Plan equilibrium, deformation, compatibility and model checks in a defensible sequence.

### q11 / M1 — Common-Model Boundary Conditions and Unknown Wire Forces

**Section:** analysis.

**Student:** Using the unsolved common-model geometry and assumptions supplied after Q10, identify the fixed points, the two rigid members, the four unknown wire tensions, and the load path. Explain what the eye connections do and do not restrain.

**Instructor:** E and F have fixed coordinates. DC and AB are rigid members. The unknown tensile forces are T_ED, T_FC, T_AH and T_BC along their initially vertical wires. AH connects H to endpoint A, and BC connects C to endpoint B. The load path is P → AB → AH/BC → DC → ED/FC → E/F. Eye connections transmit the modeled axial forces without applied end couples; fixed ceiling points do not make the rigid members clamped. All four wires must remain taut for this selected model.

**Learning objective:** Read the supplied geometry and identify tension-only force transfer and boundary conditions.

### q12 / M2 — Equilibrium of Lower Rigid Member AB

**Section:** analysis.

**Student:** Draw the free-body diagram of lower member AB and solve for the forces in the lower wires AH and BC. State your force and moment sign conventions.

**Instructor:** Take upward forces and counterclockwise moments as positive. On AB, T_AH acts upward at A, T_BC upward at B, and P downward at x_P from A. ΣF_y = T_AH + T_BC − P = 0 and ΣM_A = T_BC L_AB − P x_P = 0. Thus T_BC = P x_P/L_AB = {{P}}({{x_P}})/{{L_AB}} = {{platform_T_BC_lb}} lbf, and T_AH = P − T_BC = {{platform_T_AH_lb}} lbf. Use unrounded forces in subsequent calculations.

**Learning objective:** Determine lower-wire tensions from a correct endpoint-supported free body.

### q13 / M3 — Equilibrium of Upper Rigid Member DC

**Section:** analysis.

**Student:** Draw the free-body diagram of upper member DC and solve for the forces in the upper wires ED and FC. Show both forces applied at C and verify equilibrium of the whole assembly.

**Instructor:** The lower wires apply downward T_AH at H and downward T_BC at C. The upper wires apply upward T_ED at D and upward T_FC at C; the two C forces are at the same node. ΣF_y = T_ED + T_FC − T_AH − T_BC = 0. ΣM_D = T_FC L_DC − T_AH x_DH − T_BC L_DC = 0. Therefore T_FC = (T_AH x_DH + T_BC L_DC)/L_DC = {{platform_T_FC_lb}} lbf and T_ED = P − T_FC = {{platform_T_ED_lb}} lbf. The whole assembly satisfies T_ED + T_FC = P and T_FC L_DC = P(x_DH + x_P), using geometric closure. Ceiling loads are opposite to the upward reactions on the assembly.

**Learning objective:** Transfer equal/opposite lower-wire forces and verify local and global equilibrium.

### q14 / M4 — Wire Elongations

**Section:** analysis.

**Student:** Calculate the elongation of each wire using δ = T L/(A E). Use consistent inch–pound-force units and state which material/member assumptions this equation requires.

**Instructor:** Use E_psi = 1000 E_w = {{platform_E_w_psi}} lbf/in², A_w = {{A_w}} in², L_u,in = 12 L_u = {{platform_L_u_in}} in, and L_l,in = 12 L_l = {{platform_L_l_in}} in. For constant area and the assigned linear axial stiffness, δ_AH = T_AH L_l,in/(A_w E_psi) = {{platform_delta_AH_in}} in; δ_BC = {{platform_delta_BC_in}} in; δ_ED = T_ED L_u,in/(A_w E_psi) = {{platform_delta_ED_in}} in; δ_FC = {{platform_delta_FC_in}} in. These are relative wire extensions. The assigned A/E model is not a verified rope/chain stiffness or a strength check.

**Learning objective:** Calculate four relative axial extensions with consistent force, length and modulus units.

### q15 / M5 — Displacement of Point H on Upper Member DC

**Section:** analysis.

**Student:** Using rigid-body compatibility of upper member DC and downward-positive displacement, determine the vertical displacement of point H.

**Instructor:** The fixed upper anchors give v_D = δ_ED and v_C = δ_FC. Let h = x_DH/L_DC. Then v_H = (1−h)v_D + h v_C = δ_ED + (δ_FC−δ_ED)(x_DH/L_DC) = {{platform_delta_H_in}} in downward. The interpolation uses the undeformed attachment coordinates and the first-order rigid-member model.

**Learning objective:** Interpolate rigid-body motion at an intermediate attachment point.

### q16 / M6 — Displacement of Endpoints A and B of Lower Member AB

**Section:** analysis.

**Student:** Determine the downward displacement of points A and B. Account for movement of the upper ends of both lower wires.

**Instructor:** A is vertically below H and B is vertically below C. Therefore v_A = v_H + δ_AH = {{platform_delta_A_in}} in downward and v_B = v_C + δ_BC = {{platform_delta_B_in}} in downward. The upper attachment points are not fixed. These sums use unrounded internal quantities; displayed component values may be rounded.

**Learning objective:** Combine support motion and relative extension without treating the lower-wire tops as fixed.

### q17 / M7 — Vertical Displacement of the Load

**Section:** analysis.

**Student:** Determine the vertical displacement of the load point on lower member AB using its undeformed location.

**Instructor:** Let r = x_P/L_AB. The rigid-member displacement is affine, so v_P = (1−r)v_A + r v_B = v_A + (v_B−v_A)(x_P/L_AB) = {{platform_delta_load_in}} in downward. This is load-point movement from the stipulated initial reference state.

**Learning objective:** Interpolate load-point motion from lower-member endpoint movements.

### q18 / M8 — Signed Tilt of Lower Member AB

**Section:** analysis.

**Student:** Determine the signed small-angle rotation and tilt magnitude of AB. Use downward-positive displacement and clockwise-positive rotation, and identify the direction or state that the member remains level.

**Instructor:** Δv_AB = v_B−v_A = {{platform_delta_B_minus_A_in}} in. With L_AB,in = {{platform_L_AB_in}} in, θ_AB ≈ Δv_AB/L_AB,in = {{platform_theta_AB_signed_rad}} rad = {{platform_theta_AB_signed_deg}}°. Its magnitude is {{platform_theta_AB_rad}} rad = {{platform_theta_AB_deg}}°. {{platform_lower_tilt_explanation}} Use unrounded displacement differences; the stated zero/tie tolerance is numerical, not a physical levelness criterion.

**Learning objective:** Report a signed rotation, magnitude and result-dependent direction including a level case.

### q19 / M9 — Signed Tilt of Upper Member DC

**Section:** analysis.

**Student:** Determine the signed small-angle rotation and tilt magnitude of DC using the same sign convention. Identify the direction or state that the member remains level.

**Instructor:** Δv_DC = v_C−v_D = δ_FC−δ_ED = {{platform_delta_C_minus_D_in}} in. With L_DC,in = {{platform_L_DC_in}} in, θ_DC ≈ Δv_DC/L_DC,in = {{platform_theta_DC_signed_rad}} rad = {{platform_theta_DC_signed_deg}}°. Its magnitude is {{platform_theta_DC_rad}} rad = {{platform_theta_DC_deg}}°. {{platform_upper_tilt_explanation}} Use unrounded differences and do not infer a tilt direction from a rounded zero.

**Learning objective:** Interpret upper-member signed rotation consistently, including zero and reversed tilt.

### q20 / M10 — Weighted Contributions to Load-Point Displacement

**Section:** analysis.

**Student:** Using the compatibility equations, express v_P as a weighted sum of the four wire elongations. Calculate each wire's contribution to v_P and identify the largest contribution, including any tie. Explain why the largest wire elongation need not make the largest contribution to load-point movement.

**Instructor:** Let r = x_P/L_AB and h = x_DH/L_DC. Substitution gives v_P = (1−r)δ_AH + rδ_BC + (1−r)(1−h)δ_ED + [h+r(1−h)]δ_FC. Thus w_AH = {{platform_weight_AH}}, w_BC = {{platform_weight_BC}}, w_ED = {{platform_weight_ED}}, and w_FC = {{platform_weight_FC}}. With c_i = w_i δ_i, the contributions are AH: {{platform_contrib_AH_in}} in ({{platform_contrib_AH_percent}}%); BC: {{platform_contrib_BC_in}} in ({{platform_contrib_BC_percent}}%); ED: {{platform_contrib_ED_in}} in ({{platform_contrib_ED_percent}}%); FC: {{platform_contrib_FC_in}} in ({{platform_contrib_FC_percent}}%). Their sum is {{platform_contribution_sum_in}} in, agreeing with v_P before rounding. {{platform_dominant_summary}} {{platform_largest_elongation_summary}} A wire's raw extension and its weighted contribution are different response measures.

**Learning objective:** Derive compatibility weights and rank the contributions to one specified response.

### q21 / M11 — Scoped Engineering Assessment and Recommendation

**Section:** analysis.

**Student:** Summarize the predicted load-point displacement and both signed rotations with directions. Identify the maximum wire tension and the largest weighted contribution to load-point displacement, including ties. Recommend one change, stating what remains fixed and what must be rechecked. Explain why these results alone do not approve a real platform for service.

**Instructor:** The load point moves {{platform_delta_load_in}} in downward. θ_AB = {{platform_theta_AB_signed_rad}} rad; direction: {{platform_lower_tilt_direction}}. θ_DC = {{platform_theta_DC_signed_rad}} rad; direction: {{platform_upper_tilt_direction}}. {{platform_force_max_summary}} {{platform_dominant_summary}} At fixed load position and geometry, uniformly increasing the common A_w or E_w, or reducing P, scales down this linear model's displacement and rotation magnitudes without changing the geometry weights. Uniformly scaling all four free lengths also requires a consistent new vertical geometry. Relocating P or changing only one wire group requires recalculating v_P and both rotations; moving P toward AB's center is not a universal improvement. No material/assembly provenance, strength allowable, connector capacity, displacement/tilt service limit, real-platform bending response or full stability assessment is established. {{platform_model_status_note}}

**Learning objective:** Make a parameter-dependent recommendation supported by the specified response and explicit limits.

### Grading-note replacements

- q7: “Assess physical dependencies without requiring students to guess the common model's symbols or exact geometry.”
- q8: “Grade the independent model for physical consistency and explicit assumptions. Do not require exact agreement with the later common-model labels. No completed instructor free body is supplied before this task.”
- q12: “Use the agreed endpoint-supported AB geometry. Show tension at A and B and a downward interior P; carry unrounded values into later work. A compressive reaction is not admissible for a suspension wire.”
- q21: “Judge the recommendation against the stated response and what is held fixed. Require recalculation for load relocation or selective stiffness changes. Strength, real assembly behavior, connector capacity and complete service acceptance are not established by these data.”

Do not retain the old hard-coded endpoint comparisons or unconditional statements about centering elsewhere in questions, grading notes, objectives, summary or engineeringGoal.

## 9. Student and instructor figure contract (E)

### 9.1 Assets and physical content

Proposed new masters/delivery files:

- problems/suspended-equipment-platform/assets/platform-student-common-geometry.svg and .png
- problems/suspended-equipment-platform/assets/platform-instructor-free-bodies.svg and .png

Keep platform-industry-context.png as the context image with an explicit context-only/source-provenance note. Preserve platform-instructor-idealization.png as historical evidence; remove its active use, not the file itself. The accepted audit and other review documents are preserved.

Use vector geometry with clean text, not a newly generated illustrative photo. PNGs must be rasterized from the approved SVGs and match them, with sufficient resolution for legible printed dimension labels. Suggested masters are at least 1400 logical pixels wide; verify the actual exported figure at print size rather than inferring readability from resolution alone.

### 9.2 Unsolved student common geometry

Show E/F on a rigid ceiling, vertical ED/FC, upper member D–H–C, vertical AH/BC, lower member A–B and a downward prescribed P between A and B. A and H must have the same x coordinate; B/C/F must share their x coordinate; D/E share theirs. A/B are exact lower attachment endpoints, not labels at the ends of an overhanging bar. D/C are the upper attachment endpoints. The symbol P is applied on AB at A + x_P.

Dimension L_u from E to D and F to C, L_l from H to A and C to B, L_DC from D to C, x_DH from D to H, x_HC from H to C, L_AB from A to B, and x_P from A to the load. Geometry closure equations may appear because they define the model rather than solve a force/deformation question. Explain that lengths refer to undeformed attachment centers.

Student figure/alt/caption must contain no support reaction arrows, tension values or solved T labels, completed free bodies, displacement/rotation solutions, stress/strain results, contribution weights/shares, or equilibrium/extension calculations. Wire names and the prescribed P are geometry/input information, not solved forces.

Mandatory caption: “Unsolved common model for M1–M11. Initial geometry; schematic/not to scale. Use the current Given Data and dimension key; the load marker is symbolic and its actual position is set by x_P.”

Mandatory student alt meaning: “Two rigid members DC and AB suspended by vertical wires ED, FC, AH and BC. A is below H and B below C; a downward prescribed load lies inside AB. The figure labels the assigned dimensions and supplies no solved reactions or motion.”

SVG/PNG masters may use the baseline proportions with symbolic labels. They must not bake baseline numerals into an asset later reused for variants. Every packet must show the current-input key immediately alongside the figure: P in lbf, A_w in in², E_w in ksi, L_u/L_l/L_DC/L_AB/x_DH/x_HC/x_P in ft. Raw assigned values may be shown; derived solution values may not. A symbolic reused figure is not asserted to be proportional to a customized case. If the implementation adjusts drawing coordinates to current inputs, use the same geometry model and preserve every audience restriction.

### 9.3 Instructor free-body reference

The instructor-only master includes separate, complete free bodies of AB and DC based on the same corrected geometry. It may also show a small overview and whole-assembly check.

AB panel: T_AH upward at A, T_BC upward at B, P downward at the interior load point; dimensions x_P and L_AB; positive moment sense explicitly marked. There is no support between A and P and no unmodeled lower overhang.

DC panel: T_ED upward at D, T_FC upward at C, T_AH downward at H, T_BC downward at C; x_DH, x_HC and L_DC; both opposite C forces located at the same node. Offset arrows only for legibility and state that they act at the same point. Do not imply an offset couple.

Optional assembly panel: only external P and E/F reactions; no duplicated internal wire forces. Distinguish loads on the ceiling from reactions on the assembly. No clamp moments, compressive wires, manufactured hinge reactions or extra loads are invented.

Force arrows/symbols complete the free bodies, but do not bake baseline calculated numerals into reusable images. Current numeric tensions are provided by the instructor answers/current-value table generated from the same model. This keeps a static master compatible with all valid cases and avoids stale numerical image answers.

Mandatory instructor caption meaning: “Instructor free bodies for the assigned common model; schematic/not to scale. Symbolic forces act at the stated nodes; use the current data and results. Arrows offset at C share one application point.”

### 9.4 Placement and audience tests

Both audiences: context and Q1–Q10 → common-model bridge with unsolved figure and data → M1. Instructor only: insert the completed free-body reference after M1 and before M2, then continue M2–M11. Student M1 is followed directly by M2 without that panel. No duplicate common figure or Given Data table is added by the static introductory include.

Student HTML/DOC/QMD/DOCX/PDF bodies and embedded images must exclude the completed free-body asset and representative answers, including alt text/captions and hidden packet content. Instructor packets include the context, common geometry and instructor free bodies. Expected default packet image count is two for student and three for instructor when each new master is one image.

This is packet-content separation, not an authentication system. The existing static library exposes instructor pages/full catalog data to browsers. Do not claim that suppressing an image in a student body makes publicly served assets or answers inaccessible. Any requirement for access-controlled answer delivery is a separate publishing/architecture decision, not a hidden renderer change in this correction.

## 10. Complete derived-placeholder contract (H)

Propose **61 derived placeholders**: retain the existing 30 keys and add the 31 keys specified below. Metadata derivedPlaceholders and the pure model's registry must match exactly, with no duplicates. The registry is distinct from the ten inputs and their existing _unit/_label tokens. A numeric stress/strain allowables registry is not introduced.

The tables give exact baseline display strings under the proposed unassessed-policy defaults. Per-wire raw stress, strain, stiffness, endpoint positions, residuals and policy diagnostics are returned in the raw result record as defined by Section 3, even when not all have template keys. No teaching template may use an undeclared derived key.

Retained 30 keys:

| # | Placeholder key | Exact baseline display string | Precision / units | Definition or role |
|---:|---|---|---|---|
| 1 | `platform_x_HC_ft` | 5.00 | 2 decimals, ft | Validated supplied x_HC; geometric closure required |
| 2 | `platform_E_w_psi` | 28,000,000 | 0 decimals, lbf/in² | 1000 E_w |
| 3 | `platform_L_u_in` | 48.00 | 2 decimals, in | 12 L_u |
| 4 | `platform_L_l_in` | 54.00 | 2 decimals, in | 12 L_l |
| 5 | `platform_L_DC_in` | 84.00 | 2 decimals, in | 12 L_DC |
| 6 | `platform_L_AB_in` | 60.00 | 2 decimals, in | 12 L_AB |
| 7 | `platform_T_AH_lb` | 640.0 | 1 decimal, lbf | T_AH |
| 8 | `platform_T_BC_lb` | 160.0 | 1 decimal, lbf | T_BC |
| 9 | `platform_T_ED_lb` | 457.1 | 1 decimal, lbf | T_ED |
| 10 | `platform_T_FC_lb` | 342.9 | 1 decimal, lbf | T_FC |
| 11 | `platform_delta_AH_in` | 0.02469 | 5 decimals, in | δ_AH |
| 12 | `platform_delta_BC_in` | 0.00617 | 5 decimals, in | δ_BC |
| 13 | `platform_delta_ED_in` | 0.01567 | 5 decimals, in | δ_ED |
| 14 | `platform_delta_FC_in` | 0.01176 | 5 decimals, in | δ_FC |
| 15 | `platform_delta_H_in` | 0.01455 | 5 decimals, in | Absolute downward movement v_H |
| 16 | `platform_delta_A_in` | 0.03924 | 5 decimals, in | Absolute downward movement v_A |
| 17 | `platform_delta_B_in` | 0.01793 | 5 decimals, in | Absolute downward movement v_B |
| 18 | `platform_delta_load_in` | 0.03498 | 5 decimals, in | v_P |
| 19 | `platform_theta_AB_rad` | 0.0003552 | 7 decimals, magnitude rad | abs(θ_AB) |
| 20 | `platform_theta_AB_deg` | 0.0204 | 4 decimals, magnitude degrees | abs(θ_AB) × 180/π |
| 21 | `platform_theta_DC_rad` | 0.00004665 | 8 decimals, magnitude rad | abs(θ_DC) |
| 22 | `platform_theta_DC_deg` | 0.00267 | 5 decimals, magnitude degrees | abs(θ_DC) × 180/π |
| 23 | `platform_lower_tilt_direction` | downward toward A | text | Result-dependent lower direction or level statement |
| 24 | `platform_upper_tilt_direction` | downward toward D | text | Result-dependent upper direction or level statement |
| 25 | `platform_governing_wire` | AH | text | Complete maximum-tension wire set; not a failure ranking |
| 26 | `platform_governing_force_lb` | 640.0 | 1 decimal, lbf | Maximum raw wire tension, formatted |
| 27 | `platform_dominant_wire` | AH | text | Complete weighted-contribution maximum set |
| 28 | `platform_dominant_force_lb` | 640.0 | 1 decimal, lbf | Tension of weighted-contribution winner(s); labeled list for ties |
| 29 | `platform_dominant_length_ft` | 4.50 | 2 decimals, ft | Free length of weighted-contribution winner(s); labeled list for ties |
| 30 | `platform_dominant_elongation_in` | 0.02469 | 5 decimals, in | Raw extension of weighted-contribution winner(s); labeled list for ties |

Added 31 keys:

| # | Placeholder key | Exact baseline display string | Precision / units | Definition or role |
|---:|---|---|---|---|
| 31 | `platform_weight_AH` | 0.800000 | 6 decimals | w_AH |
| 32 | `platform_weight_BC` | 0.200000 | 6 decimals | w_BC |
| 33 | `platform_weight_ED` | 0.571429 | 6 decimals | w_ED |
| 34 | `platform_weight_FC` | 0.428571 | 6 decimals | w_FC |
| 35 | `platform_contrib_AH_in` | 0.01974857 | 8 decimals, in | c_AH = w_AH δ_AH |
| 36 | `platform_contrib_BC_in` | 0.00123429 | 8 decimals, in | c_BC = w_BC δ_BC |
| 37 | `platform_contrib_ED_in` | 0.00895627 | 8 decimals, in | c_ED = w_ED δ_ED |
| 38 | `platform_contrib_FC_in` | 0.00503790 | 8 decimals, in | c_FC = w_FC δ_FC |
| 39 | `platform_contrib_AH_percent` | 56.46 | 2 decimals, % | 100 c_AH/v_P |
| 40 | `platform_contrib_BC_percent` | 3.53 | 2 decimals, % | 100 c_BC/v_P |
| 41 | `platform_contrib_ED_percent` | 25.61 | 2 decimals, % | 100 c_ED/v_P |
| 42 | `platform_contrib_FC_percent` | 14.40 | 2 decimals, % | 100 c_FC/v_P |
| 43 | `platform_theta_AB_signed_rad` | -0.0003552 | 7 decimals, signed rad | clockwise-positive |
| 44 | `platform_theta_AB_signed_deg` | -0.0204 | 4 decimals, signed degrees | signed rad × 180/π |
| 45 | `platform_theta_DC_signed_rad` | -0.00004665 | 8 decimals, signed rad | clockwise-positive |
| 46 | `platform_theta_DC_signed_deg` | -0.00267 | 5 decimals, signed degrees | signed rad × 180/π |
| 47 | `platform_largest_elongation_wire` | AH | text | all raw-elongation maxima |
| 48 | `platform_largest_elongation_in` | 0.02469 | 5 decimals, in | maximum raw extension |
| 49 | `platform_dominant_contribution_in` | 0.01974857 | 8 decimals, in | maximum c_i, per wire |
| 50 | `platform_dominant_contribution_percent` | 56.46 | 2 decimals, % | share for each maximum c_i |
| 51 | `platform_delta_B_minus_A_in` | -0.02131312 | 8 decimals, signed in | v_B − v_A |
| 52 | `platform_delta_C_minus_D_in` | -0.00391837 | 8 decimals, signed in | v_C − v_D |
| 53 | `platform_max_strain` | 0.00045714 | 8 decimals, dimensionless | maximum axial strain diagnostic |
| 54 | `platform_max_abs_rotation_rad` | 0.00035522 | 8 decimals, rad | maximum absolute first-order rotation |
| 55 | `platform_lower_tilt_explanation` | A has the larger downward displacement; AB tilts downward toward A (negative clockwise-positive rotation). | text | result-dependent endpoint explanation |
| 56 | `platform_upper_tilt_explanation` | D has the larger downward displacement; DC tilts downward toward D (negative clockwise-positive rotation). | text | result-dependent endpoint explanation |
| 57 | `platform_force_max_summary` | Maximum modeled tension: 640.0 lbf in AH. | text | force ranking, not failure control |
| 58 | `platform_largest_elongation_summary` | Largest raw wire elongation: AH, 0.02469 in. | text | raw-extension ranking |
| 59 | `platform_dominant_summary` | Largest contribution to load-point displacement: AH, 0.01974857 in (56.46% of the total). | text | weighted contribution ranking |
| 60 | `platform_model_status_note` | First-order instructional model; quantitative strain/rotation screening thresholds are not configured. The stated assumptions remain unverified for an actual platform. | text | baseline under proposed unassessed policy |
| 61 | `platform_contribution_sum_in` | 0.03497703 | 8 decimals, in | sum of all four c_i |

### 10.1 Compatibility meaning of retained keys

- platform_x_HC_ft: display the validated supplied x_HC, after closure validation; it no longer hides an independently inconsistent x_HC by recalculating a separate number.
- platform_governing_wire and platform_governing_force_lb: retain their names for compatibility but mean maximum modeled tensile force and its complete tied set, not a verified failure-governing wire.
- platform_dominant_wire: intentionally changes from largest raw extension to the full set maximizing c_i, as approved for q20. Baseline remains AH. The new platform_largest_elongation_wire/in fields carry the independent raw-extension ranking.
- platform_dominant_force_lb, platform_dominant_length_ft and platform_dominant_elongation_in describe the weighted-contribution winners. With one winner they retain scalar-looking baseline strings. With multiple winners they return labeled lists in wire order, e.g. “AH: 480.0; FC: 512.0” for force. Do not use those lists inside scalar equations. Revised question templates do not depend on their scalar appearance.
- platform_theta_AB_rad/deg and platform_theta_DC_rad/deg remain unsigned magnitudes. The four new signed fields use the stated clockwise-positive convention.
- Contribution percent fields contain the numeric percent without the % sign; templates append it once. Other numeric fields similarly omit units; prose/table headers append the specified units.

### 10.2 Numeric formatting

Use explicit en-US formatting with grouped thousands. Preserve existing baseline force precision (one decimal), converted-length precision (two decimals), extension/displacement precision (five decimals), and legacy angle precisions. New weights use six decimals, contributions/signed displacement differences eight, percentages two, maximum diagnostics eight, and signed angles match their magnitude counterparts.

All computation, rankings, policy checks and sums use raw values. Do not calculate contributions from rounded weights or compare rounded shares. The independently formatted percentage sum may differ slightly from 100.00%; do not change a physical contribution to force a rounded total.

For signed fields, use an explicit + for positive nonzero values, ASCII - for negative values consistently across formats, and a plain zero for a classified zero. The baseline strings use ASCII minus. Normalize negative zero only after the numerical zero policy. For a nonzero result that fixed precision would render as zero, use scientific notation with three significant digits, preserving its sign and the raw classification. Apply a corresponding scientific fallback for a tiny nonzero motion/contribution if fixed decimals would otherwise conceal it.

### 10.3 Exact parameter-dependent text rules

Raw ranking arrays retain every maximum and its value. All wire-name display fields return bare names: “AH” for one winner, “AH and FC” for two, and a comma-separated list with a final “and” for more. They do not append a second tie annotation; the summary field supplies that wording. Per-winner legacy numeric lists use the same presentation order and label each value explicitly.

Lower direction: negative Δv_AB → “downward toward A”; positive → “downward toward B”; numerical zero → “level (no tilt).” Upper direction: negative Δv_DC → “downward toward D”; positive → “downward toward C”; numerical zero → “level (no tilt).”

Lower explanation: “A has the larger downward displacement; AB tilts downward toward A (negative clockwise-positive rotation).” Swap A/B and negative/positive for a positive result. Zero: “A and B have equal downward displacement within numerical tolerance; AB remains level (zero tilt).” Upper explanation uses D/C analogously.

Single force maximum: “Maximum modeled tension: [force] lbf in [wire].” Tied maximum: “Maximum modeled tension: approximately [force] lbf in [wire list], tied within numerical tolerance.” Use the same grammar for raw-extension maxima, explicitly calling them raw wire elongations.

Single contribution maximum: “Largest contribution to load-point displacement: [wire], [c] in ([share]% of the total).” Tied maxima: “Largest contributions to load-point displacement: [wire list], tied within numerical tolerance; each approximately [c] in ([share]% of the total).” The list names every maximum. No tie is converted into a single winner.

Unassessed model-status note is the baseline string in the registry. Within-assigned-screen note: “Within the assigned strain/rotation screen; this does not verify material strength or complete platform safety.” Invalid/model-warning states do not render ordinary representative numerical answers; their diagnostics are handled under Sections 6–7.

Student common-model caution: “The small-deformation assumptions are stipulated for this instructional exercise; they have not been verified for a real suspension assembly.” Student warnings must not reveal solved numerical diagnostics.

## 11. Implementation design and exact update locations (I)

### 11.1 Pure, problem-scoped model

Propose scripts/platform-model.js as a pure shared browser/Node module, following the existing press helper's packaging without modifying its equations. isPlatform(problem) selects only this slug; evaluation validates the matching ID and ten-field schema. Do not broaden a P/A/E key-presence condition into a generic new model.

Proposed API: evaluate(problem, overrides = {}, policy = problem.modelValidityPolicy) resolves/validates input and computes one immutable current result. Input/configuration failures throw a typed PlatformInputError containing structured diagnostics and no display map. Nonfinite/failed arithmetic postconditions produce a specific platform computation diagnostic and block packet creation. Successfully resolved geometry returns {inputs, raw, status, diagnostics, rankings, display?}. Raw records contain the quantities in Sections 3–4, signed rotations, all four stress/strain diagnostics, residuals and contribution arrays. Rankings contain every maximum wire and its raw values.

Statuses and packet eligibility follow Section 7. A full 61-key display map is supplied only for unassessed or within-assigned-screen results. model-warning exposes trial raw diagnostics to the instructor diagnostic UI but no ordinary answer display map. canExport(result) returns true only for those two normal-packet states. Rendering must branch on status before substitution; missing display values must never become blank “solutions.”

dimensionKey(inputs) uses current validated raw inputs and the common unit convention. No model helper reads DOM state, mutates metadata, changes global Git/configuration, loads images or writes files. Compute once per packet render; do not reuse results after an input, variant or policy change.

### 11.2 Source metadata and QMD

| File | Required update after implementation approval |
|---|---|
| problems/suspended-equipment-platform/problem.json | Retain ID/slug/title/default document titles. Adopt the introduction/goal and explicit assigned-value scope. Add packetLayout = platform-common-model, showIdealizedImageInStudentPacket = false, commonModelStatement and commonModelAssumptions from Section 2, modelValidityPolicy from Section 7, and the exact 61-key derivedPlaceholders registry. Change active idealizedImage to the new instructor-free-bodies PNG. Add the unsolved common geometry as a supplementary image with an explicit common-model-geometry role. |
| variables.json | Retain ten keys, source units, defaults, ranges and increments. Clarify force units, initial free lengths, ideal axial-wire A/E, nodal spans and the constrained x_HC/L_AB relationship in labels; use the all-values-assigned table note. |
| questions.json | Implement every title/prose/answer/objective in Section 8, preserving IDs/display labels/audiences/sections. Update the four grading notes and Q8 workspace metadata. Remove static tilt comparison and unconditional centering wording. |
| variants/section-a.json | Retain all ten baseline numbers and q1–q21 selection. Adopt the revised title/description. Validate against both closure identities and the current policy. |
| _student-problem.qmd | Keep physical context, context image and revised introductory statement/goal only. Do not introduce the common nodal geometry before Q8/Q10. Make image/provenance scope explicit. |
| student-packet.qmd | Load the platform helper before packet-renderer. Keep one introductory include, then the generated phase layout. The bridge is generated after Q10. |
| instructor-guide.qmd | Load helper before renderer, update purpose/scope/grading guidance to the approved model, weighted contributions and conditional recommendations. Include common geometry and completed free bodies at their specified locations; no second contradictory geometry statement. |
| index.qmd | Keep overview and navigation, update summary/topic wording where needed and version to 0.3.0. Retain Faculty review status. Do not add solved FBDs to the student-facing overview. |
| New SVG/PNG assets | Implement Section 9; retain historical assets and context image. |

commonModelStatement is trusted source HTML for the bridge paragraphs. commonModelAssumptions is an ordered array of source HTML/plain-text assumption bodies. Source-controlled HTML supports subscripts/superscripts; resolved input values remain escaped. These fields are separate from introductory problemStatement to prevent early disclosure of the prescribed Q8 model.

Render the role-tagged common geometry explicitly in the platform bridge instead of letting generic supplementary-image placement put it before Q8 or duplicate it. Common bridge student fields may use only raw input/_unit/_label placeholders; derived numerical solution placeholders are forbidden there. Captions/alt text must follow the audience contract.

### 11.3 Direct, Builder and CLI integration

| Current file / function | Current anchor / exact behavior to implement |
|---|---|
| scripts/packet-renderer.js: variableMap | Starts line 58; platform block starts 2687. Replace only that block's platform calculation for the target slug with the shared result. Leave other calculations and PressFixtureModel integration unchanged. |
| Same: renderPacket / renderQuestionSection / renderVariableTable / renderSupplementaryImages / renderIdealizedImage | Current starts 3337 / 3310 / 3266 / 3241 / 3225. Add a platform-only packet layout: Q1–Q10, common bridge/data/geometry, M1, instructor-only FBD, M2–M11. Handle current variants and deliberate overrides through the pure resolver. Catch platform errors only in that branch. Direct context/photo stays in its introductory include; do not duplicate it inside the computed target. |
| instructor-builder.qmd: variableMap | Starts 113; platform block 2698. Use one evaluated currentValues result; do not rely on generic nullish-default or positivity-only behavior for this problem. |
| Same: renderVariableInputs / renderDocumentBody / renderPreview / image assembly | Starts 3242 / 3447 / 3507; image helpers 3330/3345; export helpers below. Preserve all ten editable controls. Show closure diagnostics instead of silently coupling fields. Render the exact phase layout and current key. Clear old answers/disable exports for invalid or model-warning states; recover on repair. |
| Same: embeddedPacketImages / fullHtmlDocument / printDocument / download path | Validate before image requests, download assembly or opening a print window. Student image set is context + common geometry; instructor additionally includes the completed FBD asset. Embed only the selected audience's packet images. Keep ordinary controls usable while correcting inputs. |
| scripts/render-assignment.mjs: variableMap | Starts 134; platform block 2754. Reuse the pure model and its raw/formatting policy. No new mechanics requirements for unrelated packages. |
| Same: renderBody / qmdDocument / HTML and Markdown image helpers | Starts 3402 / 3470; idealized/supplementary helpers 3305/3320/3333; question helper 3377. Add platform-specific layouts with identical content/order, current key, data, diagnostic gating and Q8 workspace across HTML/QMD. Preserve signed equations, units, Unicode/math and audience separation. Use correct local/relative image URLs and self-contained image embedding where promised by a download format. |
| _quarto.yml | Add scripts/platform-model.js as a site resource. Existing problem asset glob includes new SVG/PNGs. Preserve all press resources. |
| scripts/build-catalog.mjs | Validate target ID/slug, ten-field schema/defaults/variants, both closure identities, state/policy, 61-key registry and common-model assets/fields. Recognize platform-common-model as an allowed layout for this problem; leave the press geometry-first requirement intact. |
| docs/authoring-guide.qmd | Document this optional layout, required input closure, the Q8→common-model bridge, audience rules and the distinction between geometry errors/model screens. Do not rewrite unrelated authoring guidance. |

Function line anchors describe this HEAD, not permanent offsets. Add a dedicated platform branch rather than changing every generic packet's ordering, substitution semantics or validation requirements. The current press branch and its helper remain independently selected.

### 11.4 Native formats and workspace

Source HTML/QMD must contain Q1–Q10 then the bridge before M1, with no misplaced completed figure in student content. For Q8 use a renderer-generated 80 mm blank region in HTML and equivalent target-native QMD blocks for DOCX/PDF. Keep prompt and drawing region together where practical; blank Markdown lines are insufficient. Do not change the press workspace while implementing this one.

Use PNG fallbacks corresponding to the SVG masters for native exports; validate actual image relationships and rendering. Keep formulas as usable semantic math/text with subscripts, superscripts, signs and units after HTML-to-Markdown conversion. Do not remove labels or alter formula meaning to make a converter pass.

Proposed PDF route: allow this platform package to use Quarto's bundled Typst, as the press branch already does, while leaving unrelated PDF backends unchanged. Add platform-specific Typst QMD format/workspace support. This is a narrowly scoped rendering choice, not a change to the numerical model. DOCX remains native Quarto/Pandoc output. A .doc HTML wrapper is not a verified native DOCX layout.

Inspect actual HTML and QMD, actual PDF pages, and native DOCX layout when a working renderer is available. ZIP/XML checks alone do not verify DOCX pagination. Existing LibreOffice availability and prior DOCX visual limitations must be reported honestly; do not repeat a hung Word automation procedure or claim unavailable formats passed.

### 11.5 Catalog synchronization and hydraulic-press regression preservation

Update source package first, then run catalog generation and inspect all four catalog/health artifacts. The only intended package entry change is this platform. Catalog validation must reject invalid defaults/variants and model-warning cases that cannot form a normal packet. Unassessed instructional cases remain allowed under the proposed policy with explicit model-status wording; surface that limitation through the existing health-warning mechanism without implying an engineering certificate.

Capture pre-implementation hashes/output fixtures for the other 50 packages, including the hydraulic press, before changing production code. Current default/variant/audience coverage is expected to provide 204 cases and 816 four-route source outputs; compute the actual inventory rather than hard-coding a count if variants differ. All 51 catalog entries must remain present.

The existing hydraulic-press regression fixture contains the old platform as one of its 50 “unrelated” entries. After this platform is intentionally corrected, its old expected hash cannot remain the regression oracle. Update **only the suspended-equipment-platform entry** in tests/fixtures/hydraulic-unrelated-render-hashes.json after independent platform acceptance assertions pass. Preserve every other entry. Do not blindly refresh all expected hashes or skip/delete the platform test.

Extend tests/helpers/packet-harness.mjs with backward-compatible platform model injection, retaining the existing loadRoutes(root,sources,pressModel) interface and its press behavior. The default test environment must make the platform helper available when platform source functions dispatch to it. Document the one intentional fixture update. Existing hydraulic numerical/content/browser tests must still run and pass; the hydraulic source package, helper, assets and numerical registry must be unchanged.

Proposed added tests: tests/suspended-equipment-platform.test.mjs, tests/suspended-equipment-platform-browser.mjs, tests/suspended-equipment-platform-artifacts.py and tests/fixtures/platform-unrelated-render-hashes.json. New fixture excludes this platform and includes the corrected press. Existing hydraulic test files need no mechanics assertion removal; only test support and this intentional platform expected-entry update may be required.

Do not regenerate, modify or commit unrelated problem packages, historical images/reviews or publish.yml. A later graph refresh belongs to the approved implementation; the graphify CLI is currently unavailable, so any incomplete refresh must be reported, not silently treated as verified.

## 12. Independent regression and acceptance suite (J)

These are acceptance tests to create/run during a later approved implementation. The calculations below were prepared independently in memory for this specification. An exact-rational four-coordinate spring assembly independently reproduced all 15 cases across 480 numerical comparisons (largest scaled double/rational difference approximately 3.81e−16), including the exact rational zero/tie identities. No production test, catalog build or export was run now.

### 12.1 Numerical oracle

Use a separate exact-rational or high-precision four-coordinate spring assembly as the oracle, not a copy of the new helper. Coordinates are v = (v_D,v_C,v_A,v_B). For each wire, define δ_i = b_i v:

```text
b_ED = (1,0,0,0), k_ED = AE/L_u,in
b_FC = (0,1,0,0), k_FC = AE/L_u,in
b_AH = (−(1−h),−h,1,0), k_AH = AE/L_l,in
b_BC = (0,−1,0,1), k_BC = AE/L_l,in
K = Σ_i k_i b_iᵀ b_i
f = (0,0,P(1−r),Pr)
Solve K v = f; T_i = k_i δ_i
v_P = (1−r)v_A + r v_B
```

Verify both member equilibria and the whole-assembly moment residual, all four σ/ε/δ values, point movements, signed/magnitude angles, weights, contributions, percentage sums and rankings. Also verify v_P = Σ c_i = Σ T_i² L_i/(P AE). Raw numerical comparisons should use relative tolerance about 1e−9 with an absolute floor appropriate to units (e.g. 1e−8 lbf, 1e−12 in, 1e−12 rad); exact zero/tie classification uses Section 4's separate rules.

### 12.2 Numerical reference cases

Unlisted fields retain baseline values. All initial geometries in R01–R14 satisfy closure. Off-grid rational inputs are allowed under the unchanged ranges. Table angles are signed, clockwise positive; values are shown to enough digits for an independent oracle comparison.

| Case | Overrides in source units | v_P, in | θ_AB, rad | θ_DC, rad | Weighted maximum |
|---|---|---:|---:|---:|---|
| R01 baseline | None | 0.0349770262391 | -0.000355218658892 | -0.0000466472303207 | AH |
| R02 load doubled | P = 1600 | 0.0699540524781 | -0.000710437317784 | -0.0000932944606414 | AH |
| R03 common area doubled | A_w = 0.1 | 0.0174885131195 | -0.000177609329446 | -0.0000233236151603 | AH |
| R04 modulus halved | E_w = 14000 | 0.0699540524781 | -0.000710437317784 | -0.0000932944606414 | AH |
| R05 upper length doubled | L_u = 8 | 0.0489711953353 | -0.000401865889213 | -0.0000932944606414 | AH |
| R06 lower midpoint | x_P = 2.5 | 0.0302623906706 | 0.0000932944606414 | 0.0000932944606414 | FC |
| R07 reversed tilts | x_P = 4 | 0.0416942274052 | 0.000541807580175 | 0.000233236151603 | FC |
| R08 upper zero tilt | x_P = 1.5 | 0.0316114285714 | -0.000205714285714 | 0 (exact) | AH |
| R09 weighted-dominance counterexample | L_DC = 10; x_DH = 4; x_HC = 6; L_AB = 6; x_P = 2.4 | 0.0308352 | -0.0000217142857143 | 0.000064 | FC |
| R10 near lower optimum | x_P = 2.2 | 0.0299136 | 0.00000359183673469 | 0.000065306122449 | FC |
| R11 lower zero tilt | x_P = 2805/1282 ≈ 2.18798751950078 | 0.0299130822376 | 0 (classified) | 0.0000641854245598 | FC |
| R12 maximum force tie | x_P = 25/12 ≈ 2.08333333333333 | 0.0299523809524 | -0.0000312925170068 | 0.0000544217687075 | AH |
| R13 maximum contribution tie | L_DC = 10; x_DH = 4; x_HC = 6; L_AB = 6; x_P = 2.4; L_u = 2025/512 = 3.955078125 | 0.0306691071429 | -0.0000224330357143 | 0.00006328125 | AH and FC |
| R14 raw elongation tie | x_P = 235/103 ≈ 2.28155339805825 | 0.0299444945666 | 0.0000279770160491 | 0.0000729146027343 | FC |
| R15 gross trial | P = 10000; A_w = 0.001; E_w = 1000 | 612.097959184 | -6.21632653061 | -0.816326530612 | AH (trial only) |

R15 numbers are explicitly out-of-model trial diagnostics, not ordinary packet results. R11 is exact zero for the stated rational input; double arithmetic may leave a classified-zero residual.

| Case | T_AH, lbf | T_BC, lbf | T_ED, lbf | T_FC, lbf |
|---|---:|---:|---:|---:|
| R01 | 640 | 160 | 457.142857143 | 342.857142857 |
| R02 | 1280 | 320 | 914.285714286 | 685.714285714 |
| R03 | 640 | 160 | 457.142857143 | 342.857142857 |
| R04 | 640 | 160 | 457.142857143 | 342.857142857 |
| R05 | 640 | 160 | 457.142857143 | 342.857142857 |
| R06 | 400 | 400 | 285.714285714 | 514.285714286 |
| R07 | 160 | 640 | 114.285714286 | 685.714285714 |
| R08 | 560 | 240 | 400 | 400 |
| R09 | 480 | 320 | 288 | 512 |
| R10 | 448 | 352 | 320 | 480 |
| R11 | 449.92199688 | 350.07800312 | 321.372854914 | 478.627145086 |
| R12 | 466.666666667 | 333.333333333 | 333.333333333 | 466.666666667 |
| R13 | 480 | 320 | 288 | 512 |
| R14 | 434.951456311 | 365.048543689 | 310.67961165 | 489.32038835 |
| R15 | 8000 | 2000 | 5714.28571429 | 4285.71428571 |

R02 doubles all forces/motions/contributions; R03 halves motions/contributions without changing forces; R04 doubles motions at unchanged forces; R05 changes only upper-wire compliance and its effect on both tiers. Each case must run through direct, Builder, CLI HTML and CLI QMD with the same resolved inputs and interpretation text.

### 12.3 Counterexamples and special expected behavior

- R06/R07: directions toward B/C, with no fixed A/D comparison sentence. R06 lower midpoint is not a guarantee of levelness at either tier.
- R08: upper θ = 0 exactly; upper direction is level (no tilt), with no fabricated C/D descent. No negative-zero display.
- R09: raw extension maximum AH (0.018514285714 in), weighted maximum FC (0.011234742857 in). Maximum force FC = 512 lbf. The q20 and q21 contribution ranking must select FC.
- R10 versus R06: moving x_P from 2.2 to 2.5 ft reduces eccentricity relative to AB's midpoint but increases v_P from 0.02991360 to 0.03026239 in and increases lower tilt magnitude. Recommendation text must not promise unconditional improvement.
- R11: lower θ is zero within numerical tolerance, even if double arithmetic leaves a tiny residual. Upper tilt remains positive. Near-zero classification is not a display-rounding test.
- R12: maximum tension is tied between AH and FC at 466.666666667 lbf; return both. The weighted contribution maximum remains AH.
- R13: weighted maxima AH and FC are tied at 0.011108571429 in each. Keep their distinct forces/lengths/extensions in raw data and the legacy labeled-list fields. Do not sum their shares into a per-wire maximum share.
- R14: largest raw extensions AH and FC tie at 0.016776699029 in. Weighted maximum is FC; do not conflate the two rankings.
- R15: geometrically valid, in-range but gross first-order trial. Expect model-warning, instructor-only trial diagnostics and blocked ordinary exports under the proposed policy. It is not labeled an invalid initial geometry or an actual material failure.

Ranking tests must include one/two/multiple maxima, exact equality, differences inside/outside numerical tolerance, and cases that round to the same displayed number but are not tied under raw comparison. Level/direction tests must include exact zero, raw values inside/outside zero tolerance, both signs and a nonzero value needing scientific fallback.

### 12.4 Effective-input and geometry rejection cases

| Case | Required response |
|---|---|
| Override only P = 1600 | Inherit the other nine defaults; normal instructional result under proposed unassessed policy. |
| Explicit null/undefined/blank/whitespace, nonnumeric text, boolean, array, object, NaN or ±Infinity in any of ten keys | Reject; no default fallback for an explicit invalid value. |
| Effective missing value; missing/duplicate schema entry; wrong unit; invalid range/policy metadata; unknown override key | Specific configuration/input error; no packet. |
| Any zero/negative input | Reject. A negative x_HC cannot be ignored. |
| Values just below min or above max, including x_HC and both redundant spans | Reject without clamping. Include endpoints of valid ranges when geometry/model constraints can also be met. |
| x_HC = 4 ft only | Reject L_DC ≠ x_DH + x_HC and L_AB ≠ x_HC; do not silently replace x_HC with 5. |
| L_AB = 6 ft only | Reject L_AB ≠ x_HC. |
| L_DC = 8 ft only, or x_DH = 3 ft only | Reject closure, rather than compute a mixed vertical/inclined geometry. |
| x_P = 6 ft with L_AB = 5 | Reject strict interior-load/taut-wire condition; no compressive-wire or alternate active-set solution. |
| x_P = L_AB | Reject boundary/slack case even though the field value can be in range. |
| x_DH = L_DC, or x_HC = 0 | Reject strict ordering/positive-span conditions. |
| Closure perturbation 0.5 × the comparison tolerance versus 2 × tolerance | Accept representationally equivalent case versus reject outside case. Test equality in the comparator directly, avoiding decimal-to-binary boundary ambiguity. |
| Repaired inputs following each rejection | Fresh correct results and eligible controls; no stale number, direction, image key or diagnostic remains. |

Run these through the resolver and the delivery entry points, not just number parsing. Test invalid variants/defaults in catalog validation and CLI validation before any file creation. Check error messages identify the specific input identity and values.

### 12.5 Model-screen policy tests

With null limits, a baseline finite segment is unassessed, not within-assigned-screen. With only one limit set, a non-exceeding result is still unassessed; an exceeded configured limit is model-warning. With both limits set and raw values at/below them, state is within-assigned-screen. Values just above either limit trigger warning. Unit-test exact boundary and ±1e−6 relative cases, including identical rounded displays, using synthetic test-only limits. These test values are not production material/angle criteria.

Test the necessary predicted-segment check at/below/above a vertical displacement difference equal to the member length, classified as a model warning at the limiting/gross state under Section 7. Test R15 through every route. Model-warning standard exports remain disabled and invalid geometry retains its different error category. No student banner or exported artifact includes solved trial numerical diagnostics.

### 12.6 Content, figures and native output acceptance

- Source/metadata: exactly q1–q21; exact Q/M display progression; all ten fields/defaults/ranges/increments retained; 61 unique derived keys; all template fields declared and resolved for normal states.
- Phase order: no common prescribed geometry before Q8/Q10 in student material; Q8 remains independent; bridge/assumptions/key/data/unsolved geometry between Q10 and M1; instructor FBD after M1 only; no duplicate data/figure.
- Whole composed student packet: context and unsolved common image only, zero representative answers. Whole instructor packet: those two plus completed FBDs and 21 answers. A direct renderer target alone excludes its separately included context photo, so expect one/two target images rather than falsely comparing target counts to whole-packet counts.
- Inspect source SVGs and original-resolution PNGs: exact attachment/node alignment, P strictly between A/B, no lower overhang, proper dimension directions, opposing forces at C at one point, no clamp/compression arrows, no numerical baseline solutions baked into reusable artwork. Confirm raster equivalence and accessible captions/alt.
- Edit all ten inputs in Builder, especially x_HC and the coupled spans. Confirm identity diagnostics and current dimension key. Change r across sign reversals/zero, test ties and R09 dominance.
- Actual browser: test default/section-a student/instructor; every figure loads; no script errors; invalid/warning→valid recovery; correct buttons; export validates before asynchronous assembly. Exported HTML/DOC images are audience-correct and portable as promised.
- Inspect generated HTML and QMD, actual PDF pages, and native DOCX when rendering support is available: all 21 questions in order, equations/signs/units intact, Q8 region usable, common model in the correct phase, no clipping/orphaned headings or student answers. Check DOCX image hashes/relationships as well as visual layout. Record unavailable tools/output checks explicitly.
- Retain and run the existing hydraulic-press 81-test numerical/content/regression suite and browser checks after the intentional single platform-fixture entry update. New platform tests must not weaken or skip the press assertions.
- Compare all 50 other package catalog entries and default/variant/audience four-route outputs with pre-implementation fixtures, including the corrected press. Preserve all 51 catalog entries and package directories, all other health entries, historical assets, review documents and publish workflow.

Acceptance cannot be declared from catalog status OK, absence of unresolved tokens or agreement between copied renderers alone. Both independent numerical checks and actual audience/output inspection are required.

## 13. Open faculty decisions and evidence gaps (K)

The endpoint topology, baseline values, weighted q20 target, 21-question progression and input-field retention are settled by the user's approved decisions. Do not reopen those choices or substitute a different physical model during implementation.

1. **Quantitative approximation screen and export policy:** approve the concrete unassessed/model-warning policy in Section 7, or supply a replacement. Select justified strain/rotation limits if quantitative screens are required, including how their basis is documented. Null thresholds must not be represented as a passed validity test. No material-strength limit is inferred from E.
2. **Actual suspension construction:** the instructional model is four ideal axial wires with assigned EA. Determine whether any future industrial claim concerns solid wire/rod, wire rope, chain or another assembly. A real assembly needs appropriate metallic/effective area, apparent stiffness, seating/termination behavior and reference-load evidence. This evidence gap does not justify inventing a grade now.
3. **Provenance and real structural scope:** document P, geometry, material/assembly stiffness and any desired real-platform correspondence before using them as industrial specifications. Real deck weights, bending stiffness, supports/connectors, stability, dynamics and service limits remain unverified. The retained assignments and explicit omissions are acceptable only as the stated instructional idealization.
4. **Audience access expectations:** this specification enforces packet-content separation. If “instructor-only” must also mean that students cannot retrieve publicly served instructor pages/catalog answers, approve a separate publishing/authentication scope; do not claim renderer visibility alone provides that protection.
5. **Native output verification:** platform DOCX/PDF layout has not been established by this specification. During implementation, verify actual available formats and preserve a clear limitation for any unavailable native DOCX renderer. Graphify CLI is also currently unavailable and must not be reported as refreshed without running it.

Baseline A_w corresponds to about 0.25231 in diameter only if it is one solid circular wire. E_w = 28 Mpsi is consistent with examples of solid stainless-steel moduli cited in the accepted audit, but no grade is thereby assigned. The [SSINA tables](https://www.ssina.com/education/technical-resources/composition-properties/) and [Bridon-Bekaert rope technical guide](https://www.bekaert.com/content/dam/bbrg-myrope/products/technical-sheets/Cranes%20and%20Industrial.pdf) are background plausibility/assembly-model references, not evidence that this platform uses their products or values. No manufacturer data or citations have been invented.

## 14. Preparation and preservation record

Preparation was limited to read-only source/accepted-review inspection, existing-graph traversal in memory, independent calculations (including the exact-rational spring verification) and drafting this document. The graphify CLI query was attempted but remains unavailable. No graph files, images, source package, calculation scripts, catalogs, tests or rendered exports were created or modified.

The working tree already contained the three tracked hydraulic review documents removed from their former paths and their untracked relocated copies, plus the accepted platform audit in its new subfolder. Those changes were present before this request and have been left exactly as found. At specification preparation, the moved platform audit matched the accepted content hash c13e99447599eabb4b8d0e3d85c06c68e3cf47d9047411ab1555610295107036.

A SHA-256 snapshot covered 996 pre-existing non-.git files, excluding ignored output/environment folders. Final verification must find all of them unchanged and no missing pre-existing file relative to this task's starting snapshot. The sole new difference introduced by this request is docs/reviews/suspended-equipment-platform-correction-specification.md. Branch/HEAD and the index remain unchanged; all 51 problem packages remain present. No staging, commit, push, merge, deployment or publication was performed.
