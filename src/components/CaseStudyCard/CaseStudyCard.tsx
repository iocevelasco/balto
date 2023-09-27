import React from 'react'
import { Typography, Button } from '@/components'
import Image from 'next/image'
import Link from 'next/link'

export type CaseStudyCardProps = {
  id: number
  title: string
  caption: string
  src: string
  alt: string
}

export default function CaseStudyCard({
  title,
  caption,
  src,
  alt,
  id,
}: CaseStudyCardProps) {
  return (
    <div className="flex gap-4 p-6 bg-white rounded-lg shadow-lg hover:bg-gray-100">
      <Image
        src={src}
        width={107}
        height={107}
        alt={alt}
        loading="lazy"
        className="w-[150px] h-[150px] object-cover rounded-lg bg-slate-200"
      />
      <div className="flex h-full flex-col justify-between gap-4 flex-2">
        <Typography
          variant="subtitle1"
          className="subtitle text-ellipsis whitespace-wrap max-h-[5rem] line-clamp-2"
        >
          {title}
        </Typography>
        <p className="caption text-black text-ellipsis whitespace-wrap max-h-[8rem] line-clamp-4">
          {caption}
        </p>
        <Link href={`/case/${id}`}>
          <Button variant="contained" className="w-[12.5rem]">
            READ CASE STUDY
          </Button>
        </Link>
      </div>
    </div>
  )
}
