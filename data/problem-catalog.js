window.PROBLEM_CATALOG = [
  {
    "id": "MOS-AXIAL-009",
    "slug": "axial-rod-tube-assembly",
    "title": "Axial Displacement of a Steel Tie Rod and Aluminum Spacer Tube Assembly",
    "studentDocumentTitle": "Student Homework Questions",
    "instructorDocumentTitle": "Instructor Answers",
    "summary": "A context-rich mechanics problem on axial force, deformation of dissimilar materials, compatibility, and total end displacement.",
    "textbookChapters": [
      "Axial loading",
      "Axial deformation",
      "Statically determinate members",
      "Displacement compatibility"
    ],
    "derivedPlaceholders": [
      "axial_load_N",
      "axial_area_BC_mm2",
      "axial_force_BC_kN",
      "axial_force_AB_kN",
      "axial_E_al_MPa",
      "axial_E_st_MPa",
      "axial_rod_elongation_mm",
      "axial_tube_shortening_mm",
      "axial_total_displacement_mm"
    ],
    "image": "problems/axial-rod-tube-assembly/assets/axial-industry-context.png",
    "idealizedImage": "problems/axial-rod-tube-assembly/assets/axial-instructor-idealization.png",
    "idealizedImageAlt": "Instructor reference idealization of a steel tie rod passing through an aluminum spacer tube, with a rigid collar, fixed support, dimensions, and applied tensile load.",
    "source": "problems/axial-rod-tube-assembly/index.html",
    "problemStatement": "<p>A mechanical engineering team is evaluating a compact tie-rod assembly used in a machine-frame or actuator support system. A steel rod passes through an aluminum spacer tube. A rigid collar attached to the rod bears against the left end of the tube, and the right end of the tube reacts against a fixed support plate.</p><p>When a tensile load is applied to the exposed end of the steel rod, the rod elongates while the aluminum tube shortens. Because the free rod end positions or preloads a connected component, the team must determine its net displacement relative to the fixed support.</p>",
    "engineeringGoal": "<p>Determine the displacement of the free end C of the steel rod relative to the fixed support at A by accounting for both the elongation of the steel rod and the shortening of the aluminum tube.</p>",
    "variables": [
      {
        "key": "P",
        "symbol": "P",
        "label": "Applied tensile load",
        "value": 80,
        "unit": "kN",
        "min": 1,
        "max": 500,
        "step": 1
      },
      {
        "key": "L_AB",
        "symbol": "L_AB",
        "label": "Length of aluminum tube AB",
        "value": 400,
        "unit": "mm",
        "min": 50,
        "max": 3000,
        "step": 10
      },
      {
        "key": "L_BC",
        "symbol": "L_BC",
        "label": "Length of steel rod segment BC",
        "value": 600,
        "unit": "mm",
        "min": 50,
        "max": 5000,
        "step": 10
      },
      {
        "key": "A_AB",
        "symbol": "A_AB",
        "label": "Cross-sectional area of aluminum tube",
        "value": 400,
        "unit": "mm^2",
        "min": 10,
        "max": 10000,
        "step": 10
      },
      {
        "key": "d_BC",
        "symbol": "d_BC",
        "label": "Diameter of steel rod BC",
        "value": 10,
        "unit": "mm",
        "min": 1,
        "max": 100,
        "step": 0.5
      },
      {
        "key": "E_al",
        "symbol": "E_al",
        "label": "Elastic modulus of aluminum tube",
        "value": 70,
        "unit": "GPa",
        "min": 1,
        "max": 250,
        "step": 1
      },
      {
        "key": "E_st",
        "symbol": "E_st",
        "label": "Elastic modulus of steel rod",
        "value": 200,
        "unit": "GPa",
        "min": 1,
        "max": 300,
        "step": 1
      }
    ],
    "questions": [
      {
        "id": "q1",
        "title": "System Function",
        "type": "context interpretation",
        "difficulty": "introductory",
        "tags": [
          "function",
          "assembly",
          "axial loading"
        ],
        "learningObjectives": [
          "Identify the structural roles of the rod and spacer tube."
        ],
        "selected": true,
        "student": "<p>Identify the primary structural function of the steel rod and aluminum tube assembly.</p>",
        "instructor": "<p>The steel rod carries the applied tensile load, while the aluminum tube acts as a compression spacer between the rigid collar and the fixed support. Together, they transfer load into the support and control the displacement of the free rod end.</p>",
        "gradingNotes": "<p>Students should recognize that this is a multi-member assembly and that both member deformations affect point C.</p>",
        "section": "context"
      },
      {
        "id": "q2",
        "title": "External Load and Supports",
        "type": "load and support identification",
        "difficulty": "introductory",
        "tags": [
          "external load",
          "support",
          "collar"
        ],
        "learningObjectives": [
          "Locate the applied load, restraint, and load-transfer interface."
        ],
        "selected": true,
        "student": "<p>Where is the external load applied, and where is the assembly supported or restrained?</p>",
        "instructor": "<p>The tensile load <em>P</em> is applied at the free rod end C. The assembly is supported at A by a rigid plate or wall. The rigid collar at B transfers load from the steel rod into the aluminum tube.</p>",
        "section": "context"
      },
      {
        "id": "q3",
        "title": "Load Path",
        "type": "load path",
        "difficulty": "introductory",
        "tags": [
          "load path",
          "tension",
          "compression"
        ],
        "learningObjectives": [
          "Trace the axial load through the rod, collar, tube, and support."
        ],
        "selected": true,
        "student": "<p>Trace the load path from the applied load to the fixed support.</p>",
        "instructor": "<p>The load acts on the steel rod at C. The rod carries it toward the rigid collar at B. The collar bears against the aluminum tube and places the tube in compression. The tube transfers the load to the fixed support at A.</p>",
        "commonMistakes": "<p>Do not treat the tube as unloaded merely because the applied force is placed on the rod.</p>",
        "section": "context"
      },
      {
        "id": "q4",
        "title": "Critical Mechanical Response",
        "type": "mechanics reasoning",
        "difficulty": "introductory",
        "tags": [
          "displacement",
          "deformation",
          "compatibility"
        ],
        "learningObjectives": [
          "Identify displacement as the governing response for the supplied data."
        ],
        "selected": true,
        "student": "<p>What is the critical mechanical response to be evaluated in this problem?</p>",
        "instructor": "<p>The critical response is the axial displacement of point C relative to the fixed support at A. It depends on the elongation of the steel rod and the shortening of the aluminum tube.</p>",
        "gradingNotes": "<p>The base problem is deformation-focused because no material strength allowables are supplied.</p>",
        "section": "context"
      },
      {
        "id": "q5",
        "title": "Relevant Geometry and Material Properties",
        "type": "parameter identification",
        "difficulty": "introductory",
        "tags": [
          "geometry",
          "elastic modulus",
          "area"
        ],
        "learningObjectives": [
          "Connect the controlling inputs to the axial-deformation equation."
        ],
        "selected": true,
        "student": "<p>Identify the geometric, material, and loading parameters that control the displacement response.</p>",
        "instructor": "<p>The controlling inputs are <em>P</em>, <em>L</em><sub>AB</sub>, <em>L</em><sub>BC</sub>, <em>A</em><sub>AB</sub>, <em>d</em><sub>BC</sub> or <em>A</em><sub>BC</sub>, <em>E</em><sub>al</sub>, and <em>E</em><sub>st</sub>. These enter the relation &delta; = <em>NL</em>/(<em>AE</em>).</p>",
        "section": "context"
      },
      {
        "id": "q6",
        "title": "Student-Generated Structural Idealization",
        "type": "free-body diagram",
        "difficulty": "introductory",
        "tags": [
          "idealization",
          "FBD",
          "axial members"
        ],
        "learningObjectives": [
          "Convert the physical assembly into a one-dimensional axial model."
        ],
        "selected": true,
        "student": "<p>Before using the reference figure, develop a simplified axial model of the assembly. Clearly identify the aluminum tube, steel rod, rigid collar, fixed support, and applied load.</p>",
        "instructor": "<p>A correct model represents two coaxial axial members: aluminum tube AB in compression and steel rod BC in tension, connected through a rigid collar at B, with a fixed support at A and load <em>P</em> at C.</p>",
        "gradingNotes": "<p>A clear one-dimensional model is sufficient; students do not need to reproduce the industrial geometry.</p>",
        "section": "transition"
      },
      {
        "id": "q7",
        "title": "Modeling Assumptions",
        "type": "assumptions",
        "difficulty": "introductory",
        "tags": [
          "linear elasticity",
          "small deformation",
          "coaxial loading"
        ],
        "learningObjectives": [
          "State assumptions supporting the axial deformation model."
        ],
        "selected": true,
        "student": "<p>State the assumptions used to convert the real assembly into the simplified mechanics model.</p>",
        "instructor": "<p>Typical assumptions are axial loading, a rigid collar, a fixed support at A, linear-elastic materials, small deformations, coaxial rod and tube, uniform member properties, and neglected local effects at threads, contacts, and the support opening.</p>",
        "section": "transition"
      },
      {
        "id": "q8",
        "title": "Mechanics Analysis Plan",
        "type": "analysis planning",
        "difficulty": "introductory",
        "tags": [
          "internal force",
          "deformation",
          "compatibility"
        ],
        "learningObjectives": [
          "Plan the equilibrium and compatibility steps before calculation."
        ],
        "selected": true,
        "student": "<p>Explain how the displacement of C will be determined from the simplified model.</p>",
        "instructor": "<p>Determine the internal axial force in each member; compute rod elongation &delta;<sub>C/B</sub>; compute tube shortening and interpret it as the displacement of B relative to A; then use &delta;<sub>C/A</sub> = &delta;<sub>B/A</sub> + &delta;<sub>C/B</sub>.</p>",
        "section": "transition"
      },
      {
        "id": "q9",
        "title": "Boundary Conditions and Member Action",
        "type": "mechanics setup",
        "difficulty": "introductory",
        "tags": [
          "boundary conditions",
          "tension",
          "compression"
        ],
        "learningObjectives": [
          "Interpret member action from the instructor reference idealization."
        ],
        "selected": true,
        "student": "<p>Using the instructor reference idealization, identify the boundary conditions and state which member is in tension and which member is in compression.</p>",
        "instructor": "<p>The support at A is fixed and load <em>P</em> is applied at C. Steel rod BC is in axial tension. Aluminum tube AB is in axial compression because collar B pushes against the tube as the rod is pulled.</p>",
        "commonMistakes": "<p>Assign tension or compression from the physical load path, not only from the visual direction of the applied arrow.</p>",
        "section": "analysis"
      },
      {
        "id": "q10",
        "title": "Internal Axial Forces",
        "type": "equilibrium",
        "difficulty": "introductory",
        "tags": [
          "internal force",
          "equilibrium",
          "sign convention"
        ],
        "learningObjectives": [
          "Determine member axial forces and classify their signs."
        ],
        "selected": true,
        "student": "<p>For <strong><em>P</em> = {{P}} {{P_unit}}</strong>, determine the internal axial force in steel rod BC and aluminum tube AB. Use tension as positive.</p>",
        "instructor": "<p>Equilibrium and the load path give <strong><em>N</em><sub>BC</sub> = +{{axial_force_BC_kN}} kN</strong> in tension and <strong><em>N</em><sub>AB</sub> = {{axial_force_AB_kN}} kN</strong> in compression.</p>",
        "gradingNotes": "<p>Equivalent sign conventions are acceptable when the physical tension/compression classifications and magnitudes are correct.</p>",
        "section": "analysis"
      },
      {
        "id": "q11",
        "title": "Steel Rod Elongation",
        "type": "axial deformation calculation",
        "difficulty": "intermediate",
        "tags": [
          "steel rod",
          "elongation",
          "NL/AE"
        ],
        "learningObjectives": [
          "Calculate rod area and axial elongation with consistent units."
        ],
        "selected": true,
        "student": "<p>Calculate the elongation of steel rod segment BC. First determine its area from <strong><em>d</em><sub>BC</sub> = {{d_BC}} {{d_BC_unit}}</strong>.</p>",
        "instructor": "<p><em>A</em><sub>BC</sub> = &pi;({{d_BC}} mm)<sup>2</sup>/4 = <strong>{{axial_area_BC_mm2}} mm<sup>2</sup></strong>. With <em>E</em><sub>st</sub> = {{E_st}} GPa = {{axial_E_st_MPa}} N/mm<sup>2</sup>,</p><p>&delta;<sub>C/B</sub> = <em>N</em><sub>BC</sub><em>L</em><sub>BC</sub>/(<em>A</em><sub>BC</sub><em>E</em><sub>st</sub>) = <strong>{{axial_rod_elongation_mm}} mm to the right</strong>.</p>",
        "commonMistakes": "<p>Convert kN to N and GPa to N/mm<sup>2</sup> when lengths and areas are in millimeters.</p>",
        "section": "analysis"
      },
      {
        "id": "q12",
        "title": "Aluminum Tube Shortening and Displacement of B",
        "type": "axial deformation calculation",
        "difficulty": "intermediate",
        "tags": [
          "aluminum tube",
          "shortening",
          "displacement direction"
        ],
        "learningObjectives": [
          "Calculate compressive shortening and interpret point displacement."
        ],
        "selected": true,
        "student": "<p>Calculate the axial shortening of aluminum tube AB and interpret it as the displacement of point B relative to fixed point A.</p>",
        "instructor": "<p>The tube carries {{P}} kN in compression. Its shortening magnitude is</p><p>|&delta;<sub>B/A</sub>| = |<em>N</em><sub>AB</sub>|<em>L</em><sub>AB</sub>/(<em>A</em><sub>AB</sub><em>E</em><sub>al</sub>) = <strong>{{axial_tube_shortening_mm}} mm</strong>.</p><p>Because the tube shortens while A remains fixed, collar point B moves <strong>{{axial_tube_shortening_mm}} mm to the right</strong> relative to A.</p>",
        "commonMistakes": "<p>A negative compressive strain does not mean B moves left. Relate the shortening to the fixed end A and the actual member geometry.</p>",
        "section": "analysis"
      },
      {
        "id": "q13",
        "title": "Total Displacement of C",
        "type": "compatibility calculation",
        "difficulty": "intermediate",
        "tags": [
          "total displacement",
          "compatibility",
          "superposition"
        ],
        "learningObjectives": [
          "Combine relative member deformations into the displacement of a point."
        ],
        "selected": true,
        "student": "<p>Determine the total displacement of end C relative to fixed support A. Show the displacement-compatibility relation and state the direction.</p>",
        "instructor": "<p>Both contributions move C to the right:</p><p>&delta;<sub>C/A</sub> = &delta;<sub>B/A</sub> + &delta;<sub>C/B</sub> = {{axial_tube_shortening_mm}} mm + {{axial_rod_elongation_mm}} mm = <strong>{{axial_total_displacement_mm}} mm to the right</strong>.</p>",
        "gradingNotes": "<p>Require students to show why the deformation magnitudes add instead of relying only on a memorized sign rule.</p>",
        "section": "analysis"
      },
      {
        "id": "q14",
        "title": "Engineering Interpretation",
        "type": "engineering interpretation",
        "difficulty": "intermediate",
        "tags": [
          "physical interpretation",
          "direction",
          "assembly displacement"
        ],
        "learningObjectives": [
          "Explain the physical meaning and direction of the combined displacement."
        ],
        "selected": true,
        "student": "<p>Explain why the rod elongation and tube shortening contribute to the displacement of C in the same direction. Briefly state what the result means for a component positioned or preloaded by end C.</p>",
        "instructor": "<p>The steel rod elongates under tension, moving C to the right relative to B. Simultaneously, the aluminum tube shortens and allows collar B to move right relative to fixed support A. The motions therefore add. For the assigned data, C moves <strong>{{axial_total_displacement_mm}} mm to the right</strong>, which is the position or preload-setting displacement that the connected component would experience in this idealized elastic model.</p>",
        "section": "analysis"
      }
    ],
    "variants": [
      {
        "id": "section-a",
        "title": "Homework Version A - baseline rod and tube assembly",
        "description": "Default sequence for load path, member action, axial deformation, and displacement compatibility.",
        "selectedQuestions": [
          "q1",
          "q2",
          "q3",
          "q4",
          "q5",
          "q6",
          "q7",
          "q8",
          "q9",
          "q10",
          "q11",
          "q12",
          "q13",
          "q14"
        ],
        "variables": {
          "P": 80,
          "L_AB": 400,
          "L_BC": 600,
          "A_AB": 400,
          "d_BC": 10,
          "E_al": 70,
          "E_st": 200
        }
      }
    ]
  },
  {
    "id": "MOS-BRACKET-002",
    "slug": "bolted-bracket-lift-arm",
    "title": "Bolted Wall Bracket for a Small Lift Arm",
    "studentDocumentTitle": "Student Homework Questions",
    "instructorDocumentTitle": "Instructor Answers",
    "summary": "A context-rich mechanics problem on a bolted wall bracket carrying an eccentric lift-arm load.",
    "textbookChapters": [
      "Stress and strain",
      "Shear stress",
      "Bending stress",
      "Beam deflection",
      "Connections and fasteners"
    ],
    "image": "problems/bolted-bracket-lift-arm/assets/bolted-bracket-lift-arm.svg",
    "idealizedImage": "problems/bolted-bracket-lift-arm/assets/bolted-bracket-lift-arm.svg",
    "idealizedImageAlt": "Idealized bolted wall bracket showing the lift arm, applied load, wall plate, anchor spacing, and principal dimensions.",
    "source": "problems/bolted-bracket-lift-arm/index.html",
    "problemStatement": "<p>You are a design engineer reviewing a compact steel wall bracket that supports a short lift arm used at a maintenance workstation. A suspended load is applied near the end of the arm, creating direct shear, bending in the arm, bearing at the bracket plate, and tension-shear demand in the wall anchors.</p><p>The bracket will be installed in multiple work cells, so the design should be simple to fabricate, easy to inspect, and robust against occasional overload or off-center use. The preliminary layout uses a vertical mounting plate with two anchor bolts and a rectangular arm welded or attached to the plate.</p><p>Only an idealized drawing and selected input variables are available. Final weld details, wall material, anchor embedment, allowable deflection, installation tolerances, and inspection requirements have not yet been finalized.</p>",
    "engineeringGoal": "<p>Determine whether the proposed bolted wall bracket can safely support the lift-arm load without yielding, anchor overload, excessive deflection, or connection failure.</p><p>Your recommendation should identify the controlling load path, critical dimensions, likely failure modes, required calculations, and whether the concept should be accepted for detailed design, modified, or rejected.</p>",
    "variables": [
      {
        "key": "P",
        "symbol": "P",
        "label": "Suspended service load",
        "value": 1800,
        "unit": "N",
        "min": 200,
        "max": 8000,
        "step": 100
      },
      {
        "key": "L",
        "symbol": "L",
        "label": "Load distance from wall plate",
        "value": 0.75,
        "unit": "m",
        "min": 0.1,
        "max": 2,
        "step": 0.05
      },
      {
        "key": "s",
        "symbol": "s",
        "label": "Vertical bolt spacing",
        "value": 0.18,
        "unit": "m",
        "min": 0.05,
        "max": 0.6,
        "step": 0.01
      },
      {
        "key": "d",
        "symbol": "d",
        "label": "Anchor bolt diameter",
        "value": 12,
        "unit": "mm",
        "min": 6,
        "max": 30,
        "step": 1
      },
      {
        "key": "t",
        "symbol": "t",
        "label": "Mounting plate thickness",
        "value": 10,
        "unit": "mm",
        "min": 4,
        "max": 30,
        "step": 1
      }
    ],
    "questions": [
      {
        "id": "q0",
        "title": "Engineering Context, Function, and Load Path",
        "selected": true,
        "tags": [
          "context",
          "function",
          "load path"
        ],
        "type": "context interpretation",
        "difficulty": "introductory",
        "learningObjectives": [
          "Interpret the bracket's engineering function",
          "Trace the physical load path into the wall"
        ],
        "gradingNotes": "<p>Look for a continuous load path tied to the actual bracket components, not a generic description of a cantilever.</p>",
        "student": "<p>Describe the primary engineering function of the wall-mounted lift-arm bracket. Trace the load path from the suspended service load through the arm, mounting plate, anchor bolts, and wall structure. Identify the components and locations that are most likely to control the preliminary design.</p>",
        "instructor": "<p>The bracket supports and positions a suspended load while transferring its vertical force and eccentric moment into the wall. The load path is suspended load to lift arm, arm-to-plate connection, mounting plate, anchor group, and wall structure. Likely critical locations include the arm near the plate, welds or arm attachment, the upper anchor in tension, anchors in direct shear, plate bearing and tear-out regions, and the supporting wall around the anchor embedment.</p>",
        "section": "context"
      },
      {
        "id": "q1",
        "title": "Student-Generated Structural Idealization and Free-Body Diagram",
        "selected": true,
        "tags": [
          "load path",
          "fbd",
          "connections"
        ],
        "type": "fbd/modeling",
        "difficulty": "introductory",
        "learningObjectives": [
          "Convert the real bracket into a mechanics model",
          "Draw a complete free-body diagram"
        ],
        "gradingNotes": "<p>Look for a clear connection between eccentric loading and the anchor reaction couple.</p>",
        "student": "<p>Before using the instructor reference idealization, convert the real bracket into a simplified two-dimensional mechanics model. The bracket carries a suspended service load <strong>P = {{P}} {{P_unit}}</strong> at a distance <strong>L = {{L}} {{L_unit}}</strong> from the wall plate. Draw a free-body diagram of the arm and mounting plate, label the relevant dimensions and reactions, and state the assumptions and limitations of your model.</p>",
        "instructor": "<p>Representative answers should show the downward load at the arm end, wall reactions at the plate or anchor group, shear transfer through the plate, and a resisting couple created by the anchor pair. The eccentric moment is approximately M = PL for the idealized side-view model.</p>",
        "section": "transition"
      },
      {
        "id": "q2",
        "title": "Anchor Force Estimate",
        "selected": true,
        "tags": [
          "anchors",
          "estimation",
          "moment"
        ],
        "type": "estimation",
        "difficulty": "intermediate",
        "learningObjectives": [
          "Estimate anchor tension from an eccentric moment",
          "State assumptions behind a simple couple model"
        ],
        "student": "<p>Using the bolt spacing <strong>s = {{s}} {{s_unit}}</strong>, estimate the tensile force that may develop in the upper anchor bolt if the anchor pair resists the moment as a simple couple. State the assumptions behind this estimate.</p>",
        "instructor": "<p>A first estimate treats the eccentric moment as M = PL and the anchor tension-compression couple as T s. Thus T is approximately PL/s, before adding direct shear, prying, preload, wall flexibility, eccentricity, or code-based anchor design factors.</p>",
        "section": "analysis"
      },
      {
        "id": "q3",
        "title": "Bolt Shear and Bearing",
        "selected": true,
        "tags": [
          "shear",
          "bearing",
          "connections"
        ],
        "type": "calculation planning",
        "difficulty": "intermediate",
        "learningObjectives": [
          "Identify bolt shear and bearing checks",
          "Distinguish nominal stress checks from rated anchor capacity"
        ],
        "commonMistakes": "<p>Common mistakes include checking only average shear and ignoring bearing, tear-out, and combined tension-shear demand.</p>",
        "student": "<p>The anchor bolt diameter is <strong>d = {{d}} {{d_unit}}</strong> and the plate thickness is <strong>t = {{t}} {{t_unit}}</strong>. Identify the checks needed for bolt shear, plate bearing, net-section failure, and edge tear-out.</p>",
        "instructor": "<p>Good answers should identify average bolt shear, bearing stress in the plate, net-section tension, tear-out near plate edges, combined tension-shear anchor demand, and the difference between nominal member checks and certified anchor capacity.</p>",
        "section": "analysis"
      },
      {
        "id": "q4",
        "title": "Arm Bending and Deflection",
        "selected": true,
        "tags": [
          "bending",
          "deflection",
          "beam"
        ],
        "type": "calculation planning",
        "difficulty": "introductory to intermediate",
        "learningObjectives": [
          "Model a lift arm as a cantilever",
          "Identify section properties needed for stress and deflection"
        ],
        "student": "<p>Model the lift arm as a cantilever of length <strong>L = {{L}} {{L_unit}}</strong> carrying end load <strong>P = {{P}} {{P_unit}}</strong>. Identify the maximum bending moment location and describe what section properties are needed to estimate bending stress and tip deflection.</p>",
        "instructor": "<p>The maximum moment occurs at the wall connection and is approximately M_max = PL for the simplified cantilever model. Bending stress requires section modulus or second moment of area, while tip deflection requires E, I, support fixity assumptions, and connection flexibility estimates.</p>",
        "section": "analysis"
      },
      {
        "id": "q5",
        "title": "Design Recommendation",
        "selected": true,
        "tags": [
          "decision",
          "safety",
          "design"
        ],
        "type": "decision",
        "difficulty": "intermediate",
        "learningObjectives": [
          "Make a preliminary design recommendation",
          "Identify missing installation and capacity data"
        ],
        "student": "<p>Recommend whether the bracket concept should be accepted for detailed design, modified, or rejected. Identify the additional information needed before approval for repeated shop-floor use.</p>",
        "instructor": "<p>Most preliminary recommendations should be conditional. Required information includes wall material and anchor rating, embedment depth, edge distances, weld details, arm cross section, steel grade, fatigue or cycle demand, overload requirements, deflection limits, installation procedure, inspection access, and applicable workplace safety requirements.</p>",
        "section": "analysis"
      }
    ],
    "variants": [
      {
        "id": "heavy-load",
        "title": "Heavy load practice",
        "variables": {
          "P": 3200,
          "L": 0.95,
          "s": 0.22,
          "d": 16,
          "t": 12
        },
        "selectedQuestions": [
          "q0",
          "q1",
          "q2",
          "q4",
          "q5"
        ]
      },
      {
        "id": "section-a",
        "title": "Section A baseline",
        "variables": {
          "P": 1800,
          "L": 0.75,
          "s": 0.18,
          "d": 12,
          "t": 10
        },
        "selectedQuestions": [
          "q0",
          "q1",
          "q2",
          "q3",
          "q5"
        ]
      }
    ]
  },
  {
    "id": "MOS-PLATE-015",
    "slug": "bonded-steel-plate-splice-joint",
    "title": "Bonded A992 Steel Plate Splice Joint",
    "studentDocumentTitle": "Student Homework Questions",
    "instructorDocumentTitle": "Instructor Answers",
    "summary": "A multi-region axial-deformation problem involving load transfer through bonded steel splice plates and changing effective cross-sectional area.",
    "textbookChapters": [
      "Axial loading",
      "Normal stress",
      "Axial deformation",
      "Built-up members",
      "Piecewise deformation"
    ],
    "derivedPlaceholders": [
      "plate_load_sum_B_kN",
      "plate_load_residual_kN",
      "plate_equilibrium_assessment",
      "plate_load_sharing_assessment",
      "plate_N1_kN",
      "plate_N2_kN",
      "plate_N3_kN",
      "plate_area_1_mm2",
      "plate_area_2_mm2",
      "plate_area_3_mm2",
      "plate_delta_1_mm",
      "plate_delta_2_mm",
      "plate_delta_3_mm",
      "plate_delta_total_mm",
      "plate_relative_A_B_mm",
      "plate_governing_region",
      "plate_governing_delta_mm",
      "plate_governing_percent",
      "plate_recommendation"
    ],
    "image": "problems/bonded-steel-plate-splice-joint/assets/plate-industry-context.png",
    "idealizedImage": "problems/bonded-steel-plate-splice-joint/assets/plate-instructor-idealization.png",
    "idealizedImageAlt": "Instructor reference idealization of a bonded three-plate splice divided into single-plate, three-plate overlap, and two-plate regions.",
    "source": "problems/bonded-steel-plate-splice-joint/index.html",
    "problemStatement": "<p>A structural equipment manufacturer is evaluating a bonded A992 steel plate splice used to transfer axial load between portions of a machine frame. One primary plate overlaps upper and lower splice plates, and continuous bonded seams transfer load through the overlap.</p><p>The simplified model retains the changing number of active plates while neglecting local bond-edge effects. The three regions therefore have effective areas <em>wt</em>, 3<em>wt</em>, and 2<em>wt</em>.</p>",
    "engineeringGoal": "<p>Verify the assigned load balance, determine the internal axial force and effective area in each region, calculate the piecewise axial deformations, and find the change in separation between ends A and B.</p>",
    "variables": [
      {
        "key": "P_A",
        "symbol": "P_A",
        "label": "Axial load at A",
        "value": 46,
        "unit": "kN",
        "min": 0.1,
        "max": 1000,
        "step": 1
      },
      {
        "key": "P_B1",
        "symbol": "P_B1",
        "label": "Upper-plate load at B",
        "value": 23,
        "unit": "kN",
        "min": 0.1,
        "max": 500,
        "step": 1
      },
      {
        "key": "P_B2",
        "symbol": "P_B2",
        "label": "Lower-plate load at B",
        "value": 23,
        "unit": "kN",
        "min": 0.1,
        "max": 500,
        "step": 1
      },
      {
        "key": "L_1",
        "symbol": "L_1",
        "label": "Single-plate region length",
        "value": 600,
        "unit": "mm",
        "min": 1,
        "max": 10000,
        "step": 10
      },
      {
        "key": "L_2",
        "symbol": "L_2",
        "label": "Three-plate overlap length",
        "value": 200,
        "unit": "mm",
        "min": 1,
        "max": 10000,
        "step": 10
      },
      {
        "key": "L_3",
        "symbol": "L_3",
        "label": "Two-plate region length",
        "value": 800,
        "unit": "mm",
        "min": 1,
        "max": 10000,
        "step": 10
      },
      {
        "key": "w",
        "symbol": "w",
        "label": "Width of each plate",
        "value": 100,
        "unit": "mm",
        "min": 1,
        "max": 2000,
        "step": 5
      },
      {
        "key": "t",
        "symbol": "t",
        "label": "Thickness of each plate",
        "value": 5,
        "unit": "mm",
        "min": 0.1,
        "max": 200,
        "step": 0.5
      },
      {
        "key": "E",
        "symbol": "E",
        "label": "Elastic modulus of A992 steel",
        "value": 200,
        "unit": "GPa",
        "min": 1,
        "max": 300,
        "step": 1
      }
    ],
    "questions": [
      {
        "id": "q1",
        "title": "Primary Function",
        "type": "context interpretation",
        "difficulty": "introductory",
        "tags": [
          "system function",
          "splice joint",
          "load transfer"
        ],
        "learningObjectives": [
          "Identify the structural purpose of the bonded joint."
        ],
        "selected": true,
        "student": "<p>State the primary structural function of the bonded plate joint.</p>",
        "instructor": "<p>The joint transfers axial load from one primary plate into two overlapping splice plates while maintaining continuity and alignment of the larger structural assembly.</p>",
        "section": "context"
      },
      {
        "id": "q2",
        "title": "External Loads",
        "type": "load identification",
        "difficulty": "introductory",
        "tags": [
          "axial loads",
          "equilibrium",
          "load balance"
        ],
        "learningObjectives": [
          "Identify the applied end loads and their directions."
        ],
        "selected": true,
        "student": "<p>Identify the external axial loads and explain what condition they must satisfy for equilibrium.</p>",
        "instructor": "<p><em>P</em><sub>A</sub> acts to the left at A. <em>P</em><sub>B1</sub> and <em>P</em><sub>B2</sub> act to the right at B. Equilibrium requires <em>P</em><sub>A</sub> = <em>P</em><sub>B1</sub> + <em>P</em><sub>B2</sub>.</p>",
        "section": "context"
      },
      {
        "id": "q3",
        "title": "Boundary Conditions",
        "type": "boundary conditions",
        "difficulty": "introductory",
        "tags": [
          "axial model",
          "end loads",
          "one-dimensional member"
        ],
        "learningObjectives": [
          "Describe the boundary conditions used in the simplified model."
        ],
        "selected": true,
        "student": "<p>Describe the boundary conditions used in the simplified one-dimensional model.</p>",
        "instructor": "<p>The assembly is loaded by equal and opposite axial resultants at its ends. No transverse supports, shear forces, or bending moments are included in the one-dimensional deformation model.</p>",
        "section": "context"
      },
      {
        "id": "q4",
        "title": "Load Path",
        "type": "load path",
        "difficulty": "introductory",
        "tags": [
          "bonded seams",
          "primary plate",
          "splice plates"
        ],
        "learningObjectives": [
          "Trace axial force through the built-up joint."
        ],
        "selected": true,
        "student": "<p>Trace the load path from end A through the overlap and to end B.</p>",
        "instructor": "<p>The load enters the primary plate at A, travels through its single-plate region, transfers through the bonded overlap into the upper and lower splice plates, and exits through the two loads at B.</p>",
        "section": "context"
      },
      {
        "id": "q5",
        "title": "Mechanically Distinct Regions",
        "type": "system decomposition",
        "difficulty": "introductory",
        "tags": [
          "piecewise model",
          "effective area",
          "built-up member"
        ],
        "learningObjectives": [
          "Divide the joint into constant-area regions."
        ],
        "selected": true,
        "student": "<p>Identify the mechanically distinct regions needed for a piecewise axial-deformation model.</p>",
        "instructor": "<p>Region 1 contains one active plate, Region 2 contains three bonded plates in the overlap, and Region 3 contains the two outgoing splice plates.</p>",
        "section": "context"
      },
      {
        "id": "q6",
        "title": "Relevant Mechanical Response",
        "type": "mechanics reasoning",
        "difficulty": "introductory",
        "tags": [
          "axial deformation",
          "model scope",
          "local effects"
        ],
        "learningObjectives": [
          "Distinguish the base deformation response from excluded local behavior."
        ],
        "selected": true,
        "student": "<p>What response is evaluated in the base problem, and what local joint behavior is excluded?</p>",
        "instructor": "<p>The base problem evaluates total axial deformation. Bond-line shear and peel stress, seam-end stress concentrations, local plate bending, and bond slip are intentionally excluded.</p>",
        "section": "context"
      },
      {
        "id": "q7",
        "title": "Relevant Parameters",
        "type": "parameter identification",
        "difficulty": "introductory",
        "tags": [
          "load",
          "geometry",
          "elastic modulus"
        ],
        "learningObjectives": [
          "Identify the inputs controlling piecewise axial deformation."
        ],
        "selected": true,
        "student": "<p>List the loading, geometric, and material parameters that control the joint deformation.</p>",
        "instructor": "<p>The governing inputs are the three end loads, segment lengths <em>L</em><sub>1</sub> through <em>L</em><sub>3</sub>, plate width <em>w</em>, plate thickness <em>t</em>, the number of active plates in each region, and elastic modulus <em>E</em>.</p>",
        "section": "context"
      },
      {
        "id": "q8",
        "title": "Student-Generated Structural Idealization",
        "type": "free-body diagram",
        "difficulty": "intermediate",
        "tags": [
          "idealization",
          "axial member",
          "region boundaries"
        ],
        "learningObjectives": [
          "Create a one-dimensional model before viewing the reference figure."
        ],
        "selected": true,
        "student": "<p>Before using the reference figure, create a one-dimensional axial model with three constant-area regions. Label the end loads, region boundaries, lengths, and effective areas.</p>",
        "instructor": "<p>A valid model shows Region 1 with area <em>wt</em>, Region 2 with area 3<em>wt</em>, Region 3 with area 2<em>wt</em>, the three segment lengths, and the applied end loads.</p>",
        "gradingNotes": "<p>Students should attempt the load-path and region model before seeing the instructor idealization.</p>",
        "section": "transition"
      },
      {
        "id": "q9",
        "title": "Modeling Assumptions",
        "type": "assumptions",
        "difficulty": "intermediate",
        "tags": [
          "perfect bond",
          "equal strain",
          "linear elasticity"
        ],
        "learningObjectives": [
          "State assumptions supporting the effective-area model."
        ],
        "selected": true,
        "student": "<p>State the assumptions required for the simplified axial-deformation analysis.</p>",
        "instructor": "<p>Assume linear-elastic plates of uniform width and thickness, uniform average axial stress in each effective section, perfect bond and equal axial strain among overlapping plates, small deformation, and negligible local stress concentration, bond slip, and bending.</p>",
        "section": "transition"
      },
      {
        "id": "q10",
        "title": "Mechanics Analysis Plan",
        "type": "analysis planning",
        "difficulty": "intermediate",
        "tags": [
          "internal force",
          "effective area",
          "deformation sum"
        ],
        "learningObjectives": [
          "Plan a piecewise axial-deformation solution."
        ],
        "selected": true,
        "student": "<p>Outline the calculation sequence before carrying out numerical work.</p>",
        "instructor": "<p>Verify load equilibrium, determine the internal axial force, identify each effective area, compute each segment deformation from &delta;<sub>i</sub> = <em>N</em><sub>i</sub><em>L</em><sub>i</sub>/(<em>A</em><sub>i</sub><em>E</em>), and sum the signed segment deformations.</p>",
        "section": "transition"
      },
      {
        "id": "q11",
        "title": "Load Equilibrium and Sharing",
        "type": "equilibrium check",
        "difficulty": "introductory",
        "tags": [
          "force balance",
          "outgoing loads",
          "validation"
        ],
        "learningObjectives": [
          "Verify equilibrium and compatibility of the assigned loads."
        ],
        "selected": true,
        "student": "<p>Using the assigned values, verify overall axial equilibrium and assess the load sharing between the identical outgoing plates.</p>",
        "instructor": "<p>The outgoing resultant is <strong>{{plate_load_sum_B_kN}} kN</strong>, and the signed residual <em>P</em><sub>B1</sub> + <em>P</em><sub>B2</sub> - <em>P</em><sub>A</sub> is <strong>{{plate_load_residual_kN}} kN</strong>. {{plate_equilibrium_assessment}} {{plate_load_sharing_assessment}}</p>",
        "section": "analysis"
      },
      {
        "id": "q12",
        "title": "Internal Axial-Force Diagram",
        "type": "internal loading",
        "difficulty": "intermediate",
        "tags": [
          "axial-force diagram",
          "load sharing",
          "regions"
        ],
        "learningObjectives": [
          "Determine the axial resultant in each region."
        ],
        "selected": true,
        "student": "<p>Determine the internal axial-force magnitude in each region and describe the force carried by each outgoing plate.</p>",
        "instructor": "<p>The region resultants are <strong><em>N</em><sub>1</sub> = {{plate_N1_kN}} kN</strong>, <strong><em>N</em><sub>2</sub> = {{plate_N2_kN}} kN</strong>, and <strong><em>N</em><sub>3</sub> = {{plate_N3_kN}} kN</strong>. In Region 3, the upper and lower plates carry the assigned loads <em>P</em><sub>B1</sub> and <em>P</em><sub>B2</sub>.</p>",
        "section": "analysis"
      },
      {
        "id": "q13",
        "title": "Effective Cross-Sectional Areas",
        "type": "section properties",
        "difficulty": "intermediate",
        "tags": [
          "cross-sectional area",
          "active plates",
          "built-up section"
        ],
        "learningObjectives": [
          "Calculate effective area from the number of active plates."
        ],
        "selected": true,
        "student": "<p>Determine the effective load-carrying area of each region.</p>",
        "instructor": "<p><em>A</em><sub>1</sub> = <em>wt</em> = <strong>{{plate_area_1_mm2}} mm<sup>2</sup></strong>, <em>A</em><sub>2</sub> = 3<em>wt</em> = <strong>{{plate_area_2_mm2}} mm<sup>2</sup></strong>, and <em>A</em><sub>3</sub> = 2<em>wt</em> = <strong>{{plate_area_3_mm2}} mm<sup>2</sup></strong>.</p>",
        "section": "analysis"
      },
      {
        "id": "q14",
        "title": "Segment-Deformation Equations",
        "type": "axial deformation setup",
        "difficulty": "intermediate",
        "tags": [
          "NL over AE",
          "unit conversion",
          "piecewise calculation"
        ],
        "learningObjectives": [
          "Write a consistent deformation equation for each region."
        ],
        "selected": true,
        "student": "<p>Write the axial-deformation equation for each segment and state the required unit conversion for the elastic modulus.</p>",
        "instructor": "<p>Use &delta;<sub>i</sub> = <em>N</em><sub>i</sub><em>L</em><sub>i</sub>/(<em>A</em><sub>i</sub><em>E</em>) for each constant-area region. With force in newtons and geometry in millimeters, convert <em>E</em> from GPa to MPa, where 1 GPa = 1000 N/mm<sup>2</sup>.</p>",
        "section": "analysis"
      },
      {
        "id": "q15",
        "title": "Segment Deformations",
        "type": "axial deformation calculation",
        "difficulty": "intermediate",
        "tags": [
          "elongation",
          "segment contributions",
          "numerical solution"
        ],
        "learningObjectives": [
          "Calculate each segment's axial elongation."
        ],
        "selected": true,
        "student": "<p>Calculate the axial deformation of each region.</p>",
        "instructor": "<p>The tensile elongations are <strong>&delta;<sub>1</sub> = {{plate_delta_1_mm}} mm</strong>, <strong>&delta;<sub>2</sub> = {{plate_delta_2_mm}} mm</strong>, and <strong>&delta;<sub>3</sub> = {{plate_delta_3_mm}} mm</strong>.</p>",
        "commonMistakes": "<p>Do not use the single-plate area in all three regions, and convert kN to N and GPa to MPa.</p>",
        "section": "analysis"
      },
      {
        "id": "q16",
        "title": "Relative Displacement of A and B",
        "type": "total deformation",
        "difficulty": "intermediate",
        "tags": [
          "relative displacement",
          "sign convention",
          "elongation"
        ],
        "learningObjectives": [
          "Sum segment deformations and interpret the displacement sign."
        ],
        "selected": true,
        "student": "<p>Determine the total change in separation between A and B. Then report <em>u</em><sub>A</sub> - <em>u</em><sub>B</sub> using rightward displacement as positive.</p>",
        "instructor": "<p>The A-B separation increases by <strong>{{plate_delta_total_mm}} mm</strong>. With rightward displacement positive, <strong><em>u</em><sub>A</sub> - <em>u</em><sub>B</sub> = {{plate_relative_A_B_mm}} mm</strong>.</p>",
        "gradingNotes": "<p>Accept a positive 0.491 mm if the student clearly defines that value as the increase in separation rather than uA - uB.</p>",
        "section": "analysis"
      },
      {
        "id": "q17",
        "title": "Governing Deformation Contribution",
        "type": "result interpretation",
        "difficulty": "intermediate",
        "tags": [
          "governing region",
          "compliance",
          "sensitivity"
        ],
        "learningObjectives": [
          "Relate deformation contribution to length and effective area."
        ],
        "selected": true,
        "student": "<p>Identify which region contributes most to the total displacement and explain why.</p>",
        "instructor": "<p><strong>{{plate_governing_region}}</strong> governs with <strong>{{plate_governing_delta_mm}} mm</strong>, or approximately <strong>{{plate_governing_percent}}%</strong> of the total deformation. The dominant contribution follows from the segment ratio <em>L</em>/(<em>AE</em>).</p>",
        "section": "analysis"
      },
      {
        "id": "q18",
        "title": "Stiffness-Based Modification",
        "type": "design modification",
        "difficulty": "intermediate",
        "tags": [
          "axial stiffness",
          "design change",
          "serviceability"
        ],
        "learningObjectives": [
          "Recommend a modification based on the governing compliance."
        ],
        "selected": true,
        "student": "<p>Recommend one modification that would reduce joint displacement without changing the applied load.</p>",
        "instructor": "<p>Increase width or thickness in the most compliant region, particularly Region 1 for the baseline geometry. This increases <em>AE/L</em> directly. Merely lengthening the overlap is not automatically the best change unless it replaces a more compliant region with the higher-area overlap.</p>",
        "section": "analysis"
      },
      {
        "id": "q19",
        "title": "Engineering Assessment and Model Scope",
        "type": "engineering judgment",
        "difficulty": "advanced",
        "tags": [
          "recommendation",
          "limitations",
          "bonded joint design"
        ],
        "learningObjectives": [
          "Make a bounded recommendation and identify omitted checks."
        ],
        "selected": true,
        "student": "<p>Provide a concise engineering assessment and identify the additional checks required before approving a real bonded splice.</p>",
        "instructor": "<p>{{plate_recommendation}}</p><p>A complete design must also check bond-line shear and peel stress, seam-end stress concentration, plate yielding, bond strength and slip, fatigue, environmental durability, local bending, and manufacturing quality.</p>",
        "gradingNotes": "<p>The assessment must not claim that the joint is safe without a displacement limit and the omitted strength checks.</p>",
        "section": "analysis"
      }
    ],
    "variants": [
      {
        "id": "section-a",
        "title": "Homework Version A - baseline bonded splice",
        "description": "Default sequence for load transfer, region areas, piecewise axial deformation, and engineering interpretation.",
        "selectedQuestions": [
          "q1",
          "q2",
          "q3",
          "q4",
          "q5",
          "q6",
          "q7",
          "q8",
          "q9",
          "q10",
          "q11",
          "q12",
          "q13",
          "q14",
          "q15",
          "q16",
          "q17",
          "q18",
          "q19"
        ],
        "variables": {
          "P_A": 46,
          "P_B1": 23,
          "P_B2": 23,
          "L_1": 600,
          "L_2": 200,
          "L_3": 800,
          "w": 100,
          "t": 5,
          "E": 200
        }
      }
    ]
  },
  {
    "id": "MOS-CLEVIS-007",
    "slug": "clevis-pin-tensile-linkage",
    "title": "Industrial Clevis-Pin Linkage Under Tensile Load",
    "studentDocumentTitle": "Student Homework Questions",
    "instructorDocumentTitle": "Instructor Answers",
    "summary": "A context-rich mechanics problem on axial normal stress in rods and double-shear stress in a clevis pin.",
    "textbookChapters": [
      "Stress and strain",
      "Axial loading",
      "Shear stress",
      "Connections and fasteners",
      "Factor of safety"
    ],
    "derivedPlaceholders": [
      "clevis_load_N",
      "clevis_shear_plane_load_N",
      "clevis_area_1_mm2",
      "clevis_area_2_mm2",
      "clevis_pin_area_mm2",
      "clevis_pin_total_shear_area_mm2",
      "clevis_sigma_1_MPa",
      "clevis_sigma_2_MPa",
      "clevis_tau_A_MPa",
      "clevis_largest_stress_mode",
      "clevis_largest_stress_MPa",
      "clevis_fos_1",
      "clevis_fos_2",
      "clevis_fos_pin",
      "clevis_governing_fos_mode",
      "clevis_governing_fos"
    ],
    "image": "problems/clevis-pin-tensile-linkage/assets/clevis-industry-context.png",
    "idealizedImage": "problems/clevis-pin-tensile-linkage/assets/clevis-instructor-idealization.png",
    "idealizedImageAlt": "Instructor reference idealization for the clevis-pin tensile linkage.",
    "source": "problems/clevis-pin-tensile-linkage/index.html",
    "problemStatement": "<p>A mechanical design team is reviewing a clevis-and-pin linkage used in an industrial actuator assembly. The linkage transfers a tensile force between two cylindrical rod members through a forked yoke and a transverse pin. This type of connection is common in hydraulic actuators, lifting mechanisms, automated machinery, and mechanical test fixtures.</p><p>Because the connection is part of a load path, the team must verify which components carry axial tension and which connector carries shear. For this introductory Solid Mechanics analysis, the rods are checked using average normal stress, and the pin is checked using average shear stress assuming double shear. More detailed effects such as bearing stress, stress concentration near holes, bending of the pin, contact pressure, fatigue, and manufacturing tolerances are noted as limitations but are not required for the basic calculation.</p>",
    "engineeringGoal": "<p>Determine the average normal stress in each rod and the average shear stress in the pin at A. Use the results to identify which idealized component has the largest average stress demand and make a limited mechanics-based recommendation about what additional information would be needed before accepting the connection for service.</p>",
    "variables": [
      {
        "key": "P",
        "symbol": "P",
        "label": "Applied tensile load",
        "value": 5,
        "unit": "kN",
        "min": 0.5,
        "max": 200,
        "step": 0.5
      },
      {
        "key": "d_1",
        "symbol": "d_1",
        "label": "Diameter of left rod",
        "value": 40,
        "unit": "mm",
        "min": 5,
        "max": 150,
        "step": 1
      },
      {
        "key": "d_2",
        "symbol": "d_2",
        "label": "Diameter of right rod",
        "value": 30,
        "unit": "mm",
        "min": 5,
        "max": 150,
        "step": 1
      },
      {
        "key": "d_A",
        "symbol": "d_A",
        "label": "Pin diameter at A",
        "value": 25,
        "unit": "mm",
        "min": 5,
        "max": 100,
        "step": 1
      },
      {
        "key": "n_s",
        "symbol": "n_s",
        "label": "Number of pin shear planes",
        "value": 2,
        "unit": "-",
        "min": 1,
        "max": 2,
        "step": 1
      },
      {
        "key": "sigma_allow",
        "symbol": "sigma_allow",
        "label": "Optional allowable normal stress",
        "value": 120,
        "unit": "MPa",
        "min": 10,
        "max": 800,
        "step": 5
      },
      {
        "key": "tau_allow",
        "symbol": "tau_allow",
        "label": "Optional allowable pin shear stress",
        "value": 80,
        "unit": "MPa",
        "min": 5,
        "max": 500,
        "step": 5
      }
    ],
    "questions": [
      {
        "id": "q1",
        "title": "Primary Function of the Clevis Linkage",
        "type": "context interpretation",
        "difficulty": "introductory",
        "tags": [
          "context",
          "function",
          "load path"
        ],
        "learningObjectives": [
          "Connect a real mechanical linkage to its structural load-transfer role."
        ],
        "selected": true,
        "student": "<p>What is the primary structural function of the clevis-pin linkage shown in the industry-context image?</p>",
        "instructor": "<p>The clevis-pin linkage transfers tensile load between two rod or linkage members through the yoke, pin, and inner member. The joint provides force transfer while allowing the connection to behave like a pinned mechanical linkage.</p>",
        "gradingNotes": "<p>Look for load-transfer language: transfer load, carry tension, transmit force, and maintain a mechanical linkage.</p>",
        "commonMistakes": "<p>Students may describe the whole machine without identifying the local connection as the load-transfer element.</p>",
        "section": "context"
      },
      {
        "id": "q2",
        "title": "External Tensile Load",
        "type": "load identification",
        "difficulty": "introductory",
        "tags": [
          "loading",
          "tension"
        ],
        "learningObjectives": [
          "Identify applied loads and their directions from an idealized diagram."
        ],
        "selected": true,
        "student": "<p>Where are the external loads applied in the simplified problem, and what is their direction?</p>",
        "instructor": "<p>Equal and opposite tensile loads <strong>{{P}} {{P_unit}}</strong> are applied at the far ends of the left and right rods. The left load acts outward to the left, and the right load acts outward to the right, placing the connection in axial tension.</p>",
        "gradingNotes": "<p>The industry image does not show force arrows; students should use the problem statement and idealized model.</p>",
        "section": "context"
      },
      {
        "id": "q3",
        "title": "Boundary and Connection Idealization",
        "type": "idealization",
        "difficulty": "introductory",
        "tags": [
          "boundary conditions",
          "pinned connection"
        ],
        "learningObjectives": [
          "Distinguish an axial connector model from a fixed-support beam model."
        ],
        "selected": true,
        "student": "<p>For the idealized connection, identify the effective boundary/loading conditions used in the mechanics model.</p>",
        "instructor": "<p>This is not a fixed-support beam or frame problem. The surrounding machine members impose an axial tensile load <strong>{{P}} {{P_unit}}</strong> at each rod end. The clevis and inner member are connected by the pin at A, which transfers load while allowing the joint to be idealized as a pinned connector.</p>",
        "commonMistakes": "<p>A common error is inventing wall reactions or treating the clevis body as a support bracket instead of a tensile load-transfer connection.</p>",
        "section": "context"
      },
      {
        "id": "q4",
        "title": "Load Path Through the Connection",
        "type": "load path",
        "difficulty": "introductory",
        "tags": [
          "load path",
          "components"
        ],
        "learningObjectives": [
          "Trace force transfer through a multi-part mechanical connection."
        ],
        "selected": true,
        "student": "<p>Using the component list, trace the load path through the connection from the left rod to the right rod.</p>",
        "instructor": "<p>One acceptable load path is left rod &rarr; yoke/clevis &rarr; pin at A &rarr; inner member &rarr; right rod. The same path may be stated in reverse. The pin must be included because it transfers load between the forked yoke and the inner member.</p>",
        "gradingNotes": "<p>Missing the pin usually indicates the student has not understood the connection mechanism.</p>",
        "section": "context"
      },
      {
        "id": "q5",
        "title": "Critical Components for the Simplified Check",
        "type": "component identification",
        "difficulty": "introductory",
        "tags": [
          "critical components",
          "average stress"
        ],
        "learningObjectives": [
          "Identify which components are checked by the simplified mechanics model."
        ],
        "selected": true,
        "student": "<p>Which components or locations are likely to be critical for this simplified analysis?</p>",
        "instructor": "<p>The left rod and right rod are critical for average axial normal stress. The pin at A is critical for average shear stress. In a detailed design, the yoke arms and inner member holes may also be critical because of bearing, tear-out, net-section tension, stress concentration, pin bending, and fatigue.</p>",
        "section": "context"
      },
      {
        "id": "q6",
        "title": "Mechanical Response by Component",
        "type": "mechanics reasoning",
        "difficulty": "introductory",
        "tags": [
          "normal stress",
          "shear stress",
          "double shear"
        ],
        "learningObjectives": [
          "Match each component to the stress quantity used in the base analysis."
        ],
        "selected": true,
        "student": "<p>For each critical component, identify the relevant mechanical response or failure mechanism considered in this problem.</p>",
        "instructor": "<p>Left rod: average axial normal stress, &sigma;<sub>1</sub> = P/A<sub>1</sub>. Right rod: average axial normal stress, &sigma;<sub>2</sub> = P/A<sub>2</sub>. Pin A: average shear stress, &tau;<sub>A</sub> = P/(n<sub>s</sub>A<sub>A</sub>), with <strong>n<sub>s</sub> = {{n_s}}</strong> for double shear. Bearing stress, pin bending, fatigue, and stress concentration are not included in the simplified calculation.</p>",
        "gradingNotes": "<p>The double-shear interpretation is the key conceptual point.</p>",
        "section": "context"
      },
      {
        "id": "q7",
        "title": "Relevant Geometric Parameters",
        "type": "geometry identification",
        "difficulty": "introductory",
        "tags": [
          "diameter",
          "area",
          "stress"
        ],
        "learningObjectives": [
          "Connect diameter data to cross-sectional area and average stress."
        ],
        "selected": true,
        "student": "<p>Identify the geometric parameters that control the average normal stress in the rods and the average shear stress in the pin.</p>",
        "instructor": "<p>The controlling parameters are <strong>d<sub>1</sub> = {{d_1}} {{d_1_unit}}</strong> for A<sub>1</sub> = &pi;d<sub>1</sub><sup>2</sup>/4, <strong>d<sub>2</sub> = {{d_2}} {{d_2_unit}}</strong> for A<sub>2</sub> = &pi;d<sub>2</sub><sup>2</sup>/4, and <strong>d<sub>A</sub> = {{d_A}} {{d_A_unit}}</strong> for A<sub>A</sub> = &pi;d<sub>A</sub><sup>2</sup>/4. Because the pin is in double shear, the total resisting shear area is <strong>{{n_s}}A<sub>A</sub></strong>.</p>",
        "section": "context"
      },
      {
        "id": "q8",
        "title": "Student-Generated Structural Idealization",
        "type": "free-body diagram",
        "difficulty": "introductory",
        "tags": [
          "idealization",
          "FBD",
          "double shear"
        ],
        "learningObjectives": [
          "Translate a physical clevis assembly into a mechanics model."
        ],
        "selected": true,
        "student": "<p>Convert the real clevis-pin linkage into a simplified Mechanics of Materials model. Your sketch should show the left rod, yoke/clevis, inner member, pin at A, right rod, external tensile load P, rod diameters d<sub>1</sub> and d<sub>2</sub>, and pin diameter d<sub>A</sub>.</p>",
        "instructor": "<p>A correct idealization shows two axial rod members connected through a clevis and pin. The external loads P act outward at both rod ends. The left and right rods carry axial tension. The pin at A is represented as a connector in double shear with two shear planes.</p>",
        "gradingNotes": "<p>In a student handout, this can be used as an instructor reference or hidden until after students produce their own sketch.</p>",
        "section": "transition"
      },
      {
        "id": "q9",
        "title": "Modeling Assumptions",
        "type": "assumptions",
        "difficulty": "introductory",
        "tags": [
          "assumptions",
          "average stress"
        ],
        "learningObjectives": [
          "State assumptions that make the average-stress model valid for a first analysis."
        ],
        "selected": true,
        "student": "<p>State the assumptions used to convert the real mechanical connection into the simplified Solid Mechanics model.</p>",
        "instructor": "<p>Reasonable assumptions include static axial loading; circular prismatic rods at the checked sections; concentric load through each rod; average stress is used; the pin is in double shear; the two shear planes share the load equally; friction, bearing stress, stress concentrations, pin bending, thread effects, clearances, wear, and fatigue are neglected.</p>",
        "section": "transition"
      },
      {
        "id": "q10",
        "title": "Mechanics Analysis Plan",
        "type": "analysis planning",
        "difficulty": "introductory",
        "tags": [
          "solution strategy",
          "stress"
        ],
        "learningObjectives": [
          "Plan the stress calculation before substituting values."
        ],
        "selected": true,
        "student": "<p>Before calculating, describe the analysis sequence needed to determine the rod normal stresses and pin shear stress.</p>",
        "instructor": "<p>Identify the applied tensile load P; compute cross-sectional areas A<sub>1</sub> and A<sub>2</sub> of the rods; compute pin cross-sectional area A<sub>A</sub>; recognize that the pin has {{n_s}} shear planes; calculate &sigma;<sub>1</sub> = P/A<sub>1</sub>, &sigma;<sub>2</sub> = P/A<sub>2</sub>, and &tau;<sub>A</sub> = P/({{n_s}}A<sub>A</sub>); compare the stress magnitudes and identify the largest calculated average stress.</p>",
        "section": "transition"
      },
      {
        "id": "q11",
        "title": "Loading Conditions from the Instructor Diagram",
        "type": "mechanics setup",
        "difficulty": "introductory",
        "tags": [
          "loading",
          "idealization"
        ],
        "learningObjectives": [
          "Use the instructor diagram to define the base mechanics model."
        ],
        "selected": true,
        "student": "<p>From the instructor diagram, identify the loading conditions and the main connection idealization.</p>",
        "instructor": "<p>The connection is subjected to equal and opposite axial tensile loads <strong>P = {{P}} {{P_unit}}</strong> at the two rod ends. The left rod, yoke, pin, inner member, and right rod form a tensile load path. The pin at A is idealized as a connector in double shear.</p>",
        "section": "analysis"
      },
      {
        "id": "q12",
        "title": "Internal Loads in Rods and Pin Planes",
        "type": "internal force",
        "difficulty": "introductory",
        "tags": [
          "axial force",
          "shear force",
          "double shear"
        ],
        "learningObjectives": [
          "Determine internal force in tensile members and load per pin shear plane."
        ],
        "selected": true,
        "student": "<p>Identify the internal load carried by each rod and the shear force carried by each pin shear plane.</p>",
        "instructor": "<p>Each rod carries axial force <strong>P = {{P}} {{P_unit}} = {{clevis_load_N}} N</strong> in tension. The pin transmits the same total load between the yoke and the inner member. Since the pin has <strong>{{n_s}}</strong> shear planes, each shear plane carries <strong>V = P/{{n_s}} = {{clevis_shear_plane_load_N}} N</strong>.</p>",
        "commonMistakes": "<p>Using the full load on each shear plane doubles the correct average pin shear stress.</p>",
        "section": "analysis"
      },
      {
        "id": "q13",
        "title": "Cross-Sectional Areas",
        "type": "calculation",
        "difficulty": "introductory",
        "tags": [
          "area",
          "diameter"
        ],
        "learningObjectives": [
          "Calculate circular cross-sectional areas for rods and pin."
        ],
        "selected": true,
        "student": "<p>Calculate the cross-sectional area of the left rod, right rod, and pin using the given diameters.</p>",
        "instructor": "<p>A<sub>1</sub> = &pi;({{d_1}} mm)<sup>2</sup>/4 = <strong>{{clevis_area_1_mm2}} mm<sup>2</sup></strong>. A<sub>2</sub> = &pi;({{d_2}} mm)<sup>2</sup>/4 = <strong>{{clevis_area_2_mm2}} mm<sup>2</sup></strong>. A<sub>A</sub> = &pi;({{d_A}} mm)<sup>2</sup>/4 = <strong>{{clevis_pin_area_mm2}} mm<sup>2</sup></strong>. For double shear, the total resisting shear area is {{n_s}}A<sub>A</sub> = <strong>{{clevis_pin_total_shear_area_mm2}} mm<sup>2</sup></strong>.</p>",
        "gradingNotes": "<p>Use N and mm units so stress comes out in N/mm<sup>2</sup> = MPa.</p>",
        "section": "analysis"
      },
      {
        "id": "q14",
        "title": "Average Normal Stress in the Left Rod",
        "type": "calculation",
        "difficulty": "introductory",
        "tags": [
          "normal stress",
          "axial loading"
        ],
        "learningObjectives": [
          "Compute average tensile normal stress from axial force and area."
        ],
        "selected": true,
        "student": "<p>Determine the average normal stress in the left rod.</p>",
        "instructor": "<p>&sigma;<sub>1</sub> = P/A<sub>1</sub> = {{clevis_load_N}} N / {{clevis_area_1_mm2}} mm<sup>2</sup> = <strong>{{clevis_sigma_1_MPa}} MPa</strong>. The stress is tensile.</p>",
        "section": "analysis"
      },
      {
        "id": "q15",
        "title": "Average Normal Stress in the Right Rod",
        "type": "calculation",
        "difficulty": "introductory",
        "tags": [
          "normal stress",
          "axial loading"
        ],
        "learningObjectives": [
          "Compute average tensile normal stress for a second member and compare the effect of diameter."
        ],
        "selected": true,
        "student": "<p>Determine the average normal stress in the right rod.</p>",
        "instructor": "<p>&sigma;<sub>2</sub> = P/A<sub>2</sub> = {{clevis_load_N}} N / {{clevis_area_2_mm2}} mm<sup>2</sup> = <strong>{{clevis_sigma_2_MPa}} MPa</strong>. The stress is tensile. Since the right rod diameter is smaller, it has the larger average normal stress.</p>",
        "section": "analysis"
      },
      {
        "id": "q16",
        "title": "Pin Shear Idealization",
        "type": "concept check",
        "difficulty": "introductory",
        "tags": [
          "double shear",
          "connector"
        ],
        "learningObjectives": [
          "Explain why the clevis pin is modeled in double shear."
        ],
        "selected": true,
        "student": "<p>Is the pin at A in single shear or double shear? Explain using the clevis geometry.</p>",
        "instructor": "<p>The pin is in double shear because the inner member is located between two yoke arms. The load is transferred across two shear planes in the pin, one at each interface between the inner member and a clevis arm.</p>",
        "commonMistakes": "<p>If students use single shear, their pin shear stress will be twice the correct double-shear value.</p>",
        "section": "analysis"
      },
      {
        "id": "q17",
        "title": "Average Shear Stress in Pin A",
        "type": "calculation",
        "difficulty": "introductory",
        "tags": [
          "shear stress",
          "double shear"
        ],
        "learningObjectives": [
          "Compute average shear stress in a pin with multiple shear planes."
        ],
        "selected": true,
        "student": "<p>Determine the average shear stress in the pin at A.</p>",
        "instructor": "<p>&tau;<sub>A</sub> = P/({{n_s}}A<sub>A</sub>) = {{clevis_load_N}} N / {{clevis_pin_total_shear_area_mm2}} mm<sup>2</sup> = <strong>{{clevis_tau_A_MPa}} MPa</strong>. Equivalently, each shear plane carries V = {{clevis_shear_plane_load_N}} N, so &tau;<sub>A</sub> = V/A<sub>A</sub>.</p>",
        "section": "analysis"
      },
      {
        "id": "q18",
        "title": "Largest Calculated Average Stress",
        "type": "comparison",
        "difficulty": "introductory",
        "tags": [
          "stress comparison",
          "engineering judgment"
        ],
        "learningObjectives": [
          "Compare average stress magnitudes across different checked components."
        ],
        "selected": true,
        "student": "<p>Among &sigma;<sub>1</sub>, &sigma;<sub>2</sub>, and &tau;<sub>A</sub>, which calculated average stress has the largest magnitude?</p>",
        "instructor": "<p>The calculated average stresses are &sigma;<sub>1</sub> = <strong>{{clevis_sigma_1_MPa}} MPa</strong>, &sigma;<sub>2</sub> = <strong>{{clevis_sigma_2_MPa}} MPa</strong>, and &tau;<sub>A</sub> = <strong>{{clevis_tau_A_MPa}} MPa</strong>. The largest average stress magnitude is <strong>{{clevis_largest_stress_mode}}</strong>, with magnitude <strong>{{clevis_largest_stress_MPa}} MPa</strong>.</p>",
        "gradingNotes": "<p>Emphasize that largest stress magnitude does not automatically mean governing failure unless allowable normal and shear strengths are known.</p>",
        "section": "analysis"
      },
      {
        "id": "q19",
        "title": "Optional Strength Factor of Safety Check",
        "type": "design evaluation",
        "difficulty": "intermediate",
        "tags": [
          "factor of safety",
          "allowable stress"
        ],
        "learningObjectives": [
          "Use allowable stresses to compute and interpret factors of safety."
        ],
        "selected": true,
        "student": "<p>Using the provided allowable normal stress and allowable pin shear stress, determine the factor of safety for each checked component and identify the governing checked mode.</p>",
        "instructor": "<p>FOS<sub>1</sub> = &sigma;<sub>allow</sub>/&sigma;<sub>1</sub> = {{sigma_allow}} MPa / {{clevis_sigma_1_MPa}} MPa = <strong>{{clevis_fos_1}}</strong>. FOS<sub>2</sub> = &sigma;<sub>allow</sub>/&sigma;<sub>2</sub> = {{sigma_allow}} MPa / {{clevis_sigma_2_MPa}} MPa = <strong>{{clevis_fos_2}}</strong>. FOS<sub>A</sub> = &tau;<sub>allow</sub>/&tau;<sub>A</sub> = {{tau_allow}} MPa / {{clevis_tau_A_MPa}} MPa = <strong>{{clevis_fos_pin}}</strong>. The smallest factor of safety is <strong>{{clevis_governing_fos}}</strong>, governed by <strong>{{clevis_governing_fos_mode}}</strong>.</p>",
        "gradingNotes": "<p>For the default allowables, the largest raw stress is in the right rod, but the smallest factor of safety is controlled by the relative allowable stresses. This is a useful distinction.</p>",
        "section": "analysis"
      },
      {
        "id": "q20",
        "title": "Connector Load and Additional Failure Modes",
        "type": "engineering judgment",
        "difficulty": "intermediate",
        "tags": [
          "connector design",
          "limitations"
        ],
        "learningObjectives": [
          "Identify what the simplified connector analysis includes and excludes."
        ],
        "selected": true,
        "student": "<p>Identify the connector load carried by the pin and list additional connector failure modes that a detailed design would need to check.</p>",
        "instructor": "<p>The total load transferred by the pin is <strong>P = {{P}} {{P_unit}}</strong>. In the simplified model, this load is shared by <strong>{{n_s}}</strong> shear planes, so each plane carries <strong>{{clevis_shear_plane_load_N}} N</strong>. A detailed design could also require checks for bearing stress between the pin and holes, net-section tension of the yoke arms or inner member, tear-out, pin bending, contact pressure, wear, fatigue, and manufacturing tolerances.</p>",
        "section": "analysis"
      },
      {
        "id": "q21",
        "title": "Engineering Assessment and Recommendation",
        "type": "engineering judgment",
        "difficulty": "intermediate",
        "tags": [
          "recommendation",
          "limitations",
          "factor of safety"
        ],
        "learningObjectives": [
          "Make a limited recommendation based on calculated stresses and missing design information."
        ],
        "selected": true,
        "student": "<p>Use the mechanics results to make a limited engineering recommendation. Identify the governing checked stress quantity and state what additional information would be needed to accept the connection for service.</p>",
        "instructor": "<p>For the simplified checks, &sigma;<sub>1</sub> = <strong>{{clevis_sigma_1_MPa}} MPa</strong>, &sigma;<sub>2</sub> = <strong>{{clevis_sigma_2_MPa}} MPa</strong>, and &tau;<sub>A</sub> = <strong>{{clevis_tau_A_MPa}} MPa</strong>. The largest calculated average stress is <strong>{{clevis_largest_stress_mode}}</strong>. With the provided allowables, the governing factor of safety is <strong>{{clevis_governing_fos}}</strong> for <strong>{{clevis_governing_fos_mode}}</strong>. Before accepting the connection for service, an engineer should also verify material properties, appropriate design factor, bearing, net-section tension, tear-out, pin bending, fatigue if cyclic loading exists, clearances, and manufacturing tolerances.</p>",
        "gradingNotes": "<p>A good response does not overclaim safety from average stress alone. It states what has been checked and what still needs verification.</p>",
        "section": "analysis"
      }
    ],
    "variants": [
      {
        "id": "section-a",
        "title": "Homework Version A - clevis double shear",
        "description": "Default MEEN 305-style sequence for rod normal stress, pin double shear, and interpretation.",
        "selectedQuestions": [
          "q1",
          "q2",
          "q3",
          "q4",
          "q5",
          "q6",
          "q7",
          "q8",
          "q9",
          "q10",
          "q11",
          "q12",
          "q13",
          "q14",
          "q15",
          "q16",
          "q17",
          "q18",
          "q19",
          "q20",
          "q21"
        ],
        "variables": {
          "P": 5,
          "d_1": 40,
          "d_2": 30,
          "d_A": 25,
          "n_s": 2,
          "sigma_allow": 120,
          "tau_allow": 80
        }
      }
    ]
  },
  {
    "id": "MOS-COUPLING-017",
    "slug": "flanged-shaft-coupling",
    "title": "Bolt-Group Design for an Industrial Flanged Shaft Coupling",
    "studentDocumentTitle": "Student Homework Questions",
    "instructorDocumentTitle": "Instructor Answers",
    "summary": "A symbolic and numerical coupling problem comparing solid-shaft torsional stress with direct shear stress in a circular bolt group.",
    "textbookChapters": [
      "Torsion of circular shafts",
      "Direct shear in connectors",
      "Torque equilibrium",
      "Connector sizing"
    ],
    "derivedPlaceholders": [
      "coupling_torque_Nmm",
      "coupling_shaft_J_mm4",
      "coupling_shaft_tau_MPa",
      "coupling_bolt_area_mm2",
      "coupling_n_req",
      "coupling_n_integer",
      "coupling_n_selected",
      "coupling_pattern_assessment",
      "coupling_bolt_force_N",
      "coupling_bolt_tau_MPa",
      "coupling_stress_ratio",
      "coupling_stress_assessment",
      "coupling_recommendation"
    ],
    "image": "problems/flanged-shaft-coupling/assets/coupling-industry-context.png",
    "idealizedImage": "problems/flanged-shaft-coupling/assets/coupling-instructor-idealization.png",
    "idealizedImageAlt": "Instructor reference idealization of two flanged shafts transmitting torque through equally spaced bolts on a circular pattern.",
    "source": "problems/flanged-shaft-coupling/index.html",
    "problemStatement": "<p>A reliability engineer is reviewing a rigid flanged coupling between a rotating driver and a pump. Identical bolts on a circular pattern transfer torque between the mating flanges.</p><p>The simplified model treats the flanges as rigid and assumes uniform direct shear among the bolts. Bolt preload, frictional torque transfer, bending, bearing, fatigue, and local stress concentrations are excluded.</p>",
    "engineeringGoal": "<p>Determine the theoretical bolt count that makes average bolt shear stress no greater than maximum shaft torsional shear stress, select a practical integer bolt pattern, and verify the resulting stress inequality.</p>",
    "variables": [
      {
        "key": "T",
        "symbol": "T",
        "label": "Transmitted torque",
        "value": 2000,
        "unit": "N*m",
        "min": 1,
        "max": 100000,
        "step": 100
      },
      {
        "key": "r",
        "symbol": "r",
        "label": "Solid shaft radius",
        "value": 30,
        "unit": "mm",
        "min": 1,
        "max": 1000,
        "step": 1
      },
      {
        "key": "R",
        "symbol": "R",
        "label": "Bolt-circle radius",
        "value": 100,
        "unit": "mm",
        "min": 1,
        "max": 5000,
        "step": 5
      },
      {
        "key": "d_b",
        "symbol": "d_b",
        "label": "Bolt diameter",
        "value": 10,
        "unit": "mm",
        "min": 0.5,
        "max": 200,
        "step": 0.5
      },
      {
        "key": "n_step",
        "symbol": "Delta_n",
        "label": "Allowed bolt-count increment",
        "value": 1,
        "unit": "bolts",
        "min": 1,
        "max": 12,
        "step": 1
      }
    ],
    "questions": [
      {
        "id": "q1",
        "title": "Primary Function",
        "type": "context interpretation",
        "difficulty": "introductory",
        "tags": [
          "coupling function",
          "coaxial shafts",
          "torque transfer"
        ],
        "learningObjectives": [
          "Identify the coupling's primary mechanical role."
        ],
        "selected": true,
        "student": "<p>State the primary mechanical function of the flanged coupling.</p>",
        "instructor": "<p>The coupling joins two coaxial shafts and transfers torque from the driving shaft to the driven shaft while maintaining rotational continuity.</p>",
        "section": "context"
      },
      {
        "id": "q2",
        "title": "External Loading",
        "type": "load identification",
        "difficulty": "introductory",
        "tags": [
          "applied torque",
          "equal and opposite",
          "steady transmission"
        ],
        "learningObjectives": [
          "Identify the applied torque pair."
        ],
        "selected": true,
        "student": "<p>Identify the external loading represented in the simplified model.</p>",
        "instructor": "<p>Equal and opposite torques of magnitude <em>T</em> act on the two shafts, representing driver input and driven-machine resistance.</p>",
        "section": "context"
      },
      {
        "id": "q3",
        "title": "Torque Load Path",
        "type": "load path",
        "difficulty": "introductory",
        "tags": [
          "shaft",
          "flange",
          "bolt group"
        ],
        "learningObjectives": [
          "Trace torque through the coupling."
        ],
        "selected": true,
        "student": "<p>Trace the torque load path from the driving machine to the driven machine.</p>",
        "instructor": "<p>The path is driving shaft, first flange, bolt group in shear, second flange, driven shaft, and driven machine.</p>",
        "section": "context"
      },
      {
        "id": "q4",
        "title": "Compared Mechanical Responses",
        "type": "mechanics reasoning",
        "difficulty": "introductory",
        "tags": [
          "shaft stress",
          "bolt stress",
          "stress matching"
        ],
        "learningObjectives": [
          "Identify the two stresses compared by the design criterion."
        ],
        "selected": true,
        "student": "<p>Identify the two mechanical responses compared in this problem.</p>",
        "instructor": "<p>The design compares maximum torsional shear stress at the shaft surface with average direct shear stress in each coupling bolt.</p>",
        "section": "context"
      },
      {
        "id": "q5",
        "title": "Relevant Parameters",
        "type": "parameter identification",
        "difficulty": "introductory",
        "tags": [
          "shaft radius",
          "bolt circle",
          "bolt diameter"
        ],
        "learningObjectives": [
          "Identify variables governing shaft and bolt stress."
        ],
        "selected": true,
        "student": "<p>Identify the geometric and loading variables that govern the two stresses.</p>",
        "instructor": "<p>The variables are torque <em>T</em>, shaft radius <em>r</em>, bolt-circle radius <em>R</em>, bolt diameter <em>d</em><sub>b</sub>, and bolt count <em>n</em>.</p>",
        "section": "context"
      },
      {
        "id": "q6",
        "title": "Load-Sharing Interpretation",
        "type": "qualitative reasoning",
        "difficulty": "introductory",
        "tags": [
          "uniform load sharing",
          "tangential force",
          "bolt pattern"
        ],
        "learningObjectives": [
          "Explain the uniform bolt-force assumption."
        ],
        "selected": true,
        "student": "<p>Under the base idealization, why does each bolt carry the same tangential force?</p>",
        "instructor": "<p>The bolts are identical, equally spaced at the same radius, and connected by rigid flanges, so symmetry gives equal tangential force in every bolt.</p>",
        "section": "context"
      },
      {
        "id": "q7",
        "title": "Scope of the Base Problem",
        "type": "model scope",
        "difficulty": "introductory",
        "tags": [
          "excluded checks",
          "pure torque",
          "connector model"
        ],
        "learningObjectives": [
          "Distinguish the base comparison from full coupling design."
        ],
        "selected": true,
        "student": "<p>Identify important real coupling behaviors excluded from the base model.</p>",
        "instructor": "<p>The model excludes preload and frictional torque transfer, bolt bearing, flange flexure, shaft bending, fatigue, fit, alignment, and local stress concentrations.</p>",
        "section": "context"
      },
      {
        "id": "q8",
        "title": "Student-Generated Coupling Idealization",
        "type": "free-body diagram",
        "difficulty": "intermediate",
        "tags": [
          "idealization",
          "circular bolt group",
          "torque"
        ],
        "learningObjectives": [
          "Create a coupling model before viewing the reference figure."
        ],
        "selected": true,
        "student": "<p>Before using the reference figure, draw two coaxial shafts, mating rigid flanges, <em>n</em> equally spaced bolts at radius <em>R</em>, shaft radius <em>r</em>, bolt diameter <em>d</em><sub>b</sub>, and applied torques.</p>",
        "instructor": "<p>A valid model preserves the coaxial shafts, circular bolt pattern, equal torque magnitude on each side, and all symbolic dimensions needed for shaft and bolt stress.</p>",
        "gradingNotes": "<p>A clear 2D or isometric model is acceptable.</p>",
        "section": "transition"
      },
      {
        "id": "q9",
        "title": "Modeling Assumptions",
        "type": "assumptions",
        "difficulty": "intermediate",
        "tags": [
          "rigid flange",
          "direct shear",
          "static torque"
        ],
        "learningObjectives": [
          "State assumptions supporting uniform bolt-group analysis."
        ],
        "selected": true,
        "student": "<p>State the assumptions used in the base mechanics model.</p>",
        "instructor": "<p>Assume solid circular shafts, rigid flanges, identical equally spaced bolts, uniform tangential bolt force, single direct-shear area per bolt, static torque, and neglected preload friction, bending, bearing, fatigue, and stress concentration.</p>",
        "section": "transition"
      },
      {
        "id": "q10",
        "title": "Analysis Plan",
        "type": "analysis planning",
        "difficulty": "intermediate",
        "tags": [
          "shaft torsion",
          "bolt equilibrium",
          "integer selection"
        ],
        "learningObjectives": [
          "Plan the symbolic and numerical design sequence."
        ],
        "selected": true,
        "student": "<p>List the calculation sequence needed to determine and verify the bolt count.</p>",
        "instructor": "<p>Derive shaft stress; write bolt-group torque equilibrium; derive bolt stress; equate the two stresses; solve for theoretical <em>n</em>; round upward to an allowed pattern; and verify the selected bolt stress.</p>",
        "section": "transition"
      },
      {
        "id": "q11",
        "title": "Boundary Conditions and Torque Equilibrium",
        "type": "mechanics setup",
        "difficulty": "introductory",
        "tags": [
          "global equilibrium",
          "internal torque",
          "reference model"
        ],
        "learningObjectives": [
          "Describe steady torque transmission."
        ],
        "selected": true,
        "student": "<p>Describe the boundary/load representation and write the global torque-equilibrium condition.</p>",
        "instructor": "<p>The machine sides apply equal and opposite torques. For steady transmission, the shaft and coupling carry constant internal torque magnitude <strong>{{coupling_torque_Nmm}} N&middot;mm</strong>.</p>",
        "section": "analysis"
      },
      {
        "id": "q12",
        "title": "Maximum Shaft Shear Stress",
        "type": "torsional stress",
        "difficulty": "intermediate",
        "tags": [
          "polar moment",
          "solid shaft",
          "outer surface"
        ],
        "learningObjectives": [
          "Derive and evaluate maximum shaft shear stress."
        ],
        "selected": true,
        "student": "<p>Derive the maximum torsional shear stress in the solid shaft and evaluate it for the assigned values.</p>",
        "instructor": "<p><em>J</em> = &pi;<em>r</em><sup>4</sup>/2 = <strong>{{coupling_shaft_J_mm4}} mm<sup>4</sup></strong>, so &tau;<sub>shaft,max</sub> = <em>Tr/J</em> = 2<em>T</em>/(&pi;<em>r</em><sup>3</sup>) = <strong>{{coupling_shaft_tau_MPa}} MPa</strong>.</p>",
        "section": "analysis"
      },
      {
        "id": "q13",
        "title": "Tangential Force in Each Bolt",
        "type": "bolt-group equilibrium",
        "difficulty": "intermediate",
        "tags": [
          "torque equilibrium",
          "bolt force",
          "uniform sharing"
        ],
        "learningObjectives": [
          "Relate total torque to individual bolt force."
        ],
        "selected": true,
        "student": "<p>Assuming uniform load sharing among <em>n</em> bolts at radius <em>R</em>, determine the tangential force carried by each bolt.</p>",
        "instructor": "<p>Torque equilibrium gives <em>T</em> = <em>nF</em><sub>b</sub><em>R</em>, so <em>F</em><sub>b</sub> = <em>T</em>/(<em>nR</em>). For the selected pattern, <strong><em>F</em><sub>b</sub> = {{coupling_bolt_force_N}} N</strong>.</p>",
        "section": "analysis"
      },
      {
        "id": "q14",
        "title": "Average Shear Stress in Each Bolt",
        "type": "direct shear",
        "difficulty": "intermediate",
        "tags": [
          "bolt area",
          "average shear",
          "connector stress"
        ],
        "learningObjectives": [
          "Derive average bolt shear stress."
        ],
        "selected": true,
        "student": "<p>Derive the average direct shear stress in each bolt.</p>",
        "instructor": "<p><em>A</em><sub>b</sub> = &pi;<em>d</em><sub>b</sub><sup>2</sup>/4 = <strong>{{coupling_bolt_area_mm2}} mm<sup>2</sup></strong>. Therefore &tau;<sub>b</sub> = 4<em>T</em>/(<em>n</em>&pi;<em>R d</em><sub>b</sub><sup>2</sup>).</p>",
        "section": "analysis"
      },
      {
        "id": "q15",
        "title": "Required Theoretical Bolt Count",
        "type": "symbolic design",
        "difficulty": "intermediate",
        "tags": [
          "stress matching",
          "torque cancellation",
          "bolt count"
        ],
        "learningObjectives": [
          "Derive the symbolic minimum bolt count."
        ],
        "selected": true,
        "student": "<p>Set average bolt shear stress equal to maximum shaft shear stress and solve for theoretical bolt count.</p>",
        "instructor": "<p>Equating 4<em>T</em>/(<em>n</em>&pi;<em>R d</em><sub>b</sub><sup>2</sup>) and 2<em>T</em>/(&pi;<em>r</em><sup>3</sup>) gives <em>n</em><sub>req</sub> = 2<em>r</em><sup>3</sup>/(<em>R d</em><sub>b</sub><sup>2</sup>) = <strong>{{coupling_n_req}}</strong>. Torque and &pi; cancel because both stresses scale linearly with torque.</p>",
        "section": "analysis"
      },
      {
        "id": "q16",
        "title": "Practical Integer Selection",
        "type": "component selection",
        "difficulty": "intermediate",
        "tags": [
          "ceiling",
          "bolt pattern",
          "integer design"
        ],
        "learningObjectives": [
          "Convert theoretical count into an allowed bolt pattern."
        ],
        "selected": true,
        "student": "<p>Select the smallest allowed bolt pattern not less than the theoretical requirement.</p>",
        "instructor": "<p>The smallest unrestricted integer is <strong>{{coupling_n_integer}} bolts</strong>. Applying the assigned pattern increment gives <strong>{{coupling_n_selected}} bolts</strong>. {{coupling_pattern_assessment}}</p>",
        "section": "analysis"
      },
      {
        "id": "q17",
        "title": "Selected-Pattern Verification",
        "type": "design verification",
        "difficulty": "intermediate",
        "tags": [
          "bolt stress",
          "shaft stress",
          "stress ratio"
        ],
        "learningObjectives": [
          "Verify the selected bolt pattern against the criterion."
        ],
        "selected": true,
        "student": "<p>Calculate bolt force and bolt shear stress for the selected pattern, then verify the stress inequality.</p>",
        "instructor": "<p>Each selected bolt carries <strong>{{coupling_bolt_force_N}} N</strong>, producing <strong>&tau;<sub>b</sub> = {{coupling_bolt_tau_MPa}} MPa</strong>. The ratio &tau;<sub>b</sub>/&tau;<sub>shaft,max</sub> is <strong>{{coupling_stress_ratio}}</strong>. {{coupling_stress_assessment}}</p>",
        "section": "analysis"
      },
      {
        "id": "q18",
        "title": "Sensitivity and Design Modification",
        "type": "design reasoning",
        "difficulty": "intermediate",
        "tags": [
          "scaling",
          "shaft radius",
          "bolt geometry"
        ],
        "learningObjectives": [
          "Interpret parameter sensitivity from the symbolic result."
        ],
        "selected": true,
        "student": "<p>Explain how changing <em>r</em>, <em>R</em>, or <em>d</em><sub>b</sub> affects required bolt count.</p>",
        "instructor": "<p>The requirement scales as <em>n</em> proportional to <em>r</em><sup>3</sup>, 1/<em>R</em>, and 1/<em>d</em><sub>b</sub><sup>2</sup>. Increasing bolt-circle radius or bolt diameter reduces required count, while increasing shaft radius raises it strongly under this stress-matching criterion.</p>",
        "section": "analysis"
      },
      {
        "id": "q19",
        "title": "Engineering Assessment",
        "type": "engineering judgment",
        "difficulty": "advanced",
        "tags": [
          "recommendation",
          "limitations",
          "coupling design"
        ],
        "learningObjectives": [
          "Make a bounded bolt-pattern recommendation."
        ],
        "selected": true,
        "student": "<p>Provide a concise mechanics-based recommendation for the bolt pattern and identify omitted design checks.</p>",
        "instructor": "<p>{{coupling_recommendation}}</p><p>A complete design must also check bolt bearing and fatigue, flange strength and flexure, preload and friction, shaft-hub details, fit, alignment, stress concentrations, and applicable coupling standards.</p>",
        "gradingNotes": "<p>The recommendation must be limited to the stated stress-matching model.</p>",
        "section": "analysis"
      }
    ],
    "variants": [
      {
        "id": "section-a",
        "title": "Homework Version A - baseline flanged coupling",
        "description": "Default sequence for shaft stress, bolt-group equilibrium, symbolic bolt count, practical selection, and verification.",
        "selectedQuestions": [
          "q1",
          "q2",
          "q3",
          "q4",
          "q5",
          "q6",
          "q7",
          "q8",
          "q9",
          "q10",
          "q11",
          "q12",
          "q13",
          "q14",
          "q15",
          "q16",
          "q17",
          "q18",
          "q19"
        ],
        "variables": {
          "T": 2000,
          "r": 30,
          "R": 100,
          "d_b": 10,
          "n_step": 1
        }
      }
    ]
  },
  {
    "id": "MOS-PRESS-006",
    "slug": "hydraulic-press-punching-shear",
    "title": "Hydraulic Press Punching Shear and Bearing Stress Check",
    "studentDocumentTitle": "Student Homework Questions",
    "instructorDocumentTitle": "Instructor Answers",
    "summary": "A context-rich mechanics problem on average bearing stress and punching shear stress in a press-loaded plate.",
    "textbookChapters": [
      "Stress and strain",
      "Shear stress",
      "Bearing stress",
      "Factor of safety"
    ],
    "derivedPlaceholders": [
      "press_load_N",
      "press_bearing_area_mm2",
      "press_punching_area_mm2",
      "press_bearing_stress_MPa",
      "press_punching_shear_MPa",
      "press_larger_stress",
      "press_larger_stress_MPa",
      "press_fos_shear",
      "press_fos_bearing",
      "press_governing_fos_mode",
      "press_governing_fos"
    ],
    "image": "problems/hydraulic-press-punching-shear/assets/press-industry-context.png",
    "idealizedImage": "problems/hydraulic-press-punching-shear/assets/press-instructor-idealization.png",
    "idealizedImageAlt": "Instructor idealization showing the press ram, plate, bearing area, and punching shear sections.",
    "source": "problems/hydraulic-press-punching-shear/index.html",
    "problemStatement": "<p>A manufacturing engineering team is evaluating a hydraulic press fixture used to apply a vertical compressive load through a cylindrical ram onto a flat metal plate. The plate is supported by two fixture blocks with an opening beneath the loaded region. This type of setup appears in pressing operations, material testing, tooling qualification, and shop-floor fixtures where concentrated loads are introduced into relatively thin plates.</p><p>As a junior mechanical or manufacturing engineer, you must identify how the load is transferred from the ram into the supported plate and determine the average stress quantities that are relevant to the simplified Solid Mechanics model. The analysis focuses on two different average-stress mechanisms: bearing stress under the ram and punching shear stress through the plate along sections AC and BD.</p>",
    "engineeringGoal": "<p>Determine the average punching shear stress developed in the plate along sections AC and BD, and determine the average bearing stress on the plate surface under the cylindrical ram. Use these results to identify which simplified stress quantity is larger and state what additional material data would be needed before accepting the fixture for service.</p>",
    "variables": [
      {
        "key": "P",
        "symbol": "P",
        "label": "Applied compressive load",
        "value": 40,
        "unit": "kN",
        "min": 1,
        "max": 300,
        "step": 1
      },
      {
        "key": "d",
        "symbol": "d",
        "label": "Ram / shaft diameter",
        "value": 50,
        "unit": "mm",
        "min": 5,
        "max": 250,
        "step": 1
      },
      {
        "key": "t",
        "symbol": "t",
        "label": "Plate thickness",
        "value": 10,
        "unit": "mm",
        "min": 1,
        "max": 80,
        "step": 1
      },
      {
        "key": "s",
        "symbol": "s",
        "label": "Support opening distance",
        "value": 60,
        "unit": "mm",
        "min": 10,
        "max": 400,
        "step": 5
      },
      {
        "key": "b",
        "symbol": "b",
        "label": "Overall plate/support width in idealized view",
        "value": 120,
        "unit": "mm",
        "min": 20,
        "max": 800,
        "step": 5
      },
      {
        "key": "tau_allow",
        "symbol": "tau_allow",
        "label": "Optional allowable punching shear stress",
        "value": 80,
        "unit": "MPa",
        "min": 5,
        "max": 500,
        "step": 5
      },
      {
        "key": "sigma_bearing_allow",
        "symbol": "sigma_bearing_allow",
        "label": "Optional allowable bearing stress",
        "value": 120,
        "unit": "MPa",
        "min": 5,
        "max": 800,
        "step": 5
      }
    ],
    "questions": [
      {
        "id": "q1",
        "title": "Primary Function of the System",
        "selected": true,
        "tags": [
          "context",
          "load transfer",
          "fixture"
        ],
        "type": "conceptual",
        "difficulty": "introductory",
        "learningObjectives": [
          "Connect the physical press setup to load transfer",
          "Identify local plate stress concerns"
        ],
        "student": "<p>What is the primary structural function of the press fixture system?</p>",
        "instructor": "<p>The system transfers a compressive load from a hydraulic press ram into a flat metal plate and then into the support blocks and press table. The plate must resist local contact/bearing stress under the ram and possible punching shear through its thickness.</p><p>Students should connect the physical setup to load transfer, not describe the entire press machine in broad terms.</p>",
        "section": "context"
      },
      {
        "id": "q2",
        "title": "External Load",
        "selected": true,
        "tags": [
          "loading",
          "ram"
        ],
        "type": "conceptual",
        "difficulty": "introductory",
        "learningObjectives": [
          "Identify where the load is applied",
          "Relate the press ram to the idealized load"
        ],
        "student": "<p>Where is the external load applied, and what is its direction?</p>",
        "instructor": "<p>The external load <em>P</em> is applied vertically downward through the cylindrical ram onto the top surface of the flat plate.</p><p>The industry image has no labels; students should use the problem statement and idealized diagram to identify the load.</p>",
        "section": "context"
      },
      {
        "id": "q3",
        "title": "Supports and Boundary Conditions",
        "selected": true,
        "tags": [
          "supports",
          "boundary conditions"
        ],
        "type": "conceptual",
        "difficulty": "introductory",
        "learningObjectives": [
          "Identify simplified supports",
          "Distinguish local stress checks from beam bending analysis"
        ],
        "student": "<p>Identify the supports or boundary constraints in the idealized fixture model.</p>",
        "instructor": "<p>The plate is supported from below by two support blocks on either side of the opening. In the simplified model, the supports provide upward reaction forces to the plate while the central region between the supports is unsupported.</p><p>This is not a fixed-end beam problem for the base analysis; the focus is average bearing and punching shear.</p>",
        "section": "context"
      },
      {
        "id": "q4",
        "title": "Load Path",
        "selected": true,
        "tags": [
          "load path",
          "bearing",
          "punching shear"
        ],
        "type": "conceptual",
        "difficulty": "introductory",
        "learningObjectives": [
          "Trace load from ram to fixture base",
          "Name the contact and shear-transfer regions"
        ],
        "student": "<p>Using the component list, trace the load path from the press ram to the fixture base.</p>",
        "instructor": "<p>One acceptable load path is: hydraulic ram &rarr; bearing contact region on top of the plate &rarr; plate material around the loaded region &rarr; punching shear sections AC and BD &rarr; support blocks &rarr; press table/fixture base.</p><p>The key point is that the load does not vanish at the plate; it must transfer through contact and shear regions into the supports.</p>",
        "section": "context"
      },
      {
        "id": "q5",
        "title": "Critical Components and Locations",
        "selected": true,
        "tags": [
          "critical locations",
          "plate"
        ],
        "type": "conceptual",
        "difficulty": "introductory",
        "learningObjectives": [
          "Identify critical locations for average stress checks",
          "Separate included and excluded components"
        ],
        "student": "<p>Which components or locations are likely to be critical for this simplified problem?</p>",
        "instructor": "<p>The flat plate is the critical component. The important locations are the contact area directly under the ram and the potential punching shear sections AC and BD through the plate thickness.</p><p>Students may mention support blocks, but the base problem provides geometry for the plate stress checks only.</p>",
        "section": "context"
      },
      {
        "id": "q6",
        "title": "Critical Mechanical Response",
        "selected": true,
        "tags": [
          "bearing stress",
          "punching shear"
        ],
        "type": "conceptual",
        "difficulty": "introductory to intermediate",
        "learningObjectives": [
          "Distinguish bearing stress from punching shear stress",
          "Identify the relevant stress mechanism at each location"
        ],
        "student": "<p>For each critical location, identify the relevant mechanical response or failure mechanism considered in this problem.</p>",
        "instructor": "<p>At the top surface under the ram, the relevant response is average bearing/compressive contact stress. Along sections AC and BD, the relevant response is average punching shear stress through the plate thickness.</p><p>Bending, contact nonlinearity, local yielding, and plastic deformation are not included in the simplified calculation.</p>",
        "section": "context"
      },
      {
        "id": "q7",
        "title": "Relevant Geometric and Load Parameters",
        "selected": true,
        "tags": [
          "geometry",
          "area",
          "average stress"
        ],
        "type": "conceptual",
        "difficulty": "introductory",
        "learningObjectives": [
          "Identify variables controlling bearing and punching shear",
          "Connect area definitions to stress definitions"
        ],
        "student": "<p>Identify the geometric and load parameters that control the bearing stress and punching shear stress.</p>",
        "instructor": "<p>The relevant parameters are applied load <em>P</em>, ram diameter <em>d</em>, plate thickness <em>t</em>, support opening distance <em>s</em>, and overall plate/support width <em>b</em>. For the simplified calculations here, bearing stress is controlled by the contact area under the ram, and punching shear is controlled by the shear area through sections AC and BD.</p><p>Students should connect area definitions to stress definitions rather than simply listing dimensions.</p>",
        "section": "context"
      },
      {
        "id": "q8",
        "title": "Student-Generated Structural Idealization",
        "selected": true,
        "tags": [
          "idealization",
          "stress surfaces",
          "modeling"
        ],
        "type": "fbd/modeling",
        "difficulty": "introductory to intermediate",
        "learningObjectives": [
          "Translate a press setup into an average-stress model",
          "Identify bearing and punching shear surfaces"
        ],
        "student": "<p>Convert the real hydraulic press fixture into a simplified Mechanics of Materials model. Your sketch should show the cylindrical ram, flat plate, support blocks, applied load <em>P</em>, plate thickness <em>t</em>, ram diameter <em>d</em>, support opening <em>s</em>, total plate/support width <em>b</em>, and the potential punching shear sections AC and BD.</p><p>Student model placeholder: insert or draw the simplified model and load-transfer/stress-surface diagram here.</p>",
        "instructor": "<p>A correct idealization shows a vertical load <em>P</em> applied through the ram onto the plate, bearing stress distributed over the ram contact area, and two vertical punching shear sections AC and BD through the plate thickness at the loaded region.</p><p>For the student packet, provide a blank sketch space first. The instructor reference diagram can be shown after students attempt their own model if desired.</p>",
        "section": "transition"
      },
      {
        "id": "q9",
        "title": "Modeling Assumptions",
        "selected": true,
        "tags": [
          "assumptions",
          "average stress"
        ],
        "type": "conceptual",
        "difficulty": "introductory to intermediate",
        "learningObjectives": [
          "State simplifying assumptions for average stress",
          "Identify excluded effects"
        ],
        "student": "<p>State the assumptions used to convert the real press setup into the simplified Solid Mechanics model.</p>",
        "instructor": "<p>Assumptions may include static vertical load; ram is rigid relative to the plate; plate is checked using average stress; bearing stress is uniformly distributed over the idealized contact footprint; punching shear is uniformly distributed over sections AC and BD; support blocks are rigid; and stress concentrations, plate bending, plasticity, contact nonlinearity, and friction are neglected.</p><p>Expected answers do not need every assumption but should include the average-stress idealization.</p>",
        "section": "transition"
      },
      {
        "id": "q10",
        "title": "Mechanics Analysis Plan",
        "selected": true,
        "tags": [
          "analysis plan",
          "area",
          "stress"
        ],
        "type": "calculation planning",
        "difficulty": "introductory",
        "learningObjectives": [
          "Plan the average-stress calculation sequence",
          "Select the correct areas before applying stress formulas"
        ],
        "student": "<p>Before calculating, describe the analysis sequence needed to determine punching shear stress and bearing stress.</p>",
        "instructor": "<p>The analysis sequence is: identify the load <em>P</em>; identify the contact/bearing area under the ram; identify the punching shear area along sections AC and BD; calculate &tau;<sub>p</sub> = <em>P</em>/<em>A</em><sub>p</sub> for punching shear; calculate &sigma;<sub>b</sub> = <em>P</em>/<em>A</em><sub>b</sub> for bearing stress; compare the stress magnitudes; and state what material allowables would be needed for a design decision.</p><p>This helps students organize the calculation before substituting values.</p>",
        "section": "transition"
      },
      {
        "id": "q11",
        "title": "Boundary and Loading Conditions from Instructor Diagram",
        "selected": true,
        "tags": [
          "loading",
          "supports",
          "diagram interpretation"
        ],
        "type": "conceptual",
        "difficulty": "introductory",
        "learningObjectives": [
          "Read load and support conditions from the idealized diagram",
          "Focus on local stress instead of support reactions"
        ],
        "student": "<p>From the instructor diagram, identify the loading and support conditions used in the simplified model.</p>",
        "instructor": "<p>The cylindrical ram applies a downward compressive load <em>P</em> to the plate. The plate is supported below by two rigid support blocks on either side of the opening. The model focuses on local bearing under the ram and punching shear through sections AC and BD.</p><p>This replaces a full support-reaction analysis because the base learning goal is average stress, not beam bending.</p>",
        "section": "analysis"
      },
      {
        "id": "q12",
        "title": "Potential Failure or Stress Surfaces",
        "selected": true,
        "tags": [
          "stress surfaces",
          "bearing",
          "punching shear"
        ],
        "type": "conceptual",
        "difficulty": "introductory",
        "learningObjectives": [
          "Identify the surfaces over which stresses are evaluated",
          "Distinguish contact area from shear-through-thickness area"
        ],
        "student": "<p>Identify the surfaces over which bearing stress and punching shear stress are evaluated.</p>",
        "instructor": "<p>Bearing stress is evaluated over the idealized contact footprint under the ram. Punching shear stress is evaluated through the plate thickness along sections AC and BD.</p><p>Students should distinguish a surface contact area from a shear-through-thickness area.</p>",
        "section": "analysis"
      },
      {
        "id": "q13",
        "title": "Bearing Area Under the Ram",
        "selected": true,
        "tags": [
          "bearing area",
          "contact area"
        ],
        "type": "calculation",
        "difficulty": "introductory",
        "learningObjectives": [
          "Compute circular contact area",
          "Use the stated bearing-area convention"
        ],
        "student": "<p>Determine the idealized contact area used to calculate average bearing stress under the cylindrical ram.</p>",
        "instructor": "<p>Using a circular contact footprint, <em>A</em><sub>b</sub> = &pi;<em>d</em><sup>2</sup>/4. With <em>d</em> = {{d}} {{d_unit}}, <em>A</em><sub>b</sub> = &pi;({{d}} mm)<sup>2</sup>/4 = {{press_bearing_area_mm2}} mm<sup>2</sup>.</p><p>If an instructor wants a projected rectangular bearing area instead, that convention should be stated explicitly. This filled example uses the circular footprint area.</p>",
        "section": "analysis"
      },
      {
        "id": "q14",
        "title": "Punching Shear Area Along Sections AC and BD",
        "selected": true,
        "tags": [
          "punching shear area",
          "through-thickness shear"
        ],
        "type": "calculation",
        "difficulty": "introductory",
        "learningObjectives": [
          "Compute the two-section punching shear area",
          "Use plate thickness in the shear area"
        ],
        "student": "<p>Determine the total idealized punching shear area through sections AC and BD.</p>",
        "instructor": "<p>Each punching shear section has idealized area <em>dt</em>. Since there are two sections, <em>A</em><sub>p</sub> = 2<em>dt</em>. With <em>d</em> = {{d}} {{d_unit}} and <em>t</em> = {{t}} {{t_unit}}, <em>A</em><sub>p</sub> = 2({{d}})({{t}}) = {{press_punching_area_mm2}} mm<sup>2</sup>.</p><p>This calculation uses the simplified two-section punching shear idealization shown in the instructor diagram.</p>",
        "section": "analysis"
      },
      {
        "id": "q15",
        "title": "Average Punching Shear Stress",
        "selected": true,
        "tags": [
          "punching shear stress",
          "average stress"
        ],
        "type": "calculation",
        "difficulty": "introductory",
        "learningObjectives": [
          "Calculate average punching shear stress",
          "Use N and mm units to obtain MPa"
        ],
        "student": "<p>Calculate the average punching shear stress developed in the plate along sections AC and BD.</p>",
        "instructor": "<p>Convert the load to N: <em>P</em> = {{press_load_N}} N. Then &tau;<sub>p</sub> = <em>P</em>/<em>A</em><sub>p</sub> = {{press_load_N}}/{{press_punching_area_mm2}} = {{press_punching_shear_MPa}} MPa.</p><p>Use N and mm units so N/mm<sup>2</sup> = MPa.</p>",
        "section": "analysis"
      },
      {
        "id": "q16",
        "title": "Average Bearing Stress Under the Ram",
        "selected": true,
        "tags": [
          "bearing stress",
          "contact stress"
        ],
        "type": "calculation",
        "difficulty": "introductory",
        "learningObjectives": [
          "Calculate average bearing stress",
          "Interpret bearing as compressive contact stress"
        ],
        "student": "<p>Calculate the average bearing stress developed on the plate surface under the cylindrical ram.</p>",
        "instructor": "<p>&sigma;<sub>b</sub> = <em>P</em>/<em>A</em><sub>b</sub> = {{press_load_N}}/{{press_bearing_area_mm2}} = {{press_bearing_stress_MPa}} MPa.</p><p>This is an average compressive contact stress, not a tensile stress.</p>",
        "section": "analysis"
      },
      {
        "id": "q17",
        "title": "Compare Stress Magnitudes",
        "selected": true,
        "tags": [
          "comparison",
          "engineering interpretation"
        ],
        "type": "calculation",
        "difficulty": "introductory to intermediate",
        "learningObjectives": [
          "Compare average stress magnitudes",
          "Avoid declaring failure without allowables"
        ],
        "student": "<p>Compare the calculated average punching shear stress and average bearing stress. Which stress quantity is larger?</p>",
        "instructor": "<p>Using the stated idealization, &tau;<sub>p</sub> = {{press_punching_shear_MPa}} MPa and &sigma;<sub>b</sub> = {{press_bearing_stress_MPa}} MPa. The larger average stress quantity is {{press_larger_stress}} = {{press_larger_stress_MPa}} MPa.</p><p>Larger stress magnitude does not automatically mean governing failure unless shear and bearing allowables are known.</p>",
        "section": "analysis"
      },
      {
        "id": "q18",
        "title": "Strength Factor of Safety and Mechanics-Based Modification",
        "selected": true,
        "tags": [
          "factor of safety",
          "design modification"
        ],
        "type": "decision",
        "difficulty": "introductory to intermediate",
        "learningObjectives": [
          "Compute optional factors of safety",
          "Recommend modifications based on stress-area relationships"
        ],
        "student": "<p>If allowable bearing and shear stresses are provided by the instructor, determine the factor of safety for bearing and punching shear. If the plate does not meet the required strength criterion, identify a mechanics-based modification that would reduce bearing stress or punching shear stress.</p>",
        "instructor": "<p>Using the optional allowables in the current input set, FOS<sub>shear</sub> = &tau;<sub>allow</sub>/&tau;<sub>p</sub> = {{tau_allow}}/{{press_punching_shear_MPa}} = {{press_fos_shear}}, and FOS<sub>bearing</sub> = &sigma;<sub>bearing,allow</sub>/&sigma;<sub>b</sub> = {{sigma_bearing_allow}}/{{press_bearing_stress_MPa}} = {{press_fos_bearing}}. The smaller simplified factor of safety is {{press_governing_fos}} for {{press_governing_fos_mode}}.</p><p>Possible modifications include increasing plate thickness <em>t</em> to reduce punching shear stress, increasing ram diameter <em>d</em> or using a load-spreading pad to reduce bearing stress, reducing load <em>P</em>, using a stronger plate material, or changing the support geometry to reduce local failure risk.</p>",
        "section": "analysis"
      },
      {
        "id": "q19",
        "title": "Engineering Assessment and Recommendation",
        "selected": true,
        "tags": [
          "recommendation",
          "limitations",
          "missing data"
        ],
        "type": "decision",
        "difficulty": "introductory to intermediate",
        "learningObjectives": [
          "Make a limited mechanics-based recommendation",
          "State missing material data and excluded checks"
        ],
        "student": "<p>Use the mechanics results to make a limited engineering recommendation. Identify the larger calculated average stress and state what additional information is needed before accepting the fixture for service.</p>",
        "instructor": "<p>For the stated data and idealization, &tau;<sub>p</sub> = {{press_punching_shear_MPa}} MPa and &sigma;<sub>b</sub> = {{press_bearing_stress_MPa}} MPa. The larger average stress is {{press_larger_stress}}.</p><p>However, accepting the fixture requires allowable shear stress, allowable bearing/compressive stress, required factor of safety, and possibly checks for plate bending, yielding, plastic indentation, contact nonlinearity, support deformation, and fixture alignment. The final recommendation should not overclaim safety without material allowables.</p>",
        "section": "analysis"
      }
    ],
    "variants": [
      {
        "id": "section-a",
        "title": "Homework Version A - punching shear and bearing",
        "description": "Default MEEN 305-style sequence for bearing area, punching shear area, average stresses, and interpretation.",
        "selectedQuestions": [
          "q1",
          "q2",
          "q3",
          "q4",
          "q5",
          "q6",
          "q7",
          "q8",
          "q9",
          "q10",
          "q11",
          "q12",
          "q13",
          "q14",
          "q15",
          "q16",
          "q17",
          "q18",
          "q19"
        ],
        "variables": {
          "P": 40,
          "d": 50,
          "t": 10,
          "s": 60,
          "b": 120,
          "tau_allow": 80,
          "sigma_bearing_allow": 120
        }
      }
    ]
  },
  {
    "id": "MOS-JIB-001",
    "slug": "jib-crane-battery-pack",
    "title": "Wall-Mounted Swing-Jib Crane for Battery-Pack Handling",
    "studentDocumentTitle": "Student Homework Questions",
    "instructorDocumentTitle": "Instructor Answers",
    "summary": "A context-rich mechanics problem on preliminary design and evaluation of a wall-mounted swing-jib crane used to handle automotive battery packs.",
    "textbookChapters": [
      "Stress and strain",
      "Axial loading",
      "Shear stress",
      "Bending stress",
      "Beam deflection",
      "Buckling",
      "Fatigue"
    ],
    "derivedPlaceholders": [
      "P_design_N",
      "horizontal_moment_Nm",
      "governing_support_moment_Nm",
      "wall_moment_Nm",
      "braced_boom_moment_Nm",
      "brace_vertical_N",
      "brace_force_N",
      "brace_horizontal_N",
      "wall_pin_reaction_x_N",
      "wall_pin_reaction_y_N",
      "pin_area_mm2",
      "pin_shear_MPa",
      "bearing_MPa",
      "yield_allow_MPa",
      "braced_boom_bending_MPa",
      "boom_bending_MPa",
      "tip_deflection_mm",
      "brace_stress_MPa",
      "brace_length_m",
      "brace_slenderness",
      "brace_buckling_N",
      "brace_buckling_allow_N",
      "boom_yield_margin",
      "brace_yield_margin",
      "boom_stress_utilization",
      "deflection_utilization",
      "brace_yield_utilization",
      "brace_buckling_utilization",
      "pin_shear_utilization",
      "bearing_utilization",
      "governing_utilization",
      "governing_mode",
      "design_recommendation"
    ],
    "image": "problems/jib-crane-battery-pack/assets/jib-crane-industry.png",
    "idealizedImage": "problems/jib-crane-battery-pack/assets/jib-crane-industry-2d.png",
    "idealizedImageAlt": "Instructor reference idealization of the swing-jib crane geometry, loads, boom, brace, and wall supports.",
    "source": "problems/jib-crane-battery-pack/index.html",
    "problemStatement": "<p>You are a manufacturing engineer responsible for the preliminary design of a compact, wall-mounted swing-jib crane for an automotive assembly line. The crane will lift battery packs from a staging fixture, move them through a restricted workstation, and position them for installation into vehicle frames.</p><p>The crane will operate repeatedly throughout each production shift. During a typical cycle, the battery pack is lifted, translated along the boom, rotated about the wall-mounted support, stopped, positioned, and lowered into the vehicle frame. The crane must therefore provide adequate strength, stiffness, stability, fatigue resistance, positioning accuracy, and operational safety.</p><p>Only a preliminary concept image and variable-based geometry are currently available. The final dimensions, structural materials, connection details, operating speed, allowable deflection, and design load have not yet been fully specified.</p>",
    "engineeringGoal": "<p>Determine whether the proposed swing-jib crane configuration can be developed into a safe and practical system for lifting automotive battery packs.</p><p>Your recommendation should identify a defensible design load, critical dimensions and materials, an appropriate two-dimensional structural model, forces transmitted through major members and connections, governing strength and serviceability criteria, likely controlling failure modes, and whether the concept should be accepted for detailed design, modified, or rejected.</p>",
    "variables": [
      {
        "key": "L",
        "symbol": "L",
        "label": "Boom length",
        "value": 2.4,
        "unit": "m",
        "min": 0.5,
        "max": 6,
        "step": 0.1
      },
      {
        "key": "Lb",
        "symbol": "L_b",
        "label": "Brace attachment distance",
        "value": 1.6,
        "unit": "m",
        "min": 0.3,
        "max": 5,
        "step": 0.1
      },
      {
        "key": "theta",
        "symbol": "theta",
        "label": "Brace angle",
        "value": 35,
        "unit": "deg",
        "min": 15,
        "max": 75,
        "step": 1
      },
      {
        "key": "M",
        "symbol": "M",
        "label": "Battery pack mass",
        "value": 450,
        "unit": "kg",
        "min": 100,
        "max": 1000,
        "step": 10
      },
      {
        "key": "H",
        "symbol": "H",
        "label": "Horizontal service load",
        "value": 500,
        "unit": "N",
        "min": 0,
        "max": 3000,
        "step": 25
      },
      {
        "key": "e_H",
        "symbol": "e_H",
        "label": "Vertical offset of horizontal load below boom centerline",
        "value": 0.3,
        "unit": "m",
        "min": 0,
        "max": 1.5,
        "step": 0.05
      },
      {
        "key": "gamma_d",
        "symbol": "gamma_d",
        "label": "Dynamic load factor",
        "value": 1.25,
        "unit": "-",
        "min": 1,
        "max": 2,
        "step": 0.05
      },
      {
        "key": "S_boom",
        "symbol": "S",
        "label": "Boom section modulus",
        "value": 85000,
        "unit": "mm^3",
        "min": 20000,
        "max": 300000,
        "step": 5000
      },
      {
        "key": "I_boom",
        "symbol": "I",
        "label": "Boom second moment of area",
        "value": 8500000,
        "unit": "mm^4",
        "min": 1000000,
        "max": 50000000,
        "step": 500000
      },
      {
        "key": "E",
        "symbol": "E",
        "label": "Steel elastic modulus",
        "value": 200000,
        "unit": "MPa",
        "min": 180000,
        "max": 210000,
        "step": 1000
      },
      {
        "key": "A_brace",
        "symbol": "A_b",
        "label": "Brace cross-sectional area",
        "value": 650,
        "unit": "mm^2",
        "min": 150,
        "max": 3000,
        "step": 50
      },
      {
        "key": "d_pin",
        "symbol": "d_p",
        "label": "Brace pin diameter",
        "value": 20,
        "unit": "mm",
        "min": 8,
        "max": 60,
        "step": 1
      },
      {
        "key": "t_plate",
        "symbol": "t",
        "label": "Connection plate thickness",
        "value": 12,
        "unit": "mm",
        "min": 4,
        "max": 40,
        "step": 1
      },
      {
        "key": "sigma_y",
        "symbol": "sigma_y",
        "label": "Steel yield strength",
        "value": 250,
        "unit": "MPa",
        "min": 200,
        "max": 550,
        "step": 10
      },
      {
        "key": "N_y",
        "symbol": "N_y",
        "label": "Yield safety factor",
        "value": 2,
        "unit": "-",
        "min": 1,
        "max": 5,
        "step": 0.1
      },
      {
        "key": "delta_allow",
        "symbol": "delta_allow",
        "label": "Allowable load-point deflection",
        "value": 10,
        "unit": "mm",
        "min": 1,
        "max": 50,
        "step": 1
      },
      {
        "key": "K_brace",
        "symbol": "K",
        "label": "Brace effective-length factor",
        "value": 1,
        "unit": "-",
        "min": 0.5,
        "max": 2,
        "step": 0.05
      },
      {
        "key": "r_min",
        "symbol": "r_min",
        "label": "Brace minimum radius of gyration",
        "value": 28,
        "unit": "mm",
        "min": 5,
        "max": 100,
        "step": 1
      },
      {
        "key": "I_brace",
        "symbol": "I_b",
        "label": "Brace second moment of area for buckling",
        "value": 1200000,
        "unit": "mm^4",
        "min": 50000,
        "max": 10000000,
        "step": 50000
      },
      {
        "key": "N_b",
        "symbol": "N_b",
        "label": "Buckling safety factor",
        "value": 2,
        "unit": "-",
        "min": 1,
        "max": 5,
        "step": 0.1
      },
      {
        "key": "n_s",
        "symbol": "n_s",
        "label": "Number of pin shear planes",
        "value": 1,
        "unit": "-",
        "min": 1,
        "max": 2,
        "step": 1
      },
      {
        "key": "tau_allow",
        "symbol": "tau_allow",
        "label": "Allowable average pin shear stress",
        "value": 80,
        "unit": "MPa",
        "min": 20,
        "max": 250,
        "step": 5
      },
      {
        "key": "bearing_allow",
        "symbol": "sigma_bearing_allow",
        "label": "Allowable plate bearing stress",
        "value": 150,
        "unit": "MPa",
        "min": 50,
        "max": 500,
        "step": 10
      }
    ],
    "questions": [
      {
        "id": "q1",
        "title": "Design, Manufacturing, and Commercialization Considerations",
        "selected": true,
        "tags": [
          "design",
          "safety",
          "manufacturing"
        ],
        "type": "conceptual",
        "difficulty": "introductory",
        "learningObjectives": [
          "Identify design requirements",
          "Distinguish safety and commercial constraints"
        ],
        "gradingNotes": "<p>Look for reasoning tied to the crane's actual operating environment, not only a list of generic design words.</p>",
        "student": "<p>The proposed wall-mounted swing-jib crane will be used to handle a battery pack with mass <strong>{{M}} {{M_unit}}</strong>. The idealized boom length is <strong>{{L}} {{L_unit}}</strong>.</p><p>Identify the functional, safety, manufacturing, installation, maintenance, and commercial considerations that should influence the crane design. Conclude by naming the three most important requirements that must be satisfied before production use.</p>",
        "instructor": "<p>Strong answers should connect the crane to rated lifting capacity, reach, swing range, trolley travel, positioning accuracy, workspace limits, certified lifting hardware, operator safety, inspection, downtime, cost, and product liability.</p><p>The three most defensible governing requirements are safe support of rated and dynamically amplified loads, acceptable stiffness/positioning accuracy, and adequate reliability or fatigue life under repeated production cycles.</p>",
        "section": "context"
      },
      {
        "id": "q2",
        "title": "Material Selection",
        "selected": true,
        "tags": [
          "materials",
          "fatigue",
          "manufacturing"
        ],
        "type": "conceptual",
        "difficulty": "introductory",
        "learningObjectives": [
          "Select materials by component function",
          "Compare stiffness, strength, fatigue, and manufacturability"
        ],
        "student": "<p>Recommend appropriate material classes for the boom, brace, pins, mounting plates, bolts, anchors, chain, hook, and hoist hardware. Explain which material properties matter most for each component.</p><p>Your answer should distinguish between stiffness, yielding, ultimate failure, fatigue resistance, toughness, wear resistance, weldability, machinability, cost, and availability.</p>",
        "instructor": "<p>Representative answers should usually favor structural steel for the boom and brace because stiffness, weldability, availability, and cost matter. Pins may require higher-strength or heat-treated steel because shear, bending, bearing, wear, and fatigue are important.</p><p>Hooks, chains, hoists, and below-the-hook lifting fixtures should be selected as rated and traceable lifting components, not merely sized from nominal material strength.</p>",
        "section": "context"
      },
      {
        "id": "q3",
        "title": "Critical Geometrical Parameters",
        "selected": true,
        "tags": [
          "geometry",
          "load path",
          "connections"
        ],
        "type": "modeling",
        "difficulty": "introductory to intermediate",
        "learningObjectives": [
          "Classify system, member, and connection geometry",
          "Explain how geometry affects load transfer"
        ],
        "student": "<p>The proposed geometry uses boom length <strong>{{L}} {{L_unit}}</strong>, brace attachment distance <strong>{{Lb}} {{Lb_unit}}</strong>, and brace angle <strong>{{theta}} {{theta_unit}}</strong>.</p><p>Classify the geometrical parameters that most strongly affect load transfer, stress, deflection, stability, fatigue life, and connection performance as system-level, member-level, or connection-level geometry.</p>",
        "instructor": "<p>System-level dimensions include boom length, trolley/load position, wall-support spacing, brace angle, swing angle, and hook height. Member-level dimensions include area, second moment of area, section modulus, wall thickness, unsupported brace length, radius of gyration, and effective length. Connection-level dimensions include pin diameter, hole diameter, plate thickness, weld size, edge distance, bolt spacing, and eccentricity.</p><p>Increasing load position along the boom increases the wall moment and generally increases boom bending, connection force, and deflection.</p>",
        "section": "context"
      },
      {
        "id": "q4",
        "title": "Loading Identification and Design Load",
        "selected": true,
        "tags": [
          "loading",
          "estimation",
          "dynamics"
        ],
        "type": "estimation",
        "difficulty": "intermediate",
        "learningObjectives": [
          "Estimate design loads",
          "Classify static, dynamic, impact, cyclic, and accidental loads"
        ],
        "commonMistakes": "<p>Common mistakes include using only battery dead weight, ignoring fixture/hoist weight, and treating dynamic amplification as a universal constant.</p>",
        "student": "<p>The battery pack mass is <strong>{{M}} {{M_unit}}</strong> and the horizontal service load is estimated as <strong>{{H}} {{H_unit}}</strong>. Develop a preliminary loading model for the crane.</p><p>Classify each relevant load as static, quasi-static, dynamic, impact, cyclic, or accidental. Clearly distinguish nominal service load, maximum expected service load, maximum credible load, and factored design load.</p>",
        "instructor": "<p>The battery weight is <em>W</em> = <em>Mg</em>, so this variant has <em>W</em> = {{weight_N}} N before fixture, hoist, trolley, self-weight, dynamic amplification, or overload factors are added.</p><p>Good answers include battery weight, fixture weight, hoist/trolley weight, boom/brace self-weight, acceleration, braking, swing, impact, overload, side pull, and repeated operating cycles. A reasonable preliminary design load form is <em>P</em><sub>design</sub> = &gamma;<sub>d</sub>(<em>W</em><sub>battery</sub> + <em>W</em><sub>fixture</sub> + <em>W</em><sub>hoist</sub> + <em>W</em><sub>trolley</sub>) + <em>W</em><sub>structure</sub>, with a separate horizontal load case using <em>H</em> = {{H}} {{H_unit}}.</p>",
        "section": "context"
      },
      {
        "id": "q5",
        "title": "Critical Locations and Failure Modes",
        "selected": true,
        "tags": [
          "failure modes",
          "stiffness",
          "fatigue"
        ],
        "type": "conceptual",
        "difficulty": "intermediate",
        "learningObjectives": [
          "Identify critical locations",
          "Separate strength, stiffness, stability, and fatigue concerns"
        ],
        "student": "<p>Identify the locations most likely to control the design of the crane when the battery mass is <strong>{{M}} {{M_unit}}</strong> and the load may act near the full boom length <strong>{{L}} {{L_unit}}</strong>.</p><p>Separate your discussion into strength-critical, stiffness-critical, stability-critical, and fatigue-critical locations.</p>",
        "instructor": "<p>Likely strength-critical locations include the boom near the wall bracket, boom-to-brace connection, brace-to-wall connection, pins, pin holes, mounting plates, weld toes, wall anchors, trolley attachment region, hook, chain, and lifting fixture.</p><p>Stability checks should emphasize the brace in compression and slender/thin-walled details. Serviceability checks should emphasize boom-tip displacement, wall bracket rotation, joint clearance, trolley drift, and positioning accuracy. Fatigue checks should emphasize weld toes, holes, repeated-contact regions, and connection details.</p>",
        "section": "context"
      },
      {
        "id": "q6",
        "title": "Numerical Acceptance Criteria",
        "selected": true,
        "tags": [
          "criteria",
          "safety factor",
          "serviceability"
        ],
        "type": "calculation planning",
        "difficulty": "intermediate",
        "learningObjectives": [
          "Define acceptance criteria",
          "Connect calculated responses to allowable limits"
        ],
        "student": "<p>Define numerical criteria that could be used to decide whether the crane is acceptable for repeated service. Include yielding, ultimate failure, pin shear, bearing, buckling, fatigue, deflection, proof-load, and rated-load requirements.</p>",
        "instructor": "<p>Responses should compare calculated stresses, forces, deflections, rotations, slenderness, and fatigue demand against allowable or limiting values with stated factors of safety or design margins.</p><p>Ultimate strength alone is insufficient because the crane is reusable, operator-facing lifting equipment. Yielding, fatigue, buckling, deformation, joint looseness, rated components, and serviceability can govern even when ultimate fracture is not imminent.</p>",
        "section": "context"
      },
      {
        "id": "idealization",
        "title": "Structural Idealization and Free-Body Diagram",
        "selected": true,
        "tags": [
          "idealization",
          "fbd",
          "modeling"
        ],
        "type": "fbd/modeling",
        "difficulty": "intermediate",
        "learningObjectives": [
          "Create a two-dimensional idealization",
          "Draw complete free-body diagrams"
        ],
        "gradingNotes": "<p>Credit should depend on whether the dominant load path is preserved and assumptions are stated clearly.</p>",
        "student": "<p>Convert the real crane into a simplified two-dimensional structural model using the symbolic dimensions <strong>L = {{L}} {{L_unit}}</strong>, <strong>L_b = {{Lb}} {{Lb_unit}}</strong>, and <strong>theta = {{theta}} {{theta_unit}}</strong>.</p><p>Draw a complete free-body diagram showing the boom, brace, wall supports, trolley/hoist, suspended load, and horizontal service load. State which effects are included and which are excluded from the 2D model.</p>",
        "instructor": "<p>A defensible idealization preserves the dominant load path while replacing the real boom and brace with centerline members. The brace may be idealized as a two-force member only if the connections and loading justify that assumption. The boom should generally be treated as a beam because it can carry bending and shear.</p><p>Students should identify omitted 3D torsion, out-of-plane loading, connection eccentricity, wall flexibility, dynamic effects, clearances, and local deformation where appropriate.</p>",
        "section": "transition"
      },
      {
        "id": "q7",
        "title": "Establish the Governing Design Load",
        "selected": true,
        "tags": [
          "loading",
          "design load",
          "free-body diagram"
        ],
        "type": "calculation",
        "difficulty": "introductory to intermediate",
        "learningObjectives": [
          "Convert battery mass to design load",
          "Identify moment contributions from vertical and horizontal loads"
        ],
        "commonMistakes": "<p>Common mistakes include using mass as force, omitting the dynamic factor, placing the horizontal load at the wrong line of action, and adding H to the vertical load instead of treating its moment contribution separately.</p>",
        "student": "<p>The crane lifts a battery pack of mass <strong><em>M</em> = {{M}} {{M_unit}}</strong>. The lifting operation is represented initially using the vertical dynamic amplification factor <strong>&gamma;<sub>d</sub> = {{gamma_d}}</strong>. The horizontal service load is <strong><em>H</em> = {{H}} {{H_unit}}</strong>, and its line of action may be offset by <strong><em>e</em><sub>H</sub> = {{e_H}} {{e_H_unit}}</strong> below the boom centerline.</p><p>Determine the static battery weight <em>W</em> = <em>Mg</em> and the dynamically amplified vertical design load <em>P</em><sub>d</sub> = &gamma;<sub>d</sub><em>Mg</em>. Show the directions and locations of <em>P</em><sub>d</sub> and <em>H</em> on the free-body diagram. Determine the moment produced about the wall pin by <em>P</em><sub>d</sub>. If <em>H</em> acts at vertical offset <em>e</em><sub>H</sub>, determine the additional moment produced by <em>H</em>. State which load combination should be used for the remaining preliminary calculations.</p><p>Required result: express the governing support moment symbolically. When the horizontal load produces an in-plane moment, use <em>M</em><sub>gov</sub> = <em>P</em><sub>d</sub><em>L</em> + <em>H e</em><sub>H</sub>. If <em>H</em> acts through the boom centerline, explain why it contributes force but no in-plane moment about that centerline.</p>",
        "instructor": "<p>The static battery weight is <em>W</em> = <em>Mg</em> = {{weight_N}} N. The dynamically amplified vertical design load is <em>P</em><sub>d</sub> = &gamma;<sub>d</sub><em>Mg</em> = {{P_design_N}} N.</p><p>The moment from the vertical design load is <em>P</em><sub>d</sub><em>L</em> = {{wall_moment_Nm}} N*m. The additional moment from the horizontal load offset is <em>H e</em><sub>H</sub> = {{horizontal_moment_Nm}} N*m. Therefore the governing preliminary support moment is <em>M</em><sub>gov</sub> = <em>P</em><sub>d</sub><em>L</em> + <em>H e</em><sub>H</sub> = {{governing_support_moment_Nm}} N*m.</p><p>If <em>e</em><sub>H</sub> = 0, the horizontal load acts through the boom centerline for this 2D in-plane model. It still contributes a horizontal force reaction, but it does not add an in-plane moment term <em>H e</em><sub>H</sub> about the boom centerline. For the remaining preliminary calculations, use the combined moment <em>M</em><sub>gov</sub> when <em>e</em><sub>H</sub> is nonzero; otherwise use <em>P</em><sub>d</sub><em>L</em> for the in-plane bending/load-path calculation and check <em>H</em> separately as a horizontal force case.</p>",
        "section": "analysis"
      },
      {
        "id": "q8",
        "title": "Determine the Brace Force and Wall-Pin Reactions",
        "selected": true,
        "tags": [
          "equilibrium",
          "brace force",
          "reactions"
        ],
        "type": "calculation",
        "difficulty": "intermediate",
        "learningObjectives": [
          "Apply moment equilibrium to an idealized boom",
          "Resolve brace force components and wall-pin reactions"
        ],
        "gradingNotes": "<p>Accept equivalent sign conventions if the force magnitudes and load path are consistent with the free-body diagram.</p>",
        "student": "<p>Use the idealized boom free-body diagram. The diagonal brace attaches to the boom at horizontal distance <strong><em>x</em><sub>C</sub> = {{Lb}} {{Lb_unit}}</strong> from the wall pin and forms angle <strong>&theta; = {{theta}} {{theta_unit}}</strong> with the horizontal. Neglect boom self-weight unless it is separately provided.</p><p>Apply moment equilibrium about the wall pin to determine the vertical component of the brace force. Determine the axial force in the brace, the horizontal component of the brace force, and the horizontal and vertical reactions at the wall pin. State whether the brace is in tension or compression.</p><p>Required result: report <em>F</em><sub>b</sub>, <em>F</em><sub>bx</sub>, <em>F</em><sub>by</sub>, the wall-pin reactions, and whether the brace is in tension or compression.</p>",
        "instructor": "<p>Using the governing moment from Question 7, moment equilibrium about the wall pin gives <em>F</em><sub>by</sub><em>x</em><sub>C</sub> = <em>M</em><sub>gov</sub>. Therefore <em>F</em><sub>by</sub> = <em>M</em><sub>gov</sub>/<em>x</em><sub>C</sub> = {{brace_vertical_N}} N.</p><p>Since <em>F</em><sub>by</sub> = <em>F</em><sub>b</sub> sin(&theta;), the brace axial force is <em>F</em><sub>b</sub> = <em>F</em><sub>by</sub>/sin(&theta;) = {{brace_force_N}} N. The horizontal component is <em>F</em><sub>bx</sub> = <em>F</em><sub>b</sub> cos(&theta;) = {{brace_horizontal_N}} N.</p><p>With +<em>x</em> to the right and +<em>y</em> upward, and with <em>H</em> taken as acting to the right, force equilibrium gives <em>A</em><sub>x</sub> = -(<em>F</em><sub>bx</sub> + <em>H</em>) = {{wall_pin_reaction_x_N}} N and <em>A</em><sub>y</sub> = <em>P</em><sub>d</sub> - <em>F</em><sub>by</sub> = {{wall_pin_reaction_y_N}} N. A different sign convention is acceptable if the directions are clearly shown. For the common lower-brace jib geometry, the brace pushes upward on the boom and is therefore in compression.</p>",
        "section": "analysis"
      },
      {
        "id": "q9",
        "title": "Evaluate the Boom for Strength and Serviceability",
        "selected": true,
        "tags": [
          "bending",
          "deflection",
          "serviceability"
        ],
        "type": "calculation",
        "difficulty": "intermediate",
        "learningObjectives": [
          "Evaluate boom bending stress",
          "Compare braced and conservative unbraced models"
        ],
        "commonMistakes": "<p>Common mistakes include using m with mm-based section properties and comparing deflection only to strength criteria.</p>",
        "student": "<p>Evaluate the boom using two preliminary models. Keep units consistent: use N and m for moments, and convert moments to N*mm when using mm-based section properties.</p><p><strong>Model A: actual braced configuration.</strong></p><ol><li>Using the forces from Question 8, sketch the boom shear-force and bending-moment diagrams.</li><li>Determine the maximum boom bending moment <em>M</em><sub>max</sub>.</li><li>Calculate &sigma;<sub>max</sub> = <em>M</em><sub>max</sub>/<em>S</em> and check &sigma;<sub>max</sub> &le; &sigma;<sub>y</sub>/<em>N</em><sub>y</sub>.</li><li>State what beam model, energy method, or software model you would use to estimate the braced-system load-point deflection.</li></ol><p><strong>Model B: conservative unbraced comparison.</strong></p><ol><li>Temporarily model the boom as a cantilever carrying <em>P</em><sub>d</sub> at distance <em>L</em>.</li><li>Determine <em>P</em><sub>d</sub><em>L</em>, <em>P</em><sub>d</sub><em>L</em>/<em>S</em>, and <em>P</em><sub>d</sub><em>L</em><sup>3</sup>/(3<em>EI</em>).</li><li>Compare the cantilever deflection with &delta;<sub>allow</sub>.</li></ol><p>Explain why the cantilever model is conservative, why it should not replace the braced-system model, whether strength or serviceability is more likely to govern, and how increasing <em>L</em>, <em>S</em>, or <em>I</em> changes the response.</p>",
        "instructor": "<p>For the braced configuration, the maximum preliminary boom bending moment occurs at the brace attachment for the idealized point-load model. Its magnitude is <em>M</em><sub>max</sub> = |<em>M</em><sub>gov</sub> - <em>P</em><sub>d</sub><em>x</em><sub>C</sub>| = {{braced_boom_moment_Nm}} N*m. Using <em>S</em> = {{S_boom}} {{S_boom_unit}}, &sigma;<sub>max</sub> = <em>M</em><sub>max</sub>(1000)/<em>S</em> = {{braced_boom_bending_MPa}} MPa. The allowable yield stress is &sigma;<sub>y</sub>/<em>N</em><sub>y</sub> = {{yield_allow_MPa}} MPa, so the boom bending utilization ratio is {{boom_stress_utilization}}.</p><p>For the conservative unbraced comparison, <em>M</em> = <em>P</em><sub>d</sub><em>L</em> = {{wall_moment_Nm}} N*m, &sigma; = <em>P</em><sub>d</sub><em>L</em>(1000)/<em>S</em> = {{boom_bending_MPa}} MPa, and &delta; = <em>P</em><sub>d</sub><em>L</em><sup>3</sup>/(3<em>EI</em>) = {{tip_deflection_mm}} mm. The deflection utilization ratio for the stated allowable deflection is {{deflection_utilization}}.</p><p>The cantilever model is conservative because it ignores the upward support provided by the brace. It should not replace the braced-system model because it gives the wrong internal force distribution and does not provide brace or connection forces. Increasing <em>L</em> increases moment and deflection strongly; increasing <em>S</em> reduces bending stress; increasing <em>I</em> reduces deflection. For the current values, the largest computed utilization may come from {{governing_mode}} with utilization {{governing_utilization}}.</p>",
        "section": "analysis"
      },
      {
        "id": "q10",
        "title": "Evaluate the Brace and Its Pin Connection",
        "selected": true,
        "tags": [
          "axial stress",
          "buckling",
          "pin shear",
          "bearing"
        ],
        "type": "calculation",
        "difficulty": "intermediate",
        "learningObjectives": [
          "Check brace axial stress and buckling",
          "Check pin shear and plate bearing"
        ],
        "student": "<p>Use the brace axial force <em>F</em><sub>b</sub> from Question 8. Treat the brace and connection checks as preliminary screening calculations, then state what still must be verified in detailed design.</p><ol><li><strong>Brace axial stress:</strong> determine &sigma;<sub>b</sub> = <em>F</em><sub>b</sub>/<em>A</em><sub>b</sub> using <strong><em>A</em><sub>b</sub> = {{A_brace}} {{A_brace_unit}}</strong>. Check |&sigma;<sub>b</sub>| &le; &sigma;<sub>y</sub>/<em>N</em><sub>y</sub>.</li><li><strong>Brace length and buckling:</strong> use <strong><em>x</em><sub>C</sub> = {{Lb}} {{Lb_unit}}</strong> and <strong>&theta; = {{theta}} {{theta_unit}}</strong> to determine <em>L</em><sub>brace</sub> = <em>x</em><sub>C</sub>/cos(&theta;). Then compute <em>K L</em><sub>brace</sub>/<em>r</em><sub>min</sub> and, when Euler buckling is applicable, <em>P</em><sub>cr</sub> = &pi;<sup>2</sup><em>E I</em><sub>b</sub>/(<em>K L</em><sub>brace</sub>)<sup>2</sup>. Check <em>F</em><sub>b</sub> &le; <em>P</em><sub>cr</sub>/<em>N</em><sub>b</sub>.</li><li><strong>Pin shear:</strong> for <strong><em>d</em><sub>p</sub> = {{d_pin}} {{d_pin_unit}}</strong>, calculate <em>A</em><sub>p</sub> = &pi;<em>d</em><sub>p</sub><sup>2</sup>/4 and &tau;<sub>avg</sub> = <em>F</em><sub>b</sub>/(<em>n</em><sub>s</sub><em>A</em><sub>p</sub>), where <strong><em>n</em><sub>s</sub> = {{n_s}}</strong>.</li><li><strong>Plate bearing:</strong> calculate &sigma;<sub>bearing</sub> = <em>F</em><sub>b</sub>/(<em>t d</em><sub>p</sub>) using <strong><em>t</em> = {{t_plate}} {{t_plate_unit}}</strong>. If the force is shared by multiple plates, modify the bearing calculation according to the actual load path.</li></ol><p>Identify at least four additional connection checks, such as pin bending, plate tear-out, net-section rupture, edge distance, fatigue, wear, hole clearance, and retaining-device adequacy.</p>",
        "instructor": "<p>The brace force from Question 8 is <em>F</em><sub>b</sub> = {{brace_force_N}} N. The average brace stress is &sigma;<sub>brace</sub> = <em>F</em><sub>b</sub>/<em>A</em><sub>b</sub> = {{brace_stress_MPa}} MPa. With &sigma;<sub>y</sub>/<em>N</em><sub>y</sub> = {{yield_allow_MPa}} MPa, the brace yielding utilization ratio is {{brace_yield_utilization}}.</p><p>The brace length is <em>L</em><sub>brace</sub> = <em>x</em><sub>C</sub>/cos(&theta;) = {{brace_length_m}} m. The slenderness ratio is <em>K L</em><sub>brace</sub>/<em>r</em><sub>min</sub> = {{brace_slenderness}}. The Euler buckling estimate is <em>P</em><sub>cr</sub> = {{brace_buckling_N}} N, so <em>P</em><sub>cr</sub>/<em>N</em><sub>b</sub> = {{brace_buckling_allow_N}} N and the buckling utilization ratio is {{brace_buckling_utilization}}. Euler buckling should be used only if the member is slender enough and the assumed end conditions are appropriate.</p><p>The pin area is <em>A</em><sub>p</sub> = &pi;<em>d</em><sub>p</sub><sup>2</sup>/4 = {{pin_area_mm2}} mm<sup>2</sup>. With <em>n</em><sub>s</sub> = {{n_s}}, &tau;<sub>avg</sub> = <em>F</em><sub>b</sub>/(<em>n</em><sub>s</sub><em>A</em><sub>p</sub>) = {{pin_shear_MPa}} MPa. Compared with &tau;<sub>allow</sub> = {{tau_allow}} {{tau_allow_unit}}, the pin shear utilization ratio is {{pin_shear_utilization}}.</p><p>The nominal plate bearing stress is &sigma;<sub>bearing</sub> = <em>F</em><sub>b</sub>/(<em>t d</em><sub>p</sub>) = {{bearing_MPa}} MPa. Compared with &sigma;<sub>bearing,allow</sub> = {{bearing_allow}} {{bearing_allow_unit}}, the bearing utilization ratio is {{bearing_utilization}}. Additional required checks include pin bending, plate tear-out, net-section rupture, edge distance, fatigue, wear, hole clearance, retaining hardware, welds, and whether the connection is truly single or double shear.</p>",
        "section": "analysis"
      },
      {
        "id": "q11",
        "title": "Make the Preliminary Engineering Decision",
        "selected": true,
        "tags": [
          "decision",
          "utilization ratio",
          "engineering judgment"
        ],
        "type": "decision",
        "difficulty": "intermediate",
        "learningObjectives": [
          "Compare utilization ratios",
          "Make a defensible preliminary design recommendation"
        ],
        "student": "<p>Using the results from Questions 7-10, prepare a concise preliminary design recommendation.</p><p>Calculate the applicable utilization ratios for boom bending stress, load-point deflection, brace axial yielding, brace buckling, pin shear, and plate bearing. Identify the largest utilization ratio and the component or failure mode that governs the preliminary design.</p><p>Recommend one of the following: accept the concept for detailed design, modify the concept, or reject the concept. If modification is required, recommend at least two design changes. Identify at least three effects outside the simplified 2D analysis, such as out-of-plane torsion, fatigue, wall-anchor-group behavior, local weld stresses, trolley-wheel contact, joint clearance, load swing, and structural-wall flexibility.</p><p>Final required statement: Based on the preliminary 2D analysis, the crane concept is accepted for detailed design / requires modification / is rejected because the governing criterion is __________ with a utilization ratio of __________. Before final approval, the following additional analyses or data are required: __________.</p>",
        "instructor": "<p>The computed utilization ratios for the current input set are: boom bending stress = {{boom_stress_utilization}}, load-point deflection = {{deflection_utilization}}, brace axial yielding = {{brace_yield_utilization}}, brace buckling = {{brace_buckling_utilization}}, pin shear = {{pin_shear_utilization}}, and plate bearing = {{bearing_utilization}}.</p><p>The largest utilization ratio is {{governing_utilization}}, governed by {{governing_mode}}. Therefore, based on the preliminary 2D analysis, the crane concept {{design_recommendation}} because the governing criterion is {{governing_mode}} with a utilization ratio of {{governing_utilization}}.</p><p>If modification is required, defensible changes include reducing boom length L, increasing boom section modulus S, increasing boom moment of inertia I, moving the brace attachment farther from the wall, increasing brace angle theta when geometry allows, increasing pin diameter, increasing plate thickness, using double shear, or reducing allowable deflection demand through a stiffer section. Before final approval, students should request or analyze out-of-plane torsion, fatigue, wall-anchor-group behavior, weld details, trolley-wheel contact, joint clearance, load swing, structural-wall flexibility, rated hoist/hook/chain data, inspection requirements, and applicable lifting-device standards.</p>",
        "section": "analysis"
      }
    ],
    "variants": [
      {
        "id": "context-rich-project",
        "title": "Context-Rich Project Version",
        "variables": {
          "L": 2.4,
          "Lb": 1.6,
          "theta": 35,
          "M": 450,
          "H": 500,
          "e_H": 0.3,
          "gamma_d": 1.25,
          "S_boom": 85000,
          "I_boom": 8500000,
          "E": 200000,
          "A_brace": 650,
          "d_pin": 20,
          "t_plate": 12,
          "sigma_y": 250,
          "N_y": 2,
          "delta_allow": 10,
          "K_brace": 1,
          "r_min": 28,
          "I_brace": 1200000,
          "N_b": 2,
          "n_s": 1,
          "tau_allow": 80,
          "bearing_allow": 150
        },
        "selectedQuestions": [
          "q1",
          "q2",
          "q3",
          "q4",
          "q5",
          "q6",
          "idealization",
          "q7",
          "q8",
          "q9",
          "q10",
          "q11"
        ]
      },
      {
        "id": "exam-version",
        "title": "Exam Version - calculation sequence",
        "variables": {
          "L": 3,
          "Lb": 2,
          "theta": 42,
          "M": 520,
          "H": 650,
          "e_H": 0.25,
          "gamma_d": 1.3,
          "S_boom": 110000,
          "I_boom": 12000000,
          "E": 200000,
          "A_brace": 780,
          "d_pin": 24,
          "t_plate": 14,
          "sigma_y": 250,
          "N_y": 2,
          "delta_allow": 12,
          "K_brace": 1,
          "r_min": 32,
          "I_brace": 1800000,
          "N_b": 2,
          "n_s": 2,
          "tau_allow": 80,
          "bearing_allow": 150
        },
        "selectedQuestions": [
          "idealization",
          "q7",
          "q8",
          "q9",
          "q10",
          "q11"
        ]
      },
      {
        "id": "section-a",
        "title": "Homework Version A - core sequence",
        "variables": {
          "L": 2.4,
          "Lb": 1.6,
          "theta": 35,
          "M": 450,
          "H": 500,
          "e_H": 0.3,
          "gamma_d": 1.25,
          "S_boom": 85000,
          "I_boom": 8500000,
          "E": 200000,
          "A_brace": 650,
          "d_pin": 20,
          "t_plate": 12,
          "sigma_y": 250,
          "N_y": 2,
          "delta_allow": 10,
          "K_brace": 1,
          "r_min": 28,
          "I_brace": 1200000,
          "N_b": 2,
          "n_s": 1,
          "tau_allow": 80,
          "bearing_allow": 150
        },
        "selectedQuestions": [
          "idealization",
          "q7",
          "q8",
          "q9",
          "q10",
          "q11"
        ]
      }
    ]
  },
  {
    "id": "MOS-LADDER-003",
    "slug": "ladder-platform-system",
    "title": "Commercial Aluminum Ladder-Platform System and Adjustable Support Bracket",
    "studentDocumentTitle": "Student Homework Questions",
    "instructorDocumentTitle": "Instructor Answers",
    "summary": "A context-rich mechanics problem on a portable ladder-supported work platform and its adjustable support bracket.",
    "textbookChapters": [
      "Stress and strain",
      "Axial loading",
      "Shear stress",
      "Bending stress",
      "Beam deflection",
      "Buckling",
      "Connections and fasteners",
      "Fatigue"
    ],
    "derivedPlaceholders": [
      "ladder_a_m",
      "ladder_H_projected_m",
      "ladder_load_resultant_N",
      "ladder_brace_vertical_N",
      "ladder_brace_force_N",
      "ladder_brace_horizontal_N",
      "ladder_upper_reaction_x_N",
      "ladder_upper_reaction_y_N",
      "ladder_Mmax_Nm",
      "ladder_Mmax_location_m",
      "ladder_bending_MPa",
      "ladder_yield_allow_MPa",
      "ladder_arm_stress_utilization",
      "ladder_brace_stress_MPa",
      "ladder_brace_yield_utilization",
      "ladder_brace_slenderness",
      "ladder_brace_buckling_N",
      "ladder_brace_buckling_allow_N",
      "ladder_brace_buckling_utilization",
      "ladder_pin_area_mm2",
      "ladder_pin_shear_MPa",
      "ladder_pin_shear_utilization",
      "ladder_bearing_MPa",
      "ladder_bearing_utilization",
      "ladder_governing_mode",
      "ladder_governing_utilization",
      "ladder_design_recommendation"
    ],
    "image": "problems/ladder-platform-system/assets/ladder-platform-system.png",
    "idealizedImage": "problems/ladder-platform-system/assets/bracket-idealization-2d.png",
    "idealizedImageAlt": "Instructor dimensioned two-dimensional idealization of the adjustable ladder-platform support bracket.",
    "source": "problems/ladder-platform-system/index.html",
    "problemStatement": "<p>You are a product-development engineer working for a manufacturer of commercial access equipment. The company is evaluating an elevated work-platform system used by maintenance personnel, painters, inspectors, and construction workers. The system consists of two aluminum extension ladders supporting a horizontal work platform. A worker stands on the platform while carrying tools, equipment, and construction materials.</p><p>The product must be portable, lightweight, easy to assemble, compatible with common commercial ladders, stable during use, sufficiently strong and stiff, resistant to repeated loading, and economical to manufacture and maintain. The system may be used outdoors and may be exposed to uneven ground, wind, rain, corrosion, accidental impact, repeated assembly, improper installation, worker movement, and eccentric loading.</p><p>Only product photographs and a preliminary concept are initially available. Detailed load ratings, dimensions, material properties, attachment conditions, allowable deflections, and service-life requirements must be established by the design team.</p>",
    "engineeringGoal": "<p>Determine whether the proposed ladder-platform system can be developed into a safe, stable, and commercially practical product for repeated use in building-maintenance operations.</p><p>The assessment must identify governing operating conditions, establish the complete load path, identify strength-, stiffness-, stability-, and fatigue-critical components, determine important material and geometric properties, select numerical acceptance criteria, decide whether hand calculations, SolidWorks, or finite element analysis are appropriate, develop a simplified structural idealization, identify a critical component for detailed analysis, and recommend whether the concept should be accepted for detailed design, modified, or rejected.</p>",
    "variables": [
      {
        "key": "L",
        "symbol": "L",
        "label": "Horizontal support-arm length",
        "value": 1.2,
        "unit": "m",
        "min": 0.4,
        "max": 2.5,
        "step": 0.05
      },
      {
        "key": "H",
        "symbol": "H",
        "label": "Vertical spacing between ladder contacts",
        "value": 0.643,
        "unit": "m",
        "min": 0.25,
        "max": 1.5,
        "step": 0.001
      },
      {
        "key": "Ld",
        "symbol": "L_d",
        "label": "Diagonal-brace length",
        "value": 1,
        "unit": "m",
        "min": 0.3,
        "max": 2,
        "step": 0.05
      },
      {
        "key": "theta",
        "symbol": "theta",
        "label": "Diagonal-brace angle",
        "value": 40,
        "unit": "deg",
        "min": 15,
        "max": 75,
        "step": 1
      },
      {
        "key": "w",
        "symbol": "w",
        "label": "Uniform platform load on one bracket arm",
        "value": 900,
        "unit": "N/m",
        "min": 100,
        "max": 5000,
        "step": 50
      },
      {
        "key": "A_d",
        "symbol": "A_d",
        "label": "Diagonal-brace cross-sectional area",
        "value": 350,
        "unit": "mm^2",
        "min": 100,
        "max": 2500,
        "step": 25
      },
      {
        "key": "I_d",
        "symbol": "I_d",
        "label": "Diagonal-brace minimum second moment of area",
        "value": 250000,
        "unit": "mm^4",
        "min": 10000,
        "max": 5000000,
        "step": 10000
      },
      {
        "key": "r_min",
        "symbol": "r_min",
        "label": "Brace minimum radius of gyration",
        "value": 18,
        "unit": "mm",
        "min": 4,
        "max": 80,
        "step": 1
      },
      {
        "key": "K",
        "symbol": "K",
        "label": "Brace effective-length factor",
        "value": 1,
        "unit": "-",
        "min": 0.5,
        "max": 2,
        "step": 0.05
      },
      {
        "key": "S_a",
        "symbol": "S_a",
        "label": "Horizontal-arm section modulus",
        "value": 18000,
        "unit": "mm^3",
        "min": 3000,
        "max": 120000,
        "step": 1000
      },
      {
        "key": "I_a",
        "symbol": "I_a",
        "label": "Horizontal-arm second moment of area",
        "value": 850000,
        "unit": "mm^4",
        "min": 50000,
        "max": 10000000,
        "step": 50000
      },
      {
        "key": "E",
        "symbol": "E",
        "label": "Elastic modulus",
        "value": 69000,
        "unit": "MPa",
        "min": 60000,
        "max": 210000,
        "step": 1000
      },
      {
        "key": "sigma_y",
        "symbol": "sigma_y",
        "label": "Yield strength",
        "value": 240,
        "unit": "MPa",
        "min": 100,
        "max": 600,
        "step": 10
      },
      {
        "key": "d_p",
        "symbol": "d_p",
        "label": "Connection-pin diameter",
        "value": 12,
        "unit": "mm",
        "min": 4,
        "max": 40,
        "step": 1
      },
      {
        "key": "t",
        "symbol": "t",
        "label": "Connection-plate thickness",
        "value": 6,
        "unit": "mm",
        "min": 2,
        "max": 25,
        "step": 1
      },
      {
        "key": "n_s",
        "symbol": "n_s",
        "label": "Number of effective pin shear planes",
        "value": 1,
        "unit": "-",
        "min": 1,
        "max": 2,
        "step": 1
      },
      {
        "key": "N_y",
        "symbol": "N_y",
        "label": "Required factor of safety against yielding",
        "value": 2,
        "unit": "-",
        "min": 1,
        "max": 5,
        "step": 0.1
      },
      {
        "key": "N_b",
        "symbol": "N_b",
        "label": "Required factor of safety against buckling",
        "value": 2,
        "unit": "-",
        "min": 1,
        "max": 5,
        "step": 0.1
      },
      {
        "key": "tau_allow",
        "symbol": "tau_allow",
        "label": "Allowable pin shear stress",
        "value": 80,
        "unit": "MPa",
        "min": 20,
        "max": 250,
        "step": 5
      },
      {
        "key": "bearing_allow",
        "symbol": "sigma_bearing_allow",
        "label": "Allowable bearing stress",
        "value": 150,
        "unit": "MPa",
        "min": 30,
        "max": 400,
        "step": 5
      }
    ],
    "questions": [
      {
        "id": "q1",
        "title": "Design, Manufacturing, and Commercialization",
        "selected": true,
        "tags": [
          "design",
          "manufacturing",
          "commercialization",
          "safety"
        ],
        "type": "conceptual",
        "difficulty": "introductory",
        "learningObjectives": [
          "Identify commercial design requirements",
          "Prioritize safety, usability, and manufacturing constraints"
        ],
        "student": "<p>What considerations likely influenced the design, manufacture, installation, operation, and commercialization of the ladder-platform system?</p><p>Discuss intended commercial applications, maximum working height, platform size, portability and product weight, compatibility with different ladders, ease of assembly and adjustment, worker safety and fall hazards, prevention of incorrect installation, corrosion resistance, standard sections and fasteners, fabrication methods, inspection and maintenance, transportation and storage, rated-load labeling, product cost, service life, and liability associated with misuse.</p><p>Conclude by identifying the three most important requirements that must be satisfied before this product can be approved for commercial use.</p>",
        "instructor": "<p>A strong response should discuss portability and low mass, compatibility with standard commercial ladders, rapid assembly and adjustment, prevention of incorrect installation, adequate rated load, corrosion resistance, repeated-use durability, low manufacturing cost, standard materials and fasteners, inspection and replacement, storage and transportation, liability, and safe-use instructions.</p><p>Three likely governing requirements are adequate strength and stability under credible service and misuse loads, acceptable platform and bracket deformation, and reliable, intuitive, and inspectable attachment to the ladders.</p>",
        "section": "context"
      },
      {
        "id": "q2",
        "title": "Complete Load Path",
        "selected": true,
        "tags": [
          "load path",
          "reactions",
          "contact"
        ],
        "type": "conceptual",
        "difficulty": "introductory",
        "learningObjectives": [
          "Trace load transfer through a complete system",
          "Identify vertical, horizontal, bearing, friction, and moment transfer"
        ],
        "student": "<p>For the configuration shown, describe the complete load path through the system.</p><p>Begin with the worker and tools or construction materials. Trace the load through the worker's feet, platform, platform-support brackets, ladder rungs or rails, ladder side rails, wall contact, ground contact, and the wall and ground structures.</p><p>Identify where the system transfers vertical force, horizontal force, bending moment, bearing force, and friction force. Identify locations where the load path could be interrupted by slipping, loss of contact, loose connections, local deformation, incorrect installation, or component failure.</p>",
        "instructor": "<p>The primary load path is worker and tools to platform to brackets to ladder rungs or rails to ladder side rails to wall and ground contacts.</p><p>The platform carries bending and shear. The brackets transfer vertical load, horizontal force, and possibly moment into the ladders. The ladder rails carry combined axial force and bending. Wall contact provides a horizontal reaction, while the feet provide vertical reaction and frictional resistance.</p><p>Potential interruptions include bracket disengagement, rung crushing, pin failure, foot slip, loss of wall contact, loose hardware, and local deformation.</p>",
        "section": "context"
      },
      {
        "id": "q3",
        "title": "Critical Components for Strength, Stiffness, Stability, and Durability",
        "selected": true,
        "tags": [
          "failure modes",
          "stiffness",
          "stability",
          "fatigue"
        ],
        "type": "conceptual",
        "difficulty": "introductory to intermediate",
        "learningObjectives": [
          "Separate strength, stiffness, stability, and fatigue concerns",
          "Identify critical components in a multi-part product"
        ],
        "student": "<p>Identify the components and locations that should be evaluated.</p><p><strong>Strength-critical components:</strong> consider the work platform, ladder rungs, ladder side rails, platform-support brackets, adjustment slots, locking pins or bolts, welded connections, wall-contact regions, and ladder feet. Potential failure modes include yielding, fracture, pin shear, bearing, tear-out, local crushing, weld failure, rung bending, and rail bending.</p><p><strong>Stiffness-critical components:</strong> consider platform deflection, platform rotation, ladder-rail deformation, bracket deflection, connection looseness, and differential deformation between supports. Explain why a component may satisfy a strength requirement but remain unsuitable because of excessive deformation.</p><p><strong>Stability-critical behavior:</strong> consider ladder sliding, overturning, loss of wall contact, unequal reactions between ladders, lateral instability, and platform rotation.</p><p><strong>Fatigue-critical locations:</strong> consider weld toes, pin holes, adjustment slots, repeated-contact regions, section transitions, and locking mechanisms.</p>",
        "instructor": "<p>Strength-critical locations include the platform at maximum bending moment, bracket horizontal arm, brace, adjustment slot, pins and bolts, welds, ladder rungs, ladder rails, and ladder feet.</p><p>Stiffness-critical quantities include platform sag, bracket rotation, ladder-rail bending, and unequal support deformation. Stability-critical behavior includes sliding, overturning, lateral motion, and loss of contact. Fatigue-critical locations include weld toes, holes, slots, section transitions, and repeated-contact surfaces.</p><p>A structure may remain below yield yet be unsafe because excessive motion can cause loss of balance, platform slope, redistribution of load, or loss of engagement.</p>",
        "section": "context"
      },
      {
        "id": "q4",
        "title": "Material Properties",
        "selected": true,
        "tags": [
          "materials",
          "stiffness",
          "fatigue",
          "corrosion"
        ],
        "type": "conceptual",
        "difficulty": "introductory",
        "learningObjectives": [
          "Connect material properties to design requirements",
          "Distinguish stiffness, yielding, fracture, wear, and durability"
        ],
        "student": "<p>What material properties are important for evaluating the ladder rails, rungs, platform, brackets, diagonal braces, pins, bolts, welds, hooks, and bearing surfaces?</p><p>Discuss elastic modulus <em>E</em>, yield strength &sigma;<sub>y</sub>, ultimate strength &sigma;<sub>u</sub>, shear strength, fatigue resistance, fracture toughness, hardness, wear resistance, corrosion resistance, density, weldability, machinability, cost, and availability.</p><p>Explain which properties control stiffness, permanent deformation, fracture, fatigue life, wear, portability, and outdoor durability.</p>",
        "instructor": "<p><em>E</em> controls elastic stiffness and deflection. &sigma;<sub>y</sub> controls onset of permanent deformation. &sigma;<sub>u</sub> relates to fracture or rupture. Fatigue strength governs repeated loading. Toughness resists brittle failure and impact. Hardness and wear resistance matter at hooks, pins, slots, and bearing surfaces. Corrosion resistance matters for outdoor exposure. Density influences portability. Weldability and machinability influence fabrication cost.</p><p>Aluminum is attractive for ladders and platforms because of low density and corrosion resistance. Steel may be preferred for pins, locking hardware, and high-wear contacts.</p>",
        "section": "context"
      },
      {
        "id": "q5",
        "title": "Critical Geometric Parameters",
        "selected": true,
        "tags": [
          "geometry",
          "load distribution",
          "connections"
        ],
        "type": "modeling",
        "difficulty": "introductory to intermediate",
        "learningObjectives": [
          "Identify geometry that controls stress and deflection",
          "Relate system, member, and connection geometry to mechanics response"
        ],
        "student": "<p>Identify the geometric parameters that most strongly affect structural behavior.</p><p>Consider ladder length and angle, spacing between ladders, platform span, width, and thickness, worker position, support spacing, rung spacing, ladder-rail cross section, bracket-arm length, diagonal-brace length and angle, vertical spacing between bracket contacts, pin diameter, plate thickness, hole diameter, edge distance, and weld size.</p><p>For each parameter, explain whether it primarily affects load distribution, axial force, bending moment, shear stress, bearing stress, deflection, buckling, sliding, overturning, or local connection behavior.</p>",
        "instructor": "<p>Important system-level variables include ladder length, ladder angle, support spacing, platform span, and worker position. Important component-level variables include platform section properties, ladder-rail section properties, bracket-arm length, brace angle, and brace slenderness. Important connection variables include pin diameter, hole diameter, plate thickness, edge distance, slot geometry, and weld dimensions.</p><p>Increasing span or worker eccentricity generally increases bending moment and deflection. Increasing section modulus reduces bending stress. Increasing second moment of area reduces deflection. Increasing brace slenderness increases buckling sensitivity.</p>",
        "section": "context"
      },
      {
        "id": "q6",
        "title": "Loading Conditions",
        "selected": true,
        "tags": [
          "loading",
          "dynamic loads",
          "impact",
          "cyclic loading"
        ],
        "type": "estimation",
        "difficulty": "introductory to intermediate",
        "learningObjectives": [
          "Classify load types",
          "Identify likely governing operating scenarios"
        ],
        "student": "<p>Identify the loads that may act during commercial operation.</p><p>Consider worker weight, tools and construction materials, platform self-weight, ladder self-weight, climbing forces, worker movement, horizontal worker force, wind, impact from stepping onto the platform, eccentric loading, accidental overload, and repeated use.</p><p>Classify each load as static, quasi-static, dynamic, impact, cyclic, or accidental. Explain which loading scenario is likely to govern platform bending, bracket loading, ladder reactions, sliding, overturning, and connection forces.</p>",
        "instructor": "<p>Loads include worker, tools, and materials as static or quasi-static loads; platform and ladder self-weight as static loads; stepping and climbing as dynamic or impact loads; worker movement as time-varying load; wind as lateral and potentially dynamic load; accidental overload as an abnormal load; and repeated use as cyclic loading.</p><p>The governing platform and bracket load commonly occurs when the worker stands near one bracket or near an unsupported platform region. Sliding and overturning may be governed by horizontal force, eccentric loading, or wind.</p>",
        "section": "context"
      },
      {
        "id": "q7",
        "title": "Numerical Strength, Stiffness, Stability, and Durability Criteria",
        "selected": true,
        "tags": [
          "criteria",
          "safety factors",
          "serviceability"
        ],
        "type": "calculation planning",
        "difficulty": "intermediate",
        "learningObjectives": [
          "Define numerical acceptance criteria",
          "Explain why ultimate strength alone is insufficient"
        ],
        "student": "<p>Discuss suitable numerical criteria for evaluating the system.</p><p><strong>Strength:</strong> possible criteria include &sigma;<sub>eq</sub> &le; &sigma;<sub>y</sub>/<em>N</em><sub>y</sub>, &tau;<sub>avg</sub> &le; &tau;<sub>allow</sub>, and &sigma;<sub>bearing</sub> &le; &sigma;<sub>bearing,allow</sub>. Discuss yielding, ultimate failure, pin or bolt shear, bearing, tear-out, net-section rupture, weld failure, rung failure, and rail failure.</p><p><strong>Stiffness:</strong> possible serviceability criteria include &delta;<sub>platform</sub> &le; &delta;<sub>allow</sub> and &theta;<sub>platform</sub> &le; &theta;<sub>allow</sub>. Discuss platform sag, bracket deflection, ladder deformation, and platform rotation.</p><p><strong>Stability:</strong> discuss sliding, overturning, maintenance of wall contact, lateral stability, minimum required friction, and mechanical anchoring.</p><p><strong>Durability:</strong> discuss fatigue, wear, corrosion, and repeated assembly and disassembly. Explain why ultimate strength alone is insufficient for a reusable commercial access system.</p>",
        "instructor": "<p>Relevant criteria include yield, ultimate rupture, shear, bearing, tear-out, net-section failure, buckling, deflection, rotation, sliding, overturning, fatigue, and wear.</p><p>Ultimate strength alone is insufficient because permanent deformation, instability, excessive deflection, or fatigue can make the system unsafe before fracture.</p>",
        "section": "context"
      },
      {
        "id": "q8",
        "title": "Suitability for SolidWorks and Finite Element Analysis",
        "selected": true,
        "tags": [
          "FEA",
          "SolidWorks",
          "model verification"
        ],
        "type": "simulation planning",
        "difficulty": "intermediate",
        "learningObjectives": [
          "Decide what hand calculations should precede simulation",
          "Identify appropriate FEA idealizations and verification checks"
        ],
        "student": "<p>Is the complete ladder-platform system a good candidate for SolidWorks simulation or finite element analysis?</p><p>Discuss beam, shell, and solid idealizations; wall and ground contact; friction; ladder-platform contact; bracket-rung contact; nonlinear contact; geometric nonlinearity; and load sharing between ladders.</p><p>Explain which questions should first be answered using hand calculations, which questions are better suited to FEA, how the FEA model should be verified, and why a more detailed model is not automatically more accurate.</p>",
        "instructor": "<p>The system is suitable for FEA only after a simpler load-path and equilibrium model is established. Appropriate representations may include beam elements for ladder rails, rungs, and platform; shell elements for thin bracket plates; solid elements for pins, slots, hooks, and detailed connections; and nonlinear contact for wall, ground, bracket, and rung interfaces.</p><p>Hand calculations should establish reactions, load sharing, approximate bending, and stability first. FEA is valuable for local stress concentration, contact, connection deformation, and three-dimensional effects. The FEA model must be checked against equilibrium, limiting cases, mesh convergence, and hand calculations.</p>",
        "section": "context"
      },
      {
        "id": "q9",
        "title": "Simplified Structural Idealization",
        "selected": true,
        "tags": [
          "idealization",
          "free-body diagram",
          "system model"
        ],
        "type": "fbd/modeling",
        "difficulty": "intermediate",
        "learningObjectives": [
          "Develop a two-dimensional system model",
          "State validity and limitations of simplifying assumptions"
        ],
        "student": "<p>Develop a simplified two-dimensional model of the complete ladder-platform system.</p><p>Include both ladders, the platform, worker and equipment loads, platform supports, wall contact, ground contact, relevant dimensions, and reaction forces.</p><p>Discuss the validity of planar behavior, identical ladder behavior, equal load sharing, rigid wall and ground, point representation of the worker load, beam representation of the platform, negligible connection clearance, and simplified friction forces. Clearly identify the physical effects excluded from the model.</p>",
        "instructor": "<p>A reasonable preliminary model treats the platform as a beam supported by two bracket reactions. Each ladder may be modeled as an inclined beam with wall and ground contact.</p><p>Equal load sharing is valid only for symmetric geometry, loading, and stiffness. A worker close to one bracket produces unequal reactions. The simplified model excludes lateral motion, detailed rung contact, clearance, torsion, local weld stress, and three-dimensional instability.</p>",
        "section": "transition"
      },
      {
        "id": "transition-bracket",
        "title": "Transition from the Ladder System to the Bracket",
        "selected": true,
        "tags": [
          "load transfer",
          "critical component",
          "bracket"
        ],
        "type": "context transition",
        "difficulty": "introductory",
        "learningObjectives": [
          "Connect system-level behavior to component-level analysis",
          "Identify why the adjustable bracket is critical"
        ],
        "image": "assets/adjustable-bracket.png",
        "imageAlt": "Adjustable ladder-platform support bracket.",
        "student": "<p>The system-level assessment identifies the adjustable ladder-platform bracket as a critical load-transfer component.</p><p>The platform load is transferred into the bracket and then from the bracket into the ladder rungs or rails. Failure or excessive deformation of the bracket could cause platform rotation, loss of support, local ladder damage, connection failure, worker instability, or collapse.</p><p><strong>Component-level engineering goal:</strong> determine whether one bracket can safely support the governing platform load and transfer it into the ladder without yielding of the horizontal arm, excessive arm deflection, buckling of the diagonal brace, pin or bolt failure, plate bearing failure, or loss of engagement with the ladder.</p>",
        "instructor": "<p>This transition is important pedagogically because students should not begin with an isolated bracket formula. They should first explain why the bracket is a critical component in the complete system load path and what system-level assumptions are being passed into the component model.</p>",
        "section": "transition"
      },
      {
        "id": "bracket-idealization",
        "title": "Bracket Idealization and Variables",
        "selected": true,
        "tags": [
          "idealization",
          "variables",
          "bracket"
        ],
        "type": "model setup",
        "difficulty": "introductory to intermediate",
        "learningObjectives": [
          "Define variables for a bracket FBD",
          "Translate a product image into an analyzable mechanics model"
        ],
        "student": "<p>Use the dimensioned two-dimensional bracket image supplied by the instructor.</p><p>Define <em>L</em> as the horizontal support-arm length; <em>H</em> as the vertical spacing between the upper and lower ladder contacts; <em>L</em><sub>d</sub> as the diagonal-brace length; &theta; as the diagonal-brace angle relative to the horizontal; <em>w</em> as the uniformly distributed platform load acting on the arm; <em>A</em><sub>d</sub> as the diagonal-brace cross-sectional area; <em>I</em><sub>d</sub> as the minimum second moment of area of the diagonal brace; <em>r</em><sub>min</sub> as the minimum radius of gyration of the brace; <em>K</em> as the effective-length factor; <em>S</em><sub>a</sub> as the section modulus of the horizontal arm; <em>I</em><sub>a</sub> as the second moment of area of the horizontal arm; <em>E</em> as the elastic modulus; &sigma;<sub>y</sub> as the yield strength; <em>d</em><sub>p</sub> as the connection-pin diameter; <em>t</em> as the connection-plate thickness; <em>n</em><sub>s</sub> as the number of effective pin shear planes; <em>N</em><sub>y</sub> as the required factor of safety against yielding; <em>N</em><sub>b</sub> as the required factor of safety against buckling; &tau;<sub>allow</sub> as the allowable pin shear stress; and &sigma;<sub>bearing,allow</sub> as the allowable bearing stress.</p><p>Define the horizontal distance from the upper ladder contact to the brace connection as <em>a</em> = <em>L</em><sub>d</sub> cos&theta;. The vertical projection is <em>H</em> = <em>L</em><sub>d</sub> sin&theta;. The uniformly distributed load has resultant <em>W</em> = <em>wL</em>, acting at <em>x</em> = <em>L</em>/2.</p><p>Assume the horizontal arm behaves as a beam; the diagonal brace is a two-force member; the upper and lower bracket contacts are idealized as pins; loading is planar; bracket self-weight is neglected; the distributed load is uniform; and connection eccentricity is neglected.</p>",
        "instructor": "<p>Students should define all symbols before using equations. The model should make clear that <em>a</em> is the horizontal lever arm from the upper contact to the brace force component, while <em>L</em> is the full loaded support-arm length.</p><p>For the default values, <em>a</em> = <em>L</em><sub>d</sub> cos&theta; = {{ladder_a_m}} m and the vertical projection is <em>L</em><sub>d</sub> sin&theta; = {{ladder_H_projected_m}} m. This is why the default displayed contact spacing is set to match the projected height. If an instructor edits <em>H</em>, <em>L</em><sub>d</sub>, or &theta;, those three geometry values should be checked for compatibility.</p><p>The assumptions should be judged by whether they preserve the dominant load path and whether omitted effects are named.</p>",
        "section": "analysis"
      },
      {
        "id": "q10",
        "title": "Brace Force and Upper Contact Reactions",
        "selected": true,
        "tags": [
          "equilibrium",
          "brace force",
          "reactions"
        ],
        "type": "calculation",
        "difficulty": "intermediate",
        "learningObjectives": [
          "Replace a distributed load with a resultant",
          "Use moment equilibrium to determine brace force and reactions"
        ],
        "student": "<p>Use the free-body diagram of the horizontal arm.</p><p>Tasks: replace the distributed load with its equivalent resultant; apply moment equilibrium about the upper ladder contact; determine the vertical brace-force component; determine the brace axial force; determine the horizontal brace-force component; determine the horizontal and vertical reactions at the upper contact; and state whether the brace is in tension or compression.</p>",
        "instructor": "<p>The distributed-load resultant is <em>W</em> = <em>wL</em> = {{ladder_load_resultant_N}} N, acting at <em>L</em>/2.</p><p>The brace horizontal lever arm is <em>a</em> = <em>L</em><sub>d</sub> cos&theta; = {{ladder_a_m}} m. Taking moments about the upper contact gives <em>F</em><sub>d,y</sub><em>a</em> = (<em>wL</em>)(<em>L</em>/2). Therefore, <em>F</em><sub>d,y</sub> = <em>wL</em><sup>2</sup>/(2<em>a</em>) = {{ladder_brace_vertical_N}} N.</p><p>Since <em>F</em><sub>d,y</sub> = <em>F</em><sub>d</sub> sin&theta;, the brace force is <em>F</em><sub>d</sub> = <em>wL</em><sup>2</sup>/(2<em>a</em> sin&theta;) = {{ladder_brace_force_N}} N. Using <em>a</em> = <em>L</em><sub>d</sub> cos&theta;, this may be written as <em>F</em><sub>d</sub> = <em>wL</em><sup>2</sup>/(2<em>L</em><sub>d</sub> sin&theta; cos&theta;).</p><p>The horizontal component is <em>F</em><sub>d,x</sub> = <em>F</em><sub>d</sub> cos&theta; = {{ladder_brace_horizontal_N}} N. Force equilibrium gives <em>A</em><sub>x</sub> + <em>F</em><sub>d,x</sub> = 0 and <em>A</em><sub>y</sub> + <em>F</em><sub>d,y</sub> - <em>wL</em> = 0. Thus, <em>A</em><sub>x</sub> = -<em>F</em><sub>d,x</sub> = {{ladder_upper_reaction_x_N}} N and <em>A</em><sub>y</sub> = <em>wL</em> - <em>F</em><sub>d,y</sub> = {{ladder_upper_reaction_y_N}} N. The brace pushes upward on the arm and is therefore in compression for the configuration shown.</p>",
        "section": "analysis"
      },
      {
        "id": "q11",
        "title": "Horizontal-Arm Bending Strength",
        "selected": true,
        "tags": [
          "shear diagram",
          "bending moment",
          "bending stress"
        ],
        "type": "calculation",
        "difficulty": "intermediate",
        "learningObjectives": [
          "Derive shear and moment functions",
          "Evaluate maximum bending stress in the bracket arm"
        ],
        "student": "<p>Using the reactions from Question 10, derive the shear-force function for 0 &le; <em>x</em> &lt; <em>a</em>; derive the shear-force function for <em>a</em> &le; <em>x</em> &le; <em>L</em>; derive the corresponding bending-moment functions; identify all locations where a maximum bending moment may occur; determine <em>M</em><sub>max</sub> = max |<em>M</em>(<em>x</em>)|; calculate &sigma;<sub>max</sub> = <em>M</em><sub>max</sub>/<em>S</em><sub>a</sub>; and check &sigma;<sub>max</sub> &le; &sigma;<sub>y</sub>/<em>N</em><sub>y</sub>.</p><p>Explain how <em>L</em>, <em>a</em>, <em>S</em><sub>a</sub>, and <em>w</em> affect the maximum stress.</p>",
        "instructor": "<p>Using upward reactions <em>A</em><sub>y</sub> at <em>x</em> = 0 and <em>F</em><sub>d,y</sub> at <em>x</em> = <em>a</em>: for 0 &le; <em>x</em> &lt; <em>a</em>, the shear force is <em>V</em><sub>1</sub>(<em>x</em>) = <em>A</em><sub>y</sub> - <em>wx</em>, and the bending moment is <em>M</em><sub>1</sub>(<em>x</em>) = <em>A</em><sub>y</sub><em>x</em> - <em>wx</em><sup>2</sup>/2.</p><p>For <em>a</em> &le; <em>x</em> &le; <em>L</em>, the shear force is <em>V</em><sub>2</sub>(<em>x</em>) = <em>A</em><sub>y</sub> + <em>F</em><sub>d,y</sub> - <em>wx</em>. Since <em>A</em><sub>y</sub> + <em>F</em><sub>d,y</sub> = <em>wL</em>, this may be written as <em>V</em><sub>2</sub>(<em>x</em>) = <em>w</em>(<em>L</em> - <em>x</em>). The bending moment is <em>M</em><sub>2</sub>(<em>x</em>) = <em>A</em><sub>y</sub><em>x</em> + <em>F</em><sub>d,y</sub>(<em>x</em> - <em>a</em>) - <em>wx</em><sup>2</sup>/2.</p><p>Candidate locations for maximum absolute bending moment are <em>x</em> = 0, <em>x</em> = <em>a</em>, <em>x</em> = <em>L</em>, any valid interior point satisfying <em>V</em><sub>1</sub>(<em>x</em>) = 0, and any valid interior point satisfying <em>V</em><sub>2</sub>(<em>x</em>) = 0. For the default values, the maximum absolute moment is <em>M</em><sub>max</sub> = {{ladder_Mmax_Nm}} N*m at <em>x</em> = {{ladder_Mmax_location_m}} m.</p><p>Convert moment to N*mm before using <em>S</em><sub>a</sub> in mm<sup>3</sup>. Then &sigma;<sub>max</sub> = <em>M</em><sub>max</sub>(1000)/<em>S</em><sub>a</sub> = {{ladder_bending_MPa}} MPa. The allowable yield stress is &sigma;<sub>y</sub>/<em>N</em><sub>y</sub> = {{ladder_yield_allow_MPa}} MPa, so the arm bending utilization ratio is {{ladder_arm_stress_utilization}}.</p><p>Increasing <em>L</em> or <em>w</em> generally increases bending demand. Increasing <em>S</em><sub>a</sub> reduces stress. Moving the brace connection outward generally reduces the brace force and changes the bending distribution. Arm deflection requires <em>EI</em><sub>a</sub>, support compatibility, brace axial stiffness, and connection flexibility.</p>",
        "section": "analysis"
      },
      {
        "id": "q12",
        "title": "Diagonal Brace and Connection",
        "selected": true,
        "tags": [
          "axial stress",
          "buckling",
          "pin shear",
          "bearing"
        ],
        "type": "calculation",
        "difficulty": "intermediate",
        "learningObjectives": [
          "Check brace yielding and Euler buckling",
          "Check pin shear and plate bearing"
        ],
        "student": "<p>Use the brace force obtained in Question 10.</p><p><strong>Brace yielding:</strong> calculate &sigma;<sub>d</sub> = <em>F</em><sub>d</sub>/<em>A</em><sub>d</sub> and check |&sigma;<sub>d</sub>| &le; &sigma;<sub>y</sub>/<em>N</em><sub>y</sub>.</p><p><strong>Brace buckling:</strong> calculate &lambda; = <em>KL</em><sub>d</sub>/<em>r</em><sub>min</sub>. When Euler buckling is applicable, calculate <em>P</em><sub>cr</sub> = &pi;<sup>2</sup><em>EI</em><sub>d</sub>/(<em>KL</em><sub>d</sub>)<sup>2</sup> and check <em>F</em><sub>d</sub> &le; <em>P</em><sub>cr</sub>/<em>N</em><sub>b</sub>.</p><p><strong>Pin shear:</strong> calculate <em>A</em><sub>p</sub> = &pi;<em>d</em><sub>p</sub><sup>2</sup>/4 and &tau;<sub>avg</sub> = <em>F</em><sub>d</sub>/(<em>n</em><sub>s</sub><em>A</em><sub>p</sub>). Check &tau;<sub>avg</sub> &le; &tau;<sub>allow</sub>.</p><p><strong>Plate bearing:</strong> calculate &sigma;<sub>bearing</sub> = <em>F</em><sub>d</sub>/(<em>td</em><sub>p</sub>). Check &sigma;<sub>bearing</sub> &le; &sigma;<sub>bearing,allow</sub>.</p><p>Identify at least four additional connection checks.</p>",
        "instructor": "<p>The brace force from Question 10 is <em>F</em><sub>d</sub> = {{ladder_brace_force_N}} N.</p><p><strong>Brace yielding:</strong> &sigma;<sub>d</sub> = <em>F</em><sub>d</sub>/<em>A</em><sub>d</sub> = {{ladder_brace_stress_MPa}} MPa. The allowable yield stress is &sigma;<sub>y</sub>/<em>N</em><sub>y</sub> = {{ladder_yield_allow_MPa}} MPa, so the brace yielding utilization ratio is {{ladder_brace_yield_utilization}}.</p><p><strong>Brace buckling:</strong> use mm units with <em>E</em> in MPa and <em>I</em><sub>d</sub> in mm<sup>4</sup>. Brace slenderness is &lambda; = <em>KL</em><sub>d</sub>/<em>r</em><sub>min</sub> = {{ladder_brace_slenderness}}. When Euler buckling is appropriate, <em>P</em><sub>cr</sub> = &pi;<sup>2</sup><em>EI</em><sub>d</sub>/(<em>KL</em><sub>d</sub>)<sup>2</sup> = {{ladder_brace_buckling_N}} N. The allowable buckling load is <em>P</em><sub>cr</sub>/<em>N</em><sub>b</sub> = {{ladder_brace_buckling_allow_N}} N, so the buckling utilization ratio is {{ladder_brace_buckling_utilization}}. Euler buckling is a preliminary elastic-buckling model and should be used only when the brace is slender enough and the end-condition assumption is defensible.</p><p><strong>Pin shear:</strong> <em>A</em><sub>p</sub> = &pi;<em>d</em><sub>p</sub><sup>2</sup>/4 = {{ladder_pin_area_mm2}} mm<sup>2</sup>. Average pin shear stress is &tau;<sub>avg</sub> = <em>F</em><sub>d</sub>/(<em>n</em><sub>s</sub><em>A</em><sub>p</sub>) = {{ladder_pin_shear_MPa}} MPa. Compared with &tau;<sub>allow</sub>, the pin shear utilization ratio is {{ladder_pin_shear_utilization}}.</p><p><strong>Plate bearing:</strong> nominal bearing stress is &sigma;<sub>bearing</sub> = <em>F</em><sub>d</sub>/(<em>td</em><sub>p</sub>) = {{ladder_bearing_MPa}} MPa. Compared with &sigma;<sub>bearing,allow</sub>, the bearing utilization ratio is {{ladder_bearing_utilization}}.</p><p>Additional required checks include pin bending, plate tear-out, net-section rupture, weld failure, fatigue, wear, edge distance, hole clearance, retaining-device failure, and local deformation of the ladder contact region.</p>",
        "section": "analysis"
      },
      {
        "id": "final-recommendation",
        "title": "Final Engineering Recommendation",
        "selected": true,
        "tags": [
          "engineering judgment",
          "recommendation",
          "decision"
        ],
        "type": "decision",
        "difficulty": "intermediate",
        "learningObjectives": [
          "Use system and component results to make a recommendation",
          "Identify unresolved hazards before commercial approval"
        ],
        "student": "<p>Using the system-level assessment and bracket calculations, recommend whether the ladder-platform concept should be accepted for detailed design, modified, rejected, or held pending additional information.</p><p>Identify the governing system-level concern, the governing bracket failure mode, whether strength, stiffness, stability, or durability controls, at least two recommended design improvements, and additional information required before final approval.</p>",
        "instructor": "<p>The student should not approve the complete product solely because the bracket passes its local checks. For the default bracket values, the calculated utilization ratios are: horizontal-arm bending = {{ladder_arm_stress_utilization}}, brace yielding = {{ladder_brace_yield_utilization}}, brace buckling = {{ladder_brace_buckling_utilization}}, pin shear = {{ladder_pin_shear_utilization}}, and plate bearing = {{ladder_bearing_utilization}}. The largest bracket utilization is {{ladder_governing_utilization}}, governed by {{ladder_governing_mode}}, so the bracket-level result {{ladder_design_recommendation}}.</p><p>The final product recommendation must still consider complete-system sliding and overturning, ladder-rung and rail capacity, platform strength and deflection, bracket strength and buckling, connection failure, fatigue and wear, misuse, and installation uncertainty. A defensible preliminary conclusion should identify the largest utilization ratio and the unresolved system-level hazards.</p>",
        "section": "analysis"
      }
    ],
    "variants": [
      {
        "id": "section-a",
        "title": "Homework Version A - full ladder-platform sequence",
        "description": "Default context-rich sequence with system questions followed by bracket idealization and symbolic component checks.",
        "selectedQuestions": [
          "q1",
          "q2",
          "q3",
          "q4",
          "q5",
          "q6",
          "q7",
          "q8",
          "q9",
          "transition-bracket",
          "bracket-idealization",
          "q10",
          "q11",
          "q12",
          "final-recommendation"
        ],
        "variables": {
          "L": 1.2,
          "H": 0.643,
          "Ld": 1,
          "theta": 40,
          "w": 900,
          "A_d": 350,
          "I_d": 250000,
          "r_min": 18,
          "K": 1,
          "S_a": 18000,
          "I_a": 850000,
          "E": 69000,
          "sigma_y": 240,
          "d_p": 12,
          "t": 6,
          "n_s": 1,
          "N_y": 2,
          "N_b": 2,
          "tau_allow": 80,
          "bearing_allow": 150
        }
      }
    ]
  },
  {
    "id": "MOS-LEVER-014",
    "slug": "lever-actuated-wire-support",
    "title": "Lever-Actuated Wire Support Mechanism",
    "studentDocumentTitle": "Student Homework Questions",
    "instructorDocumentTitle": "Instructor Answers",
    "summary": "An advanced lever-and-wire problem integrating rigid-body equilibrium, deformation compatibility, yielding, and elastic-perfectly plastic response.",
    "textbookChapters": [
      "Rigid-body equilibrium",
      "Axial deformation",
      "Displacement compatibility",
      "Yielding",
      "Elastic-perfectly plastic behavior"
    ],
    "derivedPlaceholders": [
      "lever_wire_area_mm2",
      "lever_applied_moment_Nmm",
      "lever_compatibility_ratio",
      "lever_trial_T_AB_kN",
      "lever_trial_T_CD_kN",
      "lever_yield_force_kN",
      "lever_trial_assessment",
      "lever_final_T_AB_kN",
      "lever_final_T_CD_kN",
      "lever_state_AB",
      "lever_state_CD",
      "lever_regime",
      "lever_delta_AB_mm",
      "lever_delta_CD_mm",
      "lever_yield_elongation_mm",
      "lever_plastic_AB_mm",
      "lever_plastic_CD_mm",
      "lever_plastic_moment_capacity_Nmm",
      "lever_recommendation"
    ],
    "image": "problems/lever-actuated-wire-support/assets/lever-industry-context.png",
    "idealizedImage": "problems/lever-actuated-wire-support/assets/lever-instructor-idealization.png",
    "idealizedImageAlt": "Instructor reference idealization of a rigid lever pinned at E, restrained by vertical steel wires AB and CD, and loaded perpendicular to its handle.",
    "source": "problems/lever-actuated-wire-support/index.html",
    "problemStatement": "<p>A manufacturing engineering team is evaluating a hand-operated lever mechanism used in a clamping or tensioning fixture. A rigid lever is pinned at E and restrained by two vertical A-36 steel wires connected to fixed lower anchors.</p><p>An operator applies force <em>P</em> perpendicular to the handle. Lever rotation stretches both wires, but their different distances from E produce unequal elongations and forces. The wires are modeled as elastic-perfectly plastic, so an elastic trial solution must be checked and corrected if yielding occurs.</p>",
    "engineeringGoal": "<p>Determine the final force and elongation in each wire under the applied handle load. Identify the material-response regime and assess whether either wire remains elastic, reaches yield, or exceeds the mechanism's idealized plastic moment capacity.</p>",
    "variables": [
      {
        "key": "P",
        "symbol": "P",
        "label": "Applied handle force",
        "value": 3,
        "unit": "kN",
        "min": 0.01,
        "max": 100,
        "step": 0.1
      },
      {
        "key": "x_AE",
        "symbol": "x_AE",
        "label": "Horizontal distance from wire AB to pivot E",
        "value": 300,
        "unit": "mm",
        "min": 1,
        "max": 5000,
        "step": 10
      },
      {
        "key": "x_CE",
        "symbol": "x_CE",
        "label": "Horizontal distance from wire CD to pivot E",
        "value": 150,
        "unit": "mm",
        "min": 1,
        "max": 5000,
        "step": 10
      },
      {
        "key": "L_h",
        "symbol": "L_h",
        "label": "Handle moment arm for perpendicular force P",
        "value": 450,
        "unit": "mm",
        "min": 1,
        "max": 10000,
        "step": 10
      },
      {
        "key": "theta",
        "symbol": "theta",
        "label": "Handle orientation angle (geometry only)",
        "value": 30,
        "unit": "deg",
        "min": 0,
        "max": 90,
        "step": 1
      },
      {
        "key": "L_w",
        "symbol": "L_w",
        "label": "Initial length of each wire",
        "value": 300,
        "unit": "mm",
        "min": 1,
        "max": 10000,
        "step": 10
      },
      {
        "key": "d_w",
        "symbol": "d_w",
        "label": "Diameter of each wire",
        "value": 4,
        "unit": "mm",
        "min": 0.1,
        "max": 100,
        "step": 0.1
      },
      {
        "key": "E_s",
        "symbol": "E_s",
        "label": "Elastic modulus of A-36 steel wires",
        "value": 200,
        "unit": "GPa",
        "min": 1,
        "max": 300,
        "step": 1
      },
      {
        "key": "sigma_y",
        "symbol": "sigma_y",
        "label": "Yield stress of A-36 steel wires",
        "value": 250,
        "unit": "MPa",
        "min": 1,
        "max": 2000,
        "step": 1
      }
    ],
    "questions": [
      {
        "id": "q1",
        "title": "Primary Function of the System",
        "type": "context interpretation",
        "difficulty": "introductory",
        "tags": [
          "system function",
          "lever",
          "wire tension"
        ],
        "learningObjectives": [
          "Identify the roles of the lever and axial wires."
        ],
        "selected": true,
        "student": "<p>What is the primary structural function of the lever-wire mechanism?</p>",
        "instructor": "<p>The hand-operated rigid lever transfers an applied handle force into tensile forces in two vertical steel wires anchored to the base.</p>",
        "gradingNotes": "<p>Students should identify the lever as a load-transfer component and the wires as axial tension members.</p>",
        "section": "context"
      },
      {
        "id": "q2",
        "title": "External Load",
        "type": "load identification",
        "difficulty": "introductory",
        "tags": [
          "handle force",
          "applied moment",
          "force direction"
        ],
        "learningObjectives": [
          "Relate the perpendicular handle force to its moment about E."
        ],
        "selected": true,
        "student": "<p>Where is the external load applied, and what mechanical effect does it have on the lever?</p>",
        "instructor": "<p>Force <em>P</em> acts perpendicular to the handle at moment arm <em>L</em><sub>h</sub>. It creates a moment <em>PL</em><sub>h</sub> about E that is opposed by moments from the two wire tensions.</p>",
        "section": "context"
      },
      {
        "id": "q3",
        "title": "Supports and Boundary Conditions",
        "type": "boundary conditions",
        "difficulty": "introductory",
        "tags": [
          "pivot",
          "fixed anchors",
          "axial wires"
        ],
        "learningObjectives": [
          "Identify the constraints imposed by the pivot and wire anchors."
        ],
        "selected": true,
        "student": "<p>Locate the supports and constraints, and state what each restrains.</p>",
        "instructor": "<p>Pivot E restrains translation but permits lever rotation. Anchors B and D fix the lower wire ends. Wires AB and CD carry axial tension only.</p>",
        "section": "context"
      },
      {
        "id": "q4",
        "title": "Load Path",
        "type": "load path",
        "difficulty": "introductory",
        "tags": [
          "load path",
          "anchors",
          "pivot reaction"
        ],
        "learningObjectives": [
          "Trace force through the lever, wires, and supports."
        ],
        "selected": true,
        "student": "<p>Trace the load path from the operator's force to the fixed supports.</p>",
        "instructor": "<p>The handle force acts on the rigid lever; the lever transfers load to A and C; wires AB and CD carry tension to anchors B and D; and the anchors transfer load to the base. Pivot E supplies the remaining force reactions required by equilibrium.</p>",
        "section": "context"
      },
      {
        "id": "q5",
        "title": "Critical Components",
        "type": "component identification",
        "difficulty": "introductory",
        "tags": [
          "deformable wires",
          "rigid lever",
          "compatibility"
        ],
        "learningObjectives": [
          "Distinguish deformable components from the rigid compatibility member."
        ],
        "selected": true,
        "student": "<p>Which components are most important for the base mechanics analysis?</p>",
        "instructor": "<p>Wires AB and CD are the critical deformable components. The rigid lever controls their displacement compatibility through rotation about E. The pivot is important for equilibrium, but pivot deformation is neglected.</p>",
        "section": "context"
      },
      {
        "id": "q6",
        "title": "Relevant Mechanical Responses",
        "type": "mechanics reasoning",
        "difficulty": "introductory",
        "tags": [
          "wire force",
          "elongation",
          "yielding"
        ],
        "learningObjectives": [
          "Identify the responses needed for an elastic-perfectly plastic wire analysis."
        ],
        "selected": true,
        "student": "<p>Identify the mechanical responses that must be evaluated and explain why each matters.</p>",
        "instructor": "<p>Determine tension and elongation in each wire, then compare the elastic trial forces with the yield force. If a trial force exceeds yield, the force must be capped under the elastic-perfectly plastic model and equilibrium solved again.</p>",
        "section": "context"
      },
      {
        "id": "q7",
        "title": "Relevant Parameters",
        "type": "parameter identification",
        "difficulty": "introductory",
        "tags": [
          "lever arms",
          "wire geometry",
          "material properties"
        ],
        "learningObjectives": [
          "Identify inputs controlling equilibrium, compatibility, stiffness, and yield."
        ],
        "selected": true,
        "student": "<p>Identify the loading, geometric, and material parameters needed for the analysis.</p>",
        "instructor": "<p>The required parameters are <em>P</em>, <em>x</em><sub>AE</sub>, <em>x</em><sub>CE</sub>, <em>L</em><sub>h</sub>, wire length <em>L</em><sub>w</sub>, wire diameter <em>d</em><sub>w</sub>, modulus <em>E</em><sub>s</sub>, and yield stress <em>&sigma;</em><sub>y</sub>. Angle <em>&theta;</em> describes handle orientation but does not enter the moment because <em>P</em> is specified perpendicular to the handle.</p>",
        "section": "context"
      },
      {
        "id": "q8",
        "title": "Student-Generated Structural Idealization",
        "type": "free-body diagram",
        "difficulty": "intermediate",
        "tags": [
          "idealization",
          "rigid lever",
          "axial wires"
        ],
        "learningObjectives": [
          "Convert the mechanism into a rigid body connected to two axial members."
        ],
        "selected": true,
        "student": "<p>Before using the reference figure, draw a simplified Mechanics of Materials model showing the rigid lever, pivot E, two vertical wires, lower anchors, perpendicular handle force, and relevant dimensions.</p>",
        "instructor": "<p>A correct model treats the lever as a rigid body pinned at E and wires AB and CD as vertical axial tension members connected to fixed lower anchors. Distances from E must be preserved.</p>",
        "gradingNotes": "<p>Students should attempt the free-body and displacement model before seeing the instructor idealization.</p>",
        "section": "transition"
      },
      {
        "id": "q9",
        "title": "Modeling Assumptions",
        "type": "assumptions",
        "difficulty": "intermediate",
        "tags": [
          "small rotation",
          "identical wires",
          "perfect plasticity"
        ],
        "learningObjectives": [
          "State assumptions supporting equilibrium and constitutive analysis."
        ],
        "selected": true,
        "student": "<p>State the assumptions used to simplify the real mechanism.</p>",
        "instructor": "<p>Assume a rigid lever, frictionless pivot, fixed lower anchors, small rotation, vertical axial wire force only, identical initial wire length and diameter, linear elasticity before yield, perfectly plastic response after yield, and neglected lever bending, connection flexibility, pin shear, slack, and strain hardening.</p>",
        "section": "transition"
      },
      {
        "id": "q10",
        "title": "Mechanics Analysis Plan",
        "type": "analysis planning",
        "difficulty": "intermediate",
        "tags": [
          "moment equilibrium",
          "compatibility",
          "yield correction"
        ],
        "learningObjectives": [
          "Plan an elastic-trial and plastic-correction solution."
        ],
        "selected": true,
        "student": "<p>Describe the analysis sequence needed to determine final wire forces and elongations.</p>",
        "instructor": "<p>Write moment equilibrium about E; relate wire elongations through rigid-body rotation; use elastic force-deformation relations for a trial solution; compare each trial force with yield force; correct the force distribution if yielding occurs; then obtain elongations from the elastic wire and lever compatibility.</p>",
        "section": "transition"
      },
      {
        "id": "q11",
        "title": "Boundary Conditions",
        "type": "mechanics setup",
        "difficulty": "introductory",
        "tags": [
          "reference idealization",
          "pivot reactions",
          "wire anchors"
        ],
        "learningObjectives": [
          "Interpret all supports and loads in the reference model."
        ],
        "selected": true,
        "student": "<p>From the instructor reference diagram, identify the boundary conditions and support constraints.</p>",
        "instructor": "<p>Pivot E constrains horizontal and vertical translation but permits rotation. B and D fix the lower wire ends. Wires AB and CD act vertically in tension, and force <em>P</em> acts perpendicular to the handle.</p>",
        "section": "analysis"
      },
      {
        "id": "q12",
        "title": "Unknown Reactions and Wire Forces",
        "type": "unknown identification",
        "difficulty": "introductory",
        "tags": [
          "pivot reactions",
          "wire tensions",
          "unknowns"
        ],
        "learningObjectives": [
          "Identify equilibrium unknowns and the quantities central to the analysis."
        ],
        "selected": true,
        "student": "<p>Identify the unknown reaction components and wire forces.</p>",
        "instructor": "<p>The unknowns are pivot reactions <em>E</em><sub>x</sub> and <em>E</em><sub>y</sub>, tension <em>T</em><sub>AB</sub>, and tension <em>T</em><sub>CD</sub>. The wire tensions are the main Mechanics of Materials quantities. After they are found, the pivot reactions follow from horizontal and vertical force equilibrium using the resolved components of the applied handle force.</p>",
        "section": "analysis"
      },
      {
        "id": "q13",
        "title": "Moment Equilibrium About E",
        "type": "rigid-body equilibrium",
        "difficulty": "intermediate",
        "tags": [
          "moment balance",
          "pivot",
          "wire forces"
        ],
        "learningObjectives": [
          "Write moment equilibrium without pivot reactions."
        ],
        "selected": true,
        "student": "<p>Write the lever moment-equilibrium equation about E using the assigned variables.</p>",
        "instructor": "<p><em>T</em><sub>AB</sub><em>x</em><sub>AE</sub> + <em>T</em><sub>CD</sub><em>x</em><sub>CE</sub> = <em>PL</em><sub>h</sub>. For the assigned values, the applied moment magnitude is <strong>{{lever_applied_moment_Nmm}} N&middot;mm</strong>.</p>",
        "gradingNotes": "<p>Taking moments about E eliminates both pivot reactions.</p>",
        "section": "analysis"
      },
      {
        "id": "q14",
        "title": "Rigid-Body Compatibility",
        "type": "displacement compatibility",
        "difficulty": "intermediate",
        "tags": [
          "small rotation",
          "wire elongation ratio",
          "lever geometry"
        ],
        "learningObjectives": [
          "Relate wire elongations using rigid-lever rotation."
        ],
        "selected": true,
        "student": "<p>Use small rigid-body rotation of the lever to relate wire elongations.</p>",
        "instructor": "<p>Vertical displacement is proportional to distance from E, so &delta;<sub>AB</sub>/&delta;<sub>CD</sub> = <em>x</em><sub>AE</sub>/<em>x</em><sub>CE</sub> = <strong>{{lever_compatibility_ratio}}</strong>.</p>",
        "section": "analysis"
      },
      {
        "id": "q15",
        "title": "Elastic Trial Solution",
        "type": "elastic trial calculation",
        "difficulty": "intermediate",
        "tags": [
          "trial forces",
          "identical wires",
          "equilibrium and compatibility"
        ],
        "learningObjectives": [
          "Combine equilibrium and elastic compatibility to obtain trial wire forces."
        ],
        "selected": true,
        "student": "<p>Assuming both wires remain elastic, determine the trial force in each wire.</p>",
        "instructor": "<p>Because the wires have identical <em>L</em>, <em>A</em>, and <em>E</em>, their elastic force ratio equals their elongation ratio. Combining this with moment equilibrium gives <strong><em>T</em><sub>AB,trial</sub> = {{lever_trial_T_AB_kN}} kN</strong> and <strong><em>T</em><sub>CD,trial</sub> = {{lever_trial_T_CD_kN}} kN</strong>.</p>",
        "section": "analysis"
      },
      {
        "id": "q16",
        "title": "Wire Yield Check",
        "type": "yield calculation",
        "difficulty": "intermediate",
        "tags": [
          "wire area",
          "yield force",
          "trial validation"
        ],
        "learningObjectives": [
          "Calculate yield force and evaluate the elastic trial solution."
        ],
        "selected": true,
        "student": "<p>Calculate the wire area and yield force, then determine whether the elastic trial solution is valid.</p>",
        "instructor": "<p><em>A</em><sub>w</sub> = &pi;<em>d</em><sub>w</sub><sup>2</sup>/4 = <strong>{{lever_wire_area_mm2}} mm<sup>2</sup></strong>. The yield force is <em>F</em><sub>y</sub> = <em>&sigma;</em><sub>y</sub><em>A</em><sub>w</sub> = <strong>{{lever_yield_force_kN}} kN</strong>. {{lever_trial_assessment}}</p>",
        "section": "analysis"
      },
      {
        "id": "q17",
        "title": "Final Elastic-Perfectly Plastic Wire Forces",
        "type": "plastic correction",
        "difficulty": "advanced",
        "tags": [
          "perfect plasticity",
          "corrected forces",
          "plastic capacity"
        ],
        "learningObjectives": [
          "Apply the correct material-response regime after the yield check."
        ],
        "selected": true,
        "student": "<p>Using the elastic-perfectly plastic model, determine the final force in each wire and identify the response regime.</p>",
        "instructor": "<p><strong>{{lever_regime}}</strong></p><p>Final forces are <strong><em>T</em><sub>AB</sub> = {{lever_final_T_AB_kN}} kN</strong> and <strong><em>T</em><sub>CD</sub> = {{lever_final_T_CD_kN}} kN</strong>. The idealized fully plastic moment capacity is <strong>{{lever_plastic_moment_capacity_Nmm}} N&middot;mm</strong>.</p>",
        "commonMistakes": "<p>A yielded elastic-perfectly plastic wire cannot carry force above <em>F</em><sub>y</sub>.</p>",
        "section": "analysis"
      },
      {
        "id": "q18",
        "title": "Wire Elongations",
        "type": "axial deformation and compatibility",
        "difficulty": "advanced",
        "tags": [
          "elastic elongation",
          "plastic elongation",
          "compatibility"
        ],
        "learningObjectives": [
          "Determine compatible elongations and separate elastic and plastic portions."
        ],
        "selected": true,
        "student": "<p>Determine the corresponding elongation of each wire and identify any plastic component.</p>",
        "instructor": "<p>Wire AB is <strong>{{lever_state_AB}}</strong>: &delta;<sub>AB</sub> = <strong>{{lever_delta_AB_mm}} mm</strong>, including <strong>{{lever_plastic_AB_mm}} mm</strong> plastic elongation. Wire CD is <strong>{{lever_state_CD}}</strong>: &delta;<sub>CD</sub> = <strong>{{lever_delta_CD_mm}} mm</strong>, including <strong>{{lever_plastic_CD_mm}} mm</strong> plastic elongation. The elastic elongation at first yield is <strong>{{lever_yield_elongation_mm}} mm</strong>.</p>",
        "gradingNotes": "<p>Once one wire yields, determine rotation from the wire that remains elastic and use compatibility for the yielded wire.</p>",
        "section": "analysis"
      },
      {
        "id": "q19",
        "title": "Engineering Assessment and Recommendation",
        "type": "engineering judgment",
        "difficulty": "advanced",
        "tags": [
          "recommendation",
          "yielding",
          "mechanism capacity"
        ],
        "learningObjectives": [
          "Make a limited recommendation based on force, deformation, and material regime."
        ],
        "selected": true,
        "student": "<p>Use the mechanics results to make a limited engineering recommendation and identify important omitted checks.</p>",
        "instructor": "<p>{{lever_recommendation}}</p><p>Final design also requires lever bending, pivot and anchor strength, wire termination details, fatigue, fracture, slack, strain hardening, large-rotation effects, and cyclic-plasticity checks.</p>",
        "gradingNotes": "<p>The recommendation should be tied to the calculated response regime and should not claim full system safety.</p>",
        "section": "analysis"
      }
    ],
    "variants": [
      {
        "id": "section-a",
        "title": "Homework Version A - baseline lever mechanism",
        "description": "Default sequence for lever equilibrium, wire compatibility, elastic trial analysis, yielding, and corrected response.",
        "selectedQuestions": [
          "q1",
          "q2",
          "q3",
          "q4",
          "q5",
          "q6",
          "q7",
          "q8",
          "q9",
          "q10",
          "q11",
          "q12",
          "q13",
          "q14",
          "q15",
          "q16",
          "q17",
          "q18",
          "q19"
        ],
        "variables": {
          "P": 3,
          "x_AE": 300,
          "x_CE": 150,
          "L_h": 450,
          "theta": 30,
          "L_w": 300,
          "d_w": 4,
          "E_s": 200,
          "sigma_y": 250
        }
      }
    ]
  },
  {
    "id": "MOS-SHAFT-016",
    "slug": "motor-driven-shaft-torsion",
    "title": "Motor-Driven Shaft Design for a Belt-Transmission System",
    "studentDocumentTitle": "Student Homework Questions",
    "instructorDocumentTitle": "Instructor Answers",
    "summary": "A power-transmission problem integrating power-to-torque conversion, solid-shaft torsional stress, standard-size selection, verification, and angle of twist.",
    "textbookChapters": [
      "Power and torque",
      "Torsion of circular shafts",
      "Allowable stress design",
      "Angle of twist"
    ],
    "derivedPlaceholders": [
      "shaft_omega_rad_s",
      "shaft_torque_lb_ft",
      "shaft_torque_lb_in",
      "shaft_d_min_in",
      "shaft_d_selected_in",
      "shaft_d_selected_label",
      "shaft_d_lower_in",
      "shaft_tau_actual_ksi",
      "shaft_utilization",
      "shaft_allowable_factor",
      "shaft_stress_assessment",
      "shaft_J_in4",
      "shaft_phi_rad",
      "shaft_phi_deg",
      "shaft_twist_assessment",
      "shaft_recommendation"
    ],
    "image": "problems/motor-driven-shaft-torsion/assets/shaft-industry-context.png",
    "idealizedImage": "problems/motor-driven-shaft-torsion/assets/shaft-instructor-idealization.png",
    "idealizedImageAlt": "Instructor reference idealization of a motor-driven solid circular shaft transmitting torque to a belt pulley and supported by a bearing.",
    "source": "problems/motor-driven-shaft-torsion/index.html",
    "problemStatement": "<p>A manufacturing facility is upgrading a belt-driven conveyor subsystem. An electric motor delivers power through a solid steel shaft to a pulley and belt set.</p><p>The shaft must transmit the operating torque without exceeding its allowable torsional shear stress. The theoretical minimum diameter must be rounded upward to an available standard size and then verified.</p>",
    "engineeringGoal": "<p>Convert motor power and speed to torque, determine the minimum solid-shaft diameter, select and verify the next available standard size, and evaluate the angle-of-twist serviceability limit.</p>",
    "variables": [
      {
        "key": "P",
        "symbol": "P",
        "label": "Motor power",
        "value": 5,
        "unit": "hp",
        "min": 0.1,
        "max": 1000,
        "step": 0.5
      },
      {
        "key": "n",
        "symbol": "n",
        "label": "Shaft rotational speed",
        "value": 175,
        "unit": "rpm",
        "min": 1,
        "max": 10000,
        "step": 5
      },
      {
        "key": "tau_allow",
        "symbol": "tau_allow",
        "label": "Allowable torsional shear stress",
        "value": 14.5,
        "unit": "ksi",
        "min": 0.1,
        "max": 200,
        "step": 0.5
      },
      {
        "key": "d_step",
        "symbol": "Delta_d",
        "label": "Available shaft-diameter increment",
        "value": 0.125,
        "unit": "in",
        "min": 0.015625,
        "max": 1,
        "step": 0.015625
      },
      {
        "key": "L_AB",
        "symbol": "L_AB",
        "label": "Shaft length for twist check",
        "value": 48,
        "unit": "in",
        "min": 1,
        "max": 1000,
        "step": 1
      },
      {
        "key": "G",
        "symbol": "G",
        "label": "Steel shear modulus",
        "value": 11200,
        "unit": "ksi",
        "min": 100,
        "max": 30000,
        "step": 100
      },
      {
        "key": "phi_allow",
        "symbol": "phi_allow",
        "label": "Allowable angle of twist",
        "value": 1,
        "unit": "deg",
        "min": 0.01,
        "max": 30,
        "step": 0.1
      }
    ],
    "questions": [
      {
        "id": "q1",
        "title": "Primary Function of the Shaft",
        "type": "context interpretation",
        "difficulty": "introductory",
        "tags": [
          "shaft function",
          "power transmission",
          "torque"
        ],
        "learningObjectives": [
          "Identify the shaft's role in the drive system."
        ],
        "selected": true,
        "student": "<p>State the primary structural function of shaft AB.</p>",
        "instructor": "<p>The shaft transmits mechanical power and torque from the motor to the pulley and downstream driven equipment.</p>",
        "section": "context"
      },
      {
        "id": "q2",
        "title": "Power Input and Mechanical Loading",
        "type": "load identification",
        "difficulty": "introductory",
        "tags": [
          "power",
          "angular speed",
          "torque"
        ],
        "learningObjectives": [
          "Relate operating power and speed to torque."
        ],
        "selected": true,
        "student": "<p>Identify the operating quantities that create the shaft loading.</p>",
        "instructor": "<p>Motor power <em>P</em> and angular speed &omega; determine the transmitted torque through <em>P</em> = <em>T</em>&omega;.</p>",
        "section": "context"
      },
      {
        "id": "q3",
        "title": "Supports and Boundary Conditions",
        "type": "boundary conditions",
        "difficulty": "introductory",
        "tags": [
          "motor coupling",
          "bearing",
          "rotation"
        ],
        "learningObjectives": [
          "Distinguish radial support from torsional restraint."
        ],
        "selected": true,
        "student": "<p>Identify the role of the motor connection at A and the bearing at B.</p>",
        "instructor": "<p>The motor-side coupling applies torque at A. The bearing supports the shaft radially while permitting rotation and is not treated as a torsional restraint in the base model.</p>",
        "section": "context"
      },
      {
        "id": "q4",
        "title": "Torque Load Path",
        "type": "load path",
        "difficulty": "introductory",
        "tags": [
          "motor",
          "shaft",
          "pulley",
          "belt"
        ],
        "learningObjectives": [
          "Trace torque through the drive components."
        ],
        "selected": true,
        "student": "<p>Trace the torque path from the motor to the driven equipment.</p>",
        "instructor": "<p>The path is motor rotor, coupling at A, shaft AB, pulley, belts, and downstream machine.</p>",
        "section": "context"
      },
      {
        "id": "q5",
        "title": "Critical Component and Response",
        "type": "mechanics reasoning",
        "difficulty": "introductory",
        "tags": [
          "solid shaft",
          "torsional shear stress",
          "outer surface"
        ],
        "learningObjectives": [
          "Identify the governing base-model response."
        ],
        "selected": true,
        "student": "<p>Identify the critical component and mechanical response in the base problem.</p>",
        "instructor": "<p>The solid steel shaft is the critical component, and its maximum torsional shear stress occurs at the outer surface.</p>",
        "section": "context"
      },
      {
        "id": "q6",
        "title": "Relevant Parameters",
        "type": "parameter identification",
        "difficulty": "introductory",
        "tags": [
          "diameter",
          "allowable stress",
          "speed"
        ],
        "learningObjectives": [
          "Identify inputs controlling torque and stress."
        ],
        "selected": true,
        "student": "<p>List the parameters controlling shaft stress and explain their roles.</p>",
        "instructor": "<p>Power and speed determine torque; torque and diameter determine shear stress; allowable stress sets the design limit. For a solid shaft, &tau;<sub>max</sub> varies with <em>T</em>/<em>d</em><sup>3</sup>.</p>",
        "section": "context"
      },
      {
        "id": "q7",
        "title": "Speed Sensitivity",
        "type": "qualitative reasoning",
        "difficulty": "introductory",
        "tags": [
          "fixed power",
          "speed",
          "diameter scaling"
        ],
        "learningObjectives": [
          "Predict how lower speed affects torque and shaft size."
        ],
        "selected": true,
        "student": "<p>For fixed motor power, predict what happens to torque and required diameter if shaft speed decreases.</p>",
        "instructor": "<p>Torque increases because <em>T</em> = <em>P</em>/&omega;. Required diameter also increases, with <em>d</em><sub>min</sub> proportional to <em>T</em><sup>1/3</sup>.</p>",
        "section": "context"
      },
      {
        "id": "q8",
        "title": "Student-Generated Torsion Idealization",
        "type": "free-body diagram",
        "difficulty": "intermediate",
        "tags": [
          "idealization",
          "internal torque",
          "bearing"
        ],
        "learningObjectives": [
          "Create a torsion model before viewing the reference figure."
        ],
        "selected": true,
        "student": "<p>Before using the reference figure, draw a simplified torsion model of the motor, shaft, pulley, and bearing. Show applied torque, diameter, and rotational direction.</p>",
        "instructor": "<p>A valid model treats AB as a uniform solid circular shaft carrying constant internal torque between the motor and pulley, with B shown as a rotation-permitting bearing.</p>",
        "gradingNotes": "<p>Students should attempt the torsion model before seeing the instructor idealization.</p>",
        "section": "transition"
      },
      {
        "id": "q9",
        "title": "Modeling Assumptions",
        "type": "assumptions",
        "difficulty": "intermediate",
        "tags": [
          "pure torsion",
          "steady operation",
          "solid shaft"
        ],
        "learningObjectives": [
          "State assumptions supporting the torsion equations."
        ],
        "selected": true,
        "student": "<p>State the assumptions used in the base analysis.</p>",
        "instructor": "<p>Assume steady operation, a uniform solid circular shaft, linear elasticity, pure torsion, constant transmitted power, negligible bearing friction, and no belt bending, keyway, stress concentration, shock, or fatigue effects.</p>",
        "section": "transition"
      },
      {
        "id": "q10",
        "title": "Mechanics Analysis Plan",
        "type": "analysis planning",
        "difficulty": "intermediate",
        "tags": [
          "unit conversion",
          "diameter sizing",
          "verification"
        ],
        "learningObjectives": [
          "Plan a complete stress-based shaft selection."
        ],
        "selected": true,
        "student": "<p>Outline the calculation sequence before substituting numbers.</p>",
        "instructor": "<p>Convert rpm to rad/s; compute torque from power; solve the solid-shaft stress equation for minimum diameter; round upward to the available increment; verify selected-size stress; then evaluate twist if required.</p>",
        "section": "transition"
      },
      {
        "id": "q11",
        "title": "Torsion Boundary Conditions",
        "type": "mechanics setup",
        "difficulty": "introductory",
        "tags": [
          "reference figure",
          "torque input",
          "pulley"
        ],
        "learningObjectives": [
          "Interpret the reference idealization."
        ],
        "selected": true,
        "student": "<p>From the reference diagram, identify the torsion-related boundary conditions and idealizations.</p>",
        "instructor": "<p>Torque enters at A from the motor and is removed at the pulley. Bearing B supports the shaft radially but permits rotation and does not remove transmitted torque in this idealization.</p>",
        "section": "analysis"
      },
      {
        "id": "q12",
        "title": "Angular Speed",
        "type": "unit conversion",
        "difficulty": "introductory",
        "tags": [
          "rpm",
          "rad per second",
          "angular velocity"
        ],
        "learningObjectives": [
          "Convert rotational speed to angular speed."
        ],
        "selected": true,
        "student": "<p>Convert the assigned shaft speed from rpm to rad/s.</p>",
        "instructor": "<p>&omega; = <em>n</em>(2&pi;/60) = <strong>{{shaft_omega_rad_s}} rad/s</strong>.</p>",
        "section": "analysis"
      },
      {
        "id": "q13",
        "title": "Transmitted Torque",
        "type": "power and torque calculation",
        "difficulty": "intermediate",
        "tags": [
          "horsepower",
          "P equals T omega",
          "unit conversion"
        ],
        "learningObjectives": [
          "Calculate torque from motor power and speed."
        ],
        "selected": true,
        "student": "<p>Determine the torque carried by the shaft from the specified motor power and speed.</p>",
        "instructor": "<p>Using 1 hp = 550 ft&middot;lb/s, <em>T</em> = <em>P</em>/&omega; = <strong>{{shaft_torque_lb_ft}} lb&middot;ft</strong> = <strong>{{shaft_torque_lb_in}} lb&middot;in</strong>.</p>",
        "commonMistakes": "<p>Do not mix lb-ft torque with a diameter measured in inches.</p>",
        "section": "analysis"
      },
      {
        "id": "q14",
        "title": "Internal Torque Diagram",
        "type": "internal loading",
        "difficulty": "introductory",
        "tags": [
          "torque diagram",
          "constant torque",
          "shaft segment"
        ],
        "learningObjectives": [
          "Determine the shaft's internal torque distribution."
        ],
        "selected": true,
        "student": "<p>Draw and label the internal torque diagram for shaft AB.</p>",
        "instructor": "<p>The internal torque is constant over the power-transmitting shaft segment and has magnitude <strong>{{shaft_torque_lb_ft}} lb&middot;ft</strong>.</p>",
        "section": "analysis"
      },
      {
        "id": "q15",
        "title": "Minimum Theoretical Diameter",
        "type": "torsional stress sizing",
        "difficulty": "intermediate",
        "tags": [
          "solid shaft",
          "allowable stress",
          "diameter"
        ],
        "learningObjectives": [
          "Solve the solid-shaft torsion equation for diameter."
        ],
        "selected": true,
        "student": "<p>Using the allowable shear stress, determine the minimum theoretical diameter of the solid circular shaft.</p>",
        "instructor": "<p>For a solid shaft, &tau;<sub>max</sub> = 16<em>T</em>/(&pi;<em>d</em><sup>3</sup>). Therefore <em>d</em><sub>min</sub> = [16<em>T</em>/(&pi;&tau;<sub>allow</sub>)]<sup>1/3</sup> = <strong>{{shaft_d_min_in}} in</strong>.</p>",
        "section": "analysis"
      },
      {
        "id": "q16",
        "title": "Standard Shaft Selection",
        "type": "component selection",
        "difficulty": "intermediate",
        "tags": [
          "standard size",
          "round upward",
          "diameter increment"
        ],
        "learningObjectives": [
          "Select a manufacturable diameter without violating stress."
        ],
        "selected": true,
        "student": "<p>Select the smallest available shaft diameter using the assigned standard-size increment. Explain the rounding direction.</p>",
        "instructor": "<p>Round upward to <strong>{{shaft_d_selected_label}}</strong>. The selected decimal diameter is <strong>{{shaft_d_selected_in}} in</strong>; the next lower available size is <strong>{{shaft_d_lower_in}} in</strong> and does not meet the theoretical minimum.</p>",
        "section": "analysis"
      },
      {
        "id": "q17",
        "title": "Selected-Diameter Verification",
        "type": "design verification",
        "difficulty": "intermediate",
        "tags": [
          "actual stress",
          "utilization",
          "allowable factor"
        ],
        "learningObjectives": [
          "Verify stress and quantify design margin."
        ],
        "selected": true,
        "student": "<p>Calculate the actual maximum shear stress, utilization ratio, and allowable-stress factor for the selected shaft.</p>",
        "instructor": "<p>&tau;<sub>actual</sub> = <strong>{{shaft_tau_actual_ksi}} ksi</strong>. Utilization is <strong>{{shaft_utilization}}</strong>, and the allowable-stress factor is <strong>{{shaft_allowable_factor}}</strong>. {{shaft_stress_assessment}}</p>",
        "section": "analysis"
      },
      {
        "id": "q18",
        "title": "Angle-of-Twist Check",
        "type": "torsional deformation",
        "difficulty": "intermediate",
        "tags": [
          "polar moment",
          "angle of twist",
          "serviceability"
        ],
        "learningObjectives": [
          "Calculate polar moment and shaft twist."
        ],
        "selected": true,
        "student": "<p>For the assigned shaft length and shear modulus, calculate the polar moment and angle of twist, then compare the result with the twist limit.</p>",
        "instructor": "<p><em>J</em> = &pi;<em>d</em><sup>4</sup>/32 = <strong>{{shaft_J_in4}} in<sup>4</sup></strong>. Using &phi; = <em>TL</em>/(<em>JG</em>), &phi; = <strong>{{shaft_phi_rad}} rad</strong> = <strong>{{shaft_phi_deg}}&deg;</strong>. {{shaft_twist_assessment}}</p>",
        "section": "analysis"
      },
      {
        "id": "q19",
        "title": "Engineering Assessment",
        "type": "engineering judgment",
        "difficulty": "advanced",
        "tags": [
          "acceptance",
          "limitations",
          "combined loading"
        ],
        "learningObjectives": [
          "Make a bounded shaft recommendation."
        ],
        "selected": true,
        "student": "<p>State whether the selected shaft is acceptable in the base model and identify omitted checks required for detailed design.</p>",
        "instructor": "<p>{{shaft_recommendation}}</p><p>Detailed design must also consider belt-induced bending, bearing reactions, keyways and stress concentrations, fatigue, shock loading, critical speed, coupling details, and manufacturing tolerances.</p>",
        "gradingNotes": "<p>Students should not claim full system safety from the pure-torsion calculation alone.</p>",
        "section": "analysis"
      }
    ],
    "variants": [
      {
        "id": "section-a",
        "title": "Homework Version A - baseline motor-driven shaft",
        "description": "Default sequence for power-to-torque conversion, torsional sizing, standard selection, verification, and twist.",
        "selectedQuestions": [
          "q1",
          "q2",
          "q3",
          "q4",
          "q5",
          "q6",
          "q7",
          "q8",
          "q9",
          "q10",
          "q11",
          "q12",
          "q13",
          "q14",
          "q15",
          "q16",
          "q17",
          "q18",
          "q19"
        ],
        "variables": {
          "P": 5,
          "n": 175,
          "tau_allow": 14.5,
          "d_step": 0.125,
          "L_AB": 48,
          "G": 11200,
          "phi_allow": 1
        }
      }
    ]
  },
  {
    "id": "MOS-BIKE-004",
    "slug": "mountain-bike-suspension-pin",
    "title": "Rear Suspension Linkage Pin Safety Check for a Mountain Bike",
    "studentDocumentTitle": "Student Homework Questions",
    "instructorDocumentTitle": "Instructor Answers",
    "summary": "A context-rich mechanics problem on rear suspension linkage forces, double-shear pin stress, and factor of safety.",
    "textbookChapters": [
      "Rigid-body equilibrium",
      "Shear stress",
      "Connections and fasteners",
      "Factor of safety"
    ],
    "derivedPlaceholders": [
      "bike_total_arm_mm",
      "bike_B_moment_arm_mm",
      "bike_link_force_N",
      "bike_B_force_x_N",
      "bike_B_force_y_N",
      "bike_C_reaction_x_N",
      "bike_C_reaction_y_N",
      "bike_C_reaction_N",
      "bike_pin_B_area_mm2",
      "bike_pin_C_area_mm2",
      "bike_pin_B_double_area_mm2",
      "bike_pin_C_double_area_mm2",
      "bike_pin_B_shear_MPa",
      "bike_pin_C_shear_MPa",
      "bike_pin_B_fos",
      "bike_pin_C_fos",
      "bike_governing_pin",
      "bike_governing_fos",
      "bike_recommendation"
    ],
    "image": "problems/mountain-bike-suspension-pin/assets/mountain-bike-industry-context.png",
    "idealizedImage": "problems/mountain-bike-suspension-pin/assets/mountain-bike-instructor-idealization.png",
    "idealizedImageAlt": "Instructor idealized suspension linkage model with load, points, dimensions, and link angle.",
    "source": "problems/mountain-bike-suspension-pin/index.html",
    "problemStatement": "<p>A mountain-bike or lightweight e-bike product team is reviewing the rear suspension linkage that supports rider load through a seat support member and shock absorber linkage. During riding, a vertical load from the rider is transmitted through the saddle into a curved support member, then into frame-mounted pins and the shock/link assembly.</p><p>As a junior mechanical engineer, you must simplify the real suspension assembly into a mechanics model and determine whether the pins at B and C have adequate resistance against shear failure under the specified design load. The analysis is limited to static equilibrium and average double-shear stress in the pins. Detailed dynamic loading, fatigue, bearing pressure, bushing wear, and frame deformation are outside the base problem.</p>",
    "engineeringGoal": "<p>Determine the forces transmitted through the suspension linkage and evaluate the factor of safety of pins B and C against shear failure. Identify the governing pin and make a limited mechanics-based recommendation for the specified static load case.</p>",
    "variables": [
      {
        "key": "P",
        "symbol": "P",
        "label": "Applied rider/design load",
        "value": 1500,
        "unit": "N",
        "min": 200,
        "max": 5000,
        "step": 50
      },
      {
        "key": "x_AB",
        "symbol": "x_AB",
        "label": "Horizontal distance from A to B",
        "value": 300,
        "unit": "mm",
        "min": 50,
        "max": 800,
        "step": 10
      },
      {
        "key": "x_BC",
        "symbol": "x_BC",
        "label": "Horizontal distance from B to C",
        "value": 100,
        "unit": "mm",
        "min": 20,
        "max": 400,
        "step": 5
      },
      {
        "key": "y_BC",
        "symbol": "y_BC",
        "label": "Vertical offset between B and C",
        "value": 30,
        "unit": "mm",
        "min": 0,
        "max": 200,
        "step": 5
      },
      {
        "key": "theta_BD",
        "symbol": "theta_BD",
        "label": "Shock/link angle from horizontal",
        "value": 60,
        "unit": "deg",
        "min": 20,
        "max": 80,
        "step": 1
      },
      {
        "key": "tau_fail",
        "symbol": "tau_fail",
        "label": "Shear failure stress of pin material",
        "value": 150,
        "unit": "MPa",
        "min": 40,
        "max": 500,
        "step": 5
      },
      {
        "key": "d_B",
        "symbol": "d_B",
        "label": "Diameter of pin B",
        "value": 7.5,
        "unit": "mm",
        "min": 3,
        "max": 25,
        "step": 0.5
      },
      {
        "key": "d_C",
        "symbol": "d_C",
        "label": "Diameter of pin C",
        "value": 6.5,
        "unit": "mm",
        "min": 3,
        "max": 25,
        "step": 0.5
      },
      {
        "key": "n_s",
        "symbol": "n_s",
        "label": "Number of shear planes per pin",
        "value": 2,
        "unit": "-",
        "min": 1,
        "max": 2,
        "step": 1
      }
    ],
    "questions": [
      {
        "id": "q1",
        "title": "Primary Function of the System",
        "selected": true,
        "tags": [
          "context",
          "function",
          "load path"
        ],
        "type": "conceptual",
        "difficulty": "introductory",
        "learningObjectives": [
          "Identify the structural function of a linkage",
          "Connect the real product to load transfer"
        ],
        "gradingNotes": "<p>Good answers should emphasize force transfer and support of load, not only comfort or product aesthetics.</p>",
        "student": "<p>What is the primary structural function of the rear suspension linkage shown in the industry-context image?</p>",
        "instructor": "<p>The linkage supports the rider load and transfers it from the saddle or seat support into the bicycle frame through the frame pivot at C and the shock/link connection at B-D.</p>",
        "section": "context"
      },
      {
        "id": "q2",
        "title": "External Load",
        "selected": true,
        "tags": [
          "loading",
          "idealization"
        ],
        "type": "conceptual",
        "difficulty": "introductory",
        "learningObjectives": [
          "Identify the applied load",
          "Relate a physical rider load to an idealized point load"
        ],
        "student": "<p>Where is the external load applied in the idealized problem, and what physical action does it represent?</p>",
        "instructor": "<p>The external load <em>P</em> is applied downward at point A, representing the vertical load transmitted from the rider through the saddle to the suspension member.</p><p>Students should not distribute the load throughout the frame unless the instructor explicitly modifies the problem.</p>",
        "section": "context"
      },
      {
        "id": "q3",
        "title": "Supports and Boundary Conditions",
        "selected": true,
        "tags": [
          "supports",
          "two-force member",
          "pins"
        ],
        "type": "conceptual",
        "difficulty": "introductory to intermediate",
        "learningObjectives": [
          "Identify idealized supports",
          "Recognize a two-force member"
        ],
        "student": "<p>Identify the support or connection locations that constrain the seat support member in the idealized model.</p>",
        "instructor": "<p>The seat support member is pinned to the frame at C and connected to the shock/link at B. The shock/link BD is treated as a two-force member, so the force at B acts along BD. Pin C provides reaction components on the seat support member.</p><p>This problem is not a fixed-beam problem. The key idealizations are pin support at C and two-force member BD at B.</p>",
        "section": "context"
      },
      {
        "id": "q4",
        "title": "Load Path",
        "selected": true,
        "tags": [
          "load path",
          "components"
        ],
        "type": "conceptual",
        "difficulty": "introductory",
        "learningObjectives": [
          "Trace the load path through a linkage",
          "Name the pin-connected components that transfer load"
        ],
        "student": "<p>Using the component list, trace the load path from the rider load to the bicycle frame.</p>",
        "instructor": "<p>One acceptable load path is: rider load at saddle &rarr; curved seat support member &rarr; pin C and shock/link attachment at B &rarr; shock/link BD &rarr; lower frame joint at D &rarr; bicycle frame. The load is shared through the frame pin and the shock linkage.</p><p>The load path should explicitly mention the pins because they are the design-check components.</p>",
        "section": "context"
      },
      {
        "id": "q5",
        "title": "Critical Components and Locations",
        "selected": true,
        "tags": [
          "critical components",
          "failure modes"
        ],
        "type": "conceptual",
        "difficulty": "introductory",
        "learningObjectives": [
          "Identify the components included in a simplified stress check",
          "Distinguish base-problem checks from detailed design checks"
        ],
        "student": "<p>Which components or locations are most critical for the simplified mechanics analysis?</p>",
        "instructor": "<p>The critical components in the base problem are pins B and C because the design question asks for their factor of safety against shear failure. The seat support member and shock link also carry load, but their material and section properties are not provided for detailed stress checks.</p>",
        "section": "context"
      },
      {
        "id": "q6",
        "title": "Critical Mechanical Response",
        "selected": true,
        "tags": [
          "shear stress",
          "double shear",
          "factor of safety"
        ],
        "type": "conceptual",
        "difficulty": "introductory",
        "learningObjectives": [
          "Identify average shear stress as the target response",
          "Explain double shear in connector design"
        ],
        "student": "<p>For pins B and C, identify the relevant mechanical response or failure mechanism considered in this problem.</p>",
        "instructor": "<p>The relevant response is average shear stress in each pin. Both pins are specified to be in double shear, so each pin has two resisting shear planes. The factor of safety is based on the material shear failure stress.</p><p>Bearing stress, bending of the pin, fatigue, bushing wear, and frame stresses are realistic concerns but are not part of the base MEEN 305 calculation.</p>",
        "section": "context"
      },
      {
        "id": "q7",
        "title": "Relevant Geometric and Material Parameters",
        "selected": true,
        "tags": [
          "geometry",
          "materials",
          "pin shear"
        ],
        "type": "conceptual",
        "difficulty": "introductory to intermediate",
        "learningObjectives": [
          "Identify variables that control pin shear stress",
          "Connect pin diameter to shear area and FOS"
        ],
        "student": "<p>Identify the geometric and material parameters that control the pin shear stress and factor of safety.</p>",
        "instructor": "<p>Relevant parameters are load <em>P</em>, horizontal distances from A to B and B to C, vertical offset between B and C, angle of shock/link BD, pin diameters <em>d</em><sub>B</sub> and <em>d</em><sub>C</sub>, number of shear planes <em>n</em><sub>s</sub>, and shear failure stress &tau;<sub>fail</sub>.</p><p>The pin area is <em>A</em> = &pi;<em>d</em><sup>2</sup>/4 and the total double-shear area is <em>n</em><sub>s</sub><em>A</em>. Students should connect pin diameter to shear area and factor of safety through &tau; = <em>V</em>/(<em>n</em><sub>s</sub><em>A</em>) and FOS = &tau;<sub>fail</sub>/&tau;.</p>",
        "section": "context"
      },
      {
        "id": "q8",
        "title": "Student-Generated Structural Idealization",
        "selected": true,
        "tags": [
          "idealization",
          "fbd",
          "two-force member"
        ],
        "type": "fbd/modeling",
        "difficulty": "intermediate",
        "learningObjectives": [
          "Convert a product image into a 2D mechanics model",
          "Draw a load-transfer diagram"
        ],
        "student": "<p>Convert the real rear suspension assembly into a simplified 2D Mechanics of Materials model. Your sketch should show point A where load <em>P</em> is applied, pin locations B and C, lower joint D, shock/link BD, <strong>{{x_AB}} {{x_AB_unit}}</strong> and <strong>{{x_BC}} {{x_BC_unit}}</strong> horizontal dimensions, the <strong>{{y_BC}} {{y_BC_unit}}</strong> vertical offset, the <strong>{{theta_BD}} {{theta_BD_unit}}</strong> link angle, and the unknown pin/link forces.</p><p>Student model placeholder: insert or draw the simplified model and free-body/load-transfer diagram here.</p>",
        "instructor": "<p>A correct idealization treats the seat support as a rigid body acted on by the downward load <em>P</em> at A, the force from the two-force member BD at B, and reaction components at C. Pins B and C are later checked in double shear.</p><p>For the student packet, this should appear before the instructor reference model unless the activity is intentionally scaffolded.</p>",
        "section": "transition"
      },
      {
        "id": "q9",
        "title": "Modeling Assumptions",
        "selected": true,
        "tags": [
          "assumptions",
          "model limitations"
        ],
        "type": "conceptual",
        "difficulty": "intermediate",
        "learningObjectives": [
          "State assumptions for a simplified linkage model",
          "Identify excluded real-design effects"
        ],
        "student": "<p>State the assumptions used to convert the real suspension assembly into the simplified Solid Mechanics model.</p>",
        "instructor": "<p>Appropriate assumptions include static loading; seat support treated as a rigid body for force analysis; BD treated as a two-force member; pins B and C treated as double-shear connectors; loads act in the plane of the idealized diagram; pin shear stress is averaged over the shear area; and fatigue, bearing stress, bushing wear, dynamic impact, shock nonlinearities, frame flexibility, and stress concentrations are neglected.</p><p>Expected answers do not need every assumption, but they should include rigid-body equilibrium, two-force member BD, and double-shear pin idealization.</p>",
        "section": "transition"
      },
      {
        "id": "q10",
        "title": "Mechanics Analysis Plan",
        "selected": true,
        "tags": [
          "analysis plan",
          "equilibrium",
          "factor of safety"
        ],
        "type": "calculation planning",
        "difficulty": "introductory to intermediate",
        "learningObjectives": [
          "Plan the solution sequence before substituting numbers",
          "Connect equilibrium results to stress and FOS"
        ],
        "student": "<p>Before calculating, describe the analysis sequence needed to determine the factor of safety of pins B and C.</p>",
        "instructor": "<p>The analysis sequence is: draw the FBD of the seat support member; use moment equilibrium about C to find the force in BD and the load at pin B; use force equilibrium to find the reaction at C; compute double-shear area for each pin; compute average shear stress &tau;<sub>B</sub> and &tau;<sub>C</sub>; compute FOS<sub>B</sub> and FOS<sub>C</sub>; identify the governing pin; and make a recommendation.</p>",
        "section": "transition"
      },
      {
        "id": "q11",
        "title": "Boundary and Loading Conditions from the Instructor Diagram",
        "selected": true,
        "tags": [
          "loading",
          "boundary conditions"
        ],
        "type": "conceptual",
        "difficulty": "introductory",
        "learningObjectives": [
          "Identify loads and idealized connections from a diagram",
          "Avoid incorrect beam-support interpretations"
        ],
        "student": "<p>From the instructor diagram, identify the loading conditions and main connection idealizations.</p>",
        "instructor": "<p>The load <em>P</em> acts downward at A. Pin C connects the seat support to the frame and provides reaction components. Point B connects the seat support to the shock/link BD. Member BD is idealized as a two-force member, so the force at B acts along BD. Pins B and C are double-shear connectors for the stress check.</p><p>This replaces a standard beam-support interpretation. The critical idealizations are pin C and two-force member BD.</p>",
        "section": "analysis"
      },
      {
        "id": "q12",
        "title": "Unknown Forces",
        "selected": true,
        "tags": [
          "unknowns",
          "fbd"
        ],
        "type": "conceptual",
        "difficulty": "introductory",
        "learningObjectives": [
          "List unknown forces before solving equilibrium",
          "Separate known force direction from unknown magnitude"
        ],
        "student": "<p>Identify the unknown forces that must be solved before calculating pin stresses.</p>",
        "instructor": "<p>The unknowns are the force in member BD at B and the reaction components at pin C. The force at B has a known direction along BD, but unknown magnitude. The reaction at C has unknown horizontal and vertical components.</p><p>Students should solve for forces before applying &tau; = <em>V</em>/<em>A</em>.</p>",
        "section": "analysis"
      },
      {
        "id": "q13",
        "title": "Free-Body Diagram of the Seat Support Member",
        "selected": true,
        "tags": [
          "free-body diagram",
          "two-force member"
        ],
        "type": "fbd/modeling",
        "difficulty": "intermediate",
        "learningObjectives": [
          "Draw the FBD of a pin-connected body",
          "Show two-force member force direction"
        ],
        "student": "<p>Draw the free-body diagram of the seat support member, showing <em>P</em> at A, the force from BD at B, and the reaction components at C.</p>",
        "instructor": "<p>A correct FBD shows <em>P</em> downward at A, force <em>F</em><sub>BD</sub> at B acting along the shock/link direction, and reaction components <em>C</em><sub>x</sub> and <em>C</em><sub>y</sub> at pin C.</p><p>The direction of <em>F</em><sub>BD</sub> on the upper member should be chosen consistently; if assumed opposite, a negative solution indicates the actual direction.</p>",
        "section": "analysis"
      },
      {
        "id": "q14",
        "title": "Moment Equilibrium to Determine Link Force",
        "selected": true,
        "tags": [
          "moment equilibrium",
          "link force"
        ],
        "type": "calculation",
        "difficulty": "intermediate",
        "learningObjectives": [
          "Use moment equilibrium about a pin",
          "Include the vertical offset in a force moment arm"
        ],
        "commonMistakes": "<p>A common error is to omit the vertical offset <em>y</em><sub>BC</sub> and use only <em>x</em><sub>BC</sub> sin&theta;<sub>BD</sub> as the moment arm.</p>",
        "student": "<p>Use moment equilibrium about C to determine the magnitude of the force transmitted through shock/link BD.</p>",
        "instructor": "<p>The moment arm of <em>P</em> about C is <em>x</em><sub>AB</sub> + <em>x</em><sub>BC</sub> = {{bike_total_arm_mm}} mm. The force at B acts along BD. With <em>x</em><sub>BC</sub> = {{x_BC}} {{x_BC_unit}}, <em>y</em><sub>BC</sub> = {{y_BC}} {{y_BC_unit}}, and &theta;<sub>BD</sub> = {{theta_BD}} {{theta_BD_unit}}, the resisting moment arm is <em>x</em><sub>BC</sub> sin&theta;<sub>BD</sub> + <em>y</em><sub>BC</sub> cos&theta;<sub>BD</sub> = {{bike_B_moment_arm_mm}} mm.</p><p>Therefore, <em>F</em><sub>BD</sub> = <em>P</em>(<em>x</em><sub>AB</sub> + <em>x</em><sub>BC</sub>)/moment arm = {{bike_link_force_N}} N.</p>",
        "section": "analysis"
      },
      {
        "id": "q15",
        "title": "Reaction Components at C",
        "selected": true,
        "tags": [
          "force equilibrium",
          "reactions"
        ],
        "type": "calculation",
        "difficulty": "intermediate",
        "learningObjectives": [
          "Resolve an inclined link force",
          "Use force equilibrium to find pin reaction components"
        ],
        "student": "<p>Using force equilibrium, determine the reaction components at pin C.</p>",
        "instructor": "<p>For the force direction that balances the applied load, the force at B on the seat support has components <em>F</em><sub>Bx</sub> = -<em>F</em><sub>BD</sub> cos&theta;<sub>BD</sub> = {{bike_B_force_x_N}} N and <em>F</em><sub>By</sub> = <em>F</em><sub>BD</sub> sin&theta;<sub>BD</sub> = {{bike_B_force_y_N}} N.</p><p>Force equilibrium gives <em>C</em><sub>x</sub> = {{bike_C_reaction_x_N}} N and <em>C</em><sub>y</sub> = {{bike_C_reaction_y_N}} N. The reaction magnitude is <em>R</em><sub>C</sub> = {{bike_C_reaction_N}} N.</p><p>The magnitude of the reaction at C is used for the shear force in pin C.</p>",
        "section": "analysis"
      },
      {
        "id": "q16",
        "title": "Shear Force Carried by Pin B",
        "selected": true,
        "tags": [
          "pin force",
          "double shear"
        ],
        "type": "calculation",
        "difficulty": "introductory to intermediate",
        "learningObjectives": [
          "Identify the shear force demand in a linkage pin",
          "Connect link force to pin shear"
        ],
        "student": "<p>Determine the shear force carried by pin B.</p>",
        "instructor": "<p>Pin B transmits the force from the shock/link BD into the seat support. The shear force demand in pin B is taken as <em>V</em><sub>B</sub> = <em>F</em><sub>BD</sub> = {{bike_link_force_N}} N.</p><p>Because the problem states that pin B is in double shear, this total load is resisted over two shear planes.</p>",
        "section": "analysis"
      },
      {
        "id": "q17",
        "title": "Shear Force Carried by Pin C",
        "selected": true,
        "tags": [
          "pin force",
          "reaction magnitude"
        ],
        "type": "calculation",
        "difficulty": "introductory to intermediate",
        "learningObjectives": [
          "Use reaction magnitude as pin shear demand",
          "Avoid using only one reaction component for pin shear"
        ],
        "student": "<p>Determine the shear force carried by pin C.</p>",
        "instructor": "<p>Pin C transmits the reaction between the seat support and frame. The shear force demand in pin C is the reaction magnitude <em>V</em><sub>C</sub> = <em>R</em><sub>C</sub> = {{bike_C_reaction_N}} N.</p><p>Use the resultant reaction, not only one component, for the pin shear demand.</p>",
        "section": "analysis"
      },
      {
        "id": "q18",
        "title": "Double-Shear Areas of Pins B and C",
        "selected": true,
        "tags": [
          "area",
          "double shear",
          "pin diameter"
        ],
        "type": "calculation",
        "difficulty": "introductory",
        "learningObjectives": [
          "Compute circular pin area",
          "Apply double-shear resisting area"
        ],
        "student": "<p>Calculate the total double-shear resisting area for pins B and C.</p>",
        "instructor": "<p>For a circular pin, <em>A</em> = &pi;<em>d</em><sup>2</sup>/4. For pin B, <em>A</em><sub>B</sub> = {{bike_pin_B_area_mm2}} mm<sup>2</sup> and the total shear area is <em>n</em><sub>s</sub><em>A</em><sub>B</sub> = {{bike_pin_B_double_area_mm2}} mm<sup>2</sup>. For pin C, <em>A</em><sub>C</sub> = {{bike_pin_C_area_mm2}} mm<sup>2</sup> and the total shear area is <em>n</em><sub>s</sub><em>A</em><sub>C</sub> = {{bike_pin_C_double_area_mm2}} mm<sup>2</sup>.</p><p>Use N and mm units so that stress is in N/mm<sup>2</sup> = MPa.</p>",
        "section": "analysis"
      },
      {
        "id": "q19",
        "title": "Average Shear Stress in Pins B and C",
        "selected": true,
        "tags": [
          "shear stress",
          "double shear"
        ],
        "type": "calculation",
        "difficulty": "introductory to intermediate",
        "learningObjectives": [
          "Compute average double-shear stress",
          "Compare load and diameter effects"
        ],
        "student": "<p>Determine the average shear stress in pins B and C.</p>",
        "instructor": "<p>Pin B: &tau;<sub>B</sub> = <em>V</em><sub>B</sub>/(<em>n</em><sub>s</sub><em>A</em><sub>B</sub>) = {{bike_link_force_N}}/{{bike_pin_B_double_area_mm2}} = {{bike_pin_B_shear_MPa}} MPa.</p><p>Pin C: &tau;<sub>C</sub> = <em>V</em><sub>C</sub>/(<em>n</em><sub>s</sub><em>A</em><sub>C</sub>) = {{bike_C_reaction_N}}/{{bike_pin_C_double_area_mm2}} = {{bike_pin_C_shear_MPa}} MPa.</p><p>Pin C may have a smaller load than pin B but also has a smaller diameter, so it can still be more critical.</p>",
        "section": "analysis"
      },
      {
        "id": "q20",
        "title": "Factor of Safety of Pins B and C",
        "selected": true,
        "tags": [
          "factor of safety",
          "shear failure"
        ],
        "type": "calculation",
        "difficulty": "introductory to intermediate",
        "learningObjectives": [
          "Compute factor of safety against shear failure",
          "Identify the governing pin"
        ],
        "student": "<p>Using &tau;<sub>fail</sub> = {{tau_fail}} {{tau_fail_unit}}, determine the factor of safety of pins B and C against shear failure.</p>",
        "instructor": "<p>FOS<sub>B</sub> = &tau;<sub>fail</sub>/&tau;<sub>B</sub> = {{tau_fail}}/{{bike_pin_B_shear_MPa}} = {{bike_pin_B_fos}}.</p><p>FOS<sub>C</sub> = &tau;<sub>fail</sub>/&tau;<sub>C</sub> = {{tau_fail}}/{{bike_pin_C_shear_MPa}} = {{bike_pin_C_fos}}.</p><p>Pin {{bike_governing_pin}} has the lower factor of safety and is governing for the simplified shear check.</p>",
        "section": "analysis"
      },
      {
        "id": "q21",
        "title": "Engineering Assessment and Recommendation",
        "selected": true,
        "tags": [
          "recommendation",
          "limitations",
          "engineering judgment"
        ],
        "type": "decision",
        "difficulty": "intermediate",
        "learningObjectives": [
          "Make a limited mechanics-based recommendation",
          "State limitations of a simplified static pin check"
        ],
        "student": "<p>Use the mechanics results to make a limited engineering recommendation for the suspension pins. Also list additional failure modes or serviceability concerns that would need to be checked before approving the full suspension design.</p>",
        "instructor": "<p>For the simplified static shear check, pin B has &tau;<sub>B</sub> = {{bike_pin_B_shear_MPa}} MPa and FOS<sub>B</sub> = {{bike_pin_B_fos}}. Pin C has &tau;<sub>C</sub> = {{bike_pin_C_shear_MPa}} MPa and FOS<sub>C</sub> = {{bike_pin_C_fos}}. Pin {{bike_governing_pin}} is governing because it has the lower factor of safety. The simplified pin-shear recommendation is: {{bike_recommendation}}.</p><p>Final design acceptance requires a target design FOS and additional checks such as bearing stress at the pin holes, tear-out or net-section failure of the brackets, fatigue under repeated riding loads, shock absorber limits, bushing wear, pin bending, frame weld stresses, dynamic impact loading, and stiffness/deflection of the seat support.</p>",
        "section": "analysis"
      }
    ],
    "variants": [
      {
        "id": "section-a",
        "title": "Homework Version A - pin shear FOS",
        "description": "Default MEEN 305-style sequence for equilibrium, double-shear stress, factor of safety, and recommendation.",
        "selectedQuestions": [
          "q1",
          "q2",
          "q3",
          "q4",
          "q5",
          "q6",
          "q7",
          "q8",
          "q9",
          "q10",
          "q11",
          "q12",
          "q13",
          "q14",
          "q15",
          "q16",
          "q17",
          "q18",
          "q19",
          "q20",
          "q21"
        ],
        "variables": {
          "P": 1500,
          "x_AB": 300,
          "x_BC": 100,
          "y_BC": 30,
          "theta_BD": 60,
          "tau_fail": 150,
          "d_B": 7.5,
          "d_C": 6.5,
          "n_s": 2
        }
      }
    ]
  },
  {
    "id": "MOS-GEAR-SHAFT-018",
    "slug": "multi-gear-drive-shaft",
    "title": "Torque Distribution and Hollow-Shaft Sizing for a Multi-Gear Drive Shaft",
    "studentDocumentTitle": "Student Homework Questions",
    "instructorDocumentTitle": "Instructor Answers",
    "summary": "A multi-station torsion problem integrating torque equilibrium, internal torque diagrams, solid-shaft stress, governing-segment identification, and hollow-shaft sizing.",
    "textbookChapters": [
      "Torsion of circular shafts",
      "Internal torque diagrams",
      "Torsional shear stress",
      "Hollow-shaft sizing"
    ],
    "derivedPlaceholders": [
      "gear_span_AE_mm",
      "gear_torque_sum_kNm",
      "gear_equilibrium_assessment",
      "gear_T_AB_kNm",
      "gear_T_BC_kNm",
      "gear_T_CD_kNm",
      "gear_T_DE_kNm",
      "gear_T_EF_kNm",
      "gear_abs_T_AB_kNm",
      "gear_abs_T_BC_kNm",
      "gear_abs_T_CD_kNm",
      "gear_abs_T_DE_kNm",
      "gear_abs_T_EF_kNm",
      "gear_tau_AB_MPa",
      "gear_tau_BC_MPa",
      "gear_tau_CD_MPa",
      "gear_tau_DE_MPa",
      "gear_tau_EF_MPa",
      "gear_governing_torque_kNm",
      "gear_governing_segments",
      "gear_governing_verb",
      "gear_D_i_max_mm",
      "gear_t_min_mm",
      "gear_t_selected_mm",
      "gear_D_i_selected_mm",
      "gear_tau_selected_MPa",
      "gear_utilization",
      "gear_thickness_assessment",
      "gear_recommendation"
    ],
    "image": "problems/multi-gear-drive-shaft/assets/gear-shaft-industry-context.png",
    "idealizedImage": "problems/multi-gear-drive-shaft/assets/gear-shaft-instructor-idealization.png",
    "idealizedImageAlt": "Instructor reference idealization of a multi-gear circular shaft with bearings at A and E, applied gear torques at B, C, D, and F, and labeled shaft segments.",
    "source": "problems/multi-gear-drive-shaft/index.html",
    "problemStatement": "<p>A manufacturing line uses a common rotating shaft to distribute mechanical power among several gear-driven stations. Each gear introduces or removes torque, so the internal torque changes from segment to segment.</p><p>The design team is evaluating the existing solid shaft and a tubular replacement with the same outer diameter. The base model includes shaft-axis torque only; gear forces, bending, fatigue, local stress concentrations, and dynamic effects are excluded.</p>",
    "engineeringGoal": "<p>Determine the signed internal torque and maximum torsional shear stress in every shaft segment, identify the governing segment, and select the minimum available tubular wall thickness that satisfies the allowable shear-stress requirement.</p>",
    "variables": [
      {
        "key": "gear_T_B",
        "symbol": "T_B",
        "label": "Torque applied at gear B",
        "value": 40,
        "unit": "kN*m",
        "min": -1000,
        "max": 1000,
        "step": 5
      },
      {
        "key": "gear_T_C",
        "symbol": "T_C",
        "label": "Torque applied at gear C",
        "value": -60,
        "unit": "kN*m",
        "min": -1000,
        "max": 1000,
        "step": 5
      },
      {
        "key": "gear_T_D",
        "symbol": "T_D",
        "label": "Torque applied at gear D",
        "value": -30,
        "unit": "kN*m",
        "min": -1000,
        "max": 1000,
        "step": 5
      },
      {
        "key": "gear_T_F",
        "symbol": "T_F",
        "label": "Torque applied at gear F",
        "value": 50,
        "unit": "kN*m",
        "min": -1000,
        "max": 1000,
        "step": 5
      },
      {
        "key": "gear_d",
        "symbol": "d",
        "label": "Existing solid-shaft diameter",
        "value": 160,
        "unit": "mm",
        "min": 10,
        "max": 1000,
        "step": 5
      },
      {
        "key": "gear_D_o",
        "symbol": "D_o",
        "label": "Tubular-shaft outer diameter",
        "value": 160,
        "unit": "mm",
        "min": 10,
        "max": 1000,
        "step": 5
      },
      {
        "key": "gear_tau_allow",
        "symbol": "tau_allow",
        "label": "Allowable tubular-shaft shear stress",
        "value": 90,
        "unit": "MPa",
        "min": 1,
        "max": 1000,
        "step": 5
      },
      {
        "key": "gear_t_step",
        "symbol": "Delta_t",
        "label": "Available wall-thickness increment",
        "value": 1,
        "unit": "mm",
        "min": 0.1,
        "max": 25,
        "step": 0.1
      },
      {
        "key": "gear_L_AB",
        "symbol": "L_AB",
        "label": "Segment length A to B",
        "value": 400,
        "unit": "mm",
        "min": 1,
        "max": 10000,
        "step": 10
      },
      {
        "key": "gear_L_BC",
        "symbol": "L_BC",
        "label": "Segment length B to C",
        "value": 500,
        "unit": "mm",
        "min": 1,
        "max": 10000,
        "step": 10
      },
      {
        "key": "gear_L_CD",
        "symbol": "L_CD",
        "label": "Segment length C to D",
        "value": 450,
        "unit": "mm",
        "min": 1,
        "max": 10000,
        "step": 10
      },
      {
        "key": "gear_L_DE",
        "symbol": "L_DE",
        "label": "Segment length D to E",
        "value": 400,
        "unit": "mm",
        "min": 1,
        "max": 10000,
        "step": 10
      },
      {
        "key": "gear_L_EF",
        "symbol": "L_EF",
        "label": "Segment length E to F",
        "value": 500,
        "unit": "mm",
        "min": 1,
        "max": 10000,
        "step": 10
      }
    ],
    "questions": [
      {
        "id": "q1",
        "title": "Primary Function of the Shaft Assembly",
        "type": "context interpretation",
        "difficulty": "introductory",
        "tags": [
          "shaft function",
          "power transmission",
          "torque distribution"
        ],
        "learningObjectives": [
          "Identify the shaft assembly's role in the production system."
        ],
        "selected": true,
        "student": "<p>State the primary structural and mechanical function of the shaft assembly.</p>",
        "instructor": "<p>The shaft distributes torque and mechanical power among multiple gear-driven stations while the bearings support and align the rotating shaft.</p>",
        "section": "context"
      },
      {
        "id": "q2",
        "title": "Applied Torsional Loads",
        "type": "load identification",
        "difficulty": "introductory",
        "tags": [
          "gear torque",
          "external loading",
          "model scope"
        ],
        "learningObjectives": [
          "Identify the external actions included in the torsion model."
        ],
        "selected": true,
        "student": "<p>Identify the external mechanical loads relevant to the base torsion analysis.</p>",
        "instructor": "<p>The relevant loads are the applied torques <em>T</em><sub>B</sub>, <em>T</em><sub>C</sub>, <em>T</em><sub>D</sub>, and <em>T</em><sub>F</sub> at the four gear locations. Gear weights and transverse gear forces are excluded from the base torsion model.</p>",
        "gradingNotes": "<p>Students should distinguish torque from force and power.</p>",
        "section": "context"
      },
      {
        "id": "q3",
        "title": "Bearing Roles and Boundary Conditions",
        "type": "boundary conditions",
        "difficulty": "introductory",
        "tags": [
          "bearings",
          "rotation",
          "reaction torque"
        ],
        "learningObjectives": [
          "Distinguish radial support from torsional restraint."
        ],
        "selected": true,
        "student": "<p>Describe the mechanical role of bearings A and E in the simplified model.</p>",
        "instructor": "<p>The bearings restrain transverse motion and support the shaft while permitting rotation. Ideal frictionless bearings do not supply reaction torque about the shaft axis.</p>",
        "section": "context"
      },
      {
        "id": "q4",
        "title": "Torque Load Path",
        "type": "load path",
        "difficulty": "introductory",
        "tags": [
          "cumulative torque",
          "gear stations",
          "cut section"
        ],
        "learningObjectives": [
          "Trace torque transfer through a multi-station shaft."
        ],
        "selected": true,
        "student": "<p>Trace how torque is transmitted through the shaft from one gear station to another.</p>",
        "instructor": "<p>Each gear adds or removes torque. The internal torque in any segment equals the algebraic sum of the external torques on one side of a cut through that segment.</p>",
        "section": "context"
      },
      {
        "id": "q5",
        "title": "Predicting the Governing Segment",
        "type": "mechanics reasoning",
        "difficulty": "introductory",
        "tags": [
          "critical segment",
          "absolute torque",
          "uniform diameter"
        ],
        "learningObjectives": [
          "Predict how the governing segment will be identified."
        ],
        "selected": true,
        "student": "<p>Before calculating, explain how the governing solid-shaft segment will be identified.</p>",
        "instructor": "<p>Because every solid-shaft segment has the same diameter, the segment with the largest absolute internal torque has the largest maximum torsional shear stress and governs.</p>",
        "section": "context"
      },
      {
        "id": "q6",
        "title": "Parameters Controlling the Design",
        "type": "parameter identification",
        "difficulty": "introductory",
        "tags": [
          "polar moment",
          "diameter",
          "allowable stress"
        ],
        "learningObjectives": [
          "Identify the inputs controlling shaft stress and wall thickness."
        ],
        "selected": true,
        "student": "<p>Identify the parameters that control solid-shaft shear stress and tubular wall thickness. Explain whether the segment lengths affect the base stress calculation.</p>",
        "instructor": "<p>Applied torques, shaft outer diameter, inner diameter or wall thickness, polar moment of inertia, and allowable shear stress control the design. Segment lengths describe the geometry and support optional angle-of-twist work, but they do not affect shear stress under Saint-Venant torsion.</p>",
        "section": "context"
      },
      {
        "id": "q7",
        "title": "Student-Generated Shaft Idealization",
        "type": "free-body diagram",
        "difficulty": "intermediate",
        "tags": [
          "idealization",
          "torque directions",
          "shaft segments"
        ],
        "learningObjectives": [
          "Create a multi-torque shaft model before viewing the reference figure."
        ],
        "selected": true,
        "student": "<p>Before using the reference figure, draw a simplified shaft model showing points A through F, gear torques and directions, bearing locations, shaft segments, and shaft diameter. Establish a positive torque sign convention.</p>",
        "instructor": "<p>A correct model idealizes the assembly as a circular shaft with concentrated torques at B, C, D, and F and ideal rotation-permitting bearings at A and E. Torque arrows and the positive sign convention must be unambiguous.</p>",
        "gradingNotes": "<p>Students should attempt the model before seeing the instructor idealization.</p>",
        "section": "transition"
      },
      {
        "id": "q8",
        "title": "Modeling Assumptions",
        "type": "assumptions",
        "difficulty": "intermediate",
        "tags": [
          "Saint-Venant torsion",
          "linear elasticity",
          "concentrated torque"
        ],
        "learningObjectives": [
          "State assumptions supporting the torsion model."
        ],
        "selected": true,
        "student": "<p>State the assumptions used in the base torsion model.</p>",
        "instructor": "<p>Assume a circular prismatic shaft, homogeneous linearly elastic material, concentrated static torques, ideal bearings that do not resist shaft-axis torque, small deformation, and Saint-Venant torsion. Neglect transverse gear forces, bending, warping restraint, and local stress concentrations.</p>",
        "section": "transition"
      },
      {
        "id": "q9",
        "title": "Mechanics Analysis Plan",
        "type": "analysis planning",
        "difficulty": "intermediate",
        "tags": [
          "torque diagram",
          "stress calculation",
          "hollow shaft"
        ],
        "learningObjectives": [
          "Plan a complete segment-stress and sizing analysis."
        ],
        "selected": true,
        "student": "<p>Outline the calculation sequence before substituting numbers.</p>",
        "instructor": "<p>Choose a torque sign convention; verify overall torque equilibrium; cut each shaft segment and determine internal torque; construct the torque diagram; calculate solid-shaft shear stress; identify the governing torque; size the tubular shaft; round wall thickness upward to the available increment; and verify the selected thickness.</p>",
        "section": "transition"
      },
      {
        "id": "q10",
        "title": "Torque Sign Convention and Overall Equilibrium",
        "type": "equilibrium",
        "difficulty": "introductory",
        "tags": [
          "signed torque",
          "overall equilibrium",
          "gear torques"
        ],
        "learningObjectives": [
          "Verify shaft-axis torque equilibrium."
        ],
        "selected": true,
        "student": "<p>Select a positive torque direction and verify overall torque equilibrium for the assigned gear torques.</p>",
        "instructor": "<p>Using the signs supplied with the assignment, &Sigma;<em>T</em> = <em>T</em><sub>B</sub> + <em>T</em><sub>C</sub> + <em>T</em><sub>D</sub> + <em>T</em><sub>F</sub> = <strong>{{gear_torque_sum_kNm}} kN&middot;m</strong>. {{gear_equilibrium_assessment}}</p>",
        "section": "analysis"
      },
      {
        "id": "q11",
        "title": "Internal Torque in Each Segment",
        "type": "internal loading",
        "difficulty": "intermediate",
        "tags": [
          "cut sections",
          "signed torque",
          "cumulative loading"
        ],
        "learningObjectives": [
          "Calculate internal torque throughout a multi-load shaft."
        ],
        "selected": true,
        "student": "<p>Determine the signed internal torque in segments AB, BC, CD, DE, and EF. Also report each magnitude.</p>",
        "instructor": "<p>Using cuts and the assigned sign convention: <em>T</em><sub>AB</sub> = <strong>{{gear_T_AB_kNm}} kN&middot;m</strong>, <em>T</em><sub>BC</sub> = <strong>{{gear_T_BC_kNm}} kN&middot;m</strong>, <em>T</em><sub>CD</sub> = <strong>{{gear_T_CD_kNm}} kN&middot;m</strong>, <em>T</em><sub>DE</sub> = <strong>{{gear_T_DE_kNm}} kN&middot;m</strong>, and <em>T</em><sub>EF</sub> = <strong>{{gear_T_EF_kNm}} kN&middot;m</strong>.</p><p>The corresponding magnitudes are <strong>{{gear_abs_T_AB_kNm}}, {{gear_abs_T_BC_kNm}}, {{gear_abs_T_CD_kNm}}, {{gear_abs_T_DE_kNm}}, and {{gear_abs_T_EF_kNm}} kN&middot;m</strong>.</p>",
        "commonMistakes": "<p>Do not replace the cumulative algebraic sum with the nearest applied gear torque.</p>",
        "section": "analysis"
      },
      {
        "id": "q12",
        "title": "Internal Torque Diagram",
        "type": "internal-resultant diagram",
        "difficulty": "intermediate",
        "tags": [
          "torque diagram",
          "jumps",
          "bearing E"
        ],
        "learningObjectives": [
          "Construct and interpret an internal torque diagram."
        ],
        "selected": true,
        "student": "<p>Construct the internal torque diagram along A-F and label the torque jump at every gear.</p>",
        "instructor": "<p>The diagram is <strong>{{gear_T_AB_kNm}} kN&middot;m</strong> on AB, then changes to <strong>{{gear_T_BC_kNm}}</strong> on BC, <strong>{{gear_T_CD_kNm}}</strong> on CD, <strong>{{gear_T_DE_kNm}}</strong> on DE, and <strong>{{gear_T_EF_kNm}} kN&middot;m</strong> on EF. Each jump equals the signed applied torque at that gear. Bearing E creates no jump.</p>",
        "section": "analysis"
      },
      {
        "id": "q13",
        "title": "Maximum Shear Stress in the Solid Shaft",
        "type": "torsional stress calculation",
        "difficulty": "intermediate",
        "tags": [
          "solid shaft",
          "maximum shear stress",
          "segment comparison"
        ],
        "learningObjectives": [
          "Calculate maximum torsional shear stress in every segment."
        ],
        "selected": true,
        "student": "<p>For the assigned solid-shaft diameter, calculate the maximum torsional shear stress in every segment using &tau;<sub>max</sub> = 16|<em>T</em>|/(&pi;<em>d</em><sup>3</sup>).</p>",
        "instructor": "<p>The segment stresses are &tau;<sub>AB</sub> = <strong>{{gear_tau_AB_MPa}} MPa</strong>, &tau;<sub>BC</sub> = <strong>{{gear_tau_BC_MPa}} MPa</strong>, &tau;<sub>CD</sub> = <strong>{{gear_tau_CD_MPa}} MPa</strong>, &tau;<sub>DE</sub> = <strong>{{gear_tau_DE_MPa}} MPa</strong>, and &tau;<sub>EF</sub> = <strong>{{gear_tau_EF_MPa}} MPa</strong>.</p>",
        "commonMistakes": "<p>Convert kN&middot;m to N&middot;mm before using millimeter section dimensions.</p>",
        "section": "analysis"
      },
      {
        "id": "q14",
        "title": "Governing Shaft Segment",
        "type": "design interpretation",
        "difficulty": "introductory",
        "tags": [
          "governing torque",
          "critical segment",
          "uniform diameter"
        ],
        "learningObjectives": [
          "Identify the segment controlling the tubular-shaft design."
        ],
        "selected": true,
        "student": "<p>Identify the governing segment or segments and explain why they control the tubular-shaft design.</p>",
        "instructor": "<p><strong>{{gear_governing_segments}}</strong> {{gear_governing_verb}} with an internal torque magnitude of <strong>{{gear_governing_torque_kNm}} kN&middot;m</strong>. The governing location carries the largest absolute internal torque, and the solid-shaft diameter is uniform.</p>",
        "section": "analysis"
      },
      {
        "id": "q15",
        "title": "Tubular-Shaft Sizing Equation",
        "type": "symbolic derivation",
        "difficulty": "intermediate",
        "tags": [
          "hollow shaft",
          "polar moment",
          "inner diameter"
        ],
        "learningObjectives": [
          "Derive the allowable-stress equation for a hollow circular shaft."
        ],
        "selected": true,
        "student": "<p>Starting from &tau; = <em>Tc</em>/<em>J</em>, derive the equation for the maximum permissible tubular-shaft inner diameter.</p>",
        "instructor": "<p>For <em>J</em> = &pi;(<em>D</em><sub>o</sub><sup>4</sup> - <em>D</em><sub>i</sub><sup>4</sup>)/32 and <em>c</em> = <em>D</em><sub>o</sub>/2,</p><p>&tau;<sub>allow</sub> = 16<em>T</em><sub>max</sub><em>D</em><sub>o</sub>/[&pi;(<em>D</em><sub>o</sub><sup>4</sup> - <em>D</em><sub>i</sub><sup>4</sup>)],</p><p>so <em>D</em><sub>i,max</sub> = [<em>D</em><sub>o</sub><sup>4</sup> - 16<em>T</em><sub>max</sub><em>D</em><sub>o</sub>/(&pi;&tau;<sub>allow</sub>)]<sup>1/4</sup> = <strong>{{gear_D_i_max_mm}} mm</strong>.</p>",
        "section": "analysis"
      },
      {
        "id": "q16",
        "title": "Minimum Tubular Wall Thickness",
        "type": "component sizing",
        "difficulty": "intermediate",
        "tags": [
          "wall thickness",
          "round upward",
          "available increment"
        ],
        "learningObjectives": [
          "Select a manufacturable wall thickness from a theoretical minimum."
        ],
        "selected": true,
        "student": "<p>Determine the theoretical minimum tubular wall thickness and select the smallest thickness available in the assigned increment. Explain the rounding direction.</p>",
        "instructor": "<p><em>t</em><sub>min</sub> = (<em>D</em><sub>o</sub> - <em>D</em><sub>i,max</sub>)/2 = <strong>{{gear_t_min_mm}} mm</strong>. Round upward to the assigned increment, giving <strong>{{gear_t_selected_mm}} mm</strong>. The corresponding selected inner diameter is <strong>{{gear_D_i_selected_mm}} mm</strong>.</p>",
        "section": "analysis"
      },
      {
        "id": "q17",
        "title": "Selected-Thickness Verification",
        "type": "design verification",
        "difficulty": "intermediate",
        "tags": [
          "hollow shaft",
          "actual stress",
          "utilization"
        ],
        "learningObjectives": [
          "Verify a practical wall-thickness selection."
        ],
        "selected": true,
        "student": "<p>Recalculate the maximum shear stress using the selected wall thickness and determine the allowable-stress utilization.</p>",
        "instructor": "<p>The selected wall gives &tau;<sub>max</sub> = <strong>{{gear_tau_selected_MPa}} MPa</strong> and utilization &tau;<sub>max</sub>/&tau;<sub>allow</sub> = <strong>{{gear_utilization}}</strong>. {{gear_thickness_assessment}}</p>",
        "section": "analysis"
      },
      {
        "id": "q18",
        "title": "Bearing E and Equal Adjacent Torques",
        "type": "conceptual interpretation",
        "difficulty": "intermediate",
        "tags": [
          "bearing torque",
          "diagram continuity",
          "DE and EF"
        ],
        "learningObjectives": [
          "Explain why an ideal bearing does not change internal torque."
        ],
        "selected": true,
        "student": "<p>Explain why bearing E does not create a jump in the torque diagram and why segments DE and EF carry the same torque.</p>",
        "instructor": "<p>An ideal bearing does not apply torque about the shaft axis. Internal torque is therefore unchanged across E, so DE and EF carry the same signed internal torque until the external torque at F is applied.</p>",
        "section": "analysis"
      },
      {
        "id": "q19",
        "title": "Engineering Assessment and Recommendation",
        "type": "engineering judgment",
        "difficulty": "advanced",
        "tags": [
          "recommendation",
          "model limitations",
          "combined loading"
        ],
        "learningObjectives": [
          "Make a bounded shaft recommendation."
        ],
        "selected": true,
        "student": "<p>Provide a concise recommendation for the tubular shaft and identify important limitations of the base model.</p>",
        "instructor": "<p>{{gear_recommendation}}</p><p>Detailed design must additionally evaluate bending from gear forces, combined stress, fatigue, keyways and shoulders, stress concentrations, angular twist, critical speed, bearing loads, manufacturing tolerances, and applicable standards.</p>",
        "gradingNotes": "<p>Students should not claim full machine safety from the pure-torsion calculation alone.</p>",
        "section": "analysis"
      }
    ],
    "variants": [
      {
        "id": "section-a",
        "title": "Homework Version A - baseline multi-gear shaft",
        "description": "Default sequence for torque equilibrium, internal torque diagrams, segment stresses, governing-segment selection, and tubular-shaft sizing.",
        "selectedQuestions": [
          "q1",
          "q2",
          "q3",
          "q4",
          "q5",
          "q6",
          "q7",
          "q8",
          "q9",
          "q10",
          "q11",
          "q12",
          "q13",
          "q14",
          "q15",
          "q16",
          "q17",
          "q18",
          "q19"
        ],
        "variables": {
          "gear_T_B": 40,
          "gear_T_C": -60,
          "gear_T_D": -30,
          "gear_T_F": 50,
          "gear_d": 160,
          "gear_D_o": 160,
          "gear_tau_allow": 90,
          "gear_t_step": 1,
          "gear_L_AB": 400,
          "gear_L_BC": 500,
          "gear_L_CD": 450,
          "gear_L_DE": 400,
          "gear_L_EF": 500
        }
      }
    ]
  },
  {
    "id": "MOS-WHEEL-005",
    "slug": "spoked-wheel-load-sharing",
    "title": "Load Sharing in a Three-Spoke Mobility Wheel Under Axle Load",
    "studentDocumentTitle": "Student Homework Questions",
    "instructorDocumentTitle": "Instructor Answers",
    "summary": "A context-rich mechanics problem on load sharing in a rigid-rim wheel with three equal axial spokes.",
    "textbookChapters": [
      "Axial loading",
      "Rigid-body equilibrium",
      "Deformation compatibility",
      "Stress and strain",
      "Factor of safety"
    ],
    "derivedPlaceholders": [
      "wheel_force_B_kN",
      "wheel_force_C_kN",
      "wheel_force_D_kN",
      "wheel_force_B_abs_kN",
      "wheel_force_C_abs_kN",
      "wheel_force_D_abs_kN",
      "wheel_governing_spoke",
      "wheel_governing_force_kN",
      "wheel_stress_B_MPa",
      "wheel_stress_C_MPa",
      "wheel_stress_D_MPa",
      "wheel_hub_displacement_mm"
    ],
    "image": "problems/spoked-wheel-load-sharing/assets/spoked-wheel-industry-context.png",
    "idealizedImage": "problems/spoked-wheel-load-sharing/assets/spoked-wheel-instructor-idealization.png",
    "idealizedImageAlt": "Instructor idealization of the three-spoke wheel with hub, spokes, load, radius, and 120 degree spacing.",
    "source": "problems/spoked-wheel-load-sharing/index.html",
    "problemStatement": "<p>A product engineering team is evaluating a lightweight three-spoke wheel used in a mobility device, small robotic platform, or compact ground-support vehicle. A vertical axle load is transferred from the hub into the spoke network and then into the rigid outer rim and ground contact region.</p><p>Because the rim is much stiffer than the spokes, the first-order mechanics model treats the rim as rigid. The spokes are modeled as axial members made from the same material and having the same cross-sectional area. The engineering task is to determine how the axle load is shared among the three spokes and to identify which spoke force has the largest magnitude before a later stress or safety-factor check is performed.</p>",
    "engineeringGoal": "<p>Determine the axial force in each of the three spokes under the applied axle load. Use the result to identify which spoke is in tension, which spokes are in compression, and what additional information would be required to perform a complete stress or factor-of-safety check.</p>",
    "variables": [
      {
        "key": "P",
        "symbol": "P",
        "label": "Vertical axle load applied at hub A",
        "value": 18,
        "unit": "kN",
        "min": 1,
        "max": 60,
        "step": 0.5
      },
      {
        "key": "r",
        "symbol": "r",
        "label": "Spoke radius / spoke length",
        "value": 0.4,
        "unit": "m",
        "min": 0.1,
        "max": 1.2,
        "step": 0.01
      },
      {
        "key": "theta",
        "symbol": "theta",
        "label": "Angular spacing between adjacent spokes",
        "value": 120,
        "unit": "deg",
        "min": 90,
        "max": 150,
        "step": 1
      },
      {
        "key": "E",
        "symbol": "E",
        "label": "Elastic modulus of spoke material",
        "value": 70000,
        "unit": "MPa",
        "min": 10000,
        "max": 210000,
        "step": 1000
      },
      {
        "key": "A_s",
        "symbol": "A_s",
        "label": "Cross-sectional area of each spoke",
        "value": 300,
        "unit": "mm^2",
        "min": 25,
        "max": 3000,
        "step": 25
      }
    ],
    "questions": [
      {
        "id": "q1",
        "title": "Primary Function of the System",
        "selected": true,
        "tags": [
          "context",
          "function",
          "load path"
        ],
        "type": "conceptual",
        "difficulty": "introductory",
        "learningObjectives": [
          "Identify the structural function of the wheel-spoke system",
          "Use load-transfer language"
        ],
        "student": "<p>What is the primary structural function of the wheel-spoke system?</p>",
        "instructor": "<p>The system transfers the vertical axle load from the hub through the spokes into the rigid rim and then into the ground. The spokes serve as axial load-carrying members that connect the hub to the rim.</p><p>Good answers should use load-transfer language rather than only naming parts of the wheel.</p>",
        "section": "context"
      },
      {
        "id": "q2",
        "title": "External Load",
        "selected": true,
        "tags": [
          "loading",
          "axle load"
        ],
        "type": "conceptual",
        "difficulty": "introductory",
        "learningObjectives": [
          "Identify where the external load enters the system",
          "Distinguish hub load from rim/ground contact"
        ],
        "student": "<p>Where is the external load applied, and what is its direction?</p>",
        "instructor": "<p>The external load <em>P</em> is applied at the hub/axle point A and acts vertically downward. In the numerical case, <em>P</em> = {{P}} {{P_unit}}.</p><p>Students should not apply the load at the rim or ground contact. The axle load enters the wheel at the hub.</p>",
        "section": "context"
      },
      {
        "id": "q3",
        "title": "Supports and Boundary Conditions",
        "selected": true,
        "tags": [
          "boundary conditions",
          "rigid rim"
        ],
        "type": "conceptual",
        "difficulty": "introductory to intermediate",
        "learningObjectives": [
          "Describe the rigid-rim boundary assumption",
          "Explain why spoke attachment points are fixed relative to the rim"
        ],
        "student": "<p>Identify the effective support or constraint in the idealized model.</p>",
        "instructor": "<p>The rim is idealized as rigid and supported through ground contact. The points where the spokes attach to the rim are treated as fixed relative to the rigid rim. The hub can displace slightly under load, causing axial deformation of the spokes.</p><p>This is not a simple pin-support reaction problem. The key modeling assumption is the rigid rim plus deformable axial spokes.</p>",
        "section": "context"
      },
      {
        "id": "q4",
        "title": "Load Path",
        "selected": true,
        "tags": [
          "load path",
          "rim",
          "ground contact"
        ],
        "type": "conceptual",
        "difficulty": "introductory",
        "learningObjectives": [
          "Trace load from axle to ground",
          "Include the rim in the load path"
        ],
        "student": "<p>Trace the load path from the axle to the ground.</p>",
        "instructor": "<p>The load path is: axle load at hub A &rarr; axial forces in spokes AB, AC, and AD &rarr; rigid outer rim &rarr; ground contact region &rarr; ground/supporting surface.</p><p>The rim should be included explicitly because it transfers the spoke loads to the ground.</p>",
        "section": "context"
      },
      {
        "id": "q5",
        "title": "Critical Components",
        "selected": true,
        "tags": [
          "critical components",
          "spokes"
        ],
        "type": "conceptual",
        "difficulty": "introductory",
        "learningObjectives": [
          "Identify the components included in the simplified analysis",
          "Separate base-model checks from later design checks"
        ],
        "student": "<p>Which components are critical for the simplified analysis?</p>",
        "instructor": "<p>The three spokes are the critical components for the simplified analysis because they carry the axial forces created by the vertical axle load. The rim is assumed rigid and is not stress-checked in this base problem.</p><p>If the problem is extended later, rim bending, hub connection details, and spoke stress can be checked.</p>",
        "section": "context"
      },
      {
        "id": "q6",
        "title": "Critical Mechanical Response",
        "selected": true,
        "tags": [
          "axial force",
          "tension",
          "compression"
        ],
        "type": "conceptual",
        "difficulty": "introductory to intermediate",
        "learningObjectives": [
          "Identify axial force as the target response",
          "Interpret tension and compression in the spokes"
        ],
        "student": "<p>For each critical component, identify the relevant mechanical response.</p>",
        "instructor": "<p>The relevant mechanical response is axial force in each spoke. The vertical spoke AB develops tensile force, while the two lower inclined spokes AC and AD develop compressive force in the idealized rigid-rim model. A full stress analysis would require each spoke cross-sectional area.</p><p>This is an important conceptual point: equal material and area do not imply equal force in all spokes because force distribution depends on compatibility and geometry.</p>",
        "section": "context"
      },
      {
        "id": "q7",
        "title": "Relevant Geometric and Material Parameters",
        "selected": true,
        "tags": [
          "geometry",
          "material",
          "stiffness"
        ],
        "type": "conceptual",
        "difficulty": "introductory to intermediate",
        "learningObjectives": [
          "Identify the variables controlling load sharing",
          "Explain why equal stiffness causes E and area to cancel in the base force solution"
        ],
        "student": "<p>Identify the geometric and material parameters that control the spoke forces.</p>",
        "instructor": "<p>Relevant parameters are the applied axle load <em>P</em>, spoke radius/length <em>r</em>, spoke angular spacing &theta;, cross-sectional area <em>A</em><sub>s</sub>, and elastic modulus <em>E</em>. Since all spokes have the same material, cross-sectional area, and length, their axial stiffnesses are equal, so the force distribution depends mainly on geometry and compatibility.</p><p>In the base problem, the actual force values are independent of <em>E</em> and <em>A</em><sub>s</sub> because the stiffnesses are equal; however, <em>E</em> and <em>A</em><sub>s</sub> would be needed to compute displacements or stresses.</p>",
        "section": "context"
      },
      {
        "id": "q8",
        "title": "Student-Generated Structural Idealization",
        "selected": true,
        "tags": [
          "idealization",
          "compatibility",
          "axial members"
        ],
        "type": "fbd/modeling",
        "difficulty": "intermediate",
        "learningObjectives": [
          "Convert a real wheel into a 2D mechanics model",
          "Represent rigid rim and axial spokes"
        ],
        "student": "<p>Convert the real wheel into a simplified 2D Mechanics of Materials model. The model should show the rigid rim, hub point A, three spokes AB, AC, and AD, the downward axle load <em>P</em> at A, the spoke radius <em>r</em>, and the {{theta}} {{theta_unit}} angular spacing.</p><p>Student model placeholder: insert or draw the simplified model and free-body/compatibility diagram here.</p>",
        "instructor": "<p>A correct student idealization shows a rigid circular rim with three axial spokes connected to a central hub. The external load <em>P</em> acts downward at the hub. The spokes are treated as axial members of equal stiffness because they have the same material, cross-sectional area, and length.</p><p>This should be completed before the final mechanics equations are developed.</p>",
        "section": "transition"
      },
      {
        "id": "q9",
        "title": "Modeling Assumptions",
        "selected": true,
        "tags": [
          "assumptions",
          "model limitations"
        ],
        "type": "conceptual",
        "difficulty": "intermediate",
        "learningObjectives": [
          "State assumptions for an axial-spoke model",
          "Recognize when tension-only spokes would invalidate the compression result"
        ],
        "student": "<p>State the assumptions used to convert the real wheel into the simplified mechanics model.</p>",
        "instructor": "<p>Assumptions may include static loading; rim is rigid; spokes are straight axial members; spokes have the same material, cross-sectional area, and length; deformations are small; the hub displacement is vertical by symmetry; bending of the rim and spokes is neglected; local hub/rim connection stresses are neglected; and the lower spokes can carry compression in the idealized model.</p><p>The last assumption is important. If the physical spokes were tension-only wires, the lower spokes would not carry compression and the model would need to be modified.</p>",
        "section": "transition"
      },
      {
        "id": "q10",
        "title": "Mechanics Analysis Plan",
        "selected": true,
        "tags": [
          "analysis plan",
          "compatibility",
          "equilibrium"
        ],
        "type": "calculation planning",
        "difficulty": "intermediate",
        "learningObjectives": [
          "Plan a compatibility and equilibrium solution",
          "Explain why equilibrium alone is insufficient"
        ],
        "student": "<p>Before calculating, describe the sequence needed to determine the force in each spoke.</p>",
        "instructor": "<p>Use symmetry to recognize that the two lower spoke forces are equal. Use deformation compatibility to relate the axial deformation of each spoke to the vertical displacement of the hub. Use equal axial stiffness to relate deformation to spoke force. Finally, apply vertical force equilibrium at the hub to solve for the spoke forces.</p><p>The correct solution requires compatibility plus equilibrium, not equilibrium alone.</p>",
        "section": "transition"
      },
      {
        "id": "q11",
        "title": "Boundary and Loading Conditions from Instructor Diagram",
        "selected": true,
        "tags": [
          "boundary conditions",
          "loading",
          "rigid rim"
        ],
        "type": "conceptual",
        "difficulty": "introductory to intermediate",
        "learningObjectives": [
          "Read loading and idealization from the diagram",
          "Distinguish axial load sharing from rim bending"
        ],
        "student": "<p>From the instructor diagram, identify the loading condition and the primary idealization of the rim and spokes.</p>",
        "instructor": "<p>The hub A is subjected to a downward load <em>P</em>. The rim is treated as rigid, so the spoke attachment points B, C, and D remain fixed relative to the rim. The spokes are treated as equal-stiffness axial members.</p><p>This problem is about load sharing through compatible axial deformation, not about bending stress in the rim.</p>",
        "section": "analysis"
      },
      {
        "id": "q12",
        "title": "Unknown Spoke Forces",
        "selected": true,
        "tags": [
          "unknowns",
          "symmetry"
        ],
        "type": "conceptual",
        "difficulty": "introductory",
        "learningObjectives": [
          "Identify unknown internal spoke forces",
          "Use symmetry to reduce unknowns"
        ],
        "student": "<p>Identify the unknown internal forces that must be determined.</p>",
        "instructor": "<p>The unknowns are the axial forces <em>F</em><sub>B</sub>, <em>F</em><sub>C</sub>, and <em>F</em><sub>D</sub> in spokes AB, AC, and AD. By symmetry, <em>F</em><sub>C</sub> = <em>F</em><sub>D</sub>.</p><p>Use a sign convention. In this solution, positive axial force means tension; negative axial force means compression.</p>",
        "section": "analysis"
      },
      {
        "id": "q13",
        "title": "Symmetry of Hub Displacement",
        "selected": true,
        "tags": [
          "symmetry",
          "displacement"
        ],
        "type": "conceptual",
        "difficulty": "intermediate",
        "learningObjectives": [
          "Use symmetry to infer displacement direction",
          "Reduce the compatibility model to one displacement variable"
        ],
        "student": "<p>Explain why the hub displacement can be assumed vertical in the idealized model.</p>",
        "instructor": "<p>The geometry and loading are symmetric about the vertical centerline. The two lower spokes are mirror images, and the external load has no horizontal component. Therefore the horizontal displacement of the hub is zero and the hub displacement is vertical.</p><p>This lets students use one displacement variable, such as &delta;, for the vertical hub displacement.</p>",
        "section": "analysis"
      },
      {
        "id": "q14",
        "title": "Compatibility of Spoke Deformations",
        "selected": true,
        "tags": [
          "compatibility",
          "axial deformation"
        ],
        "type": "calculation",
        "difficulty": "intermediate",
        "learningObjectives": [
          "Relate hub displacement to axial deformation",
          "Interpret elongation and shortening signs"
        ],
        "student": "<p>Let the hub move downward by a small displacement &delta;. Determine the axial deformation of each spoke in terms of &delta;.</p>",
        "instructor": "<p>The vertical spoke AB elongates by &delta;. Each lower spoke has a vertical projection equal to cos(60&deg;) = 1/2 relative to the hub displacement direction, so each lower spoke shortens by &delta;/2. Therefore, &Delta;<sub>B</sub> = &delta; and &Delta;<sub>C</sub> = &Delta;<sub>D</sub> = -&delta;/2.</p><p>The negative sign for the lower spokes means shortening, which corresponds to compression under the chosen tension-positive sign convention.</p>",
        "section": "analysis"
      },
      {
        "id": "q15",
        "title": "Force-Deformation Relations",
        "selected": true,
        "tags": [
          "Hooke's law",
          "axial stiffness",
          "compatibility"
        ],
        "type": "calculation",
        "difficulty": "intermediate",
        "learningObjectives": [
          "Use equal axial stiffness to relate force and deformation",
          "Derive force ratios before using equilibrium"
        ],
        "student": "<p>Using equal axial stiffness <em>k</em><sub>s</sub> = <em>EA</em><sub>s</sub>/<em>r</em> for all spokes, express <em>F</em><sub>B</sub>, <em>F</em><sub>C</sub>, and <em>F</em><sub>D</sub> in terms of <em>k</em><sub>s</sub> and &delta;.</p>",
        "instructor": "<p><em>F</em><sub>B</sub> = <em>k</em><sub>s</sub>&delta;. <em>F</em><sub>C</sub> = <em>F</em><sub>D</sub> = -<em>k</em><sub>s</sub>&delta;/2. Therefore, <em>F</em><sub>C</sub> = <em>F</em><sub>D</sub> = -<em>F</em><sub>B</sub>/2.</p><p>This is the compatibility step that makes the problem determinate.</p>",
        "section": "analysis"
      },
      {
        "id": "q16",
        "title": "Equilibrium and Spoke Force Values",
        "selected": true,
        "tags": [
          "equilibrium",
          "spoke force",
          "tension compression"
        ],
        "type": "calculation",
        "difficulty": "intermediate",
        "learningObjectives": [
          "Apply vertical force equilibrium at the hub",
          "Compute spoke forces and interpret signs"
        ],
        "student": "<p>Write vertical force equilibrium at the hub A using the spoke force components and the downward load <em>P</em>. Then determine the axial force in each spoke for <em>P</em> = {{P}} {{P_unit}}.</p>",
        "instructor": "<p>Using positive tension along each spoke, vertical equilibrium is <em>F</em><sub>B</sub> - (1/2)<em>F</em><sub>C</sub> - (1/2)<em>F</em><sub>D</sub> - <em>P</em> = 0. Substituting <em>F</em><sub>C</sub> = <em>F</em><sub>D</sub> = -<em>F</em><sub>B</sub>/2 gives (3/2)<em>F</em><sub>B</sub> = <em>P</em>.</p><p>Therefore, <em>F</em><sub>B</sub> = 2<em>P</em>/3 = {{wheel_force_B_kN}} kN, and <em>F</em><sub>C</sub> = <em>F</em><sub>D</sub> = -<em>P</em>/3 = {{wheel_force_C_kN}} kN. Thus spoke AB is in {{wheel_force_B_abs_kN}} kN tension, and spokes AC and AD are each in {{wheel_force_C_abs_kN}} kN compression.</p><p>Report both sign and physical meaning. A negative result should not be discarded; it indicates compression relative to the tension-positive convention.</p>",
        "section": "analysis"
      },
      {
        "id": "q17",
        "title": "Governing Spoke Force Magnitude",
        "selected": true,
        "tags": [
          "governing member",
          "force magnitude"
        ],
        "type": "calculation",
        "difficulty": "introductory to intermediate",
        "learningObjectives": [
          "Compare axial force magnitudes",
          "Identify which member would be checked first"
        ],
        "student": "<p>Which spoke has the largest axial force magnitude?</p>",
        "instructor": "<p>The vertical spoke AB has the largest magnitude, |<em>F</em><sub>B</sub>| = {{wheel_force_B_abs_kN}} kN. The lower spokes each have magnitude |<em>F</em><sub>C</sub>| = |<em>F</em><sub>D</sub>| = {{wheel_force_C_abs_kN}} kN.</p><p>The governing spoke for force magnitude is {{wheel_governing_spoke}} with {{wheel_governing_force_kN}} kN. This identifies which member would be checked first if area and material strength were provided.</p>",
        "section": "analysis"
      },
      {
        "id": "q18",
        "title": "Stress, Stiffness, and Engineering Recommendation",
        "selected": true,
        "tags": [
          "stress extension",
          "displacement",
          "engineering judgment"
        ],
        "type": "decision",
        "difficulty": "intermediate",
        "learningObjectives": [
          "State data needed for stress or FOS",
          "Make a limited engineering recommendation",
          "Recognize tension-only limitations"
        ],
        "student": "<p>What additional information would be needed to compute stress or factor of safety in the spokes? Use the mechanics results to make a limited engineering recommendation for the wheel-spoke system.</p>",
        "instructor": "<p>To compute stress, the cross-sectional area <em>A</em><sub>s</sub> of each spoke is needed, using &sigma;<sub>i</sub> = <em>F</em><sub>i</sub>/<em>A</em><sub>s</sub>. To compute factor of safety, allowable tensile and compressive stresses or material strengths are needed. If the spokes are tension-only, compression capacity is not valid and the physical model must be reconsidered.</p><p>For the current optional area value, the stress estimates are &sigma;<sub>B</sub> = {{wheel_stress_B_MPa}} MPa, &sigma;<sub>C</sub> = {{wheel_stress_C_MPa}} MPa, and &sigma;<sub>D</sub> = {{wheel_stress_D_MPa}} MPa, with negative stress indicating compression. If <em>E</em> and <em>A</em><sub>s</sub> are used for a stiffness extension, &delta; = 2<em>Pr</em>/(3<em>EA</em><sub>s</sub>) = {{wheel_hub_displacement_mm}} mm.</p><p>For the idealized model, the vertical spoke AB carries the largest axial force, {{wheel_force_B_abs_kN}} kN in tension. The two lower spokes each carry {{wheel_force_C_abs_kN}} kN in compression. A detailed design decision requires spoke cross-sectional area, material tensile/compressive allowable stresses, and confirmation that the lower spokes are capable of carrying compression. If the spokes are tension-only, this rigid-rim equal-spoke model is not physically acceptable without modification.</p>",
        "section": "analysis"
      }
    ],
    "variants": [
      {
        "id": "section-a",
        "title": "Homework Version A - three-spoke compatibility",
        "description": "Default MEEN 305-style sequence for rigid-rim axial-spoke load sharing.",
        "selectedQuestions": [
          "q1",
          "q2",
          "q3",
          "q4",
          "q5",
          "q6",
          "q7",
          "q8",
          "q9",
          "q10",
          "q11",
          "q12",
          "q13",
          "q14",
          "q15",
          "q16",
          "q17",
          "q18"
        ],
        "variables": {
          "P": 18,
          "r": 0.4,
          "theta": 120,
          "E": 70000,
          "A_s": 300
        }
      }
    ]
  },
  {
    "id": "MOS-SPRING-010",
    "slug": "spring-loaded-coupling-rod",
    "title": "Spring-Loaded Coupling Rod Assembly Under Tensile Load",
    "studentDocumentTitle": "Student Homework Questions",
    "instructorDocumentTitle": "Instructor Answers",
    "summary": "A context-rich mechanics problem on spring compression, axial member elongation, load sharing, and deformation compatibility.",
    "textbookChapters": [
      "Axial loading",
      "Axial deformation",
      "Mechanical springs",
      "Displacement compatibility",
      "Statically determinate members"
    ],
    "derivedPlaceholders": [
      "spring_member_area_in2",
      "spring_force_kip",
      "spring_rod_force_kip",
      "spring_bolt_force_kip",
      "spring_compression_in",
      "spring_rod_elongation_in",
      "spring_bolt_elongation_in",
      "spring_distance_increase_in",
      "spring_final_distance_in",
      "spring_dominant_component",
      "spring_dominant_value_in"
    ],
    "image": "problems/spring-loaded-coupling-rod/assets/spring-industry-context.png",
    "idealizedImage": "problems/spring-loaded-coupling-rod/assets/spring-instructor-idealization.png",
    "idealizedImageAlt": "Instructor reference idealization of the spring-loaded coupling rod assembly with rigid plates, compression spring, side bolts, dimensions, and tensile load.",
    "source": "problems/spring-loaded-coupling-rod/index.html",
    "problemStatement": "<p>A mechanical design team is evaluating a spring-loaded coupling assembly used in an industrial machine fixture. The assembly uses a central coupling rod, three rigid plates, two side bolts, and a compression spring to transmit a tensile load while allowing a controlled change in spacing.</p><p>When the coupling rod is pulled, the spring compresses, the side bolts elongate, and the active central-rod segment elongates. The measured distance between lower plate C and upper eye E therefore changes through several deformation mechanisms and must be predicted using a compatible assembly model.</p>",
    "engineeringGoal": "<p>Determine the final distance d between points C and E after the tensile load is applied, accounting for compression of the spring, elongation of the side bolts, and elongation of the active coupling-rod segment.</p>",
    "variables": [
      {
        "key": "P",
        "symbol": "P",
        "label": "Applied tensile load",
        "value": 5,
        "unit": "kip",
        "min": 0.1,
        "max": 100,
        "step": 0.1
      },
      {
        "key": "d0",
        "symbol": "d_0",
        "label": "Initial distance between C and E",
        "value": 10,
        "unit": "in",
        "min": 1,
        "max": 100,
        "step": 0.1
      },
      {
        "key": "k",
        "symbol": "k",
        "label": "Compression-spring stiffness",
        "value": 12,
        "unit": "kip/in",
        "min": 0.1,
        "max": 500,
        "step": 0.1
      },
      {
        "key": "d_b",
        "symbol": "d_b",
        "label": "Diameter of each side bolt and active rod",
        "value": 0.25,
        "unit": "in",
        "min": 0.05,
        "max": 3,
        "step": 0.01
      },
      {
        "key": "E_s",
        "symbol": "E_s",
        "label": "Elastic modulus of steel members",
        "value": 29000,
        "unit": "ksi",
        "min": 1000,
        "max": 40000,
        "step": 100
      },
      {
        "key": "n_b",
        "symbol": "n_b",
        "label": "Number of identical side bolts",
        "value": 2,
        "unit": "-",
        "min": 1,
        "max": 12,
        "step": 1
      },
      {
        "key": "L_E",
        "symbol": "L_E",
        "label": "Active coupling-rod length from B to E",
        "value": 8,
        "unit": "in",
        "min": 0.5,
        "max": 60,
        "step": 0.1
      },
      {
        "key": "L_b",
        "symbol": "L_b",
        "label": "Active side-bolt length between A and C",
        "value": 6,
        "unit": "in",
        "min": 0.5,
        "max": 60,
        "step": 0.1
      }
    ],
    "questions": [
      {
        "id": "q1",
        "title": "Primary Function of the System",
        "type": "context interpretation",
        "difficulty": "introductory",
        "tags": [
          "function",
          "compliance",
          "load transfer"
        ],
        "learningObjectives": [
          "Identify the structural purpose of a compliant coupling assembly."
        ],
        "selected": true,
        "student": "<p>What is the primary structural function of the spring-loaded coupling assembly?</p>",
        "instructor": "<p>The assembly transfers tensile load while allowing controlled displacement through spring compression and elastic deformation of the steel members. It provides a compliant load path rather than a fully rigid connection.</p>",
        "gradingNotes": "<p>Good answers should connect load transfer and controlled compliance to the mechanics of the assembly.</p>",
        "section": "context"
      },
      {
        "id": "q2",
        "title": "External Loads",
        "type": "load identification",
        "difficulty": "introductory",
        "tags": [
          "tensile load",
          "loading pair",
          "coupling rod"
        ],
        "learningObjectives": [
          "Identify the external force pair producing tension in the central rod."
        ],
        "selected": true,
        "student": "<p>Where are the external loads applied, and what are their directions?</p>",
        "instructor": "<p>Equal and opposite tensile loads <em>P</em> are applied at upper eye E and the lower end of the coupling rod. The loading pair places the central rod in tension.</p>",
        "section": "context"
      },
      {
        "id": "q3",
        "title": "Constraints and Idealized Connections",
        "type": "boundary conditions",
        "difficulty": "introductory",
        "tags": [
          "rigid plates",
          "spring",
          "bolts"
        ],
        "learningObjectives": [
          "Identify the assembly constraints needed for a compatibility model."
        ],
        "selected": true,
        "student": "<p>Identify the effective constraints and connections in the system.</p>",
        "instructor": "<p>Plates A, B, and C are treated as rigid. The spring connects A and B and compresses under load. Identical side bolts connect A and C and elongate in tension. The central rod transfers load through the assembly and elongates over its active length.</p>",
        "gradingNotes": "<p>This is an assembly-compatibility problem rather than a conventional fixed-support reaction problem.</p>",
        "section": "context"
      },
      {
        "id": "q4",
        "title": "Load Path",
        "type": "load path",
        "difficulty": "introductory",
        "tags": [
          "load path",
          "spring compression",
          "bolt tension"
        ],
        "learningObjectives": [
          "Trace load through all deformable and rigid components."
        ],
        "selected": true,
        "student": "<p>Using the component list, trace the load path through the coupling rod, plates, bolts, and spring.</p>",
        "instructor": "<p>A suitable path is applied tensile load &rarr; central coupling rod &rarr; rigid plate or collar contact &rarr; compression spring and rigid plates &rarr; side bolts &rarr; lower plate C and the opposite load application. The spring compresses while the bolts and rod elongate.</p>",
        "commonMistakes": "<p>The load path must include both the compression spring and the tension-loaded side bolts.</p>",
        "section": "context"
      },
      {
        "id": "q5",
        "title": "Components Controlling the Final Distance",
        "type": "component identification",
        "difficulty": "introductory",
        "tags": [
          "critical components",
          "displacement",
          "stiffness"
        ],
        "learningObjectives": [
          "Distinguish deformable components from rigid transfer components."
        ],
        "selected": true,
        "student": "<p>Which components are most important for determining the final distance <em>d</em>?</p>",
        "instructor": "<p>The compression spring, active central-rod segment, and side bolts control <em>d</em>. The rigid plates establish the load path and compatibility relationships, but their deformation is neglected.</p>",
        "section": "context"
      },
      {
        "id": "q6",
        "title": "Relevant Mechanical Responses",
        "type": "mechanics reasoning",
        "difficulty": "introductory",
        "tags": [
          "compression",
          "elongation",
          "scope"
        ],
        "learningObjectives": [
          "Select the relevant response for each component and reject unsupported checks."
        ],
        "selected": true,
        "student": "<p>For each critical component, identify the mechanical response considered in this problem.</p>",
        "instructor": "<p>The spring undergoes compression. The side bolts and central coupling rod undergo axial elongation. Plates are assumed rigid. Failure, fatigue, local contact, and buckling are outside the base problem because the necessary strength and detail data are not supplied.</p>",
        "section": "context"
      },
      {
        "id": "q7",
        "title": "Relevant Geometry and Material Parameters",
        "type": "parameter identification",
        "difficulty": "introductory",
        "tags": [
          "spring stiffness",
          "bolt area",
          "elastic modulus"
        ],
        "learningObjectives": [
          "Identify the inputs controlling spring and axial-member deformation."
        ],
        "selected": true,
        "student": "<p>Identify the loading, geometric, and material parameters needed to determine the final distance <em>d</em>.</p>",
        "instructor": "<p>The required inputs are <em>P</em>, <em>d</em><sub>0</sub>, <em>k</em>, <em>d</em><sub>b</sub>, <em>E</em><sub>s</sub>, <em>n</em><sub>b</sub>, <em>L</em><sub>E</sub>, and <em>L</em><sub>b</sub>. Bolt/rod area is <em>A</em><sub>b</sub> = &pi;<em>d</em><sub>b</sub><sup>2</sup>/4. The rigid-plate and equal-load-sharing assumptions are also required.</p>",
        "section": "context"
      },
      {
        "id": "q8",
        "title": "Student-Generated Structural Idealization",
        "type": "free-body diagram",
        "difficulty": "intermediate",
        "tags": [
          "idealization",
          "FBD",
          "compatibility"
        ],
        "learningObjectives": [
          "Convert the real assembly into a rigid-plate, spring, and axial-member model."
        ],
        "selected": true,
        "student": "<p>Before using the reference figure, draw a simplified Mechanics of Materials model. Show rigid plates A, B, and C; coupling rod and eye E; side bolts; spring; applied tensile load <em>P</em>; and distance <em>d</em>. Include force and deformation directions.</p>",
        "instructor": "<p>A correct model treats A, B, and C as rigid plates; the spring as a linear compression spring; the side bolts as identical axial tension members; and the coupling rod as an axial tension member. Distance <em>d</em> is formed from compatible plate and rod motions.</p>",
        "gradingNotes": "<p>Provide students with drawing space before revealing the instructor reference idealization.</p>",
        "section": "transition"
      },
      {
        "id": "q9",
        "title": "Modeling Assumptions",
        "type": "assumptions",
        "difficulty": "intermediate",
        "tags": [
          "linear spring",
          "equal sharing",
          "small deformation"
        ],
        "learningObjectives": [
          "State assumptions supporting the simplified compatibility analysis."
        ],
        "selected": true,
        "student": "<p>State the assumptions used to convert the physical assembly into the simplified mechanics model.</p>",
        "instructor": "<p>Typical assumptions are rigid plates A, B, and C; a linear spring of stiffness <em>k</em>; identical side bolts sharing load equally; linear-elastic steel; small deformation; concentric loading; and neglected nut, thread, contact, bending, shear, and friction effects.</p>",
        "section": "transition"
      },
      {
        "id": "q10",
        "title": "Mechanics Analysis Plan",
        "type": "analysis planning",
        "difficulty": "intermediate",
        "tags": [
          "load sharing",
          "deformation",
          "compatibility"
        ],
        "learningObjectives": [
          "Plan a multi-contribution displacement calculation."
        ],
        "selected": true,
        "student": "<p>Before calculating, describe the sequence of analysis needed to determine final distance <em>d</em>.</p>",
        "instructor": "<p>Determine spring, rod, and bolt forces; compute spring compression; compute active-rod elongation; compute side-bolt elongation; establish how each changes C-to-E spacing; sum the compatible contributions; and add the increase to initial distance <em>d</em><sub>0</sub>.</p>",
        "section": "transition"
      },
      {
        "id": "q11",
        "title": "Loading Conditions from the Instructor Diagram",
        "type": "mechanics setup",
        "difficulty": "introductory",
        "tags": [
          "tension",
          "rigid plates",
          "deformation tracking"
        ],
        "learningObjectives": [
          "Interpret the instructor reference model and its response quantity."
        ],
        "selected": true,
        "student": "<p>From the instructor reference diagram, identify the loading condition and principal mechanical idealizations.</p>",
        "instructor": "<p>The assembly is subjected to equal and opposite tensile loads <em>P</em>. Plates A, B, and C are rigid; the spring is linear; side bolts and central rod deform axially; and response is evaluated by tracking the change in distance between C and E.</p>",
        "section": "analysis"
      },
      {
        "id": "q12",
        "title": "Internal Forces and Load Sharing",
        "type": "equilibrium and load sharing",
        "difficulty": "intermediate",
        "tags": [
          "spring force",
          "rod force",
          "bolt force"
        ],
        "learningObjectives": [
          "Determine component forces using equilibrium, symmetry, and identical-member behavior."
        ],
        "selected": true,
        "student": "<p>For <strong><em>P</em> = {{P}} {{P_unit}}</strong> and <strong><em>n</em><sub>b</sub> = {{n_b}}</strong> identical side bolts, determine the force in the spring, active coupling-rod segment, and each side bolt.</p>",
        "instructor": "<p>The spring carries <strong>{{spring_force_kip}} kip</strong> in compression. The active coupling rod carries <strong>{{spring_rod_force_kip}} kip</strong> in tension. Symmetry and identical bolt stiffness give <strong>{{spring_bolt_force_kip}} kip</strong> in tension in each of the {{n_b}} side bolts.</p>",
        "commonMistakes": "<p>Divide the total bolt load by the number of identical bolts; do not assign the full load to every bolt.</p>",
        "section": "analysis"
      },
      {
        "id": "q13",
        "title": "Spring Compression",
        "type": "spring deformation calculation",
        "difficulty": "intermediate",
        "tags": [
          "spring",
          "stiffness",
          "compression"
        ],
        "learningObjectives": [
          "Apply the linear spring force-displacement relationship."
        ],
        "selected": true,
        "student": "<p>Calculate the spring compression using <strong><em>k</em> = {{k}} {{k_unit}}</strong>.</p>",
        "instructor": "<p>&delta;<sub>s</sub> = <em>P</em>/<em>k</em> = {{P}}/{{k}} = <strong>{{spring_compression_in}} in</strong>. This compression increases the C-to-E distance for the modeled geometry.</p>",
        "section": "analysis"
      },
      {
        "id": "q14",
        "title": "Coupling-Rod Elongation",
        "type": "axial deformation calculation",
        "difficulty": "intermediate",
        "tags": [
          "rod area",
          "elongation",
          "PL/AE"
        ],
        "learningObjectives": [
          "Calculate axial elongation of the active coupling-rod segment."
        ],
        "selected": true,
        "student": "<p>Calculate the elongation of the active coupling-rod segment. First determine member area from <strong><em>d</em><sub>b</sub> = {{d_b}} {{d_b_unit}}</strong>.</p>",
        "instructor": "<p><em>A</em><sub>b</sub> = &pi;({{d_b}} in)<sup>2</sup>/4 = <strong>{{spring_member_area_in2}} in<sup>2</sup></strong>. Then</p><p>&delta;<sub>rod</sub> = <em>PL</em><sub>E</sub>/(<em>A</em><sub>b</sub><em>E</em><sub>s</sub>) = <strong>{{spring_rod_elongation_in}} in</strong>.</p>",
        "commonMistakes": "<p>With load in kip and area in in<sup>2</sup>, use <em>E</em><sub>s</sub> in ksi = kip/in<sup>2</sup>.</p>",
        "section": "analysis"
      },
      {
        "id": "q15",
        "title": "Side-Bolt Elongation",
        "type": "axial deformation calculation",
        "difficulty": "intermediate",
        "tags": [
          "bolt elongation",
          "load sharing",
          "PL/AE"
        ],
        "learningObjectives": [
          "Calculate elongation of parallel, equally loaded axial members."
        ],
        "selected": true,
        "student": "<p>Calculate the elongation of each side bolt. Clearly use the force carried by one bolt rather than the total applied load.</p>",
        "instructor": "<p>Each bolt carries <em>P</em>/<em>n</em><sub>b</sub> = <strong>{{spring_bolt_force_kip}} kip</strong>. Therefore</p><p>&delta;<sub>bolt</sub> = (<em>P</em>/<em>n</em><sub>b</sub>)<em>L</em><sub>b</sub>/(<em>A</em><sub>b</sub><em>E</em><sub>s</sub>) = <strong>{{spring_bolt_elongation_in}} in</strong>.</p><p>All identical bolts have the same elongation and act in parallel; their elongations are not added to one another.</p>",
        "commonMistakes": "<p>The load divides among parallel bolts, but their common plate-to-plate elongation does not divide or sum.</p>",
        "section": "analysis"
      },
      {
        "id": "q16",
        "title": "Final Distance Between C and E",
        "type": "compatibility calculation",
        "difficulty": "intermediate to advanced",
        "tags": [
          "final distance",
          "compatibility",
          "deformation accumulation"
        ],
        "learningObjectives": [
          "Combine compatible deformation contributions into an assembly dimension."
        ],
        "selected": true,
        "student": "<p>Determine the final distance <em>d</em> between C and E after loading. Show why each deformation contribution increases or decreases the measured distance.</p>",
        "instructor": "<p>Spring compression increases E-to-A spacing, rod elongation increases E-to-B spacing, and side-bolt elongation increases A-to-C spacing. Thus</p><p>&Delta;<em>d</em> = &delta;<sub>s</sub> + &delta;<sub>rod</sub> + &delta;<sub>bolt</sub> = {{spring_compression_in}} + {{spring_rod_elongation_in}} + {{spring_bolt_elongation_in}} = <strong>{{spring_distance_increase_in}} in</strong>.</p><p><em>d</em> = <em>d</em><sub>0</sub> + &Delta;<em>d</em> = {{d0}} + {{spring_distance_increase_in}} = <strong>{{spring_final_distance_in}} in</strong>.</p>",
        "gradingNotes": "<p>Require a compatibility argument, not only arithmetic addition of three values.</p>",
        "section": "analysis"
      },
      {
        "id": "q17",
        "title": "Stiffness-Based Interpretation",
        "type": "engineering interpretation",
        "difficulty": "intermediate",
        "tags": [
          "dominant deformation",
          "relative stiffness",
          "interpretation"
        ],
        "learningObjectives": [
          "Relate the largest deformation contribution to component stiffness."
        ],
        "selected": true,
        "student": "<p>Which deformation contribution dominates the change in distance <em>d</em>, and why?</p>",
        "instructor": "<p>The dominant contribution is <strong>{{spring_dominant_component}}</strong>, with magnitude <strong>{{spring_dominant_value_in}} in</strong>. For the baseline values, spring compression is much larger than either steel-member elongation because the spring is intentionally much more compliant.</p>",
        "section": "analysis"
      },
      {
        "id": "q18",
        "title": "Stiffness-Based Modification",
        "type": "design evaluation",
        "difficulty": "intermediate",
        "tags": [
          "design modification",
          "stiffness",
          "displacement control"
        ],
        "learningObjectives": [
          "Propose a mechanics-based change that reduces final displacement."
        ],
        "selected": true,
        "student": "<p>If final distance <em>d</em> must be reduced, identify and justify a mechanics-based design modification.</p>",
        "instructor": "<p>Possible changes include increasing spring stiffness <em>k</em>, increasing bolt/rod diameter, reducing active member lengths, reducing applied load, or changing assembly geometry. For the baseline case, increasing <em>k</em> is usually the most effective single change because spring compression dominates.</p>",
        "section": "analysis"
      },
      {
        "id": "q19",
        "title": "Engineering Assessment and Recommendation",
        "type": "engineering judgment",
        "difficulty": "intermediate to advanced",
        "tags": [
          "recommendation",
          "limitations",
          "service acceptance"
        ],
        "learningObjectives": [
          "Make a limited recommendation without exceeding the model's evidence."
        ],
        "selected": true,
        "student": "<p>Use the mechanics results to make a limited engineering recommendation about the assembly response. State what additional information would be required before service approval.</p>",
        "instructor": "<p>For <em>P</em> = {{P}} kip, the predicted final distance is <strong>{{spring_final_distance_in}} in</strong>, and <strong>{{spring_dominant_component}}</strong> governs displacement. This model is suitable for preliminary displacement prediction. Service approval additionally requires allowable stresses, fatigue requirements, spring travel and solid-height checks, local contact and thread details, plate stiffness, tolerances, and manufacturing or inspection information.</p>",
        "gradingNotes": "<p>The recommendation should answer the displacement question without claiming that strength or durability has been verified.</p>",
        "section": "analysis"
      }
    ],
    "variants": [
      {
        "id": "section-a",
        "title": "Homework Version A - baseline coupling assembly",
        "description": "Default sequence for load path, load sharing, spring compression, axial elongation, and final-distance compatibility.",
        "selectedQuestions": [
          "q1",
          "q2",
          "q3",
          "q4",
          "q5",
          "q6",
          "q7",
          "q8",
          "q9",
          "q10",
          "q11",
          "q12",
          "q13",
          "q14",
          "q15",
          "q16",
          "q17",
          "q18",
          "q19"
        ],
        "variables": {
          "P": 5,
          "d0": 10,
          "k": 12,
          "d_b": 0.25,
          "E_s": 29000,
          "n_b": 2,
          "L_E": 8,
          "L_b": 6
        }
      }
    ]
  },
  {
    "id": "MOS-THERMAL-012",
    "slug": "steam-pipe-thermal-expansion",
    "title": "Thermal Expansion Force in a Steam Pipe Between Turbine Housings",
    "studentDocumentTitle": "Student Homework Questions",
    "instructorDocumentTitle": "Instructor Answers",
    "summary": "A thermal-deformation problem integrating hollow-pipe geometry, support flexibility, compatibility, axial force, stress, and engineering assessment.",
    "textbookChapters": [
      "Thermal stress",
      "Axial deformation",
      "Statically indeterminate members",
      "Displacement compatibility",
      "Normal stress"
    ],
    "derivedPlaceholders": [
      "thermal_inner_diameter_in",
      "thermal_pipe_area_in2",
      "thermal_delta_T_F",
      "thermal_action",
      "thermal_force_state",
      "thermal_stress_state",
      "thermal_free_expansion_in",
      "thermal_free_expansion_magnitude_in",
      "thermal_pipe_compliance_in_per_kip",
      "thermal_support_compliance_in_per_kip",
      "thermal_total_compliance_in_per_kip",
      "thermal_pipe_force_kip",
      "thermal_pipe_force_magnitude_kip",
      "thermal_pipe_elastic_deformation_in",
      "thermal_support_displacement_each_in",
      "thermal_support_displacement_total_in",
      "thermal_pipe_stress_ksi",
      "thermal_pipe_stress_magnitude_ksi",
      "thermal_yield_ratio",
      "thermal_yield_assessment",
      "thermal_dominant_compliance"
    ],
    "image": "problems/steam-pipe-thermal-expansion/assets/steam-industry-context.png",
    "idealizedImage": "problems/steam-pipe-thermal-expansion/assets/steam-instructor-idealization.png",
    "idealizedImageAlt": "Instructor reference idealization of a hollow steam pipe connected between two turbine attachment points represented by equal axial springs.",
    "source": "problems/steam-pipe-thermal-expansion/index.html",
    "problemStatement": "<p>A power-plant engineering team is reviewing a short steel steam pipe connecting two turbine housings. The pipe is assembled at installation temperature <em>T</em><sub>1</sub> and later reaches operating temperature <em>T</em><sub>2</sub>. If free, the pipe would change length by <em>&alpha;L&Delta;T</em>.</p><p>The turbine attachment points provide finite axial restraint. They are modeled as identical linear springs, so the pipe's thermal deformation is shared between elastic deformation of the pipe and movement of both turbine attachments.</p>",
    "engineeringGoal": "<p>Determine the thermally induced axial force exerted on each turbine housing and the corresponding axial stress in the pipe. Compare the stress with yield and make a limited recommendation about attachment flexibility and further design checks.</p>",
    "variables": [
      {
        "key": "L",
        "symbol": "L",
        "label": "Pipe length",
        "value": 72,
        "unit": "in",
        "min": 1,
        "max": 1200,
        "step": 1
      },
      {
        "key": "D_o",
        "symbol": "D_o",
        "label": "Pipe outer diameter",
        "value": 4,
        "unit": "in",
        "min": 0.25,
        "max": 60,
        "step": 0.05
      },
      {
        "key": "t",
        "symbol": "t",
        "label": "Pipe wall thickness",
        "value": 0.25,
        "unit": "in",
        "min": 0.01,
        "max": 10,
        "step": 0.01
      },
      {
        "key": "T_1",
        "symbol": "T_1",
        "label": "Installation temperature",
        "value": 70,
        "unit": "deg F",
        "min": -100,
        "max": 1000,
        "step": 1
      },
      {
        "key": "T_2",
        "symbol": "T_2",
        "label": "Operating temperature",
        "value": 275,
        "unit": "deg F",
        "min": -100,
        "max": 1500,
        "step": 1
      },
      {
        "key": "k",
        "symbol": "k",
        "label": "Axial stiffness of each turbine attachment",
        "value": 80000,
        "unit": "kip/in",
        "min": 1,
        "max": 1000000,
        "step": 100
      },
      {
        "key": "E",
        "symbol": "E",
        "label": "Elastic modulus of pipe steel",
        "value": 29000,
        "unit": "ksi",
        "min": 1000,
        "max": 40000,
        "step": 100
      },
      {
        "key": "alpha",
        "symbol": "alpha",
        "label": "Coefficient of thermal expansion",
        "value": 0.0000065,
        "unit": "1/deg F",
        "min": 0.000001,
        "max": 0.00002,
        "step": 1e-7
      },
      {
        "key": "sigma_y",
        "symbol": "sigma_y",
        "label": "Pipe material yield stress",
        "value": 40,
        "unit": "ksi",
        "min": 1,
        "max": 300,
        "step": 1
      }
    ],
    "questions": [
      {
        "id": "q1",
        "title": "Primary Function of the System",
        "type": "context interpretation",
        "difficulty": "introductory",
        "tags": [
          "system function",
          "steam transport",
          "load transfer"
        ],
        "learningObjectives": [
          "Connect the pipe's process function to its structural load-transfer role."
        ],
        "selected": true,
        "student": "<p>What are the primary process and structural functions of the pipe-turbine assembly?</p>",
        "instructor": "<p>The pipe transfers steam between turbine housings while maintaining a sealed connection. Structurally, it transfers thermally induced axial loads into the turbine attachments when free thermal deformation is restrained.</p>",
        "gradingNotes": "<p>Good answers should mention both fluid transport and mechanical load transfer.</p>",
        "section": "context"
      },
      {
        "id": "q2",
        "title": "Source of Mechanical Loading",
        "type": "load identification",
        "difficulty": "introductory",
        "tags": [
          "thermal loading",
          "temperature change",
          "restraint"
        ],
        "learningObjectives": [
          "Distinguish thermal loading from a directly applied force."
        ],
        "selected": true,
        "student": "<p>What creates the mechanical loading in this problem? Is an independent external axial force applied to the pipe?</p>",
        "instructor": "<p>The temperature change causes the pipe to seek a free length change <em>&alpha;L&Delta;T</em>. Finite restraint at the turbine attachments opposes that change and creates axial force. No independent external axial load is applied in the base model.</p>",
        "section": "context"
      },
      {
        "id": "q3",
        "title": "Supports and Boundary Conditions",
        "type": "boundary conditions",
        "difficulty": "introductory",
        "tags": [
          "support stiffness",
          "linear springs",
          "partial restraint"
        ],
        "learningObjectives": [
          "Interpret finite attachment stiffness as partial axial restraint."
        ],
        "selected": true,
        "student": "<p>Identify the support idealization used for turbine attachments A and B.</p>",
        "instructor": "<p>Each turbine attachment is modeled as an axial linear spring of stiffness <em>k</em>. The pipe ends are therefore partially restrained and can move as the attachments deform under the thermally induced force.</p>",
        "commonMistakes": "<p>The attachment points are not perfectly fixed in this model.</p>",
        "section": "context"
      },
      {
        "id": "q4",
        "title": "Thermal Load Path",
        "type": "load path",
        "difficulty": "introductory",
        "tags": [
          "load path",
          "flanges",
          "turbine housings"
        ],
        "learningObjectives": [
          "Trace thermally induced force from the pipe into the foundation."
        ],
        "selected": true,
        "student": "<p>Trace the load path created when thermal deformation of the pipe is restrained.</p>",
        "instructor": "<p>The pipe attempts to change length; the turbine attachments resist that motion; axial force develops in the pipe; equal and opposite forces pass through the flanged connections into the turbine housings, machine supports, and foundation.</p>",
        "section": "context"
      },
      {
        "id": "q5",
        "title": "Critical Components",
        "type": "component identification",
        "difficulty": "introductory",
        "tags": [
          "pipe stress",
          "attachment flexibility",
          "scope"
        ],
        "learningObjectives": [
          "Identify components controlling the one-dimensional response."
        ],
        "selected": true,
        "student": "<p>Which components are most important for this simplified Mechanics of Materials analysis?</p>",
        "instructor": "<p>The hollow steel pipe is critical because it develops axial stress, and the two turbine attachments are critical because their stiffness controls the degree of restraint. Detailed flange, bolt, gasket, casing, and foundation stresses are not evaluated.</p>",
        "section": "context"
      },
      {
        "id": "q6",
        "title": "Relevant Mechanical Response",
        "type": "mechanics reasoning",
        "difficulty": "introductory",
        "tags": [
          "axial force",
          "normal stress",
          "yield"
        ],
        "learningObjectives": [
          "Select force and stress responses supported by the provided data."
        ],
        "selected": true,
        "student": "<p>What mechanical responses should be evaluated in the base problem?</p>",
        "instructor": "<p>Evaluate thermally induced axial force and average axial pipe stress. Comparing stress with yield provides a limited strength interpretation. Pressure stress, creep, fatigue, local flange response, bending, and stability require additional models and data.</p>",
        "section": "context"
      },
      {
        "id": "q7",
        "title": "Relevant Parameters",
        "type": "parameter identification",
        "difficulty": "introductory",
        "tags": [
          "pipe geometry",
          "thermal properties",
          "stiffness"
        ],
        "learningObjectives": [
          "Connect each input to thermal deformation, axial compliance, or strength."
        ],
        "selected": true,
        "student": "<p>Identify the geometric, thermal, material, and support parameters that control the pipe force and stress.</p>",
        "instructor": "<p>The required inputs are pipe length <em>L</em>, outer diameter <em>D</em><sub>o</sub>, wall thickness <em>t</em>, temperatures <em>T</em><sub>1</sub> and <em>T</em><sub>2</sub>, attachment stiffness <em>k</em>, elastic modulus <em>E</em>, thermal-expansion coefficient <em>&alpha;</em>, and yield stress <em>&sigma;</em><sub>y</sub>. Inner diameter and area follow from the pipe geometry.</p>",
        "section": "context"
      },
      {
        "id": "q8",
        "title": "Student-Generated Structural Idealization",
        "type": "free-body diagram",
        "difficulty": "intermediate",
        "tags": [
          "idealization",
          "pipe",
          "spring supports"
        ],
        "learningObjectives": [
          "Convert the plant assembly into a one-dimensional thermal compatibility model."
        ],
        "selected": true,
        "student": "<p>Before using the reference figure, develop a simplified mechanics model showing the hollow pipe, turbine attachment points, axial support stiffness, pipe length, temperature change, and unknown thermally induced axial force.</p>",
        "instructor": "<p>A correct idealization shows a uniform hollow pipe of length <em>L</em> connected between two axial springs, each of stiffness <em>k</em>. The pipe has free thermal deformation <em>&alpha;L&Delta;T</em>, but attachment restraint creates axial force.</p>",
        "gradingNotes": "<p>Students should attempt the model before the instructor reference idealization is revealed.</p>",
        "section": "transition"
      },
      {
        "id": "q9",
        "title": "Modeling Assumptions",
        "type": "assumptions",
        "difficulty": "intermediate",
        "tags": [
          "uniform temperature",
          "linear elasticity",
          "one-dimensional model"
        ],
        "learningObjectives": [
          "State assumptions supporting the thermal compatibility solution."
        ],
        "selected": true,
        "student": "<p>State the assumptions used to convert the real pipe-turbine assembly into the simplified model.</p>",
        "instructor": "<p>Typical assumptions are uniform pipe temperature; a uniform hollow cross section; one-dimensional axial behavior; linear-elastic pipe material and supports; identical attachment stiffness at A and B; small deformation; rigid flange load transfer; and neglected pressure, bending, thermal gradients, creep, fatigue, routing flexibility, and local connection effects.</p>",
        "section": "transition"
      },
      {
        "id": "q10",
        "title": "Mechanics Analysis Plan",
        "type": "analysis planning",
        "difficulty": "intermediate",
        "tags": [
          "thermal strain",
          "compatibility",
          "stress"
        ],
        "learningObjectives": [
          "Plan the calculation from geometry through engineering interpretation."
        ],
        "selected": true,
        "student": "<p>Before calculating, describe the sequence needed to determine the force exerted on the turbine housings.</p>",
        "instructor": "<p>Compute inner diameter and pipe area; determine <em>&Delta;T</em> and free thermal deformation; write compatibility among free deformation, pipe elastic deformation, and both support displacements; solve for axial force; compute average pipe stress; compare with yield; then state a limited recommendation.</p>",
        "section": "transition"
      },
      {
        "id": "q11",
        "title": "Boundary Conditions from the Reference Diagram",
        "type": "mechanics setup",
        "difficulty": "introductory",
        "tags": [
          "reference idealization",
          "partial restraint",
          "springs"
        ],
        "learningObjectives": [
          "Interpret the pipe-and-springs reference model."
        ],
        "selected": true,
        "student": "<p>From the instructor reference diagram, identify the pipe boundary conditions and support idealizations.</p>",
        "instructor": "<p>Pipe AB is connected at each end to a turbine attachment modeled as an axial spring of stiffness <em>k</em>. Both attachment points can move under force, so the pipe is partially rather than fully restrained.</p>",
        "section": "analysis"
      },
      {
        "id": "q12",
        "title": "Unknown Thermally Induced Force",
        "type": "constraint-force identification",
        "difficulty": "introductory",
        "tags": [
          "thermal force",
          "pipe action",
          "turbine loads"
        ],
        "learningObjectives": [
          "Define the unknown interaction force and its action on each component."
        ],
        "selected": true,
        "student": "<p>Identify the unknown axial force produced by restrained thermal deformation and describe its action on the pipe and turbine housings.</p>",
        "instructor": "<p>The unknown is the thermally induced axial pipe force. For the assigned temperatures, the pipe is in <strong>{{thermal_force_state}}</strong> and exerts equal-magnitude, opposite-direction forces on the two turbine attachments.</p>",
        "section": "analysis"
      },
      {
        "id": "q13",
        "title": "Hollow-Pipe Cross-Sectional Area",
        "type": "section-property calculation",
        "difficulty": "introductory",
        "tags": [
          "inner diameter",
          "annular area",
          "pipe geometry"
        ],
        "learningObjectives": [
          "Calculate the material area of a hollow circular section."
        ],
        "selected": true,
        "student": "<p>For <strong><em>D</em><sub>o</sub> = {{D_o}} {{D_o_unit}}</strong> and <strong><em>t</em> = {{t}} {{t_unit}}</strong>, determine the inner diameter and cross-sectional area of the steel pipe.</p>",
        "instructor": "<p><em>D</em><sub>i</sub> = <em>D</em><sub>o</sub> - 2<em>t</em> = <strong>{{thermal_inner_diameter_in}} in</strong>.</p><p><em>A</em> = &pi;[<em>D</em><sub>o</sub><sup>2</sup> - <em>D</em><sub>i</sub><sup>2</sup>]/4 = <strong>{{thermal_pipe_area_in2}} in<sup>2</sup></strong>.</p>",
        "commonMistakes": "<p>Use the annular material area, not the area of a solid bar with diameter <em>D</em><sub>o</sub>.</p>",
        "section": "analysis"
      },
      {
        "id": "q14",
        "title": "Free Thermal Deformation",
        "type": "thermal deformation calculation",
        "difficulty": "intermediate",
        "tags": [
          "temperature change",
          "thermal strain",
          "free expansion"
        ],
        "learningObjectives": [
          "Calculate signed free thermal deformation."
        ],
        "selected": true,
        "student": "<p>Calculate the temperature change and the pipe deformation that would occur if the pipe were unrestrained.</p>",
        "instructor": "<p>&Delta;<em>T</em> = <em>T</em><sub>2</sub> - <em>T</em><sub>1</sub> = {{T_2}} - {{T_1}} = <strong>{{thermal_delta_T_F}}&deg;F</strong>. The pipe experiences <strong>{{thermal_action}}</strong>.</p><p>&delta;<sub>T</sub> = <em>&alpha;L&Delta;T</em> = <strong>{{thermal_free_expansion_in}} in</strong>, with magnitude <strong>{{thermal_free_expansion_magnitude_in}} in</strong>.</p>",
        "gradingNotes": "<p>A positive value denotes free expansion; a negative value denotes free contraction.</p>",
        "section": "analysis"
      },
      {
        "id": "q15",
        "title": "Compatibility Equation",
        "type": "compatibility formulation",
        "difficulty": "intermediate",
        "tags": [
          "pipe compliance",
          "support displacement",
          "factor of two"
        ],
        "learningObjectives": [
          "Formulate compatibility for a member between two flexible supports."
        ],
        "selected": true,
        "student": "<p>Write the signed compatibility equation relating free thermal deformation, elastic deformation of the pipe, and movement of both turbine attachments.</p>",
        "instructor": "<p>Using a compression-positive sign convention for <em>F</em>,</p><p><em>&alpha;L&Delta;T</em> = <em>FL</em>/(<em>AE</em>) + 2<em>F</em>/<em>k</em>.</p><p>The pipe compliance is <strong>{{thermal_pipe_compliance_in_per_kip}} in/kip</strong>, the combined support compliance is <strong>{{thermal_support_compliance_in_per_kip}} in/kip</strong>, and total compliance is <strong>{{thermal_total_compliance_in_per_kip}} in/kip</strong>. The factor 2 accounts for movement at both turbine attachments.</p>",
        "commonMistakes": "<p>Do not omit one attachment displacement or treat the two end springs as a single spring of stiffness <em>k</em>.</p>",
        "section": "analysis"
      },
      {
        "id": "q16",
        "title": "Thermally Induced Pipe Force",
        "type": "thermal force calculation",
        "difficulty": "intermediate",
        "tags": [
          "constraint force",
          "compliance",
          "turbine reaction"
        ],
        "learningObjectives": [
          "Solve compatibility for the pipe-support interaction force."
        ],
        "selected": true,
        "student": "<p>Solve for the thermally induced axial force in the pipe and the force magnitude exerted on each turbine housing.</p>",
        "instructor": "<p><em>F</em> = &delta;<sub>T</sub>/[<em>L</em>/(<em>AE</em>) + 2/<em>k</em>] = <strong>{{thermal_pipe_force_kip}} kip</strong> using compression-positive thermal-force convention. Thus the pipe carries <strong>{{thermal_pipe_force_magnitude_kip}} kip in {{thermal_force_state}}</strong> and exerts that force magnitude on each turbine attachment.</p><p>The pipe elastic contribution has magnitude <strong>{{thermal_pipe_elastic_deformation_in}} in</strong>. Each support moves <strong>{{thermal_support_displacement_each_in}} in</strong>, for a combined support movement of <strong>{{thermal_support_displacement_total_in}} in</strong>.</p>",
        "section": "analysis"
      },
      {
        "id": "q17",
        "title": "Pipe Stress and Yield Comparison",
        "type": "normal stress calculation",
        "difficulty": "intermediate",
        "tags": [
          "compressive stress",
          "yield ratio",
          "strength interpretation"
        ],
        "learningObjectives": [
          "Calculate average axial stress and make a limited yield comparison."
        ],
        "selected": true,
        "student": "<p>Determine the average axial stress in the pipe and compare its magnitude with <strong><em>&sigma;</em><sub>y</sub> = {{sigma_y}} {{sigma_y_unit}}</strong>.</p>",
        "instructor": "<p>&sigma; = <em>F</em>/<em>A</em> = <strong>{{thermal_pipe_stress_ksi}} ksi</strong>; its magnitude is <strong>{{thermal_pipe_stress_magnitude_ksi}} ksi</strong> in {{thermal_stress_state}}. The yield-to-stress ratio is <strong>{{thermal_yield_ratio}}</strong>. {{thermal_yield_assessment}}</p>",
        "gradingNotes": "<p>This is an average axial-stress comparison, not a pressure-piping code assessment or a full factor of safety evaluation.</p>",
        "section": "analysis"
      },
      {
        "id": "q18",
        "title": "Stiffness Interpretation",
        "type": "engineering interpretation",
        "difficulty": "intermediate",
        "tags": [
          "attachment stiffness",
          "restraint",
          "compliance"
        ],
        "learningObjectives": [
          "Predict how support stiffness changes thermal force."
        ],
        "selected": true,
        "student": "<p>Explain how attachment stiffness <em>k</em> affects the thermal force. Which compliance contribution dominates for the assigned values?</p>",
        "instructor": "<p>Larger <em>k</em> permits less attachment movement, restrains more thermal deformation, and increases pipe force toward the fully restrained limit. Smaller <em>k</em> reduces force by allowing more movement. For the assigned values, <strong>{{thermal_dominant_compliance}}</strong> is the larger compliance contribution.</p>",
        "section": "analysis"
      },
      {
        "id": "q19",
        "title": "Engineering Assessment and Recommendation",
        "type": "engineering judgment",
        "difficulty": "intermediate to advanced",
        "tags": [
          "design recommendation",
          "flexibility",
          "model limitations"
        ],
        "learningObjectives": [
          "Make a mechanics-based recommendation without overclaiming safety."
        ],
        "selected": true,
        "student": "<p>Use the force and stress results to make a limited engineering recommendation. Identify additional checks required before accepting the installation.</p>",
        "instructor": "<p>The pipe develops <strong>{{thermal_pipe_force_magnitude_kip}} kip in {{thermal_force_state}}</strong> and an average stress magnitude of <strong>{{thermal_pipe_stress_magnitude_ksi}} ksi</strong>. {{thermal_yield_assessment}} The turbine allowable nozzle loads should be compared with the computed attachment force. If more flexibility is needed, consider pipe-routing flexibility, engineered expansion provisions, or less rigid attachments. Final acceptance also requires pressure, flange, bolt, gasket, weld, creep, fatigue, thermal-gradient, stability, and code checks.</p>",
        "gradingNotes": "<p>The response should not claim full design safety from the average axial-stress calculation alone.</p>",
        "section": "analysis"
      }
    ],
    "variants": [
      {
        "id": "section-a",
        "title": "Homework Version A - baseline steam pipe",
        "description": "Default sequence for thermal expansion, flexible-support compatibility, pipe force, stress, and engineering assessment.",
        "selectedQuestions": [
          "q1",
          "q2",
          "q3",
          "q4",
          "q5",
          "q6",
          "q7",
          "q8",
          "q9",
          "q10",
          "q11",
          "q12",
          "q13",
          "q14",
          "q15",
          "q16",
          "q17",
          "q18",
          "q19"
        ],
        "variables": {
          "L": 72,
          "D_o": 4,
          "t": 0.25,
          "T_1": 70,
          "T_2": 275,
          "k": 80000,
          "E": 29000,
          "alpha": 0.0000065,
          "sigma_y": 40
        }
      }
    ]
  },
  {
    "id": "MOS-LINK-013",
    "slug": "stepped-steel-tension-link",
    "title": "Maximum Axial Load and Elongation of a Stepped Steel Tension Link",
    "studentDocumentTitle": "Student Homework Questions",
    "instructorDocumentTitle": "Instructor Answers",
    "summary": "A stepped axial-member problem integrating allowable normal stress, critical-section identification, segment elongation, and stiffness interpretation.",
    "textbookChapters": [
      "Normal stress",
      "Axial loading",
      "Axial deformation",
      "Stepped members",
      "Allowable stress design"
    ],
    "derivedPlaceholders": [
      "link_area_AB_mm2",
      "link_area_BC_mm2",
      "link_area_CD_mm2",
      "link_critical_area_mm2",
      "link_critical_section",
      "link_critical_verb",
      "link_pmax_N",
      "link_pmax_kN",
      "link_stress_AB_MPa",
      "link_stress_BC_MPa",
      "link_stress_CD_MPa",
      "link_delta_AB_mm",
      "link_delta_BC_mm",
      "link_delta_CD_mm",
      "link_delta_total_mm",
      "link_dominant_segment",
      "link_dominant_elongation_mm",
      "link_strength_modification"
    ],
    "image": "problems/stepped-steel-tension-link/assets/link-industry-context.png",
    "idealizedImage": "problems/stepped-steel-tension-link/assets/link-instructor-idealization.png",
    "idealizedImageAlt": "Instructor reference idealization of a flat stepped steel tension link with two end tabs, a wider center section, transition fillets, segment lengths, and axial loads.",
    "source": "problems/stepped-steel-tension-link/index.html",
    "problemStatement": "<p>A mechanical design team is evaluating a flat A-36 steel tension link used in an industrial support or machine-frame bracing assembly. The link transfers centered axial tensile force between two structural brackets. It has two end tabs and a wider reinforced center section.</p><p>The link must satisfy an allowable average normal-stress limit. Its total elongation at the maximum allowable load must also be predicted because deformation can affect alignment, preload, and serviceability. Local fillet effects are neglected in the base model.</p>",
    "engineeringGoal": "<p>Determine the maximum allowable axial tensile load based on the governing constant-area section, then calculate the total link elongation by summing the elastic deformation of all three segments.</p>",
    "variables": [
      {
        "key": "sigma_allow",
        "symbol": "sigma_allow",
        "label": "Allowable average normal stress",
        "value": 150,
        "unit": "MPa",
        "min": 1,
        "max": 1000,
        "step": 1
      },
      {
        "key": "t",
        "symbol": "t",
        "label": "Uniform plate thickness",
        "value": 12,
        "unit": "mm",
        "min": 0.5,
        "max": 200,
        "step": 0.5
      },
      {
        "key": "w_1",
        "symbol": "w_1",
        "label": "Width of end segments AB and CD",
        "value": 60,
        "unit": "mm",
        "min": 1,
        "max": 1000,
        "step": 1
      },
      {
        "key": "w_2",
        "symbol": "w_2",
        "label": "Width of center segment BC",
        "value": 120,
        "unit": "mm",
        "min": 1,
        "max": 1000,
        "step": 1
      },
      {
        "key": "L_AB",
        "symbol": "L_AB",
        "label": "Length of left end segment AB",
        "value": 200,
        "unit": "mm",
        "min": 1,
        "max": 10000,
        "step": 10
      },
      {
        "key": "L_BC",
        "symbol": "L_BC",
        "label": "Length of center segment BC",
        "value": 800,
        "unit": "mm",
        "min": 1,
        "max": 10000,
        "step": 10
      },
      {
        "key": "L_CD",
        "symbol": "L_CD",
        "label": "Length of right end segment CD",
        "value": 200,
        "unit": "mm",
        "min": 1,
        "max": 10000,
        "step": 10
      },
      {
        "key": "r",
        "symbol": "r",
        "label": "Transition fillet radius (effect neglected)",
        "value": 30,
        "unit": "mm",
        "min": 0,
        "max": 500,
        "step": 1
      },
      {
        "key": "E",
        "symbol": "E",
        "label": "Elastic modulus of A-36 steel",
        "value": 200000,
        "unit": "MPa",
        "min": 1000,
        "max": 300000,
        "step": 1000
      }
    ],
    "questions": [
      {
        "id": "q1",
        "title": "Primary Function of the System",
        "type": "context interpretation",
        "difficulty": "introductory",
        "tags": [
          "system function",
          "tension member",
          "load transfer"
        ],
        "learningObjectives": [
          "Identify the stepped link as an axial load-transfer member."
        ],
        "selected": true,
        "student": "<p>State the primary structural function of the stepped steel link in the industrial assembly.</p>",
        "instructor": "<p>The link transfers axial tensile force between structural brackets or machine-frame attachment points while maintaining the required alignment and load path.</p>",
        "gradingNotes": "<p>Students should identify a tensile load-transfer function rather than beam bending.</p>",
        "section": "context"
      },
      {
        "id": "q2",
        "title": "External Loads",
        "type": "load identification",
        "difficulty": "introductory",
        "tags": [
          "axial load",
          "two-force member",
          "tension"
        ],
        "learningObjectives": [
          "Identify the external loading that produces axial tension."
        ],
        "selected": true,
        "student": "<p>Identify where the external loads act and describe their directions.</p>",
        "instructor": "<p>Equal and opposite centered axial forces <em>P</em> act at the two ends. They place all three segments in axial tension.</p>",
        "section": "context"
      },
      {
        "id": "q3",
        "title": "Supports and Boundary Conditions",
        "type": "boundary conditions",
        "difficulty": "introductory",
        "tags": [
          "end connections",
          "centered loading",
          "axial model"
        ],
        "learningObjectives": [
          "Represent physical end connections in a two-force-member model."
        ],
        "selected": true,
        "student": "<p>How are the pinned or bolted end connections represented in the simplified model?</p>",
        "instructor": "<p>The brackets or pins are replaced by equal and opposite axial forces applied through the member axis. A separate support-reaction calculation is unnecessary for this isolated two-force member.</p>",
        "section": "context"
      },
      {
        "id": "q4",
        "title": "Load Path",
        "type": "load path",
        "difficulty": "introductory",
        "tags": [
          "load path",
          "stepped member",
          "internal force"
        ],
        "learningObjectives": [
          "Trace force through changing cross-sectional areas."
        ],
        "selected": true,
        "student": "<p>Trace the tensile load through the link from one connection to the other.</p>",
        "instructor": "<p>The load enters one end segment, passes through its transition into center segment BC, crosses the second transition, and exits through the opposite end segment. The internal axial-force magnitude is the same in every segment, but average stress changes with area.</p>",
        "section": "context"
      },
      {
        "id": "q5",
        "title": "Expected Governing Section",
        "type": "critical-section reasoning",
        "difficulty": "introductory",
        "tags": [
          "minimum area",
          "allowable load",
          "fillet exclusion"
        ],
        "learningObjectives": [
          "Predict the strength-governing constant-area section."
        ],
        "selected": true,
        "student": "<p>Which constant-area section is expected to govern the allowable axial load, and why?</p>",
        "instructor": "<p><strong>{{link_critical_section}}</strong> {{link_critical_verb}} the allowable load because the governing area is the minimum, <strong>{{link_critical_area_mm2}} mm<sup>2</sup></strong>. Local fillet stress concentration is excluded from the base model.</p>",
        "section": "context"
      },
      {
        "id": "q6",
        "title": "Relevant Mechanical Responses",
        "type": "mechanics reasoning",
        "difficulty": "introductory",
        "tags": [
          "normal stress",
          "elongation",
          "serviceability"
        ],
        "learningObjectives": [
          "Distinguish strength and deformation responses."
        ],
        "selected": true,
        "student": "<p>Identify and rank the mechanical responses considered in this problem.</p>",
        "instructor": "<p>Average axial normal stress compared with allowable stress controls maximum load. Total axial elongation is a secondary stiffness or serviceability response. Buckling is not relevant because the member is in tension.</p>",
        "section": "context"
      },
      {
        "id": "q7",
        "title": "Relevant Parameters",
        "type": "parameter identification",
        "difficulty": "introductory",
        "tags": [
          "width",
          "thickness",
          "length",
          "modulus"
        ],
        "learningObjectives": [
          "Identify inputs required for allowable load and elongation."
        ],
        "selected": true,
        "student": "<p>Identify the geometric and material parameters required to determine maximum load and total elongation.</p>",
        "instructor": "<p>Required inputs are <em>&sigma;</em><sub>allow</sub>, thickness <em>t</em>, widths <em>w</em><sub>1</sub> and <em>w</em><sub>2</sub>, lengths <em>L</em><sub>AB</sub>, <em>L</em><sub>BC</sub>, and <em>L</em><sub>CD</sub>, and modulus <em>E</em>. Radius <em>r</em> is displayed but does not enter the base calculation because local fillet effects are neglected.</p>",
        "section": "context"
      },
      {
        "id": "q8",
        "title": "Student-Generated Structural Idealization",
        "type": "free-body diagram",
        "difficulty": "introductory",
        "tags": [
          "idealization",
          "stepped bar",
          "FBD"
        ],
        "learningObjectives": [
          "Convert the industrial link into a three-segment axial model."
        ],
        "selected": true,
        "student": "<p>Before using the reference figure, draw a simplified Mechanics of Materials model showing three constant-area segments, uniform thickness, segment lengths, and equal and opposite axial loads.</p>",
        "instructor": "<p>A correct model shows narrow segment AB, center segment BC, end segment CD, uniform thickness <em>t</em>, and centered tensile loads <em>P</em>. Each segment carries the same internal axial force.</p>",
        "gradingNotes": "<p>The student model should preserve the axial load path without unnecessary bracket geometry.</p>",
        "section": "transition"
      },
      {
        "id": "q9",
        "title": "Modeling Assumptions",
        "type": "assumptions",
        "difficulty": "introductory",
        "tags": [
          "linear elasticity",
          "uniform stress",
          "fillet effects"
        ],
        "learningObjectives": [
          "State assumptions supporting a prismatic-segment model."
        ],
        "selected": true,
        "student": "<p>State the assumptions used to simplify the real component.</p>",
        "instructor": "<p>Assume centered axial load, linear-elastic material, small deformation, uniform average stress in each prismatic segment, constant thickness, negligible self-weight, and no connection or local fillet stress-concentration effects.</p>",
        "section": "transition"
      },
      {
        "id": "q10",
        "title": "Mechanics Analysis Plan",
        "type": "analysis planning",
        "difficulty": "introductory",
        "tags": [
          "area",
          "allowable stress",
          "segment elongation"
        ],
        "learningObjectives": [
          "Plan the strength and deformation calculation sequence."
        ],
        "selected": true,
        "student": "<p>Describe the calculation sequence needed to determine maximum load and total elongation.</p>",
        "instructor": "<p>Calculate each segment area; identify the minimum area; determine <em>P</em><sub>max</sub> = <em>&sigma;</em><sub>allow</sub><em>A</em><sub>min</sub>; calculate each segment elongation <em>PL</em>/(<em>AE</em>) at that load; then sum the three contributions and interpret the result.</p>",
        "section": "transition"
      },
      {
        "id": "q11",
        "title": "Boundary Conditions and Internal Force",
        "type": "mechanics setup",
        "difficulty": "introductory",
        "tags": [
          "reference idealization",
          "internal force",
          "tension"
        ],
        "learningObjectives": [
          "Relate end loads to internal force in each segment."
        ],
        "selected": true,
        "student": "<p>From the instructor reference diagram, identify the boundary loading and internal axial force carried by each segment.</p>",
        "instructor": "<p>Equal and opposite loads <em>P</em> pull the link ends. A cut through AB, BC, or CD gives internal axial force <em>N</em> = <em>P</em> in tension.</p>",
        "section": "analysis"
      },
      {
        "id": "q12",
        "title": "Cross-Sectional Areas",
        "type": "section-property calculation",
        "difficulty": "introductory",
        "tags": [
          "rectangular area",
          "end segments",
          "center segment"
        ],
        "learningObjectives": [
          "Calculate cross-sectional areas from width and thickness."
        ],
        "selected": true,
        "student": "<p>Calculate the cross-sectional area of each constant-width segment.</p>",
        "instructor": "<p><em>A</em><sub>AB</sub> = <em>w</em><sub>1</sub><em>t</em> = <strong>{{link_area_AB_mm2}} mm<sup>2</sup></strong>, <em>A</em><sub>BC</sub> = <em>w</em><sub>2</sub><em>t</em> = <strong>{{link_area_BC_mm2}} mm<sup>2</sup></strong>, and <em>A</em><sub>CD</sub> = <em>w</em><sub>1</sub><em>t</em> = <strong>{{link_area_CD_mm2}} mm<sup>2</sup></strong>.</p>",
        "commonMistakes": "<p>Use the out-of-plane plate thickness <em>t</em>; radius <em>r</em> is not a thickness.</p>",
        "section": "analysis"
      },
      {
        "id": "q13",
        "title": "Critical Section for Strength",
        "type": "critical-section identification",
        "difficulty": "introductory",
        "tags": [
          "minimum area",
          "governing section",
          "average stress"
        ],
        "learningObjectives": [
          "Identify the section controlling allowable load."
        ],
        "selected": true,
        "student": "<p>Identify the critical constant-area section for the allowable-load calculation and justify your selection.</p>",
        "instructor": "<p><strong>{{link_critical_section}}</strong> {{link_critical_verb}} because the governing area, <strong>{{link_critical_area_mm2}} mm<sup>2</sup></strong>, is the minimum. Under the same internal force, the minimum-area section has the largest average normal stress.</p>",
        "section": "analysis"
      },
      {
        "id": "q14",
        "title": "Maximum Allowable Axial Load",
        "type": "allowable-load calculation",
        "difficulty": "introductory",
        "tags": [
          "allowable stress",
          "maximum load",
          "strength"
        ],
        "learningObjectives": [
          "Calculate allowable load from allowable stress and governing area."
        ],
        "selected": true,
        "student": "<p>Using <strong><em>&sigma;</em><sub>allow</sub> = {{sigma_allow}} {{sigma_allow_unit}}</strong>, determine the maximum allowable axial tensile load.</p>",
        "instructor": "<p><em>P</em><sub>max</sub> = <em>&sigma;</em><sub>allow</sub><em>A</em><sub>min</sub> = <strong>{{link_pmax_N}} N = {{link_pmax_kN}} kN</strong>. At this load, stresses are <strong>{{link_stress_AB_MPa}} MPa</strong> in AB, <strong>{{link_stress_BC_MPa}} MPa</strong> in BC, and <strong>{{link_stress_CD_MPa}} MPa</strong> in CD.</p>",
        "gradingNotes": "<p>With MPa = N/mm<sup>2</sup>, multiplying stress by area directly gives force in newtons.</p>",
        "section": "analysis"
      },
      {
        "id": "q15",
        "title": "Elongation of Each Segment",
        "type": "axial deformation calculation",
        "difficulty": "intermediate",
        "tags": [
          "PL/AE",
          "segment deformation",
          "maximum load"
        ],
        "learningObjectives": [
          "Calculate deformation of each prismatic segment."
        ],
        "selected": true,
        "student": "<p>At <em>P</em> = <em>P</em><sub>max</sub>, calculate the elongation of segments AB, BC, and CD.</p>",
        "instructor": "<p>Using &delta;<sub>i</sub> = <em>PL</em><sub>i</sub>/(<em>A</em><sub>i</sub><em>E</em>):</p><p><strong>&delta;<sub>AB</sub> = {{link_delta_AB_mm}} mm</strong>, <strong>&delta;<sub>BC</sub> = {{link_delta_BC_mm}} mm</strong>, and <strong>&delta;<sub>CD</sub> = {{link_delta_CD_mm}} mm</strong>.</p>",
        "section": "analysis"
      },
      {
        "id": "q16",
        "title": "Total Link Elongation",
        "type": "deformation compatibility",
        "difficulty": "intermediate",
        "tags": [
          "total elongation",
          "segments in series",
          "summation"
        ],
        "learningObjectives": [
          "Sum axial deformations of serial member segments."
        ],
        "selected": true,
        "student": "<p>Calculate the total elongation of the stepped link at the maximum allowable load.</p>",
        "instructor": "<p>&delta;<sub>total</sub> = &delta;<sub>AB</sub> + &delta;<sub>BC</sub> + &delta;<sub>CD</sub> = {{link_delta_AB_mm}} + {{link_delta_BC_mm}} + {{link_delta_CD_mm}} = <strong>{{link_delta_total_mm}} mm</strong>.</p>",
        "commonMistakes": "<p>All three serial-segment elongations contribute to the end-to-end displacement.</p>",
        "section": "analysis"
      },
      {
        "id": "q17",
        "title": "Stiffness Interpretation",
        "type": "engineering interpretation",
        "difficulty": "intermediate",
        "tags": [
          "dominant deformation",
          "length-to-area ratio",
          "stiffness"
        ],
        "learningObjectives": [
          "Explain why the strength-governing section may differ from the dominant deformation segment."
        ],
        "selected": true,
        "student": "<p>Which segment contributes most to total elongation, and why can that differ from the section governing strength?</p>",
        "instructor": "<p><strong>Segment {{link_dominant_segment}}</strong> contributes the most, <strong>{{link_dominant_elongation_mm}} mm</strong>. Strength depends on minimum area through <em>P/A</em>, whereas elongation depends on each segment's <em>L/A</em> ratio. A longer segment can dominate deformation even when its area is larger.</p>",
        "section": "analysis"
      },
      {
        "id": "q18",
        "title": "Strength-Based Modification",
        "type": "design evaluation",
        "difficulty": "intermediate",
        "tags": [
          "redesign",
          "governing area",
          "allowable stress"
        ],
        "learningObjectives": [
          "Recommend a modification that directly increases allowable load."
        ],
        "selected": true,
        "student": "<p>If a larger allowable tensile load is required, identify a direct geometry or material modification and justify it.</p>",
        "instructor": "<p>{{link_strength_modification}} A material with a higher allowable stress can also increase load capacity. Increasing only a non-governing area does not raise <em>P</em><sub>max</sub>.</p>",
        "section": "analysis"
      },
      {
        "id": "q19",
        "title": "Engineering Assessment and Recommendation",
        "type": "engineering judgment",
        "difficulty": "intermediate",
        "tags": [
          "recommendation",
          "allowable load",
          "limitations"
        ],
        "learningObjectives": [
          "Summarize strength and deformation results with appropriate limitations."
        ],
        "selected": true,
        "student": "<p>Summarize the allowable-load and elongation results in a short engineering recommendation. State what remains outside the base model.</p>",
        "instructor": "<p>The link supports a maximum modeled tensile load of <strong>{{link_pmax_kN}} kN</strong> based on <strong>{{link_critical_section}}</strong>. Its predicted elongation at that load is <strong>{{link_delta_total_mm}} mm</strong>, with segment <strong>{{link_dominant_segment}}</strong> contributing most. This is suitable as a preliminary average-stress and deformation result. Final design requires fillet stress concentration, pin-hole net section, bearing, connection strength, fatigue, fracture, manufacturing tolerance, and applicable design-standard checks.</p>",
        "gradingNotes": "<p>The recommendation must not interpret the allowable-stress result as verification of omitted local or connection limit states.</p>",
        "section": "analysis"
      }
    ],
    "variants": [
      {
        "id": "section-a",
        "title": "Homework Version A - baseline stepped link",
        "description": "Default sequence for load path, allowable stress, maximum load, segment elongation, and engineering assessment.",
        "selectedQuestions": [
          "q1",
          "q2",
          "q3",
          "q4",
          "q5",
          "q6",
          "q7",
          "q8",
          "q9",
          "q10",
          "q11",
          "q12",
          "q13",
          "q14",
          "q15",
          "q16",
          "q17",
          "q18",
          "q19"
        ],
        "variables": {
          "sigma_allow": 150,
          "t": 12,
          "w_1": 60,
          "w_2": 120,
          "L_AB": 200,
          "L_BC": 800,
          "L_CD": 200,
          "r": 30,
          "E": 200000
        }
      }
    ]
  },
  {
    "id": "MOS-CABLE-008",
    "slug": "suspended-equipment-cable-system",
    "title": "Suspended Industrial Equipment Pod Supported by Two Inclined Steel Cables",
    "studentDocumentTitle": "Student Homework Questions",
    "instructorDocumentTitle": "Instructor Answers",
    "summary": "A context-rich mechanics problem on 2D cable equilibrium, axial cable stress, minimum diameter, and factor of safety.",
    "textbookChapters": [
      "Equilibrium of a particle",
      "Stress and strain",
      "Axial loading",
      "Factor of safety",
      "Design of tension members"
    ],
    "derivedPlaceholders": [
      "cable_weight_N",
      "cable_T_AB_N",
      "cable_T_BC_N",
      "cable_T_AB_kN",
      "cable_T_BC_kN",
      "cable_governing_tension_member",
      "cable_allowable_stress_MPa",
      "cable_A_AB_req_mm2",
      "cable_A_BC_req_mm2",
      "cable_d_AB_min_mm",
      "cable_d_BC_min_mm",
      "cable_A_AB_mm2",
      "cable_A_BC_mm2",
      "cable_sigma_AB_MPa",
      "cable_sigma_BC_MPa",
      "cable_FOS_AB",
      "cable_FOS_BC",
      "cable_governing_fos_member",
      "cable_governing_fos",
      "cable_design_recommendation"
    ],
    "image": "problems/suspended-equipment-cable-system/assets/cable-industry-context.png",
    "idealizedImage": "problems/suspended-equipment-cable-system/assets/cable-instructor-idealization.png",
    "idealizedImageAlt": "Instructor reference idealization of the two-cable suspended equipment system.",
    "source": "problems/suspended-equipment-cable-system/index.html",
    "problemStatement": "<p>An industrial facility is installing a compact sensor or inspection equipment pod in a maintenance bay. The pod is suspended above the floor using two steel wire cables connected to wall-mounted brackets on opposite structural columns. The cable angles are not symmetric, so the load is not shared equally between the two cables.</p><p>As a junior facilities or mechanical engineer, evaluate whether the cable support arrangement can safely carry the equipment weight. The goal is not to redesign the full support structure, but to use Mechanics of Materials tools to determine cable tensions, cable tensile stresses, and the required cable diameters or factors of safety.</p>",
    "engineeringGoal": "<p>Determine whether the two inclined steel cables can safely support the suspended equipment pod under the specified static loading. Identify the cable with the larger tensile demand and determine either the minimum required cable diameter for a specified factor of safety or the actual factor of safety for selected cable diameters.</p>",
    "variables": [
      {
        "key": "m",
        "symbol": "m",
        "label": "Suspended equipment mass",
        "value": 60,
        "unit": "kg",
        "min": 5,
        "max": 500,
        "step": 1
      },
      {
        "key": "g",
        "symbol": "g",
        "label": "Gravitational acceleration",
        "value": 9.81,
        "unit": "m/s^2",
        "min": 9.7,
        "max": 9.9,
        "step": 0.01
      },
      {
        "key": "theta_AB",
        "symbol": "theta_AB",
        "label": "Left cable angle from horizontal",
        "value": 60,
        "unit": "deg",
        "min": 15,
        "max": 80,
        "step": 1
      },
      {
        "key": "theta_BC",
        "symbol": "theta_BC",
        "label": "Right cable angle from horizontal",
        "value": 45,
        "unit": "deg",
        "min": 15,
        "max": 80,
        "step": 1
      },
      {
        "key": "sigma_fail",
        "symbol": "sigma_fail",
        "label": "Cable material failure normal stress",
        "value": 380,
        "unit": "MPa",
        "min": 50,
        "max": 2000,
        "step": 10
      },
      {
        "key": "FOS_req",
        "symbol": "FOS_req",
        "label": "Required factor of safety",
        "value": 2,
        "unit": "-",
        "min": 1,
        "max": 10,
        "step": 0.1
      },
      {
        "key": "d_AB",
        "symbol": "d_AB",
        "label": "Selected diameter of cable AB",
        "value": 1.75,
        "unit": "mm",
        "min": 0.5,
        "max": 25,
        "step": 0.05
      },
      {
        "key": "d_BC",
        "symbol": "d_BC",
        "label": "Selected diameter of cable BC",
        "value": 1.5,
        "unit": "mm",
        "min": 0.5,
        "max": 25,
        "step": 0.05
      }
    ],
    "questions": [
      {
        "id": "q1",
        "title": "Primary Function of the Suspended Support System",
        "type": "context interpretation",
        "difficulty": "introductory",
        "tags": [
          "context",
          "function",
          "load path"
        ],
        "learningObjectives": [
          "Connect the real suspended system to its structural load-transfer function."
        ],
        "selected": true,
        "student": "<p>What is the primary structural function of the suspended equipment support system?</p>",
        "instructor": "<p>The system supports a suspended equipment pod and transfers its weight through two inclined steel cables into wall-mounted anchor brackets and then into the building structure.</p>",
        "gradingNotes": "<p>Good answers should mention support of the pod, weight transfer, cables, wall anchors, and building structure.</p>",
        "section": "context"
      },
      {
        "id": "q2",
        "title": "External Load and Weight",
        "type": "load identification",
        "difficulty": "introductory",
        "tags": [
          "weight",
          "load",
          "gravity"
        ],
        "learningObjectives": [
          "Identify the payload weight and where it acts in the idealized model."
        ],
        "selected": true,
        "student": "<p>Where is the external load applied, and what physical quantity creates it?</p>",
        "instructor": "<p>The external load is the equipment weight applied downward at the lower ring or connector B. The load is W = mg. For <strong>m = {{m}} {{m_unit}}</strong> and <strong>g = {{g}} {{g_unit}}</strong>, <strong>W = {{cable_weight_N}} N</strong>.</p>",
        "commonMistakes": "<p>Students sometimes place the pod weight at A or C. It acts at the payload/lower connector B.</p>",
        "section": "context"
      },
      {
        "id": "q3",
        "title": "Supports and Boundary Conditions",
        "type": "boundary conditions",
        "difficulty": "introductory",
        "tags": [
          "supports",
          "anchors",
          "joint B"
        ],
        "learningObjectives": [
          "Identify support idealizations for a cable-supported particle-equilibrium model."
        ],
        "selected": true,
        "student": "<p>Identify the supports or boundary constraints in the real system.</p>",
        "instructor": "<p>The wall-mounted brackets at A and C support the cables. In the idealized model, A and C are fixed anchor locations that provide cable reaction forces along the cable directions. The lower point B is a ring or shackle connection where the two cable forces and the payload weight meet.</p>",
        "gradingNotes": "<p>The most important free-body diagram is the lower joint B, not the entire wall frame.</p>",
        "section": "context"
      },
      {
        "id": "q4",
        "title": "Load Path to the Building Structure",
        "type": "load path",
        "difficulty": "introductory",
        "tags": [
          "load path",
          "cables",
          "anchors"
        ],
        "learningObjectives": [
          "Trace the load path from payload to support structure."
        ],
        "selected": true,
        "student": "<p>Using the component list, trace the load path from the equipment pod to the building structure.</p>",
        "instructor": "<p>Equipment pod weight &rarr; lower ring/shackle at B &rarr; tension in cable AB and cable BC &rarr; wall anchors A and C &rarr; structural columns or walls &rarr; building frame/foundation.</p>",
        "section": "context"
      },
      {
        "id": "q5",
        "title": "Critical Components",
        "type": "component identification",
        "difficulty": "introductory",
        "tags": [
          "critical components",
          "tension members"
        ],
        "learningObjectives": [
          "Identify which members are checked in the base mechanics problem."
        ],
        "selected": true,
        "student": "<p>Using the load path, identify the components most likely to be critical for this problem.</p>",
        "instructor": "<p>The critical components are the two steel cables AB and BC because they carry the payload through axial tension. The lower ring and wall anchor brackets are also part of the load path, but connector dimensions are not provided for a detailed connector stress check in the base problem.</p>",
        "section": "context"
      },
      {
        "id": "q6",
        "title": "Critical Mechanical Response",
        "type": "mechanics reasoning",
        "difficulty": "introductory",
        "tags": [
          "axial stress",
          "tension",
          "buckling"
        ],
        "learningObjectives": [
          "Choose the relevant mechanics response and reject irrelevant checks for the base model."
        ],
        "selected": true,
        "student": "<p>For each critical component, identify the relevant mechanical response or failure mechanism and rank them by importance.</p>",
        "instructor": "<p>The most important response is axial tensile stress in the cables. Secondary connector shear or bearing could be checked only if shackle, pin, bolt, or bracket dimensions are supplied. Buckling is not relevant because cables are tension-only members, and cable bending is neglected in this base model.</p>",
        "section": "context"
      },
      {
        "id": "q7",
        "title": "Relevant Geometry and Material Parameters",
        "type": "parameter identification",
        "difficulty": "introductory",
        "tags": [
          "angles",
          "diameter",
          "material strength"
        ],
        "learningObjectives": [
          "Identify the variables controlling cable tension, stress, and FOS."
        ],
        "selected": true,
        "student": "<p>Identify the geometric and material parameters that control the cable stress and factor of safety.</p>",
        "instructor": "<p>Relevant parameters include cable angles <strong>&theta;<sub>AB</sub> = {{theta_AB}} {{theta_AB_unit}}</strong> and <strong>&theta;<sub>BC</sub> = {{theta_BC}} {{theta_BC_unit}}</strong>, mass m, gravitational acceleration g, cable diameters d<sub>AB</sub> and d<sub>BC</sub>, cable cross-sectional areas A<sub>AB</sub> and A<sub>BC</sub>, cable failure stress &sigma;<sub>fail</sub>, and required factor of safety.</p>",
        "section": "context"
      },
      {
        "id": "q8",
        "title": "Student-Generated Cable Idealization",
        "type": "free-body diagram",
        "difficulty": "introductory",
        "tags": [
          "FBD",
          "idealization",
          "two-force members"
        ],
        "learningObjectives": [
          "Convert the real suspended system into a 2D particle-equilibrium model."
        ],
        "selected": true,
        "student": "<p>Convert the real system into a simplified 2D Mechanics of Materials model. The model should show support points A and C, lower joint B, cable members AB and BC, cable angles, the downward load W = mg, and the unknown cable tensions.</p>",
        "instructor": "<p>A correct idealization is a 2D particle-equilibrium model of joint B with two cable tensions directed away from B along cables BA and BC and a downward weight W. The cables are idealized as two-force tension members.</p>",
        "gradingNotes": "<p>This should be completed before students rely on the instructor reference diagram, unless the activity is intentionally scaffolded.</p>",
        "section": "transition"
      },
      {
        "id": "q9",
        "title": "Modeling Assumptions",
        "type": "assumptions",
        "difficulty": "introductory",
        "tags": [
          "assumptions",
          "static loading",
          "two-force members"
        ],
        "learningObjectives": [
          "State assumptions needed for the simplified equilibrium and stress model."
        ],
        "selected": true,
        "student": "<p>State the assumptions used to convert the real support system into the simplified mechanics model.</p>",
        "instructor": "<p>The equipment pod is modeled as a point load at B; cable self-weight is neglected; each cable is straight and massless; each cable is a two-force tension member; loading is static; anchor locations are fixed; material behavior is represented only by failure stress; and connector flexibility, bracket stresses, fatigue, and installation tolerances are neglected.</p>",
        "section": "transition"
      },
      {
        "id": "q10",
        "title": "Mechanics Analysis Plan",
        "type": "analysis planning",
        "difficulty": "introductory",
        "tags": [
          "equilibrium",
          "stress",
          "FOS"
        ],
        "learningObjectives": [
          "Plan the solution sequence from equilibrium to design recommendation."
        ],
        "selected": true,
        "student": "<p>Before calculating, describe the sequence of analysis required to evaluate the cables.</p>",
        "instructor": "<p>Draw the FBD of joint B; write equilibrium in x and y; solve for T<sub>AB</sub> and T<sub>BC</sub>; compute cable area from selected diameter or required area from allowable stress; compute &sigma; = T/A; compute FOS = &sigma;<sub>fail</sub>/&sigma;; and make an engineering recommendation.</p>",
        "section": "transition"
      },
      {
        "id": "q11",
        "title": "Boundary Conditions from the Instructor Diagram",
        "type": "mechanics setup",
        "difficulty": "introductory",
        "tags": [
          "anchors",
          "cable tension",
          "joint"
        ],
        "learningObjectives": [
          "Interpret the support and cable-force idealizations from the instructor diagram."
        ],
        "selected": true,
        "student": "<p>From the instructor reference diagram, identify the boundary conditions and support idealizations.</p>",
        "instructor": "<p>Points A and C are fixed wall anchor locations. The cables are attached to these supports and carry only tensile force along their own axes. Joint B is treated as a pin/ring where the two cable tensions and the downward weight act concurrently.</p>",
        "commonMistakes": "<p>This is not a beam support problem; do not introduce moment reactions at B.</p>",
        "section": "analysis"
      },
      {
        "id": "q12",
        "title": "Unknown Cable Forces",
        "type": "unknown forces",
        "difficulty": "introductory",
        "tags": [
          "tension",
          "unknowns"
        ],
        "learningObjectives": [
          "Identify the two unknown member forces before writing equilibrium equations."
        ],
        "selected": true,
        "student": "<p>Identify the unknown forces that must be solved before the cable stresses can be evaluated.</p>",
        "instructor": "<p>The unknowns are the two cable tensions T<sub>AB</sub> and T<sub>BC</sub>. These are the force magnitudes transmitted by cables AB and BC. At joint B, each tension acts along its cable direction away from B.</p>",
        "section": "analysis"
      },
      {
        "id": "q13",
        "title": "Equilibrium Equations at Joint B",
        "type": "equilibrium",
        "difficulty": "introductory",
        "tags": [
          "FBD",
          "particle equilibrium",
          "trigonometry"
        ],
        "learningObjectives": [
          "Write 2D equilibrium equations for an asymmetric cable joint."
        ],
        "selected": true,
        "student": "<p>Draw the free-body diagram of joint B and write the x- and y-equilibrium equations.</p>",
        "instructor": "<p>Using +x to the right and +y upward:</p><p>&Sigma;F<sub>x</sub> = -T<sub>AB</sub> cos({{theta_AB}}&deg;) + T<sub>BC</sub> cos({{theta_BC}}&deg;) = 0.</p><p>&Sigma;F<sub>y</sub> = T<sub>AB</sub> sin({{theta_AB}}&deg;) + T<sub>BC</sub> sin({{theta_BC}}&deg;) - W = 0.</p>",
        "commonMistakes": "<p>A common error is switching sine and cosine because the angles are measured from the horizontal.</p>",
        "section": "analysis"
      },
      {
        "id": "q14",
        "title": "Cable Tensions",
        "type": "calculation",
        "difficulty": "introductory",
        "tags": [
          "equilibrium",
          "cable tension"
        ],
        "learningObjectives": [
          "Solve the two equilibrium equations for cable tensions."
        ],
        "selected": true,
        "student": "<p>Using m = {{m}} kg and g = {{g}} m/s<sup>2</sup>, solve for T<sub>AB</sub> and T<sub>BC</sub>.</p>",
        "instructor": "<p>W = mg = <strong>{{cable_weight_N}} N</strong>. From horizontal equilibrium, T<sub>AB</sub> cos({{theta_AB}}&deg;) = T<sub>BC</sub> cos({{theta_BC}}&deg;). Solving with vertical equilibrium gives <strong>T<sub>AB</sub> = {{cable_T_AB_N}} N</strong> and <strong>T<sub>BC</sub> = {{cable_T_BC_N}} N</strong>. The larger cable tension is in <strong>{{cable_governing_tension_member}}</strong>.</p>",
        "gradingNotes": "<p>For the default geometry, cable AB carries the larger tension because the angles are asymmetric.</p>",
        "section": "analysis"
      },
      {
        "id": "q15",
        "title": "Minimum Cable Diameter for Required FOS",
        "type": "design calculation",
        "difficulty": "intermediate",
        "tags": [
          "minimum diameter",
          "factor of safety",
          "allowable stress"
        ],
        "learningObjectives": [
          "Determine required cable area and diameter from tension and allowable stress."
        ],
        "selected": true,
        "student": "<p>If the cable material has failure normal stress &sigma;<sub>fail</sub> = {{sigma_fail}} MPa and the required factor of safety is {{FOS_req}}, determine the minimum required diameter of each cable.</p>",
        "instructor": "<p>The allowable stress is &sigma;<sub>allow</sub> = &sigma;<sub>fail</sub>/FOS<sub>req</sub> = {{sigma_fail}}/{{FOS_req}} = <strong>{{cable_allowable_stress_MPa}} MPa</strong>. Required area is A<sub>req</sub> = T/&sigma;<sub>allow</sub>. Therefore A<sub>AB,req</sub> = <strong>{{cable_A_AB_req_mm2}} mm<sup>2</sup></strong>, d<sub>AB,min</sub> = <strong>{{cable_d_AB_min_mm}} mm</strong>; A<sub>BC,req</sub> = <strong>{{cable_A_BC_req_mm2}} mm<sup>2</sup></strong>, d<sub>BC,min</sub> = <strong>{{cable_d_BC_min_mm}} mm</strong>.</p>",
        "gradingNotes": "<p>Because MPa = N/mm<sup>2</sup>, using T in N gives area in mm<sup>2</sup> and diameter in mm.</p>",
        "section": "analysis"
      },
      {
        "id": "q16",
        "title": "Strength FOS Check for Selected Diameters",
        "type": "calculation",
        "difficulty": "intermediate",
        "tags": [
          "normal stress",
          "factor of safety",
          "selected diameter"
        ],
        "learningObjectives": [
          "Compute cable stress and FOS for selected cable diameters."
        ],
        "selected": true,
        "student": "<p>Now suppose cable AB has diameter d<sub>AB</sub> = {{d_AB}} mm and cable BC has diameter d<sub>BC</sub> = {{d_BC}} mm. Determine the normal stress and factor of safety in each cable.</p>",
        "instructor": "<p>A<sub>AB</sub> = &pi;({{d_AB}})<sup>2</sup>/4 = <strong>{{cable_A_AB_mm2}} mm<sup>2</sup></strong>, so &sigma;<sub>AB</sub> = T<sub>AB</sub>/A<sub>AB</sub> = <strong>{{cable_sigma_AB_MPa}} MPa</strong> and FOS<sub>AB</sub> = {{sigma_fail}}/{{cable_sigma_AB_MPa}} = <strong>{{cable_FOS_AB}}</strong>. A<sub>BC</sub> = &pi;({{d_BC}})<sup>2</sup>/4 = <strong>{{cable_A_BC_mm2}} mm<sup>2</sup></strong>, so &sigma;<sub>BC</sub> = T<sub>BC</sub>/A<sub>BC</sub> = <strong>{{cable_sigma_BC_MPa}} MPa</strong> and FOS<sub>BC</sub> = {{sigma_fail}}/{{cable_sigma_BC_MPa}} = <strong>{{cable_FOS_BC}}</strong>. The governing selected-diameter FOS is <strong>{{cable_governing_fos}}</strong> in <strong>{{cable_governing_fos_member}}</strong>.</p>",
        "section": "analysis"
      },
      {
        "id": "q17",
        "title": "Strength-Based Modification",
        "type": "design evaluation",
        "difficulty": "intermediate",
        "tags": [
          "design modification",
          "FOS"
        ],
        "learningObjectives": [
          "Propose mechanics-based changes when a factor of safety requirement is not met."
        ],
        "selected": true,
        "student": "<p>If either cable does not meet the required factor of safety, identify a mechanics-based modification that would increase the factor of safety.</p>",
        "instructor": "<p>Possible modifications include increasing the diameter of the governing cable, selecting a cable material with larger failure stress, reducing the supported mass, or changing the cable geometry to reduce the tension in the governing cable. For this numerical case, <strong>{{cable_design_recommendation}}</strong>.</p>",
        "section": "analysis"
      },
      {
        "id": "q18",
        "title": "Engineering Assessment and Recommendation",
        "type": "engineering judgment",
        "difficulty": "intermediate",
        "tags": [
          "recommendation",
          "limitations",
          "connector loads"
        ],
        "learningObjectives": [
          "Make a limited engineering recommendation based on cable strength and missing connector checks."
        ],
        "selected": true,
        "student": "<p>Using the mechanics results, make a limited engineering recommendation for the suspended equipment support. Include connector or anchor checks that would be needed before final service approval.</p>",
        "instructor": "<p>The governing load case is the static weight of the {{m}} kg equipment pod, W = <strong>{{cable_weight_N}} N</strong>. Cable <strong>{{cable_governing_tension_member}}</strong> carries the larger tension. For the minimum-diameter design, use d<sub>AB</sub> &ge; <strong>{{cable_d_AB_min_mm}} mm</strong> and d<sub>BC</sub> &ge; <strong>{{cable_d_BC_min_mm}} mm</strong> before rounding up to standard cable sizes. For d<sub>AB</sub> = {{d_AB}} mm and d<sub>BC</sub> = {{d_BC}} mm, the selected-diameter check gives FOS<sub>AB</sub> = <strong>{{cable_FOS_AB}}</strong> and FOS<sub>BC</sub> = <strong>{{cable_FOS_BC}}</strong>; therefore, <strong>{{cable_design_recommendation}}</strong>. Final service acceptance still requires separate verification of wall anchors, brackets, shackles, pins, fatigue if cyclic loading exists, and installation quality.</p>",
        "gradingNotes": "<p>The recommendation should return to the real support system without claiming connector or anchor safety from cable stress alone.</p>",
        "section": "analysis"
      }
    ],
    "variants": [
      {
        "id": "section-a",
        "title": "Homework Version A - asymmetric cable support",
        "description": "Default sequence for cable load path, joint equilibrium, axial stress, minimum diameter, and selected-diameter FOS.",
        "selectedQuestions": [
          "q1",
          "q2",
          "q3",
          "q4",
          "q5",
          "q6",
          "q7",
          "q8",
          "q9",
          "q10",
          "q11",
          "q12",
          "q13",
          "q14",
          "q15",
          "q16",
          "q17",
          "q18"
        ],
        "variables": {
          "m": 60,
          "g": 9.81,
          "theta_AB": 60,
          "theta_BC": 45,
          "sigma_fail": 380,
          "FOS_req": 2,
          "d_AB": 1.75,
          "d_BC": 1.5
        }
      }
    ]
  },
  {
    "id": "MOS-PLATFORM-011",
    "slug": "suspended-equipment-platform",
    "title": "Suspended Industrial Equipment Platform Supported by Stainless-Steel Wires",
    "studentDocumentTitle": "Student Homework Questions",
    "instructorDocumentTitle": "Instructor Answers",
    "summary": "A two-level suspended-platform problem integrating rigid-body equilibrium, axial wire deformation, displacement compatibility, and small-angle rotation.",
    "textbookChapters": [
      "Rigid-body equilibrium",
      "Axial loading",
      "Axial deformation",
      "Displacement compatibility",
      "Small-angle rotation"
    ],
    "derivedPlaceholders": [
      "platform_x_HC_ft",
      "platform_T_AH_lb",
      "platform_T_BC_lb",
      "platform_T_ED_lb",
      "platform_T_FC_lb",
      "platform_delta_AH_in",
      "platform_delta_BC_in",
      "platform_delta_ED_in",
      "platform_delta_FC_in",
      "platform_delta_H_in",
      "platform_delta_A_in",
      "platform_delta_B_in",
      "platform_delta_load_in",
      "platform_theta_AB_rad",
      "platform_theta_AB_deg",
      "platform_theta_DC_rad",
      "platform_theta_DC_deg",
      "platform_lower_tilt_direction",
      "platform_upper_tilt_direction",
      "platform_governing_wire",
      "platform_governing_force_lb",
      "platform_dominant_wire",
      "platform_dominant_elongation_in"
    ],
    "image": "problems/suspended-equipment-platform/assets/platform-industry-context.png",
    "idealizedImage": "problems/suspended-equipment-platform/assets/platform-instructor-idealization.png",
    "idealizedImageAlt": "Instructor reference idealization of two rigid suspended members connected to each other and the ceiling by four vertical tension wires.",
    "source": "problems/suspended-equipment-platform/index.html",
    "problemStatement": "<p>A manufacturing facility is installing a suspended service platform that supports a compact equipment module above the production floor. The assembly has an upper rigid member and a lower rigid member connected by stainless-steel tension wires. The upper member is suspended from fixed overhead anchors by a second pair of wires.</p><p>Because load <em>P</em> is applied eccentrically to the lower member, the four wires do not carry equal forces. Their unequal elastic elongations cause both rigid members to translate and rotate.</p>",
    "engineeringGoal": "<p>Determine the downward displacement of the equipment load and the small-angle tilt of each rigid member. Identify the wire carrying the largest force and the deformation contribution that most strongly influences platform motion.</p>",
    "variables": [
      {
        "key": "P",
        "symbol": "P",
        "label": "Suspended equipment load",
        "value": 800,
        "unit": "lb",
        "min": 10,
        "max": 10000,
        "step": 10
      },
      {
        "key": "A_w",
        "symbol": "A_w",
        "label": "Cross-sectional area of each wire",
        "value": 0.05,
        "unit": "in^2",
        "min": 0.001,
        "max": 2,
        "step": 0.001
      },
      {
        "key": "E_w",
        "symbol": "E_w",
        "label": "Elastic modulus of stainless-steel wire",
        "value": 28000,
        "unit": "ksi",
        "min": 1000,
        "max": 40000,
        "step": 100
      },
      {
        "key": "L_u",
        "symbol": "L_u",
        "label": "Length of each upper wire ED and FC",
        "value": 4,
        "unit": "ft",
        "min": 0.25,
        "max": 50,
        "step": 0.25
      },
      {
        "key": "L_l",
        "symbol": "L_l",
        "label": "Length of each lower wire AH and BC",
        "value": 4.5,
        "unit": "ft",
        "min": 0.25,
        "max": 50,
        "step": 0.25
      },
      {
        "key": "L_DC",
        "symbol": "L_DC",
        "label": "Length of upper rigid member DC",
        "value": 7,
        "unit": "ft",
        "min": 0.5,
        "max": 50,
        "step": 0.25
      },
      {
        "key": "L_AB",
        "symbol": "L_AB",
        "label": "Length of lower rigid member AB",
        "value": 5,
        "unit": "ft",
        "min": 0.5,
        "max": 50,
        "step": 0.25
      },
      {
        "key": "x_DH",
        "symbol": "x_DH",
        "label": "Distance from D to lower-wire point H",
        "value": 2,
        "unit": "ft",
        "min": 0.1,
        "max": 49,
        "step": 0.1
      },
      {
        "key": "x_P",
        "symbol": "x_P",
        "label": "Distance from A to the payload",
        "value": 1,
        "unit": "ft",
        "min": 0.1,
        "max": 49,
        "step": 0.1
      }
    ],
    "questions": [
      {
        "id": "q1",
        "title": "Primary Function of the System",
        "type": "context interpretation",
        "difficulty": "introductory",
        "tags": [
          "function",
          "suspended platform",
          "load transfer"
        ],
        "learningObjectives": [
          "Identify the structural purpose of the suspended platform system."
        ],
        "selected": true,
        "student": "<p>What is the primary structural function of the suspended platform system?</p>",
        "instructor": "<p>The system supports an equipment load and transfers it through lower rigid member AB, lower wires AH and BC, upper rigid member DC, upper wires ED and FC, and finally into the fixed overhead support.</p>",
        "gradingNotes": "<p>Students should describe support and force transfer, not merely identify the assembly as a platform.</p>",
        "section": "context"
      },
      {
        "id": "q2",
        "title": "External Load and Eccentricity",
        "type": "load identification",
        "difficulty": "introductory",
        "tags": [
          "external load",
          "eccentric loading",
          "moment"
        ],
        "learningObjectives": [
          "Explain why payload position affects support-wire forces."
        ],
        "selected": true,
        "student": "<p>Where is the external load applied, and why does its position matter?</p>",
        "instructor": "<p>Load <em>P</em> is applied to lower rigid member AB at an eccentric location. Its position controls the moment about the lower-wire attachment points, causing unequal wire forces and unequal elongations that rotate the member.</p>",
        "section": "context"
      },
      {
        "id": "q3",
        "title": "Supports and Boundary Conditions",
        "type": "boundary conditions",
        "difficulty": "introductory",
        "tags": [
          "fixed anchors",
          "rigid members",
          "wires"
        ],
        "learningObjectives": [
          "Distinguish fixed anchors from movable rigid members."
        ],
        "selected": true,
        "student": "<p>Identify the supports and boundary constraints in the system.</p>",
        "instructor": "<p>The upper ends of wires ED and FC are attached to fixed overhead anchors E and F. Members AB and DC are rigid but are free to translate and rotate as the four tension wires elongate.</p>",
        "commonMistakes": "<p>Do not model either horizontal member as a fixed beam.</p>",
        "section": "context"
      },
      {
        "id": "q4",
        "title": "Load Path",
        "type": "load path",
        "difficulty": "introductory",
        "tags": [
          "load path",
          "wire tension",
          "overhead support"
        ],
        "learningObjectives": [
          "Trace load through both levels of the suspended assembly."
        ],
        "selected": true,
        "student": "<p>Trace the load path from the equipment load to the building structure.</p>",
        "instructor": "<p>Equipment load <em>P</em> &rarr; lower rigid member AB &rarr; lower wires AH and BC &rarr; upper rigid member DC &rarr; upper wires ED and FC &rarr; fixed overhead support &rarr; building structure.</p>",
        "section": "context"
      },
      {
        "id": "q5",
        "title": "Critical Components",
        "type": "component identification",
        "difficulty": "introductory",
        "tags": [
          "deformable components",
          "rigid members",
          "compatibility"
        ],
        "learningObjectives": [
          "Separate deformable wires from rigid load-distribution members."
        ],
        "selected": true,
        "student": "<p>Which components are most important for the base mechanics analysis, and what role does each play?</p>",
        "instructor": "<p>The four wires are deformable axial members and control vertical displacement. Rigid members AB and DC distribute forces and impose displacement compatibility but are assumed not to deform.</p>",
        "section": "context"
      },
      {
        "id": "q6",
        "title": "Mechanical Response and Scope",
        "type": "mechanics reasoning",
        "difficulty": "introductory",
        "tags": [
          "axial elongation",
          "translation",
          "rotation"
        ],
        "learningObjectives": [
          "Identify the responses supported by the supplied data."
        ],
        "selected": true,
        "student": "<p>Identify the mechanical responses considered for the wires and rigid members in this problem.</p>",
        "instructor": "<p>The wires undergo axial tension and elongation. The rigid members undergo small vertical translations and rotations produced by unequal endpoint displacements. Strength failure, fatigue, connector stress, and rigid-member bending are outside the base problem.</p>",
        "section": "context"
      },
      {
        "id": "q7",
        "title": "Relevant Parameters",
        "type": "parameter identification",
        "difficulty": "introductory",
        "tags": [
          "wire area",
          "elastic modulus",
          "geometry"
        ],
        "learningObjectives": [
          "Connect the input variables to equilibrium and axial deformation."
        ],
        "selected": true,
        "student": "<p>Identify the loading, geometric, and material parameters that control displacement and tilt.</p>",
        "instructor": "<p>The required inputs are <em>P</em>, <em>A</em><sub>w</sub>, <em>E</em><sub>w</sub>, <em>L</em><sub>u</sub>, <em>L</em><sub>l</sub>, <em>L</em><sub>DC</sub>, <em>L</em><sub>AB</sub>, <em>x</em><sub>DH</sub>, and <em>x</em><sub>P</sub>. The remaining upper span is <em>x</em><sub>HC</sub> = <em>L</em><sub>DC</sub> - <em>x</em><sub>DH</sub> = {{platform_x_HC_ft}} ft.</p>",
        "section": "context"
      },
      {
        "id": "q8",
        "title": "Student-Generated Structural Idealization",
        "type": "free-body diagram",
        "difficulty": "intermediate",
        "tags": [
          "idealization",
          "FBD",
          "two-level system"
        ],
        "learningObjectives": [
          "Convert the real assembly into two rigid bodies connected by axial wires."
        ],
        "selected": true,
        "student": "<p>Before using the reference figure, draw a simplified Mechanics of Materials model. Show the fixed anchors, four vertical wires, rigid members AB and DC, payload location, and symbolic dimensions. Include separate free-body diagrams for both rigid members.</p>",
        "instructor": "<p>A correct model has two horizontal rigid members connected by vertical axial tension wires. The upper member is suspended from fixed anchors by ED and FC; the lower member is suspended from the upper member by AH and BC; and concentrated load <em>P</em> acts eccentrically on AB.</p>",
        "gradingNotes": "<p>Students should attempt the model before seeing the instructor reference idealization.</p>",
        "section": "transition"
      },
      {
        "id": "q9",
        "title": "Modeling Assumptions",
        "type": "assumptions",
        "difficulty": "intermediate",
        "tags": [
          "linear elasticity",
          "small rotation",
          "rigid body"
        ],
        "learningObjectives": [
          "State assumptions supporting equilibrium and compatibility analysis."
        ],
        "selected": true,
        "student": "<p>State the assumptions used to convert the physical system into the simplified mechanics model.</p>",
        "instructor": "<p>Typical assumptions are rigid members AB and DC; straight, vertical, uniform, linearly elastic wires; axial wire force only; fixed anchors E and F; static loading; small displacement and rotation; ideal pin or eye connections; and neglected wire self-weight and local connection effects.</p>",
        "section": "transition"
      },
      {
        "id": "q10",
        "title": "Mechanics Analysis Plan",
        "type": "analysis planning",
        "difficulty": "intermediate",
        "tags": [
          "equilibrium sequence",
          "elongation",
          "compatibility"
        ],
        "learningObjectives": [
          "Plan the coupled equilibrium and displacement solution."
        ],
        "selected": true,
        "student": "<p>Before calculating, describe the analysis sequence needed to determine load displacement and member tilt.</p>",
        "instructor": "<p>Use equilibrium of AB to find lower-wire forces; use equilibrium of DC to find upper-wire forces; calculate all four wire elongations; interpolate the upper-member displacement at H; add lower-wire elongations to obtain displacements at A and B; interpolate at the load point; then calculate each member's small-angle rotation from its endpoint displacement difference.</p>",
        "section": "transition"
      },
      {
        "id": "q11",
        "title": "Boundary Conditions and Unknown Wire Forces",
        "type": "mechanics setup",
        "difficulty": "introductory",
        "tags": [
          "reference idealization",
          "wire tensions",
          "rigid bodies"
        ],
        "learningObjectives": [
          "Interpret the reference idealization and define unknown tensions."
        ],
        "selected": true,
        "student": "<p>From the instructor reference diagram, identify the fixed points, rigid bodies, and four unknown wire forces.</p>",
        "instructor": "<p>Ceiling anchors E and F are fixed. AB and DC are rigid bodies. The unknown axial tensions are <em>T</em><sub>ED</sub>, <em>T</em><sub>FC</sub>, <em>T</em><sub>AH</sub>, and <em>T</em><sub>BC</sub>, each acting vertically along its wire.</p>",
        "section": "analysis"
      },
      {
        "id": "q12",
        "title": "Equilibrium of Lower Member AB",
        "type": "rigid-body equilibrium",
        "difficulty": "intermediate",
        "tags": [
          "lower member",
          "force equilibrium",
          "moment equilibrium"
        ],
        "learningObjectives": [
          "Determine lower-wire forces under eccentric loading."
        ],
        "selected": true,
        "student": "<p>Draw the free-body diagram of lower member AB. For <strong><em>P</em> = {{P}} {{P_unit}}</strong>, <strong><em>L</em><sub>AB</sub> = {{L_AB}} {{L_AB_unit}}</strong>, and <strong><em>x</em><sub>P</sub> = {{x_P}} {{x_P_unit}}</strong>, determine <em>T</em><sub>AH</sub> and <em>T</em><sub>BC</sub>.</p>",
        "instructor": "<p>For AB, &Sigma;<em>F</em><sub>y</sub> = 0 gives <em>T</em><sub>AH</sub> + <em>T</em><sub>BC</sub> = <em>P</em>. Moments about A give <em>T</em><sub>BC</sub><em>L</em><sub>AB</sub> = <em>Px</em><sub>P</sub>. Therefore <strong><em>T</em><sub>BC</sub> = {{platform_T_BC_lb}} lb</strong> and <strong><em>T</em><sub>AH</sub> = {{platform_T_AH_lb}} lb</strong>.</p>",
        "commonMistakes": "<p>The eccentric load does not split equally between the lower wires.</p>",
        "section": "analysis"
      },
      {
        "id": "q13",
        "title": "Equilibrium of Upper Member DC",
        "type": "rigid-body equilibrium",
        "difficulty": "intermediate",
        "tags": [
          "upper member",
          "transmitted loads",
          "moment equilibrium"
        ],
        "learningObjectives": [
          "Transfer lower-wire forces to the upper rigid member and solve support tensions."
        ],
        "selected": true,
        "student": "<p>Draw the free-body diagram of upper member DC and determine <em>T</em><sub>ED</sub> and <em>T</em><sub>FC</sub>. Show where the lower-wire forces act on DC.</p>",
        "instructor": "<p>The lower wires apply downward forces <em>T</em><sub>AH</sub> at H and <em>T</em><sub>BC</sub> at C. Thus <em>T</em><sub>ED</sub> + <em>T</em><sub>FC</sub> = <em>P</em>. Moments about D give <em>T</em><sub>FC</sub><em>L</em><sub>DC</sub> = <em>T</em><sub>AH</sub><em>x</em><sub>DH</sub> + <em>T</em><sub>BC</sub><em>L</em><sub>DC</sub>. Therefore <strong><em>T</em><sub>FC</sub> = {{platform_T_FC_lb}} lb</strong> and <strong><em>T</em><sub>ED</sub> = {{platform_T_ED_lb}} lb</strong>.</p>",
        "section": "analysis"
      },
      {
        "id": "q14",
        "title": "Wire Elongations",
        "type": "axial deformation calculation",
        "difficulty": "intermediate",
        "tags": [
          "wire elongation",
          "FL/AE",
          "unit conversion"
        ],
        "learningObjectives": [
          "Calculate elongation of all four tension wires with consistent units."
        ],
        "selected": true,
        "student": "<p>Calculate the elongation of each wire using &delta; = <em>FL</em>/(<em>AE</em>). Use <strong><em>A</em><sub>w</sub> = {{A_w}} {{A_w_unit}}</strong> and <strong><em>E</em><sub>w</sub> = {{E_w}} {{E_w_unit}}</strong>.</p>",
        "instructor": "<p>Use <em>L</em><sub>u</sub> = {{L_u}} ft = {{L_u}}(12) in, <em>L</em><sub>l</sub> = {{L_l}} ft = {{L_l}}(12) in, and <em>E</em><sub>w</sub> = {{E_w}} ksi = {{E_w}}(1000) psi.</p><p><strong>&delta;<sub>AH</sub> = {{platform_delta_AH_in}} in</strong>, <strong>&delta;<sub>BC</sub> = {{platform_delta_BC_in}} in</strong>, <strong>&delta;<sub>ED</sub> = {{platform_delta_ED_in}} in</strong>, and <strong>&delta;<sub>FC</sub> = {{platform_delta_FC_in}} in</strong>.</p>",
        "commonMistakes": "<p>Convert feet to inches and ksi to psi when force is in pounds and area is in square inches.</p>",
        "section": "analysis"
      },
      {
        "id": "q15",
        "title": "Displacement of Point H",
        "type": "rigid-body compatibility",
        "difficulty": "intermediate",
        "tags": [
          "upper member",
          "linear interpolation",
          "point displacement"
        ],
        "learningObjectives": [
          "Interpolate displacement along a rigid member undergoing small rotation."
        ],
        "selected": true,
        "student": "<p>Using rigid-body compatibility of upper member DC, determine the downward displacement of point H.</p>",
        "instructor": "<p>Point D moves downward by &delta;<sub>ED</sub>, and C moves downward by &delta;<sub>FC</sub>. Since H is <em>x</em><sub>DH</sub>/<em>L</em><sub>DC</sub> of the distance from D to C,</p><p>&delta;<sub>H</sub> = &delta;<sub>D</sub> + (&delta;<sub>C</sub> - &delta;<sub>D</sub>)(<em>x</em><sub>DH</sub>/<em>L</em><sub>DC</sub>) = <strong>{{platform_delta_H_in}} in downward</strong>.</p>",
        "section": "analysis"
      },
      {
        "id": "q16",
        "title": "Endpoint Displacements of Lower Member AB",
        "type": "displacement compatibility",
        "difficulty": "intermediate",
        "tags": [
          "lower member",
          "support motion",
          "wire elongation"
        ],
        "learningObjectives": [
          "Combine support motion and lower-wire elongation."
        ],
        "selected": true,
        "student": "<p>Determine the downward displacements of endpoints A and B of lower rigid member AB.</p>",
        "instructor": "<p>Point A is suspended from moving point H through wire AH, so &delta;<sub>A</sub> = &delta;<sub>H</sub> + &delta;<sub>AH</sub> = <strong>{{platform_delta_A_in}} in downward</strong>. Point B is suspended from moving point C through wire BC, so &delta;<sub>B</sub> = &delta;<sub>C</sub> + &delta;<sub>BC</sub> = <strong>{{platform_delta_B_in}} in downward</strong>.</p>",
        "gradingNotes": "<p>Both upper-support motion and lower-wire elongation must be included.</p>",
        "section": "analysis"
      },
      {
        "id": "q17",
        "title": "Vertical Displacement of the Equipment Load",
        "type": "displacement interpolation",
        "difficulty": "intermediate to advanced",
        "tags": [
          "payload displacement",
          "rigid-body motion",
          "compatibility"
        ],
        "learningObjectives": [
          "Determine load-point displacement from endpoint motions."
        ],
        "selected": true,
        "student": "<p>Determine the vertical displacement of the equipment load on lower member AB.</p>",
        "instructor": "<p>The load is <em>x</em><sub>P</sub>/<em>L</em><sub>AB</sub> of the distance from A to B. Therefore &delta;<sub>load</sub> = &delta;<sub>A</sub> + (&delta;<sub>B</sub> - &delta;<sub>A</sub>)(<em>x</em><sub>P</sub>/<em>L</em><sub>AB</sub>) = <strong>{{platform_delta_load_in}} in downward</strong>.</p>",
        "section": "analysis"
      },
      {
        "id": "q18",
        "title": "Tilt of Lower Member AB",
        "type": "small-angle rotation",
        "difficulty": "intermediate",
        "tags": [
          "lower member tilt",
          "rotation",
          "endpoint displacement"
        ],
        "learningObjectives": [
          "Calculate and interpret the small-angle rotation of AB."
        ],
        "selected": true,
        "student": "<p>Determine the small-angle tilt magnitude and physical direction of lower member AB.</p>",
        "instructor": "<p>|&theta;<sub>AB</sub>| &asymp; |&delta;<sub>B</sub> - &delta;<sub>A</sub>|/<em>L</em><sub>AB</sub> = <strong>{{platform_theta_AB_rad}} rad = {{platform_theta_AB_deg}}&deg;</strong>. Member AB tilts <strong>{{platform_lower_tilt_direction}}</strong>.</p>",
        "section": "analysis"
      },
      {
        "id": "q19",
        "title": "Tilt of Upper Member DC",
        "type": "small-angle rotation",
        "difficulty": "intermediate",
        "tags": [
          "upper member tilt",
          "rotation",
          "endpoint displacement"
        ],
        "learningObjectives": [
          "Calculate and interpret the small-angle rotation of DC."
        ],
        "selected": true,
        "student": "<p>Determine the small-angle tilt magnitude and physical direction of upper member DC.</p>",
        "instructor": "<p>|&theta;<sub>DC</sub>| &asymp; |&delta;<sub>C</sub> - &delta;<sub>D</sub>|/<em>L</em><sub>DC</sub> = <strong>{{platform_theta_DC_rad}} rad = {{platform_theta_DC_deg}}&deg;</strong>. Member DC tilts <strong>{{platform_upper_tilt_direction}}</strong>.</p>",
        "section": "analysis"
      },
      {
        "id": "q20",
        "title": "Engineering Assessment and Recommendation",
        "type": "engineering judgment",
        "difficulty": "intermediate to advanced",
        "tags": [
          "governing wire",
          "design recommendation",
          "limitations"
        ],
        "learningObjectives": [
          "Interpret the mechanics results and make a limited recommendation."
        ],
        "selected": true,
        "student": "<p>Identify the wire carrying the largest force and the largest elongation. Use the results to recommend one change that would reduce load displacement or tilt, and state what additional information is needed before service approval.</p>",
        "instructor": "<p><strong>Wire {{platform_governing_wire}}</strong> carries the largest force, <strong>{{platform_governing_force_lb}} lb</strong>. <strong>Wire {{platform_dominant_wire}}</strong> has the largest elongation, <strong>{{platform_dominant_elongation_in}} in</strong>. The predicted payload displacement is <strong>{{platform_delta_load_in}} in downward</strong>. Increasing wire area or modulus reduces all wire elongations; reducing load eccentricity especially reduces unequal lower-wire elongation and lower-member tilt. Service approval also requires allowable stresses, fatigue requirements, anchor and connector geometry, rigid-member stiffness, tolerances, and applicable facility criteria.</p>",
        "gradingNotes": "<p>The recommendation must remain within this deformation model and must not claim that strength or durability has been verified.</p>",
        "section": "analysis"
      }
    ],
    "variants": [
      {
        "id": "section-a",
        "title": "Homework Version A - baseline suspended platform",
        "description": "Default sequence for load path, two-stage equilibrium, wire elongation, displacement compatibility, and rigid-member tilt.",
        "selectedQuestions": [
          "q1",
          "q2",
          "q3",
          "q4",
          "q5",
          "q6",
          "q7",
          "q8",
          "q9",
          "q10",
          "q11",
          "q12",
          "q13",
          "q14",
          "q15",
          "q16",
          "q17",
          "q18",
          "q19",
          "q20"
        ],
        "variables": {
          "P": 800,
          "A_w": 0.05,
          "E_w": 28000,
          "L_u": 4,
          "L_l": 4.5,
          "L_DC": 7,
          "L_AB": 5,
          "x_DH": 2,
          "x_P": 1
        }
      }
    ]
  },
  {
    "id": "MOS-TURBINE-019",
    "slug": "turbine-shaft-distributed-torque",
    "title": "Torsional Response of a Multi-Stage Turbine Rotor",
    "studentDocumentTitle": "Student Homework Questions",
    "instructorDocumentTitle": "Instructor Answers",
    "summary": "A turbine-rotor torsion problem integrating a linearly varying internal-torque function, reaction torque, polar moment, angle-of-twist integration, maximum shear stress, and parameter sensitivity.",
    "textbookChapters": [
      "Torsion of circular shafts",
      "Distributed torsional loading",
      "Angle of twist",
      "Torsional shear stress"
    ],
    "derivedPlaceholders": [
      "turbine_total_length_ft",
      "turbine_L_in",
      "turbine_T_D_lbin",
      "turbine_reaction_lbft",
      "turbine_average_torque_lbft",
      "turbine_J_in4",
      "turbine_phi_rad",
      "turbine_phi_deg",
      "turbine_tau_psi",
      "turbine_tau_ksi",
      "turbine_recommendation"
    ],
    "image": "problems/turbine-shaft-distributed-torque/assets/turbine-shaft-industry-context.png",
    "idealizedImage": "problems/turbine-shaft-distributed-torque/assets/turbine-shaft-instructor-idealization.png",
    "idealizedImageAlt": "Instructor reference idealization of a turbine rotor with torque-free journal bearings at A and B, a fixed section at C, section D, and a linearly varying blade-region torque model.",
    "source": "problems/turbine-shaft-distributed-torque/index.html",
    "problemStatement": "<p>A power-generation engineering team is evaluating a uniform solid turbine rotor. Successive blade stages transfer torque into the shaft over the active region C-D, so the cumulative internal torque changes continuously along that region.</p><p>For this assignment, the stated linear quantity is the internal torque resultant <em>T</em>(<em>x</em>) = <em>T</em><sub>D</sub><em>x</em>/<em>L</em>, not a torque intensity per unit length. Journal bearings A and B are torque-free, while section C is fixed in rotation.</p>",
    "engineeringGoal": "<p>Derive the internal-torque function, determine the relative angle of twist at D and the absolute maximum torsional shear stress, identify the governing location, and explain the parameters controlling strength and stiffness.</p>",
    "variables": [
      {
        "key": "turbine_d",
        "symbol": "d",
        "label": "Solid shaft diameter",
        "value": 6,
        "unit": "in",
        "min": 0.1,
        "max": 100,
        "step": 0.25
      },
      {
        "key": "turbine_G",
        "symbol": "G",
        "label": "Shear modulus of L2 steel",
        "value": 11200000,
        "unit": "psi",
        "min": 1000,
        "max": 100000000,
        "step": 100000
      },
      {
        "key": "turbine_L",
        "symbol": "L",
        "label": "Loaded blade-region length C to D",
        "value": 10,
        "unit": "ft",
        "min": 0.1,
        "max": 1000,
        "step": 0.5
      },
      {
        "key": "turbine_a",
        "symbol": "a",
        "label": "Distance A to C",
        "value": 2,
        "unit": "ft",
        "min": 0,
        "max": 1000,
        "step": 0.5
      },
      {
        "key": "turbine_b",
        "symbol": "b",
        "label": "Distance D to B",
        "value": 2,
        "unit": "ft",
        "min": 0,
        "max": 1000,
        "step": 0.5
      },
      {
        "key": "turbine_T_D",
        "symbol": "T_D",
        "label": "Internal torque at section D",
        "value": 2000,
        "unit": "lb*ft",
        "min": 0.1,
        "max": 10000000,
        "step": 100
      }
    ],
    "questions": [
      {
        "id": "q1",
        "title": "Primary Function of the Rotor Shaft",
        "type": "context interpretation",
        "difficulty": "introductory",
        "tags": [
          "rotor function",
          "torque transmission",
          "torsional stiffness"
        ],
        "learningObjectives": [
          "Identify the rotor shaft's role in the turbine system."
        ],
        "selected": true,
        "student": "<p>State the primary structural and mechanical function of the rotor shaft.</p>",
        "instructor": "<p>The rotor shaft transmits torque from the turbine stages to the connected drivetrain while maintaining acceptable torsional strength and stiffness.</p>",
        "section": "context"
      },
      {
        "id": "q2",
        "title": "Blade-Generated Torsional Loading",
        "type": "load identification",
        "difficulty": "introductory",
        "tags": [
          "turbine blades",
          "shaft-axis torque",
          "continuous loading"
        ],
        "learningObjectives": [
          "Connect blade loading to a varying internal torque."
        ],
        "selected": true,
        "student": "<p>Explain how the turbine blade stages load the shaft in the base model.</p>",
        "instructor": "<p>The blade stages apply torque about the shaft axis. Their cumulative effect makes the internal torque resultant vary continuously along C-D rather than remain constant between isolated point loads.</p>",
        "section": "context"
      },
      {
        "id": "q3",
        "title": "Supports and Rotational Boundary Conditions",
        "type": "boundary conditions",
        "difficulty": "introductory",
        "tags": [
          "journal bearings",
          "fixed section",
          "reaction torque"
        ],
        "learningObjectives": [
          "Distinguish radial support from rotational restraint."
        ],
        "selected": true,
        "student": "<p>Identify supports A, B, and C and state what each prevents.</p>",
        "instructor": "<p>Journal bearings A and B prevent radial translation but allow shaft-axis rotation, so they provide no torsional reaction in the ideal model. Section C is fixed against rotation, so &theta;(C) = 0 and a reaction torque develops there.</p>",
        "section": "context"
      },
      {
        "id": "q4",
        "title": "Torsional Load Path",
        "type": "load path",
        "difficulty": "introductory",
        "tags": [
          "steam forces",
          "blade hubs",
          "fixed section"
        ],
        "learningObjectives": [
          "Trace torque transfer from the blades to the restraint."
        ],
        "selected": true,
        "student": "<p>Trace the torsional load path through the turbine rotor.</p>",
        "instructor": "<p>Steam forces act on the blades; blade hubs transfer torque into the rotor; the shaft carries cumulative internal torque toward restrained section C; and the fixed connection supplies the balancing reaction torque.</p>",
        "section": "context"
      },
      {
        "id": "q5",
        "title": "Expected Critical Location",
        "type": "mechanics reasoning",
        "difficulty": "introductory",
        "tags": [
          "maximum torque",
          "section D",
          "outer surface"
        ],
        "learningObjectives": [
          "Predict the location of maximum torsional stress."
        ],
        "selected": true,
        "student": "<p>Before calculating, predict where the maximum torsional shear stress will occur and explain why.</p>",
        "instructor": "<p>Maximum stress occurs where the magnitude of internal torque is largest and at the shaft's outer surface. For the stated linear internal-torque model, the critical cross section is D.</p>",
        "section": "context"
      },
      {
        "id": "q6",
        "title": "Governing Mechanical Responses",
        "type": "scope identification",
        "difficulty": "introductory",
        "tags": [
          "strength",
          "stiffness",
          "model scope"
        ],
        "learningObjectives": [
          "Identify the responses included in the base problem."
        ],
        "selected": true,
        "student": "<p>Identify the mechanical responses central to this problem and list important responses outside the base model.</p>",
        "instructor": "<p>The base responses are torsional strength, represented by maximum shear stress, and torsional stiffness, represented by relative angle of twist. Bearing stresses, blade stresses, bending, fatigue, vibration, and thermal behavior are outside the base model.</p>",
        "section": "context"
      },
      {
        "id": "q7",
        "title": "Key Geometry and Material Parameters",
        "type": "parameter identification",
        "difficulty": "introductory",
        "tags": [
          "diameter scaling",
          "loaded length",
          "shear modulus"
        ],
        "learningObjectives": [
          "Explain how diameter, length, and modulus affect torsional response."
        ],
        "selected": true,
        "student": "<p>Identify the key geometric and material parameters and describe how they affect stress or twist.</p>",
        "instructor": "<p>Shaft diameter <em>d</em> controls <em>J</em> proportional to <em>d</em><sup>4</sup>, twist proportional to 1/<em>d</em><sup>4</sup>, and stress proportional to 1/<em>d</em><sup>3</sup>. Loaded length <em>L</em> affects twist linearly. Shear modulus <em>G</em> affects twist but not elastic stress for prescribed torque.</p>",
        "section": "context"
      },
      {
        "id": "q8",
        "title": "Student-Generated Turbine-Shaft Idealization",
        "type": "free-body diagram",
        "difficulty": "intermediate",
        "tags": [
          "idealization",
          "coordinate x",
          "torque diagram"
        ],
        "learningObjectives": [
          "Create a varying-torque shaft model before viewing the reference figure."
        ],
        "selected": true,
        "student": "<p>Before using the reference figure, create a simplified shaft model showing A, B, fixed section C, section D, coordinate <em>x</em> measured from C, and the linearly varying internal torque <em>T</em>(<em>x</em>). Include a circular cross section with diameter <em>d</em>.</p>",
        "instructor": "<p>A valid model shows a prismatic circular shaft with &theta;(C) = 0, ideal torque-free journal bearings at A and B, and <em>T</em>(<em>x</em>) = <em>T</em><sub>D</sub><em>x</em>/<em>L</em> for 0 &le; <em>x</em> &le; <em>L</em>.</p>",
        "gradingNotes": "<p>Students should attempt the model before seeing the instructor idealization.</p>",
        "section": "transition"
      },
      {
        "id": "q9",
        "title": "Modeling Assumptions",
        "type": "assumptions",
        "difficulty": "intermediate",
        "tags": [
          "Saint-Venant torsion",
          "linear elasticity",
          "small twist"
        ],
        "learningObjectives": [
          "State assumptions supporting the turbine-shaft model."
        ],
        "selected": true,
        "student": "<p>State the assumptions required for the base mechanics model.</p>",
        "instructor": "<p>Assume a uniform solid circular shaft, homogeneous isotropic linear-elastic material, Saint-Venant torsion, small twist, constant <em>G</em> and <em>d</em>, ideal bearings that transmit no shaft-axis torque, and a perfectly fixed section C. Neglect blade size, local stress concentrations, bending, dynamics, thermal effects, and fatigue.</p>",
        "section": "transition"
      },
      {
        "id": "q10",
        "title": "Mechanics Analysis Plan",
        "type": "analysis planning",
        "difficulty": "intermediate",
        "tags": [
          "internal torque function",
          "integration",
          "stress"
        ],
        "learningObjectives": [
          "Plan a complete varying-torque analysis."
        ],
        "selected": true,
        "student": "<p>Outline the calculation sequence before substituting numbers.</p>",
        "instructor": "<p>Define <em>T</em>(<em>x</em>); determine the reaction torque at C; construct the internal-torque diagram; compute <em>J</em>; integrate <em>T</em>(<em>x</em>)/(<em>JG</em>) for twist; evaluate <em>Tc</em>/<em>J</em> for stress; and interpret the governing section and parameter sensitivity.</p>",
        "section": "transition"
      },
      {
        "id": "q11",
        "title": "Torsional Boundary Conditions",
        "type": "mechanics setup",
        "difficulty": "introductory",
        "tags": [
          "theta at C",
          "journal bearings",
          "rotation"
        ],
        "learningObjectives": [
          "State the boundary conditions used in the torsion solution."
        ],
        "selected": true,
        "student": "<p>State the torsional boundary conditions at A, B, and C.</p>",
        "instructor": "<p>At fixed section C, &theta;(C) = 0. Ideal journal bearings A and B permit rotation and supply no reaction torque about the shaft axis. Their radial reactions are outside the torsion-only model.</p>",
        "section": "analysis"
      },
      {
        "id": "q12",
        "title": "Fixed-Section Reaction Torque",
        "type": "equilibrium",
        "difficulty": "introductory",
        "tags": [
          "constraint reaction",
          "overall torque equilibrium",
          "section C"
        ],
        "learningObjectives": [
          "Determine the balancing torsional reaction."
        ],
        "selected": true,
        "student": "<p>Identify the unknown torsional reaction at C and determine its magnitude and sense.</p>",
        "instructor": "<p>The fixed section supplies a reaction torque of magnitude <strong>{{turbine_reaction_lbft}} lb&middot;ft</strong>, opposite the sense of the blade-region torque. Bearings A and B supply no shaft-axis reaction torque.</p>",
        "section": "analysis"
      },
      {
        "id": "q13",
        "title": "Internal Torque Function and Diagram",
        "type": "internal loading",
        "difficulty": "intermediate",
        "tags": [
          "linear function",
          "triangular diagram",
          "model interpretation"
        ],
        "learningObjectives": [
          "Define and graph a linearly varying internal torque resultant."
        ],
        "selected": true,
        "student": "<p>Define the internal torque along C-D and construct its diagram. Clearly distinguish an internal torque resultant from a torque intensity per unit length.</p>",
        "instructor": "<p>With <em>x</em> measured from C, <em>T</em>(<em>x</em>) = <em>T</em><sub>D</sub><em>x</em>/<em>L</em> for 0 &le; <em>x</em> &le; <em>L</em>. The diagram is triangular, increasing from zero at C to <em>T</em><sub>D</sub> at D. The area-average internal torque is <strong>{{turbine_average_torque_lbft}} lb&middot;ft</strong>.</p><p>Here <em>T</em>(<em>x</em>) has torque units; it is not a distributed intensity <em>w</em>(<em>x</em>) with torque-per-length units.</p>",
        "commonMistakes": "<p>Do not integrate the stated <em>T</em>(<em>x</em>) once more as though it were a torque intensity.</p>",
        "section": "analysis"
      },
      {
        "id": "q14",
        "title": "Polar Moment of Inertia",
        "type": "section-property calculation",
        "difficulty": "introductory",
        "tags": [
          "solid circular shaft",
          "polar moment",
          "diameter"
        ],
        "learningObjectives": [
          "Calculate the polar moment for a solid circular shaft."
        ],
        "selected": true,
        "student": "<p>Determine the polar moment of inertia <em>J</em> for the assigned solid shaft.</p>",
        "instructor": "<p><em>J</em> = &pi;<em>d</em><sup>4</sup>/32 = <strong>{{turbine_J_in4}} in<sup>4</sup></strong>.</p>",
        "section": "analysis"
      },
      {
        "id": "q15",
        "title": "Relative Angle of Twist at D",
        "type": "torsional deformation",
        "difficulty": "intermediate",
        "tags": [
          "twist integration",
          "linear torque",
          "unit conversion"
        ],
        "learningObjectives": [
          "Integrate a varying internal torque to determine twist."
        ],
        "selected": true,
        "student": "<p>Determine the angle of twist at D relative to C. Show the integral and use consistent inch-pound units.</p>",
        "instructor": "<p>&phi;<sub>D/C</sub> = &int;<sub>0</sub><sup><em>L</em></sup> <em>T</em>(<em>x</em>)/(<em>JG</em>) d<em>x</em> = <em>T</em><sub>D</sub><em>L</em>/(2<em>JG</em>).</p><p>Using <em>L</em> = <strong>{{turbine_L_in}} in</strong> and <em>T</em><sub>D</sub> = <strong>{{turbine_T_D_lbin}} lb&middot;in</strong>, &phi;<sub>D/C</sub> = <strong>{{turbine_phi_rad}} rad</strong> = <strong>{{turbine_phi_deg}}&deg;</strong>.</p>",
        "section": "analysis"
      },
      {
        "id": "q16",
        "title": "Absolute Maximum Torsional Shear Stress",
        "type": "torsional stress calculation",
        "difficulty": "intermediate",
        "tags": [
          "maximum torque",
          "outer surface",
          "section D"
        ],
        "learningObjectives": [
          "Calculate maximum shaft stress and locate it physically."
        ],
        "selected": true,
        "student": "<p>Determine the absolute maximum torsional shear stress and identify its location.</p>",
        "instructor": "<p>The largest |<em>T</em>| occurs at D. Therefore &tau;<sub>max</sub> = <em>T</em><sub>D</sub>(<em>d</em>/2)/<em>J</em> = <strong>{{turbine_tau_psi}} psi</strong> = <strong>{{turbine_tau_ksi}} ksi</strong>. It occurs at the outer surface of section D.</p>",
        "section": "analysis"
      },
      {
        "id": "q17",
        "title": "Torsional Sensitivity",
        "type": "qualitative reasoning",
        "difficulty": "intermediate",
        "tags": [
          "diameter scaling",
          "shear modulus",
          "loaded length"
        ],
        "learningObjectives": [
          "Compare how design variables affect stress and twist."
        ],
        "selected": true,
        "student": "<p>Explain which design variable most effectively reduces both twist and stress. Compare the effects of increasing diameter, increasing shear modulus, and reducing loaded length.</p>",
        "instructor": "<p>Increasing diameter is most effective because <em>J</em> scales with <em>d</em><sup>4</sup>, twist scales with 1/<em>d</em><sup>4</sup>, and maximum stress scales with 1/<em>d</em><sup>3</sup>. Increasing <em>G</em> reduces twist but not stress for prescribed torque. Reducing <em>L</em> reduces twist but not maximum stress at D.</p>",
        "section": "analysis"
      },
      {
        "id": "q18",
        "title": "Engineering Assessment",
        "type": "engineering judgment",
        "difficulty": "advanced",
        "tags": [
          "recommendation",
          "limitations",
          "turbine rotor"
        ],
        "learningObjectives": [
          "Make a bounded recommendation from the torsion results."
        ],
        "selected": true,
        "student": "<p>Provide a limited engineering recommendation based on the torsion model and identify the checks needed before final turbine-shaft approval.</p>",
        "instructor": "<p>{{turbine_recommendation}}</p><p>Final design must verify the intended loading interpretation and include bending, combined stress, fatigue, stress concentrations, blade and rotor dynamics, vibration, thermal gradients, bearings, and project-specific stress and twist limits.</p>",
        "gradingNotes": "<p>Students should not claim full rotor safety without allowable limits and the omitted coupled analyses.</p>",
        "section": "analysis"
      }
    ],
    "variants": [
      {
        "id": "section-a",
        "title": "Homework Version A - baseline turbine rotor",
        "description": "Default sequence for a linear internal-torque function, reaction torque, torque diagram, twist integration, stress, sensitivity, and engineering assessment.",
        "selectedQuestions": [
          "q1",
          "q2",
          "q3",
          "q4",
          "q5",
          "q6",
          "q7",
          "q8",
          "q9",
          "q10",
          "q11",
          "q12",
          "q13",
          "q14",
          "q15",
          "q16",
          "q17",
          "q18"
        ],
        "variables": {
          "turbine_d": 6,
          "turbine_G": 11200000,
          "turbine_L": 10,
          "turbine_a": 2,
          "turbine_b": 2,
          "turbine_T_D": 2000
        }
      }
    ]
  },
  {
    "id": "MOS-TAPER-020",
    "slug": "variable-radius-tapered-shaft",
    "title": "Torsional Stiffness of a Variable-Radius Aluminum Drive Shaft",
    "studentDocumentTitle": "Student Homework Questions",
    "instructorDocumentTitle": "Instructor Answers",
    "summary": "A nonprismatic-shaft torsion problem integrating a variable polar moment, numerical angle-of-twist integration, maximum shear stress, compliance localization, and stiffness assessment.",
    "textbookChapters": [
      "Torsion of circular shafts",
      "Nonprismatic shaft deformation",
      "Polar moment of inertia",
      "Angle of twist"
    ],
    "derivedPlaceholders": [
      "taper_reaction_Nm",
      "taper_G_Pa",
      "taper_r_A_m",
      "taper_r_L_m",
      "taper_J_A_m4",
      "taper_integral_m_neg3",
      "taper_phi_rad",
      "taper_phi_deg",
      "taper_twist_utilization",
      "taper_twist_assessment",
      "taper_tau_max_MPa",
      "taper_first_quarter_pct",
      "taper_recommendation"
    ],
    "image": "problems/variable-radius-tapered-shaft/assets/tapered-shaft-industry-context.png",
    "idealizedImage": "problems/variable-radius-tapered-shaft/assets/tapered-shaft-instructor-idealization.png",
    "idealizedImageAlt": "Instructor reference idealization of a solid tapered shaft with applied torque at end A, fixed support at the large end, coordinate x, length L, and variable radius r of x.",
    "source": "problems/variable-radius-tapered-shaft/index.html",
    "problemStatement": "<p>A mechanical engineering team is evaluating a lightweight 2014-T6 aluminum torque-transmission shaft for a precision industrial drive or test system. The solid shaft radius increases continuously from the torque-input end A toward a rigid mounting interface.</p><p>To keep the radius law dimensionally consistent, define &xi; = <em>x</em>/(1 m) and use <em>r</em>(<em>x</em>) = <em>r</em><sub>0</sub>[1 + &xi;<sup>3/2</sup> + &xi;<sup>5/2</sup>]. The shaft carries constant internal torque but has a position-dependent polar moment.</p>",
    "engineeringGoal": "<p>Determine the angular rotation of end A relative to the fixed interface, locate the maximum torsional shear stress, quantify where torsional compliance accumulates, and assess the shaft against the assigned twist limit.</p>",
    "variables": [
      {
        "key": "taper_T",
        "symbol": "T",
        "label": "Applied torque at end A",
        "value": 450,
        "unit": "N*m",
        "min": 0.1,
        "max": 10000000,
        "step": 10
      },
      {
        "key": "taper_L",
        "symbol": "L",
        "label": "Shaft length",
        "value": 4,
        "unit": "m",
        "min": 0.01,
        "max": 100,
        "step": 0.1
      },
      {
        "key": "taper_r0",
        "symbol": "r_0",
        "label": "Minimum radius at end A",
        "value": 0.02,
        "unit": "m",
        "min": 0.001,
        "max": 10,
        "step": 0.001
      },
      {
        "key": "taper_G",
        "symbol": "G",
        "label": "Shear modulus of 2014-T6 aluminum",
        "value": 28,
        "unit": "GPa",
        "min": 0.1,
        "max": 1000,
        "step": 1
      },
      {
        "key": "taper_phi_allow",
        "symbol": "phi_allow",
        "label": "Allowable angle of twist",
        "value": 1,
        "unit": "deg",
        "min": 0.01,
        "max": 360,
        "step": 0.1
      }
    ],
    "questions": [
      {
        "id": "q1",
        "title": "Primary Function of the Tapered Shaft",
        "type": "context interpretation",
        "difficulty": "introductory",
        "tags": [
          "shaft function",
          "torque transmission",
          "precision drive"
        ],
        "learningObjectives": [
          "Identify the shaft's role in the drive or test system."
        ],
        "selected": true,
        "student": "<p>State the primary mechanical function of the tapered shaft.</p>",
        "instructor": "<p>The shaft transmits torque between the input coupling and the fixed or driven machine interface while limiting rotational compliance.</p>",
        "section": "context"
      },
      {
        "id": "q2",
        "title": "External Torsional Loading",
        "type": "load identification",
        "difficulty": "introductory",
        "tags": [
          "applied torque",
          "input coupling",
          "end A"
        ],
        "learningObjectives": [
          "Identify the load entering the shaft."
        ],
        "selected": true,
        "student": "<p>Identify the externally applied mechanical load and where it enters the system.</p>",
        "instructor": "<p>A shaft-axis torque <em>T</em> is applied at end A through the input coupling.</p>",
        "section": "context"
      },
      {
        "id": "q3",
        "title": "Fixed-End Boundary Condition",
        "type": "boundary conditions",
        "difficulty": "introductory",
        "tags": [
          "fixed support",
          "zero rotation",
          "reaction torque"
        ],
        "learningObjectives": [
          "State the rotational restraint at the large end."
        ],
        "selected": true,
        "student": "<p>Identify the torsional boundary condition at the large end and explain its mechanical consequence.</p>",
        "instructor": "<p>The large end is fixed against rotation, so its angular displacement is zero and the interface develops a reaction torque.</p>",
        "section": "context"
      },
      {
        "id": "q4",
        "title": "Torque Load Path",
        "type": "load path",
        "difficulty": "introductory",
        "tags": [
          "coupling",
          "variable-radius shaft",
          "machine frame"
        ],
        "learningObjectives": [
          "Trace torque transfer from input to support."
        ],
        "selected": true,
        "student": "<p>Trace the torque load path from the input coupling to the support.</p>",
        "instructor": "<p>The path is input coupling, small-radius end A, continuously varying shaft, fixed interface, and machine frame.</p>",
        "section": "context"
      },
      {
        "id": "q5",
        "title": "Expected Compliance-Dominating Region",
        "type": "mechanics reasoning",
        "difficulty": "introductory",
        "tags": [
          "small radius",
          "local compliance",
          "r to fourth power"
        ],
        "learningObjectives": [
          "Predict where most shaft twist will accumulate."
        ],
        "selected": true,
        "student": "<p>Before calculating, identify the shaft region expected to contribute most strongly to total twist and explain why.</p>",
        "instructor": "<p>The small-radius region near A should dominate because <em>J</em> is proportional to <em>r</em><sup>4</sup> and local torsional compliance is proportional to 1/<em>r</em><sup>4</sup>.</p>",
        "section": "context"
      },
      {
        "id": "q6",
        "title": "Parameters Governing Twist",
        "type": "parameter identification",
        "difficulty": "introductory",
        "tags": [
          "torque",
          "length",
          "radius function",
          "shear modulus"
        ],
        "learningObjectives": [
          "Identify inputs controlling the angle of twist."
        ],
        "selected": true,
        "student": "<p>Identify the geometric, loading, and material parameters governing the angle of twist.</p>",
        "instructor": "<p>The governing parameters are applied torque <em>T</em>, shaft length <em>L</em>, radius function <em>r</em>(<em>x</em>), and shear modulus <em>G</em>.</p>",
        "section": "context"
      },
      {
        "id": "q7",
        "title": "Why Integration Is Required",
        "type": "conceptual reasoning",
        "difficulty": "intermediate",
        "tags": [
          "nonprismatic shaft",
          "variable J",
          "differential twist"
        ],
        "learningObjectives": [
          "Explain why a constant-section twist formula is insufficient."
        ],
        "selected": true,
        "student": "<p>Explain why the constant-section equation &phi; = <em>TL</em>/(<em>JG</em>) cannot be used directly.</p>",
        "instructor": "<p>The radius and polar moment vary with position, so local differential twist must be integrated along the shaft. No single constant <em>J</em> represents the actual geometry.</p>",
        "section": "context"
      },
      {
        "id": "q8",
        "title": "Student-Generated Tapered-Shaft Idealization",
        "type": "free-body diagram",
        "difficulty": "intermediate",
        "tags": [
          "idealization",
          "coordinate x",
          "radius profile"
        ],
        "learningObjectives": [
          "Create a variable-radius torsion model before viewing the reference figure."
        ],
        "selected": true,
        "student": "<p>Before using the reference figure, draw a solid circular shaft of length <em>L</em> with coordinate <em>x</em> measured from end A, applied torque <em>T</em> at A, and zero rotation at the opposite end. Label <em>r</em>(<em>x</em>), <em>J</em>(<em>x</em>), and the internal torque.</p>",
        "instructor": "<p>A valid model shows a solid nonprismatic circular shaft carrying constant internal torque, with <em>x</em> measured from A and zero rotation at the fixed large end.</p>",
        "gradingNotes": "<p>Students should attempt the idealization before seeing the instructor reference figure.</p>",
        "section": "transition"
      },
      {
        "id": "q9",
        "title": "Modeling Assumptions",
        "type": "assumptions",
        "difficulty": "intermediate",
        "tags": [
          "Saint-Venant torsion",
          "linear elasticity",
          "small rotation"
        ],
        "learningObjectives": [
          "State assumptions supporting the nonprismatic torsion model."
        ],
        "selected": true,
        "student": "<p>State the assumptions needed for the base torsion model.</p>",
        "instructor": "<p>Assume Saint-Venant torsion of a solid circular shaft, homogeneous isotropic linear-elastic material, constant <em>G</em>, small rotation, and torque applied about the shaft axis. Neglect bending, axial loading, local stress concentrations, attachment flexibility, and warping effects.</p>",
        "section": "transition"
      },
      {
        "id": "q10",
        "title": "Mechanics Analysis Plan",
        "type": "analysis planning",
        "difficulty": "intermediate",
        "tags": [
          "reaction torque",
          "variable polar moment",
          "integration"
        ],
        "learningObjectives": [
          "Plan a complete nonprismatic-shaft analysis."
        ],
        "selected": true,
        "student": "<p>Write the calculation sequence before substituting values.</p>",
        "instructor": "<p>Determine the reaction and internal torque; define the nondimensional coordinate and radius law; write <em>J</em>(<em>x</em>) = &pi;<em>r</em>(<em>x</em>)<sup>4</sup>/2; use d&phi; = <em>T</em> d<em>x</em>/[<em>GJ</em>(<em>x</em>)]; integrate from 0 to <em>L</em>; calculate stress; and interpret the result.</p>",
        "section": "transition"
      },
      {
        "id": "q11",
        "title": "Boundary Condition and Reaction Torque",
        "type": "equilibrium",
        "difficulty": "introductory",
        "tags": [
          "fixed end",
          "reaction torque",
          "static equilibrium"
        ],
        "learningObjectives": [
          "Determine the fixed-end torsional reaction."
        ],
        "selected": true,
        "student": "<p>State the fixed-end rotational boundary condition and determine the reaction torque.</p>",
        "instructor": "<p>The fixed-end rotation is zero. Static equilibrium gives a reaction torque of magnitude <strong>{{taper_reaction_Nm}} N&middot;m</strong>, opposite the applied torque.</p>",
        "section": "analysis"
      },
      {
        "id": "q12",
        "title": "Internal Torque Distribution",
        "type": "internal loading",
        "difficulty": "introductory",
        "tags": [
          "constant internal torque",
          "shaft cut",
          "no intermediate loads"
        ],
        "learningObjectives": [
          "Determine internal torque throughout the shaft."
        ],
        "selected": true,
        "student": "<p>Determine the internal torque <em>T</em><sub>int</sub>(<em>x</em>) for 0 &le; <em>x</em> &le; <em>L</em>.</p>",
        "instructor": "<p>Because no additional torques act along the shaft, <em>T</em><sub>int</sub>(<em>x</em>) = <em>T</em> throughout 0 &le; <em>x</em> &le; <em>L</em>.</p>",
        "section": "analysis"
      },
      {
        "id": "q13",
        "title": "Radius Function and Variable Polar Moment",
        "type": "section-property derivation",
        "difficulty": "intermediate",
        "tags": [
          "nondimensional coordinate",
          "radius law",
          "polar moment"
        ],
        "learningObjectives": [
          "Write a dimensionally consistent radius law and variable polar moment."
        ],
        "selected": true,
        "student": "<p>Define a dimensionally consistent radius function and write the polar moment of inertia as a function of position.</p>",
        "instructor": "<p>Define &xi; = <em>x</em>/(1 m). Then <em>r</em>(<em>x</em>) = <em>r</em><sub>0</sub>[1 + &xi;<sup>3/2</sup> + &xi;<sup>5/2</sup>] and <em>J</em>(<em>x</em>) = &pi;<em>r</em>(<em>x</em>)<sup>4</sup>/2.</p><p>For the assigned geometry, <em>r</em>(0) = <strong>{{taper_r_A_m}} m</strong>, <em>r</em>(<em>L</em>) = <strong>{{taper_r_L_m}} m</strong>, and <em>J</em>(0) = <strong>{{taper_J_A_m4}} m<sup>4</sup></strong>.</p>",
        "section": "analysis"
      },
      {
        "id": "q14",
        "title": "Differential Twist Relation",
        "type": "symbolic derivation",
        "difficulty": "intermediate",
        "tags": [
          "differential rotation",
          "variable J",
          "torsional compliance"
        ],
        "learningObjectives": [
          "Derive the local twist relation for the tapered shaft."
        ],
        "selected": true,
        "student": "<p>Write the differential relation for shaft rotation in terms of <em>T</em>, <em>G</em>, and <em>r</em>(<em>x</em>).</p>",
        "instructor": "<p>d&phi; = <em>T</em> d<em>x</em>/[<em>GJ</em>(<em>x</em>)] = 2<em>T</em> d<em>x</em>/[&pi;<em>G r</em>(<em>x</em>)<sup>4</sup>].</p>",
        "section": "analysis"
      },
      {
        "id": "q15",
        "title": "Angle-of-Twist Integral",
        "type": "integral formulation",
        "difficulty": "intermediate",
        "tags": [
          "definite integral",
          "nonprismatic shaft",
          "radius function"
        ],
        "learningObjectives": [
          "Formulate the total rotation integral."
        ],
        "selected": true,
        "student": "<p>Formulate the definite integral for rotation of end A relative to the fixed end.</p>",
        "instructor": "<p>&phi;<sub>A</sub> = &int;<sub>0</sub><sup><em>L</em></sup> 2<em>T</em>/[&pi;<em>G r</em>(<em>x</em>)<sup>4</sup>] d<em>x</em>. The evaluated geometric integral &int;<sub>0</sub><sup><em>L</em></sup> d<em>x</em>/<em>r</em>(<em>x</em>)<sup>4</sup> is <strong>{{taper_integral_m_neg3}} m<sup>-3</sup></strong>.</p>",
        "section": "analysis"
      },
      {
        "id": "q16",
        "title": "Numerical Angle of Twist",
        "type": "numerical integration",
        "difficulty": "advanced",
        "tags": [
          "Simpson integration",
          "radians",
          "degrees"
        ],
        "learningObjectives": [
          "Numerically evaluate the nonprismatic-shaft twist."
        ],
        "selected": true,
        "student": "<p>Evaluate the twist integral numerically and report the angle in radians and degrees.</p>",
        "instructor": "<p>Using <em>G</em> = <strong>{{taper_G_Pa}} Pa</strong>, &phi;<sub>A</sub> = <strong>{{taper_phi_rad}} rad</strong> = <strong>{{taper_phi_deg}}&deg;</strong>.</p>",
        "gradingNotes": "<p>Numerical quadrature, a documented calculator integral, or equivalent computational evaluation is acceptable.</p>",
        "section": "analysis"
      },
      {
        "id": "q17",
        "title": "Maximum Torsional Shear Stress",
        "type": "torsional stress calculation",
        "difficulty": "intermediate",
        "tags": [
          "minimum radius",
          "surface stress",
          "end A"
        ],
        "learningObjectives": [
          "Calculate and locate the maximum stress in a tapered shaft."
        ],
        "selected": true,
        "student": "<p>Determine the maximum torsional shear stress and identify its location.</p>",
        "instructor": "<p>&tau;<sub>max</sub>(<em>x</em>) = 2<em>T</em>/[&pi;<em>r</em>(<em>x</em>)<sup>3</sup>]. Because the radius is smallest at <em>x</em> = 0, the maximum occurs at the outer surface of end A: <strong>{{taper_tau_max_MPa}} MPa</strong>.</p>",
        "section": "analysis"
      },
      {
        "id": "q18",
        "title": "Compliance Localization and Sensitivity",
        "type": "qualitative reasoning",
        "difficulty": "intermediate",
        "tags": [
          "first-quarter twist",
          "radius sensitivity",
          "design modification"
        ],
        "learningObjectives": [
          "Explain why the small-end region controls twist and stress."
        ],
        "selected": true,
        "student": "<p>Explain why a modest increase in minimum radius can strongly reduce both stress and twist. Quantify how much of the assigned total twist accumulates in the first quarter of the shaft.</p>",
        "instructor": "<p>Stress varies as 1/<em>r</em><sup>3</sup> and the twist integrand as 1/<em>r</em><sup>4</sup>, so the minimum-radius region has disproportionate influence. For the assigned profile, approximately <strong>{{taper_first_quarter_pct}}%</strong> of the total twist accumulates over 0 &le; <em>x</em> &le; <em>L</em>/4.</p>",
        "section": "analysis"
      },
      {
        "id": "q19",
        "title": "Stiffness Assessment and Recommendation",
        "type": "engineering judgment",
        "difficulty": "advanced",
        "tags": [
          "allowable twist",
          "utilization",
          "recommendation"
        ],
        "learningObjectives": [
          "Assess torsional stiffness and recommend a modification."
        ],
        "selected": true,
        "student": "<p>Compare the calculated rotation with the assigned allowable twist and make a limited mechanics-based recommendation.</p>",
        "instructor": "<p>The twist utilization is <strong>{{taper_twist_utilization}}</strong>. {{taper_twist_assessment}}</p><p>{{taper_recommendation}}</p><p>Detailed design must also consider strength allowables, bending, attachment flexibility, stress concentrations, fatigue, dynamics, manufacturing limits, and applicable standards.</p>",
        "section": "analysis"
      }
    ],
    "variants": [
      {
        "id": "section-a",
        "title": "Homework Version A - baseline tapered aluminum shaft",
        "description": "Default sequence for variable section properties, twist integration, stress, compliance localization, sensitivity, and stiffness assessment.",
        "selectedQuestions": [
          "q1",
          "q2",
          "q3",
          "q4",
          "q5",
          "q6",
          "q7",
          "q8",
          "q9",
          "q10",
          "q11",
          "q12",
          "q13",
          "q14",
          "q15",
          "q16",
          "q17",
          "q18",
          "q19"
        ],
        "variables": {
          "taper_T": 450,
          "taper_L": 4,
          "taper_r0": 0.02,
          "taper_G": 28,
          "taper_phi_allow": 1
        }
      }
    ]
  }
]
;