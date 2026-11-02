import { mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { build } from 'astro';
import { createManifest } from './generate-tamper-proof.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const cache = mkdtempSync(path.join(os.tmpdir(), 'epomail-docs-build-'));
const manifest = createManifest({ rootDir: root });
writeFileSync(path.join(root, 'public/tamper-proof.json'), JSON.stringify(manifest, null, 2), 'utf8');
try {
  await build({
    root,
    cacheDir: cache,
    vite: { envDir: cache }
  });
  const current = createManifest({ rootDir: root });
  if (JSON.stringify(current.documents) !== JSON.stringify(manifest.documents)) {
    throw new Error('Documentation sources changed during build. Rebuild the stable source snapshot.');
  }
  await import('./post-build.mjs');
  console.log(`Verified build source snapshot: ${manifest.totalDocuments} documents; working-tree changes: ${manifest.documentsWorkingTreeDirty}`);
} finally {
  rmSync(cache, { recursive: true, force: true, maxRetries: 10, retryDelay: 200 });
}
