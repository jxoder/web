import { makeObservable, observable, runInAction } from 'mobx'
import { RootStore } from './root.store'
import { IComfyWorkflow } from '../interface/comfy.interface'
import {
  IAIImageTask,
  TASK_STATUS,
} from '../interface/models/ai-image-task.interface'

export class ComfyStore {
  loading: boolean = false
  workflows: IComfyWorkflow[] = []
  queue: Array<{ id: number; status: string }> = []
  currentTask: IAIImageTask | null = null
  isPolling: NodeJS.Timeout | null = null

  constructor(readonly rootStore: RootStore) {
    makeObservable(this, {
      loading: observable,

      // data
      workflows: observable,
      queue: observable,
      currentTask: observable,
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

      runInAction(() => {
        this.currentTask = res
      })
    } catch (ex) {
      const error = this.rootStore.parseError(ex)
      this.rootStore.di.notify.error(`error: ${error.message}`)
    } finally {
      runInAction(() => {
        this.loading = false
      })
    }
  }

  async pollingQueue() {
    if (this.isPolling) {
      return
    }

    this.isPolling = setTimeout(async () => {
      const runTask = async () => {
        await this.getCurrentTask()
        setTimeout(runTask, 1000)
      }
      runTask()
    }, 1000)
  }

  async getCurrentTask() {
    if (!this.currentTask) {
      return
    }

    if (
      this.currentTask.status === TASK_STATUS.SUCCESS ||
      this.currentTask.status === TASK_STATUS.FAILED
    ) {
      return
    }

    try {
      const res = await this.rootStore.api.comfy.getTask(this.currentTask.id)
      runInAction(() => {
        this.currentTask = res
      })
    } catch (ex) {
      console.error(ex)
      runInAction(() => {
        this.currentTask = null
      })
    }
  }

  async reset() {
    runInAction(() => {
      this.workflows = []
      this.queue = []
      this.currentTask = null
    })
  }
}
