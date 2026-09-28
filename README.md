# EpoMail Docs (EpoCanvas Mail 官方文档与法律合规中心)

EpoMail 官方独立开源文档站点，基于 Astro 5 与 Starlight 构建，开箱自带三栏清晰排版、Pagefind 全文检索、多语言切换与 Cloudflare 边缘部署支持。

---

## 🌟 核心板块划分

本项目容纳两大独立核心板块，并在统一的架构下为用户提供流畅体验：

1. **🚀 开源专案指南 (Project & Technical Docs)**
   - 参照主流开源邮件系统规范（如 SkyMail），全面剖析 EpoMail 的 Serverless 边缘云原生架构。
   - 涵盖从本地开发、Cloudflare 生产部署、D1/KV/R2 存储配置、域名解析到开放 API 规范的全套指南。
2. **⚖️ 法律定位、隐私与合规中心 (Legal, Privacy & Compliance Docs)**
   - 深度对照 **Google / Gmail 官方隐私与法律政策规范**（`policies.google.com/privacy`、服务条款、安全白皮书）。
   - 确立开源自托管与独立运营者的法律权责界限，庄严确立用户数据主权、零商业扫描原则与物理硬删除保障。
   - 针对 EpoMail 主站与移动端外链跳转提供永久稳定的规范化锚点与路由。

---

## 🚀 本地开发与构建

```bash
# 1. 安装依赖
pnpm install

# 2. 启动本地开发服务 (支持实时热重载)
pnpm dev
# 访问 http://localhost:4321

# 3. 生产产物编译
pnpm build

# 4. 本地静态预览
pnpm preview
```

---

## 📦 目录结构

```
epomail-docs/
├── src/
│   ├── assets/             # 静态图标与资源 (logo.svg)
│   ├── components/         # Starlight 定制化 UI 布局组件
│   ├── config/             # 全局导航栏配置 (navigation.ts)
│   ├── content/
│   │   └── docs/           # 文档 Markdown / MDX 正文
│   │       ├── index.mdx   # 文档站首页 (双板块导航大厅)
│   │       ├── project/    # 开源专案与架构指南 (15篇全量文档)
│   │       └── legal/      # 法律地位、隐私与合规 (8篇权威条款)
│   ├── pages/              # 自定义页面 (如 404.astro)
│   ├── styles/             # 自定义全局 CSS 变量与深浅主题适配
│   └── utils/              # i18n 多语言翻译字典与本地化函数
├── public/                 # 公共静态资源 (favicon, robots.txt, logo)
├── astro.config.mjs        # Astro & Starlight 核心配置文件
├── package.json
└── tsconfig.json
```

---

## 📜 许可证

本项目文档与源代码遵循 [MIT License](LICENSE)。
