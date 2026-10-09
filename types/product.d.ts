interface IProductImage {
  id: number
  path: string
  alt: string | null
  sort_order: number
}

interface IProduct {
  id: number
  category_id: number
  name: string
  price: number
  discount: number | null
  created_at: string
  rating: number
  images: IProductImage[]
}

type TProductSort = 'date_desc' | 'date_asc' | 'rating'
