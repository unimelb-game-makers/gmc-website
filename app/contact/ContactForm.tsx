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
    <div className="flex-1 p-[20px] md:p-[30px] bg-[#D9D9D9] rounded-3xl text-black">
      <h2 className="text-[2rem] mt-0 lg:text-[2rem] mb-[20px] font-bold">Send us an email!</h2>
      <form ref={form} onSubmit={sendEmail} className="flex flex-col gap-[20px]">
        <input type="text" name="from_name" placeholder="First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)}
        className="appearance-none bg-[#AFAFAF] border-[1px] border-black p-[15px] font-karla text-[1rem] w-full box-border resize-none rounded-2xl placeholder:text-black placeholder:font-extralight text-black"/>
        <input type="text" name="from_last_name" placeholder="Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)}
        className="appearance-none bg-[#AFAFAF] border-[1px] border-black p-[15px] font-karla text-[1rem] w-full box-border resize-none rounded-2xl placeholder:text-black placeholder:font-extralight text-black"/>
        <input type="email" name="reply_to" placeholder="Email Address" value={email} onChange={(e) => setEmail(e.target.value)}
        className="appearance-none bg-[#AFAFAF] border-[1px] border-black p-[15px] font-karla text-[1rem] w-full box-border resize-none rounded-2xl placeholder:text-black placeholder:font-extralight text-black"/>
        <textarea name="message" placeholder="Message" rows={isMobile ? 7 : 12} value={message} onChange={(e) => setMessage(e.target.value)}
        className="appearance-none bg-[#AFAFAF] border-[1px] border-black p-[15px] font-karla text-[1rem] w-full box-border resize-none rounded-2xl placeholder:text-black placeholder:font-extralight text-black"></textarea>
        {showErrorMessage && <p className="text-[#FF6347] mt-[5px]">{errorMessage}</p>}
        <div className="flex flex-col items-start gap-[20px] md:items-center">
          <div className="flex items-center gap-[10px] font-karla md:self-start">
            <div className="relative flex items-center">
              <input
                type="checkbox"
                id="not-a-bot"
                className="
                  w-[23px] h-[23px]
                  appearance-none
                  rounded-md
                  border-1 border-black
                  bg-[#CCCCCC]
                  cursor-pointer
                  checked:bg-[#0A1A4F]
                  checked:border-[#0A1A4F]
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
            <label htmlFor="not-a-bot">I am not a bot.</label>
          </div>
          <button
            type="submit"
            className="bg-[#4FA0CF] text-white border-none rounded-2xl p-[12px] font-tilt-warp text-[1rem] cursor-pointer w-1/2 h-[3rem] transition-transform duration-200 ease-out flex items-center justify-center gap-[10px] hover:-translate-y-0.5 md:p-[15px] md:h-[3.3rem] md:text-[1.2rem] font-bold self-start"
            disabled={isSending || cooldown > 0 || !firstName || !lastName || !email || !message || !isChecked}
          >
            {isSending ? 'Sending...' : cooldown > 0 ? `${cooldown}s` : <>Send <FaArrowRightLong size={isMobile ? "1rem" : "1.2rem"} /></>}
          </button>
        </div>
      </form>
    </div>
  );
}