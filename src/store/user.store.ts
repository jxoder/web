import { userApi } from '@/api'
import { User } from '@/api/user/user.model'
import { create } from 'zustand'

interface UserStore {
  user: User | null
  getSelf: () => Promise<void>
  login: (email: string, password: string) => Promise<void>
  sign: (email: string, password: string) => Promise<void>
  logout: () => void
}

export const useUserStore = create<UserStore>(set => ({
  user: null,
  getSelf: async () => {
    try {
      const user = await userApi.getSelf()
      set({ user })
    } catch (ex) {
      console.error(ex)
      localStorage.removeItem('access_token')
      set({ user: null })
    }
  },
  login: async (email: string, password: string) => {
    const { user, accessToken } = await userApi.loginWithEmail({
      email,
      password,
    })
    localStorage.setItem('access_token', accessToken)
    set({ user, ...set })
  },
  sign: async (email: string, password: string) => {
    await userApi.signupWithEmail({
      email,
      password,
    })
  },
  logout: () => {
    localStorage.removeItem('access_token')
    set({ user: null })
  },
}))
