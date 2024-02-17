import { eq } from 'drizzle-orm'

import { db } from '@/lib/utils/database'

import { users } from '../schema'

export const getUserByEmail = async (email: string) => {
  try {
    const user = await db.select().from(users).where(eq(users.email, email))
    return user
  } catch (error) {
    console.error(error)
    return null
  }
}

export const getUserById = async (id: string) => {
  try {
    const user = await db.select().from(users).where(eq(users.id, id))
    console.log('user', user)
    return user
  } catch (error) {
    console.error(error)
    return null
  }
}

export const createUser = async (
  email: string,
  password: string,
  name: string,
) => {
  try {
    const user = await db.insert(users).values({
      email,
      password,
      name,
    })
    return { message: 'ok' }
  } catch (error) {
    console.error(error)
    return null
  }
}
