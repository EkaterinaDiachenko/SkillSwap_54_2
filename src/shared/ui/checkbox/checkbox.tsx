import {
  useEffect,
  useRef,
  type ChangeEventHandler,
  type ReactNode,
} from 'react'
import { Icon } from '@/shared/ui/icon'
import type { IconName } from '@/shared/ui/icon'
import styles from './checkbox.module.css'

/** Пропсы одного чекбокса — состояние контролируется родителем */
export type CheckboxProps = {
  checked: boolean
  /** Промежуточное состояние (минус): часть дочерних элементов выбрана */
  indeterminate?: boolean
  onChange: ChangeEventHandler<HTMLInputElement>
  label: string
}

/** Сопоставление состояния чекбокса с иконкой из UI_kit */
function getCheckboxIconName(checked: boolean, indeterminate: boolean): IconName {
  if (indeterminate) {
    return 'checkbox-remove'
  }

  if (checked) {
    return 'checkbox-done'
  }

  return 'checkbox-empty'
}

export function Checkbox({
  checked,
  indeterminate = false,
  onChange,
  label,
}: CheckboxProps) {
  const inputRef = useRef<HTMLInputElement>(null)

  // indeterminate — DOM-свойство, не HTML-атрибут; задаём через ref
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.indeterminate = indeterminate
    }
  }, [indeterminate])

  const iconName = getCheckboxIconName(checked, indeterminate)
  const isActive = checked || indeterminate

  // <label> делает кликабельными и иконку, и текст
  return (
    <label className={styles.checkbox}>
      {/* Нативный input скрыт визуально, но нужен для a11y и клавиатуры */}
      <input
        ref={inputRef}
        type="checkbox"
        className={styles.input}
        checked={checked}
        onChange={onChange}
      />
      <Icon
        name={iconName}
        size={24}
        className={[styles.icon, isActive && styles.iconActive]
          .filter(Boolean)
          .join(' ')}
        aria-hidden
      />
      <span className={styles.label}>{label}</span>
    </label>
  )
}

/** Обёртка для группы чекбоксов с заголовком (например, «Навыки», «Город») */
export type CheckboxGroupProps = {
  title: string
  children: ReactNode
}

export function CheckboxGroup({ title, children }: CheckboxGroupProps) {
  return (
    <section className={styles.group}>
      <h3 className={styles.groupTitle}>{title}</h3>
      <div className={styles.groupList}>{children}</div>
    </section>
  )
}
