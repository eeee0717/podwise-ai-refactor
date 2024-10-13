import { sql } from '@vercel/postgres'
import { drizzle } from 'drizzle-orm/vercel-postgres'
import { eq } from 'drizzle-orm'
import * as schema from '../../database/schema'
import type { Episode } from '~/types'

async function writeEpisodes(pid: string, episodes: Episode[], isLiked: boolean) {
  const db = drizzle(sql, { schema })
  const existEpisodes = await db.select().from(schema.episodesTable).where(eq(schema.episodesTable.pid, pid))

  if (existEpisodes.length === episodes.length) {
    console.warn('No new episodes to insert')
    return { episodes: existEpisodes }
  }

  const newEpisodes = episodes.filter(episode =>
    !existEpisodes.some(existEpisode => existEpisode.eid === episode.eid),
  )

  if (newEpisodes.length === 0) {
    console.warn('No new episodes to insert')
    return { episodes: existEpisodes }
  }

  const newDataList = newEpisodes.map(e => ({
    pid: e.pid,
    eid: e.eid,
    title: e.title,
    shownotes: e.shownotes,
    description: e.description,
    enclosure: JSON.stringify(e.enclosure),
    image: JSON.stringify(e.image || e.podcast?.image),
    pubDate: e.pubDate,
    isLiked,
  }))

  await db.insert(schema.episodesTable).values(newDataList)
  console.warn(`Inserted ${newDataList.length} new episodes`)
}

export default defineEventHandler(async (event) => {
  const { pid, episodes, isLiked } = await readBody(event)
  console.warn(`Processing ${episodes.length} episodes for podcast ${pid}`)

  const decodedEpisodes = episodes.map((episode: Episode) => ({
    ...episode,
    shownotes: decodeURIComponent(atob(episode.shownotes ?? '')),
  }))

  const startTime = Date.now()
  await writeEpisodes(pid, decodedEpisodes, isLiked)
  console.warn(`Operation completed in ${Date.now() - startTime}ms`)
})
