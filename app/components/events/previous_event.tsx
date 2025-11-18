import { Event } from '@/@types/schema.ds'
import React from 'react'
import dayjs from 'dayjs';

const PreviousEvent = ({event}: {event: Event}) => {
    const date = dayjs(event.date.start).format("DD MMMM")

    return (
        <a href="/">
            <div className='rounded-full bg-white text-black p-2 px-5 m-1 flex justify-between'>
                <p>{event.name}</p>
                <p>{date}</p>
            </div> 
        </a>
    )
}

export default PreviousEvent