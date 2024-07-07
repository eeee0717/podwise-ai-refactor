<script setup lang="ts">
import { cn } from '~/lib/utils'
import { usePodcastStore } from '~/store/usePodcastStore'
import type { Podcast } from '~/types'

const router = useRouter()
const podcastStore = usePodcastStore()
const podcast = ref<Podcast>()
onMounted(() => {
  podcast.value = podcastStore.podcasts.find(podcast => podcast.pid === router.currentRoute.value.params.pid)
  console.warn(podcast.value?.episodes)
})
</script>

<template>
  <div class="flex justify-center ">
    <div
      v-if="podcast"
      class="w-screen p-2 flex flex-row   space-y-3 gap-2 hover:bg-hex-8883 rounded-md  hover: bg-gradient-to-br from-cyan-800/10 to-violet-800/10 dark:from-cyan-950 dark:to-violet-950"
    >
      <IntroductionCard :entity="podcast" :img-width="130" />
    </div>
  </div>
</template>
