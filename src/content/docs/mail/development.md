---
title: 开发指南
description: EpoCanvas Mail 开发指南——仓库结构、本地开发环境、测试与巡检套件、六语言纪律、数据库迁移纪律、五步工程流程与参与贡献之完整说明。
---

**生效日期：2026 年 10 月 5 日｜版本：5.14**

本页面向参与 EpoCanvas Mail 开发、审计或二次开发的管理者与开发者，说明仓库结构、本地环境、质量保障体系与工程流程。部署运行的步骤见[部署指南](/mail/deployment/)；本页不重复部署步骤。

## 1. 仓库结构

```text
epomail/
├── mail-vue/        前端：Vue 3 + Vite + Element Plus（界面、i18n 字典、PWA）
├── mail-worker/     后端：Cloudflare Worker（API、入站解析、AI 能力、D1/KV/R2）
├── temp_login_ui/   登录面：React 应用（构建时并入 mail-worker/dist/login）
├── tests/           自动化测试、公网端到端断言与巡检脚本
├── scripts/         工具脚本（i18n 审计三件套、播种、构建辅助）
├── doc/             超长专项分析报告归档
├── EpomailDocs/     本文档站（独立 git 仓库）
└── CHECKLIST.log / REPORTS.md   任务流水与专项审计归档
```

## 2. 本地开发环境

```bash
pnpm install                      # 仓库根安装依赖
cd mail-vue && npm run dev        # 前端开发服务器
cd mail-vue && npm run build      # 前端构建（交付门槛：零警告零报错）
cd mail-worker && npx wrangler dev  # 后端本地全真栈（127.0.0.1:8787）
```

本地密钥经 `mail-worker/.dev.vars` 承载（不入库，模板见 `.dev.vars.example`）；清空 `.wrangler/state` 后访问 `/api/init/<jwt_secret>` 可从零播种完整演示数据，见[部署指南](/mail/deployment/)第 3 节。

## 3. 测试与巡检

- `tests/` 目录含逾百个自动化脚本：Playwright 全真栈浏览器回归、生产环境公网端到端断言、全仓静态扫描与逐字节完整性比对；
- 代表性量化核验：安全加固 43／43 断言、公网路由端到端 32／32、六语言登录面 62／62、生产完整性 369 项逐字节比对；
- 涉及界面或 API 的改动须先构建（`vite build` 与 Worker 试编译），再以本地全真栈实测；测试数据一律具备 `finally` 物理清理，数据库与 KV 零假数据残留。

## 4. 六语言纪律

界面与后端字典支持 zh、zh-Hant、en、es、fr、nl 六种语言，键集绝对对称。新增或修改词条后须通过静态审计三件套：

```bash
node scripts/i18n-symmetry.mjs      # 六语言键集绝对对称
node scripts/i18n-audit.mjs         # 代码字面量引用零缺失
node scripts/i18n-hardcoded.mjs     # 用户可见文本零未包裹硬编码
```

系统邮件与欢迎邮件按收件人语言投递；新增用户可见文案一律经字典键引用，不得硬编码。

## 5. 数据库迁移纪律

- 数据表定义统一维护于后端初始化模块的 `CREATE TABLE` 原生定义；
- 字段变更须同步编写升级函数（`vN_NDB`），以 `PRAGMA table_info` 条件检查后执行 `ALTER TABLE ADD COLUMN`，保证幂等；
- 全新冷启动仅凭 `/api/init/<jwt_secret>` 完成全部建表与六个标准角色的播种，迁移不得依赖手工 SQL。

## 6. 工程流程

开发遵循五步 SOP：

1. 范围确认：明确接口、数据表、组件、字典与样式的影响边界；
2. 规范编码：遵循既有架构，兼顾暗色模式与移动端适配、降级与缺省防御；
3. 全真栈测试：构建核验、回归套件、浏览器实测与假数据清理；
4. 规范提交：结构化提交信息；执行记录按分流写入 `CHECKLIST.log`（日常流水）或 `REPORTS.md`（专项审计），制度文件本身不记流水；
5. 置顶汇报：对外输出置顶完整 Commit Hash，保证版本可追溯。

## 7. 文档站开发

本文档站（EpomailDocs）为独立 git 仓库，基于 Astro 5 与 Starlight，六语言结构逐篇对称（以繁体中文为正式版本基准）：

```bash
pnpm build                          # 构建（含防篡改清单重生成）
node scripts/validate-anchors.cjs   # 全站锚点零断链
python scripts/check-structure.py   # 六语言结构对称校验
python scripts/verify-laws.py       # 法条引用与核验底稿一致
```

每次构建重新生成 `tamper-proof.json` 防篡改清单；文档改动的提交与其 Hash 固化分两笔提交完成。

## 8. 参与贡献

- 缺陷与功能建议经 GitHub 仓库的 Issue 与 Pull Request 提交（`github.com/shijianus/epomail`）；
- 贡献代码遵循既有提交信息规范，一并遵循本页流程与测试门槛；
- 安全漏洞请勿公开披露，经[总览](/mail/overview/)第 5 节的联络窗口私下报告；
- 贡献之授权与专案之许可条款见[开源与自行部署法律](/mail/open-source/)。

## 9. 相关文档

| 资源 | 链接 |
| --- | --- |
| 部署运行步骤 | [部署指南](/mail/deployment/) |
| 技术拓扑与安全设计 | [技术架构](/mail/architecture/) |
| 服务范围与支持渠道 | [服务范围与支持](/mail/service-scope/) |
| 专案定位与提交链路 | [专案介绍](/mail/project/) |
