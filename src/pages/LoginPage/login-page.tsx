import clsx from 'clsx'
import { RegisterHeader } from '@/widgets/header'
import { Input } from '@/shared/ui/input'
import { Button } from '@/shared/ui/button'
import { Illustration } from '@/shared/ui/illustration'
import styles from './login-page.module.css'

export type LoginPageProps = {
  email?: string
  password?: string
  emailError?: string
  passwordError?: string
  onEmailChange?: (value: string) => void
  onPasswordChange?: (value: string) => void
  onClose?: () => void
  onLoginClick?: () => void
  className?: string
}

export function LoginPage({
  email,
  password,
  emailError,
  passwordError,
  onEmailChange,
  onPasswordChange,
  onClose,
  onLoginClick,
  className,
}: LoginPageProps) {
  return (
    <div className={clsx(styles.page, className)}>
      <RegisterHeader onClose={onClose} />

      <main className={styles.content}>
        <div className={styles.columns}>
          <div className={styles.leftColumn}>
            <form
              className={styles.form}
              onSubmit={(e) => e.preventDefault()}
              aria-label="Вход в аккаунт"
            >
              <Input
                label="Email"
                type="email"
                placeholder="Введите email"
                value={email}
                error={emailError}
                onChange={(e) => onEmailChange?.(e.target.value)}
              />
              <Input
                label="Пароль"
                type="password"
                placeholder="Введите пароль"
                value={password}
                error={passwordError}
                onChange={(e) => onPasswordChange?.(e.target.value)}
              />
              <Button
                variant="primary"
                type="button"
                className={styles.submitButton}
                onClick={onLoginClick}
              >
                Войти
              </Button>
            </form>
          </div>

          <div className={styles.rightColumn}>
            <Illustration
              name="lamp"
              size={300}
              alt="Иллюстрация лампочки"
            />
            <h2 className={styles.title}>
              С возвращением в SkillSwap!
            </h2>
            <p className={styles.description}>
              Войдите в аккаунт, чтобы продолжить обмениваться
              знаниями и навыками с другими людьми
            </p>
          </div>
        </div>
      </main>
    </div>
  )
}
