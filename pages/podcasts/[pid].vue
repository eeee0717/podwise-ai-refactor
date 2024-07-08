<script setup lang="ts">
import { useFetchEpisodes } from '~/composable/useEpisodes'
import { cn } from '~/lib/utils'
import { usePodcastStore } from '~/store/usePodcastStore'
import type { Episode, Podcast } from '~/types'

const router = useRouter()
const podcastStore = usePodcastStore()
const podcast = ref<Podcast>()
const episodes = ref<Episode[]>()
onMounted(async () => {
  podcast.value = podcastStore.podcasts.find(podcast => podcast.pid === router.currentRoute.value.params.pid)
  // const { episodes: data, statusCode } = await useFetchEpisodes(podcast.value!.pid)
  // if (statusCode === 200 && data !== null && data !== undefined)
  //   episodes.value = data
  // console.warn(episodes.value?.length)
})
</script>

<template>
  <div class="flex justify-center ">
    <div
      v-if="podcast"
      class="w-full"
    >
      <IntroductionCard :entity="podcast" :img-width="130" />
    </div>
  </div>
</template>
