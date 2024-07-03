import type { Episode } from '~/types'

export const useEpisodesStore = defineStore('episodes', () => {
  const episodes = ref<Episode[]>([])

  function setEpisodes(newEpisodes: Episode[]) {
    episodes.value = newEpisodes
  }
  return { episodes, setEpisodes }
})
