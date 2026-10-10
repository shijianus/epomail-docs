// v5.17 图解规范：每张配图的隐藏式下拉内容（zh 为准，en 对照）
// items: 编号图（numbered images）按序对应图上徽章；未标注图（plain）用分区名。
// es/fr/nl/zh-tw 由 scripts/v517-figures-<lang>.json 补齐（结构必须与本表一致）。
export const FIGS = {
  'views-guide.png': {
    summary: {
      zh: '这张收件箱全景图的四个标注分区，对应日常使用频率最高的四个入口：写一封新信、翻重要邮件、查延后事项与核对已寄出。',
      en: 'Four annotated regions of the inbox, matching the four most-used entries: writing a new message, revisiting starred mail, checking deferred items and auditing what was sent.',
    },
    items: [
      { h: { zh: '写信（侧栏顶部主按钮）', en: 'Compose (top sidebar button)' }, d: { zh: '全局唯一的新建邮件入口，点击弹出写信弹层（非独立路由）；移动端为右下悬浮按钮，亦支持 `?composeTo=<地址>` 深链预填收件人。任何视图下都可一键开始写信。', en: 'The single entry point for new mail: it opens the compose overlay (not a route). On mobile it becomes a floating button, and the `?composeTo=<address>` deep link pre-fills the recipient. Available from any view.' } },
      { h: { zh: '星标邮件（侧栏文件夹）', en: 'Starred (sidebar folder)' }, d: { zh: '所有加星邮件跨文件夹聚合于此：在列表行点击星形图标即入此视图，用于收藏需要长期保留或快速再访的邮件；侧栏计数实时反映数量。', en: 'Every starred message gathers here across folders: tap the star on a list row to add one. Use it for mail you must keep at hand; the sidebar count updates in real time.' } },
      { h: { zh: '稍后处理（侧栏文件夹）', en: 'Snoozed (sidebar folder)' }, d: { zh: '延后跟进的暂存区，分「紧急」与「等待」两档：在详情页选「延后」并指定时间，到期自动回到收件箱顶部，重要事项不再沉底。', en: 'A holding area for deferred follow-ups in two tiers (urgent and waiting). Choose "Snooze" on a message with a time; it returns to the top of the inbox automatically when due.' } },
      { h: { zh: '已发送（侧栏文件夹）', en: 'Sent (sidebar folder)' }, d: { zh: '本帐号发出的全部邮件存底，可在此核对哪些信已实际寄出；出站量受帐号角色的每日发信配额约束，站内信直投、站外经投递通道。', en: 'The archive of everything this account sent. Outbound volume is capped by the role\'s daily quota; in-site mail is delivered directly, off-site mail goes through the delivery channel.' } },
    ],
  },
  'compose-guide.png': {
    summary: {
      zh: '写信弹层的四个标注分区，覆盖一封信从排版到发出的完整路径：工具栏决定样式，收件人与主题决定去向，发送按钮落地投递。',
      en: 'Four regions of the compose overlay covering a message from styling to delivery: the toolbar decides the look, recipients and subject decide where it goes, and Send dispatches it.',
    },
    items: [
      { h: { zh: '富文本工具栏（正文上方）', en: 'Rich-text toolbar (above the body)' }, d: { zh: '17 项排版能力：段落与字号、加粗/斜体/下划线/删除线、颜色、对齐、有序无序列表、引用、分隔线、链接、图片、表格、表情、翻译与源码模式，即写即见。', en: '17 formatting tools: paragraph and font size, bold/italic/underline/strikethrough, colour, alignment, ordered and unordered lists, quote, divider, link, image, table, emoji, translation and source-code mode — all rendered as you write.' } },
      { h: { zh: '收件人输入行', en: 'Recipient line' }, d: { zh: '支持从联系人选择或直接输入地址；站内信箱直投（不产生外部传输），站外地址经营运者配置的通道（Resend/Mailjet 等）投递。', en: 'Pick contacts or type addresses. In-site mailboxes are delivered directly (no external transfer); off-site addresses go through the operator-configured channel (Resend/Mailjet, etc.).' } },
      { h: { zh: '主题行', en: 'Subject line' }, d: { zh: '收件人首先看到的内容，与正文首行摘要一同显示在列表与推送通知里；写明事由便于日后用 `subject:` 算子检索。', en: 'The first thing recipients see, shown in lists and push notifications together with the body preview. A descriptive subject pays off later via the `subject:` operator.' } },
      { h: { zh: '发送按钮（右下）', en: 'Send button (bottom right)' }, d: { zh: '点击即投递：站内直投秒达，站外经投递通道发送；发送后可在「已发送」视图核对。附件能力依角色开启，单附件上限依实例设置（出厂 25 MB）。', en: 'One click dispatches: direct and instant in-site, via the delivery channel off-site; check the Sent view afterwards. Attachment rights depend on the role, with the per-file cap set per instance (25 MB factory default).' } },
    ],
  },
  'search-guide.png': {
    summary: {
      zh: '搜索的两个标注分区演示一次完整检索：在检索框输入算子或关键词，命中列表即时过滤并高亮关键词。',
      en: 'Two regions demonstrating one full search: type an operator or keyword in the search box, and the hit list filters instantly with the matches highlighted.',
    },
    items: [
      { h: { zh: '顶栏检索框', en: 'Top search box' }, d: { zh: '邮件页搜邮件、设置页搜配置项；支持 `from:`/`to:`/`subject:`/`body:` 等十个字段算子与 `is:`/`global:` 旗标，多条件以空格相连为「且」关系，Tab 可补全算子。', en: 'Searches mail on mail pages and settings entries on settings pages. Ten field operators (`from:`, `to:`, `subject:`, `body:`, …) plus flags like `is:` and `global:`; space-separated conditions combine as AND, and Tab completes operators.' } },
      { h: { zh: '命中列表', en: 'Hit list' }, d: { zh: '仅显示满足全部条件的邮件，命中词以浏览器原生高亮标出（`hl:off` 可关闭）；点击行进入详情，摘录窗自动平移到命中处保留上下文。', en: 'Only messages satisfying every condition are listed, with hits highlighted natively by the browser (`hl:off` disables it). Opening a row scrolls the excerpt to the match, keeping context.' } },
    ],
  },
  'mode-guide.png': {
    summary: {
      zh: '系统设置「网站设置」卡中的邮件模式分区：一个下拉决定全实例邮件的存储加密与管理端可见范围，切换即时生效。',
      en: 'The mail-mode region of the Site Settings card in system settings: one dropdown decides how mail is stored encrypted and how much the admin can see, effective immediately.',
    },
    items: [
      { h: { zh: '邮件模式下拉框', en: 'Mail-mode dropdown' }, d: { zh: '管理员在三档之间选定平衡：Level 1 全部明文（管理端可见全部邮件）、Level 2 隐私模式（出厂默认，用户往来邮件 AES-256-GCM 静态加密）、Level 3 全量 E2EE（管理端不返回任何用户邮件列表）。', en: 'The admin picks the balance among three tiers: Level 1 all plaintext (admin sees everything), Level 2 private mode (factory default; user mail AES-256-GCM encrypted at rest), Level 3 full E2EE (the admin API returns no user mail at all).' } },
      { h: { zh: 'Level 2 增强隐私徽标', en: 'Level 2 privacy badge' }, d: { zh: '当前实例运行于隐私邮件模式：管理端仅可见垃圾邮件、回收站与无主邮件，两步验证总开关锁定为开启。', en: 'This instance runs in private mode: the admin can only see spam, trash and ownerless mail, and the two-step-verification master switch is locked on.' } },
      { h: { zh: '下拉展开的三档选项', en: 'The three expanded options' }, d: { zh: 'L1 全部邮件模式、L2 隐私邮件模式（推荐）、L3 加密邮件模式（E2EE）差异一目了然；加密模式下全库审查入口隐藏、操作报告剥离时间戳、全局转发锁定关闭。', en: 'L1 all-mail mode, L2 private mode (recommended) and L3 encrypted mode (E2EE) at a glance. In encrypted mode the mail-review entry disappears, timestamps are stripped from audit tickets and global forwarding is locked off.' } },
    ],
  },
  'roles-guide.png': {
    summary: {
      zh: '权限控制页的六个身份分组表：五列标注对应五种可按分组调整的资源与权限维度。',
      en: 'The six-role table on the roles page: five annotated columns for the five dimensions adjustable per role.',
    },
    items: [
      { h: { zh: '权限身份列', en: 'Role identity column' }, d: { zh: '普通用户、参观者、普通用户 LV.0、LV.1、协管者与站长六个分组及定位标签；分组决定其余四列的缺省值，参观者与站长两分组受保护不可删除。', en: 'Six roles — Regular, Visitor, Regular LV.0, LV.1, Moderator and Owner — each with a positioning tag. The role determines the defaults of the other four columns; Visitor and Owner are protected and cannot be deleted.' } },
      { h: { zh: '存储配额列', en: 'Storage quota column' }, d: { zh: '每分组一个附件存储配额（参观者 0 MB → 站长 1024 MB，界面标示「无限制」）；接入个人对象存储后新附件不再占用此配额。', en: 'One attachment-storage quota per role (Visitor 0 MB up to Owner 1024 MB, shown as "unlimited"). With personal object storage connected, new attachments stop consuming this quota.' } },
      { h: { zh: '发件上限列', en: 'Sending limit column' }, d: { zh: '每日发信配额（普通用户 5 封 → 协管者 100 封，站长不设上限），计数每日重置；禁止发信的分组（参观者）在此标示「禁止发信」。', en: 'The daily sending quota (Regular 5 up to Moderator 100; Owner unlimited), reset every day. Roles barred from sending — the Visitor — are flagged here.' } },
      { h: { zh: '附件权限列', en: 'Attachment column' }, d: { zh: '是否允许收发附件：「仅纯文本」分组发信不带附件，开放分组受存储配额与单附件上限双重约束。', en: 'Whether attachments may be sent and received. "Text-only" roles mail without attachments; enabled roles are still bounded by the storage quota and the per-file cap.' } },
      { h: { zh: 'AI 授权模型列', en: 'Authorized AI models column' }, d: { zh: '该分组可调用的 AI 模型范围，配合系统设置 AI Hub 的每日配额与速率限制，实现「按身份分级供给 AI 能力」。', en: 'Which AI models the role may call, together with the AI Hub\'s daily quota and rate limits — AI capacity tiered by role.' } },
    ],
  },
  'login-guide.png': {
    summary: {
      zh: '登录面的三个核心分区：一次密码登录的完整输入与提交路径；第三方快捷登录按钮位于卡片下方。',
      en: 'The three core regions of the sign-in page: one complete password login path; third-party quick sign-in buttons sit below the card.',
    },
    items: [
      { h: { zh: '邮箱输入框', en: 'Email field' }, d: { zh: '帐号即邮箱地址；注册码模式下，本页亦可携带 `?code=` 邀请码参数直接预填注册表单。', en: 'The account is the email address itself. In reg-key mode this page also accepts an `?code=` invite parameter that pre-fills the registration form.' } },
      { h: { zh: '密码输入框', en: 'Password field' }, d: { zh: '口令经加盐哈希存储，服务端不接触明文；忘记密码经弹窗跳转外部申诉门户，携带申诉类型、界面语言与邮箱参数。', en: 'Passwords are stored as salted hashes — the server never sees plaintext. "Forgot password" hops to the external appeal portal carrying the appeal type, UI language and email.' } },
      { h: { zh: '登录按钮', en: 'Sign-in button' }, d: { zh: '提交后，已开启两步验证的帐号进入第二验证；连续失败触发防爆破锁定。勾选「保持轨道连接」后本设备 30 天内免重复验证。', en: 'On submit, accounts with two-step verification continue to the second factor; repeated failures trigger brute-force lockout. Tick "keep this device trusted" to skip re-verification for 30 days.' } },
    ],
  },
  'twofa-guide.png': {
    summary: {
      zh: '安全设置页的四个标注分区：上部是帐号凭据的修改入口，下部两步验证中心并列三种第二验证方式，可并用。',
      en: 'Four regions of the security page: the credential change entry on top, and the two-step-verification centre listing three second factors that can be combined.',
    },
    items: [
      { h: { zh: '用户名与密码卡', en: 'Username and password card' }, d: { zh: '修改用户名与登录密码并显示上次变更时间；停用两步验证亦需在此输入密码加动态码确认。', en: 'Change the username and password, with the last change shown. Disabling two-step verification also requires the password plus a dynamic code here.' } },
      { h: { zh: '验证器应用（TOTP）', en: 'Authenticator app (TOTP)' }, d: { zh: '扫码绑定后每 30 秒产生 6 位动态码；绑定完成随即展示 10 组恢复码，每组仅可用一次，用于验证器不可用时登录。', en: 'After scanning the QR code it yields a 6-digit code every 30 seconds. Completing binding immediately reveals 10 recovery codes, each single-use, for moments when the app is unavailable.' } },
      { h: { zh: '备用恢复码', en: 'Backup recovery codes' }, d: { zh: '验证器不可用时的登录后备：卡片实时显示剩余可用数量；查看完整恢复码或重新生成需输入帐号密码，重置后旧码全部作废。', en: 'The fallback when the app is gone. The card shows how many remain; revealing the full codes or regenerating requires the account password, and a reset voids all old codes.' } },
      { h: { zh: '通行密钥（Passkey）', en: 'Passkeys' }, d: { zh: '硬件安全密钥或设备生物识别：新注册的密钥经已绑定的验证器批准立即激活（或等 30 天时效锁自动激活），激活后可用「测试」验证解锁流程。', en: 'Hardware security keys or device biometrics. A newly registered passkey activates once approved by the bound authenticator (or automatically after a 30-day time lock); "Test" then verifies the unlock flow.' } },
    ],
  },
  'apps-guide.png': {
    summary: {
      zh: '应用管理页的五个标注分区：页顶四个接入端点与一张示例应用卡，构成第三方接入「查端点—领凭据—抄代码」的闭环。',
      en: 'Five regions of the apps page: four endpoints on top and one sample-app card, closing the loop of "find the endpoint — get credentials — copy the snippet".',
    },
    items: [
      { h: { zh: '`/.well-known/openid-configuration`', en: '`/.well-known/openid-configuration`' }, d: { zh: 'OIDC Discovery 元数据端点：issuer、各端点与支持项自述，第三方框架（如 NextAuth）据此自动发现配置。', en: 'The OIDC Discovery metadata endpoint: issuer, endpoints and capabilities, self-described so frameworks like NextAuth can auto-configure.' } },
      { h: { zh: '`/oauth/authorize`', en: '`/oauth/authorize`' }, d: { zh: '用户授权端点：引导用户登录并同意授权；弹窗场景经 `postMessage` 回传结果，用户取消则回跳携带 `error=access_denied`。', en: 'The user-consent endpoint: it walks the user through signing in and granting scope. Popups get the result via `postMessage`; a cancellation redirects back with `error=access_denied`.' } },
      { h: { zh: '`/api/oauth/token`', en: '`/api/oauth/token`' }, d: { zh: '令牌置换端点：以一次性授权码（5 分钟有效）换取 2 小时有效的访问令牌与 ID Token；支持 JSON、表单与 HTTP Basic 三种传参，配置 PKCE 时校验 `code_verifier`（S256）。', en: 'The token endpoint: a one-time code (valid 5 minutes) exchanges for a 2-hour access token and ID Token. Accepts JSON, form and HTTP Basic; with PKCE configured it verifies `code_verifier` (S256).' } },
      { h: { zh: '`/api/oauth/userinfo`', en: '`/api/oauth/userinfo`' }, d: { zh: '用户资料端点：以 Bearer 访问令牌读取 `sub`、`email`、`name`、`picture` 等已授权字段；令牌过期或被撤销时返回 401。', en: 'The userinfo endpoint: a Bearer access token reads the granted fields (`sub`, `email`, `name`, `picture`, …). Expired or revoked tokens get a 401.' } },
      { h: { zh: '应用卡片（shijianus-blog）', en: 'App card (shijianus-blog)' }, d: { zh: '每应用一张卡：Client ID 与 Client Secret（Secret 仅在创建或重置时完整显示一次）、启停开关、编辑/删除，以及内置 NextAuth、Node、Python、cURL 与通用 OIDC 五套可复制的集成代码。', en: 'One card per app: Client ID and Client Secret (the secret is shown in full only once, at creation or reset), an enable toggle, edit/delete, and five copy-ready integration snippets — NextAuth, Node, Python, cURL and generic OIDC.' } },
    ],
  },
  'notify-guide.png': {
    summary: {
      zh: '「资料」页的三个导出卡与「邮件与消息转发」标题区：上面管数据带走的格式，下面管新邮件进来的实时触达。',
      en: 'Three export cards and the forwarding header on the data page: the top half governs how data leaves, the bottom half how incoming mail reaches you in real time.',
    },
    items: [
      { h: { zh: '汇出全量数据卡', en: 'Full-data export card' }, d: { zh: 'JSON 完整备份：帐号个资、历史邮件全文、通讯录、分类与标签规则及安全设置一次打包下载，是行使数据可携权的主入口。', en: 'A complete JSON backup — profile, full mail history, contacts, label rules and security settings in one package; the primary entry for data-portability requests.' } },
      { h: { zh: '邮件历史归档卡', en: 'Mail archive card' }, d: { zh: '仅导出收发邮件：MBOX（通用格式，可直接导入多数邮件客户端）、JSON 或 CSV 三种格式，并可限定时间范围。', en: 'Exports mail only, in MBOX (the universal format most clients import), JSON or CSV, optionally bounded by a time range.' } },
      { h: { zh: '通讯录与配置卡', en: 'Contacts and preferences card' }, d: { zh: '第三类导出：联系人名录、自定义别名规则与系统个性化偏好。它是三张卡里最小的一份，却决定换实例后能否延续既有收发习惯——别名规则与标签体系一并带走，免去重新命名与重新分类。', en: 'The third export: the contact book, custom alias rules and personalisation preferences. The smallest of the three, yet it decides whether your habits survive a move — alias rules and the label taxonomy travel with it, so nothing has to be renamed or reclassified.' } },
      { h: { zh: '邮件与消息转发标题区', en: 'Forwarding header region' }, d: { zh: '两项实时触达能力：Telegram 消息推送（绑定私有机器人，按全部或仅重要与验证码推送，附 7 日有效的站内阅读链接）与自动转发（目的地、触发类型与 `[Fwd]` 标头）。', en: 'Two real-time channels: Telegram push (bind your own bot; all mail or important + verification codes only, with a 7-day in-site read link) and auto-forwarding (destinations, trigger type and the `[Fwd]` tag).' } },
    ],
  },
  'analysis-guide.png': {
    summary: {
      zh: '分析页首屏的三张仪表：来源分布回答「邮件从哪来」，两条增长曲线回答「实例的活跃趋势」。',
      en: 'The three headline gauges of the analysis page: the source mix answers where mail comes from, the two growth curves answer how active the instance is.',
    },
    items: [
      { h: { zh: '邮件来源分布', en: 'Mail source mix' }, d: { zh: '站内直投与外部通道等入站构成占比，据此评估投递通道健康度；治理效果（拦截率与垃圾量）回分类管理复核。', en: 'The inbound mix across direct in-site delivery and external channels, a health check for the delivery channel; revisit the classification rules to verify filtering results.' } },
      { h: { zh: '用户增长曲线', en: 'User growth curve' }, d: { zh: '注册用户数与活跃用户数的时间走势；对照权限控制页的分组配额，判断何时需要扩容或调整默认分组。', en: 'Registered versus active users over time; read it against the role quotas to decide when to expand or change the default role.' } },
      { h: { zh: '邮件增长曲线', en: 'Mail growth curve' }, d: { zh: '收发总量的时间走势；配合同页的 AI 调用趋势，核对系统设置中 AI Hub 的每日配额与速率限制是否合理。', en: 'Sent and received volume over time; together with the AI-usage trend on the same page, it tells you whether the AI Hub\'s daily quota and rate limits still fit.' } },
    ],
  },
  'users-guide.png': {
    summary: {
      zh: '用户列表的四个标注分区：从检索定位到行内处置，管理员的帐号管理动线一屏完成。',
      en: 'Four regions of the user list: from lookup to per-row actions, an account-management flow on a single screen.',
    },
    items: [
      { h: { zh: '邮箱检索框', en: 'Email search box' }, d: { zh: '顶部按邮箱检索定位帐号，分页与排序即查即得；配合列表中的收发量、存储占用与垃圾/被举报计数快速锁定异常帐号。', en: 'Locate accounts by email at the top, with instant paging and sorting; combined with the per-row sent/received, storage and spam/report counters, anomalies surface fast.' } },
      { h: { zh: '用户邮箱列', en: 'Email column' }, d: { zh: '帐号的唯一标识：邮箱即帐号名，登录、收信与一切授权都以它为准。行内操作（重置密码、调整分组、封禁）作用于本列所指的帐号；同页另有收发量、存储占用与垃圾／被举报计数三列，用于判断某帐号是否异常。', en: 'The account\'s unique identity — the email is the account, the key for signing in, receiving mail and every grant. Row actions (reset password, change role, ban) apply to the account this column names; the other counters on the page — sent/received, storage, spam and reports — are what tell you whether an account looks abnormal.' } },
      { h: { zh: '存储空间列', en: 'Storage column' }, d: { zh: '该帐号附件存储的实时用量，对照其身份分组配额（见权限控制页）判断是否需要扩容或清理。', en: 'Live attachment-storage usage for the account; read it against the role quota to decide on expansion or clean-up.' } },
      { h: { zh: '设置（操作）列', en: 'Actions column' }, d: { zh: '行内管理操作：重置密码（签发一次性密码）、调整身份分组、重置两步验证、封禁与恢复，以及清空用户邮件（不可逆，慎用）。', en: 'Per-row operations: reset password (issues a one-time password), change role, reset two-step verification, ban and restore, and purge the account\'s mail (irreversible — use with care).' } },
    ],
  },
  'review-guide.png': {
    summary: {
      zh: '全库邮件审查在隐私模式（Level 2）下的样貌：分区显示为「垃圾邮件」，检索框与空状态是本图的两个标注点。',
      en: 'The mail-review section under private mode (Level 2): the section reads "Spam", and the search box plus the empty state are the two annotated regions.',
    },
    items: [
      { h: { zh: '检索框', en: 'Search box' }, d: { zh: '支持 `$` 高级语法面向全库：`$sender`/`$user`/`$to`/`$subject` 加状态 token；在结果列表右键任一邮件，可直接按其发件人、收件帐号或所属用户发起新一轮检索。', en: 'Accepts the `$` syntax across all mail: `$sender`/`$user`/`$to`/`$subject` plus status tokens. Right-click any result to start a new search by its sender, recipient account or owning user.' } },
      { h: { zh: '侧栏分区名', en: 'Section name in the sidebar' }, d: { zh: '名称与可见范围随邮件模式变化：Level 1 显示「全部邮件」、Level 2 显示「垃圾邮件」、Level 3 整段隐藏入口。', en: 'The name and scope follow the mail mode: Level 1 shows "All mail", Level 2 shows "Spam", and Level 3 hides the entry entirely.' } },
      { h: { zh: '空状态区', en: 'Empty state' }, d: { zh: '当前无隔离邮件时的占位提示；有隔离邮件时此区为列表，点开单封进入详情抽屉，可执行物理删除（区别于用户侧回收站，操作留痕）。', en: 'The placeholder when nothing is quarantined. With quarantined mail it becomes a list; opening a row slides in the detail drawer, where physical deletion (unlike the user trash bin, it is logged) is available.' } },
    ],
  },
  'regkeys-guide.png': {
    summary: {
      zh: '注册密钥页在尚未签发任何邀请码时的空状态：一个签发按钮与一个搜索框构成本页全部分区。',
      en: 'The reg-keys page with no invite codes issued yet: one issuing button and one search box make up the whole page.',
    },
    items: [
      { h: { zh: '添加注册码按钮', en: 'Add-key button' }, d: { zh: '签发入口：弹窗内一次生成一条 8 位随机码（可点击刷新重新生成），并绑定注册后进入的身份分组、有效期与可用次数（1–99999，每成功注册一次扣减一次）。', en: 'The issuing entry: the dialog generates an 8-character random code (refreshable), bound to a role, an expiry date and a use count (1–99999, one decrement per successful registration).' } },
      { h: { zh: '注册码搜索框', en: 'Key search box' }, d: { zh: '签发后按注册码筛选定位，查看剩余次数、绑定分组与有效期；访客视角的敏感字段自动脱敏。', en: 'After issuing, filter and locate codes here, checking remaining uses, bound role and expiry; sensitive fields are masked for visitor-level viewers.' } },
      { h: { zh: '空状态卡片', en: 'Empty-state card' }, d: { zh: '实例尚未签发任何注册码时的引导占位；签发后此区变为码列表，附一键复制、使用记录查验、单条删除与「清理未用」批量作废。', en: 'The guide shown before any code exists. After issuing, it becomes the code list with one-click copy, usage records, single deletion and a "clean unused" bulk void.' } },
    ],
  },
  'labels-guide.png': {
    summary: {
      zh: '标签页的三个标注分区：一个新建入口与标签行内的计数、开关，对应标签管理的全部日常操作。',
      en: 'Three regions of the labels page: one creation entry plus the per-row counters and toggles — everything labels need day to day.',
    },
    items: [
      { h: { zh: '新建标签按钮', en: 'New-label button' }, d: { zh: '创建自定义标签并命名；侧栏标签区至多显示 7 个，出厂预置社群、订阅、推销、工作四个。', en: 'Creates a custom label. The sidebar shows at most 7; four ship by default — Social, Subscriptions, Promotions and Work.' } },
      { h: { zh: '标签行', en: 'Label row' }, d: { zh: '每行一张卡：彩色标签徽标（内置图标库任选或自定义 SVG，色板自定义）与涵盖总数、当前数量、未处理三个实时计数。', en: 'One card per label: a coloured chip (icon from the built-in library or custom SVG, custom colour) plus three live counters — total, current and unhandled.' } },
      { h: { zh: '显示开关与行内操作', en: 'Visibility toggle and row actions' }, d: { zh: '开关控制该标签是否显示于侧栏；编辑改外观与规则，删除标签同时解除其在分类规则中的引用。', en: 'The toggle controls sidebar visibility; Edit changes look and rules; deleting a label also unbinds it from any classification rules.' } },
    ],
  },
  'preferences-guide.png': {
    summary: {
      zh: '个资页的四张卡片：从身份形象到联系方式再到地址簿，个人资料的四个维度分卡管理。',
      en: 'The four cards of the profile page: identity, contact, addresses and linked settings — four dimensions of your personal data, card by card.',
    },
    items: [
      { h: { zh: '基本信息卡', en: 'Basics card' }, d: { zh: '头像上传、个人昵称、性别与生日；昵称与头像是否对外展示，受管理员「公开个人主页」开关约束。', en: 'Avatar upload, display name, gender and birthday. Whether name and avatar appear publicly is gated by the operator\'s "public profile" switch.' } },
      { h: { zh: '联系信息卡', en: 'Contact card' }, d: { zh: '登录主邮箱带「主邮箱」标记且不可移除；可添加多个额外电子邮箱并随时移除，另可登记含区号的电话号码。', en: 'The sign-in mailbox carries a "primary" tag and cannot be removed; extra mailboxes can be added and dropped at will, plus a phone number with area code.' } },
      { h: { zh: '地址卡', en: 'Address cards' }, d: { zh: '住家、公司与其他三组地址分别保存，各自独立增删与编辑。它们是纯粹的个资留存字段：不参与邮件投递、不影响计费与身份分组；是否需要填写、以及是否对外展示，取决于营运者是否开启「公开个人主页」。', en: 'Home, company and other addresses are stored separately, each added, edited and removed on its own. They are profile data in the strict sense: never used for delivery, never affecting billing or the role. Whether they are needed at all — and whether they show publicly — depends on the operator public-profile switch.' } },
      { h: { zh: '关联设置与安全卡', en: 'Linked settings and security card' }, d: { zh: '个资页通往其他设置页的跳板：帐号安全（用户名与密码、两步验证）与第三方授权（已授权应用）两处最常用的入口集中在此，避免在个资页与安全页之间反复翻找；点击即跳至对应分区，而非另开新页。', en: 'The springboard from the profile page into the other settings pages: account security (username, password, two-step verification) and third-party grants (authorised apps) sit together here, so you need not hunt back and forth between the profile and security pages. Each entry jumps to the matching section rather than opening a new page.' } },
    ],
  },
  'general-guide.png': {
    summary: {
      zh: '常规页的三张卡片：个人简介、个性装扮与偏好设置，覆盖界面外观与阅读习惯的全部个性化。',
      en: 'The three cards of the general page — bio, personalisation and preferences — covering every aspect of look and reading habits.',
    },
    items: [
      { h: { zh: '个人简介卡', en: 'Bio card' }, d: { zh: '一段展示于公开个人主页的简介文本；公开主页是否开放由管理员「公开个人主页」开关决定。', en: 'A short text shown on your public profile page; whether that page is reachable is decided by the operator\'s "public profile" switch.' } },
      { h: { zh: '个性装扮卡', en: 'Personalisation card' }, d: { zh: '外观色调三态（暗色/亮色/跟随系统，顶栏可快捷切换）与全局主题壁纸（八种预设 + 自定义壁纸或 URL）；另有个人背景（仅覆盖信箱区）与界面密度。', en: 'Three theme modes (dark/light/system, also switchable from the top bar) and the global wallpaper (eight presets plus custom image or URL); a personal background (mailbox area only) and UI density are here too.' } },
      { h: { zh: '偏好卡', en: 'Preferences card' }, d: { zh: '阅读偏好（收件箱类型、阅读窗格位置、会话视图）与语言（界面语言六选一、AI 翻译目标语言 16 选一）；数据隐私区集中个人信息与 AI 处理偏好入口。', en: 'Reading preferences (inbox type, reading-pane position, conversation view) and language (UI in one of six; AI translation target in one of 16). The data-privacy group gathers personal-info and AI-processing preferences.' } },
    ],
  },
  'data-guide.png': {
    summary: {
      zh: '资料页的四张卡片：数据带走的三个格式、一个转发区、一个存储区与一个第三方授权区，个人数据自主的完整界面。',
      en: 'The four cards of the data page: three export formats, a forwarding region, a storage region and a third-party grants region — personal data autonomy in one screen.',
    },
    items: [
      { h: { zh: '用户资料与数据汇出卡', en: 'Export card' }, d: { zh: '三类导出并列：全量 JSON 备份、邮件历史归档（MBOX/JSON/CSV + 时间范围）与通讯录配置；单封邮件另可在阅读页下载 .eml。', en: 'Three exports side by side: the full JSON backup, the mail archive (MBOX/JSON/CSV with time range) and contacts & preferences; individual messages can also be downloaded as .eml from the reading pane.' } },
      { h: { zh: '邮件与消息转发卡', en: 'Forwarding card' }, d: { zh: 'Telegram 消息推送与自动转发的逐项配置；两项功能是否对帐号开放由管理员「用户资料控制」开关决定。', en: 'Item-by-item settings for Telegram push and auto-forwarding; whether the account may use them is decided by the operator\'s "user data control" switches.' } },
      { h: { zh: '存储空间卡', en: 'Storage card' }, d: { zh: '附件存储用量仪表实时对照配额；可接入自备 Backblaze B2/S3 存储桶，接入后新附件直存个人云端、不受实例配额约束，解除接入即回落。', en: 'A live usage gauge against the quota. Connect your own Backblaze B2/S3 bucket and new attachments land in your cloud, outside the instance quota; disconnecting falls back to instance storage.' } },
      { h: { zh: '第三方应用和服务卡', en: 'Third-party apps card' }, d: { zh: '用户名下全部 OAuth 授权的应用列表：逐应用移除访问权限，或经详情弹窗一键撤销全部；撤销即时生效，应用现有令牌立即失效。', en: 'Every OAuth grant on the account: revoke per app or all at once from the detail dialog. Revocation is immediate — the app\'s existing tokens die at once.' } },
    ],
  },
  'audit-guide.png': {
    summary: {
      zh: '操作报告页的四列表格：一条预警工单从「谁」到「为何触发」再到「证据何在」的完整信息链。',
      en: 'The four-column table of the audit page: the full information chain of one ticket, from "who" through "why it fired" to "where the evidence is".',
    },
    items: [
      { h: { zh: '用户邮箱列', en: 'Email column' }, d: { zh: '这张工单所指向的帐号：可能是被处置对象（风控／封禁预警）、被检举方（审计预警）或申诉人（申诉警告）。本页只做研判，真正的处置动作——封禁、恢复、重置——在用户列表页执行，因此研判结论需与那一页配合使用。', en: 'The account this ticket points at: the subject of a risk-control or ban alert, the reported party in an audit alert, or the appellant in an appeal ticket. This page adjudicates only — the actual actions (ban, restore, reset) are executed from the users page, so a verdict here is used together with that page.' } },
      { h: { zh: '安全审计等级列', en: 'Audit-level column' }, d: { zh: '风险分级（P0/P1 优先级与类别标签）：审计/风控/封禁/申诉四类预警各有常见处置分流。', en: 'The risk grading (P0/P1 priority with category tags): audit, risk-control, ban and appeal tickets each carry their own handling path.' } },
      { h: { zh: '预警说明与触发特征列', en: 'Alert-notes column' }, d: { zh: '该工单的触发情形描述（如多地多 IP 并发登录、检举成立），是研判放行或驳回的判断依据。', en: 'What triggered the ticket — concurrent logins from many IPs, an upheld report, etc. This is the basis for approving or rejecting.' } },
      { h: { zh: '活跃环境池列', en: 'Environment-pool column' }, d: { zh: '纯文本展示的完整环境信息：IP、地理、设备与指纹；加密模式（Level 3）下时间戳被剥离，工单仍可研判。', en: 'The full environment in plain text: IP, geo, device and fingerprint. In encrypted mode (Level 3) timestamps are stripped, yet tickets stay reviewable.' } },
    ],
  },
  'system-guide.png': {
    summary: {
      zh: '系统设置页的五张核心配置卡（全页共十一张）：实例级配置按主题分卡，本图标注使用频率最高的五张。',
      en: 'Five of the eleven configuration cards on the system page: instance-level settings grouped by theme — here the five most-used.',
    },
    items: [
      { h: { zh: '网站设置卡', en: 'Site-settings card' }, d: { zh: '实例总开关群：开放注册、公开个人主页、邮件模式（三档）、两步验证、隐藏登录域名、注册码、添加邮箱、多账户快速切换与邮箱前缀规则。', en: 'The master switches: open registration, public profiles, mail mode (three tiers), two-step verification, hide the login domain, reg-keys, extra mailboxes, multi-account quick switching and mailbox prefix rules.' } },
      { h: { zh: '个性化设置卡', en: 'Personalisation card' }, d: { zh: '实例的对外门面：网站标题决定登录页与浏览器标签的品牌名，弹窗提示自定义全站提示文案，动态／静态界面则决定登录面是否播放动效——静态模式对低性能设备与截图留证更友好。改动即时对全部用户生效。', en: 'The public face of the instance: the site title brands both the sign-in page and the browser tab, the dialog text overrides the built-in prompt copy, and the dynamic/static switch decides whether the sign-in page animates — static suits low-powered devices and screenshot evidence better. Changes apply to everyone at once.' } },
      { h: { zh: '存储与核心数据库卡', en: 'Storage and databases card' }, d: { zh: '对象存储（B2/S3，缺省回退 R2/KV）、核心与第三方数据库架构、单附件上限与级联删除、KV 缓存体检。', en: 'Object storage (B2/S3 with R2/KV fallback), core and third-party database backends, the per-attachment cap with cascade deletion, and KV cache diagnostics.' } },
      { h: { zh: 'AI 智能引擎卡', en: 'AI engine card' }, d: { zh: 'AI 提供商二选一（自定义 OpenAI 兼容端点或 Cloudflare Workers AI）、启用开关、每日配额与速率限制、按身份分组的模型授权。', en: 'The AI provider (custom OpenAI-compatible endpoint or Cloudflare Workers AI), the enable switch, daily quota and rate limits, and per-role model grants.' } },
      { h: { zh: '用户资料控制卡', en: 'User data control card' }, d: { zh: '普通用户在「资料」页的能力开关：Telegram 推送、邮件转发、第三方 API 支援、自带存储与默认存储配额；数据汇出始终开放，不受此卡约束。', en: 'What regular users may do on the data page: Telegram push, mail forwarding, third-party API support, bring-your-own storage and the default storage quota. Data export stays open regardless of this card.' } },
    ],
  },
  'category-guide.png': {
    summary: {
      zh: '分类管理页的四张治理卡：从收发总闸到 AI 识别再到名单与硬拦截，站点级收信治理的四层防线。',
      en: 'The four governance cards of the classification page: master switches, AI recognition, lists and hard blocks — four defensive layers for inbound mail.',
    },
    items: [
      { h: { zh: '邮件设置卡（收发开关）', en: 'Mail switches card' }, d: { zh: '收信、发信与自动刷新的总开关，及无收件人邮件的处理开关；关闭收信后入站邮件直接拒收。', en: 'Master switches for receiving, sending and auto-refresh, plus the ownerless-mail policy. With receiving off, inbound mail is rejected outright.' } },
      { h: { zh: 'AI 模型与 API 密钥集成卡', en: 'AI model and API-key card' }, d: { zh: 'Workers AI 验证码提取及其规则、AI API Key/URL/模型配置——与系统设置 AI Hub 同源，此处控制的是入站识别行为（验证码徽标等）。', en: 'Workers AI verification-code extraction and its rules, plus the AI API key/URL/model — same source as the AI Hub; here it governs inbound recognition (code badges, etc.).' } },
      { h: { zh: '基础名单规则卡', en: 'Base lists card' }, d: { zh: '发件人黑名单（可配置为标签模式或直接拦截）、白名单模式（仅白名单内发件人可送达）、主题与内容关键词黑名单、空发件人拦截、非收件人拦截与可执行附件拦截。', en: 'Sender blocklist (tag mode or outright rejection), allowlist mode (only allowlisted senders get through), subject/content keyword blocklists, empty-sender and non-recipient rejection, and executable-attachment blocking.' } },
      { h: { zh: '硬拦截规则卡', en: 'Hard-block card' }, d: { zh: '直接拒收并累计拦截计数的终局手段；名单命中自动打上对应标签，拦截效果可回分析页复核。', en: 'The terminal measure: reject outright and count every attempt. List hits auto-tag the mail; verify the effect on the analysis page.' } },
    ],
  },
  // —— 未标注图（无编号徽章，分区名导览）——
  'ui-compose.png': {
    plain: true,
    summary: {
      zh: '写信弹层自上而下的分区：发件人锁定、收件人与主题、富文本工具栏、正文编辑区与底部动作条。',
      en: 'The compose overlay top to bottom: locked sender, recipients and subject, the rich-text toolbar, the body editor and the bottom action bar.',
    },
    items: [
      { h: { zh: '发件人行', en: 'Sender row' }, d: { zh: '发件人锁定为当前登录信箱，写信时不可手工改写，因此本平台发出的邮件不存在 From 伪造。多信箱帐号可在此下拉切换发件身份，寄出后收件人看到的是所选信箱；发件人地址亦决定出站邮件走哪条投递通道。', en: 'The sender is locked to the signed-in mailbox and cannot be edited while composing, so mail from this platform cannot carry a forged From. Multi-mailbox accounts switch sending identity in this row; recipients see whichever mailbox was chosen. The sender address also decides which delivery channel the outbound mail takes.' } },
      { h: { zh: '收件人与主题行', en: 'Recipient and subject rows' }, d: { zh: '收件人支持联系人选择与 `?composeTo=` 深链预填；主题进入列表展示并可被 `subject:` 检索。', en: 'Recipients accept contact picking and the `?composeTo=` deep link; the subject appears in lists and is searchable via `subject:`.' } },
      { h: { zh: '工具栏与正文区', en: 'Toolbar and body' }, d: { zh: '17 项排版工具：段落、字号、字样式、颜色、对齐、列表、引用、链接、图片、表格、表情、翻译与源码模式。', en: '17 formatting tools: paragraph, size, styles, colour, alignment, lists, quote, link, image, table, emoji, translation and source mode.' } },
      { h: { zh: '底部动作条', en: 'Bottom action bar' }, d: { zh: '附件按钮（能力依角色开启，单附件上限依实例设置）与发送按钮；站内直投、站外经营运者配置通道投递。', en: 'The attachment button (role-gated, per-instance size cap) and Send; in-site delivery is direct, off-site goes through the operator\'s channel.' } },
    ],
  },
  'ui-settings-general.png': {
    plain: true,
    summary: {
      zh: '常规设置分区的外观样貌：左栏为五个设置分区的导航，右区为常规项（外观色调、主题壁纸等）。',
      en: 'How the general settings section looks: the left rail navigates the five settings sections; the right pane holds the general items (theme, wallpaper, …).',
    },
    items: [
      { h: { zh: '左栏分区导航', en: 'Section rail' }, d: { zh: '个资/常规/安全/资料/标签五分区切换；进入设置后邮件侧栏隐藏，由「返回邮件」回主界面。', en: 'Switches among Profile/General/Security/Data/Labels; entering settings hides the mail sidebar until "back to mail".' } },
      { h: { zh: '个性装扮区', en: 'Personalisation group' }, d: { zh: '外观色调三态（暗色／亮色／跟随系统）与全局主题壁纸（八种预设 + 自定义图片或 URL）。范围是全站所有视图，与仅覆盖信箱区的「个人背景」不同；顶栏另有色调快捷切换，不必回到本页。', en: 'Three theme modes (dark/light/system) and the global wallpaper (eight presets plus a custom image or URL). Its scope is every view in the app — unlike the personal background, which covers the mailbox area only. The top bar also carries a quick theme toggle, so you need not return here.' } },
      { h: { zh: '其余分组', en: 'Remaining groups' }, d: { zh: '本页剩余三组设置：阅读偏好（收件箱类型、阅读窗格位置、会话视图）、语言（界面语言六选一、AI 翻译目标语言 16 选一）与数据隐私（个人信息处理与 AI 处理偏好的集中入口）。此图仅示左栏与面貌，逐项含义见设置指南第 3 节。', en: 'The three remaining groups on this page: reading preferences (inbox type, reading-pane position, conversation view), language (one of six UI languages, one of sixteen AI translation targets) and data privacy (the hub for personal-info and AI-processing preferences). This figure shows only the rail and the look; Section 3 of the settings guide explains each item.' } },
    ],
  },
  'ui-audit-report.png': {
    plain: true,
    summary: {
      zh: '操作报告页的管理端样貌：预警工单表格化研判，处置按钮按预警类别分流。',
      en: 'The audit page as admins see it: tickets in a table, with actions branching by ticket category.',
    },
    items: [
      { h: { zh: '工单表格', en: 'Ticket table' }, d: { zh: '每行一条预警工单，列含类别（审计／风控／封禁／申诉）、优先级（P0／P1）、当前状态，以及活跃环境池的纯文本信息——IP、地理、设备与指纹。环境池按请求行为聚合，同一帐号在多 IP 并发登录时才会累积出可见的异常特征。', en: 'One alert per row, with columns for category (audit, risk control, ban, appeal), priority (P0/P1), current status and the environment pool in plain text — IP, geo, device and fingerprint. The pool aggregates by request behaviour, so the anomaly only becomes visible once one account logs in concurrently from many IPs.' } },
      { h: { zh: '处置按钮', en: 'Action buttons' }, d: { zh: '按钮随工单类别分流：申诉警告把「研判放行」提到最显眼处（放行即恢复帐号），封禁警告突出「解除预警」，其余类别走标准操作菜单。按钮只提交研判结论，真正的封禁与恢复仍由用户列表页落地，两页状态同步。', en: 'The buttons branch by ticket category: appeal tickets foreground "release after review" (releasing restores the account), ban tickets foreground "lift the alert", and the rest fall back to the standard action menu. The button records only the verdict; the ban or restore itself is executed from the users page, and the two pages stay in sync.' } },
      { h: { zh: '模式联动', en: 'Mode coupling' }, d: { zh: '同一张表在三种邮件模式下形态不同：全部邮件模式（L1）信息最全；隐私模式（L2）下本页即图中样貌；加密模式（L3）记录时间戳被剥离、时间列隐藏，管理员只能凭类别与环境池研判，无法还原事件发生次序。', en: 'One table, three shapes: under all-mail mode (L1) it carries the most information; under private mode (L2) it looks as in this figure; under encrypted mode (L3) timestamps are stripped and the time column hides, leaving the admin to adjudicate from category and environment pool alone, without any way to reconstruct the order of events.' } },
    ],
  },
  'ui-login-oauth.png': {
    plain: true,
    summary: {
      zh: '登录面的整体样貌：同一登录卡承载密码登录、两步验证、第三方快捷登录、注册与忘记密码全部流程。',
      en: 'The sign-in page at large: one card hosts password login, two-step verification, third-party sign-in, registration and password recovery.',
    },
    items: [
      { h: { zh: '输入区', en: 'Input area' }, d: { zh: '本页最常走的路径：邮箱即帐号，密码经加盐哈希存储、服务端不接触明文。连续失败会触发防爆破锁定，锁定粒度与时长由后端策略决定；勾选「保持轨道连接」后本设备 30 天内免重复验证。', en: 'The path most visitors take: the email is the account, and the password is stored as a salted hash — the server never sees plaintext. Repeated failures trigger brute-force lockout, whose granularity and duration the backend decides; ticking keep-this-device-trusted skips re-verification for 30 days.' } },
      { h: { zh: '第三方按钮区', en: 'Third-party area' }, d: { zh: '管理员启用并配置密钥的提供商显示为按钮；开启而未配置密钥的灰显「即将上线」，未启用的不显示。', en: 'Providers the admin enabled and keyed appear as buttons; enabled-but-unkeyed ones show greyed as "coming soon"; the rest never appear.' } },
      { h: { zh: '其余流程', en: 'Other flows' }, d: { zh: '同一张卡还承载另外三条路径：已开启两步验证的帐号提交后进入第二验证（TOTP、恢复码或通行密钥）；注册码模式下可携带 code 参数直接预填注册表单；「忘记密码」跳转外部申诉门户并带上申诉类型、界面语言与邮箱。逐条规则见运行模式第 4 节。', en: 'The same card carries three further paths: accounts with two-step verification continue to a second factor (TOTP, a recovery code or a passkey); in reg-key mode a code parameter pre-fills the registration form; and forgot-password hops to the external appeal portal carrying the appeal type, UI language and email. Section 4 of the modes page has the rules.' } },
    ],
  },
  'ui-detail-verification.png': {
    plain: true,
    summary: {
      zh: '邮件详情中的验证码提取效果：6 位验证码以大字号呈现，列表与详情均带绿色徽标。',
      en: 'Verification-code extraction in the reading pane: the 6-digit code in large type, with a green badge on both list and detail.',
    },
    items: [
      { h: { zh: '验证码大字区', en: 'Large-code region' }, d: { zh: 'Workers AI 从主题与正文前 6,000 字符中提取的验证码，直接以大字号呈现便于抄写。', en: 'The code extracted by Workers AI from the subject and the first 6,000 characters of the body, displayed large for easy copying.' } },
      { h: { zh: '绿色徽标', en: 'Green badge' }, d: { zh: '列表行与详情页同步出现的绿色标记，含义是「此邮件含已提取的验证码」，让您不必逐封打开即可从列表直接辨认。徽标只在提取成功时出现；未命中或已关闭验证码提取时不显示，因此它的缺失不代表安全，只代表没有可抄的码。', en: 'The green mark that appears on both the list row and the detail: it means this message carries an extracted verification code, so you can spot such mail straight from the list without opening each one. It appears only on a successful extraction — absence does not mean the mail is safe, merely that there is no code to copy.' } },
      { h: { zh: '边界', en: 'Boundary' }, d: { zh: '此为唯一非经手动触发之 AI 处理，可于常规设置关闭；处理范围与退出方式见隐私政策第 6 节。', en: 'The only AI processing not triggered manually; it can be turned off in general settings. Scope and opt-out in Section 6 of the privacy policy.' } },
    ],
  },
  'ui-inbox-en.png': {
    plain: true,
    summary: {
      zh: 'English 界面的收件箱：与中文版完全同构，词典六语言对称由静态审计脚本保障。',
      en: 'The inbox in English: structurally identical to the Chinese UI; dictionary symmetry across six languages is enforced by static audit scripts.',
    },
    items: [
      { h: { zh: '侧栏', en: 'Sidebar' }, d: { zh: 'Compose、Starred、Snoozed、Sent 等视图与 Social/Subscriptions/Promotions/Work 标签同构对应。', en: 'Compose, Starred, Snoozed, Sent and the Social/Subscriptions/Promotions/Work labels mirror the Chinese taxonomy.' } },
      { h: { zh: '列表', en: 'List' }, d: { zh: '发件人、主题、摘要与验证码徽标的位置、字号与配色与中文版逐项一致——本地化只替换词条，不改版式，因此截图与操作指引可跨语言复用。日期、数字与计数同样按界面语言格式化。', en: 'Sender, subject, preview and verification-code badges sit in exactly the same positions, sizes and colours as in the Chinese build: localisation swaps strings only, never layout, which is why screenshots and instructions carry across languages. Dates, numbers and counters are formatted per UI language too.' } },
      { h: { zh: '切换方式', en: 'Switching' }, d: { zh: '界面语言的切换点：常规设置的「语言」区六选一（简体中文、繁體中文、English、Español、Français、Nederlands），改后即刻生效、无需重登。投递与显示分开——系统通知与欢迎邮件按每位收件人自己的语言设置生成，不随发信人的界面语言走。', en: 'Where the UI language is set: one of six (simplified Chinese, traditional Chinese, English, Espanol, Francais, Nederlands) in the Language group of general settings, applied at once with no sign-out. Display and delivery are separate — system notices and welcome mail are generated in each recipient\'s own language, not the sender\'s UI language.' } },
    ],
  },
  'ui-inbox-mobile.png': {
    plain: true,
    summary: {
      zh: '375 宽度下的移动端收件箱：侧栏收合为抽屉，列表保持完整可读。',
      en: 'The inbox at 375 px: the sidebar collapses into a drawer while the list stays fully readable.',
    },
    items: [
      { h: { zh: '抽屉式侧栏', en: 'Drawer sidebar' }, d: { zh: '视窗宽度低于 1025 像素时，左栏自动收合为抽屉：点汉堡按钮以遮罩形式唤出，选中任一视图后自动收起，不遮挡阅读区。桌面端与移动端共用同一套侧栏结构，因此计数与标签在两种形态下完全一致。', en: 'Below 1025 px wide the left rail collapses into a drawer: the hamburger opens it over a scrim, and picking any view closes it again so the reading pane stays unobstructed. Desktop and mobile share one sidebar structure, so counters and labels read identically in both forms.' } },
      { h: { zh: '悬浮写信按钮', en: 'Floating compose button' }, d: { zh: '桌面端「写信」按钮在移动端的对应物，固定于右下角、随滚动常驻，点开即唤出全屏写信。它只在帐号具备发信权限时出现；参观者或已被关闭发信权限的分组看不到此按钮，也就无从进入写信流程。', en: 'The mobile counterpart of the desktop Compose button: pinned bottom-right, persistent while scrolling, and opening a full-screen composer on tap. It appears only for accounts with sending rights — a Visitor or a role with sending turned off never sees it, and so cannot reach the composer at all.' } },
      { h: { zh: '列表', en: 'List' }, d: { zh: '与桌面端共用同一份虚拟滚动列表：长列表只渲染视口内的行，首屏打开速度不随邮件总量增长。触控目标按移动端可达性放大，但信息密度与列构成与桌面一致，因此移动端截图同样可用于核对字段。', en: 'The same virtualised list as on desktop: a long mailbox renders only the rows in view, so first paint does not slow down as the mailbox grows. Touch targets are enlarged for mobile reachability, while information density and column structure stay identical — mobile screenshots remain valid for checking fields.' } },
    ],
  },
  'ui-account-menu.png': {
    plain: true,
    summary: {
      zh: '收件箱右上角展开的头像菜单：多账户切换与账户详情的聚合入口。',
      en: 'The avatar menu opened from the top-right corner: the hub for multi-account switching and account details.',
    },
    items: [
      { h: { zh: '帐号行', en: 'Account row' }, d: { zh: '当前帐号（admin·站长）与下拉切换箭头；多账户模式下列出全部已登录会话，路径以 `/mail/u/N/` 前缀隔离。', en: 'The current account (admin · Owner) with a switching chevron; in multi-account mode every signed-in session is listed, isolated under `/mail/u/N/` prefixes.' } },
      { h: { zh: '「管理您的 Epomail 账户」按钮', en: '"Manage your Epomail account" button' }, d: { zh: '添加账户的入口：点击后经登录页专用深链完成新帐号登录，回来即多出一个会话。关键在「不覆盖」——新帐号不挤掉当前会话，各帐号的工作区以 /mail/u/N/ 路径前缀彼此隔离，切换只是改前缀，不重新登录。', en: 'The add-account entry: it completes a new sign-in through the login page\'s dedicated deep link and returns with one more session. The point is that nothing is overwritten — the new account does not evict the current session, and each workspace is isolated behind a /mail/u/N/ path prefix, so switching merely changes the prefix rather than signing in again.' } },
      { h: { zh: '存储用量条', en: 'Storage bar' }, d: { zh: '当前帐号的附件存储进度条：分子是本帐号已占用的附件空间，分母是其身份分组的配额（逐分组出厂值见权限控制页）。接入个人对象存储后新附件不再计入此条，因此进度条停涨并不代表附件没有送达。', en: 'The progress bar for this account\'s attachment storage: the numerator is the space used, the denominator the quota attached to its role (per-role factory values on the roles page). Once personal object storage is connected, new attachments stop counting here — so a bar that stops growing does not mean attachments stopped arriving.' } },
    ],
  },
};
