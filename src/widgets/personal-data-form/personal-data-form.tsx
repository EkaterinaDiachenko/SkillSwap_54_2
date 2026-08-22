import { useState } from 'react'
import clsx from 'clsx'
import { Input } from '@/shared/ui/input'
import { Textarea } from '@/shared/ui/textarea'
import { Button } from '@/shared/ui/button'
import { Calendar } from '@/shared/ui/calendar'
import { Select, type SelectOption } from '@/shared/ui/select'
import styles from './personal-data-form.module.css'

export type PersonalDataFormProps = {
  email?: string
  name?: string
  birthDate?: Date
  gender?: string
  city?: string
  about?: string
  cities: SelectOption[]
  genderOptions: SelectOption[]
  onSaveClick?: () => void
  className?: string
}

export function PersonalDataForm({
  email,
  name,
  birthDate,
  gender,
  city,
  about = '',
  cities,
  genderOptions,
  onSaveClick,
  className,
}: PersonalDataFormProps) {
  const [showPassword, setShowPassword] = useState(false)
  const [passwordValue, setPasswordValue] = useState('')
  const [aboutValue, setAboutValue] = useState(about)
  const [isDirty, setIsDirty] = useState(false)

  const passwordHelperText =
    passwordValue.length >= 8
      ? 'Надежный'
      : 'Пароль должен содержать не менее 8 знаков'

  const handleAboutChange = (value: string) => {
    setAboutValue(value)
    setIsDirty(true)
  }

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordValue(e.target.value)
    setIsDirty(true)
  }

  const handlePasswordBlur = (
    e: React.FocusEvent<HTMLInputElement>,
  ) => {
    if (e.target.value.length > 0) {
      setIsDirty(true)
    }
  }

  return (
    <form
      className={clsx(styles.form, className)}
      onSubmit={(e) => e.preventDefault()}
    >
      <div className={styles.fields}>
        <Input
          type="email"
          label="Почта"
          placeholder="Введите вашу почту"
          defaultValue={email}
          inputIcon="edit"
        />

        <div className={styles.passwordSection}>
          {!showPassword && (
            <Button
              variant="quaternary"
              type="button"
              onClick={() => setShowPassword(true)}
            >
              Изменить пароль
            </Button>
          )}

          {showPassword && (
            <Input
              type="password"
              label="Пароль"
              placeholder="Введите пароль"
              value={passwordValue}
              onChange={handlePasswordChange}
              helperText={passwordHelperText}
              onBlur={handlePasswordBlur}
            />
          )}
        </div>

        <Input
          type="text"
          label="Имя"
          placeholder="Введите ваше имя"
          defaultValue={name}
          inputIcon="edit"
        />

        <div className={styles.row}>
          <Calendar
            label="Дата рождения"
            placeholder="дд.мм.гггг"
            value={birthDate}
            onChange={() => setIsDirty(true)}
          />
          <Select
            label="Пол"
            placeholder="Не указан"
            options={genderOptions}
            value={gender}
            onChange={() => setIsDirty(true)}
          />
        </div>

        <Select
          label="Город"
          placeholder="Не указан"
          options={cities}
          value={city}
          searchable
          onChange={() => setIsDirty(true)}
        />

        <Textarea
          label="О себе"
          placeholder="Расскажите немного о себе"
          value={aboutValue}
          onChange={handleAboutChange}
        />
      </div>

      <Button
        type="button"
        variant="primary"
        disabled={!isDirty}
        className={styles.submitButton}
        onClick={onSaveClick}
      >
        Сохранить
      </Button>
    </form>
  )
}
