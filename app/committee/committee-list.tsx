"use client";

import { CommitteeMember, CommitteeYear } from "@/@types/schema.ds";
import { useEffect, useState, useMemo, useRef, useCallback } from "react";
import PartyEntry from "../components/committee/party_entry";
import InfoCard from "../components/committee/info_card";

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

  const [selectedCommittee, setSelectedCommittee] = useState(
    committees[0] || ""
  );
  const [filteredMembers, setFilteredMembers] = useState<CommitteeMember[]>([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState<CommitteeMember | null>(null);
  const [displayedMember, setDisplayedMember] = useState<CommitteeMember | null>(null);
  const [animState, setAnimState] = useState<"idle" | "exit" | "enter">("idle");
  const [listAnim, setListAnim] = useState<"idle" | "exit" | "enter">("idle");
  const animTimeout = useRef<NodeJS.Timeout | null>(null);

  const selectMember = useCallback((member: CommitteeMember) => {
    if (member.name === displayedMember?.name) return;
    setSelectedMember(member);
    // If no current member, just show immediately
    if (!displayedMember) {
      setDisplayedMember(member);
      setAnimState("enter");
      animTimeout.current = setTimeout(() => setAnimState("idle"), 300);
      return;
    }

    // Start exit animation
    setAnimState("exit");
    animTimeout.current = setTimeout(() => {
      setDisplayedMember(member);
      setAnimState("enter");
      animTimeout.current = setTimeout(() => setAnimState("idle"), 300);
    }, 250);
  }, [displayedMember]);

  useEffect(() => {
      const members = membersForYear[selectedCommittee] || [];

      // Start exit animation for both list and info card
      setListAnim("exit");
      setAnimState("exit");

      const timeout = setTimeout(() => {
        setFilteredMembers(members);
        if (members.length > 0) {
          const member = members[members.length - 1];
          setSelectedMember(member);
          setDisplayedMember(member);
        }
        setListAnim("enter");
        setAnimState("enter");

        setTimeout(() => {
          setListAnim("idle");
          setAnimState("idle");
        }, 300);
      }, 250);

      return () => clearTimeout(timeout);
  }, [selectedCommittee, membersForYear]);

  return (
    <>
      {/* Filter bar — full width on top */}
      <div className="top-[5px] z-10 w-full flex justify-center py-2">
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

      {/* InfoCard + PartyEntry list side by side, centered */}
      <div className="w-full flex justify-center p-8">
        <div className="flex gap-4 items-start">
          {/* InfoCard on the left (desktop only) */}
          {displayedMember && (
            <div
              className={`hidden lg:block shrink-0 transition-all duration-250 ease-in-out ${
                animState === "exit"
                  ? "opacity-0 -translate-x-6"
                  : animState === "enter"
                  ? "opacity-100 translate-x-0"
                  : "opacity-100 translate-x-0"
              }`}
            >
              <InfoCard
                name={displayedMember.name}
                role={displayedMember.role}
                image={displayedMember.image}
                about={displayedMember.about}
                social={displayedMember.social}
                hp={statFromName(displayedMember.name, 1, 0, 99) * 10}
                sp={statFromName(displayedMember.name, 2, 0, 60) * 10}
                level={statFromName(displayedMember.name, 3, 0, 100)}
                atk={statFromName(displayedMember.name, 4, 0, 999)}
                def={statFromName(displayedMember.name, 5, 0, 999)}
              />
            </div>
          )}

          {/* PartyEntry list */}
          <div className={`flex flex-col gap-10 transition-all duration-250 ease-in-out ${
            listAnim === "exit"
              ? "opacity-0 translate-y-4"
              : listAnim === "enter"
              ? "opacity-100 translate-y-0"
              : "opacity-100 translate-y-0"
          }`}>
            {filteredMembers.slice().reverse()
              .map((member: CommitteeMember) => (
                <div
                  key={member.name}
                  onClick={() => selectMember(member)}
                  className={`cursor-pointer transition-transform duration-300 ease-in-out ${
                    selectedMember?.name === member.name ? "translate-x-0" : "translate-x-4"
                  }`}
                >
                  <PartyEntry
                    name={member.name}
                    role={member.role}
                    image={member.image}
                    hp={statFromName(member.name, 1, 0, 99) * 10}
                    sp={statFromName(member.name, 2, 0, 60) * 10}
                    level={statFromName(member.name, 3, 0, 100)}
                  />
                </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
