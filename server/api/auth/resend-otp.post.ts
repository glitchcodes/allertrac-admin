export default defineEventHandler(async (event) => {
  const body = await readFormData(event);

  return await handleFetch(event, `/auth/resend-verification`, {
    method: 'POST',
    body: body
  });
})