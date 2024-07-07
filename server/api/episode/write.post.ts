import { sql } from '@vercel/postgres'
import { drizzle } from 'drizzle-orm/vercel-postgres'
import { eq } from 'drizzle-orm'
import * as schema from '../../database/schema'
import type { Episode } from '~/types'

export default defineEventHandler(async (event) => {
  const { pid, data } = await readBody(event)
  const db = drizzle(sql, { schema })
  const existEpisodes = await db.select().from(schema.episodesTable).where(eq(pid, data[0].pid))
  if (existEpisodes.length === data.length) {
    console.warn('existEpisodes length', existEpisodes.length)
    console.warn('data length', data.length)
    return { episodes: existEpisodes }
  }
  // 存入数据库中不存在的数据，根据eid进行筛选
  const filterEpisodes = data.filter((episode: Episode) =>
    !existEpisodes.some(existEpisode => existEpisode.eid === episode.eid),
  )

  const newDataList = filterEpisodes.map((e: Episode) => {
    return {
      pid: e.pid,
      eid: e.eid,
      title: e.title,
      description: e.description,
      enclosure: JSON.stringify(e.enclosure),
      image: e.image ? JSON.stringify(e.image) : JSON.stringify(e.podcast?.image),
    }
  })
  await db.insert(schema.episodesTable).values(newDataList)
  const episodes = await db.select().from(schema.episodesTable).where(eq(pid, data[0].pid))
  return { episodes }
})
