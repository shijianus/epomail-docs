// Figure builders part 1: legal-architecture, self-host-responsibilities,
// privacy-pillars, tos-contract, aup-ladder, subprocessor-map.
// Each builder receives a strings object for one language and returns full SVG markup.

const FONTS = `-apple-system, 'Segoe UI', Roboto, 'PingFang TC', 'Microsoft JhengHei', 'Noto Sans', sans-serif`;

function legalArchitecture(t) {
return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 430" width="100%" role="img" aria-label="${t.aria}">
  <style>
    .bg { fill: #f8fafc; }
    .layer { fill: #ffffff; stroke: #e2e8f0; stroke-width: 1.5; }
    .top { fill: #eff6ff; stroke: #2563eb; stroke-width: 1.5; }
    .base { fill: #f1f5f9; stroke: #e2e8f0; stroke-width: 1.5; }
    .t { font: 600 15px ${FONTS}; fill: #0f172a; }
    .b { font: 400 11.5px ${FONTS}; fill: #64748b; }
    .tag { font: 600 10.5px ${FONTS}; letter-spacing: 1.2px; fill: #2563eb; }
    .law { font: 600 10.5px ${FONTS}; fill: #475569; }
    .vline { stroke: #cbd5e1; stroke-width: 1.5; }
    @media (prefers-color-scheme: dark) {
      .bg { fill: #0b0f19; }
      .layer { fill: #111827; stroke: #1e293b; }
      .top { fill: rgba(59,130,246,0.10); stroke: #3b82f6; }
      .base { fill: #111827; stroke: #1e293b; }
      .t { fill: #f1f5f9; }
      .b { fill: #94a3b8; }
      .tag { fill: #60a5fa; }
      .law { fill: #94a3b8; }
      .vline { stroke: #334155; }
    }
  </style>
  <rect class="bg" width="1000" height="430" rx="16"/>
  <rect class="top" x="250" y="46" width="500" height="86" rx="12"/>
  <text class="tag" x="274" y="72">${t.tagContract}</text>
  <text class="t" x="274" y="94">${t.tosTitle}</text>
  <text class="b" x="274" y="110">${t.tosB1}</text>
  <text class="b" x="274" y="126">${t.tosB2}</text>
  <line class="vline" x1="360" y1="132" x2="360" y2="168"/>
  <line class="vline" x1="500" y1="132" x2="500" y2="168"/>
  <line class="vline" x1="640" y1="132" x2="640" y2="168"/>
  <rect class="layer" x="70" y="168" width="290" height="66" rx="12"/>
  <text class="t" x="90" y="194" font-size="13">${t.ppTitle}</text>
  <text class="b" x="90" y="214">${t.ppBody}</text>
  <rect class="layer" x="380" y="168" width="240" height="66" rx="12"/>
  <text class="t" x="400" y="194" font-size="13">${t.aupTitle}</text>
  <text class="b" x="400" y="214">${t.aupBody}</text>
  <rect class="layer" x="640" y="168" width="290" height="66" rx="12"/>
  <text class="t" x="660" y="194" font-size="13">${t.dsTitle}</text>
  <text class="b" x="660" y="214">${t.dsBody}</text>
  <rect class="base" x="70" y="266" width="860" height="100" rx="12"/>
  <text class="tag" x="94" y="292">${t.tagFrame}</text>
  <text class="t" x="94" y="316" font-size="13.5">${t.lawTitle}</text>
  <text class="b" x="94" y="336">${t.lawB1}</text>
  <text class="b" x="94" y="352">${t.lawB2}</text>
  <text class="law" x="94" y="400">${t.sideNote}</text>
</svg>`;
}

function selfHostResponsibilities(t) {
return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 470" width="100%" role="img" aria-label="${t.aria}">
  <style>
    .bg { fill: #f8fafc; }
    .card { fill: #ffffff; stroke: #e2e8f0; stroke-width: 1.5; }
    .card-accent { fill: #eff6ff; stroke: #2563eb; stroke-width: 1.5; }
    .title { font: 600 17px ${FONTS}; fill: #0f172a; }
    .body { font: 400 12.5px ${FONTS}; fill: #475569; }
    .tag { font: 600 10.5px ${FONTS}; letter-spacing: 1.2px; fill: #64748b; }
    .accent { fill: #2563eb; }
    .arrow { stroke: #94a3b8; stroke-width: 1.6; fill: none; marker-end: url(#ah); }
    .foot { font: 400 12px ${FONTS}; fill: #64748b; }
    .divider { stroke: #e2e8f0; stroke-width: 1; }
    @media (prefers-color-scheme: dark) {
      .bg { fill: #0b0f19; }
      .card { fill: #111827; stroke: #1e293b; }
      .card-accent { fill: rgba(59,130,246,0.10); stroke: #3b82f6; }
      .title { fill: #f1f5f9; }
      .body { fill: #94a3b8; }
      .tag { fill: #64748b; }
      .accent { fill: #60a5fa; }
      .arrow { stroke: #475569; }
      .foot { fill: #94a3b8; }
      .divider { stroke: #1e293b; }
    }
  </style>
  <defs>
    <marker id="ah" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
      <path d="M0,0 L10,5 L0,10 z" fill="#94a3b8"/>
    </marker>
  </defs>
  <rect class="bg" width="1000" height="470" rx="16"/>
  <rect class="card" x="60" y="52" width="270" height="130" rx="12"/>
  <text class="tag" x="84" y="80">${t.tagUp}</text>
  <text class="title" x="84" y="106">${t.upTitle}</text>
  <text class="body" x="84" y="130">${t.upB1}</text>
  <text class="body" x="84" y="150">${t.upB2}</text>
  <text class="body" x="84" y="170">${t.upB3}</text>
  <rect class="card-accent" x="390" y="52" width="270" height="130" rx="12"/>
  <text class="tag accent" x="414" y="80">${t.tagInst}</text>
  <text class="title" x="414" y="106">${t.instTitle}</text>
  <text class="body" x="414" y="130">${t.instB1}</text>
  <text class="body" x="414" y="150">${t.instB2}</text>
  <text class="body" x="414" y="170">${t.instB3}</text>
  <rect class="card" x="720" y="52" width="220" height="130" rx="12"/>
  <text class="tag" x="744" y="80">${t.tagYou}</text>
  <text class="title" x="744" y="106">${t.youTitle}</text>
  <text class="body" x="744" y="130">${t.youB1}</text>
  <text class="body" x="744" y="150">${t.youB2}</text>
  <text class="body" x="744" y="170">${t.youB3}</text>
  <path class="arrow" d="M330,117 L382,117"/>
  <path class="arrow" d="M660,117 L712,117"/>
  <text class="foot" x="340" y="106">${t.arrowCode}</text>
  <text class="foot" x="672" y="106">${t.arrowTrust}</text>
  <line class="divider" x1="60" y1="228" x2="940" y2="228"/>
  <rect class="card" x="60" y="262" width="880" height="150" rx="12"/>
  <text class="tag" x="84" y="290">${t.tagMeans}</text>
  <text class="title" x="84" y="318" font-size="15.5">${t.meansTitle}</text>
  <text class="body" x="84" y="344">${t.m1}</text>
  <text class="body" x="84" y="366">${t.m2}</text>
  <text class="body" x="84" y="388">${t.m3}</text>
</svg>`;
}

function privacyPillars(t) {
return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 400" width="100%" role="img" aria-label="${t.aria}">
  <style>
    .bg { fill: #f8fafc; }
    .roof { fill: #eff6ff; stroke: #2563eb; stroke-width: 1.6; }
    .pillar { fill: #ffffff; stroke: #e2e8f0; stroke-width: 1.5; }
    .pt { font: 600 13.5px ${FONTS}; fill: #0f172a; }
    .pb { font: 400 10.5px ${FONTS}; fill: #64748b; }
    .law { font: 600 10px ${FONTS}; fill: #2563eb; }
    .base { fill: #f1f5f9; stroke: #e2e8f0; stroke-width: 1.5; }
    .bt { font: 600 12.5px ${FONTS}; fill: #0f172a; }
    .roof-t { font: 600 14.5px ${FONTS}; fill: #0f172a; }
    @media (prefers-color-scheme: dark) {
      .bg { fill: #0b0f19; }
      .roof { fill: rgba(59,130,246,0.12); stroke: #3b82f6; }
      .pillar { fill: #111827; stroke: #1e293b; }
      .pt { fill: #f1f5f9; }
      .pb { fill: #94a3b8; }
      .law { fill: #60a5fa; }
      .base { fill: #111827; stroke: #1e293b; }
      .bt { fill: #f1f5f9; }
      .roof-t { fill: #f1f5f9; }
    }
  </style>
  <rect class="bg" width="1000" height="400" rx="16"/>
  <rect class="roof" x="60" y="40" width="880" height="64" rx="12"/>
  <text class="roof-t" x="84" y="68" font-size="13">${t.roofTitle}</text>
  <text class="law" x="84" y="90">${t.roofSub}</text>
  <rect class="pillar" x="60" y="140" width="160" height="140" rx="10"/>
  <text class="pt" x="78" y="168">${t.p1t}</text>
  <text class="pb" x="78" y="190">${t.p1a}</text>
  <text class="pb" x="78" y="206">${t.p1b}</text>
  <text class="pb" x="78" y="222">${t.p1c}</text>
  <text class="law" x="78" y="262">${t.p1l}</text>
  <rect class="pillar" x="230" y="140" width="160" height="140" rx="10"/>
  <text class="pt" x="248" y="168">${t.p2t}</text>
  <text class="pb" x="248" y="190">${t.p2a}</text>
  <text class="pb" x="248" y="206">${t.p2b}</text>
  <text class="pb" x="248" y="222">${t.p2c}</text>
  <text class="law" x="248" y="262">${t.p2l}</text>
  <rect class="pillar" x="400" y="140" width="160" height="140" rx="10"/>
  <text class="pt" x="418" y="168">${t.p3t}</text>
  <text class="pb" x="418" y="190">${t.p3a}</text>
  <text class="pb" x="418" y="206">${t.p3b}</text>
  <text class="pb" x="418" y="222">${t.p3c}</text>
  <text class="law" x="418" y="262">${t.p3l}</text>
  <rect class="pillar" x="570" y="140" width="160" height="140" rx="10"/>
  <text class="pt" x="588" y="168">${t.p4t}</text>
  <text class="pb" x="588" y="190">${t.p4a}</text>
  <text class="pb" x="588" y="206">${t.p4b}</text>
  <text class="pb" x="588" y="222">${t.p4c}</text>
  <text class="law" x="588" y="262">${t.p4l}</text>
  <rect class="pillar" x="740" y="140" width="160" height="140" rx="10"/>
  <text class="pt" x="758" y="168">${t.p5t}</text>
  <text class="pb" x="758" y="190">${t.p5a}</text>
  <text class="pb" x="758" y="206">${t.p5b}</text>
  <text class="pb" x="758" y="222">${t.p5c}</text>
  <text class="law" x="758" y="262">${t.p5l}</text>
  <rect class="base" x="60" y="312" width="880" height="56" rx="12"/>
  <text class="bt" x="84" y="336" font-size="12">${t.baseTitle}</text>
  <text class="law" x="84" y="356">${t.baseSub}</text>
</svg>`;
}

function tosContract(t) {
return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 400" width="100%" role="img" aria-label="${t.aria}">
  <style>
    .bg { fill: #f8fafc; }
    .step { fill: #ffffff; stroke: #e2e8f0; stroke-width: 1.5; }
    .s1 { fill: #eff6ff; stroke: #2563eb; }
    .s2 { fill: #eef2ff; stroke: #4f46e5; }
    .s3 { fill: #f0f9ff; stroke: #0284c7; }
    .s4 { fill: #f8fafc; stroke: #64748b; }
    .band { fill: #eff6ff; stroke: #2563eb; stroke-width: 1.5; }
    .t { font: 600 13.5px ${FONTS}; fill: #0f172a; }
    .b { font: 400 11px ${FONTS}; fill: #475569; }
    .bt { font: 600 13px ${FONTS}; fill: #0f172a; }
    .bb { font: 400 11px ${FONTS}; fill: #1d4ed8; }
    .tag { font: 600 10.5px ${FONTS}; letter-spacing: 1.2px; fill: #64748b; }
    .arrow { stroke: #2563eb; stroke-width: 1.6; fill: none; marker-end: url(#th); }
    .chip { fill: #ffffff; stroke: #e2e8f0; stroke-width: 1.5; }
    @media (prefers-color-scheme: dark) {
      .bg { fill: #0b0f19; }
      .step { fill: #111827; stroke: #1e293b; }
      .s1 { fill: rgba(59,130,246,0.12); stroke: #3b82f6; }
      .s2 { fill: rgba(79,70,229,0.14); stroke: #818cf8; }
      .s3 { fill: rgba(2,132,199,0.14); stroke: #38bdf8; }
      .s4 { fill: rgba(100,116,139,0.12); stroke: #94a3b8; }
      .band { fill: rgba(59,130,246,0.12); stroke: #3b82f6; }
      .t { fill: #f1f5f9; }
      .b { fill: #94a3b8; }
      .bt { fill: #f1f5f9; }
      .bb { fill: #93c5fd; }
      .tag { fill: #64748b; }
      .arrow { stroke: #60a5fa; }
      .chip { fill: #111827; stroke: #1e293b; }
      .mh { fill: #60a5fa; }
    }
  </style>
  <defs>
    <marker id="th" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
      <path class="mh" d="M0,0 L10,5 L0,10 z" fill="#2563eb"/>
    </marker>
  </defs>
  <rect class="bg" width="1000" height="400" rx="16"/>
  <text class="tag" x="60" y="46">${t.headerTag}</text>
  <rect class="chip" x="672" y="24" width="268" height="40" rx="10"/>
  <text class="bb" x="688" y="42">${t.chipTitle}</text>
  <text class="b" x="688" y="57">${t.chipBody}</text>
  <rect class="s1" x="60" y="86" width="200" height="96" rx="10"/>
  <text class="t" x="78" y="112">${t.s1t}</text>
  <text class="b" x="78" y="132">${t.s1a}</text>
  <text class="b" x="78" y="148">${t.s1b}</text>
  <text class="b" x="78" y="164">${t.s1c}</text>
  <rect class="s2" x="300" y="86" width="200" height="96" rx="10"/>
  <text class="t" x="318" y="112">${t.s2t}</text>
  <text class="b" x="318" y="132">${t.s2a}</text>
  <text class="b" x="318" y="148">${t.s2b}</text>
  <text class="b" x="318" y="164">${t.s2c}</text>
  <rect class="s3" x="540" y="86" width="200" height="96" rx="10"/>
  <text class="t" x="558" y="112">${t.s3t}</text>
  <text class="b" x="558" y="132">${t.s3a}</text>
  <text class="b" x="558" y="148">${t.s3b}</text>
  <text class="b" x="558" y="164">${t.s3c}</text>
  <rect class="s4" x="780" y="86" width="160" height="96" rx="10"/>
  <text class="t" x="798" y="112">${t.s4t}</text>
  <text class="b" x="798" y="132">${t.s4a}</text>
  <text class="b" x="798" y="148">${t.s4b}</text>
  <text class="b" x="798" y="164">${t.s4c}</text>
  <path class="arrow" d="M260,134 L296,134"/>
  <path class="arrow" d="M500,134 L536,134"/>
  <path class="arrow" d="M740,134 L776,134"/>
  <rect class="band" x="60" y="216" width="880" height="64" rx="10"/>
  <text class="bt" x="84" y="242">${t.lawTitle}</text>
  <text class="bb" x="84" y="262">${t.lawBody}</text>
  <text class="tag" x="60" y="322">${t.alsoTag}</text>
  <rect class="step" x="60" y="334" width="272" height="44" rx="10"/>
  <text class="t" x="78" y="352">${t.c1t}</text>
  <text class="b" x="78" y="368">${t.c1b}</text>
  <rect class="step" x="352" y="334" width="272" height="44" rx="10"/>
  <text class="t" x="370" y="352">${t.c2t}</text>
  <text class="b" x="370" y="368">${t.c2b}</text>
  <rect class="step" x="644" y="334" width="296" height="44" rx="10"/>
  <text class="t" x="662" y="352">${t.c3t}</text>
  <text class="b" x="662" y="368">${t.c3b}</text>
</svg>`;
}

function aupLadder(t) {
return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 400" width="100%" role="img" aria-label="${t.aria}">
  <style>
    .bg { fill: #f8fafc; }
    .step { fill: #ffffff; stroke: #e2e8f0; stroke-width: 1.5; }
    .s1 { fill: #eff6ff; stroke: #2563eb; }
    .s2 { fill: #e0f2fe; stroke: #0284c7; }
    .s3 { fill: #fef9c3; stroke: #ca8a04; }
    .s4 { fill: #ffedd5; stroke: #ea580c; }
    .s5 { fill: #fee2e2; stroke: #dc2626; }
    .band { fill: #fee2e2; stroke: #dc2626; stroke-width: 1.5; }
    .t { font: 600 13.5px ${FONTS}; fill: #0f172a; }
    .b { font: 400 11px ${FONTS}; fill: #475569; }
    .bt { font: 600 13px ${FONTS}; fill: #0f172a; }
    .b0 { font: 400 11px ${FONTS}; fill: #b91c1c; }
    .tag { font: 600 10.5px ${FONTS}; letter-spacing: 1.2px; fill: #64748b; }
    .loop { stroke: #2563eb; stroke-width: 1.6; fill: none; stroke-dasharray: 5 4; marker-end: url(#lh); }
    .loop-t { font: 600 11px ${FONTS}; fill: #2563eb; }
    @media (prefers-color-scheme: dark) {
      .bg { fill: #0b0f19; }
      .step { fill: #111827; stroke: #1e293b; }
      .s1 { fill: rgba(59,130,246,0.12); stroke: #3b82f6; }
      .s2 { fill: rgba(2,132,199,0.14); stroke: #38bdf8; }
      .s3 { fill: rgba(202,138,4,0.14); stroke: #facc15; }
      .s4 { fill: rgba(234,88,12,0.16); stroke: #fb923c; }
      .s5 { fill: rgba(220,38,38,0.16); stroke: #f87171; }
      .band { fill: rgba(220,38,38,0.16); stroke: #f87171; }
      .t { fill: #f1f5f9; }
      .b { fill: #94a3b8; }
      .bt { fill: #f1f5f9; }
      .b0 { fill: #fca5a5; }
      .tag { fill: #64748b; }
      .loop { stroke: #60a5fa; }
      .loop-t { fill: #60a5fa; }
      .mh { fill: #60a5fa; }
    }
  </style>
  <defs>
    <marker id="lh" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
      <path class="mh" d="M0,0 L10,5 L0,10 z" fill="#2563eb"/>
    </marker>
  </defs>
  <rect class="bg" width="1000" height="400" rx="16"/>
  <rect class="band" x="60" y="36" width="880" height="56" rx="10"/>
  <text class="bt" x="84" y="60">${t.bandTitle}</text>
  <text class="b0" x="84" y="80">${t.bandBody}</text>
  <rect class="s1" x="60"  y="300" width="150" height="56" rx="10"/>
  <text class="t" x="76" y="324">${t.l1t}</text>
  <text class="b" x="76" y="342">${t.l1b}</text>
  <rect class="s2" x="234" y="252" width="150" height="56" rx="10"/>
  <text class="t" x="250" y="276">${t.l2t}</text>
  <text class="b" x="250" y="294">${t.l2b}</text>
  <rect class="s3" x="408" y="204" width="150" height="56" rx="10"/>
  <text class="t" x="424" y="228">${t.l3t}</text>
  <text class="b" x="424" y="246">${t.l3b}</text>
  <rect class="s4" x="582" y="156" width="150" height="56" rx="10"/>
  <text class="t" x="598" y="180">${t.l4t}</text>
  <text class="b" x="598" y="198">${t.l4b}</text>
  <rect class="s5" x="756" y="108" width="150" height="56" rx="10"/>
  <text class="t" x="772" y="132">${t.l5t}</text>
  <text class="b" x="772" y="150">${t.l5b}</text>
  <path class="loop" d="M820,168 C866,240 736,318 540,330 C380,340 250,334 218,318"/>
  <text class="loop-t" x="470" y="356">${t.appeal1}</text>
  <text class="loop-t" x="470" y="372">${t.appeal2}</text>
  <text class="tag" x="60" y="378">${t.footerTag}</text>
</svg>`;
}

function subprocessorMap(t) {
return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 470" width="100%" role="img" aria-label="${t.aria}">
  <style>
    .bg { fill: #f8fafc; }
    .hub { fill: #eff6ff; stroke: #2563eb; stroke-width: 1.8; }
    .grp { fill: #ffffff; stroke: #e2e8f0; stroke-width: 1.5; }
    .gt { font: 600 13.5px ${FONTS}; fill: #0f172a; }
    .gb { font: 400 11.5px ${FONTS}; fill: #475569; }
    .tag { font: 600 10.5px ${FONTS}; letter-spacing: 1px; fill: #2563eb; }
    .hub-t { font: 600 15px ${FONTS}; fill: #0f172a; }
    .hub-b { font: 400 11px ${FONTS}; fill: #64748b; }
    .line { stroke: #cbd5e1; stroke-width: 1.5; fill: none; }
    @media (prefers-color-scheme: dark) {
      .bg { fill: #0b0f19; }
      .hub { fill: rgba(59,130,246,0.12); stroke: #3b82f6; }
      .grp { fill: #111827; stroke: #1e293b; }
      .gt { fill: #f1f5f9; }
      .gb { fill: #94a3b8; }
      .tag { fill: #60a5fa; }
      .hub-t { fill: #f1f5f9; }
      .hub-b { fill: #94a3b8; }
      .line { stroke: #334155; }
    }
  </style>
  <rect class="bg" width="1000" height="470" rx="16"/>
  <rect class="hub" x="390" y="185" width="220" height="100" rx="14"/>
  <text class="hub-t" x="414" y="222">${t.hub1}</text>
  <text class="hub-t" x="414" y="242">${t.hub2}</text>
  <text class="hub-b" x="414" y="264">${t.hubA}</text>
  <text class="hub-b" x="414" y="280">${t.hubB}</text>
  <rect class="grp" x="48" y="48" width="290" height="120" rx="12"/>
  <text class="tag" x="70" y="74">${t.g1tag}</text>
  <text class="gt" x="70" y="98">${t.g1t}</text>
  <text class="gb" x="70" y="120">${t.g1a}</text>
  <text class="gb" x="70" y="138">${t.g1b}</text>
  <text class="gb" x="70" y="156">${t.g1c}</text>
  <rect class="grp" x="662" y="48" width="290" height="120" rx="12"/>
  <text class="tag" x="684" y="74">${t.g2tag}</text>
  <text class="gt" x="684" y="98">${t.g2t}</text>
  <text class="gb" x="684" y="120">${t.g2a}</text>
  <text class="gb" x="684" y="138">${t.g2b}</text>
  <text class="gb" x="684" y="156">${t.g2c}</text>
  <rect class="grp" x="48" y="302" width="290" height="120" rx="12"/>
  <text class="tag" x="70" y="328">${t.g3tag}</text>
  <text class="gt" x="70" y="352" font-size="12.5">${t.g3t}</text>
  <text class="gb" x="70" y="374">${t.g3a}</text>
  <text class="gb" x="70" y="392">${t.g3b}</text>
  <text class="gb" x="70" y="410">${t.g3c}</text>
  <rect class="grp" x="662" y="302" width="290" height="120" rx="12"/>
  <text class="tag" x="684" y="328">${t.g4tag}</text>
  <text class="gt" x="684" y="352">${t.g4t}</text>
  <text class="gb" x="684" y="374">${t.g4a}</text>
  <text class="gb" x="684" y="392">${t.g4b}</text>
  <text class="gb" x="684" y="410">${t.g4c}</text>
  <path class="line" d="M390,210 C330,196 340,150 338,140"/>
  <path class="line" d="M610,210 C670,196 660,150 662,140"/>
  <path class="line" d="M390,260 C330,274 340,320 338,330"/>
  <path class="line" d="M610,260 C670,274 660,320 662,330"/>
</svg>`;
}

export const builders1 = {
  'legal-architecture': legalArchitecture,
  'self-host-responsibilities': selfHostResponsibilities,
  'privacy-pillars': privacyPillars,
  'tos-contract': tosContract,
  'aup-ladder': aupLadder,
  'subprocessor-map': subprocessorMap,
};
