export default defineEventHandler((event) => {
  const url = getRequestURL(event)
  const method = event.method

  console.warn(`New request:
  URL: ${url}
  Method: ${method}
 `)
})
