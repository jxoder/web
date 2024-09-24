export interface IUser {
  id: number
  name?: string
  role: 'ANONYMOUS' | 'USER' | 'ADMIN' | 'MASTER'
}
