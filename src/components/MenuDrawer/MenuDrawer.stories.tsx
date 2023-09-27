import { Button } from '@mui/material'
import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import MenuDrawer, { MenuDrawerProps } from './MenuDrawer'

const menuLinks = [
  {
    id: 1,
    href: '/demo',
    text: 'Home',
  },
  {
    id: 2,
    href: '/demo',
    text: 'Blog',
  },
  {
    id: 3,
    href: '/demo',
    text: 'About',
  },
]

const CustomMenuDrawer: React.FC<MenuDrawerProps> = (
  props: MenuDrawerProps,
) => {
  const [open, setOpen] = useState(props.open)
  return (
    <>
      <Button
        onClick={() => {
          setOpen(true)
        }}
      >
        Open Menu
      </Button>
      <MenuDrawer open={open} setOpen={setOpen} menuItem={menuLinks} />
    </>
  )
}

const meta: Meta = {
  title: 'Organisms/MenuDrawer',
  component: CustomMenuDrawer,
} satisfies Meta<typeof CustomMenuDrawer>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}
