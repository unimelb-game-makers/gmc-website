import React from 'react';
import Image from "next/image";
import {FAQItem} from "../components/about/faqQuestion";

export const revalidate = 1800; // Revalidate every 30 minutes (in seconds)

type FAQItemProps = {
  question: string;
  answer: React.ReactNode;
};

const page = async () => {
  const faqs: FAQItemProps[] = [
    {
      question: "How can I join the game makers club?",
      answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur et lorem at enim ultrices congue. Nullam tincidunt volutpat nunc nec suscipit. Aenean fringilla leo sed sapien tincidunt, vel malesuada nulla faucibus. Maecenas et augue sed lorem fermentum sodales.Aenean fringilla leo sed sapien tincidunt, vel malesuada nulla faucibus. Maecenas et augue sed lorem fermentum sodales.",
    },
    {
      question: "How can I start making games?",
      answer:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur et lorem at enim ultrices congue. Nullam tincidunt volutpat nunc nec suscipit. Aenean fringilla leo sed sapien tincidunt, vel malesuada nulla faucibus. Maecenas et augue sed lorem fermentum sodales.Aenean fringilla leo sed sapien tincidunt, vel malesuada nulla faucibus. Maecenas et augue sed lorem fermentum sodales.",
    },
    {
      question: "Do I have to know programming to join the club",
      answer:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur et lorem at enim ultrices congue. Nullam tincidunt volutpat nunc nec suscipit. Aenean fringilla leo sed sapien tincidunt, vel malesuada nulla faucibus. Maecenas et augue sed lorem fermentum sodales.Aenean fringilla leo sed sapien tincidunt, vel malesuada nulla faucibus. Maecenas et augue sed lorem fermentum sodales.",
    },
    {
      question: "Can I join game jams as a beginner",
      answer:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur et lorem at enim ultrices congue. Nullam tincidunt volutpat nunc nec suscipit. Aenean fringilla leo sed sapien tincidunt, vel malesuada nulla faucibus. Maecenas et augue sed lorem fermentum sodales.Aenean fringilla leo sed sapien tincidunt, vel malesuada nulla faucibus. Maecenas et augue sed lorem fermentum sodales.",
    },
  ];

  return (
    <div className='pt-35 pb-15 lg:pb-25 bg-[#252525]'>
      {/* about us */}
      <section className="w-full py-12">
        <div className="mx-auto w-full max-w-6xl px-4">
          {/* Title */}
          <h1
            className="font-akira flex justify-center relative z-10 text-4xl sm:text-5xl lg:text-6xl
              font-extrabold text-white drop-shadow-teal tracking-wide leading-none-translate-y-5">
            ABOUT US
          </h1>
          {/* Content */}
          <div className="mt-8 flex flex-col gap-8 lg:flex-row lg:items-stretch">
            {/* Image */}
            <div
              className="relative w-full h-[240px] sm:h-[320px] lg:h-auto lg:w-[420px] overflow-hidden">
              <Image
                src="/images/gmc-cat.png" alt="gmc cat" fill sizes="(min-width: 1024px) 420px, 100vw" className="object-cover" priority/>
            </div>
            {/* Text Box */}
            <div className="flex flex-1 items-center bg-gmc-cream border border-neutral-300 px-6 py-6">
              <p className="text-lg sm:text-xl lg:text-2xl font-semibold leading-snug text-neutral-900">
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
      </section>

      {/* our mission */}
      <section className="w-full py-20">
        <h1 className="font-akira text-center text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white drop-shadow-teal">
          OUR MISSION
        </h1>

        <div className="mx-auto max-w-6xl px-2 flex items-start gap-8">
          {/* Large Vertical Background Text */}
          <div
            aria-hidden
            className="text-vertical-textured text-8xl">
            MISSION
          </div>

          {/* Text box */}
          <div className="flex-1 mt-10 max-w-4xl px-8 py-8">
            <ol className="list-decimal pl-6 space-y-5 text-lg sm:text-xl font-semibold leading-relaxed text-white">
              <li>To facilitate social activity & community surrounding games & game development</li>
              <li>To educate members in game development</li>
              <li>To offer opportunities to build projects and make games collaboratively</li>
              <li>To host game jams & other competitions</li>
              <li>To facilitate networking opportunities with indie game developers</li>
            </ol>
          </div>
        </div>
      </section>

      {/* what we do */}
      <section className="w-full py-14">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="font-akira text-center text-4xl sm:text-5xl font-extrabold text-white drop-shadow-teal">
            WHAT WE DO
          </h2>

          <div className="mt-12 space-y-14">
            {/* game jams */}
            <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
              {/* CONTENT */}
              <div className="flex flex-col lg:flex-row flex-1 gap-4 lg:gap-8">
                {/* mobile image */}
                <div className="lg:hidden flex items-stretch gap-4 lg:flex-1 lg:gap-8">
                  {/* IMAGE */}
                  <div className="relative flex-1 h-[220px] overflow-hidden bg-neutral-200">
                    <Image
                      src="/images/gmcc_photo.jpg"
                      alt="gmcc"
                      fill
                      className="w-full h-[220px] lg:h-full object-cover"
                    />
                  </div>
                  {/* MOBILE strip */}
                  <div className="w-6 bg-gmc-teal lg:hidden shrink-0" />
                </div>
                {/* desktop IMAGE */}
                <div className="hidden lg:block relative w-full lg:w-[260px] shrink-0 overflow-hidden bg-neutral-200">
                  <Image
                    src="/images/gmcc_photo.jpg"
                    alt="gmcc"
                    fill
                    className="w-full h-[200px] lg:h-full object-cover"
                  />
                </div>
                {/* TEXT */}
                <div className="flex-1">
                  <h3 className="text-2xl lg:text-3xl font-extrabold text-white mb-3 lg:mb-0 lg:text-right">
                    Game Jams
                  </h3>
                  <div className="bg-gmc-cream px-6 py-5 text-black">
                    <p className="text-sm sm:text-base font-semibold leading-snug">
                      We hold regular game jams once or twice each semester, where members come together to create games from scratch in a short, focused timeframe. Participants form teams, brainstorm ideas, and build playable games while learning new skills and experimenting with creative concepts. Game jams are open to all experience levels and are a fun, supportive way to collaborate, challenge yourself, and make something memorable with fellow game makers.
                    </p>
                  </div>
                </div>
              </div>
              {/* DESKTOP vertical strip */}
              <div className="hidden lg:block w-12 bg-gmc-teal shrink-0" />
            </div>

            {/* product */}
            <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
              {/* DESKTOP vertical strip */}
              <div className="hidden lg:block w-12 bg-gmc-orange-dark shrink-0" />
              {/* CONTENT */}
              <div className="flex flex-col lg:flex-row flex-1 gap-4 lg:gap-8">
                {/* mobile IMAGE */}
                <div className="lg:hidden flex items-stretch gap-4 lg:flex-1 lg:gap-8">
                  {/* MOBILE strip */}
                  <div className="w-6 bg-gmc-orange-dark lg:hidden shrink-0" />
                  {/* IMAGE */}
                  <div className="relative flex-1 h-[220px] overflow-hidden bg-neutral-200">
                    <Image
                      src="/images/pd.JPEG"
                      alt="pd"
                      fill
                      className="w-full h-[220px] lg:h-full object-cover"
                    />
                  </div>
                </div>
                {/* TEXT */}
                <div className="flex-1">
                  <h3 className="text-2xl lg:text-3xl font-extrabold text-white mb-3 lg:mb-0 lg:text-left">
                    Production Division
                  </h3>
                  <div className="bg-gmc-cream px-6 py-5 text-black">
                    <p className="text-sm sm:text-base font-semibold leading-snug">
                      Our Production Division (Stego Studios) gives students the chance to work in dedicated teams to create a game over an extended period of time. Through an application-based process, members take on roles in programming, art, design, and audio while learning how to collaborate on a long-term project. The division focuses on skill development, teamwork, and hands-on experience, providing a supportive environment for students to grow their confidence and turn ideas into a finished game.
                    </p>
                  </div>
                </div>
                {/* desktop IMAGE */}
                <div className="hidden lg:block relative lg:w-[260px] shrink-0 overflow-hidden bg-neutral-200">
                  <Image
                    src="/images/pd.JPEG"
                    alt="pd"
                    fill
                    className="w-full h-[200px] lg:h-full object-cover"
                  />
                </div>
              </div>
            </div>

            {/* education */}
            <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
              {/* CONTENT */}
              <div className="flex flex-col lg:flex-row flex-1 gap-4 lg:gap-8">
                {/* mobile image */}
                <div className="lg:hidden flex items-stretch gap-4 lg:flex-1 lg:gap-8">
                  {/* IMAGE */}
                  <div className="relative flex-1 h-[220px] overflow-hidden bg-neutral-200">
                    <Image
                      src="/images/workshops.jpg"
                      alt="cut cat picture"
                      fill
                      className="w-full h-[220px] lg:h-full object-cover"
                    />
                  </div>
                  {/* MOBILE strip */}
                  <div className="w-6 bg-gmc-teal lg:hidden shrink-0" />
                </div>
                {/* desktop IMAGE */}
                <div className="hidden lg:block relative w-full lg:w-[260px] shrink-0 overflow-hidden bg-neutral-200">
                  <Image
                    src="/images/workshops.jpg"
                    alt="cut cat picture"
                    fill
                    className="w-full h-[200px] lg:h-full object-cover"
                  />
                </div>
                {/* TEXT */}
                <div className="flex-1">
                  <h3 className="text-2xl lg:text-3xl font-extrabold text-white mb-3 lg:mb-0 lg:text-right">
                    Education
                  </h3>
                  <div className="bg-gmc-cream px-6 py-5 text-black">
                    <p className="text-sm sm:text-base font-semibold leading-snug">
                      We hold regular workshops that introduce students to the basics of making games. Our sessions cover beginner-friendly topics like getting started with game engines, simple programming concepts, and core game design ideas. Open to all experience levels, these workshops are designed to be approachable, hands-on, and a great starting point for anyone curious about how games are made.
                    </p>
                  </div>
                </div>
              </div>
              {/* DESKTOP vertical strip */}
              <div className="hidden lg:block w-12 bg-gmc-teal shrink-0" />
            </div>

            {/* social events */}
            <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
              {/* DESKTOP vertical strip */}
              <div className="hidden lg:block w-12 bg-gmc-orange-dark shrink-0" />
              {/* CONTENT */}
              <div className="flex flex-col lg:flex-row flex-1 gap-4 lg:gap-8">
                {/* mobile IMAGE */}
                <div className="lg:hidden flex items-stretch gap-4 lg:flex-1 lg:gap-8">
                  {/* MOBILE strip */}
                  <div className="w-6 bg-gmc-orange-dark lg:hidden shrink-0" />
                  {/* IMAGE */}
                  <div className="relative flex-1 h-[220px] overflow-hidden bg-neutral-200">
                    <Image
                      src="/images/social.jpg"
                      alt="cut cat picture"
                      fill
                      className="w-full h-[220px] lg:h-full object-cover"
                    />
                  </div>
                </div>
                {/* TEXT */}
                <div className="flex-1">
                  <h3 className="text-2xl lg:text-3xl font-extrabold text-white mb-3 lg:mb-0 lg:text-left">
                    Social Events
                  </h3>
                  <div className="bg-gmc-cream px-6 py-5 text-black">
                    <p className="text-sm sm:text-base font-semibold leading-snug">
                      Social Events are all about bringing people together who love games and making games. From casual hangouts and game nights to themed socials, these events create a relaxed space to meet new people, chat about games, and build connections outside of development sessions. Whether you’re a long-time member or brand new, our socials are a great way to feel part of the community.
                    </p>
                  </div>
                </div>
                {/* desktop IMAGE */}
                <div className="hidden lg:block relative w-full lg:w-[260px] shrink-0 overflow-hidden bg-neutral-200">
                  <Image
                    src="/images/social.jpg"
                    alt="cute cat picture"
                    fill
                    className="w-full h-[200px] lg:h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>



      {/* FAQ */}
      <section className="w-full pt-20">
        <h1 className="font-akira text-center text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white drop-shadow-teal">
          FAQ
        </h1>

        <div className="mx-auto max-w-6xl px-2 flex items-start gap-8">
          {/* Large Vertical Background Text */}
          <div
            aria-hidden
            className="text-vertical-textured text-8xl">
            FAQ
          </div>

          {/* FAQ Questions */}
          <div className="flex-1">
            {faqs.map((f) => (
              <FAQItem key={String(f.question)} question={f.question} answer={f.answer} />
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default page