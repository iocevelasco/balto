import type { Meta, StoryObj } from '@storybook/react'
import { IconCard } from './IconCard'
import image from '@/assets/Icons/Cards/Balance.svg'

const meta = {
  title: 'Atoms/IconCard',
  component: IconCard,
  tags: ['autodocs'],
  argTypes: {
    image: {
      description: 'Image of the card',
    },
    alt: {
      description: 'Alt text of the image',
    },
    text: {
      description: 'Text of the card',
    },
    onClick: {
      description: 'fn to call when the card is clicked',
    },
    selected: {
      description: 'If the card is selected (adds an orange border))',
    },
  },
} satisfies Meta<typeof IconCard>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    text: 'AI TOOLS FOR CODERS',
    image,
    alt: 'alt text',
  },
}

export const Selected: Story = {
  args: {
    ...Default.args,
    selected: true,
  },
}
