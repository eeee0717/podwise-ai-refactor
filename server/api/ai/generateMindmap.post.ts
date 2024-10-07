import type { RuntimeConfig } from 'nuxt/schema'
import { ProvoderFactory } from './shared/ProviderFactory'
import { mindmap_prompt } from './shared/prompt'

export default defineEventHandler(async (event) => {
  const { content } = await readBody(event)
  const mindmap = await fetchMindmap(content, useRuntimeConfig())
  return mindmap
})

async function fetchMindmap(content: string, config: RuntimeConfig): Promise<string> {
  const provider = ProvoderFactory.createProvider(config)
  return provider.chat(content, mindmap_prompt)
}
