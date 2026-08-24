import { RegisterLayout } from '@/widgets/register-layout'
import { WelcomeRegisterChildren } from '@/widgets/welcome-register-children'

/**
 * Первый шаг регистрации: оболочка RegisterLayout + форма WelcomeRegisterChildren.
 * Без бизнес-логики.
 */
export default function WelcomeRegisterPage() {
  return (
    <RegisterLayout
      currentStep={1}
      totalSteps={3}
      image="lamp"
      title="Добро пожаловать в SkillSwap!"
      description="Присоединяйтесь к SkillSwap и обменивайтесь знаниями и навыками с другими людьми"
    >
      <WelcomeRegisterChildren />
    </RegisterLayout>
  )
}
