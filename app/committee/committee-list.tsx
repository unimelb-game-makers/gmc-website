"use client";

import { CommitteeMember, CommitteeYear } from "@/@types/schema.ds";
import Image from "next/image";
import { useEffect, useState, useMemo } from "react";

interface CommitteeListProps {
  committeeMembers: CommitteeYear;
}

export default function CommitteeList({ committeeMembers }: CommitteeListProps) {
  const year = 2026;
  const membersForYear = useMemo(
    () => committeeMembers[year] || {},
    [committeeMembers]
  );
  const committees = useMemo(
    () => ["ALL", ...Object.keys(membersForYear)],
    [membersForYear]
  );

  const [selectedCommittee, setSelectedCommittee] = useState("ALL");
  const [filteredMembers, setFilteredMembers] = useState<CommitteeMember[]>([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    if (selectedCommittee === "ALL") {
      setFilteredMembers(Object.values(membersForYear).flat());
    }
    else {
      setFilteredMembers(membersForYear[selectedCommittee] || []);
    }
  }, [selectedCommittee, membersForYear]);

  return (
    <>
      <div className="sticky top-[5px] z-10 w-full flex justify-center py-2">
        {/* Desktop Filter Bar */}
        <div className="hidden lg:flex bg-[#D9D9D9] rounded-lg p-1 justify-center space-x-2">
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
        </div>

        {/* Mobile Dropdown */}
        <div className="lg:hidden w-full max-w-xs mx-auto relative">
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="w-full px-4 py-2 rounded-md bg-[#D9D9D9] text-black text-lg font-bold border-2 border-[#012E65] flex justify-between items-center"
          >
            <span>{selectedCommittee.toUpperCase()}</span>
            <svg className={`w-5 h-5 transition-transform ${isDropdownOpen ? 'transform rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
          </button>
          {isDropdownOpen && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-[#D9D9D9] rounded-md shadow-lg z-20">
              <ul className="py-1">
                {committees.map((committee) => (
                  <li
                    key={committee}
                    onClick={() => {
                      setSelectedCommittee(committee);
                      setIsDropdownOpen(false);
                    }}
                    className="px-4 py-2 text-black text-lg font-bold hover:bg-[#012E65] hover:text-white cursor-pointer"
                  >
                    {committee.toUpperCase()}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      <div className="w-full p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-x-12 gap-y-16 md:gap-y-30">
          {filteredMembers.slice().reverse()
            .map((member: CommitteeMember) => (
              <div
                key={member.name}
                className="flex flex-col items-center text-center"
              >
                <div className="relative w-64 h-64 md:w-80 md:h-80 lg:w-[350px] lg:h-[350px] flex items-center justify-center">
                  <Image
                    src="/shapes/memberFrame.png"
                    alt="Member Frame"
                    fill
                    className="object-cover"
                  />
                  <div className="relative w-[91.4%] h-[91.4%] rounded-full overflow-hidden">
                    <Image
                      src={member.image || "/images/cat.jpg"}
                      alt={member.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
              <h3 className="mt-4 text-2xl md:text-3xl font-semibold" style={{ color: '#FFFFFF' }}>{member.name}</h3>
              <p className="text-xl md:text-2xl" style={{ color: '#78A8E2' }}>{member.role}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
