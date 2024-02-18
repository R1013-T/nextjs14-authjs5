'use server'

// import { hashSync } from 'bcrypt'
import { compare, genSaltSync, hashSync } from 'bcrypt-ts'
import type { z } from 'zod'

import { createUser, getUserByEmail } from '@/db/methods/user'
import { signUpSchema } from '@/lib/schemas/auth'
import { handleError } from '@/lib/utils/error'
import type { ActionsResult } from '@/types/actions-result'

export const signUp = async (
  values: z.infer<typeof signUpSchema>,
): Promise<ActionsResult> => {
  const validatedFields = signUpSchema.safeParse(values)

  if (!validatedFields.success) {
    return {
      isSuccess: false,
      error: {
        message: validatedFields.error.message,
      },
    }
  }

  const { email, password, nickname } = validatedFields.data

  try {
    const salt = genSaltSync(10)
    const hashedPassword = hashSync(password, salt)

    const existingUser = await getUserByEmail(email)

    if (existingUser) {
      return {
        isSuccess: false,
        error: {
          message: 'このメールアドレスは既に登録されています。',
        },
      }
    }

    await createUser(email, hashedPassword, nickname)

    return {
      isSuccess: true,
      message: 'サインアップに成功しました。',
    }
  } catch (error) {
    handleError(error)

    return {
      isSuccess: false,
      error: {
        message: 'サインアップに失敗しました。',
      },
    }
  }
}
