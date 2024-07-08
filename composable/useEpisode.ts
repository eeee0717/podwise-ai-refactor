import type { Enclosure, Episode, Image } from '~/types'

export const episodeRegex = /https:\/\/www\.xiaoyuzhoufm\.com\/episode/g

export async function handleFetchEpisode(url: string) {
  const eid = url.split('/').pop() ?? ''
  const { episode, statusCode } = await useFetchEpisode(eid)
  return { episode, statusCode }
}

export async function useFetchEpisode(eid: string): Promise<{ episode: Episode, statusCode: number }> {
  const { episode, statusCode } = await $fetch('/api/episode/get', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ eid }),
  }).then((res) => {
    return { episode: formatEpisode(res.episode), statusCode: res.statusCode }
  })
  return { episode, statusCode }
}
export function formatEpisode(episode: any | null): Episode {
  if (!episode) {
    return {} as Episode
  }
  return {
    ...episode,
    image: JSON.parse(episode.image?.toString() ?? '{}') as Image,
    enclosure: JSON.parse(episode.enclosure?.toString() ?? '{}') as Enclosure,
  }
}
