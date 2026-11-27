/* Side-by-side Shorts and local reference trays. No transcript fetching or editor. */
(() => {
'use strict';
const SCHEMA='content-workbench.selection.v1', STORE='geben147.youtube-shorts-preview.compare.v1';
const HUB='https://geben147-create.github.io/Insta/research-hub-20261108/';
const VID=/^[\w-]{11}$/, CID=/^UC[\w-]{22}$/, DAY=86400000;
const names={success:'성공 참고',low:'저성과 참고'}, kinds=Object.keys(names);
const fields=[['hook','첫 1~3초 훅'],['dialogue','대사·음향'],['structure','구성'],['scene','화면·컷'],['pacing','편집 리듬·컷 길이'],['ending','마무리'],['loop','반복 연결'],['character','캐릭터'],['emotion','감정선'],['captions','자막'],['thumbnail','썸네일 구성']];
const filterNames=new Set('q period country ai set market lo hi sort size video-days trend-days trend-cut trend-min trend-status joined-lo joined-hi count-lo count-hi sample-lo sample-hi med-lo med-hi hit-lo hit-hi cohort evidence money model fx target dir one workMax costMax preset'.split(' '));
const nf=new Intl.NumberFormat('ko-KR');
const text=(v,n=500)=>typeof v==='string'?v.trim().slice(0,n):'';
const int=v=>Number.isSafeInteger(v)&&v>=0?v:null;
const arr=v=>Array.isArray(v)?v:[];
const first=(...vs)=>vs.find(v=>v!==null&&v!==undefined&&v!=='')??null;
const fold=v=>text(v,180).normalize('NFKC').toLowerCase().replace(/\s+/g,' ');
const iso=v=>typeof v==='string'&&/T\d\d:\d\d(?::\d\d(?:\.\d+)?)?(?:Z|[+-]\d\d:\d\d)$/i.test(v)&&Number.isFinite(Date.parse(v))?v:null;
function date(v){if(typeof v!=='string'||!/^\d{4}-\d\d-\d\d$/.test(v))return null;const n=Date.parse(v+'T00:00:00Z');return Number.isFinite(n)&&new Date(n).toISOString().slice(0,10)===v?v:null;}
function windowStatus(row,now,days){const start=now-days*DAY;if(row.published_at){const p=Date.parse(row.published_at);return p>=start&&p<=now?'inside':'outside';}if(!row.published_date)return 'unknown';const a=Date.parse(row.published_date+'T00:00:00+09:00'),b=a+DAY;if(a>now||b<=start)return 'outside';return a>=start&&b<=now?'inside':'boundary';}
const windowText={outside:'게시 기간 밖',unknown:'게시일 미확인',boundary:'기간 경계 · 게시 시각 확인 필요'};
function https(v){try{const u=new URL(v);return u.protocol==='https:'&&!u.username&&!u.password&&(!u.port||u.port==='443')?u:null;}catch{return null;}}
const isYT=u=>u&&['www.youtube.com','youtube.com','m.youtube.com'].includes(u.hostname);
function youtubeId(u){if(u?.hostname==='youtu.be')return u.pathname.slice(1);if(!isYT(u))return null;return u.pathname==='/watch'?u.searchParams.get('v'):u.pathname.match(/^\/(?:shorts|live)\/([\w-]{11})\/?$/)?.[1]??null;}
function channelUrl(v){const u=https(v);return isYT(u)&&/^\/(?:@[\p{L}\p{N}_.%~\-]+|(?:channel|c|user)\/[\p{L}\p{N}_.%~\-]+)(?:\/(?:shorts|videos|featured|about))?\/?$/u.test(u.pathname)?u.origin+u.pathname:null;}
const originVideo=id=>'https://www.youtube.com/shorts/'+id;
const blocked=v=>['block','blocked','exclude','denied','prohibited'].includes(text(v,32).toLowerCase());
const isBlocked=(v,m)=>m?.rightsBlocked===true||blocked(v?.rights)||blocked(v?.rightsStatus)||blocked(m?.record?.evidence?.rightsStatus);
const channelKey=(given,row)=>text(given,190)||((row?.channel&&'name:'+fold(row.channel))||'');
const empty=()=>({mode:'video',compare:{video:[],channel:[]},trays:{success:{days:30,rows:[]},low:{days:30,rows:[]}}});
const known=new Map(), attached=new Set(), embeds=new Set();
let cfg,root,status,body,state,records=[],sampleIds={success:[],low:[]},lastEvidence,evidenceSeq=0,hubReady=false;
function configureSamples(samples){for(const k of kinds)sampleIds[k]=[...new Set(arr(samples?.[k]).map(v=>first(v?.video_id,v?.id,v)).filter(v=>typeof v==='string'&&VID.test(v)))];}
function candidateIndex(){let values;try{values=cfg.getCandidates?.();}catch{}return new Map(arr(values).map(item=>[first(item?.x?.id,item?.x?.video_id,item?.id,item?.video_id),item]));}
function itemEvidence(x,m={}){let value;try{value=cfg.readEvidence?.(x);}catch{}if(value&&typeof value.then==='function'){value.catch(()=>{});value=null;}const r=m.record||value?.record||(value?.hero||value?.cohorts?value:null);return {record:r,direct:value};}
function itemFor(x,m={},given){const {record:r,direct}=itemEvidence(x,m), id=first(x?.id,x?.video_id), v=[r?.hero,...arr(r?.extra),...arr(r?.videos),direct?.video,direct].find(i=>first(i?.video_id,i?.id)===id), observed=first(x?.observed_at,x?.observed,v?.observed_at,v?.observed);
 const row=metadata(x,r);if(!row?.title_original)return null;
 const exact=evidenceRow(v,r);if(exact){row.published_at||=exact.published_at;row.published_date||=exact.published_date;row.duration_seconds??=exact.duration_seconds;row.language||=exact.language;if(row.views===null||row.views===exact.views){row.views??=exact.views;row.observed_at||=iso(observed)||date(observed);}}
 row.observed_date=date(x.observedDate)||date(x.observed)||date(row.observed_at);row.join_date=date(x.joinDate)||date(r?.joinDate);row.scope_note=text(x.scopeNote,180)||null;
 const k=channelKey(given,row),source=https(x.src)?.href||https(m.videoSource)?.href||https(direct?.source_url)?.href||https(direct?.source)?.href||https(r?.source)?.href||null;
 return {key:row.video_id,row,source,channelSource:channelUrl(r?.source)||channelUrl(x.channel_url)||((CID.test(k))?'https://www.youtube.com/channel/'+k:null),blocked:isBlocked(x,{...m,record:r})||isBlocked(v,{record:r})||isBlocked(direct,{record:r}),checked:false,reason:'',item:x,record:r,direct,channelKey:k};
}
function saved(){try{const v=JSON.parse(localStorage.getItem(STORE)||'null');if(!v||typeof v!=='object')return empty();const o=empty();o.mode=v.mode==='channel'?'channel':'video';for(const k of ['video','channel']){const seen=new Set();o.compare[k]=arr(v.compare?.[k]).map(e=>entry(e,k)).filter(e=>e&&!seen.has(e.key)&&seen.add(e.key)).slice(0,4);}const used=new Set();for(const k of kinds){const t=v.trays?.[k];o.trays[k]={days:t?.days===60?60:30,rows:arr(t?.rows).map(e=>entry(e,'video')).filter(e=>e&&!used.has(e.row.video_id)&&used.add(e.row.video_id)).slice(0,8)};}return o;}catch{return empty();}}
function save(){try{const clone={mode:state.mode,compare:Object.fromEntries(Object.entries(state.compare).map(([k,a])=>[k,a.map(e=>entry(e,k))])),trays:Object.fromEntries(kinds.map(k=>[k,{days:state.trays[k].days,rows:state.trays[k].rows.map(e=>entry(e,'video'))}]))};localStorage.setItem(STORE,JSON.stringify(clone));return true;}catch{return false;}}
function say(v){status.textContent=v;try{cfg.onNotice?.(v);}catch{}}
const changed=v=>say(save()?v:v+' · 저장할 수 없어 이 탭에서만 유지됩니다.');
function metadata(v, fallback={}){
 const id=first(v?.video_id,v?.id);if(!VID.test(id||''))return null;
 const declared=https(v?.source_url);if(v?.source_url&&youtubeId(declared)!==id)return null;
 return {video_id:id,source_url:originVideo(id),title_original:text(first(v.title_original,v.title,v.t),500),channel:text(first(v.channel,v.ch,fallback?.name),180)||null,
 observed_date:date(v.observed_date)||date(v.observedDate),join_date:date(v.join_date)||date(v.joinDate),scope_note:text(v.scope_note||v.scopeNote,180)||null,published_at:iso(first(v.published_at,v.publishedAt)),published_date:date(first(v.published_date,v.date,v.d,v.published_at)),views:int(first(v.views,v.v)),observed_at:iso(first(v.observed_at,v.observed))||date(first(v.observed_at,v.observed)),retrieved_at:iso(v.retrieved_at),duration_seconds:int(v.duration_seconds),language:text(v.language,20)||null,format:'shorts',model_id:text(v.model_id,70)||null,model_version:text(v.model_version,70)||null};
}
function entry(e,mode){const row=metadata(e?.row);if(!row?.title_original)return null;const key=mode==='channel'?channelKey(e.key,row):row.video_id;if(!key)return null;return {key,row,source:https(e.source)?.href||null,channelSource:channelUrl(e.channelSource),blocked:e.blocked===true,checked:e.checked===true,reason:text(e.reason,200)};}
function evidenceRow(v,r){return !v?.format||v.format==='shorts'?metadata(v,r):null;}
function mergeInfo(e){const live=known.get(e.row.video_id);if(!live)return e;const row={...e.row};for(const [k,v] of Object.entries(live.row))if(row[k]==null||row[k]==='')row[k]=v;
 if(e.row.views!==null&&e.row.views!==live.row.views)row.observed_at=e.row.observed_at;
 return {...e,row,source:e.source||live.source,channelSource:e.channelSource||live.channelSource,blocked:e.blocked||live.blocked,item:live.item,record:live.record,direct:live.direct};}
function readEvidence(){let v;try{v=cfg.getRecords?.()??cfg.readEvidence?.();}catch{return;}const seq=++evidenceSeq;if(v&&typeof v.then==='function')return v.then(data=>{if(seq===evidenceSeq)applyEvidence(data);},()=>{});applyEvidence(v);}
function applyEvidence(v){if(v===lastEvidence)return;lastEvidence=v;records=arr(Array.isArray(v)?v:v?.records);render();}
function make(tag,label,cls){const n=document.createElement(tag);if(label!=null)n.textContent=label;if(cls)n.className=cls;return n;}
function button(label,fn,key){const b=make('button',label);b.type='button';if(key)b.dataset.scFocus=key;b.addEventListener('click',fn);return b;}
function link(label,href){const n=make('a',label);n.href=href;n.target='_blank';n.rel='noopener noreferrer';return n;}
function group(...nodes){const n=make('div',null,'sc-actions');n.append(...nodes);return n;}
function metric(n,label,value){n.append(make('dt',label),make('dd',value??'미확인'));}
const viewCount=n=>n==null?null:nf.format(n)+'회';
function addCompare(mode,e){const a=state.compare[mode],i=a.findIndex(x=>x.key===e.key);if(i>=0){a.splice(i,1);embeds.delete(mode+':'+e.key);changed('비교에서 뺐습니다.');}else if(a.length>=4){say('비교는 최대 4개입니다. 기존 항목 하나를 먼저 빼세요.');return false;}else{a.push(e);state.mode=mode;changed('비교에 담았습니다. '+a.length+'/4');}render();return true;}
function addTray(kind,e){const t=state.trays[kind], id=e.row.video_id;if(e.blocked){say('권리 제한 근거가 있는 영상은 담을 수 없습니다.');return false;}if(t.rows.some(x=>x.row.video_id===id)){say(names[kind]+' 트레이에 이미 있습니다.');return false;}if(state.trays[kind==='low'?'success':'low'].rows.some(x=>x.row.video_id===id)){say('다른 트레이에 있습니다. 그곳에서 뺀 뒤 다시 담으세요.');return false;}if(t.rows.length>=8){say(names[kind]+' 트레이는 최대 8편입니다.');return false;}t.rows.push({...e,checked:false,reason:names[kind]+' · 사용자 후보 선택'});changed(names[kind]+'에 담았습니다. 원본·선정 근거를 확인해 주세요.');render();return true;}
function decorate(nav,x,m={},given){
 if(!cfg||!nav||nav.querySelector('.sc-card-actions'))return nav;
 const e=itemFor(x,m,given);if(!e)return nav;
 const {row,channelKey:k}=e;known.set(row.video_id,e);
 const wrap=make('div',null,'sc-card-actions');
 const vb=button('영상 비교',()=>addCompare('video',e)), cb=button('채널 비교',()=>addCompare('channel',{...e,key:k}));
 const sb=button('성공 담기',()=>addTray('success',e)),lb=button('저성과 담기',()=>addTray('low',e));
 if(k)wrap.append(vb,cb);else wrap.append(vb);wrap.append(sb,lb);nav.append(wrap);
 wrap.scSync=()=>{vb.setAttribute('aria-pressed',String(state.compare.video.some(i=>i.key===e.key)));cb.setAttribute('aria-pressed',String(state.compare.channel.some(i=>i.key===k)));for(const [kind,b] of [['success',sb],['low',lb]]){const active=state.trays[kind].rows.some(i=>i.row.video_id===row.video_id);b.setAttribute('aria-pressed',String(active));b.disabled=e.blocked||active;}};
 attached.add(wrap);wrap.scSync();
 // Gallery commonly finishes rendering its fragment after this callback.
 if((state.compare.video.some(i=>i.key===row.video_id)||state.compare.channel.some(i=>i.row.video_id===row.video_id)||kinds.some(i=>state.trays[i].rows.some(a=>a.row.video_id===row.video_id))))schedule();
 return nav;
}
let queued=false;
function schedule(){if(queued)return;queued=true;queueMicrotask(()=>{queued=false;render();});}
function evidenceFor(e,mode){
 const id=e.row.video_id, views=[];let channel=e.record||null, named=null;
 if(e.direct&&!Array.isArray(e.direct)&&!e.direct.records&&(!e.direct.id||e.direct.id===id))views.push([e.direct.video||e.direct,e.record]);
 for(const r of [...new Set([e.record,...records].filter(Boolean))]){const v=[r?.hero,...arr(r?.extra),...arr(r?.videos)].find(i=>first(i?.video_id,i?.id)===id);if(v){views.push([v,r]);channel=channel||r;}if(r?.id===e.key)channel=r;if(e.row.channel&&fold(r?.name)===fold(e.row.channel))named=named===null?r:false;}
 channel=channel||(named||null);
 const notes={};let source=null;if(e.item?.analysis)views.unshift([e.item,e.record]);
 for(const [v,r] of views){const a=v.analysis||r?.evidence?.analysisByVideo?.[id]||(fields.some(([k])=>typeof v[k]==='string')?v:null);const href=https(a?.source_url)?.href||https(a?.source)?.href||https(v.source_url)?.href||https(v.source)?.href||https(r?.source)?.href;if(!a||!href||e.blocked||blocked(r?.evidence?.rightsStatus))continue;
  for(const [key] of fields){const brief=text(a[key],181);if(brief&&brief.length<=180)notes[key]??=brief;}
  if(Object.keys(notes).length){source=href;break;}
 }
 return {notes,source,channel:mode==='channel'?channel:null};
}
function preview(card,e,mode,controls){const key=mode+':'+e.key,frame=make('div',null,'sc-frame');let player;
 const b=button('',()=>{if(embeds.has(key))embeds.delete(key);else embeds.add(key);draw();},'embed-'+key);
 frame.id='sc-player-'+mode+'-'+e.row.video_id;b.setAttribute('aria-controls',frame.id);controls.append(b);card.append(frame);
 function draw(){const showing=embeds.has(key);b.textContent=showing?'내장 플레이어 닫기':'YouTube 내장 재생';b.setAttribute('aria-expanded',String(showing));frame.hidden=!showing;
  if(showing&&!frame.querySelector('iframe')){player=make('iframe');player.src='https://www.youtube-nocookie.com/embed/'+e.row.video_id+'?playsinline=1';player.title=e.row.title_original+' · YouTube 플레이어';player.allow='accelerometer; encrypted-media; gyroscope; picture-in-picture; fullscreen';player.allowFullscreen=true;player.referrerPolicy='strict-origin-when-cross-origin';frame.append(player);}
  if(!showing)frame.replaceChildren();
 }
 if(typeof cfg.play==='function')controls.append(button('기존 미리보기',()=>{const r=e.row;try{cfg.play(e.item?.id?e.item:{id:r.video_id,t:r.title_original,ch:r.channel,d:r.published_date,v:r.views,src:e.source||r.source_url,n:''});}catch{say('기존 미리보기를 열 수 없습니다. 내장 플레이어나 YouTube 원본을 이용하세요.');}},'play-'+key));draw();
}
function compareCard(raw,mode){
 const e=mergeInfo(raw),r=e.row,c=make('article',null,'sc-card'), ev=evidenceFor(e,mode);
 const chan=mode==='channel', heading=chan?(r.channel||'채널 미확인'):r.title_original;
 c.append(make('h4',heading));if(chan)c.append(make('p','선택한 대표 영상 · '+r.title_original,'sc-muted'));
 const poster=make('img');poster.src='https://i.ytimg.com/vi/'+r.video_id+'/mqdefault.jpg';poster.loading='lazy';poster.alt='대표 영상 썸네일';poster.className='sc-poster';c.append(poster);const src=group(link('YouTube 영상 원본',r.source_url)), cs=e.channelSource||channelUrl(ev.channel?.source);
 if(chan&&cs)src.append(link('채널 원본',cs));else if(chan)src.append(make('span','채널 원본 미확인','sc-muted'));
 if(e.source&&e.source!==r.source_url)src.append(link('수치 근거',e.source));c.append(src);
 const d=make('dl',null,'sc-facts');if(!chan)metric(d,'채널',r.channel);
 metric(d,'대표 영상 게시',r.published_at||r.published_date);metric(d,'대표 영상 누적 조회수',viewCount(r.views));metric(d,'조회 관측일/시각',r.observed_at||r.observed_date);metric(d,'채널 개설일',r.join_date);metric(d,'AI 제작 범위',r.scope_note);
 if(chan){const record=ev.channel, batch=record?.cohorts?.snapshot, counts=!batch?.partial&&https(record?.source)?arr(batch?.videos).map(v=>int(v?.[2])).filter(v=>v!==null).sort((a,b)=>a-b):[];
  metric(d,'채널 표본',counts.length?counts.length+'편 · '+(date(batch.observed)||iso(batch.observed)||'관측일 미확인'):null);
  if(counts.length)metric(d,'표본 중앙값',nf.format((counts[(counts.length-1)>>1]+counts[counts.length>>1])/2)+'회');
  if(record?.summary&&https(record.source)){metric(d,'채널 조사 메모',text(record.summary,180));if(!cs)src.append(link('채널 수치 근거',record.source));}
 }
 c.append(d);const notes=make('details',null,'sc-notes');notes.open=true;notes.append(make('summary','영상 구성 근거'));
 if(ev.source)notes.append(link('구성 근거 원출처',ev.source));
 const details=make('dl',null,'sc-facts');for(const [k,label] of fields)metric(details,label,ev.notes[k]);notes.append(details);c.append(notes);
 const controls=group(button('비교에서 빼기',()=>addCompare(mode,raw),'remove-'+mode+'-'+e.key));
 if(!e.blocked){controls.append(button('성공 참고 담기',()=>addTray('success',e),'compare-success-'+e.key),button('저성과 참고 담기',()=>addTray('low',e),'compare-low-'+e.key));preview(c,e,mode,controls);}
 else c.append(make('p','권리 제한 기록이 있어 내장 재생·트레이 선택에서 제외합니다.','sc-muted'));
 c.append(controls);return c;
}
function suggestions(kind,days,now){
 const out=[], all=candidateIndex(), materialize=id=>{const c=all.get(id);return c?itemFor(c.x||c,c.meta||{},c.channelKey):null;};
 for(const [i,id] of sampleIds[kind].entries()){
  const item=materialize(id)||known.get(id);if(!item||item.blocked||windowStatus(item.row,now,days)!=='inside')continue;
  out.push({...item,reason:names[kind]+' · 지정 후보 목록 (원본·분류 직접 확인)',rank:-2+i/(sampleIds[kind].length+1)});
 }
 function push(v,r,reason,source,rank,observed){
  const row=evidenceRow(v,r);if(!row?.title_original||row.views===null||isBlocked(v,{record:r})||windowStatus(row,now,days)!=='inside'||!https(source))return;
  row.observed_at||=iso(observed)||date(observed);if(!row.observed_at)return;
  out.push({key:row.video_id,row,source:https(source).href,channelSource:channelUrl(r?.source),blocked:false,checked:false,reason,rank});
 }
 for(const r of records){
  const declared=r?.evidence?.[kind==='success'?'successVideos':'lowPerformanceVideos'];
  for(const v of arr(declared)){const source=first(v?.evidence_source,v?.source,r?.source);push(v,r,names[kind]+' · 근거 목록',source,-1);}
  const b=r?.cohorts?.snapshot;if(!b||b.partial!==false||!https(r.source)||(!date(b.observed)&&!iso(b.observed)))continue;
  const rows=[...new Map(arr(b.videos).filter(v=>VID.test(v?.[0]||'')&&date(v?.[1])&&int(v?.[2])!==null).map(v=>[v[0],v])).values()];
  if(rows.length<8)continue;
  // Use the recorded in-channel cumulative-view distribution, never inferred earnings or D7.
  rows.sort((a,b)=>a[2]-b[2]);const n=Math.floor(rows.length/4), low=rows[n-1][2],high=rows[rows.length-n][2];if(!(low<high))continue;
  for(const [i,[id,d,v]] of rows.entries()){
   if(kind==='low'?v>low:v<high)continue;
   const data=[r.hero,...arr(r.extra),...arr(r.videos)].find(x=>first(x?.video_id,x?.id)===id);
   const k=known.get(id)||materialize(id), live=k?.row;if(k?.blocked)continue;
   const name=first(data?.title_original,data?.title,data?.t,live?.title_original);if(!name)continue;
   const basis='동일 채널 '+rows.length+'편 표본 누적 조회수 '+(kind==='low'?'하위':'상위')+' 25% · '+b.observed+' 관측 (게시 경과 차이 미보정)';
   push({...data,id,video_id:id,title_original:name,published_date:d,views:v,observed_at:b.observed},r,basis,r.source,kind==='low'?i/rows.length:(rows.length-1-i)/rows.length,b.observed);
  }
 }
 return out.sort((a,b)=>a.rank-b.rank||a.key.localeCompare(b.key));
}
async function prefill(kind){
 const t=state.trays[kind], start=t.rows.length;if(start===8){say('트레이가 이미 찼습니다.');return;}
 say('게시 기간과 공개 근거를 확인하는 중입니다.');await readEvidence();
 const used=new Set(kinds.flatMap(k=>state.trays[k].rows.map(e=>e.row.video_id)));
 for(const {rank,...e} of suggestions(kind,t.days,Date.now())){if(t.rows.length===8)break;if(!used.has(e.row.video_id)){used.add(e.row.video_id);t.rows.push(e);}}
 const added=t.rows.length-start;if(!added){say('현재 기간에 원본 제목과 비교 근거를 함께 확인한 새 영상이 없습니다. 바둑판에서 직접 선택할 수 있습니다.');return;}
 changed(added+'편을 후보로 담았습니다. 원본과 선정 근거를 확인한 뒤 체크하세요.');render();
}
function usable(e,now,days){const r=mergeInfo(e);return !r.blocked&&e.checked&&r.row.title_original&&youtubeId(https(r.row.source_url))===r.row.video_id&&windowStatus(r.row,now,days)==='inside';}
function filters(){let value;try{value=cfg.getFilters?.();}catch{}if(!value||typeof value!=='object')return {};
 return Object.fromEntries(Object.entries(value).filter(([k,v])=>filterNames.has(k)&&(typeof v==='boolean'||typeof v==='number'&&Number.isFinite(v)||typeof v==='string'&&!/(?:https?:\/\/|file:|\b[A-Z]:[\\/]|(?:^|\s)(?:\/Users\/|\/home\/|\\\\|~[\\/]))/i.test(v))).slice(0,60).map(([k,v])=>[k,typeof v==='string'?text(v,250):v]));}
const uid=()=>globalThis.crypto?.randomUUID?.()||Date.now().toString(36)+'-'+Math.random().toString(36).slice(2);
function documentFor(kind){const t=state.trays[kind], now=Date.now(), picked=t.rows.filter(e=>usable(e,now,t.days));if(picked.length<7||picked.length>8||new Set(picked.map(e=>e.row.video_id)).size!==picked.length)return null;
 return {schema:SCHEMA,schema_version:1,format:'shorts',mode:'reference_batch',timezone:'Asia/Seoul',project_id:'shorts-references',run_id:'shorts-'+kind+'-'+uid(),created_at:new Date(now).toISOString(),published_within_days:t.days,filters_snapshot:filters(),selected:picked.map(e=>({...mergeInfo(e).row,selection_reason:e.reason||names[kind]+' · 사용자 원본 확인',rights:'unknown'}))};}
function download(kind){const doc=documentFor(kind);if(!doc){say('게시 기간 안에 있는 확인 완료 영상 7~8편이 필요합니다.');render();return;}
 const u=URL.createObjectURL(new Blob([JSON.stringify(doc,null,2)+'\n'],{type:'application/json;charset=utf-8'}));const a=make('a');a.href=u;a.download=doc.run_id+'.json';document.body.append(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(u),15000);say('확인한 '+doc.selected.length+'편의 JSON을 요청했습니다. 작업실이 이 규격을 지원하면 가져올 수 있습니다.');}
async function publicHub(){
 if(location.origin!==new URL(HUB).origin)return false;
 try{const paths=['','workbench-v3-core.js','workbench-v3-ui.js'];const files=await Promise.all(paths.map(async name=>{const r=await fetch(HUB+name,{cache:'no-store',credentials:'same-origin',redirect:'error'});return r.ok&&r.url===HUB+name?await r.text():'';}));
  const doc=new DOMParser().parseFromString(files[0],'text/html');const active=new Set([...doc.querySelectorAll('script[src]')].map(s=>new URL(s.getAttribute('src'),HUB)).filter(u=>u.origin===location.origin).map(u=>u.pathname));
  return paths.slice(1).every(n=>active.has(new URL(n,HUB).pathname))&&files[1].includes(SCHEMA)&&/content-workbench:selection:v1:/.test(files[1])&&/selectionKey\(/.test(files[2])&&/localStorage\.getItem\(request\)/.test(files[2]);
 }catch{return false;}
}
async function send(kind){say('공개 작업실의 수신 연결을 확인하는 중입니다.');if(!await publicHub()){hubReady=false;render();say('공개 작업실의 수신을 확인하지 못했습니다. JSON 다운로드를 이용하세요.');return;}
 const doc=documentFor(kind);if(!doc){say('게시 기간 안에 있는 확인 완료 영상 7~8편이 필요합니다.');render();return;}
 try{localStorage.setItem('content-workbench:selection:v1:shorts:'+doc.run_id,JSON.stringify(doc));const u=new URL(HUB);u.searchParams.set('format','shorts');u.searchParams.set('run_id',doc.run_id);u.hash='workspace';location.assign(u.href);}catch{say('브라우저 전달을 사용할 수 없습니다. JSON 다운로드를 이용하세요.');}}
function tray(kind){
 const t=state.trays[kind],now=Date.now(),eligible=t.rows.filter(e=>usable(e,now,t.days)).length;
 const n=make('section',null,'sc-tray');n.dataset.scTray=kind;n.append(make('h3',names[kind]+' 트레이'),make('p',t.rows.length+'/8 후보 · '+eligible+'편 확인 완료','sc-tally'));
 const filter=make('label','게시 기간 '),select=make('select');select.dataset.scFocus='days-'+kind;
 for(const days of [30,60]){const o=make('option','최근 '+days+'일');o.value=days;select.append(o);}select.value=t.days;select.addEventListener('change',()=>{t.days=Number(select.value);changed('게시 기간을 갱신했습니다.');render();});filter.append(select);
 n.append(group(filter,button('근거에서 후보 채우기',()=>prefill(kind),'prefill-'+kind)));
 const ol=make('ol',null,'sc-slots');
 for(let i=0;i<8;i++){
  const item=t.rows[i],li=make('li');if(!item){li.append(make('span','빈 슬롯','sc-muted'));ol.append(li);continue;}
  const e=mergeInfo(item),r=e.row,w=windowStatus(r,now,t.days),id=r.video_id;
  li.append(link(r.title_original,r.source_url),make('p',[r.channel||'채널 미확인',r.published_at||r.published_date||'게시일 미확인',viewCount(r.views)||'조회수 미확인'].join(' · '),'sc-muted'));
  const evidence=group(make('span',item.reason,'sc-muted'));if(e.source)evidence.append(link('선정 근거 출처',e.source));li.append(evidence);
  const why=e.blocked?'권리 문제 · 전달 제외':windowText[w];if(why)li.append(make('p',why,'sc-warning'));
  const lbl=make('label','원본·선정 근거 확인'),cb=make('input');cb.type='checkbox';cb.checked=item.checked;cb.disabled=e.blocked||w!=='inside';cb.dataset.scFocus='check-'+kind+'-'+id;lbl.prepend(cb);
  cb.addEventListener('change',()=>{item.checked=cb.checked;changed(cb.checked?'원본과 선정 근거를 확인한 것으로 표시했습니다.':'확인 표시를 해제했습니다.');render();});
  li.append(group(lbl,button('빼기',()=>{t.rows.splice(i,1);changed('트레이에서 뺐습니다.');render();},'tray-remove-'+kind+'-'+id)));ol.append(li);
 }
 n.append(ol);const d=button('선택 JSON 다운로드',()=>download(kind),'download-'+kind);d.disabled=eligible<7;const buttons=group(d);
 if(hubReady){const b=button('작업실에 전달',()=>send(kind),'send-'+kind);b.disabled=eligible<7;buttons.append(b);}n.append(buttons);return n;
}
function render(){if(!body)return;const active=root.contains(document.activeElement)?document.activeElement.dataset.scFocus:null;
 const selections=state.compare[state.mode], tabs=group();for(const [k,label] of [['video','영상 비교'],['channel','채널 비교']]){const b=button(label+' '+state.compare[k].length+'/4',()=>{state.mode=k;changed(label+'를 표시합니다.');render();},'mode-'+k);b.setAttribute('aria-pressed',String(state.mode===k));tabs.append(b);}
 const title=make('h3','나란히 비교');const cols=make('div',null,'sc-columns');cols.style.setProperty('--sc-count',String(Math.max(2,selections.length)));for(const e of selections)cols.append(compareCard(e,state.mode));
 const previous=body.querySelector('.sc-columns');const scroll=previous?.scrollLeft||0;
 const frames=new Map([...(previous?.querySelectorAll('iframe')||[])].map(f=>[f.src,f]));
 const content=[title,tabs];if(selections.length<2)content.push(make('p',selections.length?'하나 더 담으면 나란히 비교할 수 있습니다.':'바둑판 카드에서 영상 또는 채널을 2~4개 담으세요.','sc-muted'));if(selections.length)content.push(cols);
 const ts=make('div',null,'sc-trays');for(const k of kinds)ts.append(tray(k));
 body.replaceChildren(...content,make('h3','참고 영상 선정'),make('p','트레이는 서로 독립입니다. 근거 채우기는 누적 조회수 표본(또는 분류 근거 목록)을 사용하며 수익·실패 판정이 아닙니다. 각 트레이에서 원본·선정 근거를 확인한 기간 내 7~8편만 JSON으로 저장합니다. 자막 전문·대본·HumanTouch 반입은 포함하지 않습니다.','sc-muted'),ts);
 for(const f of cols.querySelectorAll('iframe')){const old=frames.get(f.src);if(old)f.replaceWith(old);}
 cols.scrollLeft=scroll;
 for(const wrap of attached){if(wrap.isConnected)wrap.scSync();else attached.delete(wrap);}
 if(active)[...body.querySelectorAll('[data-sc-focus]')].find(n=>n.dataset.scFocus===active&&!n.disabled)?.focus({preventScroll:true});
}
function style(){if(document.getElementById('shorts-compare-style'))return;const n=make('style');n.id='shorts-compare-style';n.textContent=`
.sc-root{color:var(--sw-ink,#202a3b);line-height:1.45;min-width:0}.sc-root h2,.sc-root h3,.sc-root h4{margin:0 0 .35rem;line-height:1.25}.sc-root h3{margin-top:.75rem}.sc-root p{margin:.3rem 0}.sc-root a{color:var(--sw-blue,#194d9d)}.sc-root button,.sc-root select{min-height:30px;font:inherit;padding:.25rem .45rem;border:1px solid #a8b3c2;border-radius:4px;color:inherit;background:#fff}.sc-root button:not(:disabled){cursor:pointer}.sc-root button:disabled,.sc-card-actions button:disabled{opacity:.58;cursor:default}.sc-root button[aria-pressed=true],.sc-card-actions button[aria-pressed=true]{color:#0b4b90;background:#e4efff;border-color:#6d9bd7}.sc-root :focus-visible,.sc-card-actions :focus-visible{outline:2px solid #194d9d;outline-offset:2px}.sc-actions,.sc-card-actions{display:flex;align-items:center;flex-wrap:wrap;gap:.28rem .5rem;margin:.35rem 0}.sc-card-actions{margin:0;gap:.2rem;flex-basis:100%}.sc-card-actions button{font-size:10px;white-space:normal;min-height:20px;padding:1px 4px}.sc-muted{color:var(--sw-muted,#566176);font-size:.875em}.sc-warning{color:#8a410b;font-weight:650}.sc-status{min-height:1.45em;color:#194d9d}.sc-columns{display:grid;grid-template-columns:repeat(var(--sc-count),minmax(180px,1fr));gap:.6rem;overflow-x:auto;align-items:start;padding:.25rem .15rem .6rem}.sc-card,.sc-tray{border:1px solid var(--sw-line,#d9e0e9);border-radius:8px;background:var(--sw-paper,#fff);padding:.7rem;min-width:0;overflow-wrap:anywhere}.sc-poster{display:block;width:100%;max-height:150px;object-fit:cover;border-radius:6px}.sc-card h4{font-size:1rem}.sc-facts{display:grid;grid-template-columns:minmax(4.1rem,auto) minmax(0,1fr);gap:.2rem .45rem;font-size:.85rem;margin:.45rem 0}.sc-facts dt{font-weight:650}.sc-facts dd{margin:0}.sc-notes summary{cursor:pointer;font-weight:700}.sc-notes{margin:.45rem 0}.sc-frame{min-width:0}.sc-frame iframe{display:block;margin:auto;width:100%;max-width:310px;min-height:200px;max-height:430px;aspect-ratio:9/16;border:0;background:#141821}.sc-trays{display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,280px),1fr));gap:.6rem}.sc-tray[data-sc-tray=success]{border-top:3px solid #25674a}.sc-tray[data-sc-tray=low]{border-top:3px solid #925e27}.sc-tray h3{margin-top:0}.sc-tally{font-weight:700}.sc-slots{padding-left:1.55rem;margin:.4rem 0}.sc-slots li{padding:.26rem 0;border-bottom:1px solid #e6ebf2}.sc-slots label{display:inline-flex;align-items:center;gap:.2em}.sc-slots input{width:auto;height:auto}.sc-root [hidden]{display:none!important}`;document.head.append(n);}
function init(options){if(!options?.host?.replaceChildren)return;
 cfg=options;root=options.host;state=saved();if(options.samples)configureSamples(options.samples);root.classList.add('sc-root');style();
 status=make('p','','sc-status');status.setAttribute('role','status');status.setAttribute('aria-live','polite');body=make('div');root.replaceChildren(make('h2','쇼츠 비교와 참고 영상'),status,body);render();
 readEvidence();publicHub().then(ok=>{if(ok){hubReady=true;render();}});return root;
}
function refresh(){if(!cfg)return;const next=readEvidence();render();return next;}
window.ShortsCompare={init,decorate,refresh,configureSamples,compareCandidate(x){if(!cfg)return false;const e=itemFor(x);if(!e)return false;return addCompare('video',e);}};
})();
