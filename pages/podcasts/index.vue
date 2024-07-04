<script setup lang="ts">
import { usePodcastStore } from '~/store/usePodcastStore'

const podcastStore = usePodcastStore()
</script>

<template>
  <div>
    <PodcastCard :podcast="podcastStore.podcast" :height="100" :width="100" />
  </div>
</template>
