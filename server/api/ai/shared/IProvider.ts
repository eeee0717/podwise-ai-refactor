import type { ChatCompletionStream } from 'openai/lib/ChatCompletionStream.mjs'
import type { ChatCompletion } from 'openai/resources/index.mjs'

export interface IProvider {
  apiKey: string
  baseUrl: string
  model: string
  chat: (text: string, prompt: string) => Promise<string>
  streamChat: (content: string, prompt: string, onChunk: (chunk: string) => void) => Promise<void>
}
