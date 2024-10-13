import { jsonParseEnclosure, jsonParseImage } from './utils'
import type { Episode, EpisodeBasic } from '~/types'

export function formatEpisode(episode: any | null): Episode {
  if (!episode)
    return {} as Episode
  const formattedEpisode = {
    ...episode,
    // pgsql bug: https://www.cnblogs.com/wggj/p/8194313.html
    shownotes: episode.shownotes ? episode.shownotes?.replace(/\0/g, '') : '',
    image: jsonParseImage(episode.image),
    enclosure: jsonParseEnclosure(episode.enclosure),
  } as Episode
  // console.warn('formatEpisode', formattedEpisode)
  return formattedEpisode
}

export function formatEpisodes(episodes: any[] | null): Episode[] {
  if (!Array.isArray(episodes))
    return []

  const formattedEpisodes = episodes.map(formatEpisode).sort((a, b) =>
    (new Date(b.pubDate ?? 0)).getTime() - (new Date(a.pubDate ?? 0)).getTime(),
  )
  console.warn('formatEpisodes', formattedEpisodes)
  return formattedEpisodes
}
export function formatEpisodeBasic(episode: any): EpisodeBasic {
  if (!episode) {
    return {} as EpisodeBasic
  }
  return {
    eid: episode.eid,
    title: episode.title,
    description: episode.description,
    image: jsonParseImage(episode.image),
    isLiked: episode.isLiked,
  }
}

export function formatEpisodesBasic(episodes: any[] | null): EpisodeBasic[] {
  if (!episodes) {
    return []
  }
  return episodes.map(formatEpisodeBasic)
}
