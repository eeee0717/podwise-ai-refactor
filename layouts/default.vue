<script setup lang="ts">
import { verticalLinks } from '~/constants'
import { cn } from '~/lib/utils'

const isCollapsed = ref(false)
function onCollapse() {
  isCollapsed.value = true
}

function onExpand() {
  isCollapsed.value = false
}
</script>

<template>
  <ClientOnly>
    <main class="text-center">
      <TheNav />
      <div class="hidden flex-col md:flex">
        <TooltipProvider :delay-duration="0">
          <ResizablePanelGroup
            id="resize-panel-group-1"
            direction="horizontal"
            class="h-full items-stretch"
          >
            <ResizablePanel
              id="resize-panel-1"
              :default-size="15"
              :collapsed-size="4"
              collapsible
              :min-size="15"
              :max-size="15"
              :class="cn(isCollapsed && 'min-w-[15px] transition-all duration-200 ease-out')"
              @expand="onExpand"
              @collapse="onCollapse"
            >
              <VerticalNav :is-collapsed="isCollapsed" :links="verticalLinks" />
            </ResizablePanel>
            <ResizableHandle id="resize-handle-1" class="h-screen" with-handle />
            <ResizablePanel id="resize-panel-2" :min-size="30">
              <div class="h-90% overflow-y-auto">
                <slot />
              </div>
            </ResizablePanel>
          </ResizablePanelGroup>
        </TooltipProvider>
      </div>
    </main>
  </ClientOnly>
</template>
