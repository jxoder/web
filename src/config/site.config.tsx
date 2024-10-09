import HomeIcon from '../components/icons/HomeIcon'
import RobotIcon from '../components/icons/RobotIcon'

interface SideBarItem {
  type: 'single'
  to: string
  name: string
  activeCondition: (pathname: string) => boolean
  icon?: React.ReactNode
}

interface SideBarGroupItem {
  type: 'group'
  name: string
  activeCondition: (pathname: string) => boolean
  icon?: React.ReactNode
  items: Array<{ to: string; name: string; icon?: React.ReactNode }>
}

type SideBarConfigType = Record<string, SideBarItem | SideBarGroupItem>

export const SIDE_BAR_CONFIG: SideBarConfigType = {
  root: {
    type: 'single',
    to: '/',
    name: 'Home',
    activeCondition: (pathname: string) => pathname === '/',
    icon: <HomeIcon />,
  },
  ai: {
    type: 'group',
    name: 'AI',
    activeCondition: (pathname: string) =>
      pathname === '/ai' || pathname.includes('/ai'),
    icon: <RobotIcon />,
    items: [
      {
        to: '/ai/image',
        name: 'Image',
      },
      { to: '/ai/image-history', name: 'Image History' },
      { to: '/ai/t', name: 't' },
    ],
  },
}
