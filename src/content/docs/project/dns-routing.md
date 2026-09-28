---
title: 域名解析与邮件路由配置
description: 权威解析 DNS 与邮件协议防伪实战，涵盖 Cloudflare Email Routing 入站规则绑定、MX 记录、SPF 防伪、DKIM 签名与 DMARC 策略实施。
---

## 🌐 邮件路由与防伪体系基石

要让互联网上的各大邮件服务商（Gmail、Outlook、QQ邮箱、网易163等）能够顺利将邮件投递至您的 EpoMail，同时确保您发出的邮件不被拦截进入垃圾箱，您必须在域名 DNS 控制台正确配置以下两套核心规则：

1. **入站通信协议 (Inbound Route)**：通过 **MX 记录** 将入站流量引导至 Cloudflare 边缘邮件清洗网关；
2. **出站可信防伪体系 (Outbound Authentication)**：通过 **SPF、DKIM 与 DMARC** 三重防伪门禁向全球公网宣告您的邮件发信合法性。

---

## 🛠️ 步骤 1：配置 Cloudflare Email Routing 入站

1. 登录 Cloudflare Dashboard，选择您的目标域名（如 `mybrand.com`）；
2. 在左侧菜单栏中点击 **「Email (电子邮件)」 ➡️ 「Email Routing (电子邮件路由)」**；
3. 点击 **「Get started (开始使用)」** 启用服务；
4. Cloudflare 会自动检测并提示您一键添加官方 MX 记录和 SPF 基础记录：

| 记录类型 | 主机记录 (Name) | 优先级 (Priority) | 记录值 (Value) | 说明 |
| :--- | :--- | :--- | :--- | :--- |
| **MX** | `@` | 13 | `isaac.mx.cloudflare.net` | Cloudflare 邮件路由全球入站节点 |
| **MX** | `@` | 57 | `linda.mx.cloudflare.net` | Cloudflare 邮件路由全球入站节点 |
| **MX** | `@` | 91 | `amir.mx.cloudflare.net` | Cloudflare 邮件路由全球入站节点 |

点击「一键添加所有记录」即可自动写入 DNS 表。

---

## 🔀 步骤 2：绑定 Worker 入站接收规则

在 Cloudflare Email Routing 的 **「Routing Rules (路由规则)」** 页面中配置捕获行为：

1. **自定义规则 (Custom Addresses)**：
   - 匹配规则：选择 `Catch-all address`（捕获所有未单独指定的邮箱前缀，实现无限别名自由）或指定前缀（如 `*@mybrand.com`）；
   - 执行动作 (Action)：选择 **「Send to a Worker (发送至 Worker)」**；
   - 目标 Worker：在下拉列表中选择您部署的 **`epomail`** 服务。
2. 保存并启用规则。至此，任何向 `@mybrand.com` 发送的邮件都将由 Cloudflare 全球边缘清洗后直接传入 `epomail` Worker 的处理流水线。

---

## 🛡️ 步骤 3：配置出站邮件防伪三重门 (SPF, DKIM, DMARC)

为了防止他人冒充您的域名伪造发信，并确保发出的邮件 100% 达到收件箱，请在 DNS 记录中添加以下标准防伪记录：

### 1. 配置 SPF 记录 (发件人策略框架)
SPF 明确告知全世界哪些发信服务器有权代表您的域名发送邮件：

- **类型**：`TXT`
- **名称**：`@` (根域名)
- **内容值**：
  - *如果仅使用 Resend 发信*：
    ```text
    v=spf1 include:amazonses.com ~all
    ```
  - *如果同时使用 Cloudflare 与 Resend*：
    ```text
    v=spf1 include:_spf.mx.cloudflare.net include:amazonses.com ~all
    ```

### 2. 配置 DKIM 记录 (域名密钥识别邮件签名)
DKIM 使用非对称密钥对每封发出的邮件进行数字防篡改签名。在 Resend 控制台添加域名后，系统会分配 3 条专属的 CNAME 记录，例如：

| 类型 | 名称 (Name) | 内容值 (Value) | 代理状态 (Proxy status) |
| :--- | :--- | :--- | :--- |
| **CNAME** | `resend._domainkey` | `dkim.resend.com` | **仅 DNS (关闭小黄云)** |
| **CNAME** | `resend1._domainkey`| `dkim1.resend.com`| **仅 DNS (关闭小黄云)** |
| **CNAME** | `resend2._domainkey`| `dkim2.resend.com`| **仅 DNS (关闭小黄云)** |

:::caution[关键注意事项]
所有邮件相关的 MX 与 DKIM/SPF CNAME 记录必须为 **DNS Only (灰色云朵)**，绝不可开启 Cloudflare CDN 代理，否则会导致邮件服务器协议握手失败！
:::

### 3. 配置 DMARC 记录 (域消息认证报告与合规性)
DMARC 指导收件方如果收到了未通过 SPF 或 DKIM 检查的伪造邮件时应采取何种处置策略（放行、隔离到垃圾箱、还是直接彻底拒绝）：

- **类型**：`TXT`
- **名称**：`_dmarc`
- **内容值 (最佳安全实践)**：
  ```text
  v=DMARC1; p=reject; rua=mailto:dmarc-reports@mybrand.com; pct=100; adkim=r; aspf=r
  ```
  - `p=reject`：最严厉的最高安全级别，所有伪造邮件直接拒收，彻底杜绝李鬼欺诈；
  - `rua=mailto:...`：接收各大邮件服务商每日汇总的合规与威胁审计报告。

---

## 🔍 步骤 4：邮件防伪与可信度自检

配置完成后，您可以使用权威的全球邮件测试工具对您的域名健康度进行核验：

1. **命令行验证**：
   ```bash
   # 查询 MX 记录
   dig MX mybrand.com +short

   # 查询 SPF 记录
   dig TXT mybrand.com +short

   # 查询 DMARC 记录
   dig TXT _dmarc.mybrand.com +short
   ```
2. **在线全量体检工具**：
   访问 [mail-tester.com](https://www.mail-tester.com/)，在页面获取一个临时测试地址，然后登录 EpoMail 向该地址发送一封测试邮件。几秒钟后刷新测试结果，配置正确的 EpoMail 实例将获得满分 **10/10 黄金绿色评分**！
