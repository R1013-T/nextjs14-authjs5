import type { User } from 'next-auth'

export type ActionsResult =
  | {
      isSuccess: true
      message: string
      user?: User
    }
  | {
      isSuccess: false
      error: {
        message: string
      }
    }
