import { Header, AuthHeader } from '@/widgets/header'
import { Footer } from '@/widgets/footer'
import type { SkillCategory } from '@/entities/skill'
import { Button } from '@/shared/ui/button'
import { Illustration } from '@/shared/ui/illustration'
import styles from './error-404.module.css'

export type Error404Props = {
  /** true — AuthHeader (авторизован), false — Header (гость) */
  isAuth: boolean
  categories?: SkillCategory[]
  userName?: string
  avatarSrc?: string
  onLogin?: () => void
  onRegister?: () => void
  onProfileClick?: () => void
  onFavoritesClick?: () => void
  onHomeClick?: () => void
}

/**
 * Страница ошибки 404 — только композиция готовых виджетов, без бизнес-логики.
 * Хедер выбирается по флагу isAuth, основной блок центрирован, внизу Footer.
 */
export function Error404({
  isAuth,
  categories = [],
  userName = '',
  avatarSrc,
  onLogin,
  onRegister,
  onProfileClick,
  onFavoritesClick,
  onHomeClick,
}: Error404Props) {

  return (
    <div className={styles.page}>
      {isAuth ? (
         <AuthHeader
         name={userName}
         avatarSrc={avatarSrc}
         categories={categories}
         onProfileClick={onProfileClick}
         onFavoritesClick={onFavoritesClick}
       />
      ) : (
        <Header
    categories={categories}
    onLogin={onLogin}
    onRegister={onRegister}
  />
      )}

      <main className={styles.content}>
        <Illustration
          name="404-error"
          className={styles.illustration}
          alt="Ошибка 404 — страница не найдена"
        />

        <h1 className={styles.title}>Страница не найдена</h1>

        <p className={styles.description}>
          К сожалению, эта страница недоступна. Вернитесь на главную страницу или попробуйте позже
        </p>

        <div className={styles.actions}>
          <Button variant="secondary" type="button">
            Сообщить об ошибке
          </Button>
          <Button variant="primary" type="button" onClick={onHomeClick}>
            На главную
          </Button>
        </div>
      </main>

      <Footer categories={categories} />
    </div>
  )
}
