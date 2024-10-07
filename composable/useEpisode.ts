import { formatEpisodes } from './useEpisodes'
import { writePodcastToDb } from './usePodcast'
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
  await writePodcastToDb(episode.podcast!)
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

export async function updateTranscriptEpisode(eid: string, transcript?: string): Promise<{ episode: Episode }> {
  if (!transcript) {
    return { episode: {} as Episode }
  }
  const episode = await $fetch('/api/episode/updateTranscript', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ eid, transcript }),
  }).then(res => formatEpisode(res.episode))
  return { episode }
}

export async function updateSummaryEpisode(eid: string, summary?: string): Promise<{ episode: Episode }> {
  if (!summary) {
    return { episode: {} as Episode }
  }
  const episode = await $fetch('/api/episode/updateSummary', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ eid, summary }),
  }).then(res => formatEpisode(res.episode))
  return { episode }
}

export async function updateMindmapEpisode(eid: string, mindmap?: string): Promise<{ episode: Episode }> {
  if (!mindmap) {
    return { episode: {} as Episode }
  }
  const episode = await $fetch('/api/episode/updateMindmap', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ eid, mindmap }),
  }).then(res => formatEpisode(res.episode))
  return { episode }
}
