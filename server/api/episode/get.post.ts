import { fetchToken } from '../token/get.post'
import { useTokenHeaders } from '~/server/utils'
import type { Episode, Token } from '~/types'

interface ResponseData {
  data: Episode
}

async function fetchEpisode(eid: string): Promise<{ episode: Episode | null, statusCode: number }> {
  const token: Token = await fetchToken()
  try {
    const response = await $fetch<ResponseData>(`/v1/episode/get?eid=${eid}`, {
      baseURL: BASE_URL,
      method: 'GET',
      headers: useTokenHeaders(token),
    })

    return {
      episode: response.data,
      statusCode: 200,
    }
  }
  catch (e) {
    console.error('fetchEpisode Error', e)
    return {
      episode: null,
      statusCode: 400,
    }
  }
}

export default defineEventHandler(async (event) => {
  const { eid } = await readBody(event)
  return await fetchEpisode(eid)
})
