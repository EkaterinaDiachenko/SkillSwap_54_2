import React from 'react'
import styles from './button.module.css'

export type ButtonVariant = 'primary' | 'secondary' | 'tertiary' | 'quaternary'

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  children: React.ReactNode
  disabled?: boolean
  className?: string
}

export function Button({
  variant = 'primary',
  children,
  disabled = false,
  className = '',
  ...props
}: ButtonProps) {
  const variantClass = styles[variant] || styles.primary

  return (
    <button
      className={`${styles.button} ${variantClass} ${className}`}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  )
}
