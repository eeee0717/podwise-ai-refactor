import * as schema from '../../database/schema'
import { db } from '../../utils/db'

export default defineEventHandler(async () => {
  const podcasts = await db.select().from(schema.podcastsTable)
  return { podcasts }
})
