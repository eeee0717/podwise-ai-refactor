import type { Episode } from './Episode'
import type { Image } from '.'

export interface Podcast {
  pid: string
  title?: string
  author?: string
  description?: string
  episodes?: Episode[]
  image?: Image
}
