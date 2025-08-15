import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { mkdir, readFile, rm, writeFile } from 'fs/promises';
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

// Component entry points for routes we want to prerender
const pages = {
  index: '/src/About.tsx',
  about: '/src/About.tsx',
  faq: '/src/FAQ.tsx',
  tutorials: '/src/Tutorials.tsx',
  terms: '/src/Terms.tsx',
};

await mkdir(distDir, { recursive: true });

// Use the built index.html from Vite as a template
const template = await readFile(path.join(distDir, 'index.html'), 'utf8');

for (const [name, url] of Object.entries(pages)) {
  // clean up legacy flat html files
  await rm(path.join(distDir, `${name}.html`), { force: true }).catch(() => {});

  const mod = await vite.ssrLoadModule(url);
  const Component = mod.default;
  const body = renderToStaticMarkup(React.createElement(Component));
  const html = template.replace(
    '<div id="root"></div>',
    `<div id="root">${body}</div>`
  );

  const pageDir = name === 'index' ? distDir : path.join(distDir, name);
  await mkdir(pageDir, { recursive: true });
  await writeFile(path.join(pageDir, 'index.html'), html, 'utf8');
}

await vite.close();
