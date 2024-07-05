import { sql } from '@vercel/postgres'
import { drizzle } from 'drizzle-orm/vercel-postgres'
import * as schema from '../../database/schema'
import type { Podcast } from '~/types'

export default defineEventHandler(async (event) => {
  interface RequestBody {
    name: string
    data: Podcast
  }
  const { name, data }: RequestBody = await readBody(event)
  const db = drizzle(sql, { schema })
  const newData = {
    pid: data.pid,
    title: data.title,
    author: data.author,
    description: data.description,
    image: data.image?.middlePicUrl,
  }
  const podcast = await db.insert(schema.podcastsTable).values(newData).returning()
  console.warn('podcast', podcast)
})
