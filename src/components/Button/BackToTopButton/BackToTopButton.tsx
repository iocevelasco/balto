'use client'
import React from 'react'
import { Button } from '@/components'
import { ReactComponent as ArrowDownLarge } from '@/assets/Icons/Navigation/ArrowDownLarge.svg'

const isBrowser = () => typeof window !== 'undefined'

export type BackToTopProps = {
  label: string
  left?: number
  top?: number
  behavior?: 'auto' | 'smooth'
}
export default function BackToTopButton({
  label,
  behavior = 'smooth',
  top = 0,
  left,
}: BackToTopProps) {
  function scrollToTop() {
    if (!isBrowser()) return
    window.scrollTo({ top, left, behavior })
  }
  return (
    <Button
      variant="iconButton"
      onClick={scrollToTop}
      className="w-[14.5rem]"
      endIcon={
        <ArrowDownLarge width="1rem" height="1rem" className="rotate-180" />
      }
    >
      {label}
    </Button>
  )
}
