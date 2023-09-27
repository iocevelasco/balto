'use client'

import { Button } from '@mui/material'
import React, { useRef } from 'react'
import { ReactComponent as ArrowDownLarge } from '@/assets/Icons/Navigation/ArrowDownLarge.svg'
import ReactMarkdown from 'react-markdown'

interface CollapsibleTextProps {
  content: string
}

const ScrollableParagraph = ({ content }: CollapsibleTextProps) => {
  const contentRef = useRef<null | HTMLDivElement>(null)

  const scrollToBottom = () => {
    contentRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="pt-8">
      <Button
        variant="iconButton"
        onClick={scrollToBottom}
        className="w-[14.5rem]"
        endIcon={<ArrowDownLarge width="1rem" height="1rem" />}
      >
        VIEW MORE
      </Button>
      <div ref={contentRef} className="pt-[24vh] fit-content">
        <ReactMarkdown className="markdown-body" skipHtml>
          {content}
        </ReactMarkdown>
      </div>
    </div>
  )
}

export default ScrollableParagraph
