import { drizzle } from 'drizzle-orm/vercel-postgres'
import { sql } from '@vercel/postgres'
import { eq } from 'drizzle-orm'
import * as schema from '../../database/schema'

export default defineEventHandler(async () => {
  const db = drizzle(sql, { schema })
  const startTime = Date.now()
  const episodes = await db
    .select({
      eid: schema.episodesTable.eid,
      title: schema.episodesTable.title,
      description: schema.episodesTable.description,
      image: schema.episodesTable.image,
      isLiked: schema.episodesTable.isLiked,
    })
    .from(schema.episodesTable)
    .where(eq(schema.episodesTable.isLiked, true))
  const endTime = Date.now()
  const queryTime = endTime - startTime
  console.warn(`Database query liked time: ${queryTime}ms`)
  return { episodes }
})
