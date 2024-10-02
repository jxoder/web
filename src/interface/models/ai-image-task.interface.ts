export enum TASK_STATUS {
  WAITING = 'WAITING',
  ACTIVE = 'ACTIVE',
  SUCCESS = 'SUCCESS',
  FAILED = 'FAILED',
}

export interface IAIImageTask {
  id: number
  status: TASK_STATUS
  payload: object
  error?: string
  images?: Array<{ url: string }>
}
