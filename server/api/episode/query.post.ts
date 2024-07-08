import { drizzle } from 'drizzle-orm/vercel-postgres'
import { sql } from '@vercel/postgres'
import { eq } from 'drizzle-orm'
import * as schema from '../../database/schema'

export default defineEventHandler(async (event) => {
  const { pid } = await readBody(event)
  const db = drizzle(sql, { schema })
  const episodes = await db.select().from(schema.episodesTable).where(eq(schema.episodesTable.pid, pid))
  return { episodes }
})
