import { apiRequest } from './apiRequest'
import { formatEpisodes } from './common'
import { writeEpisodesToDb } from './utils'
import type { Episode } from '~/types'

export async function handleFetchEpisodes(pid: string) {
  const { episodes, statusCode } = await useFetchEpisodes(pid)
  if (!episodes) {
    return { episodes: [] as Episode[], statusCode: 400 }
  }
  await writeEpisodesToDb(pid, episodes)
  return { episodes, statusCode }
}
export async function useFetchEpisodes(pid: string): Promise<{ episodes: Episode[], statusCode: number }> {
  const { episodes, statusCode } = await apiRequest<{ episodes: any[], statusCode: number }>('/episode/list', 'POST', { pid })
    .then(res => ({
      episodes: formatEpisodes(res.episodes),
      statusCode: res.statusCode,
    }))
  return { episodes, statusCode }
}

export async function queryEpisodes(pid: string) {
  const episodes = await apiRequest<{ episodes: any[] }>('/episode/queryAll', 'POST', { pid })
    .then(res => formatEpisodes(res.episodes))
  return { episodes }
}
