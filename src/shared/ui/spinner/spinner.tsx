import { DotLoader } from 'react-spinners'
import styles from './spinner.module.css'

export type SpinnerProps = {
  size?: number
  color?: string
  className?: string
}

const DEFAULT_SIZE = 40

/**
 * Индикатор загрузки — обёртка над DotLoader из react-spinners.
 * По умолчанию 40px и цвет --color-primary.
 */
export function Spinner({
  size = DEFAULT_SIZE,
  color,
  className,
}: SpinnerProps) {
  return (
    <div
      className={[styles.wrapper, className].filter(Boolean).join(' ')}
      role="status"
    >
      <DotLoader
        size={size}
        color={color ?? 'var(--color-primary)'}
        aria-label="Загрузка"
      />
    </div>
  )
}
