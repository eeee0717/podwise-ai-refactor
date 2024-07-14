<script setup lang="ts">
import { Search } from 'lucide-vue-next'
import { Input } from '~/components/ui/input'
import type { SearchState } from '~/types/States'
import { stateIconMap } from '~/types/States'

const props = defineProps<{
  onSearch: (event: KeyboardEvent) => void
  searchState: SearchState
}>()
const searchValue = defineModel()
const stateIcon = computed(() => {
  return stateIconMap[props.searchState]
})
</script>

<template>
  <div class="relative w-full max-w-sm items-center">
    <Input id="search" v-model="searchValue" type="text" placeholder="Search..." class=" px-10" @keyup.enter="props.onSearch" />
    <span class="absolute start-0 inset-y-0 flex items-center justify-center px-2">
      <Search class="size-6 text-muted-foreground" />
    </span>
    <span class="absolute end-0 inset-y-0 flex items-center justify-center px-2">
      <Icon :name="stateIcon.icon" :style="{ color: stateIcon.color }" class="size-6 text-muted-foreground" />
    </span>
  </div>
</template>
