import type { Meta, StoryObj } from '@storybook/react'
import NavBar from './Navbar'

const meta = {
  title: 'Organisms/Navbar',
  component: NavBar,
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof NavBar>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    links: [
      {
        id: 1,
        href: '/',
        text: 'Home',
        component: 'link',
      },
      {
        id: 2,
        href: '/',
        text: 'Blog',
        component: 'link',
      },
    ],
    textCTA: 'Contact Sales',
  },
}
