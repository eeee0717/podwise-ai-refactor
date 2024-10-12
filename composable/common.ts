import { jsonParseEnclosure, jsonParseImage } from './utils'
import type { Episode, EpisodeBasic } from '~/types'

export function formatEpisode(episode: any | null): Episode {
  if (!episode) {
    return {} as Episode
  }
  return {
    ...episode,
    // pgsql bug: https://www.cnblogs.com/wggj/p/8194313.html
    shownotes: episode.shownotes ? episode.shownotes?.replace(/\0/g, '') : '',
    image: jsonParseImage(episode.image),
    enclosure: jsonParseEnclosure(episode.enclosure),
  } as Episode
}
export function formatEpisodes(episodes: any[] | null): Episode[] {
  if (!episodes) {
    return []
  }
  return episodes.map(formatEpisode).sort((a, b) => {
    // 这里可能存在问题,因为pubDate可能是null或undefined
    // 我们需要添加一个检查来确保pubDate存在
    const dateA = a.pubDate ? new Date(a.pubDate).getTime() : 0
    const dateB = b.pubDate ? new Date(b.pubDate).getTime() : 0
    return dateB - dateA
  })
}
export function formatEpisodesBasic(episodes: any[] | null): EpisodeBasic[] {
  if (!episodes) {
    return []
  }
  return episodes.map(formatEpisodeBasic)
}

export function formatEpisodeBasic(episode: any): EpisodeBasic {
  return {
    eid: episode.eid,
    title: episode.title,
    description: episode.description,
    image: jsonParseImage(episode.image),
    isLiked: episode.isLiked,
  }
}
