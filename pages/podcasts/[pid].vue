<script setup lang="ts">
import { useFetchEpisodes } from '~/composable/useEpisodes'
import { fetchDbPodcasts } from '~/composable/usePodcast'
import { usePodcastStore } from '~/store/usePodcastStore'
import type { Episode, Podcast } from '~/types'

const router = useRouter()
const podcastStore = usePodcastStore()
const podcast = ref<Podcast>()
const episodes = ref<Episode[]>()
const episodesTest = ref<Episode[]>()
onMounted(async () => {
  const pid = router.currentRoute.value.params.pid as string
  await fetchDbPodcasts(pid)
  podcast.value = podcastStore.podcasts.find(podcast => podcast.pid === pid)
  const { episodes: data } = await useFetchEpisodes(podcast.value!.pid)
  if (data) {
    episodes.value = data
    episodesTest.value = episodes.value?.slice(0, 5)
  }
})
</script>

<template>
  <div class="max-h-100vh flex-row justify-center h-full">
    <div
      v-if="podcast"
      class="w-full"
    >
      <IntroductionCard :entity="podcast" :img-width="130" />
    </div>
    <div class="justify-center m-2" grid="~ 2xl:cols-3 xl:cols-2 lg:cols-2 md:cols-1 gap-15 auto-rows-20">
      <EpisodeCard
        v-for="episode in episodes"
        :key="episode.eid"
        :episode="episode"
      />
    </div>
  </div>
</template>
