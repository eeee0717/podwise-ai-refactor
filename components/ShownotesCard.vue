<script setup lang="ts">
const props = defineProps<{
  shownotes?: string | null
}>()
</script>

<template>
  <div v-if="shownotes" class="shownotes-content text-left max-w-full" v-html="props.shownotes " />
</template>

<style scoped>
.shownotes-content {
  max-width: 55%;
}
.shownotes-content p {
  color:#333333;
  font-weight:normal;
  font-size:16px;
  line-height:20px;
  font-family:Helvetica,Arial,sans-serif;
  hyphens:auto;
  text-align:justify;
}
</style>
