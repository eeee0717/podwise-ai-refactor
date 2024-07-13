import {
  boolean,
  pgTable,
  text,
} from 'drizzle-orm/pg-core'
import { relations } from 'drizzle-orm'

export const podcastsTable = pgTable(
  'podcasts',
  {
    pid: text('pid').primaryKey().notNull(),
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
    eid: text('eid').primaryKey().notNull(),
    pid: text('pid').references(() => podcastsTable.pid).notNull(),
    title: text('title').default(''),
    shownotes: text('shownotes').default(''),
    description: text('description').default(''),
    enclosure: text('enclosure').default(''),
    image: text('image').default(''),
    isLiked: boolean('isLiked').default(false),
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
