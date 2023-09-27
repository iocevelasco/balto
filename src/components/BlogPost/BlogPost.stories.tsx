import type { Meta, StoryObj } from '@storybook/react'
import Pagination from './BlogPost'
const image = 'https://i.imgur.com/2mtkCcY.jpg'
const meta = {
  title: 'Atoms/BlogPost',
  component: Pagination,
  tags: ['autodocs'],
  argTypes: {
    title: {
      description: 'Card title',
    },
    description: {
      description: 'Card description',
    },
    src: {
      description: 'img src',
    },
    alt: {
      description: 'img alt',
    },
    author: {
      description: 'author name',
    },
    date: {
      description: 'post creation date',
    },
  },
} satisfies Meta<typeof Pagination>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    id: 1,
    title:
      'AWS vs. Azure vs. GCP Comparison: Which is the Best Cloud Platform for Your Business?',
    description:
      'Nulla ullamcorper felis non elementum sodales. Suspendisse vulputate maximus metus, at pharetra augue commodo eu. Fusce felis risus, imperdiet at congue eget, tempus non odio.',
    src: image,
    alt: 'alt',
    author: 'Luis Paradela',
    date: 'Jun 25, 2023',
  },
}
