export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id');

  return await handleFetch(event, `/admin/facts/${id}`, { method: 'DELETE' });
})