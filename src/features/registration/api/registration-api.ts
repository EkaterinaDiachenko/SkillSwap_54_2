import { SKILL_CATEGORIES } from '@/entities/skill/model/skill-categories'
import { getUsersApi } from '@/entities/user/api/users-api'
import { saveAuthSession } from '@/features/auth/model/authUtils'
import { LOCAL_STORAGE_KEYS } from '@/shared/lib/constants'
import { generateId } from '@/shared/lib/helpers'
import type { City, Gender, Skill, User } from '@/shared/types'
import type {
  RegisterUserApiResult,
  RegistrationDraft,
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

function isRegistrationDraft(value: unknown): value is RegistrationDraft {
  if (!isRecord(value)) {
    return false
  }

  return (
    isRecord(value.credentials) &&
    isRecord(value.personalData) &&
    isRecord(value.learningSkill) &&
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

function appendStoredItem<T extends { id: string }>(key: string, item: T): void {
  const list = readStoredList<T>(key)

  if (list.some((existing) => existing.id === item.id)) {
    return
  }

  list.push(item)
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

function getSubcategoryTitle(categoryId: string, subcategoryId: string): string {
  const category = SKILL_CATEGORIES.find((item) => item.id === categoryId)
  const subcategory = category?.subcategories.find((item) => item.id === subcategoryId)

  return subcategory?.title ?? subcategoryId
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
  const learnSkillId = generateId()
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

  const learnSkill: Skill = {
    id: learnSkillId,
    title: getSubcategoryTitle(draft.learningSkill.category, draft.learningSkill.subcategory),
    description: '',
    type: 'learn',
    categoryId: draft.learningSkill.category,
    subcategoryId: draft.learningSkill.subcategory,
    imageUrl: [],
    authorId: userId,
    createdAt,
  }

  appendStoredItem(LOCAL_STORAGE_KEYS.REGISTERED_USERS, user)
  appendStoredItem(LOCAL_STORAGE_KEYS.REGISTERED_SKILLS, teachSkill)
  appendStoredItem(LOCAL_STORAGE_KEYS.REGISTERED_SKILLS, learnSkill)

  const { accessToken } = saveAuthSession(userId)

  const authUser = {
    id: user.id,
    name: user.name,
    email: user.email,
    avatarUrl: user.avatarUrl,
    token: accessToken,
  }

  clearRegistrationDraft()

  return {
    user,
    skills: [teachSkill, learnSkill],
    authUser,
  }
}
