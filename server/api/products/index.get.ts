export default defineEventHandler(async (event) => {
  const query = getQuery(event)

  return fetchProductsPaginated({
    search: String(query.search ?? '').trim(),
    categoryId: String(query.category_id ?? '').trim(),
    page: Number(query.page),
    limit: Number(query.limit),
    sort: String(query.sort ?? ''),
  })
})
