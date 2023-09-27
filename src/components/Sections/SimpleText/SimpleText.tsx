import { SectionSharedProps } from '@/types/sections'
import React from 'react'

export type SimpleTextProps = {
  text: string
  className?: string
} & SectionSharedProps

export const SimpleText: React.FC<SimpleTextProps> = ({ text, className }) => {
  return (
    <div className={className}>
      <p className="text-gray-mid text-base rounded-md">{text}</p>
    </div>
  )
}
