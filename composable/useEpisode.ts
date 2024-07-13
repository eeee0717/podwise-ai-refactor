import { formatEpisodes } from './useEpisodes'
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
  await writeEpisodesToDb(episode.pid, [episode], true)
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
    // pgsql bug: https://www.cnblogs.com/wggj/p/8194313.html
    shownotes: episode.shownotes ? episode.shownotes?.replace(/\0/g, '') : '',
    image: jsonParseImage(episode.image),
    enclosure: jsonParseEnclosure(episode.enclosure),
  } as Episode
}

export async function queryEpisode(eid: string) {
  const episode = await $fetch(`/api/episode/query?eid=${eid}`).then(res => formatEpisode(res.episode))
  return { episode }
}

export async function queryLikedEpisodes() {
  const episodes = await $fetch('/api/episode/queryLiked', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then(res => formatEpisodes(res.episodes))
  return { episodes }
}

export async function updateIsLikeEpisode(eid: string, isLiked: boolean): Promise<{ episode: Episode }> {
  const episode = await $fetch('/api/episode/updateIsLike', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ eid, isLiked }),
  }).then(res => formatEpisode(res.episode))
  return { episode }
}
