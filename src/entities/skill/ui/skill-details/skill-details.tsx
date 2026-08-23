import { Button, type ButtonVariant } from '@/shared/ui/button'
import { Icon, type IconName } from '@/shared/ui/icon'
import styles from './skill-details.module.css'

export type SkillDetailsProps = {
  /** Название навыка, например «Игра на барабанах» */
  title: string
  /** Название категории, например «Творчество и искусство» */
  category: string
  /** Название подкатегории, например «Музыка и звук» */
  subcategory: string
  /** Текстовое описание предложения навыка */
  description: string
  /** Тип кнопки: primary — заливка, secondary — обводка с иконкой */
  variant?: ButtonVariant
  /** Текст кнопки, передаётся родителем в зависимости от контекста */
  buttonText?: string
  /** Превью после регистрации: «Редактировать» + «Готово» в один ряд */
  showDualButtons?: boolean
  /** Колбэк при клике на «Редактировать» (режим превью) */
  onEditClick?: () => void
  /** Колбэк при клике на «Готово» (режим превью) */
  onDoneClick?: () => void
  className?: string
}

/** Сопоставление текста secondary-кнопки с иконкой из макета */
const SECONDARY_ICON: Record<string, IconName> = {
  'Обмен предложен': 'clock',
  Редактировать: 'edit',
}

/** Иконка часов — слева от текста, карандаш — справа */
const ICON_BEFORE_TEXT: IconName[] = ['clock']

function getSecondaryIcon(buttonText?: string): IconName | null {
  if (!buttonText) return null
  return SECONDARY_ICON[buttonText] ?? null
}

/**
 * Блок деталей навыка: заголовок, категория, описание и кнопка действия.
 * Используется на странице навыка и в модальном превью после регистрации.
 */
export function SkillDetails({
  title,
  category,
  subcategory,
  description,
  variant = 'primary',
  buttonText,
  showDualButtons = false,
  onEditClick,
  onDoneClick,
  className,
}: SkillDetailsProps) {
  const iconName =
    variant === 'secondary' ? getSecondaryIcon(buttonText) : null
  const iconBeforeText =
    iconName !== null && ICON_BEFORE_TEXT.includes(iconName)

  return (
    <section className={[styles.container, className].filter(Boolean).join(' ')}>
      <header className={styles.header}>
        <h1 className={styles.title}>{title}</h1>
        {/* Категория и подкатегория через « / », как в макете */}
        <p className={styles.category}>
          {category} / {subcategory}
        </p>
      </header>

      {/* Обрезка длинного текста — через line-clamp в CSS (макс. 7 строк) */}
      <p className={styles.description}>{description}</p>

      {showDualButtons ? (
        /* Модалка превью: белая «Редактировать» + зелёная «Готово» */
        <div className={styles.actions}>
          <Button
            type="button"
            variant="secondary"
            className={styles.button}
            onClick={onEditClick}
          >
            <span>Редактировать</span>
            <Icon name="edit" size={24} aria-hidden="true" />
          </Button>
          <Button
            type="button"
            variant="primary"
            className={styles.button}
            onClick={onDoneClick}
          >
            Готово
          </Button>
        </div>
      ) : (
        buttonText && (
          <Button type="button" variant={variant} className={styles.button}>
            {iconBeforeText && iconName && (
              <Icon name={iconName} size={24} aria-hidden="true" />
            )}
            <span>{buttonText}</span>
            {!iconBeforeText && iconName && (
              <Icon name={iconName} size={24} aria-hidden="true" />
            )}
          </Button>
        )
      )}
    </section>
  )
}
