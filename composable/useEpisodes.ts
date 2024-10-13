import { apiRequest } from './apiRequest'
import { formatEpisodes } from './common'
import { testApi, testApiInBatches, writeEpisodesToDb, writeEpisodesToDbInBatches } from './utils'

export async function handleFetchEpisodes(pid: string) {
  const { episodes, statusCode } = await apiRequest<{ episodes: any[], statusCode: number }>('/episode/list', 'POST', { pid })
    .then(res => ({
      episodes: formatEpisodes(res.episodes),
      statusCode: res.statusCode,
    }))
  console.warn('handleFetchEpisodes', episodes)
  if (episodes.length > 0) {
    console.warn('writeEpisodesToDb', pid, episodes.length)
    await writeEpisodesToDbInBatches(pid, episodes)
    // await writeEpisodesToDb(pid, episodes)
    // await testApiInBatches(pid, episodes)
  }

  return { episodes, statusCode }
}

export async function queryEpisodes(pid: string) {
  const res = await apiRequest<{ episodes: any[] }>('/episode/queryAll', 'POST', { pid })
  return { episodes: formatEpisodes(res.episodes ?? []) }
}
