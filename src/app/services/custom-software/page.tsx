import React from 'react'
import {
  SectionHeading,
  CaseStudyCard,
  BackToTopButton,
  ScrollableParagraph,
} from '@/components'
const image = 'https://i.imgur.com/2mtkCcY.jpg'

async function getDetailPost() {
  const res = import('./data.json')
  return res
}

export default async function CustomServicesPage() {
  const data = await getDetailPost()

  return (
    <div className="page-wrapper">
      <div className="flex flex-col gap-6 p-1 md:p-16 md:pt-8">
        <div className="flex flex-col gap-6 justify-center max-w-[48rem] m-auto">
          <SectionHeading title={data.title} caption={data.captions} />
          <CaseStudyCard
            src={image}
            alt="imge"
            id={1}
            title="CASE STUDY TITLE"
            caption="Custom Software Application for Processing Mortgage Loan Applications"
          />
          <div className="flex flex-col gap-6 justify-center max-w-[48rem] m-auto">
            <ScrollableParagraph content={data.content} />
          </div>
          <BackToTopButton label="BACK TO TOP"></BackToTopButton>
        </div>
      </div>
    </div>
  )
}
