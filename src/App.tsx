import { Route, Routes, useLocation } from 'react-router-dom'
import { observer } from 'mobx-react-lite'
import { useStore } from './hook/useStore'
import React from 'react'
import HomePage from './page/Home'
import AppLayout from './page/common/AppLayout'
import Authenticated from './container/Authenticated'
import NotFound from './components/common/NotFound'
import SignIn from './page/Sign/SignIn'
import Loading from './components/common/Loading'
import SignUp from './page/Sign/SignUp'

const App = observer(() => {
  const { pathname } = useLocation()
  const store = useStore()

  React.useEffect(() => {
    store.init()
  }, [store])

  React.useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  if (!store.isInitialized) {
    return <Loading />
  }

  return (
    <Routes>
      {/* AppLayout을 사용하는 라우트들 */}
      <Route
        element={
          <Authenticated>
            <AppLayout />
          </Authenticated>
        }
      >
        <Route path="/" element={<HomePage />} />
        <Route path="/ai/ai-1" element={<Authenticated>AI-1</Authenticated>} />
        <Route path="/ai/ai-2" element={<Authenticated>AI-2</Authenticated>} />
      </Route>

      {/* AppLayout을 사용하지 않는 라우트들 */}
      <Route path="/login" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />

      {/* 404 */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
})

export default App
