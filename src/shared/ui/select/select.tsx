import {
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type KeyboardEvent,
  type MouseEvent,
} from 'react'
import clsx from 'clsx'
import { Checkbox } from '@/shared/ui/checkbox'
import { IconButton } from '@/shared/ui/icon-button'
import styles from './select.module.css'

export type SelectOption = {
  value: string
  label: string
}

export type SelectProps = {
  label?: string
  placeholder?: string
  options: SelectOption[]
  value?: string | string[]
  disabled?: boolean
  error?: string
  onChange: (value: string | string[]) => void
  multiple?: boolean
  searchable?: boolean
  className?: string
  /** Максимальная высота выпадающего списка (без поля), px */
  listMaxHeight?: number
}

function toSelectedSet(value: string | string[] | undefined): string[] {
  if (value == null || value === '') {
    return []
  }

  return Array.isArray(value) ? value : [value]
}

/**
 * Универсальный селект. Варианты приходят снаружи через options,
 * без бизнес-логики городов/категорий.
 */
export function Select({
  label,
  placeholder = 'Не указан',
  options,
  value,
  disabled = false,
  error,
  onChange,
  multiple = false,
  searchable = false,
  className,
  listMaxHeight = 120,
}: SelectProps) {
  const uid = useId()
  const listId = `${uid}-list`
  const rootRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const [isOpen, setIsOpen] = useState(false)
  const [query, setQuery] = useState('')

  const selected = toSelectedSet(value)
  const hasValue = selected.length > 0

  const selectedLabel = useMemo(() => {
    if (multiple) {
      return hasValue ? `Выбрано: ${selected.length}` : ''
    }

    return options.find((option) => option.value === selected[0])?.label ?? ''
  }, [multiple, hasValue, selected, options])

  const filteredOptions = useMemo(() => {
    if (!searchable || query.trim() === '') {
      return options
    }

    const needle = query.trim().toLowerCase()
    return options.filter((option) =>
      option.label.toLowerCase().includes(needle),
    )
  }, [options, query, searchable])

  const showSearchInput = searchable && isOpen
  const showClear = searchable && isOpen && query.length > 0
  const showChevron = !showClear

  useEffect(() => {
    if (!isOpen) {
      return
    }

    const onPointerDown = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        setIsOpen(false)
        setQuery('')
      }
    }

    document.addEventListener('pointerdown', onPointerDown)
    return () => document.removeEventListener('pointerdown', onPointerDown)
  }, [isOpen])

  useEffect(() => {
    if (showSearchInput) {
      inputRef.current?.focus()
    }
  }, [showSearchInput])

  const close = () => {
    setIsOpen(false)
    setQuery('')
  }

  const toggleOpen = (event?: MouseEvent) => {
    event?.stopPropagation()
    if (disabled) {
      return
    }

    setIsOpen((open) => {
      if (open) {
        setQuery('')
      }
      return !open
    })
  }

  const handleTriggerClick = () => {
    if (disabled) {
      return
    }

    if (searchable && isOpen) {
      return
    }

    setIsOpen((open) => !open)
  }

  const handleSelect = (option: SelectOption) => {
    if (multiple) {
      const next = selected.includes(option.value)
        ? selected.filter((item) => item !== option.value)
        : [...selected, option.value]
      onChange(next)
      return
    }

    onChange(option.value)
    close()
  }

  const handleClearQuery = (event: MouseEvent) => {
    event.stopPropagation()
    setQuery('')
  }

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      event.preventDefault()
      close()
    }

    if (
      (event.key === 'Enter' || event.key === ' ') &&
      !searchable &&
      !isOpen &&
      !disabled
    ) {
      event.preventDefault()
      setIsOpen(true)
    }
  }

  const displayText = hasValue ? selectedLabel : placeholder
  const isPlaceholder = !hasValue

  return (
    <div
      ref={rootRef}
      className={clsx(styles.root, className)}
      onKeyDown={handleKeyDown}
    >
      {label && (
        <label className={styles.label} htmlFor={`${uid}-trigger`}>
          {label}
        </label>
      )}

      <div
        className={clsx(
          styles.box,
          isOpen && styles.boxOpen,
          error && styles.boxError,
          disabled && styles.boxDisabled,
        )}
      >
        <div
          className={clsx(styles.trigger, isOpen && styles.triggerOpen)}
          onClick={handleTriggerClick}
        >
          {showSearchInput ? (
            <input
              ref={inputRef}
              id={`${uid}-trigger`}
              className={styles.searchInput}
              type="text"
              value={query}
              disabled={disabled}
              placeholder=""
              autoComplete="off"
              role="combobox"
              aria-expanded={isOpen}
              aria-controls={listId}
              aria-haspopup="listbox"
              aria-invalid={Boolean(error) || undefined}
              aria-disabled={disabled || undefined}
              onChange={(event) => setQuery(event.target.value)}
              onClick={(event) => event.stopPropagation()}
            />
          ) : (
            <span
              id={`${uid}-trigger`}
              className={clsx(
                styles.value,
                isPlaceholder && styles.placeholder,
              )}
              role="combobox"
              tabIndex={disabled ? -1 : 0}
              aria-expanded={isOpen}
              aria-controls={listId}
              aria-haspopup="listbox"
              aria-invalid={Boolean(error) || undefined}
              aria-disabled={disabled || undefined}
            >
              {displayText}
            </span>
          )}

          {showClear && (
            <IconButton
              iconName="cross"
              aria-label="Очистить"
              className={styles.iconButton}
              onClick={handleClearQuery}
            />
          )}

          {showChevron && (
            <IconButton
              iconName="chevron-down"
              aria-label={isOpen ? 'Свернуть список' : 'Открыть список'}
              disabled={disabled}
              className={clsx(
                styles.iconButton,
                isOpen && styles.chevronOpen,
              )}
              onClick={toggleOpen}
            />
          )}
        </div>

        {isOpen && (
          <ul
            id={listId}
            className={styles.list}
            style={{ maxHeight: listMaxHeight }}
            role="listbox"
            aria-multiselectable={multiple || undefined}
          >
            {filteredOptions.length === 0 ? (
              <li className={styles.empty} role="presentation">
                Ничего не найдено
              </li>
            ) : (
              filteredOptions.map((option) => {
                const isSelected = selected.includes(option.value)

                return (
                  <li
                    key={option.value}
                    className={clsx(
                      styles.option,
                      isSelected && !multiple && styles.optionSelected,
                    )}
                    role="option"
                    aria-selected={isSelected}
                    onMouseDown={(event) => event.preventDefault()}
                    onClick={() => {
                      if (!multiple) {
                        handleSelect(option)
                      }
                    }}
                  >
                    {multiple ? (
                      <Checkbox
                        checked={isSelected}
                        onChange={() => handleSelect(option)}
                        label={option.label}
                        className={styles.optionCheckbox}
                      />
                    ) : (
                      <span>{option.label}</span>
                    )}
                  </li>
                )
              })
            )}
          </ul>
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
