<script setup lang="ts">
import { updateIsLikeEpisode } from '~/composable/useEpisode'
import { cn } from '~/lib/utils'
import type { Episode } from '~/types'

const props = defineProps<{
  episode: Episode
}>()
const episode = ref<Episode>(props.episode)

async function likeEpisode() {
  const { episode: data } = await updateIsLikeEpisode(props.episode.eid, true)
  episode.value = data
}

async function dislikeEpisode() {
  const { episode: data } = await updateIsLikeEpisode(props.episode.eid, false)
  episode.value = data
}
// onMounted(() => {
//   console.warn(props.episode)
// })
</script>

<template>
  <ContextMenu>
    <ContextMenuTrigger>
      <NuxtLink :to="`/episodes/${episode.eid}`">
        <div
          :class="cn('p-2 flex flex-row items-center justify-center space-y-3 gap-2 hover:bg-hex-8883 rounded-md transition-all hover:scale-105', $attrs.class ?? '')"
        >
          <div>
            <img
              :src="episode.image?.smallPicUrl ?? episode.podcast?.image?.smallPicUrl"
              :alt="episode.title ?? ''"
              crossorigin="anonymous"
              class="w-100px rounded-md object-cover transition-all aspect-square"
            >
          </div>

          <div class="w-450px flex-row items-center text-sm text-left">
            <div v-if="episode.isLiked" class="w-full flex text-right justify-end">
              <Icon text-amber name="i-carbon-star-filled" />
            </div>
            <h3 class="flex justify-start text-lg font-medium leading-none">
              {{ episode.title }}
            </h3>

            <p class="flex justify-start leading-normal line-clamp-1 text-ellipsis  max-h-[calc(1.5em*2)] ">
              {{ episode.description }}
            </p>
          </div>
        </div>
      </NuxtLink>
    </ContextMenuTrigger>
    <ContextMenuContent class="w-40">
      <ContextMenuItem v-if="!episode.isLiked" @click="likeEpisode">
        Like the episode
      </ContextMenuItem>
      <ContextMenuItem v-else @click="dislikeEpisode">
        Dislike the episode
      </ContextMenuItem>
    </ContextMenuContent>
  </ContextMenu>
</template>
