import * as yup from 'yup'
import type { ImageFile } from '@/shared/ui/image-upload'

/** Допустимые MIME-типы изображений навыка */
const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/png']

/** Максимальный размер одного файла — 2 МБ */
const MAX_IMAGE_SIZE_BYTES = 2 * 1024 * 1024

/** Поля третьего шага регистрации — навык, который пользователь готов преподавать */
export type SkillRegisterFormValues = {
  skillName: string
  category: string
  subcategory: string
  description: string
  /** Необязательный массив; если файлы добавлены — проверяем тип и размер */
  images: ImageFile[]
}

/**
 * Схема валидации шага 3.
 * images опционален; при наличии файлов каждый должен быть JPEG/PNG и ≤ 2 МБ.
 */
export const skillRegisterSchema = yup.object({
  skillName: yup
    .string()
    .required('Введите название навыка')
    .min(3, 'Название должно содержать от 3 до 50 символов')
    .max(50, 'Название должно содержать от 3 до 50 символов'),
  category: yup.string().required('Выберите категорию'),
  subcategory: yup.string().required('Выберите подкатегорию'),
  description: yup
    .string()
    .required('Введите описание')
    .max(500, 'Описание не должно превышать 500 символов'),
  images: yup
    .array()
    .default([])
    .test('images-valid', function validateImages(files) {
      if (!files?.length) {
        return true
      }

      for (const file of files) {
        if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
          return this.createError({
            message: 'Допустимы только изображения JPEG и PNG',
          })
        }

        if (file.size > MAX_IMAGE_SIZE_BYTES) {
          return this.createError({
            message: 'Размер изображения не должен превышать 2 МБ',
          })
        }
      }

      return true
    }),
})
