'use client'

import { ReactComponent as A1Logo } from '@/assets/Icons/Navigation/A1LogoDark.svg'
import { ReactComponent as CloseIcon } from '@/assets/Icons/Navigation/Close.svg'
import { NavLink } from '@/components'
import { isBrowser } from '@/utils/constants'
import { Box, Button, Drawer, DrawerProps } from '@mui/material'
import Link from 'next/link'
import * as React from 'react'

export type menuItemProps = Array<{
  id?: number | string
  href: string
  text: string
}>

export interface MenuDrawerProps extends DrawerProps {
  ctaButton?: string
  menuItem: menuItemProps
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export default function MenuDrawer({
  open,
  setOpen,
  ctaButton,
  menuItem,
  ...rest
}: MenuDrawerProps) {
  const handleOnClose = () => {
    setOpen(false)
  }

  return (
    <React.Fragment>
      <Drawer
        anchor="right"
        open={open}
        onClose={handleOnClose}
        className=""
        PaperProps={{
          sx: {
            width: '100%',
          },
        }}
        ModalProps={{
          container: isBrowser() ? document.querySelector('#A1-web') : null,
        }}
        {...rest}
      >
        <div className="py-10 px-5">
          <Box role="presentation" className="flex flex-col gap-y-[10rem]">
            <div className="flex justify-between items-center py-5">
              <Link href="/" onClick={handleOnClose}>
                <A1Logo width="6.9375rem" height="2.1875rem" />
              </Link>
              <button onClick={handleOnClose}>
                <CloseIcon />
              </button>
            </div>
            <div className="flex flex-col items-end w-full">
              <ul className="flex flex-col gap-y-[1.875rem] h-full w-full">
                {menuItem.map((item) => (
                  <NavLink
                    onClick={handleOnClose}
                    key={item.id}
                    href={item.href}
                    text={item.text}
                  />
                ))}
              </ul>
              {ctaButton ? (
                <Button className="mt-[1.875rem] w-fit" variant="outlined">
                  {ctaButton}
                </Button>
              ) : null}
            </div>
          </Box>
        </div>
      </Drawer>
    </React.Fragment>
  )
}
