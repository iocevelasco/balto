import type { Meta, StoryObj } from '@storybook/react'
import { Input } from './Input'

const meta = {
  title: 'Atoms/Input',
  component: Input,
  tags: ['autodocs'],
  argTypes: {
    name: {
      descriotion: 'Name of the input',
    },
    placeholder: {
      description: 'Placeholder of the input',
    },
    label: {
      description: 'Label of the input',
    },
    required: {
      description: 'Is the input required(adds a * next to the label)',
      control: 'boolean',
    },
    error: {
      description: 'Is the input in error state(adds a red border)',
      control: 'boolean',
    },
    helperText: {
      description: 'Text to display under the input',
    },
  },
} satisfies Meta<typeof Input>

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
    helperText: 'This is an error',
  },
}

export const WithHelperText = {
  args: {
    ...Default.args,
    helperText: 'This is a helper text',
  },
}
