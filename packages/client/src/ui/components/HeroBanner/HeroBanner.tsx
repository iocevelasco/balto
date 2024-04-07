import React from 'react'

interface HeroBannerProps {
  headline: string
  subheadline: string
  backgroundImage: string
}

const HeroBanner = (props: HeroBannerProps) => {
  return (
    <div
      className="relative bg-cover bg-center h-96"
      style={{ backgroundImage: `url(${props.backgroundImage})` }}
    >
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl text-white font-bold mb-4">{props.headline}</h1>
          <p className="text-lg text-white">{props.subheadline}</p>
        </div>
      </div>
    </div>
  )
}

export { HeroBanner }
export type { HeroBannerProps }
