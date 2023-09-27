import { Avatar } from '@/components/Avatar/Avatar'
import { Typography } from '@mui/material'
import PersonIcon from '@mui/icons-material/Person'

export type MessageBubbleProps = {
  text: string
  sender: 'user' | 'bot'
}

export const MessageBubble = ({ text, sender }: MessageBubbleProps) => {
  const variant = sender === 'user' ? 'circular' : 'square'
  const className =
    sender === 'user'
      ? '!bg-green-primary !text-black'
      : '!bg-black !text-green-darker'
  const icon = sender === 'user' ? 'A1' : <PersonIcon />
  return (
    <div className={`flex w-full gap-5 shadow-4xl p-5 rounded-md`}>
      <Avatar variant={variant} className={className}>
        {icon}
      </Avatar>
      <Typography variant="body2">{text}</Typography>
    </div>
  )
}
