import type { Meta, StoryObj } from '@storybook/react'

import { PromptProps, Prompt } from './Prompt'

const Render = (props: PromptProps) => {
  return <Prompt {...props} />
}

const meta: Meta<typeof Render> = {
  component: Render,
}

export default meta
type Story = StoryObj<typeof Render>

export const Primary: Story = {
  args: {
    isLoading: false,
  },
}
