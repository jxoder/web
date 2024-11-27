import React from 'react'
import { SignIn } from './pages/auth/sign-in'
import { SignUp } from './pages/auth/sign-up'
import { AdminHome } from './pages/admin/home'
import { AdminTemp } from './pages/admin/tmp'

export interface IRoutes {
  layout: 'auth' | 'admin'
  pages: Array<{ name: string; path: string; element: React.ReactNode }>
}

export const routes: Array<IRoutes> = [
  {
    layout: 'auth',
    pages: [
      { name: 'sign in', path: '/sign-in', element: <SignIn /> },
      { name: 'sign up', path: '/sign-up', element: <SignUp /> },
    ],
  },
  {
    layout: 'admin',
    pages: [
      { name: 'home', path: '/', element: <AdminHome /> },
      { name: 'temp', path: '/one', element: <AdminTemp title="one" /> },
      { name: 'temp', path: '/two', element: <AdminTemp title="two" /> },
    ],
  },
]
