import React from 'react'
import { Typography, Button } from '@/components'
import { ReactComponent as CalendarIcon } from '@/assets/Icons/Blog/Calendar.svg'
import { ReactComponent as FeatherIcon } from '@/assets/Icons/Blog/Feather.svg'
import colors from '@/components/ThemeRegistry/theme/colors.json'
import Image from 'next/image'
import Link from 'next/link'

export type BlogPostProps = {
  id: number
  title: string
  description: string
  src: string
  alt: string
  date: string
  author: string
}

export default function BlogPost({
  title,
  description,
  src,
  alt,
  id,
  date,
  author,
}: BlogPostProps) {
  return (
    <div className="flex gap-4 p-6 bg-white rounded-lg shadow-lg hover:bg-gray-100 h-[310px]">
      <Image
        src={src}
        width={466}
        height={250}
        alt={alt}
        loading="lazy"
        style={{
          objectFit: 'cover',
          borderRadius: '0.5rem',
          backgroundColor: 'gray',
        }}
      />
      <div className="flex h-full flex-col justify-between">
        <Typography
          variant="subtitle1"
          className="subtitle text-ellipsis whitespace-wrap max-h-[5rem] line-clamp-2"
        >
          {title}
        </Typography>
        <p className="caption text-black text-ellipsis whitespace-wrap max-h-[8rem] line-clamp-4">
          {description}
        </p>
        <div className="flex justify-between align-middle">
          <div className="flex gap-1 align-middle">
            <CalendarIcon width={20} height={20} fill={colors['gray-mid']} />
            <p className="caption text-black">{date}</p>
          </div>
          <div className="flex gap-1 align-middle">
            <FeatherIcon width={20} height={20} fill={colors['gray-mid']} />
            <p className="caption text-black">{author}</p>
          </div>
        </div>
        <Link href={`/blog/${id}`}>
          <Button variant="contained" className="w-[10rem]">
            Click me
          </Button>
        </Link>
      </div>
    </div>
  )
}
