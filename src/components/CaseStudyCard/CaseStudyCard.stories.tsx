import type { Meta, StoryObj } from '@storybook/react'
import CaseStudyCard from './CaseStudyCard'
const image = 'https://i.imgur.com/2mtkCcY.jpg'
const meta = {
  title: 'CaseStudyCard',
  component: CaseStudyCard,
  tags: ['autodocs'],
  argTypes: {
    title: {
      description: 'Card title',
    },
    caption: {
      description: 'Card description',
    },
    src: {
      description: 'img src',
    },
    alt: {
      description: 'img alt',
    },
    id: {
      description: 'Unit identifier',
    },
  },
} satisfies Meta<typeof CaseStudyCard>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    title:
      'AWS vs. Azure vs. GCP Comparison: Which is the Best Cloud Platform for Your Business?',
    caption:
      'Nulla ullamcorper felis non elementum sodales. Suspendisse vulputate maximus metus, at pharetra augue commodo eu. Fusce felis risus, imperdiet at congue eget, tempus non odio.',
    src: image,
    alt: 'alt',
    id: 1,
  },
}
