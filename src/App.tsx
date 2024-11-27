import { Route, Routes } from 'react-router-dom'
import { AuthLayout } from './layouts/auth'
import { DashboardLayout } from './layouts/dashboard/layout'
import { RootAuth } from './layouts/root-auth'
import { USER_ROLE } from './api/user/user.model'

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<RootAuth />} />
      <Route path="/auth/*" element={<AuthLayout />} />
      <Route
        path="/admin/*"
        element={<DashboardLayout role={USER_ROLE.ADMIN} />}
      />
      <Route path="/studio/*" element={<DashboardLayout />} />
      <Route path="*" element={<div>Not found</div>} />
    </Routes>
  )
}

export default App
