import * as yup from 'yup'

/** Поля первого шага регистрации — email и пароль */
export type WelcomeRegisterFormValues = {
  email: string
  password: string
}

/**
 * Схема валидации шага 1.
 * Тексты ошибок совпадают с формулировками из ТЗ.
 */
export const welcomeRegisterSchema = yup.object({
  email: yup
    .string()
    .required('Введите email')
    .email('Введите корректный email'),
  password: yup
    .string()
    .required('Введите пароль')
    .min(8, 'Пароль должен содержать не менее 8 символов'),
})
