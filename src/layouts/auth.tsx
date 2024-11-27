import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { routes } from '../routes'

export const AuthLayout: React.FC = () => {
  return (
    <div className="relative min-h-screen w-full">
      <Routes>
        {routes
          .filter(route => route.layout === 'auth')
          .map(route =>
            route.pages.map(page => (
              <Route path={page.path} element={page.element} />
            )),
          )}
      </Routes>
    </div>
  )
}
