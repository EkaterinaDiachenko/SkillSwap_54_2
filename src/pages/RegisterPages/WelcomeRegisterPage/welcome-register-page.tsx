import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useLocation, useNavigate } from 'react-router-dom'
import { RegisterLayout } from '@/widgets/register-layout'
import { WelcomeRegisterChildren } from '@/widgets/welcome-register-children'
import { ROUTES } from '@/shared/lib/constants'
import type { RegistrationDraft } from '@/features/registration/model'
import {
  saveRegistrationDraft,
  selectCredentials,
  selectRegistrationDraft,
  setCurrentStep,
  updateCredentials,
  welcomeRegisterSchema,
  type WelcomeRegisterFormValues,
} from '@/features/registration/model'
import { useAppDispatch, useAppSelector } from '@/store/hooks'

type LocationState = {
  from?: string
}

/**
 * Первый шаг регистрации.
 * Валидация срабатывает по клику «Далее»; после первой проверки поля перевалидируются при изменении.
 */
export default function WelcomeRegisterPage() {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const location = useLocation()
  const credentials = useAppSelector(selectCredentials)
  const draft = useAppSelector(selectRegistrationDraft)

  const {
    watch,
    setValue,
    reset,
    handleSubmit,
    formState: { errors, isSubmitted },
  } = useForm<WelcomeRegisterFormValues>({
    resolver: yupResolver(welcomeRegisterSchema),
    mode: 'onSubmit',
    reValidateMode: 'onChange',
    defaultValues: {
      email: credentials.email,
      password: credentials.password,
    },
  })

  useEffect(() => {
    reset({
      email: credentials.email,
      password: credentials.password,
    })
  }, [credentials.email, credentials.password, reset])

  const email = watch('email')
  const password = watch('password')
  const shouldValidate = { shouldValidate: isSubmitted }

  const handleEmailChange = (value: string) => {
    setValue('email', value, shouldValidate)
  }

  const handlePasswordChange = (value: string) => {
    setValue('password', value, shouldValidate)
  }

  const handleNext = handleSubmit((values) => {
    dispatch(updateCredentials(values))

    const updatedDraft: RegistrationDraft = {
      ...draft,
      credentials: values,
    }

    saveRegistrationDraft(updatedDraft)
    dispatch(setCurrentStep(2))

    navigate(ROUTES.REGISTER_STEP_2, {
      state: {
        from: (location.state as LocationState | null)?.from,
      },
    })
  })

  return (
    <RegisterLayout
      currentStep={1}
      totalSteps={3}
      image="lamp"
      title="Добро пожаловать в SkillSwap!"
      description="Присоединяйтесь к SkillSwap и обменивайтесь знаниями и навыками с другими людьми"
    >
      <WelcomeRegisterChildren
        email={email}
        password={password}
        emailError={errors.email?.message}
        passwordError={errors.password?.message}
        onEmailChange={handleEmailChange}
        onPasswordChange={handlePasswordChange}
        onNextClick={handleNext}
      />
    </RegisterLayout>
  )
}
