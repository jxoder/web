import { USER_ROLE } from '@/api/user/user.model'
import { JXLoadingSpinner } from '@/components/jx-loading-spinner'
import { useUserStore } from '@/store/user.store'
import React from 'react'
import { Navigate } from 'react-router-dom'

export const Root: React.FC = () => {
  const { user, getSelf } = useUserStore()
  const [loading, setLoading] = React.useState(true)

  React.useEffect(() => {
    getSelf().finally(() => setLoading(false))
  }, [getSelf])

  if (loading) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <JXLoadingSpinner className="size-24 text-gray-300" />
      </div>
    )
  }

  if (!user) {
    return <Navigate to="/auth/sign-in" />
  }

  if ([USER_ROLE.ADMIN, USER_ROLE.MASTER].includes(user.role)) {
    return <Navigate to="/admin" />
  }

  return <Navigate to="/studio" />
}
