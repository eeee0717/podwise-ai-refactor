import type { RuntimeConfig } from 'nuxt/schema'
import { ProvoderFactory } from './shared/ProviderFactory'

export default defineEventHandler(async (event) => {
  const { content } = await readBody(event)
  const summary = await fetchSummary(content, useRuntimeConfig())
  return summary
})

async function fetchSummary(content: string, config: RuntimeConfig): Promise<string> {
  const provider = ProvoderFactory.createProvider(config)
  return provider.chat(content)
}
