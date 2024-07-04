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
  <div :class="cn('space-y-3', $attrs.class ?? '')">
    <ContextMenu>
      <ContextMenuTrigger>
        <div>
          <img
            :src="props.podcast.image?.middlePicUrl"
            :alt="props.podcast.title"
            crossorigin="anonymous"
            :height="height"
            :width="width"
            class="b b-1 rounded-md  object-cover transition-all hover:scale-105 aspect-square"
          >
        </div>
      </ContextMenuTrigger>
      <ContextMenuContent class="w-40">
        <ContextMenuItem>Add to Library</ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
    <div class="space-y-1 text-sm">
      <h3 class="font-medium leading-none">
        {{ props.podcast.title }}
      </h3>
    </div>
  </div>
</template>
