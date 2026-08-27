import clsx from 'clsx'
import { AuthHeader } from '@/widgets/header'
import { ProfileSidebar } from '@/widgets/profile-sidebar'
import { PersonalDataForm } from '@/widgets/personal-data-form'
import { EditableAvatar } from '@/entities/user/ui/editable-avatar'
import { Footer } from '@/widgets/footer'
import type { SkillCategory } from '@/entities/skill'
import type { SelectOption } from '@/shared/ui/select'
import styles from './profile-page.module.css'

export type ProfilePageProps = {
  userName?: string
  avatarSrc?: string
  categories?: SkillCategory[]
  email?: string
  name?: string
  birthDate?: Date
  gender?: string
  city?: string
  about?: string
  cities?: SelectOption[]
  genderOptions?: SelectOption[]
  onSaveClick?: () => void
  onAvatarEdit?: () => void
  className?: string
  onProfileClick?: () => void
  onFavoritesClick?: () => void
}

export default function ProfilePage({
  userName = 'Мария',
  avatarSrc = '/avatars/avatar-01.png',
  categories = [],
  email,
  name,
  birthDate,
  gender,
  city,
  about,
  cities = [],
  genderOptions = [],
  onSaveClick,
  onAvatarEdit,
  className,
  onProfileClick,
  onFavoritesClick,
}: ProfilePageProps) {
  return (
    <div className={clsx(styles.page, className)}>
      <AuthHeader
        name={userName}
        avatarSrc={avatarSrc}
        categories={categories}
        onProfileClick={onProfileClick}
        onFavoritesClick={onFavoritesClick}
      />

      <main className={styles.main}>
        <div className={styles.sidebar}>
          <ProfileSidebar />
        </div>

        <div className={styles.content}>
          <PersonalDataForm
            email={email}
            name={name}
            birthDate={birthDate}
            gender={gender}
            city={city}
            about={about}
            cities={cities}
            genderOptions={genderOptions}
            onSaveClick={onSaveClick}
          />

          <EditableAvatar
            src={avatarSrc}
            alt={`Фото профиля ${userName}`}
            name={userName}
            iconName="edit"
            onEdit={onAvatarEdit}
          />
        </div>
      </main>

      <Footer categories={categories} />
    </div>
  )
}
