<script setup lang="ts">
import { getTranscript, transcribe } from '~/composable/useTencent'
import { type Episode, State, stateIconMap } from '~/types'

const props = defineProps<{
  episode?: Episode
}>()

const transcribeState = ref<State>(State.Idle)
const stateIcon = computed(() => {
  return stateIconMap[transcribeState.value]
})
async function startTranscribing() {
  transcribeState.value = State.Loading
  const { taskId } = await transcribe(props.episode?.enclosure?.url)
  // const { status, result } = await getTranscript(9313393197)
  // console.warn('result', result)
  transcribeState.value = State.Success
}
</script>

<template>
  <div v-if="episode?.transcript" class="transcript-content text-left max-w-full" v-html="episode.transcript " />
  <p v-else>
    <Button variant="outline" class="gap-2" :disabled="transcribeState === State.Loading" @click="startTranscribing">
      <span>Start Transcribing</span>
      <Icon :name="stateIcon.icon" :style="{ color: stateIcon.color }" class="size-6 text-muted-foreground" />
    </Button>
  </p>
</template>

<style scoped>
.transcript-content {
  max-width: 55%;
}
.transcript-content p {
  color:#333333;
  font-weight:normal;
  font-size:16px;
  line-height:20px;
  font-family:Helvetica,Arial,sans-serif;
  hyphens:auto;
  text-align:justify;
}
</style>
