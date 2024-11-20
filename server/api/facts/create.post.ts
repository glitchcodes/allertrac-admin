export default defineEventHandler(async (event) => {
  const body = await readFormData(event);

  return await handleFetch(event, `/admin/facts`, {
    method: 'POST',
    body: body
  });
})