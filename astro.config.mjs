import { defineConfig, passthroughImageService } from 'astro/config';
import starlight from '@astrojs/starlight';

// 站点来源：hreflang/canonical 需要绝对地址，部署到正式域名后只需改这一行。
const SITE_ORIGIN = 'https://mail.epocanvas.com';

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
};
const t = (label, slug) => ({ label, slug, translations: SIDEBAR_I18N[label] ?? {} });

export default defineConfig({
	site: SITE_ORIGIN,
	// 纯文档站点用不到 Astro 开发工具栏
	devToolbar: { enabled: false },
	// 全站没有 <Image> 调用；passthrough 服务规避 sharp 原生依赖在隔离布局下解析不到的问题
	image: { service: passthroughImageService() },
	integrations: [
		starlight({
			title: 'EpoCanvas Mail',
			description: 'EpoCanvas Mail 官方法律文档——隐私政策、服务条款、可接受使用政策与数据安全（6 语言，以繁体中文台湾版为准）',
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
			// 页面「最后更新于」时间戳取自构建时的 Git 提交历史
			lastUpdated: true,
			customCss: ['./src/styles/custom.css'],
			sidebar: [
				t('专案介绍', 'mail/project'),
				t('总览', 'mail/overview'),
				t('隐私政策', 'mail/privacy-policy'),
				t('服务条款', 'mail/terms-of-service'),
				t('可接受使用政策', 'mail/acceptable-use'),
				t('数据处理与安全维护', 'mail/data-security'),
				t('第三方处理者清单', 'mail/sub-processors'),
				t('用语定义', 'mail/key-terms'),
			],
		}),
	],
});
