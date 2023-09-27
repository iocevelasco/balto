import React from 'react'
import {
  SectionHeading,
  BackToTopButton,
  ScrollableParagraph,
} from '@/components'
import { ReactComponent as StaffAugmentationImage } from '@/assets/Images/StaffAugmentationImage.svg'
async function getDetailPost() {
  const res = import('./data.json')
  return res
}

export default async function PageStaffAugmentationServices() {
  const data = await getDetailPost()

  return (
    <div className="page-wrapper">
      <div className="flex flex-col gap-6 p-1 md:p-16 md:pt-16">
        <div className=" flex flex-col gap-6 justify-center max-w-[48rem] m-auto">
          <div className="flex gap-6 pt-16">
            <SectionHeading title={data.title} caption={data.captions} />
            <StaffAugmentationImage width="120rem" height="15rem" />
          </div>
          <div className="flex flex-col gap-6 justify-center max-w-[48rem] m-auto">
            <ScrollableParagraph content={data.content} />
          </div>
          <BackToTopButton label="BACK TO TOP"></BackToTopButton>
        </div>
      </div>
    </div>
  )
}
