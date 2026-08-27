import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useLocation, useNavigate, type Location } from 'react-router-dom'
import { RegisterLayout } from '@/widgets/register-layout'
import { WelcomeRegisterChildren } from '@/widgets/welcome-register-children'
import { ROUTES } from '@/shared/lib/constants'
import {
  welcomeRegisterSchema,
  type WelcomeRegisterFormValues,
} from '@/features/registration/model'

/**
 * Первый шаг регистрации.
 * Валидация срабатывает по клику «Далее»; после первой проверки поля перевалидируются при изменении.
 */
export default function WelcomeRegisterPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const state = location.state as { from?: Location } | null

  const {
    watch,
    setValue,
    handleSubmit,
    formState: { errors, isSubmitted },
  } = useForm<WelcomeRegisterFormValues>({
    resolver: yupResolver(welcomeRegisterSchema),
    // Ошибки не показываем до первого submit
    mode: 'onSubmit',
    // После submit — повторная проверка при каждом изменении поля
    reValidateMode: 'onChange',
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const email = watch('email')
  const password = watch('password')

  /** Обновляет поле; перевалидация только после первой попытки отправки */
  const handleEmailChange = (value: string) => {
    setValue('email', value, { shouldValidate: isSubmitted })
  }

  const handlePasswordChange = (value: string) => {
    setValue('password', value, { shouldValidate: isSubmitted })
  }

  const handleNext = handleSubmit(() => {
    navigate(ROUTES.REGISTER_STEP_2, {
      state: {
        from: state?.from,
      },
    })
  })

  const handleClose = () => {
    const from = state?.from

    navigate(from ? `${from.pathname}${from.search}${from.hash}` : ROUTES.HOME, { replace: true })
  }

  return (
    <RegisterLayout
      onClose={handleClose}
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
