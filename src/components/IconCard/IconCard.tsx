'use client'

import Image, { StaticImageData } from 'next/image'
import React from 'react'

interface Props {
  image: string | StaticImageData
  alt: string
  text: string
  className?: string
  onClick?: () => void
  selected?: boolean
}

export const IconCard: React.FC<Props> = ({
  image,
  alt,
  text,
  className,
  onClick,
  selected,
}) => {
  return (
    <div
      className={`px-10 py-6 rounded-lg shadow-lg border-2 hover:shadow-2xl ${
        selected ? 'border-green-darker' : 'border-gray-pale'
      }  flex 
      flex-col items-center justify-center w-[250px] max-w-full text-center cursor-pointer ${className}`}
      onClick={onClick}
    >
      <div className="text-green-darker">
        <Image src={image} width={32} height={32} alt={alt} />
      </div>
      <div className="pt-3.5 text-gray-mid uppercase font-bold">{text}</div>
    </div>
  )
}
