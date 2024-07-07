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
      class="w-full"
    >
      <IntroductionCard :entity="podcast" :img-width="130" />
    </div>
  </div>
</template>
