import LogoIcon from '@/images/logo.svg?react'
import styles from './logo.module.css'

type LogoProps = {
  className?: string;
  size?: number;
};

export function Logo({ className, size = 159 }: LogoProps) {
  return (
    <LogoIcon
      className={`${styles.logo} ${className ?? ""}`}
      role="img"
      aria-label="SkillSwap"
      style={{ width: size, height: "auto" }}
    />
  );
}
