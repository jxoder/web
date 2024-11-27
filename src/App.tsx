import { Route, Routes } from 'react-router-dom'
import { AuthLayout } from './layouts/auth'
import { DashboardLayout } from './layouts/dashboard/layout'

const App = () => {
  return (
    <Routes>
      <Route path="/auth/*" element={<AuthLayout />} />
      <Route path="/admin/*" element={<DashboardLayout />} />
      <Route path="/studio/*" element={<DashboardLayout />} />
      <Route path="*" element={<div>Not found</div>} />
    </Routes>
  )
}

export default App
