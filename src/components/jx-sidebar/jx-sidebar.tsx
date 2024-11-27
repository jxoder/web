import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail,
} from '@/components/ui/sidebar'
import { INav, IProjectNav } from '@/navigates'
import { ChevronRight } from 'lucide-react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import React from 'react'
import { NavUser } from './nav-user'
import { Switcher } from './switcher'

const NavItem: React.FC<INav> = ({ name, items }) => {
  const location = useLocation()

  const isActive = React.useCallback(
    (path: string) => {
      return location.pathname === path || location.pathname.includes(path)
    },
    [location.pathname],
  )

  return (
    <SidebarGroup>
      {name && <SidebarGroupLabel>{name}</SidebarGroupLabel>}
      <SidebarMenu>
        {items.map(item => (
          <Collapsible
            key={item.title}
            asChild
            defaultOpen={item.isActive}
            className="group/collapsible"
          >
            <SidebarMenuItem>
              <CollapsibleTrigger asChild>
                <SidebarMenuButton tooltip={item.title}>
                  {item.icon && <item.icon />}
                  <span>{item.title}</span>
                  <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                </SidebarMenuButton>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <SidebarMenuSub>
                  {item.items?.map(subItem => (
                    <SidebarMenuSubItem key={subItem.title}>
                      <SidebarMenuSubButton
                        asChild
                        isActive={isActive(subItem.path)}
                      >
                        <Link to={subItem.path}>
                          <span>{subItem.title}</span>
                        </Link>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  ))}
                </SidebarMenuSub>
              </CollapsibleContent>
            </SidebarMenuItem>
          </Collapsible>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  )
}

export const JXSidebar: React.FC<{ config: Array<IProjectNav> }> = ({
  ...props
}) => {
  const { config } = props
  const navigate = useNavigate()
  const location = useLocation()
  const [activate, setActivate] = React.useState<IProjectNav>(
    config.find(t => t.path === location.pathname) ?? config[0],
  )

  const handleSelect = (item: IProjectNav) => {
    setActivate(item)
    navigate(item.path)
  }

  return (
    <Sidebar collapsible="offcanvas" {...props}>
      {/* Select Project */}
      <SidebarHeader>
        <Switcher
          items={config}
          activeItem={activate}
          onSelect={handleSelect}
        />
      </SidebarHeader>

      {/* Sidebar content */}
      <SidebarContent>
        {activate.nav.map((item, index) => (
          <NavItem key={index} name={item.name} items={item.items} />
        ))}
      </SidebarContent>

      {/* User TODO: 연동필요. */}
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
