import { USER_ROLE } from '@/api/user/user.model'
import { JXLoadingSpinner } from '@/components/jx-loading-spinner'
import { useUserStore } from '@/store/user.store'
import { getRoleLv } from '@/utils'
import React from 'react'
import { Navigate } from 'react-router-dom'

interface IProps {
  children: React.ReactNode
  role?: USER_ROLE
}

export const AuthContainer: React.FC<IProps> = ({ children, role }) => {
  const [loading, isLoading] = React.useState(true)
  const { user, getSelf } = useUserStore()

  React.useEffect(() => {
    getSelf().finally(() => isLoading(false))
  }, [getSelf, isLoading])

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

  if (role && getRoleLv(user.role) < getRoleLv(role)) {
    return <Navigate to="/studio" />
  }

  return children
}
