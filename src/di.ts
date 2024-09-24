import { toast } from 'react-toastify'

export interface DI {
  endpoint: string
  getAccessToken(): string | null
  setAccessToken(token: string | null): void
  notify: typeof toast
}

export const BrowserDI: DI = {
  endpoint: import.meta.env.VITE_API_ENDPOINT,
  getAccessToken: () => {
    return localStorage.getItem('access_token')
  },
  setAccessToken: (token: string | null) => {
    if (!token) {
      return localStorage.removeItem('access_token')
    }
    return localStorage.setItem('access_token', token)
  },
  notify: toast,
}
