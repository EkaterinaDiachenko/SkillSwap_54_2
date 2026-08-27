import type { SkillCategory } from '@/entities/skill'
import { Spinner } from '@/shared/ui/spinner'
import { FiltersBar } from '@/widgets/filters-bar'
import type { FiltersBarSelectedFilters } from '@/widgets/filters-bar'
import { Footer } from '@/widgets/footer'
import { AuthHeader, Header } from '@/widgets/header'
import { RecommendationSection } from '@/widgets/recommendation-section'
import { SkillSection } from '@/widgets/skill-section'
import type { SkillCardProps } from '@/widgets/skill-card'
import styles from './catalog-page.module.css'

export type CatalogSkillCardProps = SkillCardProps & {
  skillId: string
  createdAt: string
}

export type CatalogPageProps = {
  isAuth: boolean
  categories: SkillCategory[]
  userName?: string
  avatarSrc?: string
  onLogout?: () => void
  onLogin: () => void
  onRegister: () => void
  onProfileClick: () => void
  onFavoritesClick: () => void
  selectedFilters: FiltersBarSelectedFilters
  onFilterChange: (next: FiltersBarSelectedFilters) => void
  onReset: () => void
  cities: Array<string | { id: string; name: string }>
  allCards: CatalogSkillCardProps[]
  recommendationCards: CatalogSkillCardProps[]
  popularCards: CatalogSkillCardProps[]
  newCards: CatalogSkillCardProps[]
  isLoading: boolean
  loadError?: string | null
  onShowPopular: () => void
  onShowNew: () => void
}

export function CatalogPageUI({
  isAuth,
  categories,
  userName,
  avatarSrc,
  onLogout,
  onLogin,
  onRegister,
  onProfileClick,
  onFavoritesClick,
  selectedFilters,
  onFilterChange,
  onReset,
  cities,
  recommendationCards,
  popularCards,
  newCards,
  allCards,
  isLoading,
  loadError,
  onShowPopular,
  onShowNew,
}: CatalogPageProps) {
  const isEmpty = !isLoading && !loadError && allCards.length === 0
  const shouldShowSections = !isLoading && !loadError && allCards.length > 0

  return (
    <div className={styles.page}>
      {isAuth ? (
        <AuthHeader
          name={userName ?? ''}
          avatarSrc={avatarSrc}
          categories={categories}
          onLogout={onLogout}
          onProfileClick={onProfileClick}
          onFavoritesClick={onFavoritesClick}
        />
      ) : (
        <Header categories={categories} onLogin={onLogin} onRegister={onRegister} />
      )}

      <main className={styles.main}>
        <FiltersBar
          selectedFilters={selectedFilters}
          onFilterChange={onFilterChange}
          onReset={onReset}
          skillsCategories={categories}
          cities={cities}
        />

        <div className={styles.content}>
          {isLoading && <Spinner />}

          {loadError && (
            <p className={styles.message}>Не удалось загрузить предложения</p>
          )}

          {isEmpty && <p className={styles.message}>Предложений пока нет</p>}

          {shouldShowSections && (
            <>
              <SkillSection
                title="Популярное"
                skillCards={popularCards}
                onShowAll={onShowPopular}
              />

              <SkillSection title="Новое" skillCards={newCards} onShowAll={onShowNew} />

              <RecommendationSection
                skillCards={recommendationCards}
                isLoading={isLoading}
              />
            </>
          )}
        </div>
      </main>

      <Footer categories={categories} />
    </div>
  )
}

export default CatalogPageUI
