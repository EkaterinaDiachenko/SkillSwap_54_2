import { LOCAL_STORAGE_KEYS } from '@/shared/lib/constants'
import type { User } from '@/shared/types'

const USERS_URL = '/db/users.json'
const RESPONSE_DELAY_MS = 200

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

export async function getUsersApi(): Promise<User[]> {
  await delay(RESPONSE_DELAY_MS)

  try {
    const response = await fetch(USERS_URL)

    if (!response.ok) {
      throw new Error('Не удалось загрузить пользователей')
    }

    const mockUsers: User[] = await response.json()
    let registeredUsers: User[] = []

    try {
      const rawRegisteredUsers = localStorage.getItem(LOCAL_STORAGE_KEYS.REGISTERED_USERS)

      if (rawRegisteredUsers) {
        const parsedRegisteredUsers: unknown = JSON.parse(rawRegisteredUsers)

        if (Array.isArray(parsedRegisteredUsers)) {
          registeredUsers = parsedRegisteredUsers as User[]
        }
      }
    } catch {
      registeredUsers = []
    }

    const usersById = new Map<string, User>()

    for (const user of mockUsers) {
      usersById.set(user.id, user)
    }

    for (const user of registeredUsers) {
      if (!usersById.has(user.id)) {
        usersById.set(user.id, user)
      }
    }

    return Array.from(usersById.values())
  } catch (error) {
    if (error instanceof Error) {
      throw error
    }

    throw new Error('Не удалось загрузить пользователей')
  }
}
