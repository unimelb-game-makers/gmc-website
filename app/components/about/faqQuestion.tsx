'use client'

import React from 'react'
import { useState } from "react";

type FAQItemProps = {
  question: string;
  answer: React.ReactNode;
};

export function FAQItem({ question, answer }: FAQItemProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-white/15">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between gap-4 py-5 text-left"
        aria-expanded={open}
      >
        <span className="text-white font-karla font-bold text-[20px]">
          {question}
        </span>

        {/* Arrow */}
        <span
          className={[
            "text-white/80 transition-transform duration-200 select-none",
            open ? "rotate-180" : "rotate-0",
          ].join(" ")}
          aria-hidden="true"
        >
          ▼
        </span>
      </button>

      {/* Answer */}
      {open && (
        <div className="pb-5">
          <div className="text-white/80 font-karla text-[18px] leading-relaxed">
            {answer}
          </div>
        </div>
      )}
    </div>
  );
}