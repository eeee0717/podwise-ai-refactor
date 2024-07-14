import * as tencentcloud from 'tencentcloud-sdk-nodejs-common'
import type { RuntimeConfig } from 'nuxt/schema'

async function getTranscript(taskId: number, config: RuntimeConfig): Promise<{ status: string, result: string }> {
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
      TaskId: BigInt(taskId),
    }

    const { Data } = await client.request('DescribeTaskStatus', params)
    return {
      status: Data.StatusStr,
      result: Data.Result,
    }
  }
  catch (err) {
    console.error('error', err)
    return {
      status: 'error',
      result: 'result is empty',
    }
  }
}

export default defineEventHandler(async (event) => {
  const { taskId } = await readBody(event)
  const config = useRuntimeConfig(event)
  const { status, result } = await getTranscript(taskId, config)
  return { status, result }
})
