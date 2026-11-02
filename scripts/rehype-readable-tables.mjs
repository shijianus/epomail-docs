// Preserve native table semantics while giving wide Markdown tables a named,
// keyboard-focusable scroll region. No client script or Markdown edits required.
export const TABLE_HINTS = {
  root: '表格可横向滚动查看。',
  'zh-tw': '表格可橫向捲動查看。',
  en: 'Scroll horizontally to read the table.',
  fr: 'Faites défiler le tableau horizontalement.',
  es: 'Desplaza la tabla horizontalmente para leerla.',
  nl: 'Schuif horizontaal om de tabel te lezen.',
  de: 'Die Tabelle lässt sich horizontal scrollen.',
};

function localeOf(file) {
  const sourcePath = String(file.path || '').replace(/\\/g, '/');
  return sourcePath.match(/\/docs\/(zh-tw|en|fr|es|nl|de)\//)?.[1] || 'root';
}

// Keep the full-size diagram on desktop, but avoid scaling its dense copy down
// to illegible text on phones. The original localized alt and caption remain.
export const PRIVACY_TOPICS = {
  root: ['收集', '利用', '传输', '安全', '权利'],
  'zh-tw': ['蒐集', '利用', '傳輸', '安全', '權利'],
  en: ['Collection', 'Use', 'Transfer', 'Security', 'Rights'],
  fr: ['Collecte', 'Utilisation', 'Transfert', 'Sécurité', 'Droits'],
  es: ['Recogida', 'Uso', 'Transferencia', 'Seguridad', 'Derechos'],
  nl: ['Verzamelen', 'Gebruik', 'Overdracht', 'Beveiliging', 'Rechten'],
  de: ['Erhebung', 'Nutzung', 'Übermittlung', 'Sicherheit', 'Rechte'],
};

export function rehypeCompactPrivacyFigure() {
  return (tree, file) => {
    const topics = PRIVACY_TOPICS[localeOf(file)];
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 360 158"><title>${topics.join(' · ')}</title><style>text{font:18px system-ui,sans-serif;fill:#334155}.index{font-size:13px;fill:#1d4ed8}path{stroke:#cbd5e1}@media(prefers-color-scheme:dark){text{fill:#e2e8f0}.index{fill:#93c5fd}path{stroke:#475569}}</style><path d="M18 52H342M18 102H342"/>${topics.map((topic, index) => {
      const x = 18 + (index % 2) * 176;
      const y = 32 + Math.floor(index / 2) * 50;
      return `<text class="index" x="${x}" y="${y}">0${index + 1}</text><text x="${x + 25}" y="${y}">${topic}</text>`;
    }).join('')}</svg>`;
    const srcSet = `data:image/svg+xml,${encodeURIComponent(svg)}`;
    function walk(parent) {
      if (!Array.isArray(parent.children)) return;
      parent.children = parent.children.map((node) => {
        if (node.type !== 'element' || node.tagName === 'picture') return node;
        if (node.tagName === 'img' && /\/images\/mail\/(?:zh-tw\/|en\/|fr\/|es\/|nl\/|de\/)?privacy-pillars\.svg$/.test(node.properties?.src || '')) {
          return {
            type: 'element', tagName: 'picture', properties: { className: ['privacy-figure'] },
            children: [
              { type: 'element', tagName: 'source', properties: { media: '(max-width: 40rem)', type: 'image/svg+xml', srcSet }, children: [] },
              node,
            ],
          };
        }
        walk(node);
        return node;
      });
    }
    walk(tree);
  };
}

function textOf(node) {
  if (node.type === 'text') return node.value;
  return (node.children || []).map(textOf).join('');
}

export default function rehypeReadableTables() {
  return (tree, file) => {
    const locale = localeOf(file);
    let tableIndex = 0;

    function walk(parent) {
      if (!Array.isArray(parent.children)) return;
      parent.children = parent.children.map((node) => {
        if (node.type !== 'element') return node;
        if (node.tagName !== 'table') {
          walk(node);
          return node;
        }

        const head = node.children.find((child) => child.tagName === 'thead');
        const row = head?.children.find((child) => child.tagName === 'tr');
        const headers = row?.children.filter((child) => child.tagName === 'th') || [];
        // Leave authored tables without a header row alone.
        if (!headers.length) return node;
        for (const header of headers) {
          header.properties = { ...header.properties, scope: header.properties?.scope || 'col' };
        }
        node.properties = { ...node.properties, dataColumns: headers.length };
        const hintId = `doc-table-scroll-hint-${++tableIndex}`;
        return {
          type: 'element',
          tagName: 'div',
          properties: { className: ['table-frame'] },
          children: [
            {
              type: 'element',
              tagName: 'p',
              properties: { className: ['table-scroll-hint'], id: hintId },
              children: [{ type: 'text', value: TABLE_HINTS[locale] }],
            },
            {
              type: 'element',
              tagName: 'div',
              properties: {
                className: ['table-scroll'],
                tabIndex: 0,
                role: 'region',
                ariaLabel: headers.map(textOf).join(' / '),
                ariaDescribedBy: hintId,
              },
              children: [node],
            },
          ],
        };
      });
    }
    walk(tree);
  };
}
