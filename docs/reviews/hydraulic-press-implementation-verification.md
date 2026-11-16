# Hydraulic press correction: implementation and verification

Date: 2026-10-25. Implementation contract: [approved correction specification](hydraulic-press-correction-specification.md), including the additional implementation review decisions.

Working copy: C:\Sumanth\Questions of SOM\Github\context-rich-mechanics-quality-review

Branch: quality-review/engineering-review-2026-10-25

Unchanged HEAD: 772817e496ac66476fce7464dcceebde31aa2588

## Implemented behavior

The original press fixture application, two separate support blocks, intact plate, and seven baseline inputs are retained. The statement explicitly defines b as the horizontal plate extent, requires d < s < b, stipulates sufficient plate/block depth beyond the complete circle, full circular ram contact, and a free lower face of the imaginary core. No numerical depth or material grade has been invented.

The selected cylindrical wall is a hypothetical internal analysis surface. Vertical equilibrium of its imaginary core permits a nominal shear resultant P; it does not demonstrate a cylindrical fracture mechanism, a uniform actual traction distribution, or a manufacturing cutting force. Mean contact pressure uses the flat circular ram face. The two illustrative criteria establish only the outcomes of these two assigned comparisons.

All 19 questions and representative instructor answers follow the approved progression. q11 addresses core equilibrium; q17 distinguishes the larger stress magnitude from the higher normalized utilization; q18 explicitly limits the effect of increased thickness and does not imply complete fixture safety. There is no question consolidation.

A press-specific shared model supplies the complete 20-placeholder registry, raw comparisons, ties, criteria assessment, reserves, utilization, current-input dimensions, and prescribed display precision. Explicit invalid values are rejected before calculations. Omitted override keys inherit defaults; explicit null/blank values do not. All seven effective inputs must be finite, positive, within their declared ranges, and geometrically compatible. Direct and Builder invalid states clear old solutions; Builder disables export until repaired. A valid criterion exceedance remains exportable.

Direct pages, Builder previews/exports, and CLI HTML/QMD use geometry-first order: supplied context/assumptions, unsolved schematic and current data, q1–q10, instructor reference for instructor outputs only, then q11–q19. q8 has an 80 mm model-sketch space. The shared helper is included as a Quarto site resource. No publishing workflow changed.

## Baseline calculations before and after

All seven inputs are unchanged: P = 40 kN; d = 50 mm; t = 10 mm; s = 60 mm; b = 120 mm; illustrative nominal-shear criterion = 80 MPa; illustrative contact-pressure criterion = 120 MPa.

| Quantity | Former model | Implemented nominal model |
|---|---:|---:|
| Prescribed load P | 40,000 N | 40,000 N |
| Shear perimeter used | 2d = 100 mm | πd = 157.08 mm |
| Shear area | 2dt = 1,000.00 mm² | πdt = 1,570.80 mm² |
| Contact area | πd²/4 = 1,963.50 mm² | πd²/4 = 1,963.50 mm² |
| Nominal shear demand | 40.00 MPa | 25.46 MPa |
| Mean contact pressure | 20.37 MPa | 20.37 MPa |
| Shear allowable/demand ratio | 2.00, formerly mislabeled FOS | Allowable reserve 3.14 |
| Contact allowable/demand ratio | 5.89, formerly mislabeled FOS | Allowable reserve 5.89 |
| Shear utilization | 0.5000 = 50.00% | 0.3183 = 31.83% |
| Contact utilization | 0.1698 = 16.98% | 0.1698 = 16.98% |
| Minimum allowable reserve | 2.00 | 3.14 |
| Maximum utilization | 0.5000 | 0.3183 |

Independent substitutions (N, mm, MPa):

- A_s = π(50)(10) = 1570.7963267948965 mm².
- A_b = π(50)²/4 = 1963.4954084936207 mm².
- τ_nom = 40000/A_s = 25.464790894703253 MPa.
- σ_b = 40000/A_b = 20.371832715762604 MPa.
- R_s = 80/τ_nom = 3.141592653589793; U_s = τ_nom/80 = 0.3183098861837907.
- R_b = 120/σ_b = 5.890486225480862; U_b = σ_b/120 = 0.169765272631355.
- Each horizontal ram-edge offset is (60−50)/2 = 5.00 mm; each supported outer strip is (120−60)/2 = 30.00 mm.

Both illustrative criteria are met; the nominal shear check has the larger utilization. Raw values determine these statements; rounded values are used only for display. Areas, perimeter, stresses, reserves, gap and strip lengths use two decimals; utilizations use four; percentages use two; converted force uses whole N.

## Figures and audience separation

The student SVG master contains unsolved front/plan geometry with P, d, t, s, b, separate blocks, the circular footprint, and the qualitative depth condition. It contains no completed wall construction, force-balance solution, area formulas, stress values, or criterion results.

The instructor master adds the complete hypothetical cylindrical wall in the intact plate, the full circular contact disk and correct leader, and an isolated analytical core showing P balanced by the wall resultant. Ram edges and block inner edges are distinct. No annular die, detached slug, or actual cut is represented. Both drawings say schematic/not to scale. Current P, d, t, s, b values are displayed alongside each active drawing, rather than baked baseline numbers that could contradict edited inputs.

PNG delivery sizes are 2100 × 1230 (student) and 2100 × 1620 (instructor). Rasterizing the current SVGs and comparing decoded pixels with the PNGs passed for both. Both masters and PNGs were inspected at original resolution, and the figures were inspected in the exported PDFs.

Actual HTML/Builder checks and DOCX image hashes confirm separation: student outputs contain the preserved context image and unsolved geometry only; instructor outputs additionally contain the corrected instructor reference. Student content has zero representative answers; instructor content has 19. The instructor reference follows q10. Historical images remain on disk unchanged but the obsolete instructor image is no longer active.

## Verification results

| Check | Result and scope |
|---|---|
| Source catalog generation and validation | Passed; 51 problem packages/catalog entries remain. Corrected defaults and section-a validate. |
| Automated numerical/content/regression suite | 81 passed; 0 failed, skipped, or cancelled. |
| Independent numerical targets | All 11 specified cases passed through direct HTML, Builder HTML, CLI HTML and CLI QMD; independent SI-unit stress oracle and reserve/utilization/layout identities checked. |
| Invalid data, geometry and stale output | Passed for all seven effective inputs, missing/blank/null/nonfinite/type/range errors and all five specified invalid geometry combinations; recovery re-enables Builder exports. |
| Ties and criterion boundaries | Passed, including exact U = 1 and U = 1 ± 10⁻⁶ comparator cases with identical rounded display, and changed-input stress/utilization ties. |
| Default and section-a | All 19 questions preserved, and identical instructor outputs for their identical inputs across all four routes. |
| Unrelated-package regression | All 50 catalog entries unchanged; 204 default/variant/audience cases, comprising 816 normalized route outputs, match hashes captured before correction. These are rendering-source regressions, not claims of visually inspecting unrelated PDFs. |
| Actual headless Chrome QA | Six check groups passed: CLI student/instructor, direct student/instructor, Builder initial, Builder edited inputs/validation/recovery/embedded export. Figures loaded, questions/answers ordered, dimension keys current, and no page errors. |
| Quarto website HTML | Targeted press index/student/instructor pages and Builder rendered successfully with --no-clean. Actual rendered pages exercised in Chrome. |
| CLI HTML, HTML-based DOC, QMD | Generated for both audiences; HTML exercised in Chrome and QMD/content checked. HTML-based DOC uses the same content as HTML; native Word pagination of that format is not verified. |
| PDF export | Passed with Quarto 1.10.19 and bundled Typst 0.15.1; student 6 pages and instructor 11 pages. Every final page visually inspected, including q8 sketch space, all questions, figures, equations, units and final recommendation. Given Data continues across a page boundary with column headings repeated. |
| DOCX export | Both generated successfully. ZIP/XML content and embedded-image hash checks passed: 2 student images, 3 instructor images; 0/19 representative answers and no unresolved placeholders. Visual pagination remains unverified; see limitations below. |
| SVG/PNG consistency | Both decoded-pixel comparisons passed. |
| JavaScript syntax and Git whitespace | Passed; Git reports only its normal LF/CRLF conversion notices. |

> Historical artifact note: The following QA files and generated-output directories were generated during local verification and are not included in the committed repository. Their original paths are retained as historical provenance only.

Results are in unit-tests.txt (historical path: `../../exports/hydraulic-press-review/unit-tests.txt`), browser-qa.json (historical path: `../../exports/hydraulic-press-review/browser-qa.json`), and artifact-qa.json (historical path: `../../exports/hydraulic-press-review/artifact-qa.json`). Final PDF page images/contact sheets are in exports/hydraulic-press-review/pdf-pages-final; the earlier pdf-pages folder is superseded QA output and was preserved.

### Reproduction

From this clone, with Node, Quarto and Python available on PATH:

```powershell
node scripts/build-catalog.mjs
node --test tests/hydraulic-press.test.mjs
quarto render problems/hydraulic-press-punching-shear/index.qmd --to html --no-clean
quarto render problems/hydraulic-press-punching-shear/student-packet.qmd --to html --no-clean
quarto render problems/hydraulic-press-punching-shear/instructor-guide.qmd --to html --no-clean
quarto render instructor-builder.qmd --to html --no-clean
```

For each audience (student or instructor), run scripts/render-assignment.mjs with --problem hydraulic-press-punching-shear --type AUDIENCE and --format html, doc, qmd, docx, or pdf. The press-only CLI PDF route uses bundled Typst; other packages retain their previous PDF backend. The browser script requires Playwright resolvable by Node and CHROME_PATH if an installed Chrome executable is used. Python artifact checks require pypdf and the generated default DOCX/PDF files:

```powershell
node tests/hydraulic-press-browser.mjs
python -B tests/hydraulic-press-artifacts.py --report exports/hydraulic-press-review/artifact-qa.json
```

Standalone HTML, HTML-based DOC and QMD are in exports/hydraulic-press-punching-shear/default/. Quarto DOCX/PDF outputs are in _site/exports/hydraulic-press-punching-shear/default/ with matching hydraulic-press-punching-shear-default-student/instructor names. These generated/QA folders are Git-ignored; nothing has been published.

## Exact source-file manifest

18 tracked files modified:

- [_quarto.yml](../../_quarto.yml)
- [data/problem-catalog.js](../../data/problem-catalog.js)
- [data/problem-catalog.json](../../data/problem-catalog.json)
- [data/problem-health.js](../../data/problem-health.js)
- [data/problem-health.json](../../data/problem-health.json)
- [docs/authoring-guide.qmd](../../docs/authoring-guide.qmd)
- [instructor-builder.qmd](../../instructor-builder.qmd)
- [problems/hydraulic-press-punching-shear/_student-problem.qmd](../../problems/hydraulic-press-punching-shear/_student-problem.qmd)
- [problems/hydraulic-press-punching-shear/index.qmd](../../problems/hydraulic-press-punching-shear/index.qmd)
- [problems/hydraulic-press-punching-shear/instructor-guide.qmd](../../problems/hydraulic-press-punching-shear/instructor-guide.qmd)
- [problems/hydraulic-press-punching-shear/problem.json](../../problems/hydraulic-press-punching-shear/problem.json)
- [problems/hydraulic-press-punching-shear/questions.json](../../problems/hydraulic-press-punching-shear/questions.json)
- [problems/hydraulic-press-punching-shear/student-packet.qmd](../../problems/hydraulic-press-punching-shear/student-packet.qmd)
- [problems/hydraulic-press-punching-shear/variables.json](../../problems/hydraulic-press-punching-shear/variables.json)
- [problems/hydraulic-press-punching-shear/variants/section-a.json](../../problems/hydraulic-press-punching-shear/variants/section-a.json)
- [scripts/build-catalog.mjs](../../scripts/build-catalog.mjs)
- [scripts/packet-renderer.js](../../scripts/packet-renderer.js)
- [scripts/render-assignment.mjs](../../scripts/render-assignment.mjs)

11 files created by this implementation (including this report):

- [problems/hydraulic-press-punching-shear/assets/press-student-geometry.svg](../../problems/hydraulic-press-punching-shear/assets/press-student-geometry.svg)
- [problems/hydraulic-press-punching-shear/assets/press-student-geometry.png](../../problems/hydraulic-press-punching-shear/assets/press-student-geometry.png)
- [problems/hydraulic-press-punching-shear/assets/press-instructor-reference.svg](../../problems/hydraulic-press-punching-shear/assets/press-instructor-reference.svg)
- [problems/hydraulic-press-punching-shear/assets/press-instructor-reference.png](../../problems/hydraulic-press-punching-shear/assets/press-instructor-reference.png)
- [scripts/press-fixture-model.js](../../scripts/press-fixture-model.js)
- [tests/helpers/packet-harness.mjs](../../tests/helpers/packet-harness.mjs)
- [tests/fixtures/hydraulic-unrelated-render-hashes.json](../../tests/fixtures/hydraulic-unrelated-render-hashes.json)
- [tests/hydraulic-press.test.mjs](../../tests/hydraulic-press.test.mjs)
- [tests/hydraulic-press-browser.mjs](../../tests/hydraulic-press-browser.mjs)
- [tests/hydraulic-press-artifacts.py](../../tests/hydraulic-press-artifacts.py)
- [docs/reviews/hydraulic-press-implementation-verification.md](../../docs/reviews/hydraulic-press-implementation-verification.md)

The existing detailed review and correction specification were already untracked at the start; they were not created or edited by this implementation. Generated catalog/health artifacts are included in the tracked list above. Other generated export/site/QA files are confined to the ignored folders described above.

## Preservation and Git state

A pre-implementation SHA-256 snapshot covered 984 existing non-.git files. Final comparison found 966 unchanged, the 18 intended tracked modifications listed above, and no missing files. All 567 pre-existing files inside unrelated problem packages are unchanged. Both historical press PNGs, both review documents, graph outputs and .github/workflows/publish.yml are unchanged. No commands wrote to the original repository or changed another worktree.

Git remains on the branch/HEAD above with no staged changes. Expected final status is 18 modified tracked files and 13 untracked files: the 11 new implementation files plus the two pre-existing review documents. No reset, clean, forced checkout, commit, push, merge or publication was performed.

## Remaining limits and review items

1. DOCX visual layout is unverified. The packaged renderer could not complete because LibreOffice/soffice is unavailable (the first attempt also reported missing page size). A separate hidden Word automation attempt did not complete; only the helper processes created for that attempt were stopped. No successful native DOCX visual review is claimed. Generated DOCX structure/content and all PDF pages were checked independently.
2. The graphify CLI/Python module is unavailable. The required graphify update . was attempted but could not run; existing graph outputs are unchanged and may be stale. Refresh them when the tool is available.
3. The approved real-engineering limitations remain: seven assigned values and illustrative criteria lack documented industrial/material provenance; maintained circular contact and a free core underside are stipulated; bending, deflection, indentation, contact redistribution, support/ram/base capacity and actual failure mode remain unverified. No fundamental inconsistency requiring a new model was found within the approved nominal exercise.
