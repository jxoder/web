import React from 'react'
import { RootStore } from '../store/root.store'
import { BrowserDI } from '../di'

const rootStore = new RootStore(BrowserDI)
const rootStoreContext = React.createContext<RootStore>(rootStore)

export const useStore = (): RootStore => {
  return React.useContext(rootStoreContext)
}
