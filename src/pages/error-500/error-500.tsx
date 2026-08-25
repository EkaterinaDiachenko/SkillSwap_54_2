import { Header, AuthHeader } from '@/widgets/header'
import { Footer } from '@/widgets/footer'
import type { SkillCategory } from '@/entities/skill'
import { Button } from '@/shared/ui/button'
import { Illustration } from '@/shared/ui/illustration'
import styles from './error-500.module.css'

export type Error500Props = {
  /** true — AuthHeader (авторизован), false — Header (гость) */
  isAuth: boolean
}

/**
 * Страница ошибки 500 — та же структура, что у Error404.
 * Отличаются только иллюстрация, заголовок и текст параграфа.
 */
export function Error500({ isAuth }: Error500Props) {
  // Пустой массив — мегаменю на странице ошибки не используется
  const categories: SkillCategory[] = []

  return (
    <div className={styles.page}>
      {isAuth ? (
        <AuthHeader
          name="Мария"
          avatarSrc="/avatars/avatar-01.png"
          categories={categories}
        />
      ) : (
        <Header categories={categories} />
      )}

      <main className={styles.content}>
        <Illustration
          name="500-error"
          className={styles.illustration}
          alt="Ошибка 500 — ошибка сервера"
        />

        <h1 className={styles.title}>На сервере произошла ошибка</h1>

        <p className={styles.description}>
          Попробуйте позже или вернитесь на главную страницу
        </p>

        <div className={styles.actions}>
          <Button variant="secondary" type="button">
            Сообщить об ошибке
          </Button>
          <Button variant="primary" type="button">
            На главную
          </Button>
        </div>
      </main>

      <Footer categories={categories} />
    </div>
  )
}
