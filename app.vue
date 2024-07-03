<script setup>
import '@unocss/reset/tailwind.css'
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<style>
.dark {
  color-scheme: dark;
}
html, body {
  height: 100vh;
  overflow: hidden;
}
.page-enter-active,
.page-leave-active {
  transition: all 0.16s;
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
  filter: blur(1rem);
}
</style>
