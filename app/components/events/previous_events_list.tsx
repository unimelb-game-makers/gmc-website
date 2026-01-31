import { Event } from '@/@types/schema.ds'
import React from 'react'
import PreviousEvent from './previous_event'
import dayjs from 'dayjs';

const PreviousEventList = ({events, setEvent}: {events: Event[], setEvent: (event:Event) => void}) => {
    // Get years from events
    const years = [...new Set(events.map(item => dayjs(item.date.start, "DD-MM-YYYY").year()))];
    return (
        <div>
            {years.map((year) => (
                <div key={year}>
                    <h1 className='text-3xl font-bold mt-5 font-akira mr-3 text-right' key={year}>{year}</h1>
                     {events.map((event) => {
                        if (dayjs(event.date.start, "DD-MM-YYYY").year() == year) {
                            return <PreviousEvent key={event.id} event={event} setEvent={setEvent}/>
                        }
                    })}
                </div>
            ))}
        </div>
    )
}

export default PreviousEventList