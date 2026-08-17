import React from 'react';
import styles from './illustration.module.css';

// Импорт SVG как React-компоненты или URL
import Error404Svg from '@/images/illustrations/404-error-ill.svg';
import Error500Svg from '@/images/illustrations/500-error-ill.svg';
import BoardSvg from '@/images/illustrations/board-ill.svg';
import LampSvg from '@/images/illustrations/lamp-ill.svg';
import UserSvg from '@/images/illustrations/user-ill.svg';

export type IllustrationName = 
  | '404-error'
  | '500-error'
  | 'board'
  | 'lamp'
  | 'user';

export interface IllustrationProps {
  /**
   * Название иллюстрации (обязательно, если не передан src)
   */
  name?: IllustrationName;
  /**
   * URL или путь к изображению (приоритетнее name)
   */
  src?: string;
  /**
   * Размер (ширина) иллюстрации
   */
  size?: string | number;
  /**
   * Дополнительный CSS-класс
   */
  className?: string;
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
  '404-error': Error404Svg,
  '500-error': Error500Svg,
  'board': BoardSvg,
  'lamp': LampSvg,
  'user': UserSvg,
};

/**
 * Компонент-обертка для иллюстраций
 * Использует готовый набор иллюстраций из папки src/images/illustrations/
 */
export const Illustration: React.FC<IllustrationProps> = ({
  name,
  src,
  size,
  className = '',
  alt = '',
  role = 'img',
}) => {
  // Приоритет у src, если не передан - используем name
  const imageSrc = src || (name && illustrationMap[name]);

  if (!imageSrc) {
    console.warn('Illustration: необходимо передать src или name');
    return null;
  }

  const sizeStyles = size ? { width: size } : {};

  return (
    <img
      src={imageSrc}
      alt={alt || (name ? `Illustration: ${name}` : 'Illustration')}
      className={`${styles.illustration} ${className}`}
      style={sizeStyles}
      role={role}
      loading="lazy"
    />
  );
};