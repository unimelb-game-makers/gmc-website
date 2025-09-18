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
    <div className="bg-blue-900 text-white px-3 m-2 w-full mx-auto rounded-lg shadow-sm overflow-hidden flex flex-col max-w-sm">
      <div>

      </div>
      <h1 className='text-2xl font-bold text-white'>{name}</h1>

      <div className="relative w-full h-48">
        <Image src={thumbnail ?? null} alt={name} fill className="object-cover" />
      </div>
      <div className="p-4 flex flex-col justify-between flex-grow">
        {/* <p className='text-xl text-white mb-4'>{date.start}</p> */}
        <p className="text-sm text-white mb-4">{description}</p>
        <Link
          href={"/home"}
          className="mt-auto inline-block text-center border border-gray-800 rounded-full px-4 py-2 text-sm hover:bg-blue-950"
        >
          Go to event page
        </Link>
      </div>
    </div>
  )
}

export default FeaturedEventContainer