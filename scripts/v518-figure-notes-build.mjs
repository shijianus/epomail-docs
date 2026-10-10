// v5.18 图解分注：把 v517-figures-spec.mjs 的「分区含义」内容固化为可注入的数据集。
// 产出 scripts/v517-figure-notes.json —— 键为图片文件名，值含：
//   title   : 隐藏式下拉的标题后缀（说明本图要看懂什么）
//   plain   : 该图无编号徽章，展开项按分区名列点（无序号）
//   summary : 下拉展开后的导语（点出分区之间的分工关系）
//   items[] : { h 分区名, d 该分区的具体含义与用法 }
// zh 为权威；en 对照；zh-tw/es/fr/nl 由 scripts/v517-figure-notes-<lang>.json 提供。
import { writeFileSync } from 'node:fs';
import { FIGS } from './v517-figures-spec.mjs';

// 下拉标题：一句话点出「这张图用来看懂什么」，非页面标题的复读。
const TITLES = {
  'views-guide.png': { zh: '收件箱全景：四个最先用到的入口', en: 'The inbox at a glance: the four entries you reach for first' },
  'compose-guide.png': { zh: '写信弹层：一封信从排版到发出的四个落点', en: 'The compose overlay: four stops from styling to sending' },
  'search-guide.png': { zh: '检索：一次搜索的两个关键位置', en: 'Search: the two positions that matter in one query' },
  'mode-guide.png': { zh: '邮件模式：一个下拉如何决定全实例隐私', en: 'Mail mode: how one dropdown decides instance-wide privacy' },
  'roles-guide.png': { zh: '权限控制：五列决定一个分组能做什么', en: 'Roles: five columns deciding what a role may do' },
  'login-guide.png': { zh: '登录页：一条密码登录路径的三步', en: 'Sign-in: three steps of one password login' },
  'twofa-guide.png': { zh: '两步验证中心：四张卡与三种第二验证', en: 'The two-step centre: four cards, three second factors' },
  'apps-guide.png': { zh: '应用管理：第三方接入闭环的五个点', en: 'Apps: the five points that close a third-party integration' },
  'notify-guide.png': { zh: '导出与转发：数据怎么带走、新信怎么触达', en: 'Export and forwarding: how data leaves, how new mail reaches you' },
  'analysis-guide.png': { zh: '分析页首屏：三张仪表各回答一个问题', en: 'The analytics headline: three gauges, three questions' },
  'users-guide.png': { zh: '用户列表：从定位帐号到行内处置', en: 'The user list: from locating an account to acting on it' },
  'review-guide.png': { zh: '全库审查在隐私模式下的三个可见点', en: 'Mail review under private mode: three visible points' },
  'regkeys-guide.png': { zh: '注册密钥空白页：签发入口与检索框', en: 'The empty reg-keys page: the issuing entry and the search box' },
  'labels-guide.png': { zh: '标签页：一个新建入口与行内三件事', en: 'Labels: one creation entry and three things per row' },
  'preferences-guide.png': { zh: '个资页：个人资料被拆成的四个维度', en: 'Profile: personal data split across four dimensions' },
  'general-guide.png': { zh: '常规页：外观与阅读习惯的三张卡', en: 'General: three cards for look and reading habits' },
  'data-guide.png': { zh: '资料页：个人数据自主的四个分区', en: 'Data: four regions of personal-data autonomy' },
  'audit-guide.png': { zh: '操作报告：一条预警工单的完整信息链', en: 'Audit: the full information chain of one ticket' },
  'system-guide.png': { zh: '系统设置：使用频率最高的五张配置卡', en: 'System settings: the five most-used configuration cards' },
  'category-guide.png': { zh: '分类管理：站点收信治理的四层防线', en: 'Classification: four defensive layers for inbound mail' },
  'ui-compose.png': { zh: '写信弹层自上而下的分区构成', en: 'The compose overlay region by region, top to bottom' },
  'ui-settings-general.png': { zh: '设置区的外壳：左栏导航与右区内容', en: 'The settings shell: the left rail and the right pane' },
  'ui-audit-report.png': { zh: '操作报告在管理端的表格化样貌', en: 'The audit page as a table on the admin side' },
  'ui-login-oauth.png': { zh: '登录页承载的全部流程', en: 'Every flow the sign-in page carries' },
  'ui-detail-verification.png': { zh: '验证码提取在详情页的呈现', en: 'Verification-code extraction in the reading pane' },
  'ui-inbox-en.png': { zh: '英文界面收件箱与中文版的同构关系', en: 'The inbox in English and how it mirrors the Chinese build' },
  'ui-inbox-mobile.png': { zh: '移动端收件箱的响应式取舍', en: 'The mobile inbox and its responsive trade-offs' },
  'ui-account-menu.png': { zh: '头像菜单：多账户与账户详情的出入口', en: 'The avatar menu: the hub for accounts and account details' },
};

const out = {};
const missing = [];
for (const [file, fig] of Object.entries(FIGS)) {
  const title = TITLES[file];
  if (!title) missing.push(`title:${file}`);
  const items = (fig.items || []).map((it) => {
    if (!it.h || !it.d) missing.push(`item:${file}`);
    return { h: { zh: it.h.zh, en: it.h.en }, d: { zh: it.d.zh, en: it.d.en } };
  });
  out[file] = {
    title: title || { zh: '', en: '' },
    ...(fig.plain ? { plain: true } : {}),
    summary: { zh: fig.summary.zh, en: fig.summary.en },
    items,
  };
}

writeFileSync(new URL('./v517-figure-notes.json', import.meta.url), JSON.stringify(out, null, 2) + '\n');

const figs = Object.keys(out);
const regionTotal = Object.values(out).reduce((n, f) => n + f.items.length, 0);
const longEnough = Object.values(out).every((f) => f.items.every((i) => i.d.zh.length >= 40 && i.d.en.length >= 60));
console.log(`figures=${figs.length} regions=${regionTotal} plain=${figs.filter((f) => out[f].plain).length}`);
console.log(`all-region-notes-substantial=${longEnough}`);
if (missing.length) {
  console.log('INCOMPLETE:', missing.join(', '));
  process.exit(1);
}
