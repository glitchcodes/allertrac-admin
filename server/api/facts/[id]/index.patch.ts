export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id');
  const body = await readFormData(event);

  return await handleFetch(event, `/admin/facts/${id}`, {
    method: 'POST',
    body: body
  });
})