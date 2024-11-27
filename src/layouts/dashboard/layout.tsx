import {
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from 'react-router-dom'
import { routes } from '@/routes'
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import { Separator } from '@/components/ui/separator'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import React from 'react'
import { JXSidebar } from '@/components/jx-sidebar/jx-sidebar'
import { getNavConfig } from '@/navigates'
import { useUserStore } from '@/store/user.store'
import { USER_ROLE } from '@/api/user/user.model'
import { JXLoadingSpinner } from '@/components/jx-loading-spinner'

export const DashboardLayout: React.FC<{ role?: USER_ROLE }> = props => {
  const [loading, isLoading] = React.useState(true)
  const navigate = useNavigate()
  const location = useLocation()
  const { user, getSelf } = useUserStore()
  const currentPath = React.useMemo(
    () => location.pathname.split('/').filter(t => t.length !== 0),
    [location],
  )

  React.useEffect(() => {
    getSelf().finally(() => isLoading(false))
  }, [getSelf, isLoading])

  React.useEffect(() => {
    if (user) {
      switch (props.role) {
        case USER_ROLE.ADMIN:
          if (user.role !== props.role) {
            return navigate('/studio')
          }
      }
    }
  }, [user, props.role, navigate])

  if (loading) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <JXLoadingSpinner className="size-24 text-gray-300" />
      </div>
    )
  }

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
            <Breadcrumb>
              <BreadcrumbList>
                {currentPath.map((p, index) => {
                  if (index === currentPath.length - 1) {
                    return (
                      <div className="flex items-center gap-2" key={index}>
                        {index !== 0 && (
                          <BreadcrumbSeparator className="hidden md:block" />
                        )}
                        <BreadcrumbItem className="hidden md:block">
                          <BreadcrumbPage>
                            {p.charAt(0).toUpperCase() + p.slice(1)}
                          </BreadcrumbPage>
                        </BreadcrumbItem>
                      </div>
                    )
                  }
                  return (
                    <div className="flex items-center gap-2" key={index}>
                      {index !== 0 && (
                        <BreadcrumbSeparator className="hidden md:block" />
                      )}
                      <BreadcrumbItem className="hidden md:block">
                        <BreadcrumbLink to={`/${p}`}>
                          {p.charAt(0).toUpperCase() + p.slice(1)}
                        </BreadcrumbLink>
                      </BreadcrumbItem>
                    </div>
                  )
                })}
              </BreadcrumbList>
            </Breadcrumb>
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
