import { eq } from 'drizzle-orm'
import * as schema from '../../database/schema'
import { db } from '../../utils/db'

// export default defineEventHandler(async (event) => {
//   const { pid } = await readBody(event)
//   const db = drizzle(sql, { schema })
//   const episodes = await db.select().from(schema.episodesTable).where(eq(schema.episodesTable.pid, pid))
//   return { episodes }
// })

export default defineCachedEventHandler(async (event) => {
  const { pid } = await readBody(event)
  const episodes = await db.select().from(schema.episodesTable).where(eq(schema.episodesTable.pid, pid))
  return { episodes }
}, {
  maxAge: 1 * 10,
  getKey: async (event) => {
    const { pid } = await readBody(event)
    return `episodes-${pid}`
  },
})
