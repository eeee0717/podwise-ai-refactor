import { sql } from '@vercel/postgres'
import { drizzle } from 'drizzle-orm/vercel-postgres'
import { eq } from 'drizzle-orm'
import * as schema from '../../database/schema'

export default defineEventHandler(async (event) => {
  const { data } = await readBody(event)
  const db = drizzle(sql, { schema })
  const result = await db.select().from(schema.podcastsTable).where(eq(schema.podcastsTable.pid, data.pid))
  if (result.length > 0) {
    // console.warn('podcast already exists', result)
    return { podcast: result[0] }
  }
  const newData = {
    pid: data.pid,
    title: data.title,
    author: data.author,
    description: data.description,
    image: JSON.stringify(data.image),
  }
  const podcast = await db.insert(schema.podcastsTable).values(newData).returning()
  return { podcast }
})
