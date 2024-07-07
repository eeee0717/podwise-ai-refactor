<script setup lang="ts">
import { usePodcastStore } from '~/store/usePodcastStore'
import type { Podcast } from '~/types'

const router = useRouter()
const podcastStore = usePodcastStore()
const podcast = ref<Podcast>()
onMounted(() => {
  podcast.value = podcastStore.podcasts.find(podcast => podcast.pid === router.currentRoute.value.params.pid)
  console.warn(podcast.value)
})
</script>

<template>
  <div>
    {{ router.currentRoute.value.fullPath }}
  </div>
</template>
