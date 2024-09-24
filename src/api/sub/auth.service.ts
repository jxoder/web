import { IUser } from '../../interface/user.interface'
import { ApiService } from '../api.service'

export class AuthApi {
  constructor(private api: ApiService) {}

  async self() {
    return this.api.get<IUser>('/v1/users/self')
  }

  async loginWithEmail(email: string, password: string) {
    return this.api.post<{
      user: IUser
      accessToken: string
    }>('/email-account/login', { email, password })
  }

  async signWithEmail(email: string, password: string) {
    return this.api.post('/email-account/sign', { email, password })
  }
}
