export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id');
  const contentType = getRequestHeader(event, 'content-type');

  const body = await readMultipartFormData(event);
  const formData = new FormData();

  body?.forEach((value) => {
    if (value.name && value.data) {
      formData.append(value.name, value.data.toString())
    }
  })

  return await handleFetch(event, `/meal/${id}`, {
    method: 'POST',
    body: formData
  });
})