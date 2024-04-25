import { Fragment } from 'react'
import * as AvatarPrimitive from '@radix-ui/react-avatar'
import { clsx } from 'clsx'

enum Variant {
  Circle,
  Rounded,
}

type AvatarProps = {
  variant?: Variant
  renderInvalidUrls?: boolean
  isOnline?: boolean
  src: string
}

const Avatar = ({ variant = Variant.Circle, isOnline, src }: AvatarProps) => {
  return (
    <Fragment>
      <AvatarPrimitive.Root className="relative inline-flex h-10 w-10">
        <AvatarPrimitive.Image
          src={src}
          alt="Avatar"
          className={clsx(
            'h-full w-full object-cover',
            {
              [Variant.Circle]: 'rounded-full',
              [Variant.Rounded]: 'rounded',
            }[variant]
          )}
        />
        <AvatarPrimitive.Fallback
          className={clsx(
            'flex h-full w-full items-center justify-center bg-white dark:bg-gray-800',
            {
              [Variant.Circle]: 'rounded-full',
              [Variant.Rounded]: 'rounded',
            }[variant]
          )}
          delayMs={600}
        >
          <span className="text-sm font-medium uppercase text-gray-700 dark:text-gray-400">IV</span>
        </AvatarPrimitive.Fallback>
      </AvatarPrimitive.Root>
    </Fragment>
  )
}

Avatar.variant = Variant
export { Avatar }
export type { AvatarProps, Variant }
