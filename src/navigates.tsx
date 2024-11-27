import { LucideProps, SquareLibrary } from 'lucide-react'

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

export interface IProjectNav {
  name: string
  logo: React.ElementType
  path: string
  label?: string
  nav: Array<INav>
}

export const JXNavigatorConfig: Array<IProjectNav> = [
  {
    name: 'Admin',
    logo: SquareLibrary,
    path: '/admin',
    nav: [
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
    ],
  },
  {
    name: 'Studio',
    logo: SquareLibrary,
    path: '/studio',
    nav: [
      {
        name: 'Menu',
        items: [
          {
            title: 'Studio',
            path: '/',
            icon: SquareLibrary,
            isActive: true,
            items: [
              { title: 'one', path: '/studio/one' },
              { title: 'two', path: '/studio/two' },
            ],
          },
        ],
      },
      {
        name: 'good',
        items: [
          {
            title: 'Settings',
            path: '/',
            icon: SquareLibrary,
            isActive: true,
            items: [
              { title: 'three', path: '/' },
              { title: 'four', path: '/' },
            ],
          },
        ],
      },
    ],
  },
]