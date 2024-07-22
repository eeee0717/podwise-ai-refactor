import {
  boolean,
  pgTable,
  text,
  timestamp,
} from 'drizzle-orm/pg-core'

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
    pubDate: timestamp('pubDate', { mode: 'string' }).defaultNow(),
    isLiked: boolean('isLiked').default(false),
    transcript: text('transcript').default(''),
    summary: text('summary').default(''),
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
