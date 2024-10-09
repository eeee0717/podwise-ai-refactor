import type { Enclosure, Image, Podcast } from '.'

export interface Episode {
  pid: string
  eid: string
  podcast?: Podcast | null
  title?: string | null
  shownotes?: string | null
  description?: string | null
  enclosure?: Enclosure | null
  image?: Image | null
  pubDate?: string | null
  isLiked?: boolean
  transcript?: string | null
  summary?: string | null
  mindmap?: string | null
}

export interface EpisodeBasic {
  eid: string
  title?: string | null
  description?: string | null
  image?: Image | null
  isLiked?: boolean | null
}
