<script setup lang="ts">
import { useFetchEpisode } from '~/composable/useEpisode'
import type { Episode } from '~/types'
import { SearchState } from '~/types/States'

const searchState = ref<SearchState>(SearchState.Idle)
const searchValue = ref<string>('')
async function onSearch() {
  searchState.value = SearchState.Loading
  const { episode, statusCode } = await useFetchEpisode(searchValue.value)
  if (statusCode !== 200) {
    searchState.value = SearchState.Error
    return
  }
  searchState.value = SearchState.Success
  console.warn(episode!.eid)
}
</script>

<template>
  <div class="w-full flex justify-center m-2">
    <SearchInput v-model="searchValue" :on-search="onSearch" :search-state="searchState" />
  </div>
</template>
