import * as React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import PersonIcon from '@mui/icons-material/Person'
import { Avatar } from './Avatar'

type AvatarProps = React.ComponentProps<typeof Avatar> & { isA1: boolean }

const Template = (args: AvatarProps) => {
  const customArgs: AvatarProps = {
    className: args.isA1
      ? '!bg-green-primary !text-black'
      : '!bg-black !text-green-darker',
    variant: args.isA1 ? 'circular' : 'square',
    children: args.isA1 ? 'A1' : <PersonIcon />,
    ...args,
  }
  return <Avatar {...customArgs} />
}

const meta: Meta<typeof Template> = {
  component: Template,
}

export default meta
type Story = StoryObj<typeof Template>

export const Default: Story = {
  args: {
    isA1: true,
  },
}
