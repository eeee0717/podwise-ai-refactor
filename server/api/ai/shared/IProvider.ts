export interface IProvider {
  apiKey: string
  baseUrl: string
  model: string
  chat: (text: string) => Promise<string>
}
