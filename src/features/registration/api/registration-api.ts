import { getUsersApi } from '@/entities/user/api/users-api'
import { clearAuthSession, saveAuthSession } from '@/features/auth/model/authUtils'
import { LOCAL_STORAGE_KEYS } from '@/shared/lib/constants'
import { generateId } from '@/shared/lib/helpers'
import type { City, Gender, Skill, User } from '@/shared/types'
import { findSubcategoryParentId, getSubcategoryTitle } from '../lib/registration-helpers'
import type {
  RegisterUserApiResult,
  RegistrationDraft,
  RegistrationLearningSkill,
} from '../model/registration-types'

const RESPONSE_DELAY_MS = 200
const CITIES: City[] = [
  'Москва',
  'Санкт-Петербург',
  'Новосибирск',
  'Екатеринбург',
  'Казань',
  'Нижний Новгород',
  'Челябинск',
  'Самара',
  'Омск',
  'Ростов-на-Дону',
  'Уфа',
  'Красноярск',
  'Воронеж',
  'Пермь',
  'Архангельск',
]

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

function isGender(value: string): value is Gender {
  return value === 'male' || value === 'female'
}

function isCity(value: string): value is City {
  return CITIES.includes(value as City)
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null
}

function isStringArray(value: unknown): value is string[] {
  return Array.isArray(value) && value.every((item) => typeof item === 'string')
}

function isRegistrationLearningSkill(value: unknown): value is RegistrationLearningSkill {
  return (
    isRecord(value) &&
    isStringArray(value.categoryIds) &&
    isStringArray(value.subcategoryIds)
  )
}

function isRegistrationDraft(value: unknown): value is RegistrationDraft {
  if (!isRecord(value)) {
    return false
  }

  return (
    isRecord(value.credentials) &&
    isRecord(value.personalData) &&
    isRegistrationLearningSkill(value.learningSkill) &&
    isRecord(value.offer)
  )
}

function readStoredList<T>(key: string): T[] {
  try {
    const raw = localStorage.getItem(key)

    if (!raw) {
      return []
    }

    const parsed: unknown = JSON.parse(raw)

    return Array.isArray(parsed) ? (parsed as T[]) : []
  } catch {
    return []
  }
}

function writeStoredList<T>(key: string, list: T[]): void {
  localStorage.setItem(key, JSON.stringify(list))
}

function getAge(birthDate: string): number {
  const birth = new Date(birthDate)
  const today = new Date()
  let age = today.getFullYear() - birth.getFullYear()
  const monthDiff = today.getMonth() - birth.getMonth()

  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
    age -= 1
  }

  return age
}

export function getRegistrationDraft(): RegistrationDraft | null {
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEYS.REGISTRATION_DRAFT)

    if (!raw) {
      return null
    }

    const parsed: unknown = JSON.parse(raw)

    return isRegistrationDraft(parsed) ? parsed : null
  } catch {
    return null
  }
}

export function saveRegistrationDraft(draft: RegistrationDraft): void {
  try {
    localStorage.setItem(LOCAL_STORAGE_KEYS.REGISTRATION_DRAFT, JSON.stringify(draft))
  } catch {
    throw new Error('Не удалось сохранить черновик регистрации')
  }
}

export function clearRegistrationDraft(): void {
  localStorage.removeItem(LOCAL_STORAGE_KEYS.REGISTRATION_DRAFT)
}

export async function registerUserApi(draft: RegistrationDraft): Promise<RegisterUserApiResult> {
  await delay(RESPONSE_DELAY_MS)

  const users = await getUsersApi()
  const email = draft.credentials.email.trim().toLowerCase()

  if (users.some((user) => user.email.toLowerCase() === email)) {
    throw new Error('Пользователь с таким email уже зарегистрирован')
  }

  if (!isGender(draft.personalData.gender) || !isCity(draft.personalData.city)) {
    throw new Error('Не удалось завершить регистрацию: заполните пол и город')
  }

  const userId = generateId()
  const teachSkillId = generateId()
  const createdAt = new Date().toISOString()

  const user: User = {
    id: userId,
    name: draft.personalData.name,
    email: draft.credentials.email,
    password: draft.credentials.password,
    city: draft.personalData.city,
    gender: draft.personalData.gender,
    age: getAge(draft.personalData.birthDate),
    about: '',
    avatarUrl: draft.personalData.avatarUrl ?? null,
    likesCount: 0,
    favoriteSkillIds: [],
    createdAt,
  }

  const teachSkill: Skill = {
    id: teachSkillId,
    title: draft.offer.title,
    description: draft.offer.description,
    type: 'teach',
    categoryId: draft.offer.category,
    subcategoryId: draft.offer.subcategory,
    imageUrl: draft.offer.imageUrls,
    authorId: userId,
    createdAt,
  }

  const learnSkills: Skill[] = draft.learningSkill.subcategoryIds.flatMap((subcategoryId) => {
    const parentCategoryId = findSubcategoryParentId(subcategoryId)

    if (!parentCategoryId || !draft.learningSkill.categoryIds.includes(parentCategoryId)) {
      return []
    }

    return [
      {
        id: generateId(),
        title: getSubcategoryTitle(parentCategoryId, subcategoryId),
        description: '',
        type: 'learn' as const,
        categoryId: parentCategoryId,
        subcategoryId,
        imageUrl: [],
        authorId: userId,
        createdAt,
      },
    ]
  })

  const nextUsers = [...readStoredList<User>(LOCAL_STORAGE_KEYS.REGISTERED_USERS), user]
  const nextSkills = [
    ...readStoredList<Skill>(LOCAL_STORAGE_KEYS.REGISTERED_SKILLS),
    teachSkill,
    ...learnSkills,
  ]

  let accessToken: string

  try {
    ;({ accessToken } = saveAuthSession(userId))
    writeStoredList(LOCAL_STORAGE_KEYS.REGISTERED_USERS, nextUsers)
    writeStoredList(LOCAL_STORAGE_KEYS.REGISTERED_SKILLS, nextSkills)
    clearRegistrationDraft()
  } catch (error) {
    clearAuthSession()
    throw error instanceof Error
      ? error
      : new Error('Не удалось завершить регистрацию')
  }

  const authUser = {
    id: user.id,
    name: user.name,
    email: user.email,
    avatarUrl: user.avatarUrl,
    token: accessToken,
  }

  return {
    user,
    skills: [teachSkill, ...learnSkills],
    authUser,
  }
}
