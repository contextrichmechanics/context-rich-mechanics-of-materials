from pathlib import Path
import shutil
import json
import re

# ------------------------------------------------------------
# Project locations
# ------------------------------------------------------------
parent = Path.cwd()

src = parent / "context-rich-mos-quarto-v2"
dst = parent / "context-rich-mos-quarto-v3"

if not src.exists():
    raise FileNotFoundError(
        f"Could not find:\n{src}\n\n"
        "Run this script from the folder containing "
        "'context-rich-mos-quarto-v2'."
    )

if dst.exists():
    shutil.rmtree(dst)

shutil.copytree(src, dst)

print(f"Copied project:\n{src}\n->\n{dst}")

# ------------------------------------------------------------
# Remove generated and machine-specific folders
# ------------------------------------------------------------
for name in [".venv", ".quarto", "_site", "__MACOSX"]:
    path = dst / name
    if path.exists():
        shutil.rmtree(path)
        print(f"Removed {path}")

for path in dst.rglob("._*"):
    if path.is_file():
        path.unlink()

# ------------------------------------------------------------
# Fix notebook YAML parsing error
#
# A markdown cell beginning with --- can be interpreted by
# Quarto as YAML front matter.
# ------------------------------------------------------------
for notebook_path in dst.rglob("*.ipynb"):
    with notebook_path.open("r", encoding="utf-8") as file:
        notebook = json.load(file)

    changed = False

    for cell in notebook.get("cells", []):
        if cell.get("cell_type") != "markdown":
            continue

        source = "".join(cell.get("source", []))

        corrected = re.sub(
            r"^\s*---\s*\n",
            "***\n",
            source,
            count=1,
        )

        if corrected != source:
            cell["source"] = corrected.splitlines(keepends=True)
            changed = True

    if changed:
        with notebook_path.open("w", encoding="utf-8") as file:
            json.dump(
                notebook,
                file,
                indent=1,
                ensure_ascii=False,
            )
            file.write("\n")

        print(f"Fixed notebook YAML issue: {notebook_path}")

# ------------------------------------------------------------
# Locate jib-crane problem and 2D image
# ------------------------------------------------------------
problem = (
    dst
    / "problems"
    / "jib-crane-battery-pack"
)

assets = problem / "assets"

if not problem.exists():
    raise FileNotFoundError(
        f"Problem folder not found:\n{problem}"
    )

image_candidates = [
    path
    for path in assets.iterdir()
    if path.is_file()
    and "2d" in path.stem.lower()
    and path.suffix.lower() in {
        ".png",
        ".jpg",
        ".jpeg",
        ".webp",
    }
]

if not image_candidates:
    raise FileNotFoundError(
        "Could not find the 2D idealized image.\n"
        "Make sure its filename contains '2d' and that it is inside:\n"
        f"{assets}"
    )

image_path = image_candidates[0]
image_name = image_path.name

print(f"Using 2D image: {image_name}")

# ------------------------------------------------------------
# Add image to instructor guide
# ------------------------------------------------------------
instructor_guide = problem / "instructor-guide.qmd"

if instructor_guide.exists():
    text = instructor_guide.read_text(encoding="utf-8")

    image_block = f"""
![Instructor reference: two-dimensional idealized side view of the wall-mounted swing-jib crane.](assets/{image_name}){{fig-alt="Two-dimensional idealized side view showing the wall supports, horizontal boom, diagonal brace, trolley position, hook height, and battery-pack mass." width=100%}}

"""

    heading_candidates = [
        "# 2D Idealization — Representative Reasoning\n\n",
        "# 2D Idealization\n\n",
        "## 2D Idealization\n\n",
        "# Structural Idealization\n\n",
    ]

    if image_name not in text:
        inserted = False

        for heading in heading_candidates:
            if heading in text:
                text = text.replace(
                    heading,
                    heading + image_block,
                    1,
                )
                inserted = True
                break

        if not inserted:
            text += "\n\n# Reference 2D Idealized Model\n\n"
            text += image_block

        instructor_guide.write_text(
            text,
            encoding="utf-8",
        )

        print("Added 2D image to instructor-guide.qmd")

# ------------------------------------------------------------
# Add image to calculations file
# ------------------------------------------------------------
calculations = problem / "calculations.qmd"

if calculations.exists():
    text = calculations.read_text(encoding="utf-8")

    image_section = f"""
# Reference 2D Structural Model

The following idealized side view defines the geometry and variables used in the numerical analysis.

![Two-dimensional idealized swing-jib crane model used for calculations.](assets/{image_name}){{fig-alt="Idealized swing-jib crane showing geometric variables, wall supports, boom, brace, trolley, and battery-pack mass." width=100%}}

"""

    if image_name not in text:
        purpose_heading = "# Purpose\n\n"

        if purpose_heading in text:
            text = text.replace(
                purpose_heading,
                image_section + purpose_heading,
                1,
            )
        else:
            # Insert after YAML front matter if present
            if text.startswith("---"):
                parts = text.split("---", 2)

                if len(parts) == 3:
                    text = (
                        "---"
                        + parts[1]
                        + "---\n\n"
                        + image_section
                        + parts[2].lstrip()
                    )
                else:
                    text = image_section + text
            else:
                text = image_section + text

        calculations.write_text(
            text,
            encoding="utf-8",
        )

        print("Added 2D image to calculations.qmd")

# ------------------------------------------------------------
# Add instructor-release note to student problem
# ------------------------------------------------------------
student_problem = problem / "_student-problem.qmd"

if student_problem.exists():
    text = student_problem.read_text(encoding="utf-8")

    release_note = """
::: {.callout-note}
## Instructor release

First submit your own 2D idealization. The instructor may then release the reference idealized model for the numerical-analysis phase.
:::

"""

    if "## Instructor release" not in text:
        fbd_heading = "# Free-Body Diagram\n"

        if fbd_heading in text:
            text = text.replace(
                fbd_heading,
                release_note + fbd_heading,
                1,
            )
        else:
            text += "\n\n" + release_note

        student_problem.write_text(
            text,
            encoding="utf-8",
        )

        print("Added instructor-release note")

# ------------------------------------------------------------
# Update version
# ------------------------------------------------------------
index_file = problem / "index.qmd"

if index_file.exists():
    text = index_file.read_text(encoding="utf-8")

    text = re.sub(
        r'version:\s*"[^"]+"',
        'version: "0.3.0"',
        text,
        count=1,
    )

    index_file.write_text(
        text,
        encoding="utf-8",
    )

# ------------------------------------------------------------
# Create .gitignore
# ------------------------------------------------------------
gitignore = dst / ".gitignore"

gitignore.write_text(
    """.venv/
.quarto/
_site/
.ipynb_checkpoints/
.DS_Store
__MACOSX/
""",
    encoding="utf-8",
)

print("\nV3 project created successfully:")
print(dst)