import { defineConfig, passthroughImageService } from 'astro/config';
import starlight from '@astrojs/starlight';

// 站点来源：hreflang/canonical 需要绝对地址，部署到正式域名后只需改这一行。
// v5.3 定案：以 docs.epocanvas.com 的 /epomail 子路径发布（与 mail-worker 应用内 DOCS_URL 默认值一致）。
const SITE_ORIGIN = 'https://docs.epocanvas.com';
const SITE_BASE = '/epomail';

// Markdown 内的站点绝对链（/mail/... 、/images/... 等）Astro 不会自动附加 base，
// 此插件在构建期为 href/src 统一加前缀；已是 base 前缀、协议链与纯锚点不处理。
function rehypePrefixBase() {
	const prefix = (url) => {
		if (!url.startsWith('/') || url.startsWith('//') || url.startsWith(SITE_BASE + '/')) return url;
		return SITE_BASE + url;
	};
	const walk = (node) => {
		if (!node || !Array.isArray(node.children)) return;
		for (const child of node.children) {
			if (child.type === 'element') {
				if (child.tagName === 'a' && typeof child.properties?.href === 'string') {
					child.properties.href = prefix(child.properties.href);
				}
				if (child.tagName === 'img' && typeof child.properties?.src === 'string') {
					child.properties.src = prefix(child.properties.src);
				}
				walk(child);
			}
		}
	};
	return (tree) => walk(tree);
}

// 侧边栏条目的多语言文案：label 为默认语言（简体中文），其余语言从 translations 取。
const SIDEBAR_I18N = {
	'专案介绍': {
		'zh-tw': '專案介紹', en: 'Project Overview',
		fr: 'Présentation du projet', es: 'Presentación del proyecto', nl: 'Projectoverzicht',
	},
	'运行模式': {
		'zh-tw': '運行模式', en: 'Operating Modes',
		fr: 'Modes de fonctionnement', es: 'Modos de funcionamiento', nl: 'Werkingsmodi',
	},
	'设置指南': {
		'zh-tw': '設定指南', en: 'Settings Guide',
		fr: 'Guide des paramètres', es: 'Guía de configuración', nl: 'Instellingengids',
	},
	'总览': {
		'zh-tw': '總覽', en: 'Overview',
		fr: 'Aperçu', es: 'Descripción general', nl: 'Overzicht',
	},
	'隐私政策': {
		'zh-tw': '隱私權政策', en: 'Privacy Policy',
		fr: 'Politique de confidentialité', es: 'Política de privacidad', nl: 'Privacybeleid',
	},
	'服务条款': {
		'zh-tw': '服務條款', en: 'Terms of Service',
		fr: "Conditions d'utilisation", es: 'Términos del servicio', nl: 'Servicevoorwaarden',
	},
	'可接受使用政策': {
		'zh-tw': '可接受使用政策', en: 'Acceptable Use Policy',
		fr: "Politique d'utilisation acceptable", es: 'Política de uso aceptable', nl: 'Beleid voor acceptabel gebruik',
	},
	'数据处理与安全维护': {
		'zh-tw': '資料處理與安全維護', en: 'Data Processing & Security',
		fr: 'Traitement des données et sécurité', es: 'Tratamiento de datos y seguridad', nl: 'Gegevensverwerking en beveiliging',
	},
	'第三方处理者清单': {
		'zh-tw': '第三方處理者清單', en: 'Sub-processors',
		fr: 'Sous-traitants', es: 'Encargados del tratamiento', nl: 'Verwerkers',
	},
	'用语定义': {
		'zh-tw': '用語定義', en: 'Key Terms',
		fr: 'Définitions', es: 'Glosario', nl: 'Begrippenlijst',
	},
	'防篡改与官方规范': {
		'zh-tw': '防竄改與官方規範', en: 'Anti-Tampering & Official Specs',
		fr: 'Anti-falsification et spécifications officielles', es: 'Seguridad contra manipulaciones y normas oficiales', nl: 'Beveiliging tegen manipulatie en officiële specificaties',
	},
	'开放平台与 API 接入': {
		'zh-tw': '開放平台與 API 接入', en: 'Open Platform & API Access',
		fr: 'Plateforme ouverte et accès API', es: 'Plataforma abierta y acceso a la API', nl: 'Open platform en API-toegang',
	},
	'帐号安全设置指南': {
		'zh-tw': '帳號安全設定指南', en: 'Account Security Guide',
		fr: 'Guide de sécurité du compte', es: 'Guía de seguridad de la cuenta', nl: 'Accountbeveiligingsgids',
	},
	'通知与转发指南': {
		'zh-tw': '通知與轉寄指南', en: 'Notifications & Forwarding Guide',
		fr: 'Guide des notifications et du transfert', es: 'Guía de notificaciones y reenvío', nl: 'Handleiding meldingen en doorsturen',
	},
	"邮箱界面与邮件详情": {
		"zh-tw": "信箱介面與郵件詳情", en: "Mailbox Interface & Message Detail",
		fr: "Interface de la boîte et détail des courriels", es: "Interfaz del buzón y detalle del mensaje", nl: "Mailboxinterface en e-maildetails",
	},
	"标签与分类管理": {
		"zh-tw": "標籤與分類管理", en: "Labels & Classification Management",
		fr: "Gestion des étiquettes et du classement", es: "Gestión de etiquetas y clasificación", nl: "Label- en classificatiebeheer",
	},
	"个资与常规设置": {
		"zh-tw": "個資與常規設定", en: "Personal Data & General Settings",
		fr: "Profil et réglages généraux", es: "Perfil y ajustes generales", nl: "Profiel en algemene instellingen",
	},
	"数据导出与存储": {
		"zh-tw": "資料匯出與儲存", en: "Data Export & Storage",
		fr: "Export des données et stockage", es: "Exportación de datos y almacenamiento", nl: "Gegevensexport en opslag",
	},
	"分析页": {
		"zh-tw": "分析頁", en: "Analytics",
		fr: "Page d'analyse", es: "Analítica", nl: "Analysepagina",
	},
	"用户列表": {
		"zh-tw": "使用者清單", en: "User List",
		fr: "Liste des utilisateurs", es: "Lista de usuarios", nl: "Gebruikerslijst",
	},
	"全库邮件审查": {
		"zh-tw": "全庫郵件審查", en: "Full-Store Mail Review",
		fr: "Revue du courriel à l'échelle du site", es: "Revisión del correo de todo el almacén", nl: "E-mailcontrole over de hele opslag",
	},
	"权限控制": {
		"zh-tw": "權限控制", en: "Permissions",
		fr: "Permissions", es: "Control de permisos", nl: "Rechtenbeheer",
	},
	"注册密钥": {
		"zh-tw": "註冊密鑰", en: "Registration Keys",
		fr: "Clés d'inscription", es: "Claves de registro", nl: "Registratiesleutels",
	},
	"系统设置配置卡详解": {
		"zh-tw": "系統設定配置卡詳解", en: "System Settings Cards",
		fr: "Les cartes des paramètres système en détail", es: "Guía de las tarjetas de configuración del sistema", nl: "De configuratiekaarten van de systeeminstellingen",
	},
	"分类管理": {
		"zh-tw": "分類管理", en: "Classification",
		fr: "Classement", es: "Gestión de clasificación", nl: "Classificatiebeheer",
	},
	"操作报告": {
		"zh-tw": "操作報告", en: "Operation Reports",
		fr: "Rapport d'audit", es: "Informe de auditoría", nl: "Auditrapport",
	},
	'界面与路由总览': {
		'zh-tw': '介面與路由總覽', en: 'Interface & Route Map',
		fr: 'Interface et plan des routes', es: 'Mapa de interfaz y rutas', nl: 'Interface en routekaart',
	},
	'搜索与规则参考': {
		'zh-tw': '搜尋與規則參考', en: 'Search & Rules Reference',
		fr: 'Référence de la recherche et des règles', es: 'Referencia de búsqueda y reglas', nl: 'Zoek- en regelreferentie',
	},
	'部署指南': {
		'zh-tw': '部署指南', en: 'Deployment Guide',
		fr: 'Guide de déploiement', es: 'Guía de despliegue', nl: 'Uitrolgids',
	},
	'开发指南': {
		'zh-tw': '開發指南', en: 'Development Guide',
		fr: 'Guide de développement', es: 'Guía de desarrollo', nl: 'Ontwikkelgids',
	},
	'服务范围与支持': {
		'zh-tw': '服務範圍與支援', en: 'Service Scope & Support',
		fr: 'Périmètre du service et assistance', es: 'Alcance del servicio y soporte', nl: 'Dienstomvang en ondersteuning',
	},
	'开源与自行部署法律': {
		'zh-tw': '開源與自行部署法律', en: 'Open-Source & Self-Hosting Legal',
		fr: "Open source et cadre juridique de l'auto-hébergement", es: 'Marco legal del código abierto y el autoalojamiento', nl: 'Open source en zelfhosting: juridisch kader',
	},
};
const SIDEBAR_GROUPS_I18N = {
	'邮箱使用': {
		'zh-tw': '信箱使用', en: 'Mailbox Usage',
		fr: 'Utilisation de la boîte', es: 'Uso del buzón', nl: 'Mailboxgebruik',
	},
	'个人设置': {
		'zh-tw': '個人設定', en: 'Personal Settings',
		fr: 'Paramètres personnels', es: 'Ajustes personales', nl: 'Persoonlijke instellingen',
	},
	'管理控制台': {
		'zh-tw': '管理控制台', en: 'Admin Console',
		fr: 'Console d’administration', es: 'Consola de administración', nl: 'Beheerconsole',
	},
	'产品与总览': {
		'zh-tw': '產品與總覽', en: 'Product & Overview',
		fr: 'Produit et aperçu', es: 'Producto y descripción general', nl: 'Product en overzicht',
	},
	'使用指南': {
		'zh-tw': '使用指南', en: 'Usage Guide',
		fr: "Guide d'utilisation", es: 'Guía de uso', nl: 'Gebruiksgids',
	},
	'自部署与开发': {
		'zh-tw': '自部署與開發', en: 'Self-Hosting & Development',
		fr: 'Auto-hébergement et développement', es: 'Autoalojamiento y desarrollo', nl: 'Zelfhosting en ontwikkeling',
	},
	'技术与信任': {
		'zh-tw': '技術與信任', en: 'Technology & Trust',
		fr: 'Technologie et confiance', es: 'Tecnología y confianza', nl: 'Technologie en vertrouwen',
	},
	'隐私与数据保护': {
		'zh-tw': '隱私與資料保護', en: 'Privacy & Data Governance',
		fr: 'Confidentialité et données', es: 'Privacidad y protección de datos', nl: 'Privacy en gegevensbescherming',
	},
	'条款与合规': {
		'zh-tw': '條款與合規', en: 'Terms & Compliance',
		fr: 'Conditions et conformité', es: 'Términos y cumplimiento', nl: 'Voorwaarden en naleving',
	},
};
const t = (label, slug) => ({ label, slug, translations: SIDEBAR_I18N[label] ?? {} });
const g = (label, items) => ({ label, translations: SIDEBAR_GROUPS_I18N[label] ?? {}, items });

export default defineConfig({
	site: SITE_ORIGIN,
	base: SITE_BASE,
	markdown: { rehypePlugins: [rehypePrefixBase] },
	// 纯文档站点用不到 Astro 开发工具栏
	devToolbar: { enabled: false },
	// 全站没有 <Image> 调用；passthrough 服务规避 sharp 原生依赖在隔离布局下解析不到的问题
	image: { service: passthroughImageService() },
	integrations: [
		starlight({
			title: 'EpoCanvas Mail',
			description: 'EpoCanvas Mail 官方法律与技术文档——隐私政策、服务条款、可接受使用政策、数据安全与防篡改规范',
			// 简体中文为默认语言，占用 URL 根路径；其余语言带目录前缀（如 /en/mail/privacy-policy/）
			defaultLocale: 'root',
			locales: {
				root: { label: '简体中文', lang: 'zh-CN' },
				'zh-tw': { label: '繁體中文', lang: 'zh-TW' },
				en: { label: 'English', lang: 'en' },
				fr: { label: 'Français', lang: 'fr' },
				es: { label: 'Español', lang: 'es' },
				nl: { label: 'Nederlands', lang: 'nl' },
			},
			logo: { src: './public/favicon.svg' },
			favicon: '/favicon.svg',
			social: { github: 'https://github.com/shijianus/epomail' },
			// 覆写 Starlight 翻页推荐卡：每篇文档配专属几何图标（见 src/components/OverriddenPagination.astro）
			components: { Pagination: './src/components/OverriddenPagination.astro' },
			head: [
				{
					tag: 'script',
					attrs: {
						src: SITE_BASE + '/scripts/tamper-proof-client.js',
						defer: true
					}
				}
			],
			// 页面「最后更新于」时间戳取自构建时的 Git 提交历史
			lastUpdated: true,
			customCss: ['./src/styles/custom.css'],
			sidebar: [
				g('产品与总览', [
					t('专案介绍', 'mail/project'),
					t('服务范围与支持', 'mail/service-scope'),
					t('界面与路由总览', 'mail/interface'),
				]),
				g('邮箱使用', [
					t('邮箱界面与邮件详情', 'mail/mailbox'),
					t('功能指南', 'mail/features'),
					t('搜索与规则参考', 'mail/search'),
					t('标签与分类管理', 'mail/labels'),
				]),
				g('个人设置', [
					t('设置指南', 'mail/settings'),
					t('个资与常规设置', 'mail/preferences'),
					t('帐号安全设置指南', 'mail/security'),
					t('数据导出与存储', 'mail/data'),
					t('通知与转发指南', 'mail/notify'),
				]),
				g('管理控制台', [
					t('分析页', 'mail/analysis'),
					t('用户列表', 'mail/users'),
					t('全库邮件审查', 'mail/review'),
					t('权限控制', 'mail/roles'),
					t('注册密钥', 'mail/regkeys'),
					t('系统设置配置卡详解', 'mail/system'),
					t('开放平台与 API 接入', 'mail/api'),
					t('分类管理', 'mail/category'),
					t('操作报告', 'mail/audit'),
				]),
				g('自部署与开发', [
					t('部署指南', 'mail/deployment'),
					t('开发指南', 'mail/development'),
				]),
				g('技术与信任', [
					t('运行模式', 'mail/modes'),
					t('技术架构', 'mail/architecture'),
					t('防篡改与官方规范', 'mail/tamper-proof'),
				]),
				g('隐私与数据保护', [
					t('总览', 'mail/overview'),
					t('隐私政策', 'mail/privacy-policy'),
					t('数据处理与安全维护', 'mail/data-security'),
					t('第三方处理者清单', 'mail/sub-processors'),
				]),
				g('条款与合规', [
					t('服务条款', 'mail/terms-of-service'),
					t('可接受使用政策', 'mail/acceptable-use'),
					t('开源与自行部署法律', 'mail/open-source'),
					t('用语定义', 'mail/key-terms'),
				]),
			],
		}),
	],
});
