import type { RuntimeConfig } from 'nuxt/schema'
import { ProvoderFactory } from './shared/ProviderFactory'
import { summary_prompt } from './shared/prompt'

export default defineEventHandler(async (event) => {
  const { content } = await readBody(event)
  const summary = await fetchSummary(content, useRuntimeConfig())
  console.warn('summary:', summary)
  return summary
})

async function fetchSummary(content: string, config: RuntimeConfig): Promise<string> {
  const provider = ProvoderFactory.createProvider(config)
  return provider.chat(content, summary_prompt)
}
