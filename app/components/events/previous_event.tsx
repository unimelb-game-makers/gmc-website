import { Event } from '@/@types/schema.ds'
import React from 'react'
import dayjs from 'dayjs';

const PreviousEvent = ({event, setEvent}: {event: Event, setEvent: (event:Event) => void}) => {
    const date = dayjs(event.date.start).format("DD MMMM")

    return (
        <div className='rounded-full bg-white m-1'>
            <button onClick={() => setEvent(event)} className='w-full'>
                <div className='text-black p-2 px-5 flex justify-between items-center w-full'>
                    <p className='text-left'>{event.name}</p>
                    <p className='text-right whitespace-nowrap'>{date}</p>
                </div>
            </button>
        </div>
    )
}

export default PreviousEvent