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
      <div className="w-[273px] h-[372px] bg-[#F7F6F3] rounded-sm overflow-hidden flex items-center justify-center flex-col max-w-sm hover:bg-[#dadce1] active:bg-[#ffffff]">
        <div className="relative w-[225px] h-[225px] top-[19px]">
          <Image src={thumbnail || "/gmc_logo.png"} alt={name} fill className="object-cover rounded-sm" />
        </div>
        <div className="relative p-4 text-[25px] w-[192px] top-[10px]">
          <h2 className="text-lg text-center font-bold font-karla">{name}</h2>
        </div>
      </div>
    </Link>
  )
}

export default FeaturedEducationContainer