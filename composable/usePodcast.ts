import { usePodcastStore } from '~/store/usePodcastStore'
import type { Image, Podcast } from '~/types'

export const podcastRegex = /https:\/\/www\.xiaoyuzhoufm\.com\/podcast/g
export async function useFetchPodcast(pid: string): Promise<{ podcast: Podcast, statusCode: number }> {
  return await $fetch('/api/podcast/get', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ pid }),
  })
}
export async function handleFetchPodcast(url: string) {
  const pid = url.split('/').pop() ?? ''
  if (!pid) {
    return { podcast: null, statusCode: 400 }
  }
  const { podcast, statusCode } = await useFetchPodcast(pid)
  if (!podcast) {
    return { podcast: null, statusCode: 400 }
  }
  const formattedPodcast: Podcast = {
    ...podcast,
    image: JSON.parse(podcast.image?.toString() ?? '{}') as Image,

  }
  const podcastStore = usePodcastStore()
  podcastStore.setPodcast(formattedPodcast)
  return { formattedPodcast, statusCode }
}
