<script setup lang="ts">
import { computed, ref } from 'vue'
import Mindmap from './Mindmap.vue'
import AnimationButton from './AnimationButton.vue' // 确保路径正确
import { updateMindmapEpisode } from '~/composable/useEpisode'
import useGenerateMindmap from '~/composable/useGenerateMindmap'
import { type Episode, SearchState, stateIconMap } from '~/types'

const props = defineProps<{
  episode: Episode
}>()

const episodeRef = ref(props.episode)
const mindmapStateRef = ref<SearchState>(SearchState.Start)

// 使用计算属性优化性能
const mindmap = computed(() => episodeRef.value.mindmap)

// 使用防抖优化性能
const debouncedGenerateMindmap = useDebounceFn(generate_mindmap, 300)

// 定义状态到动画状态的映射
const statusToStateMap = {
  [SearchState.Start]: 'initial',
  [SearchState.Loading]: 'loading',
  [SearchState.Success]: 'success',
}

async function generate_mindmap() {
  if (!episodeRef.value.summary)
    return

  mindmapStateRef.value = SearchState.Loading
  episodeRef.value.mindmap = ''
  episodeRef.value.mindmap = await useGenerateMindmap(episodeRef.value.summary)

  const { episode: updatedEpisode } = await updateMindmapEpisode(
    episodeRef.value.eid,
    episodeRef.value.mindmap,
  )

  episodeRef.value = updatedEpisode
  mindmapStateRef.value = SearchState.Success
}
</script>

<template>
  <div class="w-4/5 flex flex-col justify-center">
    <div class="flex justify-end">
      <AnimationButton
        :status="mindmapStateRef"
        :status-to-state-map="statusToStateMap"
        :on-click="debouncedGenerateMindmap"
        :disabled="!episodeRef.summary"
      >
        <template #content>
          {{ mindmapStateRef }}
        </template>
        <template #icon>
          <Icon :name="stateIconMap[mindmapStateRef].icon" :style="{ color: stateIconMap[mindmapStateRef].color }" class="size-6 text-muted-foreground" />
        </template>
      </AnimationButton>
    </div>
    <div v-if="mindmap" class="h-screen w-full">
      <Mindmap :mindmap="mindmap" />
    </div>
  </div>
</template>
