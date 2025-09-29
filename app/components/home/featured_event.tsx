import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

interface EventContainerProps {
  name: string,
  description: string,
  id: string,
  date: string,
  location: string,
  thumbnail: string,
}

const FeaturedEventContainer = ({
  name,
  description,
  id,
  date,
  location,
  thumbnail
}: EventContainerProps) => {
  return (
    <div className={`flex flex-col items-center justify-center m-[30px] ${id === '0' ? 'mr-[160px]' : ''}`}>
      <div className="flex flex-col items-center justify-center mb-[25px]">
        <h1 className='text-2xl font-bold text-[#4FA0CF] text-center'>{date?.match(/^[0-9\-]*/)?.[0] ?? 'TBA'}</h1>
        <img className="mr-[5px]" src="/Arrow.svg" alt="arrow logo" />
      </div>
      <div className="flex flex-col items-center justify-center">
        <Image src="/shapes/upTriangle.png" alt="Description" width={205} height={24}/>
        <div className="bg-[#F7F6F3] text-black p-[22px] -mt-[2px] mx-auto rounded-lg shadow-sm overflow-hidden flex flex-col max-w-sm w-[217px] h-[346px]">
          <h1 className='font-bold text-black text-center'>{name}</h1>
          <div className="relative w-full h-48">
            <Image src={thumbnail || "/gmc_logo.png"} alt={name} fill className="object-cover" />
          </div>
          <div className="flex items-start">
            <img className="mr-[5px]" src="/Mappin.svg" alt="map pin logo" />
            {/* some location in the database is too long */}
            <p>{location ? location.split('\n')[0] : 'TBA'}</p>
          </div>
          <div className="flex">
            <img className="mr-[5px]" src="/Clock.svg" alt="clock logo" />
            <p>{date?.match(/^[0-9\-]*/)?.[0] ?? 'TBA'}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FeaturedEventContainer