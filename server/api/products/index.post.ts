import type { ResultSetHeader } from 'mysql2'

interface CreateProductImageBody {
  path: string
  alt?: string | null
  sort_order?: number
}

interface CreateProductBody {
  category_id: number
  name: string
  price: number
  discount?: number | null
  rating?: number
  images: CreateProductImageBody[]
}

export default defineEventHandler(async (event) => {
  const body = await readBody<CreateProductBody>(event)

  if (!body?.category_id || !body?.name?.trim() || body?.price == null) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Обязательные поля: category_id, name, price',
    })
  }

  if (!body.images?.length || !body.images.every(img => img.path?.trim())) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Нужен хотя бы один объект в images с полем path',
    })
  }

  const rating = body.rating == null ? 0 : Number(body.rating)

  const db = useDb()
  const [result] = await db.query<ResultSetHeader>(
    'INSERT INTO products (category_id, name, price, discount, rating) VALUES (?, ?, ?, ?, ?)',
    [
      body.category_id,
      body.name.trim(),
      body.price,
      body.discount ?? null,
      rating,
    ]
  )

  const productId = result.insertId

  for (const [index, image] of body.images.entries()) {
    await db.query(
      'INSERT INTO product_images (product_id, path, alt, sort_order) VALUES (?, ?, ?, ?)',
      [
        productId,
        image.path.trim(),
        image.alt ?? null,
        image.sort_order ?? index,
      ]
    )
  }

  const product = await fetchProductById(productId)

  setResponseStatus(event, 201)
  return product ?? {
    id: productId,
    category_id: body.category_id,
    name: body.name.trim(),
    price: body.price,
    discount: body.discount ?? null,
    created_at: new Date().toISOString(),
    rating,
    images: body.images.map((image, index) => ({
      id: 0,
      path: image.path.trim(),
      alt: image.alt ?? null,
      sort_order: image.sort_order ?? index,
    })),
  }
})
