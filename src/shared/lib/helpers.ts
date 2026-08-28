import type { Location } from 'react-router-dom'
import { ROUTES } from './constants'

/** Возвращает путь из location.state.from или главную */
export function getLocationPath(from: Location | undefined): string {
  if (!from) {
    return ROUTES.HOME
  }

  return `${from.pathname}${from.search}${from.hash}`
}

/** Форматирует дату в читаемый вид */
export function formatDate(dateString: string): string {
  return new Intl.DateTimeFormat('ru-RU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date(dateString))
}

/** Обрезает строку до maxLength символов */
export function truncate(str: string, maxLength: number): string {
  if (str.length <= maxLength) return str
  return str.slice(0, maxLength).trimEnd() + '...'
}

/** Генерирует уникальный id */
export function generateId(): string {
  return crypto.randomUUID()
}
