<script setup lang="ts">
function onSearch() {
  console.log('searching...')
}
</script>

<template>
  <div class="w-full flex justify-center m-2">
    <SearchInput :on-search="onSearch" />
  </div>
</template>
