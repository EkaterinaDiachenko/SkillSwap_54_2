import { ActiveFilters } from '@/shared/ui/active-filters'
import { SkillCardProps } from '@/widgets/skill-card'
import { FilteredCardsSection } from '@/widgets/filtered-cards-section'

const selectedFilters = ['Хочу научиться', 'Английский']

const cards: SkillCardProps[] = [
  {
    name: 'Анна',
    city: 'Москва',
    age: 34,
    likesCount: 12,
    canTeach: ['Игра на барабанах'],
    wantsToLearn: ['Тайм менеджмент', 'Медитация', 'Кулинария'],
    onDetailsClick: () => undefined,
  },
  {
    name: 'Иван',
    city: 'Санкт-Петербург',
    age: 31,
    avatarUrl: null,
    likesCount: 8,
    canTeach: ['Маркетинг'],
    wantsToLearn: ['Английский', 'Кулинария'],
    onDetailsClick: () => undefined,
  },
  {
    name: 'Мария',
    city: 'Казань',
    age: 29,
    avatarUrl: '/avatars/avatar-07.png',
    likesCount: 18,
    canTeach: ['Личный бренд'],
    wantsToLearn: ['Музыка', 'Психология'],
    onDetailsClick: () => undefined,
  },
  {
    name: 'Дмитрий',
    city: 'Ростов-на-Дону',
    age: 35,
    avatarUrl: '/avatars/avatar-22.png',
    likesCount: 15,
    canTeach: ['Ведение переговоров'],
    wantsToLearn: ['Психология', 'Рисование'],
    onDetailsClick: () => undefined,
  },
  {
    name: 'Елена',
    city: 'Новосибирск',
    age: 24,
    avatarUrl: '/avatars/avatar-14.png',
    likesCount: 10,
    canTeach: ['Психология'],
    wantsToLearn: ['Английский', 'Фотография'],
    onDetailsClick: () => undefined,
  },
]

export default function CatalogPage() {
  const hasSelectedFilters = selectedFilters.length > 0

  return (
    <main
      style={{
        width: '1020px',
        maxWidth: '100%',
        margin: '0 auto',
        padding: '0 0 40px',
        boxSizing: 'border-box',
      }}
    >
      {hasSelectedFilters && (
        <ActiveFilters
          selectedFilters={selectedFilters}
          onRemoveFilter={() => undefined}
        />
      )}

      {hasSelectedFilters && (
        <FilteredCardsSection
          filteredCount={cards.length}
          cards={cards}
          onSortClick={() => undefined}
        />
      )}
    </main>
  )
}
