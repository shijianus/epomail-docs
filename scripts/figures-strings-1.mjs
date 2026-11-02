// Shared English micro-labels for legal figures; localized captions explain their scope.
// Source of truth: src/content/docs/zh-tw/mail legal documents.
// Keep labels short enough for the existing geometry and keep legal detail in the documents.
export const FIGURE_LANGS = ['zh', 'zh-tw', 'en', 'fr', 'es', 'nl'];

export function sharedLegalLabels(labels, ariaByLanguage) {
  return Object.fromEntries(FIGURE_LANGS.map((lang) => [lang, {
    aria: ariaByLanguage[lang],
    ...labels,
  }]));
}

export const STR1 = {
  'legal-architecture': sharedLegalLabels({
    tagContract: 'CONTRACT', tosTitle: 'Terms of Service',
    tosB1: 'Review terms · explicit acceptance',
    tosB2: 'Material changes: notice & acceptance where required',
    ppTitle: 'Privacy Policy', ppBody: 'Purposes · lawful basis · rights',
    aupTitle: 'Acceptable Use', aupBody: 'Proportionate action · appeal',
    dsTitle: 'Security & Recipients', dsBody: 'Controls · limits · data flows',
    tagFrame: 'APPLICABLE LAW',
    lawTitle: 'Mandatory law & protected rights take priority',
    lawB1: 'Contract choice of law does not remove mandatory local protections.',
    lawB2: 'Free or non-profit service: statutory duties and remedies remain.',
    sideNote: 'Subject-specific documents · zh-TW authoritative, subject to mandatory rights',
  }, {
    zh: '法律文件关系：契约、隐私、使用规则、安全与接收者；强制法律及不可排除的权利优先。',
    'zh-tw': '法律文件關係：契約、隱私、使用規則、安全與接收者；強制法律及不可排除的權利優先。',
    en: 'Legal documents: contract, privacy, use, security and recipients; mandatory law and protected rights take priority.',
    fr: 'Documents juridiques : contrat, confidentialité, usage, sécurité et destinataires ; les règles impératives et les droits protégés priment.',
    es: 'Documentos jurídicos: contrato, privacidad, uso, seguridad y destinatarios; prevalecen las normas imperativas y los derechos protegidos.',
    nl: 'Juridische documenten: overeenkomst, privacy, gebruik, beveiliging en ontvangers; dwingend recht en beschermde rechten gaan voor.',
  }),

  'self-host-responsibilities': sharedLegalLabels({
    tagUp: 'SOURCE · MIT', upTitle: 'Source authors',
    upB1: 'Publish code & patches', upB2: 'Roles depend on actual activity', upB3: 'Operating brings duties',
    tagInst: 'INSTANCE', instTitle: 'Instance operator',
    instB1: 'Determines deployment & access', instB2: 'Assess each processing activity',
    instB3: 'Publish notices & safeguards',
    tagYou: 'PEOPLE', youTitle: 'Users & contacts',
    youB1: 'Users, senders & recipients', youB2: 'Rights follow the processing', youB3: 'Contact the actual operator',
    arrowCode: 'code', arrowTrust: 'use',
    tagMeans: 'ROLES & DUTIES',
    meansTitle: 'Roles follow purposes, means & actual activity',
    m1: 'Hosted: identify the actual operator and the processing it controls.',
    m2: 'Self-hosted: assess controller, joint-controller and processor roles for each activity.',
    m3: 'Code authors who also operate or decide processing remain responsible for that activity.',
  }, {
    zh: '原始码作者、实例运营者与使用者的关系；角色和义务依实际处理活动判断。',
    'zh-tw': '原始碼作者、實例營運者與使用者的關係；角色和義務依實際處理活動判斷。',
    en: 'Source authors, instance operators and users: roles and duties follow actual processing activities.',
    fr: 'Auteurs du code, exploitants et utilisateurs : les rôles et obligations dépendent des traitements réels.',
    es: 'Autores del código, operadores y usuarios: las funciones y obligaciones dependen del tratamiento real.',
    nl: 'Auteurs, exploitanten en gebruikers: rollen en plichten volgen de feitelijke verwerking.',
  }),

  'privacy-pillars': sharedLegalLabels({
    roofTitle: 'Privacy notice: purposes, lawful bases, recipients, retention & rights',
    roofSub: 'EACH PROCESSING ACTIVITY REQUIRES ITS OWN ASSESSMENT',
    p1t: 'Collect', p1a: 'Stated purposes', p1b: 'Necessary data', p1c: 'Valid lawful basis', p1l: 'LAWFUL BASIS',
    p2t: 'Use', p2a: 'Purpose limits', p2b: 'Optional features', p2c: 'Consent if required', p2l: 'USER CHOICES',
    p3t: 'Transfer', p3a: 'Actual recipients', p3b: 'Data may leave', p3c: 'the instance', p3l: 'SAFEGUARDS',
    p4t: 'Security', p4a: 'Scoped encryption', p4b: 'Access controls', p4c: 'Verify deployment', p4l: 'RISK CONTROLS',
    p5t: 'Rights', p5a: 'Access & correction', p5b: 'Erasure & objection', p5c: 'Applicable deadlines', p5l: 'RIGHTS & REMEDIES',
    baseTitle: 'Oversight & remedies follow applicable law and the actual processing',
    baseSub: 'COMPETENT AUTHORITIES · MANDATORY LOCAL RIGHTS',
  }, {
    zh: '隐私政策五项主题：收集、使用、传输、安全与权利；依实际处理判断法律依据、保障与救济。',
    'zh-tw': '隱私權政策五項主題：蒐集、使用、傳輸、安全與權利；依實際處理判斷法律依據、保障與救濟。',
    en: 'Privacy topics: collection, use, transfer, security and rights; assess lawful bases, safeguards and remedies for actual processing.',
    fr: 'Confidentialité : collecte, utilisation, transfert, sécurité et droits ; évaluer les bases légales, garanties et recours selon le traitement réel.',
    es: 'Privacidad: recopilación, uso, transferencia, seguridad y derechos; evaluar bases jurídicas, garantías y recursos según el tratamiento real.',
    nl: 'Privacy: verzamelen, gebruik, overdracht, beveiliging en rechten; beoordeel grondslagen, waarborgen en rechtsmiddelen per verwerking.',
  }),

  'tos-contract': sharedLegalLabels({
    headerTag: 'SERVICE AGREEMENT',
    chipTitle: 'Explicit acceptance', chipBody: 'Separate privacy choices',
    s1t: '1 · Accept', s1a: 'Review & save terms', s1b: 'Affirmative action', s1c: 'Consent where required',
    s2t: '2 · Use', s2a: 'Account & security duties', s2b: 'Content rights remain', s2c: 'Mandatory rights apply',
    s3t: '3 · Changes', s3a: 'Notice of material changes', s3b: 'New acceptance if required', s3c: 'Opportunity to exit',
    s4t: '4 · Exit', s4a: 'Export available data', s4b: 'Request deletion', s4c: 'Retention limits',
    lawTitle: 'Choice of law is subject to mandatory protections',
    lawBody: 'Hosted: Taiwan law · mandatory local protections, competent courts & data-protection authorities remain available.',
    alsoTag: 'RELATED DOCUMENTS',
    c1t: 'Privacy Policy', c1b: 'Notice · lawful bases · rights',
    c2t: 'Acceptable Use', c2b: 'Proportionate action & appeal',
    c3t: 'Document scope', c3b: 'Subject-specific rules · mandatory rights first',
  }, {
    zh: '契约的明示接受、使用、变更与退出；强制法律、当地保护与法定救济优先。',
    'zh-tw': '契約的明示接受、使用、變更與退出；強制法律、當地保護與法定救濟優先。',
    en: 'Contract stages: explicit acceptance, use, changes and exit; mandatory law, local protections and legal remedies take priority.',
    fr: 'Contrat : acceptation explicite, utilisation, modifications et fin ; les règles impératives, protections locales et recours légaux priment.',
    es: 'Contrato: aceptación expresa, uso, cambios y salida; prevalecen las normas imperativas, protecciones locales y vías legales.',
    nl: 'Overeenkomst: uitdrukkelijke aanvaarding, gebruik, wijzigingen en einde; dwingend recht, lokale bescherming en rechtsmiddelen gaan voor.',
  }),

  'aup-ladder': sharedLegalLabels({
    bandTitle: 'Urgent protection: child sexual abuse & exploitation content',
    bandBody: 'Restrict access and spread; preserve necessary evidence and report as required by law; review the action.',
    l1t: '1 · Warn', l1b: 'Minor breach',
    l2t: '2 · Limit', l2b: 'Sending & API',
    l3t: '3 · Isolate', l3b: 'Restrict access',
    l4t: '4 · Suspend', l4b: 'Pause & review',
    l5t: '5 · End', l5b: 'Deletion & retention',
    appeal1: 'Reasons, appeal & review remain available.',
    appeal2: 'Urgent protection may precede notice.',
    footerTag: 'PROPORTIONATE ACTION',
  }, {
    zh: '比例处置：警告、限流、隔离、暂停与终止；紧急保护后仍可申诉，删除与必要保存分别处理。',
    'zh-tw': '比例處置：警告、限流、隔離、暫停與終止；緊急保護後仍可申訴，刪除與必要保存分別處理。',
    en: 'Proportionate action: warn, limit, isolate, suspend and end; urgent protection retains review, with deletion and necessary retention assessed separately.',
    fr: 'Mesures proportionnées : avertir, limiter, isoler, suspendre et terminer ; les mesures urgentes restent contestables, avec suppression et conservation nécessaire distinctes.',
    es: 'Medidas proporcionales: avisar, limitar, aislar, suspender y terminar; las medidas urgentes admiten revisión, con eliminación y conservación necesaria por separado.',
    nl: 'Evenredige maatregelen: waarschuwen, beperken, isoleren, schorsen en beëindigen; ook spoedmaatregelen kunnen worden herzien, met afzonderlijke verwijdering en noodzakelijke bewaring.',
  }),

  'subprocessor-map': sharedLegalLabels({
    hub1: 'EpoCanvas Mail', hub2: 'Instance',
    hubA: 'Necessary sharing', hubB: 'Assess each data flow',
    g1tag: 'INFRASTRUCTURE', g1t: 'Cloud · storage · mail',
    g1a: 'Cloudflare & configured providers', g1b: 'Content, files & request data',
    g1c: 'Contracts · regions · safeguards',
    g2tag: 'INTEGRATIONS', g2t: 'Identity · apps · notifications',
    g2a: 'Fields depend on the active path', g2b: 'Fonts · verification · remote images',
    g2c: 'Revocation cannot recall copies',
    g3tag: 'CONTENT PROCESSING', g3t: 'AI · translation · OCR',
    g3a: 'Automatic & user-triggered paths', g3b: 'Actual recipients & content scope',
    g3c: 'Valid basis · choices · safeguards',
    g4tag: 'LEGAL REQUESTS', g4t: 'Competent authorities',
    g4a: 'Verify authority & legal basis', g4b: 'Limit disclosure to what is needed',
    g4c: 'Notify when legally permitted',
  }, {
    zh: '实例的第三方资料流：基础设施、整合与外部请求、内容处理及法律请求；逐一路径确认角色和保障。',
    'zh-tw': '實例的第三方資料流：基礎設施、整合與外部請求、內容處理及法律請求；逐一路徑確認角色和保障。',
    en: 'Third-party data flows: infrastructure, integrations and external requests, content processing and legal requests; assess roles and safeguards for each path.',
    fr: 'Flux vers des tiers : infrastructure, intégrations et requêtes externes, traitement de contenu et demandes légales ; vérifier les rôles et garanties pour chaque flux.',
    es: 'Flujos a terceros: infraestructura, integraciones y solicitudes externas, tratamiento de contenido y requerimientos legales; evaluar funciones y garantías por cada ruta.',
    nl: 'Gegevensstromen naar derden: infrastructuur, integraties en externe verzoeken, inhoudsverwerking en wettelijke verzoeken; beoordeel rollen en waarborgen per route.',
  }),
};
