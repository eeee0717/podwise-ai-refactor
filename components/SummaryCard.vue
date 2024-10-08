<script setup lang="ts">
import { updateSummaryEpisode } from '~/composable/useEpisode'
import { fetchStreamSummary, fetchSummary } from '~/composable/useSummary'
import type { Episode } from '~/types'

const props = defineProps<{
  episode: Episode
}>()
const episodeRef = ref(props.episode)
const isStream = ref(false)

async function handleSummary() {
  if (isStream.value) {
    await streamSummary()
  }
  else {
    await summary()
  }
}

async function summary() {
  // console.warn('summary', episodeRef.value.transcript)
  episodeRef.value.summary = ''
  episodeRef.value.summary = await fetchSummary(episodeRef.value.transcript ?? '')
  const { episode: updatedEpisode } = await updateSummaryEpisode(episodeRef.value.eid, episodeRef.value.summary ?? '')
  episodeRef.value = updatedEpisode
}
async function streamSummary() {
  episodeRef.value.summary = ''
  const stream = await fetchStreamSummary(episodeRef.value.transcript ?? '')
  const reader = stream.getReader()

  while (true) {
    const { done, value } = await reader.read()
    console.warn('value', new TextDecoder().decode(value))
    if (done)
      break
    episodeRef.value.summary += new TextDecoder().decode(value)
  }

  // 更新数据库
  const { episode: updatedEpisode } = await updateSummaryEpisode(episodeRef.value.eid, episodeRef.value.summary ?? '')
  episodeRef.value = updatedEpisode
}
</script>

<template>
  <div class="flex flex-col justify-center max-w-55%">
    <div class="flex justify-end">
      <Button variant="outline" class="gap-2" @click="handleSummary">
        <span>Summary</span>
        <Icon name="i-carbon-ai-status" />
      </Button>
    </div>
    <div class="w-full flex justify-center">
      <div v-show="episodeRef?.summary" class=" text-left whitespace-pre-line" v-html="episodeRef.summary " />
    </div>
  </div>
</template>
