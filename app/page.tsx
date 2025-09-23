import Image from "next/image";
import Header from "./components/header";
import Footer from "./components/footer";
import Navbar from "./components/navbar";
import FeaturedEventContainer from "./components/home/featured_event";
import FeaturedEducationContainer from "./components/home/featured_education";
import { useState,useEffect} from "react";
import { Event } from '../@types/schema.ds';
import { EducationTag, EducationWorkshopPost, EducationPostPage } from "@/@types/schema.ds";
import ImageCarousel from "./components/home/image_carousel";

import NotionEvents from "@/services/notion-events";
import NotionEducation from "@/services/notion-education";

export default async function Home() {

  const slides = [
    '/images/cat.jpg',
    '/images/chess.jpg',
    '/images/console.jpg',
  ];

  const eventsservice = new NotionEvents;
  const eventsData = await eventsservice.getEvents();
  const events = eventsData.slice(0, 3); // store first 3 events

  // the following reads education data once database is properly connected
  // const eduservice = new NotionEducation;
  // const educationData = await eduservice.getPublishedWorkshopPosts();
  // const educations = educationData.slice(0, 4);

  // before back end is ready, the following sample data is used
  const educations: EducationWorkshopPost[] = [
  {
    id: "workshop-001",
    title: "Introduction to Artificial Intelligence",
    slug: "introduction-to-artificial-intelligence",
    author: "Jane Doe",
    thumbnail: "/images/chess.jpg",
    tags: [
      { id: "tag-001", name: "AI", color: "blue" },
      { id: "tag-002", name: "Beginner", color: "green" }
    ],
    date: "2025-09-10T10:00:00Z"
  },
  {
    id: "workshop-002",
    title: "Mastering the Notion API",
    slug: "mastering-the-notion-api",
    author: "John Smith",
    thumbnail: "/images/chess.jpg",
    tags: [
      { id: "tag-003", name: "API", color: "purple" },
      { id: "tag-004", name: "Productivity", color: "yellow" }
    ],
    date: "2025-08-22T14:00:00Z"
  },
  {
    id: "workshop-003",
    title: "Data Visualization with D3.js",
    slug: "data-visualization-with-d3",
    author: "Alice Johnson",
    thumbnail: "/images/chess.jpg",
    tags: [
      { id: "tag-005", name: "Data Viz", color: "red" },
      { id: "tag-006", name: "JavaScript", color: "orange" }
    ],
    date: "2025-07-15T09:30:00Z"
  },
  {
    id: "workshop-004",
    title: "Design Thinking for Developers",
    slug: "design-thinking-for-developers",
    author: "Mark Lee",
    thumbnail: "/images/chess.jpg",
    tags: [
      { id: "tag-007", name: "Design", color: "pink" },
      { id: "tag-008", name: "UX", color: "gray" }
    ],
    date: "2025-06-12T16:00:00Z"
  }
];

  
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
      <div className="relative h-[637px] bg-[#161828]">
        <h1 className="text-white text-[32px] p-[31px] font-karla">Upcoming Events</h1>
        <div className="w-6/7 h-1 bg-[#F7F6F3] mx-auto rounded mt-[100px]"></div>
        <div className="max-w-6xl mx-auto flex p-4 -mt-[110px]">
          {
            events.map((event, index) => (
                <FeaturedEventContainer key={event.id} name={event.name} date={event.date.start} description={event.description} id={String(index)} location={event.location} thumbnail={event.thumbnail}/>
              ))
          }
        </div>
      </div>
     
      {/* about */}      
      <div className="flex flex-col lg:flex-row gap-[41px] items-start px-[31px] py-[72px] lg:h-[589px] bg-[#161828] ">
        <div className="relative lg:w-[390px] lg:h-[446px]">
          <Image src={slides[0]} alt="placeholder" fill className="object-cover"/>
        </div>
        
        <div className="lg:w-[740px] h-[450px] flex flex-col justify-center space-y-4">
          <h2 className="bold text-[36px] mb-4 text-white font-karla">About Game Maker Club</h2>
          <p className="text-white bold text-[24px] lg:max-w-[732px] w-full self-end font-karla">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur et
            lorem at enim ultrices congue. Nullam tincidunt volutpat nunc nec
            suscipit. Aenean fringilla leo sed sapien tincidunt, vel malesuada nulla
            faucibus. Maecenas et augue sed lorem fermentum sodales.Aenean fringilla 
            leo sed sapien tincidunt, vel malesuada nulla faucibus. Maecenas et augue 
            sed lorem fermentum sodales.
          </p>
            <button className="w-[187px] h-[66px] bg-[#4FA0CF] px-4 py-2 rounded hover:bg-[#266b94] text-[#F7F6F3] self-center font-karla">
              About Us →
            </button>
        </div>
      </div>
      {/* education */}
      <div className="h-[611px] bg-[#161828] relative">
        <h1 className="text-white text-[32px] pt-[33px] pl-[33px] pb-0 font-karla">Learn How To Make Games</h1>
        <div className="flex gap-4 justify-between p-4 pt-[31px]">
          {
            educations.map((education, index) => (
                <FeaturedEducationContainer key={education.id} name = {education.title} id={String(index)}  thumbnail={education.thumbnail} slug={education.slug}/>
              ))
          }
        </div>
        <div className = "flex items-center justify-center flex-col pt-[20px]">
          <button className="w-[187px] h-[66px] bg-[#4FA0CF] px-4 py-2 rounded hover:bg-[#266b94] text-[#F7F6F3] self-center font-karla">
            Learn More →
          </button>
        </div>
      </div>
      <Footer />      
    </div>
    
  );
}