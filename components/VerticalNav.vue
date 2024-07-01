<script setup lang="ts">
import { buttonVariants } from './ui/button'
import { cn } from '@/lib/utils'

export interface LinkProp {
  title: string
  icon: string
  path: string
}

interface NavProps {
  isCollapsed: boolean
  links: LinkProp[]
}
const props = defineProps<NavProps>()
</script>

<template>
  <div
    :data-collapsed="props.isCollapsed"
    class="group flex flex-col gap-4 py-2 data-[collapsed=true]:py-2"
  >
    <nav class="grid gap-1 px-2 group-[[data-collapsed=true]]:justify-center group-[[data-collapsed=true]]:px-2">
      <template v-for="(link, index) of props.links">
        <Tooltip v-if="isCollapsed" :key="`1-${index}`" :delay-duration="0">
          <TooltipTrigger as-child>
            <a
              href="#"
              :class="cn(
                buttonVariants({ variant: 'ghost', size: 'icon' }),
                'h-9 w-9',
              )"
            >
              <Icon :name="link.icon" class="size-4" />
              <span class="sr-only">{{ link.title }}</span>
            </a>
          </TooltipTrigger>
          <TooltipContent side="right" class="flex items-center gap-4">
            {{ link.title }}
          </TooltipContent>
        </Tooltip>

        <a
          v-else
          :key="`2-${index}`"
          :href="link.path"
          :class="cn(
            buttonVariants({ variant: 'ghost', size: 'sm' }),
          )"
        >
          <Icon :name="link.icon" class="mr-2 size-4" />
          {{ link.title }}
        </a>
      </template>
    </nav>
  </div>
</template>
