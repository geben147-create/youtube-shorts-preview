/* Newborn / low-subscriber / few-video lab and exploration classes. Unknown values are never guessed. */
(() => {'use strict';
const KEY='geben147.youtube-shorts-preview.lab.v1', DAY=86400000, fin=Number.isFinite;
const defaults={age:'',first:'',videos:'',subs:'',x:'',views:'',cls:'all',top:'',detail:'all',xBasis:'avg'};
let st={...defaults}, cfg=null, report={checked:0,matched:0,unknown:0}, root=null;
const dayNum=s=>typeof s==='string'&&/^\d{4}-\d\d-\d\d$/.test(s)?Date.parse(s+'T00:00:00Z'):NaN;
const num=v=>v===''||v==null?null:(Number.isFinite(Number(v))&&Number(v)>=0?Number(v):null);
function load(){try{const o=JSON.parse(localStorage.getItem(KEY)||'null');if(o&&typeof o==='object')st={...defaults,...Object.fromEntries(Object.entries(o).filter(([k])=>k in defaults))};}catch{}}
function save(){try{localStorage.setItem(KEY,JSON.stringify(st));}catch{}}
function ageDays(date,today){const a=dayNum(date);return fin(a)&&fin(today)&&a<=today?Math.floor((today-a)/DAY):null;}
function facts(x,m,today){const r=m?.record, joined=x.joinDate||r?.joinDate||null, first=x.firstPublic||(r?.early?.firstPublicConfirmed?r.early.firstPublicDate:null)||null;
 const subs=num(x.subs), views=num(x.v), videos=num(x.chVideos);
 return {channelAge:ageDays(joined,today),firstAge:ageDays(first,today),subs,videos,views,x:subs>0&&views!=null?views/subs:null,joined,first};}
function cls(x,m,today){if(x.cls&&'ABCD'.includes(x.cls))return x.cls;const f=facts(x,m,today);
 if(m?.grade===3&&(m.actual!=null||m.monthly))return 'A';
 if(f.channelAge!=null&&f.channelAge<=90&&f.views!=null&&(f.views>=100000||(f.x!=null&&f.x>=10&&f.views>=10000)))return 'C';
 if(f.views!=null&&f.views>=1000000&&m?.grade>=2)return 'B';
 if(f.views!=null&&f.views<10000&&m?.grade>=1)return 'D';
 return '';}
const label={A:'A 실측 검증',B:'B 고수익 벤치마킹',C:'C 신생 급성장',D:'D 저성과·추가검증','':'미분류'};
function match(x,m,today){const f=facts(x,m,today);const ex=[];const need=[['age','channelAge',st.age],['first','firstAge',st.first]];
 report.checked++;
 for(const [,key,v] of need){const lim=num(v);if(lim==null)continue;if(f[key]==null){ex.push(key);continue;}if(f[key]>lim)return false;}
 const maxV=num(st.videos);if(maxV!=null){if(f.videos==null)ex.push('videos');else if(f.videos>maxV)return false;}
 const maxS=num(st.subs);if(maxS!=null){if(f.subs==null)ex.push('subs');else if(f.subs>maxS)return false;}
 const minX=num(st.x);if(minX!=null){if(f.x==null)ex.push('x');else if(f.x<minX)return false;}
 const minV=num(st.views);if(minV!=null){if(f.views==null)ex.push('views');else if(f.views<minV)return false;}
 if(st.cls!=='all'&&cls(x,m,today)!==st.cls)return false;
 if(st.detail!=='all'){const item=window.ShortsTaxonomy?.details.find(d=>d.id===st.detail);if(item&&!window.ShortsTaxonomy.matches(item,x))return false;}
 if(ex.length){report.unknown++;return false;}
 report.matched++;return true;}
function begin(){report={checked:0,matched:0,unknown:0};}
const el=(t,txt,c)=>{const n=document.createElement(t);if(txt!=null)n.textContent=txt;if(c)n.className=c;return n;};
function field(label,key,ph,pre){const l=el('label',label);const i=el('input');i.type='number';i.min='0';i.step='any';i.placeholder=ph||'제한 없음';i.value=st[key];i.dataset.lab=key;i.addEventListener('input',()=>{st[key]=i.value;save();cfg?.onChange?.();paint();});l.append(i);return l;}
function chips(key,values,title,unit='일',fmt=v=>v+unit){const w=el('div','', 'sw-lab-chips');w.append(el('strong',title));for(const v of values){const b=el('button',fmt(v));b.type='button';b.dataset.labChip=key+':'+v;b.addEventListener('click',()=>{st[key]=st[key]===String(v)?'':String(v);save();render();cfg?.onChange?.();});w.append(b);}return w;}
function render(){if(!root)return;root.replaceChildren();root.append(el('summary','🚀 신생·저구독·소수 영상 고수익 연구소'));
 const box=el('div','', 'sw-lab');
 box.append(chips('age',[1,3,7,10,14,30,60,90,180,365],'채널 개설 이내'),chips('first',[1,3,7,10,14,30,60,90,180,365],'콘텐츠 첫 공개 이내'),chips('videos',[1,3,5,10,20,30,50,100],'공개 영상 이하','개',v=>v+'개'),chips('subs',[100,500,1000,5000,10000,50000,100000],'구독자 이하','명',v=>v>=10000?v/10000+'만':v>=1000?v/1000+'천':v+'명'),chips('x',[1,2,3,5,10,30,50,100],'X 배수 이상','배',v=>'X'+v),chips('top',[1,3,5,7,8,10,20,30,50,100,200,500],'상위 N개','개',v=>v+'개'));
 const row=el('div','', 'sw-lab-row');row.append(field('개설 N일 이내','age'),field('첫 공개 N일 이내','first'),field('공개 영상 N개 이하','videos'),field('구독자 N명 이하','subs'),field('X 배수 이상 (조회/구독자)','x'),field('최소 조회수','views'),field('상위 N개 (순위 제한)','top'));
 const sel=el('select');sel.dataset.lab='cls';for(const [v,t] of [['all','탐색 상태 전체'],['A','A 실측 검증'],['B','B 고수익 벤치마킹'],['C','C 신생 급성장'],['D','D 저성과·추가검증']])sel.add(new Option(t,v,false,st.cls===v));sel.addEventListener('change',()=>{st.cls=sel.value;save();cfg?.onChange?.();paint();});const l1=el('label','탐색 상태 (수익 근거 A/B/C/U와 별개)');l1.append(sel);row.append(l1);
 const det=el('select');det.dataset.lab='detail';det.add(new Option('세부 분야 142 전체','all',false,st.detail==='all'));const rows=cfg?.rows?.()||[];for(const d of window.ShortsTaxonomy.count(window.ShortsTaxonomy.details,rows))det.add(new Option(d.name+' · '+d.n+'편',d.id,false,st.detail===d.id));det.addEventListener('change',()=>{st.detail=det.value;save();cfg?.onChange?.();paint();});const l2=el('label','세부 분야 (쇼츠 표본 기준 건수)');l2.append(det);row.append(l2);
 box.append(row);const foot=el('p','', 'sw-lab-foot');foot.id='sw-lab-foot';box.append(foot,el('p','구독자·개설일·공개 영상 수가 없는 영상은 해당 조건에서 임의로 통과시키지 않고 ‘미확인 제외’로 셉니다. X는 현재 구독자 기준이며 업로드 당시 구독자가 아닙니다.','sw-lab-note'));
 const rb=el('button','연구소 조건 초기화');rb.type='button';rb.addEventListener('click',()=>{st={...defaults};save();render();cfg?.onChange?.();});box.append(rb);root.append(box);paint();}
function paint(){const foot=document.getElementById('sw-lab-foot');if(foot)foot.textContent='현재 표본 '+report.checked+'편 검사 · 통과 '+report.matched+' · 미확인 제외 '+report.unknown;for(const b of root?.querySelectorAll('[data-lab-chip]')||[]){const [k,v]=b.dataset.labChip.split(':');b.setAttribute('aria-pressed',String(st[k]===v));}}
function init(config){cfg=config;root=config.host;load();render();}
window.ShortsLab={init,rerender:render,match,begin,paint,cls,facts,label,topN:()=>num(st.top),active:()=>JSON.stringify(st)!==JSON.stringify(defaults),state:()=>({...st}),report:()=>({...report}),_set(o){st={...st,...o};save();}};
})();
