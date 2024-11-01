import { H3Event, parseCookies } from "h3";

export const handleFetch = async (event: H3Event, url: string, options: any = {}) => {
  // Init options
  const baseURL = process.env.API_BASEURL;

  const cookies = parseCookies(event);
  const token = cookies?.token;

  const defaultHeaders = {
    ...options.headers
  };

  if (token) {
    defaultHeaders['Authorization'] = `Bearer ${token}`;
  }

  try {
    return await $fetch(url, {
      baseURL: baseURL,
      headers: defaultHeaders,
      ...options
    });
  } catch (error) {
    return error
  }
}