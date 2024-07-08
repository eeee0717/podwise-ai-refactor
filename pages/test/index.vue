<script setup lang="ts">
import { queryEpisodes } from '~/composable/useEpisodes'

const pid = ref<string>()

async function onEnter() {
  console.warn('onEnter', pid.value)
  const { episodes } = await queryEpisodes(pid.value!)
  console.warn('episodes', episodes)
}
</script>

<template>
  <div class="flex justify-center p-10 h-screen">
    <input v-model="pid" class="h-50px" @keyup.enter="onEnter">
  </div>
</template>
