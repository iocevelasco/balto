import type { Meta, StoryObj } from '@storybook/react'

import { MessageBubble } from './MessageBubble'

const meta: Meta<typeof MessageBubble> = {
  component: MessageBubble,
}

export default meta
type Story = StoryObj<typeof MessageBubble>

export const Customer: Story = {
  args: {
    sender: 'user',
    text: "Hello, I'm interested in hiring a company that specializes in cryptocurrency services. I've been researching and I believe your company might be a good fit. Can you tell me more about your services?",
  },
}

export const A1: Story = {
  args: {
    sender: 'bot',
    text: "Of course! We're glad to hear that you're interested in our cryptocurrency services. We provide a wide range of solutions tailored to meet the needs of businesses and individuals in the digital currency space. Our services include cryptocurrency consulting, wallet development, exchange platform creation, and smart contract development. We also offer secure storage solutions and help clients navigate regulatory compliance.",
  },
}
