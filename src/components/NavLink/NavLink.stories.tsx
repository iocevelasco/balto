import type { Meta, StoryObj } from '@storybook/react'
import NavLink from './NavLink'

const meta = {
  title: 'Atoms/NavLink',
  component: NavLink,
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof NavLink>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    href: '/',
    text: 'Home',
  },
}
