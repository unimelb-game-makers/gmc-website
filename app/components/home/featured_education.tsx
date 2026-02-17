import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

interface EducationContainerProps {
  name: string,
  id: string,
  thumbnail: string,
  slug: string,
}

const FeaturedEducationContainer = ({
  name,
  id,
  thumbnail,
  slug
}: EducationContainerProps) => {
  return (
    <Link href={`/education/${slug}`} className="block">
      <div
        className="
          bg-gmc-cream rounded-sm overflow-hidden
          hover:bg-[#dadce1] active:bg-[#ffffff]
          flex flex-row sm:flex-col
          items-center
          w-full
          sm:w-[273px]
          lg:w-[300px]      /* slightly wider */
          h-auto
          sm:h-[372px]
          lg:h-[400px]      /* slightly taller */
          p-4 sm:pt-[24px]
          gap-4
          shrink-0
        "
        id={id}
      >
        {/* IMAGE */}
        <div
          className="
            relative
            w-[96px] h-[96px]
            sm:w-[225px] sm:h-[225px]
            lg:w-[240px] lg:h-[240px]   /* small bump only */
            shrink-0
          "
        >
          <Image
            src={thumbnail || "/gmc_logo.png"}
            alt={name}
            fill
            className="object-cover rounded-sm"
          />
        </div>

        {/* TITLE */}
        <div
          className="
            text-left sm:text-center
            w-full
            sm:w-[192px]
            lg:w-[210px]
          "
        >
          <h2
            className="
              text-base
              sm:text-lg
              lg:text-[19px]    /* very slight increase */
              font-bold font-karla
              text-shadow-black
              leading-snug
            "
          >
            {name}
          </h2>
        </div>
      </div>
    </Link>

  )
}

export default FeaturedEducationContainer