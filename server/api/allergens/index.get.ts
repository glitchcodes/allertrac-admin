export default defineEventHandler(async (event) => {
  return await handleFetch(event, '/allergens', { method: 'GET' })
})