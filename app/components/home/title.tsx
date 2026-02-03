import React from 'react'

type SectionTitleProps = {
  fronttext: string
  backtext: string
}

export function SectionTitle({
  fronttext, backtext
}: SectionTitleProps) {
  return (
    <div className="relative pt-12 pb-3 text-center">
      {/* Back: vertical texture */}
      <div aria-hidden className="absolute inset-0 flex items-center justify-center leading-none
                                    pointer-events-none z-0">
        <div
            className="whitespace-nowrap
                    text-7xl sm:text-8xl lg:text-9xl
                    opacity-50 font-extrabold tracking-wide
                    text-vertical-textured
                    rotate-90 origin-center">
            {backtext}
        </div>
      </div>

      {/* Front: main text + shadow */}
      <h1
        className="relative z-10
                   text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white drop-shadow-teal
                   tracking-wide leading-none translate-y-[-20px]">
        {fronttext}
      </h1>
    </div>
  )
}
