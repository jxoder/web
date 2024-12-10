import { ApiBase, GetAccessToken } from '../api.base'
import { EmailAccount } from './email.model'

export class EmailAccountApi extends ApiBase {
  constructor(endpoint: string, getAccessToken: GetAccessToken) {
    super(endpoint, getAccessToken)
  }

  async get(id: number): Promise<EmailAccount> {
    return this.getApi(`/v1/email-accounts/${id}`)
  }

  async list(filters?: object): Promise<{
    list: Array<EmailAccount>
    total: number
    page: number
    size: number
  }> {
    return this.getApi('/v1/email-accounts', filters)
  }
}
