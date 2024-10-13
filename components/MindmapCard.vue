<script setup lang="ts">
import { computed, ref } from 'vue'
import Mindmap from './Mindmap.vue'
import { updateMindmapEpisode } from '~/composable/useEpisode'
import useGenerateMindmap from '~/composable/useGenerateMindmap'
import type { Episode } from '~/types'

const props = defineProps<{
  episode: Episode
}>()

const episodeRef = ref(props.episode)

// 使用计算属性优化性能
const mindmap = computed(() => episodeRef.value.mindmap)

// 使用防抖优化性能
const debouncedGenerateMindmap = useDebounceFn(generate_mindmap, 300)

async function generate_mindmap() {
  if (!episodeRef.value.summary)
    return

  episodeRef.value.mindmap = ''
  episodeRef.value.mindmap = await useGenerateMindmap(episodeRef.value.summary)

  const { episode: updatedEpisode } = await updateMindmapEpisode(
    episodeRef.value.eid,
    episodeRef.value.mindmap,
  )

  episodeRef.value = updatedEpisode
}
</script>

<template>
  <div class="w-4/5 flex flex-col justify-center">
    <div class="flex justify-end">
      <Button
        variant="outline"
        class="gap-2"
        :disabled="!episodeRef.summary"
        @click="debouncedGenerateMindmap"
      >
        <span>生成思维导图</span>
        <Icon name="i-carbon-ai-status" />
      </Button>
    </div>
    <div v-if="mindmap" class="h-screen w-full">
      <Mindmap :mindmap="mindmap" />
    </div>
  </div>
</template>
