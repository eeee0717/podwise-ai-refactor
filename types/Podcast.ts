import type { Episode } from './Episode'

export interface Podcast {
  pid?: string
  title?: string
  author?: string
  description?: string
  picUrl?: string
  loadMoreKey?: string
  episodes?: Episode[]
  total?: number
}
