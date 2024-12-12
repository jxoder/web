import { ApiBase, GetAccessToken } from '../api.base'
import { ICreateInstancePayload, Instance } from './instance.model'

export class InstanceApi extends ApiBase {
  constructor(endpoint: string, getAccessToken: GetAccessToken) {
    super(endpoint, getAccessToken)
  }

  async create(payload: ICreateInstancePayload) {
    return this.postApi('/v1/infra-instances', payload)
  }

  async get(id: number): Promise<Instance> {
    return this.getApi(`/v1/infra-instances/${id}`)
  }

  async list(filters?: object): Promise<{
    list: Array<Instance>
    total: number
    page: number
    size: number
  }> {
    return this.getApi('/v1/infra-instances', filters)
  }

  async turnOn(id: number) {
    return this.postApi(`/v1/infra-instances/${id}/turn-on`)
  }

  async turnOff(id: number) {
    return this.postApi(`/v1/infra-instances/${id}/turn-off`)
  }
}
