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
import AiImageTPage from './page/Ai/AiImageTPage'
import AiImagePage from './page/Ai/Image/AiImagePage'
import PageTitle from './components/common/PageTitle'

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
        <Route
          path="/"
          element={
            <>
              <PageTitle title="J-NH | Home" />
              <HomePage />
            </>
          }
        />
        <Route
          path="/ai/image"
          element={
            <Authenticated>
              <PageTitle title="J-NH | AI Image" />
              <AiImagePage />
            </Authenticated>
          }
        />
        <Route
          path="/ai/image-t"
          element={
            <Authenticated>
              <PageTitle title="J-NH | AI Image" />
              <AiImageTPage />
            </Authenticated>
          }
        />
      </Route>

      {/* AppLayout을 사용하지 않는 라우트들 */}
      <Route
        path="/login"
        element={
          <>
            <PageTitle title="J-NH | Sign In" />
            <SignIn />
          </>
        }
      />
      <Route
        path="/signup"
        element={
          <>
            <PageTitle title="J-NH | Sign Up" />
            <SignUp />
          </>
        }
      />

      {/* 404 */}
      <Route
        path="*"
        element={
          <>
            <PageTitle title="J-NH | 404" />
            <NotFound />
          </>
        }
      />
    </Routes>
  )
})

export default App
