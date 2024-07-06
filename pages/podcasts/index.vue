<script setup lang="ts">
import { fetchDbPodcasts } from '~/composable/usePodcast'
import { usePodcastStore } from '~/store/usePodcastStore'

const podcastStore = usePodcastStore()
onMounted(async () => {
  await fetchDbPodcasts()
  console.warn(podcastStore.podcasts)
})
</script>

<template>
  <div class="flex justify-center p-10 h-screen">
    <div class="justify-center" grid="~ 2xl:cols-3 xl:cols-2 lg:cols-2 md:cols-1 gap-15">
      <PodcastCard
        v-for="podcast in podcastStore.podcasts"
        :key="podcast.pid"
        :podcast="podcast"
        :height="100" :width="100"
        class="h-110px  "
      />
    </div>
  </div>
</template>
