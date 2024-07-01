<script setup lang="ts">
import { appName, githubUrl } from '~/constants'
</script>

<template>
  <nav px6 py4 text-lg flex="~ gap-2 items-center">
    <div i-logos-nuxt-icon text-4xl />
    <span text-2xl>{{ appName }}</span>
    <div flex-auto />
    <ToggleTheme />
    <NuxtLink
      p2 rounded
      :href="githubUrl" target="_blank"
    >
      <div i-carbon-logo-github text-2xl />
    </NuxtLink>
  </nav>
  <Separator />
</template>
