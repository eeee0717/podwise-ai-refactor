<script setup lang="ts">
import type { PropType } from 'vue'

interface AnimationState {
  scale?: number
  width?: string
  backgroundColor?: string
}

const props = defineProps({
  onClick: {
    type: Function as PropType<() => void>,
    required: true,
  },
  status: {
    type: [String, Number] as PropType<string | number>,
    required: true,
  },
  states: {
    type: Object as PropType<Record<string, AnimationState>>,
    default: () => ({
      initial: {
        scale: 1,
        width: '100px',
        backgroundColor: '#3B82F6',
      },
      loading: {
        width: '130px',
        backgroundColor: '#F59E0B',
      },
      success: {
        width: '160px',
        backgroundColor: '#10B981',
      },
    }),
  },
  statusToStateMap: {
    type: Object as PropType<Record<string | number, string>>,
    required: true,
  },
})

const target = ref<HTMLElement>()
const { apply } = useMotion(target, props.states)

watchEffect(() => {
  const state = props.statusToStateMap[props.status]
  if (state && props.states[state]) {
    apply(state)
  }
})

async function handleClick() {
  props.onClick()
}
</script>

<template>
  <div>
    <Motion :hovered="{ scale: 1.05 }" :tapped="{ scale: 0.95 }" :duration="200">
      <Button ref="target" class="px-6 py-2 text-white font-semibold overflow-hidden h-10 relative cursor-pointer" @click="handleClick">
        <div class="w-full flex items-center justify-between">
          <Motion
            :initial="{ opacity: 0, y: 20 }"
            :enter="{ opacity: 1, y: 0 }"
            :leave="{ opacity: 0, y: -20 }"
            :duration="200"
            class="flex items-center justify-center"
          >
            <slot name="content">
              {{ props.status }}
            </slot>
          </Motion>
          <span class="absolute inset-y-0 right-2 flex items-center justify-center">
            <slot name="icon" />
          </span>
        </div>
      </Button>
    </Motion>
  </div>
</template>
