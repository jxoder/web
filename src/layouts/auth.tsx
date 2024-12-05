import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { getRoutes } from '../routes'

export const AuthLayout: React.FC = () => {
  return (
    <div className="h-full w-full">
      <Routes>
        {getRoutes('auth').map((route, index) => (
          <Route key={index} path={route.path} element={route.element} />
        ))}
      </Routes>
    </div>
  )
}
