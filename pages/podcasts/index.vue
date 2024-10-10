<script setup lang="ts">
import { queryAllPodcasts } from '~/composable/usePodcast'
import { SearchState } from '~/types'

const { data: podcastsData } = await useAsyncData('allPodcasts', () => queryAllPodcasts(), {
  server: false,
  transform: result => result.podcasts,
})

const podcasts = computed(() => podcastsData.value || [])

const searchValue = ref<string>('')
const searchState = ref<SearchState>(SearchState.Idle)

async function onSearch() {
  podcastsData.value = podcasts.value?.filter(p =>
    p.title?.toLocaleLowerCase().includes(searchValue.value.toLocaleLowerCase()),
  ) ?? []
}
</script>

<template>
  <div>
    <div class="w-full p-2 my-2 flex flex-row gap-2 justify-center items-center">
      <SearchInput v-model="searchValue" :on-search="onSearch" :search-state="searchState" />
    </div>
    <div class="justify-center m-2" grid="~ 2xl:cols-3 xl:cols-2 lg:cols-2 md:cols-1 gap-15 auto-rows-20">
      <PodcastCard
        v-for="podcast in podcasts"
        :key="podcast.pid"
        :podcast="podcast"
      />
    </div>
  </div>
</template>
