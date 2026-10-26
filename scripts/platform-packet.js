// Audience-aware phase layout for MOS-PLATFORM-011 only; no I/O or DOM mutation.
(function(root,factory){
  if(typeof module==='object'&&module.exports)module.exports=factory(require('./platform-model.js'));
  else root.PlatformPacket=factory(root.PlatformModel);
}(typeof window!=='undefined'?window:globalThis,function(Model){
  'use strict';
  const esc=value=>String(value).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#039;');
  const unit=u=>esc(u==='lb'?'lbf':u).replace(/\^(-?\d+)/g,'<sup>$1</sup>');
  const symbol=s=>esc(s).replace(/_([A-Za-z]+)/g,'<sub>$1</sub>');
  const caution='The small-deformation assumptions are stipulated for this instructional exercise; they have not been verified for a real suspension assembly.';
  function values(problem,overrides={},result){
    const current=Model.assertPacket(result||Model.evaluate(problem,overrides)),map={...current.inputs,...current.display};
    for(const v of problem.variables){map[v.key+'_unit']=v.unit;map[v.key+'_label']=v.label;}
    return map;
  }
  function substitute(source,map){
    return String(source||'').replace(/\{\{([A-Za-z0-9_]+)\}\}/g,(_,key)=>{
      if(!Object.prototype.hasOwnProperty.call(map,key))throw new Error('Undeclared platform template key: '+key);
      return esc(map[key]);
    });
  }
  function prepare(problem,overrides,type,options){
    const result=Model.assertPacket(Model.evaluate(problem,overrides));
    const instructor=type==='instructor',map=values(problem,overrides,result);
    const requested=new Set((options.questions||problem.questions.filter(q=>q.selected!==false&&(instructor?q.includeInInstructorPacket!==false:q.includeInStudentPacket!==false))).map(q=>q.id));
    const questions=problem.questions.filter(q=>requested.has(q.id));
    const common=problem.supplementaryImages?.find(i=>i.role==='common-model-geometry');
    if(!common)throw new Error('Platform common-model geometry is missing.');
    return {result,instructor,map,questions,common};
  }
  function renderHtml(problem,overrides={},type='student',options={}){
    const {result,instructor,map,questions,common}=prepare(problem,overrides,type,options);
    const imageUrl=options.imageUrl||((p)=>p);
    const figure=(src,alt,caption)=>'<figure class="platform-figure"><img style="max-width:100%;height:auto" src="'+esc(imageUrl(src))+'" alt="'+esc(alt)+'">'+(caption?'<figcaption>'+esc(caption)+'</figcaption>':'')+'</figure>';
    const question=q=>'<section class="generated-question" data-platform-question="'+esc(q.id)+'"><h3>'+esc(q.displayNumber)+'. '+esc(q.title)+'</h3>'+substitute(q.student,map)+(q.workspace?.kind==='model-sketch'?'<div class="student-workspace" aria-label="Blank student model sketch region" style="height:80mm;border:1px solid #aaa;break-inside:avoid"></div>':'')+(instructor?'<div class="answer-block"><h4>Representative Instructor Answer</h4>'+substitute(q.instructor,map)+'</div><div class="learning-objectives"><h4>Learning Objectives</h4><ul>'+(q.learningObjectives||[]).map(x=>'<li>'+esc(x)+'</li>').join('')+'</ul></div>'+(q.gradingNotes?'<div class="support-block"><h4>Grading Notes</h4>'+substitute(q.gradingNotes,map)+'</div>':'')+(q.commonMistakes?'<div class="support-block"><h4>Common Mistakes</h4>'+substitute(q.commonMistakes,map)+'</div>':''):'')+'</section>';
    const group=(section,title)=>'<section class="packet-question-section" data-question-section="'+section+'"><h2>'+title+'</h2>'+questions.filter(q=>q.section===section).map(question).join('')+'</section>';
    const rows=problem.variables.map(v=>'<tr><td>'+symbol(v.symbol)+'</td><td>'+esc(v.label)+'</td><td>'+result.inputs[v.key].toLocaleString('en-US')+' '+unit(v.unit)+'</td></tr>').join('');
    const key='<p class="current-input-dimensions">'+esc(Model.dimensionKey(result.inputs))+'</p>';
    const intro=options.includeContext===false?'':'<header><h1>'+esc(problem.title)+'</h1><p>'+esc(problem.summary)+'</p></header>'+figure(problem.image,'Suspended-platform physical context',problem.contextImageNote)+'<section><h2>Main Problem Statement</h2>'+substitute(problem.problemStatement,map)+'</section><section><h2>Engineering Goal</h2>'+substitute(problem.engineeringGoal,map)+'</section>';
    const bridge='<section class="platform-common-model"><h2>Common model and assigned data for M1–M11</h2>'+substitute(problem.commonModelStatement,map)+'<h3>Common quantitative assumptions</h3><ol>'+problem.commonModelAssumptions.map(s=>'<li>'+substitute(s,map)+'</li>').join('')+'</ol>'+figure(common.path,common.alt,common.caption)+key+'<section class="packet-given-data"><h3>Given Data</h3><table><thead><tr><th>Symbol</th><th>Quantity</th><th>Value</th></tr></thead><tbody>'+rows+'</tbody></table><p>All ten values are instructional assignments, not documented industrial specifications.</p><p class="platform-model-note">'+esc(result.display.platform_model_status_note)+'</p><p>'+caution+'</p></section></section>';
    const m1=questions.find(q=>q.id==='q11');
    const analysis='<section class="packet-question-section" data-question-section="analysis"><h2>Quantitative Analysis and Engineering Assessment</h2>'+(m1?question(m1):'')+(instructor?'<section class="platform-instructor-reference"><h3>Instructor free bodies</h3>'+figure(problem.idealizedImage,problem.idealizedImageAlt,problem.idealizedImageCaption)+key+'</section>':'')+questions.filter(q=>q.section==='analysis'&&q.id!=='q11').map(question).join('')+'</section>';
    return '<article class="generated-packet platform-packet"><p class="packet-kicker">'+esc(instructor?problem.instructorDocumentTitle:problem.studentDocumentTitle)+'</p>'+intro+group('context','Physical Context and Load Path')+group('transition','Independent Idealization and Analysis Plan')+bridge+analysis+'</article>';
  }
  function renderQmd(problem,overrides={},type='student',options={}){
    const {result,instructor,map,questions,common}=prepare(problem,overrides,type,options);
    if(typeof options.toMarkdown!=='function')throw new Error('Platform native export requires semantic HTML-to-Markdown conversion.');
    const md=options.toMarkdown,m=s=>md(substitute(s,map)),imageUrl=options.imageUrl||((p)=>p);
    const image=(src,alt,caption)=>'!['+String(caption||alt).replace(/]/g,'\\]')+'](<'+imageUrl(src)+'>){fig-alt='+JSON.stringify(alt)+' width=100%}\n\n';
    const fence=String.fromCharCode(96).repeat(3);
    const raw=(format,s)=>fence+'{='+format+'}\n'+s+'\n'+fence;
    const sketch=raw('typst','#block(height: 80mm, width: 100%, breakable: false, stroke: 0.4pt + gray)[]')+'\n\n'+raw('html','<div style="height:80mm;border:1px solid #aaa;break-inside:avoid"></div>')+'\n\n'+raw('latex','\\vspace{80mm}')+'\n\n'+raw('openxml','<w:p><w:pPr><w:keepLines/><w:spacing w:before="0" w:after="0" w:line="4535" w:lineRule="exact"/></w:pPr><w:r><w:t xml:space="preserve"> </w:t></w:r></w:p>');
    const question=q=>{
      let content='### '+q.displayNumber+'. '+q.title+'\n\n'+m(q.student);
      if(q.workspace?.kind==='model-sketch')content=raw('typst','#block(breakable: false)[')+'\n\n'+content+'\n\n'+sketch+'\n\n'+raw('typst',']');
      if(instructor)content+='\n\n#### Representative Instructor Answer\n\n'+m(q.instructor)+'\n\n#### Learning Objectives\n\n'+(q.learningObjectives||[]).map(x=>'- '+x).join('\n')+(q.gradingNotes?'\n\n#### Grading Notes\n\n'+m(q.gradingNotes):'')+(q.commonMistakes?'\n\n#### Common Mistakes\n\n'+m(q.commonMistakes):'');
      return content;
    };
    const group=(section,title)=>'## '+title+'\n\n'+questions.filter(q=>q.section===section).map(question).join('\n\n');
    const rows=problem.variables.map(v=>'| '+md(symbol(v.symbol))+' | '+v.label.replace(/\|/g,'\\|')+' | '+result.inputs[v.key].toLocaleString('en-US')+' '+md(unit(v.unit))+' |').join('\n');
    const key=Model.dimensionKey(result.inputs);
    const bridge='## Common model and assigned data for M1–M11\n\n'+m(problem.commonModelStatement)+'\n\n### Common quantitative assumptions\n\n'+problem.commonModelAssumptions.map((s,i)=>(i+1)+'. '+m(s)).join('\n')+'\n\n'+image(common.path,common.alt,common.caption)+key+'\n\n### Given Data\n\n| Symbol | Quantity | Value |\n|---|---|---:|\n'+rows+'\n\nAll ten values are instructional assignments, not documented industrial specifications.\n\n'+result.display.platform_model_status_note+'\n\n'+caution;
    const m1=questions.find(q=>q.id==='q11');
    const analysis='## Quantitative Analysis and Engineering Assessment\n\n'+(m1?question(m1)+'\n\n':'')+(instructor?'### Instructor free bodies\n\n'+image(problem.idealizedImage,problem.idealizedImageAlt,problem.idealizedImageCaption)+key+'\n\n':'')+questions.filter(q=>q.section==='analysis'&&q.id!=='q11').map(question).join('\n\n');
    return '---\ntitle: '+JSON.stringify(problem.title)+'\nsubtitle: '+JSON.stringify(instructor?problem.instructorDocumentTitle:problem.studentDocumentTitle)+'\nformat:\n  html: default\n  docx: default\n  typst:\n    fontsize: 10.5pt\n  pdf:\n    documentclass: scrartcl\n---\n\n'+image(problem.nativeContextImage||problem.image,'Suspended-platform physical context',problem.contextImageNote)+'## Main Problem Statement\n\n'+m(problem.problemStatement)+'\n\n## Engineering Goal\n\n'+m(problem.engineeringGoal)+'\n\n'+group('context','Physical Context and Load Path')+'\n\n'+group('transition','Independent Idealization and Analysis Plan')+'\n\n'+bridge+'\n\n'+analysis+'\n';
  }
  function diagnosticHtml(error,type){
    let details='';
    if(error instanceof Model.PlatformModelWarning&&type==='instructor'){
      const r=error.result.raw;
      details='<details class="platform-trial-diagnostics"><summary>Instructor-only out-of-model trial diagnostics</summary><p>Trial predictions only; not a material-failure assessment. Maximum axial strain: '+esc(r.maxStrain)+'; maximum absolute first-order rotation: '+esc(r.maxAbsRotation)+' rad; load displacement: '+esc(r.displacements.P)+' in.</p></details>';
    }
    return '<section class="packet-error" role="alert"><p>'+esc(error.message)+'</p>'+details+'</section>';
  }
  return {renderHtml,renderQmd,values,substitute,diagnosticHtml};
}));
