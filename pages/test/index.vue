<script setup lang="ts">
import { useEpisodesStore } from '~/store/useEpisodesStore'

const episodesStore = useEpisodesStore()
</script>

<template>
  <div class="flex justify-center p-10 h-screen">
    <div class="justify-center" grid="~ 2xl:cols-5 xl:cols-4 lg:cols-3 md:cols-2 gap-15">
      <EpisodeCard
        v-for="episode in episodesStore.episodes"
        :key="episode.eid"
        :episode="episode"
        class="flex flex-col justify-center w-auto max-w-250px"
      />
    </div>
  </div>
</template>
