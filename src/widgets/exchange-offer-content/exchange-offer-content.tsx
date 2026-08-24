import clsx from 'clsx'
import { Button } from '@/shared/ui/button'
import { Icon } from '@/shared/ui/icon'
import styles from './exchange-offer-content.module.css'

export type ExchangeOfferContentProps = {
  title?: string
  subtitle?: string
  buttonText?: string
  onButtonClick?: () => void
  className?: string
}

export function ExchangeOfferContent({
  title = 'Вы предложили обмен',
  subtitle = 'Мы отправим пользователю уведомление о вашем предложении',
  buttonText = 'Готово',
  onButtonClick,
  className,
}: ExchangeOfferContentProps) {
  return (
    <div className={clsx(styles.content, className)}>
      <Icon name="notification" size={100} aria-label="Предложение обмена отправлено" />

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
