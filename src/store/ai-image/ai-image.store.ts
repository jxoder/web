import { makeObservable, observable, runInAction } from 'mobx'
import { RootStore } from '../root.store'
import {
  IWorkflow,
  WORKFLOW_FORM_INPUT_TYPE,
} from '../../interface/ai-image/workflow-input.interface'

export class AiImageStore {
  loading = false
  workflows: Array<IWorkflow> = []

  selectedWorkflow: IWorkflow | null = null
  workflowPayload: Record<string, Record<string, any>> = {}

  constructor(readonly rootStore: RootStore) {
    makeObservable(this, {
      loading: observable,

      workflows: observable,
      selectedWorkflow: observable,
      workflowPayload: observable,
    })
  }

  selectWorkflow(type: string) {
    runInAction(() => {
      this.selectedWorkflow = this.workflows.find(x => x.type === type)!
    })
  }

  setWorkflowPayload(key: string, value: any) {
    const type = this.selectedWorkflow?.type
    if (!type) return

    runInAction(() => {
      this.workflowPayload = {
        ...this.workflowPayload,
        [type]: { ...this.workflowPayload[type], [key]: value },
      }
    })
  }

  getWorkflowPayload(key: string) {
    const type = this.selectedWorkflow?.type
    if (!type) return

    return this.workflowPayload?.[type]?.[key] ?? ''
  }

  async init() {
    runInAction(() => {
      this.loading = true
    })

    try {
      const res = await this.rootStore.api.aiImage.getWorkflows()
      runInAction(() => {
        this.workflows = res
      })

      if (res.length > 0) {
        runInAction(() => {
          this.selectedWorkflow = res[0]
          this.workflowPayload = res.reduce((acc, wf) => {
            return { ...acc, [wf.type]: this.setDefaultPayload(wf.type) }
          }, {})
        })
      }
    } catch (ex) {
      console.error(ex)
    } finally {
      runInAction(() => {
        this.loading = false
      })
    }
  }

  private setDefaultPayload(type: string) {
    const forms = this.workflows.find(wf => wf.type === type)?.forms
    if (!forms) {
      return {}
    }

    const defaultPayload = forms.reduce((acc, form) => {
      switch (form.type) {
        case WORKFLOW_FORM_INPUT_TYPE.TEXT:
        case WORKFLOW_FORM_INPUT_TYPE.TEXTAREA:
        case WORKFLOW_FORM_INPUT_TYPE.NUMBER:
          return { ...acc, [form.name]: form.defaultValue }
        case WORKFLOW_FORM_INPUT_TYPE.RANGE:
          return { ...acc, [form.name]: form.defaultValue }
        case WORKFLOW_FORM_INPUT_TYPE.SELECT:
          return { ...acc, [form.name]: form.defaultValue }
      }
    }, {})

    return { ...defaultPayload, ...this.workflowPayload }
  }

  reset() {
    runInAction(() => {
      this.workflows = []
      this.selectedWorkflow = null
      this.workflowPayload = {}
    })
  }
}
