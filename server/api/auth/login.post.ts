interface UserRow {
  id: number
  email: string
  name: string | null
  password_hash: string
}

export default defineEventHandler(async (event) => {
  const body = await readBody<ILoginBody>(event)
  const email = body?.email?.trim().toLowerCase()
  const password = body?.password ?? ''

  if (!email || !password) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Обязательные поля: email, password',
    })
  }

  const db = useDb()
  const [rows] = await db.query<UserRow[]>(
    'SELECT id, email, name, password_hash FROM users WHERE email = ? LIMIT 1',
    [email]
  )

  const user = rows[0]

  if (!user || !(await verifyPassword(password, user.password_hash))) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Неверный email или пароль',
    })
  }

  const token = await signAuthToken({
    sub: user.id,
    email: user.email,
  })

  return {
    token,
    user: {
      id: user.id,
      email: user.email,
      name: user.name,
    },
  } satisfies ILoginResponse
})
