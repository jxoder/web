import { IComfyWorkflow } from '../../interface/comfy.interface'
import { ApiService } from '../api.service'

export class ComfyApi {
  constructor(private api: ApiService) {}

  async workflows() {
    return this.api.get<Array<IComfyWorkflow>>('/v1/comfy-ui/workflows')
  }
}
