import SignOutButton from '@/components/auth/sign-out/button'

import { auth } from '../../auth'

async function Home() {
  const session = await auth()

  console.log('session', session)

  return (
    <article>
      <h1>Top Page</h1>
      <div className="">
        <p>email: {session?.user?.email}</p>
        <p>role: {session?.user?.role}</p>
      </div>
      <SignOutButton />
    </article>
  )
}

export default Home
