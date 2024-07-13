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

export async function writeEpisodesToDb(pid: string, episodes: Episode[], isLiked = false) {
  const { statusCode } = await $fetch('/api/episode/write', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ pid, episodes, isLiked }),
  })
  return { statusCode }
}
