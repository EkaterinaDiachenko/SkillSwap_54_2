import { Icon } from '@/shared/ui/icon'
import styles from './search-input.module.css'

interface SearchInputProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  name?: string
  error?: string
  className?: string
}

export function SearchInput({
  value,
  onChange,
  placeholder = 'Искать навык',
  name,
  error,
  className,
}: SearchInputProps) {
  return (
    <div className={`${styles.wrapper} ${className ?? ''}`}>
      <div className={styles.container}>
        <Icon name="search" className={styles.searchIcon} />
        <input
          className={styles.input}
          type="text"
          name={name}
          value={value}
          placeholder={placeholder}
          onChange={(event) => onChange(event.target.value)}
          aria-invalid={error ? true : undefined}
        />
        {value.length > 0 && (
          <button
            type="button"
            className={styles.clearButton}
            onClick={() => onChange('')}
            aria-label="Очистить"
          >
            <Icon name="cross" className={styles.clearIcon} />
          </button>
        )}
      </div>
      {error && (
        <p className={styles.error} role="alert">
          {error}
        </p>
      )}
    </div>
  )
}