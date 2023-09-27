import React from 'react'
import Image from 'next/image'
import { Typography } from '@mui/material'

export type FeatureBannerProps = {
  height?: number
  width?: number
  title: string
  caption: string
  src: string
  alt: string
}

export default function FeatureBanner({
  height,
  width,
  title,
  caption,
  src,
  alt,
}: FeatureBannerProps) {
  return (
    <div className="min-h-[20rem] flex flex-col p-8 relative justify-end bg-white">
      <div className="relative z-10">
        <Typography variant="subtitle1" className="z-10 text-green-primary">
          {title}
        </Typography>
        <Typography variant="h3" className="z-10 text-white">
          {caption}
        </Typography>
      </div>
      <Image
        src={src}
        width={width}
        height={height}
        alt={alt}
        fill
        loading="lazy"
        style={{
          objectFit: 'cover',
        }}
      />
      <div className="bg-overlay-gradient-dark absolute z-0 bottom-0 left-0 right-0 top-0" />
    </div>
  )
}
