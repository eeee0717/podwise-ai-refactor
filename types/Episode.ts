import type { Enclosure, Image, Podcast } from '.'

export interface Episode {
  pid: string
  eid?: string
  podcast?: Podcast
  title?: string
  description?: string
  enclosure?: Enclosure
  image?: Image
}
