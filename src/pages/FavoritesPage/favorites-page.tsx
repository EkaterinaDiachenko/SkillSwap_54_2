import clsx from 'clsx'
import { AuthHeader } from '@/widgets/header'
import { Footer } from '@/widgets/footer'
import { SkillCard, type SkillCardProps } from '@/widgets/skill-card'
import { Button } from '@/shared/ui/button'
import type { SkillCategory } from '@/entities/skill'
import styles from './favorites-page.module.css'

export type FavoriteCard = SkillCardProps & { id: string }

export type FavoritesPageProps = {
  cards?: FavoriteCard[]
  userName?: string
  avatarSrc?: string
  categories?: SkillCategory[]
  onBackClick?: () => void
  className?: string
  onProfileClick?: () => void
  onFavoritesClick?: () => void
}

export default function FavoritesPage({
  cards = [],
  userName = '',
  avatarSrc,
  categories = [],
  onBackClick,
  className,
  onProfileClick,
  onFavoritesClick,
}: FavoritesPageProps) {
  return (
    <div className={clsx(styles.page, className)}>
      <AuthHeader
        name={userName}
        avatarSrc={avatarSrc}
        categories={categories}
        onProfileClick={onProfileClick}
        onFavoritesClick={onFavoritesClick}
      />

      <main className={styles.main}>
        <section className={styles.section}>
          <h1 className={styles.title}>Избранное</h1>

          {cards.length > 0 ? (
            <div className={styles.grid}>
              {cards.map(({ id, ...cardProps }) => (
                <SkillCard key={id} {...cardProps} className={styles.card} />
              ))}
            </div>
          ) : (
            <div className={styles.empty}>
              <p className={styles.emptyText}>В избранном пока ничего нет</p>
              <Button type="button" variant="primary" onClick={onBackClick}>
                Вернуться в каталог
              </Button>
            </div>
          )}
        </section>
      </main>

      <Footer categories={categories} />
    </div>
  )
}
