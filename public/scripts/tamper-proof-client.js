/** Source-file SHA-256 comparison. A matching digest is not a signature or a compliance certification. */
export const I18N = {
  'zh-CN': {
    title: '源文件完整性对照',
    desc: '在本机计算所选 Markdown 文件的 SHA-256，与本次加载的清单对照。仅把 CRLF 换行转为 LF，再按 UTF-8 计算；文件不会上传。结果不验证网页内容、发布者身份或法律合规。',
    hashLabel: '清单中的文件 SHA-256', gitLabel: '生成清单时的 Git HEAD 参考', generatedLabel: '清单生成时间', pathLabel: '清单中的源文件路径',
    headDirty: '生成清单时文档工作区有未提交或未跟踪内容；文件哈希不能归属于此 HEAD 的已提交版本。HEAD 的日期不是本页的发布日期。',
    headClean: '生成清单时未检测到文档工作区差异。HEAD 仅为仓库参考，不代表发布认证；其日期不是本页的发布日期。',
    headUnknown: '此清单未记录可确认的文档工作区状态；不能据此认定文件与 HEAD 一致。HEAD 的日期不是本页的发布日期。',
    missing: '未记录', copy: '复制哈希', copySuccess: '哈希已复制。', copyFail: '无法复制，请手动选择哈希。',
    fileLabel: '选择本机 Markdown 源文件', fileHint: '本地对照，不上传文件；请选择上方路径对应的源文件。',
    verifyBtn: '计算并对照文件', verifying: '正在计算文件 SHA-256…',
    verifiedSuccess: '文件哈希与本次加载的清单一致；不代表网页、发布者或合规已获认证。',
    verifiedFail: '文件哈希不一致。可能是文件版本、内容或清单不同，不能仅据此认定篡改。',
    fileRequired: '请先选择要对照的文件。', verifyUnavailable: '无法完成计算，请使用支持 Web Crypto 的安全浏览器环境并确认文件可读取。',
    manifestUnavailable: '清单或此文件的记录不可用，尚未完成对照。',
    offlineTitle: '命令行对照', offlineHint: '在文档仓库根目录运行。先统一 CRLF 为 LF；不要直接对 CRLF 原始字节运行 sha256sum。', manifestLink: '查看本次对照的清单来源',
  },
  'zh-TW': {
    title: '原始檔完整性比對',
    desc: '在本機計算所選 Markdown 檔案的 SHA-256，與本次載入的清單比對。僅把 CRLF 換行轉為 LF，再按 UTF-8 計算；檔案不會上傳。結果不驗證網頁內容、發布者身分或法律合規。',
    hashLabel: '清單中的檔案 SHA-256', gitLabel: '產生清單時的 Git HEAD 參考', generatedLabel: '清單產生時間', pathLabel: '清單中的原始檔路徑',
    headDirty: '產生清單時文件工作區有未提交或未追蹤內容；檔案雜湊不能歸屬於此 HEAD 的已提交版本。HEAD 的日期不是本頁的發布日期。',
    headClean: '產生清單時未偵測到文件工作區差異。HEAD 僅為儲存庫參考，不代表發布認證；其日期不是本頁的發布日期。',
    headUnknown: '此清單未記錄可確認的文件工作區狀態；不能據此認定檔案與 HEAD 一致。HEAD 的日期不是本頁的發布日期。',
    missing: '未記錄', copy: '複製雜湊', copySuccess: '雜湊已複製。', copyFail: '無法複製，請手動選取雜湊。',
    fileLabel: '選擇本機 Markdown 原始檔', fileHint: '本機比對，不上傳檔案；請選擇上方路徑對應的原始檔。',
    verifyBtn: '計算並比對檔案', verifying: '正在計算檔案 SHA-256…',
    verifiedSuccess: '檔案雜湊與本次載入的清單一致；不代表網頁、發布者或合規已獲認證。',
    verifiedFail: '檔案雜湊不一致。可能是檔案版本、內容或清單不同，不能僅據此認定竄改。',
    fileRequired: '請先選擇要比對的檔案。', verifyUnavailable: '無法完成計算，請使用支援 Web Crypto 的安全瀏覽器環境並確認檔案可讀取。',
    manifestUnavailable: '清單或此檔案的紀錄無法使用，尚未完成比對。',
    offlineTitle: '命令列比對', offlineHint: '在文件儲存庫根目錄執行。先統一 CRLF 為 LF；不要直接對 CRLF 原始位元組執行 sha256sum。', manifestLink: '查看本次比對的清單來源',
  },
  en: {
    title: 'Source-file integrity comparison',
    desc: 'Calculate SHA-256 for a local Markdown file and compare it with the loaded manifest. Only CRLF line endings are converted to LF before UTF-8 hashing. No file is uploaded. This does not verify the web page, publisher identity or legal compliance.',
    hashLabel: 'File SHA-256 in manifest', gitLabel: 'Reference Git HEAD at generation', generatedLabel: 'Manifest generated at', pathLabel: 'Source path in manifest',
    headDirty: 'The documentation working tree had uncommitted or untracked content when this manifest was generated. These hashes cannot be attributed to the committed HEAD version. The HEAD date is not this page’s publication date.',
    headClean: 'No documentation working-tree changes were detected at generation. HEAD is a repository reference, not release certification; its date is not this page’s publication date.',
    headUnknown: 'This manifest does not establish the documentation working-tree state or a match with HEAD. The HEAD date is not this page’s publication date.',
    missing: 'Not recorded', copy: 'Copy hash', copySuccess: 'Hash copied.', copyFail: 'Could not copy. Select the hash manually.',
    fileLabel: 'Choose a local Markdown source file', fileHint: 'Local comparison only; no upload. Choose the source file at the path above.',
    verifyBtn: 'Calculate and compare file', verifying: 'Calculating file SHA-256…',
    verifiedSuccess: 'The file hash matches the loaded manifest. This does not certify the web page, publisher or compliance.',
    verifiedFail: 'The file hash differs. The file version, content or manifest may differ; this alone does not establish tampering.',
    fileRequired: 'Choose a file to compare first.', verifyUnavailable: 'Calculation could not be completed. Use a secure browser context with Web Crypto and a readable file.',
    manifestUnavailable: 'The manifest or file record is unavailable. No comparison has been completed.',
    offlineTitle: 'Command-line comparison', offlineHint: 'Run at the documentation repository root. Normalize CRLF to LF first; do not run sha256sum directly on raw CRLF bytes.', manifestLink: 'View the manifest source for this comparison',
  },
  fr: {
    title: 'Comparaison de l’intégrité du fichier source',
    desc: 'Calculez le SHA-256 d’un fichier Markdown local et comparez-le au manifeste chargé. Seules les fins de ligne CRLF sont converties en LF avant le calcul en UTF-8. Aucun fichier n’est envoyé. Cela ne vérifie ni la page web, ni l’identité de l’éditeur, ni la conformité juridique.',
    hashLabel: 'SHA-256 du fichier dans le manifeste', gitLabel: 'Référence Git HEAD lors de la génération', generatedLabel: 'Date de génération du manifeste', pathLabel: 'Chemin source dans le manifeste',
    headDirty: 'Des contenus non validés ou non suivis existaient dans les documents lors de la génération. Ces empreintes ne peuvent pas être attribuées à la version validée de HEAD. La date de HEAD n’est pas la date de publication de cette page.',
    headClean: 'Aucune modification locale des documents n’a été détectée lors de la génération. HEAD est une référence du dépôt, pas une certification de publication ; sa date n’est pas celle de publication de cette page.',
    headUnknown: 'Ce manifeste n’établit ni l’état local des documents ni leur correspondance avec HEAD. La date de HEAD n’est pas la date de publication de cette page.',
    missing: 'Non enregistré', copy: 'Copier l’empreinte', copySuccess: 'Empreinte copiée.', copyFail: 'Copie impossible. Sélectionnez l’empreinte manuellement.',
    fileLabel: 'Choisir un fichier source Markdown local', fileHint: 'Comparaison locale, sans envoi. Choisissez le fichier source indiqué ci-dessus.',
    verifyBtn: 'Calculer et comparer le fichier', verifying: 'Calcul du SHA-256 du fichier…',
    verifiedSuccess: 'L’empreinte correspond au manifeste chargé. Cela ne certifie ni la page web, ni l’éditeur, ni la conformité.',
    verifiedFail: 'L’empreinte diffère. La version, le contenu ou le manifeste peuvent différer ; cela ne suffit pas à établir une falsification.',
    fileRequired: 'Choisissez d’abord un fichier à comparer.', verifyUnavailable: 'Calcul impossible. Utilisez un contexte sécurisé prenant en charge Web Crypto et un fichier lisible.',
    manifestUnavailable: 'Le manifeste ou l’entrée du fichier est indisponible. Aucune comparaison n’a été effectuée.',
    offlineTitle: 'Comparaison en ligne de commande', offlineHint: 'Exécutez à la racine du dépôt documentaire. Convertissez CRLF en LF avant le calcul ; n’utilisez pas sha256sum directement sur les octets CRLF.', manifestLink: 'Voir la source du manifeste de cette comparaison',
  },
  es: {
    title: 'Comparación de integridad del archivo fuente',
    desc: 'Calcula el SHA-256 de un archivo Markdown local y compáralo con el manifiesto cargado. Solo se convierten los saltos CRLF a LF antes del cálculo en UTF-8. No se sube ningún archivo. Esto no verifica la página web, la identidad del editor ni el cumplimiento legal.',
    hashLabel: 'SHA-256 del archivo en el manifiesto', gitLabel: 'Referencia Git HEAD al generar', generatedLabel: 'Fecha de generación del manifiesto', pathLabel: 'Ruta fuente en el manifiesto',
    headDirty: 'Había contenido documental sin confirmar o sin seguimiento al generar el manifiesto. Estas huellas no pueden atribuirse a la versión confirmada de HEAD. La fecha de HEAD no es la fecha de publicación de esta página.',
    headClean: 'No se detectaron cambios locales en los documentos al generar el manifiesto. HEAD es una referencia del repositorio, no una certificación de publicación; su fecha no es la de publicación de esta página.',
    headUnknown: 'Este manifiesto no acredita el estado local de los documentos ni su coincidencia con HEAD. La fecha de HEAD no es la fecha de publicación de esta página.',
    missing: 'No registrado', copy: 'Copiar huella', copySuccess: 'Huella copiada.', copyFail: 'No se pudo copiar. Selecciona la huella manualmente.',
    fileLabel: 'Elegir un archivo fuente Markdown local', fileHint: 'Comparación local, sin subida. Elige el archivo fuente de la ruta indicada arriba.',
    verifyBtn: 'Calcular y comparar archivo', verifying: 'Calculando el SHA-256 del archivo…',
    verifiedSuccess: 'La huella coincide con el manifiesto cargado. Esto no certifica la página web, el editor ni el cumplimiento legal.',
    verifiedFail: 'La huella no coincide. Puede variar la versión, el contenido o el manifiesto; esto por sí solo no demuestra manipulación.',
    fileRequired: 'Elige primero un archivo para comparar.', verifyUnavailable: 'No se pudo completar el cálculo. Usa un contexto seguro con Web Crypto y un archivo legible.',
    manifestUnavailable: 'El manifiesto o el registro del archivo no está disponible. No se ha completado ninguna comparación.',
    offlineTitle: 'Comparación por línea de comandos', offlineHint: 'Ejecuta desde la raíz del repositorio documental. Convierte CRLF a LF antes del cálculo; no ejecutes sha256sum directamente sobre bytes CRLF.', manifestLink: 'Ver la fuente del manifiesto de esta comparación',
  },
  nl: {
    title: 'Integriteit van bronbestand vergelijken',
    desc: 'Bereken SHA-256 van een lokaal Markdown-bestand en vergelijk die met het geladen manifest. Alleen CRLF-regeleinden worden vóór de UTF-8-berekening omgezet naar LF. Er wordt niets geüpload. Dit verifieert niet de webpagina, de uitgever of juridische naleving.',
    hashLabel: 'SHA-256 van bestand in manifest', gitLabel: 'Git HEAD-referentie bij generatie', generatedLabel: 'Manifest gegenereerd op', pathLabel: 'Bronpad in manifest',
    headDirty: 'Bij het genereren waren er niet-gecommitte of niet-gevolgde documenten. Deze hashes kunnen niet aan de gecommitte HEAD-versie worden toegeschreven. De HEAD-datum is niet de publicatiedatum van deze pagina.',
    headClean: 'Bij het genereren zijn geen lokale documentwijzigingen gevonden. HEAD is een repositoryreferentie, geen publicatiecertificering; de datum is niet de publicatiedatum van deze pagina.',
    headUnknown: 'Dit manifest bevestigt niet de lokale documentstatus of overeenstemming met HEAD. De HEAD-datum is niet de publicatiedatum van deze pagina.',
    missing: 'Niet vastgelegd', copy: 'Hash kopiëren', copySuccess: 'Hash gekopieerd.', copyFail: 'Kopiëren mislukt. Selecteer de hash handmatig.',
    fileLabel: 'Kies een lokaal Markdown-bronbestand', fileHint: 'Alleen lokaal vergelijken, geen upload. Kies het bronbestand op het bovenstaande pad.',
    verifyBtn: 'Bestand berekenen en vergelijken', verifying: 'SHA-256 van bestand berekenen…',
    verifiedSuccess: 'De bestandshash komt overeen met het geladen manifest. Dit certificeert niet de webpagina, uitgever of naleving.',
    verifiedFail: 'De bestandshash wijkt af. De versie, inhoud of het manifest kan verschillen; dit bewijst op zichzelf geen manipulatie.',
    fileRequired: 'Kies eerst een bestand om te vergelijken.', verifyUnavailable: 'Berekenen is niet gelukt. Gebruik een veilige browsercontext met Web Crypto en een leesbaar bestand.',
    manifestUnavailable: 'Het manifest of de bestandsvermelding is niet beschikbaar. Er is geen vergelijking voltooid.',
    offlineTitle: 'Vergelijken via de opdrachtregel', offlineHint: 'Voer uit in de hoofdmap van de documentatierepository. Zet CRLF eerst om naar LF; voer sha256sum niet rechtstreeks uit op CRLF-bytes.', manifestLink: 'Bekijk de manifestbron voor deze vergelijking',
  },
  de: {
    title: 'Integritätsvergleich der Quelldatei',
    desc: 'Berechnen Sie SHA-256 für eine lokale Markdown-Datei und vergleichen Sie den Wert mit dem geladenen Manifest. Nur CRLF-Zeilenenden werden vor der UTF-8-Berechnung in LF umgewandelt. Es wird keine Datei hochgeladen. Dies prüft weder die Webseite noch die Identität des Herausgebers oder die Rechtskonformität.',
    hashLabel: 'Datei-SHA-256 im Manifest', gitLabel: 'Git-HEAD-Referenz bei der Erstellung', generatedLabel: 'Erstellungszeit des Manifests', pathLabel: 'Quellpfad im Manifest',
    headDirty: 'Bei der Erstellung gab es nicht committete oder nicht erfasste Dokumentinhalte. Diese Hashes können nicht der committeten HEAD-Version zugeordnet werden. Das HEAD-Datum ist nicht das Veröffentlichungsdatum dieser Seite.',
    headClean: 'Bei der Erstellung wurden keine lokalen Dokumentänderungen erkannt. HEAD ist eine Repository-Referenz, keine Veröffentlichungszertifizierung; das Datum ist nicht das Veröffentlichungsdatum dieser Seite.',
    headUnknown: 'Dieses Manifest belegt weder den lokalen Dokumentstatus noch die Übereinstimmung mit HEAD. Das HEAD-Datum ist nicht das Veröffentlichungsdatum dieser Seite.',
    missing: 'Nicht erfasst', copy: 'Hash kopieren', copySuccess: 'Hash kopiert.', copyFail: 'Kopieren fehlgeschlagen. Wählen Sie den Hash manuell aus.',
    fileLabel: 'Lokale Markdown-Quelldatei auswählen', fileHint: 'Nur lokaler Vergleich, kein Upload. Wählen Sie die Quelldatei unter dem oben genannten Pfad.',
    verifyBtn: 'Datei berechnen und vergleichen', verifying: 'Datei-SHA-256 wird berechnet…',
    verifiedSuccess: 'Der Datei-Hash stimmt mit dem geladenen Manifest überein. Dies zertifiziert weder die Webseite noch den Herausgeber oder die Rechtskonformität.',
    verifiedFail: 'Der Datei-Hash weicht ab. Version, Inhalt oder Manifest können sich unterscheiden; allein daraus folgt keine Manipulation.',
    fileRequired: 'Wählen Sie zuerst eine Datei zum Vergleich aus.', verifyUnavailable: 'Die Berechnung konnte nicht abgeschlossen werden. Verwenden Sie einen sicheren Browserkontext mit Web Crypto und eine lesbare Datei.',
    manifestUnavailable: 'Das Manifest oder der Dateieintrag ist nicht verfügbar. Es wurde kein Vergleich abgeschlossen.',
    offlineTitle: 'Vergleich über die Befehlszeile', offlineHint: 'Im Stammverzeichnis des Dokumentations-Repositorys ausführen. Zuerst CRLF in LF umwandeln; sha256sum nicht direkt auf CRLF-Bytes anwenden.', manifestLink: 'Manifestquelle für diesen Vergleich anzeigen',
  },
};

export function getCanonicalDocSlug(pathname) {
  const match = pathname.match(/^(?:\/epomail)?\/(?:(zh-tw|en|fr|es|nl|de)\/)?(mail\/[a-z0-9-]+)\/?$/);
  return match ? (match[1] ? `${match[1]}/${match[2]}` : match[2]) : null;
}

export function getLangStrings(lang = 'zh-CN') {
  if (/^zh-(tw|hant)(-|$)/i.test(lang)) return I18N['zh-TW'];
  return I18N[lang.toLowerCase().split('-')[0]] || I18N['zh-CN'];
}

export function getDocMeta(manifest, slug) {
  const meta = manifest?.documents?.[slug];
  const knownNormalization = manifest?.normalization === 'utf8-lf' || (manifest?.specVersion === '1.0.0' && manifest.normalization == null);
  if (manifest?.algorithm !== 'SHA-256' || !knownNormalization || !/^[a-f0-9]{64}$/i.test(meta?.sha256 || '')) return null;
  if (meta.path !== `src/content/docs/${slug}.md` && meta.path !== `src/content/docs/${slug}.mdx`) return null;
  return meta;
}

export function headState(manifest) {
  if (manifest?.contentSource !== 'working-tree') return 'headUnknown';
  if (manifest.documentsWorkingTreeDirty === true) return 'headDirty';
  if (manifest.documentsWorkingTreeDirty === false) return 'headClean';
  return 'headUnknown';
}

export async function hashMarkdownFile(file, subtle = globalThis.crypto?.subtle) {
  if (!file || !subtle) throw new Error('File or Web Crypto unavailable');
  // Preserve a UTF-8 BOM, if present, just as the generator's readFileSync does.
  const text = new TextDecoder('utf-8', { fatal: true, ignoreBOM: true }).decode(await file.arrayBuffer());
  const bytes = new TextEncoder().encode(text.replace(/\r\n/g, '\n'));
  const digest = await subtle.digest('SHA-256', bytes);
  return Array.from(new Uint8Array(digest), (byte) => byte.toString(16).padStart(2, '0')).join('');
}

export async function compareMarkdownFile(file, expectedHash, subtle = globalThis.crypto?.subtle) {
  if (!/^[a-f0-9]{64}$/i.test(expectedHash || '')) throw new Error('Invalid manifest hash');
  return (await hashMarkdownFile(file, subtle)) === expectedHash.toLowerCase();
}

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char]);
}

function recordedDate(value, missing) {
  return typeof value === 'string' && !Number.isNaN(Date.parse(value)) ? value : missing;
}

export async function fetchManifest(url, fetcher = globalThis.fetch) {
  const response = await fetcher(url, { cache: 'no-cache' });
  if (!response.ok) throw new Error(`Manifest HTTP ${response.status}`);
  return response.json();
}

export async function renderTamperProofPanel() {
  const slug = getCanonicalDocSlug(window.location.pathname);
  // One panel on its dedicated page only. No badge or manifest fetch on legal pages.
  if (!slug || !slug.endsWith('mail/tamper-proof')) return;
  const container = document.querySelector('.sl-markdown-content');
  if (!container || document.getElementById('tamper-proof-widget')) return;
  const prefix = /^\/epomail(?:\/|$)/.test(window.location.pathname) ? '/epomail' : '';
  const manifestUrl = `${prefix}/tamper-proof.json`;
  let manifest = null;
  try {
    manifest = await fetchManifest(manifestUrl);
  } catch {
    // Render an unavailable state, never success or fabricated metadata.
  }
  if (getCanonicalDocSlug(window.location.pathname) !== slug || !container.isConnected || document.getElementById('tamper-proof-widget')) return;

  const t = getLangStrings(document.documentElement.lang);
  const meta = getDocMeta(manifest, slug);
  const commit = /^(?:[a-f0-9]{40}|[a-f0-9]{64})$/i.test(manifest?.gitCommit || '') ? manifest.gitCommit : null;
  const commitText = commit ? `${commit} (${recordedDate(manifest.committedAt, t.missing)})` : t.missing;
  const widget = document.createElement('section');
  widget.id = 'tamper-proof-widget';
  widget.className = 'tamper-proof-panel not-content';
  widget.setAttribute('aria-labelledby', 'tamper-proof-title');
  widget.innerHTML = `
    <div class="tamper-title-row">
      <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="M6 3h8l4 4v14H6zM14 3v4h4M9 11h6M9 15h6"/></svg>
      <h2 class="tamper-title" id="tamper-proof-title">${t.title}</h2>
    </div>
    <p class="tamper-desc">${t.desc}</p>
    <p class="tamper-boundary">${t[headState(manifest)]}</p>
    <dl class="tamper-grid">
      <div class="tamper-grid-item"><dt class="tamper-k">${t.hashLabel}</dt><dd class="tamper-v mono"><span id="doc-sha256-val">${escapeHtml(meta?.sha256 || t.missing)}</span><br/><button type="button" class="tamper-copy-btn" id="tamper-copy-btn" ${meta ? '' : 'disabled'}>${t.copy}</button></dd></div>
      <div class="tamper-grid-item"><dt class="tamper-k">${t.gitLabel}</dt><dd class="tamper-v mono">${escapeHtml(commitText)}</dd></div>
      <div class="tamper-grid-item"><dt class="tamper-k">${t.generatedLabel}</dt><dd class="tamper-v">${escapeHtml(recordedDate(manifest?.generatedAt, t.missing))}</dd></div>
      <div class="tamper-grid-item"><dt class="tamper-k">${t.pathLabel}</dt><dd class="tamper-v mono">${escapeHtml(meta?.path || t.missing)}</dd></div>
    </dl>
    <label class="tamper-file-label" for="tamper-file-input">${t.fileLabel}</label>
    <input class="tamper-file-input" id="tamper-file-input" type="file" accept=".md,.mdx,text/markdown,text/plain" aria-describedby="tamper-file-hint" ${meta ? '' : 'disabled'}/>
    <p class="tamper-desc" id="tamper-file-hint">${t.fileHint}</p>
    <div class="tamper-action-row"><button type="button" class="tamper-action-btn" id="tamper-verify-btn" disabled>${t.verifyBtn}</button><span class="tamper-status" id="tamper-verify-status" role="status" aria-live="polite" aria-atomic="true"></span></div>
    <a href="${manifestUrl}">${t.manifestLink}</a>
    ${meta ? `<details class="tamper-terminal-fold"><summary>${t.offlineTitle}</summary><p>${t.offlineHint}</p><pre class="tamper-code"><code>${escapeHtml(`node -e "const fs=require('node:fs'),c=require('node:crypto');const s=fs.readFileSync('${meta.path}','utf8').replace(/\\r\\n/g,'\\n');console.log(c.createHash('sha256').update(s,'utf8').digest('hex'))"`)}</code></pre></details>` : ''}
  `;
  const firstH2 = container.querySelector(':scope > h2');
  container.insertBefore(widget, firstH2);

  const copyBtn = widget.querySelector('#tamper-copy-btn');
  const fileInput = widget.querySelector('#tamper-file-input');
  const verifyBtn = widget.querySelector('#tamper-verify-btn');
  const statusEl = widget.querySelector('#tamper-verify-status');
  const setStatus = (text, state = '') => {
    statusEl.textContent = text;
    statusEl.className = `tamper-status ${state}`;
  };
  setStatus(meta ? (globalThis.crypto?.subtle ? t.fileRequired : t.verifyUnavailable) : t.manifestUnavailable);
  copyBtn.addEventListener('click', async () => {
    if (!meta) return;
    try {
      await navigator.clipboard.writeText(meta.sha256);
      setStatus(t.copySuccess);
    } catch {
      setStatus(t.copyFail, 'tamper-fail');
    }
  });
  fileInput.addEventListener('change', () => {
    verifyBtn.disabled = !meta || !fileInput.files?.[0] || !globalThis.crypto?.subtle;
    setStatus(globalThis.crypto?.subtle ? t.fileRequired : t.verifyUnavailable);
    if (!verifyBtn.disabled) setStatus('');
  });
  verifyBtn.addEventListener('click', async () => {
    const file = fileInput.files?.[0];
    if (!file || !meta) {
      setStatus(meta ? t.fileRequired : t.manifestUnavailable);
      return;
    }
    verifyBtn.disabled = true;
    fileInput.disabled = true;
    setStatus(t.verifying, 'tamper-loading');
    try {
      const matches = await compareMarkdownFile(file, meta.sha256);
      setStatus(matches ? t.verifiedSuccess : t.verifiedFail, matches ? 'tamper-success' : 'tamper-fail');
    } catch {
      setStatus(t.verifyUnavailable, 'tamper-fail');
    } finally {
      fileInput.disabled = false;
      verifyBtn.disabled = !fileInput.files?.[0] || !globalThis.crypto?.subtle;
    }
  });
}

if (typeof document !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', renderTamperProofPanel);
  } else {
    renderTamperProofPanel();
  }
  document.addEventListener('astro:page-load', renderTamperProofPanel);
}
