import { jsonParseEnclosure, jsonParseImage } from './utils'
import type { Episode, EpisodeBasic } from '~/types'

export function formatEpisode(episode: any | null): Episode {
  if (!episode)
    return {} as Episode

  return {
    pid: episode.pid,
    eid: episode.eid,
    podcast: episode.podcast,
    title: episode.title,
    shownotes: episode.shownotes?.replace(/\0/g, '') ?? '',
    description: episode.description,
    enclosure: jsonParseEnclosure(episode.enclosure),
    image: jsonParseImage(episode.image),
    pubDate: episode.pubDate,
  } as Episode
}

export function formatEpisodes(episodes: any[] | null): Episode[] {
  if (!Array.isArray(episodes))
    return []

  return episodes.map(formatEpisode).sort((a, b) =>
    (new Date(b.pubDate ?? 0)).getTime() - (new Date(a.pubDate ?? 0)).getTime(),
  )
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
