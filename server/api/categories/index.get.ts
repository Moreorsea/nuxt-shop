export default defineCachedEventHandler(async () => {
  const db = useDb()
  const [rows] = await db.query<ICategory[]>(
    'SELECT id, slug, title FROM categories ORDER BY id'
  )
    console.log('ходил в базу')
  return rows
}, {
  maxAge: 60 * 5,
  varies: ['query.page']
})
