import Link from 'next/link'

import { SignUpForm } from '@/components/auth/sign-up/form'
import { buttonVariants } from '@/components/ui/button'

export default function SignUpPage() {
  return (
    <div>
      <SignUpForm />
      <Link
        className={buttonVariants({
          variant: 'link',
          size: 'sm',
          className: 'mt-4',
        })}
        href={'/sign-in'}
      >
        ログインはこちら
      </Link>
    </div>
  )
}
