import { Button } from '@mui/material'
import type { Meta, StoryObj } from '@storybook/react'

import SendIcon from '@mui/icons-material/Send'

const meta = {
  title: 'atoms/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'radio',
      options: ['contained', 'outlined', 'text'],
    },
    children: { control: 'text' },
    disabled: {
      control: 'boolean',
      defaultValue: false,
    },
  },
} satisfies Meta<typeof Button>

export default meta

type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    variant: 'contained',
    children: 'Button',
  },
}
export const Outlined: Story = {
  args: {
    variant: 'outlined',
    children: 'Button',
  },
}
export const Text: Story = {
  args: {
    variant: 'text',
    children: 'Button',
  },
}
export const IconButton: Story = {
  args: {
    variant: 'iconButton',
    children: 'Button',
    endIcon: <SendIcon />,
  },
}
