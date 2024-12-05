export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id');
  const body = await readBody(event);

  return await handleFetch(event, `/admin/facts/${id}/publish`, {
    method: 'PATCH',
    body: body
  });
})