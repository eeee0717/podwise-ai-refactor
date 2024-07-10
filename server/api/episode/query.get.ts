import { drizzle } from 'drizzle-orm/vercel-postgres'
import { sql } from '@vercel/postgres'
import { eq } from 'drizzle-orm'
import * as schema from '../../database/schema'

export default defineEventHandler(async (event) => {
  const { eid } = getQuery(event)
  const db = drizzle(sql, { schema })
  const episode = await db.select().from(schema.episodesTable).where(eq(schema.episodesTable.eid, eid as string))
  return { episode: episode[0] }
})
