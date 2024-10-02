import { makeObservable, observable, runInAction } from 'mobx'
import { RootStore } from './root.store'
import { IComfyWorkflow } from '../interface/comfy.interface'

export class ComfyStore {
  loading: boolean = false
  workflows: IComfyWorkflow[] = []
  queue: Array<{ id: number; status: string }> = []
  // currentQueue: {}

  constructor(readonly rootStore: RootStore) {
    makeObservable(this, {
      loading: observable,

      // data
      workflows: observable,
      queue: observable,
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

  async request(payload: object) {
    if (this.loading) {
      return
    }

    try {
      runInAction(() => {
        this.loading = true
      })

      const res = await this.rootStore.api.comfy.request(payload)
      // runInAction(() => {
      //   this.queue.push(res)
      // })
    } catch (ex) {
      const error = this.rootStore.parseError(ex)
      this.rootStore.di.notify.error(`error: ${error.message}`)
    } finally {
      runInAction(() => {
        this.loading = false
      })
    }
  }
}
