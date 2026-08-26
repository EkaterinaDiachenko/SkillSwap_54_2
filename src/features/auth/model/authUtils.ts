import { LOCAL_STORAGE_KEYS, COOKIE_KEYS } from '@/shared/lib/constants'
import { generateId } from '@/shared/lib/helpers'
import { setCookie, deleteCookie } from '@/shared/lib/cookies'

type AuthSession = {
  userId: string
  refreshToken: string
}

type AuthTokens = {
  accessToken: string
  refreshToken: string
}

export function getAuthSession(): AuthSession | null {
  try {
    const userId = localStorage.getItem(LOCAL_STORAGE_KEYS.AUTH_SESSION)
    const refreshToken = localStorage.getItem(LOCAL_STORAGE_KEYS.REFRESH_TOKEN)

    if (!userId || !refreshToken) {
      return null
    }

    return { userId, refreshToken }
  } catch {
    return null
  }
}

export function saveAuthSession(userId: string): AuthTokens {
  const accessToken = generateId()
  const refreshToken = generateId()

  setCookie(COOKIE_KEYS.ACCESS_TOKEN, accessToken)
  localStorage.setItem(LOCAL_STORAGE_KEYS.REFRESH_TOKEN, refreshToken)
  localStorage.setItem(LOCAL_STORAGE_KEYS.AUTH_SESSION, userId)

  return { accessToken, refreshToken }
}

export function clearAuthSession(): void {
  deleteCookie(COOKIE_KEYS.ACCESS_TOKEN)
  localStorage.removeItem(LOCAL_STORAGE_KEYS.REFRESH_TOKEN)
  localStorage.removeItem(LOCAL_STORAGE_KEYS.AUTH_SESSION)
}
