import { Typography } from '@/components'
import React from 'react'
import Image from 'next/image'

async function getDetailPost() {
  const res = import('./data.json')
  return res
}

export default async function PostDetail() {
  const data = await getDetailPost()

  return (
    <div className="page-wrapper">
      <div className="flex flex-col gap-6 justify-center p-1 md:p-16">
        <div className="flex flex-col gap-6 justify-center max-w-[61rem] m-auto">
          <Typography variant="h1">{data.title}</Typography>
          <Typography variant="subtitle1" className="text-gray-dark">
            {data.subtitle}
          </Typography>
          <div className="relative w-full h-[13.5rem]">
            <Image
              src={data.src}
              fill
              alt="header image"
              loading="lazy"
              className="object-cover rounded-lg bg-slate-200"
            />
          </div>
          <div className="flex flex-col gap-6">
            {data.content.map((item, index) => (
              <Typography
                className="text-justify"
                key={index}
                variant="caption"
              >
                {item}
              </Typography>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
