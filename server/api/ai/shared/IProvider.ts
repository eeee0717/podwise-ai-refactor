export interface IProvider {
  apiKey: string
  baseUrl: string
  model: string
  chat: (text: string, prompt: string) => Promise<string>
  streamChat: (content: string, prompt: string, onChunk: (chunk: string) => void) => Promise<void>
}
