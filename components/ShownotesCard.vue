<script setup lang="ts">
import type { Episode } from '~/types'

const props = defineProps<{
  episode?: Episode
}>()
// 使用计算属性优化性能
const shownotes = computed(() => props.episode?.shownotes || '')
</script>

<template>
  <div v-if="shownotes" class="shownotes-content text-left max-w-full" v-html="shownotes " />
</template>

<style scoped>
.shownotes-content {
  max-width: 55%;
}
.shownotes-content :deep(p) {
  color: #333;
  font-weight: normal;
  font-size: 16px;
  line-height: 1.25;
  font-family: Helvetica, Arial, sans-serif;
  hyphens: auto;
  text-align: justify;
}
</style>
