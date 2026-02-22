import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { BiLoaderAlt } from 'react-icons/bi'

interface PartyEntryProps {
  name: string
  role: string
  image?: string
  hp: number
  sp: number
  level: number
}

export default function PartyEntry({
  name,
  role,
  image,
  hp,
  sp,
  level,
}: PartyEntryProps) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
  }, [image]);

  return (
    <div className="relative flex items-center bg-gmc-cream rounded-tr-3xl rounded-bl-3xl pl-14 sm:pl-16 pr-3 py-4 sm:pr-4 sm:py-3 w-full max-w-2xl font-tasa-orbiter font-extrabold">
      {/* Profile image — floats in front */}
      <div className="absolute left-2 translate-y-1/4 z-10 w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden border-3 border-gmc-teal-dark bg-gmc-cream flex items-center justify-center">
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/5 z-10 text-gmc-teal">
            <BiLoaderAlt className="w-6 h-6 animate-spin" />
          </div>
        )}
        <Image
          src={image || '/images/cat.jpg'}
          alt={name}
          fill
          sizes="96px"
          unoptimized
          onLoad={() => setIsLoading(false)}
          className={`object-cover transition-opacity duration-200 ${isLoading ? 'opacity-0' : 'opacity-100'}`}
        />
      </div>

      {/* Name + Role */}
      <div className="pl-14 shrink-0 min-w-0 mr-4">
        <h3 className="text-lg sm:text-2xl font-extrabold text-neutral-900 leading-tight truncate">
          {name}
        </h3>
        <p className="text-sm sm:text-lg font-bold text-neutral-800 leading-tight truncate">
          Lvl {level} {role}
        </p>
      </div>

      {/* HP / SP bars */}
      <div className="ml-auto flex flex-col gap-1.5 sm:gap-2 w-72 sm:w-96">
        {/* HP */}
        <div className="flex items-center gap-2">
          <span className="text-xs sm:text-sm text-gmc-orange-dark whitespace-nowrap">
            HP {hp}
          </span>
          <div className="flex-1 h-3 sm:h-4 bg-gmc-orange-dark rounded-tr-full rounded-bl-full" />
        </div>

        {/* SP */}
        <div className="flex items-center gap-2">
          <span className="text-xs sm:text-sm text-gmc-teal whitespace-nowrap">
            SP {sp}
          </span>
          <div className="flex-1 h-3 sm:h-4 bg-gmc-teal rounded-tr-full rounded-bl-full" />
        </div>
      </div>
    </div>
  )
}
