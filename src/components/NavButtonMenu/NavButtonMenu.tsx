'use client'

import { APP_ROOT_ID, isBrowser } from '@/utils/constants'
import Button from '@mui/material/Button'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import * as React from 'react'
export type SubMenuItemData = Array<{
  id: string | number
  href: string
  text: string
}>

interface NavButtonMenuProps {
  buttonMenuText: string
  subMenuItems: SubMenuItemData
  href?: string
}

export default function NavButtonMenu({
  buttonMenuText,
  subMenuItems,
  href,
}: NavButtonMenuProps) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const path = usePathname()
  const open = Boolean(anchorEl)

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  const currentUrl = `/${path.split('/')[1]}` === href
  const activeSubTab = open || currentUrl

  return (
    <li className="flex flex-col m-0 w-full lg:w-fit">
      <Button
        variant="text"
        onClick={handleClick}
        className={`group/link flex flex-col items-end text-sm font-semibold leading-[var(--link)] lg:items-center !no-underline uppercase text-gray-dark h-full min-h-[2.5em] p-0 after:content-[''] after:block after:w-full after:border-b-[0.325rem] after:border-gray-pale after:transition-colors after:duration-500 after:mt-auto hover:after:border-green-primary ${
          activeSubTab ? 'after:border-green-primary' : ''
        } `}
      >
        {buttonMenuText}
      </Button>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
          classes: {
            padding: 'p-5',
          },
        }}
        container={
          isBrowser() ? document.querySelector(`#${APP_ROOT_ID}`) : null
        }
        classes={{
          paper: 'shadow-4xl mt-2 min-w-fit',
        }}
        PopoverClasses={{
          root: 'w-fit',
        }}
      >
        {subMenuItems.map((subMenuItem) => (
          <MenuItem
            key={subMenuItem.id}
            onClick={handleClose}
            classes={{
              root: 'p-0 hover:bg-transparent flex-col items-start',
            }}
            disableRipple
          >
            <Link
              className="group/link flex flex-row-reverse items-end lg:items-center !no-underline uppercase text-gray-dark h-full min-h-[2.5em]"
              href={subMenuItem.href}
            >
              {subMenuItem.text}
              <span className="w-full block border-l-[0.325rem] border-gray-pale group-hover/link:border-green-primary transition-colors duration-500 mr-[0.625rem] h-[1.25rem]"></span>
            </Link>
          </MenuItem>
        ))}
      </Menu>
    </li>
  )
}
