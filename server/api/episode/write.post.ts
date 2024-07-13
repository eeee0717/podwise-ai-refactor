import { sql } from '@vercel/postgres'
import { drizzle } from 'drizzle-orm/vercel-postgres'
import { eq } from 'drizzle-orm'
import * as schema from '../../database/schema'
import type { Episode } from '~/types'

export async function writeEpisodes(pid: string, episodes: Episode[], isLiked: boolean) {
  try {
    console.warn('pid', pid)
    const db = drizzle(sql, { schema })
    // const existEpisodes: Episode[] = []
    const existEpisodes = await db.select().from(schema.episodesTable).where(eq(schema.episodesTable.pid, pid))
    if (existEpisodes.length === episodes.length) {
      console.warn('existEpisodes length', existEpisodes.length)
      return { episodes: existEpisodes }
    }
    // 存入数据库中不存在的数据，根据eid进行筛选
    const filterEpisodes = episodes.filter((episode: Episode) =>
      !existEpisodes.some(existEpisode => existEpisode.eid === episode.eid),
    )
    console.warn('filterEpisodes', filterEpisodes.length)

    const newDataList = filterEpisodes.map((e: Episode) => {
      return {
        pid: e.pid,
        eid: e.eid,
        title: e.title,
        shownotes: e.shownotes,
        description: e.description,
        enclosure: JSON.stringify(e.enclosure),
        image: e.image ? JSON.stringify(e.image) : JSON.stringify(e.podcast?.image),
        pubDate: e.pubDate,
        isLiked,
      }
    })
    await db.insert(schema.episodesTable).values(newDataList)
  }
  catch (e) {
    console.error('writeEpisodes Error', e)
    return { statusCode: 400 }
  }
}

export default defineEventHandler(async (event) => {
  const { pid, episodes, isLiked } = await readBody(event)
  await writeEpisodes(pid, episodes, isLiked)
  return { statusCode: 200 }
})
