import vm from 'node:vm';
import PlatformModel from '../../scripts/platform-model.js';
import PlatformPacket from '../../scripts/platform-packet.js';
import JibCraneModel from '../../scripts/jib-crane-model.js';
import JibCranePacket from '../../scripts/jib-crane-packet.js';
import path from 'node:path';
import {readFileSync} from 'node:fs';
import {pathToFileURL} from 'node:url';
const {loadRoutes,normalize}=(function(vm,path,readFileSync,pathToFileURL){
 function normalize(text,root){return text.replaceAll(pathToFileURL(root).href,'file:///REPOSITORY_ROOT').replaceAll(path.normalize(root),'REPOSITORY_ROOT').replaceAll(root,'REPOSITORY_ROOT');}
 function loadRoutes(root,sources,model){
  const controls=new Map();let selected=null;
  const control=id=>{if(!controls.has(id))controls.set(id,{value:'',innerHTML:'',textContent:'',disabled:false,addEventListener(){},classList:{toggle(){}},querySelectorAll(){return[];}});return controls.get(id);};
  const document={getElementById:control,querySelector(sel){const m=sel.match(/data-question="([^"]+)"/);return m&&selected?{checked:selected.has(m[1])}:null;},images:[]};
  const window={PROBLEM_CATALOG:[],PlatformModel,PlatformPacket,JibCraneModel,JibCranePacket,PressFixtureModel:model,location:{pathname:'/instructor-builder.html',href:'http://localhost/instructor-builder.html'}};
  const shared={document,window,URL,console,setTimeout,ROOT:root,path,pathToFileURL,readFileSync,PlatformModel,PlatformPacket,JibCraneModel,JibCranePacket,PressFixtureModel:model};
  const direct=vm.createContext({...shared,window:{...window},document:{...document,getElementById:control}});vm.runInContext(sources.direct,direct);
  let builderCode=sources.builder.match(/<script>\s*([\s\S]*?)<\/script>/)[1];builderCode=builderCode.slice(0,builderCode.indexOf('problemSelect.addEventListener("change"'));
  const builder=vm.createContext({...shared});vm.runInContext(builderCode+'\nglobalThis.api={set(p,v,o={}){problemCatalog=[p];problemSelect.value=p.id;variantSelect.value=v?.id||\'\';currentValues={...(v?.variables||{}),...o};},body:renderDocumentBody,values:p=>variableMap(p),preview:renderPreview,images:embeddedPacketImages,html:fullHtmlDocument};',builder);
  let cliCode=sources.cli.replace(/^import .*;\r?\n/gm,'').replace(/const root = .*;/,'const root = ROOT;');cliCode=cliCode.slice(0,cliCode.indexOf('const problemKey = argValue("problem")'));
  const cli=vm.createContext({...shared});vm.runInContext(cliCode+'\nglobalThis.api={body:renderBody,qmd:qmdDocument,html:fullHtml,values:variableMap};',cli);
  return {controls,direct,cli:cli.api,builder:builder.api,render(p,v,type,overrides={}){selected=v?.selectedQuestions?new Set(v.selectedQuestions):null;direct.window.PROBLEM_CATALOG=[p];direct.window.location.pathname='/problems/'+p.slug+'/student-packet.html';direct.window.renderProblemPacket({slug:p.slug,variant:v?.id,type,targetId:'target',overrides});builder.api.set(p,v,overrides);const effective={...(v?.variables||{}),...overrides};const variant={...(v||{}),variables:effective};return{direct:control('target').innerHTML,builder:builder.api.body(type),cli:cli.api.body(p,variant,type),qmd:cli.api.qmd(p,variant,type,path.join(root,'exports','test'))};}};
 }
 return {loadRoutes,normalize};
})(vm,path,readFileSync,pathToFileURL);
export {loadRoutes,normalize};
