import OpenAI from 'openai'
import type { RuntimeConfig } from 'nuxt/schema'

export default defineEventHandler(async (event) => {
  const { content } = await readBody(event)
  const completion = await fetchSummary(content, useRuntimeConfig())
  return completion.choices[0].message.content
})

async function fetchSummary(content: string, config: RuntimeConfig) {
  const openai = new OpenAI({
    apiKey: config.openaiApi,
    baseURL: config.openaiBaseUrl,
  })
  return await openai.chat.completions.create({
    messages: [
      { role: 'system', content: 'Your task is to review the provided podcast transcript and create a concise summary that captures the essential information, focusing on the most important points. Use clear and professional language, and organize the summary in a logical manner using appropriate formatting such as headings, subheadings, and bullet points. Ensure that the summary is easy to understand and provides a comprehensive but succinct overview of the podcast content, with a particular focus on clearly indicating what the podcast is about.' },
      { role: 'user', content },
    ],
    model: 'gpt-4o-mini',
  })
}
