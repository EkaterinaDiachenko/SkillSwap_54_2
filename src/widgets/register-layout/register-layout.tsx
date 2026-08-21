import type { ReactNode } from 'react'
import clsx from 'clsx'
import { RegisterHeader } from '@/widgets/header'
import { RegistrationSteps } from '@/shared/ui/registration-steps'
import {
  Illustration,
  type IllustrationName,
} from '@/shared/ui/illustration'
import styles from './register-layout.module.css'

export type RegisterLayoutProps = {
  currentStep: number
  totalSteps: number
  image: IllustrationName
  title: string
  description?: string
  children: ReactNode
  className?: string
}

/**
 * Общая оболочка шагов регистрации: шапка, прогресс и две колонки.
 * Форму шага передают через children. Footer нет.
 */
export function RegisterLayout({
  currentStep,
  totalSteps,
  image,
  title,
  description,
  children,
  className,
}: RegisterLayoutProps) {
  return (
    <div className={clsx(styles.page, className)}>
      <div className={styles.header}>
        <RegisterHeader />
        <RegistrationSteps
          className={styles.steps}
          currentStep={currentStep}
          totalSteps={totalSteps}
        />
      </div>

      <main className={styles.main}>
        <div className={styles.form}>{children}</div>

        <section className={styles.info}>
          <Illustration
            name={image}
            className={styles.illustration}
            alt=""
          />
          <h1 className={styles.title}>{title}</h1>
          {description ? (
            <p className={styles.description}>{description}</p>
          ) : null}
        </section>
      </main>
    </div>
  )
}
