# MOS-JIB-001 engineering correction specification

Date: 2026-11-02
Status: proposed implementation contract; no implementation authorized by this document.
Problem: Wall-Mounted Swing-Jib Crane for Battery-Pack Handling.
Repository: `context-rich-mechanics-quality-review`.
Branch: `quality-review/engineering-review-2026-10-25`.
Inspected HEAD: `4e99e2e9140f37690c642efa7dfd0b001f528aab`.

## Purpose and authority

This specification translates the user's approved **Option A: pinned boom and axial brace** into proposed source content, numerical contracts, diagrams and acceptance tests. The accepted [detailed audit](jib-crane-detailed-review.md) supplies the defect evidence, source locations and legacy calculations. Its findings J01–J16 are addressed below. The user's new modeling decisions resolve the former root-restraint, horizontal-attachment, full-reach loading, imposed-couple and omitted-compliance ambiguities for this instructional exercise. They do not establish the construction or performance of an actual crane.

Sections A and B implement the approved physical direction. Specific interface choices, retention of the other assigned values, connection-detail idealizations, numerical tie tolerance, exercise labels, review status and unvalidated-property handling are **proposed defaults**, itemized in H for approval. No manufacturer data, steel grade, actual stability resistance, quantitative small-deformation threshold or lifting-device certification is inferred.

Only this new specification may be created during this task. Existing packages, calculations, figures, tests, catalogs and review documents remain unchanged. The implementation paths in G are a future change plan, not permission to edit them now.

## A. Approved physical model and proposed problem content

### A1. Coordinates, nodes and restraints

Use a planar vertical x–y model, +x right, +y up, and applied moments positive counterclockwise. The following undeformed centerline nodes define the quantitative model:

| Node | Coordinates | Meaning and restraints |
|---|---|---|
| A | (0, 0) | Boom-to-wall ideal in-plane pin: both translations restrained, in-plane rotation free, reaction moment zero. |
| B | (0, −h) | Rigid lower wall anchor; brace end pin at a fixed point. |
| C | (a, 0) | Brace connection to the continuous boom; brace end pin, **no internal hinge in the boom**. |
| D | (L, 0) | Full-reach boom load point carrying prescribed forces and a couple. |

\[
h=a\tan\theta,\qquad \ell_b=a/\cos\theta,\qquad
0<a\le L,\quad 0<\theta<90^\circ.
\]

**Proposed boundary convention:** include a = L as a valid limiting attachment at D; C and D then coincide. The interior schematic normally shows a < L. Geometry with a > L is invalid. All reference equations below include the a = L limit; illustration and stiffness tests must handle coincident C/D without a zero-length element.

Brace BC is a straight pin-ended axial member; positive F denotes compression. **Proposed constitutive default:** an ideal axial bar capable of both tension and compression before any unassessed instability. A negative F is a tension result, not an invalid geometry or a compression force with its sign discarded. Whether an actual brace and its attachments can resist reversal requires evidence. A unilateral prop/cable or compression-only contact would require a different admissibility and equilibrium model and is outside this proposal.

Boom flexural stiffness is constant E I_boom. The wall anchors are rigid. The boom is axially rigid for displacement calculations; this removes boom axial compliance, not its equilibrium axial force or the need for an actual combined-stress assessment.

### A2. Loads and two complete directional cases

The assigned vertical load is amplified battery weight only:
\[
W=Mg,\qquad P=\gamma_d Mg,\qquad g=9.81\ {\rm m/s^2}.
\]
P acts downward at D. The trolley is moved to full reach for this numerical case; the context illustration's inboard trolley is not the calculation position. No separate load-position input is introduced. Trolley travel on an unchanged boom is not modeled by changing L.

Keep the existing H input as a **nonnegative magnitude**, and generate both signed cases:
\[
s\in\{+1,-1\},\quad H_x=sH,\quad C_e=H_x e_H.
\]
The rightward case has s = +1 and a counterclockwise C_e; the leftward case has s = −1 and a clockwise C_e. If H or e_H is zero the relevant couple is zero. H = 0 makes the two cases identical. e_H = 0 leaves the opposite horizontal forces present; forces/reactions must still be calculated separately.

H_x is prescribed at D on the boom centerline and C_e is an independently applied equivalent couple **defined for this idealized load case** by H_x e_H. The offset e_H is a parameter of that imposed force/couple pair, not a verified hook height or a moment transmitted by a freely suspended chain. The force and couple reverse together in this assignment; independent reversal of the couple would be another load-case definition requiring approval.

Omit hoist, trolley, fixture, boom and brace weights from the quantitative model because none are assigned. Q4 retains broader load identification; its project estimates must not be silently added to the common numerical answers.

### A3. Complete revised problem statement

Use the following canonical statement as two content blocks, without adding duplicate question records. Only the first two paragraphs precede I1 as context. The remaining four paragraphs belong to the supplied common-model block after I1; do not put the complete statement into an undifferentiated pre-question metadata field.

> You are studying a wall-mounted swing-jib crane concept for repeated battery-pack handling at an automotive workstation. The concept illustration shows a boom, a lower diagonal brace, a trolley/hoist and a suspended load. Use it to discuss function, material choices, load paths and missing design evidence. It is a context illustration, not a measured installation or a definition of the numerical model.
>
> First develop your own structural idealization and free-body diagrams in task I1. State the restraints, load transfer and omitted effects you assume. Different defensible idealizations may be proposed at this stage.
>
> For tasks M1–M5, use the separately supplied common model after I1. The boom has an ideal in-plane wall pin at A, is continuous through the brace attachment C, and extends to D. The lower brace anchor B and A are fixed points in a rigid wall. A is vertically above B; C is a horizontal distance a from A; D is a horizontal distance L from A. The brace angle theta is measured from horizontal, so wall-anchor separation is h = a tan(theta) and physical brace length is ell_b = a/cos(theta).
>
> Move the payload to D at full reach for the assigned numerical case. Apply downward P = gamma_d M g at D. Analyze both prescribed horizontal directions H_x = +H and H_x = −H, with equivalent boom couple C_e = H_x e_H, positive counterclockwise. This force/couple pair is an idealized boom loading; it is not a moment transmitted through the freely suspended chain shown in the context illustration.
>
> Calculate first-order equilibrium, nominal stresses and the braced tip displacement using boom bending and brace axial deformation. Neglect boom axial compliance, shear deformation, connection clearance, wall flexibility and geometric nonlinearities. Other equipment and structural weights are omitted. These assumptions bound the exercise and do not establish an actual crane response.
>
> All provided dimensions, properties, amplification factors and comparison criteria are instructional assignments without documented industrial provenance. Compare only the specified nominal responses with their assigned criteria. A formal Euler calculation is included to examine its assumptions and section-axis ambiguity; it is not an established compression capacity. Identify unassessed modes and evidence required before an actual lifting system could be approved.

The context-only disclaimer in F must also accompany the old industry image before I1. Do not reveal the chosen A-pin/common model in a preceding geometry answer or completed FBD. The statement may introduce that a supplied model will follow without showing its full layout before I1.

### A4. Quantitative assumptions supplied after I1

The common-model block must explicitly give A1–A2, the current-input table, units, restraint types, continuity at C, the two load cases and these limitations:

- Linear-elastic, prismatic, Euler–Bernoulli boom bending; homogeneous axial-brace E A_brace; small displacement and first-order equilibrium.
- Boom axial compliance omitted. Its segment forces are still reported. No boom area is available for N/A, so the nominal M/S check does not establish combined boom yielding.
- No shear flexibility, wall/anchor flexibility, joint clearance, local bracket deformation, eccentric connections, boom-column effects, torsion or out-of-plane response.
- No instability reduction of the elastic axial spring. Formal Euler arithmetic neither establishes that this spring remains physically stable nor authorizes loads near the formal eigenvalue.
- No fatigue, ultimate fracture, local buckling, lateral-torsional buckling, wall-anchor-group, weld, pin-bending, hole tear-out, net-section, wear, rated hardware or proof-load verification.
- No invented quantitative strain/rotation limit. Small-deformation applicability and actual stability remain unassessed. The first-order result is conditional even when the assigned nominal criteria are met.

### A5. Proposed input contract and retained assignments

Retain all **23 existing keys**, baseline values and saved exam values for compatibility. Rename only the displayed symbol/label of `Lb` to **a — horizontal brace-attachment distance A–C**. Never display `L_b` as this input; reserve ell_b for diagonal brace length. Do not introduce an a override alias that could conflict with Lb. The numerical helper reads Lb once and exposes a internally.

Change H's label to “assigned horizontal-force magnitude; evaluate both directions”; e_H to “equivalent prescribed-couple offset parameter”; gamma_d to “assigned vertical amplification”. Label sigma_y an assigned member yield reference, N_y an assigned nominal yield-criterion divisor, tau_allow and bearing_allow assigned illustrative criteria. Label delta_allow “assigned limit for absolute vertical tip movement”. Label I_brace “assigned inertia for formal Euler axis”, r_min “reported minimum-radius assignment; axis unverified”, K_brace “formal Euler effective-length parameter”, N_b “formal Euler reference divisor; not a validated resistance factor”. No new evidence is created by changing labels.

| Key | Baseline | Exam | Unit | Effective bounds |
|---|---:|---:|---|---|
| `L` | 2.4 | 3 | m | 0.5 to 6 |
| `Lb` | 1.6 | 2 | m | 0.3 to 5 |
| `theta` | 35 | 42 | deg | 15 to 75 |
| `M` | 450 | 520 | kg | 100 to 1000 |
| `H` | 500 | 650 | N | 0 to 3000 |
| `e_H` | 0.3 | 0.25 | m | 0 to 1.5 |
| `gamma_d` | 1.25 | 1.3 | - | 1 to 2 |
| `S_boom` | 85,000 | 110,000 | mm^3 | 20000 to 300000 |
| `I_boom` | 8,500,000 | 12,000,000 | mm^4 | 1000000 to 50000000 |
| `E` | 200,000 | 200,000 | MPa | 180000 to 210000 |
| `A_brace` | 650 | 780 | mm^2 | 150 to 3000 |
| `d_pin` | 20 | 24 | mm | 8 to 60 |
| `t_plate` | 12 | 14 | mm | 4 to 40 |
| `sigma_y` | 250 | 250 | MPa | 200 to 550 |
| `N_y` | 2 | 2 | - | 1 to 5 |
| `delta_allow` | 10 | 12 | mm | 1 to 50 |
| `K_brace` | 1 | 1 | - | 0.5 to 2 |
| `r_min` | 28 | 32 | mm | 5 to 100 |
| `I_brace` | 1,200,000 | 1,800,000 | mm^4 | 50000 to 10000000 |
| `N_b` | 2 | 2 | - | 1 to 5 |
| `n_s` | 1 | 2 | - | 1 to 2; integer 1 or 2 |
| `tau_allow` | 80 | 80 | MPa | 20 to 250 |
| `bearing_allow` | 150 | 150 | MPa | 50 to 500 |

Ranges remain the declared instructional input envelope, not manufacturing tolerances or engineering validity limits. Existing steps remain UI increments; do not reject otherwise valid finite values solely for being off an increment. This permits exact criterion-boundary tests and independently chosen comparison values. Both baseline variants retain baseline inputs; the exam retains the listed alternate values. See D4 for effective-input merging and coupled geometry validation.

## B. Corrected engineering calculations

### B1. Signed equilibrium, reactions and load path

Use N–mm–MPa internally. Convert L, a = Lb, e_H and ell_b from metres to millimetres once. Convert output moments back to N·m by dividing by 1000. E in MPa is N/mm². The symbol M for payload mass must not be confused with the function M(x) for bending moment.

For either s, with positive F compression:
\[
\begin{aligned}
R_C&=F\sin\theta=(PL-C_e)/a,\\
F&=(PL-C_e)/(a\sin\theta),\\
C_x&=F\cos\theta,\\
A_x&=-(C_x+H_x),\\
A_y&=P-R_C .
\end{aligned}
\]
Verify independently:
\[
A_x+C_x+H_x=0,\quad A_y+R_C-P=0,\quad
R_Ca+C_e-PL=0.
\]

A has **no reaction moment**. PL is the clockwise magnitude of the vertical applied-load moment about A. PL − C_e is the signed moment that the brace vertical component balances; neither is a moment carried by a fixed boom root.

On the brace, the boom applies (−C_x, −R_C) at C and the wall applies (C_x, R_C) at B. On the wall the lower-anchor force is the opposite. The whole-crane support reactions are (A_x, A_y) at A and (C_x, R_C) at B. Since h C_x = a R_C, their wall moment balances the applied loads. These statements remain signed when F < 0; arrows reverse. Do not assemble a single FBD from component-wise maxima of different cases.

| Case | H_x | C_e | R_C |
|---|---|---|---|
| Rightward | +H | +H e_H | (PL − H e_H)/a |
| Leftward | −H | −H e_H | (PL + H e_H)/a |

A compression result has F > 0, a tension result F < 0, and a zero-force result F = 0. Standard axial stress is tension positive: sigma_brace = −F/A_brace. Use |F| for nominal connection-demand magnitudes and absolute axial-stress comparison.

### B2. Complete boom internal-force distributions and extrema

Take x from A toward D. Use sagging-positive M(x), V = dM/dx on open intervals, and tension-positive N:
\[
V(x)=
\begin{cases}
A_y,&0<x<a,\\
P,&a<x<L,
\end{cases}
\]
\[
M(x)=
\begin{cases}
A_yx,&0\le x\le a,\\
-P(L-x)+C_e,&a\le x\le L,
\end{cases}
\qquad
N(x)=
\begin{cases}
C_x+H_x,&0<x<a,\\
H_x,&a<x<L.
\end{cases}
\]
There is a shear jump R_C at C and −P at D. M is continuous at C. M(A) = 0, M(C) = −P(L−a) + C_e, and the internal moment just inside D is C_e, followed by the applied end-couple jump to zero outside the member.

For this piecewise-linear diagram:
\[
M_{\max,\mathrm{abs}}=\max(0,|M(C)|,|C_e|).
\]
Report every governing physical location: C, D, or tied C and D. If C = D, identify the single physical node “C = D”. If all moments are zero, report zero bending throughout rather than a fictitious unique critical section. Do not hard-code the brace attachment as the maximum. Under changed inputs the end couple can govern at D, and |M(C)| = |C_e| can occur.

At baseline N_AC is tensile in both cases. N_CD changes from tension to compression with H_x. This does not authorize a boom axial/combined-stress or compression-stability pass; A_boom, complete section and restraint evidence are absent.

### B3. Braced displacement, derivation and signed components

Let downward displacement v and clockwise slope be positive. The calculation includes flexure of AD and axial deformation of BC with C's horizontal translation neglected. With tensile extension positive:
\[
\Delta\ell_b=-F\ell_b/(E A_b),\quad
v_C=-\Delta\ell_b/\sin\theta
=F\ell_b/(E A_b\sin\theta).
\]
For a unit downward virtual force at D holding H_x and C_e fixed:
\[
m(x)=\partial M/\partial P=
\begin{cases}
-(L-a)x/a,&0<x<a,\\
-(L-x),&a<x<L,
\end{cases}
\quad \partial F/\partial P=L/(a\sin\theta).
\]
The unit-work expression is
\[
v_D=\int_0^L\frac{M(x)m(x)}{E I_{\rm boom}}dx+
\frac{F\ell_b}{E A_b}\frac{L}{a\sin\theta}.
\]
Therefore
\[
\boxed{
v_D=
\underbrace{\frac{PL(L-a)^2}{3E I_{\rm boom}}
-\frac{C_e(L-a)(3L-a)}{6E I_{\rm boom}}}_{v_{D,\rm bending}}
+
\underbrace{\frac{(PL-C_e)\ell_b L}
{E A_b a^2\sin^2\theta}}_{v_{D,\rm brace}} .}
\]
All lengths in this equation are mm, loads N, couples N·mm; the result is mm. The brace term is also v_C L/a. Retain its sign. The resulting motion can be upward, downward or zero. Serviceability uses **|v_D|**, not the larger component, a signed ratio that can become negative, or the separate fixed-cantilever comparison.

At a = L the tip bending contribution to v_D is zero and v_D = v_C; this does not imply zero bending stress when C_e is nonzero. The end couple can still bend the beam while the loaded endpoint movement is set by the axial support.

The derivation is specific to the approved omitted-compliance model. Castigliano/unit-work methods are supported by [MIT's energy-method notes](https://ocw.mit.edu/courses/2-080j-structural-mechanics-fall-2013/36aba6cb4c76d015d363935acdf39567_MIT2_080JF13_ProbSet_7_Sol.pdf); that source does not validate the assigned crane.

For reference, if an actual boom axial area were supplied, the additional first-order tip term for this load path would be
\[
v_{D,\rm boom\ axial}=
\frac{(C_x+H_x)L\cot\theta}{E A_{\rm boom}}.
\]
It is deliberately omitted under the approved model, not numerically set to a verified zero. At baseline its coefficients are approximately 208.860818/A_boom and 196.312157/A_boom mm with A_boom in mm². Actual connection, wall and shear flexibility may add further response. No conclusion that the present displacement is a guaranteed upper bound is justified.

### B4. Nominal stress checks and identified connection

\[
\sigma_{\rm boom,bend}=M_{\max,\rm abs}/S_{\rm boom},\quad
|\sigma_{\rm brace}|=|F|/A_b,
\]
\[
A_p=\pi d_p^2/4,\quad A_{\rm shear}=n_s A_p,\quad
\tau_p=|F|/(n_s A_p),\quad
A_{\rm bearing}=t d_p,\quad p_{\rm bearing}=|F|/(t d_p).
\]

**Proposed checked connection:** a representative brace-end connection at C carrying the full brace force. The same nominal demand could occur at B, but no identical connection is asserted. A's pin must not be checked using F; its reaction resultant is different.

For n_s = 1, depict a hypothetical single-shear pin/lug load path. For n_s = 2, depict a symmetric clevis with two equally effective shear planes. In both cases t_plate is the thickness of the **one full-load brace lug**, so its bearing demand is |F|/(t_plate d_pin). For the symmetric double-shear alternative, each outer cheek carries |F|/2; their thicknesses and bearing are not supplied or checked. Changing n_s must not silently divide the full-load lug bearing demand by two. The pin is assumed aligned and load sharing ideal for this average-stress exercise. These proposed details are not inferred from the industry picture.

The assigned member criterion is sigma_y/N_y = 125 MPa at baseline. Pin shear 80 MPa and lug bearing 150 MPa are separate illustrative criteria, not derived from that member yield reference. No unsupported material factor of safety is reported. The bending check excludes N/A, transverse shear and instability; the average connection checks exclude pin bending and local failure.

### B5. Separate fixed-cantilever comparison

For a **different, root-fixed P-only model**, calculate:
\[
M_{\rm fc}=PL,\quad \sigma_{\rm fc}=PL/S,\quad
v_{\rm fc}=PL^3/(3EI).
\]
This changes A's rotational restraint and removes the brace. Merely removing the brace while retaining an ideal root pin would create a mechanism, not this cantilever. Label these results “P-only fixed-cantilever comparison; changed support model”. Do not call them actual crane stresses/displacements, a universal conservative bound, or an eligible check in M5.

At baseline the comparison gives 13,243.50 N·m, 155.81 MPa and 14.957 mm. If comparison-to-limit discussion is retained, it must say that it pertains only to the comparison model; it cannot produce the braced recommendation. Do not invent a capacity from either model.

### B6. Independent baseline substitutions

\[
\begin{aligned}
W&=450(9.81)=4414.5\ {\rm N},\\
P&=1.25(4414.5)=5518.125\ {\rm N},\\
a&=1600\ {\rm mm},\quad L=2400\ {\rm mm},\\
h&=1600\tan35^\circ\approx1120.332061\ {\rm mm},\\
\ell_b&=1600/\cos35^\circ\approx1953.239342\ {\rm mm}.
\end{aligned}
\]
Rightward H:
\[
\begin{aligned}
C_e&=500(300)=150000\ {\rm N\,mm},\\
R_C&=[5518.125(2400)-150000]/1600=8183.4375\ {\rm N},\\
F&=8183.4375/\sin35^\circ\approx14267.387887\ {\rm N},\\
A_x&=-(14267.387887\cos35^\circ+500)\approx-12187.159954\ {\rm N},\\
A_y&=5518.125-8183.4375=-2665.3125\ {\rm N}.
\end{aligned}
\]
Here M(C) = −4,264.50 N·m, M(D) = +150.00 N·m, so C governs bending and sigma_bend = 4,264,500/85,000 = 50.170588... MPa.
\[
v_{D,\rm bending}=
\frac{5518.125(2400)(800)^2}{3(200000)(8500000)}
-\frac{150000(800)(5600)}{6(200000)(8500000)}
\approx1.596047059\ {\rm mm},
\]
\[
v_{D,\rm brace}=
\frac{[5518.125(2400)-150000](1953.239342)(2400)}
{(200000)(650)(1600)^2\sin^2 35^\circ}
\approx0.560604445\ {\rm mm}.
\]
Thus v_D ≈ 2.156651504 mm downward. Printed rounded factors use approximation signs; calculations retain full precision.

Leftward H has C_e = −150,000 N·mm and
\[
R_C=[5518.125(2400)+150000]/1600=8370.9375\ {\rm N},
\quad F\approx14594.284161\ {\rm N}.
\]
Its **own** horizontal reaction is A_x = −(11954.937705 − 500) ≈ −11,454.937705 N. M(C) = −4,564.50 N·m, sigma_bend = 53.70 MPa. Its tip components are 1.727811765 + 0.573449088 ≈ 2.301260853 mm downward.

The old −12,454.937705 N reaction paired with 14,594.284161 N brace compression is not either complete directional case. Its declared rightward FBD has a +300 N·m residual.

### B7. Both baseline cases and nominal criterion envelope

The following values are independent equation results, shown to six decimals as verification targets, not proposed student display precision. The registry below defines display precision.

| Quantity | Rightward H | Leftward H | Unit |
|---|---:|---:|---|
| `Hx_N` | 500.000000 | -500.000000 | N |
| `Ce_Nm` | 150.000000 | -150.000000 | N m |
| `required_brace_moment_Nm` | 13093.500000 | 13393.500000 | N m |
| `brace_vertical_N` | 8183.437500 | 8370.937500 | N |
| `brace_force_N` | 14267.387887 | 14594.284161 | N |
| `brace_horizontal_N` | 11687.159954 | 11954.937705 | N |
| `wall_pin_x_N` | -12187.159954 | -11454.937705 | N |
| `wall_pin_y_N` | -2665.312500 | -2852.812500 | N |
| `boom_axial_AC_N` | 12187.159954 | 11454.937705 | N |
| `boom_axial_CD_N` | 500.000000 | -500.000000 | N |
| `boom_moment_C_Nm` | -4264.500000 | -4564.500000 | N m |
| `boom_moment_D_Nm` | 150.000000 | -150.000000 | N m |
| `boom_max_moment_Nm` | 4264.500000 | 4564.500000 | N m |
| `boom_bending_MPa` | 50.170588 | 53.700000 | MPa |
| `brace_axial_signed_MPa` | -21.949828 | -22.452745 | MPa |
| `brace_axial_magnitude_MPa` | 21.949828 | 22.452745 | MPa |
| `brace_extension_mm` | -0.214366 | -0.219278 | mm |
| `C_down_mm` | 0.373736 | 0.382299 | mm |
| `tip_bending_mm` | 1.596047 | 1.727812 | mm |
| `tip_brace_mm` | 0.560604 | 0.573449 | mm |
| `tip_down_mm` | 2.156652 | 2.301261 | mm |
| `pin_shear_MPa` | 45.414506 | 46.455049 | MPa |
| `bearing_MPa` | 59.447450 | 60.809517 | MPa |
| `boom_bending_utilization` | 0.401365 | 0.429600 | 1 |
| `tip_displacement_utilization` | 0.215665 | 0.230126 | 1 |
| `brace_axial_utilization` | 0.175599 | 0.179622 | 1 |
| `pin_shear_utilization` | 0.567681 | 0.580688 | 1 |
| `bearing_utilization` | 0.396316 | 0.405397 | 1 |

Both cases have brace compression, C as the maximum-bending location, and downward tip movement. The larger **eligible nominal utilization** is pin shear in the leftward case, 0.580688116267. All five assigned nominal criteria are met. Compression stability and the other omitted checks remain unassessed; this is not a safe-design finding. The largest support-x reaction magnitude instead occurs in the rightward case, demonstrating why a component envelope must not be drawn as one physical FBD.

## C. Section properties, axes and stability

### C1. What the assignments establish

For the selected boom bending axis, I_boom/S_boom = 100 mm is the implied outer-fiber distance. It does not identify a unique section or A_boom. Retain the assigned I and S for the stated bending exercise without claiming a stock section, torsional resistance or combined-stress capacity.

For the brace:
\[
r_I=\sqrt{I_{\rm brace}/A_b}
=\sqrt{1200000/650}\approx42.966892\ {\rm mm},
\]
\[
K\ell_b/r_I\approx45.459172,\qquad
K\ell_b/r_{\rm reported}\approx69.758548 .
\]
If 28 mm and the supplied inertia describe the same axis, the assignments are inconsistent with I = A r². If 28 mm is the minimum-axis radius and I_brace is another-axis inertia, they are not inherently impossible, but the smaller-axis restraint and inertia must be established. The package does not establish which interpretation is true.

**Proposed interim definition preserving the assignments:** I_brace is an explicitly assigned inertia for a **formal calculation axis f**. Define its consistent radius r_f = sqrt(I_brace/A_brace) and slenderness K ell_b/r_f. Treat r_min as a separately reported minimum-radius assignment with unverified axis provenance. Show its diagnostic slenderness separately. Do not assert that the two axes actually exist or that f is governing. The baseline is numerically usable as a formal exercise while its physical section status remains “axes unresolved”. Do not reject the baseline as invalid geometry, silently replace I_brace by A r_min², or silently replace 28 by 42.97.

For diagnostic comparison only:
\[
I_{\rm implied,min}=650(28)^2=509600\ {\rm mm^4}.
\]
Its formal Euler load would be 263,662.420017 N, stress 405.634492 MPa. Those are not approved substitute properties/capacities; they demonstrate that reconciling the radius alone does not establish Euler applicability.

### C2. Formal Euler calculation and explicit exclusion from capacity

\[
P_{E,f}=\frac{\pi^2 E I_{\rm brace}}{(K\ell_b)^2}
\approx620869.120918\ {\rm N},
\quad \sigma_{E,f}=P_{E,f}/A_b\approx955.183263\ {\rm MPa}.
\]
The assigned yield reference is 250 MPa, so the formal critical stress is about 3.820733 times that reference. It cannot represent a verified linear-elastic critical state for the assigned yielding material. P_E/N_b ≈ 310,434.560459 N is a **divided formal reference**, not an allowable compressive resistance. Applying a divisor does not repair an inapplicable critical-state calculation.

A_b sigma_y = 162,500 N is a material-yield reference, not an actual column resistance. Do not substitute it as a compression capacity or use a guessed inelastic-column formula. The Euler/yield intersection pi sqrt(E/sigma_y) ≈ 88.857659 is not a documented proportional-limit threshold.

The need to establish the elastic range and appropriate restraints follows the ideal-column assumptions discussed in [Johnson, Aerospace Structures, Chapter 11, `11.5.1](https://vtechworks.lib.vt.edu/bitstream/handle/10919/102306/Ch11_Buckling_Columns_Plates.pdf?sequence=139). Neither that reference nor the present calculation supplies this crane's section, imperfections or resistance.

**Proposed handling of K and N_b:** retain both fields for compatibility and explicitly formal parametric learning. K = 1 is consistent with ideal pin-ended Euler bending in the selected unrestrained plane. Editing K does not change the approved equilibrium restraints or the displacement model. Any K other than 1 is a hypothetical Euler sensitivity parameter, not evidence that the actual brace ends have become fixed or free. N_b is only a formal-reference divisor. These values cannot enter the physical acceptance ranking. If faculty prefer to lock K to 1 or retire N_b, that is an explicit interface/content decision before implementation, not an implicit change to the approved boom model.

For F > 0, physical compression resistance is **unvalidated** even if a changed formal sigma_E happens to be below sigma_y. For F < 0, compression buckling is not applicable to that case; tensile fracture/net section and connection reversal remain unassessed. For F = 0, there is no brace compression demand in that case. The formal geometry-based Euler result can still be displayed as an educational result, clearly separated from the case applicability statement. No “buckling utilization”, buckling pass, buckling safety factor or Euler-based physical reserve is generated.

### C3. Evidence required for a capacity calculation

Require an identified brace cross-section and construction (solid/hollow/built-up, dimensions, thicknesses, tolerances), consistent area and both principal inertias/radii, actual unbraced lengths in both planes, end restraints, connection eccentricities, material grade/certificates and elastic/proportional-limit behavior, residual stress/imperfection assumptions, local/slender-element behavior, and an approved design method with applicable resistance factors. Out-of-plane restraint cannot be inferred from the 2D pin symbol. A researched stability implementation is a later approved engineering task.

## D. Decision logic, validation and parameter-dependent interpretation

### D1. Eligible instructional ranking

Evaluate both complete load cases independently and take envelopes only after computing each case. Exactly these five assigned **nominal** criteria enter the instructional utilization ranking:
\[
u_{\rm bend}=\frac{M_{\max}/S}{\sigma_y/N_y},\quad
u_{\rm move}=\frac{|v_D|}{\delta_{\rm allow}},\quad
u_{\rm brace}=\frac{|F|/A_b}{\sigma_y/N_y},
\]
\[
u_{\rm pin}=\frac{|F|/(n_s A_p)}{\tau_{\rm allow}},\qquad
u_{\rm bearing}=\frac{|F|/(t d_p)}{p_{\rm allow}}.
\]
The first is a nominal bending-only criterion, the third nominal axial yielding, and the last two average-stress criteria for the proposed connection. Their instructional eligibility is not evidence of a certified lifting-device check.

For each k, U_k = max(u_k,right, u_k,left); U_max = max_k U_k. Preserve the controlling case(s) for every criterion. The formal Euler references, formal slendernesses, yield-load reference, separate fixed-cantilever comparison, raw force magnitudes and unassessed modes are excluded. Do not infer “most dangerous component” from the larger raw stress or from a dimensionless ratio for an unvalidated resistance.

Comparisons are **unrounded and inclusive:** a criterion is met exactly when its raw u <= 1. Do not read display text back into arithmetic. A value 1.0000001 fails even if displayed 1.0000. If displayed values obscure the boundary, add more digits/scientific notation or a clear raw-result classification; never change the decision.

**Proposed numerical tie rule:** label values co-governing when
\[
|u_i-U_{\max}|\le10^{-12}\max(1,|U_{\max}|).
\]
This tolerance only identifies numerical ties and does not relax u <= 1. Report all tied modes and all tied cases in stable order (bending, movement, brace axial, pin shear, bearing; rightward then leftward). Moment-location ties use the same relative rule in N·mm with max(1 N·mm, |M|max); their true peak magnitude is still the raw maximum. This is numerical labeling, not an engineering tolerance.

### D2. Recommendation contract and missing criteria

Use structured statuses and bounded text, not a global boolean `safe`:

| State | Required recommendation behavior |
|---|---|
| Invalid inputs / nonfinite calculation | No numerical answers or recommendation; show specific validation errors and block all standard packet exports. |
| One or more eligible u > 1 | “One or more assigned nominal criteria are exceeded in the idealized model. Modification or reassessment is required for those criteria. This is not a prediction of actual failure.” List each exceeded check and case. |
| All eligible u <= 1 | “All five assigned nominal criteria are met in the idealized model.” Report the largest ratio and all ties; do not say the crane is safe, approved or accepted for service. |
| Missing/unvalidated physical criteria | Always append the unassessed scope. If either case has compression, explicitly say physical compression stability remains unvalidated. If neither does, state compression buckling is not demanded in these cases while tensile/reversal and other checks remain unassessed. |
| Any eligible result missing | Treat as a calculation error and block answers/exports; do not filter it out and rank what remains. |

Baseline required conclusion:

> All five assigned nominal criteria are met for both directional cases. The largest eligible nominal utilization is pin shear, 0.5807, in the leftward case. Compression stability is unvalidated; combined boom normal stress, other connection modes, fatigue, out-of-plane behavior, anchors, rated hardware and actual stiffness are not assessed. The calculation supports a limited instructional comparison and identifies further engineering work; it does not establish a safe lifting system.

The unassessed scope remains visible in student problem assumptions and instructor conclusions. Do not allow a missing physical resistance to become an automatic pass, a numerical zero utilization, or an automatic claim that the member fails. This proposal permits an explicitly qualified instructional packet without physical compression resistance; it never permits a production-approval statement.

### D3. Zero, sign, reversal and modification narratives

- Classify F from its unrounded sign. Use “compression”, “tension” or “zero axial force”; do not always say a lower brace pushes upward. Show signed components and reverse arrows for negative values.
- Signed sigma_brace is tension-positive; connection demands and eligible axial utilization use |F|. No negative utilization is allowed.
- A zero demand has u = 0 for its positive criterion. Do not generate criterion/demand reserves that divide by zero. No infinity, blank answer, negative zero or unsupported factor of safety may appear.
- State “downward”, “upward” or “zero vertical movement” from the raw v_D sign. Do not hard-code a downward answer in variants. A small nonzero result that rounds to zero must be shown with sufficient precision and its actual direction.
- H = 0 gives tied identical cases. e_H = 0 gives tied bending, brace and vertical-motion responses but generally different horizontal reactions and boom axial forces. Do not discard that distinction.
- Recommending a larger d_pin reduces nominal pin shear and lug bearing under an otherwise unchanged equilibrium; changing n_s to 2 requires the proposed symmetric double-shear connection and does not halve the main lug bearing.
- Increasing I_boom reduces the bending component, not the brace component. Increasing A_brace reduces the axial-support component. Effects on the magnitude of total movement can depend on signed cancellation.
- At fixed a and load moment, increasing theta reduces |F| but increases brace length and wall separation. The formal Euler demand/reference ratio scales as 1/(sin(theta) cos²(theta)); the brace displacement component scales as 1/(cos(theta) sin²(theta)). Neither is universally improved by increasing theta.
- Moving a outward at fixed theta changes span, force, length, wall separation and displacement. Its formal Euler demand/reference ratio grows with a. A recommendation must identify the target response and recompute all checks; do not universally recommend “move the brace out” or “steepen the brace”.
- Changing L changes the boom and full-reach load position. It is not a pure trolley-position study.

### D4. Effective-input validation and stale-answer prevention

Proposed common resolver: merge package defaults, selected variant values, then user overrides by **own-property presence**, not truthiness or null-coalescing. Omitted keys inherit the previous layer. Explicit null, undefined, empty/whitespace string, boolean, array, object, nonnumeric text, NaN or infinity are invalid rather than defaults. Accept finite numbers or trimmed, full decimal/exponent numeric strings from UI/CLI; reject partial parsing, comma-grouped values, hexadecimal and strings with units. Numeric zero is intentional where permitted.

Validate all 23 effective inputs, including formal-only fields, before computing anything:

1. Require finite values within the inclusive declared min/max in A5. L, Lb, M, gamma_d, section properties, E, diameters, thicknesses, sigma_y, N_y, delta_allow, K, r_min, N_b and positive criteria must be strictly positive. H and e_H may be zero. n_s must be exactly integer 1 or 2.
2. Require 0 < theta < 90 degrees as well as its declared range. Require 0 < a <= L. Derive h and ell_b rather than accepting independent inconsistent geometry.
3. Reject unknown variable-override keys and conflicting/unsupported a or diagonal-length aliases. Do not silently treat Lb as a diagonal length.
4. Verify every mandatory result is finite and each mandatory denominator positive. Overflow/NaN is a calculation error, not an incomplete-answer success.
5. The I/r discrepancy is a physical-property warning/status, not an objectively impossible nodal geometry. The selected formal axis uses r_I consistently. Changing r_min alone cannot change the formal load based on I_brace.
6. Positive declared properties do not prove an actual section, stability or small-deformation validity. Apply the explicit unassessed-model note; do not invent material strengths or arbitrary strain/rotation limits to turn that absence into a physical verdict.

Return a typed result such as `{status:"valid", inputs, cases, shared, envelope, limitations}` or `{status:"invalid", errors}`. A “valid” result means valid inputs for this instructional algebra, not a validated crane. Missing physical evidence is explicit in limitations, not hidden.

Every route must use this same resolver. Invalid preview edits clear both audiences' previous numerical answers and rendered figures/captions, show errors associated with keys/geometry, disable HTML/QMD/DOCX/PDF downloads and printing, and prevent stale blob/print caches. Direct and CLI exports fail clearly before writing an apparently valid packet. CLI must return nonzero without overwriting an existing export on invalid inputs; validate first, then write. Recovery to a valid input set recomputes both cases, figures' current-input tables, answers and decisions from scratch.

Finite but very large first-order responses do not become evidence of material failure or physical validity. With no approved quantitative validity thresholds, this proposal retains the explicit unassessed first-order scope and no full acceptance statement. Any later warning/export threshold would require engineering approval and tests; the platform's separate warning policy must not be silently copied into this model.

## E. Student questions, instructor answers and packet sequence

### E1. Records, references and variants

Retain exactly these 12 record IDs in order: `q1, q2, q3, q4, q5, q6, idealization, q7, q8, q9, q10, q11`. No consolidation or added logical question is necessary. Multi-part work stays within its existing record. Preserve useful conceptual objectives and revise misleading q9/q10 objectives, grading notes and common-mistake text along with the visible answers.

**Proposed stable task labels:** q1–q6 display Q1–Q6; idealization displays I1; q7–q11 display M1–M5. A renderer may additionally number selected records sequentially, but references use the stable labels/titles, never hard-coded “Question 7/8” or “Questions 7–10”. Thus core/exam numbering can be 1–6 while I1 and M1–M5 still refer correctly. Custom subsets use the relevant calculation title when the referenced task is absent; all numerical values are still generated from the full validated model, not from which upstream questions happen to be selected.

| Selection | Records | Inputs | Required order |
|---|---|---|---|
| No variant / default | All 12 | Baseline | Q1–Q6, I1, common-model block, M1–M5 |
| context-rich-project | All 12 | Baseline | Same |
| section-a | I1, M1–M5 | Baseline | I1, common-model block, M1–M5 |
| exam-version | I1, M1–M5 | Existing exam inputs | Same six-task order |

Keep the default full selection rather than silently changing existing selected records. Update index assignment guidance to match that choice and offer the explicit core variant.

The context text/image appears once. The full common numerical assumptions, 23-input table and unsolved schematic appear once after I1 and before M1. If a custom selection omits I1 but includes numerical tasks, place the common block immediately before its first numerical task. If only context/I1 tasks are selected, do not append numerical solutions or unnecessary computed tables.

Remove static duplicates from `_student-problem.qmd` and the direct packet. It should supply context/introductory layout only; generated `questions.json` remains the sole question/representative-answer source. Do not reproduce conceptual questions in both include and generated list. Use the same content blocks in direct, Builder and CLI routes. The old guide's hard-coded Section A answer must be replaced by this validated/generated baseline content, or explicitly removed from active output; do not leave a second contradictory solution. Preserve useful general instructor background with corrected scope and no duplicated official figure.

### E2. Exact proposed question/answer copy

Within the following copy, equations and labels are canonical; numerical values are illustrative baseline instructor answers and must be parameterized in implementation. Shared formula blocks may be referenced from the common model; completed answers remain instructor-only.

#### q1 — Q1: Design, manufacturing and operational requirements

**Student wording**

The proposed crane handles battery packs of assigned mass M and has assigned reach L. Identify the functional, safety, manufacturing, installation, maintenance and commercial considerations that should influence its design. Name and justify the three requirements you consider most important before production use. Distinguish requirements from evidence that those requirements have actually been met.

**Instructor answer**

Relevant considerations include payload/rated capacity, reach and swing range, trolley travel, workspace/clearance, positioning accuracy, repetitive duty, inspection, maintainability, traceable lifting hardware, wall/support adequacy, manufacture, installation, downtime and cost. A defensible three-part priority is load-path/strength/stability adequacy, stiffness and positioning, and reliability under the specified duty. Equivalent priorities supported by the operation are acceptable. Listing requirements does not prove compliance; no certification or actual lifting capacity follows from the exercise.

#### q2 — Q2: Material selection and property evidence

**Student wording**

Recommend appropriate material classes for the boom, brace, pins, mounting plates, bolts, anchors, chain, hook and hoist hardware. Explain which properties matter for each. Distinguish stiffness, yielding, ultimate failure, fatigue resistance, toughness, wear, weldability, machinability, cost and availability. Identify which selected properties or component ratings would require documented evidence.

**Instructor answer**

Structural-steel classes are plausible candidates for boom/brace stiffness, fabrication and cost, subject to section and grade selection. Pin materials/heat treatment require consideration of bending, shear, bearing, wear, fatigue and toughness. Welded plates, bolts and wall anchors need compatible material/connection and substrate evidence. Hooks, chains and hoists require rated, traceable components; nominal material stress is not a substitute for a component rating. E = 200 GPa and sigma_y = 250 MPa are assigned member references, not an identified steel grade or pin specification. Do not infer ultimate strength, fatigue resistance, proportional limit or allowables from those two numbers.

#### q3 — Q3: Geometry and load path

**Student wording**

Classify the system, member and connection geometry that influences load transfer, stress, displacement, stability, fatigue and connection behavior. Distinguish horizontal boom reach L, horizontal attachment distance a, brace angle theta, wall-anchor spacing h and diagonal brace length ell_b. Explain why a trolley coordinate on a fixed boom is different from changing L. Identify geometric information that the context illustration does not reliably supply.

**Instructor answer**

System geometry includes reach, trolley position, support coordinates, attachment distance, brace angle, wall spacing, swing and hook position. In the later common model, h = a tan(theta), ell_b = a/cos(theta); a = 1.6 m is horizontal, not diagonal. Section geometry includes A, I, S, axes, thicknesses, unsupported lengths and radii; connection geometry includes pin/hole diameters, lug thickness, shear planes, edge distances, bolt spacing, eccentricity and weld details. Load position changes response according to the selected restraints and its interval; do not assume every bending extreme increases monotonically for every inboard load position. The numerical exercise fixes the payload at full reach and does not provide an independent trolley-travel coordinate. The historical image labels are not numerical givens.

#### q4 — Q4: Loading and the limits of the assigned case

**Student wording**

Develop a preliminary loading model for the real handling operation. Identify static, quasi-static, dynamic, impact, cyclic and accidental actions. Distinguish nominal service load, maximum expected service load, maximum credible load and a factored or amplified instructional case. Identify additional masses and operating information required. Explain how the later assigned battery-only numerical case differs from a complete operational loading model.

**Instructor answer**

Include battery, lifting fixture, hoist/trolley and structural weights; acceleration/braking, swing/side pull, impact/overload and duty history require operational evidence. A project load expression may include those known or researched masses with explicitly justified factors; they have not been assigned here. The later common case uses only W = Mg = 4,414.50 N and P = gamma_d Mg = 5,518.125 N at full reach, with the prescribed horizontal force/couple pair. The 1.25 amplification and H = 500 N are instructional assignments, not validated worst-case operating loads. Missing weights are explicitly omitted in that calculation, not assumed physically absent. Do not mix an estimated project mass into the fixed representative answer without defining a new input case.

#### q5 — Q5: Critical locations and omitted modes

**Student wording**

Identify potentially critical locations for strength, stiffness, stability and fatigue in the physical crane. Distinguish local wall/connection effects from the internal forces of a chosen boom model. Explain why a critical section or member cannot be selected solely from appearance or one force magnitude.

**Instructor answer**

Potential locations include boom-to-brace and wall joints, brace and end connections, pins/lugs, anchors/welds, trolley contact, hoist, hook, chain and fixture. Brace compression and thin/slender members require stability investigation; motion includes member, support and connection flexibility; cyclic concentrations occur at holes/welds/contact details. In the supplied pin-root model A has no reaction couple, although actual wall/anchor forces remain important. Bending extrema must be determined from its diagram: C governs at baseline, while D or a tie can govern under other prescribed couples. No complete failure-mode ranking follows from these nominal calculations alone.

#### q6 — Q6: Assessment criteria and missing evidence

**Student wording**

Identify numerical criteria and evidence that would be needed to assess repeated service, including member yielding, ultimate failure, connection shear/bearing, stability, fatigue, motion, proof-load and rated-load requirements. Distinguish supplied instructional criteria from criteria that cannot yet be evaluated. Do not invent an allowable, material grade, duty life or code requirement.

**Instructor answer**

The later numerical exercise can compare nominal bending and brace axial stress with the assigned sigma_y/N_y, average pin shear with the assigned 80 MPa, main-lug bearing with the assigned 150 MPa, and absolute braced tip movement with the assigned 10 mm. These are scoped instructional criteria. No validated compression resistance, combined boom stress, fatigue criterion/history, ultimate/net-section resistance, anchor/wall capacity, proof-test procedure or hardware rating is supplied. The correct response for these missing checks is the required evidence and method to establish it, not an invented number. Met nominal criteria do not prove repeated-service safety.

#### idealization — I1: Independent idealization and free-body diagrams

**Student wording**

Using the context illustration, propose your own two-dimensional structural idealization before looking at the supplied numerical common model. Identify nodes, support restraints and possible force paths. Draw the relevant free-body diagrams and state how the payload, horizontal action and any moment would reach the boom and wall. Explain when the brace could be treated as a two-force member and which effects your model omits. Do not assume a freely suspended chain transmits an independent moment. State what evidence would distinguish your choices from other defensible models.

**Instructor answer**

Credit an explicit, mechanically consistent proposed model and its limitations, not a guess of the later official layout. A beam boom may carry bending, shear and axial force; an unloaded pin-ended straight brace can be a two-force member. A root pin versus restrained root, wall flexibility, load location and force/couple transfer must be stated. Different defensible choices may be credited for this independent task. A freely suspended chain does not establish a couple-transmitting attachment. The subsequent common model adopts the approved A/B/C/D geometry and prescribed boom force/couple for comparability; it is an assigned model, not proof that the independent model or image has those joints. Completed representative FBDs belong only in instructor output.

**Layout insertion immediately after I1:** the unsolved common-model schematic, 23 current inputs, A1–A4 assumptions and signed load convention. No computed reactions, force/moment diagrams, stress/displacement values or completed answers appear in this student block.

#### q7 — M1: Establish both signed common-model load cases

**Student wording**

Use the supplied common numerical model. Calculate W = Mg and P = gamma_d Mg. At D apply downward P and analyze H_x = +H and H_x = −H separately, each with prescribed couple C_e = H_x e_H, counterclockwise positive. Draw or label the applied loads for each case and determine their signed moment about A. State which weights are omitted and why the force/couple pair is not a moment transmitted by the illustrated chain. Is PL a reaction moment at A?

**Instructor answer**

W = 4,414.50 N and P = 5,518.125 N at baseline. The gravity moment is −PL = −13,243.50 N·m. The rightward pair has H_x = +500.00 N, C_e = +150.00 N·m and total applied moment C_e − PL = −13,093.50 N·m; the leftward pair has H_x = −500.00 N, C_e = −150.00 N·m and total applied moment −13,393.50 N·m. PL and PL − C_e are applied-load moment measures, not a pin reaction couple. The wall anchors/brace equilibrate the loads. The common case omits the other unassigned equipment and structural weights and prescribes the equivalent loads directly at the boom. If e_H = 0 the horizontal load still affects force equilibrium but adds no prescribed couple; if H = 0 the two cases coincide.

#### q8 — M2: Brace action and complete support reactions

**Student wording**

For each M1 load case, use signed moment and force equilibrium of the boom to calculate R_C, F, C_x, A_x and A_y. Use positive F for brace compression and report tension or zero force when the sign requires it. Draw the brace free body and identify the lower-wall reaction. Verify both force balances and moment balance. Do not combine reactions from opposite horizontal-force cases.

**Instructor answer**

Use R_C = (PL − C_e)/a, F = R_C/sin(theta), C_x = F cos(theta), A_x = −(C_x + H_x), A_y = P − R_C. The baseline rightward values are R_C = 8,183.44 N, F = 14,267.39 N compression, C_x = 11,687.16 N, A_x = −12,187.16 N, A_y = −2,665.31 N. The leftward values are R_C = 8,370.94 N, F = 14,594.28 N compression, C_x = 11,954.94 N, A_x = −11,454.94 N, A_y = −2,852.81 N. Use full precision in the three residual checks. On the brace, C applies (−C_x, −R_C) and B supplies (C_x, R_C). Negative F reverses these actions; it does not justify reporting compression. Parameterized action text must reflect the calculated sign.

#### q9 — M3: Braced boom forces, nominal bending and displacement

**Student wording**

For both common-model load cases:

1. Sketch V(x), M(x) and tension-positive N(x) on AC and CD. Calculate the maximum absolute bending moment and every tied critical location; check C and the end couple at D.
2. Calculate the nominal bending stress M_max/S_boom and its assigned bending-only utilization. Explain what is missing for a combined axial/bending stress and actual stability check.
3. Calculate signed brace extension, v_C, the boom-bending and brace-axial contributions to tip movement, and their signed sum v_D. Derive or use the stated unit-work relation in the instructor-supplied method brief. Compare |v_D| with the assigned limit. State which compliances are omitted.
4. Separately calculate the root-fixed P-only cantilever comparison PL, PL/S and PL³/(3EI). Explain why it changes the support model and cannot control the braced assessment or be assumed universally conservative.
5. Explain one response-specific effect of changing L, I_boom or A_brace, and identify what must be recalculated.

**Instructor answer**

Use B2's signed distributions, M_max = max(|A_y a|, |C_e|), and B3's unit-work expression. C governs at baseline: right/left moments 4,264.50/4,564.50 N·m, bending magnitudes 50.17/53.70 MPa and utilizations 0.4014/0.4296 against 125.00 MPa. Boom axial forces AC are +12,187.16/+11,454.94 N; CD are +500.00/−500.00 N. No A_boom is supplied, so N/A ± M/S and a complete member assessment are unavailable.

Brace extensions are −0.2144/−0.2193 mm (shortening); v_C = +0.3737/+0.3823 mm downward. Tip contributions are bending 1.596/1.728 mm plus brace 0.561/0.573 mm, yielding +2.157/+2.301 mm downward. Displacement utilizations are 0.2157/0.2301, using unrounded sums. For changed inputs show actual direction, sign, governing moment location and ties, not these baseline words.

The P-only fixed-cantilever comparison is 13,243.50 N·m, 155.81 MPa, 14.957 mm; it changes A from a pin to fixed and is excluded from the braced ranking. A soft-brace counterexample in G proves that comparison is not universally conservative. Boom axial, shear, joint and wall compliance are omitted under the assigned model. More I reduces only the bending term; more A_brace reduces the brace term, with signed cancellation relevant to total movement.

**Method availability:** the common numerical brief must supply the B3 unit-work expression or its completed symbolic closed form if this method has not been taught. Symbolic model equations are permissible givens; substituted or evaluated numerical displacement is instructor-only. Faculty may instead require a derivation when the course has covered energy methods; the expected formula and numerical model remain unchanged.

#### q10 — M4: Brace and representative connection; critique formal Euler

**Student wording**

For both M2 cases, calculate tension-positive brace stress −F/A_brace and its magnitude-based assigned nominal utilization. For the identified brace-end pin/lug, calculate pin area, n_s effective shear areas, average pin shear, full-load lug bearing and their utilizations. State the connection/load-sharing assumptions; do not use F as the upper boom-pin reaction.

Calculate the physical diagonal brace length. For the supplied formal inertia axis compute r_I = sqrt(I_brace/A_brace), K ell_b/r_I and P_E = pi² E I_brace/(K ell_b)². Separately compute K ell_b/r_min using the reported radius and explain the axis discrepancy. Compare the formal Euler stress P_E/A_brace with sigma_y; explain why neither P_E nor P_E/N_b is an established compression resistance. Classify compression-buckling applicability for each signed force case. Identify missing section, restraint and material evidence and at least four additional connection checks.

**Instructor answer**

Baseline stress is −21.95/−22.45 MPa (compression), magnitude utilization 0.1756/0.1796. A_pin = 314.16 mm²; n_s = 1 gives the same total shear area. Pin demands are 45.41/46.46 MPa and utilizations 0.5677/0.5807. The one full-load lug area is 240.00 mm²; bearing is 59.45/60.81 MPa and utilization 0.3963/0.4054. In symmetric double shear only the pin demand halves; full-load lug bearing remains unchanged.

ell_b = 1.9532 m, r_I = 42.9669 mm, formal-axis slenderness 45.4592; reported-radius slenderness 69.7585. The values require either different evidenced axes or corrected same-axis assignments. P_E = 620,869.12 N, P_E/A_brace = 955.18 MPa > 250 MPa. The divided reference 310,434.56 N is not an allowable capacity. Both baseline cases demand compression, but physical stability remains unvalidated. An F < 0 case has no compression-buckling demand; it still requires tensile/reversal evidence. A zero-force case has no brace compression demand. See C for evidence; pin bending, tear-out, net-section, edge distance, clearance, fatigue, wear, retaining hardware and other plates remain unassessed.

#### q11 — M5: Bounded engineering assessment and targeted changes

**Student wording**

Using the common-model calculations in M1–M4 (or their equivalent calculations if those tasks were not selected), tabulate the five eligible nominal utilizations for both directions and their envelopes. Identify all tied largest eligible criteria and their controlling cases using unrounded results. State which assigned criteria are met or exceeded and which physical checks remain unavailable. Exclude the changed-support cantilever comparison and formal Euler reference from this ranking.

Recommend at least two response-specific changes or evidence-gathering actions, stating what each targets and what must be recomputed. Do not claim that a single geometry change, a lower raw force or passing these nominal checks establishes overall safety.

Complete this statement: “In the specified idealized model, the assigned nominal criteria are ______. The largest eligible nominal utilization(s) are ______ in case(s) ______. The following physical checks or evidence remain unassessed: ______. The next engineering actions are ______.”

**Instructor answer**

Baseline envelopes are bending 0.4296, absolute tip movement 0.2301, brace axial 0.1796, pin shear 0.5807, main-lug bearing 0.4054. The largest eligible ratio is pin shear in the leftward case; all five assigned criteria are met. Append D2's complete qualified conclusion. Neither 1.4957 from the separate cantilever comparison nor a formal Euler utilization may decide this result.

Actions can include documenting the section axes/material/restraints for a valid compression check, specifying the actual connection and inspecting pin bending/tear-out, obtaining wall/anchor and rated-hardware evidence, or studying a larger pin if reduced nominal connection demand is the target. More I or A_brace targets different movement terms. A change to a, theta or L requires recomputing geometry, both complete load cases, moment extrema, signed movement, connection demands and the still-unvalidated stability question. Do not label a concept safe, rejected for actual failure, or approved for use from this partial assessment.

## F. Figure and audience specifications

### F1. Existing assets and misleading labels

Retain both original PNGs without deletion or editing during the future correction. They are historical/context assets, not validated model evidence:

- `assets/jib-crane-industry.png`, 1448 × 1086, SHA-256 `0bfd443520052ea701e085292e5a1801bfcbf601282248f29eb797214c069eef`.
- `assets/jib-crane-industry-2d.png`, 1448 × 1086, SHA-256 `44d38c48cfbdc9ac56b92c64fec84d1531ba1b596485601ee782c1d89c7546e0`.

Misleading labels/representations to identify explicitly:

| Existing element | Conflict and required treatment |
|---|---|
| L_b called “Diagonal Brace Length” | The retained 1.6 m input is horizontal a. Never transfer the old diagonal label into the common model. |
| H called “Wall Support Spacing” | Numerical H is force magnitude in N. New wall spacing is h in m; fonts/units must distinguish h and H_x. |
| Inboard trolley and ambiguous local x arrow | Numerical payload is at D, x = L. The old local arrow is not an A-to-load numerical coordinate. |
| h_0 hook height | Not established as e_H or payload center height. New e_H labels a prescribed-couple parameter only. |
| A at an offset bracket region | Does not define an in-plane centerline pin or the actual swing-rotation axis. New A is exactly (0,0). |
| t_p at wall/bracket projection | Does not identify the checked full-load brace lug thickness. New connection inset identifies t_plate and C explicitly. |
| M pointer without force arrows | Mass is not P. The new common diagram shows downward P and both prescribed force/couple cases symbolically. |
| Chain and hook | Do not depict an independent couple being transmitted through the chain. |
| Missing scale/idealization label | All new drawings state “Schematic — not to scale; current input table governs.” |

**Recommended default, proposed:** retain the industry image unchanged only for context, with an immediately adjacent, accessible disclaimer:

> Context illustration only. Its diagonal L_b, wall-spacing H, hook-height h_0 and trolley position are not the variables or load position of the assigned numerical model. Historical labels must not be read as numerical givens. Use the separately supplied common model for M1–M5. Image provenance and industrial dimensions are not documented.

Do not use the old 2D PNG as the active official numerical reference. Preserve it as a historical file; active outputs use the new figures. Annotating/replacing the context image could reduce confusion later, but is not the recommended first implementation and needs image/provenance approval.

### F2. Student-safe common model: future SVG master and PNG

Proposed new paths:
`assets/jib-crane-student-common-model.svg` and matching `.png`.

Show A and B on the same vertical wall line, C horizontally a from A, D horizontally L from A, brace BC at theta from horizontal, vertical h dimension, and diagonal ell_b dimension. Depict A as an in-plane pin and B as a fixed-position brace pin. Show a continuous straight boom through C without a beam hinge. Label spans AC = a and CD = L−a; the layout must support C = D boundary captioning.

Provide a separate applied-load panel for each direction at D: downward P; right H_x = +H with counterclockwise C_e = +H e_H; left H_x = −H with clockwise C_e = −H e_H. Symbolic applied loads are givens, not solved reactions. Use no chain to support the prescribed couple and no fictitious built-in support moment at A. If H or e_H is zero, the current-input caption identifies that absent applied action; do not leave a nonzero numeric arrow.

A qualitative connection inset, or selectable inset appropriate to n_s, identifies the checked C connection and one full-load lug of thickness t_plate, pin diameter d_pin and one/two shear planes. It provides topology only, not a completed connection FBD or evaluated area/stress. Clearly label a double-shear inset as the assigned symmetric idealization, not evidence from the industry image.

Show the **current effective givens** alongside the figure: L, a = Lb, theta, M, H, e_H, gamma_d, d_pin, t_plate and n_s, with units. The full 23-input table follows in the same common-model block. h and ell_b remain symbolic with their defining geometry relations; do not print their evaluated values in student output. P may be labeled symbolically gamma_d Mg, not its solved numeric value. Neither forces/reactions, completed V/M/N diagrams, solved extensions, actual tip movement, stresses, utilizations, formal Euler numbers nor decision text appear in student figure/caption/alt text.

Use symbolic geometry assets plus a parameterized caption/table rather than baking baseline numbers into a raster that becomes wrong for the exam or overrides. The schematic is not a deformed-shape plot or to-scale dimension drawing. For the a = L and zero-action cases provide a correct alternate symbolic panel or conditionally generated variant; do not let a contradictory interior sketch stand as the common geometry.

### F3. Instructor-only reference: future SVG master and PNG

Proposed new paths:
`assets/jib-crane-instructor-free-bodies.svg` and matching `.png`.

Show panels for the overall model, isolated boom, isolated brace and representative connection. Include **both complete directional cases** with clear case headings and common signs/units:

- Boom: P downward at D, H_x and C_e with their actual signs, C_x/R_C at C, A_x/A_y at A; no reaction couple at A.
- Brace: equal/opposite signed forces at B and C, aligned with BC. Baseline compression arrows point inward on the isolated brace.
- Whole crane: A and B reactions, geometric lever arm h; distinguish force on wall from force on crane.
- Connection: pin/lug load path, total |F|, selected shear plane(s), full-load lug thickness and contact projection d_pin × t_plate. If symmetric clevis shown, label each outer reaction |F|/2; no automatic two-plate bearing claim.
- Symbolic V/M/N diagram templates may be included with the instructor solutions; numeric diagrams/captions must reflect selected inputs and every actual peak location.

SVG/PNG masters may remain symbolic, but adjacent instructor tables give the current case results from the shared helper. Signed reference arrows must reverse/vanish for tension/zero cases or explicitly be marked assumed positive axes with signed values; do not pair a tension value with a claim of compression. Baseline numbers must not remain embedded as though valid for all variants.

Print “Schematic — not to scale” and the current-input key alongside the figure. Provide adequate line contrast, labels outside members, units, readable arrows and alt text identifying model/audience. No undocumented brace cross-section or governing stability axis may be invented for an attractive illustration.

### F4. Separation and release order

Student outputs contain the context once, I1 drawing region, then unsolved common geometry/assumptions before M1. Instructor outputs additionally contain completed representative answers and official FBDs after the independent task/common model. No instructor asset URL, completed-force alt text, hidden solution DOM, solution-bearing download metadata or answer tables may enter generated student HTML, QMD, DOCX or PDF.

The public instructor guide/catalog are not confidential exam storage. Output separation is an educational release rule, not access control. Any confidential assessment distribution requires a separate policy; do not claim it is provided by omitting answers from the rendered student body.

## G. Implementation and validation plan

### G1. Proposed complete output-placeholder contract

Use the explicit registry below instead of legacy ambiguous names. Proposed count: **104 derived placeholders: 85 numerical and 19 text**. These are separate from the 23 input keys and automatically supplied input-unit tokens. Every registry key must be declared in problem metadata, validated by catalog construction and returned consistently by all numerical routes. No undeclared generic mass-derived key may accidentally supply a jib answer.

Internal numeric values are unrounded doubles. Format only at substitution/display. Thousands separators are presentation, never parsed for comparisons. The shared and case tables show baseline values to six decimal places for reference; “dp” specifies normal display decimals. Units are explicit in content. Use additional precision for a nonzero value or exact-boundary comparison that normal display would hide.

#### Shared numerical keys: 23

| Placeholder | Definition | Baseline | Unit | dp |
|---|---|---:|---|---:|
| `weight_N` | Mg | 4414.500000 | N | 2 |
| `P_design_N` | gamma_d Mg | 5518.125000 | N | 3 |
| `a_m` | Lb (horizontal) | 1.600000 | m | 3 |
| `wall_spacing_m` | a tan(theta) | 1.120332 | m | 4 |
| `brace_length_m` | a/cos(theta) | 1.953239 | m | 4 |
| `vertical_load_moment_Nm` | P L | 13243.500000 | N m | 2 |
| `offset_couple_magnitude_Nm` | H e_H | 150.000000 | N m | 2 |
| `pin_area_mm2` | pi d_pin^2/4 | 314.159265 | mm2 | 2 |
| `pin_shear_area_mm2` | n_s A_pin | 314.159265 | mm2 | 2 |
| `bearing_area_mm2` | t_plate d_pin | 240.000000 | mm2 | 2 |
| `yield_criterion_MPa` | sigma_y/N_y | 125.000000 | MPa | 2 |
| `r_from_I_mm` | sqrt(I_brace/A_brace) | 42.966892 | mm | 4 |
| `implied_I_from_reported_r_mm4` | A_brace r_min^2 | 509600.000000 | mm4 | 2 |
| `formal_slenderness_I` | K_brace ell_b/r_from_I | 45.459172 | 1 | 4 |
| `formal_slenderness_reported_r` | K_brace ell_b/r_min; not same-axis assertion | 69.758548 | 1 | 4 |
| `formal_Euler_N` | pi^2 E I_brace/(K_brace ell_b)^2 | 620869.120918 | N | 2 |
| `formal_Euler_stress_MPa` | formal_Euler_N/A_brace | 955.183263 | MPa | 2 |
| `formal_Euler_divided_reference_N` | formal_Euler_N/N_b; no capacity meaning | 310434.560459 | N | 2 |
| `brace_yield_load_reference_N` | A_brace sigma_y; no column-capacity meaning | 162500.000000 | N | 2 |
| `boom_outer_fiber_mm` | I_boom/S_boom | 100.000000 | mm | 2 |
| `fixed_cantilever_comparison_moment_Nm` | P L; changed support, P-only | 13243.500000 | N m | 2 |
| `fixed_cantilever_comparison_stress_MPa` | P L_mm/S_boom | 155.805882 | MPa | 2 |
| `fixed_cantilever_comparison_deflection_mm` | P L_mm^3/(3 E I_boom) | 14.957365 | mm | 3 |

#### Case numerical keys: 28 suffixes × two prefixes = 56

Expand every suffix with `right_` and `left_`; for example, `right_brace_force_N` and `left_brace_force_N`. The definitions are B1–B4/D1, with no component taken from another case.

| Suffix | Right baseline | Left baseline | Unit | dp |
|---|---:|---:|---|---:|
| `Hx_N` | 500.000000 | -500.000000 | N | 2 |
| `Ce_Nm` | 150.000000 | -150.000000 | N m | 2 |
| `required_brace_moment_Nm` | 13093.500000 | 13393.500000 | N m | 2 |
| `brace_vertical_N` | 8183.437500 | 8370.937500 | N | 2 |
| `brace_force_N` | 14267.387887 | 14594.284161 | N | 2 |
| `brace_horizontal_N` | 11687.159954 | 11954.937705 | N | 2 |
| `wall_pin_x_N` | -12187.159954 | -11454.937705 | N | 2 |
| `wall_pin_y_N` | -2665.312500 | -2852.812500 | N | 2 |
| `boom_axial_AC_N` | 12187.159954 | 11454.937705 | N | 2 |
| `boom_axial_CD_N` | 500.000000 | -500.000000 | N | 2 |
| `boom_moment_C_Nm` | -4264.500000 | -4564.500000 | N m | 2 |
| `boom_moment_D_Nm` | 150.000000 | -150.000000 | N m | 2 |
| `boom_max_moment_Nm` | 4264.500000 | 4564.500000 | N m | 2 |
| `boom_bending_MPa` | 50.170588 | 53.700000 | MPa | 2 |
| `brace_axial_signed_MPa` | -21.949828 | -22.452745 | MPa | 2 |
| `brace_axial_magnitude_MPa` | 21.949828 | 22.452745 | MPa | 2 |
| `brace_extension_mm` | -0.214366 | -0.219278 | mm | 4 |
| `C_down_mm` | 0.373736 | 0.382299 | mm | 4 |
| `tip_bending_mm` | 1.596047 | 1.727812 | mm | 3 |
| `tip_brace_mm` | 0.560604 | 0.573449 | mm | 3 |
| `tip_down_mm` | 2.156652 | 2.301261 | mm | 3 |
| `pin_shear_MPa` | 45.414506 | 46.455049 | MPa | 2 |
| `bearing_MPa` | 59.447450 | 60.809517 | MPa | 2 |
| `boom_bending_utilization` | 0.401365 | 0.429600 | 1 | 4 |
| `tip_displacement_utilization` | 0.215665 | 0.230126 | 1 | 4 |
| `brace_axial_utilization` | 0.175599 | 0.179622 | 1 | 4 |
| `pin_shear_utilization` | 0.567681 | 0.580688 | 1 | 4 |
| `bearing_utilization` | 0.396316 | 0.405397 | 1 | 4 |

#### Envelope numerical keys: six

| Placeholder | Definition | Baseline | dp |
|---|---|---:|---:|
| `env_boom_bending_utilization` | max of the two bending ratios | 0.429600 | 4 |
| `env_tip_displacement_utilization` | max of the two absolute tip-movement ratios | 0.230126085304 | 4 |
| `env_brace_axial_utilization` | max of the two absolute brace-axial ratios | 0.179621958901 | 4 |
| `env_pin_shear_utilization` | max of the two pin ratios | 0.580688116267 | 4 |
| `env_bearing_utilization` | max of the two main-lug bearing ratios | 0.405396782242 | 4 |
| `env_governing_utilization` | maximum of the preceding five unrounded ratios | 0.580688116267 | 4 |

#### Case text keys: three suffixes × two prefixes = six

| Suffix | Rule | Both baseline cases |
|---|---|---|
| `brace_action` | Unrounded F: positive compression, negative tension, exact zero zero axial force | compression |
| `moment_locations` | B2 extrema, numerical tie rule and coincident-node handling | C |
| `tip_direction` | Unrounded v_D: downward/upward/zero vertical movement | downward |

#### Shared/envelope text keys: 13

| Placeholder | Rule / expected baseline |
|---|---|
| `env_boom_bending_cases` | Case(s) controlling the bending envelope; baseline leftward. |
| `env_tip_displacement_cases` | Case(s) controlling movement envelope; baseline leftward. |
| `env_brace_axial_cases` | Case(s) controlling absolute axial envelope; baseline leftward. |
| `env_pin_shear_cases` | Case(s) controlling pin envelope; baseline leftward. |
| `env_bearing_cases` | Case(s) controlling bearing envelope; baseline leftward. |
| `env_governing_modes` | All tied eligible modes; baseline “nominal pin shear”. |
| `env_governing_cases` | Mode-to-case list, preserving associations; baseline “nominal pin shear: leftward”. |
| `nominal_criteria_status` | “met” only if every raw eligible ratio <= 1; otherwise “exceeded”. No string when invalid. |
| `compression_stability_status` | “unvalidated” if any case has F > 0; otherwise “no compression demand in these cases; other checks unassessed”. |
| `assessment_text` | D2's full qualified conclusion, generated from actual statuses, all exceeded checks and ties. |
| `section_axis_note` | State r_I, reported r_min and unresolved axis provenance. Numeric equality changes the mismatch sentence but does not establish an actual section. |
| `formal_Euler_note` | Baseline formal stress exceeds assigned yield reference; no physical capacity. If it does not exceed it in a changed case, still state proportional range, axes and restraints unverified. |
| `model_scope_note` | Fixed, explicit first-order/omitted-compliance and unassessed-check scope from A4. |

The text functions receive raw typed results, not parsed formatted placeholder strings. Neutral input/geometry captions are student-safe; answer-bearing registry values and interpretation strings remain instructor-only. Symbolic equations supplied as method givens are separate from evaluated answer substitution.

#### Retiring the legacy registry

Remove the old 33-key jib declaration and migrate every reference; no misleading legacy alias may remain active:

| Legacy key(s) | Replacement / treatment |
|---|---|
| `P_design_N`, `pin_area_mm2`, `brace_length_m` | Retained with the explicit shared definitions above. Declare `weight_N` explicitly rather than relying on generic mass behavior. |
| `horizontal_moment_Nm` | Shared magnitude plus case-specific Ce_Nm; never substitute magnitude for signed couple. |
| `governing_support_moment_Nm`, `wall_moment_Nm` | Case required_brace_moment_Nm and shared vertical_load_moment_Nm; no pin reaction moment. |
| `brace_vertical_N`, `brace_force_N`, `brace_horizontal_N`, `wall_pin_reaction_x_N`, `wall_pin_reaction_y_N` | Explicit right_/left_ fields. |
| `braced_boom_moment_Nm`, `braced_boom_bending_MPa` | Case maximum-moment/bending fields with actual locations. |
| `boom_bending_MPa`, `tip_deflection_mm` | Explicit fixed_cantilever_comparison_* fields for the separate comparison; actual displacement is case tip_down_mm. |
| `brace_stress_MPa` | Case signed and magnitude axial fields; define tension positive. |
| `pin_shear_MPa`, `bearing_MPa`, `yield_allow_MPa` | Case pin/bearing demands and shared yield_criterion_MPa. |
| `brace_slenderness` | Two explicitly identified formal/reported-radius slendernesses. |
| `brace_buckling_N`, `brace_buckling_allow_N` | formal_Euler_N and formal_Euler_divided_reference_N; no capacity/allowable semantics. |
| `boom_yield_margin`, `brace_yield_margin` | Remove unsupported/ambiguous margins; use scoped raw nominal utilizations. |
| `boom_stress_utilization`, `deflection_utilization`, `brace_yield_utilization`, `pin_shear_utilization`, `bearing_utilization` | Case and envelope eligible fields. |
| `brace_buckling_utilization` | Remove without replacement in physical ranking. |
| `governing_utilization`, `governing_mode`, `design_recommendation` | env_governing_*, nominal_criteria_status and qualified assessment_text. |

An explicit deprecation check must reject an old unsupported placeholder in this package rather than silently substituting a generic legacy calculation.

### G2. Exact proposed source and artifact paths

All paths below are relative to the independent clone. This is a future implementation manifest proposal, **not a staging manifest or permission to include pre-existing review-document moves**. Any additional path requires an explained dependency; unrelated mechanics must be unchanged.

**Package files expected to change**

| Exact path | Required work |
|---|---|
| `problems/jib-crane-battery-pack/problem.json` | Model description/scope, split context/common-model content, image roles, status/provenance, 104-key declaration, neutral engineering goal. |
| `problems/jib-crane-battery-pack/variables.json` | A5 labels/symbols/semantics, unchanged 23 keys/values/ranges/steps. |
| `problems/jib-crane-battery-pack/questions.json` | Exact E2 copy, stable labels, parameterized answers, objectives/grading/common-mistake fixes; 12 records. |
| `problems/jib-crane-battery-pack/variants/context-rich-project.json` | Description of context/common-model progression, unchanged full selection and inputs. |
| `problems/jib-crane-battery-pack/variants/section-a.json` | Correct core description/references, unchanged six IDs and baseline inputs. |
| `problems/jib-crane-battery-pack/variants/exam-version.json` | Correct scope/references, unchanged six IDs and exam values; n_s = 2 connection assumptions. |
| `problems/jib-crane-battery-pack/_student-problem.qmd` | Context-only include; remove duplicate static questions and prematurely supplied completed model/decision tasks. |
| `problems/jib-crane-battery-pack/student-packet.qmd` | Shared geometry-first numerical block after I1, one question source, native I1 drawing region. |
| `problems/jib-crane-battery-pack/index.qmd` | Complete consistent given-data/assignment guidance and corrected model status; no contradictory static solution. |
| `problems/jib-crane-battery-pack/instructor-guide.qmd` | Replace stale baseline section with shared/generated valid answers; retain useful scope-correct background, remove duplicate historical active figure. |
| `problems/jib-crane-battery-pack/calculations.qmd` | Replace unfinished None-value notebook with documented shared-model calculations or a clearly linked nonduplicating calculation page; do not maintain an independent divergent Python solution. |

**New package assets**

- `problems/jib-crane-battery-pack/assets/jib-crane-student-common-model.svg`.
- `problems/jib-crane-battery-pack/assets/jib-crane-student-common-model.png`.
- `problems/jib-crane-battery-pack/assets/jib-crane-instructor-free-bodies.svg`.
- `problems/jib-crane-battery-pack/assets/jib-crane-instructor-free-bodies.png`.

**Shared support, strictly dispatched by MOS-JIB-001**

| Exact path | Proposed change |
|---|---|
| `scripts/jib-crane-model.js` (new) | Shared pure browser/Node model, all input validation, signed cases, raw registry, eligible ranking and typed status. Follow existing press/platform module exposure conventions. |
| `scripts/jib-crane-packet.js` (new) | One shared package-specific layout/content helper: context/I1/common model/M sequence, audience gates, captions and invalid state. |
| `scripts/packet-renderer.js` | Dispatch by exact problem ID to new helper; do not calculate jib answers with generic mass branches. Preserve all other problem behavior. |
| `instructor-builder.qmd` | Load helper, same validation/formatting/layout, disable stale exports and print on invalid state; exact-ID scope. |
| `scripts/render-assignment.mjs` | Import helper for HTML and QMD; validate before any export write and carry correct native layout. |
| `scripts/build-catalog.mjs` | Validate complete registry, default and variant effective inputs, model and warning/provenance metadata without declaring physical stability validated. |
| `_quarto.yml` | Include new module/resources and asset delivery as required; no unrelated render/deployment configuration change. |
| `docs/authoring-guide.qmd` | Document jib-specific Lb semantics, formal Euler exclusion, audience/layout and validation conventions. |

Leave `scripts/press-fixture-model.js`, `scripts/platform-model.js` and `scripts/platform-packet.js` unchanged. Remove/bypass the legacy jib calculation path for this ID only; do not delete generic calculation behavior needed by other packages.

**Generated catalogs, only after source/model validation**

- `data/problem-catalog.json` and `data/problem-catalog.js`.
- `data/problem-health.json` and `data/problem-health.js`.

Catalog changes must be source-derived. All 51 IDs remain; non-jib package records preserve their mechanics/content. Status “Faculty review” is the recommended proposal, replacing the unsupported implication of the index's current “Published” status. Health must distinguish valid instructional inputs from unvalidated physical capacity and provenance. Catalog build success is not engineering certification.

**Proposed tests and verification documentation**

- New `tests/jib-crane.test.mjs`: independent numerical constants/oracle, schema/registry, validation, decisions, routes and separation.
- New `tests/jib-crane-browser.mjs`: actual Builder/direct invalid/edit/recovery and export controls.
- New `tests/jib-crane-artifacts.py`: exported native structure, question order, figures, units/equations and audience checks.
- `tests/helpers/packet-harness.mjs`: load new modules for all route tests without changing other packages' evaluation semantics.
- `tests/fixtures/platform-unrelated-render-hashes.json` and `tests/fixtures/hydraulic-unrelated-render-hashes.json`: update only the intentionally changed eight jib selection/audience entries per fixture, after independent assertions pass. Preserve every unrelated entry and all hydraulic/platform engineering assertions.
- Future `docs/reviews/jib-crane/jib-crane-implementation-verification.md`: exact actual source manifest, test/artifact results and preservation evidence. Do not create it during this specification task.

Keep `_scenario-and-q1.qmd` and `instructor-notes.qmd` as inactive historical drafts unless an active dependency is found. Do not newly include their stale content. Keep original image bytes, previous review documents and relocation changes untouched. Do not commit ignored QA exports or generated website trees as source.

### G3. Independent numerical oracle and reference cases

The proposed numerical tests must contain their own checked constants and independent solution logic in the approved test source/committed fixtures. They must **not read this specification, the audit, or any untracked review document** at runtime. A fresh HEAD archive plus approved implementation files must pass without local review files.

Use two independent checks:

1. Signed boom/whole-system equilibrium, direct stress/area calculations, end/attachment moment extrema and unit-work integration.
2. Independently assemble Euler–Bernoulli elements A–C and C–D with v_A = 0 only and a vertical spring k_C = E A_brace sin²(theta)/ell_b at C. Use downward v and clockwise slope, applying [P, −C_e] at D. Solve the reduced matrix; do not call the production closed form to generate the oracle. For a = L use one A–D element and the spring at D.

Each element of length b has stiffness
\[
(EI/b^3)
\begin{bmatrix}
12&6b&-12&6b\\
6b&4b^2&-6b&2b^2\\
-12&-6b&12&-6b\\
6b&2b^2&-6b&4b^2
\end{bmatrix}.
\]
Check k_C v_C = R_C and F = R_C/sin(theta), as well as tip motion. This is a second solution of the same assigned linear model, not experimental/industrial validation or a buckling solver.

For specification preparation, **30 signed-case stiffness/closed-form comparisons** (the 15 input sets below, both directions) were executed read-only in memory. Maximum tip discrepancy was approximately 5.66e−14 mm and maximum brace-force discrepancy 1.43e−9 N. These are independent mathematical checks of the proposed model; implementation and native artifact tests have not yet been run.

Use force tolerance 1e−6 N and displacement tolerance 1e−9 mm for these reference comparisons, with suitable relative tolerance for other magnitudes. Do not use those test tolerances to relax criterion boundaries.

| Case | Overrides from baseline | F right / left, N | v_D right / left, mm | Principal assertion |
|---|---|---|---|---|
| R01 | None | 14267.387887 / 14594.284161 | 2.156651504 / 2.301260853 | Correct complete reactions and five-criterion baseline. |
| R02 | H = 0 | 14430.836024 / 14430.836024 | 2.228956179 / 2.228956179 | Identical cases and tied directions. |
| R03 | Existing exam values in A5 | 14744.640144 / 14987.492583 | 3.254382242 / 3.421760282 | Exam, double shear, changed geometry; axes/stability still unvalidated. |
| R04 | n_s = 2 | 14267.387887 / 14594.284161 | 2.156651504 / 2.301260853 | Pin demand halves; main-lug bearing, forces and movement unchanged. |
| R05 | theta = 75 deg | 8472.117918 / 8666.232201 | 2.221680382 / 2.367779681 | Brace force falls but diagonal length and movement do not follow a universal improvement. |
| R06 | Lb = 2.3 m | 9925.139399 / 10152.545503 | 0.408747466 / 0.432094634 | Changed moment/length/movement; do not universally improve formal stability. |
| R07 | L = 2.1 m | 12463.533384 / 12790.429658 | 0.961993793 / 1.042350503 | Actual braced motion replaces the irrelevant old 10.0203 mm cantilever false-pass case. |
| R08 | Lb = 2.4 m | 9511.591924 / 9729.522774 | 0.373736297 / 0.382299392 | a = L; merged C/D, zero tip bending contribution but nonzero couple-induced bending. |
| R09 | L = 0.5, Lb = 0.3, M = 100, gamma_d = 1, H = 3000, e_H = 1.5 | -23301.166423 / 29002.237445 | -0.292778243 / 0.347141231 | Rightward tension/upward motion; leftward compression; no absolute-value equilibrium. |
| R10 | M = 100, gamma_d = 1, H = 0, A_brace = 150, theta = 15, I_boom = 15000000, S_boom = 150000 | 5685.439414 / 5685.439414 | 1.986764612 / 1.986764612 | Braced 1.986765 > fixed-cantilever 1.506816 mm: no universal conservatism. |
| R11 | L = 0.5, Lb = 0.3, M = 100, gamma_d = 1, H = 981, e_H = 0.5 | 0.000000 / 5701.071022 | -0.007694118 / 0.062057105 | Rightward zero brace force yet nonzero upward tip motion; no division by zero. |
| R12 | L = 0.5, Lb = 0.3, M = 100, gamma_d = 1, H = 1000, e_H = 0.4 | 525.939783 / 5175.131238 | -0.001259372 / 0.055622359 | Rightward tip moment governs, with upward movement despite compression. |
| R13 | L = 0.5, Lb = 0.3, M = 100, gamma_d = 1, H = 981, e_H = 0.1 | 2280.428409 / 3420.642613 | 0.020206371 / 0.034156616 | Rightward C/D bending-magnitude tie, not a unique attachment maximum. |
| R14 | e_H = 0; H remains 500 N | 14430.836024 / 14430.836024 | 2.228956179 / 2.228956179 | Equal vertical/bending responses but different horizontal/axial case results. |
| R15 | L = 2.1, delta_allow = 1.0423494602631482 mm | 12463.533384 / 12790.429658 | 0.961993793 / 1.042350503 | Left movement utilization 1.000001 fails although normal four-decimal display is 1.0000. |

### G4. Additional required validation, decision and regression tests

**Input and geometry**

- Test every input's valid endpoints, omitted override inheritance, explicit zero where permitted, range violations, negative/zero positive-only fields and both n_s choices. Reject n_s = 1.5, 0 or 3.
- Repeat the audit's E = 0, M = 0, theta = 0, A_brace = 0, L = 1.2 with a = 1.6, H = "bad", M = null and blank H cases. All must block numerical answers and all export routes rather than silently coerce, inherit, omit checks or report acceptance.
- Test NaN/infinity, whitespace, booleans, arrays/objects, partial strings such as "500 N", unknown aliases and numeric overflow. Test valid full numeric strings and off-increment finite decimal values. UI step mismatch alone must not override the model's stated validation policy.
- Test a < L, a = L, a > L; angle closure and mm/metre conversion. Confirm no additional independent h/ell override can break closure.
- Test default, variant, UI and CLI effective-input precedence identically; explicit invalid values must not fall back to defaults.
- Invalid-to-valid recovery must replace all cached values and re-enable controls only after complete recomputation.

**Section/stability**

- With r_min = sqrt(1200000/650), both slenderness numbers become equal, but the formal Euler value and unvalidated resistance status remain unchanged.
- With I_brace = 509600 mm⁴, r_I = 28 mm and formal load = 263662.420017 N, stress = 405.634492 MPa; no physical pass or substituted capacity.
- K = 0.5 quadruples formal Euler load only; it must not change equilibrium, displacement, eligible ranking or claimed restraints. N_b changes only the formal divided reference and its label. Test a changed formal stress below assigned yield still does not become validated capacity.
- Compression, tension and zero-force case texts remain distinct. At least one compression case keeps the envelope compression-resistance status unvalidated.
- Check neither r mismatch nor Euler > yield is described as proof that the applied load actually causes failure.

**Exact boundaries, ties and interpretation**

- For L = 2.1, set delta_allow exactly to the independent value 1.0423505026126083 mm: left movement criterion is at unity. Values slightly above/below that limit must produce the correct met/exceeded state without rounding. Test the R15 near-boundary value with several presentation precisions.
- Set bearing_allow = 104.71975511965978 MPa at baseline: pin and bearing utilizations tie within the numerical rule. Report both, with associated leftward case. Do not drop a tied mode because array order picks one.
- Test H = 0 case ties, e_H = 0 partial response ties, R13 moment-location tie and a = L single physical peak labeling.
- Test a = L, H = 0 for zero bending throughout. Test L = Lb = 0.5 m, M = 100 kg, gamma_d = 1, H = 981 N, e_H = 0.5 m for rightward F = 0 and v_D = 0. No fictitious compression, downward label, unique zero-bending location, infinite ratio or negative-zero text.
- Verify zero demand gives zero utilization; stresses/criteria stay nonnegative even for F < 0. Do not use a numerical tie tolerance to turn an exceeded criterion into a pass.
- Check exact baseline raw ratios, all 104 registry keys/types, both complete case reactions and absence of all retired unsupported keys.
- Change A_brace and I_boom independently to isolate the brace and bending movement components. Verify the sum uses signed terms before absolute demand is taken.
- Check recommendations identify targeted responses and retained missing evidence for every variant. No “safe”, complete design acceptance, validated Euler capacity or universally conservative cantilever claim may return through old guide text or generic renderer fallbacks.

**Route and repository regression**

- Direct packet, Builder, CLI HTML and CLI QMD must agree on all raw results, display values, statuses, task selection/order, captions and invalid-state handling.
- Run `node --test tests/jib-crane.test.mjs` with an available Node runtime; record actual assertions and independent comparisons rather than asserting a future count now.
- Run the existing `node --test tests/hydraulic-press.test.mjs` and `node --test tests/suspended-equipment-platform.test.mjs` without weakening their engineering assertions. Their prior 81/86-test baselines are historical expectations; record actual observed counts at implementation time.
- Preserve the hydraulic circular nominal shear/contact model, its 19 questions, baseline 1,570.80 mm² / 25.46 MPa / 20.37 MPa and audience separation. Preserve platform 21 questions, 61 placeholders, approved geometry, weighted contributions, sign/tie handling and warning/export policy.
- Run the catalog builder and verify exactly 51 unique IDs/packages; compare every non-jib catalog record and normalized rendered output against its prior state. Update only intended jib fixture entries after independent checks pass; do not regenerate all unrelated baselines to conceal changes.
- Run whitespace checks and inspect the complete diff for unintended package changes, deletions, historical-image changes and staged review relocations. Implementation verification must distinguish pre-existing changes from its exact source manifest.
- Verify in an isolated committed-file-only environment: no tests depend on local reviews, ignored website output, QA artifacts or unstaged/untracked dependencies. Do not modify the original checkout or existing worktrees.

### G5. Required actual rendering/export checks

At implementation time render all saved/default selections for both audiences, and a representative changed-input set, through each available route. Inspect the **whole page/export**, not only the generated numerical target, so duplicated static questions cannot evade counts. Expected logical counts are 12 full/default/project and 6 core/exam.

Student outputs must contain one context illustration, one independent I1 drawing region, the unsolved common model after I1, all necessary current givens, method availability and no answer-bearing material. Instructor outputs additionally contain current-input FBDs/answers once, with all case signs and limitations. Verify body, image sources, captions, alt text, hidden content and export payload, not only visible question text.

Inspect HTML with an actual browser for input edits, errors, stale-answer clearing, recovery, keyboard/accessibility and download/print disabling. Inspect CLI QMD for native equations, image paths, correct text/list order, stable references and no HTML-only drawing-area fallback. Use supported native blocks to retain I1's blank drawing space in DOCX/PDF, without supplying a completed drawing.

Generate and visually inspect student/instructor PDFs for baseline and exam: equations, force/couple signs, N versus N·m, mm versus m, negative reactions, not-to-scale label, readable figures, page breaks, I1 space and question/answer separation. Inspect DOCX XML/media structure and visual pagination with an available Word/LibreOffice renderer. If the renderer is unavailable, state “DOCX visual pagination unverified”; do not infer a visual pass from structure or successful file creation. Record unavailable browser, Quarto, PDF, DOCX or Graphify tools explicitly.

Only future implementation authorization permits QA exports; keep them ignored/outside the source commit and list them separately. Catalog synchronization follows source changes, not manual editing of generated question strings. No generated website files, publication or deployment are part of the correction.

## H. Remaining approval decisions and evidence gaps

These are proposed resolutions, not claims of approved physical construction. Items already resolved by the user's Option A direction are not reopened: A is a pin, a = 1.6 m horizontally, load is full-reach battery-only, both prescribed directional pairs are evaluated, and boom axial/shear/joint/wall/geometric-nonlinear compliance is omitted in the bounded displacement model.

| Decision / missing evidence | Recommended default — proposal | Approval/evidence consequence |
|---|---|---|
| Input naming compatibility | Keep Lb as legacy key; display only a, horizontal A–C distance. Keep all other 22 keys and assigned baseline/exam values. | Approve the compatibility convention; renaming the actual key would require explicit saved-assignment migration. |
| a = L admissibility | Include it as a valid endpoint-brace limit, merging C/D and using one-element oracle/appropriate diagram. | Approve boundary inclusion; rejecting it would be an exercise restriction, not invalid physical geometry. |
| Brace force reversal | Use a bilateral pin-ended axial bar for the first-order exercise; report tension honestly. | Actual construction/reversal capability unproved. A compression-only brace/cable requires an approved different admissibility model. |
| Coupled lateral-case definition | Existing H >= 0 magnitude creates H_x = ±H and C_e = H_x e_H; force and couple reverse together. | Independent couple-direction cases are not part of this default and would need new load-case scope. |
| Formal brace section axis | Retain I_brace for axis f with r_f = sqrt(I/A); label reported r_min separately as unverified. | Need actual section dimensions, principal axes and restraints to resolve whether these are different axes or inconsistent same-axis data. No governing axis asserted. |
| Same-axis properties versus retaining assignments | Do not silently change 28 mm, 1,200,000 mm⁴ or 650 mm². | A single validated same-axis physical buckling check is incompatible with treating all three as the same-axis baseline assignments. One meaning/value needs evidence and approval if that check is later required. |
| Physical compression resistance | Leave unvalidated and excluded from utilization; retain explicitly formal Euler arithmetic/critique. | Faculty must supply an approved stability method and section/material/end-restraint evidence before capacity is ranked. |
| K and N_b compatibility | Keep formal-only adjustable parameters; K = 1 baseline matches ideal pins; other K is hypothetical sensitivity and N_b merely divides a formal reference. | Interpretations of K != 1 as actual pinned-brace capacity, or P_E/N_b as allowable resistance, conflict with approved pin topology/formal-only direction. Decide whether to lock/retire these UI fields instead. |
| Boom nominal strength scope | Compare M/S only and show equilibrium N; mark combined yielding and boom stability unassessed. | Missing A_boom and full section prevent N/A ± M/S. Neglecting axial compliance does not establish axial stress negligible. A combined-stress task would need new evidence and approval. |
| Representative connection detail | Check C's full-load main lug; use single shear or symmetric double shear according to n_s, with outer-cheek checks unassessed. | Approve this hypothetical topology. Existing images do not establish the actual pin, lug thickness, number of plates or equal sharing. |
| Values and criteria provenance | Retain all assigned values as instructional; sigma_y/N_y, 80 MPa, 150 MPa and 10 mm are scoped assigned comparison criteria. | Need payload/duty/load justification, actual section/material certificates, pin/lug criteria, displacement requirement and dynamic basis for industrial claims. No lifting code or manufacturer criterion has been supplied. |
| Material elastic range / validity thresholds | Explicitly unassessed beyond the model assumptions; no invented strain, rotation, proportional-limit or serviceability threshold. | Actual material behavior and quantitative model-validity bounds require engineering evidence. Any future warning/export policy needs separate approval; do not infer failure from a warning. |
| Incomplete assessment output | Permit a qualified instructional packet with unvalidated compression stability and listed omissions; never safe/production-approved. Invalid inputs still block answers/export. | Approve the distinction between mathematical packet validity and physical design approval. Demanding a complete physical pass would be impossible with the supplied evidence. |
| Task labels and default selection | Keep 12 records; stable Q1–Q6/I1/M1–M5 labels; default/project all 12, core/exam six. | Approve visible labels and full-default guidance; do not silently reduce conceptual progression. |
| Displacement method availability | Supply symbolic unit-work/closed-form method in the common brief; instructor solution includes derivation. | Faculty can require derivation if taught; otherwise asking for an unseen advanced method is an educational gap. No changed numerical model needed. |
| Student release of common geometry | After I1 only; preserve drawing region and no completed FBD. | Approve geometry/method release; the old annotated context already contains suggestive geometry, so independence is limited to students' reasoned modeling, not a completely unprompted field observation. |
| Numerical ties and boundary decisions | D1 relative tie rule; raw inclusive criteria, no acceptance tolerance. | Approve purely numerical labeling rule. It does not create an engineering reserve or relax the assigned criteria. |
| Context/historical images and provenance | Preserve both originals; industry image only with explicit conflict disclaimer; new active unsolved/FBD masters. | Creator/source/permission/authenticity evidence remains missing. If the disclaimer is judged insufficient, replacement/annotation needs approval before implementation. |
| Metadata/publication status | “Faculty review”; explicitly limited educational assessment, no certification. | Approve consistent status across metadata/index/catalog; do not publish as part of implementation. |
| Confidentiality | Guarantee student-output separation only. | Public catalogs/guides are discoverable. Confidential assessment release would require a different distribution policy. |

### Contradictions that must not be concealed during implementation

1. A physical same-axis buckling calculation cannot simultaneously use 28 mm and I/A giving 42.97 mm as that same radius. The proposed formal-axis/unverified-reported-radius treatment preserves assignments while exposing the unresolved evidence.
2. A formal critical stress of 955.18 MPa is not a reachable verified elastic critical state for the assigned 250 MPa yielding material. Neither an arbitrary divisor nor a new guessed column equation resolves that evidence gap.
3. A root-fixed cantilever is a different restraint model from the approved root pin plus brace. Its 14.957 mm baseline result cannot be used to fail the braced movement criterion or asserted universally conservative.
4. Boom axial rigidity for displacement is an approved approximation, not a supplied axial area or proof that combined stress is safe.
5. Retaining the old industry image without a clear disclaimer would conflict with horizontal a, numerical H and the full-reach load case. Retaining the file is compatible; treating its labels as the active quantitative model is not.
6. Met nominal criteria and unvalidated physical compression resistance can coexist. A full safe-design conclusion would contradict the approved formal-only stability scope.

The proposed defaults resolve these for a transparent instructional correction without changing Option A. Any requirement to turn the formal exercise into actual crane approval would require a separate engineering-data and modeling decision before implementation.

## Preparation checks and preservation

The specification was prepared against the stated clone/branch/HEAD with an empty index and all 51 packages. The starting working tree contained the ten pre-existing review-document relocation entries plus the existing untracked jib detailed audit. A SHA-256 inventory of 1,014 pre-existing tracked/untracked non-ignored paths, including absent tracked originals, provides the preservation comparison.

Only this specification is authorized to be added. The accepted audit, all original assets, packages, code, tests, catalogs, previous press/platform corrections and all pre-existing review-document changes are to remain byte-for-byte as found. No staging, commit, reset, clean, branch/configuration change or remote operation is part of this task.

The 30 independent comparisons above verify the proposed linear algebra only. No corrected implementation, rendered export, actual crane, material capacity or industrial provenance has been verified by this specification. Graphify's CLI was unavailable; a read-only vocabulary/subgraph traversal and direct source/audit inspection were used. No graph outputs were refreshed or written.

## Local source references

- [Accepted detailed audit](jib-crane-detailed-review.md): J01–J16, complete legacy baseline, questions, asset inspection and counterexamples.
- [Metadata](../../../problems/jib-crane-battery-pack/problem.json), [variables](../../../problems/jib-crane-battery-pack/variables.json), [12 question/answer records](../../../problems/jib-crane-battery-pack/questions.json).
- [Project variant](../../../problems/jib-crane-battery-pack/variants/context-rich-project.json), [core variant](../../../problems/jib-crane-battery-pack/variants/section-a.json), [exam variant](../../../problems/jib-crane-battery-pack/variants/exam-version.json).
- [Direct student page](../../../problems/jib-crane-battery-pack/student-packet.qmd), [static include](../../../problems/jib-crane-battery-pack/_student-problem.qmd), [instructor guide](../../../problems/jib-crane-battery-pack/instructor-guide.qmd), [index](../../../problems/jib-crane-battery-pack/index.qmd), [unfinished calculations](../../../problems/jib-crane-battery-pack/calculations.qmd).
- [Direct renderer](../../../scripts/packet-renderer.js), [Builder](../../../instructor-builder.qmd), [CLI](../../../scripts/render-assignment.mjs), [catalog builder](../../../scripts/build-catalog.mjs), [resources](../../../_quarto.yml).
- [Industry context asset](../../../problems/jib-crane-battery-pack/assets/jib-crane-industry.png), [historical 2D asset](../../../problems/jib-crane-battery-pack/assets/jib-crane-industry-2d.png).
