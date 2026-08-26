import type { AuthUser, City, Gender, Skill, User } from '@/shared/types'

export type RegistrationStep = 1 | 2 | 3

export type RegistrationCredentials = {
  email: string
  password: string
}

export type RegistrationPersonalData = {
  name: string
  birthDate: string
  gender: Gender | ''
  city: City | ''
  avatarUrl: string | null
}

export type RegistrationLearningSkill = {
  category: string
  subcategory: string
}

export type RegistrationOffer = {
  title: string
  category: string
  subcategory: string
  description: string
  imageUrls: string[]
}

export type RegistrationDraft = {
  credentials: RegistrationCredentials
  personalData: RegistrationPersonalData
  learningSkill: RegistrationLearningSkill
  offer: RegistrationOffer
}

export type RegisterUserApiResult = {
  user: User
  skills: Skill[]
  authUser: AuthUser
}
