# Proposed correction specification: hydraulic press fixture

Date: 2026-10-25
Status: **proposal for review; no implementation authorized by this document**\
Problem: MOS-PRESS-006 — `hydraulic-press-punching-shear`\
Working clone: `C:\Sumanth\Questions of SOM\Github\context-rich-mechanics-quality-review`\
Branch: `quality-review/engineering-review-2026-10-25`\
Reviewed HEAD: `772817e496ac66476fce7464dcceebde31aa2588`\
Basis: faculty-selected direction and [detailed engineering review](hydraulic-press-detailed-review.md).

## 1. Approved direction and specification boundaries

Retain a cylindrical hydraulic press ram loading a plate on two separate blocks. Evaluate mean circular-face contact pressure and a hypothetical nominal circular punch-through shear demand. The plate remains intact in the modeled load case. The imaginary circular surface is an analysis surface, not evidence of a crack, a manufactured hole, a circular die, or the actual governing failure mode.

Use \(A_s=\pi dt\) and \(A_b=\pi d^2/4\). Retain all seven baseline numbers provisionally as instructional assumptions. Treat 80 and 120 MPa as illustrative allowable criteria. Use allowable-to-demand reserve and utilization. Do not report unsupported material-strength factors of safety, validated cutting force, or complete fixture safety.

This specification contains proposed replacement teaching text, calculation contracts, figure requirements, implementation locations, and independent acceptance cases. No problem files, calculation scripts, images, catalogs, or graph outputs are changed at this stage. The earlier detailed review remains a historical record of the uncorrected package.

## 2. Complete proposed student-facing problem

### Proposed title and summary

**Title:** Hydraulic Press Fixture: Nominal Circular Punch-Through and Bearing Checks

**Summary:** Evaluate two local average-stress demands in a press-loaded plate and compare them with illustrative allowable criteria, while distinguishing a nominal local check from complete fixture assessment.

### Replacement problem statement

A manufacturing engineering team is reviewing a hydraulic press fixture used to apply a prescribed vertical compressive load to a metal plate. A flat-ended cylindrical ram contacts the upper plate surface. Two separate, parallel support blocks carry the plate from below and transfer its load to the press table. The plate is intended to remain intact during this load case.

The ram is centered over the clear opening between the blocks. Let d be the ram-face diameter, t the plate thickness, s the horizontal clear distance between the blocks' inner faces, and b the overall plate extent in that same horizontal direction. The blocks support the plate on the two sides outside the opening. The plate and both block contact regions extend sufficiently far into the page that the entire ram footprint and an imaginary cylinder of diameter d lie within the plate. The blocks extend across the plate depth. No numerical dimension into the page is assigned because a global plate analysis is outside this exercise.

The Given Data table supplies the prescribed load P and the geometry. These values are instructional assumptions, provisionally retained for this exercise; they are not documented measurements or manufacturer specifications. The two listed allowable criteria are also illustrative assignments, with no established material-grade or design-standard basis.

As a preliminary local assessment, consider (1) average compressive contact pressure on the plate under the circular ram face and (2) nominal circular punch-through shear demand on the vertical cylindrical surface passing through the plate around the edge of that footprint. This second surface is hypothetical: the plate has not been cut or separated. Its lower circular face lies over the unsupported opening.

Identify the complete stress-evaluation surfaces before calculating their areas. Compare the resulting demands with the two illustrative allowable criteria using reserve and utilization. State a limited engineering recommendation and identify what remains unverified. The prescribed load is a fixture load case; this exercise does not determine the force required to manufacture a hole.

### Replacement engineering goal

Develop a transparent local average-stress model; calculate mean circular-face contact pressure and nominal circular punch-through shear demand; evaluate each against its illustrative allowable criterion; and explain why those two checks alone cannot establish the actual failure mode or approve the complete fixture.

### Self-contained component list

- Flat-ended cylindrical press ram.
- Intact metal plate.
- Left and right support blocks, separated by an open span.
- Press table or fixture base supporting both blocks.

Use the same statement, goal, assumptions, and component list in the direct QMD packet and the catalog-driven Builder/CLI documents. The context illustration supplies application context; the geometry schematic and current Given Data define the teaching model.

### Proposed Given Data table and labels

| Key | Student-facing label | Baseline value | Status |
|---|---|---:|---|
| `P` | Prescribed quasi-static compressive load | 40 kN | Instructional assumption |
| `d` | Diameter of flat circular ram face | 50 mm | Instructional assumption |
| `t` | Plate thickness | 10 mm | Instructional assumption |
| `s` | Clear opening between block inner faces | 60 mm | Instructional assumption |
| `b` | Overall plate extent in the front-view span direction | 120 mm | Instructional assumption |
| `tau_allow` | Illustrative allowable criterion for nominal circular shear demand | 80 MPa | Assigned comparison criterion; material basis unverified |
| `sigma_bearing_allow` | Illustrative allowable criterion for mean ram-face contact pressure | 120 MPa | Assigned comparison criterion; material basis unverified |

These are the same seven input keys, units, and baseline numbers as the existing package. Both criteria are supplied in this default exercise; remove “optional” from their labels and default question wording. No eighth numerical input is introduced.

### Replacement engineering assumptions

Provide the following assumptions to students before the modeling questions:

1. Loading is quasi-static, vertical, centered, and normal to a flat ram face. P is the prescribed force transmitted to the plate.
2. The initially intact plate has uniform thickness t and is represented by its undeformed geometry for these nominal checks. Ram and block deformation are excluded.
3. The entire circular ram face remains in contact with the plate. Calculate mean contact pressure from the net normal force and full contact area; a uniform real pressure distribution is not established.
4. The blocks provide upward normal contact reactions outside the clear opening. The plate is unbonded and unclamped at the blocks; omit friction and do not infer fixed plate ends from fixed block bases.
5. The centered geometry satisfies \(0<d<s<b\). Plate material extends beyond the full circle in the into-page direction, and the blocks span that depth. The imaginary core's lower face has no contact with blocks, the table, or other objects.
6. For the hypothetical local shear check, use a vertical cylindrical surface of diameter d through thickness t, coincident in plan with the ram footprint perimeter. Its circumferential mean vertical shear traction is a nominal demand. Its real distribution need not be uniform.
7. Ignore self-weight and any other load directly on the imaginary core. This permits its vertical load balance to use P.
8. Bending, plate deflection, edge concentrations, multiaxial yielding, indentation, contact redistribution, loss of contact, large deformation, support/ram/base capacity, fatigue, and alignment are outside the two numerical checks. Their effects are unverified rather than demonstrated negligible.
9. The two allowables are illustrative criteria for these respective nominal demand measures. They do not identify a material's yield/fracture strength, an actual safety factor, or an approved operating limit.

The geometry assumptions in items 4–5 are proposed clarifications of incomplete source geometry. They require faculty acceptance as teaching-model assumptions; they are not recovered measurements of the pictured fixture.

## 3. Physical coherence of the selected geometry

### Coordinate definition for figures and prose

Take x horizontally across the support opening, y into the page, and z vertically upward. The plate lower face is z = 0 and its upper face is z = t; the ram axis is x = y = 0.

| Feature | Definition | Baseline location |
|---|---|---|
| Ram footprint / imaginary core boundary in plan | \(x^2+y^2=(d/2)^2\) | Radius 25 mm |
| Ram footprint extremes in front view | \(x=\pm d/2\) | −25 and +25 mm |
| Block inner faces | \(x=\pm s/2\) | −30 and +30 mm |
| Plate front-view ends | \(x=\pm b/2\) | −60 and +60 mm |
| Plate thickness | \(0\le z\le t\) | 10 mm |
| Ram-edge to block-inner-edge horizontal offset | \(g=(s-d)/2\) | 5 mm each side |
| Available plate extent outside each opening edge | \((b-s)/2\) | 30 mm each side |

For the proposed schematic, show each block supporting the corresponding outer strip of plate, from its inner face outward to the plate end. This specifies an illustrative 30 mm contact extent in x at baseline, derived from s and b. It does not establish support bearing stress or capacity. If faculty prefers blocks extending beyond the plate ends, that is also compatible with the local check; the inner faces and supported plate strips must remain unambiguous.

The into-page plate edges must lie beyond y = ±d/2, with a positive margin; neither a numerical width nor a meaningful edge-clearance capacity is inferred. Show break/continuation marks and an explicit note about adequate depth. A plate truncated through the footprint would violate this model.

### Why a circular nominal check is admissible with two blocks

For every point on the core's lower disk, \(|x|\le d/2<s/2\). The complete disk therefore lies in the unsupported strip between the blocks, given the stated into-page coverage. At baseline, \(|x|\le25\ \mathrm{mm}<30\ \mathrm{mm}\). None of the core's lower face is directly supported.

Isolate the imaginary core without asserting physical separation. The ram supplies downward P over its top disk. The core's bottom face is free and self-weight is omitted. Vertical traction on the cylindrical sidewall must consequently have upward resultant P:

\[
\int_{A_s}\tau_z\,dA=P,\qquad
\overline{\tau}_z=\frac{P}{A_s},\qquad
A_s=\pi dt.
\]

The two traces seen in a diametral section are intersections of one cylindrical wall with the section plane. They do not justify two rectangular shear planes of area dt.

This is an equilibrium-based nominal average on a selected surface. The two long support regions are not rotationally symmetric about the ram. They can produce a nonuniform, three-dimensional stress field and important bending. No circumferentially uniform stress, actual cylindrical fracture, negligible bending, or resistance to indentation follows from this calculation. The 5 mm offset is a horizontal fixture-layout distance, not die clearance.

Full circular contact remains a conditional modeling assumption, not a prediction from plate/contact analysis. Dimensions and load alone cannot prove it persists in a real fixture.

## 4. Complete revised questions and instructor answers

Keep q1–q19 selected and preserve the existing section grouping: context q1–q7, transition q8–q10, analysis q11–q19. Retain stable IDs for the default variant.

The text below is normative replacement wording. Double-brace tokens denote proposed existing/new renderer placeholders from Section 5. Render equations as equations or equivalent accessible HTML, not raw escaped source. Numerical answers below use placeholders so changed input sets do not retain baseline answers.

No question merge is necessary. Consolidate repeated loading/support description into q2/q3, and repurpose q11 as the local core-equilibrium check. This preserves 19 questions while removing its earlier dependence on a hidden instructor diagram.

### q1 — Fixture function and assessment objective

**Student:** What is the structural function of the fixture, and is the plate intended to remain intact or to be intentionally pierced in this load case?

**Instructor:** The fixture transfers the prescribed compressive load from the ram into the plate, through the plate to the two support blocks, and then into the press table/base. The plate is intended to remain intact. Circular punch-through is a hypothetical local shear check; the task is not a hole-manufacturing or cutting-force calculation.

**Learning objective:** Connect application, load transfer, and the intended limited assessment.\
**Type:** conceptual.

### q2 — Applied load

**Student:** Where is P applied, in what direction, and what does its assigned value represent?

**Instructor:** P = {{P}} {{P_unit}} acts vertically downward through the centered flat-ended cylindrical ram onto the plate. It is a prescribed quasi-static instructional load. It is not a validated manufacturing cutting force or a documented press rating.

**Learning objective:** Identify force location, direction, and basis.\
**Type:** conceptual.

### q3 — Supports and boundary conditions

**Student:** Describe how the two blocks constrain the plate. Which region is unsupported, and are the plate ends clamped?

**Instructor:** The two blocks provide upward normal contact reactions on the outer plate strips, outside the clear opening s = {{s}} {{s_unit}}. The central strip between their inner faces is unsupported from below. The plate is unbonded and unclamped, with friction omitted; fixing the block bases does not create fixed plate ends. The model assumes the blocks extend across the plate depth.

**Learning objective:** Distinguish support contact from clamping and define the unsupported region.\
**Type:** conceptual.

### q4 — Load path

**Student:** Trace the load path through the ram, plate, two blocks, and press table/base. Distinguish an internal analysis surface from a physical component.

**Instructor:** Load passes from the ram through its contact footprint into plate stresses, then through the support contact regions into the blocks and base. The hypothetical circular shear wall is an internal surface used to evaluate a nominal demand; it is not an extra component or a pre-existing cut. The plate can transfer load through bending and other stress components even though only two local average demands are calculated here.

**Learning objective:** Explain load transfer without prescribing a demonstrated failure path.\
**Type:** conceptual.

### q5 — Selected locations and excluded checks

**Student:** Identify the two plate regions selected for numerical checks. Name at least one other region or response that could matter to the real fixture but is not assessed by these checks.

**Instructor:** The selected regions are the circular contact footprint under the ram and the hypothetical vertical cylindrical wall around that footprint through the plate thickness. Other potentially important items include plate bending/deflection, local indentation, plate-to-block contact, and block, ram, or base capacity. Selecting two checks does not establish that those locations govern the complete fixture.

**Learning objective:** Separate chosen local checks from a complete capacity assessment.\
**Type:** conceptual.

### q6 — Meaning of the two stress demands

**Student:** What physical stress quantity is evaluated at each selected region? Does either average demand establish that a particular failure mode occurs?

**Instructor:** The top disk carries normal compressive contact pressure; the calculation gives its mean magnitude. The cylindrical wall carries a vertical shear-traction resultant; the calculation gives its nominal circumferential mean over the wall area. Neither average establishes a real peak stress, a crack, a completed cut, or the actual governing failure mode.

**Learning objective:** Distinguish contact pressure, nominal shear demand, and failure prediction.\
**Type:** conceptual.

### q7 — Inputs and their roles

**Student:** Which inputs enter the two local stress formulas, which describe layout and model feasibility, and which define the assigned comparison criteria?

**Instructor:** P and d determine mean circular-face contact pressure. P, d, and t determine nominal circular shear demand. s and b define the support opening and plate extent and must be geometrically compatible with d; they do not enter these two local P/A formulas. The two illustrative allowable criteria are {{tau_allow}} {{tau_allow_unit}} for nominal shear and {{sigma_bearing_allow}} {{sigma_bearing_allow_unit}} for mean contact pressure. Their assigned values have no documented material basis.

**Learning objective:** Distinguish computational inputs, layout constraints, and allowable criteria.\
**Type:** conceptual.

### q8 — Student structural idealization

**Student:** Using the student geometry schematic and Given Data, draw your own model. Show the cylinder and circular footprint, plate thickness, separate blocks, P, d, t, s, and b. Add a plan or perspective view identifying the complete hypothetical shear surface through the plate. Distinguish that surface from the contact footprint and show the load-transfer directions you would use.

**Instructor:** A satisfactory sketch has centered downward P, the plate on two unbonded blocks, a full circular ram footprint inside the opening, and a vertical cylindrical candidate surface through thickness t around that circle. A section view may show two wall traces, but the plan/perspective view must identify one continuous cylindrical wall. The contact disk and wall are distinct areas. The sketch must show separate ram edges and block inner edges and adequate plate depth beyond the circle. The plate remains intact.

**Learning objective:** Construct a consistent 3D interpretation from supplied geometry.\
**Type:** fbd/modeling.\
**Presentation requirement:** Provide a real drawing region, approximately 80 mm high in printed output, rather than placeholder prose. Do not insert an instructor answer figure into this question.

### q9 — Assumptions and limitations

**Student:** State the assumptions needed for these two nominal checks. Identify two real effects excluded from the calculations and explain whether exclusion establishes that they are negligible.

**Instructor:** Relevant assumptions include prescribed centered quasi-static loading, full flat circular contact, uniform plate thickness, adequate into-page extent, a free lower core face, and rigid support/ram idealizations. The core sidewall is an imaginary cylindrical surface and self-weight is omitted. Mean stresses do not require proof of uniform actual distributions. Bending, deflection, contact redistribution, indentation, and other effects are unverified. Excluding them from the exercise does not show they are negligible or non-governing.

**Learning objective:** State assumptions without confusing omission with physical insignificance.\
**Type:** conceptual.

### q10 — Analysis plan

**Student:** Before substituting values, outline the sequence for checking the two nominal demands against the illustrative criteria.

**Instructor:** Confirm the geometry and units; identify the full contact disk and cylindrical sidewall; determine their areas; convert P from kN to N; calculate both average demands; compare their magnitudes; calculate allowable-to-demand reserve and demand-to-allowable utilization for each; identify the more highly utilized nominal check; and give a recommendation limited to those results and their assumptions. Use unrounded internal values until final display.

**Learning objective:** Plan a surface-first calculation and criterion-based assessment.\
**Type:** calculation planning.

### q11 — Equilibrium of the imaginary circular core

**Student:** Explain why the lower face of the imaginary circular core is unsupported in the selected geometry. For a free body of that core, identify how the applied load is balanced. What does this equilibrium argument establish, and what does it not establish?

**Instructor:** The ram/core diameter is {{d}} {{d_unit}} and the clear opening is {{s}} {{s_unit}}, with d < s. Centering gives a horizontal ram-edge to block-inner-edge offset (s − d)/2 = {{press_edge_gap_mm}} mm on each side. With the assumed plate depth, the entire lower core disk lies over the opening. Downward P on the upper disk is balanced by an upward vertical shear-traction resultant on the cylindrical wall; its integrated value is P. This justifies using P as the nominal shear resultant on that selected wall. It does not prove uniform shear, a fracture shape, or that bending is non-governing.

**Learning objective:** Justify the selected local shear resultant by equilibrium.\
**Type:** fbd/modeling.

### q12 — Stress-evaluation surfaces

**Student:** Describe the full contact surface and the full hypothetical shear surface. Explain why two traces of the wall in a section drawing are insufficient to determine its area by counting planes.

**Instructor:** Contact is evaluated over the horizontal circular disk beneath the flat ram face. The candidate shear surface is the vertical cylindrical sidewall of diameter d and height t around that disk. The two section traces are intersections with one cylindrical wall, not two rectangular planes of area dt. The wall area must use the complete circumference multiplied by thickness.

**Learning objective:** Identify the complete surfaces before selecting area equations.\
**Type:** conceptual.

### q13 — Circular contact area

**Student:** Determine the full circular contact area used for the mean compressive pressure.

**Instructor:** \(A_b=\pi d^2/4=\pi({{d}}\ \mathrm{mm})^2/4={{press_bearing_area_mm2}}\ \mathrm{mm^2}\). This uses the full flat circular face. A projected rectangle would describe a different contact model; it is not an alternative convention for this disk.

**Learning objective:** Compute the area of the actual assumed contact footprint.\
**Type:** calculation.

### q14 — Cylindrical shear surface area

**Student:** Determine the nominal circular punch-through shear area. Show how the surface follows from the footprint perimeter and plate thickness.

**Instructor:** The complete perimeter is \(L=\pi d={{press_shear_perimeter_mm}}\ \mathrm{mm}\). The wall area is \(A_s=Lt=\pi dt=\pi({{d}}\ \mathrm{mm})({{t}}\ \mathrm{mm})={{press_punching_area_mm2}}\ \mathrm{mm^2}\). Do not replace the circumference by twice the diameter. The calculated wall is hypothetical; the plate has not been cut.

**Learning objective:** Derive the cylindrical area from its complete perimeter.\
**Type:** calculation.

### q15 — Nominal circular shear demand

**Student:** Calculate the nominal circular punch-through shear demand and state its units.

**Instructor:** \(P={{P}}\ \mathrm{kN}={{press_load_N}}\ \mathrm N\). Then \(\tau_{\mathrm{nom}}=P/A_s={{press_load_N}}\ \mathrm N/({{press_punching_area_mm2}}\ \mathrm{mm^2})={{press_punching_shear_MPa}}\ \mathrm{MPa}\). Internally use the unrounded area; displayed substitutions are rounded. N/mm² = MPa. This is a nominal average demand on the selected wall, not an established maximum or failure stress.

**Learning objective:** Calculate nominal shear demand with consistent units and interpretation.\
**Type:** calculation.

### q16 — Mean circular-face contact pressure

**Student:** Calculate the average compressive contact pressure on the plate under the ram.

**Instructor:** \(\sigma_b=P/A_b={{press_load_N}}\ \mathrm N/({{press_bearing_area_mm2}}\ \mathrm{mm^2})={{press_bearing_stress_MPa}}\ \mathrm{MPa}\). Report the positive compressive magnitude and use the unrounded area internally. This is mean pressure beneath the ram, not plate-to-block bearing, tensile stress, or a verified resistance to local indentation.

**Learning objective:** Calculate and interpret mean normal contact pressure.\
**Type:** calculation.

### q17 — Stress magnitude versus criterion control

**Student:** Compare the two nominal stress magnitudes. Does the larger numerical stress necessarily identify the more critical allowable-criterion check?

**Instructor:** \(\tau_{\mathrm{nom}}={{press_punching_shear_MPa}}\ \mathrm{MPa}\) and \(\sigma_b={{press_bearing_stress_MPa}}\ \mathrm{MPa}\). The largest nominal magnitude is {{press_larger_stress_MPa}} MPa, associated with {{press_larger_stress}}. A larger number alone does not identify the controlling comparison because shear and contact pressure use different allowable criteria. Compare normalized utilization or reserve in q18.

**Learning objective:** Distinguish comparison of unlike stress magnitudes from normalized assessment.\
**Type:** calculation/interpretation.

### q18 — Allowable reserve, utilization, and a mechanics-based change

**Student:** For each nominal check, calculate allowable-to-demand reserve R and utilization U, and express U as a percentage. Identify the more highly utilized check and state whether each assigned criterion is met. Propose one change that would reduce a specified nominal demand at fixed geometry or with an explicitly rechecked geometry; explain the limitation of that proposal.

**Instructor:** Use \(R_s=\tau_{\mathrm{allow}}/\tau_{\mathrm{nom}}={{press_shear_reserve}}\) and \(U_s=\tau_{\mathrm{nom}}/\tau_{\mathrm{allow}}={{press_shear_utilization}}={{press_shear_utilization_percent}}\%\). Use \(R_b=\sigma_{\mathrm{bearing,allow}}/\sigma_b={{press_bearing_reserve}}\) and \(U_b=\sigma_b/\sigma_{\mathrm{bearing,allow}}={{press_bearing_utilization}}={{press_bearing_utilization_percent}}\%\). The minimum reserve is {{press_min_reserve}}, the maximum utilization is {{press_max_utilization}}, and the controlling comparison among these two checks is {{press_controlling_check}}. {{press_criteria_assessment}}

A criterion is met when its unrounded U ≤ 1, equivalently R ≥ 1. These are allowable reserves, not demonstrated material-strength factors of safety. Reducing P reduces both demands. Increasing t at fixed P,d reduces the nominal shear demand but does not change the mean contact pressure. Increasing d at fixed P,t reduces both nominal demands, provided d remains below s and the complete footprint remains within the plate. A spreading pad changes the contact/shear geometry and requires a new model. A stronger material might justify a different allowable but does not itself reduce P/A. No suggested change establishes complete fixture acceptability.

**Learning objective:** Evaluate assigned criteria and connect a design change to the correct demand relationship.\
**Type:** decision/calculation.

### q19 — Limited engineering recommendation

**Student:** Write a concise recommendation that reports the outcome of the two illustrative checks, identifies the more highly utilized one, and states what remains necessary before making a real service-acceptance decision. Explain why this exercise neither validates a cutting force nor establishes complete fixture safety.

**Instructor:** {{press_criteria_assessment}} The more highly utilized comparison among these two is {{press_controlling_check}}, with minimum reserve {{press_min_reserve}}. These conclusions apply only to the stated nominal model, full-contact/core-clearance assumptions, and illustrative criteria. The assigned values and allowable basis require documentation. A real decision also requires material/condition data, actual plate and support geometry, the operating load envelope, and suitable checks of plate bending/deflection, contact/indentation, yielding, supports, ram/base capacity, alignment, and repeated loading as applicable. The model does not identify the actual governing failure mechanism. P is an assigned fixture load; no manufacturing cutting force has been validated.

**Learning objective:** Make a scoped recommendation supported by calculations and explicit evidence limits.\
**Type:** decision.

### Grading treatment

Retain the existing broad weighting if desired: context 15%, model/surfaces 20%, areas 25%, stresses 30%, recommendation 10%. Include reserve/utilization within the calculation/assessment marking. Award the cylindrical wall interpretation; do not award the former 2dt model for circular punch-through. Do not require students to assert uniform real stress, negligible bending, actual cutting, or complete fixture safety.

## 5. Calculation contract, independent results, and precision

### Equations and independent calculation

Convert kN to N; keep mm and MPa for area/stress computations:

\[
P_N=1000P=40{,}000\ \mathrm N.
\]
\[
L=\pi d=\pi(50)=157.0796326795\ \mathrm{mm}.
\]
\[
A_s=\pi dt=\pi(50)(10)=1570.7963267949\ \mathrm{mm^2}.
\]
\[
A_b=\pi d^2/4=\pi(50)^2/4=1963.4954084936\ \mathrm{mm^2}.
\]
\[
\tau_{\mathrm{nom}}=40{,}000/1570.7963267949
=25.4647908947\ \mathrm{MPa}.
\]
\[
\sigma_b=40{,}000/1963.4954084936
=20.3718327158\ \mathrm{MPa}.
\]
\[
R_s=80/25.4647908947=3.1415926536,\quad
U_s=25.4647908947/80=0.3183098862=31.83098862\%.
\]
\[
R_b=120/20.3718327158=5.8904862255,\quad
U_b=20.3718327158/120=0.1697652726=16.97652726\%.
\]

All stresses in the ratios are in MPa. At baseline, shear has the larger nominal magnitude and the larger utilization. Both illustrative criteria are met. \(R_{\min}=3.1415926536\), \(U_{\max}=0.3183098862\). The geometry calculations are \(g=(60-50)/2=5\ \mathrm{mm}\) and \((b-s)/2=(120-60)/2=30\ \mathrm{mm}\).

Python arithmetic in N/mm units and a separate JavaScript calculation using SI metre areas and Pa-to-MPa conversion independently reproduced these results and the changed-input reference cases in Section 10. Existing repository calculations were not modified or used as the numerical oracle.

### Complete proposed derived-placeholder registry

Register exactly these 20 placeholders in this package's `derivedPlaceholders`. Values are formatted only at the output boundary; never reuse localized or rounded display strings as numerical inputs.

| Placeholder | Quantity / definition | Baseline displayed value | Precision |
|---|---|---:|---|
| `press_load_N` | 1000P | 40,000 N | 0 decimal places |
| `press_shear_perimeter_mm` | πd | 157.08 mm | 2 decimals |
| `press_punching_area_mm2` | πdt | 1,570.80 mm² | 2 decimals |
| `press_bearing_area_mm2` | πd²/4 | 1,963.50 mm² | 2 decimals |
| `press_punching_shear_MPa` | P_N/A_s | 25.46 MPa | 2 decimals |
| `press_bearing_stress_MPa` | P_N/A_b, compressive magnitude | 20.37 MPa | 2 decimals |
| `press_larger_stress` | Label of larger nominal magnitude, or tie | nominal circular shear demand | Text |
| `press_larger_stress_MPa` | max(τ_nom, σ_b) | 25.46 MPa | 2 decimals |
| `press_shear_reserve` | τ_allow/τ_nom | 3.14 | 2 decimals |
| `press_bearing_reserve` | σ_bearing,allow/σ_b | 5.89 | 2 decimals |
| `press_shear_utilization` | τ_nom/τ_allow | 0.3183 | 4 decimals |
| `press_bearing_utilization` | σ_b/σ_bearing,allow | 0.1698 | 4 decimals |
| `press_shear_utilization_percent` | 100U_s | 31.83% | 2 decimals; token contains number only |
| `press_bearing_utilization_percent` | 100U_b | 16.98% | 2 decimals; token contains number only |
| `press_min_reserve` | min(R_s,R_b) | 3.14 | 2 decimals |
| `press_max_utilization` | max(U_s,U_b) | 0.3183 | 4 decimals |
| `press_controlling_check` | Check with larger utilization, or tie | nominal circular shear check | Text |
| `press_criteria_assessment` | Four-case assessment described below | Both nominal demands meet their illustrative allowable criteria. | Text |
| `press_edge_gap_mm` | (s−d)/2, horizontal layout offset | 5.00 mm | 2 decimals |
| `press_support_contact_length_mm` | (b−s)/2, proposed outer-strip extent in x | 30.00 mm | 2 decimals |

Units are supplied by the surrounding text, not stored inside numeric placeholder values. Use a consistent display locale (proposed en-US) across all three renderers.

The existing four FOS-oriented names are retired from this package's declarations and templates:

| Existing key | Replacement |
|---|---|
| `press_fos_shear` | `press_shear_reserve` |
| `press_fos_bearing` | `press_bearing_reserve` |
| `press_governing_fos_mode` | `press_controlling_check` |
| `press_governing_fos` | `press_min_reserve` |

The bearing-area display changes from one to two decimals for consistency; its numerical value does not change. The existing general load, area, stress, and magnitude-comparison keys remain, with updated meanings/text where specified.

### Assessment and tie behavior

- Check satisfaction uses unrounded \(U_s\le1\) and \(U_b\le1\). Do not use displayed 1.00 or 100.00% as a threshold.
- `press_criteria_assessment` uses these four complete messages, selected from the unrounded individual comparisons:
  - “Both nominal demands meet their illustrative allowable criteria.”
  - “The nominal shear demand exceeds its illustrative allowable criterion; the mean contact pressure meets its criterion.”
  - “The mean contact pressure exceeds its illustrative allowable criterion; the nominal shear demand meets its criterion.”
  - “Both nominal demands exceed their illustrative allowable criteria.”
  These messages do not classify the complete fixture as safe or unsafe.
- `press_controlling_check` may be “nominal circular shear check,” “mean contact-pressure check,” or “both nominal checks equally.” It means control only among these two comparisons.
- `press_larger_stress` may be “nominal circular shear demand,” “mean compressive contact pressure,” or “both nominal stresses equally.”
- Identify mathematical ties with a small relative floating-point comparison, proposed \(|a-b|\le10^{-10}\max(1,|a|,|b|)\). This is a numerical tie rule only, not an engineering margin or a relaxation of U ≤ 1.
- Keep all status and comparison text parameter-dependent. The baseline recommendation must not be hard-coded for edited inputs.
- Neither reserve is a strength factor of safety: an allowable may already incorporate unspecified design margins, and no actual failure strengths are supplied.

## 6. Instructor-reference figure specification

### Proposed assets and coordinate fidelity

Prepare a new controlled diagram, preferably with an editable SVG master `assets/press-instructor-reference.svg` and a matching PNG delivery asset `assets/press-instructor-reference.png` for the existing export routes. These are future implementation deliverables. Retain the original PNG as historical evidence unless separately authorized to remove it.

Use front-section, plan, and small imaginary-core free-body views. Show the coordinate relationships in Section 3. In the baseline master, the ram width/opening relation must represent 50:60, not coincident edges. The plate extent represents 120 mm and thickness 10 mm. Show separate, parallel blocks beneath the two outer strips. No ring support, circular die, pre-cut slot, detached physical slug, or manufacturing cutting edge is to be introduced.

### Required changes from the current image

1. **Circular ram:** retain the cylindrical form and flat circular end. A plan view must make the disk explicit.
2. **Distinct d and s:** place ram edges at x = ±25 mm and block inner faces at x = ±30 mm in the baseline drawing. Dimension d between the ram extremes and s between the block inner faces with separate extension lines. Each baseline horizontal offset is 5 mm; do not call it die clearance.
3. **Circular shear wall:** show a dashed/transparent imaginary cylinder through the plate at radius 25 mm. Label it “hypothetical cylindrical shear-evaluation surface.” If two traces are shown in section, connect them to that one complete wall in the other view. Retire the AC/BD two-plane labeling.
4. **Contact region:** identify the full horizontal disk immediately beneath the ram face as the contact footprint. Point the bearing/contact leader inside that disk or its correctly identified projection, not onto exposed plate outside the ram.
5. **Thickness:** dimension t solely between the plate's upper and lower faces; stress arrows must not create an apparent extra thickness layer.
6. **Separate blocks:** show the 60 mm clear strip between blocks and their continuation across depth. Base fixity hatching may remain beneath blocks; do not clamp the plate to them.
7. **Overall extent:** dimension b along x between plate ends. Do not depict it as a width into the page.
8. **Loading:** centered downward P acts on the circular face. The core free-body inset may show downward P and the upward sidewall shear resultant \(S_z=P\); explicitly mark the isolation as imaginary and the actual plate as intact.
9. **Stress distributions:** arrows are qualitative. Do not imply a proved uniform circumferential field or show a numerically computed peak. Identify σ_b as mean compressive pressure and τ_nom as nominal wall shear.
10. **Equations:** the instructor-only view may show \(A_b=\pi d^2/4\) and \(A_s=\pi dt\), tied to the correct surfaces. Numerical results belong to generated answers, so the image does not retain stale results after input edits.
11. **Assumptions:** include a concise note that the model assumes full circular contact and adequate plate depth, and that plate bending and other fixture checks are unverified.

### Numbers and customization

The diagram artwork uses symbols P,d,t,s,b; it must not permanently embed baseline numerical labels that become false in customized packets. Its baseline layout distinguishes the actual 50 mm ram and 60 mm opening. An adjacent **current-input dimension key**, rendered with the figure, must show at baseline:

`P = 40 kN; d = 50 mm; t = 10 mm; s = 60 mm; b = 120 mm.`

The key updates from the active inputs in every route. The figure caption states: “Schematic geometry; use the current-input dimension key. The cylindrical surface is hypothetical, and real stress distributions are unverified.” Customized outlines need not be drawn to scale; dimension labels and distinct boundaries must remain correct. Do not present a fixed baseline drawing as a scale drawing of edited values.

Suggested alt text: “Front and plan views of a centered circular ram loading an intact plate on two separate blocks, with the complete imaginary cylindrical shear wall, circular contact footprint, and current dimensions supplied in the accompanying key.”

## 7. Separate student-safe geometry schematic and packet order

### Student geometry content

Create `assets/press-student-geometry.svg` plus matching `assets/press-student-geometry.png`, separately authored from the instructor figure. Show:

- A centered cylinder with a flat end, the intact plate, two distinct blocks, and base.
- A front view with symbolic P,d,t,s,b, accurate baseline separation of 50 mm ram and 60 mm opening, and correctly located dimension extension lines.
- A plan view with the circular ram footprint and the two parallel support contact regions identified geometrically.
- Visible depth continuation and the note “Plate extends beyond the complete ram footprint; both blocks extend across plate depth. Depth is not numerically assigned.”
- Centerline and downward P direction, component names, and a link between plan and section.
- The same active-input dimension key as the instructor view and the full seven-variable Given Data table before questions that use them.

Do **not** show shear/contact area formulas, evaluated areas, stress values, reserve/utilization values, criterion outcomes, a selected controlling mode, completed free-body equilibrium, a solved cylindrical wall, AC/BD failure-plane labels, or a completed q8 student model. The plan circle shows the given physical ram footprint; students construct the hypothetical wall from that footprint and the stated model. Necessary geometric information is not a hidden solution.

Suggested caption: “Geometry supplied for constructing your model. Use the current Given Data; this schematic is not to scale.”

Suggested alt text: “Unsolved front and plan geometry of a cylindrical ram over the opening between two separate plate supports, labeled P,d,t,s,b, with dimensions in the accompanying Given Data.”

### Delivery contract

Use the existing `supplementaryImages` mechanism for the student-safe PNG, with in-package path, order 1, meaningful alt/caption, and widthPercent 100. Keep the instructor `idealizedImage` separate and leave `showIdealizedImageInStudentPacket` false/absent.

Propose one optional package layout setting, `packetLayout: "geometry-first"`, to place the student geometry and Given Data before q1 for this package. Other packages retain their existing layout when this setting is absent. Recognize/validate the setting in the catalog builder and implement the same order in direct, Builder, and CLI HTML/QMD routes.

Required order:

1. Context illustration, full statement, goal, assumptions, and components.
2. Student-safe geometry, current-input dimension key, and Given Data.
3. q1–q7, then q8–q10 including usable drawing space.
4. Instructor reference figure **only in instructor output**, after modeling/planning.
5. q11–q19; instructor output pairs every question with its answer.

The direct `_student-problem.qmd` should include the student-safe geometry for the index/context page as well as the packet. The direct renderer must suppress the duplicate from `supplementaryImages` using its existing image-path detection. It must still render the current dimension key and given table once. Builder/CLI use the catalog asset; they do not include that QMD fragment and must independently include the component/assumption text from the catalog statement.

Student-safe here concerns content presented in the student document. The repository's public catalog architecture is not an answer-security boundary and is not redesigned by this specification.

## 8. Rationale for provisionally retaining assigned values

| Assigned item | Instructional reason to retain | Evidence limit and future justification |
|---|---|---|
| P = 40 kN | Keeps continuity and produces accessible nonzero demands below both illustrative criteria, enabling reserve/utilization interpretation. | It is a prescribed example load. No documented operating envelope, measured force, or press rating supports it. Do not describe it as enough to cut the plate. |
| d = 50 mm | Defines an unambiguous circular footprint, fits inside s = 60 mm, and gives transparent area calculations. | Circular tooling at 50 mm is commercially plausible, but that does not document this ram, fixture, or load case. |
| t = 10 mm | Gives a manageable wall area and illustrates the different effects of thickness on shear versus mean contact pressure. | d/t = 5 and s/t = 6 do not establish negligible bending or linear/full contact. Avoid “thin sheet” claims. No stock grade or plate specification is known. |
| s = 60 mm | Provides a positive 5 mm horizontal offset on both sides of the circular footprint and a free underside for the selected core. | This is a block opening, not a circular die diameter. No actual fixture measurement supports it. |
| b = 120 mm | Provides 30 mm of plate extent outside each block-opening edge in the proposed drawing. | b is proposed to mean plate extent along x. Actual support dimensions/depth and their capacities are unverified. |
| τ_allow = 80 MPa | Provides a declared comparison criterion and a useful baseline utilization of 31.83%. | It is neither a cited failure strength nor a material-identifying property. The basis and applicability to a nominal cylindrical demand remain undocumented. |
| σ_bearing,allow = 120 MPa | Provides a distinct contact-pressure criterion and baseline utilization of 16.98%, illustrating normalized comparison. | It does not establish resistance to indentation or yielding under nonuniform contact. Material, design margin, and limit-state basis are unknown. |

**Documented industrial information is limited.** Conic's tooling catalog lists round sizes through 50 mm and distinguishes round perimeter from rectangular perimeter; it does not validate this seven-value fixture. [Conic SET PRESS catalog, printed pp. 6–7](https://www.conic.co.jp/th/punching/pdf/punching_set_press_th.pdf#page=6)

Manufacturer guidance also distinguishes a cutting-force estimate using perimeter, thickness, and material shear strength. This exercise deliberately makes no such process-force claim, because neither the cutting application nor a shear-fracture property is specified. [Matrix, Force calculation](https://www.matrixtools.eu/en/force-calculation/)

The circular-wall area and local equilibrium rationale are geometric/mechanical derivations in this specification, not manufacturer certification. No material grade, strength, E, Poisson ratio, die clearance, or machine specification is invented to make the seven inputs appear sourced.

The two existing images contain generated-illustration credential assertions as recorded in the detailed review; they are not measurements or industrial data sources. Retain the context image with an honest illustrative caption. For the corrected teaching model, independently controlled engineering drawings define the geometry.

All publication text must state that the seven values are provisionally assigned. A faculty-approved transparent instructional example can retain them without claiming documented industrial calibration. A claim of real fixture credibility or service acceptance would require additional source-backed geometry, loading, material, and capacity work.

## 9. Exact future implementation map

All locations below are in the quality-review clone. Line numbers refer to reviewed HEAD and will move during a later implementation. This section is a change specification, not a record of changes made.

### Package files and metadata

| File | Required proposed update |
|---|---|
| [problem.json](../../problems/hydraulic-press-punching-shear/problem.json) | Replace title, summary, `problemStatement`, and `engineeringGoal` using Section 2, including assumptions/components for Builder/CLI. Replace `derivedPlaceholders` with the 20-key registry. Point `idealizedImage` to the new instructor PNG and replace alt text. Add the student PNG to `supplementaryImages`. Add `packetLayout: "geometry-first"`; retain stable id/slug/source navigation. Keep the instructor image hidden from student output. |
| [variables.json](../../problems/hydraulic-press-punching-shear/variables.json) | Retain seven keys, values, units, and existing authoring bounds/steps. Replace labels as in Section 2; remove “optional”; distinguish an illustrative criterion from strength. |
| [questions.json](../../problems/hydraulic-press-punching-shear/questions.json) | Replace all 19 titles/prompts/answers with Section 4. Update learning objectives, types, and tags to the stated purpose. q11 becomes core equilibrium; q14 becomes circular wall area; q18 uses reserves/utilization. Keep all IDs/selection and section grouping. Remove active AC/BD, two-section dt, FOS, and material-strength implications. |
| [variants/section-a.json](../../problems/hydraulic-press-punching-shear/variants/section-a.json) | Retain the same seven numbers and q1–q19 list. Update title/description to nominal circular checks with illustrative criteria; no material calibration claim. |
| [_student-problem.qmd](../../problems/hydraulic-press-punching-shear/_student-problem.qmd) | Replace statement/goal/components and add assumptions and student-safe geometry. Use symbolic prose plus current/default Given Data rather than embedded numeric stress answers. Keep the context image, clearly described as an illustration. No instructor solution image. |
| [student-packet.qmd](../../problems/hydraulic-press-punching-shear/student-packet.qmd) | Update title/subtitle to nominal checks and illustrative criteria, preserve student render call, and verify geometry-first layout and drawing space. |
| [instructor-guide.qmd](../../problems/hydraulic-press-punching-shear/instructor-guide.qmd) | Update purpose/rubric to the hypothetical wall, correct areas, reserves/utilization, and limited conclusions. Preserve generated answer rendering. State the special support/contact and out-of-plane assumptions. |
| [index.qmd](../../problems/hydraulic-press-punching-shear/index.qmd) | Update title/description and assignment callout; replace factor-of-safety topic/competency claims with illustrative allowable assessment/reserve/utilization. Retain legitimate stress/shear/bearing concepts. Review version metadata under repository policy; status must not imply real fixture certification. |
| `assets/press-instructor-reference.svg` and `.png` | New controlled source/delivery figure meeting Section 6. |
| `assets/press-student-geometry.svg` and `.png` | New separate unsolved source/delivery figure meeting Section 7. |
| Existing context/reference PNGs | Preserve during implementation unless a separate removal/edit is approved; change active instructor-image reference to the corrected asset. |

Replace the misleading “Factor of safety” entries in this package's `textbookChapters`, index topic fields, and q18 tags/objectives with appropriate allowable-stress/design-assessment wording. Do not remove valid FOS topics from unrelated problems.

Do not use `source: "index.html"` as an engineering citation: it is an internal navigation field. Provisional-value status must be visible in the problem statement, given-data labels/note, and instructor guidance rather than stored only in an inert metadata field.

### Calculation and rendering functions

| File / exact function | Current location and required update |
|---|---|
| [scripts/packet-renderer.js](../../scripts/packet-renderer.js): `variableMap(problem, overrides)` | Function starts line 58; press block 466–513. Use πdt, preserve πd²/4, validate all seven press inputs/layout, produce the registry and parameter-dependent status/tie text, and remove FOS semantics. Keep raw values separate from formatted outputs. |
| Same: `numericValue`, `formatDerived` | Lines 11 and 48. Ensure press validation rejects missing/blank/null values before conversion; apply specified precision/locale at output. Do not change unrelated model semantics incidentally. |
| Same: `renderPacket`, `renderVariableTable`, `renderSupplementaryImages`, `renderIdealizedImage`, `renderQuestionSection` | Starts 3376, 3311, 3286, 3270, 3355. Implement geometry-first order, one data table/student schematic/key, instructor-only solution figure, usable q8 sketch space, and invalid-model diagnostics without stale answers. Retain duplicate-image suppression. |
| [scripts/render-assignment.mjs](../../scripts/render-assignment.mjs): `variableMap(problem, currentValues)` | Starts 133; press block 538–585. Same validated model, registry, precision, criteria and tie behavior as direct renderer. |
| Same: `renderBody`, `qmdDocument`, `renderIdealizedImageHtml`, `renderSupplementaryImagesHtml`, `renderSupplementaryImagesMarkdown` | Starts 3440, 3491, 3349, 3364, 3377. Apply geometry-first order and current-input keys in HTML and QMD; include all statement assumptions/components, both required student assets/data, q8 space, and instructor-only reference. Ensure generated DOC/DOCX/PDF paths receive equivalent content. |
| [instructor-builder.qmd](../../instructor-builder.qmd): `variableMap(problem)` | Starts 112; press block 518–565. Same numerical and terminology changes. Validate current overrides, including s,b and both required criteria. |
| Same: `renderVariableInputs`, `renderPreview`, `renderDocumentBody`, `renderIdealizedImage`, `renderSupplementaryImages` | Starts 3286, 3545, 3486, 3374, 3389. Show valid current data and model messages, enforce packet layout and correct captions/keys, and keep instructor answers/reference out of student body. |
| Same: `embeddedPacketImages`, `fullHtmlDocument` | Image collection around 3624–3636 and HTML/export assembly around 3643 onward. Include the new student PNG in student exports; include corrected instructor PNG only for instructor exports. Prevent export of invalid geometry, not of a valid exercise whose criterion is exceeded. |
| [scripts/build-catalog.mjs](../../scripts/build-catalog.mjs) | Required/placeholder/asset validation around 95–233. Validate the optional `packetLayout` value, expected press placeholders, referenced new assets, and valid default/variant press geometry. Existing supplementary-image path/order validation remains applicable. A structural catalog check is not a mechanics validation substitute. |
| [docs/authoring-guide.qmd](../../docs/authoring-guide.qmd) | Around 105–131. Document the optional geometry-first layout. Correct the statement that the instructor reference always appears in student packets; describe the explicit visibility flag and student-safe supplementary figure. |
| [data/problem-catalog.json](../../data/problem-catalog.json), [data/problem-catalog.js](../../data/problem-catalog.js) | Regenerate from corrected source packages only during approved implementation. Do not hand-edit divergent catalog copies. |

Scope press-specific geometry validation by this problem's slug/id or a narrowly defined model selector. The existing generic `P,d,t` detection must not cause new s/b/allowable requirements or changed computations in unrelated problems. A shared pure press-model helper could reduce duplication; it is an implementation option, not authorization for a broad refactor. All three delivery routes must satisfy the same model contract regardless of code organization.

`_quarto.yml` already includes all problem-package assets as site resources; no workflow/publishing change is needed for this specification. Do not alter `.github/workflows/publish.yml` or deploy as part of the correction. A graph refresh required after a later code implementation belongs to that implementation stage; none is run now.

## 10. Proposed independent validation

These are acceptance tests to create/run after implementation. Only independent arithmetic was evaluated while writing this specification. No repository test, build, export, image generation, or package update was performed now.

### Numerical reference cases

Unlisted inputs retain baseline values. Stress units are MPa; reserves are dimensionless. Figures below show six-decimal independent targets; product display follows Section 5. Raw numerical comparisons should use a relative tolerance around 10⁻⁹, independently of display rounding.

| Case / changed inputs | τ_nom | σ_b | R_s | R_b | Expected comparison/outcome |
|---|---:|---:|---:|---:|---|
| Baseline | 25.464791 | 20.371833 | 3.141593 | 5.890486 | Shear larger and more utilized; both meet |
| P = 80 kN | 50.929582 | 40.743665 | 1.570796 | 2.945243 | Double demands; half reserves; both meet |
| d = 30 mm | 42.441318 | 56.588424 | 1.884956 | 2.120575 | Bearing magnitude larger, but shear more utilized; both meet |
| t = 20 mm | 12.732395 | 20.371833 | 6.283185 | 5.890486 | Shear halves; bearing unchanged and more utilized; both meet |
| P = 300 kN | 190.985932 | 152.788745 | 0.418879 | 0.785398 | Both exceed; valid geometry/exercise remains exportable |
| d = 40 mm, t = 10 mm | 31.830989 | 31.830989 | 2.513274 | 3.769911 | Equal stress magnitudes; shear more utilized |
| d = 40 mm, t = 15 mm | 21.220659 | 31.830989 | 3.769911 | 3.769911 | Equal normalized comparison; report both checks equally |
| s = 80 mm, b = 160 mm | 25.464791 | 20.371833 | 3.141593 | 5.890486 | Local demands unchanged; gap becomes 15 mm and outer strip 40 mm |
| τ_allow = 160 MPa | 25.464791 | 20.371833 | 6.283185 | 5.890486 | Demands unchanged; bearing more utilized despite larger shear stress |
| P = 160 kN | 101.859164 | 81.487331 | 0.785398 | 1.472622 | Shear exceeds; bearing meets |
| P = 250 kN, τ_allow = 160 MPa | 159.154943 | 127.323954 | 1.005310 | 0.942478 | Bearing exceeds; shear meets |

For every case, independently check U_s = 1/R_s, U_b = 1/R_b, R_min = min(R_s,R_b), U_max = max(U_s,U_b), all display values, and generated prose. These identities alone are insufficient as the oracle; compare against SI-unit area/stress calculations and the independent targets.

Additional invariant checks:

- \(\tau_{\mathrm{nom}}/\sigma_b=d/(4t)\). Equal stresses occur at d = 4t, not at the old model's threshold.
- \(U_s/U_b=\sigma_{\mathrm{bearing,allow}}d/(4\tau_{\mathrm{allow}}t)\). With 80/120 MPa, equal utilization occurs at d = 8t/3.
- At baseline A_s = 1570.7963267949 mm², A_b = 1963.4954084936 mm², and L = 157.0796326795 mm. The former 1000 mm² / 40 MPa result must not survive.
- Increasing t at fixed P,d changes shear but not mean contact pressure; changing s,b within valid layouts changes neither nominal formula. This does not mean real plate response is unaffected.
- A mathematically valid thick-plate input is not automatically invalid simply because thin-plate theory would be unsuitable: this exercise makes no thin-plate/bending prediction.

### Invalid input/layout contract and tests

Resolve the seven effective inputs from package defaults plus intentional overrides, then validate them. Omitted override keys legitimately inherit valid defaults; explicitly supplied null/blank values are invalid and must not silently inherit a default. A missing-key error means an effective required input is absent after this resolution. Add a partial-override test with only P = 80 kN to verify that the remaining six defaults are retained.

Require all seven effective inputs to be finite and positive, within the current declared authoring ranges, with d < s < b. Retain current UI increments; increments are authoring controls, not engineering validity evidence. Validate values before computing ratios or formatting. A unit-level comparator test can exercise exact U = 1 without requiring an off-grid edited input.

| Input / combination | Expected result |
|---|---|
| d = 60, s = 60, b = 120 mm | Reject: zero separation between core edge and block inner face; violates selected strict opening condition |
| d = 70, s = 60, b = 120 mm | Reject: core underside overlaps support region |
| d = 50, s = 120, b = 120 mm | Reject: no outer supported plate strip |
| d = 50, s = 140, b = 120 mm | Reject: opening exceeds plate extent |
| d = 250, s = 10, b = 20 mm | Reject despite individually in-range dimensions |
| P = 0 or negative; any zero/negative length or criterion | Reject; no infinities, negative demand/reserve, or acceptance message |
| Missing key, null, empty/whitespace string, nonnumeric text, NaN, or infinity | Reject explicitly; do not coerce to zero or silently fall back to a stale/default result |
| A value outside its declared min/max, e.g. d = 251 mm | Reject or require an explicit authoring-range change; do not silently clamp |
| Diagram/assumption with plate depth cutting through circle or supports beneath core | Fails manual model/figure acceptance even if seven numbers pass numeric checks |
| Valid inputs with U > 1 | Calculate/report exceedance; this is an analyzable problem, not a geometry/parser error |

Invalid geometry must produce a specific message identifying the incompatible dimensions and suppress derived solutions and downloadable packets until corrected. Do not quietly switch to 2dt, a supported-disk model, or a rectangular footprint. Builder preview must clear old results when inputs become invalid; direct pages/CLI must reject invalid defaults or variants clearly.

Test the assessment comparator directly at U = 1, U = 1−10⁻⁶, and U = 1+10⁻⁶. The outcomes are meets, meets, exceeds respectively. Include cases that round to the same displayed value near unity to ensure raw values govern.

### Integration, content, and figure acceptance

- Run numerical and message cases through direct page, Builder, and CLI; identical active inputs must give equivalent results and wording. Test default and section-a.
- Confirm 19 selected IDs, all source placeholders declared/resolved, correct units, precision and locale, and all questions/answers updated. No unsupported FOS wording or two-plane area survives in active teaching content; historical review reports are exempt.
- Confirm the default student packet has the safe schematic, current dimension key, all seven values, assumptions/components, and drawing space before modeling; no instructor reference or representative answers appear in its body.
- Confirm the instructor packet has the same student information plus the corrected reference after q10 and all 19 representative answers.
- Check HTML and QMD output structurally, then inspect actual DOC/DOCX/PDF/print outputs as applicable for complete text, legible figures, correct order, usable sketch space, and readable equations/units.
- Check PNGs against their SVG masters: separate 50/60 mm boundaries, full circle/wall in instructor view, correct disk leader, no annular die, proper t and b directions, separate blocks, and clear into-page assumptions.
- Edit d,s,b,P and confirm dimension keys use current values. No embedded baseline numerals/results may contradict customized packets. Student alt text, captions, SVG layers, and visible content must not include instructor solutions.
- Validate an unrelated package using P,d,t or other existing derived formulas to ensure press-specific guards/layout changes do not affect it. Check catalog problem count remains 51.
- Regenerate catalogs only in the approved implementation, inspect changes, and confirm graph/catalog/test artifacts are intentional. Do not deploy or publish as a side effect.

## 11. Items requiring faculty review before implementation

The application, nominal surface, area equations, seven baseline values, and reserve/utilization direction are settled by the user's instruction. The following proposed clarifications still need acceptance:

1. **Complete geometry convention:** b means total plate extent along the opening direction; blocks support the outer strips and span the plate depth; the plate extends beyond the whole circle into the page. This specification uses a qualitative depth condition rather than adding an eighth numerical width. Faculty must accept that convention or supply the missing geometry. An assigned numerical depth would require revisiting the seven-input scope.
2. **Maintained contact/clearance assumptions:** full circular ram contact and a free lower core face are stipulated for the nominal check. Their truth in a real deflecting fixture is unverified. Faculty must accept the exercise as a stipulated local model rather than ask it to establish these conditions.
3. **Allowable provenance and publication wording:** the numbers 80/120 MPa remain illustrative, with unverified material/limit-state/design-margin basis. No particular alloy or strength factor can be inferred. Faculty should approve the proposed explicit provisional wording and determine when documentary justification is required. Research is required before representing the values as validated industrial criteria, not before labeling them transparently as assigned examples.
4. **Pedagogical replacement for q11:** approve the imaginary-core equilibrium task in place of repeated support/diagram reading, and the student geometry/assumption information supplied before q8. This avoids hiding information needed for a unique model.

Reference-image format, renderer organization, and version increment are implementation choices subject to the acceptance contract, not remaining changes to the approved mechanics. Actual fixture capacity, real contact behavior, and governing failure remain outside this exercise; they cannot be resolved by selecting a different nominal area formula.

## 12. Preparation and preservation record

Preparation was limited to read-only repository inspection, existing-graph traversal without writes, independent in-memory arithmetic, and creation of this specification. The clone began on the branch/HEAD above with the earlier detailed review as its sole untracked addition.

A SHA-256 baseline covered all 983 pre-existing non-`.git` files. Final verification found those files unchanged and no tracked/staged Git differences. The sole new file from this task is `docs/reviews/hydraulic-press-correction-specification.md`; the earlier review remains unchanged. All 51 problem packages remain present. No correction, image generation, catalog rebuild, commit, push, or publication was performed.
