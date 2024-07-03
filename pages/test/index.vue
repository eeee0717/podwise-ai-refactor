<script setup lang="ts">
import { useEpisodesStore } from '~/store/useEpisodesStore'

const episodesStore = useEpisodesStore()
const episodesTitle = episodesStore.episodes.map(episode => episode.title)
</script>

<template>
  <div class="mx-10">
    {{ episodesTitle }}
  </div>
</template>
