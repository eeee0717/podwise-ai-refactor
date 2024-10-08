import type { RuntimeConfig } from 'nuxt/schema'
import { ProvoderFactory } from './shared/ProviderFactory'
import { summary_prompt } from './shared/prompt'

export default defineEventHandler(async (event) => {
  const { content, isStream } = await readBody(event)
  if (isStream) {
    console.warn('stream')
    return fetchStreamSummary(content, useRuntimeConfig())
  }
  else {
    console.warn('not stream')
    return fetchSummary(content, useRuntimeConfig())
  }
})

async function fetchSummary(content: string, config: RuntimeConfig): Promise<string> {
  const provider = ProvoderFactory.createProvider(config)
  return provider.chat(content, summary_prompt)
}

export async function fetchStreamSummary(content: string, config: RuntimeConfig): Promise<ReadableStream> {
  return new ReadableStream({
    async start(controller) {
      const provider = ProvoderFactory.createProvider(config)
      await provider.streamChat(content, summary_prompt, (chunk) => {
        controller.enqueue(new TextEncoder().encode(chunk))
      })
      controller.close()
    },
  })
}
