window.PROBLEM_CATALOG = [
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
        "id": "q1",
        "title": "Load Path and Free-Body Diagram",
        "selected": true,
        "tags": [
          "load path",
          "fbd",
          "connections"
        ],
        "type": "fbd/modeling",
        "difficulty": "introductory",
        "learningObjectives": [
          "Trace load path through a bracket",
          "Draw a complete free-body diagram"
        ],
        "gradingNotes": "<p>Look for a clear connection between eccentric loading and the anchor reaction couple.</p>",
        "student": "<p>The bracket carries a suspended service load <strong>P = {{P}} {{P_unit}}</strong> at a distance <strong>L = {{L}} {{L_unit}}</strong> from the wall plate. Draw a free-body diagram of the arm and mounting plate, and describe the load path from the suspended load into the wall.</p>",
        "instructor": "<p>Representative answers should show the downward load at the arm end, wall reactions at the plate or anchor group, shear transfer through the plate, and a resisting couple created by the anchor pair. The eccentric moment is approximately M = PL for the idealized side-view model.</p>"
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
        "instructor": "<p>A first estimate treats the eccentric moment as M = PL and the anchor tension-compression couple as T s. Thus T is approximately PL/s, before adding direct shear, prying, preload, wall flexibility, eccentricity, or code-based anchor design factors.</p>"
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
        "instructor": "<p>Good answers should identify average bolt shear, bearing stress in the plate, net-section tension, tear-out near plate edges, combined tension-shear anchor demand, and the difference between nominal member checks and certified anchor capacity.</p>"
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
        "instructor": "<p>The maximum moment occurs at the wall connection and is approximately M_max = PL for the simplified cantilever model. Bending stress requires section modulus or second moment of area, while tip deflection requires E, I, support fixity assumptions, and connection flexibility estimates.</p>"
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
        "instructor": "<p>Most preliminary recommendations should be conditional. Required information includes wall material and anchor rating, embedment depth, edge distances, weld details, arm cross section, steel grade, fatigue or cycle demand, overload requirements, deflection limits, installation procedure, inspection access, and applicable workplace safety requirements.</p>"
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
          "q1",
          "q2",
          "q3",
          "q5"
        ]
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
        "commonMistakes": "<p>Students may describe the whole machine without identifying the local connection as the load-transfer element.</p>"
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
        "gradingNotes": "<p>The industry image does not show force arrows; students should use the problem statement and idealized model.</p>"
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
        "commonMistakes": "<p>A common error is inventing wall reactions or treating the clevis body as a support bracket instead of a tensile load-transfer connection.</p>"
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
        "gradingNotes": "<p>Missing the pin usually indicates the student has not understood the connection mechanism.</p>"
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
        "instructor": "<p>The left rod and right rod are critical for average axial normal stress. The pin at A is critical for average shear stress. In a detailed design, the yoke arms and inner member holes may also be critical because of bearing, tear-out, net-section tension, stress concentration, pin bending, and fatigue.</p>"
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
        "gradingNotes": "<p>The double-shear interpretation is the key conceptual point.</p>"
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
        "instructor": "<p>The controlling parameters are <strong>d<sub>1</sub> = {{d_1}} {{d_1_unit}}</strong> for A<sub>1</sub> = &pi;d<sub>1</sub><sup>2</sup>/4, <strong>d<sub>2</sub> = {{d_2}} {{d_2_unit}}</strong> for A<sub>2</sub> = &pi;d<sub>2</sub><sup>2</sup>/4, and <strong>d<sub>A</sub> = {{d_A}} {{d_A_unit}}</strong> for A<sub>A</sub> = &pi;d<sub>A</sub><sup>2</sup>/4. Because the pin is in double shear, the total resisting shear area is <strong>{{n_s}}A<sub>A</sub></strong>.</p>"
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
        "image": "assets/clevis-instructor-idealization.png",
        "imageAlt": "Instructor reference idealization for the clevis-pin tensile linkage",
        "student": "<p>Convert the real clevis-pin linkage into a simplified Mechanics of Materials model. Your sketch should show the left rod, yoke/clevis, inner member, pin at A, right rod, external tensile load P, rod diameters d<sub>1</sub> and d<sub>2</sub>, and pin diameter d<sub>A</sub>.</p>",
        "instructor": "<p>A correct idealization shows two axial rod members connected through a clevis and pin. The external loads P act outward at both rod ends. The left and right rods carry axial tension. The pin at A is represented as a connector in double shear with two shear planes.</p>",
        "gradingNotes": "<p>In a student handout, this can be used as an instructor reference or hidden until after students produce their own sketch.</p>"
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
        "instructor": "<p>Reasonable assumptions include static axial loading; circular prismatic rods at the checked sections; concentric load through each rod; average stress is used; the pin is in double shear; the two shear planes share the load equally; friction, bearing stress, stress concentrations, pin bending, thread effects, clearances, wear, and fatigue are neglected.</p>"
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
        "instructor": "<p>Identify the applied tensile load P; compute cross-sectional areas A<sub>1</sub> and A<sub>2</sub> of the rods; compute pin cross-sectional area A<sub>A</sub>; recognize that the pin has {{n_s}} shear planes; calculate &sigma;<sub>1</sub> = P/A<sub>1</sub>, &sigma;<sub>2</sub> = P/A<sub>2</sub>, and &tau;<sub>A</sub> = P/({{n_s}}A<sub>A</sub>); compare the stress magnitudes and identify the largest calculated average stress.</p>"
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
        "instructor": "<p>The connection is subjected to equal and opposite axial tensile loads <strong>P = {{P}} {{P_unit}}</strong> at the two rod ends. The left rod, yoke, pin, inner member, and right rod form a tensile load path. The pin at A is idealized as a connector in double shear.</p>"
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
        "commonMistakes": "<p>Using the full load on each shear plane doubles the correct average pin shear stress.</p>"
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
        "gradingNotes": "<p>Use N and mm units so stress comes out in N/mm<sup>2</sup> = MPa.</p>"
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
        "instructor": "<p>&sigma;<sub>1</sub> = P/A<sub>1</sub> = {{clevis_load_N}} N / {{clevis_area_1_mm2}} mm<sup>2</sup> = <strong>{{clevis_sigma_1_MPa}} MPa</strong>. The stress is tensile.</p>"
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
        "instructor": "<p>&sigma;<sub>2</sub> = P/A<sub>2</sub> = {{clevis_load_N}} N / {{clevis_area_2_mm2}} mm<sup>2</sup> = <strong>{{clevis_sigma_2_MPa}} MPa</strong>. The stress is tensile. Since the right rod diameter is smaller, it has the larger average normal stress.</p>"
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
        "commonMistakes": "<p>If students use single shear, their pin shear stress will be twice the correct double-shear value.</p>"
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
        "instructor": "<p>&tau;<sub>A</sub> = P/({{n_s}}A<sub>A</sub>) = {{clevis_load_N}} N / {{clevis_pin_total_shear_area_mm2}} mm<sup>2</sup> = <strong>{{clevis_tau_A_MPa}} MPa</strong>. Equivalently, each shear plane carries V = {{clevis_shear_plane_load_N}} N, so &tau;<sub>A</sub> = V/A<sub>A</sub>.</p>"
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
        "gradingNotes": "<p>Emphasize that largest stress magnitude does not automatically mean governing failure unless allowable normal and shear strengths are known.</p>"
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
        "gradingNotes": "<p>For the default allowables, the largest raw stress is in the right rod, but the smallest factor of safety is controlled by the relative allowable stresses. This is a useful distinction.</p>"
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
        "instructor": "<p>The total load transferred by the pin is <strong>P = {{P}} {{P_unit}}</strong>. In the simplified model, this load is shared by <strong>{{n_s}}</strong> shear planes, so each plane carries <strong>{{clevis_shear_plane_load_N}} N</strong>. A detailed design could also require checks for bearing stress between the pin and holes, net-section tension of the yoke arms or inner member, tear-out, pin bending, contact pressure, wear, fatigue, and manufacturing tolerances.</p>"
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
        "gradingNotes": "<p>A good response does not overclaim safety from average stress alone. It states what has been checked and what still needs verification.</p>"
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
        "instructor": "<p>The system transfers a compressive load from a hydraulic press ram into a flat metal plate and then into the support blocks and press table. The plate must resist local contact/bearing stress under the ram and possible punching shear through its thickness.</p><p>Students should connect the physical setup to load transfer, not describe the entire press machine in broad terms.</p>"
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
        "instructor": "<p>The external load <em>P</em> is applied vertically downward through the cylindrical ram onto the top surface of the flat plate.</p><p>The industry image has no labels; students should use the problem statement and idealized diagram to identify the load.</p>"
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
        "instructor": "<p>The plate is supported from below by two support blocks on either side of the opening. In the simplified model, the supports provide upward reaction forces to the plate while the central region between the supports is unsupported.</p><p>This is not a fixed-end beam problem for the base analysis; the focus is average bearing and punching shear.</p>"
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
        "instructor": "<p>One acceptable load path is: hydraulic ram &rarr; bearing contact region on top of the plate &rarr; plate material around the loaded region &rarr; punching shear sections AC and BD &rarr; support blocks &rarr; press table/fixture base.</p><p>The key point is that the load does not vanish at the plate; it must transfer through contact and shear regions into the supports.</p>"
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
        "instructor": "<p>The flat plate is the critical component. The important locations are the contact area directly under the ram and the potential punching shear sections AC and BD through the plate thickness.</p><p>Students may mention support blocks, but the base problem provides geometry for the plate stress checks only.</p>"
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
        "instructor": "<p>At the top surface under the ram, the relevant response is average bearing/compressive contact stress. Along sections AC and BD, the relevant response is average punching shear stress through the plate thickness.</p><p>Bending, contact nonlinearity, local yielding, and plastic deformation are not included in the simplified calculation.</p>"
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
        "instructor": "<p>The relevant parameters are applied load <em>P</em>, ram diameter <em>d</em>, plate thickness <em>t</em>, support opening distance <em>s</em>, and overall plate/support width <em>b</em>. For the simplified calculations here, bearing stress is controlled by the contact area under the ram, and punching shear is controlled by the shear area through sections AC and BD.</p><p>Students should connect area definitions to stress definitions rather than simply listing dimensions.</p>"
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
        "image": "assets/press-instructor-idealization.png",
        "imageAlt": "Instructor idealization showing a press ram, plate, support blocks, bearing stress under the ram, and punching shear sections AC and BD.",
        "student": "<p>Convert the real hydraulic press fixture into a simplified Mechanics of Materials model. Your sketch should show the cylindrical ram, flat plate, support blocks, applied load <em>P</em>, plate thickness <em>t</em>, ram diameter <em>d</em>, support opening <em>s</em>, total plate/support width <em>b</em>, and the potential punching shear sections AC and BD.</p><p>Student model placeholder: insert or draw the simplified model and load-transfer/stress-surface diagram here.</p>",
        "instructor": "<p>A correct idealization shows a vertical load <em>P</em> applied through the ram onto the plate, bearing stress distributed over the ram contact area, and two vertical punching shear sections AC and BD through the plate thickness at the loaded region.</p><p>For the student packet, provide a blank sketch space first. The instructor reference diagram can be shown after students attempt their own model if desired.</p>"
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
        "instructor": "<p>Assumptions may include static vertical load; ram is rigid relative to the plate; plate is checked using average stress; bearing stress is uniformly distributed over the idealized contact footprint; punching shear is uniformly distributed over sections AC and BD; support blocks are rigid; and stress concentrations, plate bending, plasticity, contact nonlinearity, and friction are neglected.</p><p>Expected answers do not need every assumption but should include the average-stress idealization.</p>"
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
        "instructor": "<p>The analysis sequence is: identify the load <em>P</em>; identify the contact/bearing area under the ram; identify the punching shear area along sections AC and BD; calculate &tau;<sub>p</sub> = <em>P</em>/<em>A</em><sub>p</sub> for punching shear; calculate &sigma;<sub>b</sub> = <em>P</em>/<em>A</em><sub>b</sub> for bearing stress; compare the stress magnitudes; and state what material allowables would be needed for a design decision.</p><p>This helps students organize the calculation before substituting values.</p>"
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
        "instructor": "<p>The cylindrical ram applies a downward compressive load <em>P</em> to the plate. The plate is supported below by two rigid support blocks on either side of the opening. The model focuses on local bearing under the ram and punching shear through sections AC and BD.</p><p>This replaces a full support-reaction analysis because the base learning goal is average stress, not beam bending.</p>"
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
        "instructor": "<p>Bearing stress is evaluated over the idealized contact footprint under the ram. Punching shear stress is evaluated through the plate thickness along sections AC and BD.</p><p>Students should distinguish a surface contact area from a shear-through-thickness area.</p>"
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
        "instructor": "<p>Using a circular contact footprint, <em>A</em><sub>b</sub> = &pi;<em>d</em><sup>2</sup>/4. With <em>d</em> = {{d}} {{d_unit}}, <em>A</em><sub>b</sub> = &pi;({{d}} mm)<sup>2</sup>/4 = {{press_bearing_area_mm2}} mm<sup>2</sup>.</p><p>If an instructor wants a projected rectangular bearing area instead, that convention should be stated explicitly. This filled example uses the circular footprint area.</p>"
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
        "instructor": "<p>Each punching shear section has idealized area <em>dt</em>. Since there are two sections, <em>A</em><sub>p</sub> = 2<em>dt</em>. With <em>d</em> = {{d}} {{d_unit}} and <em>t</em> = {{t}} {{t_unit}}, <em>A</em><sub>p</sub> = 2({{d}})({{t}}) = {{press_punching_area_mm2}} mm<sup>2</sup>.</p><p>This calculation uses the simplified two-section punching shear idealization shown in the instructor diagram.</p>"
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
        "instructor": "<p>Convert the load to N: <em>P</em> = {{press_load_N}} N. Then &tau;<sub>p</sub> = <em>P</em>/<em>A</em><sub>p</sub> = {{press_load_N}}/{{press_punching_area_mm2}} = {{press_punching_shear_MPa}} MPa.</p><p>Use N and mm units so N/mm<sup>2</sup> = MPa.</p>"
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
        "instructor": "<p>&sigma;<sub>b</sub> = <em>P</em>/<em>A</em><sub>b</sub> = {{press_load_N}}/{{press_bearing_area_mm2}} = {{press_bearing_stress_MPa}} MPa.</p><p>This is an average compressive contact stress, not a tensile stress.</p>"
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
        "instructor": "<p>Using the stated idealization, &tau;<sub>p</sub> = {{press_punching_shear_MPa}} MPa and &sigma;<sub>b</sub> = {{press_bearing_stress_MPa}} MPa. The larger average stress quantity is {{press_larger_stress}} = {{press_larger_stress_MPa}} MPa.</p><p>Larger stress magnitude does not automatically mean governing failure unless shear and bearing allowables are known.</p>"
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
        "instructor": "<p>Using the optional allowables in the current input set, FOS<sub>shear</sub> = &tau;<sub>allow</sub>/&tau;<sub>p</sub> = {{tau_allow}}/{{press_punching_shear_MPa}} = {{press_fos_shear}}, and FOS<sub>bearing</sub> = &sigma;<sub>bearing,allow</sub>/&sigma;<sub>b</sub> = {{sigma_bearing_allow}}/{{press_bearing_stress_MPa}} = {{press_fos_bearing}}. The smaller simplified factor of safety is {{press_governing_fos}} for {{press_governing_fos_mode}}.</p><p>Possible modifications include increasing plate thickness <em>t</em> to reduce punching shear stress, increasing ram diameter <em>d</em> or using a load-spreading pad to reduce bearing stress, reducing load <em>P</em>, using a stronger plate material, or changing the support geometry to reduce local failure risk.</p>"
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
        "instructor": "<p>For the stated data and idealization, &tau;<sub>p</sub> = {{press_punching_shear_MPa}} MPa and &sigma;<sub>b</sub> = {{press_bearing_stress_MPa}} MPa. The larger average stress is {{press_larger_stress}}.</p><p>However, accepting the fixture requires allowable shear stress, allowable bearing/compressive stress, required factor of safety, and possibly checks for plate bending, yielding, plastic indentation, contact nonlinearity, support deformation, and fixture alignment. The final recommendation should not overclaim safety without material allowables.</p>"
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
        "selected": false,
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
        "instructor": "<p>Strong answers should connect the crane to rated lifting capacity, reach, swing range, trolley travel, positioning accuracy, workspace limits, certified lifting hardware, operator safety, inspection, downtime, cost, and product liability.</p><p>The three most defensible governing requirements are safe support of rated and dynamically amplified loads, acceptable stiffness/positioning accuracy, and adequate reliability or fatigue life under repeated production cycles.</p>"
      },
      {
        "id": "q2",
        "title": "Material Selection",
        "selected": false,
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
        "instructor": "<p>Representative answers should usually favor structural steel for the boom and brace because stiffness, weldability, availability, and cost matter. Pins may require higher-strength or heat-treated steel because shear, bending, bearing, wear, and fatigue are important.</p><p>Hooks, chains, hoists, and below-the-hook lifting fixtures should be selected as rated and traceable lifting components, not merely sized from nominal material strength.</p>"
      },
      {
        "id": "q3",
        "title": "Critical Geometrical Parameters",
        "selected": false,
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
        "instructor": "<p>System-level dimensions include boom length, trolley/load position, wall-support spacing, brace angle, swing angle, and hook height. Member-level dimensions include area, second moment of area, section modulus, wall thickness, unsupported brace length, radius of gyration, and effective length. Connection-level dimensions include pin diameter, hole diameter, plate thickness, weld size, edge distance, bolt spacing, and eccentricity.</p><p>Increasing load position along the boom increases the wall moment and generally increases boom bending, connection force, and deflection.</p>"
      },
      {
        "id": "q4",
        "title": "Loading Identification and Design Load",
        "selected": false,
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
        "instructor": "<p>The battery weight is <em>W</em> = <em>Mg</em>, so this variant has <em>W</em> = {{weight_N}} N before fixture, hoist, trolley, self-weight, dynamic amplification, or overload factors are added.</p><p>Good answers include battery weight, fixture weight, hoist/trolley weight, boom/brace self-weight, acceleration, braking, swing, impact, overload, side pull, and repeated operating cycles. A reasonable preliminary design load form is <em>P</em><sub>design</sub> = &gamma;<sub>d</sub>(<em>W</em><sub>battery</sub> + <em>W</em><sub>fixture</sub> + <em>W</em><sub>hoist</sub> + <em>W</em><sub>trolley</sub>) + <em>W</em><sub>structure</sub>, with a separate horizontal load case using <em>H</em> = {{H}} {{H_unit}}.</p>"
      },
      {
        "id": "q5",
        "title": "Critical Locations and Failure Modes",
        "selected": false,
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
        "instructor": "<p>Likely strength-critical locations include the boom near the wall bracket, boom-to-brace connection, brace-to-wall connection, pins, pin holes, mounting plates, weld toes, wall anchors, trolley attachment region, hook, chain, and lifting fixture.</p><p>Stability checks should emphasize the brace in compression and slender/thin-walled details. Serviceability checks should emphasize boom-tip displacement, wall bracket rotation, joint clearance, trolley drift, and positioning accuracy. Fatigue checks should emphasize weld toes, holes, repeated-contact regions, and connection details.</p>"
      },
      {
        "id": "q6",
        "title": "Numerical Acceptance Criteria",
        "selected": false,
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
        "instructor": "<p>Responses should compare calculated stresses, forces, deflections, rotations, slenderness, and fatigue demand against allowable or limiting values with stated factors of safety or design margins.</p><p>Ultimate strength alone is insufficient because the crane is reusable, operator-facing lifting equipment. Yielding, fatigue, buckling, deformation, joint looseness, rated components, and serviceability can govern even when ultimate fracture is not imminent.</p>"
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
        "instructor": "<p>A defensible idealization preserves the dominant load path while replacing the real boom and brace with centerline members. The brace may be idealized as a two-force member only if the connections and loading justify that assumption. The boom should generally be treated as a beam because it can carry bending and shear.</p><p>Students should identify omitted 3D torsion, out-of-plane loading, connection eccentricity, wall flexibility, dynamic effects, clearances, and local deformation where appropriate.</p>"
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
        "instructor": "<p>The static battery weight is <em>W</em> = <em>Mg</em> = {{weight_N}} N. The dynamically amplified vertical design load is <em>P</em><sub>d</sub> = &gamma;<sub>d</sub><em>Mg</em> = {{P_design_N}} N.</p><p>The moment from the vertical design load is <em>P</em><sub>d</sub><em>L</em> = {{wall_moment_Nm}} N*m. The additional moment from the horizontal load offset is <em>H e</em><sub>H</sub> = {{horizontal_moment_Nm}} N*m. Therefore the governing preliminary support moment is <em>M</em><sub>gov</sub> = <em>P</em><sub>d</sub><em>L</em> + <em>H e</em><sub>H</sub> = {{governing_support_moment_Nm}} N*m.</p><p>If <em>e</em><sub>H</sub> = 0, the horizontal load acts through the boom centerline for this 2D in-plane model. It still contributes a horizontal force reaction, but it does not add an in-plane moment term <em>H e</em><sub>H</sub> about the boom centerline. For the remaining preliminary calculations, use the combined moment <em>M</em><sub>gov</sub> when <em>e</em><sub>H</sub> is nonzero; otherwise use <em>P</em><sub>d</sub><em>L</em> for the in-plane bending/load-path calculation and check <em>H</em> separately as a horizontal force case.</p>"
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
        "instructor": "<p>Using the governing moment from Question 7, moment equilibrium about the wall pin gives <em>F</em><sub>by</sub><em>x</em><sub>C</sub> = <em>M</em><sub>gov</sub>. Therefore <em>F</em><sub>by</sub> = <em>M</em><sub>gov</sub>/<em>x</em><sub>C</sub> = {{brace_vertical_N}} N.</p><p>Since <em>F</em><sub>by</sub> = <em>F</em><sub>b</sub> sin(&theta;), the brace axial force is <em>F</em><sub>b</sub> = <em>F</em><sub>by</sub>/sin(&theta;) = {{brace_force_N}} N. The horizontal component is <em>F</em><sub>bx</sub> = <em>F</em><sub>b</sub> cos(&theta;) = {{brace_horizontal_N}} N.</p><p>With +<em>x</em> to the right and +<em>y</em> upward, and with <em>H</em> taken as acting to the right, force equilibrium gives <em>A</em><sub>x</sub> = -(<em>F</em><sub>bx</sub> + <em>H</em>) = {{wall_pin_reaction_x_N}} N and <em>A</em><sub>y</sub> = <em>P</em><sub>d</sub> - <em>F</em><sub>by</sub> = {{wall_pin_reaction_y_N}} N. A different sign convention is acceptable if the directions are clearly shown. For the common lower-brace jib geometry, the brace pushes upward on the boom and is therefore in compression.</p>"
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
        "instructor": "<p>For the braced configuration, the maximum preliminary boom bending moment occurs at the brace attachment for the idealized point-load model. Its magnitude is <em>M</em><sub>max</sub> = |<em>M</em><sub>gov</sub> - <em>P</em><sub>d</sub><em>x</em><sub>C</sub>| = {{braced_boom_moment_Nm}} N*m. Using <em>S</em> = {{S_boom}} {{S_boom_unit}}, &sigma;<sub>max</sub> = <em>M</em><sub>max</sub>(1000)/<em>S</em> = {{braced_boom_bending_MPa}} MPa. The allowable yield stress is &sigma;<sub>y</sub>/<em>N</em><sub>y</sub> = {{yield_allow_MPa}} MPa, so the boom bending utilization ratio is {{boom_stress_utilization}}.</p><p>For the conservative unbraced comparison, <em>M</em> = <em>P</em><sub>d</sub><em>L</em> = {{wall_moment_Nm}} N*m, &sigma; = <em>P</em><sub>d</sub><em>L</em>(1000)/<em>S</em> = {{boom_bending_MPa}} MPa, and &delta; = <em>P</em><sub>d</sub><em>L</em><sup>3</sup>/(3<em>EI</em>) = {{tip_deflection_mm}} mm. The deflection utilization ratio for the stated allowable deflection is {{deflection_utilization}}.</p><p>The cantilever model is conservative because it ignores the upward support provided by the brace. It should not replace the braced-system model because it gives the wrong internal force distribution and does not provide brace or connection forces. Increasing <em>L</em> increases moment and deflection strongly; increasing <em>S</em> reduces bending stress; increasing <em>I</em> reduces deflection. For the current values, the largest computed utilization may come from {{governing_mode}} with utilization {{governing_utilization}}.</p>"
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
        "instructor": "<p>The brace force from Question 8 is <em>F</em><sub>b</sub> = {{brace_force_N}} N. The average brace stress is &sigma;<sub>brace</sub> = <em>F</em><sub>b</sub>/<em>A</em><sub>b</sub> = {{brace_stress_MPa}} MPa. With &sigma;<sub>y</sub>/<em>N</em><sub>y</sub> = {{yield_allow_MPa}} MPa, the brace yielding utilization ratio is {{brace_yield_utilization}}.</p><p>The brace length is <em>L</em><sub>brace</sub> = <em>x</em><sub>C</sub>/cos(&theta;) = {{brace_length_m}} m. The slenderness ratio is <em>K L</em><sub>brace</sub>/<em>r</em><sub>min</sub> = {{brace_slenderness}}. The Euler buckling estimate is <em>P</em><sub>cr</sub> = {{brace_buckling_N}} N, so <em>P</em><sub>cr</sub>/<em>N</em><sub>b</sub> = {{brace_buckling_allow_N}} N and the buckling utilization ratio is {{brace_buckling_utilization}}. Euler buckling should be used only if the member is slender enough and the assumed end conditions are appropriate.</p><p>The pin area is <em>A</em><sub>p</sub> = &pi;<em>d</em><sub>p</sub><sup>2</sup>/4 = {{pin_area_mm2}} mm<sup>2</sup>. With <em>n</em><sub>s</sub> = {{n_s}}, &tau;<sub>avg</sub> = <em>F</em><sub>b</sub>/(<em>n</em><sub>s</sub><em>A</em><sub>p</sub>) = {{pin_shear_MPa}} MPa. Compared with &tau;<sub>allow</sub> = {{tau_allow}} {{tau_allow_unit}}, the pin shear utilization ratio is {{pin_shear_utilization}}.</p><p>The nominal plate bearing stress is &sigma;<sub>bearing</sub> = <em>F</em><sub>b</sub>/(<em>t d</em><sub>p</sub>) = {{bearing_MPa}} MPa. Compared with &sigma;<sub>bearing,allow</sub> = {{bearing_allow}} {{bearing_allow_unit}}, the bearing utilization ratio is {{bearing_utilization}}. Additional required checks include pin bending, plate tear-out, net-section rupture, edge distance, fatigue, wear, hole clearance, retaining hardware, welds, and whether the connection is truly single or double shear.</p>"
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
        "instructor": "<p>The computed utilization ratios for the current input set are: boom bending stress = {{boom_stress_utilization}}, load-point deflection = {{deflection_utilization}}, brace axial yielding = {{brace_yield_utilization}}, brace buckling = {{brace_buckling_utilization}}, pin shear = {{pin_shear_utilization}}, and plate bearing = {{bearing_utilization}}.</p><p>The largest utilization ratio is {{governing_utilization}}, governed by {{governing_mode}}. Therefore, based on the preliminary 2D analysis, the crane concept {{design_recommendation}} because the governing criterion is {{governing_mode}} with a utilization ratio of {{governing_utilization}}.</p><p>If modification is required, defensible changes include reducing boom length L, increasing boom section modulus S, increasing boom moment of inertia I, moving the brace attachment farther from the wall, increasing brace angle theta when geometry allows, increasing pin diameter, increasing plate thickness, using double shear, or reducing allowable deflection demand through a stiffer section. Before final approval, students should request or analyze out-of-plane torsion, fatigue, wall-anchor-group behavior, weld details, trolley-wheel contact, joint clearance, load swing, structural-wall flexibility, rated hoist/hook/chain data, inspection requirements, and applicable lifting-device standards.</p>"
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
        "instructor": "<p>A strong response should discuss portability and low mass, compatibility with standard commercial ladders, rapid assembly and adjustment, prevention of incorrect installation, adequate rated load, corrosion resistance, repeated-use durability, low manufacturing cost, standard materials and fasteners, inspection and replacement, storage and transportation, liability, and safe-use instructions.</p><p>Three likely governing requirements are adequate strength and stability under credible service and misuse loads, acceptable platform and bracket deformation, and reliable, intuitive, and inspectable attachment to the ladders.</p>"
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
        "instructor": "<p>The primary load path is worker and tools to platform to brackets to ladder rungs or rails to ladder side rails to wall and ground contacts.</p><p>The platform carries bending and shear. The brackets transfer vertical load, horizontal force, and possibly moment into the ladders. The ladder rails carry combined axial force and bending. Wall contact provides a horizontal reaction, while the feet provide vertical reaction and frictional resistance.</p><p>Potential interruptions include bracket disengagement, rung crushing, pin failure, foot slip, loss of wall contact, loose hardware, and local deformation.</p>"
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
        "instructor": "<p>Strength-critical locations include the platform at maximum bending moment, bracket horizontal arm, brace, adjustment slot, pins and bolts, welds, ladder rungs, ladder rails, and ladder feet.</p><p>Stiffness-critical quantities include platform sag, bracket rotation, ladder-rail bending, and unequal support deformation. Stability-critical behavior includes sliding, overturning, lateral motion, and loss of contact. Fatigue-critical locations include weld toes, holes, slots, section transitions, and repeated-contact surfaces.</p><p>A structure may remain below yield yet be unsafe because excessive motion can cause loss of balance, platform slope, redistribution of load, or loss of engagement.</p>"
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
        "instructor": "<p><em>E</em> controls elastic stiffness and deflection. &sigma;<sub>y</sub> controls onset of permanent deformation. &sigma;<sub>u</sub> relates to fracture or rupture. Fatigue strength governs repeated loading. Toughness resists brittle failure and impact. Hardness and wear resistance matter at hooks, pins, slots, and bearing surfaces. Corrosion resistance matters for outdoor exposure. Density influences portability. Weldability and machinability influence fabrication cost.</p><p>Aluminum is attractive for ladders and platforms because of low density and corrosion resistance. Steel may be preferred for pins, locking hardware, and high-wear contacts.</p>"
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
        "instructor": "<p>Important system-level variables include ladder length, ladder angle, support spacing, platform span, and worker position. Important component-level variables include platform section properties, ladder-rail section properties, bracket-arm length, brace angle, and brace slenderness. Important connection variables include pin diameter, hole diameter, plate thickness, edge distance, slot geometry, and weld dimensions.</p><p>Increasing span or worker eccentricity generally increases bending moment and deflection. Increasing section modulus reduces bending stress. Increasing second moment of area reduces deflection. Increasing brace slenderness increases buckling sensitivity.</p>"
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
        "instructor": "<p>Loads include worker, tools, and materials as static or quasi-static loads; platform and ladder self-weight as static loads; stepping and climbing as dynamic or impact loads; worker movement as time-varying load; wind as lateral and potentially dynamic load; accidental overload as an abnormal load; and repeated use as cyclic loading.</p><p>The governing platform and bracket load commonly occurs when the worker stands near one bracket or near an unsupported platform region. Sliding and overturning may be governed by horizontal force, eccentric loading, or wind.</p>"
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
        "instructor": "<p>Relevant criteria include yield, ultimate rupture, shear, bearing, tear-out, net-section failure, buckling, deflection, rotation, sliding, overturning, fatigue, and wear.</p><p>Ultimate strength alone is insufficient because permanent deformation, instability, excessive deflection, or fatigue can make the system unsafe before fracture.</p>"
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
        "instructor": "<p>The system is suitable for FEA only after a simpler load-path and equilibrium model is established. Appropriate representations may include beam elements for ladder rails, rungs, and platform; shell elements for thin bracket plates; solid elements for pins, slots, hooks, and detailed connections; and nonlinear contact for wall, ground, bracket, and rung interfaces.</p><p>Hand calculations should establish reactions, load sharing, approximate bending, and stability first. FEA is valuable for local stress concentration, contact, connection deformation, and three-dimensional effects. The FEA model must be checked against equilibrium, limiting cases, mesh convergence, and hand calculations.</p>"
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
        "instructor": "<p>A reasonable preliminary model treats the platform as a beam supported by two bracket reactions. Each ladder may be modeled as an inclined beam with wall and ground contact.</p><p>Equal load sharing is valid only for symmetric geometry, loading, and stiffness. A worker close to one bracket produces unequal reactions. The simplified model excludes lateral motion, detailed rung contact, clearance, torsion, local weld stress, and three-dimensional instability.</p>"
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
        "instructor": "<p>This transition is important pedagogically because students should not begin with an isolated bracket formula. They should first explain why the bracket is a critical component in the complete system load path and what system-level assumptions are being passed into the component model.</p>"
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
        "image": "assets/bracket-idealization-2d.png",
        "imageAlt": "Dimensioned two-dimensional idealization of the adjustable ladder-platform bracket.",
        "student": "<p>Use the dimensioned two-dimensional bracket image supplied by the instructor.</p><p>Define <em>L</em> as the horizontal support-arm length; <em>H</em> as the vertical spacing between the upper and lower ladder contacts; <em>L</em><sub>d</sub> as the diagonal-brace length; &theta; as the diagonal-brace angle relative to the horizontal; <em>w</em> as the uniformly distributed platform load acting on the arm; <em>A</em><sub>d</sub> as the diagonal-brace cross-sectional area; <em>I</em><sub>d</sub> as the minimum second moment of area of the diagonal brace; <em>r</em><sub>min</sub> as the minimum radius of gyration of the brace; <em>K</em> as the effective-length factor; <em>S</em><sub>a</sub> as the section modulus of the horizontal arm; <em>I</em><sub>a</sub> as the second moment of area of the horizontal arm; <em>E</em> as the elastic modulus; &sigma;<sub>y</sub> as the yield strength; <em>d</em><sub>p</sub> as the connection-pin diameter; <em>t</em> as the connection-plate thickness; <em>n</em><sub>s</sub> as the number of effective pin shear planes; <em>N</em><sub>y</sub> as the required factor of safety against yielding; <em>N</em><sub>b</sub> as the required factor of safety against buckling; &tau;<sub>allow</sub> as the allowable pin shear stress; and &sigma;<sub>bearing,allow</sub> as the allowable bearing stress.</p><p>Define the horizontal distance from the upper ladder contact to the brace connection as <em>a</em> = <em>L</em><sub>d</sub> cos&theta;. The vertical projection is <em>H</em> = <em>L</em><sub>d</sub> sin&theta;. The uniformly distributed load has resultant <em>W</em> = <em>wL</em>, acting at <em>x</em> = <em>L</em>/2.</p><p>Assume the horizontal arm behaves as a beam; the diagonal brace is a two-force member; the upper and lower bracket contacts are idealized as pins; loading is planar; bracket self-weight is neglected; the distributed load is uniform; and connection eccentricity is neglected.</p>",
        "instructor": "<p>Students should define all symbols before using equations. The model should make clear that <em>a</em> is the horizontal lever arm from the upper contact to the brace force component, while <em>L</em> is the full loaded support-arm length.</p><p>For the default values, <em>a</em> = <em>L</em><sub>d</sub> cos&theta; = {{ladder_a_m}} m and the vertical projection is <em>L</em><sub>d</sub> sin&theta; = {{ladder_H_projected_m}} m. This is why the default displayed contact spacing is set to match the projected height. If an instructor edits <em>H</em>, <em>L</em><sub>d</sub>, or &theta;, those three geometry values should be checked for compatibility.</p><p>The assumptions should be judged by whether they preserve the dominant load path and whether omitted effects are named.</p>"
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
        "instructor": "<p>The distributed-load resultant is <em>W</em> = <em>wL</em> = {{ladder_load_resultant_N}} N, acting at <em>L</em>/2.</p><p>The brace horizontal lever arm is <em>a</em> = <em>L</em><sub>d</sub> cos&theta; = {{ladder_a_m}} m. Taking moments about the upper contact gives <em>F</em><sub>d,y</sub><em>a</em> = (<em>wL</em>)(<em>L</em>/2). Therefore, <em>F</em><sub>d,y</sub> = <em>wL</em><sup>2</sup>/(2<em>a</em>) = {{ladder_brace_vertical_N}} N.</p><p>Since <em>F</em><sub>d,y</sub> = <em>F</em><sub>d</sub> sin&theta;, the brace force is <em>F</em><sub>d</sub> = <em>wL</em><sup>2</sup>/(2<em>a</em> sin&theta;) = {{ladder_brace_force_N}} N. Using <em>a</em> = <em>L</em><sub>d</sub> cos&theta;, this may be written as <em>F</em><sub>d</sub> = <em>wL</em><sup>2</sup>/(2<em>L</em><sub>d</sub> sin&theta; cos&theta;).</p><p>The horizontal component is <em>F</em><sub>d,x</sub> = <em>F</em><sub>d</sub> cos&theta; = {{ladder_brace_horizontal_N}} N. Force equilibrium gives <em>A</em><sub>x</sub> + <em>F</em><sub>d,x</sub> = 0 and <em>A</em><sub>y</sub> + <em>F</em><sub>d,y</sub> - <em>wL</em> = 0. Thus, <em>A</em><sub>x</sub> = -<em>F</em><sub>d,x</sub> = {{ladder_upper_reaction_x_N}} N and <em>A</em><sub>y</sub> = <em>wL</em> - <em>F</em><sub>d,y</sub> = {{ladder_upper_reaction_y_N}} N. The brace pushes upward on the arm and is therefore in compression for the configuration shown.</p>"
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
        "instructor": "<p>Using upward reactions <em>A</em><sub>y</sub> at <em>x</em> = 0 and <em>F</em><sub>d,y</sub> at <em>x</em> = <em>a</em>: for 0 &le; <em>x</em> &lt; <em>a</em>, the shear force is <em>V</em><sub>1</sub>(<em>x</em>) = <em>A</em><sub>y</sub> - <em>wx</em>, and the bending moment is <em>M</em><sub>1</sub>(<em>x</em>) = <em>A</em><sub>y</sub><em>x</em> - <em>wx</em><sup>2</sup>/2.</p><p>For <em>a</em> &le; <em>x</em> &le; <em>L</em>, the shear force is <em>V</em><sub>2</sub>(<em>x</em>) = <em>A</em><sub>y</sub> + <em>F</em><sub>d,y</sub> - <em>wx</em>. Since <em>A</em><sub>y</sub> + <em>F</em><sub>d,y</sub> = <em>wL</em>, this may be written as <em>V</em><sub>2</sub>(<em>x</em>) = <em>w</em>(<em>L</em> - <em>x</em>). The bending moment is <em>M</em><sub>2</sub>(<em>x</em>) = <em>A</em><sub>y</sub><em>x</em> + <em>F</em><sub>d,y</sub>(<em>x</em> - <em>a</em>) - <em>wx</em><sup>2</sup>/2.</p><p>Candidate locations for maximum absolute bending moment are <em>x</em> = 0, <em>x</em> = <em>a</em>, <em>x</em> = <em>L</em>, any valid interior point satisfying <em>V</em><sub>1</sub>(<em>x</em>) = 0, and any valid interior point satisfying <em>V</em><sub>2</sub>(<em>x</em>) = 0. For the default values, the maximum absolute moment is <em>M</em><sub>max</sub> = {{ladder_Mmax_Nm}} N*m at <em>x</em> = {{ladder_Mmax_location_m}} m.</p><p>Convert moment to N*mm before using <em>S</em><sub>a</sub> in mm<sup>3</sup>. Then &sigma;<sub>max</sub> = <em>M</em><sub>max</sub>(1000)/<em>S</em><sub>a</sub> = {{ladder_bending_MPa}} MPa. The allowable yield stress is &sigma;<sub>y</sub>/<em>N</em><sub>y</sub> = {{ladder_yield_allow_MPa}} MPa, so the arm bending utilization ratio is {{ladder_arm_stress_utilization}}.</p><p>Increasing <em>L</em> or <em>w</em> generally increases bending demand. Increasing <em>S</em><sub>a</sub> reduces stress. Moving the brace connection outward generally reduces the brace force and changes the bending distribution. Arm deflection requires <em>EI</em><sub>a</sub>, support compatibility, brace axial stiffness, and connection flexibility.</p>"
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
        "instructor": "<p>The brace force from Question 10 is <em>F</em><sub>d</sub> = {{ladder_brace_force_N}} N.</p><p><strong>Brace yielding:</strong> &sigma;<sub>d</sub> = <em>F</em><sub>d</sub>/<em>A</em><sub>d</sub> = {{ladder_brace_stress_MPa}} MPa. The allowable yield stress is &sigma;<sub>y</sub>/<em>N</em><sub>y</sub> = {{ladder_yield_allow_MPa}} MPa, so the brace yielding utilization ratio is {{ladder_brace_yield_utilization}}.</p><p><strong>Brace buckling:</strong> use mm units with <em>E</em> in MPa and <em>I</em><sub>d</sub> in mm<sup>4</sup>. Brace slenderness is &lambda; = <em>KL</em><sub>d</sub>/<em>r</em><sub>min</sub> = {{ladder_brace_slenderness}}. When Euler buckling is appropriate, <em>P</em><sub>cr</sub> = &pi;<sup>2</sup><em>EI</em><sub>d</sub>/(<em>KL</em><sub>d</sub>)<sup>2</sup> = {{ladder_brace_buckling_N}} N. The allowable buckling load is <em>P</em><sub>cr</sub>/<em>N</em><sub>b</sub> = {{ladder_brace_buckling_allow_N}} N, so the buckling utilization ratio is {{ladder_brace_buckling_utilization}}. Euler buckling is a preliminary elastic-buckling model and should be used only when the brace is slender enough and the end-condition assumption is defensible.</p><p><strong>Pin shear:</strong> <em>A</em><sub>p</sub> = &pi;<em>d</em><sub>p</sub><sup>2</sup>/4 = {{ladder_pin_area_mm2}} mm<sup>2</sup>. Average pin shear stress is &tau;<sub>avg</sub> = <em>F</em><sub>d</sub>/(<em>n</em><sub>s</sub><em>A</em><sub>p</sub>) = {{ladder_pin_shear_MPa}} MPa. Compared with &tau;<sub>allow</sub>, the pin shear utilization ratio is {{ladder_pin_shear_utilization}}.</p><p><strong>Plate bearing:</strong> nominal bearing stress is &sigma;<sub>bearing</sub> = <em>F</em><sub>d</sub>/(<em>td</em><sub>p</sub>) = {{ladder_bearing_MPa}} MPa. Compared with &sigma;<sub>bearing,allow</sub>, the bearing utilization ratio is {{ladder_bearing_utilization}}.</p><p>Additional required checks include pin bending, plate tear-out, net-section rupture, weld failure, fatigue, wear, edge distance, hole clearance, retaining-device failure, and local deformation of the ladder contact region.</p>"
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
        "instructor": "<p>The student should not approve the complete product solely because the bracket passes its local checks. For the default bracket values, the calculated utilization ratios are: horizontal-arm bending = {{ladder_arm_stress_utilization}}, brace yielding = {{ladder_brace_yield_utilization}}, brace buckling = {{ladder_brace_buckling_utilization}}, pin shear = {{ladder_pin_shear_utilization}}, and plate bearing = {{ladder_bearing_utilization}}. The largest bracket utilization is {{ladder_governing_utilization}}, governed by {{ladder_governing_mode}}, so the bracket-level result {{ladder_design_recommendation}}.</p><p>The final product recommendation must still consider complete-system sliding and overturning, ladder-rung and rail capacity, platform strength and deflection, bracket strength and buckling, connection failure, fatigue and wear, misuse, and installation uncertainty. A defensible preliminary conclusion should identify the largest utilization ratio and the unresolved system-level hazards.</p>"
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
        "instructor": "<p>The linkage supports the rider load and transfers it from the saddle or seat support into the bicycle frame through the frame pivot at C and the shock/link connection at B-D.</p>"
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
        "instructor": "<p>The external load <em>P</em> is applied downward at point A, representing the vertical load transmitted from the rider through the saddle to the suspension member.</p><p>Students should not distribute the load throughout the frame unless the instructor explicitly modifies the problem.</p>"
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
        "instructor": "<p>The seat support member is pinned to the frame at C and connected to the shock/link at B. The shock/link BD is treated as a two-force member, so the force at B acts along BD. Pin C provides reaction components on the seat support member.</p><p>This problem is not a fixed-beam problem. The key idealizations are pin support at C and two-force member BD at B.</p>"
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
        "instructor": "<p>One acceptable load path is: rider load at saddle &rarr; curved seat support member &rarr; pin C and shock/link attachment at B &rarr; shock/link BD &rarr; lower frame joint at D &rarr; bicycle frame. The load is shared through the frame pin and the shock linkage.</p><p>The load path should explicitly mention the pins because they are the design-check components.</p>"
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
        "instructor": "<p>The critical components in the base problem are pins B and C because the design question asks for their factor of safety against shear failure. The seat support member and shock link also carry load, but their material and section properties are not provided for detailed stress checks.</p>"
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
        "instructor": "<p>The relevant response is average shear stress in each pin. Both pins are specified to be in double shear, so each pin has two resisting shear planes. The factor of safety is based on the material shear failure stress.</p><p>Bearing stress, bending of the pin, fatigue, bushing wear, and frame stresses are realistic concerns but are not part of the base MEEN 305 calculation.</p>"
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
        "instructor": "<p>Relevant parameters are load <em>P</em>, horizontal distances from A to B and B to C, vertical offset between B and C, angle of shock/link BD, pin diameters <em>d</em><sub>B</sub> and <em>d</em><sub>C</sub>, number of shear planes <em>n</em><sub>s</sub>, and shear failure stress &tau;<sub>fail</sub>.</p><p>The pin area is <em>A</em> = &pi;<em>d</em><sup>2</sup>/4 and the total double-shear area is <em>n</em><sub>s</sub><em>A</em>. Students should connect pin diameter to shear area and factor of safety through &tau; = <em>V</em>/(<em>n</em><sub>s</sub><em>A</em>) and FOS = &tau;<sub>fail</sub>/&tau;.</p>"
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
        "image": "assets/mountain-bike-instructor-idealization.png",
        "imageAlt": "Instructor idealized suspension linkage model with load P, points A, B, C, D, dimensions, and link angle.",
        "student": "<p>Convert the real rear suspension assembly into a simplified 2D Mechanics of Materials model. Your sketch should show point A where load <em>P</em> is applied, pin locations B and C, lower joint D, shock/link BD, <strong>{{x_AB}} {{x_AB_unit}}</strong> and <strong>{{x_BC}} {{x_BC_unit}}</strong> horizontal dimensions, the <strong>{{y_BC}} {{y_BC_unit}}</strong> vertical offset, the <strong>{{theta_BD}} {{theta_BD_unit}}</strong> link angle, and the unknown pin/link forces.</p><p>Student model placeholder: insert or draw the simplified model and free-body/load-transfer diagram here.</p>",
        "instructor": "<p>A correct idealization treats the seat support as a rigid body acted on by the downward load <em>P</em> at A, the force from the two-force member BD at B, and reaction components at C. Pins B and C are later checked in double shear.</p><p>For the student packet, this should appear before the instructor reference model unless the activity is intentionally scaffolded.</p>"
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
        "instructor": "<p>Appropriate assumptions include static loading; seat support treated as a rigid body for force analysis; BD treated as a two-force member; pins B and C treated as double-shear connectors; loads act in the plane of the idealized diagram; pin shear stress is averaged over the shear area; and fatigue, bearing stress, bushing wear, dynamic impact, shock nonlinearities, frame flexibility, and stress concentrations are neglected.</p><p>Expected answers do not need every assumption, but they should include rigid-body equilibrium, two-force member BD, and double-shear pin idealization.</p>"
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
        "instructor": "<p>The analysis sequence is: draw the FBD of the seat support member; use moment equilibrium about C to find the force in BD and the load at pin B; use force equilibrium to find the reaction at C; compute double-shear area for each pin; compute average shear stress &tau;<sub>B</sub> and &tau;<sub>C</sub>; compute FOS<sub>B</sub> and FOS<sub>C</sub>; identify the governing pin; and make a recommendation.</p>"
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
        "instructor": "<p>The load <em>P</em> acts downward at A. Pin C connects the seat support to the frame and provides reaction components. Point B connects the seat support to the shock/link BD. Member BD is idealized as a two-force member, so the force at B acts along BD. Pins B and C are double-shear connectors for the stress check.</p><p>This replaces a standard beam-support interpretation. The critical idealizations are pin C and two-force member BD.</p>"
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
        "instructor": "<p>The unknowns are the force in member BD at B and the reaction components at pin C. The force at B has a known direction along BD, but unknown magnitude. The reaction at C has unknown horizontal and vertical components.</p><p>Students should solve for forces before applying &tau; = <em>V</em>/<em>A</em>.</p>"
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
        "instructor": "<p>A correct FBD shows <em>P</em> downward at A, force <em>F</em><sub>BD</sub> at B acting along the shock/link direction, and reaction components <em>C</em><sub>x</sub> and <em>C</em><sub>y</sub> at pin C.</p><p>The direction of <em>F</em><sub>BD</sub> on the upper member should be chosen consistently; if assumed opposite, a negative solution indicates the actual direction.</p>"
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
        "instructor": "<p>The moment arm of <em>P</em> about C is <em>x</em><sub>AB</sub> + <em>x</em><sub>BC</sub> = {{bike_total_arm_mm}} mm. The force at B acts along BD. With <em>x</em><sub>BC</sub> = {{x_BC}} {{x_BC_unit}}, <em>y</em><sub>BC</sub> = {{y_BC}} {{y_BC_unit}}, and &theta;<sub>BD</sub> = {{theta_BD}} {{theta_BD_unit}}, the resisting moment arm is <em>x</em><sub>BC</sub> sin&theta;<sub>BD</sub> + <em>y</em><sub>BC</sub> cos&theta;<sub>BD</sub> = {{bike_B_moment_arm_mm}} mm.</p><p>Therefore, <em>F</em><sub>BD</sub> = <em>P</em>(<em>x</em><sub>AB</sub> + <em>x</em><sub>BC</sub>)/moment arm = {{bike_link_force_N}} N.</p>"
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
        "instructor": "<p>For the force direction that balances the applied load, the force at B on the seat support has components <em>F</em><sub>Bx</sub> = -<em>F</em><sub>BD</sub> cos&theta;<sub>BD</sub> = {{bike_B_force_x_N}} N and <em>F</em><sub>By</sub> = <em>F</em><sub>BD</sub> sin&theta;<sub>BD</sub> = {{bike_B_force_y_N}} N.</p><p>Force equilibrium gives <em>C</em><sub>x</sub> = {{bike_C_reaction_x_N}} N and <em>C</em><sub>y</sub> = {{bike_C_reaction_y_N}} N. The reaction magnitude is <em>R</em><sub>C</sub> = {{bike_C_reaction_N}} N.</p><p>The magnitude of the reaction at C is used for the shear force in pin C.</p>"
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
        "instructor": "<p>Pin B transmits the force from the shock/link BD into the seat support. The shear force demand in pin B is taken as <em>V</em><sub>B</sub> = <em>F</em><sub>BD</sub> = {{bike_link_force_N}} N.</p><p>Because the problem states that pin B is in double shear, this total load is resisted over two shear planes.</p>"
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
        "instructor": "<p>Pin C transmits the reaction between the seat support and frame. The shear force demand in pin C is the reaction magnitude <em>V</em><sub>C</sub> = <em>R</em><sub>C</sub> = {{bike_C_reaction_N}} N.</p><p>Use the resultant reaction, not only one component, for the pin shear demand.</p>"
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
        "instructor": "<p>For a circular pin, <em>A</em> = &pi;<em>d</em><sup>2</sup>/4. For pin B, <em>A</em><sub>B</sub> = {{bike_pin_B_area_mm2}} mm<sup>2</sup> and the total shear area is <em>n</em><sub>s</sub><em>A</em><sub>B</sub> = {{bike_pin_B_double_area_mm2}} mm<sup>2</sup>. For pin C, <em>A</em><sub>C</sub> = {{bike_pin_C_area_mm2}} mm<sup>2</sup> and the total shear area is <em>n</em><sub>s</sub><em>A</em><sub>C</sub> = {{bike_pin_C_double_area_mm2}} mm<sup>2</sup>.</p><p>Use N and mm units so that stress is in N/mm<sup>2</sup> = MPa.</p>"
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
        "instructor": "<p>Pin B: &tau;<sub>B</sub> = <em>V</em><sub>B</sub>/(<em>n</em><sub>s</sub><em>A</em><sub>B</sub>) = {{bike_link_force_N}}/{{bike_pin_B_double_area_mm2}} = {{bike_pin_B_shear_MPa}} MPa.</p><p>Pin C: &tau;<sub>C</sub> = <em>V</em><sub>C</sub>/(<em>n</em><sub>s</sub><em>A</em><sub>C</sub>) = {{bike_C_reaction_N}}/{{bike_pin_C_double_area_mm2}} = {{bike_pin_C_shear_MPa}} MPa.</p><p>Pin C may have a smaller load than pin B but also has a smaller diameter, so it can still be more critical.</p>"
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
        "instructor": "<p>FOS<sub>B</sub> = &tau;<sub>fail</sub>/&tau;<sub>B</sub> = {{tau_fail}}/{{bike_pin_B_shear_MPa}} = {{bike_pin_B_fos}}.</p><p>FOS<sub>C</sub> = &tau;<sub>fail</sub>/&tau;<sub>C</sub> = {{tau_fail}}/{{bike_pin_C_shear_MPa}} = {{bike_pin_C_fos}}.</p><p>Pin {{bike_governing_pin}} has the lower factor of safety and is governing for the simplified shear check.</p>"
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
        "instructor": "<p>For the simplified static shear check, pin B has &tau;<sub>B</sub> = {{bike_pin_B_shear_MPa}} MPa and FOS<sub>B</sub> = {{bike_pin_B_fos}}. Pin C has &tau;<sub>C</sub> = {{bike_pin_C_shear_MPa}} MPa and FOS<sub>C</sub> = {{bike_pin_C_fos}}. Pin {{bike_governing_pin}} is governing because it has the lower factor of safety. The simplified pin-shear recommendation is: {{bike_recommendation}}.</p><p>Final design acceptance requires a target design FOS and additional checks such as bearing stress at the pin holes, tear-out or net-section failure of the brackets, fatigue under repeated riding loads, shock absorber limits, bushing wear, pin bending, frame weld stresses, dynamic impact loading, and stiffness/deflection of the seat support.</p>"
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
        "instructor": "<p>The system transfers the vertical axle load from the hub through the spokes into the rigid rim and then into the ground. The spokes serve as axial load-carrying members that connect the hub to the rim.</p><p>Good answers should use load-transfer language rather than only naming parts of the wheel.</p>"
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
        "instructor": "<p>The external load <em>P</em> is applied at the hub/axle point A and acts vertically downward. In the numerical case, <em>P</em> = {{P}} {{P_unit}}.</p><p>Students should not apply the load at the rim or ground contact. The axle load enters the wheel at the hub.</p>"
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
        "instructor": "<p>The rim is idealized as rigid and supported through ground contact. The points where the spokes attach to the rim are treated as fixed relative to the rigid rim. The hub can displace slightly under load, causing axial deformation of the spokes.</p><p>This is not a simple pin-support reaction problem. The key modeling assumption is the rigid rim plus deformable axial spokes.</p>"
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
        "instructor": "<p>The load path is: axle load at hub A &rarr; axial forces in spokes AB, AC, and AD &rarr; rigid outer rim &rarr; ground contact region &rarr; ground/supporting surface.</p><p>The rim should be included explicitly because it transfers the spoke loads to the ground.</p>"
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
        "instructor": "<p>The three spokes are the critical components for the simplified analysis because they carry the axial forces created by the vertical axle load. The rim is assumed rigid and is not stress-checked in this base problem.</p><p>If the problem is extended later, rim bending, hub connection details, and spoke stress can be checked.</p>"
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
        "instructor": "<p>The relevant mechanical response is axial force in each spoke. The vertical spoke AB develops tensile force, while the two lower inclined spokes AC and AD develop compressive force in the idealized rigid-rim model. A full stress analysis would require each spoke cross-sectional area.</p><p>This is an important conceptual point: equal material and area do not imply equal force in all spokes because force distribution depends on compatibility and geometry.</p>"
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
        "instructor": "<p>Relevant parameters are the applied axle load <em>P</em>, spoke radius/length <em>r</em>, spoke angular spacing &theta;, cross-sectional area <em>A</em><sub>s</sub>, and elastic modulus <em>E</em>. Since all spokes have the same material, cross-sectional area, and length, their axial stiffnesses are equal, so the force distribution depends mainly on geometry and compatibility.</p><p>In the base problem, the actual force values are independent of <em>E</em> and <em>A</em><sub>s</sub> because the stiffnesses are equal; however, <em>E</em> and <em>A</em><sub>s</sub> would be needed to compute displacements or stresses.</p>"
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
        "image": "assets/spoked-wheel-instructor-idealization.png",
        "imageAlt": "Instructor idealization of the three-spoke wheel with hub A, spokes AB, AC, AD, load P, radius r, and 120 degree spacing.",
        "student": "<p>Convert the real wheel into a simplified 2D Mechanics of Materials model. The model should show the rigid rim, hub point A, three spokes AB, AC, and AD, the downward axle load <em>P</em> at A, the spoke radius <em>r</em>, and the {{theta}} {{theta_unit}} angular spacing.</p><p>Student model placeholder: insert or draw the simplified model and free-body/compatibility diagram here.</p>",
        "instructor": "<p>A correct student idealization shows a rigid circular rim with three axial spokes connected to a central hub. The external load <em>P</em> acts downward at the hub. The spokes are treated as axial members of equal stiffness because they have the same material, cross-sectional area, and length.</p><p>This should be completed before the final mechanics equations are developed.</p>"
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
        "instructor": "<p>Assumptions may include static loading; rim is rigid; spokes are straight axial members; spokes have the same material, cross-sectional area, and length; deformations are small; the hub displacement is vertical by symmetry; bending of the rim and spokes is neglected; local hub/rim connection stresses are neglected; and the lower spokes can carry compression in the idealized model.</p><p>The last assumption is important. If the physical spokes were tension-only wires, the lower spokes would not carry compression and the model would need to be modified.</p>"
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
        "instructor": "<p>Use symmetry to recognize that the two lower spoke forces are equal. Use deformation compatibility to relate the axial deformation of each spoke to the vertical displacement of the hub. Use equal axial stiffness to relate deformation to spoke force. Finally, apply vertical force equilibrium at the hub to solve for the spoke forces.</p><p>The correct solution requires compatibility plus equilibrium, not equilibrium alone.</p>"
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
        "instructor": "<p>The hub A is subjected to a downward load <em>P</em>. The rim is treated as rigid, so the spoke attachment points B, C, and D remain fixed relative to the rim. The spokes are treated as equal-stiffness axial members.</p><p>This problem is about load sharing through compatible axial deformation, not about bending stress in the rim.</p>"
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
        "instructor": "<p>The unknowns are the axial forces <em>F</em><sub>B</sub>, <em>F</em><sub>C</sub>, and <em>F</em><sub>D</sub> in spokes AB, AC, and AD. By symmetry, <em>F</em><sub>C</sub> = <em>F</em><sub>D</sub>.</p><p>Use a sign convention. In this solution, positive axial force means tension; negative axial force means compression.</p>"
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
        "instructor": "<p>The geometry and loading are symmetric about the vertical centerline. The two lower spokes are mirror images, and the external load has no horizontal component. Therefore the horizontal displacement of the hub is zero and the hub displacement is vertical.</p><p>This lets students use one displacement variable, such as &delta;, for the vertical hub displacement.</p>"
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
        "instructor": "<p>The vertical spoke AB elongates by &delta;. Each lower spoke has a vertical projection equal to cos(60&deg;) = 1/2 relative to the hub displacement direction, so each lower spoke shortens by &delta;/2. Therefore, &Delta;<sub>B</sub> = &delta; and &Delta;<sub>C</sub> = &Delta;<sub>D</sub> = -&delta;/2.</p><p>The negative sign for the lower spokes means shortening, which corresponds to compression under the chosen tension-positive sign convention.</p>"
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
        "instructor": "<p><em>F</em><sub>B</sub> = <em>k</em><sub>s</sub>&delta;. <em>F</em><sub>C</sub> = <em>F</em><sub>D</sub> = -<em>k</em><sub>s</sub>&delta;/2. Therefore, <em>F</em><sub>C</sub> = <em>F</em><sub>D</sub> = -<em>F</em><sub>B</sub>/2.</p><p>This is the compatibility step that makes the problem determinate.</p>"
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
        "instructor": "<p>Using positive tension along each spoke, vertical equilibrium is <em>F</em><sub>B</sub> - (1/2)<em>F</em><sub>C</sub> - (1/2)<em>F</em><sub>D</sub> - <em>P</em> = 0. Substituting <em>F</em><sub>C</sub> = <em>F</em><sub>D</sub> = -<em>F</em><sub>B</sub>/2 gives (3/2)<em>F</em><sub>B</sub> = <em>P</em>.</p><p>Therefore, <em>F</em><sub>B</sub> = 2<em>P</em>/3 = {{wheel_force_B_kN}} kN, and <em>F</em><sub>C</sub> = <em>F</em><sub>D</sub> = -<em>P</em>/3 = {{wheel_force_C_kN}} kN. Thus spoke AB is in {{wheel_force_B_abs_kN}} kN tension, and spokes AC and AD are each in {{wheel_force_C_abs_kN}} kN compression.</p><p>Report both sign and physical meaning. A negative result should not be discarded; it indicates compression relative to the tension-positive convention.</p>"
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
        "instructor": "<p>The vertical spoke AB has the largest magnitude, |<em>F</em><sub>B</sub>| = {{wheel_force_B_abs_kN}} kN. The lower spokes each have magnitude |<em>F</em><sub>C</sub>| = |<em>F</em><sub>D</sub>| = {{wheel_force_C_abs_kN}} kN.</p><p>The governing spoke for force magnitude is {{wheel_governing_spoke}} with {{wheel_governing_force_kN}} kN. This identifies which member would be checked first if area and material strength were provided.</p>"
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
        "instructor": "<p>To compute stress, the cross-sectional area <em>A</em><sub>s</sub> of each spoke is needed, using &sigma;<sub>i</sub> = <em>F</em><sub>i</sub>/<em>A</em><sub>s</sub>. To compute factor of safety, allowable tensile and compressive stresses or material strengths are needed. If the spokes are tension-only, compression capacity is not valid and the physical model must be reconsidered.</p><p>For the current optional area value, the stress estimates are &sigma;<sub>B</sub> = {{wheel_stress_B_MPa}} MPa, &sigma;<sub>C</sub> = {{wheel_stress_C_MPa}} MPa, and &sigma;<sub>D</sub> = {{wheel_stress_D_MPa}} MPa, with negative stress indicating compression. If <em>E</em> and <em>A</em><sub>s</sub> are used for a stiffness extension, &delta; = 2<em>Pr</em>/(3<em>EA</em><sub>s</sub>) = {{wheel_hub_displacement_mm}} mm.</p><p>For the idealized model, the vertical spoke AB carries the largest axial force, {{wheel_force_B_abs_kN}} kN in tension. The two lower spokes each carry {{wheel_force_C_abs_kN}} kN in compression. A detailed design decision requires spoke cross-sectional area, material tensile/compressive allowable stresses, and confirmation that the lower spokes are capable of carrying compression. If the spokes are tension-only, this rigid-rim equal-spoke model is not physically acceptable without modification.</p>"
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
        "gradingNotes": "<p>Good answers should mention support of the pod, weight transfer, cables, wall anchors, and building structure.</p>"
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
        "commonMistakes": "<p>Students sometimes place the pod weight at A or C. It acts at the payload/lower connector B.</p>"
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
        "gradingNotes": "<p>The most important free-body diagram is the lower joint B, not the entire wall frame.</p>"
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
        "instructor": "<p>Equipment pod weight &rarr; lower ring/shackle at B &rarr; tension in cable AB and cable BC &rarr; wall anchors A and C &rarr; structural columns or walls &rarr; building frame/foundation.</p>"
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
        "instructor": "<p>The critical components are the two steel cables AB and BC because they carry the payload through axial tension. The lower ring and wall anchor brackets are also part of the load path, but connector dimensions are not provided for a detailed connector stress check in the base problem.</p>"
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
        "instructor": "<p>The most important response is axial tensile stress in the cables. Secondary connector shear or bearing could be checked only if shackle, pin, bolt, or bracket dimensions are supplied. Buckling is not relevant because cables are tension-only members, and cable bending is neglected in this base model.</p>"
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
        "instructor": "<p>Relevant parameters include cable angles <strong>&theta;<sub>AB</sub> = {{theta_AB}} {{theta_AB_unit}}</strong> and <strong>&theta;<sub>BC</sub> = {{theta_BC}} {{theta_BC_unit}}</strong>, mass m, gravitational acceleration g, cable diameters d<sub>AB</sub> and d<sub>BC</sub>, cable cross-sectional areas A<sub>AB</sub> and A<sub>BC</sub>, cable failure stress &sigma;<sub>fail</sub>, and required factor of safety.</p>"
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
        "image": "assets/cable-instructor-idealization.png",
        "imageAlt": "Instructor reference idealization of the two-cable suspended equipment system",
        "student": "<p>Convert the real system into a simplified 2D Mechanics of Materials model. The model should show support points A and C, lower joint B, cable members AB and BC, cable angles, the downward load W = mg, and the unknown cable tensions.</p>",
        "instructor": "<p>A correct idealization is a 2D particle-equilibrium model of joint B with two cable tensions directed away from B along cables BA and BC and a downward weight W. The cables are idealized as two-force tension members.</p>",
        "gradingNotes": "<p>This should be completed before students rely on the instructor reference diagram, unless the activity is intentionally scaffolded.</p>"
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
        "instructor": "<p>The equipment pod is modeled as a point load at B; cable self-weight is neglected; each cable is straight and massless; each cable is a two-force tension member; loading is static; anchor locations are fixed; material behavior is represented only by failure stress; and connector flexibility, bracket stresses, fatigue, and installation tolerances are neglected.</p>"
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
        "instructor": "<p>Draw the FBD of joint B; write equilibrium in x and y; solve for T<sub>AB</sub> and T<sub>BC</sub>; compute cable area from selected diameter or required area from allowable stress; compute &sigma; = T/A; compute FOS = &sigma;<sub>fail</sub>/&sigma;; and make an engineering recommendation.</p>"
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
        "commonMistakes": "<p>This is not a beam support problem; do not introduce moment reactions at B.</p>"
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
        "instructor": "<p>The unknowns are the two cable tensions T<sub>AB</sub> and T<sub>BC</sub>. These are the force magnitudes transmitted by cables AB and BC. At joint B, each tension acts along its cable direction away from B.</p>"
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
        "commonMistakes": "<p>A common error is switching sine and cosine because the angles are measured from the horizontal.</p>"
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
        "gradingNotes": "<p>For the default geometry, cable AB carries the larger tension because the angles are asymmetric.</p>"
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
        "gradingNotes": "<p>Because MPa = N/mm<sup>2</sup>, using T in N gives area in mm<sup>2</sup> and diameter in mm.</p>"
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
        "instructor": "<p>A<sub>AB</sub> = &pi;({{d_AB}})<sup>2</sup>/4 = <strong>{{cable_A_AB_mm2}} mm<sup>2</sup></strong>, so &sigma;<sub>AB</sub> = T<sub>AB</sub>/A<sub>AB</sub> = <strong>{{cable_sigma_AB_MPa}} MPa</strong> and FOS<sub>AB</sub> = {{sigma_fail}}/{{cable_sigma_AB_MPa}} = <strong>{{cable_FOS_AB}}</strong>. A<sub>BC</sub> = &pi;({{d_BC}})<sup>2</sup>/4 = <strong>{{cable_A_BC_mm2}} mm<sup>2</sup></strong>, so &sigma;<sub>BC</sub> = T<sub>BC</sub>/A<sub>BC</sub> = <strong>{{cable_sigma_BC_MPa}} MPa</strong> and FOS<sub>BC</sub> = {{sigma_fail}}/{{cable_sigma_BC_MPa}} = <strong>{{cable_FOS_BC}}</strong>. The governing selected-diameter FOS is <strong>{{cable_governing_fos}}</strong> in <strong>{{cable_governing_fos_member}}</strong>.</p>"
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
        "instructor": "<p>Possible modifications include increasing the diameter of the governing cable, selecting a cable material with larger failure stress, reducing the supported mass, or changing the cable geometry to reduce the tension in the governing cable. For this numerical case, <strong>{{cable_design_recommendation}}</strong>.</p>"
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
        "gradingNotes": "<p>The recommendation should return to the real support system without claiming connector or anchor safety from cable stress alone.</p>"
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
  }
]
;