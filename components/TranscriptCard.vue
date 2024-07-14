<script setup lang="ts">
import { updateTranscriptEpisode } from '~/composable/useEpisode'
import { getTranscript, transcribe } from '~/composable/useTencent'
import { useTranscript } from '~/composable/useTranscript'
import { type Episode, SearchState, TaskStatus, stateIconMap } from '~/types'

const props = defineProps<{
  episode: Episode
}>()

const episode = ref(props.episode)

const transcribeState = ref<SearchState>(SearchState.Idle)
const stateIcon = computed(() => {
  return stateIconMap[transcribeState.value]
})

const transcript = ref<string>('')
const taskStatus = ref<TaskStatus>(TaskStatus.Waiting)

const { pause, resume } = useTimeoutPoll(async () => {
  const { status, result } = await useTranscript(9663376070)
  transcript.value = result
  taskStatus.value = status
}, 5000)

async function startTranscribing() {
  // transcribeState.value = SearchState.Loading
  // const { taskId } = await transcribe(props.episode?.enclosure?.url)
  // test task id 9663376070
  // const { status, result } = await getTranscript(9663376070)
  // const { episode: data } = await updateTranscriptEpisode(props.episode.eid, result)

  // episode.value = data
  // console.warn('result', result)
  // transcribeState.value = SearchState.Success
  resume()
  console.warn('startTranscribing')
}

watchEffect(() => {
  if (taskStatus.value !== TaskStatus.Waiting) {
    pause()
    console.warn('transcript', transcript.value)
  }
})
</script>

<template>
  <div v-if="episode?.transcript" class="max-w-55% text-left whitespace-pre-line" v-html="episode.transcript " />
  <p v-else>
    <Button variant="outline" class="gap-2" :disabled="transcribeState === SearchState.Loading" @click="startTranscribing">
      <span>Start Transcribing</span>
      <Icon :name="stateIcon.icon" :style="{ color: stateIcon.color }" class="size-6 text-muted-foreground" />
    </Button>
  </p>
</template>
