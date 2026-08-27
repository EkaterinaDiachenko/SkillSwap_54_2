import * as yup from 'yup'

export type LoginFormValues = {
  email: string
  password: string
}

export const loginSchema = yup.object({
  email: yup
    .string()
    .required('Введите email')
    .email('Введите корректный email'),
  password: yup.string().required('Введите пароль'),
})
