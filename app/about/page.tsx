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
      question: "Question 1",
      answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur et lorem at enim ultrices congue. Nullam tincidunt volutpat nunc nec suscipit. Aenean fringilla leo sed sapien tincidunt, vel malesuada nulla faucibus. Maecenas et augue sed lorem fermentum sodales.Aenean fringilla leo sed sapien tincidunt, vel malesuada nulla faucibus. Maecenas et augue sed lorem fermentum sodales.",
    },
    {
      question: "Question 2",
      answer:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur et lorem at enim ultrices congue. Nullam tincidunt volutpat nunc nec suscipit. Aenean fringilla leo sed sapien tincidunt, vel malesuada nulla faucibus. Maecenas et augue sed lorem fermentum sodales.Aenean fringilla leo sed sapien tincidunt, vel malesuada nulla faucibus. Maecenas et augue sed lorem fermentum sodales.",
    },
    {
      question: "Question 3",
      answer:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur et lorem at enim ultrices congue. Nullam tincidunt volutpat nunc nec suscipit. Aenean fringilla leo sed sapien tincidunt, vel malesuada nulla faucibus. Maecenas et augue sed lorem fermentum sodales.Aenean fringilla leo sed sapien tincidunt, vel malesuada nulla faucibus. Maecenas et augue sed lorem fermentum sodales.",
    },
  ];

  return (
    <div>
         {/* who are we */}
        <div className="flex flex-col lg:flex-row gap-[41px] items-center p-[30px]">
            <div className="relative w-full h-[280px] sm:h-[340px] lg:w-[650px] lg:h-[446px] overflow-hidden">
                <PhotoWall />
            </div>
            <div className="lg:w-[740px] flex flex-col justify-center space-y-4">
                <h2 className="bold text-[36px] mb-4 text-white font-karla">About Game Maker Club</h2>
                <p className="text-white bold text-[24px] lg:max-w-[732px] w-full font-karla">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur et
                    lorem at enim ultrices congue. Nullam tincidunt volutpat nunc nec
                    suscipit. Aenean fringilla leo sed sapien tincidunt, vel malesuada nulla
                    faucibus. Maecenas et augue sed lorem fermentum sodales.Aenean fringilla 
                    leo sed sapien tincidunt, vel malesuada nulla faucibus. Maecenas et augue 
                    sed lorem fermentum sodales.
                </p>
            </div>
        </div>

        {/* our mission */}
        <div className="px-[30px] py-[40px]">
        <h2 className="text-white text-[36px] font-karla bold mb-8 text-left">Our Mission</h2>
        <div className="max-w-[720px] mx-auto">
            <div className="flex flex-col gap-10">
            <DotPoint
                text="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
                iconSrc="/images/wires.png"
            />
            <DotPoint
                text="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
                iconSrc="/images/wires.png"
            />
            <DotPoint
                text="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
                iconSrc="/images/wires.png"
            />
            </div>
        </div>
        </div>

        {/* what do we do */}
        <div className="px-[30px] py-[40px]">
            <h2 className="text-white font-karla bold text-[36px] text-left mb-8">What do we do</h2>
            <div className="flex flex-col lg:flex-row gap-10 lg:gap-20 w-[90%] mx-auto">
                {cards.map((c) => (
                <FeatureCard
                    key={c.title}
                    title={c.title}
                    imageSrc={c.imageSrc}
                    description={c.description}
                    href={c.href}
                />
                ))}
            </div>
        </div>

        {/* FAQ */}
        <section className="px-[30px] py-[40px]">
            <h2 className="text-white font-karla bold text-[36px] text-left mb-8">FAQ</h2>

            <div className="w-[90%] mx-auto">
                {faqs.map((f) => (
                <FAQItem key={String(f.question)} question={f.question} answer={f.answer} />
                ))}
            </div>
        </section>
    </div>

  )
}

export default page