import { Route, Routes } from 'react-router-dom'
import { AuthLayout } from './layouts/auth'
import { DashboardLayout } from './layouts/dashboard/layout'
import { Root } from './layouts/root'
import { AuthContainer } from './containers/auth.containter'
import { USER_ROLE } from './api/user/user.model'
import { getRoutes } from './routes'

export const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Root />} />
      <Route path="/auth/*" element={<AuthLayout />} />
      <Route
        path="/admin/*"
        element={
          <AuthContainer role={USER_ROLE.ADMIN}>
            <DashboardLayout routes={getRoutes('admin')} />
          </AuthContainer>
        }
      />
      <Route
        path="/studio/*"
        element={
          <AuthContainer>
            <DashboardLayout routes={getRoutes('studio')} />
          </AuthContainer>
        }
      />
      <Route path="*" element={<div>Not found</div>} />
    </Routes>
  )
}

export default App
