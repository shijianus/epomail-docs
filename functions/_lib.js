// 语言协商共享逻辑：根据 Accept-Language 头把访客送往其浏览器所选受支持语言的入口页。
// 无匹配时缺省简体中文（站点默认语言）。不使用 Cookie，符合隐私政策「不以 Cookie 识别」之承诺。
const LOCALES = ['zh-tw', 'en', 'fr', 'es', 'nl', 'de'];
const DEFAULT_PATH = '/epomail/mail/overview/';

export function overviewPathFor(locale) {
	return locale ? `/epomail/${locale}/mail/overview/` : DEFAULT_PATH;
}

export function negotiate(acceptLanguage) {
	if (!acceptLanguage) return '';
	// 按 q 权重降序匹配；同权重保留请求顺序。无具体匹配（含通配符）时用默认版。
	const tags = acceptLanguage
		.split(',')
		.map((part) => {
			const [tag, ...params] = part.trim().split(';');
			const weights = params.map((p) => p.trim()).filter((p) => /^q(?:\s*=|$)/i.test(p));
			// HTTP q 值仅接受 0..1、最多三位小数；无效或重复权重不参与协商。
			const match = weights[0]?.match(/^q\s*=\s*(0(?:\.\d{0,3})?|1(?:\.0{0,3})?)$/i);
			const q = weights.length === 0 ? 1 : weights.length === 1 && match ? Number(match[1]) : 0;
			return { tag: tag.trim().toLowerCase().replace(/_/g, '-'), q };
		})
		.filter(({ tag, q }) => /^[a-z]{1,8}(?:-[a-z0-9]{1,8})*$/.test(tag) && q > 0)
		.sort((a, b) => b.q - a.q);
	for (const { tag } of tags) {
		const [language, scriptOrRegion] = tag.split('-');
		if (language === 'zh') {
			// 显式 Hans/Hant 优先于地区；TW/HK/MO 也映射繁中，其余中文使用默认简中。
			return ['hant', 'tw', 'hk', 'mo'].includes(scriptOrRegion) ? 'zh-tw' : '';
		}
		// 匹配完整主语言子标签，不把 english、french 等前缀误识别为 en/fr。
		if (LOCALES.includes(language)) return language;
	}
	return '';
}

export function redirectTo(request, path) {
	const url = new URL(request.url);
	// 此共享助手仅用于语言协商入口；显式 locale 文档路径仍由静态路由处理。
	// 禁止浏览器与共享缓存复用协商结果，避免同一入口向不同访客串语。
	return new Response(null, {
		status: 302,
		headers: {
			Location: new URL(path, url).toString(),
			Vary: 'Accept-Language',
			'Cache-Control': 'private, no-store',
		},
	});
}
