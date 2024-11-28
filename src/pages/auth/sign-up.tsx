import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useToast } from '@/hooks/use-toast'
import { cn } from '@/lib/utils'
import { useUserStore } from '@/store/user.store'
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

export const SignUp: React.FC = () => {
  const navigate = useNavigate()
  const { toast } = useToast()
  const { sign } = useUserStore()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.target as HTMLFormElement)
    const email = formData.get('email') as string
    const password = formData.get('password') as string

    try {
      await sign(email, password)
      navigate('/auth/sign-in')
    } catch {
      toast({
        duration: 1000,
        variant: 'destructive',
        title: '이미 존재하는 계정입니다.',
      })
    }
  }

  return (
    <div className="flex items-center justify-center h-screen bg-gray-50">
      <div className="w-full max-w-md p-4 space-y-4 bg-white rounded-md shadow-md">
        <h1 className="text-2xl font-semibold text-center">Sign Up</h1>
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
            Sign Up
          </Button>
        </form>
        <div className="text-center">
          <Link to="/auth/sign-in" className={cn('text-sm', 'text-blue-600')}>
            Already have an account?
          </Link>
        </div>
      </div>
    </div>
  )
}
