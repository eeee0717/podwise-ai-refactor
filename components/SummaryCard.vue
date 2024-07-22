<script setup lang="ts">
import useAI from '~/composable/useAI'
import type { Episode } from '~/types'

const props = defineProps<{
  episode: Episode
}>()
const episodeRef = ref(props.episode)

async function summary() {
  // console.warn('summary', episodeRef.value.transcript)
  episodeRef.value.summary = await useAI(episodeRef.value.transcript ?? '')
}
</script>

<template>
  <div class="flex flex-col justify-center max-w-55%">
    <div class="flex justify-end">
      <Button v-show="!episodeRef?.summary" variant="outline" class="gap-2" @click="summary">
        <span>Summary</span>
        <Icon name="i-carbon-ai-status" />
      </Button>
    </div>
    <div class="w-full flex justify-center">
      <div v-if="episodeRef?.summary" class=" text-left whitespace-pre-line" v-html="episodeRef.summary " />
    </div>
  </div>
</template>
