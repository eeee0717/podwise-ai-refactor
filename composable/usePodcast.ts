import { usePodcastStore } from '~/store/usePodcastStore'

export const podcastRegex = /https:\/\/www\.xiaoyuzhoufm\.com\/podcast/g
export async function useFetchPodcast(pid: string) {
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
  const { podcast, statusCode } = await useFetchPodcast(pid)
  const podcastStore = usePodcastStore()
  podcastStore.setPodcast(podcast ?? null)
  console.warn(podcast)
  return { podcast, statusCode }
}
