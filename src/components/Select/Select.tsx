'use client'

import {
  FormHelperText,
  FormControl,
  SelectProps,
  MenuItem,
  Select as MuiSelect,
} from '@mui/material'
import React, { ReactNode } from 'react'
import { ReactComponent as Alert } from '@/assets/Icons/Alerts/TriangleExclamation.svg'

import { ReactComponent as Arrow } from '@/assets/Icons/Navigation/ArrowDown.svg'

export type Props = SelectProps & {
  label?: string
  helperText?: string
  options?: string[]
}

export const Select: React.FC<Props> = ({
  required,
  label,
  helperText,
  error,
  ...rest
}) => (
  <FormControl className="w-full" focused={false}>
    <label className={`pb-2.5 text-xs text-black block`}>
      {required && <span className={`text-error mr-1 text-xl pr-1.5`}>*</span>}
      {label}
    </label>
    <MuiSelect
      required={required}
      inputProps={{
        className: `px-2.5 py-3`,
      }}
      IconComponent={Arrow}
      displayEmpty
      renderValue={
        ((value: string) => {
          if (value.length === 0) {
            return (
              <div className="text-black opacity-40">{rest.placeholder}</div>
            )
          }
          return value
          // eslint-disable-next-line no-unused-vars
        }) as (value: unknown) => ReactNode
      }
      error={error}
      {...rest}
    >
      {rest.options?.map((option) => (
        <MenuItem key={option} value={option}>
          {option}
        </MenuItem>
      ))}
    </MuiSelect>
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
