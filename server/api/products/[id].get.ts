export default defineEventHandler(async (event) => {
  const id = Number(getRouterParam(event, 'id'))

  if (!Number.isInteger(id) || id <= 0) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Некорректный id продукта',
    })
  }

  const product = await fetchProductById(id)

  if (!product) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Продукт не найден',
    })
  }

  return product
})
