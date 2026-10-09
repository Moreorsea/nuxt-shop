import bcrypt from 'bcryptjs'
import { SignJWT, jwtVerify } from 'jose'

function getJwtSecret() {
  const config = useRuntimeConfig()
  const secret = config.jwtSecret

  if (!secret) {
    throw createError({
      statusCode: 500,
      statusMessage: 'JWT_SECRET не настроен',
    })
  }

  return new TextEncoder().encode(secret)
}

export async function hashPassword(password: string) {
  return bcrypt.hash(password, 10)
}

export async function verifyPassword(password: string, passwordHash: string) {
  return bcrypt.compare(password, passwordHash)
}

export async function signAuthToken(payload: IJwtPayload, expiresIn = '7d') {
  return new SignJWT({ email: payload.email })
    .setProtectedHeader({ alg: 'HS256' })
    .setSubject(String(payload.sub))
    .setIssuedAt()
    .setExpirationTime(expiresIn)
    .sign(getJwtSecret())
}

export async function verifyAuthToken(token: string): Promise<IJwtPayload> {
  const { payload } = await jwtVerify(token, getJwtSecret())

  const sub = Number(payload.sub)
  const email = typeof payload.email === 'string' ? payload.email : ''

  if (!Number.isInteger(sub) || sub <= 0 || !email) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Некорректный токен',
    })
  }

  return { sub, email }
}
