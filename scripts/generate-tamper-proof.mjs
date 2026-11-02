#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const ROOT_DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

export function normalizeMarkdown(content) {
  return content.replace(/\r\n/g, '\n');
}

// HEAD is reference metadata, not a release signature for working-tree files.
// Missing Git metadata stays null, never a fabricated date or "latest" commit.
export function readGitMetadata(rootDir, runGit = (args) => execFileSync('git', args, {
  cwd: rootDir,
  encoding: 'utf8',
  stdio: ['ignore', 'pipe', 'pipe'],
})) {
  const metadata = {
    gitCommit: null,
    gitShortCommit: null,
    committedAt: null,
    documentsWorkingTreeDirty: null,
  };
  try {
    const commit = runGit(['rev-parse', 'HEAD']).trim();
    if (/^(?:[a-f0-9]{40}|[a-f0-9]{64})$/i.test(commit)) {
      metadata.gitCommit = commit;
      metadata.gitShortCommit = commit.slice(0, 7);
    }
    const date = runGit(['log', '-1', '--format=%cI']).trim();
    if (date && !Number.isNaN(Date.parse(date))) metadata.committedAt = date;
    // Include staged, unstaged, untracked and ignored sources. Only the docs
    // directory is in scope; the generated manifest cannot mark itself dirty.
    const status = runGit([
      'status', '--porcelain=v1', '--untracked-files=all', '--ignored=matching',
      '--', 'src/content/docs',
    ]);
    metadata.documentsWorkingTreeDirty = status.trim().length > 0;
  } catch {
    // Archives and Git-less build hosts cannot attest to working-tree state.
  }
  return metadata;
}

function getAllFiles(dir) {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) return getAllFiles(fullPath);
    return entry.isFile() && /\.(md|mdx)$/.test(entry.name) ? [fullPath] : [];
  });
}

export function createManifest({ rootDir = ROOT_DIR, git = readGitMetadata(rootDir), now = new Date() } = {}) {
  const documents = {};
  let totalBytes = 0;
  for (const filePath of getAllFiles(path.join(rootDir, 'src/content/docs')).sort()) {
    const relativePath = path.relative(rootDir, filePath).replace(/\\/g, '/');
    const content = fs.readFileSync(filePath, 'utf8');
    const titleMatch = content.match(/^title:\s*(.+)$/m);
    const title = titleMatch ? titleMatch[1].replace(/['"]/g, '').trim() : path.basename(filePath, path.extname(filePath));
    const normalized = normalizeMarkdown(content);
    const bytes = Buffer.byteLength(normalized, 'utf8');
    totalBytes += bytes;
    const slug = relativePath.replace('src/content/docs/', '').replace(/\.(md|mdx)$/, '');
    documents[slug] = {
      slug,
      title,
      path: relativePath,
      sha256: crypto.createHash('sha256').update(normalized, 'utf8').digest('hex'),
      bytes,
      characters: normalized.length,
    };
  }

  return {
    specVersion: '1.1.0',
    title: 'EpoCanvas Mail Documentation Source-File Integrity Manifest',
    officialOrigin: 'https://docs.epocanvas.com/epomail',
    repository: 'https://github.com/shijianus/epomail-docs',
    algorithm: 'SHA-256',
    normalization: 'utf8-lf',
    contentSource: 'working-tree',
    ...git,
    generatedAt: now.toISOString(),
    totalDocuments: Object.keys(documents).length,
    totalBytes,
    documents,
  };
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const manifest = createManifest();
  const publicDir = path.join(ROOT_DIR, 'public');
  fs.mkdirSync(publicDir, { recursive: true });
  fs.writeFileSync(path.join(publicDir, 'tamper-proof.json'), JSON.stringify(manifest, null, 2), 'utf8');
  console.log(`Generated source-file integrity manifest: ${manifest.totalDocuments} documents; reference HEAD: ${manifest.gitShortCommit ?? 'unavailable'}; docs working-tree changes: ${manifest.documentsWorkingTreeDirty ?? 'unknown'}`);
  // Astro copies public/ into the next build. Do not pair new source hashes with
  // an older dist/ tree before that build has completed.
}
