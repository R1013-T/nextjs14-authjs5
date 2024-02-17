import * as dotenv from 'dotenv'
import type { Config } from 'drizzle-kit'

dotenv.config()

export default {
  schema: './src/db/schema.ts',
  out: './src/db/migrations',
  breakpoints: true,
  driver: 'pg',
  dbCredentials: {
    connectionString: process.env.NEXT_PUBLIC_SUPABASE_URI!,
  },
} satisfies Config
