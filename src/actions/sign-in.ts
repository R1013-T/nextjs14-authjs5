'use server'

import { AuthError } from 'next-auth'
import type * as z from 'zod'

import { getUserByEmail } from '@/db/methods/user'
import { signInSchema } from '@/lib/schemas/auth'
import type { ActionsResult } from '@/types/actions-result'

import { signIn as signInByAuthJS } from '../../auth'
import { DEFAULT_LOGIN_REDIRECT } from './../../routes'

export const signIn = async (
  values: z.infer<typeof signInSchema>,
): Promise<ActionsResult> => {
  const validatedFields = signInSchema.safeParse(values)

  if (!validatedFields.success) {
    return {
      isSuccess: false,
      error: {
        message: validatedFields.error.message,
      },
    }
  }

  const { email, password } = validatedFields.data

  const existingUser = await getUserByEmail(email)

  if (!existingUser || !existingUser.email || !existingUser.password) {
    return {
      isSuccess: false,
      error: {
        message: 'メールアドレスまたはパスワードが違います。',
      },
    }
  }

  try {
    await signInByAuthJS('credentials', {
      email,
      password,
      redirectTo: DEFAULT_LOGIN_REDIRECT,
    })

    return {
      isSuccess: true,
      message: 'サインインに成功しました。',
    }
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return {
            isSuccess: false,
            error: {
              message: 'メールアドレスまたはパスワードが違います。',
            },
          }
        default:
          return {
            isSuccess: false,
            error: {
              message: 'サインインに失敗しました。',
            },
          }
      }
    }

    throw error
  }
}
