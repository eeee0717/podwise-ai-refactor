<script setup>
import { ref } from 'vue'
import { handleFetchEpisode, queryEpisode, queryLikedEpisodes } from '~/composable/useEpisode'
import { handleFetchEpisodes } from '~/composable/useEpisodes'
import { queryAllPodcasts, queryPodcast } from '~/composable/usePodcast'

const functionTimes = ref({})
const testing = ref(false)

async function measureExecutionTime(funcName, func) {
  const start = performance.now()
  await func()
  const end = performance.now()
  const executionTime = end - start
  functionTimes.value[funcName] = executionTime.toFixed(2)
}
async function startTest() {
  testing.value = true
  functionTimes.value = {}
  await measureExecutionTime('queryLikedEpisodes', () => queryLikedEpisodes())
  await measureExecutionTime('queryEpisode', () => queryEpisode('668e8b288fcadceb90650e55'))
  await measureExecutionTime('queryAllPodcasts', () => queryAllPodcasts())
  await measureExecutionTime('queryPodcast', () => queryPodcast('62382c1103bea1ebfffa1c00'))
  await measureExecutionTime('handleFetchEpisodes', () => handleFetchEpisodes('62382c1103bea1ebfffa1c00'))
  await measureExecutionTime('handleFetchEpisode', () => handleFetchEpisode('https://www.xiaoyuzhoufm.com/episode/670412dd6c7f8177865af177'))
  testing.value = false
}
</script>

<template>
  <div class="container">
    <h1 class="title">
      函数调用时间测试
    </h1>
    <button :disabled="testing" class="test-button" @click="startTest">
      {{ testing ? '测试中...' : '开始测试' }}
    </button>
    <div v-if="Object.keys(functionTimes).length > 0" class="results-container">
      <h2 class="results-title">
        测试结果
      </h2>
      <div v-for="(time, func) in functionTimes" :key="func" class="card">
        <div class="func-name">
          {{ func }}
        </div>
        <div class="time">
          {{ time }} ms
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
:root {
  --primary-color: #3498db;
  --secondary-color: #2ecc71;
  --background-color: #f5f5f5;
  --text-color: #333;
  --card-background: #fff;
}

.container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  background-color: var(--background-color);
  color: var(--text-color);
  font-family: Arial, sans-serif;
}

.title {
  text-align: center;
  color: var(--primary-color);
  margin-bottom: 20px;
}

.test-button {
  display: block;
  width: 200px;
  margin: 0 auto 20px;
  padding: 10px 20px;
  background-color: var(--primary-color);
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.test-button:hover {
  background-color: #2980b9;
}

.test-button:disabled {
  background-color: #bdc3c7;
  cursor: not-allowed;
}

.results-container {
  background-color: var(--card-background);
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.results-title {
  color: var(--secondary-color);
  margin-bottom: 15px;
}

.card {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 15px;
  border-bottom: 1px solid #eee;
}

.card:last-child {
  border-bottom: none;
}

.func-name {
  font-weight: bold;
}

.time {
  color: var(--primary-color);
}

@media (prefers-color-scheme: dark) {
  :root {
    --primary-color: #3498db;
    --secondary-color: #2ecc71;
    --background-color: #2c3e50;
    --text-color: #ecf0f1;
    --card-background: #34495e;
  }

  .test-button:hover {
    background-color: #2980b9;
  }

  .test-button:disabled {
    background-color: #7f8c8d;
  }

  .card {
    border-bottom-color: #4a6278;
  }
}
</style>
