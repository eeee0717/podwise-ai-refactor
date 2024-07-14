<script setup lang="ts">
import { updateTranscriptEpisode } from '~/composable/useEpisode'
import { getTranscript, transcribe } from '~/composable/useTencent'
import { type Episode, State, stateIconMap } from '~/types'

const props = defineProps<{
  episode: Episode
}>()

const episode = ref(props.episode)

const transcribeState = ref<State>(State.Idle)
const stateIcon = computed(() => {
  return stateIconMap[transcribeState.value]
})

async function startTranscribing() {
  transcribeState.value = State.Loading
  // const { taskId } = await transcribe(props.episode?.enclosure?.url)
  // test task id 9663376070
  const { status, result } = await getTranscript(9663376070)
  const { episode: data } = await updateTranscriptEpisode(props.episode.eid, result)
  episode.value = data
  console.warn('result', result)
  transcribeState.value = State.Success
}
</script>

<template>
  <div v-if="episode?.transcript" class="max-w-55% text-left whitespace-pre-line" v-html="episode.transcript " />
  <p v-else>
    <Button variant="outline" class="gap-2" :disabled="transcribeState === State.Loading" @click="startTranscribing">
      <span>Start Transcribing</span>
      <Icon :name="stateIcon.icon" :style="{ color: stateIcon.color }" class="size-6 text-muted-foreground" />
    </Button>
  </p>
</template>
