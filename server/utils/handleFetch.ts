import { H3Event, parseCookies } from "h3";

export const handleFetch = async (event: H3Event, url: string, options: any = {}) => {
  // Init options
  const baseURL = process.env.API_BASEURL;

  const cookies = parseCookies(event);
  const token = cookies['sanctum.token.cookie'];

  const defaultHeaders = {
    Accept: 'application/json',
    ...options.headers
  };

  if (token) {
    defaultHeaders['Authorization'] = `Bearer ${token}`;
  }

  try {
    return await $fetch(url, {
      baseURL: baseURL,
      headers: defaultHeaders,
      credentials: 'include',
      ...options
    });
  } catch (error) {
    return error
  }
}