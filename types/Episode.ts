import type { Enclosure, Image, Podcast } from '.'

export interface Episode {
  pid: string
  eid: string
  podcast?: Podcast | null
  title?: string | null
  description?: string | null
  enclosure?: Enclosure | null
  image?: Image | null
}
