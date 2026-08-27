import { useLocation, useNavigate } from 'react-router-dom'
import { Modal } from '@/shared/ui/modal'
import { OfferConfirmContent } from '@/widgets/offer-confirm-content'
import { ROUTES } from '@/shared/lib/constants'
import styles from './offer-confirm-page.module.css'

type LocationState = {
  from?: string
}

export default function OfferConfirmPage() {
  const navigate = useNavigate()
  const location = useLocation()

  const handleClose = () => {
    const from = (location.state as LocationState | null)?.from ?? ROUTES.HOME
    navigate(from, { replace: true })
  }

  return (
    <Modal isOpen onClose={handleClose} className={styles.modal}>
      <OfferConfirmContent onButtonClick={handleClose} />
    </Modal>
  )
}
