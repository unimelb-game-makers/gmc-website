import { Event } from '@/@types/schema.ds'
import React from 'react'
import dayjs from 'dayjs';

const PreviousEvent = ({event, setEvent}: {event: Event, setEvent: (event:Event) => void}) => {
    const date = dayjs(event.date.start).format("DD MMMM")

    return (
        <div className='rounded-2xl bg-gmc-cream m-1 h-12 flex items-center'>
            <button onClick={() => setEvent(event)} className='w-full h-full'>
                <div className='text-black p-2 px-5 flex justify-between items-center w-full h-full'>
                    <p className='text-left font-tasa-orbiter font-bold'>{event.name}</p>
                    <p className='text-right whitespace-nowrap font-tasa-orbiter font-bold'>{date}</p>
                </div>
            </button>
        </div>
    )
}

export default PreviousEvent