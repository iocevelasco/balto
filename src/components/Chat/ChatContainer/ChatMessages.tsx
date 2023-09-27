import React from 'react'
import {
  MessageBubble,
  type MessageBubbleProps,
} from '../MessageBubble/MessageBubble'
import Loader from '@/components/Loader/Loader'
export type ChatMessagesProps = {
  messages: MessageBubbleProps[]
  isLoading: boolean
}

export function ChatMessages({ messages, isLoading }: ChatMessagesProps) {
  return (
    <div className="py-5 px-5 overflow-auto !h-[calc(100%-13rem)] flex flex-col gap-5">
      {messages.map((message, index) => (
        <MessageBubble key={index} {...message} />
      ))}
      {isLoading && <Loader />}
    </div>
  )
}
