<script setup lang="ts">
import SearchInput from '~/components/SearchInput.vue'
import { Button } from '~/components/ui/button'
import { Tooltip, TooltipTrigger } from '~/components/ui/tooltip'
import { handleFetchEpisodes, queryEpisodes, useFetchEpisodes } from '~/composable/useEpisodes'
import { fetchDbPodcasts } from '~/composable/usePodcast'
import { usePodcastStore } from '~/store/usePodcastStore'
import { type Episode, type Podcast, SearchState } from '~/types'

const router = useRouter()
const podcastStore = usePodcastStore()
const { podcasts } = storeToRefs(podcastStore)
const podcast = ref<Podcast>()
const episodes = ref<Episode[]>()
const episodesData = ref<Episode[]>()

const searchValue = ref<string>('')
const searchState = ref<SearchState>(SearchState.Idle)
async function onSearch() {
  episodesData.value = episodes.value?.filter(e => e.title?.toLocaleLowerCase().includes(searchValue.value.toLocaleLowerCase())) ?? []
}
onMounted(async () => {
  const pid = router.currentRoute.value.params.pid as string
  // 检查 podcasts 中是否已存在对应数据
  if (!podcasts.value.find(podcast => podcast.pid === pid)) {
    await fetchDbPodcasts(pid)
  }
  podcast.value = podcasts.value.find(podcast => podcast.pid === pid)

  // 并行获取 episodes 数据
  const { episodes: data } = await queryEpisodes(pid)
  if (data) {
    episodes.value = data
    episodesData.value = data
  }
})
</script>

<template>
  <KeepAlive>
    <div class="max-h-100vh flex-row justify-center h-full">
      <div
        v-if="podcast"
        class="w-full"
      >
        <IntroductionCard :entity="podcast" />
      </div>
      <div class="w-full p-2 my-2 flex flex-row   gap-2 justify-center items-center">
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
  </KeepAlive>
</template>
