import React, {
  forwardRef,
  useCallback,
  useId,
  useRef,
  useState,
  type ChangeEventHandler,
  type InputHTMLAttributes,
} from 'react'
import clsx from 'clsx'
import { Icon, type IconName } from '@/shared/ui/icon'
import { IconButton } from '@/shared/ui/icon-button'
import styles from './input.module.css'

export type InputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'className'> & {
  /** Текст над полем; клик по label переводит фокус в input через htmlFor */
  label?: string
  /** Текст ошибки: красная рамка поля и красный текст снизу */
  error?: string
  /** Подсказка под полем (отображается, если нет error) */
  helperText?: string
  /** Иконка справа внутри поля (не используется для type="password") */
  inputIcon?: IconName
  className?: string
}

/** Пример: <Input label="Пароль" type="password" placeholder="Введите пароль" /> */
export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  {
    label,
    placeholder,
    type = 'text',
    value,
    defaultValue,
    name,
    disabled = false,
    error,
    helperText,
    inputIcon,
    className,
    id,
    onChange,
    onFocus,
    onBlur,
    ...rest
  },
  ref,
) {
  const generatedId = useId()
  const inputId = id ?? generatedId
  const helperId = `${inputId}-helper`

  // Внутренний ref нужен для .focus() после очистки; внешний ref — через forwardRef
  const inputRef = useRef<HTMLInputElement | null>(null)

  const setInputRef = useCallback(
    (node: HTMLInputElement | null) => {
      inputRef.current = node

      if (typeof ref === 'function') {
        ref(node)
        return
      }

      if (ref) {
        // RefObject из forwardRef типизирован как read-only, но React допускает запись
        ;(ref as React.MutableRefObject<HTMLInputElement | null>).current = node
      }
    },
    [ref],
  )

  const isControlled = value !== undefined
  const [uncontrolledValue, setUncontrolledValue] = useState(
    () => defaultValue?.toString() ?? '',
  )

  const isPasswordField = type === 'password'
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)
  const inputType = isPasswordField && isPasswordVisible ? 'text' : type

  const currentValue = isControlled ? String(value ?? '') : uncontrolledValue
  const hasValue = currentValue.length > 0
  const bottomText = error ?? helperText
  const showClearButton = hasValue && !disabled

  const handleChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    if (!isControlled) {
      setUncontrolledValue(event.target.value)
    }

    onChange?.(event)
  }

  // Очистка через нативное событие input — работает и для controlled, и для uncontrolled
  const handleClear = () => {
    const input = inputRef.current

    if (!input || disabled) {
      return
    }

    const nativeValueSetter = Object.getOwnPropertyDescriptor(
      HTMLInputElement.prototype,
      'value',
    )?.set

    nativeValueSetter?.call(input, '')
    input.dispatchEvent(new Event('input', { bubbles: true }))

    if (!isControlled) {
      setUncontrolledValue('')
    }

    input.focus()
  }

  return (
    <div className={clsx(styles.root, className)}>
      {label && (
        <label htmlFor={inputId} className={styles.label}>
          {label}
        </label>
      )}

      <div
        className={clsx(
          styles.field,
          hasValue && styles.fieldFilled,
          error && styles.fieldError,
          disabled && styles.fieldDisabled,
        )}
      >
        <input
          ref={setInputRef}
          id={inputId}
          className={styles.input}
          type={inputType}
          name={name}
          value={isControlled ? String(value ?? '') : undefined}
          defaultValue={isControlled ? undefined : defaultValue}
          placeholder={placeholder}
          disabled={disabled}
          aria-invalid={error ? true : undefined}
          aria-describedby={bottomText ? helperId : undefined}
          onChange={handleChange}
          onFocus={onFocus}
          onBlur={onBlur}
          {...rest}
        />

        {showClearButton && (
          <IconButton
            iconName="cross"
            aria-label="Очистить"
            onClick={handleClear}
            className={styles.clearButton}
          />
        )}

        {isPasswordField && (
          <IconButton
            iconName="eye"
            active={isPasswordVisible}
            aria-label={isPasswordVisible ? 'Скрыть пароль' : 'Показать пароль'}
            disabled={disabled}
            onClick={() => setIsPasswordVisible((prev) => !prev)}
            className={styles.passwordToggle}
          />
        )}

        {!isPasswordField && inputIcon && (
          <Icon
            name={inputIcon}
            className={styles.inputIcon}
            aria-hidden
          />
        )}
      </div>

      {bottomText && (
        <span
          id={helperId}
          className={clsx(styles.helper, error && styles.helperError)}
        >
          {bottomText}
        </span>
      )}
    </div>
  )
})
