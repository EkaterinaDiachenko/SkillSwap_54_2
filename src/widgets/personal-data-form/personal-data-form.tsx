import { useState } from 'react'
import clsx from 'clsx'
import { Input } from '@/shared/ui/input'
import { Textarea } from '@/shared/ui/textarea'
import { Button } from '@/shared/ui/button'
import { Calendar } from '@/shared/ui/calendar'
import { Select, type SelectOption } from '@/shared/ui/select'
import styles from './personal-data-form.module.css'

export type PersonalDataFormProps = {
  className?: string
  genderOptions: SelectOption[]
  cities: SelectOption[]
}

export function PersonalDataForm({
  className,
  genderOptions,
  cities,
}: PersonalDataFormProps) {
  const [showPassword, setShowPassword] = useState(false)
  const [about, setAbout] = useState('')
  const [isDirty, setIsDirty] = useState(false)

  const handleAboutChange = (value: string) => {
    setAbout(value)
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
          label="Почта"
          placeholder="Введите вашу почту"
          defaultValue="Mariia@gmail.com"
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
              helperText="Пароль должен содержать не менее 8 знаков"
              onBlur={handlePasswordBlur}
            />
          )}
        </div>

        <Input
          label="Имя"
          placeholder="Введите ваше имя"
          defaultValue="Мария"
          inputIcon="edit"
        />

        <div className={styles.row}>
          <Calendar
            label="Дата рождения"
            placeholder="дд.мм.гггг"
          />
          <Select
            label="Пол"
            placeholder="Не указан"
            options={genderOptions}
            onChange={() => setIsDirty(true)}
          />
        </div>

        <Select
          label="Город"
          placeholder="Не указан"
          options={cities}
          searchable
          onChange={() => setIsDirty(true)}
        />

        <Textarea
          label="О себе"
          placeholder="Расскажите немного о себе"
          value={about}
          onChange={handleAboutChange}
        />
      </div>

      <Button
        type="button"
        variant="primary"
        disabled={!isDirty}
        className={styles.submitButton}
      >
        Сохранить
      </Button>
    </form>
  )
}
