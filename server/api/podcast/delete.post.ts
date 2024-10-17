import { eq } from 'drizzle-orm'
import * as schema from '../../database/schema'

import { db } from '../../utils/db'

export default defineEventHandler(async (event) => {
  const { pid } = await readBody(event)
  await db.delete(schema.episodesTable).where(eq(schema.episodesTable.pid, pid))
  await db.delete(schema.podcastsTable).where(eq(schema.podcastsTable.pid, pid))
  console.warn('deletePodcast', pid)
})
