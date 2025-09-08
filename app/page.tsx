import Image from "next/image";
import Header from "./components/header";
import Footer from "./components/footer";
import Navbar from "./components/navbar";
import FeaturedEventContainer from "./components/featured_event";
import { useState,useEffect} from "react";
import { Event } from '../@types/schema.ds';
import ImageCarousel from "./components/home/image_carousel";

import NotionEvents from "@/services/notion-events";

export default async function Home() {

  const slides = [
    '/images/cat.jpg',
    '/images/chess.jpg',
    '/images/console.jpg',
  ];

  const service = new NotionEvents;
  const eventsData = await service.getEvents();
  const events = eventsData.slice(0, 3); // store first 3 events
  // const [events, setEvents] = useState<Event[]>([]);
  // useEffect(() => {
  //   async function fetchEvents() {
  //     const service = new NotionEvents();
  //     const eventsData = await service.getEvents();
      
  //   }
  //   fetchEvents();
  // }, []);

  return (
    <div>
      <Header />
      {/* sign up page */}
      <div className="flex w-full h-[603px] overflow-hidden shadow-md">
        <ImageCarousel />
      </div>
      {/* upcomming event */}
      <div className="h-[637px] bg-[#1A2223]">

      </div>
      
      <div className="m-20">
        <h1 className="text-5xl font-bold ml-50 m-5">Upcoming Events</h1>
        <div className="max-w-6xl mx-auto flex gap-4 justify-between p-4">
          {
            events.map((event, index) => (
                <FeaturedEventContainer key={event.id} name={event.name} date="test" description={event.description} id={String(index)} location={event.location} thumbnail={event.thumbnail}/>
              ))
          }
        </div>
      </div>
     
      {/* about */}      
      <div className="flex flex-col lg:flex-row gap-[41px] items-start px-[31px] py-[72px] lg:h-[589px] bg-[#1A2223] ">
        <div className="relative lg:w-[390px] lg:h-[446px]">
          <Image src={slides[0]} alt="placeholder" fill className="object-cover"/>
        </div>
        
        <div className="lg:w-[740px] h-[450px] flex flex-col justify-center space-y-4">
          <h2 className="bold text-[36px] mb-4 text-white">About Game Maker Club</h2>
          <p className="text-white bold text-[24px] lg:max-w-[732px] w-full self-end">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur et
            lorem at enim ultrices congue. Nullam tincidunt volutpat nunc nec
            suscipit. Aenean fringilla leo sed sapien tincidunt, vel malesuada nulla
            faucibus. Maecenas et augue sed lorem fermentum sodales.Aenean fringilla 
            leo sed sapien tincidunt, vel malesuada nulla faucibus. Maecenas et augue 
            sed lorem fermentum sodales.
          </p>
            <button className="w-[187px] h-[66px] bg-[#4FA0CF] px-4 py-2 rounded hover:bg-[#266b94] text-[#F7F6F3] self-center">
              About Us →
            </button>
        </div>
      </div>
      {/* education */}
      <div className="h-[611px] bg-[#1A2223]">

      </div>
      <Footer />      
    </div>
    
  );
}