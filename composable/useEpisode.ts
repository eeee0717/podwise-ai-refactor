import { jsonParseEnclosure, jsonParseImage, writeEpisodesToDb } from './utils'
import type { Episode } from '~/types'

export const episodeRegex = /https:\/\/www\.xiaoyuzhoufm\.com\/episode/g

export async function handleFetchEpisode(url: string) {
  const eid = url.split('/').pop()
  if (!eid) {
    return { episode: {} as Episode, statusCode: 400 }
  }
  const { episode, statusCode } = await useFetchEpisode(eid)
  if (!episode) {
    return { episode: {} as Episode, statusCode: 400 }
  }
  await writeEpisodesToDb(episode.pid, [episode])
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

export function formatEpisode(episode: Episode | null): Episode {
  if (!episode) {
    return {} as Episode
  }
  return {
    ...episode,
    // pgsql bug: https://www.cnblogs.com/wggj/p/8194313.html
    shownotes: episode.shownotes ? episode.shownotes?.replace(/\0/g, '') : '',
    image: jsonParseImage(episode.image),
    enclosure: jsonParseEnclosure(episode.enclosure),
  } as Episode
}

export async function queryEpisode(eid: string) {
  const episode = await $fetch(`/api/episode/query?eid=${eid}`).then(res => formatEpisode(res.episode as Episode))
  return { episode }
}
