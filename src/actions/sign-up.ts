'use server'

import type { z } from 'zod'

import { signUpSchema } from '@/lib/schemas/auth'
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

  return {
    isSuccess: true,
    message: 'サインアップに成功しました。',
  }
}
