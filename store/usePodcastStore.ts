import type { Podcast } from '~/types'

export const usePodcastStore = defineStore('podcast', () => {
  const podcast = ref<Podcast | null>(null)

  function setPodcast(newPodcast: Podcast | null) {
    podcast.value = newPodcast
  }
  return { podcast, setPodcast }
})
