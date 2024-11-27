import React from 'react'
import SignIn from './pages/auth/sign-in'
import SignUp from './pages/auth/sign-up'
import { AdminHome } from './pages/admin/home'
import { LucideProps, SquareLibrary } from 'lucide-react'
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

export interface INavItem {
  title: string
  path: string
  icon: React.ForwardRefExoticComponent<
    Omit<LucideProps, 'ref'> & React.RefAttributes<SVGSVGElement>
  >
  isActive: boolean
  items: Array<{ title: string; path: string }>
}

export interface INav {
  name?: string // Group name
  items: Array<INavItem>
}

export const adminNav: Array<INav> = [
  {
    name: 'Menu',
    items: [
      {
        title: 'Playground',
        path: '/',
        icon: SquareLibrary,
        isActive: true,
        items: [
          { title: 'one', path: '/admin/one' },
          { title: 'two', path: '/admin/two' },
        ],
      },
    ],
  },
  // {
  //   name: 'good',
  //   items: [
  //     {
  //       title: 'Settings',
  //       path: '/',
  //       icon: SquareLibrary,
  //       isActive: true,
  //       items: [
  //         { title: 'three', path: '/' },
  //         { title: 'four', path: '/' },
  //       ],
  //     },
  //   ],
  // },
]
