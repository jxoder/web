import { IComfyWorkflow } from '../../interface/comfy.interface'
import { IAIImageTask } from '../../interface/models/ai-image-task.interface'
import { ApiService } from '../api.service'

export class ComfyApi {
  constructor(private api: ApiService) {}

  async workflows() {
    return this.api.get<Array<IComfyWorkflow>>('/v1/comfy-ui/workflows')
  }

  async request(payload: object) {
    return this.api.post<IAIImageTask>('/v1/comfy-ui/request', payload)
  }

  async getTask(id: number) {
    return this.api.get<IAIImageTask>(`/v1/ai-images/task/${id}`)
  }
}
