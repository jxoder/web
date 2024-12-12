import { GetAccessToken } from './api.base'
import { EmailAccountApi } from './email/email.api'
import { InstanceApi } from './instance/instance.api'
import { UserApi } from './user/user.api'

// config
export const API_ENDPOINT: string = import.meta.env.VITE_API_ENDPOINT
export const getAccessToken: GetAccessToken = () =>
  localStorage.getItem('access_token')

// api
export const userApi = new UserApi(API_ENDPOINT, getAccessToken)
export const emailAccountApi = new EmailAccountApi(API_ENDPOINT, getAccessToken)
export const instanceApi = new InstanceApi(API_ENDPOINT, getAccessToken)
