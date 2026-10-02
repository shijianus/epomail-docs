---
title: 数据处理与安全维护
description: EpoCanvas Mail 数据生命周期、处理矩阵、纵深防御体系、双重属性治理与全球合规指南。
---

**生效日期：2026 年 10 月 1 日｜版本：5.6**

<div class="google-hero-card">
  <div class="google-hero-lead">
    EpoCanvas Mail 秉持「隐私即基本人权」与「代码即契约」的工程哲学。我们构建了结合托管云端服务与开源自治专案的「双重属性融合」治理架构。本规范详尽公开个人资料于系统内的全链路生命周期、加密存储矩阵、四层纵深防御工程，以及因应全球不同法域的合规标准与责任边界。
  </div>
  <div class="google-hero-meta">
    <span class="google-pill">🛡️ 零遥测跟踪 (Zero Telemetry)</span>
    <span class="google-pill">🔐 AES-256-GCM 静态加密</span>
    <span class="google-pill">⚡ 边缘瞬时执行 (Edge V8)</span>
    <span class="google-pill">🌐 全球多法域合规 (GDPR / CCPA)</span>
  </div>
</div>

本文档依[隐私政策](/mail/privacy-policy/)与[服务条款](/mail/terms-of-service/)订定，既作为托管服务用户查验隐私保障与安全技术之权威指南，亦作为独立部署者搭建合规通讯节点及主管机关依法稽核之基准规范。

## 1. 全链路数据生命周期与边缘处理模型

本服务将个人资料与通讯流之生命周期严格划分为「收集、处理、利用、传输、保存、销毁」六大阶段。各阶段均在 Cloudflare 边缘计算与全球 Anycast 网络上以无状态方式流转，杜绝持久化残留与越权读取。

![EpoCanvas Mail 数据处理与全链路生命周期流水线：无状态收集、边缘 V8 沙箱执行、AES-256-GCM 密文封包、分层存储与密码学粉碎](/images/mail/data-security-pipeline.svg)

*图 1：个人资料于本服务之全链路生命周期流水线。系统在各个环节均落实最小必要原则与强加密隔离，具体法律性质参见[隐私政策](/mail/privacy-policy/)第 5 节。*

### 1.1 最小化收集与零遥测承诺

<div class="google-card">
  <div class="google-card-header">
    <div class="google-card-title">🛡️ 极简采集与零商业遥测</div>
    <span class="google-pill">数据最小化 · 零跟踪</span>
  </div>
  <div class="google-card-desc">
    <p><strong>严格最小化采集</strong>：除用户主动注册所必需的账号标识（用户名、邮箱别名）及身份凭证外，系统绝不索取或收集通讯录、剪贴板、设备传感器（陀螺仪）或跨站行为数据。</p>
    <p><strong>坚决杜绝商业遥测</strong>：EpoCanvas Mail 无论在官方托管平台还是开源代码库中，均恪守绝对的「零行为遥测」（Zero Telemetry）准则。系统绝不内嵌任何广告转化跟踪器、商业分析 SDK 或第三方监控脚本，所有通讯与阅读交互仅在本地信箱沙箱内生效。</p>
  </div>
</div>

### 1.2 边缘瞬时执行与内存隔离

<div class="google-card">
  <div class="google-card-header">
    <div class="google-card-title">⚡ 边缘瞬时计算与纳秒沙箱</div>
    <span class="google-pill">Cloudflare V8 · 内存隔离</span>
  </div>
  <div class="google-card-desc">
    <p><strong>无状态纳秒级沙箱</strong>：当邮件投递抵达或用户发起交互请求时，业务逻辑直接在离用户地理最近的 Cloudflare Workers 边缘节点（V8 Isolate）中瞬时执行，处理完成后沙箱环境纳秒级物理销毁。</p>
    <p><strong>零宿主磁盘留存</strong>：邮件解密明文与路由上下文仅暂存于边缘节点的易失性内存中，绝不写入任何宿主机物理磁盘。这种底层架构彻底消除了传统持久化服务器中因常驻进程残留、内存泄漏或多租户侧信道导致的潜在安全风险。</p>
  </div>
</div>

### 1.3 密码学销毁与彻底遗忘机制

<div class="google-card">
  <div class="google-card-header">
    <div class="google-card-title">🗑️ 密码学粉碎与被遗忘权保障</div>
    <span class="google-pill">7 日缓冲 · 密钥覆写灭失</span>
  </div>
  <div class="google-card-desc">
    <p><strong>7 日缓冲与定时物理清理</strong>：用户移入回收站的邮件提供 7 日防误删缓冲期，到期由边缘 Cron 定时任务执行不可逆的物理级覆写擦除；当用户信箱用量突破 90% 预警阈值时，系统亦会对已删除邮件径行实体擦除以保障信箱健康。</p>
    <p><strong>不可逆密钥覆写粉碎</strong>：当用户请求主动注销账号时，系统不仅立即抹除 D1 关系型数据库与 KV 缓存中的关联索引，更会在物理存储层执行加密主密钥覆写粉碎，从密码学数学底层实现永久且不可逆的彻底物理灭失。</p>
  </div>
</div>

<div class="google-divider"><span class="google-divider-icon">✦</span></div>

## 2. 数据处理矩阵与存储介质规格

本服务所涉全部数据类别、具体收集字段、处理目的、底层存储媒体及安全基准如下表所列。我们对不同敏感级别的数据实施物理分层与差异化访问控制：

| 资料类别 | 具体项目 | 处理目的 | 存储媒体与安全基准 | 保存与销毁 |
| --- | --- | --- | --- | --- |
| 帐号凭证 | 电子邮件地址、用户名、密码哈希值与盐、TOTP 密钥（AES-GCM 加密）、备用码哈希值、Passkey 公钥 | 注册、验证、两步验证、凭证恢复 | Cloudflare D1；密码 PBKDF2（100,000 次迭代加盐）、TOTP 静态加密 | 保存至帐号终止；实体删除时即刻清除 |
| 网络与设备资料 | 注册 IP、最近登录 IP、操作系统、浏览器 User-Agent、设备类型 | 安全审计、异常登录识别、限流 | Cloudflare D1；限管理员审计访问 | 保存至帐号实体删除 |
| 会话状态 | JWT 令牌、RBAC 角色识别、选定信箱 | 边缘网关授权、请求路由 | Cloudflare KV；最长有效期 30 日 | 登出即撤销；30 日未活动自然过期 |
| 通信资料 | 发件人与收件人、CC/BCC、主题、时间戳、已读状态、标签、星标、正文 | 邮件投递、会话组织、搜索 | Cloudflare D1（元数据）；依模式以 AES-256-GCM 静态加密 | 由当事人控制；回收站 7 日实体删除；用量逾 90% 时对已删邮件径行实体删除 |
| 附件 | 原始文件名、MIME 类型、文件大小、二进制内容 | 附件传输、内嵌显示、安全下载 | 实例自有对象存储（依序解析：自备或运营者配置之 S3 兼容存储、Cloudflare R2 绑定，缺省 Cloudflare KV）；下载采防御性标头 | 随所属邮件之生命周期；实体删除时一并清除 |
| 安全与限流记录 | 登录失败计数、注册频控记录、AI 用量统计 | 暴力破解防护、滥用防治 | Cloudflare KV；固定窗口计数器 | 登录失败计数 12 小时内自动过期；注册频控记录每日例行清理；AI 用量统计保留 60 日 |
| 安全通知环境指纹 | 已知设备、登录地点 (Geo)、网络 ASN 指纹，1 小时防疲劳时间戳 | 登录环境异常识别、防警报风暴去重 | Cloudflare KV（前缀 USER_KNOWN_ENV_）；保留最新 15 条指纹 | 90 日未活动或账号实体删除时一并清除 |
| 界面偏好 | 语言（6 语言）、明暗模式、通知旗标 | 界面一致性 | 浏览器 localStorage，选择性同步至 D1 | 保留至清除缓存或手动重设 |

### 2.1 凭证脱敏与 PBKDF2 / WebAuthn 存储基准

<div class="google-card">
  <div class="google-card-header">
    <div class="google-card-title">🔐 单向密码学保护与硬件密钥隔离</div>
    <span class="google-pill">PBKDF2 100k · WebAuthn FIDO2</span>
  </div>
  <div class="google-card-desc">
    <p><strong>PBKDF2 100,000 次密钥拉伸</strong>：密码凭证绝不以明文或简单散列存储，系统强制采用高强度随机盐（Salt）结合 PBKDF2 算法进行 100,000 次密钥迭代拉伸，有效防御离线彩虹表分析与专用 GPU 算力碰撞破解。</p>
    <p><strong>TOTP 与 FIDO2 Passkey 硬件防护</strong>：双重验证 TOTP 密钥入库前经由实例主密钥实施 AES-256-GCM 静态加密；Passkey 基于非对称公钥密码学，私钥永久固化于用户安全芯片（Secure Enclave），服务端仅存储公钥凭证，根本杜绝中间人钓鱼与数据库被盗冒充。</p>
  </div>
</div>

### 2.2 存储分层与自备对象存储架构

<div class="google-card">
  <div class="google-card-header">
    <div class="google-card-title">📦 存储解耦与防御性内容标头</div>
    <span class="google-pill">BYO-S3 · R2 原生 · KV 降级</span>
  </div>
  <div class="google-card-desc">
    <p><strong>三级弹性存储通道</strong>：系统支持按优先级智能路由附件资产：优先接入用户或企业自备的 S3 兼容存储桶（BYO-Storage），次选 Cloudflare R2 边缘原生存储，并在轻量场景下平滑回退至 KV。自备存储支持物理隔离读写凭证，赋予数据所有者完全的主权控制。</p>
    <p><strong>浏览器防御性安全响应头</strong>：附件流式下发时强制附加 <code>Content-Disposition: attachment</code> 与 <code>X-Content-Type-Options: nosniff</code> 标头，强制阻断恶意文件内嵌解析，从浏览器协议层切断跨站脚本注入（XSS）与驱动式下载攻击链路。</p>
  </div>
</div>

<div class="google-divider"><span class="google-divider-icon">✦</span></div>

## 3. 四层纵深防御体系与密码学实现

为确保系统抵御来自全球公共互联网的复杂网络威胁，EpoCanvas Mail 在架构上构建了覆盖边缘网关、认证通道、静态加密及前端沙箱的四层纵深防御体系：

![EpoCanvas Mail 纵深防御技术架构模型：第 1 层边缘网络与反 SSRF 网关、第 2 层 FIDO2 Passkeys 认证、第 3 层 AES-256 静态加密、第 4 层 Shadow DOM 客户端沙箱与不可变存证](/images/mail/defense-layers-architecture.svg)

*图 2：四层纵深防御技术模型。各层独立设防、互为补充，即使单点机制面临极端压力，整体数据资产依然处于受控的安全屏障之内。*

下表完整列出系统在技术、管理、流程与审计维度的 11 项核心安全维护落实标准：

| 安全维护事项 | 本服务之落实 |
| --- | --- |
| 人员与资源配置 | 实例运营者指定管理员，依 RBAC 多级角色划分权限 |
| 个人资料范围之界定 | 本文档第 2 节之处理矩阵，明确界定各类资料 |
| 风险评估及管理机制 | 三种邮件模式之加密选择、失败锁定、限流与配额机制；开源代码公开受社群检视 |
| 事故之预防、通报及应变 | 见本文档第 4 节 |
| 收集处理利用之内部管理程序 | [隐私政策](/mail/privacy-policy/)第 5 节之处理活动对应表 |
| 资料安全管理及人员管理 | 密码学哈希路由（防越权访问）、默认拒绝（fail-closed）之权限检查、非白名单参数于网关剥离 |
| 认知倡导及教育训练 | 自行部署运营者应自行办理；本站文档可作为训练素材 |
| 设备安全管理 | Cloudflare 边缘设施承担实体与虚拟设备安全（SOC 2 Type II、ISO/IEC 27001）；密钥以环境变量注入，不入代码库 |
| 资料安全稽核机制 | 安全日志（登录 IP、设备、失败记录）留存并限审计访问；会话得即时撤销 |
| 使用记录、轨迹资料及证据保存 | 登录与安全日志保存至帐号实体删除；滥用事件之证据依[可接受使用政策](/mail/acceptable-use/)保存 |
| 安全维护之整体持续改善 | 开源项目持续演进；重大安全修复随版本发布并公告 |

### 3.1 边缘网络与反滥用网关

<div class="google-card">
  <div class="google-card-header">
    <div class="google-card-title">🌐 边缘清洗与智能反 SSRF 阻断</div>
    <span class="google-pill">Layer 1 防线 · TLS 1.3 / HSTS</span>
  </div>
  <div class="google-card-desc">
    <p><strong>全球 Anycast 边缘清洗</strong>：由 Cloudflare 边缘网络抵御并清洗全方位的分布式拒绝服务（DDoS）攻击，全站强制执行 TLS 1.3 高强度传输加密与 HSTS 预加载，根除中间人监听与降级劫持隐患。</p>
    <p><strong>入站反 SSRF 拦截网关</strong>：针对外部 Webhook、图片代理与抓取请求内嵌严密的 IP 地址校验机制。凡试图探测私有局域网（RFC 1918 内部地址）或云服务商底层元数据接口（如 169.254.169.254）的恶意请求，一律在接入边缘物理阻断。</p>
  </div>
</div>

### 3.2 强身份认证与无密码通行密钥

<div class="google-card">
  <div class="google-card-header">
    <div class="google-card-title">🔑 域名绑定通行密钥与频控防线</div>
    <span class="google-pill">Layer 2 防线 · 指纹识别</span>
  </div>
  <div class="google-card-desc">
    <p><strong>FIDO2 WebAuthn 强绑定</strong>：系统深度整合现代通行密钥标准，凭证与特定根域名实施密码学绑定，天然免疫钓鱼网站欺诈；全面支持硬件安全密钥（YubiKey）与平台生物识别。</p>
    <p><strong>指数退避与环境异常告警</strong>：密码登录通道配备多阶梯频控引擎，短时连续失败触发指数级退避并锁定 12 小时；后台同步核对最新 15 组常用设备与网络 ASN 指纹，对异地异常登录即时推送分级安全警报。</p>
  </div>
</div>

### 3.3 静态数据加密与密钥隔离

<div class="google-card">
  <div class="google-card-header">
    <div class="google-card-title">🔒 工业级 AES-256-GCM 密文封包</div>
    <span class="google-pill">Layer 3 防线 · 密钥隔离</span>
  </div>
  <div class="google-card-desc">
    <p><strong>信件独立认证标签（Tag）</strong>：邮件写入 D1 关系型数据库前，正文经由加密主密钥派生生成独立密文并携带认证标签（AES-256-GCM），全面防御数据库离线勒索与未授权磁盘快照外泄风险。</p>
    <p><strong>运行时安全环境变量注入</strong>：主加密密钥由 Cloudflare Workers 运行时加密环境变量注入，不落盘、不入库、不提交代码仓，确保存储介质与加解密上下文在物理拓扑上绝对隔离。</p>
  </div>
</div>

### 3.4 客户端沙箱与不可变存证

<div class="google-card">
  <div class="google-card-header">
    <div class="google-card-title">🛡️ Shadow DOM 隔离与版本指纹校验</div>
    <span class="google-pill">Layer 4 防线 · DOMPurify 白名单</span>
  </div>
  <div class="google-card-desc">
    <p><strong>双重客户端内容沙箱</strong>：所有外部接收的富文本 HTML 均通过 DOMPurify 白名单剥离 <code>&lt;script&gt;</code>、<code>&lt;iframe&gt;</code>、<code>&lt;style&gt;</code> 等恶意节点，并在独立封装的 Shadow DOM 沙箱中隔离渲染，阻断样式渗透与跨站脚本窃取会话。</p>
    <p><strong>不可变规范公开存证</strong>：官方发布规格依托 Git Commit 与 SHA-256 哈希双向存证，保障版本可追溯且全网公开可核验，消除传统中心化平台暗箱修改规则的技术隐患。</p>
  </div>
</div>

:::caution[加密之范围与技术限制]
本服务所提供之「全部／隐私／加密」模式，系指服务器端静态加密（Server-side Encryption at Rest）。密钥由实例服务器之运行时安全环境变量与用户身份上下文派生。此机制旨在防范数据库勒索、脱机备份遭窃取或存储快照泄漏之系统级风险，而非传统端对端加密（E2EE）；掌握服务器实例底层运行权限与环境变量之运营者在理论技术上具备解密能力。若用户间通讯涉及国家安全、高度机密或要求运营者亦完全无法查阅之绝对保密场景，当事人应自行使用 GPG / PGP 等客户端公钥密码学工具于本地完成正文加解密后再行投递。
:::

<div class="google-divider"><span class="google-divider-icon">✦</span></div>

## 4. 双重属性融合与开源治理边界

EpoCanvas Mail 具有鲜明的「双重属性」：它既是一个面向公众开放的免费托管邮件服务平台，也是一个在 MIT 协议下公开运作的开源软件专案。明确两者的权责分工与法律边界，是维护健康社区生态的基石：

![EpoCanvas Mail 双重属性治理与全球合规矩阵：官方托管云服务与开源自治专案权责划分，以及 GDPR、CCPA 与 APAC 法规落地标准](/images/mail/dual-nature-compliance-matrix.svg)

*图 3：双重属性融合治理边界与全球合规矩阵。上游开源项目仅提供代码；各实例运营者是独立的数据控制者并全权承担法律责任；终端用户享有自主选择托管或私有化部署的充分权利。*

### 4.1 官方托管服务之运营承诺与责任限制

<div class="google-card">
  <div class="google-card-header">
    <div class="google-card-title">☁️ 官方托管服务定位与免责范畴</div>
    <span class="google-pill">mail.epocanvas.com · 非商用 SLA</span>
  </div>
  <div class="google-card-desc">
    <p><strong>公共托管服务品质</strong>：官方托管站点 <code>mail.epocanvas.com</code> 由核心团队作为独立运营者提供。我们承诺全力维护托管节点的可用性、零遥测合规性及密码学防篡改标准，保障普通用户免费享用安全纯净的通讯服务。</p>
    <p><strong>免责与用户备份义务</strong>：托管服务属于非商业公益性质，不提供企业级商业 SLA（服务水准协议）承诺，亦不对因不可抗力、上游云基础设施故障（如 Cloudflare 网络中断）或用户自身保管不慎导致的凭证丢失承担间接赔偿责任。用户对其数据资产负有最终保管义务，应定期导出备份重要通信。</p>
  </div>
</div>

### 4.2 开源专案许可、二次开发与分发准则

<div class="google-card">
  <div class="google-card-header">
    <div class="google-card-title">📜 MIT 许可授权与二次开发红线</div>
    <span class="google-pill">MIT 协议 · 商标隔离 · 独立声明</span>
  </div>
  <div class="google-card-desc">
    <p><strong>代码自由与审计权利</strong>：系统底层源代码依托 MIT 许可证全面开放，任何人均拥有自由查阅、独立审计、Fork 分支二次开发或搭建私有商业节点的完整法定权利。</p>
    <p><strong>分发与品牌三大红线</strong>：</p>
    <ul>
      <li><strong>商标与官方品牌隔离</strong>：未经书面许可，任何第三方部署实例或二次开发版本不得在域名、界面标题或营销文案中使用「EpoCanvas Mail 官方」、「官方节点」等误导性字样；</li>
      <li><strong>版权与许可完整保留</strong>：所有二次分发的源码副本或实质修改版本，必须完整保留原作者版权声明及 MIT 许可证原文；</li>
      <li><strong>独立运营者声明</strong>：二次开发者若面向公众提供服务，必须公示其自身运营主体与隐私条款，不得将官方文档用作自身服务的法律背书。</li>
    </ul>
  </div>
</div>

### 4.3 独立自建节点运营者之法定受托义务

<div class="google-card">
  <div class="google-card-header">
    <div class="google-card-title">⚖️ 自建节点运营者之独占数据控制权</div>
    <span class="google-pill">独立数据控制者 · 无连带责任</span>
  </div>
  <div class="google-card-desc">
    <p><strong>排他性数据控制者地位</strong>：第三方使用本项目代码在自有 Cloudflare 账户或服务器搭建节点时，<strong>该运营者即成为该实例唯一且排他的「数据控制者」（Data Controller）</strong>。上游开源贡献者与官方团队对该独立实例无物理控制权、无数据访问权限，亦不承担任何法律连带责任。</p>
    <p><strong>属地合规与监管承接</strong>：自建节点运营者必须依法独立履行其所在地数据保护义务，包括安全注入加密密钥、制定符合当地法规的隐私声明、处理用户删号与数据导出请求，并独立应对属地司法与监管机构的合法调阅。</p>
  </div>
</div>

<div class="google-divider"><span class="google-divider-icon">✦</span></div>

## 5. 全球区域合规与跨境数据流动

EpoCanvas Mail 服务面向全球互联网开放。为确保用户在不受到地域无理阻隔的同时，清晰了解不同司法管辖区下的法律权利与数据主权风险，我们针对全球主流法规体系制定了针对性的合规实施框架：

### 5.1 欧洲经济区 (GDPR) 权利保障与跨境标准条款

<div class="google-card">
  <div class="google-card-header">
    <div class="google-card-title">🇪🇺 欧盟 GDPR 权利赋能与跨境保护</div>
    <span class="google-pill">GDPR Art. 15-22 · Art. 6 · SCCs</span>
  </div>
  <div class="google-card-desc">
    <p><strong>数据主体法定权利（Articles 15–22）</strong>：欧盟与欧洲经济区（EEA）用户享有随时查阅、更正、导出全部个人通讯数据、限制处理以及请求彻底删除账号的不可剥夺权利。</p>
    <p><strong>合法处理依据与标准合同条款（SCCs）</strong>：系统处理通讯流严格基于履行服务合同之必需（Art. 6(1)(b)）或用户明确知情同意（Art. 6(1)(a)）；跨境中继传输依托 Cloudflare 全球基础设施所具备的欧盟标准合同条款（SCCs）与 GDPR 附录协议保障流转合法性。</p>
  </div>
</div>

### 5.2 美国法域 (CCPA / CPRA) 隐私权利与无销售承诺

<div class="google-card">
  <div class="google-card-header">
    <div class="google-card-title">🇺🇸 加州 CCPA / CPRA 隐私权利声明</div>
    <span class="google-pill">No Sale / Share · 无歧视对待</span>
  </div>
  <div class="google-card-desc">
    <p><strong>绝不销售或共享个人信息承诺</strong>：我们明确声明：过去 12 个月内未曾、且未来亦绝不向任何数据经纪商、广告联盟或第三方商业实体销售、出租或共享用户的任何个人信息与邮件数据（Do Not Sell or Share My Personal Information）。</p>
    <p><strong>知情权与非歧视待遇</strong>：加州居民享有要求披露系统收集之信息类别、商业目的及要求实体删除的同等法定权利；系统绝不因用户行使隐私权利而在服务水准、存储容量或接入速度上施加任何歧视性限制。</p>
  </div>
</div>

### 5.3 亚太地区法规调适与当事人自主风险认知

<div class="google-card">
  <div class="google-card-header">
    <div class="google-card-title">🌏 亚太地区法规调适与自主风险认知</div>
    <span class="google-pill">台湾 PDPA · 跨国路由 · 终端安全</span>
  </div>
  <div class="google-card-desc">
    <p><strong>属地管辖与跨国中继路径</strong>：官方托管实例由位于台湾的团队营运，严格遵守当地个人资料保护法制（PDPA）。跨国电子邮件经由公网 SMTP 协议流转时，可能经过不同国家的网络交换节点并受沿途电信法例管辖，当事人应对跨法域路由具备基本认知。</p>
    <p><strong>终端自卫与反滥用治理</strong>：用户应切实保管自身终端设备安全（防范木马、定期更新固件、启用 Passkey/TOTP 双重验证）；严禁利用本服务从事跨国黑客攻击、网络钓鱼或垃圾邮件轰炸，违者运营团队将依[可接受使用政策](/mail/acceptable-use/)迅速封禁并配合合法司法调查。</p>
  </div>
</div>

<div class="google-divider"><span class="google-divider-icon">✦</span></div>

## 6. 安全事件应急响应与主管机关受检

为积极应对突发的网络安全事件与数据安全漏洞，EpoCanvas Mail 建立了标准化的安全应急响应与通报机制，确保在最短时间内控制风险并向相关方公开透明说明：

### 6.1 72 小时应急阻断与通报流程

<div class="google-card">
  <div class="google-card-header">
    <div class="google-card-title">🚨 应急响应标准作业程序 (SOP)</div>
    <span class="google-pill">72 小时通报 · 快速阻断 · 社区补丁</span>
  </div>
  <div class="google-card-desc">
    <p><strong>四步紧急阻断与通报程序</strong>：</p>
    <ul>
      <li><strong>即时阻断与威胁隔离</strong>：数分钟内于边缘网关阻断恶意来源 IP、强制注销涉事会话 JWT 令牌，并视险情立即轮换实例加解密主密钥；</li>
      <li><strong>数字取证与影响评估</strong>：隔离边缘审计日志，精准界定受波及的账号范围、字段类型与实际安全影响等级；</li>
      <li><strong>72 小时法定公开通报</strong>：若达到法定重大事件门槛，运营者将于确认事故后 72 小时内，通过全站公告及官方系统邮件通知受影响当事人，并向监管机关正式报备；</li>
      <li><strong>开源根因修复与安全公告</strong>：查明漏洞后立即合并上游修复代码，发布官方安全公告（Security Advisory），指引全网自建节点同步修补。</li>
    </ul>
  </div>
</div>

### 6.2 官方通报渠道与受检配合承接

<div class="google-card">
  <div class="google-card-header">
    <div class="google-card-title">📮 官方专属安全沟通与主管机关对接窗口</div>
    <span class="google-pill">官方对接 · 漏洞报告</span>
  </div>
  <div class="google-card-desc">
    <p><strong>合规受检与自建责任隔离</strong>：官方托管服务 <code>mail.epocanvas.com</code> 接受主管机关依法实施的检查与监督，本文档即作为稽核基准。自建节点运营者应制定其自有规章并独立应对属地监管。安全研究员或用户发现漏洞隐患时，请通过官方唯一可信窗口联络：</p>
    <ul>
      <li><strong>官方安全应急响应中心</strong>：<code>announcement@epocanvas.com</code></li>
      <li><strong>隐私与数据保护合规办公室</strong>：<code>privacy@epocanvas.com</code></li>
    </ul>
  </div>
</div>
