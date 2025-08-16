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

// Component entry points and metadata for routes we want to prerender
const pages = {
  index: {
    url: '/src/About.tsx',
    title: 'Vykazujeme – O projekte',
    description: 'Informácie o projekte Vykazujeme.',
  },
  about: {
    url: '/src/About.tsx',
    title: 'Vykazujeme – O projekte',
    description: 'Informácie o projekte Vykazujeme.',
  },
  faq: {
    url: '/src/FAQ.tsx',
    title: 'Vykazujeme – FAQ',
    description: 'Často kladené otázky k službe Vykazujeme.',
  },
  tutorials: {
    url: '/src/Tutorials.tsx',
    title: 'Vykazujeme – Tutoriály',
    description: 'Návody na používanie služby Vykazujeme.',
  },
  terms: {
    url: '/src/Terms.tsx',
    title: 'Vykazujeme – Podmienky',
    description: 'Podmienky používania služby Vykazujeme.',
  },
  attendance: {
    url: '/src/Attendance.tsx',
    title: 'Vykazujeme – Dochádza',
    description: 'Jednoduchý nástroj na generovanie a evidenciu pracovnej dochádzky.',
  },
};

await mkdir(distDir, { recursive: true });

// Use the built index.html from Vite as a template
const template = await readFile(path.join(distDir, 'index.html'), 'utf8');

const Navigation = (await vite.ssrLoadModule('/src/components/Navigation.tsx')).default;

for (const [name, { url, title, description }] of Object.entries(pages)) {
  // clean up legacy flat html files
  await rm(path.join(distDir, `${name}.html`), { force: true }).catch(() => {});

  const mod = await vite.ssrLoadModule(url);
  const Component = mod.default;
  const body = renderToStaticMarkup(
    React.createElement(
      React.Fragment,
      null,
      React.createElement(Navigation),
      React.createElement(Component)
    )
  );
  const html = template
    .replace(/<title>.*?<\/title>/, `<title>${title}</title>`)
    .replace(
      /<meta[^>]*name="description"[^>]*>/,
      `<meta name="description" content="${description}">`
    )
    .replace(
      /<meta[^>]*property="og:title"[^>]*>/,
      `<meta property="og:title" content="${title}">`
    )
    .replace(
      /<meta[^>]*property="og:description"[^>]*>/,
      `<meta property="og:description" content="${description}">`
    )
    .replace('<div id="root"></div>', `<div id="root">${body}</div>`);

  const pageDir = name === 'index' ? distDir : path.join(distDir, name);
  await mkdir(pageDir, { recursive: true });
  await writeFile(path.join(pageDir, 'index.html'), html, 'utf8');
}

await vite.close();
