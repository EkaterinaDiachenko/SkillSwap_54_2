import { useEffect, useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useLocation, useNavigate, type Location } from 'react-router-dom'
import { RegisterLayout } from '@/widgets/register-layout'
import { SkillRegisterChildren } from '@/widgets/skill-register-children'
import { getCategoryOptions, getSubcategoryOptions } from '@/entities/skill'
import { ROUTES } from '@/shared/lib/constants'
import { getLocationPath } from '@/shared/lib/helpers'
import type { RegistrationDraft } from '@/features/registration/model'
import {
  dataUrlsToImageFiles,
  filesToDataUrls,
} from '@/features/registration/lib/registration-helpers'
import {
  saveRegistrationDraft,
  selectOffer,
  selectRegistrationDraft,
  updateOffer,
  skillRegisterSchema,
  type SkillRegisterFormValues,
} from '@/features/registration/model'
import { useAppDispatch, useAppSelector } from '@/store/hooks'

const CATEGORY_OPTIONS = getCategoryOptions()

type LocationState = {
  from?: Location
}

/**
 * Третий шаг регистрации — навык для обмена.
 * После успешной валидации открывается превью предложения.
 */
export default function SkillRegisterPage() {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const location = useLocation()
  const offer = useAppSelector(selectOffer)
  const draft = useAppSelector(selectRegistrationDraft)
  const state = location.state as LocationState | null
  const [saveError, setSaveError] = useState<string | null>(null)

  const {
    watch,
    setValue,
    reset,
    handleSubmit,
    formState: { errors, isSubmitted },
  } = useForm<SkillRegisterFormValues>({
    resolver: yupResolver(skillRegisterSchema),
    mode: 'onSubmit',
    reValidateMode: 'onChange',
    defaultValues: {
      skillName: offer.title,
      category: offer.category,
      subcategory: offer.subcategory,
      description: offer.description,
      images: [],
    },
  })

  const offerImageUrlsKey = offer.imageUrls.join('|')

  useEffect(() => {
    let isCancelled = false

    const restoreForm = async () => {
      const images =
        offer.imageUrls.length > 0 ? await dataUrlsToImageFiles(offer.imageUrls) : []

      if (isCancelled) {
        return
      }

      reset({
        skillName: offer.title,
        category: offer.category,
        subcategory: offer.subcategory,
        description: offer.description,
        images,
      })
    }

    void restoreForm()

    return () => {
      isCancelled = true
    }
  }, [
    offer.category,
    offer.description,
    offer.imageUrls,
    offerImageUrlsKey,
    offer.subcategory,
    offer.title,
    reset,
  ])

  const shouldValidate = { shouldValidate: isSubmitted }
  const selectedCategoryId = watch('category')
  const subcategoryOptions = useMemo(
    () => getSubcategoryOptions(selectedCategoryId ? [selectedCategoryId] : []),
    [selectedCategoryId],
  )

  const handleNext = handleSubmit(async (values) => {
    setSaveError(null)

    try {
      const imageUrls = values.images.length > 0 ? await filesToDataUrls(values.images) : []

      dispatch(
        updateOffer({
          title: values.skillName,
          category: values.category,
          subcategory: values.subcategory,
          description: values.description,
          imageUrls,
        }),
      )

      const updatedDraft: RegistrationDraft = {
        ...draft,
        offer: {
          title: values.skillName,
          category: values.category,
          subcategory: values.subcategory,
          description: values.description,
          imageUrls,
        },
      }

      saveRegistrationDraft(updatedDraft)

      navigate(ROUTES.REGISTER_PREVIEW, {
        state: {
          from: state?.from,
          backgroundLocation: location,
        },
      })
    } catch {
      setSaveError('Не удалось сохранить черновик регистрации')
    }
  })

  const handleBack = () => {
    navigate(ROUTES.REGISTER_STEP_2, {
      state: {
        from: state?.from,
      },
    })
  }

  const handleCategoryChange = (categoryId: string) => {
    setValue('category', categoryId, shouldValidate)
    setValue('subcategory', '', shouldValidate)
  }

  const handleClose = () => {
    navigate(getLocationPath(state?.from), { replace: true })
  }

  return (
    <RegisterLayout
      onClose={handleClose}
      currentStep={3}
      totalSteps={3}
      image="board"
      title="Укажите, чем вы готовы поделиться"
      description="Так другие люди смогут увидеть ваши предложения и предложить вам обмен!"
    >
      <SkillRegisterChildren
        categories={CATEGORY_OPTIONS}
        subcategories={subcategoryOptions}
        skillName={watch('skillName')}
        category={watch('category')}
        subcategory={watch('subcategory')}
        description={watch('description')}
        images={watch('images')}
        skillNameError={errors.skillName?.message}
        categoryError={errors.category?.message}
        subcategoryError={errors.subcategory?.message}
        descriptionError={errors.description?.message}
        imagesError={errors.images?.message ?? saveError ?? undefined}
        onSkillNameChange={(value) => setValue('skillName', value, shouldValidate)}
        onCategoryChange={handleCategoryChange}
        onSubcategoryChange={(value) => setValue('subcategory', value, shouldValidate)}
        onDescriptionChange={(value) => setValue('description', value, shouldValidate)}
        onImagesChange={(files) => setValue('images', files, shouldValidate)}
        onBackClick={handleBack}
        onNextClick={handleNext}
      />
    </RegisterLayout>
  )
}
