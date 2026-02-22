import { Event } from '@/@types/schema.ds'
import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import dayjs from 'dayjs'
import { BiLoaderAlt } from 'react-icons/bi'

const UpcomingEvent = ({ event, setEvent }: { event: Event, setEvent: (event: Event) => void }) => {
    const eventTime = dayjs(event.date.start).format("h:mm A, MMMM D")
    const eventDescription = event.description ? (event.description.length < 35 ? event.description : event.description.slice(0, 90) + "...") : "..."
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(true);
    }, [event.thumbnail]);

    return (
        <div className="w-64 rounded-2xl bg-gmc-cream p-4 text-black">
            <button onClick={() => { setEvent(event) }}>
                {/* Title */}
                <h2 className="h-12 text-center text-xl font-semibold mb-3">{event.name}</h2>

                {/* Banner Image */}
                <div className="relative w-56 h-32 bg-gray-400 rounded-md overflow-hidden justify-center flex items-center">
                    {isLoading && event.thumbnail && (
                        <div className="absolute inset-0 flex items-center justify-center bg-black/5 z-10 text-gmc-teal">
                            <BiLoaderAlt className="w-6 h-6 animate-spin" />
                        </div>
                    )}
                    {event.thumbnail ? (
                        <Image
                            src={event.thumbnail}
                            alt="Event Banner"
                            width={300}
                            height={200}
                            unoptimized
                            onLoad={() => setIsLoading(false)}
                            className={`object-cover w-full h-full transition-opacity duration-200 ${isLoading ? 'opacity-0' : 'opacity-100'}`}
                        />
                    ) : null}
                </div>

                {/* Description */}
                <p className="text-sm text-gray-700 mt-3">
                    {eventDescription}
                </p>

                {/* Location */}
                <div className="flex items-start h-8 mt-5">
                    <Image className="mr-[5px]" src="/Mappin.svg" alt="map pin logo" width={24} height={24} />
                    {/* some location in the database is too long */}
                    {/* <p>{location ? location.split('\n')[0] : 'TBA'}</p> */}
                    <p>{event.location ? (event.location.length < 20 ? event.location : event.location.slice(0, 20) + "...") : 'TBA'}</p>
                </div>
                {/* Time */}
                <div className="flex">
                    <Image className="mr-[5px]" src="/Clock.svg" alt="clock logo" width={24} height={24} />
                    <p>{eventTime != "00:00 AM" ? eventTime : "TBD"}</p>
                </div>
            </button>
        </div>
    )
}

export default UpcomingEvent