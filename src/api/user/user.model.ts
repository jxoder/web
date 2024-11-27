export enum USER_ROLE {
  ANONYMOUS = 'ANONYMOUS',
  USER = 'USER',
  ADMIN = 'ADMIN',
  MASTER = 'MASTER',
}

export interface User {
  createdAt: Date
  updatedAt: Date
  id: number
  name?: string
  role: USER_ROLE
}
