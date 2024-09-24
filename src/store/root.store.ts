import { makeObservable, observable, runInAction } from 'mobx'
import { ApiService } from '../api/api.service'
import { DI } from '../di'
import { AuthStore } from './auth.store'

export class RootStore {
  isInitialized = false
  api: ApiService

  // sub store
  auth: AuthStore

  constructor(public di: DI) {
    this.api = new ApiService(di.endpoint, di.getAccessToken)

    // init sub store
    this.auth = new AuthStore(this)

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
}
