import React from 'react';
import styles from './illustration.module.css';

export type IllustrationName = 
  | '404-error'
  | '500-error'
  | 'board'
  | 'lamp'
  | 'user';

export interface IllustrationProps {
  /**
   * Название иллюстрации
   */
  name: IllustrationName;
  /**
   * Дополнительный CSS-класс
   */
  className?: string;
  /**
   * Ширина иллюстрации
   */
  width?: string | number;
  /**
   * Высота иллюстрации
   */
  height?: string | number;
  /**
   * Альтернативный текст
   */
  alt?: string;
  /**
   * Роль для доступности
   */
  role?: string;
}

const illustrationMap: Record<IllustrationName, string> = {
  '404-error': '/src/images/illustrations/404-error-ill.svg',
  '500-error': '/src/images/illustrations/500-error-ill.svg',
  'board': '/src/images/illustrations/board-ill.svg',
  'lamp': '/src/images/illustrations/lamp-ill.svg',
  'user': '/src/images/illustrations/user-ill.svg',
};

/**
 * Компонент-обертка для иллюстраций
 * Использует готовый набор иллюстраций из папки src/images/illustrations/
 */
const Illustration: React.FC<IllustrationProps> = ({
  name,
  className = '',
  width = 'auto',
  height = 'auto',
  alt = '',
  role = 'img',
}) => {
  const src = illustrationMap[name];

  return (
    <img
      src={src}
      alt={alt || `Illustration: ${name}`}
      className={`${styles.illustration} ${className}`}
      width={width}
      height={height}
      role={role}
      loading="lazy"
    />
  );
};

export default Illustration;