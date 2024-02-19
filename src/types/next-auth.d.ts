import NextAuth, { type DefaultSession } from 'next-auth';

import type { UserRole } from './user';

export type ExtendedUser = DefaultSession['user'] & {
  role: UserRole;
};

declare module 'next-auth' {
  interface Session {
    user: ExtendedUser;
  }
}