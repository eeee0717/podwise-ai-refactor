<script setup lang="ts">
import { updateTranscriptEpisode } from '~/composable/useEpisode'
import { getTranscript, transcribe } from '~/composable/useTencent'
import { useTranscript } from '~/composable/useTranscript'
import { type Episode, SearchState, TaskStatus, stateIconMap } from '~/types'

const props = defineProps<{
  episode: Episode
}>()

const episode = ref(props.episode)

const taskId = ref<number>(0)
const transcribeState = ref<SearchState>(SearchState.Idle)
const stateIcon = computed(() => {
  return stateIconMap[transcribeState.value]
})

const taskStatus = ref<TaskStatus>(TaskStatus.Waiting)

const { pause, resume } = useTimeoutPoll(async () => {
  console.warn('polling', taskId.value)
  const { status, result } = await useTranscript(9715816572)
  episode.value.transcript = result
  taskStatus.value = status
}, 5000)

async function startTranscribing() {
  transcribeState.value = SearchState.Loading
  const { taskId: id } = await transcribe(props.episode?.enclosure?.url)
  if (id === -1) {
    transcribeState.value = SearchState.Error
  }
  taskId.value = id
  // test task id 9663376070
  // const { status, result } = await getTranscript(9663376070)
  // const { episode: data } = await updateTranscriptEpisode(props.episode.eid, result)

  // episode.value = data
  // console.warn('result', result)
  // transcribeState.value = SearchState.Success
  resume()
}

watchEffect(async () => {
  if (taskStatus.value === TaskStatus.Finish) {
    pause()
    const { episode: data } = await updateTranscriptEpisode(episode.value.eid, episode.value.transcript!)
    episode.value = data
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
