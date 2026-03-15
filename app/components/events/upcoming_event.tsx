import { Event } from '@/@types/schema.ds'
import React from 'react'
import dayjs from 'dayjs'
import LoadingImage from '../shared/loading_image'

const UpcomingEvent = ({ event, setEvent }: { event: Event, setEvent: (event: Event) => void }) => {
    const eventTime = dayjs(event.date.start).format("h:mm A, MMMM D")
    const eventDescription = event.description ? (event.description.length < 35 ? event.description : event.description.slice(0, 90) + "...") : "..."
    const now = dayjs()
    const isOngoing = now.isAfter(dayjs(event.date.start)) && event.date.end && now.isBefore(dayjs(event.date.end))

    return (
        <div className={`w-64 rounded-2xl p-4 text-black ${isOngoing ? 'bg-gmc-orange' : 'bg-gmc-cream'}`}>
            <button onClick={() => { setEvent(event) }}>
                {/* Title */}
                <h2 className="h-12 text-center text-xl font-semibold mb-3">{event.name}</h2>

                {/* Banner Image */}
                <div className="relative w-56 h-32 bg-gray-400 rounded-md overflow-hidden flex items-center justify-center">
                    {event.thumbnail ? (
                        <LoadingImage
                            src={event.thumbnail}
                            alt="Event Banner"
                            width={300}
                            height={200}
                            className="object-cover w-full h-full"
                        />
                    ) : null}
                </div>

                {/* Description */}
                <p className="text-sm text-gray-700 mt-3">
                    {eventDescription}
                </p>

                {/* Location */}
                <div className="flex items-start h-8 mt-5">
                    <img className="mr-[5px]" src="/Mappin.svg" alt="map pin logo" width={24} height={24} />
                    <p>{event.location ? (event.location.length < 20 ? event.location : event.location.slice(0, 20) + "...") : 'TBA'}</p>
                </div>
                {/* Time */}
                <div className="flex">
                    <img className="mr-[5px]" src="/Clock.svg" alt="clock logo" width={24} height={24} />
                    <p>{eventTime != "00:00 AM" ? eventTime : "TBD"}</p>
                </div>
            </button>
        </div>
    )
}

export default UpcomingEvent