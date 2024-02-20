'use client'

import { signIn } from 'next-auth/react'

import { Button } from '@/components/ui/button'

import { DEFAULT_LOGIN_REDIRECT } from '../../../../routes'

export const SocialButtons = () => {
  const handleClick = (provider: 'google' | 'github') => {
    signIn(provider, {
      callbackUrl: '/',
    })
  }

  return (
    <div className="flex items-center w-full gap-x-2">
      <Button
        size="lg"
        className="w-full"
        variant="outline"
        onClick={() => handleClick('google')}
      >
        Google
      </Button>
      <Button
        size="lg"
        className="w-full"
        variant="outline"
        onClick={() => handleClick('github')}
      >
        GitHub
      </Button>
    </div>
  )
}