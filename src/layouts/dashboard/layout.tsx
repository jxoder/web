import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import { routes } from '@/routes'
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import { Separator } from '@/components/ui/separator'
import React from 'react'
import { JXSidebar } from '@/components/jx-sidebar/jx-sidebar'
import { getNavConfig } from '@/navigates'
import { useUserStore } from '@/store/user.store'
import { JXBreadcrum } from './breadcrum/jx-breadcrum'

export const DashboardLayout: React.FC = () => {
  const location = useLocation()
  const { user } = useUserStore()

  // for safety
  if (!user) {
    return <Navigate to="/auth/sign-in" />
  }

  return (
    <SidebarProvider>
      <JXSidebar config={getNavConfig(user!.role)} />
      <main className="w-full bg-gray-50">
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12 bg-white">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <JXBreadcrum pathname={location.pathname} />
          </div>
        </header>
        <div className="h-[calc(100%-4rem)] xl:p-6 p-4">
          <Routes>
            {routes
              .filter(route => route.layout === 'admin')
              .map(route =>
                route.pages.map(page => (
                  <Route path={page.path} element={page.element} />
                )),
              )}
          </Routes>
        </div>
      </main>
    </SidebarProvider>
  )
}
