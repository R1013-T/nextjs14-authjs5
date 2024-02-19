import { type InferInsertModel, type InferSelectModel } from 'drizzle-orm'
import { date, integer, pgEnum, pgTable, text, uuid } from 'drizzle-orm/pg-core'

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

export const accounts = pgTable('accounts', {
  id: uuid('id').defaultRandom().primaryKey(),
  user_id: uuid('user_id').notNull().references(() => users.id),
  type: text('type').notNull(),
  provider: text('provider').notNull(),
  provider_account_id: text('provider_account_id').notNull(),
  refresh_token: text('refresh_token'),
  access_token: text('access_token'),
  expires_at: integer('expires_at'),
  token_type: text('token_type'),
  scope: text('scope'),
  id_token: text('id_token'),
  session_state: text('session_state'),
})

export type SelectTodo = InferSelectModel<typeof users>
export type InsertTodo = InferInsertModel<typeof users>

export type SelectAccount = InferSelectModel<typeof accounts>
export type InsertAccount = InferInsertModel<typeof accounts>
