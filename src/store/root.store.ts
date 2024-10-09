import { makeObservable, observable, runInAction } from 'mobx'
import { ApiService } from '../api/api.service'
import { DI } from '../di'
import { AuthStore } from './auth.store'
import { ComfyStore } from './comfy.store'
import { AiImageStore } from './ai-image/ai-image.store'

export class RootStore {
  isInitialized = false
  api: ApiService

  // sub store
  auth: AuthStore
  aiImage: AiImageStore
  comfy: ComfyStore

  constructor(public di: DI) {
    this.api = new ApiService(di.endpoint, di.getAccessToken)

    // init sub store
    this.auth = new AuthStore(this)
    this.comfy = new ComfyStore(this)
    this.aiImage = new AiImageStore(this)

    makeObservable(this, {
      isInitialized: observable,
    })
  }

  async init() {
    await Promise.all([this.auth.init()])
    runInAction(() => {
      this.isInitialized = true
    })
  }

  parseError(ex: any): {
    code: number
    message: string
    data?: Array<unknown>
  } {
    try {
      return JSON.parse(ex.message)
    } catch {
      return { code: -1, message: 'UnHandled error' }
    }
  }
}
