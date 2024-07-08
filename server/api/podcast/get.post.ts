import { fetchToken } from '../token/get.post'
import { useTokenHeaders } from '~/server/utils'
import type { Podcast, Token } from '~/types'

interface ResponseData {
  data: Podcast
}

async function fetchPodcast(pid: string) {
  const token: Token = await fetchToken()
  try {
    const response = await $fetch<ResponseData>(`/v1/podcast/get?pid=${pid}`, {
      baseURL: BASE_URL,
      method: 'GET',
      headers: useTokenHeaders(token),
    })
    return {
      podcast: response.data,
      statusCode: 200,
    }
  }
  catch (e) {
    console.error('fetchPodcast Error', e)
    return {
      podcast: null,
      statusCode: 400,
    }
  }
}

export default defineEventHandler(async (event) => {
  const { pid } = await readBody(event)
  return await fetchPodcast(pid)
})
