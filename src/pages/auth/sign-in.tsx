import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

export const SignIn: React.FC = () => {
  const navigate = useNavigate()

  return (
    <div className="flex items-center justify-center h-screen bg-gray-50">
      <div className="w-full max-w-md p-4 space-y-4 bg-white rounded-md shadow-md">
        <h1 className="text-2xl font-semibold text-center">Sign In</h1>
        <form className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input type="email" name="email" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input type="password" name="password" required />
          </div>
          <Button
            type="submit"
            className="w-full"
            onClick={() => navigate('/admin')}
          >
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
  )
}
