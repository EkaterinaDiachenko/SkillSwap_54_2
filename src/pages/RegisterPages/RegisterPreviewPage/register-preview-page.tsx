import { useNavigate, useLocation } from 'react-router-dom'
import { Modal } from '@/shared/ui/modal'
import { RegisterPreviewContent } from '@/widgets/register-preview-content'
import { ROUTES } from '@/shared/lib/constants'
import {
  getCategoryTitle,
  getSubcategoryTitle,
} from '@/features/registration/lib/registration-helpers'
import {
  registerUser,
  selectOffer,
  selectRegistrationDraft,
  selectRegistrationError,
  selectRegistrationLoading,
} from '@/features/registration/model'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import styles from './register-preview-page.module.css'

type LocationState = {
  from?: string
}

export default function RegisterPreviewPage() {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const location = useLocation()
  const offer = useAppSelector(selectOffer)
  const draft = useAppSelector(selectRegistrationDraft)
  const loading = useAppSelector(selectRegistrationLoading)
  const error = useAppSelector(selectRegistrationError)

  const handleEdit = () => {
    navigate(ROUTES.REGISTER_STEP_3, {
      state: {
        from: (location.state as LocationState | null)?.from,
      },
    })
  }

  const handleDone = async () => {
    try {
      await dispatch(registerUser(draft)).unwrap()

      navigate(ROUTES.OFFER_CONFIRM, {
        replace: true,
        state: {
          from: (location.state as LocationState | null)?.from,
        },
      })
    } catch {
      // Ошибка отображается через selector
    }
  }

  return (
    <Modal isOpen onClose={handleEdit} className={styles.modal}>
      <RegisterPreviewContent
        title="Ваше предложение"
        subtitle="Проверьте данные перед завершением регистрации"
        skillTitle={offer.title}
        category={getCategoryTitle(offer.category)}
        subcategory={getSubcategoryTitle(offer.category, offer.subcategory)}
        description={offer.description}
        images={offer.imageUrls}
        onEditClick={handleEdit}
        onDoneClick={loading ? undefined : handleDone}
      />
      {error ? (
        <p className={styles.error} role="alert">
          {error}
        </p>
      ) : null}
      {loading ? <p className={styles.loading}>Завершение регистрации...</p> : null}
    </Modal>
  )
}
