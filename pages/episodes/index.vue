<script setup lang="ts">
import { queryLikedEpisodes } from '~/composable/useEpisode'
import type { Episode } from '~/types'

const episodes = ref<Episode[]>([])
onMounted(async () => {
  const { episodes: data } = await queryLikedEpisodes()
  if (data) {
    episodes.value = data
    console.warn(data)
  }
})
</script>

<template>
  <div>
    <h1>Episodes</h1>
  </div>
</template>
