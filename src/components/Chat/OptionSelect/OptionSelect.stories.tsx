import type { Meta, StoryObj } from '@storybook/react'

import { OptionsProps, OptionSelect } from './OptionSelect'
import { useState } from 'react'

const Render = (props: OptionsProps) => {
  const [value] = useState<string | null>()

  return <OptionSelect {...props} value={value} />
}

const meta: Meta<typeof Render> = {
  component: Render,
}

export default meta
type Story = StoryObj<typeof Render>

export const Primary: Story = {
  args: {
    options: [
      {
        label: 'Option 1',
        value: 'option1',
        onClick: () => {
          console.log('option1')
        },
      },
      {
        label: 'Option 2',
        value: 'option2',
        onClick: () => {
          console.log('option2')
        },
      },
      {
        label: 'Option 3',
        value: 'option3',
        onClick: () => {
          console.log('option3')
        },
      },
    ],
  },
}
