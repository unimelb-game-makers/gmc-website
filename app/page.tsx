import Image from "next/image";
import Link from "next/link";

import FeaturedEventContainer from "./components/home/featured_event";
import FeaturedEducationContainer from "./components/home/featured_education";

import HeroBanner from "./components/home/hero_banner";

import NotionEvents from "@/services/notion-events";
import NotionEducation from "@/services/notion-education";
import dayjs from "dayjs";

export const revalidate = 1800; // Revalidate every 30 minutes (in seconds)

export default async function Home() {

  const slides = [
    '/images/cat.jpg',
    '/images/chess.jpg',
    '/images/console.jpg',
  ];

  const eventsservice = new NotionEvents;
  const eventsData = await eventsservice.getEvents();
  const events = eventsData.slice(0, 3).reverse(); // store first 3 events
  // remove events which are past already
  const upcomingEvents = events.filter(event => 
    dayjs(event.date.start).isAfter(dayjs())
  )
  
  const eduservice = new NotionEducation;
  const educationData = await eduservice.getPublishedWorkshopPosts();
  const educations = educationData.slice(0, 4);

  return (
    <div>
      {/* sign up page */}
      <HeroBanner />
      {/* upcomming event */}
      <div className="relative h-[637px]">
        <h1 className="text-white text-[32px] p-[31px] font-karla">Upcoming Events</h1>
        <div className="w-6/7 h-1 bg-[#F7F6F3] mx-auto rounded mt-[50px]"></div>
        <div className="max-w-6xl mx-auto flex p-4 -mt-[110px]">
          {
            upcomingEvents.map((event, index) => (
                <FeaturedEventContainer key={event.id} name={event.name} date={event.date} description={event.description} id={String(index)} location={event.location} thumbnail={event.thumbnail}/>
              ))
          }
        </div>
      </div>
     
      {/* about */}      
      <div className="flex flex-col lg:flex-row gap-[41px] items-start px-[31px] pt-[20px]">
        <div className="relative lg:w-[390px] lg:h-[446px]">
          <Image src={slides[0]} alt="placeholder" fill className="object-cover"/>
        </div>
        
        <div className="lg:w-[740px] flex flex-col justify-center space-y-4">
          <h2 className="bold text-[36px] mb-4 text-white font-karla">About Game Maker Club</h2>
          <p className="text-white bold text-[24px] lg:max-w-[732px] w-full self-end font-karla">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur et
            lorem at enim ultrices congue. Nullam tincidunt volutpat nunc nec
            suscipit. Aenean fringilla leo sed sapien tincidunt, vel malesuada nulla
            faucibus. Maecenas et augue sed lorem fermentum sodales.Aenean fringilla 
            leo sed sapien tincidunt, vel malesuada nulla faucibus. Maecenas et augue 
            sed lorem fermentum sodales.
          </p>
          <Link href="/education/" className = "self-center pb-[30px]">
            <button className="w-[187px] h-[66px] bg-[#4FA0CF] px-4 py-2 rounded hover:bg-[#266b94] text-[#F7F6F3] font-karla">
              About Us →
            </button>
          </Link>
        </div>
      </div>
      {/* education */}
      <div className="relative p-[15px]">
        <h1 className="text-white text-[32px] pt-[33px] pl-[33px] pb-0 font-karla">Learn How To Make Games</h1>
        <div className="flex gap-6 p-4 pt-[31px] overflow-x-auto text-black">
          {
            educations.map((education, index) => (
                <FeaturedEducationContainer key={education.id} name = {education.title} id={String(index)}  thumbnail={education.thumbnail} slug={education.slug}/>
              ))
          }
        </div>
        <div className = "flex items-center justify-center flex-col pt-[20px] pb-[20px]">
          <Link href="/education/">
            <button className="w-[187px] h-[66px] bg-[#4FA0CF] px-4 py-2 rounded hover:bg-[#266b94] text-[#F7F6F3] self-center font-karla">
              Learn More →
            </button>
          </Link>
        </div>
      </div> 
    </div>
    
  );
}