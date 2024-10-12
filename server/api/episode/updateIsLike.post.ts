import { drizzle } from 'drizzle-orm/vercel-postgres'
import { sql } from '@vercel/postgres'
import { eq } from 'drizzle-orm'
import * as schema from '../../database/schema'

export default defineEventHandler(async (event) => {
  const { eid, isLiked } = await readBody(event)
  const db = drizzle(sql, { schema })
  const episode = (await db.update(schema.episodesTable)
    .set({ isLiked })
    .where(eq(schema.episodesTable.eid, eid))
    .returning({
      eid: schema.episodesTable.eid,
      title: schema.episodesTable.title,
      description: schema.episodesTable.description,
      image: schema.episodesTable.image,
      isLiked: schema.episodesTable.isLiked,
    }))[0]

  // console.warn('episode', episode)
  return { episode }
})
