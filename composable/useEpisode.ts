import type { Enclosure, Episode, Image } from '~/types'

export const episodeRegex = /https:\/\/www\.xiaoyuzhoufm\.com\/episode/g

export async function handleFetchEpisode(url: string) {
  const eid = url.split('/').pop()
  if (!eid) {
    return { episode: {} as Episode, statusCode: 400 }
  }
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
    image: episode.image ? episode.image as Image : {} as Image,
    enclosure: episode.enclosure ? episode.enclosure as Enclosure : {} as Enclosure,
  }
}
