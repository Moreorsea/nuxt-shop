interface IPaginationMeta {
  page: number
  limit: number
  total: number
  totalPages: number
}

interface IPaginatedResponse<T> {
  data: T[]
  meta: IPaginationMeta
}
