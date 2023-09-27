import type { Meta, StoryObj } from '@storybook/react'
import React from 'react'
import { PhoneInput } from './PhoneInput'

const meta = {
  title: 'Atoms/PhoneInput',
  component: PhoneInput,
  tags: ['autodocs'],
  argTypes: {
    name: {
      descriotion: 'Name of the PhoneInput',
    },
    placeholder: {
      description: 'Placeholder of the PhoneInput',
    },
    label: {
      description: 'Label of the PhoneInput',
    },
    required: {
      description: 'Is the PhoneInput required(adds a * next to the label)',
      control: 'boolean',
    },
    error: {
      description: 'Is the PhoneInput in error state(adds a red border)',
      control: 'boolean',
    },
    value: {
      description: 'Value of the PhoneInput',
      defaultValue: '',
    },
  },
  decorators: [
    (Story) => (
      <div className="w-96">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof PhoneInput>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    name: 'example',
    placeholder: 'Placeholder',
    label: 'Label',
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
    value: '1111111',
  },
}
