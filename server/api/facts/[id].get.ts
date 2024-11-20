export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id');

  return await handleFetch(event, `/facts/${id}`, { method: 'GET' });
})