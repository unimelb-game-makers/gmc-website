'use client';
import Image from "next/image";
import Header from "./components/header";
import Footer from "./components/footer";
import Navbar from "./components/navbar";
import FeaturedEventContainer from "./components/featured_event";
import { useState,useEffect} from "react";
import { Event } from '../@types/schema.ds';

import NotionEvents from "@/services/notion-events";

const slides = [
  '/images/cat.jpg',
  '/images/chess.jpg',
  '/images/console.jpg',
];



export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const totalSlides = slides.length;

  const prevSlide = () => setCurrentSlide((currentSlide - 1 + totalSlides) % totalSlides);
  const nextSlide = () => setCurrentSlide((currentSlide + 1) % totalSlides);

  const service = new NotionEvents;
  const [events, setEvents] = useState<Event[]>([]);
  useEffect(() => {
    async function fetchEvents() {
      const service = new NotionEvents();
      const eventsData = await service.getEvents();
      setEvents(eventsData.slice(0, 3)); // store first 3 events
    }
    fetchEvents();
  }, []);

  return (
    <div>
      <Header />
      {/* sign up page */}
      <div className="flex w-full h-[603px] overflow-hidden shadow-md">
        <div className="relative flex-1">
          <Image src={slides[currentSlide]} alt={`Slide ${currentSlide + 1}`} fill className="object-cover"/>
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-[#F7F6F3] text-3xl">
            <h1 className="text-6xl hover:text-[#d4d4d3] active:text-[#fdfdfd]">‹</h1>
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white text-3xl">
            <h1 className="text-6xl hover:text-[#d4d4d3] active:text-[#fdfdfd]">›</h1>
          </button>
          <a href="https://umsu.unimelb.edu.au/buddy-up/clubs/clubs-listing/join/9180/" className="absolute p-3 bg-[#2C2C2C] border rounded hover:bg-[#0e1112] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <button className="text-[#F7F6F3] flex items-center justify-center">Join Now →</button>
          </a>
        </div>
      </div>
      {/* upcomming event */}
      {/*
      <div className="m-20">
        <h1 className="text-5xl font-bold ml-50 m-5">Upcoming Events</h1>
        <div className="max-w-6xl mx-auto flex gap-4 justify-between p-4">
          {
            events.map((event, index) => (
                <FeaturedEventContainer name={event.name} date="test" description={event.description} id={String(index)} location={event.location} thumbnail={event.thumbnail}/>
              ))
          }
        </div>
      </div>
      */}
      {/* about */}
      <div className="p-6 max-w-4xl mx-auto mt-10 bg-blue-900">
        <h2 className="text-xl font-semibold mb-4 text-white">Who are we?</h2>
        <p className="mb-6 text-white">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur et
          lorem at enim ultrices congue. Nullam tincidunt volutpat nunc nec
          suscipit. Aenean fringilla leo sed sapien tincidunt, vel malesuada nulla
          faucibus. Maecenas et augue sed lorem fermentum sodales.
        </p>
        <div className="flex flex-wrap gap-4">
          <button className="border border-gray-500 px-4 py-2 rounded hover:bg-blue-950">
            Sign up
          </button>
          <button className="border border-gray-500 px-4 py-2 rounded hover:bg-blue-950">
            Join the Discord
          </button>
          <button className="border border-gray-500 px-4 py-2 rounded hover:bg-blue-950">
            Follow our socials
          </button>
        </div>
      </div>
      {/* education */}
      <Footer />      
    </div>
    
  );
}