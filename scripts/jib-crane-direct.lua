-- MOS-JIB-001 direct native pages only: no instructor catalog in student metadata.
function Pandoc(doc)
  local audience = pandoc.utils.stringify(doc.meta["jib-audience"])
  if audience ~= "student" and audience ~= "instructor" then error("Invalid jib audience") end
  local js = [=[
const fs=require('node:fs'),path=require('node:path');
let root=process.cwd();
while(!fs.existsSync(path.join(root,'scripts/jib-crane-packet.js'))){
 const parent=path.dirname(root);if(parent===root)throw Error('Jib repository not found');root=parent;
}
const p=JSON.parse(fs.readFileSync(path.join(root,'data/problem-catalog.json'),'utf8')).find(p=>p.id==='MOS-JIB-001');
const packet=require(path.join(root,'scripts/jib-crane-packet.js'));
const outDir=path.join(root,'problems/jib-crane-battery-pack');
const text=packet.renderQmd(p,{},process.argv[1],{imageUrl:src=>path.relative(outDir,path.join(root,src)).split(path.sep).join('/')});
process.stdout.write(text.replace(/^---[\s\S]*?---\s*/,''));
]=]
  local text = pandoc.pipe(os.getenv("JIB_NODE") or "node", {"-e", js, audience}, "")
  return pandoc.Pandoc(pandoc.read(text, "markdown").blocks, doc.meta)
end
