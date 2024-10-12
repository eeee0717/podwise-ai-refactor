const API_BASE_URL = 'http://localhost:3030/api'

export async function apiRequest<T>(endpoint: string, method: 'POST' | 'GET' | 'HEAD' | 'PATCH' | 'PUT' | 'DELETE' | 'CONNECT' | 'OPTIONS' | 'TRACE', params?: any): Promise<T> {
  console.warn('url', `${API_BASE_URL}${endpoint}`)
  const url = new URL(`${API_BASE_URL}${endpoint}`)

  if (method === 'GET' && params) {
    Object.keys(params).forEach(key => url.searchParams.append(key, params[key]))
  }

  return await $fetch(url.toString(), {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
    body: method !== 'GET' && params ? JSON.stringify(params) : undefined,
  })
}
