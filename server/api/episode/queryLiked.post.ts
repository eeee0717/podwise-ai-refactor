import { eq } from 'drizzle-orm'
import { db } from '../../utils/db'
import * as schema from '../../database/schema'

export default defineEventHandler(async () => {
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

  return { episodes }
})
