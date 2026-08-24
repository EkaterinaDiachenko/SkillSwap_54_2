import clsx from 'clsx'
import { Button } from '@/shared/ui/button'
import { Icon } from '@/shared/ui/icon'
import styles from './offer-confirm-content.module.css'

export type OfferConfirmContentProps = {
  title?: string
  subtitle?: string
  buttonText?: string
  onButtonClick?: () => void
  className?: string
}

export function OfferConfirmContent({
  title = 'Ваше предложение создано',
  subtitle = 'Теперь вы можете предложить обмен',
  buttonText = 'Готово',
  onButtonClick,
  className,
}: OfferConfirmContentProps) {
  return (
    <div className={clsx(styles.content, className)}>
      <Icon name="offer-success" size={100} aria-label="Предложение создано" />

      <div className={styles.body}>
        <div className={styles.text}>
          <h2 className={styles.title}>{title}</h2>
          <p className={styles.subtitle}>{subtitle}</p>
        </div>

        <Button
          className={styles.button}
          variant="primary"
          type="button"
          onClick={onButtonClick}
        >
          {buttonText}
        </Button>
      </div>
    </div>
  )
}
