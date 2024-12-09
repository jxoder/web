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
    return this.postApi('/email-account/login', payload)
  }

  async signupWithEmail(payload: {
    email: string
    password: string
    name?: string
  }): Promise<{ ok: 1 }> {
    return this.postApi('/email-account/sign', payload)
  }

  async getSelf(): Promise<User> {
    return this.getApi('/v1/users/self')
  }

  async get(id: number): Promise<User> {
    return this.getApi(`/v1/users/${id}`)
  }

  async list(filters?: object): Promise<{
    list: Array<User>
    total: number
    page: number
    size: number
  }> {
    return this.getApi('/v1/users', filters)
  }
}
