<script setup lang="ts">
type Status = 'Next' | 'Planning' | 'Coding' | 'Testing' | 'Deploying' | 'Completed'

const statuses: Status[] = ['Next', 'Planning', 'Coding', 'Testing', 'Deploying', 'Completed']
const status = ref<Status>('Next')

const target = ref<HTMLElement>()
const { apply } = useMotion(target, {
  initial: {
    width: '100px',
    backgroundColor: '#3B82F6',
    transition: {
      duration: 0.2,
    },
  },

  planning: {
    width: '140px',
    backgroundColor: '#D1D5DB',

  },
  coding: {
    width: '120px',
    backgroundColor: '#D1D5DB',

  },
  testing: {
    width: '130px',
    backgroundColor: '#D1D5DB',

  },
  deploying: {
    width: '150px',
    backgroundColor: '#F59E0B',

  },
  completed: {
    width: '160px',
    backgroundColor: '#10B981',

  },

})
async function onClick() {
  status.value = 'Planning'
  await apply('planning')
  await new Promise(resolve => setTimeout(resolve, 1000))
  status.value = 'Coding'
  await apply('coding')
  await new Promise(resolve => setTimeout(resolve, 1000))
  status.value = 'Testing'
  await apply('testing')
  await new Promise(resolve => setTimeout(resolve, 1000))
  status.value = 'Deploying'
  await apply('deploying')
  await new Promise(resolve => setTimeout(resolve, 1000))
  status.value = 'Completed'
  await apply('completed')
}

function getIcon() {
  switch (status.value) {
    case 'Next': return 'i-lucide-arrow-right'
    case 'Planning':
    case 'Coding':
    case 'Testing':
    case 'Deploying': return 'i-svg-spinners-180-ring'
    case 'Completed': return 'i-lucide-check'
  }
}
</script>

<template>
  <div>
    <Motion :duration="300" :hovered="{ scale: 1.05 }" :tapped="{ scale: 0.95 }">
      <Button ref="target" class="px-6 py-2  text-white font-semibold overflow-hidden h-10 relative cursor-pointer" @click="onClick">
        <div class="w-full flex items-center justify-between">
          <Motion
            :initial="{ opacity: 0, y: 20 }"
            :enter="{ opacity: 1, y: 0 }"
            :leave="{ opacity: 0, y: -20 }"
            :duration="200"
            class="flex items-center justify-center"
          >
            <span>
              {{ status }}
            </span>
          </Motion>
          <span class="absolute inset-y-0 right-4 flex items-center justify-center">
            <Icon :name="getIcon()" />
          </span>
        </div>
      </Button>
    </Motion>
  </div>
</template>
