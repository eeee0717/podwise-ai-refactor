import { fetchToken } from '../token/get.post'
import { useTokenHeaders } from '~/server/utils'
import type { Episode, Token } from '~/types'

interface ResponseData {
  data: Episode
}

async function fetchEpisode(eid: string): Promise<Episode> {
  const token: Token = await fetchToken()
  try {
    const response = await $fetch<ResponseData>(`/v1/episode/get?eid=${eid}`, {
      baseURL: BASE_URL,
      method: 'GET',
      headers: useTokenHeaders(token),
    })

    return response.data
  }
  catch (e) {
    console.error(e)
    throw createError({
      statusCode: 400,
      message: 'get episode failed',
    })
  }
}

export default defineEventHandler(async (event) => {
  const { eid } = await readBody(event)
  console.warn('eid', eid)
  const episode = await fetchEpisode(eid)
  return episode
})
