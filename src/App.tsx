import { Route, Routes } from 'react-router-dom'
import { AuthLayout } from './layouts/auth'
import { DashboardLayout } from './layouts/dashboard/layout'
import { Root } from './layouts/root'
import { AuthContainer } from './containers/auth.containter'
import { USER_ROLE } from './api/user/user.model'
import { getRoutes } from './routes'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { QueryParamProvider } from 'use-query-params'
import { ReactRouter6Adapter } from 'use-query-params/adapters/react-router-6'

const queryClient = new QueryClient()

export const App: React.FC = () => {
  return (
    <QueryParamProvider adapter={ReactRouter6Adapter}>
      <QueryClientProvider client={queryClient}>
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
      </QueryClientProvider>
    </QueryParamProvider>
  )
}

export default App
