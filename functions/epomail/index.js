import { negotiate, overviewPathFor, redirectTo } from '../_lib.js';

// /epomail/ 挂载根：同样按浏览器首选语言协商
export async function onRequest({ request }) {
	return redirectTo(request, overviewPathFor(negotiate(request.headers.get('accept-language'))));
}
