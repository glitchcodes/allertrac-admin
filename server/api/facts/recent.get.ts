export default defineEventHandler(async (event) => {
  return await handleFetch(event, `/facts/recent`, { method: 'GET' });
})