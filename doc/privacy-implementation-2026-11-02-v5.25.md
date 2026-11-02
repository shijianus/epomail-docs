# 隐私与数据处理实施报告（2026-11-02，v5.25）

## 结论

本轮完成了 EpoCanvas Mail 文档与已核对代码事实的同步，文档站在隔离、全新 Astro 内容缓存下可以构建，七语言结构、页内锚点、内链、页面镜像及源文件完整性检查均曾在同一构建快照上通过。

**这不是“可以直接上线”的结论。** 应用仓库的出站邮件与入站生命周期代码在本轮验证期间仍由其他工作流持续修改；全量 Worker 测试进程尚未提供最终退出状态。聚焦测试中，新增的出站集成测试 10/10 通过，但该次运行的其他来源在执行期间变化，不能作为最终验收。内部站内投递的“收件副本、附件与发送任务 ACCEPTED 全部同一事务”边界仍未证明；当前实现观察到按收件人提交后，再另行提交发件状态与任务状态。认证回归未执行。因此不应部署或对外宣称应用已完成上线验收。

## 文档范围与变更

- 源文件：`src/content/docs/` 共 252 篇，7 种语言 × 36 篇。
- 所有文档版本头统一为 `5.25`，更新日期为 2026-11-02。
- 七份 `privacy-policy.md` 同步了：浏览器 `localStorage`／`sessionStorage`／IndexedDB 边界、普通登出与设备清除范围、MFA/passkey 当前实现、Telegram 的 `notifyCodeOnly`／主题 200 字符上限／`includePreview` 400 字符摘要与阅读链接条件、privacy mode 泛化通知，以及启用转寄时 `keepCopy` 的规范化行为。
- `README.md`、`REPORTS.md` 和法律底稿保留“代码事实、实际实例事实、法律核验”三者的区别；未把非营利定位写成免除强制义务，也未把“参照欧盟数据保护原则”写成认证或全面合规声明。
- `public/tamper-proof.json` 已按 252 篇当前工作树源文件重新生成；其 `contentSource` 为 `working-tree`，记录的是来源清单，不是签名、认证或生产部署证明。

## 文档验证证据

### 构建

- 常规 `pnpm build` 在共享 `.astro` 缓存被本地 Astro dev/preview 进程使用期间出现 7 条 Starlight `Duplicate id` 警告。
- 已检查 `src/content.config.ts`、Starlight `docsLoader()` 与 Astro glob loader：七个隐私政策 ID 由相对路径生成，分别为 `mail/privacy-policy`、`en/mail/privacy-policy`、`es/mail/privacy-policy`、`fr/mail/privacy-policy`、`nl/mail/privacy-policy`、`zh-tw/mail/privacy-policy`、`de/mail/privacy-policy`；源文件没有显式重复 `id`、`slug` 或 `canonical`。
- 使用全新隔离缓存和隔离输出目录强制构建时，未出现重复 ID 警告，完成 253 个静态页面。最终复验前，252 篇文档源的综合哈希两次一致；据该快照重新生成清单并重建，验证结果对应最终复验的源文件状态。常规共享缓存警告不构成源文件 ID 冲突证据，不修改 Astro 或文档 URL。

### 结构与交付检查

最终隔离构建完成后，重新生成 `/epomail` 镜像及 manifest 副本，并在该输出目录执行交付校验；获得：

- `python scripts/check-structure.py`：`OK: 7 languages structurally symmetric vs zh-tw formal base (36 docs)`。
- `node scripts/validate-anchors.cjs`（对应隔离输出）：`pages=518 anchors-checked=4172 broken=0`。
- 隔离输出的交付脚本结果：`html_pages=520`、`internal_references=44408`、`fragments=8892`、`manifest_documents=252`、`source_documents=252`、`version=5.25`、`errors=0`。
- 清单统计：252 篇源文件，隔离构建页面与 `/epomail` 镜像一致；最终清单覆盖的源文件哈希不匹配为 0。

## 应用回归验证状态

### 已执行但非最终的聚焦运行

命令使用 Cloudflare 专用 Vitest 配置、单文件串行、单 worker、禁用测试缓存，并使用合成 D1/KV/对象存储及 mock provider；未发送真实邮件、Telegram 或 AI 内容。

- `test/email-send-integration.spec.js`：10/10 通过。
- `test/mail-pipeline-convergence.spec.js`：7/10 通过，3 项失败，旧失败点为 raw MIME 测试仍期待 `raw:v1:`，而当时实现返回 `raw:v2:`。
- 合计：17 通过、3 失败，退出码 1，约 57.11 秒。
- 该运行期间入站邮件、生命周期服务及相关测试文件继续变化，故以上结果为**非最终结果**。

出站路径的静态核对支持以下项目已经实现或趋于实现：

- 成功重放返回归档邮件及 canonical `attList`；
- `ACCEPTED`／`UNKNOWN` 重放不再次消耗存储额度或发送次数；
- inline 附件指纹使用原始内容与字节，避免生成文件名／CID 造成漂移；
- provider 5xx、网络超时或冲突保持 `UNKNOWN`，不诱导重复发送；
- Resend 调用传入稳定服务端任务幂等键。

但静态核对不能替代最终运行，且内部投递仍观察到：每个收件人的收件行、附件和 receipt 在循环内单独 batch，随后另一个 batch 才更新发件状态与 `mail_outbound_task=ACCEPTED`。这不是“全部副本与任务接受同一 D1 batch”的证明，也没有看到覆盖中途失败／部分收件人提交后重试的最终集成断言。

### 未完成或被阻断

- `test/initial-password.spec.js`
- `test/login-provenance.spec.js`
- `test/totp-backend-fixes.spec.js`
- `test/oauth-bind-recovery.spec.js`
- `test/oauth-switch-enforcement.spec.js`

上述认证回归尚未执行。另有一个 `npm --prefix mail-worker run test:serial`／Vitest／workerd 全量进程自 17:58 左右持续运行，至本报告时没有可验证的最终摘要或退出码；其间仍有应用源文件与测试文件写入。因此不能把它视为通过。

## 生产事实仍需运营者确认

下列事实不能由本轮文案、静态检查或本地合成测试证明：

1. 实际运营者的可识别名称、国家／地区、联系地址及必要代表或数据保护官信息。
2. 生产使用的 Cloudflare、邮件投递、对象存储、AI、Telegram、Turnstile、头像或其他供应者、实际处理地区与数据字段。
3. 有效处理契约、跨境传输保障、供应者账号配置与访问权限。
4. 备份、快照、日志、对象存储及原始 MIME 的保存期限、删除执行和失败重试证据。
5. 生产迁移是否包含本轮 schema、撤销、注册告知、可选处理门槛和出站可靠性改动。
6. 真实公开注册、权利请求、注销、邮件投递和事故处理流程是否按文档实际运行。

未核实前应保持新注册或相应外传功能关闭，使用合成数据和隔离资源；不得读取或上传真实用户邮件、生产凭证或生产数据库。

## 本轮操作边界

- 未读取 `.dev.vars`、生产 secrets、生产数据库、真实用户邮件或凭证。
- 未发送真实邮件、Telegram 或 AI 内容。
- 未部署、未改变生产设置、未 commit、未 push。
- 未回滚其他既存或并发工作树修改。
- 隔离构建产生的临时缓存和输出不属于发布物；最终交付前应删除临时验证目录，避免误提交。

## 上线判断

当前判断为：**文档快照可交付审阅；应用不可无保留上线。**

在可以上线前，至少需要：停止并确认所有并行写入；固定应用与测试版本；完成内部投递原子性设计及故障／重试覆盖；重新生成测试 fixture/schema；串行通过出站、入站、认证和全栈合成测试；对最终静止文档工作树重新生成清单并无警告构建；由运营者补齐身份、供应商、地区、契约、备份与删除证据。任何一项缺失，都只能发布为开发／审阅快照，不能宣称生产上线已完成。
