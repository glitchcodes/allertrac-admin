export default defineEventHandler(async (event) => {
  const token = getRouterParam(event, 'token');

  return await handleFetch(event, `/auth/check-forget-token/${token}`, { method: 'GET' });
})