import React from 'react'
import { SignIn } from './pages/auth/sign-in'
import { SignUp } from './pages/auth/sign-up'
import { AdminHome } from './pages/admin/home'
import { StudioHome } from './pages/studio/home'
import { UserList } from './pages/admin/user/list'
import { EmailAccountList } from './pages/admin/email-account/list'

export interface IRoutes {
  layout: string
  pages: Array<{ path: string; element: React.ReactNode }>
}

const routes: Array<IRoutes> = [
  {
    layout: 'auth',
    pages: [
      { path: '/sign-in', element: <SignIn /> },
      { path: '/sign-up', element: <SignUp /> },
    ],
  },
  {
    layout: 'admin',
    pages: [
      { path: '/', element: <AdminHome /> },
      { path: '/users', element: <UserList /> },
      { path: '/email-accounts', element: <EmailAccountList /> },
    ],
  },
  {
    layout: 'studio',
    pages: [{ path: '/', element: <StudioHome /> }],
  },
]

export const getRoutes = (layout: string) => {
  return routes.filter(v => v.layout === layout)[0].pages
}
