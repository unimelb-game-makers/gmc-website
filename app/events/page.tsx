import React from 'react'
import EventsSwitch from '../components/events/events_switch'
import NotionEvents from '@/services/notion-events';
import Image from 'next/image';

export const revalidate = 1800; // Revalidate every 30 minutes (in seconds)

const page = async () => {
  const notion = new NotionEvents();
  const events = await notion.getEvents();

  return (
    <div>
      <div className='m-5'>
        <h1 className='text-7xl font-bold font-akira drop-shadow-teal text-center'>Events</h1>

        <EventsSwitch events={events}/>
        <div className='mt-20 flex'>
          <h1 className='text-vertical-textured text-8xl'>Regular</h1>
          <div className='w-full'>
            {/* Maker Lab Desc */}
            <div className='flex justify-center flex-1'>
              <div className="w-max-1280 h-max bg-gray-400 overflow-hidden justify-center">
                <Image
                src={"/images/maker_lab_photo.jpg"}
                alt="Maker Labs"
                width={300}
                height={200}
                className="object-cover w-full h-full"
                />
              </div>
              <div className='ml-20'>
                <h1 className='drop-shadow-teal text-5xl font-akira'>MAKER LABS</h1>
                <div className='mt-10 bg-gmc-cream max-w-3xl p-4'>
                  <p className='text-black font-tasa-orbiter font-bold text-2xl'>Our Weekly Maker Labs are casual meetups where members chat about games and game development, share what they’re working on, and learn from each other. 
                    Open to all skill levels, it’s the perfect place to connect, get feedback, and stay inspired.</p>
                </div>
              </div>
            </div>

            <div className='flex justify-center flex-1 mt-20'>
              <div className=''>
                <h1 className='drop-shadow-orange text-5xl font-akira'>GAME JAMS</h1>
                <div className='mt-10 bg-gmc-cream max-w-3xl p-4'>
                  <p className='text-black font-tasa-orbiter font-bold text-2xl'>Game Jams are our high-energy events held once or twice each semester, where members team up to design and build games from scratch over a short period of time. They’re a great chance to experiment, collaborate, and turn creative ideas into playable games—no matter your experience level.</p>
                </div>
              </div>

              <div className="w-max-1280 h-max bg-gray-400 overflow-hidden justify-center ml-20">
                <Image
                src={"/images/gmcc_photo.jpg"}
                alt="Maker Labs"
                width={300}
                height={200}
                className="object-cover w-full h-full"
                />
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default page