'use client';
import React from 'react'
import { useState } from 'react';
import UpcomingEventsList from './upcoming_events_list';
import PreviousEventList from './previous_events_list';
import EventInfo from './event_info';
import { Event } from '@/@types/schema.ds';
import dayjs from 'dayjs';

import { FaHourglass } from 'react-icons/fa';

const EventsSwitch = ({events}: {events: Event[]}) => {
    const [eventList, setEventList] = useState(true);
    const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

    const date = dayjs();
    const upcomingEvents = events.filter(event => dayjs(event.date.end).isAfter(date));
    const previousEvents = events.filter(event => dayjs(event.date.end).isBefore(date));
    return (
        <div className='m-2'>
            {/* Mobile layout: centered column */}
            <div className='flex flex-col items-center sm:hidden gap-3'>
                {/* Upcoming/Previous text */}
                <div className="relative overflow-hidden">
                    <h1 className={`text-vertical-textured text-3xl transition-transform duration-300 ease-in-out ${eventList ? 'translate-x-0' : '-translate-x-[120%]'}`}
                        style={{ writingMode: 'horizontal-tb', transform: 'none' }}>
                        Upcoming
                    </h1>
                    <h1 className={`text-vertical-textured text-3xl transition-transform duration-300 ease-in-out absolute top-0 left-0 ${!eventList ? 'translate-x-0' : 'translate-x-[120%]'}`}
                        style={{ writingMode: 'horizontal-tb', transform: 'none' }}>
                        Previous
                    </h1>
                </div>

                {/* Switch button + orange bar */}
                <div className='flex items-center gap-2'>
                    <button className='relative flex w-20 h-10' onClick={()=> {setEventList(!eventList)}}>
                        <div className='absolute inset-0 flex'>
                            <div className='w-10 h-10 bg-white' />
                            <div className='w-10 h-10 bg-white' />
                        </div>
                        <div className={`absolute w-10 h-10 bg-gmc-orange-dark flex items-center justify-center transition-transform duration-300 ease-in-out ${eventList ? 'translate-x-0' : 'translate-x-10'}`}>
                            <FaHourglass className='text-xl text-white' />
                        </div>
                    </button>
                    <div className="w-40 h-10 bg-gmc-orange" />
                </div>

                {/* Event list */}
                <div className='px-4 h-200 overflow-y-auto w-full gmc-scrollbar'>
                    {eventList ? <UpcomingEventsList events={upcomingEvents} setEvent={setSelectedEvent}/> : <PreviousEventList events={previousEvents} setEvent={setSelectedEvent}/>}
                </div>
            </div>

            {/* Desktop layout: side by side */}
            <div className='hidden sm:flex items-start'>
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
                        <div className='absolute inset-0 flex'>
                            <div className='w-10 h-10 bg-white' />
                            <div className='w-10 h-10 bg-white' />
                        </div>
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