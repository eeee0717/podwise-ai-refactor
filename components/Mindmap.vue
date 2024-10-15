<script setup lang="ts">
import { onMounted } from 'vue'
import { Transformer } from 'markmap-lib'
import type { ITransformResult } from 'markmap-lib'
import type { IMarkmapJSONOptions } from 'markmap-view'
import { Markmap, deriveOptions } from 'markmap-view'

const props = defineProps<{
  mindmap?: string
}>()

function transform(svg: string | SVGElement, makrdownContent: string, jsonOptions?: IMarkmapJSONOptions | undefined): Markmap {
  const transformer: Transformer = new Transformer()
  const transformResult: ITransformResult = transformer.transform(makrdownContent)
  const markmapOptions = deriveOptions(jsonOptions)
  return Markmap.create(svg, markmapOptions, transformResult.root)
}

function exportSVG() {
  const svg = document.querySelector('#markmap')
  if (svg) {
    const serializer = new XMLSerializer()
    const source = serializer.serializeToString(svg)

    const blob = new Blob([source], { type: 'image/svg+xml;charset=utf-8' })
    const url = URL.createObjectURL(blob)

    const link = document.createElement('a')
    link.href = url
    link.download = 'mindmap.svg'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }
}

onMounted(async () => {
  if (!props.mindmap) {
    return
  }
  transform('#markmap', props.mindmap, {
    initialExpandLevel: 5,
    maxWidth: 300,
  })
})
</script>

<template>
  <div class="w-full h-95%">
    <div>
      <UButton class="relative top-5 left-5" size="md" color="white" icon="i-carbon-download" variant="outline" @click="exportSVG" />
    </div>
    <svg id="markmap" class="w-full h-full dark:text-light" />
  </div>
</template>
