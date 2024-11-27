import { GetAccessToken } from './api.base'
import { UserApi } from './user/user.api'

// config
export const API_ENDPOINT: string = import.meta.env.VITE_API_ENDPOINT
export const getAccessToken: GetAccessToken = () =>
  localStorage.getItem('access_token')

// api
export const userApi = new UserApi(API_ENDPOINT, getAccessToken)
