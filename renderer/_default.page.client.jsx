import React from 'react'
import { hydrateRoot } from 'react-dom/client'
import { Layout } from './_default.page.jsx'

export { render }

async function render(pageContext) {
  const { Page, pageProps } = pageContext
  const page = (
    <Layout>
      <Page {...pageProps} />
    </Layout>
  )
  hydrateRoot(document.getElementById('page-view'), page)
}
