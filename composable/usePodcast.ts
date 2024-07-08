import { jsonParseImage } from './utils'
import { handleFetchEpisodes } from './useEpisodes'
import { usePodcastStore } from '~/store/usePodcastStore'
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
  const { statusCode } = await $fetch('/api/podcast/write', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ podcast }),
  })
  return { statusCode }
}

export function formatPodcasts(podcasts: any[]): Podcast[] {
  return podcasts.map((podcast) => {
    return {
      ...podcast,
      image: jsonParseImage(podcast.image),
    }
  })
}

/// fetch all podcasts from db when page on mounted
export async function fetchDbPodcasts() {
  const { podcasts } = await $fetch('/api/podcast/query').then((res) => {
    return { podcasts: formatPodcasts(res.podcasts) }
  })
  const podcastStore = usePodcastStore()
  podcastStore.setPodcasts(podcasts)
}
