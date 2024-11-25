export default defineEventHandler(async (event) => {
  const body = await readFormData(event);

  return await handleFetch(event, `/auth/forgot-password`, {
    method: 'POST',
    body: body
  });
})