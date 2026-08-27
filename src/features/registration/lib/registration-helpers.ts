import { SKILL_CATEGORIES } from '@/entities/skill/model/skill-categories'
import type { ImageFile } from '@/shared/ui/image-upload'

export function getCategoryTitle(categoryId: string): string {
  return SKILL_CATEGORIES.find((category) => category.id === categoryId)?.title ?? categoryId
}

export function getSubcategoryTitle(categoryId: string, subcategoryId: string): string {
  const category = SKILL_CATEGORIES.find((item) => item.id === categoryId)
  const subcategory = category?.subcategories.find((item) => item.id === subcategoryId)

  return subcategory?.title ?? subcategoryId
}

export function findSubcategoryParentId(subcategoryId: string): string | null {
  for (const category of SKILL_CATEGORIES) {
    if (category.subcategories.some((subcategory) => subcategory.id === subcategoryId)) {
      return category.id
    }
  }

  return null
}

export function filesToDataUrls(files: File[]): Promise<string[]> {
  return Promise.all(
    files.map(
      (file) =>
        new Promise<string>((resolve, reject) => {
          const reader = new FileReader()

          reader.onload = () => {
            if (typeof reader.result === 'string') {
              resolve(reader.result)
              return
            }

            reject(new Error('Не удалось преобразовать изображение'))
          }

          reader.onerror = () => {
            reject(new Error('Не удалось прочитать изображение'))
          }

          reader.readAsDataURL(file)
        }),
    ),
  )
}

export async function dataUrlsToImageFiles(urls: string[]): Promise<ImageFile[]> {
  const files: ImageFile[] = []

  for (let index = 0; index < urls.length; index += 1) {
    const url = urls[index]
    const response = await fetch(url)
    const blob = await response.blob()
    const extension = blob.type.split('/')[1] ?? 'jpeg'
    const file = new File([blob], `skill-image-${index}.${extension}`, {
      type: blob.type || 'image/jpeg',
    }) as ImageFile

    file.preview = url.startsWith('data:') ? url : URL.createObjectURL(blob)
    file.id = `restored-${index}-${Date.now()}`

    files.push(file)
  }

  return files
}
