import { apiRequest } from './apiRequest'
import { formatEpisode, formatEpisodeBasic, formatEpisodesBasic } from './common'
import { writePodcastToDb } from './usePodcast'
import { writeEpisodesToDb } from './utils'
import type { Episode, EpisodeBasic } from '~/types'

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

async function updateEpisodeField<T extends keyof Episode>(
  eid: string,
  field: T,
  value: Episode[T],
): Promise<{ episode: Episode }> {
  if (!value) {
    return { episode: {} as Episode }
  }
  const episode = await apiRequest<{ episode: Episode }>(
    `/episode/update${field.charAt(0).toUpperCase() + field.slice(1)}`,
    'POST',
    { eid, [field]: value },
  ).then(res => formatEpisode(res.episode))
  return { episode }
}

type EpisodeUpdateFields = 'transcript' | 'summary' | 'mindmap'

function createEpisodeUpdater<T extends EpisodeUpdateFields>(field: T) {
  return async (eid: string, value?: Episode[T]): Promise<{ episode: Episode }> => {
    return updateEpisodeField(eid, field, value)
  }
}

export async function queryEpisode(eid: string) {
  const episode = await apiRequest<{ episode: any }>(`/episode/query`, 'GET', { eid })
    .then(res => formatEpisode(res.episode))
  return { episode }
}

export async function queryLikedEpisodes() {
  const episodes = await apiRequest<{ episodes: any[] }>('/episode/queryLiked', 'POST')
    .then(res => formatEpisodesBasic(res.episodes))
  return { episodes }
}

export async function updateIsLikeEpisode(eid: string, isLiked: boolean): Promise<{ episode: EpisodeBasic }> {
  const episode = await apiRequest<{ episode: any }>('/episode/updateIsLike', 'POST', { eid, isLiked })
    .then(res => formatEpisodeBasic(res.episode))
  return { episode }
}

export const updateTranscriptEpisode = createEpisodeUpdater('transcript')
export const updateSummaryEpisode = createEpisodeUpdater('summary')
export const updateMindmapEpisode = createEpisodeUpdater('mindmap')
