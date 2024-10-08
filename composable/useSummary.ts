export async function fetchSummary(content: string): Promise<string> {
  return await $fetch('/api/ai/summary', {
    method: 'POST',
    body: JSON.stringify({ content, isStream: false }),
  })
}

export async function fetchStreamSummary(content: string): Promise<ReadableStream> {
  const response = await $fetch('/api/ai/summary', {
    method: 'POST',
    body: { content, isStream: true },
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
