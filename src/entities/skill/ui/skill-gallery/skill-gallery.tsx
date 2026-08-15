import { useEffect, useMemo, useRef } from 'react'
import { Splide, SplideSlide } from '@splidejs/react-splide'
import '@splidejs/react-splide/css'
import styles from './skill-gallery.module.css'

export type SkillGalleryProps = {
  images: string[]
  activeImage?: string
  className?: string
}

const MAX_THUMBS = 3

export function SkillGallery({ images, activeImage, className }: SkillGalleryProps) {
  const mainRef = useRef<Splide>(null)
  const thumbRef = useRef<Splide>(null)

  const initialIndex = useMemo(() => {
    if (!activeImage) return 0
    const index = images.indexOf(activeImage)
    return index >= 0 ? index : 0
  }, [activeImage, images])

  const thumbImages = images.slice(0, MAX_THUMBS)
  const hiddenCount = Math.max(images.length - MAX_THUMBS, 0)
  const showOverlay = images.length > MAX_THUMBS

  useEffect(() => {
    if (mainRef.current && thumbRef.current?.splide) {
      mainRef.current.sync(thumbRef.current.splide)
    }
  }, [])

  if (images.length === 0) {
    return null
  }

  return (
    <div className={[styles.gallery, className].filter(Boolean).join(' ')}>
      <Splide
        className={styles.main}
        ref={mainRef}
        options={{
          type: 'fade',
          rewind: true,
          pagination: false,
          arrows: true,
          start: initialIndex,
          i18n: {
            prev: 'Предыдущее изображение',
            next: 'Следующее изображение',
            slideLabel: 'Изображение %s из %s',
            carousel: 'карусель',
          },
        }}
        aria-label="Галерея изображений навыка"
      >
        {images.map((src, index) => (
          <SplideSlide key={`${src}-${index}`}>
            <img className={styles.mainImage} src={src} alt={`Изображение ${index + 1}`} />
          </SplideSlide>
        ))}
      </Splide>

      <div className={styles.thumbs}>
        <Splide
          className={styles.thumbsCarousel}
          ref={thumbRef}
          options={{
            fixedWidth: 92,
            fixedHeight: 92,
            gap: 0,
            pagination: false,
            arrows: false,
            drag: false,
            isNavigation: true,
            slideFocus: true,
            i18n: {
              slideX: 'Показать изображение %s',
              carousel: 'карусель',
            },
          }}
          aria-label="Миниатюры изображений навыка"
        >
          {thumbImages.map((src, index) => (
            <SplideSlide key={`${src}-${index}`}>
              <img className={styles.thumbImage} src={src} alt="" />
            </SplideSlide>
          ))}
        </Splide>

        {showOverlay && (
          <div className={styles.overlay} aria-hidden="true">
            <span className={styles.overlayCount}>+{hiddenCount}</span>
          </div>
        )}
      </div>

      <span className={styles.srOnly}>
        {showOverlay ? `Скрыто ещё изображений: ${hiddenCount}` : ''}
      </span>
    </div>
  )
}
