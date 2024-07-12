<script setup lang="ts">
import { handleFetchEpisodes, useFetchEpisodes } from '~/composable/useEpisodes'
import { fetchDbPodcasts } from '~/composable/usePodcast'
import { usePodcastStore } from '~/store/usePodcastStore'
import type { Episode, Podcast } from '~/types'

const router = useRouter()
const podcastStore = usePodcastStore()
const { podcasts } = storeToRefs(podcastStore)
const podcast = ref<Podcast>()
const episodes = ref<Episode[]>()
onMounted(async () => {
  const pid = router.currentRoute.value.params.pid as string
  // 检查 podcasts 中是否已存在对应数据
  if (!podcasts.value.find(podcast => podcast.pid === pid)) {
    await fetchDbPodcasts(pid)
  }
  podcast.value = podcasts.value.find(podcast => podcast.pid === pid)

  // 并行获取 episodes 数据
  const [{ episodes: data }] = await Promise.all([handleFetchEpisodes(podcast.value!.pid)])
  if (data) {
    episodes.value = data
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
      <div class="justify-center m-2" grid="~ 2xl:cols-3 xl:cols-2 lg:cols-2 md:cols-1 gap-15 auto-rows-20">
        <EpisodeCard
          v-for="episode in episodes"
          :key="episode.eid"
          :episode="episode"
        />
      </div>
    </div>
  </KeepAlive>
</template>
