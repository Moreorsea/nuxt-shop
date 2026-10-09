interface IAuthUser {
  id: number
  email: string
  name: string | null
}

interface ILoginBody {
  email: string
  password: string
}

interface ILoginResponse {
  token: string
  user: IAuthUser
}

interface IJwtPayload {
  sub: number
  email: string
}
