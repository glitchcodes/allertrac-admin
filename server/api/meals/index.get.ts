import { handleFetch } from "~/server/utils/handleFetch";

export default defineEventHandler(async (event) => {
  const queries = getQuery(event);
  const encodedQueryString = new URLSearchParams(
    Object.entries(queries).map(([key, value]) => [
      encodeURIComponent(key),
      encodeURIComponent(value as string)
    ])
  ).toString();

  return await handleFetch(event, `/admin/meal?${encodedQueryString}`, { method: 'GET' });
});