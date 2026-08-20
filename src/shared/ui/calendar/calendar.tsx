import { DayPicker } from '@daypicker/react'
import '@daypicker/react/style.css'
import { ru } from '@daypicker/react/locale'
import { useEffect, useId, useState } from 'react'
import clsx from 'clsx'
import { Button } from '@/shared/ui/button'
import { IconButton } from '@/shared/ui/icon-button'
import styles from './calendar.module.css'

export type CalendarProps = {
  label?: string
  value?: Date
  placeholder?: string
  disabled?: boolean
  error?: string
  onChange?: (date: Date | undefined) => void
  className?: string
}

export function Calendar({
  label,
  value,
  placeholder = 'дд.мм.гггг',
  disabled = false,
  error,
  onChange,
  className,
}: CalendarProps) {
  const calendarId = useId()
  const errorId = `${calendarId}-error`

  const [isOpened, setIsOpened] = useState(false)
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(value)
  const [draftDate, setDraftDate] = useState<Date | undefined>(value)

  useEffect(() => {
    setSelectedDate(value)
    setDraftDate(value)
  }, [value])

  const formattedDate = selectedDate
    ? selectedDate.toLocaleDateString('ru-RU')
    : ''

  const closeCalendar = () => {
    setDraftDate(selectedDate)
    setIsOpened(false)
  }

  const toggleCalendar = () => {
    if (disabled) {
      return
    }

    if (isOpened) {
      closeCalendar()
      return
    }

    setDraftDate(selectedDate)
    setIsOpened(true)
  }

  const handleConfirm = () => {
    setSelectedDate(draftDate)
    onChange?.(draftDate)
    setIsOpened(false)
  }

  return (
    <div className={clsx(styles.wrapper, className)}>
      {label && (
        <label className={styles.label} htmlFor={calendarId}>
          {label}
        </label>
      )}

      <div
        className={clsx(
          styles.field,
          error && styles.fieldError,
          disabled && styles.fieldDisabled,
        )}
      >
        <input
          id={calendarId}
          className={styles.input}
          type="text"
          value={formattedDate}
          placeholder={placeholder}
          readOnly
          disabled={disabled}
          onClick={toggleCalendar}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? errorId : undefined}
          aria-haspopup="dialog"
          aria-expanded={isOpened}
          aria-controls={`${calendarId}-dropdown`}
        />

        <IconButton
          iconName="calendar"
          aria-label={isOpened ? 'Закрыть календарь' : 'Открыть календарь'}
          onClick={toggleCalendar}
          disabled={disabled}
          className={styles.calendarButton}
        />
      </div>

      {error && (
        <p id={errorId} className={styles.errorText} role="alert">
          {error}
        </p>
      )}

      {isOpened && (
        <div
          id={`${calendarId}-dropdown`}
          className={styles.dropdown}
          role="dialog"
          aria-label="Выбор даты"
        >
          <DayPicker
            className={styles.dayPicker}
            mode="single"
            selected={draftDate}
            onSelect={setDraftDate}
            locale={ru}
            captionLayout="dropdown"
            hideNavigation
            animate
            aria-label="Календарь для выбора даты"
          />

          <div className={styles.buttons}>
            <Button type="button" variant="secondary" onClick={closeCalendar}>
              Отменить
            </Button>

            <Button
              type="button"
              variant="primary"
              onClick={handleConfirm}
              disabled={!draftDate}
            >
              Выбрать
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}