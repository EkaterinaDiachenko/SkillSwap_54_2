import type { IconName } from '@/shared/ui/icon'
import type { Color } from '@/shared/ui/tag'

// Переэкспортируем типы из shared — используй именно этот импорт внутри entities/skill
export type { Skill, SkillType } from '@/shared/types'

export interface SkillSubcategory {
  id: string
  title: string
}

export interface SkillCategory {
  id: string
  title: string
  icon: IconName
  color: Color
  subcategories: SkillSubcategory[]
}
