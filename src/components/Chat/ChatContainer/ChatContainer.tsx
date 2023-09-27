'use client'

import { useRef, useState, ChangeEvent, KeyboardEvent, useMemo } from 'react'
import { Drawer, useMediaQuery } from '@mui/material'
import { Prompt } from '../Prompt/Prompt'
import { isBrowser } from '@/utils/constants'
import ChatFooter from './ChatFooter'
import { MessageBubbleProps } from '../MessageBubble/MessageBubble'
import { ChatMessages } from './ChatMessages'
import { ChatContainerMessages } from './ChatContainer.utils'
export const ChatContainer = () => {
  const inputRef = useRef<HTMLInputElement | null>(null)
  const [messages, setMessages] = useState<MessageBubbleProps[]>([])
  const [open, setOpen] = useState<boolean>(true)
  const [inputValue, setInputValue] = useState<string>('')
  const [disabled, setDisabled] = useState<boolean>(false)
  const isMobileScreen = useMediaQuery('(max-width: 768px)')
  const direction = isMobileScreen ? 'bottom' : 'right'

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault()
    setInputValue(event.target.value)
  }

  const handleSendMessage = () => {
    if (inputValue.trim() !== '') {
      setMessages([...messages, { text: inputValue, sender: 'user' }])
      setInputValue('')
      setDisabled(true)
      setTimeout(() => {
        const botReply = 'This is a sample reply from the chatbot.'
        setMessages((prevMessages) => [
          ...prevMessages,
          { text: botReply, sender: 'bot' },
        ])
        setDisabled(false)
      }, 1000)
    }
  }

  const handleKeyPress = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault()
      handleSendMessage()
      inputRef.current?.focus()
    }
  }

  const memoizeMessages = useMemo(() => messages, [messages])

  return (
    <Drawer
      data-testid={ChatContainerMessages.ChatBotId}
      open={!isMobileScreen}
      anchor={direction}
      variant="persistent"
      ModalProps={{
        keepMounted: !isBrowser(),
      }}
      PaperProps={{
        className: 'var(--chatbot-width) !visible overflow-visible',
      }}
      hideBackdrop
    >
      <div className="h-[100vh] w-[25rem] bg-gray-pale">
        <div
          onClick={() => setOpen(!open)}
          className={`cursor-pointer flex flex-col justify-center items-center bg-gray-pale py-4 shadow-xl ${
            open === false ? 'absolute w-full' : ''
          }`}
        >
          Contactanos
        </div>
        <ChatMessages messages={memoizeMessages} isLoading={disabled} />
        <div className="absolute bottom-0 w-full shadow-4xl bg-gray-pale py-5 px-2.5 mt-2">
          <Prompt
            value={inputValue}
            onKeyDown={handleKeyPress}
            onChange={handleInputChange}
            placeholder="Start Typing here..."
            disabled={disabled}
            isLoading={disabled}
            inputRef={inputRef}
          />
          <ChatFooter />
        </div>
      </div>
    </Drawer>
  )
}
