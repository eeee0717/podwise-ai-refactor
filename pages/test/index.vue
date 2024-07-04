<script setup lang="ts">
import { useEpisodesStore } from '~/store/useEpisodesStore'

const episodesStore = useEpisodesStore()
</script>

<template>
  <div class="mx-10 h-screen">
    <div grid="~ cols-3 gap-2">
      <EpisodeCard
        v-for="episode in episodesStore.episodes"
        :key="episode.eid"
        :episode="episode"
        class="w-[150px]"
        :height="150"
        :width="150"
      />
    </div>
  </div>
</template>
