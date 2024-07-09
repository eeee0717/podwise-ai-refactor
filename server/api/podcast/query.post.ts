import { drizzle } from 'drizzle-orm/vercel-postgres'
import { sql } from '@vercel/postgres'
import * as schema from '../../database/schema'

export default defineEventHandler(async (event) => {
  const { pidList } = await readBody(event)
  const db = drizzle(sql, { schema })
  const podcasts = await db.select().from(schema.podcastsTable)
  if (!pidList) {
    return { podcasts }
  }
  else {
    return { podcasts: podcasts.filter(podcast => pidList.includes(podcast.pid)) ?? [] }
  }
})
