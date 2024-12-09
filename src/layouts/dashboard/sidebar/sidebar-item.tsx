import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible'
import {
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubItem,
} from '@/components/ui/sidebar'
import {
  IContentCollapsibleMenuItem,
  IContentMenuItem,
} from '@/navigate.interface'
import { some } from 'lodash'
import { ChevronRight } from 'lucide-react'
import React from 'react'
import { Link } from 'react-router-dom'

interface ICollapsibleItemProps extends IContentCollapsibleMenuItem {
  current: string
}

export const SidebarCallapsibleItem: React.FC<
  ICollapsibleItemProps
> = props => {
  const open = React.useMemo(() => {
    return some(
      props.items.map(item => item.activate(item.path)(props.current)),
    )
  }, [props])

  return (
    <Collapsible
      asChild
      className="group/collapsible"
      open={open ? open : undefined}
    >
      <SidebarMenuItem>
        <CollapsibleTrigger asChild>
          <SidebarMenuButton tooltip={props.name}>
            {props.icon && <props.icon />}
            <span>{props.name}</span>
            <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
          </SidebarMenuButton>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <SidebarMenuSub>
            {props.items.map(item => (
              <SidebarMenuSubItem key={item.name}>
                <SidebarMenuButton
                  asChild
                  isActive={item.activate(item.path)(props.current)}
                >
                  <Link to={item.path}>
                    <span>{item.name}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuSubItem>
            ))}
          </SidebarMenuSub>
        </CollapsibleContent>
      </SidebarMenuItem>
    </Collapsible>
  )
}

interface ISingleItemProps extends IContentMenuItem {
  current: string
}

export const SidebarSingleItem: React.FC<ISingleItemProps> = props => {
  return (
    <SidebarMenuItem>
      <Link to={props.path}>
        <SidebarMenuButton isActive={props.activate(props.path)(props.current)}>
          {props.icon && <props.icon />}
          <span>{props.name}</span>
        </SidebarMenuButton>
      </Link>
    </SidebarMenuItem>
  )
}
