import { Event } from '@/@types/schema.ds'
import Image from 'next/image'
import React from 'react'
import dayjs from 'dayjs'

const EventInfo = ({event, onClose}: {event: Event, onClose: ()=>void}) => {
  const eventTime = dayjs(event.date.start).format("h:mm A, MMMM D")
  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center text-black  '>
      <div className="absolute inset-0 bg-black/50" onClick={onClose}/>
      <div
        className="relative bg-white rounded-lg shadow-xl p-5 max-w-xl w-full mx-4 z-10"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <h1 className='text-2xl font-bold'>{event.name}</h1>
        <div className="w-full h-48 rounded-md overflow-hidden mt-1">
            <Image
            src={event.thumbnail? event.thumbnail : "/images/wires.png"} // replace with your image
            alt="Event Banner"
            width={300}
            height={200}
            className="object-cover w-full h-full"
            />
        </div>
        <p>{event.description}</p>
        {/* Location */}
        <div className="flex items-start h-8 mt-5">
            <Image className="mr-[5px]" src="/Mappin.svg" alt="map pin logo" width={24} height={24}/>
            {/* some location in the database is too long */}
            {/* <p>{location ? location.split('\n')[0] : 'TBA'}</p> */}
            <p>{event.location ? (event.location.length < 35 ? event.location : event.location.slice(0, 35) + "...") : 'TBA'}</p>
        </div>
        {/* Time */}
        <div className="flex">
            <Image className="mr-[5px]" src="/Clock.svg" alt="clock logo" width={24} height={24}/>
            <p>{eventTime != "00:00 AM" ? eventTime : "TBD"}</p>
        </div>
      </div>
    </div>
  )
}

export default EventInfo