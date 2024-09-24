import React from 'react'
import { useStore } from '../hook/useStore'

const HomePage: React.FC = () => {
  const store = useStore()

  return (
    <div>
      {store.auth.me?.name}: {store.auth.me?.role}
    </div>
  )
}

export default HomePage
