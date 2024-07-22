import { drizzle } from 'drizzle-orm/vercel-postgres'
import { sql } from '@vercel/postgres'
import { eq } from 'drizzle-orm'
import * as schema from '../../database/schema'

export default defineEventHandler(async (event) => {
  const { eid, summary } = await readBody(event)
  const db = drizzle(sql, { schema })
  const episode = (await db.update(schema.episodesTable).set({ summary }).where(eq(schema.episodesTable.eid, eid)).returning())[0]
  // console.warn('episode', episode)
  return { episode }
})
