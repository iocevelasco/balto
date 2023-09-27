import type { Meta, StoryObj } from '@storybook/react'
import React from 'react'
import { ProfileCard } from './ProfileCard'
import image from '@/assets/Images/Profile1.png'

const meta = {
  title: 'Atoms/ProfileCard',
  component: ProfileCard,
  tags: ['autodocs'],
  argTypes: {
    name: {
      descriotion: 'Name of the profile',
    },
    position: {
      description: 'Position of the profile',
    },
    location: {
      description: 'Location of the profile',
    },
    aditionalInfo: {
      description: 'Aditional info of the profile',
    },
    className: {
      description: 'Classname of the profile container',
    },
  },
  decorators: [
    (Story) => (
      <div className="w-96">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof ProfileCard>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    name: 'Scott Craig',
    aditionalInfo: 'Co - Founder',
    location: 'London, UK',
    position: 'CEO',
    href: '/test',
    image,
    alt: 'scott craig picture',
  },
}
