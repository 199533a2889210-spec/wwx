(function(){
const valence={C:4,N:3,O:2,S:2,P:3,F:1,Cl:1,Br:1,I:1,Si:4,H:1,Ti:0,Sn:0,Zn:0,Co:0,Ca:0,Ba:0,Na:0,Li:0};
const atomPattern=/Cl|Br|Si|Sn|Ti|Zn|Co|Ca|Ba|Na|Li|[A-Z]|[cnosp]/y;
function parse(smiles){
 let atoms=[],bonds=[],stack=[],rings={},current=null,bond=1,i=0,component=0;
 const add=(el,aromatic=false,charge=0)=>{let idx=atoms.length;atoms.push({el,aromatic,charge,component});if(current!==null)bonds.push({a:current,b:idx,o:bond===1&&atoms[current].aromatic&&aromatic?1.5:bond});current=idx;bond=1};
 while(i<smiles.length){let c=smiles[i];
  if(c==="("){stack.push(current);i++;continue} if(c===")"){current=stack.pop();i++;continue}
  if(c==="."){current=null;component++;i++;continue} if(c==="="){bond=2;i++;continue} if(c==="#"){bond=3;i++;continue} if(c==="-"){bond=1;i++;continue}
  if(/[0-9]/.test(c)){let d=c;if(rings[d]!==undefined){bonds.push({a:current,b:rings[d],o:bond===1&&atoms[current].aromatic&&atoms[rings[d]].aromatic?1.5:bond});delete rings[d]}else rings[d]=current;bond=1;i++;continue}
  if(c==="["){let e=smiles.indexOf("]",i),inside=smiles.slice(i+1,e),m=inside.match(/^(Cl|Br|Si|Sn|Ti|Zn|Co|Ca|Ba|Na|Li|[A-Za-z])/),el=m?m[1]:"C",charge=(inside.match(/\+/g)||[]).length-(inside.match(/-/g)||[]).length;add(el[0].toUpperCase()+el.slice(1),false,charge);i=e+1;continue}
  atomPattern.lastIndex=i;let m=atomPattern.exec(smiles);if(m){let raw=m[0],aromatic=raw===raw.toLowerCase(),el=raw[0].toUpperCase()+raw.slice(1);add(el,aromatic,0);i=atomPattern.lastIndex;continue}i++;
 }
 return {atoms,bonds};
}
function explicitHydrogens(g){
 let atoms=g.atoms.map(x=>({...x})),bonds=g.bonds.map(x=>({...x}));
 g.atoms.forEach((a,i)=>{if(a.el==="H"||valence[a.el]===0)return;let attached=g.bonds.filter(b=>b.a===i||b.b===i),sum=attached.reduce((n,b)=>n+(b.o===1.5?1.5:b.o),0),h=0;
  if(a.aromatic)h=a.el==="C"&&attached.length===2?1:0;
  else if(a.charge<0)h=0;
  else h=Math.max(0,Math.round((valence[a.el]??0)+(a.charge>0?1:0)-sum));
  for(let k=0;k<h;k++){let j=atoms.length;atoms.push({el:"H",aromatic:false,charge:0,component:a.component,parent:i,hIndex:k});bonds.push({a:i,b:j,o:1,hydrogen:true})}
 });return {atoms,bonds};
}
function layout(g,w=920,h=570,three=false){
 let n=g.atoms.length,cx=w/2,cy=h/2,r=Math.min(w,h)*.31,pos=g.atoms.map((a,i)=>({x:cx+Math.cos(i*2.399)*r*(.45+(i%n)/n*.55),y:cy+Math.sin(i*2.399)*r*(.45+(i%n)/n*.55),z:three?Math.sin(i*1.71)*55:0}));
 g.atoms.forEach((a,i)=>{if(a.el==="H"&&a.parent!==undefined){let p=pos[a.parent],ang=(a.hIndex*2.1+i*.77);pos[i]={x:p.x+Math.cos(ang)*42,y:p.y+Math.sin(ang)*42,z:three?Math.sin(ang)*35:0}}});
 let iterations=n>90?90:170;
 for(let t=0;t<iterations;t++){let fx=Array(n).fill(0),fy=Array(n).fill(0);
  for(let i=0;i<n;i++)for(let j=i+1;j<n;j++){let dx=pos[j].x-pos[i].x,dy=pos[j].y-pos[i].y,d2=dx*dx+dy*dy+25,d=Math.sqrt(d2),f=(n>80?750:1300)/d2;fx[i]-=f*dx/d;fy[i]-=f*dy/d;fx[j]+=f*dx/d;fy[j]+=f*dy/d}
  g.bonds.forEach(b=>{let dx=pos[b.b].x-pos[b.a].x,dy=pos[b.b].y-pos[b.a].y,d=Math.sqrt(dx*dx+dy*dy)||1,target=b.hydrogen?34:58,f=(d-target)*.016;fx[b.a]+=f*dx;fy[b.a]+=f*dy;fx[b.b]-=f*dx;fy[b.b]-=f*dy});
  for(let i=0;i<n;i++){fx[i]+=(cx-pos[i].x)*.0008;fy[i]+=(cy-pos[i].y)*.0008;pos[i].x+=Math.max(-4,Math.min(4,fx[i]));pos[i].y+=Math.max(-4,Math.min(4,fy[i]))}
 }
 let minx=Math.min(...pos.map(p=>p.x)),maxx=Math.max(...pos.map(p=>p.x)),miny=Math.min(...pos.map(p=>p.y)),maxy=Math.max(...pos.map(p=>p.y)),scale=Math.min((w-90)/(maxx-minx||1),(h-80)/(maxy-miny||1),1.4);
 pos.forEach(p=>{p.x=(p.x-(minx+maxx)/2)*scale+cx;p.y=(p.y-(miny+maxy)/2)*scale+cy});return pos;
}
function groups(g){
 let mark={};const adj=i=>g.bonds.filter(b=>b.a===i||b.b===i).map(b=>({j:b.a===i?b.b:b.a,o:b.o,b}));
 const set=(ids,name,color,desc)=>ids.forEach(i=>{mark[i]={name,color,desc}});
 g.atoms.forEach((a,i)=>{
  let ns=adj(i);
  if(a.el==="O"&&ns.some(x=>g.atoms[x.j].el==="H"))set([i,...ns.filter(x=>g.atoms[x.j].el==="H").map(x=>x.j)],"羟基 (Hydroxyl Group)","#287bc1","OH：参与酯化、氨基甲酸酯形成或氢键作用。");
  if(a.el==="N"&&ns.filter(x=>g.atoms[x.j].el==="H").length>=2)set([i,...ns.map(x=>x.j)],"氨基 (Amino Group)","#2c9b58","NH₂：可进攻环氧基或参与缩合/加成。");
  if(a.el==="C"){let od=ns.find(x=>g.atoms[x.j].el==="O"&&x.o===2),os=ns.find(x=>g.atoms[x.j].el==="O"&&x.o===1&&adj(x.j).some(y=>g.atoms[y.j].el==="H"));if(od&&os)set([i,od.j,os.j,...adj(os.j).filter(y=>g.atoms[y.j].el==="H").map(y=>y.j)],"羧基 (Carboxyl Group)","#cf3f46","COOH：在本课程中参与酯化反应。")}
  let cc=ns.find(x=>g.atoms[x.j].el==="C"&&x.o===2);if(a.el==="C"&&cc)set([i,cc.j],"碳碳双键 (C=C)","#7d4cc2","C=C：参与自由基聚合或氧化交联。");
  if(a.el==="N"){let c1=ns.find(x=>g.atoms[x.j].el==="C"&&x.o===2);if(c1){let o=adj(c1.j).find(x=>g.atoms[x.j].el==="O"&&x.o===2);if(o)set([i,c1.j,o.j],"异氰酸酯基 (Isocyanate Group)","#c5a316","N=C=O：中心碳受到OH、水或胺的亲核进攻。")}}
  if(a.el==="O"&&ns.length===2&&ns.every(x=>g.atoms[x.j].el==="C")){let [x,y]=ns.map(x=>x.j);if(g.bonds.some(b=>(b.a===x&&b.b===y)||(b.a===y&&b.b===x)))set([i,x,y],"环氧基 (Epoxide Group)","#e77b28","三元环环氧基：受胺等亲核试剂进攻而开环。")}
 });return mark;
}
function xml(s){return String(s).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]))}
function svg(smiles,mode="expanded"){
 let base=parse(smiles),g=mode==="skeletal"?base:explicitHydrogens(base),pos=layout(g,920,570,mode==="3d"),mark=groups(g),showAtom=(a)=>mode!=="skeletal"||a.el!=="C",bondSvg="";
 g.bonds.forEach((b,bi)=>{if(mode==="skeletal"&&(g.atoms[b.a].el==="H"||g.atoms[b.b].el==="H"))return;let p=pos[b.a],q=pos[b.b],dx=q.x-p.x,dy=q.y-p.y,len=Math.hypot(dx,dy)||1,nx=-dy/len*4,ny=dx/len*4,order=b.o===1.5?2:Math.round(b.o),style=mode==="3d"?(bi%3===0?'stroke-dasharray="5 4"':bi%3===1?'stroke-width="5"':''):"";
  if(order===1)bondSvg+=`<line x1="${p.x}" y1="${p.y}" x2="${q.x}" y2="${q.y}" ${style}/>`;
  else for(let k=0;k<order;k++){let off=(k-(order-1)/2)*2;bondSvg+=`<line x1="${p.x+nx*off}" y1="${p.y+ny*off}" x2="${q.x+nx*off}" y2="${q.y+ny*off}" ${style}/>`}
 });
 let atomSvg=g.atoms.map((a,i)=>{if(!showAtom(a))return"";let p=pos[i],m=mark[i],color=m?.color||(a.el==="O"?"#d23d45":a.el==="N"?"#246fbd":a.el==="S"?"#b18b13":a.el==="Cl"?"#2f9b57":"#17231f"),charge=a.charge>0?"+":a.charge<0?"−":"",dots="";
  if(mode==="lewis"&&["O","N","S","Cl","Br","F"].includes(a.el)){let pairs=a.el==="O"?2:a.el==="N"?1:a.el==="Cl"?3:2;for(let k=0;k<pairs;k++){let an=k*Math.PI*2/pairs;dots+=`<circle cx="${p.x+Math.cos(an)*15}" cy="${p.y+Math.sin(an)*15}" r="1.8"/><circle cx="${p.x+Math.cos(an)*19}" cy="${p.y+Math.sin(an)*19}" r="1.8"/>`}}
  return `<g class="atom" data-group="${xml(m?.name||"")}"><title>${xml(m?m.name+" — "+m.desc:a.el+" atom")}</title><circle cx="${p.x}" cy="${p.y}" r="${a.el==="H"?9:13}" fill="#fffdf8" stroke="${m?.color||"transparent"}" stroke-width="3"/><text x="${p.x}" y="${p.y+5}" fill="${color}">${a.el}${charge}</text>${dots}</g>`}).join("");
 return `<svg class="chem-svg" viewBox="0 0 920 570" role="img" aria-label="Chemical structure in ${mode} mode"><g class="bonds">${bondSvg}</g><g class="atoms">${atomSvg}</g></svg>`;
}
window.ChemDraw={svg,parse};
})();
