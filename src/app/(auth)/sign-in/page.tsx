import Link from 'next/link'

import { SignInForm } from '@/components/auth/sign-in/form'
import { SocialButtons } from '@/components/auth/sign-in/social-buttons'
import { buttonVariants } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'

export default function SignInPage() {
  return (
    <div>
      <SignInForm />
      <Separator className="my-4" />
      <SocialButtons />
      <Link
        className={buttonVariants({
          variant: 'link',
          size: 'sm',
          className: 'mt-4',
        })}
        href={'/sign-up'}
      >
        新規登録はこちら
      </Link>
    </div>
  )
}
