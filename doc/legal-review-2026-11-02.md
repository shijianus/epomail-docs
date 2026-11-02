# EpoCanvas Mail 法律与数据说明修订审阅

审阅日期：2026-11-02。文档修订版：5.21。

已直接修订六语言服务条款、隐私政策及配套法律说明，按个人维护、免费、非营利学习测试项目设定合理服务范围，同时保留适用的强制数据保护与消费者权利。本报告记录源码证据、法律依据及尚须实际落实的事项；不将文本更新当作线上服务已全面符合 GDPR 的证明。

## 1. 审阅基线与方法

- 已对 `https://github.com/shijianus/epomail.git` 执行远端 fetch。远端默认分支为 `master`，审阅提交为 `3e1ef741eb57d77908c1f23ad83e6c0cee9e931d`，日期2026-10-29，主题 `docs(security): 回填 B8 交付哈希与处置结论`。
- 从该提交建立隔离、detached 的只读 worktree 审阅。应用本地 HEAD 为 `2c98faa0ab3f28950f558b78475b4a08b7764fb9`，另有32个未在该远端分支的提交及未提交修改；没有将其当成 GitHub 最新版本，也没有覆盖或合并其工作内容。
- 本次不访问生产邮件、不读取生产密钥、`.dev.vars` 或用户数据库；不改变应用配置、注册流程、生产功能开关及部署状态。
- 事实审阅覆盖入站／投递、密码与MFA、公开页、浏览器资源、AI、OAuth、Telegram、存储、匯出、账号停用、管理员删除及审计保存。代码路径显示的能力与风险不等于已在生产验证。
- 官方法律来源及台湾时效更正见 [legal-reference.md](legal-reference.md)。公开法律文件继续不逐条列法条号。

下列源码路径均相对上述应用提交，可在 [GitHub 固定提交树](https://github.com/shijianus/epomail/tree/3e1ef741eb57d77908c1f23ad83e6c0cee9e931d) 中核验。

## 2. 已完成的法律文本修订

| 主题 | 新文本的安排 |
| --- | --- |
| 非营利测试定位 | 明确个人维护、免费、学习／测试用途；无SLA、永久托管、全天候值班或企业备援承诺；避免作为紧急通讯及唯一关键备份 |
| 作者与运营者 | 只贡献代码不当然承担其他实例运营责任；作者实际运营或决定处理时按事实负责；MIT授权不自动免除服务法定义务 |
| 免责与责任上限 | 仅在法律允许时限制普通过失契约损害，以前12个月费用与100美元孰高；排除故意、重大过失、法定数据保护赔偿及不可排除消费者等责任，条款无效时适用法定责任 |
| GDPR与消费者保护 | 删除「只适用运营者所在地法律」；区分定向提供／监测与单纯可访问，保留消费者本地强制保护、监管申诉与有管辖权法院救济 |
| 合同接受与隐私依据 | 隐私政策是告知，不是概括同意；登录、继续使用、全站AI开关及条款链接不构成可证明的独立同意 |
| 数据说明 | 补充第三人通讯资料、实际安全及公开字段、浏览器请求、AI/OCR、完整主题外传、SSO、OAuth角色字段、通知阅读链接及删除局限 |
| 权利及通报 | GDPR请求为收到后一个月，依法可再延两个月且首月说明；监管事故通报按风险且可行时72小时，高度风险个人通知无不当迟延，特别通讯法优先 |
| 选择及测试 | 合成资料、隔离资源及明确授权的安全测试；不以学习为理由任意阅读真实邮件；敏感资料不因被动存储而当然豁免 |
| 跨境 | 接收者角色、有效DPA、SCC／充分性、传输影响及必要补充措施分开说明；SOC／ISO／TLS不作为已合法传输的证明 |
| 年龄及更新 | 托管测试门槛16岁并保留所在地能力要求；以「更新日期」记录文本，不伪称所有使用者已收到通知或已重新接受 |

服务条款、隐私政策、资料安全、接收者清单、总览、AUP、术语、自部署法律及服务范围共9类文件均六语言对应；相邻技术文档中的直接矛盾说明亦同步修正。法律配图保留原布局，改为与新文本一致的条件式主题标签。

## 3. 源码证据与重要差异

| 项目 | 已核实事实 | 源码证据 |
| --- | --- | --- |
| 注册与同意 | 注册请求只有email/password/code，未见条款版本、时间或独立AI同意纪录；OAuth grant不是服务条款同意 | `temp_login_ui/src/app/components/epomail/RegisterForm.tsx:275`；`mail-worker/src/service/login-service.js:91`、`:249`；`mail-worker/src/entity/user.js:5` |
| 密码存量 | 新写入PBKDF2默认210000且可配置；历史SHA256／较低参数可能仍存在，验证时升级 | `mail-worker/src/utils/crypto-utils.js:8`、`:27`、`:83`、`:175` |
| 暂存与恢复码 | TOTP设置密钥KV600秒；旧密码升级遇MFA可暂存输入密码300秒并续期；恢复码除hash另有加密可恢复副本 | `mail-worker/src/service/totp-service.js:142`、`:186`、`:350`；`mail-worker/src/service/login-service.js:549`；`mail-worker/src/utils/totp-utils.js:311` |
| 邮件加密 | 服务器端主旨／正文加密，非E2EE，不涵盖所有附件／元数据；无主密钥会报错而非回退默认密钥 | `mail-worker/src/utils/email-crypto-utils.js:10`、`:41`、`:182` |
| 注销与入站 | 自注销主要标记user.isDel并删除AUTH_INFO，不自动物理删除；入站与公开页未一致排除该标记 | `mail-worker/src/service/user-service.js:701`；`mail-worker/src/email/email.js:119`、`:138`；`mail-worker/src/service/public-service.js:230` |
| 管理员删除 | 多系统删除不是全量原子操作；稽核／身份授权纪录、图片及对象重试可能残留；先删BYO设置会影响原桶定位 | `mail-worker/src/service/user-service.js:713`、`:823`、`:875`；`mail-worker/src/service/r2-service.js:15`；`mail-worker/src/service/account-service.js:216` |
| 每日清理 | daily UTC16:00分支；垃圾默认7日、垃圾桶固定7日，均按邮件create_time；转桶可同轮被删 | `mail-worker/wrangler.toml:50`；`mail-worker/src/index.js:170`；`mail-worker/src/service/email-service.js:699` |
| 系统邮件及配额 | 部分官方邮件读取列表时按默认7日懒标记，之后日清理；删除时用量>90%可直接物理删所选邮件 | `mail-worker/src/service/email-service.js:254` 及邮件删除路径 |
| 审计保存 | 手动purge仅对>180日、一般正常风险、已结案等且未被封禁引用的事件；没有全类别自动TTL | `mail-worker/src/api/audit-api.js:72`；`mail-worker/src/service/audit-service.js:1892`；`mail-worker/src/service/oauth-identity-service.js:115` |
| JSON匯出 | 选定个人字段、未标记删除邮件映射及自订标签；不含附件、原始MIME、全部路由／别名及安全管理纪录；格式／range选项未使用 | `mail-worker/src/service/user-service.js:1434`；`mail-vue/src/views/data-setting/index.vue:1587` |
| 公开个人页 | 默认关闭；开后匿名API回传主邮箱、角色、加入时间及活动来源统计；部分隐藏仅UI生效 | `mail-worker/src/service/public-service.js:230`、`:304`、`:415` |
| 验证码AI | 默认关闭，管理员全站启用后无逐用户退出；完整主旨+正文6000个JS字符，主题不计入上限 | `mail-worker/src/entity/setting.js:53`；`mail-worker/src/const/entity-const.js:129`；`mail-worker/src/email/email.js:184`；`mail-worker/src/service/ai-service.js:40`、`:48` |
| 翻译与OCR | 配置模型、Workers AI及公共MyMemory／Google文本备援；远端图片URL可给外部Vision；客户端OCR默认关、API省略参数默认开 | `mail-worker/src/service/ai-service.js:253`、`:355`、`:503`、`:619`、`:655`、`:875`；`mail-vue/src/store/ui.js:85` |
| Telegram | 默认全站关；启用时主旨、验证码与7日bearer阅读链接等可固定附加，非全部逐栏选择 | `mail-worker/src/entity/setting.js:19`；`mail-worker/src/service/telegram-service.js:59`、`:146`；`mail-worker/src/template/email-msg.js:24` |
| SSO与OAuth | 多身份源及custom SSO；对外claims含邮箱验证、名称、头像及is_admin／role等，未必按scope精简；撤销不能收回对方已有资料／ID token | `mail-worker/src/service/oauth-service.js:78`、`:325`、`:981`；`mail-worker/src/service/oauth-provider-service.js:267`、`:301`；`mail-worker/src/service/oauth-app-service.js:464`、`:511` |
| 外部资源 | Vue字体、Turnstile、邮件远端图片、OAuth图示、GitHub更新请求及Cloudflare观测配置存在；不能写「无第三方请求／零遥测」 | `mail-vue/index.html:9`；`mail-vue/src/components/shadow-html/index.vue:40`；`mail-vue/src/views/sys-setting/index.vue:4986`；`mail-worker/wrangler.toml:6` |
| 外部数据库 | Turso／LibSQL只有配置及SELECT 1连通探针；业务ORM仍D1，未发现业务副本／路由实现 | `mail-worker/src/service/db-service.js:185`；`mail-worker/src/utils/db-accessor.js:19`；`mail-worker/src/entity/orm.js:1` |

OCR内嵌base64分支虽有Workers Vision调用，但占位符与标签正则的组合在离线最小复现中可阻断src解析，不能保证该分支实际触发。公开告知用「可能／可配置」，没有承诺一定外传或一定不外传。未对该问题进行生产或端到端利用验证。

## 4. 仍须落实的事项及比例相当的做法

| 优先事项 | 最低可执行要求 | 本次状态 |
| --- | --- | --- |
| 运营者身分 | 公开可识别姓名／法定名称、实际地点、联系资料及依法需要的适当地址；不要求虚构公司或成立法人 | 原始码及现有品牌不足以核实，文档已如实标示未确认 |
| 服务接受与可选同意 | 注册前提供可保存条款，依法取得明确接受并保留版本／证据；需同意的功能另行告知、选择及撤回 | 代码无充分接受／AI同意记录，须改流程或停用相应非必要处理 |
| 删除与公开页 | 处理停用后仍入站／可公开问题，完整跟踪账号、OAuth、对象、图片、审计与备份删除 | 文档纠正错误承诺，应用未在此任务修改 |
| AI及公共备援 | 无有效依据、接收者契约、转移保障及可执行选择时停用真实资料外传；可保留合成资料的隔离学习 | 默认值与风险已披露，未检查生产开关 |
| 供应者与国际传输 | 一页实际供应者清单、服务／地区／期限；保存有效DPA、适用传输机制与必要评估 | 未读取或确认合同，不能写已签署或已符合 |
| 日志及备份期限 | 逐类给必要保存期及自动／定期人工清理，处理滑动TTL、长期audit与备份残留 | 当前没有统一完整清理机制，已列实际边界 |
| 权利请求与事故 | 以简明工单／登记表跟踪期限、核验、完成范围与法定保留；设置事故联络与风险判断 | 文件流程已修订，实际执行尚须验证 |
| 欧盟范围与代表 | 确认是否向欧盟人定向提供、监测及处理规模；分别评估代表、DPO、DPIA、纪录义务 | 不预先要求全部任命，也不虚构人数／非营利豁免 |
| 终端与远端资源 | 本地字型、限制远端图片和必要性评估；终端储存按目的判断必要例外或取得所需选择 | 文档已告知；实际加载与同意机制需部署落实 |
| 凭证暂存及scope | 评估减少明文pending、收窄对外claims、核对全部撤销路径 | 已披露事实，未扩大本次任务为应用安全改造 |

上述事项可用轻量记录与按风险的技术措施完成；没有追加取得ISO认证、购买保险、设置24/7团队或承担无限服务保证的要求。若无法在真实资料场景提供必要保障，应限制为隔离的合成资料测试，而非用免责文字继续外传。

## 5. 文档验证与交付范围

验证结果：

| 核验 | 结果 |
| --- | --- |
| `pnpm run build` | 最终构建成功，0警告；216篇内容页及404页生成，输出双路径镜像 |
| `python scripts/check-structure.py` | 6语言×36类文档结构对称通过 |
| 核心法律译文检查 | 54页的章节、子节、表格及列表项数量一致；逐语言确认时限与责任保留 |
| `node scripts/validate-anchors.cjs` | 444个index页面、3576个页内锚点，0断链及缺图 |
| 扩展站内路由检查 | 446个HTML、19634项内部链接与跨页锚点，0缺失；五个语言首页跳转目的地正确 |
| `python scripts/check-article-whitelist.py` | 公共文档法条号0项，符合去条号写法 |
| SVG XML与完整性 | 60张修订图均可解析；216篇文档SHA-256与生成清单一致 |
| `git diff --check` | 通过 |
| 浏览器视觉检查 | 未完成。已加载官方浏览器技能并两次尝试创建／打开预览，宿主均报 `browser guest not attached (webview not ready)`；无截图，不将程序验证当作视觉验收 |

初次构建发现原有未提交的en/fr/es/nl稽核页description含未引用的冒号，已仅加YAML引号；原正文保留。旧生成缓存已备存至系统临时目录后重建。扩展链接检查发现语言首页链接原无目标，已在Astro配置补充五种语言至对应总览的静态跳转，重建后全部链接检查通过。

全站216页只统一文本更新日期及版本头为5.21，不代表未逐页复审的技术功能已接受新审计。防篡改清单匹配当前工作树内容；因尚未提交，其gitCommit仍为既有HEAD，不能将该值当作5.21已经发布的提交编号。

历史脚本 `python scripts/verify-laws.py` 可正常读取旧缓存，但只列出缓存条文，既不在线核验也不判断施行日期，且历史I0050031文件实际为另一部法规；其成功退出不能作为本次现行法核验通过。现行施行注记已通过官方页面另行核实。

本次只交付文档与证据底稿，不作对外发布、提交、推送或线上配置更动；原有未提交的audit／settings及图片工作保留。既有使用者适用新条款前仍须按文本完成必要通知／接受，文档更新日期不会自动使其生效。
