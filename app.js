const $=s=>document.querySelector(s), $$=s=>[...document.querySelectorAll(s)];
const bank=window.QUESTION_BANK, LD=window.LEARNING_DATA, KEY="lacklabor-master-ls01-10-v3";
let S=JSON.parse(localStorage.getItem(KEY)||'{"mode":"learn","chapter":1,"qIndex":0,"answers":{},"mastered":[],"wrong":[],"lab":{},"why":{},"exam":[],"examPos":0}');
S.chem=S.chem||{selected:null,view:"chemdraw",ls:"all",search:"",selectionVersion:2};
if(!S.chem.selectionVersion){
 if(S.chem.selected==="chem-1")S.chem.selected=null;
 S.chem.selectionVersion=2;
}
if(S.chem.view==="expanded")S.chem.view="chemdraw";
const save=()=>localStorage.setItem(KEY,JSON.stringify(S));
const esc=s=>String(s??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const say=(s,compact=true)=>GermanPronunciation.button(String(s??""),compact);
const ch=n=>LD.chapters.find(x=>x.n===Number(n));
const app=$("#app");
function progress(n){const qs=bank.filter(q=>q.chapter===Number(n)), m=qs.filter(q=>S.mastered.includes(q.id)).length;return {m,n:qs.length,p:qs.length?Math.round(m/qs.length*100):0}}
function mode(m){S.mode=m;save();render()}
function shell(title,sub,body,actions=""){return `<section class="page-head"><div><p class="kicker">LACKSYSTEME MASTER</p><h1>${title}</h1><p>${sub}</p></div>${actions}</section>${body}`}
function bindNav(){
  $$("#mainNav button").forEach(b=>{b.classList.toggle("active",b.dataset.mode===S.mode);b.onclick=()=>mode(b.dataset.mode)});
  $("#menuBtn").onclick=()=>$("#mainNav").classList.toggle("open");
  $$("[data-mode]").filter(x=>!x.closest("#mainNav")).forEach(b=>b.onclick=()=>mode(b.dataset.mode));
  $$("[data-chapter]").forEach(b=>b.onclick=()=>{S.chapter=Number(b.dataset.chapter);save();render()});
  $$("[data-go]").forEach(b=>b.onclick=()=>mode("learn"));
}
function render(){({learn:renderLearn,qa:renderQA,chem:renderChem,lab:renderLab,map:renderMap,exam:renderExam}[S.mode]||renderLearn)();bindNav()}

function renderLearn(){
 const c=ch(S.chapter), p=progress(c.n), qs=bank.filter(q=>q.chapter===c.n), sample=qs.slice(0,6);
 app.innerHTML=shell(`LS${String(c.n).padStart(2,"0")} · ${c.t}`,c.de,`
 <div class="learn-layout"><aside class="chapter-rail"><h3>10章学习路径</h3>${LD.chapters.map(x=>`<button class="${x.n===c.n?"on":""}" data-chapter="${x.n}"><b>${String(x.n).padStart(2,"0")}</b><span>${x.t}</span><i>${progress(x.n).p}%</i></button>`).join("")}</aside>
 <div class="content-stack">
  <section class="hero-card"><div><span class="badge">为什么先讲这个？</span><h2>${c.before}</h2><p>${c.why}</p></div><div class="chapter-number">${String(c.n).padStart(2,"0")}</div></section>
  <section><div class="section-title"><div><p class="kicker">KNOWLEDGE PATH</p><h2>本章理解顺序</h2></div><button class="why-btn" data-why-ch="${c.n}">为什么？</button></div>
   <div class="path">${c.core.map((x,i)=>`<div><span>${i+1}</span><b>${x}</b>${i<c.core.length-1?"<i>→</i>":""}</div>`).join("")}</div>
  </section>
  <section class="why-panel hidden" id="chapterWhy"><h3>化学、工业与考试三层原因</h3><p><b>化学：</b>${c.why}</p><p><b>工业：</b>这一章的结构和反应决定配方能否生产、施工并达到目标性能。</p><p><b>考试：</b>老师会沿着“结构 → 反应 → 工艺 → 性能 → 缺陷”追问，而不是停在定义。</p></section>
  <section><div class="section-title"><div><p class="kicker">CORE QUESTIONS</p><h2>先掌握这6个支点</h2></div><button data-mode="qa" class="text-btn">进入完整题库 →</button></div>
   <div class="study-list">${sample.map((q,i)=>`<button class="study-row" data-open-q="${bank.indexOf(q)}"><span>${i+1}</span><div><small>${q.kind} · ${q.source}</small><b>${esc(q.qDe)}</b><p>${esc(q.qZh)}</p></div><i>→</i></button>`).join("")}</div>
  </section>
  <section><div class="section-title"><div><p class="kicker">CONNECTIONS</p><h2>以后会再次出现</h2></div></div><div class="connections">${c.next.length?c.next.filter(n=>n<=14).map(n=>`<button data-jump-map="${n}">LS${String(n).padStart(2,"0")}<b>${ch(n).t}</b><span>${LD.edges.find(e=>e[0]===c.n&&e[1]===n)?.[2]||"知识延伸"}</span></button>`).join(""):"<p>这是课程最后的综合拓展章。</p>"}</div></section>
  <section><div class="section-title"><div><p class="kicker">COMMON CONFUSIONS</p><h2>老师最喜欢抓的混淆点</h2></div></div><div class="confusion-grid">${LD.confusions.filter(x=>x[3].includes(`LS${String(c.n).padStart(2,"0")}`)||x[3].includes(`LS${c.n}`)).map(x=>`<article><small>${x[1]}</small><h3>${x[0]}</h3><p>${x[2]}</p><span>${x[3]}</span></article>`).join("")||"<p>本章的易错点已放在对应教授问答中。</p>"}</div></section>
 </div></div>`, `<div class="head-progress"><b>${p.p}%</b><span>本章掌握 ${p.m}/${p.n}</span></div>`);
 $(".why-btn").onclick=()=>$("#chapterWhy").classList.toggle("hidden");
 $$("[data-open-q]").forEach(b=>b.onclick=()=>{S.qIndex=Number(b.dataset.openQ);mode("qa")});
 $$("[data-jump-map]").forEach(b=>b.onclick=()=>{S.chapter=Number(b.dataset.jumpMap);mode("map")});
}

function renderQA(){
 let q=bank[Math.max(0,Math.min(S.qIndex,bank.length-1))], idx=bank.indexOf(q), mastered=S.mastered.includes(q.id), wrong=S.wrong.includes(q.id);
 const sections=[["标准答案 · Musterantwort",q.answer],["中文解析 · Erklärung",q.analysis],["结构式/反应路径",q.visual],["为什么老师问",q.why],["如果不这样做",q.ifNot],["关联章节",q.links]];
 app.innerHTML=shell("教授问答模式","一页一题。先用德语回答，再逐层打开原因与追问。",`
 <div class="qa-toolbar"><label>章节<select id="qChapter"><option value="all">全部10章</option>${LD.chapters.map(c=>`<option value="${c.n}" ${c.n===q.chapter?"selected":""}>LS${String(c.n).padStart(2,"0")} · ${c.t}</option>`).join("")}</select></label><span>${idx+1} / ${bank.length}</span><div class="mini-progress"><i style="width:${S.mastered.length/bank.length*100}%"></i></div></div>
 <div class="qa-layout"><section class="qa-main">
  <article class="question"><div><span>LS${String(q.chapter).padStart(2,"0")} · ${q.kind}</span><small>${q.source}</small></div><h2>${esc(q.qDe)} ${say(q.qDe)}</h2><p>${esc(q.qZh)}</p></article>
  <div class="why-strip"><b>WHY</b><span>${esc(q.why)}</span><button id="toggleWhy">展开全部原因</button></div>
  <div class="accordions">${sections.filter(x=>x[1]).map((x,i)=>`<section class="acc ${i?"closed":""}"><button><b>${i+1}. ${x[0]}</b><span>${i?"+":"−"}</span></button><div>${esc(x[1])}${i===0?say(x[1]):""}</div></section>`).join("")}</div>
  <div class="q-actions"><button id="prevQ">← 上一题</button><button id="markWrong" class="${wrong?"warn":""}">${wrong?"⚑ 已加入错题":"加入错题"}</button><button id="masterQ" class="${mastered?"done":""}">${mastered?"✓ 已掌握":"标记掌握"}</button><button id="nextQ">下一题 →</button></div>
 </section><aside class="answer-box"><p class="kicker">DEINE ANTWORT</p><h2>你的德语答案</h2><textarea id="answerInput" placeholder="Antwort auf Deutsch…">${esc(S.answers[q.id]||"")}</textarea><button id="compare" class="primary">与标准答案对比</button><div id="compareResult"></div><p>⌘/Ctrl + Enter 对比</p></aside></div>`);
 $$(".acc>button").forEach(b=>b.onclick=()=>{let a=b.parentElement;a.classList.toggle("closed");b.lastElementChild.textContent=a.classList.contains("closed")?"+":"−"});
 $("#toggleWhy").onclick=()=>$$(".acc").forEach(a=>a.classList.remove("closed"));
 $("#answerInput").oninput=e=>{S.answers[q.id]=e.target.value;save()};
 function nav(d){S.qIndex=Math.max(0,Math.min(bank.length-1,idx+d));save();renderQA()} $("#prevQ").onclick=()=>nav(-1);$("#nextQ").onclick=()=>nav(1);
 $("#masterQ").onclick=()=>{toggle(S.mastered,q.id);save();renderQA()};$("#markWrong").onclick=()=>{toggle(S.wrong,q.id);save();renderQA()};
 $("#qChapter").onchange=e=>{if(e.target.value!=="all"){S.qIndex=bank.findIndex(x=>x.chapter===Number(e.target.value));save();renderQA()}};
 $("#compare").onclick=()=>compareAnswer(q);$("#answerInput").onkeydown=e=>{if((e.ctrlKey||e.metaKey)&&e.key==="Enter")compareAnswer(q)};
}
function toggle(a,x){let i=a.indexOf(x);i<0?a.push(x):a.splice(i,1)}
function compareAnswer(q){
 let a=$("#answerInput").value.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,""), hit=q.keywords.filter(k=>a.includes(k.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,""))), miss=q.keywords.filter(k=>!hit.includes(k)), score=Math.round(hit.length/q.keywords.length*100);
 $("#compareResult").innerHTML=`<div class="score">${score}%</div><p>${score>=75?"核心概念覆盖良好。现在检查因果链。":score>=40?"方向正确，但因果链还不完整。":"打开标准答案，按结构→反应→结果重答。"}</p><div class="chips">${hit.map(x=>`<span class="hit">✓ ${x}</span>`).join("")}${miss.map(x=>`<span>补：${x}</span>`).join("")}</div>`;
 if(score<50&&!S.wrong.includes(q.id)){S.wrong.push(q.id);save()}
}

function renderChem(scrollState){
 const all=window.CHEMICALS,query=(S.chem.search||"").toLowerCase(),filtered=all.filter(x=>(S.chem.ls==="all"||String(x.ls)===String(S.chem.ls))&&(!query||`${x.name} ${x.zh} ${x.abbr} ${x.role}`.toLowerCase().includes(query))),selectedCompound=all.find(x=>x.id===S.chem.selected)||null,view=S.chem.view||"chemdraw";
 const viewLabels={chemdraw:"ChemDraw 2D · 默认",skeletal:"Skeletal Formula",lewis:"Lewis Structure", "3d":"3D Model"};
 const professional2D=view==="chemdraw"||view==="skeletal";
 app.innerHTML=shell("化学结构库","LS01–LS10中的113种化学物质与代表结构。默认使用大学教材和论文风格的标准二维结构。",`
 <div class="chem-toolbar"><input id="chemSearch" value="${esc(S.chem.search||"")}" placeholder="搜索名称、缩写、类别…"><select id="chemLS"><option value="all">全部章节</option>${LD.chapters.map(c=>`<option value="${c.n}" ${String(c.n)===String(S.chem.ls)?"selected":""}>LS${String(c.n).padStart(2,"0")} · ${c.t}</option>`).join("")}</select><span>${filtered.length}/${all.length} 种物质</span></div>
 <div class="chem-layout"><aside class="chem-list">${filtered.map(x=>`<button data-chem-id="${x.id}" class="${x.id===selectedCompound?.id?"active":""}"><span>LS${String(x.ls).padStart(2,"0")}</span><div><b>${x.name}</b><small>${x.zh}${x.abbr?` · ${x.abbr}`:""}</small></div></button>`).join("")||"<p>没有匹配的物质。</p>"}</aside>
 ${selectedCompound?`<section class="chem-stage" data-selected-compound-id="${selectedCompound.id}"><div class="chem-title"><div><span class="badge">LS${String(selectedCompound.ls).padStart(2,"0")} · ${selectedCompound.role} ${say(selectedCompound.role)}</span><h2>${selectedCompound.name}</h2><p>${selectedCompound.zh}${selectedCompound.abbr?` · ${selectedCompound.abbr}`:""}</p>${GermanPronunciation.controls(selectedCompound.name)}</div>${selectedCompound.variable?'<div class="representative">代表结构<br><small>非单一确定组成</small></div>':""}</div>
 <div class="chem-view-tabs">${Object.entries(viewLabels).map(([k,v])=>`<button data-chem-view="${k}" class="${k===view?"active":""}">${v}</button>`).join("")}</div>
 <div class="chem-canvas">${professional2D?'<svg id="publicationStructure" class="publication-structure" role="img" aria-label="Publication-quality two-dimensional chemical structure"></svg>':`<div class="mode-pending"><b>${viewLabels[view]}</b><p>该模式不会调用旧的自动原子图。必须接入对应的专业化学渲染器后才会开放。</p></div>`}</div>
 <div class="chem-note"><b>结构来源</b><p>${selectedCompound.slideSvg?`课件原始矢量结构${selectedCompound.sourcePage?` · 第${selectedCompound.sourcePage}页`:""}（保持原排布，不自动优化）`:`SMILES · <code>${esc(selectedCompound.smiles)}</code><br>课件原结构尚未录入时使用的标准二维结构。`}</p><p>${professional2D?"所有结构均根据实际边界框自动居中和等比例缩放，完整保持在画布内并占主要可视区域。":"为保证化学图形质量，本模式暂不使用近似或力导向绘图替代。"}</p><p><strong>The default visualization must replicate the appearance of a ChemDraw-generated 2D publication-quality chemical structure, not an automatically generated atom graph.</strong></p></div>
 </section>`:`<section class="chem-stage chem-empty"><h2>请选择一种化学物质</h2><p>详情页只会显示你点击的条目，不会自动读取列表第一项或默认化合物。</p></section>`}</div>`);
 if(selectedCompound&&professional2D)PublicationChem.draw(selectedCompound,$("#publicationStructure"));
 if(scrollState){
  const restore=()=>{
   const list=$(".chem-list");
   if(list)list.scrollTop=scrollState.list;
   window.scrollTo({top:scrollState.page,left:0,behavior:"auto"});
  };
  restore();
  requestAnimationFrame(()=>{restore();requestAnimationFrame(restore)});
 }
 $("#chemSearch").oninput=e=>{S.chem.search=e.target.value;save();clearTimeout(window.chemTimer);window.chemTimer=setTimeout(renderChem,180)};
 $("#chemLS").onchange=e=>{S.chem.ls=e.target.value;save();renderChem()};
 $$("[data-chem-id]").forEach(b=>b.onclick=()=>{
  const list=b.closest(".chem-list");
  const scrollState={page:window.scrollY,list:list?list.scrollTop:0};
  S.chem.selected=b.dataset.chemId;
  save();
  renderChem(scrollState);
 });
 $$("[data-chem-view]").forEach(b=>b.onclick=()=>{S.chem.view=b.dataset.chemView;save();renderChem()});
}

function renderLab(){
 let lab=LD.experiments.find(x=>x.id===(S.lab.current||LD.experiments[0].id)), st=S.lab[lab.id]||{step:0,score:0,feedback:""}, step=lab.steps[st.step], done=st.step>=lab.steps.length;
 app.innerHTML=shell("实验模式","你来决定下一步。系统解释为什么这样做，以及错误会造成什么。",`
 <div class="lab-tabs">${LD.experiments.map(x=>`<button data-lab="${x.id}" class="${x.id===lab.id?"active":""}"><span>LS${String(x.ls).padStart(2,"0")}</span>${x.t}</button>`).join("")}</div>
 <div class="lab-stage"><section class="lab-status"><p class="kicker">实验目标</p><h2>${lab.t} ${say(lab.t)}</h2><p>${lab.goal}</p><div class="lab-line">${lab.steps.map((x,i)=>`<span class="${i<st.step?"done":i===st.step?"now":""}">${i+1}</span>`).join("")}</div><b>${done?"实验完成":`步骤 ${st.step+1}/${lab.steps.length}`}</b><strong>${st.score} 分</strong></section>
 <section class="decision">${done?`<div class="finish"><span>✓</span><h2>实验流程完成</h2><p>你已经走完整个流程。重点不是记住顺序，而是能解释每一步如何影响反应、工艺窗口和最终漆膜。</p><button id="restartLab">重新实验</button></div>`:`<p class="kicker">WAS MACHEN SIE ALS NÄCHSTES?</p><h2>下一步应该做什么？</h2><p class="step-name">${step[0]}</p><div class="choices">${shuffle([step[1],...step[3]]).map(x=>`<button data-choice="${esc(x)}">${x}</button>`).join("")}</div><div id="labFeedback">${st.feedback||""}</div>`}</section>
 <aside class="lab-notes"><h3>实验记录</h3><p><b>为什么本实验重要？</b><br>${ch(lab.ls).why}</p><p><b>关联章节</b><br>${ch(lab.ls).next.filter(n=>n<=14).map(n=>"LS"+String(n).padStart(2,"0")).join(" · ")||"综合应用"}</p><p><b>考试表达模板</b><br>Dieser Schritt ist notwendig, weil … Ohne diesen Schritt würde …</p></aside></div>`);
 $$("[data-lab]").forEach(b=>b.onclick=()=>{S.lab.current=b.dataset.lab;save();renderLab()});
 if(done)$("#restartLab").onclick=()=>{S.lab[lab.id]={step:0,score:0,feedback:""};save();renderLab()};
 else $$("[data-choice]").forEach(b=>b.onclick=()=>{let correct=b.dataset.choice===step[1];st.feedback=`<div class="${correct?"ok":"bad"}"><b>${correct?"正确":"不对"}</b><p>${correct?step[2]:`这样做会破坏流程控制。正确选择是：${step[1]}。原因：${step[2]}`}</p></div>`;if(correct){st.step++;st.score+=10;st.feedback=""}S.lab[lab.id]=st;save();setTimeout(renderLab,correct?450:0);if(!correct)renderLab()});
}
function shuffle(a){return a.map(x=>[Math.random(),x]).sort((a,b)=>a[0]-b[0]).map(x=>x[1])}

function renderMap(){
 let selected=ch(S.chapter);
 app.innerHTML=shell("知识网络模式","点击章节，查看它为什么在这里、依赖什么、又通向哪里。",`
 <div class="map-layout"><section class="course-map"><div class="map-spine">${LD.chapters.map(c=>`<button data-map-ch="${c.n}" class="${c.n===selected.n?"active":""}" style="--row:${c.n}"><span>${String(c.n).padStart(2,"0")}</span><b>${c.t}</b><small>${c.de}</small></button>`).join("")}</div><div class="map-arrows">${LD.edges.map(e=>`<button data-edge="${e[0]}-${e[1]}" class="${e[0]===selected.n||e[1]===selected.n?"active":""}">LS${String(e[0]).padStart(2,"0")} → LS${String(e[1]).padStart(2,"0")} · ${e[2]}</button>`).join("")}</div></section>
 <aside class="map-detail"><span class="badge">LS${String(selected.n).padStart(2,"0")}</span><h2>${selected.t} ${say(selected.t)}</h2><p>${selected.de} ${say(selected.de)}</p><h3>为什么在这里？</h3><p>${selected.why}</p><h3>本章五个支点</h3><ol>${selected.core.map(x=>`<li>${x} ${say(x)}</li>`).join("")}</ol><h3>直接连接</h3><div class="map-links">${LD.edges.filter(e=>e[0]===selected.n||e[1]===selected.n).map(e=>`<button data-map-ch="${e[0]===selected.n?e[1]:e[0]}">${e[2]} → LS${String(e[0]===selected.n?e[1]:e[0]).padStart(2,"0")}</button>`).join("")}</div><button id="studySelected" class="primary">学习本章</button></aside></div>`);
 $$("[data-map-ch]").forEach(b=>b.onclick=()=>{S.chapter=Number(b.dataset.mapCh);save();renderMap()});$("#studySelected").onclick=()=>mode("learn");
}

function renderExam(){
 let chain=LD.whyChains[S.why.chain||0], level=S.why.level||0, questions=S.exam.length&&S.exam.every(i=>i<bank.length)?S.exam:makeExam(), q=questions[S.examPos%questions.length];
 app.innerHTML=shell("考试模式","随机抽题、五层 Warum 追问、错题与薄弱章节统计。",`
 <div class="exam-tabs"><button data-exam-tab="random" class="${S.why.tab!=="why"?"active":""}">顺序口试</button><button data-exam-tab="why" class="${S.why.tab==="why"?"active":""}">五层 Warum</button><button data-exam-tab="stats">薄弱项统计</button></div>
 <div id="examBody">${S.why.tab==="why"?whyExam(chain,level):S.why.tab==="stats"?statsView():randomExam(q)}</div>`);
 $$("[data-exam-tab]").forEach(b=>b.onclick=()=>{S.why.tab=b.dataset.examTab;save();renderExam()});
 if(S.why.tab==="why"){
  if($("#whyChapter"))$("#whyChapter").onchange=e=>{S.why.chain=Math.max(0,LD.whyChains.findIndex(x=>x.ls===Number(e.target.value)));S.why.level=0;save();renderExam()};
  if($("#whyTopic"))$("#whyTopic").onchange=e=>{S.why.chain=Number(e.target.value);S.why.level=0;save();renderExam()};
  if($("#revealWhy"))$("#revealWhy").onclick=()=>{S.why.level=Math.min(5,level+1);save();renderExam()};
  if($("#nextChain"))$("#nextChain").onclick=()=>{S.why.chain=((S.why.chain||0)+1)%LD.whyChains.length;S.why.level=0;save();renderExam()}
 }
 else if(S.why.tab!=="stats"){let area=$("#oralAnswer");area.oninput=e=>{S.answers[q.id]=e.target.value;save()};$("#oralReveal").onclick=()=>$("#oralModel").classList.remove("hidden");$("#oralWrong").onclick=()=>{if(!S.wrong.includes(q.id))S.wrong.push(q.id);S.examPos++;save();renderExam()};$("#oralGood").onclick=()=>{if(!S.mastered.includes(q.id))S.mastered.push(q.id);S.examPos++;save();renderExam()}}
 else $$("[data-stat-ch]").forEach(b=>b.onclick=()=>{S.chapter=Number(b.dataset.statCh);mode("learn")});
}
function makeExam(){S.exam=bank.map((_,i)=>i);S.examPos=0;save();return S.exam}
function randomExam(i){let q=bank[i];return `<section class="oral"><span>LS${String(q.chapter).padStart(2,"0")} · ${q.kind}</span><h2>Professor:</h2><blockquote>${esc(q.qDe)} ${say(q.qDe)}</blockquote><textarea id="oralAnswer" placeholder="Antworten Sie mündlich oder schriftlich auf Deutsch…">${esc(S.answers[q.id]||"")}</textarea><div class="oral-actions"><button id="oralReveal">标准答案</button><button id="oralWrong" class="warn">不会 / 错题</button><button id="oralGood" class="primary">回答正确</button></div><div id="oralModel" class="model hidden"><h3>Musterantwort</h3><p>${esc(q.answer)} ${say(q.answer)}</p><h3>Warum fragt der Professor?</h3><p>${esc(q.why)}</p></div></section>`}
function whyExam(c,l){let ci=S.why.chain||0,topics=LD.whyChains.map((x,i)=>[x,i]).filter(([x])=>x.ls===c.ls);return `<section class="why-exam"><div class="why-selectors"><label>章节<select id="whyChapter">${LD.chapters.map(x=>`<option value="${x.n}" ${x.n===c.ls?"selected":""}>LS${String(x.n).padStart(2,"0")} · ${x.t}</option>`).join("")}</select></label><label>重点知识点<select id="whyTopic">${topics.map(([x,i])=>`<option value="${i}" ${i===ci?"selected":""}>${x.t}</option>`).join("")}</select></label><span>${ci+1}/${LD.whyChains.length} 组</span></div><span>LS${String(c.ls).padStart(2,"0")} · 五层追问 · ${c.source}</span><h2>Professor: ${c.t} ${say(c.t)}</h2><div class="why-ladder">${c.steps.map((x,i)=>`<div class="${i<l?"shown":""}"><b>${i+1}</b><p>${i<l?`${x} ${say(x)}`:"Warum?"}</p></div>`).join("")}</div>${l<5?`<textarea placeholder="先用德语回答第 ${l+1} 层 Warum…"></textarea><button id="revealWhy" class="primary">显示这一层并继续追问</button>`:`<div class="mechanism-answer"><p class="kicker">REAKTIONSMECHANISMUS / STRUKTUR</p><h3>课件反应机理重绘</h3><pre>${esc(c.mechanism)}</pre></div><div class="trap"><b>教授最后的陷阱</b><p>${c.trap}</p><button id="nextChain">下一条五层追问 →</button></div>`}</section>`}
function statsView(){let per=LD.chapters.map(c=>{let qs=bank.filter(q=>q.chapter===c.n),w=qs.filter(q=>S.wrong.includes(q.id)).length,m=qs.filter(q=>S.mastered.includes(q.id)).length;return {...c,w,m,total:qs.length,weak:w?Math.round(w/(w+m||1)*100):0}}).sort((a,b)=>b.weak-a.weak),labsDone=LD.experiments.filter(e=>(S.lab[e.id]?.step||0)>=e.steps.length).length;return `<section class="stats"><div class="stats-top"><article><span>已掌握</span><b>${S.mastered.length}</b><small>/ ${bank.length}</small></article><article><span>错题</span><b>${S.wrong.length}</b><small>需要回看</small></article><article><span>实验完成</span><b>${labsDone}</b><small>/ ${LD.experiments.length}</small></article></div><h2>薄弱章节</h2>${per.map(x=>`<button data-stat-ch="${x.n}"><span>LS${String(x.n).padStart(2,"0")} · ${x.t}</span><div><i style="width:${x.weak}%"></i></div><b>${x.w} 错题 · ${x.m} 掌握</b></button>`).join("")}</section>`}

$("#resetAll").onclick=()=>{if(confirm("删除所有答案、进度、错题和实验记录？")){localStorage.removeItem(KEY);location.reload()}};
$("#bankSummary").textContent=`${bank.length} Fragen · LS01–LS10 · 基础到教授追问 · 离线保存`;
render();
