import { jsonParseEnclosure, jsonParseImage, writeEpisodesToDb } from './utils'
import { useEpisodesStore } from '~/store/useEpisodesStore'
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
      image: jsonParseImage(episode.image),
      enclosure: jsonParseEnclosure(episode.enclosure),
    }
  })
}
export async function queryEpisodes(pid: string) {
  const episodes = await $fetch('/api/episode/query', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ pid }),
  }).then(res => formatEpisodes(res.episodes))
  console.warn('queryEpisodes', episodes)
  return { episodes }
}
