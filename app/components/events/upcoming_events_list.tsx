import { Event } from '@/@types/schema.ds'
import React from 'react'
import UpcomingEvent from './upcoming_event'

const UpcomingEventsList = ({events, setEvent}: {events: Event[], setEvent: (event: Event) => void}) => {

  return (
    <div className='flex flex-wrap gap-2 mt-3'>
      {events.map((event) => (
        <UpcomingEvent event={event} setEvent={setEvent} key={event.id}/>
      ))}
    </div>
  )
}

export default UpcomingEventsList