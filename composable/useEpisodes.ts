export async function useFetchEpisodes(pid: string) {
  return await $fetch('/api/episode/list', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ pid }),
  })
}
export async function handleFetchEpisodes(url: string) {
  const pid = url.split('/').pop() ?? ''
  const { episodes, statusCode } = await useFetchEpisodes(pid)
  console.warn(episodes)
  return statusCode
}
