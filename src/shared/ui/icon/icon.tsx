import type { FC, SVGProps } from 'react'
import styles from './icon.module.css'

export type IconName =
  | 'add'
  | 'apple'
  | 'arrow-left'
  | 'arrow-square-left'
  | 'arrow-square-right'
  | 'book'
  | 'briefcase'
  | 'calendar'
  | 'checkbox-done'
  | 'checkbox-empty'
  | 'checkbox-remove'
  | 'chevron-down'
  | 'chevron-right'
  | 'chevron-up'
  | 'clock'
  | 'count'
  | 'cross'
  | 'done'
  | 'edit'
  | 'eye'
  | 'eye-slash'
  | 'filter-square'
  | 'gallery-add'
  | 'gallery-edit'
  | 'global'
  | 'google'
  | 'home'
  | 'idea'
  | 'like'
  | 'like-filled'
  | 'logout'
  | 'message-text'
  | 'moon'
  | 'more-square'
  | 'notification'
  | 'notification-new'
  | 'palette'
  | 'plus-circle'
  | 'radiobutton-active'
  | 'radiobutton-empty'
  | 'request'
  | 'scroll'
  | 'scroll-with-border'
  | 'search'
  | 'share'
  | 'sort'
  | 'sun'
  | 'user'
  | 'user-circle'
  | 'user-circle-large'
  | 'offer-success'
  | 'exchange-notification'

type SvgComponent = FC<SVGProps<SVGSVGElement>>

const iconModules = import.meta.glob('../../../images/icons/*.svg', {
  eager: true,
  query: '?react',
  import: 'default',
}) as Record<string, SvgComponent>

const icons = Object.fromEntries(
  Object.entries(iconModules).map(([path, component]) => {
    const name = path.split('/').pop()!.replace(/\.svg$/, '')
    return [name, component]
  }),
) as Record<IconName, SvgComponent>

export const ICON_NAMES = Object.keys(icons) as IconName[]

export type IconProps = {
  name: IconName
  className?: string
  size?: number
  'aria-label'?: string
}

/** Пример: <Icon name="search" size={24} aria-label="Поиск" /> */
export function Icon({
  name,
  className,
  size = 24,
  'aria-label': ariaLabel,
}: IconProps) {
  const SvgIcon = icons[name]

  return (
    <SvgIcon
      className={[styles.icon, className].filter(Boolean).join(' ')}
      width={size}
      height={size}
      role={ariaLabel ? 'img' : undefined}
      aria-label={ariaLabel}
      aria-hidden={ariaLabel ? undefined : true}
      focusable="false"
    />
  )
}
