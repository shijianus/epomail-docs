// Figure builders part 2: key-terms-glossary, project-architecture,
// anti-tamper-architecture, security-trust-shield, dual-nature-scale, data-sovereignty-export.

const FONTS = `-apple-system, 'Segoe UI', Roboto, 'PingFang TC', 'Microsoft JhengHei', 'Noto Sans', sans-serif`;

function keyTermsGlossary(t) {
return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 400" width="100%" role="img" aria-label="${t.aria}">
  <style>
    .bg { fill: #f8fafc; }
    .card { fill: #ffffff; stroke: #e2e8f0; stroke-width: 1.5; }
    .c1 { fill: #eff6ff; stroke: #2563eb; }
    .c2 { fill: #f0fdf4; stroke: #16a34a; }
    .row { fill: #ffffff; stroke: #e2e8f0; stroke-width: 1; }
    .t { font: 600 13px ${FONTS}; fill: #0f172a; }
    .b { font: 400 11px ${FONTS}; fill: #475569; }
    .bt { font: 600 13.5px ${FONTS}; fill: #0f172a; }
    .tag { font: 600 10.5px ${FONTS}; letter-spacing: 1.2px; fill: #64748b; }
    .hub { fill: #eff6ff; stroke: #2563eb; stroke-width: 1.5; }
    .hub-t { font: 600 12.5px ${FONTS}; fill: #1d4ed8; }
    .hub-b { font: 400 10.5px ${FONTS}; fill: #475569; }
    .link { stroke: #2563eb; stroke-width: 1.4; stroke-dasharray: 5 4; fill: none; }
    @media (prefers-color-scheme: dark) {
      .bg { fill: #0b0f19; }
      .card { fill: #111827; stroke: #1e293b; }
      .c1 { fill: rgba(59,130,246,0.12); stroke: #3b82f6; }
      .c2 { fill: rgba(22,163,74,0.12); stroke: #4ade80; }
      .row { fill: #0b0f19; stroke: #1e293b; }
      .t { fill: #f1f5f9; }
      .b { fill: #94a3b8; }
      .bt { fill: #f1f5f9; }
      .tag { fill: #64748b; }
      .hub { fill: rgba(59,130,246,0.12); stroke: #3b82f6; }
      .hub-t { fill: #93c5fd; }
      .hub-b { fill: #94a3b8; }
      .link { stroke: #60a5fa; }
    }
  </style>
  <rect class="bg" width="1000" height="400" rx="16"/>
  <text class="tag" x="60" y="46">${t.headerTag}</text>
  <rect class="c1" x="60" y="66" width="330" height="230" rx="12"/>
  <text class="bt" x="84" y="96">${t.legalTitle}</text>
  <rect class="row" x="80" y="112" width="290" height="36" rx="8"/>
  <text class="t" x="94" y="135" font-size="12">${t.l1}</text>
  <rect class="row" x="80" y="156" width="290" height="36" rx="8"/>
  <text class="t" x="94" y="179" font-size="12">${t.l2}</text>
  <rect class="row" x="80" y="200" width="290" height="36" rx="8"/>
  <text class="t" x="94" y="223" font-size="12">${t.l3}</text>
  <rect class="row" x="80" y="244" width="290" height="36" rx="8"/>
  <text class="t" x="94" y="267" font-size="12">${t.l4}</text>
  <rect class="c2" x="610" y="66" width="330" height="230" rx="12"/>
  <text class="bt" x="634" y="96">${t.techTitle}</text>
  <rect class="row" x="630" y="112" width="290" height="36" rx="8"/>
  <text class="t" x="644" y="135" font-size="12">${t.t1}</text>
  <rect class="row" x="630" y="156" width="290" height="36" rx="8"/>
  <text class="t" x="644" y="179" font-size="12">${t.t2}</text>
  <rect class="row" x="630" y="200" width="290" height="36" rx="8"/>
  <text class="t" x="644" y="223" font-size="12">${t.t3}</text>
  <rect class="row" x="630" y="244" width="290" height="36" rx="8"/>
  <text class="t" x="644" y="267" font-size="12">${t.t4}</text>
  <circle class="hub" cx="500" cy="181" r="86"/>
  <text class="hub-t" x="500" y="172" text-anchor="middle">${t.hubTitle}</text>
  <text class="hub-b" x="500" y="192" text-anchor="middle">${t.hubA}</text>
  <text class="hub-b" x="500" y="208" text-anchor="middle">${t.hubB}</text>
  <path class="link" d="M392,181 L414,181"/>
  <path class="link" d="M586,181 L608,181"/>
  <text class="tag" x="60" y="330">${t.interpTag}</text>
  <rect class="card" x="60" y="342" width="880" height="40" rx="10"/>
  <text class="b" x="84" y="360">${t.interp1}</text>
  <text class="b" x="84" y="376">${t.interp2}</text>
</svg>`;
}

function projectArchitecture(t) {
return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 470" width="100%" role="img" aria-label="${t.aria}">
  <style>
    .bg { fill: #f8fafc; }
    .band { fill: #ffffff; stroke: #e2e8f0; stroke-width: 1.5; }
    .box { fill: #ffffff; stroke: #e2e8f0; stroke-width: 1.5; }
    .box-1 { fill: #eff6ff; stroke: #2563eb; }
    .lbl { font: 700 10px ${FONTS}; fill: #2563eb; letter-spacing: 1.4px; }
    .t { font: 600 14px ${FONTS}; fill: #0f172a; }
    .b { font: 400 11px ${FONTS}; fill: #64748b; }
    .chip { fill: #f1f5f9; stroke: #e2e8f0; stroke-width: 1; }
    .chip-t { font: 600 10.5px ui-monospace, 'Cascadia Code', Consolas, monospace; fill: #475569; }
    .arrow { stroke: #94a3b8; stroke-width: 1.6; fill: none; marker-end: url(#pa); }
    @media (prefers-color-scheme: dark) {
      .bg { fill: #0b0f19; }
      .band { fill: #111827; stroke: #1e293b; }
      .box { fill: #111827; stroke: #1e293b; }
      .box-1 { fill: rgba(59,130,246,0.10); stroke: #3b82f6; }
      .lbl { fill: #60a5fa; }
      .t { fill: #f1f5f9; }
      .b { fill: #94a3b8; }
      .chip { fill: #1e293b; stroke: #334155; }
      .chip-t { fill: #94a3b8; }
      .arrow { stroke: #475569; }
    }
  </style>
  <defs>
    <marker id="pa" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
      <path d="M0,0 L10,5 L0,10 z" fill="#94a3b8"/>
    </marker>
  </defs>
  <rect class="bg" width="1000" height="470" rx="16"/>
  <text class="lbl" x="40" y="42">${t.clientsTag}</text>
  <rect class="box-1" x="40" y="54" width="280" height="72" rx="12"/>
  <text class="t" x="60" y="82">${t.webTitle}</text>
  <text class="b" x="60" y="102">Vue 3 · Element Plus · PWA</text>
  <rect class="box" x="360" y="54" width="280" height="72" rx="12"/>
  <text class="t" x="380" y="82">${t.mobileTitle}</text>
  <text class="b" x="380" y="102">Android (epomail)</text>
  <rect class="box" x="680" y="54" width="280" height="72" rx="12"/>
  <text class="t" x="700" y="82">${t.oauthTitle}</text>
  <text class="b" x="700" y="102">${t.oauthBody}</text>
  <path class="arrow" d="M180,126 L180,164"/>
  <path class="arrow" d="M500,126 L500,164"/>
  <path class="arrow" d="M820,126 L820,164"/>
  <rect class="band" x="40" y="170" width="920" height="150" rx="14"/>
  <text class="lbl" x="56" y="194">${t.edgeTag}</text>
  <rect class="box-1" x="64" y="208" width="200" height="72" rx="12"/>
  <text class="t" x="80" y="234">${t.apiTitle}</text>
  <text class="b" x="80" y="252">${t.apiBody}</text>
  <rect class="box" x="279" y="208" width="200" height="72" rx="12"/>
  <text class="t" x="295" y="234">${t.routingTitle}</text>
  <text class="b" x="295" y="252">${t.routingBody}</text>
  <rect class="box" x="494" y="208" width="200" height="72" rx="12"/>
  <text class="t" x="510" y="234">Workers AI</text>
  <text class="b" x="510" y="252">${t.aiBody}</text>
  <rect class="box" x="709" y="208" width="200" height="72" rx="12"/>
  <text class="t" x="725" y="234">${t.outTitle}</text>
  <text class="b" x="725" y="252">Resend · Telegram Bot</text>
  <path class="arrow" d="M142,320 L142,360"/>
  <path class="arrow" d="M367,320 L367,360"/>
  <path class="arrow" d="M592,320 L592,360"/>
  <path class="arrow" d="M817,320 L817,360"/>
  <text class="lbl" x="40" y="352">${t.storageTag}</text>
  <rect class="box" x="40" y="364" width="205" height="72" rx="12"/>
  <text class="t" x="56" y="390">D1 · USER_DB</text>
  <text class="b" x="56" y="408">${t.userDbBody}</text>
  <rect class="box" x="265" y="364" width="205" height="72" rx="12"/>
  <text class="t" x="281" y="390">D1 · MAIL_DB</text>
  <text class="b" x="281" y="408">${t.mailDbBody}</text>
  <rect class="box" x="490" y="364" width="205" height="72" rx="12"/>
  <text class="t" x="506" y="390">KV</text>
  <text class="b" x="506" y="408">${t.kvBody}</text>
  <rect class="box" x="715" y="364" width="205" height="72" rx="12"/>
  <text class="t" x="731" y="390">R2 / B2 / S3</text>
  <text class="b" x="731" y="408">${t.objBody}</text>
  <rect class="chip" x="185" y="446" width="630" height="20" rx="10"/>
  <text class="chip-t" x="500" y="460" text-anchor="middle">PBKDF2 ×100k · JWT 30 d · HMAC mail-hash · RBAC · TOTP/Passkey · Turnstile</text>
</svg>`;
}

function antiTamperArchitecture(t) {
return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 480" width="100%" role="img" aria-label="${t.aria}">
  <style>
    .bg { fill: #f8fafc; }
    .band { fill: #ffffff; stroke: #e2e8f0; stroke-width: 1.5; }
    .box { fill: #ffffff; stroke: #e2e8f0; stroke-width: 1.5; }
    .box-blue { fill: #eff6ff; stroke: #2563eb; stroke-width: 1.5; }
    .box-green { fill: #f0fdf4; stroke: #16a34a; stroke-width: 1.5; }
    .box-amber { fill: #fffbeb; stroke: #d97706; stroke-width: 1.5; }
    .lbl-blue { font: 700 11px ${FONTS}; fill: #2563eb; letter-spacing: 1.4px; }
    .lbl-green { font: 700 11px ${FONTS}; fill: #16a34a; letter-spacing: 1.4px; }
    .lbl-amber { font: 700 11px ${FONTS}; fill: #d97706; letter-spacing: 1.4px; }
    .t { font: 600 14px ${FONTS}; fill: #0f172a; }
    .b { font: 400 11.5px ${FONTS}; fill: #64748b; }
    .mono { font: 500 11px ui-monospace, 'Cascadia Code', Consolas, monospace; fill: #64748b; }
    .arrow { stroke: #94a3b8; stroke-width: 1.8; fill: none; marker-end: url(#pa); }
    @media (prefers-color-scheme: dark) {
      .bg { fill: #0b0f19; }
      .band { fill: #111827; stroke: #1e293b; }
      .box { fill: #111827; stroke: #1e293b; }
      .box-blue { fill: rgba(59,130,246,0.12); stroke: #3b82f6; }
      .box-green { fill: rgba(34,197,94,0.12); stroke: #22c55e; }
      .box-amber { fill: rgba(245,158,11,0.12); stroke: #f59e0b; }
      .lbl-blue { fill: #60a5fa; }
      .lbl-green { fill: #4ade80; }
      .lbl-amber { fill: #fbbf24; }
      .t { fill: #f1f5f9; }
      .b { fill: #94a3b8; }
      .mono { fill: #94a3b8; }
      .arrow { stroke: #475569; }
    }
  </style>
  <defs>
    <marker id="pa" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
      <path d="M0,0 L10,5 L0,10 z" fill="#94a3b8"/>
    </marker>
  </defs>
  <rect class="bg" width="1000" height="480" rx="16"/>
  <rect class="band" x="40" y="35" width="920" height="110" rx="14"/>
  <text class="lbl-blue" x="60" y="58">${t.tier1}</text>
  <rect class="box-blue" x="60" y="70" width="270" height="60" rx="10"/>
  <text class="t" x="78" y="93" font-size="13">${t.t1a}</text>
  <text class="mono" x="78" y="112">announcement@epocanvas.com</text>
  <rect class="box" x="355" y="70" width="270" height="60" rx="10"/>
  <text class="t" x="373" y="93" font-size="13">${t.t1b}</text>
  <text class="b" x="373" y="112">${t.t1bb}</text>
  <rect class="box-green" x="650" y="70" width="290" height="60" rx="10"/>
  <text class="t" x="668" y="93" font-size="13">${t.t1c}</text>
  <text class="b" x="668" y="112">${t.t1cb}</text>
  <path class="arrow" d="M195,145 L195,185"/>
  <path class="arrow" d="M490,145 L490,185"/>
  <path class="arrow" d="M795,145 L795,185"/>
  <rect class="band" x="40" y="190" width="920" height="115" rx="14"/>
  <text class="lbl-amber" x="60" y="213">${t.tier2}</text>
  <rect class="box" x="60" y="225" width="270" height="64" rx="10"/>
  <text class="t" x="78" y="249" font-size="13">${t.t2a}</text>
  <text class="b" x="78" y="268">${t.t2ab}</text>
  <rect class="box-amber" x="355" y="225" width="270" height="64" rx="10"/>
  <text class="t" x="373" y="249" font-size="13">${t.t2b}</text>
  <text class="b" x="373" y="268">${t.t2bb}</text>
  <rect class="box" x="650" y="225" width="290" height="64" rx="10"/>
  <text class="t" x="668" y="249" font-size="13">${t.t2c}</text>
  <text class="b" x="668" y="268">${t.t2cb}</text>
  <path class="arrow" d="M195,305 L195,345"/>
  <path class="arrow" d="M490,305 L490,345"/>
  <path class="arrow" d="M795,305 L795,345"/>
  <rect class="band" x="40" y="350" width="920" height="105" rx="14"/>
  <text class="lbl-green" x="60" y="373">${t.tier3}</text>
  <rect class="box-green" x="60" y="383" width="270" height="58" rx="10"/>
  <text class="t" x="78" y="405" font-size="13">${t.t3a}</text>
  <text class="b" x="78" y="423">${t.t3ab}</text>
  <rect class="box" x="355" y="383" width="270" height="58" rx="10"/>
  <text class="t" x="373" y="405" font-size="13">${t.t3b}</text>
  <text class="b" x="373" y="423">${t.t3bb}</text>
  <rect class="box-blue" x="650" y="383" width="290" height="58" rx="10"/>
  <text class="t" x="668" y="405" font-size="13">${t.t3c}</text>
  <text class="b" x="668" y="423">${t.t3cb}</text>
</svg>`;
}

function securityTrustShield(t) {
return `<svg width="416" height="276" viewBox="0 0 416 276" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${t.aria}">
  <style>
    .bg { fill: #f8fafc; }
    .card { fill: #ffffff; stroke: #e2e8f0; stroke-width: 1; }
    .base { fill: #f1f5f9; stroke: #e2e8f0; stroke-width: 1; }
    .tab1 { fill: #2563eb; } .tab2 { fill: #0ea5e9; } .tab3 { fill: #6366f1; } .tab4 { fill: #8b5cf6; }
    .t { font: 600 10.5px ${FONTS}; fill: #0f172a; }
    .b { font: 400 8px ${FONTS}; fill: #64748b; }
    .tag { font: 600 8px ${FONTS}; letter-spacing: 1px; fill: #2563eb; }
    .num { font: 600 7px ${FONTS}; fill: #ffffff; }
    .bt { font: 600 9px ${FONTS}; fill: #334155; }
    @media (prefers-color-scheme: dark) {
      .bg { fill: #0b0f19; }
      .card { fill: #111827; stroke: #1e293b; }
      .base { fill: #111827; stroke: #1e293b; }
      .t { fill: #f1f5f9; }
      .b { fill: #94a3b8; }
      .tag { fill: #60a5fa; }
      .bt { fill: #cbd5e1; }
    }
  </style>
  <rect class="bg" width="416" height="276" rx="16"/>
  <text class="tag" x="26" y="26">${t.headerTag}</text>
  <text class="b" x="390" y="26" text-anchor="end">${t.headerNote}</text>
  <rect class="card" x="26" y="38" width="364" height="40" rx="10"/>
  <rect class="tab1" x="26" y="38" width="4" height="40" rx="2"/>
  <circle cx="46" cy="58" r="8" class="tab1"/>
  <text class="num" x="46" y="60.5" text-anchor="middle">1</text>
  <text class="t" x="62" y="54">${t.l1t}</text>
  <text class="b" x="62" y="68">${t.l1b}</text>
  <rect class="card" x="26" y="84" width="364" height="40" rx="10"/>
  <rect class="tab2" x="26" y="84" width="4" height="40" rx="2"/>
  <circle cx="46" cy="104" r="8" class="tab2"/>
  <text class="num" x="46" y="106.5" text-anchor="middle">2</text>
  <text class="t" x="62" y="100">${t.l2t}</text>
  <text class="b" x="62" y="114">${t.l2b}</text>
  <rect class="card" x="26" y="130" width="364" height="40" rx="10"/>
  <rect class="tab3" x="26" y="130" width="4" height="40" rx="2"/>
  <circle cx="46" cy="150" r="8" class="tab3"/>
  <text class="num" x="46" y="152.5" text-anchor="middle">3</text>
  <text class="t" x="62" y="146">${t.l3t}</text>
  <text class="b" x="62" y="160">${t.l3b}</text>
  <rect class="card" x="26" y="176" width="364" height="40" rx="10"/>
  <rect class="tab4" x="26" y="176" width="4" height="40" rx="2"/>
  <circle cx="46" cy="196" r="8" class="tab4"/>
  <text class="num" x="46" y="198.5" text-anchor="middle">4</text>
  <text class="t" x="62" y="192">${t.l4t}</text>
  <text class="b" x="62" y="206">${t.l4b}</text>
  <rect class="base" x="26" y="224" width="364" height="34" rx="10"/>
  <text class="bt" x="44" y="245">${t.baseLead}</text>
  <text class="b" x="44" y="245" text-anchor="end" dx="346">${t.baseBody}</text>
</svg>`;
}

function dualNatureScale(t) {
return `<svg width="416" height="276" viewBox="0 0 416 276" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${t.aria}">
  <style>
    .bg { fill: #f8fafc; }
    .card { fill: #ffffff; stroke: #e2e8f0; stroke-width: 1; }
    .hosted { fill: #eff6ff; stroke: #2563eb; stroke-width: 1.2; }
    .self { fill: #ffffff; stroke: #e2e8f0; stroke-width: 1; }
    .base { fill: #f1f5f9; stroke: #e2e8f0; stroke-width: 1; }
    .chip { fill: #f1f5f9; stroke: #e2e8f0; stroke-width: 1; }
    .t { font: 600 10.5px ${FONTS}; fill: #0f172a; }
    .b { font: 400 8px ${FONTS}; fill: #64748b; }
    .tag { font: 600 8px ${FONTS}; letter-spacing: 1px; fill: #2563eb; }
    .tagg { font: 600 8px ${FONTS}; letter-spacing: 1px; fill: #475569; }
    .bt { font: 600 9px ${FONTS}; fill: #334155; }
    .mid { stroke: #cbd5e1; stroke-width: 1; stroke-dasharray: 3 3; }
    @media (prefers-color-scheme: dark) {
      .bg { fill: #0b0f19; }
      .card { fill: #111827; stroke: #1e293b; }
      .hosted { fill: rgba(59,130,246,0.10); stroke: #3b82f6; }
      .self { fill: #111827; stroke: #1e293b; }
      .base { fill: #111827; stroke: #1e293b; }
      .chip { fill: #111827; stroke: #1e293b; }
      .t { fill: #f1f5f9; }
      .b { fill: #94a3b8; }
      .tag { fill: #60a5fa; }
      .tagg { fill: #94a3b8; }
      .bt { fill: #cbd5e1; }
      .mid { stroke: #334155; }
    }
  </style>
  <rect class="bg" width="416" height="276" rx="16"/>
  <text class="tag" x="26" y="26">${t.headerTag}</text>
  <rect class="chip" x="108" y="38" width="200" height="34" rx="10"/>
  <text class="t" x="208" y="53" text-anchor="middle" font-size="9.5">${t.chipTitle}</text>
  <text class="b" x="208" y="66" text-anchor="middle">${t.chipBody}</text>
  <line class="mid" x1="208" y1="72" x2="208" y2="84"/>
  <line class="mid" x1="112" y1="84" x2="304" y2="84"/>
  <line class="mid" x1="112" y1="84" x2="112" y2="94"/>
  <line class="mid" x1="304" y1="84" x2="304" y2="94"/>
  <rect class="hosted" x="26" y="94" width="172" height="112" rx="10"/>
  <text class="tag" x="42" y="114">${t.hTag}</text>
  <text class="t" x="42" y="132" font-size="9.5">mail.epocanvas.com</text>
  <text class="b" x="42" y="148">${t.h1}</text>
  <text class="b" x="42" y="162">${t.h2}</text>
  <text class="b" x="42" y="176">${t.h3}</text>
  <text class="b" x="42" y="190">${t.h4}</text>
  <rect class="self" x="218" y="94" width="172" height="112" rx="10"/>
  <text class="tagg" x="234" y="114">${t.sTag}</text>
  <text class="t" x="234" y="132" font-size="9.5">${t.sTitle}</text>
  <text class="b" x="234" y="148">${t.s1}</text>
  <text class="b" x="234" y="162">${t.s2}</text>
  <text class="b" x="234" y="176">${t.s3}</text>
  <text class="b" x="234" y="190">${t.s4}</text>
  <rect class="base" x="26" y="222" width="364" height="36" rx="10"/>
  <text class="bt" x="44" y="238">${t.baseLead}</text>
  <text class="b" x="44" y="251">${t.baseBody}</text>
</svg>`;
}

function dataSovereigntyExport(t) {
return `<svg width="416" height="276" viewBox="0 0 416 276" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${t.aria}">
  <style>
    .bg { fill: #f8fafc; }
    .card { fill: #ffffff; stroke: #e2e8f0; stroke-width: 1; }
    .base { fill: #f1f5f9; stroke: #e2e8f0; stroke-width: 1; }
    .ico { fill: #eff6ff; stroke: #2563eb; stroke-width: 1; }
    .icod { fill: none; stroke: #2563eb; stroke-width: 1.4; stroke-linecap: round; stroke-linejoin: round; }
    .t { font: 600 10px ${FONTS}; fill: #0f172a; }
    .b { font: 400 8px ${FONTS}; fill: #64748b; }
    .tag { font: 600 8px ${FONTS}; letter-spacing: 1px; fill: #2563eb; }
    .bt { font: 600 9px ${FONTS}; fill: #334155; }
    @media (prefers-color-scheme: dark) {
      .bg { fill: #0b0f19; }
      .card { fill: #111827; stroke: #1e293b; }
      .base { fill: #111827; stroke: #1e293b; }
      .ico { fill: rgba(59,130,246,0.10); stroke: #3b82f6; }
      .icod { stroke: #60a5fa; }
      .t { fill: #f1f5f9; }
      .b { fill: #94a3b8; }
      .tag { fill: #60a5fa; }
      .bt { fill: #cbd5e1; }
    }
  </style>
  <rect class="bg" width="416" height="276" rx="16"/>
  <text class="tag" x="26" y="26">${t.headerTag}</text>
  <text class="b" x="390" y="26" text-anchor="end">${t.headerNote}</text>
  <rect class="card" x="26" y="40" width="112" height="128" rx="10"/>
  <rect class="ico" x="42" y="54" width="26" height="26" rx="8"/>
  <path class="icod" d="M55 60 V72 M51 68.5 L55 72.5 L59 68.5"/>
  <path class="icod" d="M49 76 H61"/>
  <text class="t" x="42" y="96">${t.c1t}</text>
  <text class="b" x="42" y="110">${t.c1a}</text>
  <text class="b" x="42" y="122">${t.c1b}</text>
  <text class="b" x="42" y="134">${t.c1c}</text>
  <rect class="card" x="152" y="40" width="112" height="128" rx="10"/>
  <rect class="ico" x="168" y="54" width="26" height="26" rx="8"/>
  <path class="icod" d="M176 61 H186 M179 61 V59 H183 V61 M178 61 L179 74 H183 L184 61"/>
  <text class="t" x="168" y="96">${t.c2t}</text>
  <text class="b" x="168" y="110">${t.c2a}</text>
  <text class="b" x="168" y="122">${t.c2b}</text>
  <text class="b" x="168" y="134">${t.c2c}</text>
  <rect class="card" x="278" y="40" width="112" height="128" rx="10"/>
  <rect class="ico" x="294" y="54" width="26" height="26" rx="8"/>
  <path class="icod" d="M301 60 H315 L312 64 L315 68 H301 Z M303 68 V74"/>
  <text class="t" x="294" y="96">${t.c3t}</text>
  <text class="b" x="294" y="110">${t.c3a}</text>
  <text class="b" x="294" y="122">${t.c3b}</text>
  <text class="b" x="294" y="134">${t.c3c}</text>
  <rect class="base" x="26" y="184" width="364" height="42" rx="10"/>
  <text class="bt" x="44" y="202">${t.baseLead}</text>
  <text class="b" x="44" y="216">${t.baseBody}</text>
  <text class="b" x="26" y="248">${t.footerNote}</text>
</svg>`;
}

export const builders2 = {
  'key-terms-glossary': keyTermsGlossary,
  'project-architecture': projectArchitecture,
  'anti-tamper-architecture': antiTamperArchitecture,
  'security-trust-shield': securityTrustShield,
  'dual-nature-scale': dualNatureScale,
  'data-sovereignty-export': dataSovereigntyExport,
};
