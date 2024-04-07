import { Flex, Text } from '@radix-ui/themes'
import * as React from 'react'
import { FieldValues, FormState } from 'react-hook-form'
import { shadHelper } from 'src/utils/functions/shadHelper'

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  formState?: FormState<FieldValues>
  name: string
  label?: string
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    const name = props.name
    const error = props.formState?.errors[name]?.message || ''
    return (
      <Flex direction="column">
        <Flex>
          {props.label && (
            <label htmlFor={name} className="text-sm text-muted-foreground mb-1">
              {' '}
              {props.label}{' '}
            </label>
          )}
          {props.required && <span className="text-red-600">*</span>}
        </Flex>
        <input
          type={type}
          className={shadHelper(
            'peer flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 invalid:border-red-500',
            className
          )}
          ref={ref}
          {...props}
        />
        <Text
          size="1"
          className="invisible peer-focus:invisible peer-invalid:visible  text-red-600"
        >
          {error as React.ReactNode}
        </Text>
      </Flex>
    )
  }
)
Input.displayName = 'Input'

export { Input }
