/* Rights-gated subtitle tools. User-imported files only: no scraping, no network, no storage writes (memory only). */
(function (g) {
'use strict';
const VID = /^[\w-]{11}$/;
const tracks = [];          // in-memory only; never persisted
const subs = new Set();
let seq = 0, hostEl = null, hostCfg = null;
const filt = { lang: '', right: '' };
const RIGHTS = [['analyze', '분석 허용'], ['retain', '보관 허용'], ['quote', '인용 허용'], ['private', '비공개']];

/* ---------- time helpers ---------- */
function p2(n) { return String(n).padStart(2, '0'); }
function fmt(sec, sep) {
  const t = Math.round(sec * 1000), ms = t % 1000, s = Math.floor(t / 1000), h = Math.floor(s / 3600);
  return p2(h) + ':' + p2(Math.floor(s / 60) % 60) + ':' + p2(s % 60) + sep + String(ms).padStart(3, '0');
}
const TS = '(?:(\\d{1,3}):)?(\\d{1,2}):(\\d{2})[,.](\\d{1,3})';
const TL = new RegExp('^\\s*' + TS + '\\s*-->\\s*' + TS + '(?:\\s+.*)?$');
function toSec(h, m, s, ms) {
  if (+m > 59 || +s > 59) return NaN;
  return (+(h || 0)) * 3600 + (+m) * 60 + (+s) + (+String(ms).padEnd(3, '0')) / 1000;
}
function fail(error) { return { ok: false, format: null, cues: [], hasTimes: false, error }; }

/* ---------- parsing ---------- */
function parseTimed(text, vtt) {
  const blocks = text.split(/\n{2,}/), cues = [];
  for (let b of blocks) {
    const lines = b.split('\n').filter((l, i, a) => !(l === '' && (i === 0 || i === a.length - 1)));
    if (!lines.length || !lines.some(l => l.trim())) continue;
    if (vtt && /^(WEBVTT|NOTE|STYLE|REGION)(\s|$)/.test(lines[0])) continue;
    const i = lines.findIndex(l => l.includes('-->'));
    if (i < 0) {
      if (!vtt && lines.length === 1 && /^\d+$/.test(lines[0].trim())) continue;
      return fail('타임코드가 없는 블록: "' + lines[0].slice(0, 40) + '"');
    }
    if (i > 1 || (i === 1 && vtt === false && !/^\d+$/.test(lines[0].trim()))) return fail('큐 형식 오류: "' + lines[0].slice(0, 40) + '"');
    const m = TL.exec(lines[i]);
    if (!m) return fail('잘못된 타임코드: "' + lines[i].slice(0, 60) + '"');
    const start = toSec(m[1], m[2], m[3], m[4]), end = toSec(m[5], m[6], m[7], m[8]);
    if (!isFinite(start) || !isFinite(end)) return fail('잘못된 타임코드 값: "' + lines[i].slice(0, 60) + '"');
    if (end < start) return fail('끝 시간이 시작보다 빠름: "' + lines[i].slice(0, 60) + '"');
    let t = lines.slice(i + 1).join('\n').trim();
    if (vtt) t = t.replace(/<[^>]+>/g, '');
    if (t) cues.push({ start, end, text: t });
  }
  if (!cues.length) return fail('읽을 수 있는 자막 큐가 없습니다.');
  return { ok: true, format: vtt ? 'vtt' : 'srt', cues, hasTimes: true, error: null };
}
function numOrTs(v) {
  if (typeof v === 'number') return isFinite(v) && v >= 0 ? v : NaN;
  if (typeof v === 'string') { const m = new RegExp('^\\s*' + TS + '\\s*$').exec(v); return m ? toSec(m[1], m[2], m[3], m[4]) : NaN; }
  return NaN;
}
function parseJSONText(text) {
  let d; try { d = JSON.parse(text); } catch (e) { return fail('JSON 형식 오류'); }
  const arr = Array.isArray(d) ? d : (d && Array.isArray(d.cues) ? d.cues : null);
  if (!arr) return fail('cues 배열이 없습니다.');
  const cues = []; let timed = 0;
  for (const c of arr) {
    const t = typeof c === 'string' ? c : c && c.text;
    if (typeof t !== 'string' || !t.trim()) continue;
    const hasS = c && c.start != null, hasE = c && c.end != null;
    if (hasS || hasE) {
      const s = numOrTs(c.start), e = numOrTs(c.end);
      if (!isFinite(s) || !isFinite(e) || e < s) return fail('잘못된 JSON 타임코드');
      cues.push({ start: s, end: e, text: t.trim() }); timed++;
    } else cues.push({ start: null, end: null, text: t.trim() });
  }
  if (!cues.length) return fail('읽을 수 있는 자막 큐가 없습니다.');
  if (timed && timed !== cues.length) return fail('일부 큐에만 타임코드가 있습니다.');
  return { ok: true, format: 'json', cues, hasTimes: timed > 0, error: null, meta: Array.isArray(d) ? null : d };
}
function parse(text, name) {
  if (typeof text !== 'string') return fail('텍스트가 아닙니다.');
  text = text.replace(/^\uFEFF/, '').replace(/\r\n?/g, '\n');
  if (!text.trim()) return fail('내용이 비어 있습니다.');
  const ext = (/\.([a-z0-9]+)$/i.exec(name || '') || [])[1];
  const ex = ext ? ext.toLowerCase() : '';
  if (ex === 'json' || (!ex && /^\s*[\[{]/.test(text))) return parseJSONText(text);
  if (/^WEBVTT(\s|$)/.test(text) || ex === 'vtt') {
    if (!/^WEBVTT(\s|$)/.test(text)) return fail('VTT 헤더(WEBVTT)가 없습니다.');
    return parseTimed(text, true);
  }
  if (ex === 'srt' || text.includes('-->')) return parseTimed(text, false);
  const cues = text.split('\n').map(l => l.trim()).filter(Boolean).map(t => ({ start: null, end: null, text: t }));
  return { ok: true, format: 'txt', cues, hasTimes: false, error: null };
}

/* ---------- exporters (pure) ---------- */
function needTimes(track, what) {
  if (!track || !Array.isArray(track.cues)) throw new Error('트랙이 없습니다.');
  if (track.cues.some(c => c.start == null || c.end == null)) throw new Error('TXT에는 타임코드가 없어 ' + what + ' 내보내기를 할 수 없습니다.');
}
const bom = (s, o) => (o && o.bom ? '\uFEFF' : '') + s;
function toSRT(track, o) { needTimes(track, 'SRT'); return bom(track.cues.map((c, i) => (i + 1) + '\n' + fmt(c.start, ',') + ' --> ' + fmt(c.end, ',') + '\n' + c.text).join('\n\n') + '\n', o); }
function toVTT(track, o) { needTimes(track, 'VTT'); return bom('WEBVTT\n\n' + track.cues.map(c => fmt(c.start, '.') + ' --> ' + fmt(c.end, '.') + '\n' + c.text).join('\n\n') + '\n', o); }
function toTXT(track, o) { if (!track || !Array.isArray(track.cues)) throw new Error('트랙이 없습니다.'); return bom(track.cues.map(c => c.text).join('\n') + '\n', o); }
function toJSON(track, o) {
  needTimes(track, 'JSON(타임코드 포함)');
  const r = track.rights || {};
  return bom(JSON.stringify({ video_id: track.video_id, source_url: track.source_url, language: track.language, translation: !!track.translation, rights: { analyze: !!r.analyze, retain: !!r.retain, quote: !!r.quote, private: !!r.private, download: !!r.download }, cues: track.cues, imported_at: track.imported_at }, null, 2) + '\n', o);
}
const canTimed = t => !!t && t.cues.length > 0 && t.cues.every(c => c.start != null && c.end != null);
const canDownload = t => !!(t && t.rights && t.rights.download);

/* ---------- ZIP (STORE) ---------- */
let CRC = null;
function crc32(b) {
  if (!CRC) { CRC = new Uint32Array(256); for (let n = 0; n < 256; n++) { let c = n; for (let k = 0; k < 8; k++) c = c & 1 ? 0xEDB88320 ^ (c >>> 1) : c >>> 1; CRC[n] = c >>> 0; } }
  let c = 0xFFFFFFFF; for (let i = 0; i < b.length; i++) c = CRC[(c ^ b[i]) & 255] ^ (c >>> 8); return (c ^ 0xFFFFFFFF) >>> 0;
}
const enc = s => new TextEncoder().encode(s);
function zipFiles(files) {
  const parts = [], cen = []; let off = 0;
  const d = new Date(), dt = ((d.getHours() << 11) | (d.getMinutes() << 5) | (d.getSeconds() >> 1)) & 0xFFFF, dd = (((Math.max(d.getFullYear(), 1980) - 1980) << 9) | ((d.getMonth() + 1) << 5) | d.getDate()) & 0xFFFF;
  for (const f of files) {
    const nm = enc(f.name), data = f.data, crc = crc32(data);
    const lh = new DataView(new ArrayBuffer(30));
    lh.setUint32(0, 0x04034b50, true); lh.setUint16(4, 20, true); lh.setUint16(6, 0x0800, true); lh.setUint16(8, 0, true);
    lh.setUint16(10, dt, true); lh.setUint16(12, dd, true); lh.setUint32(14, crc, true); lh.setUint32(18, data.length, true); lh.setUint32(22, data.length, true); lh.setUint16(26, nm.length, true); lh.setUint16(28, 0, true);
    parts.push(new Uint8Array(lh.buffer), nm, data);
    const ch = new DataView(new ArrayBuffer(46));
    ch.setUint32(0, 0x02014b50, true); ch.setUint16(4, 20, true); ch.setUint16(6, 20, true); ch.setUint16(8, 0x0800, true); ch.setUint16(10, 0, true);
    ch.setUint16(12, dt, true); ch.setUint16(14, dd, true); ch.setUint32(16, crc, true); ch.setUint32(20, data.length, true); ch.setUint32(24, data.length, true); ch.setUint16(28, nm.length, true); ch.setUint32(42, off, true);
    cen.push(new Uint8Array(ch.buffer), nm);
    off += 30 + nm.length + data.length;
  }
  const cenLen = cen.reduce((a, b) => a + b.length, 0), eo = new DataView(new ArrayBuffer(22));
  eo.setUint32(0, 0x06054b50, true); eo.setUint16(8, files.length, true); eo.setUint16(10, files.length, true); eo.setUint32(12, cenLen, true); eo.setUint32(16, off, true);
  const all = [...parts, ...cen, new Uint8Array(eo.buffer)], out = new Uint8Array(all.reduce((a, b) => a + b.length, 0)); let p = 0;
  for (const a of all) { out.set(a, p); p += a.length; }
  return out;
}
const safe = s => String(s || 'und').replace(/[^\w.-]+/g, '_').slice(0, 40);
function zipSRT(list, o) {
  const used = new Set(), files = [], skipped = [];
  for (const t of list || []) {
    if (!canDownload(t)) { skipped.push({ id: t && t.id, reason: '다운로드 권리 확인 없음' }); continue; }
    if (!canTimed(t)) { skipped.push({ id: t.id, reason: '타임코드 없음(TXT)' }); continue; }
    let n = safe(t.video_id) + '.' + safe(t.language), name = n + '.srt', i = 2;
    while (used.has(name)) name = n + '_' + (i++) + '.srt';
    used.add(name); files.push({ name, data: enc(toSRT(t, o)) });
  }
  return { bytes: zipFiles(files), count: files.length, skipped };
}

/* ---------- state ---------- */
function validate(meta) {
  const u = String(meta.source_url || '').trim();
  try { const x = new URL(u); if (!/^https?:$/.test(x.protocol)) throw 0; } catch (e) { return '출처 URL(http/https)을 입력하세요.'; }
  if (!/^[A-Za-z]{2,3}(-[A-Za-z0-9]{2,8})*$/.test(String(meta.language || '').trim())) return '언어 코드(예: ko, en, ja)를 입력하세요.';
  if (typeof meta.translation !== 'boolean') return '원본/번역을 선택하세요.';
  if (!meta.rights || !meta.rights.retain) return '메모리 보관을 하려면 "보관 허용"을 체크해야 합니다.';
  return '';
}
function addTrack(video_id, parsed, meta) {
  const err = validate(meta); if (err) return { ok: false, error: err };
  if (!parsed || !parsed.ok) return { ok: false, error: (parsed && parsed.error) || '파싱 실패' };
  const r = meta.rights, t = { id: 't' + (++seq), video_id, source_url: meta.source_url.trim(), language: meta.language.trim(), translation: meta.translation, format: parsed.format, hasTimes: parsed.hasTimes, cues: parsed.cues, imported_at: new Date().toISOString(), rights: { analyze: !!r.analyze, retain: !!r.retain, quote: !!r.quote, private: !!r.private, download: !!r.download } };
  tracks.push(t); notify(); return { ok: true, track: t };
}
function clearMemory(video_id) { for (let i = tracks.length - 1; i >= 0; i--) if (!video_id || tracks[i].video_id === video_id) tracks.splice(i, 1); notify(); }
function notify() { subs.forEach(f => { try { f(); } catch (e) {} }); }

/* ---------- DOM ---------- */
const doc = () => (typeof document !== 'undefined' ? document : null);
function mk(tag, label, cls) { const n = doc().createElement(tag); if (label != null) n.textContent = label; if (cls) n.className = cls; return n; }
function btn(label, fn, cls) { const b = mk('button', label, cls); b.type = 'button'; b.addEventListener('click', fn); return b; }
function style() {
  const d = doc(); if (!d || d.getElementById('ss-style')) return;
  const s = d.createElement('style'); s.id = 'ss-style';
  s.textContent = '.ss-card{flex:1 0 100%;font-size:12px}.ss-panel{margin-top:6px;padding:8px;border:1px solid #8886;border-radius:8px;display:grid;gap:6px}.ss-panel[hidden]{display:none}.ss-panel label{display:inline-flex;gap:4px;align-items:center;margin-right:8px}.ss-panel textarea{width:100%;min-height:54px}.ss-warn{color:#b45309}.ss-err{color:#b91c1c}.ss-host{padding:10px;border:1px solid #8886;border-radius:10px;display:grid;gap:8px}.ss-host table{border-collapse:collapse;width:100%}.ss-host td,.ss-host th{border-bottom:1px solid #8883;padding:3px 6px;text-align:left}.ss-card button:disabled{opacity:.45;cursor:not-allowed}';
  d.head.appendChild(s);
}
function download(name, data, type) {
  const blob = new Blob([data], { type }), a = mk('a'); a.href = URL.createObjectURL(blob); a.download = name;
  doc().body.appendChild(a); a.click(); a.remove(); setTimeout(() => URL.revokeObjectURL(a.href), 4000);
}
function readFile(file) { return file.text(); }

function decorate(nav, x) {
  if (!doc() || !nav || nav.querySelector('.ss-card')) return nav;
  const id = x && (x.id || x.video_id); if (!id || !VID.test(String(id))) return nav;
  style();
  const wrap = mk('div', null, 'ss-card'), bar = mk('div', null, 'ss-bar'), panel = mk('div', null, 'ss-panel'), msg = mk('div', null, 'ss-msg');
  panel.hidden = true; panel.setAttribute('role', 'region'); panel.setAttribute('aria-label', '자막 가져오기');
  const tog = btn('▼ 자막', () => { panel.hidden = !panel.hidden; tog.textContent = (panel.hidden ? '▼' : '▲') + ' 자막'; tog.setAttribute('aria-expanded', String(!panel.hidden)); });
  tog.setAttribute('aria-expanded', 'false');
  const sel = mk('select'); sel.setAttribute('aria-label', '내보낼 자막 트랙');
  const cp = btn('📋', () => act('copy')), bT = btn('📥TXT', () => act('txt')), bS = btn('📥SRT', () => act('srt')), bV = btn('📥VTT', () => act('vtt')), bJ = btn('📥JSON', () => act('json'));
  cp.title = '자막 텍스트 복사'; bar.append(tog, sel, cp, bT, bS, bV, bJ);
  // import form
  const file = mk('input'); file.type = 'file'; file.accept = '.srt,.vtt,.txt,.json,text/plain'; file.setAttribute('aria-label', '자막 파일 선택');
  const paste = mk('textarea'); paste.placeholder = '또는 SRT / VTT / TXT / JSON 내용을 붙여넣기'; paste.setAttribute('aria-label', '자막 붙여넣기');
  const src = mk('input'); src.type = 'url'; src.placeholder = '출처 URL (필수)'; src.size = 34; src.value = '';
  const lang = mk('input'); lang.placeholder = '언어 (ko, en…)'; lang.size = 8;
  const kind = mk('select'); for (const [v, l] of [['', '원본/번역 선택'], ['orig', '원본'], ['trans', '번역']]) { const o = mk('option', l); o.value = v; kind.append(o); }
  const rights = {}, rrow = mk('div');
  for (const [k, l] of RIGHTS) { const lb = mk('label'), c = mk('input'); c.type = 'checkbox'; rights[k] = c; lb.append(c, l); rrow.append(lb); }
  const dlLb = mk('label'), dl = mk('input'); dl.type = 'checkbox'; dlLb.append(dl, '다운로드 권리 확인'); rrow.append(dlLb);
  const add = btn('가져오기(메모리)', async () => {
    let text = paste.value, name = '';
    if (file.files && file.files[0]) { name = file.files[0].name; try { text = await readFile(file.files[0]); } catch (e) { say('파일을 읽지 못했습니다.', 1); return; } }
    if (!text) { say('파일을 선택하거나 내용을 붙여넣으세요.', 1); return; }
    const res = addTrack(String(id), parse(text, name), { source_url: src.value, language: lang.value, translation: kind.value ? kind.value === 'trans' : undefined, rights: { analyze: rights.analyze.checked, retain: rights.retain.checked, quote: rights.quote.checked, private: rights.private.checked, download: dl.checked } });
    if (!res.ok) { say(res.error, 1); return; }
    paste.value = ''; file.value = '';
    say('가져왔습니다: ' + res.track.cues.length + '줄 · ' + res.track.format.toUpperCase() + (res.track.hasTimes ? '' : ' · 타임코드 없음(SRT/VTT/JSON 불가)'));
  });
  const clr = btn('메모리 삭제', () => { clearMemory(String(id)); say('이 영상의 자막을 메모리에서 지웠습니다.'); });
  const note = mk('div', '자막은 본인이 권리를 가진 파일만 가져오세요. 이 탭 메모리에만 있고 저장·전송되지 않습니다.', 'ss-warn');
  const row1 = mk('div'); row1.append(file, ' ', src, ' ', lang, ' ', kind);
  panel.append(note, row1, paste, rrow, mk('div'), msg);
  panel.children[4].append(add, ' ', clr);
  wrap.append(bar, panel); nav.append(wrap);
  function say(t, bad) { msg.textContent = t; msg.className = bad ? 'ss-err' : 'ss-msg'; }
  const mine = () => tracks.filter(t => t.video_id === String(id));
  const cur = () => mine().find(t => t.id === sel.value) || null;
  function sync() {
    const m = mine(), keep = sel.value; sel.replaceChildren();
    for (const t of m) { const o = mk('option', t.language + (t.translation ? ' 번역' : ' 원본') + ' · ' + t.format.toUpperCase()); o.value = t.id; sel.append(o); }
    if (m.some(t => t.id === keep)) sel.value = keep; sel.hidden = !m.length;
    const t = cur(), none = !t, noDl = t && !canDownload(t), noTime = t && !canTimed(t);
    const why = (timed) => none ? '먼저 자막을 가져오세요' : noDl ? '"다운로드 권리 확인"이 필요합니다' : timed && noTime ? '타임코드가 없는 TXT라 만들 수 없습니다' : '';
    for (const [b, timed] of [[cp, 0], [bT, 0], [bS, 1], [bV, 1], [bJ, 1]]) { const w = why(timed); b.disabled = !!w; if (w) b.title = w; else b.title = b === cp ? '자막 텍스트 복사' : ''; }
  }
  sel.addEventListener('change', sync);
  function act(k) {
    const t = cur(); if (!t || !canDownload(t)) return;
    try {
      if (k === 'copy') { (navigator.clipboard ? navigator.clipboard.writeText(toTXT(t)) : Promise.reject()).then(() => say('복사했습니다.'), () => say('복사하지 못했습니다.', 1)); return; }
      const base = t.video_id + '.' + safe(t.language);
      const map = { txt: [toTXT, 'txt', 'text/plain'], srt: [toSRT, 'srt', 'application/x-subrip'], vtt: [toVTT, 'vtt', 'text/vtt'], json: [toJSON, 'json', 'application/json'] }[k];
      download(base + '.' + map[1], map[0](t), map[2] + ';charset=utf-8'); say('내보냈습니다: ' + base + '.' + map[1]);
    } catch (e) { say(e.message, 1); }
  }
  subs.add(sync); sync();
  return nav;
}

function renderHost() {
  if (!hostEl) return;
  const langs = [...new Set(tracks.map(t => t.language))].sort();
  hostEl.replaceChildren();
  const h = mk('strong', '자막 도구'); hostEl.append(h, mk('div', '이 탭 메모리에만 보관됩니다(저장·전송 없음). 새로고침하면 사라집니다.', 'ss-warn'));
  const fl = mk('div'), ls = mk('select'), rs = mk('select');
  ls.setAttribute('aria-label', '언어 필터'); rs.setAttribute('aria-label', '권리 필터');
  for (const [v, l] of [['', '모든 언어'], ...langs.map(x => [x, x])]) { const o = mk('option', l); o.value = v; ls.append(o); }
  for (const [v, l] of [['', '모든 권리'], ['analyze', '분석 허용'], ['retain', '보관 허용'], ['quote', '인용 허용'], ['private', '비공개'], ['download', '다운로드 권리 확인']]) { const o = mk('option', l); o.value = v; rs.append(o); }
  ls.value = langs.includes(filt.lang) ? filt.lang : ''; rs.value = filt.right;
  ls.onchange = () => { filt.lang = ls.value; renderHost(); }; rs.onchange = () => { filt.right = rs.value; renderHost(); };
  const list = tracks.filter(t => (!filt.lang || t.language === filt.lang) && (!filt.right || t.rights[filt.right]));
  const bomLb = mk('label'), bomC = mk('input'); bomC.type = 'checkbox'; bomLb.append(bomC, ' UTF-8 BOM');
  const ok = list.filter(t => canDownload(t) && canTimed(t));
  const zip = btn('SRT ZIP', () => {
    const r = zipSRT(list, { bom: bomC.checked }); if (!r.count) return;
    download('subtitles-srt.zip', r.bytes, 'application/zip');
  });
  zip.disabled = !ok.length; zip.title = ok.length ? ok.length + '개 트랙 ZIP' : '다운로드 권리 확인 + 타임코드가 있는 트랙이 없습니다';
  const clr = btn('메모리 삭제', () => clearMemory());
  fl.append(ls, ' ', rs, ' ', bomLb, ' ', zip, ' ', clr); hostEl.append(fl);
  if (!list.length) { hostEl.append(mk('div', tracks.length ? '조건에 맞는 트랙이 없습니다.' : '가져온 자막이 없습니다.')); return; }
  const tb = mk('table'), hd = mk('tr'); for (const c of ['영상', '언어', '구분', '형식', '줄', '권리', '다운로드']) hd.append(mk('th', c)); tb.append(hd);
  for (const t of list) {
    const tr = mk('tr'), rt = RIGHTS.filter(([k]) => t.rights[k]).map(([, l]) => l).join(' · ') || '없음';
    for (const v of [t.video_id, t.language, t.translation ? '번역' : '원본', t.format.toUpperCase() + (t.hasTimes ? '' : ' (시간 없음)'), String(t.cues.length), rt, canDownload(t) ? (canTimed(t) ? '가능' : 'TXT만') : '권리 확인 필요']) tr.append(mk('td', v));
    tb.append(tr);
  }
  hostEl.append(tb);
}
function init(cfg) {
  hostCfg = cfg || {}; if (!doc() || !hostCfg.host) return;
  style(); hostEl = mk('section', null, 'ss-host'); hostEl.setAttribute('aria-label', '자막 도구'); hostCfg.host.append(hostEl);
  subs.add(renderHost); renderHost();
}

/* ---------- self tests ---------- */
function selfTest() {
  const out = [], T = (n, f) => { try { const r = f(); out.push({ name: n, ok: r === true, info: r === true ? '' : String(r) }); } catch (e) { out.push({ name: n, ok: false, info: e.message }); } };
  const mkT = (cues, dl) => ({ id: 'x', video_id: 'abcdefghijk', source_url: 'https://e.x/a', language: 'ko', translation: false, imported_at: 'T', cues, rights: { download: dl !== false } });
  T('SRT 쉼표 ms', () => { const r = parse('1\n00:00:01,500 --> 00:00:03,250\n안녕\n여러분\n\n2\n00:01:00,000 --> 01:00:00,001\n둘', 'a.srt'); return r.ok && r.cues.length === 2 && r.cues[0].start === 1.5 && r.cues[0].end === 3.25 && r.cues[0].text === '안녕\n여러분' && r.cues[1].end === 3600.001 && r.hasTimes || JSON.stringify(r); });
  T('SRT BOM+CRLF', () => { const r = parse('\uFEFF1\r\n00:00:00,000 --> 00:00:01,000\r\nA\r\n', 'a.srt'); return r.ok && r.cues[0].text === 'A' || JSON.stringify(r); });
  T('VTT 점 ms+헤더', () => { const r = parse('WEBVTT\nKind: captions\n\nNOTE x\n\nintro\n00:01.250 --> 00:02.500 align:start\n<c>Hi</c>\n\n00:00:03.000 --> 00:00:04.000\nYo', 'a.vtt'); return r.ok && r.format === 'vtt' && r.cues.length === 2 && r.cues[0].start === 1.25 && r.cues[0].text === 'Hi' || JSON.stringify(r); });
  T('VTT 헤더 없으면 거부', () => !parse('00:01.000 --> 00:02.000\nx', 'a.vtt').ok);
  T('TXT 줄', () => { const r = parse('가\n\n나 \n', 'a.txt'); return r.ok && r.format === 'txt' && !r.hasTimes && r.cues.length === 2 && r.cues[0].start === null || JSON.stringify(r); });
  T('잘못된 타임스탬프 거부', () => !parse('1\n00:00:61,000 --> 00:00:62,000\nx', 'a.srt').ok && !parse('1\nabc --> def\nx', 'a.srt').ok && !parse('1\n00:00:05,000 --> 00:00:01,000\nx', 'a.srt').ok);
  T('JSON 시간 포함 왕복', () => { const t = mkT([{ start: 1, end: 2, text: 'a' }]); const r = parse(toJSON(t), 'a.json'); const j = JSON.parse(toJSON(t)); return r.ok && r.hasTimes && j.video_id === 'abcdefghijk' && j.source_url && j.language === 'ko' && j.rights && j.cues.length === 1 && j.imported_at === 'T' || JSON.stringify(r); });
  T('SRT/VTT 출력', () => { const t = mkT([{ start: 1.5, end: 2, text: 'a' }]); return toSRT(t).startsWith('1\n00:00:01,500 --> 00:00:02,000\na') && toVTT(t).startsWith('WEBVTT\n\n00:00:01.500 --> 00:00:02.000') && toSRT(t, { bom: true }).charCodeAt(0) === 0xFEFF; });
  T('TXT->SRT/VTT/JSON 차단', () => { const t = mkT([{ start: null, end: null, text: 'a' }]); let n = 0; for (const f of [toSRT, toVTT, toJSON]) { try { f(t); } catch (e) { n++; } } return n === 3 && toTXT(t) === 'a\n' && !canTimed(t); });
  T('ZIP 중앙 디렉터리', () => {
    const a = mkT([{ start: 0, end: 1, text: '한글' }]), b = { ...mkT([{ start: 0, end: 1, text: 'b' }]), id: 'y', language: 'en' }, c = { ...a, id: 'z', rights: { download: false } }, d = mkT([{ start: null, end: null, text: 't' }]);
    const r = zipSRT([a, b, c, d]); if (r.count !== 2 || r.skipped.length !== 2) return 'count ' + r.count; const u = r.bytes, v = new DataView(u.buffer, u.byteOffset, u.byteLength);
    const eo = u.length - 22; if (v.getUint32(eo, true) !== 0x06054b50 || v.getUint16(eo + 10, true) !== 2) return 'eocd';
    let p = v.getUint32(eo + 16, true); const names = [];
    for (let i = 0; i < 2; i++) {
      if (v.getUint32(p, true) !== 0x02014b50) return 'cen sig'; const crc = v.getUint32(p + 16, true), sz = v.getUint32(p + 24, true), nl = v.getUint16(p + 28, true), lo = v.getUint32(p + 42, true);
      names.push(new TextDecoder().decode(u.subarray(p + 46, p + 46 + nl)));
      if (v.getUint32(lo, true) !== 0x04034b50 || v.getUint16(lo + 8, true) !== 0) return 'local/method'; const ds = lo + 30 + v.getUint16(lo + 26, true) + v.getUint16(lo + 28, true);
      if (crc32(u.subarray(ds, ds + sz)) !== crc) return 'crc'; p += 46 + nl;
    }
    return names.join() === 'abcdefghijk.ko.srt,abcdefghijk.en.srt' || names.join();
  });
  T('CRC32 알려진 값', () => crc32(enc('123456789')) === 0xCBF43926);
  T('가져오기 검증', () => { const p = parse('a', 'a.txt'), m = { source_url: 'https://e.x', language: 'ko', translation: false, rights: { retain: true } }; return !addTrack('abcdefghijk', p, { ...m, source_url: '' }).ok && !addTrack('abcdefghijk', p, { ...m, rights: {} }).ok && !addTrack('abcdefghijk', p, { ...m, translation: undefined }).ok && addTrack('abcdefghijk', p, m).ok && (clearMemory(), tracks.length === 0); });
  return out;
}

g.ShortsSubs = { init, decorate, parse, toSRT, toVTT, toTXT, toJSON, zipSRT, addTrack, clearMemory, tracks: () => tracks.slice(), selfTest };
})(typeof window !== 'undefined' ? window : (typeof globalThis !== 'undefined' ? globalThis : {}));
