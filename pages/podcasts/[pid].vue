<script setup lang="ts">
import { cn } from '~/lib/utils'
import { usePodcastStore } from '~/store/usePodcastStore'
import type { Podcast } from '~/types'

const router = useRouter()
const podcastStore = usePodcastStore()
const podcast = ref<Podcast>()
onMounted(() => {
  podcast.value = podcastStore.podcasts.find(podcast => podcast.pid === router.currentRoute.value.params.pid)
})
</script>

<template>
  <div class="flex justify-center ">
    <div
      v-if="podcast"
      class="w-screen p-2 flex flex-row   space-y-3 gap-2 hover:bg-hex-8883 rounded-md  hover: bg-gradient-to-br from-cyan-800/10 to-violet-800/10 dark:from-cyan-950 dark:to-violet-950"
    >
      <div>
        <img
          :src="podcast.image?.smallPicUrl"
          :alt="podcast.title ?? ''"
          crossorigin="anonymous"
          class="w-130px rounded-md object-cover transition-all aspect-square"
        >
      </div>

      <div class="w-[calc(98%-130px)] flex-row items-center text-lg text-left">
        <h3 class="flex justify-start text-2xl font-medium leading-none">
          {{ podcast.title }}
        </h3>
        <p class="flex justify-start  ">
          {{ podcast.author }}
        </p>
        <p class="flex justify-start leading-normal line-clamp-1 text-ellipsis  max-h-[calc(1.5em*2)] ">
          {{ podcast.description }}
        </p>
      </div>
    </div>
  </div>
</template>
