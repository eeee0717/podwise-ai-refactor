import { eq } from 'drizzle-orm'
import { db } from '../../utils/db'
import * as schema from '../../database/schema'

export default defineEventHandler(async (event) => {
  const { eid } = getQuery(event)

  const episode = await db.query.episodesTable.findFirst({
    where: eq(schema.episodesTable.eid, eid as string),
  })

  return { episode: episode || {} }
})
