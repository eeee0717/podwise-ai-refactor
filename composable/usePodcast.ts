import { usePodcastStore } from '~/store/usePodcastStore'
import type { Image, Podcast } from '~/types'

export const podcastRegex = /https:\/\/www\.xiaoyuzhoufm\.com\/podcast/g
export async function handleFetchPodcast(url: string) {
  const pid = url.split('/').pop()
  if (!pid) {
    return { podcast: {} as Podcast, statusCode: 400 }
  }
  const { podcast, statusCode } = await useFetchPodcast(pid)
  if (!podcast) {
    return { podcast, statusCode }
  }
  await addPodcast(podcast)
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

export async function addPodcast(podcast: Podcast) {
  const podcastStore = usePodcastStore()
  podcastStore.addPodcast(podcast)
}

export function formatPodcasts(podcasts: any[]): Podcast[] {
  return podcasts.map((podcast) => {
    return {
      ...podcast,
      image: podcast.image ? podcast.image as Image : {} as Image,
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
