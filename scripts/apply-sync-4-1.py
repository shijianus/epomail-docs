# -*- coding: utf-8 -*-
"""v4.1 content sync: mail/en/es spot edits + header bumps. Asserts every anchor matches exactly once."""
import sys, pathlib

ROOT = pathlib.Path(__file__).resolve().parent.parent / "src" / "content" / "docs"

edits = []

# ---------- header bumps ----------
H_SIMP = ("**生效日期：2026 年 9 月 28 日｜版本：4.0**", "**生效日期：2026 年 9 月 29 日｜版本：4.1**")
H_EN = ("**Effective date: September 28, 2026 | Version: 4.0**", "**Effective date: September 29, 2026 | Version: 4.1**")
H_ES = ("**Fecha de entrada en vigor: 28 de septiembre de 2026 | Versión: 4.0**", "**Fecha de entrada en vigor: 29 de septiembre de 2026 | Versión: 4.1**")
for doc in ["overview", "privacy-policy", "terms-of-service", "acceptable-use", "data-security", "sub-processors", "key-terms"]:
    for lang, h in [("mail", H_SIMP), ("en", H_EN), ("es", H_ES)]:
        edits.append(("mail/" + doc + ".md" if lang == "mail" else lang + "/mail/" + doc + ".md", h[0], h[1]))

# ---------- mail (zh-CN) ----------
edits += [
("mail/privacy-policy.md",
 "| 六、不提供个人资料所致之影响 | 电子邮件地址与密码为注册及登录之必要项目，不提供者无法建立帐号；其余字段（昵称、头像、个人简介等）均为选填，不提供不影响本服务之使用 |\n\n## 4. 收集之个人资料",
 "| 六、不提供个人资料所致之影响 | 电子邮件地址与密码为注册及登录之必要项目，不提供者无法建立帐号；其余字段（昵称、头像、个人简介等）均为选填，不提供不影响本服务之使用 |\n\n您以 Linux DO 帐号登录时，本服务自该身份源取得您的用户标识符、昵称、头像等识别资料，属收集非由您直接提供之个人资料。依《个人资料保护法》第 9 条，运营者于处理或利用前告知：该等资料之来源为您登录所使用之 Linux DO 帐号；其利用之期间、地区、对象及方式，与您得行使之权利及方式，同前表第二款至第五款之告知。本服务无其他收集非由您提供之个人资料之情形。\n\n## 4. 收集之个人资料"),
("mail/privacy-policy.md",
 "您认为运营者违反《个人资料保护法》致您权利受损害者，得依该法第 29 条请求损害赔偿；该条对非公务机关采举证责任倒置，运营者能证明其无故意或过失者，始不负赔偿责任。您亦得向主管机关申诉。",
 "您认为运营者违反《个人资料保护法》致您权利受损害者，得依该法第 29 条第一项请求损害赔偿；运营者能证明其无故意或过失者，始不负赔偿责任，举证责任由运营者负担。依同条第二项准用第 28 条第二项至第六项：被害人不易或不能证明其实际损害额时，得请求法院依侵害情节，以每人每一事件新台币五百元以上二万元以下计算；对于同一原因事实造成多数当事人权利受侵害之事件，赔偿合计最高以新台币二亿元为限，但该原因事实所涉利益超过二亿元者，以该所涉利益为限。您亦得向主管机关申诉。运营者意图为自己或第三人不法之利益或损害他人之利益，违反第 19 条、第 20 条第一项规定收集、处理或利用个人资料，足生损害于他人者，并涉该法第 41 条之刑事责任。"),
("mail/terms-of-service.md",
 "运营者应于合理期限内复核并答复。\n\n## 10. 免责声明与责任限制",
 "运营者应于合理期限内复核并答复。\n\n本条款所定之通知以电子文件为之者，其发文及收文时间依《电子签章法》第 9 条认定：收文者已指定收受电子文件之信息系统者，以文件进入该系统之时间为收文时间；未指定者，以文件进入收文者信息系统之时间为收文时间。您注册时所留电子邮件地址即为电子通知之送达处所，您应维持该地址可正常收信。\n\n## 10. 免责声明与责任限制"),
("mail/acceptable-use.md",
 "| 恶意软件、病毒、勒索软件之散布，以窃取凭证为目的之邮件，无故入侵、取得删除变更电磁记录或干扰电脑系统 | 《刑法》第 358 条至第 362 条（妨害电脑使用罪章；入侵三年以下、取得删除变更电磁记录五年以下、干扰系统三年以下有期徒刑） |",
 "| 恶意软件、病毒、勒索软件之散布，以窃取凭证为目的之邮件，无故入侵、取得删除变更电磁记录或干扰电脑系统 | 《刑法》第 358 条至第 362 条（妨害电脑使用罪章：无故入侵，三年以下有期徒刑；无故取得、删除或变更电磁记录致生损害，五年以下；无故以电脑程式干扰系统致生损害，三年以下；制作专供犯本章之罪之电脑程式而供犯罪，五年以下有期徒刑） |"),
("mail/data-security.md",
 "3. 依《个人资料保护法》及主管机关之规定，通知受影响之当事人并向主管机关通报；",
 "3. 依《个人资料保护法》第 20-1 条第二项授权订定之安全维护办法及主管机关之规定，通知受影响之当事人并向主管机关通报；"),
("mail/key-terms.md",
 "| 国际传输 | 依同法第 2 条，指将个人资料作跨国（境）之处理或利用；受《个人资料保护法》第 21 条及主管机关限制命令之规范 |",
 "| 国际传输 | 依同法第 2 条，指将个人资料作跨国（境）之处理或利用；受《个人资料保护法》第 21 条及主管机关限制命令之规范 |\n| 告知义务 | 依同法第 8 条，向当事人收集个人资料时，应明确告知收集者名称、收集目的、资料类别、利用之期间地区对象方式、当事人得行使之权利及不提供之影响六款事项；收集非由当事人提供之个人资料者，依第 9 条于处理或利用前告知来源及相关事项 |\n| 特定目的 | 依同法第 19 条，非公务机关收集或处理个人资料应有之特定目的；利用并应于该特定目的之必要范围内为之（第 20 条） |\n| 营销拒绝权 | 依同法第 20 条第二项，当事人表示拒绝接受营销时，应即停止利用其个人资料营销；首次营销时并应提供表示拒绝之方式并支付所需费用（第三项） |"),
("mail/key-terms.md",
 "| 定式合同 | 以概括条款就多数不特定人所为之契约约定；受《民法》第 247-1 条（显失公平之部分无效）与《消费者保护法》第 11-1 条（审阅期间）、第 17 条（应记载及不得记载事项）之规制 |",
 "| 定式合同 | 以概括条款就多数不特定人所为之契约约定；受《民法》第 247-1 条（显失公平之部分无效）与《消费者保护法》第 11-1 条（审阅期间）、第 17 条（应记载及不得记载事项）之规制 |\n| 告诉乃论 | 《刑法》第 363 条所定妨害电脑使用罪章（第 358 条至第 360 条）之追诉条件：须由受害当事人提出告诉，始予追诉；不影响运营者依民事、行政途径及本站政策所为之处置 |"),
]

# ---------- en ----------
edits += [
("en/mail/privacy-policy.md",
 "| 6. The consequences of not providing the personal data | The email address and password are required for registration and login; without them an account cannot be created. All other fields (nickname, avatar, bio, and similar) are optional, and not providing them does not affect use of the Service |\n\n## 4. Personal Data Collected",
 "| 6. The consequences of not providing the personal data | The email address and password are required for registration and login; without them an account cannot be created. All other fields (nickname, avatar, bio, and similar) are optional, and not providing them does not affect use of the Service |\n\nWhen you sign in with a Linux DO account, the Service obtains identifiers such as your user ID, nickname, and avatar from that identity source; this constitutes the collection of personal data not provided directly by you. Under Article 9 of the PDPA, the Operator informs you, before processing or using such data, that the source is the Linux DO account you use to sign in, and that the period, region, recipients, and means of use, and the rights you may exercise and how, are as notified in items 2 through 5 of the table above. The Service collects no other personal data from sources other than you.\n\n## 4. Personal Data Collected"),
("en/mail/privacy-policy.md",
 "If you believe that the Operator's violation of the PDPA has caused damage to your rights, you may claim damages under Article 29 of the Act; that Article applies a reversed burden of proof to non-governmental agencies, which bear no liability only if they can prove the absence of intent or negligence. You may also file a complaint with the competent authority.",
 "If you believe that the Operator's violation of the PDPA has caused damage to your rights, you may claim damages under Article 29, Paragraph 1, of the Act; the Operator is liable unless it proves the absence of intent or negligence, and bears the burden of that proof. Under Paragraph 2 of that Article, as applied through Article 28, Paragraphs 2 to 6: where a victim has difficulty proving the actual amount of damage, the court may determine compensation per person per event between NT$500 and NT$20,000 according to the circumstances of the violation; for a single cause of fact affecting the rights of multiple data subjects, aggregate compensation is capped at NT$200 million, or at the amount of the benefit obtained where that benefit exceeds NT$200 million. You may also file a complaint with the competent authority. Where the Operator, with the intent of securing an unlawful benefit for itself or a third party or of harming another person, collects, processes, or uses personal data in violation of Article 19 or Article 20, Paragraph 1, causing harm to another person, the conduct additionally attracts criminal liability under Article 41 of the Act."),
("en/mail/privacy-policy.md",
 "The Operator of the Service accepts inspection and audit by the competent authority under those provisions and may not evade, obstruct, or refuse without legitimate reason; it maintains security maintenance measures under Article 20-1 of the PDPA and Article 12 of the Enforcement Rules of the Personal Data Protection Act.",
 "The Operator of the Service accepts inspection and audit by the competent authority under those provisions, and maintains security maintenance measures under Article 20-1 of the PDPA and Article 12 of the Enforcement Rules of the Personal Data Protection Act."),
("en/mail/privacy-policy.md",
 "| Login logs, lockout on failure, and two-step verification | Information security maintenance | Art. 19(1)(2), in accordance with the proportionality principle in Article 5 |",
 "| Login logs, lockout on failure, and two-step verification | Information security maintenance | Article 19, Paragraph 1, Subparagraph 2, in accordance with the proportionality principle in Article 5 |"),
("en/mail/privacy-policy.md",
 "Art. 19(1)(5) (with the data subject's consent; you may request that it be turned off, or switch to an instance where the feature is not enabled)",
 "Article 19, Paragraph 1, Subparagraph 5 (with the data subject's consent; you may request that it be turned off, or switch to an instance where the feature is not enabled)"),
("en/mail/privacy-policy.md",
 "Art. 19(1)(5) (with the data subject's consent; nothing is transmitted unless you trigger it)",
 "Article 19, Paragraph 1, Subparagraph 5 (with the data subject's consent; nothing is transmitted unless you trigger it)"),
("en/mail/privacy-policy.md",
 "Art. 19(1)(3) (personal data made public by the data subject or otherwise lawfully made public)",
 "Article 19, Paragraph 1, Subparagraph 3 (personal data made public by the data subject or otherwise lawfully made public)"),
("en/mail/privacy-policy.md",
 "| System announcements and the official welcome email | Contract performance and user communication | Art. 19(1)(2) |",
 "| System announcements and the official welcome email | Contract performance and user communication | Article 19, Paragraph 1, Subparagraph 2 |"),
("en/mail/terms-of-service.md",
 "the Operator shall review and respond within a reasonable period.\n\n## 10. Disclaimers and Limitation of Liability",
 "the Operator shall review and respond within a reasonable period.\n\nNotices under these Terms given as electronic documents are governed, as to the time of sending and receipt, by Article 9 of the Electronic Signatures Act: where the recipient has designated an information system to receive electronic documents, the time of receipt is the time the document enters that system; where no system has been designated, it is the time the document enters the recipient's information system. The email address you provide at registration is the place of service for electronic notices, and you should keep it able to receive mail.\n\n## 10. Disclaimers and Limitation of Liability"),
("en/mail/acceptable-use.md",
 "| Distributing malware, viruses, or ransomware; email aimed at stealing credentials; unauthorized intrusion, obtaining, deleting, or altering electromagnetic records, or interfering with computer systems without cause | Criminal Code, Articles 358 to 362 (the chapter on offenses against computer use: intrusion, up to three years; obtaining, deleting, or altering electromagnetic records, up to five years; interfering with systems, up to three years of imprisonment) |",
 "| Distributing malware, viruses, or ransomware; email aimed at stealing credentials; unauthorized intrusion, obtaining, deleting, or altering electromagnetic records, or interfering with computer systems without cause | Criminal Code, Articles 358 to 362 (chapter on offenses against computer use: unauthorized intrusion, up to three years of imprisonment; obtaining, deleting, or altering electromagnetic records causing harm, up to five years; interfering with computer systems without cause causing harm, up to three years; creating a computer program specifically for committing offenses in that chapter and supplying it for that use, up to five years) |"),
("en/mail/data-security.md",
 "3. notify affected data subjects and report to the competent authority in accordance with the PDPA and the rules of the competent authority;",
 "3. notify affected data subjects and report to the competent authority in accordance with the security maintenance regime issued under Article 20-1, Paragraph 2, of the PDPA and the rules of the competent authority;"),
("en/mail/key-terms.md",
 "| International transfer | Under Article 2 of the same Act, the processing or use of personal data across national borders; governed by Article 21 of the PDPA and by restriction orders of the competent authority |",
 "| International transfer | Under Article 2 of the same Act, the processing or use of personal data across national borders; governed by Article 21 of the PDPA and by restriction orders of the competent authority |\n| Notification duty | Under Article 8 of the same Act, when collecting personal data from a data subject the collector must clearly notify six items: the collector's identity, the purposes of collection, the categories of data, the period, region, recipients, and means of use, the rights the data subject may exercise, and the consequences of not providing the data; where personal data is not obtained from the data subject, Article 9 requires notice of the source before processing or use |\n| Specific purpose | Under Article 19 of the same Act, the specific purpose a non-governmental agency must have for collecting or processing personal data; use must remain within the extent necessary for that purpose (Article 20) |\n| Right to refuse marketing | Under Paragraph 2 of Article 20 of the same Act, when a data subject indicates refusal to accept marketing, use of the personal data for marketing must cease immediately; at the first marketing, the means of refusal must be provided and the necessary costs borne by the Operator (Paragraph 3) |"),
("en/mail/key-terms.md",
 "| Standard-form contract | A contract concluded through general clauses for large numbers of unspecified persons; regulated by Article 247-1 of the Civil Code (invalidity of obviously unfair parts) and by Article 11-1 (review period) and Article 17 (mandatory and prohibited provisions) of the Consumer Protection Act |",
 "| Standard-form contract | A contract concluded through general clauses for large numbers of unspecified persons; regulated by Article 247-1 of the Civil Code (invalidity of obviously unfair parts) and by Article 11-1 (review period) and Article 17 (mandatory and prohibited provisions) of the Consumer Protection Act |\n| Complaint-based prosecution | Under Article 363 of the Criminal Code, offenses in the chapter on offenses against computer use (Articles 358 to 360) are prosecuted only upon a complaint by the injured party; this does not affect the Operator's remedies through civil or administrative channels or under this site's policies |"),
]

# ---------- es ----------
edits += [
("es/mail/privacy-policy.md",
 "\n\n## 4. Datos personales recopilados",
 "\n\nCuando usted inicia sesión con una cuenta de Linux DO, el Servicio obtiene de esa fuente de identidad identificadores como su identificador de usuario, su apodo y su avatar; ello constituye la recopilación de datos personales no facilitados directamente por usted. Conforme al artículo 9 de la PDPA, el Operador le informa, antes del tratamiento o la utilización de dichos datos, de que la fuente es la cuenta de Linux DO con la que inicia sesión, y de que el período, el ámbito, los destinatarios y los modos de utilización, así como los derechos que puede ejercer y su forma de ejercicio, son los notificados en los apartados 2 a 5 de la tabla anterior. El Servicio no recopila ningún otro dato personal de fuentes distintas de usted.\n\n## 4. Datos personales recopilados"),
("es/mail/privacy-policy.md",
 "Si usted considera que la vulneración de la PDPA por parte del Operador le ha causado un daño en sus derechos, puede reclamar una indemnización conforme al artículo 29 de la Ley; dicho artículo establece una inversión de la carga de la prueba para las agencias no gubernamentales, que solo quedan exentas de responsabilidad si demuestran la ausencia de dolo o negligencia. También puede presentar una reclamación ante la autoridad competente.",
 "Si usted considera que la vulneración de la PDPA por parte del Operador le ha causado un daño en sus derechos, puede reclamar una indemnización conforme al artículo 29, párrafo 1, de la Ley; el Operador solo queda exento de responsabilidad si prueba la ausencia de dolo o negligencia, y la carga de dicha prueba le corresponde a él. En virtud del párrafo 2 de dicho artículo, aplicable por remisión del artículo 28, párrafos 2 a 6: cuando la víctima tenga dificultad para probar el importe real del daño, el tribunal podrá fijar la indemnización, según las circunstancias, entre 500 y 20.000 NT$ por persona y evento; para un mismo hecho causante que lesione los derechos de múltiples interesados, la indemnización agregada tiene un límite máximo de 200 millones de NT$, o del beneficio obtenido cuando este exceda dicha cifra. También puede presentar una reclamación ante la autoridad competente. Si el Operador, con ánimo de obtener un beneficio ilícito para sí o para un tercero o de causar perjuicio a otro, recopila, trata o utiliza datos personales con infracción de los artículos 19 y 20, párrafo 1, causando daño a otra persona, dicha conducta constituye además un delito conforme al artículo 41 de la Ley."),
("es/mail/privacy-policy.md",
 "El Operador del Servicio acepta la inspección y la auditoría de la autoridad competente conforme a dichas disposiciones y no puede eludirlas, obstaculizarlas ni rechazarlas sin motivo legítimo; mantiene las medidas de mantenimiento de la seguridad conforme al artículo 20-1 de la PDPA y al artículo 12 del Reglamento de Aplicación de la PDPA.",
 "El Operador del Servicio acepta la inspección y la auditoría de la autoridad competente conforme a dichas disposiciones, y mantiene las medidas de mantenimiento de la seguridad conforme al artículo 20-1 de la PDPA y al artículo 12 del Reglamento de Aplicación de la PDPA."),
("es/mail/privacy-policy.md",
 "| Registros de inicio de sesión, bloqueo por fallos y verificación en dos pasos | Mantenimiento de la seguridad de la información | Art. 19(1)(2), de conformidad con el principio de proporcionalidad del artículo 5 |",
 "| Registros de inicio de sesión, bloqueo por fallos y verificación en dos pasos | Mantenimiento de la seguridad de la información | artículo 19, párrafo 1, inciso 2, de conformidad con el principio de proporcionalidad del artículo 5 |"),
("es/mail/privacy-policy.md",
 "Art. 19(1)(5) (con el consentimiento del interesado; puede solicitar su desactivación o migrar a una instancia en la que la función no esté habilitada)",
 "artículo 19, párrafo 1, inciso 5 (con el consentimiento del interesado; puede solicitar su desactivación o migrar a una instancia en la que la función no esté habilitada)"),
("es/mail/privacy-policy.md",
 "Art. 19(1)(5) (con el consentimiento del interesado; nada se transmite salvo que usted lo active)",
 "artículo 19, párrafo 1, inciso 5 (con el consentimiento del interesado; nada se transmite salvo que usted lo active)"),
("es/mail/privacy-policy.md",
 "Art. 19(1)(3) (datos personales hechos públicos por el propio interesado o hechos públicos lícitamente de otro modo)",
 "artículo 19, párrafo 1, inciso 3 (datos personales hechos públicos por el propio interesado o hechos públicos lícitamente de otro modo)"),
("es/mail/privacy-policy.md",
 "| Anuncios del sistema y correo de bienvenida oficial | Ejecución del contrato y comunicación con los usuarios | Art. 19(1)(2) |",
 "| Anuncios del sistema y correo de bienvenida oficial | Ejecución del contrato y comunicación con los usuarios | artículo 19, párrafo 1, inciso 2 |"),
("es/mail/terms-of-service.md",
 "el Operador la revisará y responderá dentro de un plazo razonable.\n\n## 10. Exenciones y limitación de responsabilidad",
 "el Operador la revisará y responderá dentro de un plazo razonable.\n\nLas notificaciones previstas en estos Términos cursadas como documentos electrónicos se rigen, en cuanto al momento de envío y recepción, por el artículo 9 de la Ley de Firma Electrónica: si el destinatario ha designado un sistema de información para la recepción de documentos electrónicos, el momento de recepción es aquel en que el documento entra en dicho sistema; si no lo ha designado, aquel en que entra en el sistema de información del destinatario. La dirección de correo electrónico que usted facilita en el registro es el lugar de notificación de las notificaciones electrónicas, y usted debe mantenerla en condiciones de recibir correo.\n\n## 10. Exenciones y limitación de responsabilidad"),
("es/mail/acceptable-use.md",
 "| Distribución de malware, virus o ransomware; correo destinado al robo de credenciales; intrusión no autorizada, obtención, eliminación o alteración de registros electromagnéticos, o interferencia en sistemas informáticos sin causa justificada | Código Penal, artículos 358 a 362 (el capítulo sobre los delitos relativos al uso de ordenadores: intrusión, hasta tres años; obtención, eliminación o alteración de registros electromagnéticos, hasta cinco años; interferencia en sistemas, hasta tres años de prisión) |",
 "| Distribución de malware, virus o ransomware; correo destinado al robo de credenciales; intrusión no autorizada, obtención, eliminación o alteración de registros electromagnéticos, o interferencia en sistemas informáticos sin causa justificada | Código Penal, artículos 358 a 362 (capítulo de delitos relativos al uso de ordenadores: intrusión sin causa, hasta tres años de prisión; obtención, eliminación o alteración de registros electromagnéticos causando daño, hasta cinco años; interferencia en sistemas informáticos sin causa causando daño, hasta tres años; creación de un programa informático destinado específicamente a cometer delitos de dicho capítulo y suministro para tal uso, hasta cinco años) |"),
("es/mail/data-security.md",
 "3. notificar a los interesados afectados e informar a la autoridad competente conforme a la PDPA y a las reglas de la autoridad competente;",
 "3. notificar a los interesados afectados e informar a la autoridad competente conforme al régimen de mantenimiento de la seguridad dictado en virtud del artículo 20-1, párrafo 2, de la PDPA y a las reglas de la autoridad competente;"),
("es/mail/key-terms.md",
 "| Transferencia internacional | Conforme al artículo 2 de la misma Ley, el tratamiento o la utilización de datos personales a través de fronteras nacionales; se rige por el artículo 21 de la PDPA y por las órdenes de restricción de la autoridad competente |",
 "| Transferencia internacional | Conforme al artículo 2 de la misma Ley, el tratamiento o la utilización de datos personales a través de fronteras nacionales; se rige por el artículo 21 de la PDPA y por las órdenes de restricción de la autoridad competente |\n| Deber de información | Conforme al artículo 8 de la misma Ley, al recopilar datos personales de un interesado deben notificarse expresamente seis extremos: identidad del responsable, finalidad de la recopilación, categorías de datos, período, ámbito, destinatarios y modos de utilización, derechos que el interesado puede ejercer, y consecuencias de no facilitar los datos; cuando los datos no se obtengan del propio interesado, el artículo 9 exige informar de la fuente antes del tratamiento o la utilización |\n| Fin específico | Conforme al artículo 19 de la misma Ley, todo organismo no gubernamental debe tener un fin específico para recopilar o tratar datos personales; la utilización debe ceñirse al ámbito necesario de dicho fin (artículo 20) |\n| Derecho de oposición al marketing | Conforme al párrafo 2 del artículo 20 de la misma Ley, cuando el interesado manifieste su negativa a recibir comunicaciones comerciales deberá cesar de inmediato la utilización de sus datos para marketing; en el primer envío comercial deberán facilitarse los medios para rechazarlo y asumirse los costes necesarios (párrafo 3) |"),
("es/mail/key-terms.md",
 "| Contrato de adhesión | Un contrato celebrado mediante cláusulas generales dirigidas a un gran número de personas indeterminadas; regulado por el artículo 247-1 del Código Civil (民法) (nulidad de las partes manifiestamente abusivas) y por el artículo 11-1 (plazo de revisión) y el artículo 17 (disposiciones imperativas y prohibitivas) de la Ley de Protección del Consumidor (消費者保護法) |",
 "| Contrato de adhesión | Un contrato celebrado mediante cláusulas generales dirigidas a un gran número de personas indeterminadas; regulado por el artículo 247-1 del Código Civil (民法) (nulidad de las partes manifiestamente abusivas) y por el artículo 11-1 (plazo de revisión) y el artículo 17 (disposiciones imperativas y prohibitivas) de la Ley de Protección del Consumidor (消費者保護法) |\n| Persecución a instancia de parte | Conforme al artículo 363 del Código Penal, los delitos del capítulo relativo al uso de ordenadores (artículos 358 a 360) solo son perseguibles previa denuncia de la parte perjudicada; ello no afecta a las acciones del Operador por las vías civil o administrativa ni conforme a las políticas de este sitio |"),
]

failed = []
for rel, old, new in edits:
    p = ROOT / rel
    text = p.read_text(encoding="utf-8")
    n = text.count(old)
    if n != 1:
        failed.append((rel, old[:70], n))
        continue
    p.write_text(text.replace(old, new), encoding="utf-8")

if failed:
    print("FAILED anchors:")
    for f in failed:
        print("  ", f[0], "| count =", f[2], "|", f[1].replace("\n", "\\n"))
    sys.exit(1)
print("OK: %d edits applied across mail/en/es" % len(edits))
