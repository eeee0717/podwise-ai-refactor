import { jsonParseEnclosure, jsonParseImage, writeEpisodesToDb } from './utils'
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
  const { episodes, statusCode } = await $fetch('/api/episode/list', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ pid }),
  }).then((res) => {
    return { episodes: formatEpisodes(res.episodes), statusCode: res.statusCode }
  })
  return { episodes, statusCode }
}

export function formatEpisodes(episodes: any[] | null): Episode[] {
  if (!episodes) {
    return []
  }
  return episodes.map((episode) => {
    return {
      ...episode,
      // pgsql bug: https://www.cnblogs.com/wggj/p/8194313.html
      shownotes: episode.shownotes ? episode.shownotes?.replace(/\0/g, '') : '',
      image: jsonParseImage(episode.image),
      enclosure: jsonParseEnclosure(episode.enclosure),
    }
  }).sort((a, b) => {
    return new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime()
  })
}
export async function queryEpisodes(pid: string) {
  const episodes = await $fetch('/api/episode/queryAll', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ pid }),
  }).then(res => formatEpisodes(res.episodes))
  console.warn('queryEpisodes', episodes)
  return { episodes }
}
