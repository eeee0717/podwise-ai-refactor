<script setup lang="ts">
import { episodeRegex, handleFetchEpisode } from '~/composable/useEpisode'
import { handleFetchPodcast, handlePodcast, podcastRegex } from '~/composable/usePodcast'
import { SearchState } from '~/types/States'

const searchState = ref<SearchState>(SearchState.Idle)
const searchValue = ref<string>('')
const router = useRouter()
async function onSearch() {
  searchState.value = SearchState.Loading
  let statusCode = 0
  if (searchValue.value.match(episodeRegex)) {
    const results = await handleFetchEpisode(searchValue.value)
    statusCode = results.statusCode
  }
  else if (searchValue.value.match(podcastRegex)) {
    const results = await handlePodcast(searchValue.value)
    // const results = await handleFetchPodcast(searchValue.value)
    // const results = await handleFetchEpisodes(searchValue.value)
    statusCode = results.statusCode
  }
  searchState.value = statusCode === 200 ? SearchState.Success : SearchState.Error
  if (statusCode === 200)
    router.push('/test')
}
</script>

<template>
  <div class="flex justify-center m-2">
    <SearchInput v-model="searchValue" :on-search="onSearch" :search-state="searchState" />
  </div>
</template>
