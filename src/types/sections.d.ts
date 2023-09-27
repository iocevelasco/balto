export type SectionComponentType =
  | 'sections.text-with-background'
  | 'sections.icon-card-list'
  | 'sections.profile-card-list'
  | 'sections.scrollable-rich-text'
  | 'sections.simple-text'

export interface SectionSharedProps {
  id: string
  __component?: SectionComponentType
}
