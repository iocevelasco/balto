import React from 'react'
import mock from './mock.json'
import { icons } from '@/helpers/constans/Icons'
import { Content } from './Content'

export type ContentProps = {
  title: string
  description: string
  iconCards: {
    icon: keyof typeof icons
    text: string
  }[]
}

async function getData() {
  return mock as ContentProps
}

export default async function WorkWithUsPage() {
  const data: ContentProps = await getData()

  return (
    <div className="lg:h-screen max-lg:mt-32 flex items-center">
      <div className="w-[815px] max-w-full m-auto max-lg:px-8">
        <h1 className="text-gray-mid font-normal">{data.title}</h1>
        <p className="my-8 text-gray-dark font-semibold text-base p-5 bg-gray-pale rounded-md">
          {data.description}
        </p>
        <Content {...data} />
      </div>
    </div>
  )
}