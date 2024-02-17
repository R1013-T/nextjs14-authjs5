import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'

import * as schema from './schema'

const connectionString = process.env.NEXT_PUBLIC_SUPABASE_URI!
const client = postgres(connectionString)
const db = drizzle(client, { schema })

export default db
