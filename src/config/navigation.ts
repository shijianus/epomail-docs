import pkg from '../../package.json';
import { SUPPORTED_LANGUAGES } from '../utils/i18n';

export const CURRENT_DOCS_VERSION = `v${pkg.version}`;

export interface NavItem {
	id: string;
	labelKey: string;
	defaultLabel: string;
	href: string;
	match?: (pathname: string) => boolean;
	badge?: string;
	isExternal?: boolean;
}

const LOCALE_DIRS = SUPPORTED_LANGUAGES.map((lang) => lang.dir).filter(Boolean);

function sectionSlug(pathname: string): { section: string; slug: string } | null {
	const segments = pathname.split('/').filter(Boolean);
	if (segments.length > 0 && LOCALE_DIRS.includes(segments[0].toLowerCase())) {
		segments.shift();
	}
	if (!segments[0]) return null;
	return {
		section: segments[0],
		slug: segments[1] ?? '',
	};
}

function isSection(section: string, slugs?: string[]): (pathname: string) => boolean {
	return (pathname) => {
		const res = sectionSlug(pathname);
		if (!res || res.section !== section) return false;
		if (!slugs || slugs.length === 0) return true;
		return slugs.includes(res.slug);
	};
}

export const navigationConfig: NavItem[] = [
	{
		id: 'home',
		labelKey: 'nav.home',
		defaultLabel: '首页',
		href: '/',
		match: (pathname: string) => pathname === '/' || pathname === '',
	},
	{
		id: 'project',
		labelKey: 'nav.project',
		defaultLabel: '开源指南',
		href: '/project/about/',
		match: isSection('project'),
	},
	{
		id: 'quickstart',
		labelKey: 'nav.quickstart',
		defaultLabel: '快速上手',
		href: '/project/quickstart/',
		match: isSection('project', ['quickstart']),
	},
	{
		id: 'deploy',
		labelKey: 'nav.deploy',
		defaultLabel: '部署上线',
		href: '/project/deploy/',
		match: isSection('project', ['deploy', 'init', 'dns-routing']),
	},
	{
		id: 'legal',
		labelKey: 'nav.legal',
		defaultLabel: '法律合规',
		href: '/legal/overview/',
		match: isSection('legal'),
	},
	{
		id: 'privacy',
		labelKey: 'nav.privacy',
		defaultLabel: '隐私政策',
		href: '/legal/privacy/',
		match: isSection('legal', ['privacy']),
	},
	{
		id: 'terms',
		labelKey: 'nav.terms',
		defaultLabel: '服务条款',
		href: '/legal/terms/',
		match: isSection('legal', ['terms', 'anti-abuse']),
	},
	{
		id: 'release',
		labelKey: 'nav.releases',
		defaultLabel: CURRENT_DOCS_VERSION,
		href: 'https://github.com/shijianus/epomail/releases',
		isExternal: true,
		badge: CURRENT_DOCS_VERSION,
	},
];
