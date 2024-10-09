<script setup lang="ts">
import { updateSummaryEpisode } from '~/composable/useEpisode'
import { fetchStreamSummary, fetchSummary } from '~/composable/useSummary'
import type { Episode } from '~/types'

const props = defineProps<{
  episode: Episode
}>()
const episodeRef = ref(props.episode)
const isStream = ref(true)

// 使用计算属性优化性能
const summary = computed(() => episodeRef.value.summary)

// 使用防抖优化性能
const debouncedHandleSummary = useDebounceFn(handleSummary, 300)

async function handleSummary() {
  episodeRef.value.summary = ''
  if (isStream.value) {
    await streamSummary()
  }
  else {
    await fetchAndUpdateSummary()
  }
}

async function fetchAndUpdateSummary() {
  const newSummary = await fetchSummary(episodeRef.value.transcript ?? '')
  await updateSummaryAndEpisode(newSummary)
}

async function streamSummary() {
  const stream = await fetchStreamSummary(episodeRef.value.transcript ?? '')
  const reader = stream.getReader()
  const decoder = new TextDecoder()

  try {
    while (true) {
      const { done, value } = await reader.read()
      if (done)
        break
      episodeRef.value.summary += decoder.decode(value)
    }
  }
  finally {
    reader.releaseLock()
  }

  await updateSummaryAndEpisode(episodeRef.value.summary ?? '')
}

async function updateSummaryAndEpisode(newSummary: string) {
  const { episode: updatedEpisode } = await updateSummaryEpisode(episodeRef.value.eid, newSummary)
  episodeRef.value = updatedEpisode
}
</script>

<template>
  <div class="flex flex-col justify-center max-w-55%">
    <div class="flex justify-end">
      <Button variant="outline" class="gap-2" @click="debouncedHandleSummary">
        <span>Summary</span>
        <Icon name="i-carbon-ai-status" />
      </Button>
    </div>
    <div class="w-full flex justify-center">
      <div v-if="summary" class="text-left whitespace-pre-line" v-html="summary" />
    </div>
  </div>
</template>
