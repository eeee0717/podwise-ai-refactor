import { eq } from 'drizzle-orm'
import { db } from '../../utils/db'

import * as schema from '../../database/schema'

export default defineEventHandler(async (event) => {
  try {
    const { eid } = getQuery(event)

    if (typeof eid !== 'string' || eid.trim() === '') {
      throw new Error('无效的 eid')
    }

    const episode = await db.query.episodesTable.findFirst({
      where: eq(schema.episodesTable.eid, eid),
    })

    if (!episode) {
      return { error: '未找到对应的剧集' }
    }

    return { episode }
  }
  catch (error) {
    console.error('查询剧集时出错:', error)
    return { error: '查询剧集时发生错误' }
  }
})
