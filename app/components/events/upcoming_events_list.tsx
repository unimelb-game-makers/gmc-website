import { Event } from '@/@types/schema.ds'
import React from 'react'
import UpcomingEvent from './upcoming_event'

const UpcomingEventsList = ({events}: {events: Event[]}) => {

  return (
    <div className='flex flex-wrap gap-2 mt-3'>
      {events.map((event) => (
        <UpcomingEvent event={event} key={event.id}/>
      ))}
    </div>
  )
}

export default UpcomingEventsList