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
    pid: text('pid').primaryKey(),
    title: text('title'),
    author: text('author'),
    description: text('description'),
    image: text('image'),
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
