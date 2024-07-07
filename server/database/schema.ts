import {
  pgTable,
  text,
} from 'drizzle-orm/pg-core'
import { relations } from 'drizzle-orm'

export const podcastsTable = pgTable(
  'podcasts',
  {
    pid: text('pid').primaryKey(),
    title: text('title').default(''),
    author: text('author').default(''),
    description: text('description').default(''),
    image: text('image').default(''),
  },
  // (table) => {
  //   return {
  //     pidIndex: index('pid_idx').on(table.pid),
  //   }
  // },
)

export const episodesTable = pgTable(
  'episodes',
  {
    eid: text('eid').primaryKey(),
    pid: text('pid').references(() => podcastsTable.pid),
    title: text('title'),
    description: text('description'),
    enclosure: text('enclosure'),
    image: text('image'),
  },
  // (table) => {
  //   return {
  //     eidIndex: index('eid_idx').on(table.eid),
  //   }
  // },
)

// export const podcastRelations = relations(podcastsTable, ({ many }) => ({
//   episodes: many(episodesTable),
// }))
