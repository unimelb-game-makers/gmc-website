import React from 'react'
import EventsSwitch from '../components/events/events_switch'
import NotionEvents from '@/services/notion-events';
import Image from 'next/image';
import { Client } from "@notionhq/client";

export const revalidate = 1800; // Revalidate every 30 minutes (in seconds)

const page = async () => {
  const notion = new NotionEvents();
  const events = await notion.getEvents();
  console.log(events);

  return (
    <div>
      <div className='m-5'>
        <h1 className='text-7xl font-bold'>Events</h1>
        <EventsSwitch events={events}/>
        <div>
          <h1 className='text-5xl font-bold mt-5'>Regular Events</h1>

          <h1 className='text-4xl font-bold my-10'>Weekly Maker Lab</h1>
          <div className='bg-gray-300 rounded-2xl p-10 mx-10 max-w-[1400px] flex flex-col md:flex-row justify-between text-black'>
            <p className='text-2xl'>Regular meetings every week, where we get together to discuss all aspects of creating games.</p>
            <Image src={"/images/cat.jpg"} alt={"makerlab"} width={400} height={300} className='rounded-2xl md:ml-6 mt-6 md:mt-0'/>
          </div>

          <h1 className='text-4xl font-bold m-10 mt-20 text-right'>Regular Game Jams</h1>
          <div className='bg-gray-300 rounded-2xl p-10 mx-10 max-w-[1400px] flex flex-col md:flex-row justify-between text-black ml-auto'>
            <Image src={"/images/cat.jpg"} alt={"makerlab"} width={400} height={300} className='rounded-2xl md:mr-6 mt-6 md:mt-0 md:order-first order-last'/>
            <p className='text-2xl md:ml-10'>Bi-Semesterly game jams where people can compete to earn prizes, or just for the fun of the game.</p>
          </div>
          
        </div>
      </div>
    </div>
  )
}

export default page