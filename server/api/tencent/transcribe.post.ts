import * as tencentcloud from 'tencentcloud-sdk-nodejs-common'
import type { RuntimeConfig } from 'nuxt/schema'

async function transcribe(url: string, config: RuntimeConfig): Promise<{ taskId: number }> {
  try {
    const CommonClient = tencentcloud.CommonClient
    const clientConfig = {
      credential: {
        secretId: config.tencentSecretId,
        secretKey: config.tencentSecretKey,
      },
      region: '',
      profile: {
        httpProfile: {
          endpoint: 'asr.tencentcloudapi.com',
        },
      },
    }

    const client = new CommonClient(
      'asr.tencentcloudapi.com',
      '2019-06-14',
      clientConfig,
    )

    const params = {
      EngineModelType: '16k_zh',
      ChannelNum: 1,
      ResTextFormat: 0,
      SourceType: 0,
      Url: url,
    }

    const { Data } = await client.request('CreateRecTask', params)

    return { taskId: Data.TaskId }
  }
  catch (err) {
    console.error('error', err)
    return { taskId: -1 }
  }
}

export default defineEventHandler(async (event) => {
  const { url } = await readBody(event)
  const config = useRuntimeConfig(event)
  const { taskId } = await transcribe(url, config)
  return { taskId }
})
