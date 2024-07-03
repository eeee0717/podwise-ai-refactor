import type { Episode } from '~/types'

export const episodeRegex = /https:\/\/www\.xiaoyuzhoufm\.com\/episode/g
export async function useFetchEpisode(eid: string): Promise<{ episode: Episode | null, statusCode: number }> {
  return await $fetch('/api/episode/get', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ eid }),
  })
}
export async function handleFetchEpisode(url: string) {
  const eid = url.split('/').pop() ?? ''
  const { episode, statusCode } = await useFetchEpisode(eid)
  return { episode, statusCode }
}
