import type { RuntimeConfig } from 'nuxt/schema'
import type { IProvider } from './IProvider'
import { OpenAIProvider } from './OpenAIProvider'
import { GroqProvider } from './GroqProvider'

export class ProvoderFactory {
  static createProvider(config: RuntimeConfig): IProvider {
    switch (config.provider) {
      case 'OPENAI':
        return new OpenAIProvider(config.openaiApi, config.openaiBaseUrl, config.openaiModel)
      case 'GROQ':
        return new GroqProvider(config.groqApi, config.groqBaseUrl, config.groqModel)
      default:
        throw new Error(`Unsupported provider: ${config.provider}`)
    }
  }
}
