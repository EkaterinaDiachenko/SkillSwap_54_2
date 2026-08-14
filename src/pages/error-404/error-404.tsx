import { Header, AuthHeader } from '@/widgets/header'
import { Footer } from '@/widgets/footer'
import type { SkillCategory } from '@/widgets/skills-mega-menu'
import { Button } from '@/shared/ui/button'
import { Illustration } from '@/shared/ui/illustration'
import styles from './error-404.module.css'

export type Error404Props = {
  /** true — AuthHeader (авторизован), false — Header (гость) */
  isAuth: boolean
}

/**
 * Страница ошибки 404 — только композиция готовых виджетов, без бизнес-логики.
 * Хедер выбирается по флагу isAuth, основной блок центрирован, внизу Footer.
 */
export function Error404({ isAuth }: Error404Props) {
  // Header и Footer требуют categories; для UI-страницы достаточно пустого массива
  const categories: SkillCategory[] = []

  return (
    <div className={styles.page}>
      {isAuth ? (
        // Макет: авторизованный пользователь «Мария» с аватаром
        <AuthHeader
          name="Мария"
          avatarSrc="/avatars/avatar-01.png"
          categories={categories}
        />
      ) : (
        // Макет: гость — кнопки «Войти» / «Зарегистрироваться»
        <Header categories={categories} />
      )}

      <main className={styles.content}>
        <Illustration
          name="404-error"
          className={styles.illustration}
          alt="Ошибка 404 — страница не найдена"
        />

        <h1 className={styles.title}>Страница не найдена</h1>

        <p className={styles.description}>
          К сожалению, эта страница недоступна. Вернитесь на главную страницу или
          попробуйте позже
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
