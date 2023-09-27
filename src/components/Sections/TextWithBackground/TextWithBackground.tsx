import { SectionSharedProps } from '@/types/sections'
import React from 'react'

export type TextWithBackgroundProps = {
  text: string
  className?: string
} & SectionSharedProps

export const TextWithBackground: React.FC<TextWithBackgroundProps> = ({
  text,
  className,
}) => {
  return (
    <div className={className}>
      <p className="text-gray-dark font-semibold text-base p-5 bg-gray-pale rounded-md">
        {text}
      </p>
    </div>
  )
}
