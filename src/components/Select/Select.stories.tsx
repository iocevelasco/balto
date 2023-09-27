import type { Meta, StoryObj } from '@storybook/react'
import React from 'react'
import { Select } from './Select'

const meta = {
  title: 'Atoms/Select',
  component: Select,
  tags: ['autodocs'],
  argTypes: {
    name: {
      descriotion: 'Name of the Select',
    },
    placeholder: {
      description: 'Placeholder of the Select',
    },
    label: {
      description: 'Label of the Select',
    },
    required: {
      description: 'Is the Select required(adds a * next to the label)',
      control: 'boolean',
    },
    error: {
      description: 'Is the Select in error state(adds a red border)',
      control: 'boolean',
    },
    helperText: {
      description: 'Text to display under the Select',
    },
  },
  decorators: [
    (Story) => (
      <div className="w-96">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Select>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    name: 'example',
    placeholder: 'Placeholder',
    label: 'Label',
    options: ['Option 1', ' Option 2', 'Option 3'],
    value: '',
  },
}

export const Required = {
  args: {
    ...Default.args,
    required: true,
  },
}

export const Error = {
  args: {
    ...Default.args,
    error: true,
    helperText: 'This is an error',
  },
}

export const WithHelperText = {
  args: {
    ...Default.args,
    helperText: 'This is a helper text',
  },
}
