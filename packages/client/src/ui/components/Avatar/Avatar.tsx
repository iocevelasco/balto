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
}

let users = [
  'https://images.unsplash.com/photo-1573607217032-18299406d100?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=830&q=80',
]

const Avatar = ({ variant = Variant.Circle, isOnline, renderInvalidUrls = false }: AvatarProps) => {
  const urls = renderInvalidUrls ? Array.from({ length: users.length }, () => '') : users

  return (
    <Fragment>
      {urls.map((src, i) => (
        <AvatarPrimitive.Root key={`avatar-${i}-{src}`} className="relative inline-flex h-10 w-10">
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
          {isOnline && (
            <div
              className={clsx(
                'absolute bottom-0 right-0 h-2 w-2',
                {
                  [Variant.Circle]: '-translate-x-1/2 -translate-y-1/2',
                  [Variant.Rounded]: '',
                }[variant]
              )}
            >
              <span className="block h-2.5 w-2.5 rounded-full bg-green-400" />
            </div>
          )}
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
            <span className="text-sm font-medium uppercase text-gray-700 dark:text-gray-400">
              IV
            </span>
          </AvatarPrimitive.Fallback>
        </AvatarPrimitive.Root>
      ))}
    </Fragment>
  )
}

Avatar.variant = Variant
export { Avatar }
export type { AvatarProps, Variant }
