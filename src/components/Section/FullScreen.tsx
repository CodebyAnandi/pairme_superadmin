import React, { ReactNode } from 'react'
import { BgKey } from '../../interfaces'
import {
  gradientBgPurplePink,
  gradientBgDark,
  gradientBgPinkRed,
  gradientBgBlue,
} from '../../colors'
import { useAppSelector } from '../../stores/hooks'

type Props = {
  bg: BgKey
  children: ReactNode
}

export default function SectionFullScreen({ bg, children }: Props) {
  const darkMode = useAppSelector((state) => state.style.darkMode)

  let componentClass = 'flex min-h-screen items-center justify-center flex-col gap-5 '

  if (darkMode) {
    componentClass += gradientBgDark
  } else if (bg === 'purplePink') {
    componentClass += gradientBgPurplePink
  } else if (bg === 'pinkRed') {
    componentClass += gradientBgPinkRed
  } else if (bg === 'blue') {
    componentClass += gradientBgBlue
  }

  return <div className={componentClass}>{children}</div>
}
