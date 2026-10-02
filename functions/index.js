import { negotiate, overviewPathFor, redirectTo } from './_lib.js';

// 站点根路径：按浏览器首选语言进入对应语言的文档总览
export async function onRequest({ request }) {
	return redirectTo(request, overviewPathFor(negotiate(request.headers.get('accept-language'))));
}
