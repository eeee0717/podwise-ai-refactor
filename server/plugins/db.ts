import { db } from '../utils/db'

export default defineNitroPlugin(() => {
  console.warn('Database connection established')
})
