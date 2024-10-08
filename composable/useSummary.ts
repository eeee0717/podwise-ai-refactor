import type { ChatCompletionStream } from 'openai/lib/ChatCompletionStream.mjs'

export default async function useSummary(content: string) {
  // console.warn('useSummary', content)
  const summary = await fetchStreamSummary(content)
  return summary
}

export async function fetchSummary(content: string): Promise<ChatCompletionStream> {
  return await $fetch('/api/ai/summary', {
    method: 'POST',
    body: JSON.stringify({ content }),
    responseType: 'stream',
  })
}

export async function fetchStreamSummary(content: string) {
  const response = await $fetch('/api/ai/summary', {
    method: 'POST',
    body: { content },
    responseType: 'stream',
  }) as ReadableStream

  return new ReadableStream({
    async start(controller) {
      const reader = response.getReader()
      while (true) {
        const { done, value } = await reader.read()
        if (done)
          break
        controller.enqueue(value)
      }
      controller.close()
    },
  })
}
