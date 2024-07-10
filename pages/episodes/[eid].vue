<script setup lang="ts">
import { queryEpisode } from '~/composable/useEpisode'
import type { Episode } from '~/types'

const router = useRouter()
const eid = router.currentRoute.value.params.eid as string
const episode = ref<Episode>()

onMounted(async () => {
  const { episode: data } = await queryEpisode(eid)
  console.warn(data)
  if (data)
    episode.value = data
})
</script>

<template>
  <div class="max-h-100vh flex-row justify-center h-full">
    <div
      v-if="episode"
      class="w-full"
    >
      <IntroductionCard :entity="episode" />
    </div>
  </div>
</template>
