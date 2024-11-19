export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id');

  return await handleFetch(event, `/admin/meal/${id}`, { method: 'GET' });
})