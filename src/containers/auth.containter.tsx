import { USER_ROLE } from '@/api/user/user.model'
import { JXLoadingSpinner } from '@/components/jx-loading-spinner'
import { useUserStore } from '@/store/user.store'
import React from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
interface IProps {
  children: React.ReactNode
  role?: USER_ROLE
}

export const AuthContainer: React.FC<IProps> = ({ children, role }) => {
  const [loading, isLoading] = React.useState(true)
  const navigate = useNavigate()
  const { user, getSelf } = useUserStore()

  React.useEffect(() => {
    getSelf().finally(() => isLoading(false))
  }, [getSelf, isLoading])

  React.useEffect(() => {
    if (user) {
      switch (role) {
        case USER_ROLE.ADMIN:
          if (user.role !== role) {
            return navigate('/studio')
          }
      }
    }
  }, [user, role, navigate])

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

  return <>{children}</>
}
