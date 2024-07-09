<script setup lang="ts">
import { cn } from '~/lib/utils'
import type { Episode } from '~/types'

const props = defineProps<{
  episode: Episode
}>()
</script>

<template>
  <ContextMenu>
    <ContextMenuTrigger>
      <NuxtLink :to="`/podcasts/${props.episode.eid}`">
        <div
          :class="cn('p-2 flex flex-row items-center justify-center space-y-3 gap-2 hover:bg-hex-8883 rounded-md transition-all hover:scale-105', $attrs.class ?? '')"
        >
          <div>
            <img
              :src="props.episode.image?.smallPicUrl ?? props.episode.podcast?.image?.smallPicUrl"
              :alt="props.episode.title ?? ''"
              crossorigin="anonymous"
              class="w-100px rounded-md object-cover transition-all aspect-square"
            >
          </div>

          <div class="w-450px flex-row items-center text-sm text-left">
            <h3 class="flex justify-start text-lg font-medium leading-none">
              {{ props.episode.title }}
            </h3>

            <p class="flex justify-start leading-normal line-clamp-1 text-ellipsis  max-h-[calc(1.5em*2)] ">
              {{ props.episode.description }}
            </p>
          </div>
        </div>
      </NuxtLink>
    </ContextMenuTrigger>
    <ContextMenuContent class="w-40">
      <ContextMenuItem>Add to Library</ContextMenuItem>
    </ContextMenuContent>
  </ContextMenu>
</template>
