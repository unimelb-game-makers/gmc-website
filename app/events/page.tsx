"use client";
import React from 'react'
import { useEffect, useState } from 'react'

const page = () => {
  const [active, setActive] = useState(true);

  return (
    <div className='m-10'>
      <h1 className='text-7xl font-bold'>Events</h1>
      {/* <div className="hidden lg:flex bg-[#D9D9D9] rounded-lg p-1 justify-center space-x-2">
          {committees.map((committee) => (
            <button
              key={committee}
              onClick={() => setSelectedCommittee(committee)}
              className={`px-4 py-2 rounded-md transition-transform duration-100 ease-out transform hover:scale-105 hover:-translate-y-0.5 cursor-pointer text-lg font-bold ${
                selectedCommittee === committee ? "text-white" : "text-black"
              }`}
              style={{
                backgroundColor:
                  selectedCommittee === committee ? "#012E65" : "transparent",
              }}
            >
              {committee.toUpperCase()}
            </button>
          ))}
        </div> */}
      <div className="bg-[#D9D9D9] rounded-lg p-1 inline-flex">
        <button
          onClick={() => setActive(true)}
          className={`px-4 py-2 rounded-md transition-transform duration-100 ease-out transform hover:scale-105 hover:-translate-y-0.5 cursor-pointer text-lg font-bold
            ${active === true 
              ? "bg-blue-900 text-white" 
              : "text-gray-700"
            }`}
        >
          Upcoming
        </button>

        <button
          onClick={() => setActive(false)}
          className={`px-4 py-2 rounded-md transition-transform duration-100 ease-out transform hover:scale-105 hover:-translate-y-0.5 cursor-pointer text-lg font-bold
            ${active === false
              ? "bg-blue-900 text-white" 
              : "text-gray-700"
            }`}
        >
          Previous
        </button>
      </div>

      <div>
        Events
      </div>

      <div>
        <h1 className='text-5xl font-bold'>Regular Events</h1>
      </div>
    </div>
  )
}

export default page