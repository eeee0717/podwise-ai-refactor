<script setup lang="ts">
import Mindmap from './Mindmap.vue'
import { updateMindmapEpisode } from '~/composable/useEpisode'
import useGenerateMindmap from '~/composable/useGenerateMindmap'
import type { Episode } from '~/types'

const props = defineProps<{
  episode: Episode
}>()
const episodeRef = ref(props.episode)

async function generate_mindmap() {
  // console.warn('generate_mindmap', episodeRef.value.summary)
  episodeRef.value.mindmap = ''
  episodeRef.value.mindmap = await useGenerateMindmap(episodeRef.value.summary ?? '')
  const { episode: updatedEpisode } = await updateMindmapEpisode(episodeRef.value.eid, episodeRef.value.summary ?? '')
  episodeRef.value = updatedEpisode
}
</script>

<template>
  <div class="w-80%  flex flex-col justify-center">
    <div class="flex justify-end">
      <Button variant="outline" class="gap-2" @click="generate_mindmap">
        <span>Generate Mindmap</span>
        <Icon name="i-carbon-ai-status" />
      </Button>
    </div>
    <div class=" h-screen w-full" border="~ amber">
      <Mindmap v-if="episodeRef?.mindmap" :mindmap="episodeRef?.mindmap" />
    </div>
  </div>
</template>
