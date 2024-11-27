import { Route, Routes } from 'react-router-dom'
import { AuthLayout } from './layouts/auth'
import { AdminLayout } from './layouts/admin/layout'

const App = () => {
  return (
    <Routes>
      <Route path="/auth/*" element={<AuthLayout />} />
      <Route path="/admin/*" element={<AdminLayout />} />
      <Route path="*" element={<div>Not found</div>} />
    </Routes>
  )
}

export default App
