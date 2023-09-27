import React from 'react'
import Image, { StaticImageData } from 'next/image'
import { Typography } from '@mui/material'
import Link from 'next/link'

export interface ProfileCardProps {
  name: string
  position: string
  location: string
  aditionalInfo: string
  className?: string
  href: string
  image: string | StaticImageData
  alt: string
}

export const ProfileCard: React.FC<ProfileCardProps> = ({
  className = '',
  href,
  name,
  aditionalInfo,
  location,
  position,
  image,
  alt,
}) => {
  return (
    <Link href={href} className="no-underline">
      <div
        className={`p-5 rounded-lg shadow-lg border-2 hover:shadow-2xl
        border-gray-pale flex items-center w-[280px] max-w-full gap-x-5 cursor-pointer ${className}`}
      >
        <div>
          <Image
            src={image}
            alt={alt}
            className="rounded-full shadow-md"
            width={80}
            height={80}
          />
        </div>

        <div className="flex-1">
          <Typography
            variant="h6"
            className="text-sm font-semibold text-gray-dark"
          >
            {name}
          </Typography>
          <Typography variant="caption" className="block !tracking-[0.24px]">
            {position}
          </Typography>
          <Typography variant="caption" className="block !tracking-[0.24px]">
            {aditionalInfo}
          </Typography>
          <Typography variant="caption" className="block !tracking-[0.24px]">
            {location}
          </Typography>
          <Typography
            variant="caption"
            className="block !tracking-[0.24px] pt-2.5 underline text-green-darker !font-semibold"
          >
            View profile
          </Typography>
        </div>
      </div>
    </Link>
  )
}
