export enum WORKFLOW_FORM_INPUT_TYPE {
  TEXT = 'text',
  TEXTAREA = 'textarea',
  NUMBER = 'number',
  SELECT = 'select', // select box
  RANGE = 'range', // range input (number)
}

interface IWorkflowFormInputBase {
  type: WORKFLOW_FORM_INPUT_TYPE
  label?: string
  name: string
  required?: boolean
}

export interface IWorkflowFormInputText extends IWorkflowFormInputBase {
  type: WORKFLOW_FORM_INPUT_TYPE.TEXT
  defaultValue?: string
}

export interface IWorkflowFormInputTextarea extends IWorkflowFormInputBase {
  type: WORKFLOW_FORM_INPUT_TYPE.TEXTAREA
  defaultValue?: string
}

export interface IWorkflowFormInputNumber extends IWorkflowFormInputBase {
  type: WORKFLOW_FORM_INPUT_TYPE.NUMBER
  defaultValue?: number
}

export interface IWorkflowFormInputSelect extends IWorkflowFormInputBase {
  type: WORKFLOW_FORM_INPUT_TYPE.SELECT
  options: Array<{ label: string; value: string }>
  defaultValue?: string
}

export interface IWorkFlowFormInputRange extends IWorkflowFormInputBase {
  type: WORKFLOW_FORM_INPUT_TYPE.RANGE
  defaultValue?: number
  min?: number
  max?: number
  step?: number
}

export type WorkflowFormInputType =
  | IWorkflowFormInputText
  | IWorkflowFormInputTextarea
  | IWorkflowFormInputNumber
  | IWorkflowFormInputSelect
  | IWorkFlowFormInputRange

export interface IWorkflow {
  type: string
  name: string
  description: string
  forms: Array<WorkflowFormInputType>
}
