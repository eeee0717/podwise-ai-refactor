import type { LinkProp } from '~/components/VerticalNav.vue'

export const appName = 'Podwise-AI'
export const githubUrl = 'https://github.com/eeee0717/podwise-ai'
export const verticalLinks: LinkProp[] = [
  {
    title: 'Home',
    icon: 'i-carbon-home',
    path: '/',
  },
  {
    title: 'Episodes',
    icon: 'i-carbon-microphone',
    path: '/episodes',
  },
  {
    title: 'Podcasts',
    icon: 'i-carbon-media-library',
    path: '/podcasts',
  },
]
