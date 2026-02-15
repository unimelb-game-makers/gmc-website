"use client";

import { useState, useEffect } from "react";
import { FaArrowRightLong } from "react-icons/fa6";
import Image from 'next/image';
import ContactForm from "./ContactForm";

export default function Contact() {
  const [showPopup, setShowPopup] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const handleSuccess = () => {
    setShowPopup(true);
  };

  // Adjust height of message text area and handle mobile state
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 840);
    };

    // Set initial mobile state
    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (showPopup) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [showPopup]);

  return (
    <div className='py-35'>
      {showPopup && (
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center z-50">
          <div className="relative bg-white p-6 rounded-lg shadow-lg text-center">
            <div className="flex justify-center">
              <Image src="/images/wires.png" alt="Wires" width={150} height={150} />
            </div>
            <p className="text-2xl font-bold text-black mb-4">Message sent! Thank you!</p>
            <button
              className="bg-[#4FA0CF] text-white py-2 px-4 rounded-lg transition-transform duration-200 ease-out hover:-translate-y-0.5"
              onClick={() => setShowPopup(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
      <div className={`relative p-[20px] md:p-[50px] text-[#FFFFFF] font-tilt-warp ${showPopup ? "blur-[5px]" : ""}`}>

        <div className="text-center mb-[50px] max-w-[800px] mx-auto p-[20px]">
          <h1 className="text-[2.5rem] md:text-[4rem] lg:text-[5rem] m-0 font-akira drop-shadow-teal">Contact Us</h1>
        </div>

        <div className="flex flex-col [@media(min-width:840px)]:flex-row justify-center gap-[20px] md:gap-[30px] lg:gap-[40px] max-w-[1200px] mx-auto items-stretch">

          {/* Vertical EMAIL text for desktop - shared space */}
          {!isMobile && (
            <div className="flex items-center justify-center w-[60px] md:w-[80px] lg:w-[100px]">
              <span className="text-vertical-textured text-[4rem] md:text-[6rem] lg:text-[7rem] opacity-15 select-none leading-none">
                EMAIL
              </span>
            </div>
          )}

          <div className="flex-[1.5] flex flex-col">
            <ContactForm isMobile={isMobile} onSuccess={handleSuccess} />
          </div>

          <div className="flex-1 flex flex-col gap-[20px]">
            <div className="flex flex-col gap-[15px] bg-gmc-cream rounded-3xl p-[25px] transition-all duration-300">
              <div className="flex items-center gap-[15px]">
                <Image src="/icons/contact-instagram.png" alt="Instagram" width={50} height={50} className="w-[50px] h-[50px]" />
                <h3 className="m-0 text-[1.5rem] font-bold text-black font-karla">Follow us on Instagram!</h3>
              </div>
              <a href="https://www.instagram.com/gmc.unimelb/?hl=en" target="_blank" rel="noopener noreferrer">
                <button className="bg-gmc-orange-dark text-white border-none rounded-[0px_30px_0px_30px] w-full h-10 md:h-10 font-tilt-warp text-[1.1rem] md:text-[1.2rem] cursor-pointer transition-all duration-300 ease-out flex items-center justify-center gap-[10px] hover:-translate-y-1 hover:brightness-110 active:translate-y-0 shadow-lg md:w-[220px] font-bold">
                  Follow <FaArrowRightLong size={isMobile ? "1.2rem" : "1.5rem"} />
                </button>
              </a>
            </div>

            <div className="flex flex-col gap-[15px] bg-gmc-cream rounded-3xl p-[25px] transition-all duration-300">
              <div className="flex items-center gap-[15px]">
                <Image src="/icons/contact-discord.png" alt="Discord" width={50} height={50} className="w-[50px] h-[50px]" />
                <h3 className="m-0 text-[1.5rem] font-bold text-black font-karla">Join our discord!</h3>
              </div>
              <a href="https://discord.com/invite/YWD4jRQ7xY" target="_blank" rel="noopener noreferrer">
                <button className="bg-gmc-orange-dark text-white border-none rounded-[0px_30px_0px_30px] w-full h-10 md:h-10 font-tilt-warp text-[1.1rem] md:text-[1.2rem] cursor-pointer transition-all duration-300 ease-out flex items-center justify-center gap-[10px] hover:-translate-y-1 hover:brightness-110 active:translate-y-0 shadow-lg md:w-[220px] font-bold">
                  Join <FaArrowRightLong size={isMobile ? "1.2rem" : "1.5rem"} />
                </button>
              </a>
            </div>

            <div className="flex flex-col gap-[15px] bg-gmc-cream rounded-3xl p-[25px] transition-all duration-300">
              <div className="flex items-center gap-[15px]">
                <Image src="/icons/contact-youtube.png" alt="YouTube" width={50} height={50} className="w-[50px] h-[50px]" />
                <h3 className="m-0 text-[1.5rem] font-bold text-black font-karla">Check out our YouTube!</h3>
              </div>
              <a href="https://www.youtube.com/@UniMelbGameMakers" target="_blank" rel="noopener noreferrer">
                <button className="bg-gmc-orange-dark text-white border-none rounded-[0px_30px_0px_30px] w-full h-10 md:h-10 font-tilt-warp text-[1.1rem] md:text-[1.2rem] cursor-pointer transition-all duration-300 ease-out flex items-center justify-center gap-[10px] hover:-translate-y-1 hover:brightness-110 active:translate-y-0 shadow-lg md:w-[220px] font-bold">
                  Go <FaArrowRightLong size={isMobile ? "1.2rem" : "1.5rem"} />
                </button>
              </a>
            </div>

            <div className="flex flex-col gap-[15px] bg-gmc-cream rounded-3xl p-[25px] transition-all duration-300">
              <div className="flex items-center gap-[15px]">
                <Image src="/icons/contact-itch.png" alt="Itch.io" width={50} height={50} className="w-[50px] h-[50px]" />
                <h3 className="m-0 text-[1.5rem] font-bold text-black font-karla">Play our games on Itch!</h3>
              </div>
              <a href="https://gmcunimelb.itch.io/" target="_blank" rel="noopener noreferrer">
                <button className="bg-gmc-orange-dark text-white border-none rounded-[0px_30px_0px_30px] w-full h-10 md:h-10 font-tilt-warp text-[1.1rem] md:text-[1.2rem] cursor-pointer transition-all duration-300 ease-out flex items-center justify-center gap-[10px] hover:-translate-y-1 hover:brightness-110 active:translate-y-0 shadow-lg md:w-[220px] font-bold">
                  Play! <FaArrowRightLong size={isMobile ? "1.2rem" : "1.5rem"} />
                </button>
              </a>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}