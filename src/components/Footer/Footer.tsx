'use client'

import { ReactComponent as LocationIcon } from '@/assets/Icons/Navigation/Location.svg'
import { Typography } from '@mui/material'
import data from './Data.json'
export type AddressProps = {
  country: string
  location: string
}

export const AddressTag = ({ country, location }: AddressProps) => {
  return (
    <div className="flex flex-col">
      <div className="flex align-middle gap-2 items-center">
        <LocationIcon
          width="1.2rem"
          height="1.2rem"
          className="text-green-primary"
        />
        <Typography className="!font-bold">{country}</Typography>
      </div>
      <Typography className="pl-1">{location}</Typography>
    </div>
  )
}

export default function Footer() {
  return (
    <footer className="flex items-center justify-center sticky bottom-0 w-full p-2  pr-4 bg-gray-pale h-footer">
      <div className="container flex items-center justify-between">
        <div className="flex align-middle gap-6 items-center">
          {data.offices.map((office, index) => {
            return (
              <AddressTag
                key={index}
                country={office.country}
                location={office.location}
              />
            )
          })}
        </div>
        <div className="flex align-middle gap-6 items-center">
          <Typography className="text-black hover:underline">
            Manage Cookie Preferences
          </Typography>
          <Typography className="text-black no-underline hover:underline">
            Privacy Policy
          </Typography>
        </div>
      </div>
    </footer>
  )
}
