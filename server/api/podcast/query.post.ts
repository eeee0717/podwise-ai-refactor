import { eq } from 'drizzle-orm'
import * as schema from '../../database/schema'

import { db } from '../../utils/db'

export default defineEventHandler(async (event) => {
  const { pid } = await readBody(event)
  const podcast = await db.query.podcastsTable.findFirst({
    where: eq(schema.podcastsTable.pid, pid),
  })
  return { podcast }
})
