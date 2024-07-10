<script setup lang="ts">
const props = defineProps<{
  title: string
  icon: string
}>()
</script>

<template>
  <div class="flex items-center gap-2">
    <Icon :name="props.icon" />
    <span>{{ props.title }}</span>
  </div>
</template>
