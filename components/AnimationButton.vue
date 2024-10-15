<script setup lang="ts">
import { SearchState, stateIconMap } from '~/types'

const props = defineProps<{
  onClick: () => void
  status: SearchState
}>()

// const statuses: Status[] = ['Next', 'Planning', 'Coding', 'Testing', 'Deploying', 'Completed']
const stateIconRef = computed(() => stateIconMap[props.status])

const target = ref<HTMLElement>()
const { apply } = useMotion(target, {
  initial: {
    scale: 1,
    width: '100px',
    backgroundColor: '#3B82F6',
  },
  loading: {
    width: '130px',
    backgroundColor: '#D1D5DB',

  },
  success: {
    width: '160px',
    backgroundColor: '#10B981',

  },

})
watchEffect(() => {
  switch (props.status) {
    case SearchState.Start:
      apply('initial')
      break
    case SearchState.Loading:
      apply('loading')
      break
    case SearchState.Success:
      apply('success')
      break
  }
})
async function handleClick() {
  props.onClick()
}
</script>

<template>
  <div>
    <Motion :hovered="{ scale: 1.05 }" :tapped="{ scale: 0.95 }">
      <Button ref="target" class="px-6 py-2  text-white font-semibold overflow-hidden h-10 relative cursor-pointer" @click="handleClick">
        <div class="w-full flex items-center justify-between">
          <Motion
            :initial="{ opacity: 0, y: 20 }"
            :enter="{ opacity: 1, y: 0 }"
            :leave="{ opacity: 0, y: -20 }"
            :duration="200"
            class="flex items-center justify-center"
          >
            <span>
              {{ props.status }}
            </span>
          </Motion>
          <span class="absolute inset-y-0 right-4 flex items-center justify-center">
            <Icon :name="stateIconRef.icon" />
          </span>
        </div>
      </Button>
    </Motion>
  </div>
</template>
