import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  SidebarSeparator,
} from '@/components/ui/sidebar'
import { IProjectNavConfig } from '@/navigate.interface'
import { Switcher } from './switcher'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import React from 'react'
import { SidebarCallapsibleItem, SidebarSingleItem } from './sidebar-item'
import { UserMenu } from './user-menu'

interface IProps {
  config: Array<IProjectNavConfig>
}

export const JXSidebar: React.FC<IProps> = props => {
  const { config } = props
  const navigate = useNavigate()
  const location = useLocation()

  const [active, setActive] = React.useState<IProjectNavConfig>(
    config.find(t => t.path === location.pathname) ?? config[0],
  )

  const handleSelect = (item: IProjectNavConfig) => {
    setActive(item)
    navigate(item.path)
  }

  return (
    <Sidebar collapsible="offcanvas" {...props}>
      {/* Select Project */}
      <SidebarHeader>
        <Switcher items={config} activeItem={active} onSelect={handleSelect} />
        {active.headers.length > 0 && (
          <SidebarMenu>
            {active.headers.map(item => (
              <SidebarMenuItem key={item.name}>
                <Link to={item.path}>
                  <SidebarMenuButton
                    isActive={item.activate(item.path)(location.pathname)}
                  >
                    {item.icon && <item.icon />}
                    <span>{item.name}</span>
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        )}
      </SidebarHeader>
      {active.headers.length > 0 && <SidebarSeparator />}

      {/* Sidebar Content */}
      <SidebarContent>
        <SidebarMenu>
          <SidebarGroup>
            {active.contents.map((content, index) => {
              if (content.type === 'group') {
                return (
                  <SidebarCallapsibleItem
                    {...content}
                    key={index}
                    current={location.pathname}
                  />
                )
              }
              return (
                <SidebarSingleItem
                  {...content}
                  key={index}
                  current={location.pathname}
                />
              )
            })}
          </SidebarGroup>
        </SidebarMenu>
      </SidebarContent>

      {/* Sidebar Footer */}
      <SidebarFooter>
        <UserMenu />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
