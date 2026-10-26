import argparse
from collections import Counter
import hashlib
import json
from pathlib import Path
import re
from zipfile import ZipFile
import xml.etree.ElementTree as ET

from pypdf import PdfReader

root = Path(__file__).resolve().parents[1]
folder = root / "_site/exports/hydraulic-press-punching-shear/default"
assets = root / "problems/hydraulic-press-punching-shear/assets"
hash_bytes = lambda value: hashlib.sha256(value).hexdigest()
expected_images = {
    hash_bytes((assets / "press-industry-context.png").read_bytes()),
    hash_bytes((assets / "press-student-geometry.png").read_bytes()),
}
teacher_image = hash_bytes((assets / "press-instructor-reference.png").read_bytes())
results = {}
for audience in ["student", "instructor"]:
    instructor = audience == "instructor"
    stem = "hydraulic-press-punching-shear-default-" + audience
    with ZipFile(folder / (stem + ".docx")) as archive:
        images = {
            hash_bytes(archive.read(name))
            for name in archive.namelist()
            if name.startswith("word/media/")
        }
        assert images == expected_images | ({teacher_image} if instructor else set())
        tree = ET.fromstring(archive.read("word/document.xml"))
        text = " ".join(
            node.text or ""
            for node in tree.iter("{http://schemas.openxmlformats.org/wordprocessingml/2006/main}t")
        )
        assert text.count("Representative Instructor Answer") == (19 if instructor else 0)
        assert "Limited engineering recommendation" in text
        assert "{{" not in text
        assert ("25.46" in text) == instructor
    reader = PdfReader(folder / (stem + ".pdf"))
    page_text = [page.extract_text() or "" for page in reader.pages]
    pdf_text = "\n".join(page_text)
    numbers = Counter(map(int, re.findall(r"(?m)^(1[0-9]|[1-9])\.\s", pdf_text)))
    assert numbers == Counter(range(1, 20)), numbers
    assert pdf_text.count("Representative Instructor Answer") == (19 if instructor else 0)
    assert ("25.46" in pdf_text) == instructor
    assert ("1,570.80" in pdf_text) == instructor
    assert "d = 50 mm" in pdf_text and "s = 60 mm" in pdf_text
    assert len(page_text[-1].strip()) > 200, "Nearly empty final page"
    assert "\ufffd" not in pdf_text
    results[audience] = {
        "pdf_pages": len(reader.pages),
        "question_count": sum(numbers.values()),
        "instructor_answers": 19 if instructor else 0,
        "docx_embedded_images": len(images),
        "docx_image_hash_separation": "passed",
        "docx_layout": "not assessed by this structural test",
        "structural_checks": "passed",
    }

parser = argparse.ArgumentParser()
parser.add_argument("--report", type=Path)
args = parser.parse_args()
if args.report:
    args.report.parent.mkdir(parents=True, exist_ok=True)
    args.report.write_text(json.dumps(results, indent=2) + "\n", encoding="utf-8")
print(json.dumps(results, indent=2))
