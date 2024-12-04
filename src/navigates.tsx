import { LucideProps, SquareLibrary, Users } from 'lucide-react'
import { USER_ROLE } from './api/user/user.model'

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

export const adminNavConfg: IProjectNav = {
  name: 'Admin',
  logo: SquareLibrary,
  path: '/admin',
  nav: [
    {
      name: 'Group',
      items: [
        {
          title: 'Users',
          path: '/',
          icon: Users,
          isActive: true,
          items: [{ title: 'user', path: '/admin/users' }],
        },
      ],
    },
  ],
}

export const studioNavConfig: IProjectNav = {
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
}

export const getNavConfig = (role: USER_ROLE): Array<IProjectNav> => {
  switch (role) {
    case USER_ROLE.MASTER:
    case USER_ROLE.ADMIN:
      return [adminNavConfg, studioNavConfig]
    default:
      return [studioNavConfig]
  }
}
