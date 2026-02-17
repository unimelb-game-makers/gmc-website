"use client";

import { CommitteeMember, CommitteeYear } from "@/@types/schema.ds";
import { useEffect, useState, useMemo } from "react";
import PartyEntry from "../components/committee/party_entry";

// Simple string hash → deterministic number in a range
function hashName(name: string, seed: number = 0): number {
  let hash = seed;
  for (let i = 0; i < name.length; i++) {
    hash = (hash * 31 + name.charCodeAt(i)) | 0;
  }
  return Math.abs(hash);
}

function statFromName(name: string, seed: number, min: number, max: number): number {
  return min + (hashName(name, seed) % (max - min + 1));
}

interface CommitteeListProps {
  committeeMembers: CommitteeYear;
}

export default function CommitteeList({ committeeMembers }: CommitteeListProps) {
  const year = 2026;
  const membersForYear = useMemo(
    () => committeeMembers[year] || {},
    [committeeMembers]
  );

  // Reverse to get executive committee first
  const committees = useMemo(
    () => [...Object.keys(membersForYear)].reverse(),
    [membersForYear]
  );

  // Add https to links without it, ensures that it doesn't open as a relative path
  function openSocial(url?: string) {
    if (!url) return;
    const fullUrl = url.startsWith("http") ? url : `https://${url}`;
    window.open(fullUrl, "_blank");
  }

  const [selectedCommittee, setSelectedCommittee] = useState(
    committees[0] || ""
  );
  const [filteredMembers, setFilteredMembers] = useState<CommitteeMember[]>([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
      setFilteredMembers(membersForYear[selectedCommittee] || []);
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
              className={`px-4 py-2 font-arsenica rounded-md transition-transform duration-100 ease-out transform hover:scale-105 hover:-translate-y-0.5 cursor-pointer text-lg font-bold ${
                selectedCommittee === committee ? "bg-gmc-teal-dark text-white" : "bg-transparent text-black"
              }`}
            >
              {committee.toUpperCase()}
            </button>
          ))}
        </div>

        {/* Mobile Dropdown */}
        <div className="lg:hidden w-full max-w-xs mx-auto relative">
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="w-full px-4 py-2 rounded-md bg-[#D9D9D9] font-arsenica text-black text-lg font-bold border-2 border-[#012E65] flex justify-between items-center"
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
                    className="px-4 py-2 text-black font-arsenica text-lg font-bold hover:bg-gmc-teal-dark hover:text-white cursor-pointer"
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
        <div className="flex flex-col items-center gap-10">
          {filteredMembers.slice().reverse()
            .map((member: CommitteeMember) => (
              <PartyEntry
                key={member.name}
                name={member.name}
                role={member.role}
                image={member.image}
                hp={statFromName(member.name, 1, 0, 99) * 10}
                sp={statFromName(member.name, 2, 0, 60) * 10}
                level={statFromName(member.name, 3, 0, 100)}
              />
          ))}
        </div>
      </div>
    </>
  );
}
