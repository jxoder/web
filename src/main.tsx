import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import { App } from './App.tsx'
import { Toaster } from './components/ui/toaster.tsx'

import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import 'dayjs/locale/ko'

// 플러그인과 로케일 설정
dayjs.extend(relativeTime)
dayjs.locale('ko')

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <Toaster />
    <App />
  </BrowserRouter>,
)
