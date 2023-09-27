import React from 'react'
import { mock } from './mock'
import { Content } from './Content'
import { ProfileCardProps } from '@/components/ProfileCard/ProfileCard'
import { SectionHeading } from '@/components'

export interface ContentProps {
  title: string
  description: string
  profileCards: ProfileCardProps[]
  bottomContent: string
}

async function getData() {
  return mock as ContentProps
}

const WorkWithUsPage = async () => {
  const data: ContentProps = await getData()

  return (
    <div className="page-wrapper flex flex-col gap-6 p-1 md:p-16 md:pt-8">
      <div className="w-[880px] max-w-full m-auto max-lg:px-8 pb-28">
        <SectionHeading title={data.title} caption={data.description} />
        <Content {...data} />
      </div>
    </div>
  )
}

export default WorkWithUsPage