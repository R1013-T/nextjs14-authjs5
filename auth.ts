import { DrizzleAdapter } from '@auth/drizzle-adapter'
import NextAuth from 'next-auth'

import { getUserById } from '@/db/methods/user'
import { db } from '@/lib/utils/database'
import type { UserRole } from '@/types/user'

import authConfig from './auth.config'

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  pages: {
    signIn: '/sign-in',
  },
  callbacks: {
    async session({ token, session }) {
      if (token.sub && session.user) {
        session.user.id = token.sub
      }

      //? roleがsessionに追加されないので、DBから取得して追加する
      // const user = await getUserById(session.user.id)
      // session.user.role = user?.role as UserRole

      return session
    },
    async jwt({ token }) {
      // if (!token.sub) return token
      // const existingUser = await getUserById(token.sub)
      // if (!existingUser) return token
      // token.role = existingUser.role
      return token
    },
  },
  adapter: DrizzleAdapter(db),
  session: { strategy: 'jwt' },
  secret: process.env.AUTH_SECRET,
  debug: true,
  ...authConfig,
})
