/**
 * EpoCanvas Mail documentation - Release manifest consistency check.
 * Compares two same-origin manifest records, not document bytes or signatures.
 */
(function () {
  'use strict';

  function getManifestUrl() {
    const prefix = window.location.pathname.startsWith('/epomail/') ? '/epomail' : '';
    return `${prefix}/tamper-proof.json`;
  }

  function getCanonicalDocSlug() {
    // Only the dedicated page has a panel. Do not fetch on other documents.
    const match = window.location.pathname.match(
      /^(?:\/epomail)?\/((?:(?:zh-tw|en|fr|es|nl)\/)?mail\/tamper-proof)\/?$/
    );
    return match ? match[1] : null;
  }

  function isRecord(value) {
    return value !== null && typeof value === 'object' && !Array.isArray(value);
  }

  function validateManifest(manifest, slug) {
    if (!isRecord(manifest) || manifest.algorithm !== 'SHA-256' ||
        !isRecord(manifest.documents) ||
        !Object.prototype.hasOwnProperty.call(manifest.documents, slug) ||
        typeof manifest.gitCommit !== 'string' ||
        ![40, 64].includes(manifest.gitCommit.length) ||
        !/^(?:[a-f0-9]{40}|[a-f0-9]{64})$/i.test(manifest.gitCommit)) {
      throw new Error('Invalid manifest shape or full Git commit');
    }

    const entry = manifest.documents[slug];
    if (!isRecord(entry) || !Object.prototype.hasOwnProperty.call(entry, 'sha256') ||
        typeof entry.sha256 !== 'string' || entry.sha256.length !== 64 ||
        !/^[a-f0-9]{64}$/i.test(entry.sha256)) {
      throw new Error('Missing or invalid document hash');
    }

    // Keep only the fields compared and displayed. Ignore untrusted titles,
    // paths, URLs, short commits and dates; none are authentication evidence.
    return { sha256: entry.sha256, gitCommit: manifest.gitCommit };
  }

  async function fetchManifest(slug, refresh) {
    const url = `${getManifestUrl()}${refresh ? `?t=${Date.now()}` : ''}`;
    const response = await fetch(url, {
      cache: 'no-store',
      mode: 'same-origin',
      redirect: 'error'
    });
    if (!response.ok) throw new Error('Manifest HTTP request failed');
    return validateManifest(await response.json(), slug);
  }

  const I18N = {
    'zh-CN': {
      title: '发布清单一致性检查',
      desc: '比较当前站点两次返回的本页清单记录。不验证页面正文、发布者身份、数字签名或法律合规。',
      docHashLabel: '初次清单中的 SHA-256',
      gitLabel: '初次清单中的 Git 提交（未认证）',
      sourceLabel: '清单来源（当前站点）',
      copyBtn: '复制',
      copySuccess: '已复制',
      copyFail: '复制失败',
      verifyBtn: '检查清单一致性',
      retryBtn: '重新读取清单',
      loading: '正在读取发布清单…',
      ready: '已读取记录，尚未检查一致性。',
      verifying: '正在重新读取并比较清单记录…',
      verifiedSuccess: '清单一致：两次取得的本页条目 SHA-256 与 gitCommit 相同。未验证页面正文、发布者身份、签名或法律合规。',
      verifiedFail: '验证失败：本页条目哈希或 gitCommit 不一致，也可能是发布版本发生了更新。',
      unavailable: '无法验证：清单请求失败或数据无效（网络、HTTP、JSON、条目、哈希或提交号）。未确认一致性。',
      pendingValue: '无有效记录',
      manualTitle: '手动比较源文件（另行操作）',
      manualNote: '须另行核对清单与源文件的来源、版本。以下命令只计算将 CRLF 规范为 LF 后的本地 Markdown 哈希；本面板不执行命令，也不验证文件。',
      fetchComment: '获取站点清单，供手动比较；清单未签名',
      hashComment: '在本地仓库中规范换行并计算源文件 SHA-256'
    },
    'zh-TW': {
      title: '發布清單一致性檢查',
      desc: '比較目前網站兩次傳回的本頁清單紀錄。不驗證頁面正文、發布者身分、數位簽章或法律合規。',
      docHashLabel: '初次清單中的 SHA-256',
      gitLabel: '初次清單中的 Git 提交（未認證）',
      sourceLabel: '清單來源（目前網站）',
      copyBtn: '複製',
      copySuccess: '已複製',
      copyFail: '複製失敗',
      verifyBtn: '檢查清單一致性',
      retryBtn: '重新讀取清單',
      loading: '正在讀取發布清單…',
      ready: '已讀取紀錄，尚未檢查一致性。',
      verifying: '正在重新讀取並比較清單紀錄…',
      verifiedSuccess: '清單一致：兩次取得的本頁項目 SHA-256 與 gitCommit 相同。未驗證頁面正文、發布者身分、簽章或法律合規。',
      verifiedFail: '驗證失敗：本頁項目雜湊或 gitCommit 不一致，也可能是發布版本發生了更新。',
      unavailable: '無法驗證：清單請求失敗或資料無效（網路、HTTP、JSON、項目、雜湊或提交號）。未確認一致性。',
      pendingValue: '無有效紀錄',
      manualTitle: '手動比較原始檔（另行操作）',
      manualNote: '須另行核對清單與原始檔的來源、版本。以下指令只計算將 CRLF 正規化為 LF 後的本機 Markdown 雜湊；本面板不執行指令，也不驗證檔案。',
      fetchComment: '取得網站清單，供手動比較；清單未簽章',
      hashComment: '在本機儲存庫中正規化換行並計算原始檔 SHA-256'
    },
    en: {
      title: 'Release manifest consistency check',
      desc: 'Compares two records for this page returned by the current site. Does not verify page content, publisher identity, digital signatures or legal compliance.',
      docHashLabel: 'SHA-256 in the initial manifest',
      gitLabel: 'Git commit in the initial manifest (unauthenticated)',
      sourceLabel: 'Manifest source (current site)',
      copyBtn: 'Copy',
      copySuccess: 'Copied',
      copyFail: 'Copy failed',
      verifyBtn: 'Check manifest consistency',
      retryBtn: 'Reload manifest',
      loading: 'Loading release manifest…',
      ready: 'Record loaded; consistency not yet checked.',
      verifying: 'Reloading and comparing manifest records…',
      verifiedSuccess: 'Manifest consistent: this page’s entry SHA-256 and gitCommit match across both reads. Page content, publisher identity, signatures and legal compliance were not verified.',
      verifiedFail: 'Verification failed: the entry hash or gitCommit differs. A release update may also cause this difference.',
      unavailable: 'Unable to verify: the manifest request failed or its data is invalid (network, HTTP, JSON, entry, hash or commit). Consistency has not been confirmed.',
      pendingValue: 'No valid record',
      manualTitle: 'Compare source files manually (separate action)',
      manualNote: 'Independently check the source and version of the manifest and files. These commands only hash local Markdown after normalizing CRLF to LF; this panel does not run them or verify files.',
      fetchComment: 'Fetch the site manifest for manual comparison; it is unsigned',
      hashComment: 'Normalize line endings and hash the source file in a local checkout'
    },
    fr: {
      title: 'Contrôle de cohérence du manifeste de publication',
      desc: 'Compare deux enregistrements de cette page renvoyés par le site actuel. Ne vérifie ni le contenu de la page, ni l’identité de l’éditeur, ni les signatures numériques, ni la conformité juridique.',
      docHashLabel: 'SHA-256 du manifeste initial',
      gitLabel: 'Commit Git du manifeste initial (non authentifié)',
      sourceLabel: 'Source du manifeste (site actuel)',
      copyBtn: 'Copier',
      copySuccess: 'Copié',
      copyFail: 'Échec de la copie',
      verifyBtn: 'Contrôler la cohérence du manifeste',
      retryBtn: 'Recharger le manifeste',
      loading: 'Chargement du manifeste de publication…',
      ready: 'Enregistrement chargé ; cohérence non encore contrôlée.',
      verifying: 'Rechargement et comparaison des enregistrements du manifeste…',
      verifiedSuccess: 'Manifeste cohérent : le SHA-256 de l’entrée de cette page et gitCommit sont identiques lors des deux lectures. Le contenu de la page, l’identité de l’éditeur, les signatures et la conformité juridique n’ont pas été vérifiés.',
      verifiedFail: 'Échec de la vérification : le hachage de l’entrée ou gitCommit diffère. Une mise à jour de publication peut aussi expliquer cette différence.',
      unavailable: 'Vérification impossible : échec de la requête ou données du manifeste invalides (réseau, HTTP, JSON, entrée, hachage ou commit). La cohérence n’est pas confirmée.',
      pendingValue: 'Aucun enregistrement valide',
      manualTitle: 'Comparer les fichiers sources manuellement (action distincte)',
      manualNote: 'Vérifiez séparément la provenance et la version du manifeste et des fichiers. Ces commandes calculent uniquement le hachage du Markdown local après conversion de CRLF en LF ; ce panneau ne les exécute pas et ne vérifie pas les fichiers.',
      fetchComment: 'Récupérer le manifeste du site pour une comparaison manuelle ; il n’est pas signé',
      hashComment: 'Normaliser les fins de ligne et hacher le fichier source dans un dépôt local'
    },
    es: {
      title: 'Comprobación de coherencia del manifiesto de publicación',
      desc: 'Compara dos registros de esta página devueltos por el sitio actual. No verifica el contenido de la página, la identidad del editor, las firmas digitales ni el cumplimiento legal.',
      docHashLabel: 'SHA-256 del manifiesto inicial',
      gitLabel: 'Commit Git del manifiesto inicial (sin autenticar)',
      sourceLabel: 'Origen del manifiesto (sitio actual)',
      copyBtn: 'Copiar',
      copySuccess: 'Copiado',
      copyFail: 'Error al copiar',
      verifyBtn: 'Comprobar la coherencia del manifiesto',
      retryBtn: 'Recargar el manifiesto',
      loading: 'Cargando el manifiesto de publicación…',
      ready: 'Registro cargado; coherencia aún no comprobada.',
      verifying: 'Recargando y comparando los registros del manifiesto…',
      verifiedSuccess: 'Manifiesto coherente: el SHA-256 de la entrada de esta página y gitCommit coinciden en ambas lecturas. No se han verificado el contenido de la página, la identidad del editor, las firmas ni el cumplimiento legal.',
      verifiedFail: 'Verificación fallida: el hash de la entrada o gitCommit difiere. Una actualización de la publicación también puede causar esta diferencia.',
      unavailable: 'No se puede verificar: la solicitud ha fallado o los datos del manifiesto no son válidos (red, HTTP, JSON, entrada, hash o commit). No se ha confirmado la coherencia.',
      pendingValue: 'Sin registro válido',
      manualTitle: 'Comparar archivos fuente manualmente (acción aparte)',
      manualNote: 'Compruebe por separado el origen y la versión del manifiesto y los archivos. Estos comandos solo calculan el hash del Markdown local tras convertir CRLF en LF; el panel no los ejecuta ni verifica los archivos.',
      fetchComment: 'Obtener el manifiesto del sitio para compararlo manualmente; no está firmado',
      hashComment: 'Normalizar los saltos de línea y calcular el hash del archivo fuente en un repositorio local'
    },
    nl: {
      title: 'Consistentiecontrole van het publicatiemanifest',
      desc: 'Vergelijkt twee records voor deze pagina die de huidige site terugstuurt. Controleert niet de pagina-inhoud, de identiteit van de uitgever, digitale handtekeningen of wettelijke naleving.',
      docHashLabel: 'SHA-256 in het oorspronkelijke manifest',
      gitLabel: 'Git-commit in het oorspronkelijke manifest (niet geauthenticeerd)',
      sourceLabel: 'Manifestbron (huidige site)',
      copyBtn: 'Kopiëren',
      copySuccess: 'Gekopieerd',
      copyFail: 'Kopiëren mislukt',
      verifyBtn: 'Manifestconsistentie controleren',
      retryBtn: 'Manifest opnieuw laden',
      loading: 'Publicatiemanifest laden…',
      ready: 'Record geladen; consistentie nog niet gecontroleerd.',
      verifying: 'Manifestrecords opnieuw laden en vergelijken…',
      verifiedSuccess: 'Manifest consistent: de SHA-256 van het record voor deze pagina en gitCommit zijn bij beide lezingen gelijk. De pagina-inhoud, identiteit van de uitgever, handtekeningen en wettelijke naleving zijn niet geverifieerd.',
      verifiedFail: 'Verificatie mislukt: de hash van het record of gitCommit verschilt. Dit kan ook door een nieuwe publicatie komen.',
      unavailable: 'Verificatie niet mogelijk: het verzoek is mislukt of de manifestgegevens zijn ongeldig (netwerk, HTTP, JSON, record, hash of commit). De consistentie is niet bevestigd.',
      pendingValue: 'Geen geldig record',
      manualTitle: 'Bronbestanden handmatig vergelijken (afzonderlijke handeling)',
      manualNote: 'Controleer de herkomst en versie van het manifest en de bestanden afzonderlijk. Deze opdrachten hashen alleen lokale Markdown na omzetting van CRLF naar LF; dit paneel voert ze niet uit en verifieert geen bestanden.',
      fetchComment: 'Het sitemanifest ophalen voor handmatige vergelijking; het is niet ondertekend',
      hashComment: 'Regeleinden normaliseren en het bronbestand in een lokale repository hashen'
    }
  };

  function getLangStrings() {
    const lang = (document.documentElement.lang || 'zh-CN').toLowerCase();
    if (lang.startsWith('zh-tw') || lang.startsWith('zh-hant')) return I18N['zh-TW'];
    for (const code of ['en', 'fr', 'es', 'nl']) {
      if (lang === code || lang.startsWith(`${code}-`)) return I18N[code];
    }
    return I18N['zh-CN'];
  }

  function element(tag, className, text) {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined) node.textContent = text;
    return node;
  }

  async function renderTamperProofPanel() {
    const slug = getCanonicalDocSlug();
    const container = document.querySelector('.sl-markdown-content');
    if (!slug || !container || document.getElementById('tamper-proof-widget')) return;

    const t = getLangStrings();
    // A baseline belongs to this panel, not a previous Astro page or locale.
    let baseline = null;
    const widget = element('div', 'tamper-proof-panel');
    widget.id = 'tamper-proof-widget';
    const header = element('div', 'tamper-header');
    const titleRow = element('div', 'tamper-title-row');
    titleRow.appendChild(element('span', 'tamper-title', t.title));
    titleRow.appendChild(element('span', 'tamper-pill', 'HASH RECORD'));
    header.appendChild(titleRow);
    header.appendChild(element('p', 'tamper-desc', t.desc));
    widget.appendChild(header);

    const grid = element('div', 'tamper-grid');
    function recordField(label) {
      const item = element('div', 'tamper-grid-item');
      item.appendChild(element('div', 'tamper-k', label));
      const value = element('div', 'tamper-v mono');
      item.appendChild(value);
      grid.appendChild(item);
      return value;
    }
    const hashField = recordField(t.docHashLabel);
    const hashValue = element('span', '', t.pendingValue);
    hashValue.id = 'doc-sha256-val';
    hashField.appendChild(hashValue);
    const copyBtn = element('button', 'tamper-copy-btn', t.copyBtn);
    copyBtn.id = 'tamper-copy-btn';
    copyBtn.type = 'button';
    copyBtn.title = t.copyBtn;
    copyBtn.disabled = true;
    hashField.appendChild(copyBtn);
    const commitValue = element('span', '', t.pendingValue);
    commitValue.id = 'doc-git-commit-val';
    recordField(t.gitLabel).appendChild(commitValue);
    recordField(t.sourceLabel).appendChild(element('span', '', getManifestUrl()));
    widget.appendChild(grid);

    const actions = element('div', 'tamper-action-row');
    const verifyBtn = element('button', 'tamper-action-btn', t.verifyBtn);
    verifyBtn.id = 'tamper-verify-btn';
    verifyBtn.type = 'button';
    const statusEl = element('span', 'tamper-status');
    statusEl.id = 'tamper-verify-status';
    statusEl.setAttribute('role', 'status');
    statusEl.setAttribute('aria-live', 'polite');
    actions.appendChild(verifyBtn);
    actions.appendChild(statusEl);
    widget.appendChild(actions);

    const manual = element('details', 'tamper-terminal-fold');
    manual.appendChild(element('summary', '', t.manualTitle));
    manual.appendChild(element('p', '', t.manualNote));
    const pre = element('pre', 'tamper-code');
    pre.appendChild(element('code', '', `# ${t.fetchComment}
curl -fsSL https://docs.epocanvas.com/epomail/tamper-proof.json

# ${t.hashComment}
node -e "const fs=require('node:fs'),c=require('node:crypto');console.log(c.createHash('sha256').update(fs.readFileSync('src/content/docs/${slug}.md','utf8').replace(/\\r\\n/g,'\\n'),'utf8').digest('hex'))"`));
    manual.appendChild(pre);
    widget.appendChild(manual);

    // Insert before awaiting fetch, so repeated page-load events cannot duplicate it.
    const firstH2 = container.querySelector('h2');
    if (firstH2) container.insertBefore(widget, firstH2);
    else container.appendChild(widget);

    function setStatus(state, text) {
      statusEl.className = `tamper-status${state ? ` ${state}` : ''}`;
      statusEl.textContent = text;
    }

    async function loadOrCompare(refresh) {
      verifyBtn.disabled = true;
      setStatus('tamper-loading', baseline ? t.verifying : t.loading);
      try {
        const current = await fetchManifest(slug, refresh);
        if (!baseline) {
          // A successful retry after a failed initial load only establishes a
          // baseline; another successful read is required to compare records.
          baseline = current;
          hashValue.textContent = baseline.sha256;
          commitValue.textContent = baseline.gitCommit;
          copyBtn.disabled = false;
          setStatus('', t.ready);
        } else if (current.sha256 === baseline.sha256 && current.gitCommit === baseline.gitCommit) {
          setStatus('tamper-success', t.verifiedSuccess);
        } else {
          setStatus('tamper-fail', t.verifiedFail);
        }
      } catch {
        // Network, HTTP, parse and validation failures must never imply success.
        setStatus('tamper-fail', t.unavailable);
      } finally {
        verifyBtn.textContent = baseline ? t.verifyBtn : t.retryBtn;
        verifyBtn.disabled = false;
      }
    }

    copyBtn.addEventListener('click', async () => {
      if (!baseline) return;
      try {
        await navigator.clipboard.writeText(baseline.sha256);
        copyBtn.textContent = t.copySuccess;
      } catch {
        copyBtn.textContent = t.copyFail;
      }
    });
    verifyBtn.addEventListener('click', () => {
      if (!verifyBtn.disabled) return loadOrCompare(true);
    });
    await loadOrCompare(false);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', renderTamperProofPanel);
  } else {
    renderTamperProofPanel();
  }
  document.addEventListener('astro:page-load', renderTamperProofPanel);
})();
