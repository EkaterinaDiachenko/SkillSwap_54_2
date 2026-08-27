import {
  useEffect,
  useRef,
  useState,
} from 'react'
import type { CatalogCard } from './catalog-selectors'

const CARDS_PER_PAGE = 9
const LOAD_MORE_DELAY_MS = 1000

export function useRecommendationsPagination(
  cards: CatalogCard[],
) {
  const [visibleCount, setVisibleCount] = useState(
    Math.min(CARDS_PER_PAGE, cards.length),
  )
  const [isLoadingMore, setIsLoadingMore] = useState(false)

  const loadMoreRef = useRef<HTMLDivElement>(null)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(
    null,
  )
  const isLoadingMoreRef = useRef(false)

  const hasMore = visibleCount < cards.length
  const visibleCards = cards.slice(0, visibleCount)

  useEffect(() => {
    if (timerRef.current !== null) {
      clearTimeout(timerRef.current)
      timerRef.current = null
    }

    isLoadingMoreRef.current = false
    setIsLoadingMore(false)
    setVisibleCount(Math.min(CARDS_PER_PAGE, cards.length))
  }, [cards])

  useEffect(() => {
    const loadMoreElement = loadMoreRef.current

    if (!loadMoreElement || !hasMore) {
      return
    }

    const observer = new IntersectionObserver((entries) => {
      const firstEntry = entries[0]

      if (
        !firstEntry?.isIntersecting ||
        isLoadingMoreRef.current
      ) {
        return
      }

      isLoadingMoreRef.current = true
      setIsLoadingMore(true)

      timerRef.current = setTimeout(() => {
        setVisibleCount((currentCount) =>
          Math.min(
            currentCount + CARDS_PER_PAGE,
            cards.length,
          ),
        )

        isLoadingMoreRef.current = false
        setIsLoadingMore(false)
        timerRef.current = null
      }, LOAD_MORE_DELAY_MS)
    })

    observer.observe(loadMoreElement)

    return () => {
      observer.disconnect()
    }
  }, [cards.length, hasMore])

  useEffect(() => {
    return () => {
      if (timerRef.current !== null) {
        clearTimeout(timerRef.current)
      }
    }
  }, [])

  return {
    visibleCards,
    isLoadingMore,
    hasMore,
    loadMoreRef,
  }
}