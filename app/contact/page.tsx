"use client";

import { useState, useEffect } from "react";
import { FaArrowRightLong, FaYoutube } from "react-icons/fa6";
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
    <div>
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
          <h1 className="text-[2.5rem] md:text-[3rem] lg:text-[3.5rem] m-0">Contact Us</h1>
        </div>

        <div className="flex flex-col [@media(min-width:840px)]:flex-row justify-center gap-[50px] max-w-[1200px] mx-auto">
          
          <ContactForm isMobile={isMobile} onSuccess={handleSuccess} />

          <div className="flex-1 flex flex-col gap-[20px]">
            <div className="flex flex-col gap-[15px] bg-[#D9D9D9] rounded-3xl p-[20px]">
              <div className="flex items-center gap-[15px]">
              <Image src="/icons/contact-instagram.png" alt="Instagram" width={50} height={50} className="w-[50px] h-[50px]" />
              <h3 className="m-0 text-[1.5rem] font-bold text-black">Follow us on Instagram!</h3>
            </div>
            <a href="https://www.instagram.com/stego.studios/" target="_blank" rel="noopener noreferrer">
              <button className="bg-[#4FA0CF] text-white border-none rounded-lg w-full py-[8px] font-tilt-warp text-[1.2rem] cursor-pointer transition-transform duration-200 ease-out flex items-center justify-center gap-[10px] hover:-translate-y-0.5 md:w-[300px] md:py-[10px] md:text-[1.5rem] font-bold">
                Follow <FaArrowRightLong size={isMobile ? "1.2rem" : "1.5rem"} />
              </button>
            </a>
          </div>

          <div className="flex flex-col gap-[15px] bg-[#D9D9D9] rounded-3xl p-[20px]">
            <div className="flex items-center gap-[15px]">
              <Image src="/icons/contact-discord.png" alt="Discord" width={50} height={50} className="w-[50px] h-[50px]" />
              <h3 className="m-0 text-[1.5rem] font-bold text-black">Join our discord!</h3>
            </div>
            <a href="https://discord.gg/eA6RbnkS" target="_blank" rel="noopener noreferrer">
              <button className="bg-[#4FA0CF] text-white border-none rounded-lg w-full py-[8px] font-tilt-warp text-[1.2rem] cursor-pointer transition-transform duration-200 ease-out flex items-center justify-center gap-[10px] hover:-translate-y-0.5 md:w-[300px] md:py-[10px] md:text-[1.5rem] font-bold">
                Join <FaArrowRightLong size={isMobile ? "1.2rem" : "1.5rem"} />
              </button>
            </a>
          </div>

          <div className="flex flex-col gap-[15px] bg-[#D9D9D9] rounded-3xl p-[20px]">
            <div className="flex items-center gap-[15px]">
              <Image src="/icons/contact-youtube.png" alt="YouTube" width={50} height={50} className="w-[50px] h-[50px]" />
              <h3 className="m-0 text-[1.5rem] font-bold text-black">Check out our YouTube!</h3>
            </div>
            <a href="https://www.youtube.com/@StegoStudios" target="_blank" rel="noopener noreferrer">
              <button className="bg-[#4FA0CF] text-white border-none rounded-lg w-full py-[8px] font-tilt-warp text-[1.2rem] cursor-pointer transition-transform duration-200 ease-out flex items-center justify-center gap-[10px] hover:-translate-y-0.5 md:w-[300px] md:py-[10px] md:text-[1.5rem] font-bold">
                Go <FaArrowRightLong size={isMobile ? "1.2rem" : "1.5rem"} />
              </button>
            </a>
          </div>

          <div className="flex flex-col gap-[15px] bg-[#D9D9D9] rounded-3xl p-[20px]">
            <div className="flex items-center gap-[15px]">
              <Image src="/icons/contact-itch.png" alt="Itch.io" width={50} height={50} className="w-[50px] h-[50px]" />
              <h3 className="m-0 text-[1.5rem] font-bold text-black">Play our games on Itch!</h3>
            </div>
            <a href="https://stegostudios.itch.io/" target="_blank" rel="noopener noreferrer">
              <button className="bg-[#4FA0CF] text-white border-none rounded-lg w-full py-[8px] font-tilt-warp text-[1.2rem] cursor-pointer transition-transform duration-200 ease-out flex items-center justify-center gap-[10px] hover:-translate-y-0.5 md:w-[300px] md:py-[10px] md:text-[1.5rem] font-bold">
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