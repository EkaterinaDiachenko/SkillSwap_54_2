import { RegisterLayout } from '@/widgets/register-layout'
import { SkillRegisterChildren } from '@/widgets/skill-register-children'

/**
 * Третий шаг регистрации: оболочка RegisterLayout + форма SkillRegisterChildren.
 * Без бизнес-логики.
 */
export default function SkillRegisterPage() {
  return (
    <RegisterLayout
      currentStep={3}
      totalSteps={3}
      image="board"
      title="Укажите, чем вы готовы поделиться"
      description="Так другие люди смогут увидеть ваши предложения и предложить вам обмен!"
    >
      <SkillRegisterChildren categories={[]} subcategories={[]} />
    </RegisterLayout>
  )
}
