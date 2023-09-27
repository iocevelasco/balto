import type { Meta, StoryObj } from '@storybook/react'
import NavButtonMenu from './NavButtonMenu'

const meta = {
  title: 'Organisms/NavButtonMenu',
  component: NavButtonMenu,
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof NavButtonMenu>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    buttonMenuText: 'Services',
    subMenuItems: [
      {
        id: 1,
        href: '/',
        text: 'Home',
      },
      {
        id: 2,
        href: '/blog',
        text: 'Blog',
      },
    ],
  },
}
