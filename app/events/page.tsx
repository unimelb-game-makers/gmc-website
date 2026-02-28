import React, { Suspense } from 'react'
import EventsSwitch from '../components/events/events_switch'
import NotionEvents from '@/services/notion-events';
import Image from 'next/image';
import PageLoading from '../components/shared/page_loading';

export const revalidate = 1800; // Revalidate every 30 minutes (in seconds)

async function EventsContent() {
  const notion = new NotionEvents();
  const events = await notion.getEvents();

  return (
    <>
      <EventsSwitch events={events} />
      <div className='mt-20 flex'>
        <h1 className='hidden sm:block text-vertical-textured text-8xl'>Regular</h1>
        <div className='w-full'>
          {/* Maker Lab Desc */}
          <div className="flex flex-col sm:flex-row justify-center flex-1 gap-6 sm:gap-0">
            <div className="w-full sm:w-max h-max bg-gray-400 overflow-hidden">
              <Image
                src={"/images/maker_lab_photo.jpg"}
                alt="Maker Labs"
                width={300}
                height={200}
                className="object-cover w-full h-full"
              />
            </div>
            <div className="sm:ml-20">
              <h1 className="drop-shadow-teal text-4xl sm:text-5xl font-akira">MAKER MEETUPS</h1>
              <div className="mt-4 sm:mt-10 bg-gmc-cream max-w-3xl p-4">
                <p className="text-black font-tasa-orbiter font-bold text-lg sm:text-2xl">Our Weekly Maker Meetups are casual get-togethers where members chat about games and game development, share what they&apos;re working on, and learn from each other. Open to all skill levels, it&apos;s the perfect place to connect, get feedback, and stay inspired.</p>
              </div>
            </div>
          </div>

          <div className="flex flex-col-reverse sm:flex-row justify-center flex-1 mt-10 sm:mt-20 gap-6 sm:gap-0">
            <div>
              <h1 className="drop-shadow-orange text-4xl sm:text-5xl font-akira">GAME JAMS</h1>
              <div className="mt-4 sm:mt-10 bg-gmc-cream max-w-3xl p-4">
                <p className="text-black font-tasa-orbiter font-bold text-lg sm:text-2xl">Game Jams are our high-energy events held once or twice each semester, where members team up to design and build games from scratch over a short period of time. They&apos;re a great chance to experiment, collaborate, and turn creative ideas into playable games &mdash; no matter your experience level.</p>
              </div>
            </div>

            <div className="w-full sm:w-max h-max bg-gray-400 overflow-hidden sm:ml-20">
              <Image
                src={"/images/gmcc_photo.jpg"}
                alt="Game Jams"
                width={300}
                height={200}
                className="object-cover w-full h-full"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}



export default function EventsPage() {
  return (
    <div className='py-35'>
      <div className='m-5'>
        <h1
          className="font-akira flex justify-center relative z-10 text-4xl sm:text-5xl lg:text-6xl
              font-extrabold text-white drop-shadow-teal tracking-wide leading-none-translate-y-5">
          EVENTS
        </h1>
        <Suspense fallback={<PageLoading message="Loading Events..." />}>
          <EventsContent />
        </Suspense>
      </div>
    </div>
  )
}