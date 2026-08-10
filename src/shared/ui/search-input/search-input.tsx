import styles from './search-input.module.css'
import SearchIcon from '@/images/icons/search.svg?react'
import CrossIcon from '@/images/icons/cross.svg?react'

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
        <SearchIcon className={styles.searchIcon} aria-hidden="true" />
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
            <CrossIcon className={styles.clearIcon} aria-hidden="true" />
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