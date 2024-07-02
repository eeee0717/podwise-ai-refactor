import type { Token } from '~/types'

export function useTokenHeaders(token: Token) {
  return {
    'x-jike-access-token': token.accessToken,
    'x-jike-device-id': token.deviceId,
    'x-jike-refresh-token': token.refreshToken,
  }
}
