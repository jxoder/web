import { makeObservable, observable, runInAction } from 'mobx'
import { RootStore } from './root.store'
import { IComfyWorkflow } from '../interface/comfy.interface'

export class ComfyStore {
  loading: boolean = false
  workflows: IComfyWorkflow[] = []

  constructor(readonly rootStore: RootStore) {
    makeObservable(this, {
      loading: observable,

      // data
      workflows: observable,
    })
  }

  async getWorkflows() {
    if (this.loading) {
      return
    }

    try {
      runInAction(() => {
        this.loading = true
      })

      const res = await this.rootStore.api.comfy.workflows()
      runInAction(() => {
        this.workflows = res
      })
    } catch (ex) {
      console.error(ex)
    } finally {
      runInAction(() => {
        this.loading = false
      })
    }
  }
}
