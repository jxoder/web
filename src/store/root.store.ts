import { makeObservable, observable, runInAction } from 'mobx'
import { ApiService } from '../api/api.service'
import { DI } from '../di'
import { AuthStore } from './auth.store'
import { ComfyStore } from './ai-image.store'

export class RootStore {
  isInitialized = false
  api: ApiService

  // sub store
  auth: AuthStore
  comfy: ComfyStore

  constructor(public di: DI) {
    this.api = new ApiService(di.endpoint, di.getAccessToken)

    // init sub store
    this.auth = new AuthStore(this)
    this.comfy = new ComfyStore(this)

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

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
