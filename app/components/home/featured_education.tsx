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
    <Link href={`/education/${slug}`}>
      <div className="w-[273px] h-[372px] bg-[#F7F6F3] rounded-sm overflow-hidden flex items-center flex-col max-w-sm hover:bg-[#dadce1] active:bg-[#ffffff] pt-[24px]" id={id}>
        <div className="relative w-[225px] h-[225px]">
          <Image src={thumbnail || "/gmc_logo.png"} alt={name} fill className="object-cover rounded-sm" />
        </div>
        <div className="p-4 text-[25px] w-[192px]">
          <h2 className="text-lg text-center font-bold font-karla text-shadow-black">{name}</h2>
        </div>
      </div>
    </Link>
  )
}

export default FeaturedEducationContainer