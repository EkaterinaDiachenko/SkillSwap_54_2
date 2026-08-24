import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useNavigate } from 'react-router-dom'
import { RegisterLayout } from '@/widgets/register-layout'
import { SkillRegisterChildren } from '@/widgets/skill-register-children'
import type { SelectOption } from '@/shared/ui/select'
import { ROUTES } from '@/shared/lib/constants'
import {
  skillRegisterSchema,
  type SkillRegisterFormValues,
} from '@/features/registration/model'

/** Заглушки категорий — полный справочник будет в отдельной задаче */
const CATEGORY_OPTIONS: SelectOption[] = [
  { value: 'business', label: 'Бизнес и карьера' },
  { value: 'art', label: 'Творчество и искусство' },
  { value: 'languages', label: 'Иностранные языки' },
  { value: 'education', label: 'Образование и развитие' },
  { value: 'health', label: 'Здоровье и лайфстайл' },
  { value: 'home', label: 'Дом и уют' },
]

const SUBCATEGORY_OPTIONS: SelectOption[] = [
  { value: 'music-sound', label: 'Музыка и звук' },
  { value: 'photography', label: 'Фотография' },
  { value: 'drawing', label: 'Рисование и иллюстрация' },
]

/**
 * Третий шаг регистрации — навык для обмена.
 * После успешной валидации возвращаем на главную (финальный шаг регистрации).
 */
export default function SkillRegisterPage() {
  const navigate = useNavigate()

  const {
    watch,
    setValue,
    handleSubmit,
    formState: { errors, isSubmitted },
  } = useForm<SkillRegisterFormValues>({
    resolver: yupResolver(skillRegisterSchema),
    mode: 'onSubmit',
    reValidateMode: 'onChange',
    defaultValues: {
      skillName: '',
      category: '',
      subcategory: '',
      description: '',
      images: [],
    },
  })

  const shouldValidate = { shouldValidate: isSubmitted }

  const handleNext = handleSubmit(() => {
    navigate(ROUTES.HOME)
  })

  const handleBack = () => {
    navigate(ROUTES.REGISTER_STEP_2)
  }

  return (
    <RegisterLayout
      currentStep={3}
      totalSteps={3}
      image="board"
      title="Укажите, чем вы готовы поделиться"
      description="Так другие люди смогут увидеть ваши предложения и предложить вам обмен!"
    >
      <SkillRegisterChildren
        categories={CATEGORY_OPTIONS}
        subcategories={SUBCATEGORY_OPTIONS}
        skillName={watch('skillName')}
        category={watch('category')}
        subcategory={watch('subcategory')}
        description={watch('description')}
        images={watch('images')}
        skillNameError={errors.skillName?.message}
        categoryError={errors.category?.message}
        subcategoryError={errors.subcategory?.message}
        descriptionError={errors.description?.message}
        imagesError={errors.images?.message}
        onSkillNameChange={(value) => setValue('skillName', value, shouldValidate)}
        onCategoryChange={(value) => setValue('category', value, shouldValidate)}
        onSubcategoryChange={(value) => setValue('subcategory', value, shouldValidate)}
        onDescriptionChange={(value) => setValue('description', value, shouldValidate)}
        onImagesChange={(files) => setValue('images', files, shouldValidate)}
        onBackClick={handleBack}
        onNextClick={handleNext}
      />
    </RegisterLayout>
  )
}
