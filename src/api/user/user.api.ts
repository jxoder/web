import { ApiBase, GetAccessToken } from '../api.base'
import { User } from './user.model'

export class UserApi extends ApiBase {
  constructor(endpoint: string, getAccessToken: GetAccessToken) {
    super(endpoint, getAccessToken)
  }

  async loginWithEmail(payload: {
    email: string
    password: string
  }): Promise<{ user: User; accessToken: string }> {
    return this.post('/email-account/login', payload)
  }

  async signupWithEmail(payload: {
    email: string
    password: string
    name?: string
  }): Promise<{ ok: 1 }> {
    return this.post('/email-account/sign', payload)
  }

  async getSelf(): Promise<User> {
    return this.get('/v1/users/self')
  }

  async list(filters?: object): Promise<{
    list: Array<User>
    total: number
    page: number
    size: number
  }> {
    return this.get('/v1/users', filters)
  }
}
