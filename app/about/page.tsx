import React from 'react'
import PhotoWall from "../components/about/photowall";
import {DotPoint} from "../components/about/dotpoint";
import {FeatureCard} from "../components/about/card";
import {FAQItem} from "../components/about/faqQuestion";

export const revalidate = 1800; // Revalidate every 30 minutes (in seconds)

type CardProps = {
  title: string;
  imageSrc: string;
  description: string;
  href: string;
};
type FAQItemProps = {
  question: string;
  answer: React.ReactNode;
};

const page = async () => {
    const cards: CardProps[] = [
    {
      title: "Game Jams",
      imageSrc: "/images/cat.jpg",
      description: "Build a game in a weekend with a team and a theme.",
      href: "/events",
    },
    {
      title: "Education",
      imageSrc: "/images/cat.jpg",
      description: "Learn Unity, Godot, art, and design through hands-on sessions.",
      href: "/education",
    },
    {
      title: "Social Events",
      imageSrc: "/images/cat.jpg",
      description: "Event Description Words here lorem ipsum text here etc",
      href: "/events",
    },
  ];

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
    <div className='py-35 bg-[#252525]'>
      {/* about us */}
      <section className="w-full py-12">
        <div className="mx-auto w-full max-w-6xl px-4">
          {/* Title */}
          <h1
            className="flex justify-center relative z-10 text-4xl sm:text-5xl lg:text-6xl
              font-extrabold text-white drop-shadow-teal tracking-wide leading-none-translate-y-5">
            ABOUT US
          </h1>
          {/* Content */}
          <div className="mt-8 flex flex-col gap-8 lg:flex-row lg:items-stretch">
            {/* Image */}
            <div
              className="relative w-auto h-[240px] sm:h-[320px] lg:h-full lg:w-[420px] overflow-hidden">
              <img
                src="gmc-cat.png" alt="Section image" className="h-full w-full object-cover"/>
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
      <section className="relative w-full py-20 overflow-hidden">
        <div className="mx-auto max-w-6xl px-4 relative z-10">
          {/* Title */}
           <h1 className="text-center text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white drop-shadow-teal">
            OUR MISSION
          </h1>
          {/* Text box */}
          <div className="mt-10 mx-auto max-w-4xl px-8 py-8">
            <ol className="list-decimal pl-6 space-y-5 text-lg sm:text-xl font-semibold leading-relaxed text-white">
              <li>To facilitate social activity & community surrounding games & game development</li>
              <li>To educate members in game development</li>
              <li>To offer opportunities to build projects and make games collaboratively</li>
              <li>To host game jams & other competitions</li>
              <li>To facilitate networking opportunities with indie game developers</li>
            </ol>
          </div>
        </div>
        {/* Large Vertical Background Text */}
        <div
          aria-hidden
          className="hidden lg:flex absolute left-0 top-0 h-full items-center
            text-vertical-textured text-[100px]
            pointer-events-none select-none z-0">
          MISSION
        </div>
      </section>

      {/* what we do */}
      <section className="w-full py-14">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="text-center text-4xl sm:text-5xl font-extrabold text-white drop-shadow-teal">
            WHAT WE DO
          </h2>

          <div className="mt-12 space-y-14">
            {/* game jams */}
            <div className="flex items-stretch gap-8">
              {/* content */}
              <div className="flex-1 flex items-stretch gap-8">
                {/* image wrapper (stretches to row height) */}
                <div className="relative w-[260px] shrink-0 overflow-hidden">
                  <img
                    src="/images/cat.jpg"
                    alt="Section image"
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                </div>
                {/* text */}
                <div className="flex-1">
                  <div className="flex justify-end">
                    <h3 className="text-3xl font-extrabold text-white">Game Jams</h3>
                  </div>
                  <div className="mt-3 bg-gmc-cream px-6 py-5 text-black">
                    <p className="text-sm sm:text-base font-semibold leading-snug">
                      We hold regular game jams once or twice each semester, where members come together to create games from scratch in a short, focused timeframe. Participants form teams, brainstorm ideas, and build playable games while learning new skills and experimenting with creative concepts. Game jams are open to all experience levels and are a fun, supportive way to collaborate, challenge yourself, and make something memorable with fellow game makers.
                    </p>
                  </div>
                </div>
              </div>
              {/* strip */}
              <div className="w-12 bg-gmc-teal shrink-0" />
            </div>

            {/* product */}
            <div className="flex items-stretch gap-8">
              {/* strip */}
              <div className="w-12 bg-gmc-orange-dark shrink-0" />
              {/* content */}
              <div className="flex-1 flex items-stretch gap-8">
                <div className="flex-1">
                  <h3 className="text-4xl font-extrabold text-white">Production Division</h3>
                  <div className="mt-3 bg-gmc-cream px-6 py-5 text-black">
                    <p className="text-sm sm:text-base font-semibold leading-snug">
                      Our Production Division (Stego Studios) gives students the chance to work in dedicated teams to create a game over an extended period of time. Through an application-based process, members take on roles in programming, art, design, and audio while learning how to collaborate on a long-term project. The division focuses on skill development, teamwork, and hands-on experience, providing a supportive environment for students to grow their confidence and turn ideas into a finished game.
                    </p>
                  </div>
                </div>
                {/* image wrapper (stretches to row height) */}
                <div className="relative w-[260px] shrink-0 overflow-hidden">
                  <img
                    src="/images/cat.jpg"
                    alt="Section image"
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                </div>
              </div>
            </div>

            {/* education */}
            <div className="flex items-stretch gap-8">
              {/* content */}
              <div className="flex-1 flex items-stretch gap-8">
                {/* image wrapper (stretches to row height) */}
                <div className="relative w-[260px] shrink-0 overflow-hidden">
                  <img
                    src="/images/cat.jpg"
                    alt="Section image"
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <div className="flex justify-end">
                    <h3 className="text-4xl font-extrabold text-white">Education</h3>
                  </div>
                  <div className="mt-3 bg-gmc-cream px-6 py-5 text-black">
                    <p className="text-sm sm:text-base font-semibold leading-snug">
                      We hold regular workshops that introduce students to the basics of making games. Our sessions cover beginner-friendly topics like getting started with game engines, simple programming concepts, and core game design ideas. Open to all experience levels, these workshops are designed to be approachable, hands-on, and a great starting point for anyone curious about how games are made.
                    </p>
                  </div>
                </div>
              </div>
              {/* strip */}
              <div className="w-12 bg-gmc-teal shrink-0" />
            </div>

            {/* social events */}
            <div className="flex items-stretch gap-8">
              {/* strip */}
              <div className="w-12 bg-gmc-orange-dark shrink-0" />
              {/* content */}
              <div className="flex-1 flex items-stretch gap-8">
                <div className="flex-1">
                  <h3 className="text-4xl font-extrabold text-white">Social Events</h3>
                  <div className="mt-3 bg-gmc-cream px-6 py-5 text-black">
                    <p className="text-sm sm:text-base font-semibold leading-snug">
                      Social Events are all about bringing people together who love games and making games. From casual hangouts and game nights to themed socials, these events create a relaxed space to meet new people, chat about games, and build connections outside of development sessions. Whether you’re a long-time member or brand new, our socials are a great way to feel part of the community.
                    </p>
                  </div>
                </div>
                {/* image wrapper (stretches to row height) */}
                <div className="relative w-[260px] shrink-0 overflow-hidden">
                  <img
                    src="/images/cat.jpg"
                    alt="Section image"
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>



      {/* FAQ */}
      <section className="relative w-full py-20 overflow-hidden">
        <section className="mx-auto max-w-6xl px-4 relative z-10">
            <h1 className="text-center text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white drop-shadow-teal">
            FAQ
          </h1>

            <div className="w-[90%] mx-auto">
                {faqs.map((f) => (
                <FAQItem key={String(f.question)} question={f.question} answer={f.answer} />
                ))}
            </div>
        </section>
        {/* Large Vertical Background Text */}
        <div
          aria-hidden
          className="hidden lg:flex absolute left-0 top-1/2 -translate-y-1/2 items-center
            text-vertical-textured text-[100px]
            pointer-events-none select-none z-0">
          FAQ
        </div>
      </section>
    </div>
  )
}

export default page