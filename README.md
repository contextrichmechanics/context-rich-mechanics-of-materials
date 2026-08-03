# Context-Rich Mechanics of Materials — Quarto Starter

This project is a modular, searchable problem library.

## Recommended architecture

Organize the repository physically by **problem package**, not by chapter:

```text
problems/
  unique-problem-slug/
    index.qmd
    _scenario-and-q1.qmd
    student-packet.qmd
    calculations.qmd
    instructor-notes.qmd
    assets/
```

Use YAML metadata to classify each problem by multiple facets:

- course topic;
- problem type;
- competency;
- industry;
- difficulty;
- status.

This avoids forcing a problem such as a jib crane into only one chapter. The same
scenario may involve statics, pin shear, axial loading, bending, buckling,
deflection, fatigue, and design.

## Render the searchable website

```bash
quarto preview
```

or

```bash
quarto render
```

## Render a student packet

From the project root:

```bash
quarto render problems/jib-crane-battery-pack/student-packet.qmd --to html
quarto render problems/jib-crane-battery-pack/student-packet.qmd --to pdf
quarto render problems/jib-crane-battery-pack/student-packet.qmd --to ipynb
```

## Render executable calculations

```bash
quarto render problems/jib-crane-battery-pack/calculations.qmd --to html
quarto render problems/jib-crane-battery-pack/calculations.qmd --to pdf
quarto render problems/jib-crane-battery-pack/calculations.qmd --to ipynb
```

PDF rendering requires a TeX distribution. Quarto can install TinyTeX:

```bash
quarto install tinytex
```

## Adding a new problem

1. Copy `templates/problem-package/` into a new folder under `problems/`.
2. Rename the folder with a stable slug, such as `pressure-vessel-tank`.
3. Assign a unique `id` in `problem.json` and `problem_id` in `index.qmd`.
4. Add the real-world image under that problem folder's `assets/`.
5. Complete the listing metadata in `index.qmd` using `schema/metadata-guide.yml`.
6. Complete `problem.json`, `variables.json`, `questions.json`, and optional `variants/*.json`.
7. Rebuild the catalog and render the site.

See `docs/authoring-guide.qmd` for the full authoring workflow.

You can also scaffold a package:

```bash
node scripts/new-problem.mjs "Pressure Vessel Tank"
```

## Modular problem packages for the Instructor Builder

For scalable authoring, each problem should also provide a small data package:

```text
problems/problem-slug/
  problem.json      # title, image, main statement, engineering goal
  variables.json    # instructor-editable values
  questions.json    # selectable student prompts, tags, and instructor answers
  variants/         # optional saved values and question selections
  index.qmd         # public library entry
  assets/           # images owned by this problem
```

To create a new package, copy `templates/problem-package/` into `problems/`,
rename the folder, and edit the JSON files. The problem image path in
`problem.json` should point to a file inside that problem's `assets/` folder.

After editing or adding a problem package, rebuild the Instructor Builder catalog:

```bash
node scripts/build-catalog.mjs
quarto render instructor-builder.qmd
quarto render index.qmd
```

The generated catalog files are:

```text
data/problem-catalog.json
data/problem-catalog.js
data/problem-health.json
data/problem-health.js
```

The Instructor Builder reads those generated catalog files, so professors can add
new problem folders without editing the builder code.

The catalog builder validates required fields, missing images, duplicate IDs,
unknown placeholders, and variant references before writing the catalog.

Repeatable assignment exports can be generated from the catalog:

```bash
node scripts/render-assignment.mjs --problem jib-crane-battery-pack --variant section-a --type student --format html
```


## Version 0.2 additions

The jib-crane package now contains:

- `_student-problem.qmd`: reusable student-facing scenario and questions;
- `student-packet.qmd`: HTML/PDF/notebook output source;
- `instructor-guide.qmd`: representative answers and assessment guidance;
- `calculations.qmd`: executable computation module.

Render examples:

```bash
quarto render problems/jib-crane-battery-pack/student-packet.qmd --to html
quarto render problems/jib-crane-battery-pack/student-packet.qmd --to pdf
quarto render problems/jib-crane-battery-pack/student-packet.qmd --to ipynb

quarto render problems/jib-crane-battery-pack/instructor-guide.qmd --to html
quarto render problems/jib-crane-battery-pack/instructor-guide.qmd --to pdf
```
