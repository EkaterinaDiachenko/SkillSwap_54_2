import * as yup from 'yup'
import { SKILL_CATEGORIES } from '@/entities/skill/model/skill-categories'

/** Поля второго шага регистрации — личные данные и интересы */
export type AboutRegisterFormValues = {
  name: string
  birthDate?: Date
  gender: string
  city: string
  /** multiple Select — массив выбранных категорий */
  category: string[]
  /** multiple Select — массив выбранных подкатегорий */
  subcategory: string[]
}

/** Начало текущего дня — для сравнения даты рождения без учёта времени */
function startOfToday(): Date {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  return today
}

/**
 * Схема валидации шага 2.
 */
export const aboutRegisterSchema = yup.object({
  name: yup
    .string()
    .trim()
    .required('Введите имя')
    .min(2, 'Имя должно содержать от 2 до 50 символов')
    .max(50, 'Имя должно содержать от 2 до 50 символов'),
  birthDate: yup
    .mixed<Date>()
    .test('required', 'Введите дату рождения', (value) => value instanceof Date)
    .test(
      'max-date',
      'Дата рождения не может быть позже текущей даты',
      (value) => !(value instanceof Date) || value <= startOfToday(),
    ),
  gender: yup.string().required('Выберите пол'),
  city: yup.string().required('Выберите город'),
  category: yup
    .array()
    .of(yup.string().required())
    .min(1, 'Выберите категорию')
    .required('Выберите категорию'),
  subcategory: yup
    .array()
    .of(yup.string().required())
    .min(1, 'Выберите подкатегорию')
    .required('Выберите подкатегорию')
    .test(
      'category-subcategory-relation',
      'Для каждой выбранной категории выберите хотя бы одну подкатегорию',
      function validateCategorySubcategoryRelation(subcategoryIds, context) {
        const categoryIds = context.parent?.category

        if (!Array.isArray(categoryIds) || !Array.isArray(subcategoryIds)) {
          return true
        }

        return categoryIds.every((categoryId) => {
          const category = SKILL_CATEGORIES.find((item) => item.id === categoryId)

          if (!category) {
            return false
          }

          const categorySubcategoryIds = new Set(
            category.subcategories.map((subcategory) => subcategory.id),
          )

          return subcategoryIds.some((subcategoryId) =>
            categorySubcategoryIds.has(subcategoryId),
          )
        })
      },
    ),
})
