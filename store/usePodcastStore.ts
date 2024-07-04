import type { Podcast } from '~/types'

export const usePodcastStore = defineStore('podcast', () => {
  const podcast = ref<Podcast>({})

  function setPodcast(newPodcast: Podcast) {
    podcast.value = newPodcast
  }
  return { podcast, setPodcast }
})
