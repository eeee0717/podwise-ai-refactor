<script setup lang="ts">
import TabTitle from '~/components/TabTitle.vue'
import TranscriptCard from '~/components/TranscriptCard.vue'
import { Tabs, TabsList, TabsTrigger } from '~/components/ui/tabs'
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
      <div class="w-full p-2 my-2 flex flex-row  space-y-3 gap-2 ">
        <Tabs default-value="shownotes" class="w-full">
          <TabsList>
            <TabsTrigger value="shownotes">
              <TabTitle title="Shownotes" icon="i-carbon-bookmark" />
            </TabsTrigger>
            <TabsTrigger value="summary">
              <TabTitle title="Summary" icon="i-carbon-ai-status" />
            </TabsTrigger>
            <TabsTrigger value="transcript">
              <TabTitle title="Transcript" icon="i-carbon-ibm-watson-language-translator" />
            </TabsTrigger>
            <TabsTrigger value="mindmap">
              <TabTitle title="Mindmap" icon="i-carbon-partition-repartition" />
            </TabsTrigger>
          </TabsList>
          <TabsContent
            value="shownotes"
            class="flex justify-center"
          >
            <ShownotesCard :episode="episode" />
          </TabsContent>
          <TabsContent
            value="transcript"
            class="flex justify-center"
          >
            <TranscriptCard :episode="episode" />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  </div>
</template>
