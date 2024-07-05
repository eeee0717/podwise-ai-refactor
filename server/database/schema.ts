import { drizzle } from 'drizzle-orm/vercel-postgres'
import { sql } from '@vercel/postgres'
import {
  index,
  pgTable,
  serial,
  text,
} from 'drizzle-orm/pg-core'

export const podcastsTable = pgTable(
  'podcasts',
  {
    pid: serial('pid').primaryKey(),
    title: text('title').notNull(),
    author: text('author').notNull(),
    description: text('description').notNull(),
    image: text('image').notNull(),
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
    eid: serial('eid').primaryKey(),
    pid: text('pid').references(() => podcastsTable.pid),
    title: text('title').notNull(),
    description: text('description').notNull(),
    enclosure: text('enclosure').notNull(),
    image: text('image').notNull(),
  },
  // (table) => {
  //   return {
  //     eidIndex: index('eid_idx').on(table.eid),
  //   }
  // },
)
