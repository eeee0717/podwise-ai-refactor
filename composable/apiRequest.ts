const API_BASE_URL = 'http://localhost:3030/api'

export async function apiRequest<T>(endpoint: string, method: 'POST' | 'GET' | 'HEAD' | 'PATCH' | 'PUT' | 'DELETE' | 'CONNECT' | 'OPTIONS' | 'TRACE', params?: any): Promise<T> {
  console.warn('apiRequest', `${API_BASE_URL}${endpoint}`)
  const url = new URL(`${API_BASE_URL}${endpoint}`)

  if (method === 'GET' && params) {
    url.search = new URLSearchParams(params).toString()
  }

  return await $fetch(url.toString(), {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
    body: method !== 'GET' && params ? JSON.stringify(params) : undefined,
  })
}
