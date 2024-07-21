<script setup lang="ts">
import { updateTranscriptEpisode } from '~/composable/useEpisode'
import { getTranscript, transcribe } from '~/composable/useTencent'
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
}, 5000)

async function startTranscribing() {
  transcriptStateRef.value = SearchState.Loading
  const { taskId } = await transcribe(episodeRef.value.enclosure?.url)
  if (taskId === -1) {
    transcriptStateRef.value = SearchState.Error
    return
  }
  taskIdRef.value = taskId
  resume()
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
  <div v-if="episodeRef?.transcript" class="max-w-55% text-left whitespace-pre-line" v-html="episodeRef.transcript " />
  <p v-else>
    <Button variant="outline" class="gap-2" :disabled="transcriptStateRef === SearchState.Loading" @click="startTranscribing">
      <span>Start Transcribing</span>
      <Icon :name="stateIconRef.icon" :style="{ color: stateIconRef.color }" class="size-6 text-muted-foreground" />
    </Button>
  </p>
</template>
