export * from './Episode'
export * from './Token'
export * from './States'
export * from './Podcast'

export interface Enclosure {
  url: string
}

export interface Image {
  picUrl: string
  largePicUrl: string
  middlePicUrl: string
  smallPicUrl: string
  thumbnailUrl: string
}
