import { useEpisodesStore } from '~/store/useEpisodesStore'
import type { Episode } from '~/types'

export async function useFetchEpisodes(pid: string): Promise<{ episodes: Episode[] | null, statusCode: number }> {
  return await $fetch('/api/episode/list', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ pid }),
  })
}
export async function handleFetchEpisodes(url: string) {
  const pid = url.split('/').pop() ?? ''
  const { episodes, statusCode } = await useFetchEpisodes(pid)
  const episodesStore = useEpisodesStore()
  episodesStore.setEpisodes(episodes ?? [])
  console.warn('episodes', episodes)
  return { episodes, statusCode }
}
