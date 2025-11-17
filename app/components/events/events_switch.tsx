'use client';
import React from 'react'
import { useState } from 'react';
import UpcomingEventsList from './upcoming_events_list';
import { Event } from '@/@types/schema.ds';
import dayjs from 'dayjs';

const EventsSwitch = ({events}: {events: Event[]}) => {
    const [eventList, setEventList] = useState(true);
    const date = dayjs();
    console.log(date);
    const upcomingEvents = events.filter(event => dayjs(event.date.start).isAfter(date));
    const previousEvents = events.filter(event => dayjs(event.date.start).isBefore(date));
    return (
        <div className='m-2'>
            <div className="bg-[#D9D9D9] rounded-lg p-1 inline-flex">
                <button
                onClick={() => setEventList(true)}
                className={`px-4 py-2 rounded-md transition-transform duration-100 ease-out transform hover:scale-105 hover:-translate-y-0.5 cursor-pointer text-lg font-bold
                    ${eventList === true 
                    ? "bg-blue-900 text-white" 
                    : "text-gray-700"
                    }`}
                >
                Upcoming
                </button>

                <button
                onClick={() => setEventList(false)}
                className={`px-4 py-2 rounded-md transition-transform duration-100 ease-out transform hover:scale-105 hover:-translate-y-0.5 cursor-pointer text-lg font-bold
                    ${eventList === false
                    ? "bg-blue-900 text-white" 
                    : "text-gray-700"
                    }`}
                >
                Previous
                </button>
            </div>

            <div>
                <UpcomingEventsList events={upcomingEvents}/>
            </div>
        </div>
    )
}

export default EventsSwitch