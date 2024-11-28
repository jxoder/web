import { USER_ROLE } from '@/api/user/user.model'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useToast } from '@/hooks/use-toast'
import { cn } from '@/lib/utils'
import { useUserStore } from '@/store/user.store'
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

export const SignIn: React.FC = () => {
  const navigate = useNavigate()
  const { toast } = useToast()
  const { login, user } = useUserStore()

  React.useEffect(() => {
    if (user) {
      switch (user.role) {
        case USER_ROLE.ADMIN:
          return navigate('/admin')
        default:
          return navigate('/studio')
      }
    }
  }, [user, navigate])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.target as HTMLFormElement)
    const email = formData.get('email') as string
    const password = formData.get('password') as string

    try {
      await login(email, password)
    } catch {
      toast({
        duration: 1000,
        variant: 'destructive',
        title: '이메일 또는 비밀번호를 확인해주세요.',
      })
    }
  }

  return (
    <>
      <div className="flex items-center justify-center h-screen md:bg-gray-50">
        <div className="w-full max-w-md p-4 space-y-4 bg-white md:rounded-md md:shadow-md">
          <h1 className="text-2xl font-semibold text-center">Sign In</h1>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input type="email" name="email" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input type="password" name="password" required />
            </div>
            <Button type="submit" className="w-full">
              Sign In
            </Button>
          </form>
          <div className="text-center">
            <Link to="/auth/sign-up" className={cn('text-sm', 'text-blue-600')}>
              Don't have an account?
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
