import { fetchToken } from '../token/get.post'
import type { Episode, Token } from '~/types'

interface ResponseData {
  data: Episode[]
  loadMoreKey: string | undefined
  total: number
}

let loadMoreKey: string | undefined
let total: number = 0
async function fetchEpisodes(pid: string) {
  const token: Token = await fetchToken()
  try {
    const response = await $fetch<ResponseData>('/v1/episode/list', {
      baseURL: BASE_URL,
      method: 'POST',
      headers: useTokenHeaders(token),
      body: JSON.stringify({ pid, loadMoreKey }),
    })
    loadMoreKey = response.loadMoreKey
    total = response.total
    return {
      episodes: response.data,
      statusCode: 200,
    }
  }
  catch (e) {
    console.error('fetchEpisodes Error', e)
    return {
      episodes: null,
      statusCode: 400,
    }
  }
}

export default defineEventHandler(async (event) => {
  const { pid } = await readBody(event)
  let allEpisodes: Episode[] = []
  while (total === 0 || allEpisodes.length < total) {
    const { episodes, statusCode } = await fetchEpisodes(pid)
    if (statusCode !== 200 || !episodes) {
      return { episodes: null, statusCode }
    }
    allEpisodes = allEpisodes.concat(episodes)
  }

  return { episodes: allEpisodes, statusCode: 200 }
})
