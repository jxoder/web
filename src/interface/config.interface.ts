export interface SideBarItem {
  type: 'single'
  to: string
  name: string
  activeCondition: (pathname: string) => boolean
  icon?: React.ReactNode
}

export interface SideBarGroupItem {
  type: 'group'
  name: string
  activeCondition: (pathname: string) => boolean
  icon?: React.ReactNode
  items: Array<{ to: string; name: string; icon?: React.ReactNode }>
}

export type SideBarConfigType = Record<string, SideBarItem | SideBarGroupItem>
