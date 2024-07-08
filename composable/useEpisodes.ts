import { useEpisodesStore } from '~/store/useEpisodesStore'
import type { Enclosure, Episode, Image } from '~/types'

export async function handleFetchEpisodes(url: string) {
  const pid = url.split('/').pop() ?? ''
  const { episodes, statusCode } = await useFetchEpisodes(pid)
  const episodesStore = useEpisodesStore()
  episodesStore.setEpisodes(episodes ?? [])
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

export async function queryEpisodes(pid: string) {
  const episodes = await $fetch('/api/episode/query', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ pid }),
  }).then(res => formatEpisodes(res.episodes))
  return { episodes }
}

export function formatEpisodes(episodes: any[] | null): Episode[] {
  if (!episodes) {
    return []
  }
  return episodes.map((episode) => {
    return {
      ...episode,
      image: JSON.parse(episode.image?.toString() ?? '{}') as Image,
      enclousure: JSON.parse(episode.enclosure?.toString() ?? '{}') as Enclosure,
    }
  })
}
