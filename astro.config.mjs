import { defineConfig, passthroughImageService } from 'astro/config';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import starlight from '@astrojs/starlight';

const SITE_ORIGIN = 'https://docs.epomail.app';

// 给 <table> 包装 .table-wrapper 实现优雅横向滚动
function rehypeWrapTables() {
	const walk = (node) => {
		if (!node || !Array.isArray(node.children)) return;
		for (let i = 0; i < node.children.length; i++) {
			const child = node.children[i];
			walk(child);
			if (child.type === 'element' && child.tagName === 'table') {
				node.children[i] = {
					type: 'element',
					tagName: 'div',
					properties: { className: ['table-wrapper'] },
					children: [child],
				};
			}
		}
	};
	return (tree) => walk(tree);
}

const LOCALE_DIRS = ['zh-tw', 'en', 'ja'];

function looksLikeAssetPath(href) {
	const lastSegment = href.split(/[?#]/)[0].split('/').filter(Boolean).pop() ?? '';
	return /\.[A-Za-z][A-Za-z0-9]*$/.test(lastSegment);
}

function rehypeLocalizeInternalLinks() {
	return (tree, file) => {
		const filePath = (file.path || file.history?.[0] || '').replace(/\\/g, '/');
		const match = filePath.match(/\/content\/docs\/([^/]+)\//);
		const dir = match && match[1];
		if (!dir || !LOCALE_DIRS.includes(dir)) return;
		const walk = (node) => {
			if (!node || !Array.isArray(node.children)) return;
			for (const child of node.children) {
				if (child.type === 'element' && child.tagName === 'a') {
					const href = child.properties?.href;
					if (typeof href === 'string' && href.startsWith('/') && !href.startsWith('//')) {
						const firstSegment = href.slice(1).split('/')[0];
						if (!LOCALE_DIRS.includes(firstSegment) && !looksLikeAssetPath(href)) {
							child.properties.href = '/' + dir + href;
						}
					}
				}
				walk(child);
			}
		};
		walk(tree);
	};
}

// https://astro.build/config
export default defineConfig({
	site: SITE_ORIGIN,
	image: { service: passthroughImageService() },
	devToolbar: {
		enabled: false,
	},
	markdown: {
		rehypePlugins: [rehypeWrapTables, rehypeLocalizeInternalLinks],
	},
	integrations: [
		starlight({
			title: 'EpoMail Docs',
			description: 'EpoMail 官方开源文档与法律合规中心 - 基于 Cloudflare Workers 边缘云原生全栈邮箱服务',
			defaultLocale: 'root',
			locales: {
				root: {
					label: '简体中文',
					lang: 'zh-CN',
				},
				'zh-tw': {
					label: '繁體中文',
					lang: 'zh-TW',
				},
				en: {
					label: 'English',
					lang: 'en',
				},
				ja: {
					label: '日本語',
					lang: 'ja',
				},
			},
			logo: {
				src: './public/images/logo.svg',
				replacesTitle: false,
			},
			favicon: '/favicon.svg',
			disable404Route: true,
			head: [
				{
					tag: 'link',
					attrs: {
						rel: 'icon',
						type: 'image/svg+xml',
						href: '/favicon.svg',
					},
				},
			],
			social: {
				github: 'https://github.com/shijianus/epomail',
			},
			lastUpdated: true,
			customCss: ['./src/styles/custom.css'],
			components: {
				Header: './src/components/starlight/Header.astro',
				Sidebar: './src/components/starlight/Sidebar.astro',
				TableOfContents: './src/components/starlight/TableOfContents.astro',
				PageTitle: './src/components/starlight/PageTitle.astro',
				TwoColumnContent: './src/components/starlight/TwoColumnContent.astro',
				Search: './src/components/starlight/Search.astro',
				Pagination: './src/components/starlight/Pagination.astro',
			},
			sidebar: [
				// ==========================================
				// 第一大板块：开源专案与技术指南 (参照 SkyMail 风格)
				// ==========================================
				{
					label: '🚀 项目概览与架构',
					translations: {
						'zh-TW': '🚀 專案概覽與架構',
						en: '🚀 Overview & Architecture',
						ja: '🚀 プロジェクト概要とアーキテクチャ',
					},
					items: [
						{
							label: '这是什么与核心愿景',
							translations: {
								'zh-TW': '這是什麼與核心願景',
								en: 'What is EpoMail & Vision',
								ja: 'EpoMailとは・ビジョン',
							},
							link: '/project/about/',
						},
						{
							label: '核心功能全景矩阵',
							translations: {
								'zh-TW': '核心功能全景矩陣',
								en: 'Core Feature Matrix',
								ja: 'コア機能マトリクス',
							},
							link: '/project/features/',
						},
						{
							label: '全栈云原生架构剖析',
							translations: {
								'zh-TW': '全棧雲原生架構剖析',
								en: 'Cloud-Native Architecture Deep Dive',
								ja: 'クラウドネイティブアーキテクチャ詳細',
							},
							link: '/project/architecture/',
						},
					],
				},
				{
					label: '⚡ 快速上手与生产部署',
					translations: {
						'zh-TW': '⚡ 快速上手與生產部署',
						en: '⚡ Quickstart & Deployment',
						ja: '⚡ クイックスタートと本番デプロイ',
					},
					items: [
						{
							label: '快速上手 (本地开发栈)',
							translations: {
								'zh-TW': '快速上手 (本地開發棧)',
								en: 'Quickstart (Local Dev Stack)',
								ja: 'クイックスタート (ローカル開発環境)',
							},
							link: '/project/quickstart/',
						},
						{
							label: 'Cloudflare 生产部署指南',
							translations: {
								'zh-TW': 'Cloudflare 生產部署指南',
								en: 'Cloudflare Production Deployment',
								ja: 'Cloudflare 本番デプロイガイド',
							},
							link: '/project/deploy/',
						},
						{
							label: '系统冷启动与站长初始化',
							translations: {
								'zh-TW': '系統冷啟動與站長初始化',
								en: 'Cold Start & Master Admin Setup',
								ja: 'コールドスタートと管理者初期化',
							},
							link: '/project/init/',
						},
						{
							label: '域名解析与邮件路由配置',
							translations: {
								'zh-TW': '域名解析與郵件路由設定',
								en: 'DNS Records & Email Routing',
								ja: 'DNSレコードとメールルーティング設定',
							},
							link: '/project/dns-routing/',
						},
					],
				},
				{
					label: '⚙️ 核心配置与系统运维',
					translations: {
						'zh-TW': '⚙️ 核心設定與系統維運',
						en: '⚙️ System Operations & Config',
						ja: '⚙️ システム運用と設定',
					},
					items: [
						{
							label: '邮件发信渠道与配额控制',
							translations: {
								'zh-TW': '郵件發信管道與配額控制',
								en: 'Outbound Channels & Quotas',
								ja: '送信チャネルとクォータ管理',
							},
							link: '/project/sending-channels/',
						},
						{
							label: '对象存储与附件管理 (R2)',
							translations: {
								'zh-TW': '物件儲存與附件管理 (R2)',
								en: 'Object Storage & Attachments (R2)',
								ja: 'オブジェクトストレージと添付ファイル (R2)',
							},
							link: '/project/attachments-r2/',
						},
						{
							label: '安全防护与防爆破体系',
							translations: {
								'zh-TW': '安全防護與防爆破體系',
								en: 'Security, Turnstile & Anti-Abuse',
								ja: 'セキュリティ・防護・認証',
							},
							link: '/project/security/',
						},
						{
							label: '规则引擎与自动化推送 (TG Bot)',
							translations: {
								'zh-TW': '規則引擎與自動化推送 (TG Bot)',
								en: 'Rule Engine & Telegram Push',
								ja: 'ルールエンジンとTelegram通知',
							},
							link: '/project/rules-push/',
						},
						{
							label: '数据库备份与容灾迁移',
							translations: {
								'zh-TW': '資料庫備份與容災遷移',
								en: 'Database Backup & Disaster Recovery',
								ja: 'データベースバックアップと移行',
							},
							link: '/project/backup-migration/',
						},
					],
				},
				{
					label: '🔌 开发者指南与 API 参考',
					translations: {
						'zh-TW': '🔌 開發者指南與 API 參考',
						en: '🔌 Developer Guide & REST API',
						ja: '🔌 開発者ガイドとAPIリファレンス',
					},
					items: [
						{
							label: '开放 API 规范与认证',
							translations: {
								'zh-TW': '開放 API 規範與認證',
								en: 'API Design & Authentication',
								ja: 'API仕様と認証',
							},
							link: '/project/api-overview/',
						},
						{
							label: '核心 API 接口端点速查',
							translations: {
								'zh-TW': '核心 API 介面端點速查',
								en: 'Core Endpoints Reference',
								ja: 'エンドポイントリファレンス',
							},
							link: '/project/api-reference/',
						},
						{
							label: '常见问题与故障排查 FAQ',
							translations: {
								'zh-TW': '常見問題與故障排查 FAQ',
								en: 'FAQ & Troubleshooting',
								ja: 'FAQ・よくあるトラブル解決',
							},
							link: '/project/faq/',
						},
					],
				},

				// ==========================================
				// 第二大板块：法律定位、隐私与合规 (对照 Gmail/Google Policies)
				// ==========================================
				{
					label: '⚖️ 法律定位与数据主权',
					translations: {
						'zh-TW': '⚖️ 法律定位與資料主權',
						en: '⚖️ Legal Standing & Data Sovereignty',
						ja: '⚖️ 法的地位とデータ主権',
					},
					items: [
						{
							label: '开源软件与法律地位说明',
							translations: {
								'zh-TW': '開源軟體與法律地位說明',
								en: 'Open Source Notice & Legal Boundary',
								ja: 'オープンソース声明と法的境界',
							},
							link: '/legal/overview/',
						},
						{
							label: '用户数据主权与所有权承诺',
							translations: {
								'zh-TW': '使用者資料主權與所有權承諾',
								en: 'User Data Ownership Guarantee',
								ja: 'ユーザーデータ主権と所有権の誓約',
							},
							link: '/legal/data-sovereignty/',
						},
						{
							label: '合规技术基线与功能规范',
							translations: {
								'zh-TW': '合規技術基線與功能規範',
								en: 'Technical Baseline & Architecture Spec',
								ja: 'コンプライアンス技術ベースラインと機能仕様',
							},
							link: '/legal/technical-baseline/',
						},
					],
				},
				{
					label: '📜 核心法律条款 (对照 Gmail)',
					translations: {
						'zh-TW': '📜 核心法律條款 (對照 Gmail)',
						en: '📜 Core Policies (Gmail Standard)',
						ja: '📜 コアポリシー (Gmail標準準拠)',
					},
					items: [
						{
							label: '隐私权政策 (Privacy Policy)',
							translations: {
								'zh-TW': '隱私權政策 (Privacy Policy)',
								en: 'Privacy Policy',
								ja: 'プライバシーポリシー',
							},
							link: '/legal/privacy/',
						},
						{
							label: '服务使用条款 (Terms of Service)',
							translations: {
								'zh-TW': '服務使用條款 (Terms of Service)',
								en: 'Terms of Service',
								ja: '利用規約 (Terms of Service)',
							},
							link: '/legal/terms/',
						},
						{
							label: '可接受使用政策与反滥用守则',
							translations: {
								'zh-TW': '可接受使用政策與反濫用守則',
								en: 'Acceptable Use & Anti-Abuse Policy',
								ja: '利用規定とアンチスパム方針',
							},
							link: '/legal/anti-abuse/',
						},
					],
				},
				{
					label: '🔒 安全白皮书与合规指引',
					translations: {
						'zh-TW': '🔒 安全白皮書與合規指引',
						en: '🔒 Security Whitepaper & Compliance',
						ja: '🔒 セキュリティ白書とコンプライアンス',
					},
					items: [
						{
							label: '邮件安全与加密技术白皮书',
							translations: {
								'zh-TW': '郵件安全與加密技術白皮書',
								en: 'Email Security & Encryption Whitepaper',
								ja: 'メールセキュリティと暗号化白書',
							},
							link: '/legal/security-whitepaper/',
						},
						{
							label: '数据保留与彻底删除准则',
							translations: {
								'zh-TW': '資料保留與徹底刪除準則',
								en: 'Data Retention & Erasure Standards',
								ja: 'データ保持と物理削除基準',
							},
							link: '/legal/data-retention/',
						},
						{
							label: '司法调证与合规协助指引',
							translations: {
								'zh-TW': '司法調證與合規協助指引',
								en: 'Law Enforcement Request Guidelines',
								ja: '法執行機関からの開示請求対応指針',
							},
							link: '/legal/law-enforcement/',
						},
					],
				},
			],
		}),
	],
});
