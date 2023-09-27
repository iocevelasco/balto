'use client'

import { IconCard } from '@/components/IconCard/IconCard'
import React, { useState } from 'react'
import { ContentProps } from './page'

export const Content: React.FC<ContentProps> = (data) => {
  const [currentSelection, setCurrentSelection] = useState<number | unknown>()
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-y-5 gap-x-8">
      {data.iconCards.map((card, index) => (
        <IconCard
          key={index}
          image={card.icon}
          alt='alt'
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