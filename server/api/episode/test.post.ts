export default defineEventHandler(async (event) => {
  console.warn('API route handler triggered')
  const { pid, episodes } = await readBody(event)
  console.warn('test', pid, episodes)
})
