export enum INSTANCE_PROVIDER {
  LOCAL = 'local',
  AWS = 'aws',
}

export enum INSTANCE_STATUS {
  RUNNING = 'running',
  STOPPED = 'stopped',
}

export interface ILocalInstanceConfig {
  ipAddress: string
  macAddress: string
  sshPrivateKey: string
}

export type InstanceConfigType = ILocalInstanceConfig

export interface Instance {
  createdAt: Date
  updatedAt: Date
  id: number
  name: string
  provider: INSTANCE_PROVIDER
  status: INSTANCE_STATUS
  uptime?: number
  config: InstanceConfigType
}

export interface ICreateInstancePayload
  extends Pick<Instance, 'name' | 'provider' | 'config'> {}
