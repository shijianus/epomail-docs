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
};
const SIDEBAR_GROUPS_I18N = {
	'专案与架构': {
		'zh-tw': '專案與架構', en: 'Project & Architecture',
		fr: 'Projet et architecture', es: 'Proyecto y arquitectura', nl: 'Project en architectuur',
	},
	'隐私与数据保护': {
		'zh-tw': '隱私與資料保護', en: 'Privacy & Data Governance',
		fr: 'Confidentialité et données', es: 'Privacidad y protección de datos', nl: 'Privacy en gegevensbescherming',
	},
	'服务条款与合规': {
		'zh-tw': '服務條款與合規', en: 'Terms & Community Governance',
		fr: 'Conditions et gouvernance', es: 'Términos y gobernanza comunitaria', nl: 'Voorwaarden en community-beleid',
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
				g('专案与架构', [
					t('专案介绍', 'mail/project'),
					t('防篡改与官方规范', 'mail/tamper-proof'),
				]),
				g('隐私与数据保护', [
					t('总览', 'mail/overview'),
					t('隐私政策', 'mail/privacy-policy'),
					t('数据处理与安全维护', 'mail/data-security'),
					t('第三方处理者清单', 'mail/sub-processors'),
				]),
				g('服务条款与合规', [
					t('服务条款', 'mail/terms-of-service'),
					t('可接受使用政策', 'mail/acceptable-use'),
					t('用语定义', 'mail/key-terms'),
				]),
			],
		}),
	],
});
