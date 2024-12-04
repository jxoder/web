import { USER_ROLE } from '@/api/user/user.model'

export const getRouteByRole = (role: USER_ROLE) => {
  switch (role) {
    case USER_ROLE.MASTER:
    case USER_ROLE.ADMIN:
      return '/admin'
    default:
      return '/studio'
  }
}

export const getRoleLv = (role: USER_ROLE) => {
  const lv = {
    [USER_ROLE.ANONYMOUS]: 3,
    [USER_ROLE.USER]: 5,
    [USER_ROLE.ADMIN]: 10,
    [USER_ROLE.MASTER]: 15,
  }

  return lv[role]
}
