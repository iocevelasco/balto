import { BackToTopButton, ScrollableParagraph } from '@/components'
import {
  ProfileCardProps,
  ProfileCard,
} from '@/components/ProfileCard/ProfileCard'
import React from 'react'

interface Props {
  profileCards: ProfileCardProps[]
  bottomContent: string
}

export const Content: React.FC<Props> = ({ profileCards, bottomContent }) => {
  return (
    <>
      <div className="pt-14 gap-5 grid lg:grid-cols-3">
        {profileCards.map((item, index) => (
          <ProfileCard className="max-lg:w-full h-full" key={index} {...item} />
        ))}
      </div>
      <div className="pb-14 pt-28">
        <ScrollableParagraph content={bottomContent} />
      </div>
      <BackToTopButton label="BACK TO TOP"></BackToTopButton>
    </>
  )
}