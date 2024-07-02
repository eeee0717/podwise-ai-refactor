<script setup lang="ts">
import { useFetchEpisode } from '~/composable/useEpisode'
import { SearchState } from '~/types/States'

const searchState = ref<SearchState>(SearchState.Idle)
const searchValue = ref<string>('')
async function onSearch() {
  searchState.value = SearchState.Loading
  const episode = await useFetchEpisode(searchValue.value)

  console.warn(episode)
}
</script>

<template>
  <div class="w-full flex justify-center m-2">
    <SearchInput v-model="searchValue" :on-search="onSearch" :search-state="searchState" />
  </div>
</template>
