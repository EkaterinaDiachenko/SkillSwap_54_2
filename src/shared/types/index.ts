// ─── Skill ───────────────────────────────────────────────

/** Направление навыка: пользователь может обучать или учиться */
export type SkillType = 'teach' | 'learn'

export interface Skill {
  id: string
  title: string
  description: string
  type: SkillType
  /** ID категории из справочника (skills-mega-menu) */
  categoryId: string
  /** ID подкатегории внутри выбранной категории */
  subcategoryId: string
  imageUrl: string | null
  /** ID автора навыка — ссылка на User.id */
  authorId: string
  createdAt: string
}

// ─── User ────────────────────────────────────────────────

/** Пол пользователя — используется в профиле и фильтрах каталога */
export type Gender = 'male' | 'female'

/** Города, доступные при регистрации и фильтрации каталога */
export type City =
  | 'Москва'
  | 'Санкт-Петербург'
  | 'Новосибирск'
  | 'Екатеринбург'
  | 'Казань'
  | 'Нижний Новгород'
  | 'Челябинск'
  | 'Самара'
  | 'Омск'
  | 'Ростов-на-Дону'
  | 'Уфа'
  | 'Красноярск'
  | 'Воронеж'
  | 'Пермь'
  | 'Архангельск'

/** Полная модель пользователя — хранится в users.json и используется на бэкенде/в моках */
export interface User {
  id: string
  name: string
  email: string
  password: string
  city: City
  gender: Gender
  age: number
  about: string
  avatarUrl: string | null
  likesCount: number
  /** ID навыков, добавленных пользователем в избранное */
  favoriteSkillIds: string[]
  createdAt: string
}

// ─── Request ─────────────────────────────────────────────
export type RequestStatus = 'pending' | 'accepted' | 'rejected' | 'inProgress' | 'done'

export interface SwapRequest {
  id: string
  skillId: string
  fromUserId: string
  toUserId: string
  status: RequestStatus
  createdAt: string
  updatedAt: string
}

// ─── Auth ────────────────────────────────────────────────

/** Данные авторизованного пользователя — сохраняются в localStorage без пароля */
export interface AuthUser {
  id: string
  name: string
  email: string
  avatarUrl: string | null
  token: string
}
