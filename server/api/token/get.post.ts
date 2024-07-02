import { BASE_URL } from '~/server/utils/constants'
import type { Token } from '~/types/Token'

export async function fetchToken(): Promise<Token> {
  const config = useRuntimeConfig()
  const token: any = await $fetch('app_auth_tokens.refresh', {
    baseURL: BASE_URL,
    method: 'GET',
    headers: {
      'x-jike-access-token': config.accessToken,
      'x-jike-device-id': config.deviceId,
      'x-jike-refresh-token': config.refreshToken,
    },
  })
  return {
    accessToken: token['x-jike-access-token'],
    refreshToken: token['x-jike-refresh-token'],
    deviceId: config.deviceId,
  }
}

export default defineEventHandler(async () => {
  return fetchToken()
})
