"use client";

import { useState, useEffect, useRef } from "react";
import { FaArrowRightLong, FaCheck } from "react-icons/fa6";
import emailjs from "@emailjs/browser";

interface ContactFormProps {
  isMobile: boolean;
  onSuccess: () => void;
}

export default function ContactForm({ isMobile, onSuccess }: ContactFormProps) {
  // emailjs variables
  const SERVICE_ID = "service_i1we4is";
  const TEMPLATE_ID = "template_7icfkod";
  const PUBLIC_KEY = "YMpnVLWwCrT8wGXeq";

  const [isChecked, setIsChecked] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [cooldown, setCooldown] = useState(0);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const form = useRef<HTMLFormElement>(null);

  const sendEmail = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (isSending) return;
    setIsSending(true);

    if (form.current) {
      emailjs
        .sendForm(
          SERVICE_ID,
          TEMPLATE_ID,
          form.current,
          PUBLIC_KEY
        )
        .then(
          () => {
            console.log("success");
            if (form.current) {
              form.current.reset();
            }
            setFirstName("");
            setLastName("");
            setEmail("");
            setMessage("");
            setIsChecked(false);

            // Initialise cooldown before next message
            const endTime = new Date().getTime() + 60000;
            localStorage.setItem("cooldownEndTime", endTime.toString());
            setCooldown(60);
            setShowErrorMessage(false); // Clear error message on success
            onSuccess();
          },
          (error) => {
            console.log("failed: ", error);
            setErrorMessage("Oops! The message didn't send.");
            setShowErrorMessage(true);
          }
        )
        .finally(() => {
          setIsSending(false);
        });
    } else {
      setIsSending(false);
    }
  };

  // Get cooldown time on mount
  useEffect(() => {
    const cooldownEndTime = localStorage.getItem("cooldownEndTime");
    if (cooldownEndTime) {
      const remainingTime = Math.ceil((parseInt(cooldownEndTime) - new Date().getTime()) / 1000);
      if (remainingTime > 0) {
        setCooldown(remainingTime);
      }
    }
  }, []);

  // Countdown cooldown
  useEffect(() => {
    if (cooldown > 0) {
      const timer = setTimeout(() => setCooldown(cooldown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [cooldown]);

  return (
    <div className="flex-1 p-[30px] md:p-[40px] bg-gmc-cream rounded-3xl text-black shadow-xl">
      <h2 className="text-[2rem] mt-0 lg:text-[2.5rem] mb-[25px] font-bold font-karla">Send us an email!</h2>
      <form ref={form} onSubmit={sendEmail} className="flex flex-col gap-[20px]">
        <input type="text" name="from_name" placeholder="First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)}
          className="appearance-none bg-[#7E7E7E] border-none p-[15px] font-karla text-[1.125rem] w-full box-border resize-none rounded-2xl placeholder:text-gmc-cream/70 text-gmc-cream focus:ring-2 focus:ring-gmc-orange-dark outline-none transition-all duration-300" />
        <input type="text" name="from_last_name" placeholder="Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)}
          className="appearance-none bg-[#7E7E7E] border-none p-[15px] font-karla text-[1.125rem] w-full box-border resize-none rounded-2xl placeholder:text-gmc-cream/70 text-gmc-cream focus:ring-2 focus:ring-gmc-orange-dark outline-none transition-all duration-300" />
        <input type="email" name="reply_to" placeholder="Email Address" value={email} onChange={(e) => setEmail(e.target.value)}
          className="appearance-none bg-[#7E7E7E] border-none p-[15px] font-karla text-[1.125rem] w-full box-border resize-none rounded-2xl placeholder:text-gmc-cream/70 text-gmc-cream focus:ring-2 focus:ring-gmc-orange-dark outline-none transition-all duration-300" />
        <textarea name="message" placeholder="Message" rows={isMobile ? 7 : 12} value={message} onChange={(e) => setMessage(e.target.value)}
          className="appearance-none bg-[#7E7E7E] border-none p-[15px] font-karla text-[1.125rem] w-full box-border resize-none rounded-2xl placeholder:text-gmc-cream/70 text-gmc-cream focus:ring-2 focus:ring-gmc-orange-dark outline-none transition-all duration-300"></textarea>
        {showErrorMessage && <p className="text-[#FF6347] mt-[5px] font-karla">{errorMessage}</p>}
        <div className="flex flex-col items-start gap-[20px] md:items-center mt-[10px]">
          <div className="flex items-center gap-[10px] font-karla md:self-start">
            <div className="relative flex items-center">
              <input
                type="checkbox"
                id="not-a-bot"
                className="
                  w-[23px] h-[23px]
                  appearance-none
                  rounded-md
                  border-2 border-[#7E7E7E]
                  bg-white
                  cursor-pointer
                  checked:bg-gmc-orange-dark
                  checked:border-gmc-orange-dark
                  transition-all duration-200
                "
                checked={isChecked}
                onChange={(e) => setIsChecked(e.target.checked)}
              />
              {isChecked && (
                <FaCheck
                  className="absolute text-white left-1/2 top-1/2"
                  style={{
                    transform: 'translate(-50%, -50%)',
                    pointerEvents: 'none',
                  }}
                />
              )}
            </div>
            <label htmlFor="not-a-bot" className="cursor-pointer font-medium">I am not a bot.</label>
          </div>
          <button
            type="submit"
            className="bg-gmc-orange-dark text-white border-none rounded-[0px_30px_0px_30px] font-tilt-warp text-[1rem] cursor-pointer w-[160px] h-10 md:w-[180px] md:h-10 md:text-[1.2rem] font-bold transition-all duration-300 ease-out flex items-center justify-center gap-[10px] hover:-translate-y-1 hover:brightness-110 active:translate-y-0 shadow-lg self-start mt-[10px]"
            disabled={isSending || cooldown > 0 || !firstName || !lastName || !email || !message || !isChecked}
          >
            {isSending ? 'Sending...' : cooldown > 0 ? `${cooldown}s` : <>Send <FaArrowRightLong size={isMobile ? "1rem" : "1.2rem"} /></>}
          </button>
        </div>
      </form>
    </div>
  );
}