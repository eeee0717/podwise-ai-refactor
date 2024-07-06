import type { Podcast } from '~/types'

export const usePodcastStore = defineStore('podcast', () => {
  const podcasts = ref<Podcast[]>([])

  function setPodcasts(newPodcasts: Podcast[]) {
    podcasts.value = newPodcasts
  }

  function addPodcast(newPodcast: Podcast) {
    podcasts.value.push(newPodcast)
  }

  return { podcasts, setPodcasts, addPodcast }
})
