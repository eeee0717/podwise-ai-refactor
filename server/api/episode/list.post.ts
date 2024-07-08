import { fetchToken } from '../token/get.post'
import type { Episode, Token } from '~/types'

interface ResponseData {
  data: Episode[]
  loadMoreKey: string | undefined
  total: number
}

async function fetchEpisodes(
  pid: string,
  loadMoreKey?: string,
  allEpisodes: Episode[] = [],
): Promise<{ episodes: Episode[] | null, statusCode: number }> {
  const token: Token = await fetchToken()
  try {
    const response = await $fetch<ResponseData>('/v1/episode/list', {
      baseURL: BASE_URL,
      method: 'POST',
      headers: useTokenHeaders(token),
      body: JSON.stringify({ pid, loadMoreKey }),
    })
    allEpisodes = allEpisodes.concat(response.data)
    if (response.loadMoreKey) {
      return await fetchEpisodes(pid, response.loadMoreKey, allEpisodes)
    }
    else {
      return { episodes: allEpisodes, statusCode: 200 }
    }
  }
  catch (e) {
    console.error('fetchEpisodes Error', e)
    return { episodes: null, statusCode: 400 }
  }
}

export default defineEventHandler(async (event) => {
  const { pid } = await readBody(event)
  return await fetchEpisodes(pid)
})
