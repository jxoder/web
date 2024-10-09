import { IWorkflow } from '../../interface/ai-image/workflow-input.interface'
import { ApiService } from '../api.service'

export class AiImageApi {
  constructor(private api: ApiService) {}

  async getWorkflows() {
    return this.api.get<Array<IWorkflow>>('/v1/ai-images/workflows')
  }
}
