import { Event } from '@/@types/schema.ds'
import React from 'react'
import dayjs from 'dayjs'
import LoadingImage from '../shared/loading_image'
import Image from 'next/image'

const EventInfo = ({ event, onClose }: { event: Event, onClose: () => void }) => {
  const eventTime = dayjs(event.date.start).format("h:mm A, MMMM D")

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center text-black  '>
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div
        className="relative bg-gmc-cream rounded-lg shadow-xl p-5 max-w-xl w-full mx-4 z-10 flex flex-col"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <h1 className='text-2xl font-bold shrink-0'>{event.name}</h1>
        <div className="flex flex-col sm:flex-row gap-4 mt-2 flex-1 min-h-0">
          {/* Image */}
          <div className="relative w-3/5 mx-auto sm:mx-0 sm:w-1/2 shrink-0 aspect-4/5 bg-gray-400 rounded-md overflow-hidden self-start">
            {event.thumbnail ? (
              <LoadingImage
                src={event.thumbnail}
                alt="Event Banner"
                width={400}
                height={500}
                spinnerSize="w-8 h-8"
                className="object-cover w-full h-full"
              />
            ) : null}
          </div>
          {/* Right: description + meta */}
          <div className="flex flex-col flex-1 min-h-0">
            <div className="overflow-y-auto">
              <p>{event.description}</p>
            </div>
            <div className="flex items-start mt-2 shrink-0">
              <Image className="mr-1.25 shrink-0" src="/Mappin.svg" alt="map pin logo" width={24} height={24} />
              <p>{event.location ? event.location : 'TBA'}</p>
            </div>
            <div className="flex mt-1 shrink-0">
              <Image className="mr-1.25 shrink-0" src="/Clock.svg" alt="clock logo" width={24} height={24} />
              <p>{eventTime != "00:00 AM" ? eventTime : "TBD"}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EventInfo