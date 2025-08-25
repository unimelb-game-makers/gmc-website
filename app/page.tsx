'use client';
import Image from "next/image";
import Header from "./components/header";
import Footer from "./components/footer";
import Navbar from "./components/navbar";
import FeaturedEventContainer from "./components/featured_event";
import { useState } from "react";

import NotionEvents from "@/services/notion-events";

const slides = [
  '/images/cat.jpg',
  '/images/chess.jpg',
  '/images/console.jpg',
];

export default async function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const totalSlides = slides.length;
  console.log(totalSlides);

  const prevSlide = () => setCurrentSlide((currentSlide - 1) % totalSlides);
  const nextSlide = () => setCurrentSlide((currentSlide + 1) % totalSlides);

  const service = new NotionEvents;
  const events = (await service.getEvents()).slice(0, 3);

  return (
    <div>
      {/* Carousel and Club Logo */}
      <div className="flex w-full h-[700px] overflow-hidden shadow-md">
        <div className="relative flex-1 bg-black">
          <Image src={slides[currentSlide]} alt={`Slide ${currentSlide + 1}`} fill className="object-cover"/>
            <button
                onClick={prevSlide}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-white text-3xl"
              >
                <h1 className="text-6xl">‹</h1>
              </button>
              <button
                onClick={nextSlide}
                className="absolute right-170 top-1/2 -translate-y-1/2 text-white text-3xl"
              ><h1 className="text-6xl">›</h1></button>
            </div>
            <div className="absolute right-30 top-2/5 -translate-y-1/2 w-128 h-120 bg-blue-900 rounded-xl p-4 shadow-lg z-20 ">
              <div className="flex flex-col items-center">
                <Image
                  src="/gmc_logo.png"
                  alt="Club Logo"
                  width={300}
                  height={300}
                  className="mb-3"
                />
              <h2 className="text-center font-semibold text-sm mb-3">
                UniMelb Game Makers' Club
              </h2>
              <a href="https://umsu.unimelb.edu.au/buddy-up/clubs/clubs-listing/join/9180/" className=" w-full bg-white border rounded p-2 hover:bg-gray-100">
                <button className="hover:bg-gray-100 font-bold text-black w-full">Sign up!</button>
              </a>
          </div>
          <div>
            
          </div>
        </div>
      </div>
      {/* Navbar */}
      <Navbar />
      {/* About */}
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
      {/* Events Section */}
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
    </div>
    
  );
}