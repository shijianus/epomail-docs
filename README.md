# EpomailDocs · EpoCanvas Mail 法律与技术文档

> **v5.21 独立审阅分支，不是已生效的正式法律告知。** 本分支记录非营利学习测试项目的拟议条款、数据处理事实和已知限制。运营者完整身份、实际处理依据、供应者及跨境保障、保存与删除安排尚须核实；不得据此启用缺少必要依据或保障的数据处理。本次不合并到 `main`，不替换线上正式条款，也不执行部署。

本站使用 Astro／Starlight，包含36类文档、6种语言，共216篇内容页。繁体中文（台湾）是审阅文本的语言基准，其他语言为对照文本；基准地位不代表条款已经生效，也不排除消费者及资料当事人的强制权利。

- 软件项目：[shijianus/epomail](https://github.com/shijianus/epomail)，MIT授权。
- 托管实例：[mail.epocanvas.com](https://mail.epocanvas.com)。本次未读取生产邮件、密钥或用户数据库。
- 应用审阅基线：`3e1ef741eb57d77908c1f23ad83e6c0cee9e931d`（本次重新fetch确认的远端master）。
- 法律来源：[核验底稿](doc/legal-reference.md)。适用范围依实际法律条件判断，不仅由运营者所在地决定。
- 交付状态：[独立复核报告](doc/legal-independent-review-2026-11-02.md)。生产合规缺口不会因文件、测试或源码公开而自动消除。

## 核心法律与数据文件

| 文件 | 用途 |
| --- | --- |
| `overview` | 角色、文件分工、适用顺序和联系窗口 |
| `privacy-policy` | 来源、目的、法律依据、权利、期限与跨境 |
| `terms-of-service` | 测试用途、服务范围、合理责任边界与救济 |
| `acceptable-use` | 禁止滥用、授权隔离测试、比例处置及申诉 |
| `data-security` | 真实安全控制、资料生命周期、删除和导出限制 |
| `sub-processors` | 接收者与数据流、实际配置及契约待核实事项 |
| `key-terms` | 相关法律与技术名词 |
| `open-source` | MIT分发与实际部署者的责任区分 |
| `service-scope` | 免费非营利测试服务范围与支援边界 |
| `tamper-proof` | 系统通知及发布清单一致性检查的范围与限制 |

六语言目录为 `src/content/docs/mail/`、`zh-tw/mail/`、`en/mail/`、`fr/mail/`、`es/mail/`、`nl/mail/`。本次不包含工作区其他任务新增的德文与七语配置。

## 本地验证

```bash
pnpm install --frozen-lockfile
node scripts/generate-figures.mjs
node scripts/test-tamper-proof-client.cjs
pnpm run build
python scripts/check-structure.py
node scripts/validate-anchors.cjs
python scripts/check-article-whitelist.py
node scripts/validate-legal-release.mjs
```

提交源文并生成相应清单后，可执行 `node scripts/validate-legal-release.mjs --committed-source`，验证216篇源文与清单指定提交逐项一致。清单自身另行提交，避免哈希自引用。

`tamper-proof.json` 是既有文件名，不表示数字签名或不可篡改。在线面板只比对两次同源清单的该页SHA-256及完整提交号，失败时不得显示成功；不验证页面正文、发布者身份或法律合规。

12类基础SVG由生成器生成，共72张六语言产物。文字采用简短中性标签并以本地图注解释；修改须落到生成源，重复运行不应恢复旧承诺。截图及额外图解另按各指南引用。

## 法律与采用边界

非营利、免费、个人维护及测试性质不自动豁免GDPR或其他强制规范；合理安全与治理措施可以按风险和规模安排，不必承诺ISO认证、24小时值班、永久托管或企业SLA。上游仅提供代码与实际运营实例应分别判断责任，MIT授权不是运营者的概括免责。

自部署者不能只替换域名和邮箱便把审阅稿当作完整告知。须核实实际主体及联系资料、资料来源与用途、适用法律依据、接收者及有效契约、跨境保障、具体保存与删除、权利请求及事故响应；必要时补足有效选择和撤回流程。

台湾法规应核对官方现行有效文本和施行注记。旧技能、`tmp_laws/`缓存及 `scripts/verify-laws.py` 的展示结果不能证明修法已生效；不采信未经确认的2026-08-10施行断言。公开法律页不逐条引用条号，来源与时效依据集中记录在核验底稿。
