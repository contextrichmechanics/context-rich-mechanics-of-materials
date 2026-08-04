# Context-Rich Mechanics of Materials

[![Publish Quarto Site](https://github.com/contextrichmechanics/context-rich-mechanics-of-materials/actions/workflows/publish.yml/badge.svg)](https://github.com/contextrichmechanics/context-rich-mechanics-of-materials/actions/workflows/publish.yml)

A searchable, modular library of real-world mechanics of materials problems for undergraduate engineering education.

**Live website:** <https://contextrichmechanics.github.io/context-rich-mechanics-of-materials/>

## Project Purpose

This project helps instructors move beyond isolated textbook calculations while retaining rigorous mechanics analysis. Each problem begins with an authentic engineering system and guides students through a common learning sequence:

1. interpret the physical context and engineering goal;
2. identify loads, supports, components, and load paths;
3. create an idealization or free-body diagram;
4. transition to a shared instructor reference model and assigned values;
5. perform mechanics calculations; and
6. interpret the result and make an engineering recommendation.

The library is organized by self-contained problem packages. Problems can be found through mechanics concepts, textbook chapters, competencies, problem types, industries, and difficulty rather than being restricted to a single chapter.

## What The System Provides

- **Problem Library:** searchable cards for browsing by concepts such as axial loading, shear, bending, torsion, deformation, compatibility, and factor of safety.
- **Student packets:** context, modeling prompts, the reference idealization, assigned values, and selected mechanics questions without solutions.
- **Instructor guides:** the same instructional sequence with representative solutions, learning objectives, grading notes, and common mistakes.
- **Instructor Builder:** selection of a problem, saved variant, editable values, and questions, followed by student and instructor previews and PDF/Word export.
- **Problem Health:** package-level checks for variables, questions, variants, metadata, and authoring completeness.
- **Authoring Guide:** detailed instructions for adding problems while preserving the shared packet structure.
- **GitHub Pages publishing:** automatic website builds whenever approved changes are pushed to `main`.

The direct student and instructor packet webpages are HTML-only. Downloadable PDF and Word assignments are produced through the Instructor Builder or the command-line export script.

## Packet Structure

Every complete problem follows the same pedagogical order:

1. **Engineering Context and Main Goal** - scenario, industry image, problem statement, and design objective.
2. **Context and Mechanics Reasoning** - system function, loads, supports, load path, likely response, and controlling parameters.
3. **Transition to a Mechanics Model** - student-generated idealization, assumptions, and analysis plan.
4. **Instructor Reference Idealization and Input Variables** - the official diagram and instructor-assigned values used for common numerical analysis.
5. **Mechanics Analysis** - equilibrium, stress, deformation, diagrams, design checks, and engineering judgment as appropriate.

The reference idealization appears in both packet types, but only after students have attempted their own model. Instructor answers never appear in the student packet.

## Repository Structure

```text
.
|-- ai_agent.md                 # AI takeover and maintenance runbook
|-- index.qmd                    # Searchable Problem Library
|-- instructor-builder.qmd       # Interactive assignment builder
|-- docs/
|   |-- authoring-guide.qmd      # Full faculty authoring workflow
|   `-- problem-health.qmd       # Package quality dashboard
|-- problems/                    # One self-contained folder per problem
|-- data/                        # Generated catalog and health data
|-- scripts/
|   |-- build-catalog.mjs        # Validation and catalog generation
|   |-- new-problem.mjs          # New-package scaffold
|   |-- packet-renderer.js       # Shared browser packet renderer
|   `-- render-assignment.mjs    # Repeatable HTML/PDF/Word exports
|-- schema/                      # Metadata guidance
|-- styles/                      # Shared website styles
|-- templates/                   # Faculty Word template and package scaffolds
|-- _quarto.yml                  # Quarto website configuration
`-- .github/workflows/           # GitHub Pages publishing workflow
```

### Problem Package

Each folder under `problems/` owns its content and assets:

```text
problems/problem-slug/
|-- problem.json          # Identity, scenario, images, and engineering goal
|-- variables.json        # Instructor-editable values and units
|-- questions.json        # Student prompts and instructor-only support
|-- index.qmd             # Public library entry and searchable metadata
|-- _student-problem.qmd  # Reusable context shown in both packet types
|-- student-packet.qmd    # HTML student packet page
|-- instructor-guide.qmd  # HTML instructor packet page
|-- assets/               # Industry and instructor-reference images
`-- variants/             # Optional saved values and question selections
```

This ownership model allows new problems to be added without changing the Instructor Builder itself.

## Quick Start

### Requirements

- [Quarto](https://quarto.org/)
- Node.js 20 or later
- TinyTeX or another TeX distribution only when command-line PDF export is required

No npm package installation is required for the current catalog and export scripts.

### Run Locally

```bash
git clone https://github.com/contextrichmechanics/context-rich-mechanics-of-materials.git
cd context-rich-mechanics-of-materials
node scripts/build-catalog.mjs
quarto preview
```

Open the local URL printed by Quarto. Changes to Quarto pages are rebuilt while preview is running.

To create a static website build:

```bash
node scripts/build-catalog.mjs
quarto render --to html
```

The generated site is written to `_site/`.

## Faculty Workflow

1. Open the **Problem Library** and search by mechanics concept, chapter, industry, or keyword.
2. Open a problem to review its context, student packet, and instructor guide.
3. Open the **Instructor Builder** and select the problem.
4. Choose a saved variant or enter new values.
5. Select the questions needed for the assignment.
6. Preview the student and instructor versions.
7. Export the student assignment and instructor solution as PDF or Word files.

The Builder performs the value substitution and uses the same problem images and question sequence in both outputs.

## Faculty Authoring Template

Faculty creating a new problem should begin with the [MEEN 305 Context-Rich Solid Mechanics Faculty Template](templates/MEEN_305_Context_Rich_Solid_Mechanics_Template_Faculty_Corrected.docx). Download the Word document, select the question modules appropriate to the intended mechanics topic, and complete the problem context, variables, questions, and instructor solutions.

The document contains placeholders for:

- the real or realistic industry-context image;
- the student-generated mechanics model or free-body diagram; and
- the approved instructor-reference idealization used for the numerical analysis.

When submitting a completed problem for addition to this repository, provide the completed Word file, the industry-context image, and the instructor-reference image. The Word template is the faculty authoring format; it is converted into the modular Quarto/JSON package and its mechanics solutions are independently checked before publication.

## Add A New Problem

AI agents and future maintainers should begin with the detailed [AI Agent Project Guide](ai_agent.md). It documents the complete intake, mechanics verification, package construction, synchronized calculation, export testing, and publishing workflow for taking a submitted instructor template and images into the live system.

Start from the package scaffold:

```bash
node scripts/new-problem.mjs "Pressure Vessel Tank"
```

Then complete the generated folder under `problems/`:

1. Add an industry/context image and an instructor reference idealization under `assets/`.
2. Complete `problem.json`, including the image paths, main statement, and engineering goal.
3. Define editable values in `variables.json`.
4. Add context, transition, and analysis questions in `questions.json`.
5. Complete `index.qmd`, including three to five familiar `mechanics_concepts` for library search.
6. Add or adapt the standard `_student-problem.qmd`, `student-packet.qmd`, and `instructor-guide.qmd` files.
7. Add optional variants under `variants/`.
8. Rebuild and validate the catalog.

```bash
node scripts/build-catalog.mjs
quarto render index.qmd
quarto render instructor-builder.qmd
```

See the [Problem Authoring Guide](docs/authoring-guide.qmd) for schemas, image placement, packet sections, placeholders, variants, and recommended writing patterns.

## Catalog Validation

The catalog builder checks for common package errors before updating shared data:

- missing required fields or packet pages;
- missing industry or reference images;
- duplicate problem IDs, variable keys, or question IDs;
- unknown placeholders such as `{{load}}` when no matching variable or derived value exists;
- variants that reference unknown variables or questions; and
- incomplete question metadata reported through Problem Health.

Run validation after every problem change:

```bash
node scripts/build-catalog.mjs
```

The script regenerates:

```text
data/problem-catalog.json
data/problem-catalog.js
data/problem-health.json
data/problem-health.js
```

These are generated files. Update the source problem package and rerun the script instead of editing catalog files manually.

## Command-Line Assignment Export

For repeatable or automated exports, use `render-assignment.mjs`:

```bash
node scripts/render-assignment.mjs \
  --problem jib-crane-battery-pack \
  --variant section-a \
  --type student \
  --format docx
```

Supported assignment types:

```text
student
instructor
```

Supported formats:

```text
html
doc
qmd
docx
pdf
```

Outputs are written under `exports/problem-slug/variant-id/`. The `docx` and `pdf` options require Quarto; PDF additionally requires a working TeX installation.

## Publishing

The [Publish Quarto Site workflow](.github/workflows/publish.yml) runs on every push to `main`:

1. check out the repository;
2. set up Node, Python, and Quarto;
3. rebuild the problem catalog;
4. render the website as HTML; and
5. deploy `_site/` to GitHub Pages.

Review the workflow in the repository's **Actions** tab when a site update does not appear or a build fails.

## Project Documentation

- [AI Agent Project Guide](ai_agent.md)
- [Problem Authoring Guide](docs/authoring-guide.qmd)
- [Problem Health Page](docs/problem-health.qmd)
- [Metadata Guide](schema/metadata-guide.yml)
- [Instructor Builder](instructor-builder.qmd)
- [GitHub Pages Workflow](.github/workflows/publish.yml)

## Engineering Scope

The problems are instructional models. Each package states its assumptions and limitations, but generated results are not a substitute for applicable design codes, detailed connection analysis, dynamic loading, fatigue assessment, testing, or professional engineering review.
