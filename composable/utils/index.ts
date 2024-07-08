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

export function formatEpisodes(episodes: any[] | null): Episode[] {
  if (!episodes) {
    return []
  }
  return episodes.map((episode) => {
    return {
      ...episode,
      image: jsonParseImage(episode.image),
      enclousure: jsonParseEnclosure(episode.enclousure),
    }
  })
}
