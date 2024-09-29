export interface IComfyWorkflowForm {
  type: 'string' | 'number'
  name: string
  values?: string[]
  defaultValue?: string | number
  required: boolean
}

export interface IComfyWorkflow {
  type: string
  forms: Array<IComfyWorkflowForm>
}
