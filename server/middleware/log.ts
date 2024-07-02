export default defineEventHandler((event) => {
  console.warn(`New request: ${getRequestURL(event)}`)
})
