import { jsonParseImage } from './utils'
import { handleFetchEpisodes } from './useEpisodes'
import type { Episode, Podcast } from '~/types'

export const podcastRegex = /https:\/\/www\.xiaoyuzhoufm\.com\/podcast/g

export async function handlePodcast(url: string) {
  const pid = url.split('/').pop()
  if (!pid) {
    return { podcast: {} as Podcast, statusCode: 400 }
  }
  const { podcast, statusCode: podcastStatusCode } = await handleFetchPodcast(pid)
  const { episodes, statusCode: episodeStatusCode } = await handleFetchEpisodes(pid)
  if (podcastStatusCode !== 200 || episodeStatusCode !== 200) {
    return { podcast: {} as Podcast, episodes: [] as Episode[], statusCode: 400 }
  }
  return { podcast, episodes, statusCode: 200 }
}

export async function handleFetchPodcast(pid: string) {
  const { podcast, statusCode } = await useFetchPodcast(pid)
  if (!podcast) {
    return { podcast: {} as Podcast, statusCode: 400 }
  }
  await writePodcastToDb(podcast)
  return { podcast, statusCode }
}

export async function useFetchPodcast(pid: string): Promise<{ podcast: Podcast, statusCode: number }> {
  const { podcast, statusCode } = await $fetch('/api/podcast/get', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ pid }),
  }).then((res) => {
    return { podcast: formatPodcasts([res.podcast])[0], statusCode: res.statusCode }
  })
  return { podcast, statusCode }
}

export async function writePodcastToDb(podcast: Podcast) {
  await $fetch('/api/podcast/write', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ podcast }),
  }) // as { statusCode: number }
}
export function formatPodcast(podcast: any): Podcast {
  return {
    ...podcast,
    image: jsonParseImage(podcast.image),
  }
}

export function formatPodcasts(podcasts: any[]): Podcast[] {
  return podcasts.map((podcast) => {
    return {
      ...podcast,
      image: jsonParseImage(podcast.image),
    }
  })
}

export async function queryPodcast(pid: string) {
  const { podcast } = await $fetch('/api/podcast/query', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ pid }),
  }).then((res) => {
    return { podcast: formatPodcast(res.podcast) }
  })
  console.warn('queryPodcast', podcast)
  return { podcast }
}
export async function queryAllPodcasts() {
  const { podcasts } = await $fetch('/api/podcast/queryAll', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((res) => {
    return { podcasts: formatPodcasts(res.podcasts) }
  })
  console.warn('queryAllPodcasts', podcasts)
  return { podcasts }
}

export async function deletePodcastById(pid: string) {
  await $fetch('/api/podcast/delete', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ pid }),
  })
}
