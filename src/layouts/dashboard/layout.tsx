import { Route, Routes, useLocation } from 'react-router-dom'
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
import { JXNavigatorConfig } from '@/navigates'

export const DashboardLayout = () => {
  const location = useLocation()
  const currentPath = React.useMemo(
    () => location.pathname.split('/').filter(t => t.length !== 0),
    [location],
  )

  return (
    <SidebarProvider>
      <JXSidebar config={JXNavigatorConfig} />
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
