import { drizzle } from 'drizzle-orm/vercel-postgres'
import { sql } from '@vercel/postgres'
import { eq } from 'drizzle-orm'
import * as schema from '../../database/schema'

export default defineEventHandler(async (event) => {
  const { eid } = getQuery(event)
  const db = drizzle(sql, { schema })
  const startTime = Date.now()
  const episode = await db.select().from(schema.episodesTable).where(eq(schema.episodesTable.eid, eid as string))
  const endTime = Date.now()
  const queryTime = endTime - startTime
  console.warn(`Database query time: ${queryTime}ms`)

  return { episode: episode[0] }
})
