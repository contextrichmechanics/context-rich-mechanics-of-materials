"""Validate actual MOS-JIB-001 native exports; never depends on review documents."""
from pathlib import Path
from pypdf import PdfReader
from PIL import Image
import argparse,hashlib,io,json,re,zipfile,xml.etree.ElementTree as ET
parser=argparse.ArgumentParser()
parser.add_argument("--root",type=Path,default=Path(__file__).resolve().parents[1])
parser.add_argument("--render-pdf",action="store_true")
args=parser.parse_args();root=args.root.resolve()
out=root/"exports/jib-review/native-inspection";out.mkdir(parents=True,exist_ok=True)
pkg=root/"problems/jib-crane-battery-pack";asset=pkg/"assets"
sha=lambda b:hashlib.sha256(b).hexdigest()
pixels=lambda b:sha(Image.open(io.BytesIO(b)).convert("RGB").tobytes())
source_names=["jib-crane-industry.png","jib-crane-student-common-model.png","jib-crane-instructor-free-bodies.png"]
source_bytes={n:(asset/n).read_bytes() for n in source_names}
source_sha={n:sha(b) for n,b in source_bytes.items()}
source_pixels={n:pixels(b) for n,b in source_bytes.items()}
records=[]
for variant,count in [("default",12),("exam-version",6)]:
 expected_labels=(["Q1","Q2","Q3","Q4","Q5","Q6"] if count==12 else [])+["I1","M1","M2","M3","M4","M5"]
 for audience in ["student","instructor"]:
  instructor=audience=="instructor";stem="jib-crane-battery-pack-"+variant+"-"+audience
  directory=root/"_site/exports/jib-crane-battery-pack"/variant
  docx=directory/(stem+".docx");pdf=directory/(stem+".pdf")
  with zipfile.ZipFile(docx) as z:
   xml=z.read("word/document.xml");tree=ET.fromstring(xml)
   ns={"w":"http://schemas.openxmlformats.org/wordprocessingml/2006/main","m":"http://schemas.openxmlformats.org/officeDocument/2006/math"}
   # Paragraph content and OMML structures are checked independently.
   word_text=lambda p: "".join(t.text or "" for t in p.findall(".//w:t",ns))
   paragraphs=[word_text(p) for p in tree.findall(".//w:p",ns)]
   labels=[]
   for p in tree.findall(".//w:p",ns):
    text=word_text(p)
    if re.match(r"^(?:Q[1-6]|I1|M[1-5])\s+[\u2014-]",text):labels.append(text.split()[0])
   assert labels==expected_labels,(stem,labels)
   text="\n".join(paragraphs)
   assert text.count("Representative Instructor Answer")== (count if instructor else 0),stem
   assert text.index("Independent idealization")<text.index("Common model and assigned data")<text.index("Numerical analysis and bounded assessment"),stem
   assert 'w:line="4535"' in xml.decode(),stem+" I1 workspace"
   assert len(tree.findall(".//m:oMath",ns))>=2,stem+" native equations"
   assert "underbrace" not in text and "\\mathrm" not in text,stem+" raw TeX fallback"
   media=[z.read(n) for n in z.namelist() if n.startswith("word/media/")]
   hashes={sha(b) for b in media}
   for n in source_names[:2]:assert source_sha[n] in hashes,(stem,n)
   assert (source_sha[source_names[2]] in hashes)==instructor,stem+" instructor image separation"
   assert len(media)==(3 if instructor else 2),stem+" unexpected image"
   if not instructor:
    for forbidden in ["14,594.28","955.18","2.301","0.5807","Instructor free bodies"]:
     assert forbidden not in text,(stem,forbidden)
   else:
    assert "unvalidated" in text and "Largest eligible nominal utilization" in text,stem
   records.append({"file":str(docx.relative_to(root)),"format":"docx","labels":labels,"answers":count if instructor else 0,"media":len(media),"nativeMath":len(tree.findall(".//m:oMath",ns)),"workspaceTwips":4535,"visualPagination":"unverified without a DOCX renderer"})
  reader=PdfReader(pdf);page_text=[p.extract_text()or"" for p in reader.pages];text="\n".join(page_text)
  assert text.count("Representative Instructor Answer")== (count if instructor else 0),stem+" PDF answers"
  labels=re.findall(r"(?m)^(Q[1-6]|I1|M[1-5])\s+[\u2014-]",text)
  assert labels==expected_labels,(stem,"PDF labels",labels)
  assert text.index("Independent idealization")<text.index("Common model and assigned data")<text.index("Numerical analysis and bounded assessment"),stem
  image_hashes=set()
  for page in reader.pages:
   for image in page.images:
    image_hashes.add(pixels(image.data))
  for n in source_names[:2]:assert source_pixels[n] in image_hashes,(stem,"PDF pixels",n)
  assert (source_pixels[source_names[2]] in image_hashes)==instructor,stem+" PDF instructor image"
  if not instructor:
   for forbidden in ["14,594.28","955.18","2.301","0.5807","Instructor free bodies"]:assert forbidden not in text,(stem,"PDF",forbidden)
  if args.render_pdf:
   import pypdfium2 as pdfium
   doc=pdfium.PdfDocument(str(pdf));folder=out/stem;folder.mkdir(exist_ok=True)
   for i in range(len(doc)):
    page=doc[i];bitmap=page.render(scale=1.4);image=bitmap.to_pil()
    image.save(folder/("page-"+str(i+1)+".png"))
    bitmap.close();page.close()
   doc.close()
  records.append({"file":str(pdf.relative_to(root)),"format":"pdf","pages":len(reader.pages),"labels":labels,"answers":count if instructor else 0,"matchedSourceImages":2+int(instructor),"renderedPngs":bool(args.render_pdf)})
(out/"artifact-results.json").write_text(json.dumps(records,indent=2)+"\n",encoding="utf-8")
print(json.dumps({"artifacts":len(records),"records":records,"inspection":str(out)},indent=2))
