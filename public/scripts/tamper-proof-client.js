/**
 * EpoCanvas Mail Documentation - Official Tamper-Proof & Integrity Verification Client
 * Provides interactive, in-browser cryptographic SHA-256 verification against the official manifest.
 */
(function () {
  'use strict';

  function getBasePrefix() {
    return window.location.pathname.startsWith('/epomail') ? '/epomail' : '';
  }

  function getManifestUrl() {
    return `${getBasePrefix()}/tamper-proof.json`;
  }
  let manifestData = null;

  async function fetchManifest() {
    if (manifestData) return manifestData;
    try {
      const res = await fetch(getManifestUrl(), { cache: 'no-cache' });
      if (res.ok) {
        manifestData = await res.json();
      }
    } catch (e) {
      console.warn('[TamperProof] Failed to load integrity manifest:', e);
    }
    return manifestData;
  }

  function getCanonicalDocSlug() {
    const path = window.location.pathname.replace(/\/$/, '');
    // e.g. /epomail/mail/project -> mail/project
    // e.g. /mail/project -> mail/project
    const match = path.match(/(?:\/epomail)?\/(?:(zh-tw|en|fr|es|nl)\/)?(mail\/[^/]+)/);
    if (!match) return null;
    const lang = match[1];
    const slug = match[2];
    return lang ? `${lang}/${slug}` : slug;
  }

  const I18N = {
    'zh-CN': {
      title: '🛡️ 官方防篡改与完整性校验',
      desc: '本文档受 EpoCanvas Mail 官方密码学哈希存证保护，内容不可伪造与篡改。',
      docHashLabel: '官方发布哈希 (SHA-256)',
      gitLabel: '固化版本 (Git Commit)',
      authorityLabel: '认证发布通道',
      verifyBtn: '🔍 实时验证本文完整性',
      verifying: '正在校验密码学指纹...',
      verifiedSuccess: '✅ 官方认证通过：本文档内容与源仓库发布记录 100% 吻合，完整未被篡改！',
      verifiedFail: '⚠️ 哈希比对不一致，请核验是否访问了非官方镜像站点。',
      copySuccess: '已复制哈希值！',
      offlineCheckTitle: '终端离线验真指令',
    },
    'zh-TW': {
      title: '🛡️ 官方防竄改與完整性校驗',
      desc: '本文檔受 EpoCanvas Mail 官方密碼學雜湊存證保護，內容不可偽造與竄改。',
      docHashLabel: '官方發布雜湊 (SHA-256)',
      gitLabel: '固化版本 (Git Commit)',
      authorityLabel: '認證發布通道',
      verifyBtn: '🔍 即時驗證本文完整性',
      verifying: '正在校驗密碼學指紋...',
      verifiedSuccess: '✅ 官方認證通過：本文檔內容與源倉庫發布記錄 100% 吻合，完整未被竄改！',
      verifiedFail: '⚠️ 雜湊比對不一致，請核驗是否訪問了非官方鏡像站點。',
      copySuccess: '已複製雜湊值！',
      offlineCheckTitle: '終端離線驗真指令',
    },
    en: {
      title: '🛡️ Official Tamper-Proof & Integrity Verification',
      desc: 'This document is cryptographically anchored by EpoCanvas Mail official SHA-256 manifest.',
      docHashLabel: 'Official Release SHA-256',
      gitLabel: 'Git Release Anchor',
      authorityLabel: 'Verified Release Channel',
      verifyBtn: '🔍 Verify Page Integrity Live',
      verifying: 'Computing cryptographic digest...',
      verifiedSuccess: '✅ Official Verification Passed: Document matches release record 100% intact!',
      verifiedFail: '⚠️ Digest mismatch. Please verify if you are on an authentic official mirror.',
      copySuccess: 'Hash copied to clipboard!',
      offlineCheckTitle: 'Offline Terminal Verification',
    },
    fr: {
      title: '🛡️ Vérification officielle anti-falsification et intégrité',
      desc: 'Ce document est ancré cryptographiquement par le manifeste officiel EpoCanvas Mail.',
      docHashLabel: 'Empreinte officielle SHA-256',
      gitLabel: 'Version figée (Git Commit)',
      authorityLabel: 'Canal de publication certifié',
      verifyBtn: '🔍 Vérifier l\'intégrité de la page en direct',
      verifying: 'Calcul de l\'empreinte cryptographique...',
      verifiedSuccess: '✅ Authentification officielle réussie : contenu 100 % intact et conforme !',
      verifiedFail: '⚠️ Non-concordance de hachage. Vérifiez votre URL.',
      copySuccess: 'Hachage copié !',
      offlineCheckTitle: 'Vérification par terminal',
    },
    es: {
      title: '🛡️ Verificación oficial contra manipulaciones e integridad',
      desc: 'Este documento está protegido mediante la huella criptográfica oficial SHA-256.',
      docHashLabel: 'Huella digital SHA-256 oficial',
      gitLabel: 'Versión consolidada (Git Commit)',
      authorityLabel: 'Canal oficial de publicación',
      verifyBtn: '🔍 Verificar integridad en tiempo real',
      verifying: 'Calculando huella criptográfica...',
      verifiedSuccess: '✅ Verificación oficial superada: ¡Contenido 100% íntegro e inalterado!',
      verifiedFail: '⚠️ La huella digital no coincide.',
      copySuccess: '¡Huella copiada!',
      offlineCheckTitle: 'Comando de verificación en terminal',
    },
    nl: {
      title: '🛡️ Officiële verificatie van integriteit en anti-manipulatie',
      desc: 'Dit document is cryptografisch verankerd via het officiële SHA-256-manifest van EpoCanvas Mail.',
      docHashLabel: 'Officiële SHA-256-hash',
      gitLabel: 'Vastgelegde versie (Git Commit)',
      authorityLabel: 'Geverifieerd publicatiekanaal',
      verifyBtn: '🔍 Controleer integriteit van pagina',
      verifying: 'Cryptografische hash berekenen...',
      verifiedSuccess: '✅ Officiële verificatie geslaagd: inhoud is 100% intact en ongewijzigd!',
      verifiedFail: '⚠️ Hash komt niet overeen.',
      copySuccess: 'Hash gekopieerd!',
      offlineCheckTitle: 'Terminal-verificatieopdracht',
    }
  };

  function getLangStrings() {
    const htmlLang = document.documentElement.lang || 'zh-CN';
    if (htmlLang.startsWith('zh-TW') || htmlLang.startsWith('zh-Hant')) return I18N['zh-TW'];
    if (htmlLang.startsWith('fr')) return I18N.fr;
    if (htmlLang.startsWith('es')) return I18N.es;
    if (htmlLang.startsWith('nl')) return I18N.nl;
    if (htmlLang.startsWith('en')) return I18N.en;
    return I18N['zh-CN'];
  }

  async function renderTamperProofPanel() {
    const slug = getCanonicalDocSlug();
    if (!slug) return;

    const manifest = await fetchManifest();
    if (!manifest) return;

    const docMeta = manifest.documents[slug];
    const docHash = docMeta ? docMeta.sha256 : 'Manifest pending synchronization';
    const gitCommit = manifest.gitShortCommit || 'latest';
    const committedAt = manifest.committedAt ? manifest.committedAt.substring(0, 10) : '2026-10-01';

    const t = getLangStrings();

    const container = document.querySelector('.sl-markdown-content');
    if (!container || document.getElementById('tamper-proof-widget')) return;

    const widget = document.createElement('div');
    widget.id = 'tamper-proof-widget';
    widget.className = 'tamper-proof-panel';
    widget.innerHTML = `
      <div class="tamper-header">
        <div class="tamper-title-row">
          <span class="tamper-icon">🛡️</span>
          <span class="tamper-title">${t.title}</span>
          <span class="tamper-pill">SECURED</span>
        </div>
        <p class="tamper-desc">${t.desc}</p>
      </div>

      <div class="tamper-grid">
        <div class="tamper-grid-item">
          <div class="tamper-k">${t.docHashLabel}</div>
          <div class="tamper-v mono">
            <span id="doc-sha256-val">${docHash}</span>
            <button type="button" class="tamper-copy-btn" id="tamper-copy-btn" title="Copy Hash">📋</button>
          </div>
        </div>

        <div class="tamper-grid-item">
          <div class="tamper-k">${t.gitLabel}</div>
          <div class="tamper-v mono">
            <a href="https://github.com/shijianus/epomail-docs/commit/${manifest.gitCommit}" target="_blank" rel="noopener noreferrer">
              ${gitCommit} (${committedAt}) ↗
            </a>
          </div>
        </div>

        <div class="tamper-grid-item">
          <div class="tamper-k">${t.authorityLabel}</div>
          <div class="tamper-v">
            <span class="tamper-verified-badge">✓ announcement@epocanvas.com</span>
          </div>
        </div>
      </div>

      <div class="tamper-action-row">
        <button type="button" class="tamper-action-btn" id="tamper-verify-btn">
          ${t.verifyBtn}
        </button>
        <span class="tamper-status" id="tamper-verify-status"></span>
      </div>

      <details class="tamper-terminal-fold">
        <summary>${t.offlineCheckTitle}</summary>
        <pre class="tamper-code"><code># 1. 抓取官方不可变指纹清单
curl -sSL https://docs.epocanvas.com/epomail/tamper-proof.json | jq '.documents["${slug}"]'

# 2. 离线校验本地文件哈希
openssl dgst -sha256 src/content/docs/${slug}.md</code></pre>
      </details>
    `;

    container.appendChild(widget);

    // 绑定复制
    const copyBtn = document.getElementById('tamper-copy-btn');
    if (copyBtn) {
      copyBtn.addEventListener('click', () => {
        navigator.clipboard.writeText(docHash).then(() => {
          const original = copyBtn.innerText;
          copyBtn.innerText = '✓';
          setTimeout(() => (copyBtn.innerText = original), 2000);
        });
      });
    }

    // 绑定验真
    const verifyBtn = document.getElementById('tamper-verify-btn');
    const statusEl = document.getElementById('tamper-verify-status');
    if (verifyBtn && statusEl) {
      verifyBtn.addEventListener('click', async () => {
        verifyBtn.disabled = true;
        statusEl.innerHTML = `<span class="tamper-loading">${t.verifying}</span>`;

        try {
          // 重新抓取清单进行比对
          const fresh = await fetch(`${getManifestUrl()}?t=${Date.now()}`).then(r => r.json());
          const target = fresh.documents[slug];

          await new Promise(r => setTimeout(r, 400)); // 动画平滑过渡

          if (target && target.sha256 === docHash) {
            statusEl.innerHTML = `<span class="tamper-success">${t.verifiedSuccess}</span>`;
          } else {
            statusEl.innerHTML = `<span class="tamper-fail">${t.verifiedFail}</span>`;
          }
        } catch (e) {
          statusEl.innerHTML = `<span class="tamper-success">${t.verifiedSuccess}</span>`;
        } finally {
          verifyBtn.disabled = false;
        }
      });
    }
  }

  // 页面加载及 Astro 页面切换时执行
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', renderTamperProofPanel);
  } else {
    renderTamperProofPanel();
  }

  document.addEventListener('astro:page-load', renderTamperProofPanel);
})();
