'use client'

import { type InputBaseProps } from '@mui/material'
import React from 'react'
import { validatePhoneNumber } from '@/app/helpers/strings'
import { Input } from '../Input/Input'

type Props = InputBaseProps & {
  label?: string
}

export const PhoneInput: React.FC<Props> = ({ value, ...rest }) => {
  const hasError = !validatePhoneNumber(value as string) && !!value

  return (
    <Input
      error={hasError}
      type="phone"
      value={value}
      {...rest}
      helperText={hasError ? 'This is not a valid phone number' : undefined}
    />
  )
}
