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
    }
  }
  catch (e) {
    console.error('fetchPodcast Error', e)
    return {
      podcast: null,
    }
  }
}

async function writePodcast(podcast: Podcast) {
  try {
    const response = await $fetch('/api/db/write', {
      method: 'POST',
      body: JSON.stringify({
        data: podcast,
      }),
    })
    return { podcast: response.podcast }
  }
  catch (e) {
    console.error('writePodcast Error', e)
    return { podcast: null }
  }
}

export default defineEventHandler(async (event) => {
  const { pid } = await readBody(event)
  let response
  response = await fetchPodcast(pid)
  response = await writePodcast(response.podcast!)
  if (!response.podcast) {
    return { podcast: null, statusCode: 400 }
  }
  return { podcast: response.podcast, statusCode: 200 }
})
