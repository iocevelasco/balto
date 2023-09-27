import type { Meta, StoryObj } from '@storybook/react'
import Pagination from './Pagination'

const meta = {
  title: 'Atoms/Pagination',
  component: Pagination,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      description: 'outlined',
    },
    hideNextButton: {
      description: 'hideNextButton',
    },
  },
} satisfies Meta<typeof Pagination>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    variant: 'outlined',
    hideNextButton: true,
  },
}
