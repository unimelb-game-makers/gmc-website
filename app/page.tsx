import Link from "next/link";

import FeaturedEducationContainer from "./components/home/featured_education";
import { SectionTitle } from "./components/home/title";
import EventsSection from "./components/home/event_section";

import HeroBanner from "./components/home/hero_banner";

import NotionEvents from "@/services/notion-events";
import NotionEducation from "@/services/notion-education";

export const revalidate = 1800; // Revalidate every 30 minutes (in seconds)

export default async function Home() {

  const eventsservice = new NotionEvents;
  const eventsData = await eventsservice.getEvents();
  
  const eduservice = new NotionEducation;
  const educationData = await eduservice.getPublishedWorkshopPosts();
  const educations = educationData.slice(0, 3);

  return (
    <div>
      {/* sign up page */}
      <HeroBanner />
     
      {/* about */}
      <div className="relative bg-[#161616] pt-30 pb-15">
        <SectionTitle fronttext="ABOUT US" backtext="ABOUT"/>
        <section className="w-full py-15">
          <div className="mx-auto w-full lg:w-[75%] px-4">
            {/* relative wrapper for layering */}
            <div className="relative">
              {/* back strip */}
              <div
                aria-hidden
                className="absolute left-40 top-35 h-24 lg:w-[420px] z-0 bg-black"/>
              {/* foreground content */}
              <div className="relative z-10 mx-auto w-fit flex items-stretch">
                {/* left image */}
                <div className="w-44 flex-shrink-0">
                  <img src="/gmc_logo_image.png" alt="" className="lg:h-full lg:w-full object-cover"/>
                </div>
                {/* right text box */}
                <div className="max-w-full bg-gmc-cream border border-neutral-300 px-3 lg:px-8 lg:py-6">
                  <p className="text-lg font-semibold leading-snug text-neutral-900">
                    The University of Melbourne Game Makers Club is a student-led community 
                    for anyone interested in creating games. We bring together programmers, 
                    artists, designers, and storytellers to collaborate, learn, and build 
                    games in a welcoming, hands-on environment. From game jams and workshops 
                    to talks and socials, we help members of all skill levels turn ideas 
                    into playable experiences.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        <Link href="/about/" className = "flex justify-center">
              <button className="mt-8 px-15 py-3 font-bold font-arsenica text-4xl rounded-tr-xl rounded-bl-xl 
              bg-gmc-orange-dark hover:bg-gmc-orange text-white">
                About Us →
              </button>
            </Link>
      </div>

      {/* upcomming event */}
      <div className="relative bg-[#161616] pt-15 pb-15">
        <SectionTitle fronttext="UPCOMING EVENTS" backtext="EVENTS"/>
        <section className="w-full py-0">
          <EventsSection
        eventsData={eventsData}/>
        </section>
      </div>

      {/* education */}
      <div className="relative bg-[#161616] pt-15 pb-15">
        <SectionTitle fronttext="LEARN HOW TO MAKE GAMES" backtext="EDUCATION" />
        {/* MOBILE */}
        <div className="sm:hidden pl-11 pr-8.5 pt-10 pb-10">
          <div className="grid grid-cols-[45px_1fr]">
            {/* LEFT STRIP spanning both rows */}
            <div className="bg-gmc-teal-light" />
            {/* RIGHT side content stacked (events then button) */}
            <div className="flex flex-col">
              {/* Events vertically */}
              <div className="flex flex-col gap-6 p-4 pt-[31px] text-black">
                {educations.map((education, index) => (
                  <FeaturedEducationContainer key={education.id} name={education.title} id={String(index)} thumbnail={education.thumbnail} slug={education.slug}/>
                ))}
              </div>

              {/* Button row */}
              <div className="flex justify-center p-4 pt-0">
                <Link href="/education/">
                  <button
                    className="mt-4 px-5 py-3 font-bold font-arsenica text-xl rounded-tr-xl rounded-bl-xl
                      bg-gmc-orange-dark hover:bg-gmc-orange text-white">
                    Learn More →
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* DESKTOP */}
        <div className="hidden sm:block pl-15 pr-15 pt-10 pb-10">
          <div className="flex">
            {/* LEFT: cards + button stacked */}
            <div className="flex-1 w-[60%]">
              {/* Events horizontally scrollable */}
              <div className="flex justify-center">
                <div className="flex justify-center flex-nowrap gap-8 p-5 pt-[31px] w-full overflow-x-auto min-w-0 text-black">
                  {educations.map((education, index) => (
                    <FeaturedEducationContainer key={education.id} name={education.title} id={String(index)} thumbnail={education.thumbnail} slug={education.slug} />
                  ))}
                </div>
              </div>

              {/* Button centered */}
              <Link href="/education/" className="flex justify-center">
                <button
                  className="mt-8 px-15 py-3 font-bold font-arsenica text-4xl rounded-tr-xl rounded-bl-xl bg-gmc-orange-dark hover:bg-gmc-orange  text-white">
                  Learn More →
                </button>
              </Link>
            </div>

            {/* RIGHT STRIP */}
            <div className="w-[56px] bg-gmc-teal-light" />
          </div>
        </div>
      </div>

    </div>
    
  );
}