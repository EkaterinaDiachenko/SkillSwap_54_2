// @splidejs/react-splide 0.7.12 не резолвит свои типы из-за отсутствия
// поля "types" в "exports" package.json — объявляем модуль локально.

declare module '@splidejs/react-splide' {
  import type { Component, ComponentType, HTMLAttributes, ReactNode } from 'react'
  import type { Options, Splide as SplideCore } from '@splidejs/splide'

  export type { Options } from '@splidejs/splide'

  export type SplideProps = Omit<HTMLAttributes<HTMLElement>, 'children'> & {
    options?: Options
    hasTrack?: boolean
    tag?: 'div' | 'section' | 'header' | 'footer' | 'nav'
    extensions?: Record<string, unknown>
    transition?: unknown
    children?: ReactNode
  }

  export class Splide extends Component<SplideProps> {
    splide?: SplideCore
    sync(splide: SplideCore): void
    go(control: number | string): void
  }

  export type SplideSlideProps = HTMLAttributes<HTMLElement> & {
    children?: ReactNode
  }

  export const SplideSlide: ComponentType<SplideSlideProps>

  export const SplideTrack: ComponentType<{
    children?: ReactNode
    className?: string
  }>
}

declare module '@splidejs/react-splide/css' {}

declare module '@splidejs/react-splide/css/core' {}
