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
    const response = await $fetch('/api/episode/write', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ pid, episodes, isLiked }),
    })
    console.warn('writeEpisodesToDb response', response)
  }
  catch (error) {
    console.error('Error in writeEpisodesToDb:', error)
    throw error // 重新抛出错误，以便调用者可以处理它
  }
}
export async function testApi(pid: string, episodes: Episode[]) {
  // const response = await $fetch('/api/episode/test', {
  //   method: 'POST',
  //   headers: {
  //     'Content-Type': 'application/json',
  //   },
  //   body: JSON.stringify({ pid, episodes }),
  // })
  // console.warn('test response', response)

  // TODO: json stringify bug
  const body = JSON.stringify({ pid, episodes: [episodes[0]] })
  console.warn('testApi', body)
}
