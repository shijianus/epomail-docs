# 本地化适配与交付前审计报告（2026-11-02，v5.25）

## 结论

本轮完成并核验了产品现行六语 UI（简体中文、繁体中文、English、Français、Español、Nederlands）与文档站七语（另含 Deutsch）的本地化适配。六语 UI 的 locale 归一、日期／数字格式、文档链接、语言传播、可见英文残留与窄屏文案布局已完成窄范围修订；文档站的七语入口、语言协商、项目历史摘要、法律事实说明和 SVG 资源也已修正。

**本地候选的代码、文档和隔离测试证据已明显改善，但仍不能称为“可直接上线”。** 当前应用工作树包含大量并行/未提交变更，邮件可靠性与 outbox 代码及测试不是一个已冻结、可追溯的发布提交；生产运营者、供应商、staging、备份恢复、回滚和真实 provider 事实也没有证据。没有 commit、push 或 deploy。

## 本地化范围

### 产品 UI

- 保持产品承诺的 6 个 UI locale：`zh`、`zh-Hant`、`en`、`fr`、`es`、`nl`。
- `zh-CN`、`zh-Hans`、`zh-SG` 归一为 `zh`；`zh-TW`、`zh-HK`、`zh-MO`、`zh-Hant` 归一为 `zh-Hant`；`fr-CA`、`es-MX`、`nl-NL` 等归一到受支持主语言；未知值安全回退，不进入不存在的文档路径。
- 产品翻译字典维持六语对称。法语、西语、荷兰语各约 1,194–1,198 个叶键发生实质性文案修订；剩余英文同形内容限于品牌、协议、产品名、可复制 URL、技术参数或逐键审计白名单。
- 登录 React 子应用和主应用共享六语 alias/回退规则；HTML `lang` 和 `dir=ltr` 会随当前 UI locale 更新。
- 日期、数字、时区格式通过统一 helper 处理；无时区的 API `YYYY-MM-DD[ HH:mm:ss]` 按 UTC 解析，带 `Z`/offset 的时间尊重其明确 offset；空值或无效值显示 `-`。接口、CSV 和文件名的机器格式保持不变。
- 文档链接按 UI locale 使用已登记的 root/`zh-tw`/`en`/`fr`/`es`/`nl` segment；完整、合法的自定义政策 URL 原样保留。
- 设置、角色、通知、Turnstile、OAuth 提示使用六语键；移除 `Select`、`None`、`Value`、英文回退串和仅针对 English 的固定宽度；长文案在 375/480/500px 断行并限制视口宽度。
- Deutsch 仍是文档站语言，不被误称为产品 UI 已支持；翻译目标语言下拉中的日语、韩语、德语、俄语等只是外部内容翻译目标，不等于完整 UI locale。

### 文档站

- 当前工作树包含 252 篇文档：36 篇 × 7 语言；产品 UI 与文档站的六/七语差异已在 README 和页面说明中明确。
- 根入口 `lang` 与默认简体中文路径一致；手动语言列表包含 Deutsch。
- `Accept-Language` 语言协商支持 q 权重、中文 script/region alias、无效值回退，并在 302 中设置 `Vary: Accept-Language` 和 `Cache-Control: private, no-store`。
- 英文、法文、西文、荷文、德文项目历史页的中文提交摘要已译为对应语言；hash、日期、链接、产品常量与原始英文 subject 证据保留。中文产品标签和搜索语法作为 literal 明确保留。
- 图示生成器统一对 SVG 文本和 `aria-label` 做 XML 转义；84 张本地化 SVG 已逐张解析为有效 XML。交付脚本现会检查构建输出中的 SVG XML 有效性。
- 文档构建使用独立 Astro cache，避免本地 dev/preview 共享缓存产生误导性的重复 ID 警告；正式隔离构建无 Duplicate ID 警告。

## 已执行验证

### 文档

正式 `pnpm build` 完成，输出 253 个静态页面，无 Duplicate ID 警告。随后执行：

- `node --test scripts/docs-ui.test.mjs`：19/19 通过。
- `python scripts/check-structure.py`：7 语言 × 36 文档结构通过。
- `node scripts/validate-anchors.cjs`：518 页面、4,172 个锚点检查、0 断链。
- `python scripts/check-delivery.py --version 5.25`：520 HTML 页面、44,410 站内引用、8,892 fragments、252 源文件、172 个构建 SVG、错误 0。
- `python scripts/verify-laws.py`：仅输出历史法规缓存复核结果，不能替代本次官方法律事实核验；命令使用 Python 而非 Node。
- `git diff --check`：目标文档、构建脚本、SVG 生成器与本地化改动无 whitespace error。

法律事实复核仍以官方页面为准：截至 2026-11-02，可取得的一手资料仍显示 2025-11-11 修正已公布但施行日期未定；未取得支持“2026-08-10 已施行”的正式命令。因此文档保留“未核实该施行日期”的谨慎表述，不将新主管机关、第20-1条或第27条删除写成已生效现行法。

### 应用与测试

- `node --experimental-strip-types --test temp_login_ui/test/locale-resolution.test.mjs temp_login_ui/test/registration-legal.test.mjs`：14/14 通过。
- `node --test tests/ui-translation-quality.test.mjs tests/ui-localization.test.mjs tests/test-i18n-gates.mjs`：130/130 通过；其中译文质量测试最初发现一个测试检测器漏掉 `Sign up for an cuenta` 反例，已加强检测器并复验通过。
- `node scripts/i18n-symmetry.mjs`：mail-vue/mail-worker 六语叶键对称，mail-vue 3,256 keys、mail-worker 1,950 keys。
- `node scripts/i18n-audit.mjs`：重复键、字典漂移和静态引用缺失为 0；动态引用仅列出既存合法动态表达式。
- `node scripts/i18n-hardcoded.mjs`：0 suspicious lines、0 resource failures、0 data exception failures。
- `node scripts/i18n-auth-locale.mjs`：六语键集合、占位符、重复与引用通过；报告 11 个未被代码直接引用的历史法律键为 warning，不是缺译。
- Worker 全套串行 Vitest：37 个测试文件、496 项通过。输出中可见的数据库约束、网络错误、provider 失败均为故障注入用例的预期 stderr；最终 test summary 为 37/37 files、496/496 tests passed。Miniflare 在 Windows 清理临时目录时有 EBUSY warning，但不影响测试退出码 0。
- 请求级 i18n 隔离：2/2 真实 Worker tests 通过，验证交错 en/fr 请求、显式 `lng`、q 权重、中文 alias、malformed header 与默认回退。为支持 Cloudflare `AsyncLocalStorage`，各 Wrangler 配置加入最小 `nodejs_als` flag，没有启用完整 `nodejs_compat`。
- 应用隔离构建：mail-vue 与 temp_login_ui 均完成 Vite release build，产物位于临时目录；没有覆盖仓库的生产 `dist`。
- 本地全栈隐私流程：11/11 通过，覆盖冷启动/迁移幂等、运营者告知门槛、注册条款证据、可选处理关闭/撤回、Telegram 阅读链接撤销、内部合成邮件和诚实的 manual-review 注销状态；测试资源和合成数据已清理。
- 浏览器：最终隔离登录页在 375px 能加载并暴露邮箱、密码、显示密码、登录、语言/法律入口等可访问 DOM。IAB 在登录按钮重绘时多次出现 locator timeout，未将登录点击、设置页语言切换或移动端动态交互记为通过；文档页 390px 窄屏布局和七语入口已通过 DOM/视觉检查。

## 生产上线阻断

以下事项仍未由本轮本地化工作证明：

1. 当前应用和文档工作树并非干净、已提交、可回滚的候选；邮件可靠性/outbox 及相关测试有未跟踪/并行文件，不能把工作树测试直接当作某个 Git SHA 的 release artifact。
2. 当前外部 provider 的网络提交与本地状态提交之间仍是 `UNKNOWN` + 幂等/回调收敛语义，不是 exactly-once delivery；USER_DB 与 MAIL_DB 也没有跨 D1 事务。
3. staging 配置仍含 placeholder D1/KV/domain/admin；真实 OAuth、Resend/Mailjet/Cloudflare Email、R2/S3/B2、Webhook 矩阵没有运行。
4. 没有生产 Worker version ID、实际绑定、secret 存在性/轮换清单、cron 运行/告警/on-call、Email Routing/DNS/Webhook 证据。
5. 没有 D1/KV/R2 备份恢复与 Worker rollback 演练证据。
6. 文档 Pages deployment ID、线上 canonical/robots/sitemap/hreflang 及应用线上 `DOCS_URL` 尚未独立核实。
7. 本地 IAB 交互有超时，且 UI 构建与 Worker 全套回归虽通过，尚未形成一个 clean candidate commit/tag。

## 交付判断

**本地化候选：可交付审阅，适合继续进行发布前工程流程。**

**生产部署：NO-GO。不能直接上线。** 只有在冻结并提交准确候选、完成 staging/provider/运维/备份回滚验证、补齐真实运营者与供应商事实、发布文档 Pages 并完成最终 canary 后，才能把状态改为 release-ready。

## 操作边界

- 未读取 `.env`、`.dev.vars`、生产 secrets、生产数据库、真实用户邮件或凭证。
- 未发送真实邮件、Telegram 或 AI 内容。
- 未部署、未 commit、未 push。
- 所有本地全栈、Worker 和浏览器数据均为合成、隔离、可清理状态；held stack 已停止。
