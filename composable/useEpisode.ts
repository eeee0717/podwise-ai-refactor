import type { Episode } from '~/types'

export async function useFetchEpisode(eid: string) {
  return await $fetch('/api/episode/get', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ eid }),
  })
}
