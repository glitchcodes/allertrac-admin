export default defineEventHandler(async (event) => {
  const body = await readFormData(event);

  return await handleFetch(event, `/auth/verify-password-request`, {
    method: 'POST',
    body: body
  });
})