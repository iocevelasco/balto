'use client'

import { IconCard } from '@/components/IconCard/IconCard'
import { SectionSharedProps } from '@/types/sections'
import React, { useState } from 'react'

export type IconCardListProps = {
  list: [
    {
      text: string
      image: {
        data: {
          attributes: {
            url: string
            alternativeText: string
          }
        }
      }
    },
  ]
} & SectionSharedProps

export const IconCardList: React.FC<IconCardListProps> = ({ list }) => {
  const [currentSelection, setCurrentSelection] = useState<number | unknown>()
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-y-5 gap-x-8">
      {list.map((card, index) => (
        <IconCard
          key={index}
          image={card.image.data.attributes.url}
          alt={card.image.data.attributes.alternativeText}
          text={card.text}
          onClick={() => {
            setCurrentSelection(index)
          }}
          className="max-lg:w-full"
          selected={currentSelection === index}
        />
      ))}
    </div>
  )
}
