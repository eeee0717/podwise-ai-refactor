<script setup lang="ts">
import { SearchState } from '~/types/states'

const searchState = ref<SearchState>(SearchState.Idle)
function onSearch() {
  searchState.value = SearchState.Loading
  console.warn('searching...')
  // wait for 1 second
  setTimeout(() => {
    searchState.value = SearchState.Success
  }, 1000)
}
</script>

<template>
  <div class="w-full flex justify-center m-2">
    <SearchInput :on-search="onSearch" :search-state="searchState" />
  </div>
</template>
