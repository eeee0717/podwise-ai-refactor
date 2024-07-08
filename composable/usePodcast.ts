import { usePodcastStore } from '~/store/usePodcastStore'
import type { Image, Podcast } from '~/types'

export const podcastRegex = /https:\/\/www\.xiaoyuzhoufm\.com\/podcast/g
export async function handleFetchPodcast(url: string) {
  const pid = url.split('/').pop() ?? ''
  let podcast: Podcast | null = null
  if (!pid) {
    return { podcast, statusCode: 400 }
  }
  const response = await useFetchPodcast(pid)
  podcast = response.podcast

  if (!podcast) {
    return { podcast, statusCode: 400 }
  }

  podcast = addPodcast(podcast)
  return { podcast, statusCode: response.statusCode }
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

export function addPodcast(podcast: Podcast) {
  const formattedPodcast = formatPodcasts([podcast])[0]
  const podcastStore = usePodcastStore()
  podcastStore.addPodcast(formattedPodcast)
  return formattedPodcast
}

export function formatPodcasts(podcasts: any[]): Podcast[] {
  return podcasts.map((podcast) => {
    return {
      ...podcast,
      image: JSON.parse(podcast.image?.toString() ?? '{}') as Image,
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
