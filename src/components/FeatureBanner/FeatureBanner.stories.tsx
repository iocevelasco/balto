import type { Meta, StoryObj } from '@storybook/react'
import FeatureBanner from './FeatureBanner'

const image = 'https://i.imgur.com/2mtkCcY.jpg'

const meta = {
  title: 'Atoms/FeatureBanner',
  component: FeatureBanner,
  tags: ['autodocs'],
  argTypes: {
    title: {
      description: 'block title',
    },
    caption: {
      description: 'outlined',
    },
    src: {
      description: image,
    },
    alt: {
      description: 'block title',
    },
  },
} satisfies Meta<typeof FeatureBanner>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    title: 'Blog title',
    caption: 'Blog caption lorem ipsum',
    src: image,
    alt: 'alt lorem ipsum',
  },
}
