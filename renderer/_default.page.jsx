import React from 'react'

export { Layout }

function Layout({ children }) {
  return (
    <div id="app-root" style={{ minHeight: '100vh' }}>
      {children}
    </div>
  )
}
