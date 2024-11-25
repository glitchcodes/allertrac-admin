export default defineEventHandler(async (event) => {
  const body = await readFormData(event);

  return await handleFetch(event, `/auth/reset-password`, {
    method: 'POST',
    body: body
  });
})