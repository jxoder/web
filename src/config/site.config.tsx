import { SideBarConfigType } from '../interface/config.interface'
import HomeIcon from '../components/icons/HomeIcon'
// import RobotIcon from '../components/icons/RobotIcon'

export const SIDE_BAR_CONFIG: SideBarConfigType = {
  root: {
    type: 'single',
    to: '/',
    name: 'Home',
    activeCondition: (pathname: string) => pathname === '/',
    icon: <HomeIcon />,
  },
  // ai: {
  //   type: 'group',
  //   name: 'AI',
  //   activeCondition: (pathname: string) =>
  //     pathname === '/ai' || pathname.includes('/ai'),
  //   icon: <RobotIcon />,
  //   items: [
  //     {
  //       to: '/ai/ai-1',
  //       name: 'ai-1',
  //     },
  //     {
  //       to: '/ai/ai-2',
  //       name: 'ai-2',
  //     },
  //   ],
  // },
}
