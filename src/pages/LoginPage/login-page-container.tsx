import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useLocation, useNavigate, type Location } from 'react-router-dom'
import {
  loginSchema,
  loginUser,
  selectAuthError,
  selectAuthLoading,
  type LoginFormValues,
} from '@/features/auth/model'
import { ROUTES } from '@/shared/lib/constants'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { LoginPageUI } from './login-page'

type LocationState = {
  from?: Location
}

function getFromPath(from: Location | undefined): string {
  if (!from) {
    return ROUTES.HOME
  }

  return `${from.pathname}${from.search}${from.hash}`
}

export default function LoginPage() {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const location = useLocation()
  const loading = useAppSelector(selectAuthLoading)
  const submitError = useAppSelector(selectAuthError)

  const {
    watch,
    setValue,
    handleSubmit,
    formState: { errors, isSubmitted },
  } = useForm<LoginFormValues>({
    resolver: yupResolver(loginSchema),
    mode: 'onSubmit',
    reValidateMode: 'onChange',
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const shouldValidate = { shouldValidate: isSubmitted }
  const from = (location.state as LocationState | null)?.from

  const handleClose = () => {
    navigate(getFromPath(from), { replace: true })
  }

  const handleLogin = handleSubmit(async (values) => {
    try {
      await dispatch(loginUser(values)).unwrap()
      navigate(getFromPath(from), { replace: true })
    } catch {
      setValue('email', values.email)
      setValue('password', values.password)
    }
  })

  return (
    <LoginPageUI
      email={watch('email')}
      password={watch('password')}
      emailError={errors.email?.message}
      passwordError={errors.password?.message}
      submitError={submitError ?? undefined}
      isLoading={loading}
      onEmailChange={(value) => setValue('email', value, shouldValidate)}
      onPasswordChange={(value) => setValue('password', value, shouldValidate)}
      onClose={handleClose}
      onSubmit={handleLogin}
    />
  )
}
