<script setup lang="ts">
import { cn } from '~/lib/utils'
import type { Episode, Podcast } from '~/types'

const props = defineProps<{
  entity: Podcast | Episode
  imgWidth?: number
}>()
</script>

<template>
  <div class="w-full p-2 flex flex-row   space-y-3 gap-2  rounded-md bg-gradient-to-br from-cyan-800/10 to-violet-800/10 dark:from-cyan-950 dark:to-violet-950">
    <div>
      <img
        :src="props.entity.image?.smallPicUrl"
        :alt="props.entity.title ?? ''"
        crossorigin="anonymous"
        :class="cn(`w-${imgWidth}px`, 'rounded-md object-cover transition-all aspect-square') "
      >
    </div>

    <div :class="cn(`max-w-[calc(98%-${imgWidth}px)]`, 'flex-row items-center  text-left')">
      <h3 class="flex justify-start text-2xl font-medium leading-none">
        {{ props.entity.title }}
      </h3>
      <p v-if="'author' in props.entity" class="text-lg flex justify-start  ">
        {{ props.entity.author }}
      </p>
      <p class="max-w-1100px text-lg flex justify-start leading-normal line-clamp-1 text-ellipsis  max-h-[calc(1.5em*2)] ">
        {{ props.entity.description }}
      </p>
    </div>
  </div>
</template>
