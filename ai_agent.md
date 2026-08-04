# AI Agent Project Guide

This file is the operational handoff for an AI coding agent maintaining the Context-Rich Mechanics of Materials project. It explains how to turn a submitted instructor Word template, an industry-context image, and an instructor-reference idealization into a complete, searchable, verified problem package.

Read this file before adding or changing a problem. Also read `README.md` and `docs/authoring-guide.qmd`, then inspect one recent problem package whose mechanics most closely resemble the new problem.

## 1. Mission

Maintain a modular university-level library of context-rich Mechanics of Materials problems that is:

- mechanically correct;
- pedagogically consistent;
- easy for instructors to customize;
- searchable by mechanics concepts;
- reliable in HTML, PDF, and Word outputs; and
- safe for future maintainers to extend.

The normal incoming submission contains:

1. a completed instructor Word template with the scenario, questions, values, and solutions;
2. an industry-context image; and
3. an instructor-reference or idealized mechanics image.

The final result must be a self-contained folder under `problems/` and must work in the Problem Library, direct packet webpages, Instructor Builder, and command-line exports.

## 2. Non-Negotiable Rules

1. **Verify the mechanics independently.** Do not assume that a submitted answer is correct because it appears in the Word template.
2. **Preserve the pedagogical sequence.** Context and student modeling come before the instructor reference idealization and assigned values. Numerical analysis comes after them.
3. **The idealized image belongs in both packet types.** Students need the official reference figure for the assigned mechanics analysis. It is not an instructor-only asset.
4. **Never expose solutions in a student packet.** Instructor answers, grading notes, and common mistakes remain instructor-only.
5. **Keep browser, Builder, and command-line calculations synchronized.** A correct result in one output path is not sufficient.
6. **Do not edit generated catalog files manually.** Change the source package and run `node scripts/build-catalog.mjs`.
7. **Do not edit generated website or export folders.** `_site/`, `.quarto/`, and `exports/` are outputs, not sources.
8. **Do not overwrite unrelated work.** Inspect `git status` before editing and preserve user changes.
9. **Do not push unless the user explicitly asks.** Complete local validation first.
10. **Ask when an ambiguity changes the mechanics.** Examples include unclear load direction, support behavior, shear-plane count, material property, cross section, or boundary condition.

## 3. Read These Files First

Before implementation, inspect:

```text
README.md
ai_agent.md
docs/authoring-guide.qmd
scripts/build-catalog.mjs
scripts/packet-renderer.js
scripts/render-assignment.mjs
instructor-builder.qmd
templates/problem-package/
problems/<most-similar-existing-problem>/
```

Use an existing package with similar mechanics as the primary implementation example. A torsion problem is a better model for another torsion problem than an unrelated generic template.

## 4. System Architecture

### Source pages

```text
index.qmd                 Searchable Problem Library
instructor-builder.qmd    Interactive values, question selection, previews, exports
docs/                     Faculty documentation and health dashboard
problems/                 One owned folder per problem
scripts/                  Validation, packet rendering, and export logic
templates/                New-package starting points
data/                     Generated catalog and health records
```

### One problem package

```text
problems/problem-slug/
|-- problem.json
|-- variables.json
|-- questions.json
|-- index.qmd
|-- _student-problem.qmd
|-- student-packet.qmd
|-- instructor-guide.qmd
|-- assets/
`-- variants/
```

The package owns its scenario, images, variables, questions, saved variants, and packet entry pages. Shared rendering code reads these files through the generated catalog.

### Generated files

The following are rebuilt by `scripts/build-catalog.mjs`:

```text
data/problem-catalog.json
data/problem-catalog.js
data/problem-health.json
data/problem-health.js
```

Commit their regenerated versions with the source package, but never author content directly in them.

## 5. Intake And Discovery

### Confirm the supplied files

Verify that the Word template and both images exist and are readable. Record their exact paths. Inspect image dimensions and content rather than relying only on filenames.

### Extract the Word template

Quarto includes Pandoc even when a standalone `pandoc` command is unavailable:

```bash
quarto pandoc "/absolute/path/to/template.docx" -t gfm --wrap=none
```

Read the complete output. Identify:

- proposed problem title and engineering setting;
- target course level and mechanics topics;
- learning progression;
- all symbols, values, and units;
- geometry, material properties, and constraints;
- assumptions and boundary conditions;
- every student question;
- every instructor solution;
- grading notes and common mistakes;
- requested or implied variants; and
- any conflict between the text and the supplied idealized image.

Do not start writing JSON until the full template has been understood.

### Inspect a comparable package

Find related packages and metadata with `rg`:

```bash
rg -n 'torsion|bending|axial|shear|thermal|compatibility' problems/*/index.qmd
rg -n '"textbookChapters"|"derivedPlaceholders"' problems/*/problem.json
```

Copy the structural pattern, not the problem-specific text or formulas.

## 6. Mechanics Accuracy Protocol

The repository targets approximately a third-year undergraduate Mechanics of Materials course. Solutions should be explicit enough to audit and should use a consistent sign convention.

### First solve independently

Before encoding an instructor answer:

1. Draw or interpret the free-body diagram.
2. State the support and member idealizations.
3. Define positive force, moment, torque, displacement, and rotation directions.
4. Convert all values to a consistent unit system.
5. Derive equilibrium and compatibility equations symbolically.
6. Substitute values only after the symbolic relationship is established.
7. Check dimensions on every major expression.
8. Calculate with more precision than will be displayed.
9. Check the result using an independent method, limit case, or back-substitution.
10. Compare with the submitted solution and reconcile differences.

### Topic-specific checks

- **Axial loading:** gross versus net area, series/parallel compatibility, tension/compression signs, and deformation contributions.
- **Shear and bearing:** single versus double shear, projected bearing area, punching perimeter, and the correct number of interfaces.
- **Bending:** support reactions, shear jumps, moment continuity, sign convention, maximum absolute moment, section properties, and stress location.
- **Torsion:** torque direction, internal-torque diagram, solid versus hollow polar moment, radians in twist, and segment-by-segment integration.
- **Thermal deformation:** free expansion, restraint stiffness, force equilibrium, compatibility, and temperature units.
- **Buckling:** end condition, effective length, radius of gyration, applicability of Euler buckling, and safety factor definition.
- **Combined loading:** stress components at the same physical point and a clearly stated failure criterion.
- **Factor of safety:** distinguish yield, ultimate, buckling, fatigue, bearing, shear, and serviceability limits. State which governs.

### Engineering plausibility

Check that dimensions, stresses, deflections, safety factors, and loads are physically plausible for the stated system. Identify limitations such as neglected dynamics, stress concentrations, fatigue, connection flexibility, local failure, or code requirements.

If a submitted solution is wrong, correct it and explain the correction in the work summary. If the intended model cannot be inferred reliably, stop and ask the user a focused question.

## 7. Naming And Identity

Use a descriptive lowercase hyphenated slug:

```text
motor-driven-shaft-torsion
precast-concrete-column-transport
```

Rules:

- The folder name and `problem.json` `slug` must match.
- The problem `id` must be unique across the catalog.
- Question IDs must be unique within the package.
- Variable keys must be unique within the package.
- Use stable, problem-specific prefixes for variables and derived values when a generic key could collide or become ambiguous, such as `robot_P`, `column_L`, or `shaft_tau_max`.
- Do not rename established keys casually; variants and placeholders may depend on them.

Search before choosing identifiers:

```bash
rg -n '"id"\s*:' problems/*/problem.json problems/*/questions.json
rg -n '"key"\s*:' problems/*/variables.json
```

## 8. Create The Package

Create a scaffold:

```bash
node scripts/new-problem.mjs "Descriptive Problem Title"
```

The scaffold is a starting point. Confirm that the final package includes all files required by the catalog validator, especially `_student-problem.qmd`, `student-packet.qmd`, and `instructor-guide.qmd`.

### `problem.json`

This file holds problem identity and shared scenario data. Follow an existing complete package and provide at least:

```text
id
slug
title
studentDocumentTitle
instructorDocumentTitle
summary
textbookChapters
derivedPlaceholders
image
idealizedImage
idealizedImageAlt
source
problemStatement
engineeringGoal
```

Requirements:

- `image` points to the industry-context image.
- `idealizedImage` points to the instructor-reference mechanics image.
- Image paths are relative to the problem package.
- `problemStatement` is the main scenario statement and appears in both outputs.
- `engineeringGoal` tells students what decision or conclusion the analysis supports.
- `derivedPlaceholders` lists every computed placeholder used in questions or solutions.
- Do not claim an external image source unless it is known and documented.

### `variables.json`

Each instructor-editable input normally includes:

```json
{
  "key": "example_P",
  "symbol": "P",
  "label": "Applied load",
  "value": 25,
  "unit": "kN",
  "min": 5,
  "max": 50,
  "step": 1
}
```

Guidance:

- Store source inputs, not values that should be calculated from other inputs.
- Use consistent units and clearly label gauge versus absolute quantities when relevant.
- Choose realistic defaults and useful Builder limits.
- Ensure every variable shown in the reference figure or assigned-data table is defined or intentionally symbolic.
- Do not silently change units between the input and solution.

### `questions.json`

Each question uses a stable ID and one of three valid sections:

```text
context
transition
analysis
```

A complete question typically contains:

```text
id
title
section
selected
tags
type
difficulty
learningObjectives
gradingNotes
commonMistakes
student
instructor
```

Question metadata remains useful for health checks and future tooling even though tags and difficulty are intentionally hidden beneath questions in visible packets.

Write questions so that:

- each prompt has one clear task or a deliberately structured set of subtasks;
- the required sign convention, assumptions, and units are available;
- students can solve the question from information already presented;
- a later question does not accidentally reveal an earlier answer;
- numerical questions have reproducible instructor solutions; and
- engineering interpretation follows calculation where appropriate.

Instructor solutions should show the governing equations, substitutions, units, result, and interpretation. Do not provide only a final number.

Use supported inline HTML such as `<em>`, `<sub>`, and `<sup>` where necessary, then verify all three output formats. Avoid complicated markup that renders in HTML but fails during Word or PDF conversion.

### `index.qmd`

This is the public library entry. Preserve the shared listing metadata pattern. Add three to five familiar `mechanics_concepts` that accurately describe what students solve, for example:

```yaml
mechanics_concepts:
  - shear
  - bending moment
  - beam reactions
  - distributed load
```

These values drive concept-based search. Use terms an instructor is likely to type, not internal labels. Also provide accurate chapter, problem type, competency, industry, difficulty, and status metadata.

The page should include the reusable context and provide links to:

- Student packet;
- Instructor packet; and
- Customize in Instructor Builder.

### `_student-problem.qmd`

This reusable content establishes the context shared by both packet types. It should contain:

1. the engineering context;
2. the industry image with useful alt text;
3. the main problem statement;
4. the engineering goal; and
5. concise system or component information needed before the questions.

Do not place instructor solutions here.

### Direct packet pages

`student-packet.qmd` and `instructor-guide.qmd` are HTML views. Follow a working recent package and call the shared packet renderer with the correct slug and packet type.

Keep direct packet frontmatter HTML-only. Do not add PDF, Jupyter, or alternate-format links. PDF and Word downloads are intentionally provided through the Instructor Builder and command-line export workflow.

### Images

Copy both supplied images into `assets/` with clear, stable names such as:

```text
assets/industry-context.png
assets/instructor-reference.png
```

Do not reference files in Downloads, Pictures, attachments, or another problem folder.

Image order in both Student and Instructor packets is:

1. industry-context image near the scenario;
2. context questions;
3. transition/modeling questions;
4. instructor-reference idealization;
5. assigned variable table; and
6. numerical mechanics analysis.

The reference idealization must be present in both Student and Instructor exports. Its purpose is to establish a common model after students have attempted their own idealization.

### Variants

Variants live under `variants/` and may define:

```text
id
title
description
selectedQuestions
variables
```

Use variants for saved assignment forms or sections. Every referenced variable key and question ID must exist. A variant must not change the physical meaning of the model without corresponding question and solution changes.

## 9. Placeholders And Dynamic Calculations

Source inputs are substituted with `{{variable_key}}`. Calculated values use derived placeholders such as `{{shaft_tau_max_MPa}}`.

### Required derived-value workflow

When an answer depends on editable variables:

1. derive and independently verify the formula;
2. choose stable, descriptive placeholder names;
3. add every derived name to `problem.json` `derivedPlaceholders`;
4. calculate the same values in the browser packet renderer;
5. calculate the same values in the Instructor Builder preview;
6. calculate the same values in the command-line export script;
7. use identical rounding and wording where practical; and
8. test non-default values, not only the supplied defaults.

The three calculation locations are:

```text
scripts/packet-renderer.js
instructor-builder.qmd
scripts/render-assignment.mjs
```

Search for `function variableMap` and a nearby analogous problem block. Keep formulas synchronized. If a formula is changed later, update all three paths in the same commit.

Do not insert an unexplained hard-coded answer into `questions.json` when the instructor can change its inputs. The displayed solution must respond to the selected variant and current values.

Use guards for invalid or zero denominators. Derived values should not display `NaN`, `Infinity`, or misleading partial answers.

## 10. Packet Separation

### Student packet contains

- scenario and industry image;
- main problem statement and goal;
- selected context questions;
- selected transition questions;
- instructor-reference idealization;
- assigned values;
- selected analysis questions; and
- no answers, grading notes, or common mistakes.

### Instructor packet contains

- the same scenario and image sequence;
- the same selected questions;
- instructor solutions;
- learning objectives where the shared design presents them;
- grading notes; and
- common mistakes.

Never implement separate student mechanics data that can drift from the instructor data. Both packet types must derive from the same package and current variable selection.

## 11. Catalog And Search Integration

Run:

```bash
node scripts/build-catalog.mjs
```

The builder validates required fields, duplicate IDs, valid question sections, image existence, packet pages, placeholders, and variant references. It also regenerates catalog and Problem Health data.

Concept search is metadata-driven. Confirm that `mechanics_concepts` appears on the rendered library card and that searches such as `shear`, `torsion`, `bending`, or `compatibility` return the new problem when appropriate.

Do not try to fix catalog output by editing `data/problem-catalog.*`. Fix the source `index.qmd` or JSON file and rebuild.

## 12. Verification Checklist

### A. Source validation

```bash
node scripts/build-catalog.mjs
git diff --check
```

Resolve catalog errors. Review warnings and either complete the metadata or explain why a warning is intentional.

### B. Targeted Quarto rendering

```bash
quarto render index.qmd
quarto render instructor-builder.qmd
quarto render problems/<slug>/index.qmd
quarto render problems/<slug>/student-packet.qmd
quarto render problems/<slug>/instructor-guide.qmd
```

Check that the direct packet pages contain no `Other Formats` PDF or Jupyter block.

### C. Generate representative exports

Use the saved variant, normally `section-a`:

```bash
node scripts/render-assignment.mjs --problem <slug> --variant section-a --type student --format qmd
node scripts/render-assignment.mjs --problem <slug> --variant section-a --type instructor --format qmd
node scripts/render-assignment.mjs --problem <slug> --variant section-a --type student --format docx
node scripts/render-assignment.mjs --problem <slug> --variant section-a --type instructor --format docx
node scripts/render-assignment.mjs --problem <slug> --variant section-a --type student --format pdf
node scripts/render-assignment.mjs --problem <slug> --variant section-a --type instructor --format pdf
```

PDF export requires TinyTeX or another TeX installation. If the environment cannot render PDF, report that limitation clearly and still verify QMD, HTML, and DOCX.

### D. Inspect generated content

Check for unresolved placeholders:

```bash
rg -n '\{\{[^}]+\}\}' exports/<slug>/
```

Inspect the student and instructor source outputs. Confirm:

- the main problem statement is present;
- the industry image is first;
- context and transition questions precede the reference idealization;
- the reference image and assigned values precede analysis questions;
- selected values appear with correct symbols and units;
- all selected questions are present and in order;
- instructor solutions correspond to the current values;
- the student output contains no instructor answer, grading note, or common-mistake labels; and
- no visible question tag line appears under the question title.

Verify DOCX image embedding:

```bash
unzip -l exports/<slug>/<variant>/<student-file>.docx | rg 'word/media'
unzip -l exports/<slug>/<variant>/<instructor-file>.docx | rg 'word/media'
```

Open or render the PDF and DOCX when tools are available. File existence alone does not prove that equations, tables, and images are correct.

### E. Browser verification

After rendering, serve the static site:

```bash
python3 -m http.server 4173 --directory _site
```

Check desktop and mobile layouts for:

- Problem Library card and concept search;
- problem landing page links;
- Student packet image sequence;
- Instructor packet image sequence and answers;
- Builder problem selection;
- variable editing;
- variant selection;
- question selection;
- student and instructor previews; and
- PDF and Word Builder download actions.

Use a different port if `4173` is occupied. Do not leave a required test server running when the task is complete.

### F. Numerical regression

Test at least two valid input sets:

1. the submitted/default values; and
2. a changed set within the allowed ranges.

Compare browser packet, Builder preview, and CLI output. Derived results must agree after the documented rounding. Recheck governing cases when values change.

## 13. Git And Publishing Discipline

Before editing:

```bash
git status --short
```

After validation:

```bash
git status --short
git diff --check
git diff --stat
```

Review every changed file. A normal new-problem commit includes:

- the new problem package and both images;
- regenerated `data/problem-catalog.*` and `data/problem-health.*`;
- shared calculation changes when derived values are needed; and
- documentation changes only when the workflow or schema changed.

Do not commit `_site/`, `.quarto/`, or local exports. Do not include unrelated user changes in a commit without understanding them.

Push only after explicit user approval. A push to `main` triggers `.github/workflows/publish.yml`, which rebuilds the catalog, renders the HTML site, and deploys GitHub Pages. Check the GitHub Actions result after pushing when access is available.

## 14. Maintaining Existing Problems

When changing variables, questions, or formulas:

- preserve stable IDs unless a migration is intentional;
- update variants that reference changed keys or question IDs;
- update all three derived-calculation paths;
- rebuild the catalog;
- regenerate Student and Instructor exports;
- verify the student/instructor separation again; and
- test at least one non-default value set.

When changing shared rendering or schema behavior, test several representative packages, including:

- a problem with only direct variables;
- a problem with many derived placeholders;
- a problem with variants;
- a problem containing equations and subscripts;
- a bending or diagram problem; and
- a torsion, axial, or compatibility problem.

Shared changes have a much larger blast radius than one package.

## 15. Common Failure Modes

### Problem does not appear in the library

- Catalog was not rebuilt.
- `index.qmd` metadata is invalid.
- Required package files are missing.
- The problem slug or ID duplicates another package.

### Concept search does not find the problem

- `mechanics_concepts` is absent, too vague, or misspelled.
- Only the title contains the term.
- The website is showing an older generated catalog.

### Images work locally but not online or in exports

- Source points outside the package.
- Filename case differs from the reference.
- The asset was not committed.
- A path is absolute or depends on the local machine.
- DOCX conversion did not embed the image.

### Reference idealization is missing

- `idealizedImage` is absent or incorrect.
- The shared packet wrapper is outdated.
- The image was placed only in an instructor-only content block.

### Answers do not update when values change

- A final number was hard-coded in `questions.json`.
- Derived formulas were added to only one rendering path.
- A placeholder is missing from `derivedPlaceholders`.
- A variant uses a wrong variable key.

### HTML works but PDF or Word fails

- Unsupported raw HTML or malformed table markup is present.
- TeX is unavailable for PDF.
- Math or units were encoded in a format the converter cannot translate.
- An image path is valid in a browser but unavailable to Pandoc.

### `Unable to parse table from raw html block`

Quarto may emit this warning when a shared page contains a raw HTML table used by browser JavaScript. Determine whether the expected HTML output is intact. Do not ignore the warning if a table is missing from packet or export output.

### Full-site render fails in a legacy notebook

Some local environments may have an inactive or incomplete Python environment for legacy notebook pages. Validate all pages touched by the change, report the unrelated limitation, and do not disguise a package failure as an environment issue.

## 16. Definition Of Done

A problem is complete only when all of the following are true:

- [ ] The Word template was fully reviewed.
- [ ] The mechanics and numerical answers were independently verified.
- [ ] Ambiguities and corrections were resolved or documented.
- [ ] The package has a unique ID and slug.
- [ ] Industry and reference images are local package assets with alt text.
- [ ] The main statement and engineering goal appear in both packet types.
- [ ] Questions follow context, transition, and analysis sections.
- [ ] The reference idealization appears in both packet types at the correct transition point.
- [ ] Variables have correct values, units, and Builder ranges.
- [ ] Dynamic answers work for changed values.
- [ ] Browser, Builder, and CLI calculations agree.
- [ ] Student output contains no solutions.
- [ ] Instructor output contains complete, auditable solutions.
- [ ] Concept metadata makes the problem discoverable.
- [ ] Catalog validation passes.
- [ ] Targeted Quarto pages render.
- [ ] Student and Instructor DOCX outputs contain their images.
- [ ] PDF outputs were checked, or the unavailable TeX environment was reported.
- [ ] No unresolved placeholders remain.
- [ ] `git diff --check` passes.
- [ ] Generated catalog files are included.
- [ ] Unrelated user changes remain untouched.
- [ ] The user receives a concise report of changes, verification, corrections, and any residual limitations.

## 17. Recommended Handoff Report

At completion, report:

```text
Problem added or changed:
Package slug:
Mechanics topics:
Files and images added:
Important assumptions:
Corrections made to submitted material:
Default numerical results independently checked:
Non-default value set checked:
Catalog and page renders:
Student DOCX/PDF status:
Instructor DOCX/PDF status:
Git commit and push status:
Remaining limitations or questions:
```

Keep this report factual. Never claim that an export, render, numerical check, commit, or push succeeded unless it was actually performed.

## 18. Fast Start For The Next Agent

For a normal new-problem request, begin with:

```bash
git status --short
quarto pandoc "/path/to/submitted-template.docx" -t gfm --wrap=none
rg --files problems | sort
rg -n '<primary-mechanics-topic>' problems/*/index.qmd
```

Then:

1. inspect the closest existing package;
2. solve and verify the submitted mechanics;
3. scaffold and complete the new package;
4. add synchronized derived calculations where required;
5. rebuild the catalog;
6. render and test all packet paths;
7. inspect the final diff; and
8. commit or push only when requested.
