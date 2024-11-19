export default defineEventHandler(async (event) => {
  return await handleFetch(event, '/facts/category/all', { method: 'GET' })
})