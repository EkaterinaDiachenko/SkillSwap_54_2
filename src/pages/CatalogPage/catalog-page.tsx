
import type { SkillCategory } from '@/entities/skill'
import { FiltersBar } from "@/widgets/filters-bar";
import type {
  FiltersBarSelectedFilters,
} from '@/widgets/filters-bar'
import { Footer } from "@/widgets/footer";
import { AuthHeader, Header } from "@/widgets/header";
import { RecommendationSection } from "@/widgets/recommendation-section";
import { SkillSection } from "@/widgets/skill-section";
import type { SkillCardProps } from '@/widgets/skill-card'
import styles from './catalog-page.module.css'

export type CatalogPageProps = {
  isAuth: boolean

  categories: SkillCategory[]

  userName?: string
  avatarSrc?: string

  selectedFilters: FiltersBarSelectedFilters
  onFilterChange: (next: FiltersBarSelectedFilters) => void
  onReset: () => void
  cities: Array<string | { id: string; name: string }>

  recommendationCards: SkillCardProps[]
  popularCards: SkillCardProps[]
  newCards: SkillCardProps[]

  isLoading: boolean

  onShowPopular: () => void
  onShowNew: () => void

}

export default function CatalogPage({
  isAuth,
  categories,
  userName,
  avatarSrc,
  selectedFilters,
  onFilterChange,
  onReset,
  cities,
  recommendationCards,
  popularCards,
  newCards,
  isLoading,
  onShowPopular,
  onShowNew,
}: CatalogPageProps) {
  return (
    <div className={styles.page}>
      {isAuth ? (
        <AuthHeader
          name={userName ?? ''}
          avatarSrc={avatarSrc}
          categories={categories}
        />
      ) : (
        <Header categories={categories} />
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
          <SkillSection
            title="Популярное"
            skillCards={popularCards}
            onShowAll={onShowPopular}
          />

          <SkillSection
            title="Новое"
            skillCards={newCards}
            onShowAll={onShowNew}
          />

          <RecommendationSection
            skillCards={recommendationCards}
            isLoading={isLoading}
          />
        </div>
      </main>

      <Footer categories={categories} />
    </div>
  )
}