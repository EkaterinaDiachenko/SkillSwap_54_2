import type { ChangeEvent } from 'react'
import clsx from 'clsx'
import { Button } from '@/shared/ui/button'
import { Input } from '@/shared/ui/input'
import { Icon } from '@/shared/ui/icon'
import styles from './welcome-register-children.module.css'

export type WelcomeRegisterChildrenProps = {
  emailError?: string
  passwordError?: string
  email?: string
  password?: string
  onEmailChange?: (value: string) => void
  onPasswordChange?: (value: string) => void
  onNextClick?: () => void
  onGoogleClick?: () => void
  onAppleClick?: () => void
  className?: string
}

const PASSWORD_HELPER = 'Пароль должен содержать не менее 8 знаков'

/**
 * Содержимое левой колонки 1-го шага регистрации.
 * Вставляется в RegisterLayout через children. Без валидации и навигации.
 */
export function WelcomeRegisterChildren({
  emailError,
  passwordError,
  email,
  password,
  onEmailChange,
  onPasswordChange,
  onNextClick,
  className,
}: WelcomeRegisterChildrenProps) {
  const handleEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
    onEmailChange?.(event.target.value)
  }

  const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    onPasswordChange?.(event.target.value)
  }

  return (
    <div className={clsx(styles.form, className)}>
      <div className={styles.socials}>
        <Button type="button" className={styles.socialButton}>
          <Icon name="google" size={24} />
          Продолжить с Google
        </Button>
        <Button type="button" className={styles.socialButton}>
          <Icon name="apple" size={24} />
          Продолжить с Apple
        </Button>
      </div>

      <div className={styles.divider} role="separator">
        <span className={styles.dividerText}>или</span>
      </div>

      <div className={styles.fields}>
        <Input
          className={styles.input}
          type="email"
          label="Email"
          placeholder="Введите email"
          autoComplete="email"
          value={email}
          error={emailError}
          onChange={handleEmailChange}
        />
        <Input
          className={styles.input}
          type="password"
          label="Пароль"
          placeholder="Придумайте надёжный пароль"
          autoComplete="new-password"
          value={password}
          error={passwordError}
          helperText={PASSWORD_HELPER}
          onChange={handlePasswordChange}
        />
      </div>

      <Button
        type="button"
        variant="primary"
        className={styles.nextButton}
        onClick={onNextClick}
      >
        Далее
      </Button>
    </div>
  )
}
