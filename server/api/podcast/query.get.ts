import { drizzle } from 'drizzle-orm/vercel-postgres'
import { sql } from '@vercel/postgres'
import * as schema from '../../database/schema'

export default defineEventHandler(async () => {
  const db = drizzle(sql, { schema })
  const podcasts = await db.select().from(schema.podcastsTable)
  return { podcasts }
})
