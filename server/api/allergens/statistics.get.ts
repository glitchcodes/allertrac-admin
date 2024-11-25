export default defineEventHandler(async (event) => {
  return await handleFetch(event, `/admin/allergens/statistics`, { method: 'GET' });
})