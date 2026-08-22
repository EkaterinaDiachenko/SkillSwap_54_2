import { RegisterLayout } from '@/widgets/register-layout'
import { AboutRegisterChildren } from '@/widgets/about-register-children'

/**
 * Второй шаг регистрации: оболочка RegisterLayout + форма AboutRegisterChildren.
 * Без бизнес-логики.
 */
export default function AboutRegisterPage() {
  return (
    <RegisterLayout
      currentStep={2}
      totalSteps={3}
      image="user"
      title="Расскажите немного о себе"
      description="Это поможет другим людям лучше вас узнать, чтобы выбрать для обмена"
    >
      <AboutRegisterChildren
        categories={[]}
        subcategories={[]}
        cities={[]}
        genderOptions={[]}
      />
    </RegisterLayout>
  )
}
