<script setup lang="ts">
import { usePodcastStore } from '~/store/usePodcastStore'

const podcastStore = usePodcastStore()
onMounted(() => {
  if (podcastStore.podcasts[0].episodes === null || podcastStore.podcasts[0].episodes === undefined)
    return
  console.warn('mounted', podcastStore.podcasts[0]?.episodes[0].eid)
})
</script>

<template>
  <div class="flex justify-center p-10 h-screen">
    This is the test page
  </div>
</template>
