import { Icon } from '@/shared/ui/icon'
import styles from './radio-buttons.module.css'

export type RadioOption = {
  value: string
  label: string
}

export type RadioButtonsProps = {
  name?: string
  options: RadioOption[]
  value: string
  onChange: (value: string) => void
  selected?: string
}

export function RadioButtons({
  name,
  options,
  value,
  onChange,
  selected,
}: RadioButtonsProps) {
  const current = selected ?? value

   return (
    <fieldset className={styles.group}>
      {name && <legend className={styles.title}>{name}</legend>}
      <div className={styles.list}>
        {options.map((option) => {
          const isSelected = current === option.value
          return (
            <label key={option.value} className={styles.option}>
              <input
                type="radio"
                name={name}
                value={option.value}
                checked={isSelected}
                onChange={() => onChange(option.value)}
                className={styles.input}
              />
              <Icon
                name={isSelected ? 'radiobutton-active' : 'radiobutton-empty'}
                size={24}
                className={isSelected ? styles.iconSelected : styles.icon}
              />
              <span className={isSelected ? styles.labelSelected : styles.label}>
                {option.label}
              </span>
            </label>
          )
        })}
      </div>
    </fieldset>
  )
}
