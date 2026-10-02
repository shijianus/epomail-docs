#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');
const DIST_DIR = path.join(ROOT_DIR, 'dist');
const EPOMAIL_DIR = path.join(DIST_DIR, 'epomail');

console.log('--- 开始执行 post-build 双轨发布与路由镜像 ---');

if (!fs.existsSync(DIST_DIR)) {
  console.error('Error: dist 目录不存在，请先运行 astro build');
  process.exit(1);
}

// 1. 创建 dist/epomail 镜像目录
if (!fs.existsSync(EPOMAIL_DIR)) {
  fs.mkdirSync(EPOMAIL_DIR, { recursive: true });
}

// 递归拷贝函数（跳过 epomail 自身目录）
function copyFolderRecursiveSync(source, target) {
  if (!fs.existsSync(target)) {
    fs.mkdirSync(target, { recursive: true });
  }

  const files = fs.readdirSync(source);
  for (const file of files) {
    if (file === 'epomail') continue; // 防止递归死循环
    const curSource = path.join(source, file);
    const curTarget = path.join(target, file);
    const stat = fs.statSync(curSource);

    if (stat.isDirectory()) {
      copyFolderRecursiveSync(curSource, curTarget);
    } else {
      fs.copyFileSync(curSource, curTarget);
    }
  }
}

// 执行拷贝：将 dist/* 完整镜像至 dist/epomail/*
copyFolderRecursiveSync(DIST_DIR, EPOMAIL_DIR);
console.log('✓ 成功创建 dist/epomail 全量静态资源镜像（支持 /epomail/* 挂载路径）');

// 2. 写入 dist/_redirects 与 public/_redirects
// 根路径与 /mail/* 的语言协商改由 functions/（Pages Functions）处理，
// 静态 _redirects 不再声明 "/" 规则，以免优先于 Functions 拦截协商。
const redirectsContent = `# Cloudflare Pages 路由与重定向规则
# 根路径与 /epomail/、/mail/* 之语言协商由 functions/ 目录之 Pages Functions 处理（见 functions/_lib.js）。
`;

fs.writeFileSync(path.join(DIST_DIR, '_redirects'), redirectsContent, 'utf-8');
const publicRedirectsPath = path.join(ROOT_DIR, 'public', '_redirects');
fs.writeFileSync(publicRedirectsPath, redirectsContent, 'utf-8');
console.log('✓ 成功写入 _redirects 路由重定向规则（语言协商由 Pages Functions 接管）');

console.log('--- post-build 双轨发布与路由镜像完成 ---');
