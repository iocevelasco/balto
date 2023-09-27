import * as React from 'react'
import { Avatar as MUIAvatar } from '@mui/material'

interface AvatarProps {
  src?: string
  className?: string
  variant?: 'square' | 'circular' | 'rounded'
  children?: React.ReactNode
}

export const Avatar: React.FC<AvatarProps> = ({
  src,
  className,
  variant = 'circular',
  children,
}: AvatarProps) => (
  <MUIAvatar
    src={src}
    variant={variant}
    className={variant === 'square' ? `!rounded ${className}` : className}
  >
    {children || 'A1'}
  </MUIAvatar>
)
