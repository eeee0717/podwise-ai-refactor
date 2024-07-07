import type { Episode } from './Episode'
import type { Image } from '.'

export interface Podcast {
  pid: string
  title?: string | null
  author?: string | null
  description?: string | null
  episodes?: Episode[] | null
  image?: Image | null
}
