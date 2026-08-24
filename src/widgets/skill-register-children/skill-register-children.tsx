import type { ChangeEvent } from 'react'
import clsx from 'clsx'
import { Button } from '@/shared/ui/button'
import { ImageUpload, type ImageFile } from '@/shared/ui/image-upload'
import { Input } from '@/shared/ui/input'
import { Select, type SelectOption } from '@/shared/ui/select'
import { Textarea } from '@/shared/ui/textarea'
import styles from './skill-register-children.module.css'

export type SkillRegisterChildrenProps = {
  categories: SelectOption[]
  subcategories: SelectOption[]
  skillName?: string
  category?: string
  subcategory?: string
  description?: string
  images?: ImageFile[]
  skillNameError?: string
  categoryError?: string
  subcategoryError?: string
  descriptionError?: string
  imagesError?: string
  onSkillNameChange?: (value: string) => void
  onCategoryChange?: (value: string) => void
  onSubcategoryChange?: (value: string) => void
  onDescriptionChange?: (value: string) => void
  onImagesChange?: (files: ImageFile[]) => void
  onBackClick?: () => void
  onNextClick?: () => void
  className?: string
}

/**
 * Содержимое левой колонки 3-го шага регистрации.
 * Вставляется в RegisterLayout через children. Без валидации и навигации.
 */
export function SkillRegisterChildren({
  categories,
  subcategories,
  skillName,
  category,
  subcategory,
  description,
  images,
  skillNameError,
  categoryError,
  subcategoryError,
  descriptionError,
  imagesError,
  onSkillNameChange,
  onCategoryChange,
  onSubcategoryChange,
  onDescriptionChange,
  onImagesChange,
  className,
}: SkillRegisterChildrenProps) {
  const handleSkillNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    onSkillNameChange?.(event.target.value)
  }

  const handleCategoryChange = (value: string | string[]) => {
    onCategoryChange?.(Array.isArray(value) ? (value[0] ?? '') : value)
  }

  const handleSubcategoryChange = (value: string | string[]) => {
    onSubcategoryChange?.(Array.isArray(value) ? (value[0] ?? '') : value)
  }

  const handleDescriptionChange = (value: string) => {
    onDescriptionChange?.(value)
  }

  return (
    <form className={clsx(styles.form, className)}>
      <div className={styles.fields}>
        <Input
          className={clsx(styles.input, styles.control)}
          type="text"
          label="Название навыка"
          placeholder="Введите название вашего навыка"
          value={skillName}
          error={skillNameError}
          onChange={handleSkillNameChange}
        />

        <Select
          className={styles.control}
          label="Категория навыка"
          placeholder="Выберите категорию навыка"
          options={categories}
          value={category}
          error={categoryError}
          onChange={handleCategoryChange}
        />

        <Select
          className={styles.control}
          label="Подкатегория навыка"
          placeholder="Выберите подкатегорию навыка"
          options={subcategories}
          value={subcategory}
          error={subcategoryError}
          onChange={handleSubcategoryChange}
        />

        <Textarea
          className={styles.textarea}
          label="Описание"
          placeholder="Коротко опишите, чему можете научить"
          value={description ?? ''}
          error={descriptionError}
          onChange={handleDescriptionChange}
        />

        <ImageUpload
          className={styles.upload}
          multiple
          initialImages={images}
          error={imagesError}
          onChange={onImagesChange}
        />
      </div>

      <div className={styles.actions}>
        <Button
          type="button"
          variant="secondary"
          className={clsx(styles.actionButton, styles.backButton)}
        >
          Назад
        </Button>
        <Button
          type="button"
          variant="primary"
          className={styles.actionButton}
        >
          Продолжить
        </Button>
      </div>
    </form>
  )
}
