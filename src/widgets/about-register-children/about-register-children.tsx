import type { ChangeEvent } from 'react'
import clsx from 'clsx'
import { Button } from '@/shared/ui/button'
import { Calendar } from '@/shared/ui/calendar'
import { IconButton } from '@/shared/ui/icon-button'
import { Input } from '@/shared/ui/input'
import { Select, type SelectOption } from '@/shared/ui/select'
import styles from './about-register-children.module.css'

export type AboutRegisterChildrenProps = {
  categories: SelectOption[]
  subcategories: SelectOption[]
  cities: SelectOption[]
  genderOptions: SelectOption[]
  name?: string
  birthDate?: Date
  gender?: string
  city?: string
  category?: string[]
  subcategory?: string[]
  nameError?: string
  birthDateError?: string
  genderError?: string
  cityError?: string
  categoryError?: string
  subcategoryError?: string
  onNameChange?: (value: string) => void
  onBirthDateChange?: (date: Date | undefined) => void
  onGenderChange?: (value: string) => void
  onCityChange?: (value: string) => void
  onCategoryChange?: (value: string[]) => void
  onSubcategoryChange?: (value: string[]) => void
  onBackClick?: () => void
  onNextClick?: () => void
  className?: string
}

/**
 * Содержимое левой колонки 2-го шага регистрации.
 * Вставляется в RegisterLayout через children. Без валидации и навигации.
 */
export function AboutRegisterChildren({
  categories,
  subcategories,
  cities,
  genderOptions,
  name,
  birthDate,
  gender,
  city,
  category,
  subcategory,
  nameError,
  birthDateError,
  genderError,
  cityError,
  categoryError,
  subcategoryError,
  onNameChange,
  onBirthDateChange,
  onGenderChange,
  onCityChange,
  onCategoryChange,
  onSubcategoryChange,
  onBackClick,
  onNextClick,
  className,
}: AboutRegisterChildrenProps) {
  const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    onNameChange?.(event.target.value)
  }

  const handleGenderChange = (value: string | string[]) => {
    onGenderChange?.(Array.isArray(value) ? (value[0] ?? '') : value)
  }

  const handleCityChange = (value: string | string[]) => {
    onCityChange?.(Array.isArray(value) ? (value[0] ?? '') : value)
  }

  const handleCategoryChange = (value: string | string[]) => {
    onCategoryChange?.(Array.isArray(value) ? value : [value])
  }

  const handleSubcategoryChange = (value: string | string[]) => {
    onSubcategoryChange?.(Array.isArray(value) ? value : [value])
  }

  return (
    <div className={clsx(styles.form, className)}>
      <div className={styles.avatar}>
        <IconButton
          iconName="user-circle-large"
          aria-label="Аватар"
          className={styles.avatarUser}
        />
        <IconButton
          iconName="add"
          aria-label="Добавить фото"
          className={styles.avatarAdd}
        />
      </div>

      <div className={styles.fields}>
        <Input
          className={clsx(styles.input, styles.control)}
          type="text"
          label="Имя"
          placeholder="Введите ваше имя"
          autoComplete="name"
          value={name}
          error={nameError}
          onChange={handleNameChange}
        />

        <div className={styles.row}>
          <Calendar
            className={clsx(styles.birthDate, styles.control)}
            label="Дата рождения"
            placeholder="дд.мм.гггг"
            value={birthDate}
            error={birthDateError}
            onChange={onBirthDateChange}
          />
          <Select
            className={clsx(styles.gender, styles.control)}
            label="Пол"
            placeholder="Не указан"
            options={genderOptions}
            value={gender}
            error={genderError}
            onChange={handleGenderChange}
          />
        </div>

        <Select
          className={styles.control}
          label="Город"
          placeholder="Не указан"
          options={cities}
          value={city}
          error={cityError}
          searchable
          onChange={handleCityChange}
        />

        <Select
          className={styles.control}
          label="Категория навыка, которому хотите научиться"
          placeholder="Выберите категорию"
          options={categories}
          value={category}
          error={categoryError}
          multiple
          onChange={handleCategoryChange}
        />

        <Select
          className={styles.control}
          label="Подкатегория навыка, которому хотите научиться"
          placeholder="Выберите подкатегорию"
          options={subcategories}
          value={subcategory}
          error={subcategoryError}
          multiple
          onChange={handleSubcategoryChange}
        />
      </div>

      <div className={styles.actions}>
        <Button
          type="button"
          variant="secondary"
          className={clsx(styles.actionButton, styles.backButton)}
          onClick={onBackClick}
        >
          Назад
        </Button>
        <Button
          type="button"
          variant="primary"
          className={styles.actionButton}
          onClick={onNextClick}
        >
          Продолжить
        </Button>
      </div>
    </div>
  )
}
