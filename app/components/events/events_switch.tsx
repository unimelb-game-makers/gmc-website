'use client';
import React from 'react'
import { useState } from 'react';
import UpcomingEventsList from './upcoming_events_list';
import PreviousEventList from './previous_events_list';
import EventInfo from './event_info';
import { Event } from '@/@types/schema.ds';
import dayjs from 'dayjs';

const EventsSwitch = ({events}: {events: Event[]}) => {
    const [eventList, setEventList] = useState(true);
    const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

    const date = dayjs();
    const upcomingEvents = events.filter(event => dayjs(event.date.start).isAfter(date));
    const previousEvents = events.filter(event => dayjs(event.date.start).isBefore(date));
    return (
        <div className='m-2'>
            <div className='flex items-start'>
                <h1 className="text-vertical-textured text-6xl">
                    Upcoming
                </h1>
                <div className='ml-4'>
                    <button className='flex' onClick={()=> {setEventList(!eventList)}}>
                    <div className={`w-10 h-10 ${eventList ? 'bg-gmc-orange-dark' : 'bg-white'}`} />
                    <div className={`w-10 h-10 ${eventList ? 'bg-white' : 'bg-gmc-orange-dark'}`} />
                    </button>
                    <div className="w-20 h-100 bg-gmc-orange mt-8" />
                </div>
                
                <div className='h-200 overflow-y-auto ml-10 mr-10 flex-1'>
                    {eventList ? <UpcomingEventsList events={upcomingEvents} setEvent={setSelectedEvent}/> : <PreviousEventList events={previousEvents} setEvent={setSelectedEvent}/>}
                </div>

            </div>
            {selectedEvent ? <EventInfo event={selectedEvent} onClose={()=>{setSelectedEvent(null)}}/> : <></>}
        </div>
    )
}

export default EventsSwitch