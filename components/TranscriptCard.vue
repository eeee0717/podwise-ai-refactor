<script setup lang="ts">
import { updateTranscriptEpisode } from '~/composable/useEpisode'
import { transcribe } from '~/composable/useTencent'
import { useTranscript } from '~/composable/useTranscript'
import { type Episode, SearchState, TaskStatus, stateIconMap } from '~/types'

const props = defineProps<{
  episode: Episode
}>()

const episodeRef = ref(props.episode)
const taskIdRef = ref<number>(0)
const transcriptStateRef = ref<SearchState>(SearchState.Idle)
const stateIconRef = computed(() => stateIconMap[transcriptStateRef.value])
const taskStatusRef = ref<TaskStatus>(TaskStatus.Waiting)

const { pause, resume } = useTimeoutPoll(async () => {
  await useTranscript(taskIdRef.value, episodeRef, taskStatusRef)
}, 20000)

async function startTranscribing() {
  return
  transcriptStateRef.value = SearchState.Loading
  const { taskId } = await transcribe(episodeRef.value.enclosure?.url)
  if (taskId === -1) {
    transcriptStateRef.value = SearchState.Error
    return
  }
  taskIdRef.value = taskId
  resume()
}

async function exportTranscript() {
  // 实现导出功能
}

watchEffect(async () => {
  if (taskStatusRef.value === TaskStatus.Finish) {
    pause()
    const { episode: updatedEpisode } = await updateTranscriptEpisode(episodeRef.value.eid, episodeRef.value.transcript ?? '')
    episodeRef.value = updatedEpisode
  }
})
</script>

<template>
  <div class="flex flex-col justify-center max-w-55%">
    <div class="flex justify-end">
      <Button v-if="!episodeRef?.transcript" variant="outline" class="gap-2" :disabled="transcriptStateRef === SearchState.Loading" @click="startTranscribing">
        <span>开始转录</span>
        <Icon :name="stateIconRef.icon" :style="{ color: stateIconRef.color }" class="size-6 text-muted-foreground" />
      </Button>
      <Button v-else variant="outline" class="gap-2" @click="exportTranscript">
        <span>导出</span>
        <Icon name="i-carbon-export" />
      </Button>
    </div>
    <div v-if="episodeRef?.transcript" class="w-full flex justify-center">
      <div class="text-left whitespace-pre-line" v-html="episodeRef.transcript" />
    </div>
  </div>
</template>
