import { makeObservable, observable, runInAction } from 'mobx'
import { RootStore } from './root.store'
import { IUser } from '../interface/user.interface'
import { toast } from 'react-toastify'

export enum AuthState {
  loading = 'loading',
  loggedIn = 'loggedIn',
  loggedOut = 'loggedOut',
}

export class AuthStore {
  state: AuthState = AuthState.loading
  me: IUser | null = null

  constructor(readonly rootStore: RootStore) {
    makeObservable(this, {
      state: observable,
      me: observable,
    })
  }

  async init() {
    try {
      if (!this.rootStore.di.getAccessToken()) {
        runInAction(() => {
          this.state = AuthState.loggedOut
        })
        return
      }
      const res = await this.rootStore.api.auth.self()
      runInAction(() => {
        this.me = res
        this.state = AuthState.loggedIn
      })
    } catch {
      this.rootStore.di.setAccessToken(null)
      runInAction(() => {
        this.state = AuthState.loggedOut
      })
    }
  }

  async login(email: string, password: string) {
    try {
      const res = await this.rootStore.api.auth.loginWithEmail(email, password)
      this.rootStore.di.setAccessToken(res.accessToken)
      runInAction(() => {
        this.me = res.user
        this.state = AuthState.loggedIn
      })
    } catch {
      toast.error('login failed')
      runInAction(() => {
        this.state = AuthState.loggedOut
      })
    }
  }

  async sign(email: string, password: string) {
    try {
      await this.rootStore.api.auth.signWithEmail(email, password)

      return true // success
    } catch (ex) {
      console.error(ex)

      return false
    }
  }

  async logout() {
    this.rootStore.di.setAccessToken(null)
    runInAction(() => {
      this.state = AuthState.loggedOut
    })
  }
}
