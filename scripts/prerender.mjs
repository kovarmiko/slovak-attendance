import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { mkdir, writeFile } from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer } from 'vite';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distDir = path.resolve(__dirname, '..', 'dist');

const vite = await createServer({
  server: { middlewareMode: true },
  appType: 'custom',
});

const pages = {
  attendance: '/src/Attendance.tsx',
  faq: '/src/FAQ.tsx',
  tutorials: '/src/Tutorials.tsx',
  terms: '/src/Terms.tsx',
};

await mkdir(distDir, { recursive: true });

for (const [name, url] of Object.entries(pages)) {
  const mod = await vite.ssrLoadModule(url);
  const Component = mod.default;
  const body = renderToStaticMarkup(React.createElement(Component));
  const title = name.charAt(0).toUpperCase() + name.slice(1);
  const html = [
    '<!DOCTYPE html>',
    '<html lang="en">',
    '<head>',
    '  <meta charset="UTF-8" />',
    `  <title>${title}</title>`,
    '</head>',
    '<body>',
    body,
    '</body>',
    '</html>',
  ].join('\n');
  await writeFile(path.join(distDir, `${name}.html`), html, 'utf8');
}

await vite.close();
