import { Header, AuthHeader } from '@/widgets/header'
import { Footer } from '@/widgets/footer'
import type { SkillCategory } from '@/entities/skill'
import { Button } from '@/shared/ui/button'
import { Illustration } from '@/shared/ui/illustration'
import styles from './error-500.module.css'

export type Error500Props = {
  /** true — AuthHeader (авторизован), false — Header (гость) */
  isAuth: boolean,
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
 * Страница ошибки 500 — та же структура, что у Error404.
 * Отличаются только иллюстрация, заголовок и текст параграфа.
 */
export function Error500({
  isAuth,
  categories = [],
  userName = '',
  avatarSrc,
  onLogin,
  onRegister,
  onProfileClick,
  onFavoritesClick,
  onHomeClick,
 }: Error500Props) {

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
          name="500-error"
          className={styles.illustration}
          alt="Ошибка 500 — ошибка сервера"
        />

        <h1 className={styles.title}>На сервере произошла ошибка</h1>

        <p className={styles.description}>Попробуйте позже или вернитесь на главную страницу</p>

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
