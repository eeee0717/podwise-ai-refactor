<script setup lang="ts">
const message = ref('Hello, this is a UI test page!')
</script>

<template>
  <div>
    <h1>{{ message }}</h1>
    <button @click="message = 'Button clicked!'">
      Click Me
    </button>
  </div>
</template>
