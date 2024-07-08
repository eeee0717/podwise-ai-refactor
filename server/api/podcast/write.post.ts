import { sql } from '@vercel/postgres'
import { drizzle } from 'drizzle-orm/vercel-postgres'
import { eq } from 'drizzle-orm'
import * as schema from '../../database/schema'
import type { Podcast } from '~/types'

export async function writePodcast(podcast: Podcast) {
  try {
    const db = drizzle(sql, { schema })
    const result = await db.select().from(schema.podcastsTable).where(eq(schema.podcastsTable.pid, podcast.pid))
    if (result.length > 0) {
      console.warn('podcast already exists')
      return { podcast: result[0] }
    }
    const newData = {
      pid: podcast.pid,
      title: podcast.title,
      author: podcast.author,
      description: podcast.description,
      image: JSON.stringify(podcast.image),
    }
    await db.insert(schema.podcastsTable).values(newData)
  }
  catch (e) {
    console.error('writePodcast Error', e)
    return { statusCode: 400 }
  }
}

export default defineEventHandler(async (event) => {
  const { podcast } = await readBody(event)
  console.warn('podcast', podcast)
  await writePodcast(podcast)
  return { statusCode: 200 }
})
