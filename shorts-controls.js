/* Browser-local display/navigation controls. The workspace owns filters, rankings and rendering. */
(() => {
'use strict';
const W=window,D=document,KEY='geben147.youtube-shorts-preview.controls.v1',apps=new WeakMap();
const Q='[data-sw-tip]', clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
const node=(tag,text,cls)=>{const el=D.createElement(tag);if(text!=null)el.textContent=text;if(cls)el.className=cls;return el;};
const button=(text,cls)=>{const el=node('button',text,cls);el.type='button';return el;};
const interactive='a[href],button,input,select,textarea,summary,[role="link"]';
const definitions=Object.create(null);
function define(key,label,short,detail){definitions[key]={label,short,detail};}
define('sort','정렬 기준','어떤 값을 먼저 비교할지 고릅니다.','선택한 지표와 방향은 현재 목록의 순서에 반영됩니다. 확인되지 않은 값은 0이 아니며, 점수의 세부 규칙은 현재 조건 조합의 설명을 참고하세요.');
define('order','현재 정렬','현재 적용된 지표와 방향입니다.','높은 값부터 또는 낮은 값부터 비교합니다. 화면에 표시된 순서는 서로 다른 후보를 비교하는 도구이지 수익 보장이 아닙니다.');
define('earn','선택 금액','현재 선택한 금액 종류로 비교합니다.','광고 추정, 광고 실측, 실제 거래액, 실현 이익은 서로 다른 값입니다. 출처 또는 추정 모형을 확인하세요.');
define('views','공개 조회수','영상에 공개된 누적 조회수입니다.','누적 관측치라 영상마다 관측 기간이 다를 수 있습니다. 게시 후 같은 시간이 지난 영상끼리 비교한 조회수는 아닙니다.');
define('recent','게시일','영상이 공개된 날짜입니다.','채널 개설일이나 이 쇼츠 형식의 시작일과는 다릅니다.');
define('stable','최근 중앙값','정해진 최근 표본의 가운데 조회수입니다.','조회수의 크기 순으로 정렬한 뒤 중간값을 사용하여 한 편의 대박이 평균에 미치는 영향을 줄입니다. 표본 범위와 크기를 함께 보세요.');
define('hit','목표 달성률','설정한 목표를 넘은 영상의 비율입니다.','비교 표본과 목표가 같을 때 해석하기 쉽습니다. 목표 달성 영상 수를 유효 표본 수로 나눕니다.');
define('floor','하위 25%','최근 표본의 아래쪽 조회수 수준입니다.','잘된 영상이 아닌 상대적으로 낮은 영상의 성과를 비교하는 데 쓰입니다.');
define('avg','최근 평균','최근 비교 표본의 평균 조회수입니다.','조회수 합을 유효 표본 수로 나눕니다. 극단적으로 높은 영상 한 편의 영향을 받을 수 있습니다.');
define('down','감소율','이전 구간 대비 최근 성과가 얼마나 줄었는지 봅니다.','비교 구간·표본 수·관측 시점에 따라 결과가 달라집니다. 감소는 상태 신호이지 원인이나 미래 실적의 확정이 아닙니다.');
define('repeat','반복 성과율','비교 기준을 반복해서 넘은 영상의 비율입니다.','유효한 연속 표본과 사용한 기준값을 확인하세요. 조회수 반복 성과는 수익 실측이나 반복 거래를 뜻하지 않습니다.');
define('sample','연속 표본 편수','같은 기준으로 확인된 연속 비교 표본 수입니다.','표본이 짧거나 빠진 자료가 있으면 채널 전체를 대표한다고 단정할 수 없습니다.');
define('concentration','최고작 비중','유효 표본에서 가장 조회수가 높은 한 편의 몫입니다.','높을수록 성과가 소수 영상에 의존할 수 있습니다. 반복 성과율과 표본 수를 함께 보세요.');
define('work','직접 작업시간','본인이 직접 투입한 제작 시간입니다.','도구 실행 대기나 외주 작업은 직접 시간과 구분될 수 있습니다. 출처, 기록 기간, 측정 범위를 확인하세요.');
define('cost','제작비','제작에 들어간 근거 있는 비용입니다.','기록에 포함된 비용의 범위를 확인하세요. 미산정은 무료라는 뜻이 아닙니다.');
define('sales','실제 거래액','근거로 확인한 거래의 금액입니다.','매출·거래액은 제작 비용을 뺀 이익이 아닙니다. 광고 추정액과 섞어서 비교하지 마세요.');
define('orders','실제 거래 건수','근거로 확인한 거래 횟수입니다.','조회·문의·구독 수와는 다릅니다. 동일한 관측 기간을 기준으로 비교하세요.');
define('repeatOrders','반복 거래 건수','근거로 확인된 반복 거래 횟수입니다.','기록이 없는 경우는 0건과 다릅니다. 출처가 집계한 반복 거래 기준과 기간을 확인하세요.');
define('profit','실현 이익','거래나 정산 기록으로 확인한 이익입니다.','총 거래액이나 광고 추정과 다릅니다. 비용 범위와 기간은 원본 근거를 확인하세요.');
define('hourly','시간당 이익','실현 이익을 직접 작업시간으로 나눈 값입니다.','같은 범위와 기간의 이익 및 작업시간이 확인되어야 비교할 수 있습니다. 시간에 0이나 미확인을 넣어 계산하지 않습니다.');
define('age','콘텐츠 시작 경과일','근거로 확인한 시작 날짜부터 지난 날입니다.','채널 개설일과 실제 비교 대상 콘텐츠 시작일은 다를 수 있습니다. 보이는 오래된 영상만으로 시작이 확인되지는 않습니다.');
define('d7','D7 조회수','게시 후 7일 기준으로 관측한 조회수입니다.','현재 누적 조회수와 다릅니다. 같은 시점의 관측치가 없는 경우에는 정확한 D7로 간주하지 않습니다.');
define('grade','근거 등급','표시한 수치의 출처와 확인 정도입니다.','A는 정산·제작·사업 실측 등, B는 공개 원본 관측, C는 그 밖의 공개 기록입니다. 미확인은 확인된 0과 다릅니다.');
define('evidence','근거 충족','현재 조건의 확인 기준을 충족한 후보입니다.','근거 충족은 현재 수집된 기록으로 확인한 결과입니다. 사업·수익이 보장되거나 다른 조건에도 맞는다는 뜻은 아닙니다.');
define('research','추가 조사','현재 근거만으로 판단을 끝내기 어려운 후보입니다.','공개되지 않았거나 부족한 자료는 0이나 거짓으로 처리하지 않습니다. 표본·출처·측정 기간을 확인하세요.');
define('unknown','미확인','현재 근거가 없거나 비교 가능한 상태가 아닙니다.','미확인은 0과 다릅니다. 없다고 단정하지 않고 원본 관측 또는 실측 근거를 추가 확인해야 합니다.');
define('rights','권리 문제','권리 기준에서 제외되거나 확인이 필요한 항목입니다.','공개 영상이라고 재사용할 권리가 생기는 것은 아닙니다. 재사용 전에 권리와 허용 범위를 확인하세요.');
define('sustainable','지속수익','여러 시점의 실측 수익 근거를 확인하는 표시입니다.','누적 조회수 또는 추정 광고액만으로 지속수익을 확정할 수 없습니다. 적용한 조건과 관측 기간을 확인하세요.');
define('estimate','광고 추정','조회수 등을 모형에 대입한 값입니다.','정산 화면에서 확인한 수익이 아닙니다. 모형이나 국가·환율 가정이 달라지면 값도 달라질 수 있습니다.');
define('actual','광고 실측','광고 정산 등 원본에서 확인한 값입니다.','영상·채널·기간 범위를 원본과 맞춰 비교하세요. 사업 거래액이나 추정 광고액과 다릅니다.');
define('score','비교 점수','현재 조건에서 후보를 비교하는 점수입니다.','실측 금액이나 수익 보장이 아닙니다. 점수에 포함된 지표와 미확인 근거를 함께 확인하세요.');
define('position','관찰 범위','후보가 어느 비교 범위에 있는지 나타냅니다.','상태나 위치 표시는 비교용입니다. 원본 근거와 시점을 함께 보세요.');
for(const [alias,key] of Object.entries({earnings:'earn',direction:'order',decline:'down',declining:'down',evidenceGrade:'grade',met:'evidence',verified:'evidence',unverified:'unknown',unpriced:'unknown',rightsBlocked:'rights',recurring:'sustainable',labor:'work',directMinutes:'work',transactionKRW:'sales',repeatTransactions:'repeatOrders',hourlyProfit:'hourly',businessScore:'score'}))definitions[alias]=definitions[key];

// Optional custom copy: data-sw-tip-short / data-sw-tip-detail, or metrics[key]={label,short,detail}.
function tip(el,key,label){
 if(!el||!key)return el;
 if(el.dataset.swTip!==String(key))el.dataset.swTip=key;
 if(label&&el.dataset.swTipLabel!==String(label))el.dataset.swTipLabel=label;
 if(!el.matches(interactive)){el.setAttribute('role','button');if(!el.hasAttribute('tabindex'))el.tabIndex=0;}
 if(!el.matches(interactive)||el.classList.contains('sw-help-toggle')){
  el.setAttribute('aria-haspopup','dialog');if(!el.hasAttribute('aria-expanded'))el.setAttribute('aria-expanded','false');
 }
 return el;
}
function annotate(el){return tip(el,el.dataset.swTip,el.dataset.swTipLabel);}
const SCHEMA='shorts-rail-menu',VERSION=2,HEX=/^#[0-9a-f]{6}$/i;
const PALETTE=['#581F32','#103F32','#35234E','#17354E','#FFF174','#B9F665','#78EDF5','#FF879F','#D1B6FC','#FFCA90','#C3C9D4','#24374B'];
function normalizeMenu(src){
 const m={order:[],aliases:Object.create(null),colors:Object.create(null),hidden:[]};src=src&&typeof src==='object'?src:{};
 if(Array.isArray(src.order))for(const id of src.order)if(typeof id==='string'&&!m.order.includes(id)&&m.order.length<100)m.order.push(id);
 if(src.aliases&&typeof src.aliases==='object')for(const [k,v] of Object.entries(src.aliases))if(typeof v==='string'&&v.trim())m.aliases[k]=v.trim().slice(0,80);
 if(src.colors&&typeof src.colors==='object')for(const [k,v] of Object.entries(src.colors))if(typeof v==='string'&&HEX.test(v))m.colors[k]=v.toUpperCase();
 if(Array.isArray(src.hidden))for(const id of src.hidden)if(typeof id==='string'&&!m.hidden.includes(id))m.hidden.push(id);
 return m;
}
const cloneMenu=m=>normalizeMenu({order:m.order,aliases:m.aliases,colors:m.colors,hidden:m.hidden});
const plainMenu=m=>({order:[...m.order],aliases:{...m.aliases},colors:{...m.colors},hidden:[...m.hidden]});
function readableOn(hex){const n=parseInt(hex.slice(1),16),f=c=>{c/=255;return c<=.03928?c/12.92:((c+.055)/1.055)**2.4;};
 const l=.2126*f(n>>16&255)+.7152*f(n>>8&255)+.0722*f(n&255);return l>.4?'#111317':'#F1F3FA';}
function read(){
 let x={};try{x=JSON.parse(W.localStorage.getItem(KEY))||{};}catch{}
 const width=Number(x.railWidth),card=Number(x.cardWidth),rate=Number(x.rate);
 return {desktop:x.desktop!==false,mobile:x.mobile===true,railWidth:Number.isFinite(width)?clamp(width,160,430):224,
  thumbnails:x.thumbnails!==false,columns:Number.isInteger(x.columns)&&x.columns>=2&&x.columns<=8?x.columns:0,
  cardWidth:Number.isFinite(card)?clamp(card,104,256):148,rate:Number.isFinite(rate)?clamp(rate,.7,1.4):1,
  version:VERSION,...normalizeMenu(x)};
}
function init({shell,rail,bar,metrics={},beforeLayoutChange,afterLayoutChange}={}){
 if(!shell||!rail||!bar)return null;if(apps.has(shell))return apps.get(shell);
 const state=read(),narrow=W.matchMedia('(max-width: 720px)'),gallery=shell.querySelector('#sw-gallery')||shell;
 const grid=gallery.querySelector('.grid'),nav=rail.querySelector('nav');
 function save(){try{W.localStorage.setItem(KEY,JSON.stringify(state));}catch{}}
 function prefs(){return {...state,order:[...state.order],aliases:{...state.aliases},colors:{...state.colors},hidden:[...state.hidden]};}
 try{const raw=JSON.parse(W.localStorage.getItem(KEY));if(raw&&typeof raw==='object'&&raw.version!==VERSION)save();}catch{}
 let frame=0,pending=[];
 function start(reason){const context={reason,preferences:prefs()};return {reason,snapshot:beforeLayoutChange?.(context)};}
 function finish(token){
  pending.push(token);if(!frame)frame=W.requestAnimationFrame(()=>{frame=0;const queue=pending;pending=[];
   for(const t of queue)afterLayoutChange?.({...t,preferences:prefs()},t.snapshot);
  });
 }
 function change(reason,fn){const t=start(reason);fn();save();finish(t);}
 function opened(){return narrow.matches?state.mobile:state.desktop;}
 shell.classList.add('sw-controls-ready');D.body.classList.add('sw-controls-theme');
 const heading=node('div',null,'sw-rail-top'),identity=node('div',null,'sw-rail-identity');
 for(const el of rail.querySelectorAll(':scope > .sw-app, :scope > h2'))identity.append(el);
 const toggle=button('☰','sw-rail-toggle'),edit=button('편집','sw-rail-edit'),railBody=node('div',null,'sw-rail-body');
 railBody.id=rail.id?rail.id+'-body':'sw-rail-body';toggle.setAttribute('aria-controls',railBody.id);
 edit.setAttribute('aria-label','메뉴 이름과 순서 편집');edit.setAttribute('aria-pressed','false');
 heading.append(toggle,identity,edit);for(const child of [...rail.children])railBody.append(child);rail.append(heading,railBody);
 const grip=node('div',null,'sw-rail-grip');grip.tabIndex=0;grip.setAttribute('role','separator');grip.setAttribute('aria-label','왼쪽 메뉴 너비');
 grip.setAttribute('aria-orientation','vertical');grip.setAttribute('aria-valuemin','160');grip.setAttribute('aria-controls',railBody.id);rail.append(grip);
 function railMax(){return Math.max(160,Math.min(430,Math.floor(W.innerWidth*.42)));}
 function showWidth(){const value=Math.min(state.railWidth,railMax());shell.style.setProperty('--sw-rail-width',value+'px');grip.setAttribute('aria-valuenow',String(value));grip.setAttribute('aria-valuemax',String(railMax()));grip.setAttribute('aria-valuetext',value+' 픽셀');}
 function showRail(){
  const open=opened();shell.dataset.railOpen=String(open);shell.dataset.railNarrow=String(narrow.matches);
  railBody.hidden=!open;edit.hidden=!open||!nav;grip.hidden=!open||narrow.matches;
  const text=open?'왼쪽 메뉴 접기':'왼쪽 메뉴 펼치기';toggle.setAttribute('aria-label',text);toggle.title=text;toggle.setAttribute('aria-expanded',String(open));showWidth();
 }
 toggle.addEventListener('click',()=>change('railToggle',()=>{if(narrow.matches)state.mobile=!state.mobile;else state.desktop=!state.desktop;showRail();}));
  let resize=null;
 grip.addEventListener('pointerdown',e=>{
  if(e.button!==0||!e.isPrimary||resize)return;e.preventDefault();grip.focus();
  resize={id:e.pointerId,x:e.clientX,width:Math.min(state.railWidth,railMax()),previous:state.railWidth,token:null};
  grip.setPointerCapture(e.pointerId);shell.classList.add('sw-rail-resizing');
 });
 grip.addEventListener('pointermove',e=>{
  if(!resize||resize.id!==e.pointerId)return;
  const value=clamp(Math.round(resize.width+e.clientX-resize.x),160,railMax());
  if(value===Math.min(state.railWidth,railMax()))return;
  resize.token??=start('railResize');state.railWidth=value;showWidth();updateColumns();
 });
 function endResize(e){if(!resize||resize.id!==e.pointerId)return;const r=resize;resize=null;shell.classList.remove('sw-rail-resizing');
  if(e.type==='pointercancel'){state.railWidth=r.previous;showWidth();updateColumns();}else if(r.token)save();if(r.token)finish(r.token);
 }
 for(const type of ['pointerup','pointercancel','lostpointercapture'])grip.addEventListener(type,endResize);
 grip.addEventListener('keydown',e=>{
  const width=Math.min(state.railWidth,railMax()),step=e.shiftKey?40:12;
  const value={ArrowLeft:width-step,ArrowRight:width+step,Home:160,End:railMax()}[e.key];if(value==null)return;
  e.preventDefault();const next=clamp(value,160,railMax());if(next===width)return;
  change('railResize',()=>{state.railWidth=next;showWidth();updateColumns();});
 });

 const list=new Map(),live=node('p','','sw-controls-visually-hidden');live.setAttribute('aria-live','polite');railBody.append(live);
 let dragged=null,touch=null,editing=false,draft=cloneMenu(state),undo=[],redo=[];const moves=new Map();
 const snap=()=>JSON.stringify(plainMenu(draft));
 const tools=node('div',null,'sw-rail-tools'),hiddenBox=node('section',null,'sw-rail-hidden'),hiddenList=node('div',null,'sw-rail-hidden-list');
 const undoBtn=button('되돌리기','sw-rail-undo'),redoBtn=button('다시 실행','sw-rail-redo'),resetBtn=button('기본값 복원','sw-rail-reset'),
  exportBtn=button('설정 내보내기','sw-rail-export'),importBtn=button('설정 가져오기','sw-rail-import'),cancelBtn=button('취소','sw-rail-cancel');
 undoBtn.title='되돌리기 (Ctrl+Z)';redoBtn.title='다시 실행 (Ctrl+Shift+Z)';
 tools.setAttribute('role','toolbar');tools.setAttribute('aria-label','메뉴 편집 도구');
 tools.append(undoBtn,redoBtn,resetBtn,exportBtn,importBtn,cancelBtn);
 const hiddenTitle=node('h3','숨긴 메뉴','sw-rail-hidden-title'),hiddenEmpty=node('p','숨긴 메뉴가 없습니다.','sw-rail-hidden-empty');
 hiddenBox.append(hiddenTitle,hiddenEmpty,hiddenList);
 nav?.before(tools);nav?.after(hiddenBox);
 function navRows(){return [...nav.children].filter(row=>row.matches('.sw-rail-row'));}
 function cleanDrop(){for(const item of list.values())item.row.removeAttribute('data-drop');}
 function nameOf(item){return draft.aliases[item.key]||item.original;}
 function render(){
  const active=D.activeElement,known=[...list.keys()],seen=new Set(),order=[];
  for(const id of draft.order)if(list.has(id)&&!seen.has(id)){seen.add(id);order.push(id);}
  for(const id of known)if(!seen.has(id))order.push(id);
  draft.order=order;const hid=new Set(draft.hidden.filter(id=>list.has(id)));
  for(const id of order){
   const item=list.get(id),name=nameOf(item),isHidden=hid.has(id);
   (isHidden?hiddenList:nav).append(item.row);
   if(item.link.textContent!==name)item.link.textContent=name;
   item.row.dataset.swHidden=String(isHidden);
   item.rename.setAttribute('aria-label',name+' 이름 변경 (F2)');item.handle.setAttribute('aria-label',name+' 순서 이동, 위아래 방향키 사용');
   item.hide.textContent=isHidden?'표시':'숨김';item.hide.setAttribute('aria-label',name+(isHidden?' 다시 표시':' 숨기기'));
   item.colorBtn.setAttribute('aria-label',name+' 색 선택');
   const c=draft.colors[id];
   if(c){item.row.dataset.swColor=c;item.row.style.setProperty('--sw-item-bg',c);item.row.style.setProperty('--sw-item-fg',readableOn(c));item.colorBtn.style.setProperty('--sw-swatch',c);}
   else{delete item.row.dataset.swColor;item.row.style.removeProperty('--sw-item-bg');item.row.style.removeProperty('--sw-item-fg');item.colorBtn.style.removeProperty('--sw-swatch');}
   for(const sw of item.palette.querySelectorAll('button[data-color]'))sw.setAttribute('aria-pressed',String((c||'')===sw.dataset.color));
  }
  hiddenEmpty.hidden=hid.size>0;hiddenTitle.textContent='숨긴 메뉴'+(hid.size?' ('+hid.size+')':'');
  undoBtn.disabled=!editing||!undo.length;redoBtn.disabled=!editing||!redo.length;
  if(active&&active!==D.activeElement&&active.isConnected&&active.focus)active.focus({preventScroll:true});
 }
 // Every undoable edit goes through here; storage is only written by Save.
 function mutate(reason,fn){
  const before=snap(),t=start(reason);fn();
  if(snap()===before){finish(t);return false;}
  undo.push(before);if(undo.length>100)undo.shift();redo=[];render();finish(t);return true;
 }
 function stepHistory(from,to,reason){
  if(!editing||!from.length)return;const t=start(reason);to.push(snap());draft=normalizeMenu(JSON.parse(from.pop()));render();finish(t);
  live.textContent=(reason==='railUndo'?'되돌렸습니다.':'다시 실행했습니다.');
 }
 const doUndo=()=>stepHistory(undo,redo,'railUndo'),doRedo=()=>stepHistory(redo,undo,'railRedo');
 function setEditing(on){
  editing=on;rail.classList.toggle('sw-rail-editing',on);edit.textContent=on?'저장':'편집';edit.setAttribute('aria-pressed',String(on));
  edit.setAttribute('aria-label',on?'메뉴 편집 저장':'메뉴 이름과 순서 편집');
  for(const item of list.values()){item.palette.hidden=true;item.colorBtn.setAttribute('aria-expanded','false');}
 }
 function enterEdit(){if(editing)return;change('railEdit',()=>{draft=cloneMenu(state);undo=[];redo=[];setEditing(true);render();});}
 function leaveEdit(saveIt){
  if(!editing)return;
  change(saveIt?'railSave':'railCancel',()=>{
   if(saveIt){state.order=draft.order.slice(0,100);state.aliases=Object.assign(Object.create(null),draft.aliases);state.colors=Object.assign(Object.create(null),draft.colors);state.hidden=[...draft.hidden];}
   else draft=cloneMenu(state);
   undo=[];redo=[];setEditing(false);render();
  });
  live.textContent=saveIt?'메뉴 설정을 저장했습니다.':'편집을 취소하고 이전 상태로 되돌렸습니다.';
  edit.focus({preventScroll:true});
 }
 edit.addEventListener('click',()=>editing?leaveEdit(true):enterEdit());
 cancelBtn.addEventListener('click',()=>leaveEdit(false));
 undoBtn.addEventListener('click',doUndo);redoBtn.addEventListener('click',doRedo);
 resetBtn.addEventListener('click',()=>{if(!editing)return;if(mutate('railReset',()=>{draft=normalizeMenu({order:[...list.keys()]});}))live.textContent='기본값으로 복원했습니다. 저장 전에는 취소하거나 되돌릴 수 있습니다.';});
 function place(from,to,after,restoreFocus=false){
  if(!editing||!from||!to||from===to||from===(after?to.nextElementSibling:to.previousElementSibling))return;
  const id=from.dataset.swNavId,tid=to.dataset.swNavId;
  mutate('railOrder',()=>{const o=draft.order.filter(x=>x!==id),i=o.indexOf(tid);if(i<0)return;o.splice(after?i+1:i,0,id);draft.order=o;});
  const item=list.get(id);live.textContent=nameOf(item)+' · '+(navRows().indexOf(from)+1)+'번째';if(restoreFocus)item.handle.focus();
 }
 function toggleHide(id){
  const item=list.get(id),isHidden=draft.hidden.includes(id);
  if(!isHidden&&navRows().length<=1){live.textContent='마지막 메뉴는 숨길 수 없습니다.';return;}
  mutate('railHide',()=>{draft.hidden=isHidden?draft.hidden.filter(x=>x!==id):[...draft.hidden,id];});
  live.textContent=nameOf(item)+(isHidden?' · 다시 표시합니다.':' · 숨긴 메뉴로 이동했습니다.');
 }
 function setColor(id,color){mutate('railColor',()=>{if(color)draft.colors[id]=color;else delete draft.colors[id];});}
 function editName(item){
  const d=node('dialog',null,'sw-controls-dialog'),form=node('form'),label=node('label','메뉴 이름'),input=node('input');
  d.setAttribute('aria-label','메뉴 이름 변경');input.type='text';input.maxLength=80;input.required=true;input.value=nameOf(item);
  input.autocomplete='off';label.append(input);const actions=node('div',null,'sw-controls-actions');const submit=node('button','저장');submit.type='submit';
  const reset=button('기본 이름'),cancel=button('취소');actions.append(submit,reset,cancel);form.append(label,actions);d.append(form);D.body.append(d);
  function apply(name){if(name!==nameOf(item)){mutate('railRename',()=>{if(name===item.original)delete draft.aliases[item.key];else draft.aliases[item.key]=name;});live.textContent=name+' · 이름이 변경되었습니다.';}d.close();}
  form.addEventListener('submit',e=>{e.preventDefault();const name=input.value.trim();if(name)apply(name);else input.focus();});
  reset.addEventListener('click',()=>apply(item.original));cancel.addEventListener('click',()=>d.close());
  d.addEventListener('close',()=>{d.remove();item.rename.focus({preventScroll:true});},{once:true});
  d.showModal();input.focus();input.select();
 }
 // ---- export / import (menu settings only) ----
 function exportText(){return JSON.stringify({schema:SCHEMA,version:VERSION,menu:plainMenu(draft)},null,2);}
 function applyImport(text){
  const keep=' 현재 설정은 그대로입니다.';
  if(typeof text!=='string'||!text.trim())return {ok:false,error:'가져올 내용이 비어 있습니다.'+keep};
  if(text.length>300000)return {ok:false,error:'파일이 너무 큽니다.'+keep};
  let data;try{data=JSON.parse(text);}catch{return {ok:false,error:'JSON을 읽을 수 없습니다. 파일이 손상되었거나 JSON 형식이 아닙니다.'+keep};}
  if(!data||typeof data!=='object'||Array.isArray(data)||data.schema!==SCHEMA)return {ok:false,error:'이 메뉴 설정 파일이 아닙니다(schema 불일치).'+keep};
  if(!Number.isInteger(data.version)||data.version<1)return {ok:false,error:'버전 정보가 올바르지 않습니다.'+keep};
  if(data.version>VERSION)return {ok:false,error:'더 새로운 버전('+data.version+')의 설정이라 가져올 수 없습니다.'+keep};
  const m=data.menu;if(!m||typeof m!=='object'||Array.isArray(m))return {ok:false,error:'menu 항목이 없습니다.'+keep};
  if('order' in m&&(!Array.isArray(m.order)||m.order.some(x=>typeof x!=='string')))return {ok:false,error:'order 형식이 올바르지 않습니다.'+keep};
  if('hidden' in m&&(!Array.isArray(m.hidden)||m.hidden.some(x=>typeof x!=='string')))return {ok:false,error:'hidden 형식이 올바르지 않습니다.'+keep};
  for(const f of ['aliases','colors'])if(f in m&&(!m[f]||typeof m[f]!=='object'||Array.isArray(m[f])||Object.values(m[f]).some(v=>typeof v!=='string')))return {ok:false,error:f+' 형식이 올바르지 않습니다.'+keep};
  if('colors' in m&&Object.values(m.colors).some(v=>!HEX.test(v)))return {ok:false,error:'색상은 #RRGGBB 형식이어야 합니다.'+keep};
  const inc=normalizeMenu(m);let ignored=0;const known=id=>list.has(id);
  const next=cloneMenu(draft);
  if('order' in m){ignored+=inc.order.filter(id=>!known(id)).length;const o=inc.order.filter(known);for(const id of draft.order)if(!o.includes(id))o.push(id);for(const id of list.keys())if(!o.includes(id))o.push(id);next.order=o;}
  if('aliases' in m){next.aliases=Object.create(null);for(const [k,v] of Object.entries(inc.aliases))if(known(k))next.aliases[k]=v;else ignored++;}
  if('colors' in m){next.colors=Object.create(null);for(const [k,v] of Object.entries(inc.colors))if(known(k))next.colors[k]=v;else ignored++;}
  if('hidden' in m){ignored+=inc.hidden.filter(id=>!known(id)).length;next.hidden=inc.hidden.filter(known);if(next.order.every(id=>next.hidden.includes(id)))next.hidden.pop();}
  mutate('railImport',()=>{draft=next;});
  return {ok:true,ignored};
 }
 function dialog(title){
  const d=node('dialog',null,'sw-controls-dialog sw-menu-dialog'),form=node('form');d.setAttribute('aria-label',title);form.method='dialog';
  d.append(form);D.body.append(d);d.addEventListener('close',()=>{d.remove();},{once:true});return {d,form};
 }
 exportBtn.addEventListener('click',()=>{
  if(!editing)return;const {d,form}=dialog('설정 내보내기'),label=node('label','메뉴 설정 JSON'),ta=node('textarea');ta.readOnly=true;ta.rows=10;ta.value=exportText();ta.className='sw-menu-json';
  label.append(ta);const actions=node('div',null,'sw-controls-actions'),copy=button('복사'),file=button('파일로 저장'),close=button('닫기'),msg=node('p',null,'sw-menu-msg');msg.setAttribute('role','status');
  actions.append(copy,file,close);form.append(label,msg,actions);
  copy.addEventListener('click',async()=>{try{await W.navigator.clipboard.writeText(ta.value);msg.textContent='복사했습니다.';}catch{ta.select();msg.textContent='자동 복사를 할 수 없습니다. 선택된 내용을 직접 복사하세요(Ctrl+C).';}});
  file.addEventListener('click',()=>{try{const url=W.URL.createObjectURL(new W.Blob([ta.value],{type:'application/json'})),a=D.createElement('a');a.href=url;a.download='shorts-menu-settings.json';D.body.append(a);a.click();a.remove();W.setTimeout(()=>W.URL.revokeObjectURL(url),1000);msg.textContent='파일로 저장했습니다.';}catch{msg.textContent='파일 저장에 실패했습니다. 복사를 사용하세요.';}});
  close.addEventListener('click',()=>d.close());d.addEventListener('close',()=>exportBtn.focus({preventScroll:true}),{once:true});d.showModal();ta.focus();ta.select();
 });
 importBtn.addEventListener('click',()=>{
  if(!editing)return;const {d,form}=dialog('설정 가져오기'),label=node('label','메뉴 설정 JSON 붙여넣기'),ta=node('textarea'),fl=node('label','또는 파일 선택'),fi=node('input');
  ta.rows=10;ta.className='sw-menu-json';fi.type='file';fi.accept='application/json,.json';fl.append(fi);label.append(ta);
  const err=node('p',null,'sw-menu-msg sw-menu-error');err.setAttribute('role','alert');
  const actions=node('div',null,'sw-controls-actions'),ok=button('가져오기'),close=button('닫기');actions.append(ok,close);form.append(label,fl,err,actions);
  fi.addEventListener('change',async()=>{const f=fi.files?.[0];if(!f)return;try{ta.value=await f.text();err.textContent='';}catch{err.textContent='파일을 읽을 수 없습니다.';}});
  ok.addEventListener('click',()=>{const r=applyImport(ta.value);if(!r.ok){err.textContent=r.error;return;}
   live.textContent='설정을 가져왔습니다.'+(r.ignored?' 알 수 없는 항목 '+r.ignored+'개는 무시했습니다.':'')+' 저장하면 반영이 확정됩니다.';d.close();});
  close.addEventListener('click',()=>d.close());d.addEventListener('close',()=>importBtn.focus({preventScroll:true}),{once:true});d.showModal();ta.focus();
 });
 D.addEventListener('keydown',e=>{
  if(!editing||e.defaultPrevented||!(e.ctrlKey||e.metaKey)||e.altKey)return;
  const k=e.key.toLowerCase();if(k!=='z'&&k!=='y')return;
  const t=e.target;if(t?.closest?.('input,textarea,select,[contenteditable],dialog[open]'))return;
  e.preventDefault();if(k==='y'||e.shiftKey)doRedo();else doUndo();
 });
 if(nav){
  for(const link of nav.querySelectorAll('a[href]')){
   const original=link.textContent.trim(),base=link.dataset.view?'view:'+link.dataset.view:'href:'+link.getAttribute('href');
   const count=(moves.get(base)||0)+1;moves.set(base,count);const key=base+(count>1?'#'+count:'');
   const row=node('div',null,'sw-rail-row'),handle=button('⠿','sw-rail-drag'),rename=button('이름','sw-rail-rename'),colorBtn=button('색','sw-rail-color'),hide=button('숨김','sw-rail-hide');row.dataset.swNavId=key;
   handle.draggable=true;handle.title='끌어서 이동 또는 위아래 방향키';colorBtn.setAttribute('aria-haspopup','true');colorBtn.setAttribute('aria-expanded','false');
   const palette=node('div',null,'sw-rail-palette');palette.setAttribute('role','group');palette.hidden=true;
   const item={key,row,link,original,handle,rename,colorBtn,hide,palette};
   const closePalette=()=>{palette.hidden=true;colorBtn.setAttribute('aria-expanded','false');colorBtn.focus({preventScroll:true});};
   for(const c of PALETTE){const sw=button('','sw-rail-swatch');sw.dataset.color=c;sw.style.background=c;sw.title=c;sw.setAttribute('aria-label',c+' 색으로 지정');sw.addEventListener('click',()=>{setColor(key,c);closePalette();});palette.append(sw);}
   const none=button('기본색','sw-rail-swatch-none');none.addEventListener('click',()=>{setColor(key,null);closePalette();});palette.append(none);
   colorBtn.addEventListener('click',()=>{const open=palette.hidden;for(const o of list.values()){o.palette.hidden=true;o.colorBtn.setAttribute('aria-expanded','false');}palette.hidden=!open;colorBtn.setAttribute('aria-expanded',String(open));});
   hide.addEventListener('click',()=>toggleHide(key));
   link.before(row);row.append(link,handle,rename,colorBtn,hide,palette);
   list.set(key,item);rename.addEventListener('click',()=>editName(item));
   row.addEventListener('keydown',e=>{if(e.key==='F2'&&!e.target.matches('input,textarea,select')){e.preventDefault();enterEdit();editName(item);}});
   handle.addEventListener('keydown',e=>{const previous=e.key==='ArrowUp';if(!previous&&e.key!=='ArrowDown')return;e.preventDefault();
    if(row.parentNode!==nav)return;place(row,previous?row.previousElementSibling:row.nextElementSibling,!previous,true);
   });
   handle.addEventListener('dragstart',e=>{if(!editing||row.parentNode!==nav){e.preventDefault();return;}dragged=row;e.dataTransfer.effectAllowed='move';e.dataTransfer.setData('text/plain',key);});
   handle.addEventListener('dragend',()=>{dragged=null;cleanDrop();});
   handle.addEventListener('pointerdown',e=>{if(e.pointerType==='mouse'||!e.isPrimary||!editing||row.parentNode!==nav)return;touch={row,id:e.pointerId,target:null,after:false};handle.setPointerCapture(e.pointerId);});
   handle.addEventListener('pointermove',e=>{if(!touch||touch.id!==e.pointerId)return;const target=D.elementFromPoint(e.clientX,e.clientY)?.closest('.sw-rail-row');
    cleanDrop();touch.target=target?.parentNode===nav&&target!==row?target:null;
    if(touch.target){const r=target.getBoundingClientRect();touch.after=e.clientY>=r.top+r.height/2;target.dataset.drop=touch.after?'after':'before';}
   });
   function touchEnd(e){if(!touch||touch.id!==e.pointerId)return;const {row,target,after}=touch;touch=null;cleanDrop();if(e.type==='pointerup')place(row,target,after);}
   for(const type of ['pointerup','pointercancel','lostpointercapture'])handle.addEventListener(type,touchEnd);
  }
  render();
  nav.addEventListener('dragover',e=>{const to=e.target.closest('.sw-rail-row');if(!dragged||!to||to===dragged){cleanDrop();return;}
   e.preventDefault();e.dataTransfer.dropEffect='move';const r=to.getBoundingClientRect();cleanDrop();to.dataset.drop=e.clientY>=r.top+r.height/2?'after':'before';
  });
  nav.addEventListener('dragleave',e=>{if(!nav.contains(e.relatedTarget))cleanDrop();});
  nav.addEventListener('drop',e=>{const to=e.target.closest('.sw-rail-row');if(!dragged||!to)return;e.preventDefault();const r=to.getBoundingClientRect();place(dragged,to,e.clientY>=r.top+r.height/2);dragged=null;cleanDrop();});
 }

 const display=node('fieldset',null,'sw-display-controls'),legend=node('legend','보기 설정');display.append(legend);
 const thumbsLabel=node('label','썸네일 표시','sw-show-thumbs'),thumbs=node('input');thumbs.type='checkbox';thumbs.checked=state.thumbnails;thumbsLabel.prepend(thumbs);
 const columnsLabel=node('label','열 수'),columns=node('select');columns.add(new Option('자동','0'));
 for(let i=2;i<=8;i++)columns.add(new Option(i+'열',String(i)));columns.value=String(state.columns);columnsLabel.append(columns);
 const cardLabel=node('label','카드 너비'),card=node('select');
 for(const [width,label] of [[112,'촘촘하게'],[148,'기본'],[196,'넓게'],[240,'아주 넓게']])card.add(new Option(label+' ('+width+'px)',String(width)));
 if(![...card.options].some(o=>Number(o.value)===state.cardWidth))card.add(new Option(state.cardWidth+'px',String(state.cardWidth)));
 card.value=String(state.cardWidth);cardLabel.append(card);
 display.append(thumbsLabel,columnsLabel,cardLabel,node('span','확대·축소는 브라우저 기본 기능을 사용하세요.','sw-zoom-note'));
 const old=bar.querySelector('.sw-density');if(old)old.remove();bar.append(display);
 function updateColumns(){
  if(!grid||!state.columns||!grid.clientWidth){shell.style.removeProperty('--sw-effective-cols');return;}
  const gap=Number.parseFloat(W.getComputedStyle(grid).columnGap)||0;
  // The requested count is a ceiling on narrow screens. A comfortable minimum layout wins.
  const min=Math.min(state.cardWidth,124),fit=Math.floor((grid.clientWidth+gap)/(min+gap));
  shell.style.setProperty('--sw-effective-cols',String(clamp(fit,1,state.columns)));
 }
 function showDisplay(){
  shell.dataset.swThumbnails=state.thumbnails?'on':'off';shell.dataset.swColumns=state.columns?'fixed':'auto';
  shell.style.setProperty('--sw-card-width',state.cardWidth+'px');updateColumns();
 }
 thumbs.addEventListener('change',()=>change('thumbnail',()=>{state.thumbnails=thumbs.checked;showDisplay();}));
 columns.addEventListener('change',()=>change('columns',()=>{state.columns=Number(columns.value);showDisplay();}));
 card.addEventListener('change',()=>change('cardWidth',()=>{state.cardWidth=Number(card.value);showDisplay();}));
 const responsive=()=>{const token=start('viewport');showRail();updateColumns();finish(token);};
 if(narrow.addEventListener)narrow.addEventListener('change',responsive);else narrow.addListener?.(responsive);
 W.addEventListener('resize',()=>{showWidth();updateColumns();},{passive:true});
 if(grid&&typeof W.ResizeObserver==='function')new W.ResizeObserver(updateColumns).observe(grid);
 showRail();showDisplay();
 const help=setupHelp(shell,metrics,state,save);
 const api={preferences:prefs,closeHelp:help.close};apps.set(shell,api);return api;
}

function setupHelp(shell,metrics,state,save){
 const sort=shell.querySelector('#sort'),order=shell.querySelector('.sw-order');
 if(order)tip(order,'order','현재 정렬');
 const sortLabel=sort?.closest('label');
 if(sort&&sortLabel){const help=button('?','sw-help-toggle sw-sort-help');help.setAttribute('aria-label','선택한 정렬 기준 설명');tip(help,'sort');
  const field=node('div',null,'sw-sort-field');sortLabel.before(field);field.append(sortLabel,help);
  help.dataset.swSortHelp='true';
 }
 shell.querySelectorAll(Q).forEach(annotate);
 const pop=node('section',null,'sw-tip-popover');pop.id='sw-tip-popover';pop.hidden=true;pop.setAttribute('role','dialog');pop.setAttribute('aria-labelledby','sw-tip-title');
 const header=node('div',null,'sw-tip-header'),title=node('h3');title.id='sw-tip-title';const closeButton=button('닫기');header.append(title,closeButton);
 const brief=node('p',null,'sw-tip-brief'),detailText=node('p'),details=node('details');details.append(node('summary','자세한 설명'),detailText);
 const audio=node('div',null,'sw-tip-audio'),shortButton=button('짧게 듣기'),longButton=button('자세히 듣기'),stopButton=button('정지'),rateLabel=node('label','읽기 속도'),rate=node('select');
 const speeds=[.7,.85,1,1.15,1.3,1.4];for(const v of speeds)rate.add(new Option(v+'×',String(v)));rate.value=String(speeds.reduce((a,b)=>Math.abs(b-state.rate)<Math.abs(a-state.rate)?b:a,1));
 rateLabel.append(rate);audio.append(shortButton,longButton,stopButton,rateLabel);
 const status=node('p',null,'sw-tip-status');status.setAttribute('role','status');pop.append(header,brief,details,audio,status);
 const preview=node('div',null,'sw-tip-preview');preview.id='sw-tip-preview';preview.hidden=true;preview.setAttribute('role','tooltip');D.body.append(preview,pop);
 let synth=null;try{if(typeof W.SpeechSynthesisUtterance==='function'&&typeof W.speechSynthesis?.speak==='function')synth=W.speechSynthesis;}catch{}
 if(!synth)for(const button of [shortButton,longButton,stopButton,rate])button.disabled=true;
 let anchor=null,quick=null,content=null,current=null,pendingHover=0,positionFrame=0;
 function copy(el){
  const dynamic=el.dataset.swSortHelp,selected=dynamic?sort?.selectedOptions?.[0]:null,key=selected?.value||el.dataset.swTip;
  const specified=Object.hasOwn(metrics,key)?metrics[key]:null,base=definitions[key]||definitions[dynamic?'sort':'unknown'];
  const custom=typeof specified==='object'&&specified?specified:null;
  const label=el.dataset.swTipLabel||custom?.label||selected?.label||(typeof specified==='string'?specified:null)||(definitions[key]?base.label:el.textContent.trim())||base.label;
  return {label,short:el.dataset.swTipShort||custom?.short||base.short,detail:el.dataset.swTipDetail||custom?.detail||base.detail};
 }
 function place(box,el){
  const r=el.getBoundingClientRect(),pad=8,below=W.innerHeight-r.bottom-pad;
  const left=clamp(r.left,pad,Math.max(pad,W.innerWidth-box.offsetWidth-pad));
  const y=below>=box.offsetHeight||r.top<box.offsetHeight+pad?r.bottom+pad:r.top-box.offsetHeight-pad;
  box.style.left=left+'px';box.style.top=clamp(y,pad,Math.max(pad,W.innerHeight-box.offsetHeight-pad))+'px';
 }
 function described(el,add){
  const ids=(el.getAttribute('aria-describedby')||'').split(/\s+/).filter(x=>x&&x!==preview.id);
  if(add)ids.push(preview.id);if(ids.length)el.setAttribute('aria-describedby',ids.join(' '));else el.removeAttribute('aria-describedby');
 }
 function hideQuick(){W.clearTimeout(pendingHover);pendingHover=0;if(quick)described(quick,false);quick=null;preview.hidden=true;}
 function showQuick(el,wait=0){hideQuick();if(anchor)return;
  pendingHover=W.setTimeout(()=>{if(anchor||!el.isConnected)return;quick=el;preview.textContent=copy(el).short;preview.hidden=false;described(el,true);place(preview,el);},wait);
 }
 function stopSpeech(announce=false){if(current){current=null;try{synth.cancel();}catch{}}stopButton.disabled=true;if(announce)status.textContent='읽기를 중지했습니다.';}
 function close(restoreFocus=false){
  if(!anchor)return;const old=anchor;anchor=null;content=null;old.setAttribute('aria-expanded','false');pop.hidden=true;stopSpeech();
  if(restoreFocus&&old.isConnected)old.focus({preventScroll:true});hideQuick();
 }
 function open(el){
  if(anchor===el){close(true);return;}close();hideQuick();content=copy(el);title.textContent=content.label;brief.textContent=content.short;detailText.textContent=content.detail;
  details.open=false;status.textContent=synth?'':'이 브라우저에서는 음성 읽기를 지원하지 않습니다. 글로 설명을 확인할 수 있습니다.';
  stopButton.disabled=true;anchor=el;anchor.setAttribute('aria-expanded','true');anchor.setAttribute('aria-controls',pop.id);
  pop.hidden=false;place(pop,el);closeButton.focus({preventScroll:true});
 }
 function speak(long){
  if(!synth||!content)return;stopSpeech();
  try{
   const u=new W.SpeechSynthesisUtterance(content.label+'. '+content.short+(long?' '+content.detail:''));u.lang='ko-KR';u.rate=Number(rate.value)||1;
   const voice=synth.getVoices?.().find(v=>/^ko(?:[-_]|$)/i.test(v.lang));if(voice)u.voice=voice;
   current=u;stopButton.disabled=false;status.textContent='한국어 설명을 읽는 중입니다.';
   const done=message=>{if(current!==u)return;current=null;stopButton.disabled=true;status.textContent=message;};
   u.onend=()=>done('읽기를 마쳤습니다.');u.onerror=()=>done('음성으로 읽을 수 없습니다. 글로 설명을 확인할 수 있습니다.');synth.speak(u);
  }catch{current=null;stopButton.disabled=true;status.textContent='음성으로 읽을 수 없습니다. 글로 설명을 확인할 수 있습니다.';}
 }
 shortButton.addEventListener('click',()=>speak(false));longButton.addEventListener('click',()=>speak(true));stopButton.addEventListener('click',()=>stopSpeech(true));
 rate.addEventListener('change',()=>{state.rate=Number(rate.value)||1;save();if(current){stopSpeech();status.textContent='속도를 변경했습니다. 다시 듣기를 누르세요.';}});
 closeButton.addEventListener('click',()=>close(true));
 function target(e){const el=e.target.closest?.(Q);return el&&shell.contains(el)?el:null;}
 function opens(el){return !el.matches(interactive)||el.classList.contains('sw-help-toggle');}
 shell.addEventListener('click',e=>{const el=target(e);if(el&&opens(el)&&!e.defaultPrevented){e.preventDefault();open(el);}});
 shell.addEventListener('keydown',e=>{const el=target(e);if(el&&!el.matches(interactive)&&(e.key==='Enter'||e.key===' ')){e.preventDefault();if(!e.repeat)open(el);}});
 shell.addEventListener('focusin',e=>{const el=target(e);if(el)showQuick(el);});
 shell.addEventListener('focusout',e=>{if(target(e))hideQuick();});
 shell.addEventListener('pointerover',e=>{const el=target(e);if(e.pointerType!=='touch'&&el&&!el.contains(e.relatedTarget))showQuick(el,350);});
 shell.addEventListener('pointerout',e=>{const el=target(e);if(el&&!el.contains(e.relatedTarget))hideQuick();});
 D.addEventListener('pointerdown',e=>{if(anchor&&!pop.contains(e.target)&&!anchor.contains(e.target))close();else if(!anchor&&!target(e))hideQuick();},true);
 D.addEventListener('keydown',e=>{if(e.key==='Escape'){if(anchor){e.preventDefault();close(true);}else hideQuick();}});
 function reposition(){if(positionFrame)return;positionFrame=W.requestAnimationFrame(()=>{positionFrame=0;
  if(anchor){if(!anchor.isConnected||!anchor.getClientRects().length)close();else place(pop,anchor);}
  if(quick){if(!quick.isConnected||!quick.getClientRects().length)hideQuick();else place(preview,quick);}
 });}
 details.addEventListener('toggle',reposition);W.addEventListener('resize',reposition,{passive:true});W.addEventListener('scroll',reposition,{passive:true,capture:true});
 sort?.addEventListener('change',()=>{if(anchor?.dataset.swSortHelp||anchor===order)close();if(quick?.dataset.swSortHelp||quick===order)hideQuick();});
 if(typeof W.MutationObserver==='function')new W.MutationObserver(records=>{
  for(const record of records){if(record.type==='attributes'&&record.target.matches(Q))annotate(record.target);
   for(const el of record.addedNodes)if(el.nodeType===1){if(el.matches(Q))annotate(el);el.querySelectorAll(Q).forEach(annotate);}
  }
  if(anchor&&!anchor.isConnected)close();if(quick&&!quick.isConnected)hideQuick();
 }).observe(shell,{subtree:true,childList:true,attributes:true,attributeFilter:['data-sw-tip']});
 return {close};
}
W.ShortsControls={init,tip};
})();
