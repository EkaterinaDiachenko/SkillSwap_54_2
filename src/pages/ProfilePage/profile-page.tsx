import clsx from 'clsx'
import { AuthHeader } from '@/widgets/header'
import { ProfileSidebar } from '@/widgets/profile-sidebar'
import { PersonalDataForm } from '@/widgets/personal-data-form'
import { EditableAvatar } from '@/widgets/editable-avatar'
import { Footer } from '@/widgets/footer'
import type { SkillCategory } from '@/widgets/skills-mega-menu'
import styles from './profile-page.module.css'

export type ProfilePageProps = {
  className?: string
}

const sidebarItems = [
  { label: 'Заявки', icon: 'request' as const, isActive: false },
  { label: 'Мои обмены', icon: 'message-text' as const, isActive: false },
  { label: 'Избранное', icon: 'like' as const, isActive: false },
  { label: 'Мои навыки', icon: 'idea' as const, isActive: false },
  { label: 'Личные данные', icon: 'user' as const, isActive: true },
]

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
            <ProfileSidebar items={sidebarItems} />
          </div>

          <div className={styles.formColumn}>
            <PersonalDataForm />
            <EditableAvatar src="/avatars/avatar-01.png" name="Мария" />
          </div>
        </div>
      </main>

      <Footer categories={categories} />
    </div>
  )
}
