import { DrizzleAdapter } from '@auth/drizzle-adapter'
import NextAuth from 'next-auth'

import { db } from '@/lib/utils/database'

import authConfig from './auth.config'

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  adapter: DrizzleAdapter(db),
  session: { strategy: 'jwt' },
  secret: '02Xnq2x51UOXM2cm2GYBoW4RYZsayfZoP4+8DZDALZg=',
  ...authConfig,
})
