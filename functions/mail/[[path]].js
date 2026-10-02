import { negotiate, redirectTo } from '../_lib.js';

// 旧根轨道路径 /mail/...：整段迁移至带语言协商的 /epomail/{locale}/mail/... 规范路径
export async function onRequest({ request, params }) {
	// Pages Functions 对可选全捕获参数的返回类型在运行期间可能为 string / array / undefined，统一归一
	let rest = params.path || '';
	if (Array.isArray(rest)) rest = rest.join('/');
	rest = String(rest).replace(/^\/+/, '');
	const trailing = new URL(request.url).pathname.endsWith('/') ? '/' : '';
	const locale = negotiate(request.headers.get('accept-language'));
	const target = `/epomail/${locale ? locale + '/' : ''}mail/${rest}${trailing}`;
	return redirectTo(request, target);
}
