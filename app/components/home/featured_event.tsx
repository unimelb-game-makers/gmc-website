import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Date } from '@/@types/schema.ds'
import dayjs from 'dayjs'

interface EventContainerProps {
  name: string,
  description: string,
  id: string,
  date: Date,
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
  const dt = dayjs(date.start)
  const eventDate = dt.format('DD-MM-YYYY');
  const eventTime = dt.format('HH:mm A');
  return (
    <div className={`flex flex-col items-center justify-center m-[30px] ${id === '0' ? 'mr-[160px]' : ''}`}>
      <div className="flex flex-col items-center justify-center mb-[25px]">
        <h1 className='text-2xl font-bold text-[#4FA0CF] text-center'>{eventDate}</h1>
        <img className="mr-[5px]" src="/Arrow.svg" alt="arrow logo" />
      </div>
      <div className="flex flex-col items-center justify-center">
        <Image src="/shapes/upTriangle.png" alt="Description" width={205} height={24}/>
        <div className="bg-[#F7F6F3] text-black p-[22px] -mt-[2px] mx-auto rounded-lg shadow-sm overflow-hidden max-w-sm w-[217px] h-[355px] pt-2">
          <div className='h-12 text-center'>
            <h1 className='font-bold text-black text-center text-[clamp(0.2rem,1.5vw,1.0rem)]'>{name}</h1>
          </div>
          <div className="relative w-full h-48">
            <Image src={thumbnail || "/gmc_logo.png"} alt={name} width={200} height={200} className="object-cover" />
          </div>
          <div className="flex items-start h-18">
            <img className="mr-[5px]" src="/Mappin.svg" alt="map pin logo" />
            {/* some location in the database is too long */}
            {/* <p>{location ? location.split('\n')[0] : 'TBA'}</p> */}
            <p>{location ? (location.length < 35 ? location : location.slice(0, 35) + "...") : 'TBA'}</p>
          </div>
          <div className="flex">
            <img className="mr-[5px]" src="/Clock.svg" alt="clock logo" />
            <p>{eventTime != "00:00 AM" ? eventTime : "TBD"}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FeaturedEventContainer