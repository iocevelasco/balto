type Section =
  | TextWithBackgroundProps
  | IconCardListProps
  | ProfileCardListProps
  | SimpleTextProps

export type PageResponse = {
  id: string
  attributes: {
    slug: string
    heading: string
    contentSections: Section[]
  }
}[]
