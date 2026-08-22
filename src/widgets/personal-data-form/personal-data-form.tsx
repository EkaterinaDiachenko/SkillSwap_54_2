import { useState } from 'react'
import clsx from 'clsx'
import { Input } from '@/shared/ui/input'
import { Textarea } from '@/shared/ui/textarea'
import { Button } from '@/shared/ui/button'
import styles from './personal-data-form.module.css'

export type PersonalDataFormProps = {
  className?: string
}

export function PersonalDataForm({ className }: PersonalDataFormProps) {
  const [about, setAbout] = useState('')

  return (
    <form
      className={clsx(styles.form, className)}
      onSubmit={(e) => e.preventDefault()}
    >
      <div className={styles.fields}>
        <Input
          label="Почта"
          defaultValue="Mariia@gmail.com"
          inputIcon="edit"
        />

        <a href="#" className={styles.link}>
          Изменить пароль
        </a>

        <Input
          label="Имя"
          defaultValue="Мария"
          inputIcon="edit"
        />

        <div className={styles.row}>
          <Input
            label="Дата рождения"
            defaultValue="28.10.1995"
            inputIcon="calendar"
          />
          <Input
            label="Пол"
            defaultValue="Женский"
            inputIcon="chevron-down"
          />
        </div>

        <Input
          label="Город"
          defaultValue="Москва"
          inputIcon="chevron-down"
        />

        <Textarea
          label="О себе"
          placeholder="Расскажите о себе"
          value={about}
          onChange={setAbout}
        />
      </div>

      <Button type="submit" variant="primary" className={styles.submitButton}>
        Сохранить
      </Button>
    </form>
  )
}
