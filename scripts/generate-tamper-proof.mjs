#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { execSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');
const DOCS_DIR = path.join(ROOT_DIR, 'src/content/docs');
const PUBLIC_DIR = path.join(ROOT_DIR, 'public');
const DIST_DIR = path.join(ROOT_DIR, 'dist');

// 1. 获取 Git 元数据
let gitCommit = 'unknown';
let gitShortCommit = 'unknown';
let gitDate = new Date().toISOString();
try {
  gitCommit = execSync('git rev-parse HEAD', { cwd: ROOT_DIR }).toString().trim();
  gitShortCommit = execSync('git rev-parse --short HEAD', { cwd: ROOT_DIR }).toString().trim();
  gitDate = execSync('git log -1 --format=%cI', { cwd: ROOT_DIR }).toString().trim();
} catch (e) {
  console.warn('Warning: Failed to read git commit metadata:', e.message);
}

// 2. 递归查找所有 .md 和 .mdx 文档
function getAllFiles(dir, fileList = []) {
  if (!fs.existsSync(dir)) return fileList;
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      getAllFiles(fullPath, fileList);
    } else if (file.endsWith('.md') || file.endsWith('.mdx')) {
      fileList.push(fullPath);
    }
  }
  return fileList;
}

const docFiles = getAllFiles(DOCS_DIR).sort();
const documents = {};
let totalBytes = 0;

for (const filePath of docFiles) {
  const relativePath = path.relative(ROOT_DIR, filePath).replace(/\\/g, '/');
  const content = fs.readFileSync(filePath, 'utf-8');
  
  // 提取 frontmatter
  const titleMatch = content.match(/^title:\s*(.+)$/m);
  const title = titleMatch ? titleMatch[1].replace(/['"]/g, '').trim() : path.basename(filePath, path.extname(filePath));
  
  // 规范化内容并计算 SHA-256
  const normalized = content.replace(/\r\n/g, '\n');
  const hash = crypto.createHash('sha256').update(normalized, 'utf-8').digest('hex');
  const bytes = Buffer.byteLength(normalized, 'utf-8');
  totalBytes += bytes;

  // 生成路由 slug
  let slug = relativePath.replace('src/content/docs/', '').replace(/\.(md|mdx)$/, '');
  documents[slug] = {
    slug,
    title,
    path: relativePath,
    sha256: hash,
    bytes,
    characters: normalized.length
  };
}

const manifest = {
  specVersion: '1.0.0',
  title: 'EpoCanvas Mail Official Documentation Anti-Tamper & Integrity Manifest',
  authority: 'EpoCanvas Mail Official Security Team',
  officialOrigin: 'https://docs.epocanvas.com/epomail',
  repository: 'https://github.com/shijianus/epomail-docs',
  verifiedChannel: 'announcement@epocanvas.com',
  algorithm: 'SHA-256',
  gitCommit,
  gitShortCommit,
  committedAt: gitDate,
  generatedAt: new Date().toISOString(),
  totalDocuments: Object.keys(documents).length,
  totalBytes,
  documents
};

// 确保 public 目录存在
if (!fs.existsSync(PUBLIC_DIR)) {
  fs.mkdirSync(PUBLIC_DIR, { recursive: true });
}

const manifestJson = JSON.stringify(manifest, null, 2);
fs.writeFileSync(path.join(PUBLIC_DIR, 'tamper-proof.json'), manifestJson, 'utf-8');
console.log(`✓ 成功生成防篡改清单: public/tamper-proof.json (${manifest.totalDocuments} 篇文档, Commit: ${gitShortCommit})`);

if (fs.existsSync(DIST_DIR)) {
  fs.writeFileSync(path.join(DIST_DIR, 'tamper-proof.json'), manifestJson, 'utf-8');
  console.log(`✓ 同步更新构建目标: dist/tamper-proof.json`);
}
