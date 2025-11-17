import { Event } from '@/@types/schema.ds'
import React from 'react'
import Image from 'next/image'
import dayjs from 'dayjs'

const UpcomingEvent = ({event}: {event: Event}) => {
    const eventTime = dayjs(event.date.start).format("h:mm A, MMMM D")
    const eventDescription = event.description? (event.description.length < 35 ? event.description : event.description.slice(0, 90) + "...") : "..."
    return (
        <div className="w-64 rounded-2xl bg-gray-200 p-4 shadow-lg border border-gray-300 text-black">
        {/* Title */}
        <h2 className="text-center text-xl font-semibold mb-3">{event.name}</h2>

        {/* Banner Image */}
        <div className="w-full h-32 bg-gray-400 rounded-md overflow-hidden">
            <Image
            src={event.thumbnail} // replace with your image
            alt="Event Banner"
            width={300}
            height={200}
            className="object-cover w-full h-full"
            />
        </div>

        {/* Description */}
        <p className="text-sm text-gray-700 mt-3">
            {eventDescription}
        </p>

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
    )
}

export default UpcomingEvent