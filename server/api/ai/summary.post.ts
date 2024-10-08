import type { RuntimeConfig } from 'nuxt/schema'
import type { ChatCompletion } from 'openai/resources/index.mjs'
import type { ChatCompletionStream } from 'openai/lib/ChatCompletionStream.mjs'
import { ProvoderFactory } from './shared/ProviderFactory'
import { summary_prompt } from './shared/prompt'

// export default defineEventHandler(async (event) => {
//   const { content } = await readBody(event)
//   const summary = await fetchSummary(content, useRuntimeConfig())
//   console.warn('summary:', summary)
//   return summary
// })

// async function fetchSummary(content: string, config: RuntimeConfig): Promise<string> {
//   const provider = ProvoderFactory.createProvider(config)
//   return provider.chat(content, summary_prompt)
// }

export default defineEventHandler(async (event) => {
  const { content } = await readBody(event)
  return new ReadableStream({
    async start(controller) {
      const provider = ProvoderFactory.createProvider(useRuntimeConfig())
      await provider.streamChat(content, summary_prompt, (chunk) => {
        controller.enqueue(new TextEncoder().encode(chunk))
      })
      controller.close()
    },
  })
})
