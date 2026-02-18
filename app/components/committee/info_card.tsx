import React from 'react'
import Image from 'next/image'
import { IoPersonCircle } from 'react-icons/io5'

interface InfoCardProps {
  name: string
  role: string
  image?: string
  about?: string
  social?: string
  hp: number
  sp: number
  level: number
  atk: number
  def: number
}

export default function InfoCard({
  name,
  role,
  image,
  about,
  social,
  hp,
  sp,
  level,
  atk,
  def,
}: InfoCardProps) {
  return (
    <div className="relative w-85 h-105 bg-[#9D9C94] rounded-2xl pt-5 font-tasa-orbiter text-white shadow-lg flex flex-col">
      {/* Profile image — floats above other content */}
      <div className="absolute left-5 top-5 z-20 w-40 h-40 rounded-full overflow-hidden border-5 border-gmc-teal-dark shadow-[-8px_8px_0px_0px_rgba(233,120,81,0.5)]">
        <Image
          src={image || '/images/cat.jpg'}
          alt={name}
          width={160}
          height={160}
          className="object-cover w-full h-full"
        />
      </div>

      {/* Top section: stats (offset right to avoid image) */}
      <div className="flex gap-4">
        {/* Spacer for image */}
        <div className="w-40 shrink-0 mx-5" />

        {/* Stats */}
        <div className="flex-1 flex flex-col justify-center gap-1 text-black">
            <span className="text-sm text-right font-extrabold whitespace-nowrap mx-2 ">{hp}/{hp} HP</span>
            <div className="w-full h-6 bg-gmc-orange-dark rounded-bl-full" />
            <span className="text-sm text-right font-extrabold whitespace-nowrap mx-2">{sp}/{sp} SP</span>
            <div className="w-full h-6 bg-gmc-teal rounded-bl-full" />

            {/* Atk / Def */}
            <div className="text-right text-sm font-bold leading-tight mx-2">
                <p>Atk {atk}</p>
                <p>Def {def}</p>
            </div>
        </div>
      </div>

      {/* Name + Level/Role */}
      <div className="flex items-start justify-between mt-4 bg-gmc-teal-dark px-3 py-2">
        <h2 className="text-2xl font-extrabold leading-tight">{name}</h2>
        <div className="text-right">
          <p className="text-2xl font-extrabold leading-tight">Lv {level}</p>
          <p className="text-xl font-bold leading-tight">{role}</p>
        </div>
      </div>

      {/* About */}
      <p className="m-5 font-bold text-black mt-4">{about || ''}</p>

      {/* Profile button */}
      {social && (
        <a
          href={social.startsWith('http') ? social : `https://${social}`}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-auto self-end mx-5 mb-5 flex items-center gap-2 bg-gmc-teal-dark text-white px-4 py-2 rounded-lg font-bold text-lg w-fit hover:bg-gmc-teal transition-colors"
        >
          <IoPersonCircle className="w-6 h-6" />
          Profile
        </a>
      )}
    </div>
  )
}
