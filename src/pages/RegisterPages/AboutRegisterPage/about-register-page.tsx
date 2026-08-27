import { useEffect, useMemo } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useLocation, useNavigate } from 'react-router-dom'
import { RegisterLayout } from '@/widgets/register-layout'
import { AboutRegisterChildren } from '@/widgets/about-register-children'
import type { SelectOption } from '@/shared/ui/select'
import { getCategoryOptions, getSubcategoryOptions } from '@/entities/skill'
import { ROUTES } from '@/shared/lib/constants'
import type { City, Gender } from '@/shared/types'
import type { RegistrationDraft } from '@/features/registration/model'
import {
  aboutRegisterSchema,
  saveRegistrationDraft,
  selectLearningSkill,
  selectPersonalData,
  selectRegistrationDraft,
  setCurrentStep,
  updateLearningSkill,
  updatePersonalData,
  type AboutRegisterFormValues,
} from '@/features/registration/model'
import { useAppDispatch, useAppSelector } from '@/store/hooks'

/** Варианты пола — значения совпадают с типом Gender */
const GENDER_OPTIONS: SelectOption[] = [
  { value: 'male', label: 'Мужской' },
  { value: 'female', label: 'Женский' },
]

/** Список городов из типа City — для Select на шаге регистрации */
const CITY_OPTIONS: SelectOption[] = (
  [
    'Москва',
    'Санкт-Петербург',
    'Новосибирск',
    'Екатеринбург',
    'Казань',
    'Нижний Новгород',
    'Челябинск',
    'Самара',
    'Омск',
    'Ростов-на-Дону',
    'Уфа',
    'Красноярск',
    'Воронеж',
    'Пермь',
    'Архангельск',
  ] as City[]
).map((city) => ({ value: city, label: city }))

const CATEGORY_OPTIONS = getCategoryOptions()

type LocationState = {
  from?: string
}

/**
 * Второй шаг регистрации — личные данные.
 * Валидация подключена через react-hook-form + yup, UI не меняется.
 */
export default function AboutRegisterPage() {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const location = useLocation()
  const personalData = useAppSelector(selectPersonalData)
  const learningSkill = useAppSelector(selectLearningSkill)
  const draft = useAppSelector(selectRegistrationDraft)

  const {
    watch,
    setValue,
    reset,
    handleSubmit,
    formState: { errors, isSubmitted },
  } = useForm<AboutRegisterFormValues>({
    resolver: yupResolver(aboutRegisterSchema),
    mode: 'onSubmit',
    reValidateMode: 'onChange',
    defaultValues: {
      name: personalData.name,
      birthDate: personalData.birthDate ? new Date(personalData.birthDate) : undefined,
      gender: personalData.gender,
      city: personalData.city,
      category: learningSkill.categoryIds,
      subcategory: learningSkill.subcategoryIds,
    },
  })

  const learningCategoryIdsKey = learningSkill.categoryIds.join('|')
  const learningSubcategoryIdsKey = learningSkill.subcategoryIds.join('|')

  useEffect(() => {
    reset({
      name: personalData.name,
      birthDate: personalData.birthDate ? new Date(personalData.birthDate) : undefined,
      gender: personalData.gender,
      city: personalData.city,
      category: learningSkill.categoryIds,
      subcategory: learningSkill.subcategoryIds,
    })
  }, [
    learningCategoryIdsKey,
    learningSubcategoryIdsKey,
    learningSkill.categoryIds,
    learningSkill.subcategoryIds,
    personalData.birthDate,
    personalData.city,
    personalData.gender,
    personalData.name,
    reset,
  ])

  const shouldValidate = { shouldValidate: isSubmitted }
  const selectedCategoryIds = watch('category')
  const selectedSubcategoryIds = watch('subcategory')
  const subcategoryOptions = useMemo(
    () => getSubcategoryOptions(selectedCategoryIds),
    [selectedCategoryIds],
  )

  const handleNext = handleSubmit((values) => {
    if (!values.birthDate) {
      return
    }

    dispatch(
      updatePersonalData({
        name: values.name,
        birthDate: values.birthDate.toISOString(),
        gender: values.gender as Gender,
        city: values.city as City,
      }),
    )
    dispatch(
      updateLearningSkill({
        categoryIds: values.category,
        subcategoryIds: values.subcategory,
      }),
    )

    const updatedDraft: RegistrationDraft = {
      ...draft,
      personalData: {
        ...personalData,
        name: values.name,
        birthDate: values.birthDate.toISOString(),
        gender: values.gender as Gender,
        city: values.city as City,
      },
      learningSkill: {
        categoryIds: values.category,
        subcategoryIds: values.subcategory,
      },
    }

    saveRegistrationDraft(updatedDraft)
    dispatch(setCurrentStep(3))

    navigate(ROUTES.REGISTER_STEP_3, {
      state: {
        from: (location.state as LocationState | null)?.from,
      },
    })
  })

  const handleBack = () => {
    navigate(ROUTES.REGISTER, {
      state: {
        from: (location.state as LocationState | null)?.from,
      },
    })
  }

  const handleCategoryChange = (categoryIds: string[]) => {
    const availableSubcategoryIds = new Set(
      getSubcategoryOptions(categoryIds).map((option) => option.value),
    )
    const nextSubcategoryIds = selectedSubcategoryIds.filter((subcategoryId) =>
      availableSubcategoryIds.has(subcategoryId),
    )

    setValue('category', categoryIds, shouldValidate)
    setValue('subcategory', nextSubcategoryIds, shouldValidate)
  }

  return (
    <RegisterLayout
      currentStep={2}
      totalSteps={3}
      image="user"
      title="Расскажите немного о себе"
      description="Это поможет другим людям лучше вас узнать, чтобы выбрать для обмена"
    >
      <AboutRegisterChildren
        categories={CATEGORY_OPTIONS}
        subcategories={subcategoryOptions}
        cities={CITY_OPTIONS}
        genderOptions={GENDER_OPTIONS}
        name={watch('name')}
        birthDate={watch('birthDate')}
        gender={watch('gender')}
        city={watch('city')}
        category={watch('category')}
        subcategory={watch('subcategory')}
        nameError={errors.name?.message}
        birthDateError={errors.birthDate?.message}
        genderError={errors.gender?.message}
        cityError={errors.city?.message}
        categoryError={errors.category?.message}
        subcategoryError={errors.subcategory?.message}
        onNameChange={(value) => setValue('name', value, shouldValidate)}
        onBirthDateChange={(date) => setValue('birthDate', date, shouldValidate)}
        onGenderChange={(value) => setValue('gender', value, shouldValidate)}
        onCityChange={(value) => setValue('city', value, shouldValidate)}
        onCategoryChange={handleCategoryChange}
        onSubcategoryChange={(value) => setValue('subcategory', value, shouldValidate)}
        onBackClick={handleBack}
        onNextClick={handleNext}
      />
    </RegisterLayout>
  )
}
