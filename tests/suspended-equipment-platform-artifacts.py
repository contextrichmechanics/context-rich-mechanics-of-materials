"""Local native artifact checks. Requires Pillow, pypdf, and generated default outputs."""
from pathlib import Path
from zipfile import ZipFile
import hashlib,json,re,sys
import xml.etree.ElementTree as ET
from PIL import Image,ImageChops,ImageStat
from pypdf import PdfReader
sys.stdout.reconfigure(encoding='utf-8')
root=Path(__file__).resolve().parents[1]
folder=root/'_site/exports/suspended-equipment-platform/default'
assets=root/'problems/suspended-equipment-platform/assets'
sha=lambda b:hashlib.sha256(b).hexdigest()
context=assets/'platform-industry-context.png'
native=assets/'platform-industry-context-native.jpg'
assert native.read_bytes()==context.read_bytes()
common=assets/'platform-student-common-geometry.png'
teacher=assets/'platform-instructor-free-bodies.png'
labels=['Q'+str(i) for i in range(1,11)]+['M'+str(i) for i in range(1,12)]
results={}
ns={'w':'http://schemas.openxmlformats.org/wordprocessingml/2006/main','a':'http://schemas.openxmlformats.org/drawingml/2006/main','r':'http://schemas.openxmlformats.org/officeDocument/2006/relationships'}
def pixels(image):
    rgb=image.convert('RGB')
    return (rgb.size,sha(rgb.tobytes()))
for audience in ['student','instructor']:
    instructor=audience=='instructor'
    stem='suspended-equipment-platform-default-'+audience
    expected=[context,common]+([teacher] if instructor else [])
    expected_hashes={sha(p.read_bytes()) for p in expected}
    with ZipFile(folder/(stem+'.docx')) as archive:
        actual={sha(archive.read(name)) for name in archive.namelist() if name.startswith('word/media/')}
        assert actual==expected_hashes,(audience,'DOCX images')
        tree=ET.fromstring(archive.read('word/document.xml'))
        text=' '.join(n.text or '' for n in tree.iter('{'+ns['w']+'}t'))
        headings=[''.join(n.text or '' for n in p.iter('{'+ns['w']+'}t')) for p in tree.iter('{'+ns['w']+'}p')]
        got=[re.match(r'^([QM]\d+)\. ',t).group(1) for t in headings if re.match(r'^([QM]\d+)\. ',t)]
        assert got==labels,(audience,got)
        assert text.count('Representative Instructor Answer')==(21 if instructor else 0)
        assert ('0.03498' in text)==instructor
        assert ('0.01974857' in text)==instructor
        assert 'quantitative strain/rotation screening thresholds are not configured' in text
        assert '{{' not in text
        assert any(s.attrib.get('{'+ns['w']+'}line')=='4535' and s.attrib.get('{'+ns['w']+'}lineRule')=='exact' for s in tree.iter('{'+ns['w']+'}spacing'))
        relationships={rel.attrib['Id']:rel.attrib['Target'] for rel in ET.fromstring(archive.read('word/_rels/document.xml.rels'))}
        order=[];doc_labels=[]
        for node in tree.iter():
            if node.tag=='{'+ns['w']+'}p':
                t=''.join(n.text or '' for n in node.iter('{'+ns['w']+'}t'))
                m=re.match(r'^([QM]\d+)\. ',t)
                if m:order.append(m.group(1))
            if node.tag=='{'+ns['a']+'}blip':
                target=relationships[node.attrib['{'+ns['r']+'}embed']]
                image_hash=sha(archive.read('word/'+target))
                order.append('common' if image_hash==sha(common.read_bytes()) else 'teacher' if image_hash==sha(teacher.read_bytes()) else 'context')
        assert order.index('Q10')<order.index('common')<order.index('M1')
        if instructor:assert order.index('M1')<order.index('teacher')<order.index('M2')
    reader=PdfReader(folder/(stem+'.pdf'))
    page_text=[p.extract_text() or '' for p in reader.pages]
    text='\n'.join(page_text)
    got=re.findall(r'(?m)^([QM]\d+)\.\s',text)
    assert got==labels,(audience,got)
    assert text.count('Representative Instructor Answer')==(21 if instructor else 0)
    assert ('0.03498' in text)==instructor and ('0.01974857' in text)==instructor
    assert '\ufffd' not in text and '{{' not in text
    assert 'P = 800 lbf' in text and 'x_HC = 5 ft' in text
    decoded=[i.image.convert('RGB') for page in reader.pages for i in page.images]
    assert len(decoded)==len(expected)
    actual_diagrams=[pixels(image) for image in decoded if image.size!=Image.open(context).size]
    expected_diagrams=[pixels(Image.open(p)) for p in expected if p!=context]
    assert sorted(actual_diagrams)==sorted(expected_diagrams),(audience,'PDF diagram pixels')
    photos=[image for image in decoded if image.size==Image.open(context).size]
    assert len(photos)==1
    # PDF and Pillow JPEG chroma decoding may differ slightly; diagrams remain pixel-exact.
    context_rms=ImageStat.Stat(ImageChops.difference(photos[0],Image.open(context).convert('RGB'))).rms
    assert max(context_rms)<1.0,(audience,'PDF context JPEG fidelity',context_rms)
    assert len(page_text[-1].strip())>200,'Nearly empty final page'
    results[audience]={'pdf_pages':len(reader.pages),'questions':len(got),'instructor_answers':21 if instructor else 0,'native_image_count':len(expected),'pdf_diagram_pixels':'exact matches','pdf_context_rgb_rms':context_rms,'docx_image_hashes':'exact matches','docx_workspace_twips':4535,'docx_phase_order':'passed'}
out=root/'exports/platform-review/artifact-qa.json'
out.parent.mkdir(parents=True,exist_ok=True)
out.write_text(json.dumps(results,indent=2)+'\n',encoding='utf-8')
print(json.dumps(results))
