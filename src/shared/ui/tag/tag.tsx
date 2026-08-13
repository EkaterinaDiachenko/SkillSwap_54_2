import type { ReactNode } from 'react'
import styles from './tag.module.css'

export type Color = | 'business' | 'art' | 'languages' | 'education' | 'home' | 'health' | 'more';

export type TagProps = {
  label?: string
  content?: ReactNode
  size?: 'small' | 'large'
  color?: Color
  className?: string
}

export function Tag({ label, content, size = 'large', color = 'education', className = '' }: TagProps) {
  return (
    <span className={`${styles.tag} ${styles[size]} ${styles[color]} ${className}`}>{content}{label}</span>
  )
}