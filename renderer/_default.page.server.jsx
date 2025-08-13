import React from 'react'
import ReactDOMServer from 'react-dom/server'
import { escapeInject, dangerouslySkipEscape } from 'vite-plugin-ssr/server'
import { Layout } from './_default.page.jsx'

export { render }

function render(pageContext) {
  const { Page, pageProps, documentProps } = pageContext
  const { title, description } = documentProps || {}
  const pageHtml = ReactDOMServer.renderToString(
    <Layout>
      <Page {...pageProps} />
    </Layout>
  )

  return escapeInject`<!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      ${title ? dangerouslySkipEscape(`<title>${title}</title>`) : ''}
      ${description ? dangerouslySkipEscape(`<meta name="description" content="${description}">`) : ''}
    </head>
    <body>
      <div id="page-view">${dangerouslySkipEscape(pageHtml)}</div>
    </body>
  </html>`
}
