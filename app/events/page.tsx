import React from 'react'
import EventsSwitch from '../components/events/events_switch'
import NotionEvents from '@/services/notion-events';

const page = async () => {
  const notion = new NotionEvents();
  const events = await notion.getEvents();

  return (
    <div>
      <div className='m-5'>
        <h1 className='text-7xl font-bold'>Events</h1>
        <EventsSwitch events={events}/>
        <div>
          <h1 className='text-5xl font-bold'>Regular Events</h1>
        </div>
      </div>
    </div>
  )
}

export default page