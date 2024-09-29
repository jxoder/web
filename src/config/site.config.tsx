import { SideBarConfigType } from '../interface/config.interface'
import HomeIcon from '../components/icons/HomeIcon'
import RobotIcon from '../components/icons/RobotIcon'

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
      { to: '/ai/image-t', name: 'Image-test' },
    ],
  },
}
