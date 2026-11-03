// Shared audience-aware layout for MOS-JIB-001 only.
(function(root,factory){
  if(typeof module==='object'&&module.exports)module.exports=factory(require('./jib-crane-model.js'));
  else root.JibCranePacket=factory(root.JibCraneModel);
}(typeof window!=='undefined'?window:globalThis,function(Model){
  'use strict';
  const esc=s=>String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#039;');
  const unit=s=>esc(s).replace(/\^(-?\d+)/g,'<sup>$1</sup>');
  const symbol=s=>esc(s).replace(/_([A-Za-z]+)/g,'<sub>$1</sub>');
  function values(problem,overrides={},result){
    const r=result||Model.evaluate(problem,overrides),map={...r.inputs,...r.display};
    for(const v of problem.variables){map[v.key+'_unit']=v.unit;map[v.key+'_label']=v.label;}
    return map;
  }
  function substitute(source,map,student=false){
    return String(source||'').replace(/\{\{([A-Za-z0-9_]+)\}\}/g,(_,k)=>{
      if(!Object.prototype.hasOwnProperty.call(map,k))throw new Error('Undeclared jib template key: '+k);
      if(student&&Model.registry.includes(k))throw new Error('Solved jib placeholder in student content: '+k);
      return esc(map[k]);
    });
  }
  function toMarkdown(s){
    return String(s||'').replace(/<\/?p>/gi,'\n\n').replace(/<br\s*\/?>/gi,'\n').replace(/<\/?strong>/gi,'**').replace(/<\/?em>/gi,'*')
      .replace(/<sub>(.*?)<\/sub>/gis,'~$1~').replace(/<sup>(.*?)<\/sup>/gis,'^$1^').replace(/<\/?[uo]l>/gi,'\n').replace(/<li>/gi,'\n- ').replace(/<\/li>/gi,'')
      .replace(/<[^>]+>/g,'').replace(/&le;/g,'≤').replace(/&ge;/g,'≥').replace(/&theta;/g,'θ').replace(/&pi;/g,'π').replace(/&gamma;/g,'γ').replace(/&sigma;/g,'σ')
      .replace(/&lt;/g,'<').replace(/&gt;/g,'>').replace(/&amp;/g,'&').replace(/&quot;/g,'"').replace(/&#039;/g,"'").replace(/[ \t]+\n/g,'\n').replace(/\n{3,}/g,'\n\n').trim();
  }
  function prepare(problem,overrides,type,options){
    const result=Model.evaluate(problem,overrides),instructor=type==='instructor',map=values(problem,overrides,result);
    const chosen=options.questions||problem.questions.filter(q=>q.selected!==false&&(instructor?q.includeInInstructorPacket!==false:q.includeInStudentPacket!==false));
    const ids=new Set(chosen.map(q=>q.id)),questions=problem.questions.filter(q=>ids.has(q.id));
    const common=problem.supplementaryImages?.find(i=>i.role==='common-model-geometry');
    if(!common)throw new Error('Missing jib common-model geometry.');
    return {result,instructor,map,questions,common,hasAnalysis:questions.some(q=>q.section==='analysis')};
  }
  function topology(v){
    return 'Authoritative numerical model. Current topology: '+(v.Lb===v.L?'endpoint panel B, C = D (a = L).':'interior panel A, a < L.')+' Connection: '+(v.n_s===2?'symmetric double shear, two equally effective pin planes and one full-load main lug.':'single shear, one full-load main lug.')+' H = '+v.H+' N; e_H = '+v.e_H+' m. '+(v.H===0?'Horizontal forces and prescribed couples vanish.':v.e_H===0?'Couples vanish; opposite horizontal forces remain.':'Rightward force has counterclockwise couple; leftward force has clockwise couple.')+' Schematic / not to scale; current givens govern.';
  }
  const methodHtml='<h3>Supplied symbolic displacement method</h3><p>Use N, mm and MPa; C_e is N·mm. Downward v is positive. Hold H_x and C_e fixed for the virtual unit tip load.</p><p>v_D = P L (L − a)<sup>2</sup>/(3 E I_boom) − C_e (L − a)(3 L − a)/(6 E I_boom) + (P L − C_e) ell_b L/(E A_brace a<sup>2</sup> sin<sup>2</sup> θ).</p><p>The first two terms are boom bending and the last is brace axial deformation. v_C = F ell_b/(E A_brace sin θ). Tensile brace extension = −F ell_b/(E A_brace). Compare |v_D| after summing signed terms; this is not the fixed-cantilever comparison.</p>';
  const methodMd=String.raw`### Supplied symbolic displacement method

Use N, mm and MPa; $C_e$ is N mm. Downward $v$ is positive. Hold $H_x$ and $C_e$ fixed for the virtual unit tip load.

$$
v_D=\underbrace{\frac{PL(L-a)^2}{3EI_{\mathrm{boom}}}-\frac{C_e(L-a)(3L-a)}{6EI_{\mathrm{boom}}}}_{\text{boom bending}}+
\underbrace{\frac{(PL-C_e)\ell_b L}{EA_{\mathrm{brace}}a^2\sin^2\theta}}_{\text{brace axial deformation}}.
$$

$$
v_C=\frac{F\ell_b}{EA_{\mathrm{brace}}\sin\theta},\qquad
\Delta\ell_b=-\frac{F\ell_b}{EA_{\mathrm{brace}}}.
$$

Compare $|v_D|$ after summing signed terms. This is not the fixed-cantilever comparison.
`;
  const forceFields=[['H_x','Hx_N','N'],['C_e','Ce_Nm','N m'],['R_C','brace_vertical_N','N'],['F','brace_force_N','N'],['C_x','brace_horizontal_N','N'],['A_x','wall_pin_x_N','N'],['A_y','wall_pin_y_N','N']];
  function renderHtml(problem,overrides={},type='student',options={}){
    const {result:r,instructor,map,questions,common,hasAnalysis}=prepare(problem,overrides,type,options),url=options.imageUrl||((p)=>p),sub=(s,st=false)=>substitute(s,map,st);
    const fig=(src,alt,caption)=>'<figure class="jib-figure"><img style="max-width:100%;height:auto" src="'+esc(url(src))+'" alt="'+esc(alt)+'"><figcaption>'+esc(caption||alt)+'</figcaption></figure>';
    const question=q=>'<section class="generated-question" data-jib-question="'+q.id+'"><h3>'+esc(q.displayNumber)+' — '+esc(q.title)+'</h3>'+sub(q.student,true)+(q.workspace?.kind==='model-sketch'?'<div class="student-workspace" aria-label="Blank independent model sketch region" style="height:80mm;border:1px solid #aaa;break-inside:avoid"></div>':'')+(instructor?'<div class="answer-block"><h4>Representative Instructor Answer</h4>'+sub(q.instructor)+'</div><div class="learning-objectives"><h4>Learning Objectives</h4><ul>'+q.learningObjectives.map(x=>'<li>'+esc(x)+'</li>').join('')+'</ul></div>'+(q.gradingNotes?'<div class="support-block">'+sub(q.gradingNotes)+'</div>':'')+(q.commonMistakes?'<div class="support-block">'+sub(q.commonMistakes)+'</div>':''):'')+'</section>';
    const group=(section,title)=>questions.some(q=>q.section===section)?'<section data-question-section="'+section+'"><h2>'+title+'</h2>'+questions.filter(q=>q.section===section).map(question).join('')+'</section>':'';
    const intro=options.includeContext===false?'':'<header><h1>'+esc(problem.title)+'</h1><p>'+esc(problem.summary)+'</p></header>'+fig(problem.image,'Historical context; labels do not define numerical model',problem.contextImageNote)+'<aside class="jib-context-disclaimer" style="border:2px solid #8a5300;padding:1em"><strong>Context illustration only.</strong><p>'+esc(problem.contextImageNote)+'</p></aside><h2>Problem context</h2>'+sub(problem.problemStatement,true)+'<h2>Engineering goal</h2>'+sub(problem.engineeringGoal,true);
    const rows=problem.variables.map(v=>'<tr><td>'+symbol(v.symbol)+'</td><td>'+esc(v.label)+'</td><td>'+esc(r.inputs[v.key].toLocaleString('en-US'))+' '+unit(v.unit)+'</td></tr>').join('');
    const key='<p class="current-input-dimensions">'+esc(Model.dimensionKey(r.inputs))+'</p>';
    const bridge=!hasAnalysis?'':'<section class="jib-common-model"><h2>Common model and assigned data for M1–M5</h2>'+sub(problem.commonModelStatement,true)+'<ol>'+problem.commonModelAssumptions.map(s=>'<li>'+sub(s,true)+'</li>').join('')+'</ol>'+fig(common.path,common.alt,common.caption)+'<p class="jib-topology">'+esc(topology(r.inputs))+'</p>'+key+'<h3>Given data</h3><table><thead><tr><th>Symbol</th><th>Assigned quantity</th><th>Current value</th></tr></thead><tbody>'+rows+'</tbody></table><p>All 23 inputs are instructional assignments without documented industrial provenance. Small-deformation applicability and physical compression resistance are unassessed.</p>'+methodHtml+'</section>';
    const ref=instructor&&hasAnalysis?'<section class="jib-instructor-reference"><h2>Instructor free bodies</h2>'+fig(problem.idealizedImage,problem.idealizedImageAlt,problem.idealizedImageCaption)+key+'<p>'+esc(topology(r.inputs))+'</p><p>Reference arrows define assumed positive axes. Negative values reverse the arrow. F positive means compression; each table column is a complete signed case.</p><table class="jib-case-table"><thead><tr><th>Signed quantity</th><th>Rightward</th><th>Leftward</th><th>Unit</th></tr></thead><tbody>'+forceFields.map(([n,k,u])=>'<tr><td>'+n+'</td><td>'+esc(r.display['right_'+k])+'</td><td>'+esc(r.display['left_'+k])+'</td><td>'+u+'</td></tr>').join('')+'</tbody></table></section>':'';
    return '<article class="generated-packet jib-packet"><p class="packet-kicker">'+esc(instructor?problem.instructorDocumentTitle:problem.studentDocumentTitle)+'</p>'+intro+group('context','Physical context and engineering requirements')+group('transition','Independent idealization')+bridge+ref+group('analysis','Numerical analysis and bounded assessment')+(instructor&&problem.instructorBackground?'<section class="jib-instructor-background"><h2>Supplemental instructor background</h2>'+sub(problem.instructorBackground)+'</section>':'')+'</article>';
  }
  function renderQmd(problem,overrides={},type='student',options={}){
    const {result:r,instructor,map,questions,common,hasAnalysis}=prepare(problem,overrides,type,options),md=options.toMarkdown||toMarkdown,m=(s,st=false)=>md(substitute(s,map,st)),url=options.imageUrl||((p)=>p);
    const image=(src,alt,caption)=>'!['+String(caption||alt).replace(/]/g,'\\]')+'](<'+url(src)+'>){fig-alt='+JSON.stringify(alt)+' width=100%}\n\n';
    const fence=String.fromCharCode(96).repeat(3),raw=(fmt,s)=>fence+'{='+fmt+'}\n'+s+'\n'+fence;
    const sketch=raw('typst','#block(height: 80mm, width: 100%, breakable: false, stroke: 0.4pt + gray)[]')+'\n\n'+raw('html','<div class="student-workspace" style="height:80mm;border:1px solid #aaa;break-inside:avoid"></div>')+'\n\n'+raw('latex','\\vspace{80mm}')+'\n\n'+raw('openxml','<w:p><w:pPr><w:keepLines/><w:spacing w:before="0" w:after="0" w:line="4535" w:lineRule="exact"/></w:pPr><w:r><w:t xml:space="preserve"> </w:t></w:r></w:p>');
    const question=q=>{
      let s='::: {.generated-question data-jib-question="'+q.id+'"}\n\n### '+q.displayNumber+' — '+q.title+'\n\n'+m(q.student,true);
      if(q.workspace?.kind==='model-sketch')s+='\n\n'+sketch;
      if(instructor)s+='\n\n::: {.answer-block}\n\n#### Representative Instructor Answer\n\n'+m(q.instructor)+'\n\n:::\n\n#### Learning Objectives\n\n'+q.learningObjectives.map(x=>'- '+x).join('\n')+(q.gradingNotes?'\n\n#### Grading Notes\n\n'+m(q.gradingNotes):'')+(q.commonMistakes?'\n\n#### Common Mistakes\n\n'+m(q.commonMistakes):'');
      return s+'\n\n:::';
    };
    const group=(section,title)=>questions.some(q=>q.section===section)?'## '+title+'\n\n'+questions.filter(q=>q.section===section).map(question).join('\n\n'):'';
    const key='::: {.current-input-dimensions}\n\n'+Model.dimensionKey(r.inputs)+'\n\n:::',rows=problem.variables.map(v=>'| '+md(symbol(v.symbol))+' | '+v.label.replace(/\|/g,'\\|')+' | '+r.inputs[v.key].toLocaleString('en-US')+' '+md(unit(v.unit))+' |').join('\n');
    const bridge=!hasAnalysis?'':'::: {.jib-common-model}\n\n## Common model and assigned data for M1–M5\n\n'+m(problem.commonModelStatement,true)+'\n\n'+problem.commonModelAssumptions.map((s,i)=>(i+1)+'. '+m(s,true)).join('\n')+'\n\n'+image(common.path,common.alt,common.caption)+topology(r.inputs)+'\n\n'+key+'\n\n### Given data\n\n| Symbol | Assigned quantity | Current value |\n|---|---|---:|\n'+rows+'\n\nAll 23 inputs are instructional assignments without documented industrial provenance. Small-deformation applicability and physical compression resistance are unassessed.\n\n'+methodMd+'\n\n:::';
    const ref=instructor&&hasAnalysis?'::: {.jib-instructor-reference}\n\n## Instructor free bodies\n\n'+image(problem.idealizedImage,problem.idealizedImageAlt,problem.idealizedImageCaption)+key+'\n\n'+topology(r.inputs)+'\n\nReference arrows define assumed positive axes; negative values reverse the arrow. F positive denotes compression. Each column is a complete case.\n\n| Signed quantity | Rightward | Leftward | Unit |\n|---|---:|---:|---|\n'+forceFields.map(([n,k,u])=>'| '+n+' | '+r.display['right_'+k]+' | '+r.display['left_'+k]+' | '+u+' |').join('\n')+'\n\n:::':'';
    return '---\ntitle: '+JSON.stringify(problem.title)+'\nsubtitle: '+JSON.stringify(instructor?problem.instructorDocumentTitle:problem.studentDocumentTitle)+'\nformat:\n  html:\n    html-math-method: mathml\n  docx: default\n  typst:\n    fontsize: 10.5pt\n  pdf:\n    documentclass: scrartcl\n---\n\n'+image(problem.image,'Historical context; not quantitative model',problem.contextImageNote)+'**Context illustration only.** '+problem.contextImageNote+'\n\n## Problem context\n\n'+m(problem.problemStatement,true)+'\n\n## Engineering goal\n\n'+m(problem.engineeringGoal,true)+'\n\n'+group('context','Physical context and engineering requirements')+'\n\n'+group('transition','Independent idealization')+'\n\n'+bridge+'\n\n'+ref+'\n\n'+group('analysis','Numerical analysis and bounded assessment')+(instructor&&problem.instructorBackground?'\n\n## Supplemental instructor background\n\n'+m(problem.instructorBackground):'')+'\n';
  }
  const diagnosticHtml=e=>'<section class="packet-error" role="alert"><p>'+esc(e.message)+'</p><p>Correct the inputs. Numerical answers and standard exports are blocked.</p></section>';
  return {values,substitute,renderHtml,renderQmd,toMarkdown,diagnosticHtml,topology};
}));
