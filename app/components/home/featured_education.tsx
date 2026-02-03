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
    className="bg-gmc-cream rounded-sm overflow-hidden hover:bg-[#dadce1] active:bg-[#ffffff] flex flex-row sm:flex-col
      items-center w-full sm:w-[273px] h-auto sm:h-[372px] p-4 sm:pt-[24px] gap-4"
    id={id}
  >
    {/* IMAGE */}
    <div
      className="relative w-[96px] h-[96px] sm:w-[225px] sm:h-[225px] shrink-0"
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
      className="text-left sm:text-center w-full sm:w-[192px]"
    >
      <h2
        className="text-base sm:text-lg font-bold font-karla text-shadow-black leading-snug"
      >
        {name}
      </h2>
    </div>
  </div>
</Link>
  )
}

export default FeaturedEducationContainer