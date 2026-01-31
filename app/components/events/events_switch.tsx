'use client';
import React from 'react'
import { useState } from 'react';
import UpcomingEventsList from './upcoming_events_list';
import PreviousEventList from './previous_events_list';
import EventInfo from './event_info';
import { Event } from '@/@types/schema.ds';
import dayjs from 'dayjs';

import { FaHourglass, FaHourglassHalf } from 'react-icons/fa';

const EventsSwitch = ({events}: {events: Event[]}) => {
    const [eventList, setEventList] = useState(true);
    const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

    const date = dayjs();
    const upcomingEvents = events.filter(event => dayjs(event.date.start).isAfter(date));
    const previousEvents = events.filter(event => dayjs(event.date.start).isBefore(date));
    return (
        <div className='m-2'>
            <div className='flex items-start'>
                <div className="relative overflow-hidden">
                    <h1 className={`text-vertical-textured text-8xl transition-transform duration-300 ease-in-out ${eventList ? 'translate-y-0' : '-translate-y-[120%]'}`}>
                        Upcoming
                    </h1>
                    <h1 className={`text-vertical-textured text-8xl transition-transform duration-300 ease-in-out absolute top-0 left-0 ${!eventList ? 'translate-y-0' : 'translate-y-[120%]'}`}>
                        Previous
                    </h1>
                </div>
                <div className='ml-4'>
                    <button className='relative flex w-20 h-10' onClick={()=> {setEventList(!eventList)}}>
                        {/* Background track */}
                        <div className='absolute inset-0 flex'>
                            <div className='w-10 h-10 bg-white' />
                            <div className='w-10 h-10 bg-white' />
                        </div>
                        {/* Sliding indicator */}
                        <div className={`absolute w-10 h-10 bg-gmc-orange-dark flex items-center justify-center transition-transform duration-300 ease-in-out ${eventList ? 'translate-x-0' : 'translate-x-10'}`}>
                            <FaHourglass className='text-xl text-white' />
                        </div>
                    </button>
                    <div className="w-20 h-100 bg-gmc-orange mt-8" />
                </div>
                
                <div className='h-200 overflow-y-auto ml-10 mr-10 flex-1 gmc-scrollbar'>
                    {eventList ? <UpcomingEventsList events={upcomingEvents} setEvent={setSelectedEvent}/> : <PreviousEventList events={previousEvents} setEvent={setSelectedEvent}/>}
                </div>

            </div>
            {selectedEvent ? <EventInfo event={selectedEvent} onClose={()=>{setSelectedEvent(null)}}/> : <></>}
        </div>
    )
}

export default EventsSwitch