<script setup lang="ts">
import { usePodcastStore } from '~/store/usePodcastStore'

const podcastStore = usePodcastStore()
</script>

<template>
  <div class="flex justify-center p-10 h-screen">
    <div class="justify-center" grid="~ 2xl:cols-3 xl:cols-2 lg:cols-2 md:cols-1 gap-15">
      <PodcastCard
        class=" h-110px w-auto max-w-600 "
        :podcast="podcastStore.podcast" :height="100" :width="100"
      />
    </div>
  </div>
</template>
