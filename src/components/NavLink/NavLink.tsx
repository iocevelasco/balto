'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

interface NavLinkProps {
  href?: string
  text: string
  onClick?: () => void
}

export default function NavLink({ href, text, onClick }: NavLinkProps) {
  const path = usePathname()

  const currentUrl = path === href

  return (
    <li className="flex flex-col m-0 w-full lg:w-fit">
      <Link
        onClick={onClick}
        href={href ?? ''}
        className={`group/link flex flex-col items-end lg:items-center !no-underline uppercase text-gray-dark h-full min-h-[2.5em] ${
          currentUrl ? 'active' : ''
        } after:content-[''] after:block after:w-full after:border-b-[0.325rem] after:border-gray-pale after:transition-colors after:duration-500 after:mt-auto hover:after:border-green-primary ${
          currentUrl ? 'after:border-green-primary' : ''
        }  `}
      >
        {text}
      </Link>
    </li>
  )
}
