import { Computer, Home, SquareLibrary, User } from 'lucide-react'
import { IProjectNavConfig } from './navigate.interface'
import { USER_ROLE } from './api/user/user.model'

const includes = (path: string) => (p: string) => p.includes(path)
const exact = (path: string) => (p: string) => p === path

export const AdminNavConfig: IProjectNavConfig = {
  name: 'Admin',
  label: 'admin',
  path: '/admin',
  icon: SquareLibrary,
  headers: [
    {
      name: 'Home',
      path: '/admin',
      icon: Home,
      activate: exact,
    },
  ],
  contents: [
    {
      type: 'group',
      name: 'Users',
      icon: User,
      items: [
        {
          name: 'user',
          path: '/admin/users',
          activate: includes,
        },
        {
          name: 'email account',
          path: '/admin/email-accounts',
          activate: includes,
        },
      ],
    },
    {
      type: 'single',
      name: 'single',
      icon: SquareLibrary,
      path: '/admin/single',
      activate: includes,
    },
  ],
}

export const MasterNavConfig: IProjectNavConfig = {
  ...AdminNavConfig,
  headers: [
    ...AdminNavConfig.headers,
    {
      name: 'Instance',
      path: '/admin/instances',
      activate: includes,
      icon: Computer,
    },
  ],
}

export const StudioNavConfig: IProjectNavConfig = {
  name: 'Studio',
  label: 'studio',
  path: '/studio',
  icon: SquareLibrary,
  headers: [
    {
      name: 'Home',
      path: '/studio',
      icon: Home,
      activate: exact,
    },
  ],
  contents: [],
}

export const getNavConfigByRole = (role: USER_ROLE) => {
  switch (role) {
    case USER_ROLE.MASTER:
      return [MasterNavConfig, StudioNavConfig]
    case USER_ROLE.ADMIN:
      return [AdminNavConfig, StudioNavConfig]
    default:
      return [StudioNavConfig]
  }
}
