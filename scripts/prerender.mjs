import React from 'react';
import { renderToString } from 'react-dom/server';
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
  const body = renderToString(React.createElement(Component));
  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>${name}</title>
</head>
<body>
  <div id="root">${body}</div>
  <script>window.location.replace('/#/${name}');</script>
</body>
</html>`;
  await writeFile(path.join(distDir, `${name}.html`), html, 'utf8');
}

await vite.close();
