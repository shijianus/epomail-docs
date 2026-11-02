# 法律依据与核验底稿

核验日期：2026-11-02。对应本次法律文档修订版：5.21。

本文件记录官方来源、适用条件和写作边界，不是服务已完成合规的证书。公开法律文档按主题说明义务，不逐条罗列法条号；涉及实际配置、主体、契约或营运事实的事项，不能由法源或原始码代为证明。

## 1. 台湾法规时效更正

官方来源：[全国法规资料库《个人资料保护法》](https://law.moj.gov.tw/LawClass/LawAll.aspx?pcode=I0050021)。

本次读取的官方页面列明：修正日期为民国114年11月11日，且「本法規部分或全部條文尚未生效，最後生效日期：未定」。其施行注记将主管机关、安全维护及相关删除修正列为由行政院另定施行日期的内容。

此前底稿及法律写作技能曾写「2026-08-10 已施行」，并据此把旧条文视为已删除、把新主管机关直接写成现行机关。该施行日期未由本次取得的官方页面证实，不再作为现行义务的依据。法规修正公布、资料库展示修正后条文与条文实际生效是不同事项；应按官方施行注记与当时有效版本判断。公开文档改用「依法有管辖权的主管机关」，不预先断言尚未核实的机关转换。

`tmp_laws/`、`doc/_law-raw.md` 与旧核验脚本输出仅可作为历史资料；没有重新确认来源、日期和施行注记，不得据缓存宣称已核验现行法。法律写作技能属于操作指引，不能优先于官方法律事实。

## 2. 欧盟资料保护与通报

| 官方来源 | 本次使用的核验结论 |
| --- | --- |
| [GDPR，Regulation (EU) 2016/679](https://eur-lex.europa.eu/eli/reg/2016/679/oj/eng)；[本次读取的欧盟出版局全文](https://publications.europa.eu/resource/cellar/3e485e15-11bd-11e6-ba9a-01aa75ed71a1.0006.03/DOC_1) | 依实际设立、向欧盟境内人提供服务或监测行为等条件判断；免费、非营利及「测试中」不构成一般豁免。纯粹个人／家庭活动例外不能概括涵盖公开邮件服务 |
| [EDPB Guidelines 3/2018：地域适用及代表](https://www.edpb.europa.eu/system/files/documents/files/file1/edpb_guidelines_3_2018_territorial_scope_after_public_consultation_en_1.pdf) | 向欧盟境内人提供服务与单纯可访问须区分；代表例外须满足累积条件，持续邮箱处理通常非偶发 |
| [EDPB Guidelines 2/2019：线上服务的契约必要性](https://www.edpb.europa.eu/system/files/documents/files/file1/edpb_guidelines-art_6-1-b-adopted_after_public_consultation_en.pdf) | 把功能写进契约不自动使全部处理必要；便利性、反诈及可选内容处理须各自确定适当依据，合法利益须作必要性与利益衡量 |
| [EDPB：合法处理与同意](https://www.edpb.europa.eu/sme-data-protection-guide/process-personal-data-lawfully_en) | 同意应自由、特定、知情且明确，须可证明及撤回；继续使用、沉默、一般条款或全站 AI 开关不代替个别同意 |
| [EDPB 成员及主管机关联系资料](https://www.edpb.europa.eu/about-edpb/about-edpb/members_en) | 申诉不限于运营者所在地；GDPR 适用时，可向惯常居所、工作地或涉嫌侵害地有管辖权的机关申诉 |
| [ePrivacy Directive 2002/58/EC](https://eur-lex.europa.eu/eli/dir/2002/58/oj) | 通讯保密与终端存取应结合成员国实施规则；localStorage 不是当然不受管制的 Cookie 替代品 |
| [Regulation (EU) No 611/2013](https://eur-lex.europa.eu/eli/reg/2013/611/oj) | 如实际业务属于该电子通讯通报制度，可能另有通报对象、门槛及较短时限；GDPR 的72小时不是全法域统一规则 |

GDPR 请求期限以收到请求起一个月计算；因复杂程度或数量有必要时可再延长最多两个月，第一月内说明。一般请求免费，身份核验须与疑义及风险相当，不一律索取证件。

GDPR 事故通报须区分：除不太可能造成风险外，监管通报在可行情形下于知悉后72小时内；可能造成高度风险时，无不当迟延通知当事人，适用法定例外。并非所有事故一律公开、通知所有人或给予开发者一律72小时宽限。

非欧盟代表的例外条件须整体满足；持续邮箱服务通常不属于偶发处理。资料保护长、影响评估、处理纪录分别按其法定条件判断；人数少或未收费不能取代评估，也不需要无条件承诺专职团队或认证。

## 3. 第三方契约与国际传输

| 官方来源 | 本次使用的核验结论 |
| --- | --- |
| [欧盟委员会：SCC 官方问答](https://commission.europa.eu/law/law-topic/data-protection/international-dimension-data-protection/new-standard-contractual-clauses-questions-and-answers-overview_en) | 应核对实际接收者、服务范围、适当条款及是否有效订立，完成必要的传输影响及补充措施评估；网站列有SCC范本不是已签约证明 |
| [欧盟委员会：Adequacy decisions](https://commission.europa.eu/law/law-topic/data-protection/international-dimension-data-protection/adequacy-decisions_en) | 充分性须对应实际国家／机制、接收实体与范围，不能由服务商品牌或母公司所在地概括推定 |
| [EDPB Guidelines 05/2021：地域适用与跨境](https://www.edpb.europa.eu/system/files/documents/2023-02/edpb_guidelines_05-2021_interplay_between_the_application_of_art3-chapter_v_of_the_gdpr_v2_en_0.pdf)；[Article 49 例外指南](https://www.edpb.europa.eu/system/files/documents/files/file1/edpb_guidelines_2_2018_derogations_en.pdf) | 区分个人直接提交与向另一境外接收者披露；同意例外不宜替代常态传输保障，认证或加密亦不是独立法律机制 |

一般隐私政策不能代替需要签署的资料处理契约。可选AI、公共翻译、SSO、通知与用户自备储存须分别核对真实字段、接收者、保存、指示、后续用途及传输。对未确认保障的真实资料流应停用，不以用户已按按钮或「科研／学习」作为通用授权。

## 4. 消费者权利与合理责任边界

| 官方来源 | 本次使用的核验结论 |
| --- | --- |
| [Unfair Contract Terms Directive 93/13/EEC](https://eur-lex.europa.eu/eli/dir/1993/13/oj) | 符合适用条件时，不公平格式条款不能透过翻译优先、免责、强制外国法院或单方变更取得效力 |
| [Digital Content Directive (EU) 2019/770](https://eur-lex.europa.eu/eli/dir/2019/770/oj) | 须判断经营者、服务及支付价款／个人资料等条件；免费不自动排除，资料仅为服务本身或法定义务且无其他用途的例外亦须注意 |
| [Consumer Rights Directive 2011/83/EU](https://eur-lex.europa.eu/eli/dir/2011/83/oj) | 是否适用及身分、地理地址等告知义务依实际消费者服务情境判断，不编造运营者名称或地址 |
| [Rome I Regulation (EC) No 593/2008](https://eur-lex.europa.eu/eli/reg/2008/593/oj) | 选择台湾法不当然排除消费者惯常居所地依法不得排除的保护 |
| [Brussels I bis Regulation (EU) No 1215/2012](https://eur-lex.europa.eu/eli/reg/2012/1215/oj) | 管辖约定须让位于适用的消费者等强制规则，内部申诉也不是向法院或机关救济的必经前置程序 |

个人非营利测试服务可以明确无SLA、无永久托管、非紧急及非唯一备份用途，按规模风险采取合理措施。MIT授权适用于软体副本，不使运营者自动免除实际服务义务。责任上限仅限法律允许限制的普通过失契约损害；故意、重大过失、资料保护赔偿及不可排除的消费者等权利保留，且上限无效时直接适用法定责任。没有对使用者设置概括赔偿开发者罚款与全部索赔的义务。

## 5. AI 透明度的适用边界

官方来源：[欧盟委员会 AI Act 说明](https://digital-strategy.ec.europa.eu/en/policies/regulatory-framework-ai)、[AI Act Regulation (EU) 2024/1689](https://eur-lex.europa.eu/eli/reg/2024/1689/oj)。

翻译、OCR与验证码提取不会仅因使用AI而当然成为高风险系统。应按真实提供者／部署者角色、用途、内容与例外评估必要的透明告知；不要无条件承诺所有输出必须加水印，也不宣称已经取得AI合规认证。本次公开政策只说明此条件判断，不引用未经核对的未来适用时间线。

## 6. 文本与实际合规状态

本次查核基线为已拉取的远端 `origin/master`：`3e1ef741eb57d77908c1f23ad83e6c0cee9e931d`（提交日期2026-10-29）。本地开发工作树另有后续提交及未提交修改，未混入本次远端审阅，也未被覆盖。

修订文本已经区分法定要求、代码机制与尚待确认的部署事实。运营者可识别身分与依法所需地址、真实处理者及地区、有效DPA／SCC、保存期限、有效选择／撤回及完整删除等，尚须实际落实；本文件不将这些事项写成已完成。详细源码证据及处置清单见 [本次审阅报告](legal-review-2026-11-02.md)。
