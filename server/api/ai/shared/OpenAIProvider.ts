import OpenAI from 'openai'
import type { IProvider } from './IProvider'

export class OpenAIProvider implements IProvider {
  provider: OpenAI
  apiKey: string
  baseUrl: string
  model: string

  constructor(apiKey: string, baseUrl: string, model: string) {
    console.warn('OpenAIProvider', apiKey, baseUrl)
    this.apiKey = apiKey
    this.baseUrl = baseUrl
    this.model = model
    this.provider = new OpenAI({
      dangerouslyAllowBrowser: true,
      apiKey: this.apiKey,
      baseURL: this.baseUrl,
    })
  }

  async chat(content: string, prompt: string): Promise<string> {
    const completions = await this.provider.chat.completions.create({
      messages: [
        { role: 'system', content: prompt },
        { role: 'user', content },
      ],
      model: this.model,
    })
    if (!completions.choices[0].message.content) {
      throw new Error('No completions')
    }
    return completions.choices[0].message.content
  }
}
