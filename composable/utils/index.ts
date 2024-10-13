import type { Enclosure, Episode, Image } from '~/types'

export function jsonParseImage(image: any): Image {
  if (typeof image === 'string') {
    try {
      return JSON.parse(image)
    }
    catch (error) {
      console.error('Error parsing image JSON:', error)
      return {} as Image
    }
  }
  return image as Image
}

export function jsonParseEnclosure(enclosure: any): Enclosure {
  if (typeof enclosure === 'string') {
    try {
      return JSON.parse(enclosure)
    }
    catch (error) {
      console.error('Error parsing enclosure JSON:', error)
      return {} as Enclosure
    }
  }
  return enclosure as Enclosure
}

export async function writeEpisodesToDbInBatches(pid: string, episodes: Episode[], batchSize = 50) {
  for (let i = 0; i < episodes.length; i += batchSize) {
    const batch = episodes.slice(i, i + batchSize)
    await writeEpisodesToDb(pid, batch)
  }
}

export async function writeEpisodesToDb(pid: string, episodes: Episode[], isLiked = false) {
  try {
    const encodedEpisodes = episodes.map((episode) => {
      return {
        ...episode,
        // due to shownotes are HTML, we need to encode it to base64
        shownotes: episode.shownotes ? btoa(encodeURIComponent(episode.shownotes.replace(/\0/g, ''))) : '',
      }
    })
    const response = await $fetch('/api/episode/write', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ pid, episodes: encodedEpisodes, isLiked }),
    })
    console.warn('writeEpisodesToDb response', response)
  }
  catch (error) {
    console.error('Error in writeEpisodesToDb:', error)
    throw error // 重新抛出错误，以便调用者可以处理它
  }
}

export async function testApiInBatches(pid: string, episodes: Episode[], batchSize = 50) {
  for (let i = 0; i < episodes.length; i += batchSize) {
    const batch = episodes.slice(i, i + batchSize)
    await testApi(pid, batch)
  }
}

export async function testApi(pid: string, episodes: Episode[]) {
  const mockEpisodes = episodes.map((episode) => {
    const { pid, eid, podcast, title, shownotes } = episode
    const formattedShownotes = shownotes ? btoa(encodeURIComponent(shownotes.replace(/\0/g, ''))) : ''
    return { pid, eid, podcast, title, shownotes: formattedShownotes }
  })
  const body = JSON.stringify({ pid, episodes: mockEpisodes })
  console.warn('testApi', body)
  const response = await $fetch('/api/episode/test', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body,
  })
  console.warn('test response', response)
}
