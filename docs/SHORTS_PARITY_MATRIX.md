# SHORTS PARITY MATRIX (V7)

기준: 롱폼 읽기 전용 소스 인벤토리 385개(정적 코드 대조, 실제 브라우저 전수 검증 아님). 생성: 2026-11-28 KST.
**정적 대조에서 EXISTS라도 실제 브라우저 검증 전이면 PARTIAL로 기록한다. PASS는 아래 T-ID 테스트가 있는 항목만.**

집계: PASS 41 / PARTIAL 313 / BLOCKED 29 / N/A 2 (전체 385). 이식 완료율은 PASS/(전체−N/A)로만 계산하며 파일 수나 글 길이로 계산하지 않는다.


| 요구 ID | 롱폼 원본 | 원래 기능명 | 종류 | 정적 대조 | 쇼츠 구현 위치 | 최종 상태 | 테스트/사유 |
|---|---|---|---|---|---|---|---|
| LF-001 | index.html:151 | 좌측 '빠른 보기' nav (#mainNav) | menu | PARTIAL | shorts-workspace.js:125 (nav links built by link()) | PARTIAL | Shorts has different left menu: 쇼츠 탐색/전체 바둑판/재현가능성 V2; not the LF chips |
| LF-002 | index.html:677 | 메뉴 칩: 전체 영상 (data-section) | menu | EXISTS | index.html #set option 전체 목록 | PARTIAL | 코드상 존재, 실제 브라우저 항목별 검증 전 |
| LF-003 | index.html:677 | 메뉴 칩: AI 제작 확인 (data-section) | menu | PARTIAL | index.html #ai select (AI 제작 확인) | PARTIAL | LF chip with live count badge (small>count); Shorts has no per-chip count except #market-chips |
| LF-004 | index.html:677 | 메뉴 칩: 일본어권 AI 제작 확인 (data-section) | menu | PARTIAL | index.html #ai select (AI 제작 확인) | PARTIAL | LF chip with live count badge (small>count); Shorts has no per-chip count except #market-chips |
| LF-005 | index.html:677 | 메뉴 칩: 보험·연금 (data-section) | menu | MISSING | none | PARTIAL | 미구현 · 구현 대기(PARTIAL=미완료) |
| LF-006 | index.html:677 | 메뉴 칩: 한국 POV (data-section) | menu | MISSING | none | PARTIAL | 미구현 · 구현 대기(PARTIAL=미완료) |
| LF-007 | index.html:677 | 메뉴 칩: 일본 POV (data-section) | menu | MISSING | none | PARTIAL | 미구현 · 구현 대기(PARTIAL=미완료) |
| LF-008 | index.html:678 | 벚꽃 메뉴: 벚꽃 채널 전체 | menu | PARTIAL | index.html #set / #market (한국 자부심·해외반응; JP/KR market) | PARTIAL | Pink sakura-styled chip + #profiles sample-revenue panel absent in Shorts |
| LF-009 | index.html:678 | 벚꽃 메뉴: 국뽕 · 한국 해외반응 | menu | PARTIAL | index.html #set / #market (한국 자부심·해외반응; JP/KR market) | PARTIAL | Pink sakura-styled chip + #profiles sample-revenue panel absent in Shorts |
| LF-010 | index.html:678 | 벚꽃 메뉴: 일본 찬양 · 일본 해외반응 | menu | PARTIAL | index.html #set / #market (한국 자부심·해외반응; JP/KR market) | PARTIAL | Pink sakura-styled chip + #profiles sample-revenue panel absent in Shorts |
| LF-011 | index.html:678 | 벚꽃 메뉴: 한일 비교 · 상호 반응 | menu | PARTIAL | index.html #set / #market (한국 자부심·해외반응; JP/KR market) | PARTIAL | Pink sakura-styled chip + #profiles sample-revenue panel absent in Shorts |
| LF-012 | index.html:678 | 채널별 메뉴 (channel-N, 채널당 1칩, 잡식왕 '(유사 후보)') | menu | MISSING | none | PARTIAL | 미구현 · 구현 대기(PARTIAL=미완료) |
| LF-013 | index.html:679 | 영상 분야 topNames 19개(주식·ETF·보험·연금·투자 다큐·투자 대가·역사·다큐·시니어 사연·한국 POV·일본 POV·AI 드라마·극성장·영화·드라마·한국/일본 해외반응·한일 비교·한국·일본·영어권) | menu | PARTIAL | index.html #set 연구 분류 + #market | PARTIAL | Shorts classification is by set/market, not these 19 topic chips |
| LF-014 | index.html:684 | 모든 세부 분야 (#tagNav, 동적 태그, details open) | menu | MISSING | none | PARTIAL | 미구현 · 구현 대기(PARTIAL=미완료) |
| LF-015 | index.html:684 | 기존 조사 묶음 (#batchNav, src별) | menu | PARTIAL | index.html #set (연구 분류) groups | PARTIAL | 일부 구현 |
| LF-016 | index.html:151 | 신생·저구독·소수 영상 고수익 채널 연구소 nav (#v6Nav) | menu | MISSING | none | PARTIAL | 미구현 · 구현 대기(PARTIAL=미완료) |
| LF-017 | index.html:151 | 수익 벤치마킹 연구소 nav (#labNav) | menu | MISSING | none | PARTIAL | 미구현 · 구현 대기(PARTIAL=미완료) |
| LF-018 | index.html:151 | 수익 재현 가능성 V2 링크 (좌측 메뉴) | menu | EXISTS | index.html header nav a[href=reproducibility.html]; shorts-workspace.js:141 | PARTIAL | 코드상 존재, 실제 브라우저 항목별 검증 전 |
| LF-019 | index.html:151 | 접이식 그룹 details: 모든 세부 분야 / 기존 조사 묶음 | menu | MISSING | none | PARTIAL | 미구현 · 구현 대기(PARTIAL=미완료) |
| LF-020 | index.html:151 | 좌측 메뉴 제목/설명 (롱폼 전체 메뉴) | menu | EXISTS | shorts-workspace.js 쇼츠 왼쪽 메뉴 | PARTIAL | 코드상 존재, 실제 브라우저 항목별 검증 전 |
| LF-021 | index.html:685 | ?view=<menu key> (history.replaceState) | route | MISSING | none | PARTIAL | 미구현 · 구현 대기(PARTIAL=미완료) |
| LF-022 | longform-workspace.js:214 | ?panel=reproduction&section=… | route | PARTIAL | shorts-workspace.js:138 (panel=) | PARTIAL | Shorts routes via clickView and reproducibility.html?topic= |
| LF-023 | longform-workspace.js:214 | popstate handler → showPanel board/reproduction | route | MISSING | none | PARTIAL | 미구현 · 구현 대기(PARTIAL=미완료) |
| LF-024 | longform-workspace.js:138 | showPanel('board'/'reproduction') + #lf-repro iframe | route | EXISTS | shorts-workspace.js clickView("frame"/"gallery"/"library") | PARTIAL | 코드상 존재, 실제 브라우저 항목별 검증 전 |
| LF-025 | index.html:151 | 재현가능성 iframe 내부 링크 인터셉트 | route | EXISTS | shorts-workspace.js:144 | PARTIAL | 코드상 존재, 실제 브라우저 항목별 검증 전 |
| LF-026 | lf-selection-ui.js:44 | 허브 이동 ?format=longform&run_id=…#workspace | route | EXISTS | shorts-compare.js:180 (format=shorts&run_id) | PARTIAL | 코드상 존재, 실제 브라우저 항목별 검증 전 |
| LF-027 | lf-selection-ui.js:44 | localStorage 키 content-workbench:selection:v1:longform:<run_id> | route | EXISTS | shorts-compare.js:180 (…:shorts:) | PARTIAL | 코드상 존재, 실제 브라우저 항목별 검증 전 |
| LF-028 | index.html:698 | #jumpTrend 버튼 (채널 흐름 분석으로 이동) | route | MISSING | none | PARTIAL | 미구현 · 구현 대기(PARTIAL=미완료) |
| LF-029 | index.html:151 | #sort views: 누적 조회순 | sort_key | EXISTS | index.html #sort views | PARTIAL | 코드상 존재, 실제 브라우저 항목별 검증 전 |
| LF-030 | index.html:151 | #sort new: 최신 게시순 | sort_key | EXISTS | #sort recent | PARTIAL | 코드상 존재, 실제 브라우저 항목별 검증 전 |
| LF-031 | index.html:151 | #sort viewsLow: 누적 조회 낮은 순 | sort_key | MISSING | none | PARTIAL | 미구현 · 구현 대기(PARTIAL=미완료) |
| LF-032 | index.html:151 | #sort daily: 게시 후 일평균 | sort_key | MISSING | none | PARTIAL | 미구현 · 구현 대기(PARTIAL=미완료) |
| LF-033 | index.html:151 | #days: 전체 기간 | option | EXISTS | index.html #period | PARTIAL | 코드상 존재, 실제 브라우저 항목별 검증 전 |
| LF-034 | index.html:151 | #days: 최근 1년 | option | EXISTS | index.html #period | PARTIAL | 코드상 존재, 실제 브라우저 항목별 검증 전 |
| LF-035 | index.html:151 | #days: 최근 6개월 | option | EXISTS | index.html #period | PARTIAL | 코드상 존재, 실제 브라우저 항목별 검증 전 |
| LF-036 | index.html:151 | #days: 최근 3개월 | option | EXISTS | index.html #period | PARTIAL | 코드상 존재, 실제 브라우저 항목별 검증 전 |
| LF-037 | index.html:151 | #days: 최근 60일 | option | EXISTS | index.html #period | PARTIAL | 코드상 존재, 실제 브라우저 항목별 검증 전 |
| LF-038 | index.html:151 | #days: 최근 1개월 | option | PARTIAL | index.html #period | PARTIAL | Shorts has 30/31 days |
| LF-039 | index.html:151 | #days: 직접 입력 | option | EXISTS | index.html #period | PARTIAL | 코드상 존재, 실제 브라우저 항목별 검증 전 |
| LF-040 | index.html:151 | #pagesize: 100편 | option | MISSING | index.html #size has 48/96/120 only | PARTIAL | 미구현 · 구현 대기(PARTIAL=미완료) |
| LF-041 | index.html:151 | #pagesize: 250편 | option | MISSING | index.html #size has 48/96/120 only | PARTIAL | 미구현 · 구현 대기(PARTIAL=미완료) |
| LF-042 | index.html:151 | #pagesize: 500편 | option | MISSING | index.html #size has 48/96/120 only | PARTIAL | 미구현 · 구현 대기(PARTIAL=미완료) |
| LF-043 | index.html:151 | #pagesize: 1,000편 | option | MISSING | index.html #size has 48/96/120 only | PARTIAL | 미구현 · 구현 대기(PARTIAL=미완료) |
| LF-044 | index.html:151 | #pagesize: 전부 | option | MISSING | index.html #size has 48/96/120 only | PARTIAL | 미구현 · 구현 대기(PARTIAL=미완료) |
| LF-045 | index.html:151 | #cols 열 수 3/4/5/6 | select | PARTIAL | shorts-controls.js:179 카드 크기(확대/축소)/density | PARTIAL | 일부 구현 |
| LF-046 | index.html:151 | #rpm 추정 단가 낮음1,000/기준2,000/높음4,000 | select | PARTIAL | index.html #country KR/JP/US + AIR RPM | PARTIAL | Shorts uses country-based AIR RPM rather than 3 flat tiers |
| LF-047 | index.html:151 | #q 검색 (제목·채널·분야) | filter | EXISTS | index.html #q | PARTIAL | 코드상 존재, 실제 브라우저 항목별 검증 전 |
| LF-048 | index.html:151 | #vdays 게시 기간 직접 입력(일) | filter | EXISTS | index.html #video-days | PARTIAL | 코드상 존재, 실제 브라우저 항목별 검증 전 |
| LF-049 | index.html:151 | #vmin 조회수 최소 | filter | MISSING | none | PARTIAL | 미구현 · 구현 대기(PARTIAL=미완료) |
| LF-050 | index.html:151 | #vmax 조회수 최대 | filter | MISSING | none | PARTIAL | 미구현 · 구현 대기(PARTIAL=미완료) |
| LF-051 | index.html:151 | #mmin 추정액 최소 | filter | EXISTS | index.html #lo/#hi (만 단위) | PARTIAL | 코드상 존재, 실제 브라우저 항목별 검증 전 |
| LF-052 | index.html:151 | #mmax 추정액 최대 | filter | EXISTS | index.html #lo/#hi (만 단위) | PARTIAL | 코드상 존재, 실제 브라우저 항목별 검증 전 |
| LF-053 | index.html:151 | #vfrom/#vto 게시일 시작·끝 date | filter | MISSING | none | PARTIAL | 미구현 · 구현 대기(PARTIAL=미완료) |
| LF-054 | index.html:151 | #reset 초기화 | button | EXISTS | index.html #reset | PARTIAL | 코드상 존재, 실제 브라우저 항목별 검증 전 |
| LF-055 | index.html:151 | #quick 빠른 수익 기준(전체 금액/5백만/천만/2천만/3천만 이상) | button | EXISTS | index.html #ranges data-lo/data-hi buttons | PARTIAL | 코드상 존재, 실제 브라우저 항목별 검증 전 |
| LF-056 | index.html:151 | #lf-sort-help / #lf-trend-help 도움말 앵커 | select | EXISTS | shorts-controls.js help layer | PARTIAL | 코드상 존재, 실제 브라우저 항목별 검증 전 |
| LF-057 | index.html:151 | 상/하단 페이저 (data-page 번호 버튼) | button | PARTIAL | index.html pager 이전/다음 + #page-index | PARTIAL | Shorts has prev/next + page input, no numbered buttons |
| LF-058 | index.html:151 | #status / #count 요약 문구 | button | EXISTS | index.html #status | PARTIAL | 코드상 존재, 실제 브라우저 항목별 검증 전 |
| LF-059 | index.html:52 | #trends-root 채널 분석 패널 (details tr-shell) | panel | EXISTS | index.html #trend-controls | PARTIAL | 코드상 존재, 실제 브라우저 항목별 검증 전 |
| LF-060 | index.html:484 | 채널분석: 채널 검색 | filter | MISSING | none | PARTIAL | 미구현 · 구현 대기(PARTIAL=미완료) |
| LF-061 | index.html:485 | 채널분석: 기간(일) + 프리셋 30/90/180/365 | filter | EXISTS | #trend-days + data-days buttons | PARTIAL | 코드상 존재, 실제 브라우저 항목별 검증 전 |
| LF-062 | index.html:486 | 채널분석: 목표 조회수 | filter | EXISTS | #trend-cut | PARTIAL | 코드상 존재, 실제 브라우저 항목별 검증 전 |
| LF-063 | index.html:487 | 채널분석: 최소 목표 달성률(%) | filter | EXISTS | #hit-lo/#hit-hi | PARTIAL | 코드상 존재, 실제 브라우저 항목별 검증 전 |
| LF-064 | index.html:488 | 채널분석: 최소 유효 표본 | filter | EXISTS | #trend-min | PARTIAL | 코드상 존재, 실제 브라우저 항목별 검증 전 |
| LF-065 | index.html:489 | 채널분석: 게시 후 최소 경과(일) | filter | PARTIAL | Shorts auto-excludes latest 2 KST dates (fixed) | PARTIAL | 일부 구현 |
| LF-066 | index.html:491 | 채널분석: 최근 중앙값 min/max | filter | EXISTS | #med-lo/#med-hi | PARTIAL | 코드상 존재, 실제 브라우저 항목별 검증 전 |
| LF-067 | index.html:491 | 채널분석: 최근 평균 min/max | filter | MISSING | none | PARTIAL | 미구현 · 구현 대기(PARTIAL=미완료) |
| LF-068 | index.html:491 | 채널분석: 채널 전체 영상 수 min/max | filter | EXISTS | #count-lo/#count-hi | PARTIAL | 코드상 존재, 실제 브라우저 항목별 검증 전 |
| LF-069 | index.html:490 | 채널분석: 채널 개설일 시작/종료 | filter | EXISTS | #joined-lo/#joined-hi | PARTIAL | 코드상 존재, 실제 브라우저 항목별 검증 전 |
| LF-070 | index.html:492 | 채널분석: 개설일 정확도 select(all/exact) | filter | MISSING | none | PARTIAL | 미구현 · 구현 대기(PARTIAL=미완료) |
| LF-071 | index.html:493 | 채널분석: 채널 유형 select (9종 allTypes) | filter | PARTIAL | #trend-status 6종 (꾸준/급락/한방/저조/혼합/근거부족) | PARTIAL | 일부 구현 |
| LF-072 | index.html:494 | 채널분석: 채널 정렬 select (13 sortDefs) | filter | MISSING | Shorts channel sort is the main #sort | PARTIAL | 미구현 · 구현 대기(PARTIAL=미완료) |
| LF-073 | index.html:495 | 채널분석: 최근 표본 부족도 보기 checkbox | filter | MISSING | none | PARTIAL | 미구현 · 구현 대기(PARTIAL=미완료) |
| LF-074 | index.html:495 | 채널분석: 아래 썸네일에도 채널 조건 적용 checkbox | filter | MISSING | none | PARTIAL | 미구현 · 구현 대기(PARTIAL=미완료) |
| LF-075 | index.html:78 | 채널분석: 조건 초기화 | filter | EXISTS | #reset | PARTIAL | 코드상 존재, 실제 브라우저 항목별 검증 전 |
| LF-076 | index.html:498 | 채널분석: 채널 더 보기 (pageSize 18) | filter | MISSING | none | PARTIAL | 미구현 · 구현 대기(PARTIAL=미완료) |
| LF-077 | index.html:84 | 채널분석: 5가지 읽는 법 details | filter | EXISTS | #trend-method details | PARTIAL | 코드상 존재, 실제 브라우저 항목별 검증 전 |
| LF-078 | index.html:387 | 채널 정렬 median: 최근 중앙값 높은 순 | sort_key | EXISTS | index.html #sort stable | PASS | T-SORT · Chrome: 분야 변경 후 정렬·방향 유지 |
| LF-079 | index.html:388 | 채널 정렬 hit: 최근 목표 달성률 높은 순 | sort_key | EXISTS | index.html #sort hit | PASS | T-SORT · Chrome: 분야 변경 후 정렬·방향 유지 |
| LF-080 | index.html:389 | 채널 정렬 p25: 최근 하위 25% 경계 높은 순 | sort_key | EXISTS | index.html #sort floor | PASS | T-SORT · Chrome: 분야 변경 후 정렬·방향 유지 |
| LF-081 | index.html:390 | 채널 정렬 gain: 직전 대비 상승 큰 순 | sort_key | MISSING | none | PARTIAL | 미구현 · 구현 대기(PARTIAL=미완료) |
| LF-082 | index.html:391 | 채널 정렬 loss: 직전 대비 하락 큰 순 | sort_key | EXISTS | index.html #sort down | PASS | T-SORT · Chrome: 분야 변경 후 정렬·방향 유지 |
| LF-083 | index.html:392 | 채널 정렬 peak: 최근 최고 조회수 높은 순 | sort_key | MISSING | none | PARTIAL | 미구현 · 구현 대기(PARTIAL=미완료) |
| LF-084 | index.html:393 | 채널 정렬 historic: 확인한 과거 최고 조회수 높은 순 | sort_key | MISSING | none | PARTIAL | 미구현 · 구현 대기(PARTIAL=미완료) |
| LF-085 | index.html:394 | 채널 정렬 spread: 최근 최고 ÷ 중앙값 큰 순 | sort_key | MISSING | none | PARTIAL | 미구현 · 구현 대기(PARTIAL=미완료) |
| LF-086 | index.html:395 | 채널 정렬 mean: 최근 평균 높은 순 | sort_key | EXISTS | index.html #sort avg | PASS | T-SORT · Chrome: 분야 변경 후 정렬·방향 유지 |
| LF-087 | index.html:396 | 채널 정렬 sample: 최근 유효 표본 많은 순 | sort_key | MISSING | none | PARTIAL | 미구현 · 구현 대기(PARTIAL=미완료) |
| LF-088 | index.html:397 | 채널 정렬 total: 채널 전체 영상 많은 순 | sort_key | MISSING | none | PARTIAL | 미구현 · 구현 대기(PARTIAL=미완료) |
| LF-089 | index.html:398 | 채널 정렬 opened: 최근 개설 순 | sort_key | MISSING | none | PARTIAL | 미구현 · 구현 대기(PARTIAL=미완료) |
| LF-090 | index.html:399 | 채널 정렬 name: 채널명 순 | sort_key | MISSING | none | PARTIAL | 미구현 · 구현 대기(PARTIAL=미완료) |
| LF-091 | index.html:372 | 채널 유형 consistent: 목표 도달 꾸준 | option | EXISTS | index.html #trend-status 꾸준형 | PARTIAL | 코드상 존재, 실제 브라우저 항목별 검증 전 |
| LF-092 | index.html:372 | 채널 유형 stable: 중앙값 유지 | option | MISSING | none | PARTIAL | 미구현 · 구현 대기(PARTIAL=미완료) |
| LF-093 | index.html:372 | 채널 유형 decline: 직전 고점 후 하락 | option | EXISTS | index.html #trend-status 급락형 | PARTIAL | 코드상 존재, 실제 브라우저 항목별 검증 전 |
| LF-094 | index.html:372 | 채널 유형 rising: 상승 | option | MISSING | none | PARTIAL | 미구현 · 구현 대기(PARTIAL=미완료) |
| LF-095 | index.html:372 | 채널 유형 onehit: 한 편만 급등 | option | EXISTS | index.html #trend-status 한 방 의존 | PARTIAL | 코드상 존재, 실제 브라우저 항목별 검증 전 |
| LF-096 | index.html:372 | 채널 유형 historicWeak: 과거 고점·최근 목표 미달 | option | MISSING | none | PARTIAL | 미구현 · 구현 대기(PARTIAL=미완료) |
| LF-097 | index.html:372 | 채널 유형 mixed: 변동 | option | EXISTS | index.html #trend-status 혼합형 | PARTIAL | 코드상 존재, 실제 브라우저 항목별 검증 전 |
| LF-098 | index.html:372 | 채널 유형 insufficient: 비교 자료 부족 | option | EXISTS | index.html #trend-status 근거 부족 | PASS | T-COMPARE · Chrome: 영상 2편 나란히 비교 |
| LF-099 | index.html:104 | 채널 카드: 최근/직전 중앙값 막대·목표달성률 막대·직전대비·P25·평균·최고(÷중앙값)·직전최고·직전달성률·직전P25·수집범위·미확인 편수 | card_field | PARTIAL | index.html #trend-badges + shorts-workspace.js metric rows | PARTIAL | Shorts shows badges and workspace metrics; no per-channel chart cards seen |
| LF-100 | index.html:566 | 채널 카드 제목 버튼 → 썸네일 보기 (onChannel) | button | EXISTS | index.html #trend-badges click-to-search | PASS | T-THUMB · Chrome: 썸네일 숨김·표시 유지 |
| LF-101 | index.html:687 | 카드: 썸네일(mqdefault→hqdefault→0.jpg 폴백) + 길이 배지 | card_field | PARTIAL | index.html card img (fallback chain not verified) | PARTIAL | 일부 구현 |
| LF-102 | index.html:2 | 카드: 벚꽃 배지 아이콘 | card_field | MISSING | none | PARTIAL | 미구현 · 구현 대기(PARTIAL=미완료) |
| LF-103 | index.html:690 | 카드: ▶ 여기서 재생 inline player | card_field | EXISTS | index.html #preview dialog + shorts-compare 내장 플레이어 | PARTIAL | 코드상 존재, 실제 브라우저 항목별 검증 전 |
| LF-104 | index.html:2 | 카드: 제목 링크 | card_field | EXISTS | index.html card | PARTIAL | 코드상 존재, 실제 브라우저 항목별 검증 전 |
| LF-105 | index.html:690 | 카드: 채널·게시일 | card_field | EXISTS | index.html card | PARTIAL | 코드상 존재, 실제 브라우저 항목별 검증 전 |
| LF-106 | index.html:690 | 카드: 누적 조회수 + AI 공개 확인 | card_field | EXISTS | index.html card | PARTIAL | 코드상 존재, 실제 브라우저 항목별 검증 전 |
| LF-107 | index.html:690 | 카드: 3단가 금액(낮음/기준/높음, 만·억) | card_field | PARTIAL | Shorts shows single country-based estimate | PARTIAL | 일부 구현 |
| LF-108 | index.html:142 | 카드: 채널 추세 한 줄(배지·중앙·달성) | card_field | EXISTS | index.html trend badges | PARTIAL | 코드상 존재, 실제 브라우저 항목별 검증 전 |
| LF-109 | index.html:2 | 카드: 상세 추정 근거 dialog (#dialog) | card_field | EXISTS | index.html #preview detail/evidence | PARTIAL | 코드상 존재, 실제 브라우저 항목별 검증 전 |
| LF-110 | index.html:690 | 카드: YouTube 원본 링크 | card_field | EXISTS | index.html #external | PARTIAL | 코드상 존재, 실제 브라우저 항목별 검증 전 |
| LF-111 | index.html:690 | 카드: 영상 비교 버튼 | card_field | EXISTS | shorts-compare.js 영상 비교 | PASS | T-COMPARE · Chrome: 영상 2편 나란히 비교 |
| LF-112 | lf-v6.js:84 | V6 카드 dl: 구독자 | card_field | MISSING | none | PARTIAL | 미구현 · 구현 대기(PARTIAL=미완료) |
| LF-113 | lf-v6.js:85 | V6 카드 dl: 채널 개설 | card_field | PARTIAL | shorts-compare.js 채널 개설일 | PARTIAL | 일부 구현 |
| LF-114 | lf-v6.js:86 | V6 카드 dl: 표본 최초 게시 | card_field | MISSING | none | PARTIAL | 미구현 · 구현 대기(PARTIAL=미완료) |
| LF-115 | lf-v6.js:87 | V6 카드 dl: 공개 영상 | card_field | PARTIAL | #count-lo/hi only | PARTIAL | 일부 구현 |
| LF-116 | lf-v6.js:88 | V6 카드 dl: 채널 누적 조회 | card_field | MISSING | none | PARTIAL | 미구현 · 구현 대기(PARTIAL=미완료) |
| LF-117 | lf-v6.js:89 | V6 카드 dl: 영상 게시 | card_field | EXISTS | card | PARTIAL | 코드상 존재, 실제 브라우저 항목별 검증 전 |
| LF-118 | lf-v6.js:90 | V6 카드 dl: 구독자 대비 X | card_field | MISSING | none | PARTIAL | 미구현 · 구현 대기(PARTIAL=미완료) |
| LF-119 | lf-v6.js:91 | V6 카드 dl: 일평균 조회 | card_field | MISSING | none | PARTIAL | 미구현 · 구현 대기(PARTIAL=미완료) |
| LF-120 | lf-v6.js:92 | V6 카드 dl: 표본 평균 추정 | card_field | MISSING | none | PARTIAL | 미구현 · 구현 대기(PARTIAL=미완료) |
| LF-121 | lf-v6.js:93 | V6 카드 dl: 제작 방식 | card_field | EXISTS | #ai select | PARTIAL | 코드상 존재, 실제 브라우저 항목별 검증 전 |
| LF-122 | lf-v6.js:94 | V6 카드 dl: 확인일 | card_field | PARTIAL | 관측일 shorts-compare | PARTIAL | 일부 구현 |
| LF-123 | lf-v6.js:95 | V6 카드 dl: 채널 링크 | card_field | EXISTS | 채널 원본 | PARTIAL | 코드상 존재, 실제 브라우저 항목별 검증 전 |
| LF-124 | lf-v6.js:96 | 오래된 채널·최근 표본만 경고 | card_field | MISSING | none | PARTIAL | 미구현 · 구현 대기(PARTIAL=미완료) |
| LF-125 | lf-v6.js:130 | #lf-v6 패널 (details) | panel | MISSING | none | PARTIAL | 미구현 · 구현 대기(PARTIAL=미완료) |
| LF-126 | lf-v6.js:115 | V6 필터 subsMax: 구독자 수 이하 (+직접 입력) | filter | MISSING | none | PARTIAL | 미구현 · 구현 대기(PARTIAL=미완료) |
| LF-127 | lf-v6.js:115 | V6 필터 chAgeMax: 채널 개설 경과 이내 (+직접 입력) | filter | MISSING | none | PARTIAL | 미구현 · 구현 대기(PARTIAL=미완료) |
| LF-128 | lf-v6.js:116 | V6 필터 chVideosMax: 채널 공개 영상 수 이하 (+직접 입력) | filter | MISSING | none | PARTIAL | 미구현 · 구현 대기(PARTIAL=미완료) |
| LF-129 | lf-v6.js:116 | V6 필터 postAgeMax: 영상 게시 경과 이내 (+직접 입력) | filter | MISSING | none | PARTIAL | 미구현 · 구현 대기(PARTIAL=미완료) |
| LF-130 | lf-v6.js:116 | V6 필터 xMin: 구독자 대비 조회수 이상 (+직접 입력) | filter | MISSING | none | PARTIAL | 미구현 · 구현 대기(PARTIAL=미완료) |
| LF-131 | lf-v6.js:121 | V6 최소 조회수 / 최소 추정 수익(KRW) | filter | PARTIAL | #lo/#hi 추정액 only | PARTIAL | 일부 구현 |
| LF-132 | lf-v6.js:121 | V6 비출연·나레이션·AI 채널만 checkbox | filter | PARTIAL | #ai select | PARTIAL | 일부 구현 |
| LF-133 | lf-v6.js:12 | V6 정렬 estDesc: 추정 수익 높은 순 | sort_key | EXISTS | index.html #sort earn/views/recent | PASS | T-SORT · Chrome: 분야 변경 후 정렬·방향 유지 |
| LF-134 | lf-v6.js:12 | V6 정렬 viewsDesc: 조회수 높은 순 | sort_key | EXISTS | index.html #sort earn/views/recent | PASS | T-SORT · Chrome: 분야 변경 후 정렬·방향 유지 |
| LF-135 | lf-v6.js:12 | V6 정렬 subsAsc: 구독자 수 적은 순 | sort_key | MISSING | none | PARTIAL | 미구현 · 구현 대기(PARTIAL=미완료) |
| LF-136 | lf-v6.js:12 | V6 정렬 xDesc: 구독자 대비 조회수 높은 순 | sort_key | MISSING | none | PARTIAL | 미구현 · 구현 대기(PARTIAL=미완료) |
| LF-137 | lf-v6.js:12 | V6 정렬 chNewest: 채널 개설일 최신순 | sort_key | MISSING | none | PARTIAL | 미구현 · 구현 대기(PARTIAL=미완료) |
| LF-138 | lf-v6.js:12 | V6 정렬 chVideosAsc: 채널 공개 영상 수 적은 순 | sort_key | MISSING | none | PARTIAL | 미구현 · 구현 대기(PARTIAL=미완료) |
| LF-139 | lf-v6.js:12 | V6 정렬 postNewest: 영상 게시일 최신순 | sort_key | EXISTS | index.html #sort earn/views/recent | PASS | T-SORT · Chrome: 분야 변경 후 정렬·방향 유지 |
| LF-140 | lf-v6.js:12 | V6 정렬 perDayDesc: 게시 후 일평균 높은 순 | sort_key | MISSING | none | PARTIAL | 미구현 · 구현 대기(PARTIAL=미완료) |
| LF-141 | lf-v6.js:12 | V6 정렬 chEstDesc: 채널당 추정 수익 높은 순 | sort_key | MISSING | none | PARTIAL | 미구현 · 구현 대기(PARTIAL=미완료) |
| LF-142 | lf-v6.js:12 | V6 정렬 videoEstAvgDesc: 영상당 평균 추정 수익 높은 순 | sort_key | MISSING | none | PARTIAL | 미구현 · 구현 대기(PARTIAL=미완료) |
| LF-143 | lf-v6.js:106 | V6 프리셋 new7 | button | MISSING | none | PARTIAL | 미구현 · 구현 대기(PARTIAL=미완료) |
| LF-144 | lf-v6.js:106 | V6 프리셋 new30 | button | MISSING | none | PARTIAL | 미구현 · 구현 대기(PARTIAL=미완료) |
| LF-145 | lf-v6.js:106 | V6 프리셋 new90 | button | MISSING | none | PARTIAL | 미구현 · 구현 대기(PARTIAL=미완료) |
| LF-146 | lf-v6.js:106 | V6 프리셋 few10 | button | MISSING | none | PARTIAL | 미구현 · 구현 대기(PARTIAL=미완료) |
| LF-147 | lf-v6.js:106 | V6 프리셋 subs1k | button | MISSING | none | PARTIAL | 미구현 · 구현 대기(PARTIAL=미완료) |
| LF-148 | lf-v6.js:106 | V6 프리셋 subs10k | button | MISSING | none | PARTIAL | 미구현 · 구현 대기(PARTIAL=미완료) |
| LF-149 | lf-v6.js:106 | V6 프리셋 xTop | button | MISSING | none | PARTIAL | 미구현 · 구현 대기(PARTIAL=미완료) |
| LF-150 | lf-v6.js:106 | V6 프리셋 estTop | button | MISSING | none | PARTIAL | 미구현 · 구현 대기(PARTIAL=미완료) |
| LF-151 | lf-v6.js:106 | V6 프리셋 nonhost | button | MISSING | none | PARTIAL | 미구현 · 구현 대기(PARTIAL=미완료) |
| LF-152 | lf-v6.js:121 | V6 버튼: 목록 보기 toggle | button | MISSING | none | PARTIAL | 미구현 · 구현 대기(PARTIAL=미완료) |
| LF-153 | lf-v6.js:121 | V6 버튼: 채널 카드로 보기 toggle | button | MISSING | none | PARTIAL | 미구현 · 구현 대기(PARTIAL=미완료) |
| LF-154 | lf-v6.js:121 | V6 버튼: 필터 초기화 | button | MISSING | none | PARTIAL | 미구현 · 구현 대기(PARTIAL=미완료) |
| LF-155 | longform-workspace.js:22 | 추천 조합 프리셋: 1 · 종합 사업 추천순 | button | EXISTS | shorts-workspace.js (🔥 종합 사업 추천순/💎 지속/🎀 AI/신규/과거 상승·하락) | PASS | T-PRESET · Chrome: 첫 화면 5개 조합 표시·클릭 후 정렬 유지 |
| LF-156 | longform-workspace.js:23 | 추천 조합 프리셋: 2 · 지속 수익 높은 순 | button | EXISTS | shorts-workspace.js (🔥 종합 사업 추천순/💎 지속/🎀 AI/신규/과거 상승·하락) | PASS | T-PRESET · Chrome: 첫 화면 5개 조합 표시·클릭 후 정렬 유지 |
| LF-157 | longform-workspace.js:24 | 추천 조합 프리셋: 3 · AI 제작·저관여 사업순 | button | EXISTS | shorts-workspace.js (🔥 종합 사업 추천순/💎 지속/🎀 AI/신규/과거 상승·하락) | PASS | T-PRESET · Chrome: 첫 화면 5개 조합 표시·클릭 후 정렬 유지 |
| LF-158 | longform-workspace.js:25 | 추천 조합 프리셋: 4 · 신규 성공 채널 | button | EXISTS | shorts-workspace.js (🔥 종합 사업 추천순/💎 지속/🎀 AI/신규/과거 상승·하락) | PASS | T-PRESET · Chrome: 첫 화면 5개 조합 표시·클릭 후 정렬 유지 |
| LF-159 | longform-workspace.js:26 | 추천 조합 프리셋: 5 · 과거 상승·현재 하락 채널 | button | EXISTS | shorts-workspace.js (🔥 종합 사업 추천순/💎 지속/🎀 AI/신규/과거 상승·하락) | PASS | T-PRESET · Chrome: 첫 화면 5개 조합 표시·클릭 후 정렬 유지 |
| LF-160 | longform-workspace.js:99 | 워크스페이스 버튼: 현재 조건 조합 저장 | button | EXISTS | shorts-workspace.js 현재 조건 저장 | PARTIAL | 코드상 존재, 실제 브라우저 항목별 검증 전 |
| LF-161 | longform-workspace.js:99 | 워크스페이스 버튼: 저장 조합 라이브러리 | button | EXISTS | shorts-workspace.js 저장한 조건 조합 | PARTIAL | 코드상 존재, 실제 브라우저 항목별 검증 전 |
| LF-162 | longform-workspace.js:99 | 워크스페이스 버튼: 영상 즐겨찾기 | button | EXISTS | shorts-workspace.js | PARTIAL | 코드상 존재, 실제 브라우저 항목별 검증 전 |
| LF-163 | longform-workspace.js:99 | 워크스페이스 버튼: 채널 즐겨찾기 | button | EXISTS | shorts-workspace.js | PARTIAL | 코드상 존재, 실제 브라우저 항목별 검증 전 |
| LF-164 | longform-workspace.js:99 | 워크스페이스 버튼: 전체 검색 | button | MISSING | none | PARTIAL | 미구현 · 구현 대기(PARTIAL=미완료) |
| LF-165 | longform-workspace.js:99 | 워크스페이스 버튼: 기본 조합으로 | button | PARTIAL | 첫 화면 기본값으로 | PARTIAL | 일부 구현 |
| LF-166 | longform-workspace.js:99 | 워크스페이스 버튼: 조건 링크 복사 | button | PARTIAL | index.html:12/18 share/링크 복사 match not verified | PARTIAL | 일부 구현 |
| LF-167 | longform-workspace.js:99 | 워크스페이스 버튼: 카드 축소 (Ctrl+-) | button | EXISTS | shorts-controls.js 카드 축소 | PARTIAL | 코드상 존재, 실제 브라우저 항목별 검증 전 |
| LF-168 | longform-workspace.js:99 | 워크스페이스 버튼: 카드 확대 (Ctrl++) | button | EXISTS | shorts-controls.js 카드 확대 | PARTIAL | 코드상 존재, 실제 브라우저 항목별 검증 전 |
| LF-169 | longform-workspace.js:99 | 후보 구분 select (전체/근거 충족/조사 후보) | select | PARTIAL | 비교 범위 select 전체 후보 | PARTIAL | 일부 구현 |
| LF-170 | longform-workspace.js:101 | AI 제작 select (전체/AI 확인/미확인) | select | EXISTS | index.html #ai | PARTIAL | 코드상 존재, 실제 브라우저 항목별 검증 전 |
| LF-171 | longform-workspace.js:102 | 근거 등급 select (A/B/C/U) | select | EXISTS | shorts-workspace.js 전체 등급/A/B 이상/C 이상/미확인만 | PARTIAL | 코드상 존재, 실제 브라우저 항목별 검증 전 |
| LF-172 | longform-workspace.js:103 | 금액 종류 (광고수익/실제 총수익/실제 순이익) | select | EXISTS | shorts-workspace.js 금액 종류 | PARTIAL | 코드상 존재, 실제 브라우저 항목별 검증 전 |
| LF-173 | longform-workspace.js:104 | 광고 계산 모형: legacy 1,000/2,000/4,000 | option | MISSING | none | PARTIAL | 미구현 · 구현 대기(PARTIAL=미완료) |
| LF-174 | longform-workspace.js:104 | 광고 계산 모형: actual 실제 정산액 | option | EXISTS | 광고 실측 | PARTIAL | 코드상 존재, 실제 브라우저 항목별 검증 전 |
| LF-175 | longform-workspace.js:104 | 광고 계산 모형: M1 동일 채널 실측 | option | EXISTS | repro-v2.js M1 | PARTIAL | 코드상 존재, 실제 브라우저 항목별 검증 전 |
| LF-176 | longform-workspace.js:104 | 광고 계산 모형: M2 유사 채널 실측 | option | EXISTS | repro-v2.js M2 | PARTIAL | 코드상 존재, 실제 브라우저 항목별 검증 전 |
| LF-177 | longform-workspace.js:104 | 광고 계산 모형: M3 vidIQ | option | EXISTS | shorts-workspace.js M3 vidIQ | PARTIAL | 코드상 존재, 실제 브라우저 항목별 검증 전 |
| LF-178 | longform-workspace.js:104 | 광고 계산 모형: M4 N3 | option | MISSING | none | PARTIAL | 미구현 · 구현 대기(PARTIAL=미완료) |
| LF-179 | longform-workspace.js:104 | 광고 계산 모형: M5 P1 | option | EXISTS | M5 P1 비교 | PARTIAL | 코드상 존재, 실제 브라우저 항목별 검증 전 |
| LF-180 | longform-workspace.js:105 | 국가/M3 시장 (전체/KR/JP/US/기타) | select | PARTIAL | index.html #country KR/JP/US (no 기타/전체) | PARTIAL | 일부 구현 |
| LF-181 | longform-workspace.js:105 | 상세 조건: 환율 (KRW/USD) | filter | EXISTS | shorts-workspace.js 목표액/환율/채널당 대표 1편/D7 variants | PARTIAL | 코드상 존재, 실제 브라우저 항목별 검증 전 |
| LF-182 | longform-workspace.js:105 | 상세 조건: 목표금액 (KRW) | filter | EXISTS | shorts-workspace.js 목표액/환율/채널당 대표 1편/D7 variants | PARTIAL | 코드상 존재, 실제 브라우저 항목별 검증 전 |
| LF-183 | longform-workspace.js:107 | 상세 조건: 시나리오 낮음/기준/높음 | filter | PARTIAL | shorts-workspace.js 목표액/환율/채널당 대표 1편/D7 variants | PARTIAL | D30 fields replaced by D7 equivalents in Shorts (not verified one-to-one) |
| LF-184 | longform-workspace.js:29 | 상세 조건: 반복 D30 목표 | filter | PARTIAL | shorts-workspace.js 목표액/환율/채널당 대표 1편/D7 variants | PARTIAL | D30 fields replaced by D7 equivalents in Shorts (not verified one-to-one) |
| LF-185 | longform-workspace.js:29 | 상세 조건: 반복 표본 최소 (12+) | filter | PARTIAL | shorts-workspace.js 목표액/환율/채널당 대표 1편/D7 variants | PARTIAL | D30 fields replaced by D7 equivalents in Shorts (not verified one-to-one) |
| LF-186 | longform-workspace.js:105 | 상세 조건: 목표 월수익 (KRW) | filter | PARTIAL | shorts-workspace.js 목표액/환율/채널당 대표 1편/D7 variants | PARTIAL | D30 fields replaced by D7 equivalents in Shorts (not verified one-to-one) |
| LF-187 | longform-workspace.js:105 | 상세 조건: 목표 달성률 (%) | filter | PARTIAL | shorts-workspace.js 목표액/환율/채널당 대표 1편/D7 variants | PARTIAL | D30 fields replaced by D7 equivalents in Shorts (not verified one-to-one) |
| LF-188 | longform-workspace.js:13 | 상세 조건: 하위25/중앙값 (%) | filter | PARTIAL | shorts-workspace.js 목표액/환율/채널당 대표 1편/D7 variants | PARTIAL | D30 fields replaced by D7 equivalents in Shorts (not verified one-to-one) |
| LF-189 | longform-workspace.js:29 | 상세 조건: 최고작 비중 경고 (%) | filter | PARTIAL | shorts-workspace.js 목표액/환율/채널당 대표 1편/D7 variants | PARTIAL | D30 fields replaced by D7 equivalents in Shorts (not verified one-to-one) |
| LF-190 | longform-workspace.js:25 | 상세 조건: 채널 대표 1개 checkbox | filter | EXISTS | shorts-workspace.js 목표액/환율/채널당 대표 1편/D7 variants | PARTIAL | 코드상 존재, 실제 브라우저 항목별 검증 전 |
| LF-191 | longform-workspace.js:29 | 상세 조건: 형식 시작 7~90일 checkbox | filter | PARTIAL | shorts-workspace.js 목표액/환율/채널당 대표 1편/D7 variants | PARTIAL | D30 fields replaced by D7 equivalents in Shorts (not verified one-to-one) |
| LF-192 | longform-workspace.js:29 | 상세 정렬 views: 누적 조회 | sort_key | EXISTS | shorts-workspace.js 정렬 label "공개 조회수" | PASS | T-SORT · Chrome: 분야 변경 후 정렬·방향 유지 |
| LF-193 | longform-workspace.js:29 | 상세 정렬 date: 게시일 | sort_key | EXISTS | shorts-workspace.js 정렬 label "게시일" | PASS | T-SORT · Chrome: 분야 변경 후 정렬·방향 유지 |
| LF-194 | longform-workspace.js:29 | 상세 정렬 duration: 영상 길이 | sort_key | MISSING | none | PARTIAL | 미구현 · 구현 대기(PARTIAL=미완료) |
| LF-195 | longform-workspace.js:29 | 상세 정렬 daily: 게시 후 일평균 | sort_key | MISSING | none | PARTIAL | 미구현 · 구현 대기(PARTIAL=미완료) |
| LF-196 | longform-workspace.js:29 | 상세 정렬 selected: 선택 금액 | sort_key | EXISTS | shorts-workspace.js 정렬 label "선택 금액" | PASS | T-SORT · Chrome: 분야 변경 후 정렬·방향 유지 |
| LF-197 | longform-workspace.js:29 | 상세 정렬 ad: 광고수익 | sort_key | MISSING | none | PARTIAL | 미구현 · 구현 대기(PARTIAL=미완료) |
| LF-198 | longform-workspace.js:29 | 상세 정렬 total: 실제 총수익 | sort_key | EXISTS | shorts-workspace.js 정렬 label "실제 거래액" | PASS | T-SORT · Chrome: 분야 변경 후 정렬·방향 유지 |
| LF-199 | longform-workspace.js:29 | 상세 정렬 profit: 실제 순이익 | sort_key | EXISTS | shorts-workspace.js 정렬 label "실현 이익" | PASS | T-SORT · Chrome: 분야 변경 후 정렬·방향 유지 |
| LF-200 | longform-workspace.js:29 | 상세 정렬 grade: 근거 등급 | sort_key | EXISTS | shorts-workspace.js 정렬 label "근거 등급" | PASS | T-SORT · Chrome: 분야 변경 후 정렬·방향 유지 |
| LF-201 | longform-workspace.js:29 | 상세 정렬 repeat: 반복 성과 (%) | sort_key | EXISTS | shorts-workspace.js 정렬 label "반복 성과율" | PASS | T-SORT · Chrome: 분야 변경 후 정렬·방향 유지 |
| LF-202 | longform-workspace.js:29 | 상세 정렬 minutes: 직접 작업시간 | sort_key | EXISTS | shorts-workspace.js 정렬 label "직접 작업시간" | PASS | T-SORT · Chrome: 분야 변경 후 정렬·방향 유지 |
| LF-203 | longform-workspace.js:29 | 상세 정렬 cost: 실제 비용 | sort_key | EXISTS | shorts-workspace.js 정렬 label "제작비" | PASS | T-SORT · Chrome: 분야 변경 후 정렬·방향 유지 |
| LF-204 | longform-workspace.js:29 | 상세 정렬 trades: 실제 거래 | sort_key | EXISTS | shorts-workspace.js 정렬 label "실제 거래 건수" | PASS | T-SORT · Chrome: 분야 변경 후 정렬·방향 유지 |
| LF-205 | longform-workspace.js:29 | 상세 정렬 repeatTrades: 반복 거래 | sort_key | EXISTS | shorts-workspace.js 정렬 label "반복 거래 건수" | PASS | T-SORT · Chrome: 분야 변경 후 정렬·방향 유지 |
| LF-206 | longform-workspace.js:29 | 상세 정렬 hourly: 시간당 이익 | sort_key | EXISTS | shorts-workspace.js 정렬 label "시간당 이익" | PASS | T-SORT · Chrome: 분야 변경 후 정렬·방향 유지 |
| LF-207 | longform-workspace.js:29 | 상세 정렬 start: 형식 시작 후 경과일 | sort_key | EXISTS | shorts-workspace.js 정렬 label "콘텐츠 시작 경과일" | PASS | T-SORT · Chrome: 분야 변경 후 정렬·방향 유지 |
| LF-208 | longform-workspace.js:29 | 상세 정렬 d7: 쇼츠 D7 | sort_key | EXISTS | shorts-workspace.js 정렬 label "D7 조회수" | PASS | T-SORT · Chrome: 분야 변경 후 정렬·방향 유지 |
| LF-209 | longform-workspace.js:29 | 상세 정렬 d30: 롱폼 D30 | sort_key | MISSING | none | PARTIAL | 미구현 · 구현 대기(PARTIAL=미완료) |
| LF-210 | longform-workspace.js:29 | 상세 정렬 decline: 최근/직전 중앙값 배수 | sort_key | EXISTS | shorts-workspace.js 정렬 label "감소율" | PASS | T-SORT · Chrome: 분야 변경 후 정렬·방향 유지 |
| LF-211 | longform-workspace.js:29 | 상세 정렬 concentration: 최고작 의존도 | sort_key | EXISTS | shorts-workspace.js 정렬 label "최고작 비중" | PASS | T-SORT · Chrome: 분야 변경 후 정렬·방향 유지 |
| LF-212 | longform-workspace.js:29 | 상세 정렬 independence: 독립 채널 조건 충족 비율 | sort_key | MISSING | none | PARTIAL | 미구현 · 구현 대기(PARTIAL=미완료) |
| LF-213 | longform-workspace.js:29 | 상세 정렬 breakEven: 손익분기 조회수 | sort_key | MISSING | none | PARTIAL | 미구현 · 구현 대기(PARTIAL=미완료) |
| LF-214 | longform-workspace.js:29 | 상세 정렬 median: 동일 D30 중앙값 | sort_key | EXISTS | shorts-workspace.js 정렬 label "D7 중앙값" | PASS | T-SORT · Chrome: 분야 변경 후 정렬·방향 유지 |
| LF-215 | longform-workspace.js:29 | 상세 정렬 p25: 동일 D30 하위 25% | sort_key | MISSING | none | PARTIAL | 미구현 · 구현 대기(PARTIAL=미완료) |
| LF-216 | longform-workspace.js:29 | 상세 정렬 hitRate: 동일 D30 달성률 | sort_key | EXISTS | shorts-workspace.js 정렬 label "D7 목표 달성률" | PASS | T-SORT · Chrome: 분야 변경 후 정렬·방향 유지 |
| LF-217 | longform-workspace.js:29 | 상세 정렬 monthlyMin: 완료월 최저 | sort_key | EXISTS | shorts-workspace.js 정렬 label "최근 3개월 최저 정산" | PASS | T-SORT · Chrome: 분야 변경 후 정렬·방향 유지 |
| LF-218 | longform-workspace.js:29 | 상세 정렬 monthlyAvg: 완료월 평균 | sort_key | MISSING | none | PARTIAL | 미구현 · 구현 대기(PARTIAL=미완료) |
| LF-219 | longform-workspace.js:29 | 상세 정렬 score: 사업 적합도 | sort_key | EXISTS | shorts-workspace.js 정렬 label "종합 사업 점수" | PASS | T-SORT · Chrome: 분야 변경 후 정렬·방향 유지 |
| LF-220 | longform-workspace.js:29 | 상세 정렬 expansion: 사업 확장 단계 | sort_key | MISSING | none | PARTIAL | 미구현 · 구현 대기(PARTIAL=미완료) |
| LF-221 | longform-workspace.js:29 | 상세 정렬 pilotRevenue: 내 예상 광고수익 | sort_key | MISSING | none | PARTIAL | 미구현 · 구현 대기(PARTIAL=미완료) |
| LF-222 | longform-workspace.js:29 | 상세 정렬 pilotCash: 내 현금 이익 | sort_key | MISSING | none | PARTIAL | 미구현 · 구현 대기(PARTIAL=미완료) |
| LF-223 | longform-workspace.js:29 | 상세 정렬 pilotLabor: 내 노동비 포함 이익 | sort_key | MISSING | none | PARTIAL | 미구현 · 구현 대기(PARTIAL=미완료) |
| LF-224 | longform-workspace.js:106 | 정렬 방향 내림차순/오름차순 | select | EXISTS | shorts-workspace.js 정렬 방향 | PASS | T-SORT · Chrome: 분야 변경 후 정렬·방향 유지 |
| LF-225 | longform-workspace.js:109 | 내 보관함 library (영상/채널/조합) + 이름변경·위/아래·첫 화면 지정·삭제 | panel | EXISTS | shorts-workspace.js 내 보관함 | PARTIAL | 코드상 존재, 실제 브라우저 항목별 검증 전 |
| LF-226 | longform-workspace.js:150 | 목록으로 보기 / 닫기 / 첫 화면 해제 | button | EXISTS | shorts-workspace.js 목록을 첫 화면으로 | PARTIAL | 코드상 존재, 실제 브라우저 항목별 검증 전 |
| LF-227 | longform-workspace.js:97 | 카드 순위 라벨: 전체 N · 분야 N | card_field | MISSING | none | PARTIAL | 미구현 · 구현 대기(PARTIAL=미완료) |
| LF-228 | longform-workspace.js:99 | 카드 라벨: 근거 충족/조사 후보, 근거 등급, AI 제작, 출처 링크 | card_field | EXISTS | shorts-workspace.js 근거 충족/추가 조사 | PARTIAL | 코드상 존재, 실제 브라우저 항목별 검증 전 |
| LF-229 | longform-workspace.js:163 | 카드: 근거 N/6 · 최저 월 0 · 점수 미산정 | card_field | PARTIAL | 종합 사업 점수 | PARTIAL | 일부 구현 |
| LF-230 | longform-workspace.js:163 | 카드 버튼: 영상 저장 / 채널 저장 / 검증 근거 / 계산 비교 / 채널 영상 펼치기 / 참고 선정 | button | PARTIAL | shorts-workspace.js 저장/즐겨찾기/같은 채널 영상; shorts-compare.js 성공/저성과 담기 | PARTIAL | 계산 비교(plus) and 검증 근거 editor absent |
| LF-231 | longform-workspace.js:166 | 검증 근거 dialog (등급·출처 URL·국가·시작일·D7/D30·반복·작업시간·제작비·거래·실제 광고/총/순이익·M1/M2 + v3 JSON textarea) | modal | MISSING | none | PARTIAL | 미구현 · 구현 대기(PARTIAL=미완료) |
| LF-232 | index.html:151 | 이름 입력 dialog (저장/취소) | modal | EXISTS | shorts-workspace.js:92 renameBox #dialog | PARTIAL | 코드상 존재, 실제 브라우저 항목별 검증 전 |
| LF-233 | index.html:151 | 추정 근거 상세 dialog | modal | EXISTS | index.html #preview | PARTIAL | 코드상 존재, 실제 브라우저 항목별 검증 전 |
| LF-234 | lf-layout.js:77 | 메뉴 이름 변경 dialog | modal | EXISTS | shorts-controls.js:144 showModal 메뉴 이름 변경 | PARTIAL | 코드상 존재, 실제 브라우저 항목별 검증 전 |
| LF-235 | longform-workspace.js:180 | Ctrl/Cmd + - / + 카드 크기 | keyboard | MISSING | none | PARTIAL | 미구현 · 구현 대기(PARTIAL=미완료) |
| LF-236 | lf-layout.js:247 | F2 메뉴 이름 변경 | keyboard | MISSING | none | PARTIAL | 미구현 · 구현 대기(PARTIAL=미완료) |
| LF-237 | lf-layout.js:248 | Alt+↑/↓ 메뉴 이동 | keyboard | PARTIAL | shorts-controls.js:155 ArrowUp/Down on handle (no Alt) | PARTIAL | 일부 구현 |
| LF-238 | lf-layout.js:135 | 메뉴 splitter ←/→(Shift=32) Home/End | keyboard | PARTIAL | shorts-controls.js:115 grip keydown | PARTIAL | Key set not verified |
| LF-239 | lf-layout.js:244 | Esc 모바일 메뉴 닫기 | keyboard | MISSING | none | PARTIAL | 미구현 · 구현 대기(PARTIAL=미완료) |
| LF-240 | lf-help.js:382 | Esc 도움말 닫기 | keyboard | EXISTS | shorts-controls.js:284 | PARTIAL | 코드상 존재, 실제 브라우저 항목별 검증 전 |
| LF-241 | lf-compare.js:498 | 비교 검색 Enter 추가 | keyboard | MISSING | none | PARTIAL | 미구현 · 구현 대기(PARTIAL=미완료) |
| LF-242 | lf-layout.js:51 | 화면 설정: 메뉴 접기/펼치기 toggle | menu | EXISTS | shorts-controls.js 왼쪽 메뉴 접기/펼치기 | PARTIAL | 코드상 존재, 실제 브라우저 항목별 검증 전 |
| LF-243 | lf-layout.js:51 | 메뉴 너비 슬라이더 164–480 | menu | EXISTS | shorts-controls.js 왼쪽 메뉴 너비 (픽셀) | PARTIAL | 코드상 존재, 실제 브라우저 항목별 검증 전 |
| LF-244 | lf-layout.js:51 | 썸네일 표시 checkbox | menu | EXISTS | shorts-controls.js:178 | PASS | T-THUMB · Chrome: 썸네일 숨김·표시 유지 |
| LF-245 | lf-layout.js:59 | 메뉴 편집 모드 (드래그, ↑/↓, 이름변경) | menu | EXISTS | shorts-controls.js 메뉴 이름과 순서 편집 | PARTIAL | 코드상 존재, 실제 브라우저 항목별 검증 전 |
| LF-246 | lf-layout.js:60 | 메뉴 편집 도움말 텍스트 | menu | PARTIAL | - | PARTIAL | 일부 구현 |
| LF-247 | lf-layout.js:253 | 메뉴 드래그 앤 드롭 재정렬 | menu | EXISTS | shorts-controls.js:158 dragstart | PASS | T-SORT · Chrome: 분야 변경 후 정렬·방향 유지 |
| LF-248 | lf-help.js:8 | 도움말 토픽: views | help | EXISTS | shorts-controls.js definitions (정렬 기준/공개 조회수/게시일/최근 중앙값/…) | PARTIAL | 코드상 존재, 실제 브라우저 항목별 검증 전 |
| LF-249 | lf-help.js:9 | 도움말 토픽: duration | help | MISSING | none | PARTIAL | 미구현 · 구현 대기(PARTIAL=미완료) |
| LF-250 | lf-help.js:10 | 도움말 토픽: age | help | MISSING | none | PARTIAL | 미구현 · 구현 대기(PARTIAL=미완료) |
| LF-251 | lf-help.js:11 | 도움말 토픽: vph | help | MISSING | none | PARTIAL | 미구현 · 구현 대기(PARTIAL=미완료) |
| LF-252 | lf-help.js:12 | 도움말 토픽: estimatedRevenue | help | MISSING | none | PARTIAL | 미구현 · 구현 대기(PARTIAL=미완료) |
| LF-253 | lf-help.js:13 | 도움말 토픽: rpm | help | MISSING | none | PARTIAL | 미구현 · 구현 대기(PARTIAL=미완료) |
| LF-254 | lf-help.js:14 | 도움말 토픽: cpm | help | MISSING | none | PARTIAL | 미구현 · 구현 대기(PARTIAL=미완료) |
| LF-255 | lf-help.js:15 | 도움말 토픽: grade | help | EXISTS | shorts-controls.js definitions (정렬 기준/공개 조회수/게시일/최근 중앙값/…) | PARTIAL | 코드상 존재, 실제 브라우저 항목별 검증 전 |
| LF-256 | lf-help.js:16 | 도움말 토픽: profitScore | help | MISSING | none | PARTIAL | 미구현 · 구현 대기(PARTIAL=미완료) |
| LF-257 | lf-help.js:17 | 도움말 토픽: missingData | help | MISSING | none | PARTIAL | 미구현 · 구현 대기(PARTIAL=미완료) |
| LF-258 | lf-help.js:18 | 도움말 토픽: resultCount | help | MISSING | none | PARTIAL | 미구현 · 구현 대기(PARTIAL=미완료) |
| LF-259 | lf-help.js:19 | 도움말 토픽: trend | help | MISSING | none | PARTIAL | 미구현 · 구현 대기(PARTIAL=미완료) |
| LF-260 | lf-help.js:20 | 도움말 토픽: graph | help | MISSING | none | PARTIAL | 미구현 · 구현 대기(PARTIAL=미완료) |
| LF-261 | lf-help.js:21 | 도움말 토픽: sort | help | EXISTS | shorts-controls.js definitions (정렬 기준/공개 조회수/게시일/최근 중앙값/…) | PARTIAL | 코드상 존재, 실제 브라우저 항목별 검증 전 |
| LF-262 | lf-help.js:22 | 도움말 토픽: revenueSort | help | MISSING | none | PARTIAL | 미구현 · 구현 대기(PARTIAL=미완료) |
| LF-263 | lf-help.js:23 | 도움말 토픽: filters | help | MISSING | none | PARTIAL | 미구현 · 구현 대기(PARTIAL=미완료) |
| LF-264 | lf-help.js:24 | 도움말 토픽: median | help | EXISTS | shorts-controls.js definitions (정렬 기준/공개 조회수/게시일/최근 중앙값/…) | PARTIAL | 코드상 존재, 실제 브라우저 항목별 검증 전 |
| LF-265 | lf-help.js:25 | 도움말 토픽: p25 | help | EXISTS | shorts-controls.js definitions (정렬 기준/공개 조회수/게시일/최근 중앙값/…) | PARTIAL | 코드상 존재, 실제 브라우저 항목별 검증 전 |
| LF-266 | lf-help.js:26 | 도움말 토픽: hitRate | help | EXISTS | shorts-controls.js definitions (정렬 기준/공개 조회수/게시일/최근 중앙값/…) | PARTIAL | 코드상 존재, 실제 브라우저 항목별 검증 전 |
| LF-267 | lf-help.js:27 | 도움말 토픽: ratio | help | MISSING | none | PARTIAL | 미구현 · 구현 대기(PARTIAL=미완료) |
| LF-268 | lf-help.js:28 | 도움말 토픽: coverage | help | MISSING | none | PARTIAL | 미구현 · 구현 대기(PARTIAL=미완료) |
| LF-269 | lf-help.js:29 | 도움말 토픽: d7 | help | EXISTS | shorts-controls.js definitions (정렬 기준/공개 조회수/게시일/최근 중앙값/…) | PARTIAL | 코드상 존재, 실제 브라우저 항목별 검증 전 |
| LF-270 | lf-help.js:30 | 도움말 토픽: d30 | help | MISSING | none | PARTIAL | 미구현 · 구현 대기(PARTIAL=미완료) |
| LF-271 | lf-help.js:31 | 도움말 토픽: minutes | help | EXISTS | shorts-controls.js definitions (정렬 기준/공개 조회수/게시일/최근 중앙값/…) | PARTIAL | 코드상 존재, 실제 브라우저 항목별 검증 전 |
| LF-272 | lf-help.js:32 | 도움말 토픽: profit | help | EXISTS | shorts-controls.js definitions (정렬 기준/공개 조회수/게시일/최근 중앙값/…) | PARTIAL | 코드상 존재, 실제 브라우저 항목별 검증 전 |
| LF-273 | lf-help.js:33 | 도움말 토픽: hourly | help | EXISTS | shorts-controls.js definitions (정렬 기준/공개 조회수/게시일/최근 중앙값/…) | PARTIAL | 코드상 존재, 실제 브라우저 항목별 검증 전 |
| LF-274 | lf-help.js:34 | 도움말 토픽: monthly | help | MISSING | none | PARTIAL | 미구현 · 구현 대기(PARTIAL=미완료) |
| LF-275 | lf-help.js:35 | 도움말 토픽: concentration | help | EXISTS | shorts-controls.js definitions (정렬 기준/공개 조회수/게시일/최근 중앙값/…) | PARTIAL | 코드상 존재, 실제 브라우저 항목별 검증 전 |
| LF-276 | lf-help.js:36 | 도움말 토픽: longform | help | MISSING | none | PARTIAL | 미구현 · 구현 대기(PARTIAL=미완료) |
| LF-277 | lf-help.js:59 | ? 도움말 라벨 버튼 + 패널(role=dialog) | help | EXISTS | shorts-controls.js help popover (aria-expanded) | PARTIAL | 코드상 존재, 실제 브라우저 항목별 검증 전 |
| LF-278 | lf-help.js:116 | 음성 읽기 (SpeechSynthesis ko-KR) + 속도 select + 중지 | voice | EXISTS | shorts-controls.js:227-273 short/long read, rate, stop | PARTIAL | 코드상 존재, 실제 브라우저 항목별 검증 전 |
| LF-279 | lf-help.js:204 | voiceschanged 대응/ 음성 없음 안내 | voice | MISSING | none | PARTIAL | 미구현 · 구현 대기(PARTIAL=미완료) |
| LF-280 | lf-compare.js:8 | 비교 프리셋 Purrverse | button | MISSING | none | PARTIAL | 미구현 · 구현 대기(PARTIAL=미완료) |
| LF-281 | lf-compare.js:8 | 비교 프리셋 한국 채널 4곳 | button | MISSING | none | PARTIAL | 미구현 · 구현 대기(PARTIAL=미완료) |
| LF-282 | lf-compare.js:8 | 비교 프리셋 일본 채널 3곳 | button | MISSING | none | PARTIAL | 미구현 · 구현 대기(PARTIAL=미완료) |
| LF-283 | lf-compare.js:233 | 비교 검색 대상 select (영상/채널) | select | MISSING | none | PARTIAL | 미구현 · 구현 대기(PARTIAL=미완료) |
| LF-284 | lf-compare.js:234 | 카탈로그 검색 + datalist(24건) | filter | MISSING | none | PARTIAL | 미구현 · 구현 대기(PARTIAL=미완료) |
| LF-285 | lf-compare.js:234 | 비교에 추가 / 선택 비우기 / 칩 ×제거 | button | PARTIAL | shorts-compare.js 비교에서 빼기/트레이 | PARTIAL | 일부 구현 |
| LF-286 | lf-compare.js:77 | 2~4개 영상·채널 나란히 비교 표 (최대 MAX=4) | panel | EXISTS | shorts-compare.js 나란히 비교 (최대 4) | PASS | T-COMPARE · Chrome: 영상 2편 나란히 비교 |
| LF-287 | lf-compare.js:288 | 비교 표 내 여기서 재생/재생 닫기 | button | EXISTS | shorts-compare.js 내장 플레이어 | PASS | T-COMPARE · Chrome: 영상 2편 나란히 비교 |
| LF-288 | lf-compare.js:506 | 채널 근거 JSON 로딩 | card_field | PARTIAL | shorts-compare.js 채널 수치 근거 | PARTIAL | Different data file |
| LF-289 | lf-research.js:4 | #lf-research 한·일·미 분야별 조사 후보 (details) | panel | MISSING | none | PARTIAL | 미구현 · 구현 대기(PARTIAL=미완료) |
| LF-290 | lf-research.js:16 | 연구: 시장 select (한국/일본/미국 영어권) | select | PARTIAL | index.html #market | PARTIAL | 일부 구현 |
| LF-291 | lf-research.js:5 | 연구 분야(sector): AI 주식 | sector | PARTIAL | index.html #set/search | PARTIAL | Shorts search text only |
| LF-292 | lf-research.js:5 | 연구 분야(sector): AI ETF | sector | MISSING | none | PARTIAL | 미구현 · 구현 대기(PARTIAL=미완료) |
| LF-293 | lf-research.js:5 | 연구 분야(sector): AI 투자 분석 | sector | PARTIAL | index.html #set/search | PARTIAL | Shorts search text only |
| LF-294 | lf-research.js:5 | 연구 분야(sector): AI 경제 | sector | MISSING | none | PARTIAL | 미구현 · 구현 대기(PARTIAL=미완료) |
| LF-295 | lf-research.js:5 | 연구 분야(sector): AI 코인 | sector | PARTIAL | index.html #set/search | PARTIAL | Shorts search text only |
| LF-296 | lf-research.js:5 | 연구 분야(sector): AI 창업 | sector | MISSING | none | PARTIAL | 미구현 · 구현 대기(PARTIAL=미완료) |
| LF-297 | lf-research.js:5 | 연구 분야(sector): 투자 대가 | sector | PARTIAL | index.html #set/search | PARTIAL | Shorts search text only |
| LF-298 | lf-research.js:5 | 연구 분야(sector): 전자책·리포트 | sector | MISSING | none | PARTIAL | 미구현 · 구현 대기(PARTIAL=미완료) |
| LF-299 | lf-research.js:5 | 연구 분야(sector): AI 자동화 SaaS | sector | MISSING | none | PARTIAL | 미구현 · 구현 대기(PARTIAL=미완료) |
| LF-300 | lf-research.js:5 | 연구 분야(sector): 일본 국뽕 | sector | MISSING | none | PARTIAL | 미구현 · 구현 대기(PARTIAL=미완료) |
| LF-301 | lf-research.js:16 | 연구: 게시 창 30/60/365일 | select | PARTIAL | #period | PARTIAL | 일부 구현 |
| LF-302 | lf-research.js:16 | 연구: 실제 AI 제작 (작품별 고지 확인/미확인) | select | EXISTS | #ai | PARTIAL | 코드상 존재, 실제 브라우저 항목별 검증 전 |
| LF-303 | lf-research.js:16 | 다음 24편 | button | MISSING | none | PARTIAL | 미구현 · 구현 대기(PARTIAL=미완료) |
| LF-304 | lf-research.js:16 | 사업 확장 9개 유형 표 (전자책/리포트/구독/교육/템플릿/프로그램/제휴/캐릭터IP/SNS월관리) | panel | MISSING | none | PARTIAL | 미구현 · 구현 대기(PARTIAL=미완료) |
| LF-305 | lf-research.js:16 | 수익 출처 대조 표 (블링·녹스·유튜브, 8채널 vendor) | panel | MISSING | none | PARTIAL | 미구현 · 구현 대기(PARTIAL=미완료) |
| LF-306 | lf-lab-ui.js:10 | 연구소 탭(role=tab): 수집 현황 | menu | MISSING | none | PARTIAL | 미구현 · 구현 대기(PARTIAL=미완료) |
| LF-307 | lf-lab-ui.js:10 | 연구소 탭(role=tab): 일본 국뽕 | menu | MISSING | none | PARTIAL | 미구현 · 구현 대기(PARTIAL=미완료) |
| LF-308 | lf-lab-ui.js:10 | 연구소 탭(role=tab): 한국 국뽕 | menu | MISSING | none | PARTIAL | 미구현 · 구현 대기(PARTIAL=미완료) |
| LF-309 | lf-lab-ui.js:10 | 연구소 탭(role=tab): 시니어 | menu | MISSING | none | PARTIAL | 미구현 · 구현 대기(PARTIAL=미완료) |
| LF-310 | lf-lab-ui.js:10 | 연구소 탭(role=tab): 고양이·동물 | menu | MISSING | none | PARTIAL | 미구현 · 구현 대기(PARTIAL=미완료) |
| LF-311 | lf-lab-ui.js:10 | 연구소 탭(role=tab): AI 영화 | menu | MISSING | none | PARTIAL | 미구현 · 구현 대기(PARTIAL=미완료) |
| LF-312 | lf-lab-ui.js:10 | 연구소 탭(role=tab): 일본 역사 | menu | MISSING | none | PARTIAL | 미구현 · 구현 대기(PARTIAL=미완료) |
| LF-313 | lf-lab-ui.js:10 | 연구소 탭(role=tab): 초반 3분 훅 | menu | MISSING | none | N/A | 롱폼 전용. 쇼츠 길이 이내 구간 분석으로 대체 필요 |
| LF-314 | lf-lab-ui.js:10 | 연구소 탭(role=tab): 제목·썸네일 | menu | MISSING | none | PARTIAL | 미구현 · 구현 대기(PARTIAL=미완료) |
| LF-315 | lf-lab-ui.js:10 | 연구소 탭(role=tab): 전략 비교 | menu | MISSING | none | PARTIAL | 미구현 · 구현 대기(PARTIAL=미완료) |
| LF-316 | lf-lab-ui.js:15 | #lf-lab 수익 벤치마킹 연구소 (lazy load lf-v5-lab.json) | panel | MISSING | none | PARTIAL | 미구현 · 구현 대기(PARTIAL=미완료) |
| LF-317 | lf-lab-ui.js:13 | 연구소 정렬 medianViews: 채널 중앙값 조회 | sort_key | MISSING | none | PARTIAL | 미구현 · 구현 대기(PARTIAL=미완료) |
| LF-318 | lf-lab-ui.js:13 | 연구소 정렬 xsub: 구독자 대비 X | sort_key | MISSING | none | PARTIAL | 미구현 · 구현 대기(PARTIAL=미완료) |
| LF-319 | lf-lab-ui.js:13 | 연구소 정렬 repeat: 반복 성공 | sort_key | MISSING | none | PARTIAL | 미구현 · 구현 대기(PARTIAL=미완료) |
| LF-320 | lf-lab-ui.js:13 | 연구소 정렬 vendor: 외부 추정 수익 | sort_key | MISSING | none | PARTIAL | 미구현 · 구현 대기(PARTIAL=미완료) |
| LF-321 | lf-lab-ui.js:35 | 연구소: 비출연 / 소형 채널 checkbox | filter | MISSING | none | PARTIAL | 미구현 · 구현 대기(PARTIAL=미완료) |
| LF-322 | lf-plus-ui.js:12 | #lf-plus 계산 방식 비교 (실측/가정/혼합 탭, M3+ mixCountries KR/JP/US 가중) | panel | MISSING | none | PARTIAL | 미구현 · 구현 대기(PARTIAL=미완료) |
| LF-323 | lf-plus-ui.js:21 | plus 국가 select (자동/KR/JP/US/IN 계수 없음) | select | MISSING | none | PARTIAL | 미구현 · 구현 대기(PARTIAL=미완료) |
| LF-324 | lf-plus.js:40 | 국가계수 KR 0.40 / JP 0.55 / US 1.00 | card_field | MISSING | none | PARTIAL | 미구현 · 구현 대기(PARTIAL=미완료) |
| LF-325 | lf-selection-ui.js:18 | #lf-selection 제작 참고 영상 7~8편 선정 · 허브 전달 | panel | EXISTS | shorts-compare.js 참고 영상 선정 (7~8 tray) | PARTIAL | 코드상 존재, 실제 브라우저 항목별 검증 전 |
| LF-326 | lf-selection-ui.js:18 | 선정: 프로젝트 ID input | button | MISSING | none | PARTIAL | 미구현 · 구현 대기(PARTIAL=미완료) |
| LF-327 | lf-selection-ui.js:18 | 선정: 게시 기간 30/60 | button | EXISTS | shorts-compare.js 게시 기간 | PARTIAL | 코드상 존재, 실제 브라우저 항목별 검증 전 |
| LF-328 | lf-selection-ui.js:18 | 선정: 채널 범위 (similar/same) | button | MISSING | none | PARTIAL | 미구현 · 구현 대기(PARTIAL=미완료) |
| LF-329 | lf-selection-ui.js:18 | 선정: 선정 순서 views/daily/date | button | MISSING | none | PARTIAL | 미구현 · 구현 대기(PARTIAL=미완료) |
| LF-330 | lf-selection-ui.js:18 | 선정: 상위 7편 버튼 | button | MISSING | none | PARTIAL | 미구현 · 구현 대기(PARTIAL=미완료) |
| LF-331 | lf-selection-ui.js:18 | 선정: 상위 8편 버튼 | button | MISSING | none | PARTIAL | 미구현 · 구현 대기(PARTIAL=미완료) |
| LF-332 | lf-selection-ui.js:18 | 선정: 선택 영상 분석 준비(freeze run_id) | button | PARTIAL | shorts-compare.js documentFor run_id | PARTIAL | 일부 구현 |
| LF-333 | lf-selection-ui.js:21 | 선정 목록 위/아래/제거 버튼 | button | PARTIAL | shorts-compare.js 트레이에서 뺐습니다 | PARTIAL | 일부 구현 |
| LF-334 | lf-selection-ui.js:29 | 선정 JSON 다운로드 (<run_id>.json) | export | EXISTS | shorts-compare.js:169-170 선택 JSON 다운로드 | PARTIAL | 코드상 존재, 실제 브라우저 항목별 검증 전 |
| LF-335 | lf-selection-ui.js:29 | Markdown 내보내기 (.md) | export | MISSING | none | PARTIAL | 미구현 · 구현 대기(PARTIAL=미완료) |
| LF-336 | lf-selection-ui.js:29 | 묶음 복사 (clipboard) | export | MISSING | none | PARTIAL | 미구현 · 구현 대기(PARTIAL=미완료) |
| LF-337 | lf-selection-ui.js:29 | CSV 내보내기 (.csv, BOM) | export | MISSING | none | PARTIAL | 미구현 · 구현 대기(PARTIAL=미완료) |
| LF-338 | lf-selection-ui.js:29 | 허용 자막 SRT ZIP (.zip) | export | MISSING | none | BLOCKED | 권리 있는 자막 파일 입력 경로 필요. 무단 수집 금지. 미구현 |
| LF-339 | lf-selection-ui.js:29 | 허브에 선정 정보 전달 | button | EXISTS | shorts-compare.js:180 작업실에 전달 | PARTIAL | 코드상 존재, 실제 브라우저 항목별 검증 전 |
| LF-340 | lf-selection-ui.js:29 | Google Sheets CSV 수동 가져오기 링크 | modal | MISSING | none | PARTIAL | 미구현 · 구현 대기(PARTIAL=미완료) |
| LF-341 | lf-selection-ui.js:29 | 선정 케이스 필드: 권한 증빙 URL | card_field | MISSING | none | PARTIAL | 미구현 · 구현 대기(PARTIAL=미완료) |
| LF-342 | lf-selection-ui.js:29 | 선정 케이스 필드: 분석 허용 | card_field | MISSING | none | PARTIAL | 미구현 · 구현 대기(PARTIAL=미완료) |
| LF-343 | lf-selection-ui.js:29 | 선정 케이스 필드: 전문 보관 허용 | card_field | MISSING | none | PARTIAL | 미구현 · 구현 대기(PARTIAL=미완료) |
| LF-344 | lf-selection-ui.js:29 | 선정 케이스 필드: 짧은 인용 공개 허용 | card_field | MISSING | none | PARTIAL | 미구현 · 구현 대기(PARTIAL=미완료) |
| LF-345 | lf-selection-ui.js:29 | 선정 케이스 필드: 전문 비공개 내보내기 허용 | card_field | MISSING | none | PARTIAL | 미구현 · 구현 대기(PARTIAL=미완료) |
| LF-346 | lf-selection-ui.js:29 | 선정 케이스 필드: 권한 있는 자막 파일 (.srt/.vtt/.txt) | card_field | MISSING | none | BLOCKED | 권리 있는 자막 파일 입력 경로 필요. 무단 수집 금지. 미구현 |
| LF-347 | lf-selection-ui.js:29 | 선정 케이스 필드: 내 분석 검토 완료 | card_field | MISSING | none | PARTIAL | 미구현 · 구현 대기(PARTIAL=미완료) |
| LF-348 | lf-selection-ui.js:29 | 선정 케이스 필드: 허용된 짧은 인용 textarea | card_field | MISSING | none | PARTIAL | 미구현 · 구현 대기(PARTIAL=미완료) |
| LF-349 | lf-selection-ui.js:29 | 선정 케이스 필드: 훅 검토: 첫 30초/롱폼 첫 210초 타임코드 | card_field | MISSING | none | N/A | 롱폼 전용. 쇼츠 길이 이내 구간 분석으로 대체 필요 |
| LF-350 | lf-selection-ui.js:17 | 선정 분석 노트 textarea 세트 (labels) | card_field | PARTIAL | shorts-compare.js 첫 1~3초 훅·대사·음향·화면·컷·편집 리듬·마무리·반복 연결·캐릭터·감정선·썸네일 구성 | PARTIAL | Shorts labels are Shorts-specific |
| LF-351 | lf-export.js:211 | lf-export.js pack(): Markdown+CSV+SRT ZIP bundle (stored ZIP, crc32) | export | MISSING | none | BLOCKED | 권리 있는 자막 파일 입력 경로 필요. 무단 수집 금지. 미구현 |
| LF-352 | lf-export.js:202 | SRT 파일명 생성 (filename()) | export | MISSING | none | BLOCKED | 권리 있는 자막 파일 입력 경로 필요. 무단 수집 금지. 미구현 |
| LF-353 | lf-export.js:125 | cue 시간 포맷 SRT/VTT (cueTime/srtTime) | export | MISSING | none | BLOCKED | 권리 있는 자막 파일 입력 경로 필요. 무단 수집 금지. 미구현 |
| LF-354 | lf-export.js:81 | createRun() 고정 실행 매니페스트(run_id, rights) | export | PARTIAL | shorts-compare.js documentFor | PARTIAL | 일부 구현 |
| LF-355 | lf-subs-ui.js:7 | 자막 다운로드 .txt (📥TXT) | export | MISSING | none | BLOCKED | 권리 있는 자막 파일 입력 경로 필요. 무단 수집 금지. 미구현 |
| LF-356 | lf-subs-ui.js:7 | 자막 다운로드 .srt (📥SRT) | export | MISSING | none | BLOCKED | 권리 있는 자막 파일 입력 경로 필요. 무단 수집 금지. 미구현 |
| LF-357 | lf-subs-ui.js:7 | 자막 다운로드 .vtt (📥VTT) | export | MISSING | none | BLOCKED | 권리 있는 자막 파일 입력 경로 필요. 무단 수집 금지. 미구현 |
| LF-358 | lf-subs-ui.js:7 | 자막 다운로드 .json (📥JSON) | export | MISSING | none | BLOCKED | 권리 있는 자막 파일 입력 경로 필요. 무단 수집 금지. 미구현 |
| LF-359 | lf-subs-ui.js:134 | 자막 ZIP longform-transcripts.zip (선택 ZIP + ZIP 형식 select) | export | MISSING | none | BLOCKED | 권리 있는 자막 파일 입력 경로 필요. 무단 수집 금지. 미구현 |
| LF-360 | lf-subs-ui.js:202 | #lf-subs 자막 도구 (비공개 파일 · 메모리 전용) | panel | MISSING | none | BLOCKED | 권리 있는 자막 파일 입력 경로 필요. 무단 수집 금지. 미구현 |
| LF-361 | lf-subs-ui.js:203 | 자막 UI: 가져오기 file input (.json,.srt,.vtt,.txt multiple) | button | MISSING | none | BLOCKED | 권리 있는 자막 파일 입력 경로 필요. 무단 수집 금지. 미구현 |
| LF-362 | lf-subs-ui.js:204 | 자막 UI: 트랙 select 원문/한국어 번역 | button | MISSING | none | BLOCKED | 권리 있는 자막 파일 입력 경로 필요. 무단 수집 금지. 미구현 |
| LF-363 | lf-subs-ui.js:205 | 자막 UI: 필터 select 전체/자막 있음/자막 없음/권리 미확인/권리 허용 | button | MISSING | none | BLOCKED | 권리 있는 자막 파일 입력 경로 필요. 무단 수집 금지. 미구현 |
| LF-364 | lf-subs-ui.js:206 | 자막 UI: 보이는 전체 선택 | button | MISSING | none | BLOCKED | 권리 있는 자막 파일 입력 경로 필요. 무단 수집 금지. 미구현 |
| LF-365 | lf-subs-ui.js:206 | 자막 UI: 선택 해제 | button | MISSING | none | BLOCKED | 권리 있는 자막 파일 입력 경로 필요. 무단 수집 금지. 미구현 |
| LF-366 | lf-subs-ui.js:207 | 자막 UI: 권리 근거 input | button | MISSING | none | BLOCKED | 권리 있는 자막 파일 입력 경로 필요. 무단 수집 금지. 미구현 |
| LF-367 | lf-subs-ui.js:208 | 자막 UI: 선택 항목 허용 | button | MISSING | none | BLOCKED | 권리 있는 자막 파일 입력 경로 필요. 무단 수집 금지. 미구현 |
| LF-368 | lf-subs-ui.js:208 | 자막 UI: 선택 항목 거부 | button | MISSING | none | BLOCKED | 권리 있는 자막 파일 입력 경로 필요. 무단 수집 금지. 미구현 |
| LF-369 | lf-subs-ui.js:209 | 자막 UI: ZIP 형식 select | button | MISSING | none | BLOCKED | 권리 있는 자막 파일 입력 경로 필요. 무단 수집 금지. 미구현 |
| LF-370 | lf-subs-ui.js:209 | 자막 UI: 선택 ZIP 버튼 | button | MISSING | none | BLOCKED | 권리 있는 자막 파일 입력 경로 필요. 무단 수집 금지. 미구현 |
| LF-371 | lf-subs-ui.js:210 | 자막 UI: 세션 저장 checkbox(기본 OFF) | button | MISSING | none | BLOCKED | 권리 있는 자막 파일 입력 경로 필요. 무단 수집 금지. 미구현 |
| LF-372 | lf-subs-ui.js:210 | 자막 UI: 자막 메모리 삭제 | button | MISSING | none | BLOCKED | 권리 있는 자막 파일 입력 경로 필요. 무단 수집 금지. 미구현 |
| LF-373 | lf-subs-ui.js:179 | 자막 UI: 카드 체크박스(선택) | button | MISSING | none | BLOCKED | 권리 있는 자막 파일 입력 경로 필요. 무단 수집 금지. 미구현 |
| LF-374 | lf-subs-ui.js:181 | 자막 UI: 카드 ▼ 자막 펼치기/접기 | button | MISSING | none | BLOCKED | 권리 있는 자막 파일 입력 경로 필요. 무단 수집 금지. 미구현 |
| LF-375 | lf-subs-ui.js:182 | 자막 UI: 카드 📋 복사 | button | MISSING | none | BLOCKED | 권리 있는 자막 파일 입력 경로 필요. 무단 수집 금지. 미구현 |
| LF-376 | lf-subs-ui.js:184 | 자막 UI: 카드 📊 상세 패널 | button | MISSING | none | BLOCKED | 권리 있는 자막 파일 입력 경로 필요. 무단 수집 금지. 미구현 |
| LF-377 | lf-subs-ui.js:180 | 자막 UI: 카드 ▶ 원본 링크 | button | MISSING | none | BLOCKED | 권리 있는 자막 파일 입력 경로 필요. 무단 수집 금지. 미구현 |
| LF-378 | lf-subs-ui.js:179 | 카드별 자막 도구 줄 (.lf-subs-tools) | card_field | MISSING | none | BLOCKED | 권리 있는 자막 파일 입력 경로 필요. 무단 수집 금지. 미구현 |
| LF-379 | index.html:704 | 원격 관측 장부 fetch (raw.githubusercontent all-videos.json, 8.5s timeout) + localStorage cache yt-longform-observed-cache:v1 | route | MISSING | none | PARTIAL | 미구현 · 구현 대기(PARTIAL=미완료) |
| LF-380 | lf-observations.js:1 | LFObservations.merge (read-only ledger, conflict detect) | route | MISSING | none | PARTIAL | 미구현 · 구현 대기(PARTIAL=미완료) |
| LF-381 | index.html:151 | #lf-source-status 출처/갱신 상태 문구 (신규·갱신·충돌·캐시) | card_field | MISSING | none | PARTIAL | 미구현 · 구현 대기(PARTIAL=미완료) |
| LF-382 | index.html:151 | #profiles 벚꽃 채널별 표본 수익 요약 | panel | MISSING | none | PARTIAL | 미구현 · 구현 대기(PARTIAL=미완료) |
| LF-383 | index.html:151 | #scope 단가 설명 문구 (벚꽃 30일 합산) | card_field | PARTIAL | index.html details 광고수익 추정과 자료 범위 | PARTIAL | 일부 구현 |
| LF-384 | index.html:151 | 외부 링크: 분석 기준 / GitHub 원본 / 채널 조사 근거 | link | PARTIAL | index.html header GitHub 원본 기록 | PARTIAL | 일부 구현 |
| LF-385 | lf-metrics.js:2 | lf-metrics.js business metric engine (D30, M1–M5, monthly min/avg, business-fit 6 evidences) | card_field | PARTIAL | repro-v2.js / shorts-workspace.js 종합 사업 점수 | PARTIAL | Engine semantics not compared line by line |