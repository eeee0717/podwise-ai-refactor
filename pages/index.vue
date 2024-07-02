<script setup lang="ts">
import { episodeRegex, handleFetchEpisode } from '~/composable/useEpisode'
import { handleFetchEpisodes } from '~/composable/useEpisodes'
import { handleFetchPodcast, podcastRegex } from '~/composable/usePodcast'
import { SearchState } from '~/types/States'

const searchState = ref<SearchState>(SearchState.Idle)
const searchValue = ref<string>('')
async function onSearch() {
  searchState.value = SearchState.Loading
  let statusCode = 0
  if (searchValue.value.match(episodeRegex)) {
    statusCode = await handleFetchEpisode(searchValue.value)
  }
  else if (searchValue.value.match(podcastRegex)) {
    // statusCode = await handleFetchPodcast(searchValue.value)
    statusCode = await handleFetchEpisodes(searchValue.value)
  }
  searchState.value = statusCode === 200 ? SearchState.Success : SearchState.Error
}
</script>

<template>
  <div class="w-full flex justify-center m-2">
    <SearchInput v-model="searchValue" :on-search="onSearch" :search-state="searchState" />
  </div>
</template>
