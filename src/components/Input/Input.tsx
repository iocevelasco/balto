'use client'

import {
  InputBase,
  type InputBaseProps,
  FormHelperText,
  FormControl,
} from '@mui/material'
import React from 'react'
import { ReactComponent as Alert } from '@/assets/Icons/Alerts/TriangleExclamation.svg'

type Props = InputBaseProps & {
  label?: string
  helperText?: string
}

export const Input: React.FC<Props> = ({
  required,
  label,
  helperText,
  error,
  ...rest
}) => (
  <FormControl className="w-full">
    <label className={`pb-2.5 text-xs text-black block`}>
      {required && <span className={`text-error mr-1 text-xl pr-1.5`}>*</span>}
      {label}
    </label>
    <InputBase
      className={`rounded border ${
        error ? 'border-error' : 'border-gray-mid'
      }  w-full text-black h-fit`}
      required={required}
      inputProps={{
        className: `px-2.5 py-3`,
      }}
      {...rest}
    />
    {helperText && (
      <FormHelperText
        className={`${
          error ? 'text-error' : 'text-black'
        } text-xs px-4 py-1.5 bg-gray-pale mt-1.5 rounded-lg flex mx-0 space-x-2`}
      >
        {error && <Alert className="h-4 w-4" />}
        <span>{helperText}</span>
      </FormHelperText>
    )}
  </FormControl>
)
