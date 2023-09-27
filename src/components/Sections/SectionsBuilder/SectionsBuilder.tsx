import React from 'react'
import {
  TextWithBackground,
  TextWithBackgroundProps,
} from '../TextWithBackground/TextWithBackground'
import { SectionComponentType } from '@/types/sections'
import { IconCardList, IconCardListProps } from '../IconCardList/IconCardList'
import {
  ProfileCardList,
  ProfileCardListProps,
} from '../ProfileCardList/ProfileCardList'
import {
  ScrollableRichText,
  ScrollableRichTextProps,
} from '../ScrollableRichText/ScrollableRichText'
import { SimpleText } from '../SimpleText/SimpleText'

type Section =
  | TextWithBackgroundProps
  | IconCardListProps
  | ProfileCardListProps
  | ScrollableRichTextProps

type SectionsBuilderProps = {
  contentSections: Section[]
  title: string
}

const sections: Record<
  SectionComponentType,
  | React.FC<TextWithBackgroundProps>
  | React.FC<IconCardListProps>
  | React.FC<ProfileCardListProps>
  | React.FC<ScrollableRichTextProps>
> = {
  'sections.text-with-background': TextWithBackground,
  'sections.icon-card-list': IconCardList,
  'sections.profile-card-list': ProfileCardList,
  'sections.scrollable-rich-text': ScrollableRichText,
  'sections.simple-text': SimpleText,
}
export const SectionsBuilder: React.FC<SectionsBuilderProps> = ({
  contentSections,
  title,
}) => {
  return (
    <>
      <h1 className="text-gray-mid font-light pt-16">{title}</h1>
      <div className="pt-4 pb-8 space-y-8">
        {contentSections.map((section, index) => {
          const SectionComponent =
            sections[section.__component as SectionComponentType]
          return (
            <div key={index}>
              <SectionComponent
                id={section.id}
                text={(section as TextWithBackgroundProps).text}
                list={(section as IconCardListProps).list}
                profileList={(section as ProfileCardListProps).profileList}
                key={index}
              />
            </div>
          )
        })}
      </div>
    </>
  )
}
