<script setup lang="ts">
import { episodeRegex, handleFetchEpisode } from '~/composable/useEpisode'
import { handlePodcast, podcastRegex } from '~/composable/usePodcast'
import { State } from '~/types/States'

const searchState = ref<State>(State.Idle)
const searchValue = ref<string>('')
const router = useRouter()
async function onSearch() {
  searchState.value = State.Loading
  let statusCode = 0
  let to: string = '/'
  if (searchValue.value.match(episodeRegex)) {
    const results = await handleFetchEpisode(searchValue.value)
    statusCode = results.statusCode
    to = '/episodes'
  }
  else if (searchValue.value.match(podcastRegex)) {
    const results = await handlePodcast(searchValue.value)
    // const results = await handleFetchPodcast(searchValue.value)
    // const results = await handleFetchEpisodes(searchValue.value)
    statusCode = results.statusCode
    to = '/podcasts'
  }
  searchState.value = statusCode === 200 ? State.Success : State.Error
  if (statusCode === 200)
    router.push(to)
}
</script>

<template>
  <div class="flex justify-center m-2">
    <SearchInput v-model="searchValue" :on-search="onSearch" :search-state="searchState" />
  </div>
</template>
