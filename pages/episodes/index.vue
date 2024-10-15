<script setup lang="ts">
import { queryLikedEpisodes } from '~/composable/useEpisode'
import { SearchState } from '~/types'

const { data: episodesData } = await useAsyncData('likedEpisodes', () => queryLikedEpisodes(), {
  lazy: false,
  server: false,
  transform: result => result.episodes,
})

const episodes = computed(() => episodesData.value || [])

const searchValue = ref<string>('')
const searchState = ref<SearchState>(SearchState.Start)
async function onSearch() {
  episodesData.value = episodes.value?.filter(e => e.title?.toLocaleLowerCase().includes(searchValue.value.toLocaleLowerCase())) ?? []
}
</script>

<template>
  <div>
    <div class="w-full p-2 my-2 flex flex-row gap-2 justify-center items-center">
      <SearchInput v-model="searchValue" :on-search="onSearch" :search-state="searchState" />
    </div>
    <div class="justify-center m-2" grid="~ 2xl:cols-3 xl:cols-2 lg:cols-2 md:cols-1 gap-15 auto-rows-20">
      <EpisodeCard
        v-for="episode in episodesData"
        :key="episode.eid"
        :episode="episode"
      />
    </div>
  </div>
</template>
