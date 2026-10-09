interface ProductRow {
  id: number
  category_id: number
  name: string
  price: number
  discount: number | null
  created_at: string | Date
  rating: number
  image_id: number | null
  path: string | null
  alt: string | null
  sort_order: number | null
}

interface ProductFilters {
  search?: string
  categoryId?: string
}

interface ProductPagination {
  page?: number
  limit?: number
}

interface ProductSort {
  sort?: string
}

const DEFAULT_PAGE = 1
const DEFAULT_LIMIT = 10
const MAX_LIMIT = 100
const DEFAULT_SORT: TProductSort = 'date_desc'

const SORT_MAP: Record<TProductSort, string> = {
  date_desc: 'p.created_at DESC, p.id DESC',
  date_asc: 'p.created_at ASC, p.id ASC',
  rating: 'p.rating DESC, p.id DESC',
}

function buildWhereClause(filters: ProductFilters) {
  const conditions: string[] = []
  const params: (string | number)[] = []

  if (filters.search) {
    conditions.push('p.name LIKE ?')
    params.push(`%${filters.search}%`)
  }

  if (filters.categoryId) {
    conditions.push('p.category_id = ?')
    params.push(Number(filters.categoryId))
  }

  return {
    where: conditions.length ? `WHERE ${conditions.join(' AND ')}` : '',
    params,
  }
}

export function parsePagination(page?: number, limit?: number) {
  const safePage = Math.max(DEFAULT_PAGE, Number(page) || DEFAULT_PAGE)
  const safeLimit = Math.min(MAX_LIMIT, Math.max(1, Number(limit) || DEFAULT_LIMIT))

  return {
    page: safePage,
    limit: safeLimit,
    offset: (safePage - 1) * safeLimit,
  }
}

export function parseSort(sort?: string): TProductSort {
  if (sort === 'date_asc' || sort === 'rating' || sort === 'date_desc') {
    return sort
  }

  return DEFAULT_SORT
}

function mapRowsToProducts(rows: ProductRow[], orderedIds?: number[]): IProduct[] {
  const productsMap = new Map<number, IProduct>()

  for (const row of rows) {
    if (!productsMap.has(row.id)) {
      productsMap.set(row.id, {
        id: row.id,
        category_id: row.category_id,
        name: row.name,
        price: Number(row.price),
        discount: row.discount,
        created_at: typeof row.created_at === 'string'
          ? row.created_at
          : row.created_at.toISOString(),
        rating: Number(row.rating),
        images: [],
      })
    }

    if (row.image_id && row.path) {
      productsMap.get(row.id)!.images.push({
        id: row.image_id,
        path: row.path,
        alt: row.alt,
        sort_order: row.sort_order ?? 0,
      })
    }
  }

  if (orderedIds?.length) {
    return orderedIds
      .map(id => productsMap.get(id))
      .filter((product): product is IProduct => Boolean(product))
  }

  return Array.from(productsMap.values())
}

async function fetchProductRowsByIds(productIds: number[]) {
  if (!productIds.length) {
    return []
  }

  const db = useDb()
  const placeholders = productIds.map(() => '?').join(', ')
  const sql = `
    SELECT
      p.id,
      p.category_id,
      p.name,
      p.price,
      p.discount,
      p.created_at,
      p.rating,
      pi.id AS image_id,
      pi.path,
      pi.alt,
      pi.sort_order
    FROM products p
    LEFT JOIN product_images pi ON pi.product_id = p.id
    WHERE p.id IN (${placeholders})
    ORDER BY FIELD(p.id, ${placeholders}), pi.sort_order
  `

  const [rows] = await db.query<ProductRow[]>(sql, [...productIds, ...productIds])
  return mapRowsToProducts(rows, productIds)
}

export async function fetchProducts(filters: ProductFilters & ProductSort): Promise<IProduct[]> {
  const result = await fetchProductsPaginated(filters)
  return result.data
}

export async function fetchProductsPaginated(
  filters: ProductFilters & ProductPagination & ProductSort
): Promise<IPaginatedResponse<IProduct>> {
  const db = useDb()
  const { where, params } = buildWhereClause(filters)
  const { page, limit } = parsePagination(filters.page, filters.limit)
  const sort = parseSort(filters.sort)
  const orderBy = SORT_MAP[sort]

  const [countRows] = await db.query<Array<{ total: number }>>(
    `SELECT COUNT(*) AS total FROM products p ${where}`,
    params
  )

  const total = Number(countRows[0]?.total ?? 0)
  const totalPages = total ? Math.ceil(total / limit) : 0
  const safePage = totalPages ? Math.min(page, totalPages) : DEFAULT_PAGE
  const safeOffset = (safePage - 1) * limit

  const [idRows] = await db.query<Array<{ id: number }>>(
    `SELECT p.id FROM products p ${where} ORDER BY ${orderBy} LIMIT ? OFFSET ?`,
    [...params, limit, safeOffset]
  )

  const data = await fetchProductRowsByIds(idRows.map(row => row.id))

  return {
    data,
    meta: {
      page: safePage,
      limit,
      total,
      totalPages,
    },
  }
}

export async function fetchProductById(id: number): Promise<IProduct | null> {
  const products = await fetchProductRowsByIds([id])
  return products[0] ?? null
}
