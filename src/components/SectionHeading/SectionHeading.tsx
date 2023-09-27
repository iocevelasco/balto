import { Typography } from '@mui/material'
import React from 'react'

export type SectionHeadingProps = {
  title: string
  subtitle?: string
  caption?: string
}

export default function SectionHeading({
  title,
  subtitle,
  caption,
}: SectionHeadingProps) {
  return (
    <div className="flex flex-col gap-6 justify-center max-w-[780p] pb-10 ">
      <div className="flex flex-col gap-6 justify-center">
        <Typography variant="h1" className="text-gray-mid light-heading">
          {title}
        </Typography>
        {subtitle && (
          <Typography
            className="mt-8 text-gray-mid font-normal text-base"
            variant="caption"
          >
            {subtitle}
          </Typography>
        )}

        {caption && (
          <Typography
            className="text-gray-mid !font-normal !text-base"
            variant="caption"
          >
            {caption}
          </Typography>
        )}
      </div>
    </div>
  )
}
