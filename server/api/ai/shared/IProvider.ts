export interface IProvider {
  apiKey: string
  baseUrl: string
  model: string
  chat: (text: string, prompt: string) => Promise<string>
}
