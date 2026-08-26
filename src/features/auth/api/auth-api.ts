import type { AuthUser } from '@/shared/types'
import { COOKIE_KEYS } from '@/shared/lib/constants'
import { getCookie } from '@/shared/lib/cookies'
import { getUsersApi } from '@/entities/user/api'
import { getAuthSession, saveAuthSession, clearAuthSession } from '../model/authUtils'

export type TLoginData = {
  email: string
  password: string
}

const RESPONSE_DELAY_MS = 200

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

function toAuthUser(user: { id: string; name: string; email: string; avatarUrl: string | null }, token: string): AuthUser {
  return { id: user.id, name: user.name, email: user.email, avatarUrl: user.avatarUrl, token }
}

export async function getUserApi(): Promise<AuthUser> {
  await delay(RESPONSE_DELAY_MS)

  const accessToken = getCookie(COOKIE_KEYS.ACCESS_TOKEN)
  const session = getAuthSession()

  if (!accessToken || !session) {
    throw new Error('Отсутствует сессия или токен доступа')
  }

  const users = await getUsersApi()
  const user = users.find((u) => u.id === session.userId)

  if (!user) {
    throw new Error('Пользователь не найден')
  }

  return toAuthUser(user, accessToken)
}

export async function loginUserApi(data: TLoginData): Promise<AuthUser> {
  await delay(RESPONSE_DELAY_MS)

  const users = await getUsersApi()
  const user = users.find(
    (u) => u.email.toLowerCase() === data.email.toLowerCase() && u.password === data.password,
  )

  if (!user) {
    throw new Error('Неверный email или пароль')
  }

  const { accessToken } = saveAuthSession(user.id)

  return toAuthUser(user, accessToken)
}

export async function logoutApi(): Promise<void> {
  await delay(RESPONSE_DELAY_MS)

  try {
    clearAuthSession()
  } catch {
    // сессия уже отсутствует — считаем успешным выходом
  }
}
