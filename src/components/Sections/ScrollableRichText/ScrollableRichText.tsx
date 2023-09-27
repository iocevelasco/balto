import BackToTopButton from '@/components/Button/BackToTopButton/BackToTopButton'
import ScrollableParagraph from '@/components/ScrollableParagraph/ScrollableParagraph'
import { SectionSharedProps } from '@/types/sections'
import React from 'react'

export type ScrollableRichTextProps = {
  text: string
} & SectionSharedProps

export const ScrollableRichText: React.FC<ScrollableRichTextProps> = ({
  text,
}) => {
  return (
    <>
      <div className="pt-16 pb-8">
        <ScrollableParagraph content={text} />
      </div>
      <BackToTopButton label="BACK TO TOP" />
    </>
  )
}
