// v5.17 标注版截图重拍：20 界面 × 6 语言——高亮框 + 编号徽章 + 自定义意义标签
// 修复 v516b/c 的 chip 瑕疵：不再抓取元素自身文本（截断/错抓/空标签），改用按语言撰写的分区含义短语。
// 产出：<dir>/<name>.png；写入 scripts/annotate-texts-v517.json
import { chromium } from 'playwright';
import { mkdirSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const BASE = 'http://127.0.0.1:8787';
const PUB = fileURLToPath(new URL('../public/images/mail/', import.meta.url));

const LANGS = [
  { dir: 'ui', key: 'zh' },
  { dir: 'zh-tw/ui', key: 'zh-tw' },
  { dir: 'en/ui', key: 'en' },
  { dir: 'es/ui', key: 'es' },
  { dir: 'fr/ui', key: 'fr' },
  { dir: 'nl/ui', key: 'nl' },
];
const PROFILE_LANG = { zh: 'zh', 'zh-tw': 'zh-Hant', en: 'en', es: 'es', fr: 'fr', nl: 'nl' };

// mark: { sel, idx = 第几个可见匹配, row = 框选其所在行祖先 }；label 键按 LANGS.key
const SPECS = [
  {
    name: 'views-guide', hash: '#inbox',
    marks: [
      { sel: 'aside button.compose-btn', label: { zh: '写信：新建邮件入口', 'zh-tw': '寫信：新增郵件入口', en: 'Compose: start a new message', es: 'Redactar: nuevo correo', fr: 'Rédiger : nouveau message', nl: 'Opstellen: nieuwe mail' } },
      { sel: 'aside .nav-item', idx: 1, label: { zh: '星标：重要邮件集合', 'zh-tw': '星標：重要郵件集合', en: 'Starred: your key messages', es: 'Destacados: correos clave', fr: 'Favoris : messages clés', nl: 'Met ster: belangrijke mail' } },
      { sel: 'aside .nav-item', idx: 2, label: { zh: '稍后处理：延后跟进', 'zh-tw': '稍後處理：延後跟進', en: 'Snoozed: follow up later', es: 'Pospuestos: seguimiento', fr: 'En attente : suivi différé', nl: 'Uitgesteld: later oppakken' } },
      { sel: 'aside .nav-item', idx: 3, label: { zh: '已发送：寄出存底', 'zh-tw': '已傳送：寄出存底', en: 'Sent: outgoing archive', es: 'Enviados: correo saliente', fr: 'Envoyés : messages partis', nl: 'Verzonden: verzonden post' } },
    ],
  },
  {
    name: 'compose-guide', hash: '#inbox', compose: true,
    marks: [
      { sel: '.tox-toolbar', label: { zh: '富文本工具栏：17 项排版', 'zh-tw': '富文本工具列：17 項排版', en: 'Formatting toolbar: 17 tools', es: 'Barra de formato: 17 herramientas', fr: 'Barre de mise en forme : 17 outils', nl: 'Opmaakwerkbalk: 17 tools' } },
      { sel: '.write-box .el-input-tag__input', label: { zh: '收件人：可选联系人', 'zh-tw': '收件人：可選聯絡人', en: 'Recipients: pick contacts', es: 'Destinatarios: elige contactos', fr: 'Destinataires : contacts au choix', nl: 'Geadresseerden: contacten' } },
      { sel: '.write-box input.el-input__inner', label: { zh: '主题', 'zh-tw': '主旨', en: 'Subject', es: 'Asunto', fr: 'Objet', nl: 'Onderwerp' } },
      { sel: '.send .el-button--primary', label: { zh: '发送：站内直投·站外走通道', 'zh-tw': '傳送：站內直投·站外走通道', en: 'Send: direct in-site, off-site via channel', es: 'Enviar: interno directo, exterior por canal', fr: 'Envoyer : interne direct, externe via canal', nl: 'Verzenden: intern direct, extern via kanaal' } },
    ],
  },
  {
    name: 'search-guide', hash: '#inbox', search: 'epocanvas',
    marks: [
      { sel: 'header input, .topbar input, input', idx: 0, label: { zh: '检索框：算子与关键词', 'zh-tw': '檢索框：運算子與關鍵詞', en: 'Search box: operators + keywords', es: 'Buscador: operadores y palabras', fr: 'Recherche : opérateurs et mots-clés', nl: 'Zoekvak: operatoren en woorden' } },
      { sel: '.email-row', idx: 0, label: { zh: '命中列表：关键词即时高亮', 'zh-tw': '命中列表：關鍵詞即時高亮', en: 'Hits with instant highlighting', es: 'Aciertos resaltados al instante', fr: 'Résultats surlignés aussitôt', nl: 'Hits direct gemarkeerd' } },
    ],
  },
  {
    name: 'mode-guide', hash: '#manage/admin/system', wait: 3600, openModeSelect: true,
    marks: [
      { sel: '.website-card .el-select', label: { zh: '邮件模式：三档隐私切换', 'zh-tw': '郵件模式：三檔隱私切換', en: 'Mail mode: three privacy tiers', es: 'Modo de correo: tres niveles', fr: 'Mode de messagerie : trois niveaux', nl: 'Mailmodus: drie privacyniveaus' } },
      { sel: '.website-card .el-tag', label: { zh: '当前等级徽标', 'zh-tw': '目前等級徽章', en: 'Current tier badge', es: 'Insignia del nivel actual', fr: 'Badge du niveau actuel', nl: 'Huidige niveau-badge' } },
      { sel: '.el-select-dropdown__list', label: { zh: '下拉选项：L1 全部邮件 / L2 隐私 / L3 加密', 'zh-tw': '下拉選項：L1 全部郵件 / L2 隱私 / L3 加密', en: 'Options: L1 all / L2 private / L3 encrypted', es: 'Opciones: L1 todo / L2 privado / L3 cifrado', fr: 'Options : L1 tout / L2 privé / L3 chiffré', nl: 'Opties: L1 alles / L2 privé / L3 versleuteld' } },
    ],
  },
  {
    name: 'roles-guide', hash: '#manage/admin/roles', wait: 3600,
    marks: [
      { sel: '.el-table__header-wrapper th', idx: 1, label: { zh: '权限身份：分组与定位标签', 'zh-tw': '權限身分：分組與定位標籤', en: 'Role identity and positioning', es: 'Identidad del grupo y función', fr: 'Identité du groupe et rôle', nl: 'Rol en positionering' } },
      { sel: '.el-table__header-wrapper th', idx: 2, label: { zh: '存储配额：按分组设定', 'zh-tw': '儲存配額：按分組設定', en: 'Storage quota per role', es: 'Cuota de almacenamiento', fr: 'Quota de stockage par groupe', nl: 'Opslagquotum per rol' } },
      { sel: '.el-table__header-wrapper th', idx: 3, label: { zh: '发件上限：每日重置', 'zh-tw': '發件上限：每日重設', en: 'Daily sending limit', es: 'Límite de envío diario', fr: "Limite d'envoi quotidienne", nl: 'Dagelijkse verzendlimiet' } },
      { sel: '.el-table__header-wrapper th', idx: 4, label: { zh: '附件权限：按分组开放', 'zh-tw': '附件權限：按分組開放', en: 'Attachment permission', es: 'Permiso de adjuntos', fr: 'Droit aux pièces jointes', nl: 'Bijlagerecht' } },
      { sel: '.el-table__header-wrapper th', idx: 5, label: { zh: 'AI 授权模型：按分组分级', 'zh-tw': 'AI 授權模型：按分組分級', en: 'Authorized AI models', es: 'Modelos de IA autorizados', fr: "Modèles d'IA autorisés", nl: 'Geautoriseerde AI-modellen' } },
    ],
  },
  {
    name: 'login-guide', hash: '/login/', login: true,
    marks: [
      { sel: 'input[type=email]', label: { zh: '邮箱输入：帐号即邮箱', 'zh-tw': '郵箱輸入：帳號即郵箱', en: 'Email input: your address is the account', es: 'Correo: la cuenta es tu email', fr: 'E-mail : le compte est votre adresse', nl: 'E-mail: account = adres' } },
      { sel: 'input[type=password]', label: { zh: '密码输入：加盐哈希存储', 'zh-tw': '密碼輸入：加鹽雜湊儲存', en: 'Password input: salted hash storage', es: 'Contraseña: hash con sal', fr: 'Mot de passe : hachage salé', nl: 'Wachtwoord: gezouten hash' } },
      { sel: 'button[type=submit]', label: { zh: '登录：连续失败触发防爆破锁定', 'zh-tw': '登入：連續失敗觸發防爆破鎖定', en: 'Sign in: lockout after repeated failures', es: 'Acceso: bloqueo tras fallos repetidos', fr: 'Connexion : verrouillage après échecs', nl: 'Aanmelden: blokkering bij herhaald falen' } },
    ],
  },
  {
    name: 'twofa-guide', hash: '#settings/security', wait: 3600,
    marks: [
      { sel: '.title', idx: 0, label: { zh: '用户名与密码：修改入口', 'zh-tw': '使用者名稱與密碼：修改入口', en: 'Username and password: change here', es: 'Usuario y contraseña: cambio aquí', fr: 'Identifiant et mot de passe', nl: 'Gebruikersnaam en wachtwoord' } },
      { sel: '.method-item', idx: 0, label: { zh: '验证器应用：TOTP 动态码', 'zh-tw': '驗證器應用：TOTP 動態碼', en: 'Authenticator app: TOTP codes', es: 'App de autenticación: TOTP', fr: "Application d'authentification : TOTP", nl: 'Authenticator-app: TOTP' } },
      { sel: '.method-item', idx: 1, label: { zh: '备用恢复码：10 组一次性', 'zh-tw': '備用恢復碼：10 組一次性', en: 'Backup codes: 10 one-time', es: 'Códigos de respaldo: 10 de un uso', fr: 'Codes de secours : 10 usage unique', nl: 'Herstelcodes: 10 eenmalig' } },
      { sel: '.method-item', idx: 2, label: { zh: '通行密钥：Passkey 与硬件密钥', 'zh-tw': '通行金鑰：Passkey 與硬體金鑰', en: 'Passkeys and security keys', es: 'Llaves de acceso y seguridad', fr: "Clés d'accès et clés matérielles", nl: 'Passkeys en beveiligingssleutels' } },
    ],
  },
  {
    name: 'apps-guide', hash: '#manage/admin/oauth-apps', wait: 3600,
    marks: [
      { sel: '.endpoint-chip', idx: 0, label: { zh: 'Discovery：OIDC 元数据自述', 'zh-tw': 'Discovery：OIDC 中繼資料', en: 'Discovery: OIDC metadata', es: 'Discovery: metadatos OIDC', fr: 'Discovery : métadonnées OIDC', nl: 'Discovery: OIDC-metadata' } },
      { sel: '.endpoint-chip', idx: 1, label: { zh: 'authorize：引导用户授权', 'zh-tw': 'authorize：引導使用者授權', en: 'authorize: user consent', es: 'authorize: consentimiento', fr: 'authorize : consentement', nl: 'authorize: toestemming' } },
      { sel: '.endpoint-chip', idx: 2, label: { zh: 'token：授权码置换令牌', 'zh-tw': 'token：授權碼置換權杖', en: 'token: code-for-token exchange', es: 'token: canje de código', fr: 'token : échange contre jeton', nl: 'token: ruilen voor token' } },
      { sel: '.endpoint-chip', idx: 3, label: { zh: 'userinfo：读取已授权资料', 'zh-tw': 'userinfo：讀取已授權資料', en: 'userinfo: read granted profile', es: 'userinfo: perfil autorizado', fr: 'userinfo : profil autorisé', nl: 'userinfo: profiel lezen' } },
      { sel: '.app-card', idx: 0, label: { zh: '应用卡：凭据·启停·集成代码', 'zh-tw': '應用卡：憑證·啟停·整合程式碼', en: 'App card: credentials, toggle, snippets', es: 'Tarjeta: credenciales y código', fr: 'Carte : identifiants et code', nl: 'App-kaart: sleutels en code' } },
    ],
  },
  {
    name: 'notify-guide', hash: '#settings/data', wait: 3600,
    marks: [
      { sel: '.export-card', idx: 0, label: { zh: '全量导出：JSON 完整备份', 'zh-tw': '全量匯出：JSON 完整備份', en: 'Full export: JSON backup', es: 'Exportación total: JSON', fr: 'Export complet : JSON', nl: 'Volledige export: JSON' } },
      { sel: '.export-card', idx: 1, label: { zh: '邮件归档：MBOX/JSON/CSV', 'zh-tw': '郵件歸檔：MBOX/JSON/CSV', en: 'Mail archive: MBOX/JSON/CSV', es: 'Archivo: MBOX/JSON/CSV', fr: 'Archive : MBOX/JSON/CSV', nl: 'Mailarchief: MBOX/JSON/CSV' } },
      { sel: '.export-card', idx: 2, label: { zh: '通讯录与配置导出', 'zh-tw': '通訊錄與設定匯出', en: 'Contacts and preferences export', es: 'Contactos y preferencias', fr: 'Contacts et préférences', nl: 'Contacten en voorkeuren' } },
      { sel: '.forwarding-container .title, .forwarding-title', idx: 0, label: { zh: '邮件与消息转发：Telegram 推送+自动转发', 'zh-tw': '郵件與訊息轉發：Telegram 推送＋自動轉發', en: 'Forwarding: Telegram push + auto-forward', es: 'Reenvío: push de Telegram y automático', fr: 'Transfert : push Telegram et auto', nl: 'Doorsturen: Telegram-push en auto' } },
    ],
  },
  {
    name: 'analysis-guide', hash: '#manage/admin/analysis', wait: 3600,
    marks: [
      { sel: '.title', idx: 0, label: { zh: '邮件来源：入站构成分布', 'zh-tw': '郵件來源：入站構成分佈', en: 'Mail sources: inbound mix', es: 'Fuentes: composición de entrada', fr: 'Sources : origine du courrier', nl: 'Bronnen: inkomende mix' } },
      { sel: '.title', idx: 1, label: { zh: '用户增长曲线', 'zh-tw': '使用者增長曲線', en: 'User growth curve', es: 'Curva de crecimiento de usuarios', fr: "Courbe de croissance utilisateurs", nl: 'Gebruikersgroeicurve' } },
      { sel: '.title', idx: 2, label: { zh: '邮件增长曲线', 'zh-tw': '郵件增長曲線', en: 'Mail growth curve', es: 'Curva de crecimiento de correos', fr: 'Courbe de croissance du courrier', nl: 'Mailgroeicurve' } },
    ],
  },
  {
    name: 'users-guide', hash: '#manage/admin/users', wait: 3800,
    marks: [
      { sel: 'input.el-input__inner', idx: 0, label: { zh: '按邮箱检索帐号', 'zh-tw': '按郵箱檢索帳號', en: 'Find accounts by email', es: 'Buscar cuentas por email', fr: 'Retrouver un compte par e-mail', nl: 'Accounts zoeken op e-mail' } },
      { sel: '.el-table__header-wrapper th', idx: 1, label: { zh: '用户邮箱：帐号标识', 'zh-tw': '使用者郵箱：帳號標識', en: 'Email: account identity', es: 'Email: identidad de cuenta', fr: 'E-mail : identité du compte', nl: 'E-mail: accountidentiteit' } },
      { sel: '.el-table__header-wrapper th', idx: 2, label: { zh: '存储空间：用量对照配额', 'zh-tw': '儲存空間：用量對照配額', en: 'Storage: usage vs quota', es: 'Almacenamiento: uso y cuota', fr: 'Stockage : usage et quota', nl: 'Opslag: gebruik en quotum' } },
      { sel: '.el-table__header-wrapper th', idx: 7, label: { zh: '设置列：行内管理操作', 'zh-tw': '設定欄：行內管理操作', en: 'Actions: per-account operations', es: 'Acciones: gestión por fila', fr: 'Actions : gestion par ligne', nl: 'Acties: beheer per rij' } },
    ],
  },
  {
    name: 'review-guide', hash: '#manage/admin/mail', wait: 3800,
    marks: [
      { sel: 'input.el-input__inner, input', idx: 0, label: { zh: '检索框：$ 语法全库检索', 'zh-tw': '檢索框：$ 語法全庫檢索', en: 'Search: $ syntax across all mail', es: 'Búsqueda: sintaxis $ global', fr: 'Recherche : syntaxe $ globale', nl: 'Zoekvak: $-syntaxis voor alles' } },
      { sel: 'aside .nav-item.active', idx: 0, label: { zh: '分区名随邮件模式变化：隐私模式显示为垃圾邮件', 'zh-tw': '分區名隨郵件模式變化：隱私模式顯示為垃圾郵件', en: 'Section follows mail mode: shown as Spam in private mode', es: 'La sección cambia con el modo: se muestra como Spam', fr: 'La section suit le mode : affichée comme Spam', nl: 'Sectie volgt de modus: getoond als Spam' } },
      { sel: '.el-empty, .empty', idx: 0, label: { zh: '空状态：当前无隔离邮件', 'zh-tw': '空狀態：目前無隔離郵件', en: 'Empty state: nothing quarantined now', es: 'Vacío: nada en cuarentena', fr: 'Vide : rien de mis en quarantaine', nl: 'Leeg: niets in quarantaine' } },
    ],
  },
  {
    name: 'regkeys-guide', hash: '#manage/admin/reg-keys', wait: 3800,
    marks: [
      { sel: '.empty-btn, .el-button--primary', idx: 0, label: { zh: '添加注册码：签发邀请码', 'zh-tw': '新增註冊碼：簽發邀請碼', en: 'Add key: issue an invite code', es: 'Añadir código: emitir invitación', fr: 'Ajouter un code : émettre une invitation', nl: 'Code toevoegen: invite uitgeven' } },
      { sel: 'input.el-input__inner', idx: 0, label: { zh: '搜索：按注册码筛选', 'zh-tw': '搜尋：按註冊碼篩選', en: 'Search: filter by key', es: 'Buscar: filtrar por código', fr: 'Recherche : filtrer par code', nl: 'Zoeken: filter op code' } },
      { sel: '.el-empty, .empty', idx: 0, label: { zh: '空状态：尚未签发任何注册码', 'zh-tw': '空狀態：尚未簽發任何註冊碼', en: 'Empty state: no keys issued yet', es: 'Vacío: aún sin códigos', fr: 'Vide : aucun code émis', nl: 'Leeg: nog geen codes' } },
    ],
  },
  {
    name: 'labels-guide', hash: '#settings/labels', wait: 3600,
    marks: [
      { sel: '.primary-btn', idx: 0, label: { zh: '新建标签：侧栏至多显示 7 个', 'zh-tw': '新增標籤：側欄至多顯示 7 個', en: 'New label: sidebar shows up to 7', es: 'Nueva etiqueta: hasta 7 en lateral', fr: 'Nouveau libellé : 7 max. en latéral', nl: 'Nieuw label: max. 7 in zijbalk' } },
      { sel: '.edit-btn', idx: 0, row: true, label: { zh: '标签行：图标颜色与计数', 'zh-tw': '標籤列：圖示顏色與計數', en: 'Label row: icon, colour, counts', es: 'Fila: icono, color y conteos', fr: 'Ligne : icône, couleur, compteurs', nl: 'Labelrij: icoon, kleur, aantallen' } },
      { sel: '.el-switch', idx: 0, label: { zh: '显示开关：控制侧栏可见性', 'zh-tw': '顯示開關：控制側欄可見性', en: 'Visibility toggle for the sidebar', es: 'Interruptor de visibilidad', fr: 'Commutateur de visibilité', nl: 'Zichtbaarheidsschakelaar' } },
    ],
  },
  {
    name: 'preferences-guide', hash: '#settings/profile', wait: 3600,
    marks: [
      { sel: '.title', idx: 0, label: { zh: '基本信息：头像·昵称·性别·生日', 'zh-tw': '基本資訊：頭像·暱稱·性別·生日', en: 'Basics: avatar, name, gender, birthday', es: 'Básicos: avatar, nombre, género, fecha', fr: 'Basiques : avatar, nom, genre, date', nl: 'Basis: avatar, naam, geslacht, geboorte' } },
      { sel: '.title', idx: 1, label: { zh: '联系信息：主邮箱·额外邮箱·电话', 'zh-tw': '聯絡資訊：主信箱·額外信箱·電話', en: 'Contact: main and extra emails, phone', es: 'Contacto: correos y teléfono', fr: 'Contact : e-mails et téléphone', nl: 'Contact: e-mails en telefoon' } },
      { sel: '.title', idx: 2, label: { zh: '地址：住家·公司·其他', 'zh-tw': '地址：住家·公司·其他', en: 'Addresses: home, work, other', es: 'Direcciones: casa, trabajo, otra', fr: 'Adresses : domicile, travail, autre', nl: 'Adressen: thuis, werk, overig' } },
      { sel: '.title', idx: 3, label: { zh: '关联设置与安全', 'zh-tw': '關聯設定與安全', en: 'Linked settings and security', es: 'Ajustes vinculados y seguridad', fr: 'Réglages liés et sécurité', nl: 'Gekoppelde instellingen' } },
    ],
  },
  {
    name: 'general-guide', hash: '#settings/general', wait: 3600,
    marks: [
      { sel: '.title', idx: 0, label: { zh: '个人简介：展示于公开主页', 'zh-tw': '個人簡介：展示於公開主頁', en: 'Bio: shown on your public page', es: 'Bio: se muestra en tu página', fr: 'Bio : affichée sur la page publique', nl: 'Bio: op je openbare pagina' } },
      { sel: '.title', idx: 1, label: { zh: '个性装扮：外观色调与主题壁纸', 'zh-tw': '個性装扮：外觀色調與主題壁紙', en: 'Personalisation: theme and wallpaper', es: 'Personalización: tema y fondo', fr: 'Personnalisation : thème et fond', nl: 'Personalisatie: thema en achtergrond' } },
      { sel: '.title', idx: 2, label: { zh: '偏好：阅读设置·语言·翻译目标', 'zh-tw': '偏好：閱讀設定·語言·翻譯目標', en: 'Preferences: reading, language, translation', es: 'Preferencias: lectura, idioma, traducción', fr: 'Préférences : lecture, langue, traduction', nl: 'Voorkeuren: lezen, taal, vertaling' } },
    ],
  },
  {
    name: 'data-guide', hash: '#settings/data', wait: 3600,
    marks: [
      { sel: '.title', idx: 0, label: { zh: '导出卡：全量备份与邮件归档', 'zh-tw': '匯出卡：全量備份與郵件歸檔', en: 'Export cards: full backup and archive', es: 'Tarjetas de exportación', fr: "Cartes d'export", nl: 'Exportkaarten' } },
      { sel: '.title', idx: 1, label: { zh: '转发区：Telegram 推送与自动转发', 'zh-tw': '轉發區：Telegram 推送與自動轉發', en: 'Forwarding: Telegram push and auto-forward', es: 'Reenvío: push y automático', fr: 'Transfert : push et auto', nl: 'Doorsturen: push en auto' } },
      { sel: '.title', idx: 2, label: { zh: '存储：用量仪表与个人云接入', 'zh-tw': '儲存：用量儀表與個人雲接入', en: 'Storage: usage gauge and BYO cloud', es: 'Almacenamiento: medidor y nube', fr: 'Stockage : jauge et cloud perso', nl: 'Opslag: meter en eigen cloud' } },
      { sel: '.title', idx: 3, label: { zh: '第三方应用：授权查看与撤销', 'zh-tw': '第三方應用：授權查看與撤銷', en: 'Third-party apps: view and revoke', es: 'Apps de terceros: revocar', fr: 'Apps tierces : voir et révoquer', nl: 'Apps van derden: intrekken' } },
    ],
  },
  {
    name: 'audit-guide', hash: '#manage/admin/audit', wait: 3800,
    marks: [
      { sel: '.el-table__header-wrapper th', idx: 1, label: { zh: '用户邮箱：被处置或申诉帐号', 'zh-tw': '使用者郵箱：被處置或申訴帳號', en: 'Email: the account in question', es: 'Email: cuenta en cuestión', fr: 'E-mail : compte concerné', nl: 'E-mail: betreffende account' } },
      { sel: '.el-table__header-wrapper th', idx: 2, label: { zh: '安全审计等级：风险分级', 'zh-tw': '安全審計等級：風險分級', en: 'Audit level: risk grading', es: 'Nivel de auditoría: riesgo', fr: "Niveau d'audit : risque", nl: 'Auditniveau: risicograad' } },
      { sel: '.el-table__header-wrapper th', idx: 3, label: { zh: '预警说明：触发特征描述', 'zh-tw': '預警說明：觸發特徵描述', en: 'Alert notes: what triggered it', es: 'Notas: qué lo disparó', fr: 'Notes : ce qui a déclenché', nl: 'Melding: wat het opwekte' } },
      { sel: '.el-table__header-wrapper th', idx: 4, label: { zh: '活跃环境池：IP·地理·设备·指纹', 'zh-tw': '活躍環境池：IP·地理·設備·指紋', en: 'Environment pool: IP, geo, device, fingerprint', es: 'Entorno: IP, geo, equipo, huella', fr: 'Environnement : IP, geo, appareil', nl: 'Omgeving: IP, geo, apparaat' } },
    ],
  },
  {
    name: 'category-guide', hash: '#manage/admin/rules', wait: 3600,
    marks: [
      { sel: '.card-title', idx: 0, label: { zh: '收发开关：关收信即拒收', 'zh-tw': '收發開關：關收信即拒收', en: 'Mail switches: off = reject inbound', es: 'Interruptores: apagado = rechazo', fr: 'Interrupteurs : coupé = rejet', nl: 'Schakelaars: uit = weigeren' } },
      { sel: '.card-title', idx: 1, label: { zh: 'AI 识别：验证码提取配置', 'zh-tw': 'AI 識別：驗證碼提取設定', en: 'AI: code-extraction settings', es: 'IA: extracción de códigos', fr: 'IA : extraction de codes', nl: 'AI: code-extractie' } },
      { sel: '.card-title', idx: 2, label: { zh: '基础名单：黑白名单与关键词', 'zh-tw': '基礎名單：黑白名單與關鍵詞', en: 'Lists: block/allow and keywords', es: 'Listas: bloqueo y palabras', fr: 'Listes : blocage et mots-clés', nl: 'Lijsten: blokkeren en woorden' } },
      { sel: '.card-title', idx: 3, label: { zh: '硬拦截：直接拒收并计数', 'zh-tw': '硬攔截：直接拒收並計數', en: 'Hard block: reject and count', es: 'Bloqueo duro: rechaza y cuenta', fr: 'Blocage dur : rejet et comptage', nl: 'Harde blokkade: weigeren' } },
    ],
  },
  {
    name: 'system-guide', hash: '#manage/admin/system', wait: 3600,
    marks: [
      { sel: '.website-card .card-title', label: { zh: '网站设置：注册·模式·注册码等实例开关', 'zh-tw': '網站設定：註冊·模式·註冊碼等實例開關', en: 'Site settings: sign-up, mode, reg-keys', es: 'Ajustes del sitio: registro y modo', fr: 'Réglages : inscription, mode, codes', nl: 'Site-instellingen: registratie e.d.' } },
      { sel: '.customization-card .card-title', label: { zh: '个性化设置：标题与弹窗提示', 'zh-tw': '個性化設定：標題與彈窗提示', en: 'Personalisation: title and prompts', es: 'Personalización: título y avisos', fr: 'Personnalisation : titre et messages', nl: 'Personalisatie: titel en meldingen' } },
      { sel: '.storage-db-card .card-title', label: { zh: '存储与核心数据库：对象存储与附件上限', 'zh-tw': '儲存與核心資料庫：物件儲存與附件上限', en: 'Storage and databases: buckets and limits', es: 'Almacenamiento y bases de datos', fr: 'Stockage et bases de données', nl: 'Opslag en databases' } },
      { sel: '.ai-hub-card .card-title', label: { zh: 'AI 引擎：提供商·配额·模型授权', 'zh-tw': 'AI 引擎：提供商·配額·模型授權', en: 'AI engine: provider, quota, models', es: 'Motor IA: proveedor y cuota', fr: 'Moteur IA : fournisseur et quota', nl: 'AI-engine: provider en quota' } },
      { sel: '.user-data-control-card .card-title', label: { zh: '用户资料控制：用户侧能力开关', 'zh-tw': '使用者資料控制：使用者側能力開關', en: 'User data control: per-user switches', es: 'Control de datos: interruptores', fr: 'Contrôle des données : interrupteurs', nl: 'Gebruikersbeheer: schakelaars' } },
    ],
  },
];

const res = await fetch(BASE + '/api/login', {
  method: 'POST', headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ email: 'admin@epomail.bond', password: '123456' }),
});
const login = (await res.json()).data;
if (!login?.token) throw new Error('login failed');
async function setLang(lang) {
  const r = await fetch(BASE + '/api/my/updateProfile', {
    method: 'PUT', headers: { Authorization: `Bearer ${login.token}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ lang }),
  });
  if (!r.ok) throw new Error('updateProfile ' + r.status);
}

const harvested = {};
const browser = await chromium.launch({ headless: true, args: ['--no-sandbox', '--no-proxy-server'] });
let n = 0;

for (const L of LANGS) {
  const outDir = path.join(PUB, L.dir);
  mkdirSync(outDir, { recursive: true });
  harvested[L.key] = {};
  await setLang(PROFILE_LANG[L.key]);
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2 });
  const page = await ctx.newPage();
  await page.addInitScript(([token]) => {
    localStorage.setItem('token', token);
    localStorage.setItem('loginEmail', 'admin@epomail.bond');
    localStorage.setItem('ui', JSON.stringify({ dark: false, themeMode: 'light', locale: '', defaultTranslateLang: 'en' }));
    localStorage.setItem('setting', JSON.stringify({ lang: '' }));
  }, [login.token]);

  for (const s of SPECS) {
    const target = s.login ? BASE + '/login/' : BASE + '/';
    await page.goto(target, { waitUntil: 'domcontentloaded', timeout: 60000 });
    await page.waitForTimeout(s.login ? 2600 : 3400);
    if (!s.login) {
      await page.evaluate((h) => { location.hash = h; }, s.hash);
      await page.waitForTimeout(s.wait || 3000);
    }
    if (s.search) {
      try {
        const inp = page.locator('input').first();
        await inp.fill(s.search);
        await inp.press('Enter');
        await page.waitForTimeout(2000);
      } catch (e) { console.log('  search skip:', e.message.slice(0, 50)); }
    }
    if (s.compose) {
      try {
        await page.locator('aside button.compose-btn, aside button').first().click({ timeout: 4000 });
        await page.waitForTimeout(1800);
      } catch (e) { console.log('  compose skip:', e.message.slice(0, 50)); }
    }
    if (s.openModeSelect) {
      try {
        await page.locator('.website-card .el-select').first().click({ timeout: 4000 });
        await page.waitForTimeout(900);
      } catch (e) { console.log('  mode-select skip:', e.message.slice(0, 50)); }
    }

    const marksForLang = s.marks.map((m) => ({ sel: m.sel, idx: m.idx, row: m.row, label: m.label[L.key] }));
    const texts = await page.evaluate((marks) => {
      document.querySelectorAll('.epo-doc-anno-box, .epo-doc-anno-badge, .epo-doc-anno-chip').forEach((b) => b.remove());
      let st = document.getElementById('epo-anno-style');
      if (!st) {
        st = document.createElement('style');
        st.id = 'epo-anno-style';
        st.textContent = [
          '.epo-doc-anno-box{position:absolute;z-index:9998;border:2.5px solid #6366f1;border-radius:10px;box-shadow:0 0 0 3px rgba(99,102,241,.18);pointer-events:none}',
          '.epo-doc-anno-badge{position:absolute;z-index:9999;width:24px;height:24px;border-radius:50%;background:#4f46e5;color:#fff;font:800 14px/24px sans-serif;text-align:center;box-shadow:0 1px 8px rgba(0,0,0,.4);pointer-events:none}',
          '.epo-doc-anno-chip{position:absolute;z-index:9999;background:#4f46e5;color:#fff;font:700 13px/1.35 sans-serif;padding:6px 10px;border-radius:8px;box-shadow:0 2px 8px rgba(0,0,0,.35);pointer-events:none;max-width:260px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}',
        ].join('');
        document.head.appendChild(st);
      }
      const out = [];
      const vis = (r) => r.width > 4 && r.height > 4;
      const rowAncestor = (el) => {
        let a = el.parentElement;
        while (a && a !== document.body) {
          const r = a.getBoundingClientRect();
          if (r.width > 700 && r.height > 30) return a;
          a = a.parentElement;
        }
        return el;
      };
      let i = 0;
      for (const m of marks) {
        const els = [...document.querySelectorAll(m.sel)].filter((el) => vis(el.getBoundingClientRect()));
        const el = els[m.idx || 0];
        if (!el) { out.push({ n: i + 1, label: m.label, missing: true }); continue; }
        const boxEl = m.row ? rowAncestor(el) : el;
        const r = boxEl.getBoundingClientRect();
        if (r.width < 4 || r.height < 4) { out.push({ n: i + 1, label: m.label, missing: true }); continue; }
        i++;
        const box = document.createElement('div');
        box.className = 'epo-doc-anno-box';
        box.style.top = (r.top + window.scrollY - 4) + 'px';
        box.style.left = (r.left - 4) + 'px';
        box.style.width = (r.width + 8) + 'px';
        box.style.height = (r.height + 8) + 'px';
        document.body.appendChild(box);
        const badge = document.createElement('div');
        badge.className = 'epo-doc-anno-badge';
        badge.textContent = String(i);
        badge.style.top = (r.top + window.scrollY - 12) + 'px';
        badge.style.left = Math.max(0, r.left - 12) + 'px';
        document.body.appendChild(badge);
        const chip = document.createElement('div');
        chip.className = 'epo-doc-anno-chip';
        chip.textContent = i + '. ' + m.label;
        chip.style.top = (r.top + window.scrollY - 14) + 'px';
        chip.style.left = (r.left + r.width + 10) + 'px';
        if (r.left + r.width + 280 > 1440) {
          chip.style.left = Math.max(4, r.left - 10) + 'px';
          chip.style.top = (r.top + window.scrollY + r.height + 8) + 'px';
        }
        document.body.appendChild(chip);
        out.push({ n: i, label: m.label });
      }
      return out;
    }, marksForLang);
    harvested[L.key][s.name] = texts;
    const missing = texts.filter((t) => t.missing);
    await page.screenshot({ path: path.join(outDir, `${s.name}.png`) });
    n++;
    console.log(`ok ${L.dir}/${s.name}.png (${texts.length - missing.length} marks${missing.length ? ', MISSING ' + missing.map((m) => m.n).join(',') : ''})`);
  }
  await ctx.close();
}

writeFileSync(fileURLToPath(new URL('./annotate-texts-v517.json', import.meta.url)), JSON.stringify(harvested, null, 1));
await browser.close();
console.log(`DONE: ${n} annotated screenshots`);
