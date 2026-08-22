import clsx from 'clsx'
import { AuthHeader } from '@/widgets/header'
import { ProfileSidebar } from '@/widgets/profile-sidebar'
import { PersonalDataForm } from '@/widgets/personal-data-form'
import { EditableAvatar } from '@/entities/user/ui/editable-avatar'
import { Footer } from '@/widgets/footer'
import type { SkillCategory } from '@/widgets/skills-mega-menu'
import styles from './profile-page.module.css'

export type ProfilePageProps = {
  className?: string
}

export default function ProfilePage({ className }: ProfilePageProps) {
  const categories: SkillCategory[] = []

  return (
    <div className={clsx(styles.page, className)}>
      <AuthHeader
        name="Мария"
        avatarSrc="/avatars/avatar-01.png"
        categories={categories}
      />

      <main className={styles.main}>
        <div className={styles.content}>
          <div className={styles.sidebarColumn}>
            <ProfileSidebar />
          </div>

          <div className={styles.formColumn}>
            <PersonalDataForm />
            <EditableAvatar
              src="/avatars/avatar-01.png"
              alt="Фото профиля"
              name="Мария"
              iconName="gallery-edit"
            />
          </div>
        </div>
      </main>

      <Footer categories={categories} />
    </div>
  )
}
