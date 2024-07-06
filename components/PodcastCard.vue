<script setup lang="ts">
import { cn } from '~/lib/utils'
import type { Image, Podcast } from '~/types'

const props = defineProps<{
  podcast: Podcast
  width?: number
  height?: number
}>()

onMounted(() => {
  const img = props.podcast.image as Image
  console.warn(img.middlePicUrl)
})
</script>

<template>
  <ContextMenu>
    <ContextMenuTrigger>
      <div
        :class="cn('p-2 flex flex-row items-center justify-center space-y-3 gap-2 hover:bg-gray-9 rounded-md transition-all hover:scale-105', $attrs.class ?? '')"
      >
        <div>
          <img
            :src="props.podcast.image?.middlePicUrl"
            :alt="props.podcast.title"
            crossorigin="anonymous"
            class="w-100px rounded-md object-cover transition-all aspect-square"
          >
        </div>

        <div class="w-450px flex-row items-center text-sm text-left">
          <h3 class="flex justify-start text-lg font-medium leading-none">
            {{ props.podcast.title }}
          </h3>
          <p class="flex justify-start  ">
            {{ props.podcast.author }}
          </p>
          <p class="flex justify-start leading-normal line-clamp-1 text-ellipsis  max-h-[calc(1.5em*2)] ">
            {{ props.podcast.description }}
          </p>
        </div>
      </div>
    </ContextMenuTrigger>
    <ContextMenuContent class="w-40">
      <ContextMenuItem>Add to Library</ContextMenuItem>
    </ContextMenuContent>
  </ContextMenu>
</template>
