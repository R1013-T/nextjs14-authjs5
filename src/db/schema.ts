import { type InferInsertModel, type InferSelectModel } from 'drizzle-orm'
import { date, pgEnum, pgTable, text, uuid } from 'drizzle-orm/pg-core'

export const roleEnum = pgEnum('role', ['admin', 'user'])

export const users = pgTable('users', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: text('name').notNull(),
  email: text('email').notNull().unique(),
  email_verified: date('email_verified'),
  image: text('image'),
  password: text('password').notNull(),
  role: roleEnum('role').notNull().default('user'),
})

export type SelectTodo = InferSelectModel<typeof users>
export type InsertTodo = InferInsertModel<typeof users>
