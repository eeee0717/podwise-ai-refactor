<script setup lang="ts">
import { cn } from '~/lib/utils'
import type { Podcast } from '~/types'

const props = defineProps<{
  podcast: Podcast
  width?: number
  height?: number
}>()
</script>

<template>
  <ContextMenu>
    <ContextMenuTrigger>
      <div
        :class="cn('p-2 flex flex-row items-center justify-center space-y-3 gap-2 hover:bg-gray-9 rounded-md transition-all', $attrs.class ?? '')"
      >
        <div>
          <img
            :src="props.podcast.image?.middlePicUrl"
            :alt="props.podcast.title"
            crossorigin="anonymous"
            :height="height"
            :width="width"
            class="rounded-md  object-cover transition-all hover:scale-105 aspect-square"
          >
        </div>

        <div class="flex-row items-center text-sm text-left">
          <h3 class="flex justify-start text-lg font-medium leading-none">
            {{ props.podcast.title }}
          </h3>
          <p class="flex justify-start  ">
            {{ props.podcast.author }}
          </p>
          <p class="flex justify-start   ">
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
