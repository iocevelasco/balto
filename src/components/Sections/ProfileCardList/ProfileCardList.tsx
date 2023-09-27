'use client'

import { ProfileCard } from '@/components/ProfileCard/ProfileCard'
import { SectionSharedProps } from '@/types/sections'
import React from 'react'

export type ProfileCardListProps = {
  profileList: [
    {
      name: string
      position: string
      location: string
      aditionalInfo: string
      className?: string
      href: string
      alt: string
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

export const ProfileCardList: React.FC<ProfileCardListProps> = ({
  profileList,
}) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-y-5 gap-x-8">
      {profileList.map((card, index) => (
        <ProfileCard
          key={index}
          image={card.image.data.attributes.url}
          alt={card.image.data.attributes.alternativeText}
          name={card.name}
          aditionalInfo={card.aditionalInfo}
          location={card.location}
          position={card.position}
          href={card.href}
          className="max-lg:w-full"
        />
      ))}
    </div>
  )
}
